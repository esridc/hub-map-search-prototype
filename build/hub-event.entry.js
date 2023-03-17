import { r as registerInstance, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { k as searchItems, L as joinGroup, M as leaveGroup, U as getPortal } from './index-bed14788.js';
import { U as UserSession } from './index-923d9554.js';
import { b as getHubApiUrl, M as addUsersToGroup } from './index-5ebfac40.js';
import { q as queryFeatures } from './index-d6e159fc.js';
import './index-5c68fb28.js';

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { request } from "@esri/arcgis-rest-request";
 * import { getEventServiceUrl } from "@esri/hub-events";
 * // org ids can be retrieved via a call to portals/self
 * request("http://custom.maps.arcgis.com/sharing/rest/portals/self")
 *   .then(response => {
 *     getEventServiceUrl(response.id)
 *       .then(url)
 *          // "https://hub.arcgis.com/api/v3/events/<orgId>..."
 *   })
 * ```
 * Get the Hub REST API endpoint to use for an organization's events
 * @param orgId - Identifier of the ArcGIS Online Organization
 * @param requestOptions - request options that may include authentication
 * @returns A Promise that will resolve with the events API url for a Hub enabled ArcGIS Online organization.
 */
function getEventServiceUrl(orgId, requestOptions) {
    return getEventServiceItem(orgId, requestOptions).then(response => {
        const host = getHubApiUrl(requestOptions);
        // Extract the Event service's view name; the view returned depends
        // on permission level of request user
        const view = response.url.match(/services\/(.*?)\/FeatureServer/);
        // Generate a root url for the hub-indexer event routes
        /* istanbul ignore else */
        if (view[1]) {
            return `${host}/api/v3/events/${orgId}/${view[1]}/FeatureServer/0`;
        }
    });
}
/**
 * ```js
 * import { request } from "@esri/arcgis-rest-request";
 * import { getEventFeatureServiceUrl } from "@esri/hub-events";
 * // org ids can be retrieved via a call to portals/self
 * request("http://custom.maps.arcgis.com/sharing/rest/portals/self")
 *   .then(response => {
 *     getEventFeatureServiceUrl(response.id)
 *       .then(url)
 *         // "https://services.arcgis.com/<orgId>/arcgis/rest/services/..."
 *   })
 * ```
 * Fetch the events feature service/view for the Hub organization and given authorization.
 * @param orgId - Identifier of the ArcGIS Online Organization
 * @param requestOptions - request options that may include authentication
 * @returns A Promise that will resolve with the events feature service url for a Hub enabled ArcGIS Online organization.
 */
function getEventFeatureServiceUrl(orgId, requestOptions) {
    return getEventServiceItem(orgId, requestOptions).then(response => {
        // single-layer service
        let url = `${response.url}/0`;
        // force https
        url = url.replace(/^http:/gi, "https:");
        return url;
    });
}
/**
 * Get the events query based on type.
 * @param type - string to indicate event type with the options `upcoming`, `past`, `cancelled` and `draft`
 * @param options - query features request options
 * @returns an IQueryFeaturesOptions that has the same values as `options` but for the modified Where and OrderBy properties
 */
function getEventQueryFromType(type, options) {
    // this allows us to ask for type === upcoming | past | cancelled | draft
    // and get an appropriate `where` and `orderByFields`
    let typeWhere;
    const newOptions = Object.assign({}, options);
    if (type === "cancelled") {
        if (!options.orderByFields) {
            // if orderByFields was passed in, use it, otherwise use appropriate one for cancelled
            newOptions.orderByFields = "EditDate DESC";
        }
        typeWhere = `isCancelled=1 AND status<>'draft'`;
    }
    else if (type === "draft") {
        if (!options.orderByFields) {
            newOptions.orderByFields = "EditDate DESC";
        }
        const session = options.authentication;
        const user = session ? session.username : null;
        typeWhere = `Creator = '${user}' AND status = 'draft'`;
    }
    else {
        if (!options.orderByFields) {
            // if orderByFields was passed in, use it, otherwise use appropriate one for type
            newOptions.orderByFields =
                type === "upcoming" ? "startDate ASC" : "startDate DESC";
        }
        const operator = type === "upcoming" ? ">" : "<=";
        typeWhere = `endDate${operator}CURRENT_TIMESTAMP AND (isCancelled<>1 OR isCancelled IS NULL) AND status<>'draft'`;
    }
    if (options.where) {
        newOptions.where = `${options.where} AND ${typeWhere}`;
    }
    else {
        newOptions.where = typeWhere;
    }
    return newOptions;
}
/**
 * ```js
 * import { request } from "@esri/arcgis-rest-request";
 * import { getEventServiceItem } from "@esri/hub-events";
 * // org ids can be retrieved via a call to portals/self
 * request("http://custom.maps.arcgis.com/sharing/rest/portals/self")
 *   .then(response => {
 *     getEventServiceItem(response.id)
 *       .then(itemResponse)
 *   })
 * ```
 * Fetch the events service associated with a Hub Site.
 * @param orgId - Identifier of the ArcGIS Online Organization
 * @param requestOptions - request options that may include authentication
 * @returns A Promise that will resolve with the events item for a Hub enabled ArcGIS Online organization.
 */
function getEventServiceItem(orgId, requestOptions) {
    return searchItems(Object.assign({ q: `typekeywords:hubEventsLayer AND orgid:${orgId}` }, requestOptions)).then(response => {
        const eventResponse = response;
        if (eventResponse.results && eventResponse.results.length > 0) {
            let result;
            /* istanbul ignore else  */
            if (eventResponse.results.length === 1) {
                // user only has access to the public view
                result = eventResponse.results[0];
            }
            else if (eventResponse.results.length > 1) {
                // the user has access to the org view and/or the admin view
                // identify which is which
                const obj = eventResponse.results.reduce((acc, item) => {
                    if (!item.typeKeywords.includes("View Service")) {
                        acc.admin = item;
                    }
                    else {
                        if (item.access === "public") {
                            acc.public = item;
                        }
                        else {
                            acc.org = item;
                        }
                    }
                    return acc;
                }, {});
                // pick the highest access level that this user has access to
                result = obj.admin || obj.org || /* istanbul ignore next */ obj.public;
            }
            return result;
        }
        else {
            throw Error("No events service found. Events are likely not enabled.");
        }
    });
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { getEventQueryFromType, searchEvents } from "@esri/hub-events";
 * // event types are "upcoming" | "past" | "cancelled" | "draft"
 * const searchOptions: IQueryFeaturesOptions = getEventQueryFromType("upcoming", {
 *   url: eventsUrl,
 *   authentication
 * });
 * searchEvents(searchOptions)
 *   .then(response => {
 *     // {
 *     //   data: [{
 *     //     id: "4",
 *     //     type: "events",
 *     //     attributes: {title: "Vision Zero", siteId: "CityofX", ...},
 *     //     geometry: {
 *     //       "x": -74.310680054965559,
 *     //       "y": 40.723010058860787
 *     //     }
 *     //   }],
 *     //   included: [{
 *     //     id: "CityofX",
 *     //     type: "sites",
 *     //     attributes: { id: "CityofX", url: "https://foo/bar"}
 *     //   }]
 *     // }
 *   });
 * ```
 * Query for events from ArcGIS Hub.
 * @param requestOptions - request options that may include authentication
 * @returns A Promise that will resolve with decorated features from the event feature service for a Hub enabled ArcGIS Online organization.
 */
function searchEvents(requestOptions) {
    const queryOptions = Object.assign({ returnGeometry: true }, requestOptions);
    return queryFeatures(queryOptions).then(response => {
        if (response.features.length <= 0) {
            return {
                data: [],
                included: []
            };
        }
        // if authentication is passed, get a reference to the token to tack onto image urls
        if (queryOptions.authentication) {
            return queryOptions.authentication
                .getToken(queryOptions.url)
                .then(token => {
                return buildEventResponse(response.features, queryOptions.url, requestOptions, token);
            });
        }
        else {
            return buildEventResponse(response.features, queryOptions.url, requestOptions);
        }
    });
}
function buildEventResponse(features, url, requestOptions, token) {
    const siteIds = [];
    const data = [];
    const included = [];
    const cacheBust = new Date().getTime();
    let siteSearchQuery = "";
    features.forEach(function (event) {
        const attributes = event.attributes;
        const geometry = event.geometry;
        let imageUrl = null;
        if (attributes.imageAttributes) {
            const imageAttributes = JSON.parse(attributes.imageAttributes);
            if (imageAttributes.crop) {
                imageUrl = `${url}/${attributes.OBJECTID}/attachments/${imageAttributes.crop}?v=${cacheBust}`;
                if (token) {
                    imageUrl += `&token=${token}`;
                }
            }
        }
        data.push({
            id: attributes.OBJECTID,
            type: "events",
            imageUrl,
            attributes,
            geometry
        });
        const currentEventSiteId = attributes.siteId;
        if (currentEventSiteId != null &&
            siteIds.indexOf(currentEventSiteId) === -1) {
            siteIds.push(currentEventSiteId);
            siteSearchQuery += siteSearchQuery.length > 0 ? " OR id:" : "id:";
            siteSearchQuery += currentEventSiteId;
        }
    });
    if (siteIds.length === 0) {
        return { included, data };
    }
    // search for site items and include those in the response
    const searchRequestOptions = requestOptions;
    searchRequestOptions.q = siteSearchQuery;
    return searchItems(searchRequestOptions).then(function (siteInfo) {
        siteInfo.results.forEach(siteItem => {
            included.push({
                id: siteItem.id,
                type: `sites`,
                // passing along all the site item information would be overkill
                attributes: {
                    id: siteItem.id,
                    url: siteItem.url
                }
            });
        });
        return { included, data };
    });
}

/* Copyright (c) 2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { registerForEvent } from "@esri/hub-events";
 * //
 * registerForEvent({
 *   groupId,
 *   authentication
 * })
 *   .then(response)
 * ```
 * Register for an ArcGIS Hub event.
 * @param requestOptions - request options that include authentication
 * @returns A Promise that will resolve with the response from the service.
 */
function registerForEvent(requestOptions) {
    return joinGroup({
        id: requestOptions.groupId,
        authentication: requestOptions.authentication
    });
}
/**
 * ```js
 * import { unregisterForEvent } from "@esri/hub-events";
 * //
 * unregisterForEvent({
 *   groupId,
 *   authentication
 * })
 *   .then(response)
 * ```
 * Unregister for an ArcGIS Hub event.
 * @param requestOptions - request options that include authentication
 * @returns A Promise that will resolve with the response from the service.
 */
function unregisterForEvent(requestOptions) {
    return leaveGroup({
        id: requestOptions.groupId,
        authentication: requestOptions.authentication
    });
}

/**
 * Attempts to add, invite, or email users about attending an event
 * depending on the requesting user's permissions (see addUsersToGroup in hub-common)
 *
 * @param {string} eventId
 * @param {IUser[]} usersToAdd
 * @param {IHubRequestOptions} primaryRO Info and authentication for the requesting user
 * @param {IEmail} [email] Email to be sent (if qualifying users are passed in)
 * @param {IHubRequestOptions} [secondaryRO] Info and authentication for emailing members of a secondary organization (typically a community org)
 *
 * @returns {IConsolidatedResult} The operations attempted, whether they were successful and any errors
 */
function addUsersToEvent(eventId, usersToAdd, primaryRO, email, secondaryRO) {
    return addUsersToGroup(eventId, usersToAdd, primaryRO, email, secondaryRO);
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

function getElementDir(el) {
  return getElementProp(el, 'dir', 'ltr');
}
function getElementTheme(el) {
  return getElementProp(el, 'theme', 'light');
}
function getElementProp(el, prop, value) {
  const closestWithProp = el.closest(`[${prop}]`);
  return closestWithProp ? closestWithProp.getAttribute(prop) : value;
}
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const readSessionFromCookie = () => {
  const b = document.cookie.match('(^|[^;]+)\\s*' + 'arcgis_hub_component_auth' + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : undefined;
};
const writeSessionToCookie = (session) => {
  const date = new Date();
  // two week expiration
  date.setTime(date.getTime() + (14 * 24 * 60 * 60 * 1000));
  document.cookie = `arcgis_hub_component_auth=${session.serialize()} ; expires=${date.toUTCString()} path=/`;
};
const authenticateUser = (clientId, orgurl) => {
  let session = readSessionFromCookie();
  return new Promise((resolve) => {
    if (!session) {
      // register your own app to create a unique clientId
      return UserSession.beginOAuth2({
        clientId: clientId,
        portal: `${orgurl}/sharing/rest`,
        redirectUri: `${window.location.origin}/authenticate.html`
      })
        .then(userSession => {
        alert('auth'); // eslint-disable-line
        writeSessionToCookie(userSession);
        session = userSession.serialize();
        resolve(session);
      }).catch(error => {
        console.error('Hub Components auth error', error);
      });
    }
    else {
      resolve(session);
    }
  });
};

const hubEventCss = ":host{display:block}a{color:var(--calcite-ui-text-link)}";

const HubEvent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * url of the ArcGIS Online organization
     */
    this.orgurl = "https://www.arcgis.com";
    // --------------------------------------------------------------------------
    //
    //  State
    //
    // --------------------------------------------------------------------------
    /**
     * Text to display on the button
     */
    this.callToActionText = "Register to Attend";
    /**
     * Current loading state of the card
     */
    this.loading = true;
    this.triggerRegister = () => {
      this.session = readSessionFromCookie();
      if (!this.session) {
        // register your own app to create a unique clientId
        return UserSession.beginOAuth2({
          clientId: this.clientid,
          portal: `${this.orgurl}/sharing/rest`,
          redirectUri: `${window.location}authenticate.html`
        })
          .then(session => {
          writeSessionToCookie(session);
          this.session = session.serialize();
          return this.toggleRegister();
        });
      }
      else {
        return this.toggleRegister();
      }
    };
    this.toggleRegister = () => {
      let authentication = UserSession.deserialize(this.session);
      // console.debug("HubComponents - HubEvent - logged in as ",authentication.username);
      if (!this.attending) {
        return registerForEvent({
          groupId: this.eventGroupId,
          authentication: authentication
        })
          .then(response => {
          if (response.success === true) {
            return Promise.resolve();
          }
        })
          .catch(err => {
          if (err.originalMessage === "User is already a member of group.") {
            return Promise.resolve();
          }
          else
            throw err;
        })
          .then(() => {
          this.callToActionText = this.callToActionText;
          this.attending = true;
          return { success: true };
        });
      }
      else {
        return unregisterForEvent({
          groupId: this.eventGroupId,
          authentication: authentication
        })
          .then(response => {
          if (response.success === true) {
            this.callToActionText = "Attend";
            this.attending = false;
            return { success: true };
          }
          else
            return { success: false };
        });
      }
    };
  }
  componentDidLoad() {
    // const hubAPI = 'https://hub.arcgis.com/api/v3/events/BBpPn9wZu2D6eTNY/Hub%20Events%20(public)/FeatureServer/0/95/attachments/40'
    getPortal(null, {
      portal: `${this.orgurl}/sharing/rest/`
    })
      .then(response => {
      getEventServiceUrl(response.id)
        .then(url => {
        this.eventServiceUrl = url;
        searchEvents({ url: this.eventServiceUrl })
          .then(response => {
          if (response.data.length > 0) {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].attributes.url === this.slug) {
                const eventDetails = response.data[i].attributes;
                this.eventTitle = eventDetails.title;
                this.eventLocation = eventDetails.location;
                this.eventDate = this.convertDate(eventDetails.startDate);
                this.eventGroupId = eventDetails.groupId;
                this.eventOrganizer = this.contactInfo(eventDetails);
                this.eventUrl = `${this.hubUrl()}/events/${eventDetails.url}`;
                // this.eventImage = `${eventServiceUrl}/${eventDetails.OBJECTID}/attachments`
                this.loading = false;
                break;
              }
            }
          }
        });
      });
    });
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  convertDate(dateInput) {
    let dateFormat = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' });
    let timeFormat = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' });
    let dateObj = new Date(dateInput);
    let dateStr = dateFormat.format(dateObj);
    let timeStr = timeFormat.format(dateObj);
    return `${dateStr} @ ${timeStr}`;
  }
  contactInfo(details) {
    if (details.organizers !== null) {
      const organizers = JSON.parse(details.organizers);
      if (organizers.length > 0) {
        const contact = `mailto:${organizers[0].contact}`;
        return `organized by: <a href=${contact}>${organizers[0].name}</a>`;
      }
    }
    // else
    return `organized by: ${details.organizerName}`;
  }
  description() {
    return (h("div", null, h("p", null, this.eventDate), h("p", null, this.eventLocation), h("p", { innerHTML: this.eventOrganizer })));
  }
  hubUrl() {
    return this.orgurl.slice().replace('maps', 'hub');
  }
  render() {
    let description = this.description();
    let hubUrl = this.hubUrl();
    const dir = getElementDir(this.el);
    return (h(Host, null, h("calcite-card", { dir: dir, loading: this.loading, selectable: false }, h("h3", { slot: "title" }, h("em", null, "Event"), h("br", null), h("a", { href: `${hubUrl}/events/${this.slug}` }, this.eventTitle)), h("span", { slot: "subtitle" }, description), h("calcite-button", { slot: "footer-leading", width: "full", onClick: this.triggerRegister.bind(this) }, this.callToActionText))));
  }
  get el() { return getElement(this); }
};
HubEvent.style = hubEventCss;

export { HubEvent as hub_event };
