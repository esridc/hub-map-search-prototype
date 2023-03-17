import { r as registerInstance, e as createEvent, h, g as getElement } from './index-d836c4a8.js';
import { c as createCommonjsModule } from './_commonjsHelpers-93ec9c7a.js';
import { U as UserSession } from './index-923d9554.js';
import { N as getUserContent, O as createFolder, e as updateItem, P as setItemAccess, Q as moveItem, d as removeItem, R as getItemStatus, T as exportItem, f as getItem, k as searchItems } from './index-bed14788.js';
import { G as parseDatasetId, aK as getExportItemTypeKeyword, aL as getExportLayerTypeKeyword, aM as getSpatialRefTypeKeyword, g as getProp, aN as buildExistingExportsPortalQuery } from './index-5ebfac40.js';
import { g as getService, b as getLayer } from './index-d6e159fc.js';
import { i as intlManager } from './intl-manager-cb377693.js';
import './index-5c68fb28.js';

var eventemitter3 = createCommonjsModule(function (module) {
'use strict';

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if ('undefined' !== 'object') {
  module.exports = EventEmitter;
}
});

/**
 * @ignore
 */
class RemoteServerError extends Error {
    constructor(message, url, status) {
        super(message);
        this.status = status;
        this.url = url;
    }
}

// TODO: next breaking change remove this
// and use buildUrl() from @esri/hub-common instead
/**
 * @private
 */
function urlBuilder(params) {
    const { host, route, query } = params;
    const baseUrl = host.endsWith("/") ? host : `${host}/`;
    const url = new URL(route, baseUrl);
    url.search = buildQueryString(query);
    return url.toString();
}
function buildQueryString(params = {}) {
    const queryParams = Object.keys(params)
        .filter(key => {
        return params[key] !== undefined;
    })
        .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
    }, {});
    return new URLSearchParams(queryParams).toString();
}
/**
 * @private
 */
function composeDownloadId(params) {
    const { datasetId, format, spatialRefId, geometry, where } = params;
    return `${datasetId}:${format}:${spatialRefId}:${geometry}:${where}`;
}

const HUB_FORMAT_LOOKUP = {
    Shapefile: "shp",
    CSV: "csv",
    "File Geodatabase": "fgdb",
    GeoJson: "geojson",
    KML: "kml"
};
/**
 * @private
 */
function convertToHubFormat(format) {
    if (!HUB_FORMAT_LOOKUP[format]) {
        throw new Error(`Unsupported Hub download format: ${format}`);
    }
    return HUB_FORMAT_LOOKUP[format];
}

/**
 * @private
 */
function hubRequestDownloadMetadata(params) {
    const { host, datasetId, spatialRefId, geometry, where } = params;
    const queryParams = {
        spatialRefId,
        formats: convertToHubFormat(params.format),
        geometry: geometry ? JSON.stringify(geometry) : undefined,
        where
    };
    const url = urlBuilder({
        host,
        route: `/api/v3/datasets/${datasetId}/downloads`,
        query: queryParams
    });
    return fetch(url)
        .then(resp => {
        const { ok, status, statusText } = resp;
        if (!ok) {
            throw new RemoteServerError(statusText, url, status);
        }
        return resp.json();
    })
        .then(json => {
        validateApiResponse(json);
        return formatApiResponse(json, composeDownloadId(params));
    });
}
function validateApiResponse({ data }) {
    if (!data) {
        throw new Error('Unexpected API response; no "data" property.');
    }
    if (!Array.isArray(data)) {
        throw new Error('Unexpected API response; "data" is not an array.');
    }
    if (data.length > 1) {
        throw new Error('Unexpected API response; "data" contains more than one download.');
    }
}
function formatApiResponse(json, downloadId) {
    const { data: [metadata] } = json;
    if (!metadata) {
        return {
            downloadId,
            status: "not_ready"
        };
    }
    const { attributes: { contentLastModified, lastModified, status, errors, contentLength, cacheTime, source: { lastEditDate } }, links: { content: downloadUrl } } = metadata;
    return {
        downloadId,
        contentLastModified,
        lastEditDate,
        lastModified,
        status,
        errors: errors || [],
        downloadUrl,
        contentLength,
        cacheTime
    };
}

/* istanbul ignore next */
class HubPoller {
    disablePoll() {
        clearInterval(this.pollTimer);
        this.pollTimer = null;
    }
    activatePoll(params) {
        const { downloadId, eventEmitter, pollingInterval, existingFileDate = new Date(0).toISOString(), } = params;
        const existingFileTimestamp = new Date(existingFileDate).getTime();
        this.pollTimer = setInterval(() => {
            hubRequestDownloadMetadata(params)
                .then((metadata) => {
                if (isReady(metadata, existingFileTimestamp)) {
                    eventEmitter.emit(`${downloadId}ExportComplete`, {
                        detail: { metadata },
                    });
                    return this.disablePoll();
                }
                if (exportDatasetFailed(metadata)) {
                    const { errors: [error], } = metadata;
                    eventEmitter.emit(`${downloadId}ExportError`, {
                        detail: { error, metadata },
                    });
                    return this.disablePoll();
                }
            })
                .catch((error) => {
                eventEmitter.emit(`${downloadId}PollingError`, {
                    detail: { error, metadata: { status: "error" } },
                });
                return this.disablePoll();
            });
        }, pollingInterval);
    }
}
/* istanbul ignore next */
/**
 * @private
 */
function hubPollDownloadMetadata(params) {
    const poller = new HubPoller();
    poller.activatePoll(params);
    return poller;
}
/* istanbul ignore next */
function isReady(metadata, preExportFileTimestamp) {
    const { status, lastModified } = metadata;
    const currentFileDate = new Date(lastModified).getTime();
    return (status === "ready" ||
        (status === "ready_unknown" && currentFileDate > preExportFileTimestamp));
}
/* istanbul ignore next */
function exportDatasetFailed(metadata) {
    return (metadata &&
        (metadata.status === "error_updating" ||
            metadata.status === "error_creating"));
}

/**
 * @private
 */
function getExportsFolderId(authentication) {
    return getUserContent({ authentication })
        .then((userContent) => {
        const exportFolder = userContent.folders.find((folder) => {
            return folder.title === "item-exports";
        });
        if (exportFolder) {
            return { folder: exportFolder };
        }
        return createFolder({ authentication, title: "item-exports" });
    })
        .then((response) => {
        const { folder } = response;
        return folder.id;
    });
}

var DownloadStatus;
(function (DownloadStatus) {
    DownloadStatus["READY"] = "ready";
    DownloadStatus["READY_UNKNOWN"] = "ready_unknown";
    DownloadStatus["STALE"] = "stale";
    DownloadStatus["NOT_READY"] = "not_ready";
    DownloadStatus["LOCKED"] = "locked";
    DownloadStatus["STALE_LOCKED"] = "stale_locked";
    DownloadStatus["DISABLED"] = "disabled";
    DownloadStatus["CREATING"] = "creating";
    DownloadStatus["UPDATING"] = "updating";
    DownloadStatus["ERROR_CREATING"] = "error_creating";
    DownloadStatus["ERROR_UPDATING"] = "error_updating";
    DownloadStatus["ERROR"] = "error";
})(DownloadStatus || (DownloadStatus = {}));

/**
 * @private
 */
class ExportCompletionError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, ExportCompletionError.prototype);
    }
}

/**
 * @private
 */
function exportSuccessHandler(params) {
    const { downloadId, datasetId, exportCreated, spatialRefId, eventEmitter, authentication, } = params;
    const { itemId, layerId } = parseDatasetId(datasetId);
    const typeKeywords = [
        getExportItemTypeKeyword(itemId),
        getExportLayerTypeKeyword(layerId),
        `modified:${exportCreated}`,
        getSpatialRefTypeKeyword(spatialRefId),
    ];
    return updateItem({
        item: {
            id: downloadId,
            typekeywords: typeKeywords.join(","),
        },
        authentication,
    })
        .then(() => {
        return setItemAccess({
            id: downloadId,
            authentication,
            access: "private",
        });
    })
        .then(() => {
        return getExportsFolderId(authentication);
    })
        .then((exportFolderId) => {
        return moveItem({
            itemId: downloadId,
            folderId: exportFolderId,
            authentication,
        });
    })
        .catch((err) => {
        if (err && err.code === "CONT_0011") {
            // Skipping file move, already exists in target folder
            return;
        }
        removeItem({
            id: downloadId,
            authentication,
        });
        throw new ExportCompletionError(err.message);
    })
        .then(() => {
        return eventEmitter.emit(`${downloadId}ExportComplete`, {
            detail: {
                metadata: {
                    downloadId,
                    status: DownloadStatus.READY,
                    lastModified: new Date().toISOString(),
                    downloadUrl: urlBuilder({
                        host: authentication.portal,
                        route: `content/items/${downloadId}/data`,
                        query: { token: authentication.token },
                    }),
                },
            },
        });
    });
}

class PortalPoller {
    disablePoll() {
        clearInterval(this.pollTimer);
        this.pollTimer = null;
    }
    activatePoll(params) {
        const { downloadId, datasetId, format, spatialRefId, jobId, authentication, exportCreated, eventEmitter, pollingInterval } = params;
        this.pollTimer = setInterval(() => {
            getItemStatus({
                id: downloadId,
                jobId,
                jobType: "export",
                authentication
            })
                .then((metadata) => {
                if (metadata.status === "completed") {
                    return exportSuccessHandler({
                        datasetId,
                        format,
                        authentication,
                        downloadId,
                        spatialRefId,
                        exportCreated,
                        eventEmitter
                    }).then(() => {
                        this.disablePoll();
                    });
                }
                if (metadata.status === "failed") {
                    eventEmitter.emit(`${downloadId}ExportError`, {
                        detail: {
                            error: new Error(metadata.statusMessage),
                            metadata: {
                                status: DownloadStatus.ERROR,
                                errors: [new Error(metadata.statusMessage)]
                            }
                        }
                    });
                    return this.disablePoll();
                }
            })
                .catch((error) => {
                if (error instanceof ExportCompletionError) {
                    eventEmitter.emit(`${downloadId}ExportError`, {
                        detail: {
                            error,
                            metadata: {
                                status: DownloadStatus.ERROR,
                                errors: [error]
                            }
                        }
                    });
                }
                else {
                    eventEmitter.emit(`${downloadId}PollingError`, {
                        detail: {
                            error,
                            metadata: {
                                status: DownloadStatus.ERROR,
                                errors: [error]
                            }
                        }
                    });
                }
                return this.disablePoll();
            });
        }, pollingInterval);
    }
}
/**
 * @private
 */
function portalPollExportJobStatus(params) {
    const poller = new PortalPoller();
    poller.activatePoll(params);
    return poller;
}

/**
 *
 * Poll the status of a download job / portal export. Emit event when completed
 * (with download link) or failed (with error)
 * @param params - parameters defining a dataset export job
 */
function pollDownloadMetadata(params) {
    const { target, downloadId, datasetId, jobId, format, authentication, exportCreated, eventEmitter, pollingInterval, spatialRefId, geometry, where, host, existingFileDate } = params;
    if (!target || target === "hub") {
        return hubPollDownloadMetadata({
            host,
            downloadId,
            datasetId,
            format,
            eventEmitter,
            pollingInterval,
            spatialRefId,
            geometry,
            where,
            existingFileDate
        });
    }
    return portalPollExportJobStatus({
        downloadId,
        datasetId,
        jobId,
        authentication,
        exportCreated,
        format,
        spatialRefId,
        eventEmitter,
        pollingInterval,
        geometry,
        where
    });
}

/**
 * @private
 */
function hubRequestDatasetExport(params) {
    const { host, datasetId, spatialRefId, geometry, where } = params;
    const body = {
        spatialRefId,
        format: convertToHubFormat(params.format),
        geometry,
        where
    };
    // TODO: add @esri/hub-common as a peer dependency  next breaking change
    // and use buildUrl() for the following:
    const url = urlBuilder({
        host,
        route: `/api/v3/datasets/${datasetId}/downloads`
    });
    // TODO: add @esri/hub-common as a peer dependency  next breaking change
    // and use hubRequest() for the following:
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(resp => {
        const { ok, status, statusText } = resp;
        if (!ok) {
            throw new RemoteServerError(statusText, url, status);
        }
        return undefined;
    })
        .then(() => {
        return { downloadId: composeDownloadId(params) };
    });
}

/**
 * @private
 */
function portalRequestDatasetExport(params) {
    const { datasetId, title, format, authentication } = params;
    // TODO: parseItemId()
    const [itemId] = datasetId.split("_");
    return exportItem({
        id: itemId,
        exportFormat: format,
        exportParameters: composeExportParameters(params),
        title,
        authentication
    }).then((resp) => {
        const { size, jobId, exportItemId } = resp;
        return {
            downloadId: exportItemId,
            jobId,
            size,
            exportCreated: Date.now()
        };
    });
}
function composeExportParameters(params) {
    const { datasetId, spatialRefId, where } = params;
    // TODO: move parseDatasetId() to hub-common and use that here
    const layerId = datasetId.split("_")[1];
    if (!layerId) {
        return spatialRefId ? { targetSR: { wkid: Number(spatialRefId) } } : {};
    }
    const layers = [{ id: Number(layerId), where }];
    return spatialRefId
        ? {
            layers,
            targetSR: {
                wkid: Number(spatialRefId)
            }
        }
        : { layers };
}

/**
 * ```js
 * import { requestDatasetExport } from "@esri/hub-downloads";
 *
 * Request an export of a dataset to a particular file format.
 * @param params - parameters defining a dataset export job
 */
function requestDatasetExport(params) {
    const { host, datasetId, format, spatialRefId, geometry, where, title, target, authentication } = params;
    if (!target || target === "hub") {
        return hubRequestDatasetExport({
            host,
            datasetId,
            format,
            spatialRefId,
            geometry,
            where
        });
    }
    return portalRequestDatasetExport({
        datasetId,
        format,
        title,
        authentication,
        spatialRefId,
        where
    });
}

var DownloadFormats;
(function (DownloadFormats) {
    DownloadFormats["Shapefile"] = "Shapefile";
    DownloadFormats["CSV"] = "CSV";
    DownloadFormats["KML"] = "KML";
    DownloadFormats["GeoJson"] = "GeoJson";
    DownloadFormats["Excel"] = "Excel";
    DownloadFormats["File Geodatabase"] = "File Geodatabase";
    DownloadFormats["Feature Collection"] = "Feature Collection";
    DownloadFormats["Scene Package"] = "Scene Package";
})(DownloadFormats || (DownloadFormats = {}));

const DOWNLOADS_LOCK_MS = 10 * 60 * 1000;
/**
 * @private
 */
function isRecentlyUpdated(target, lastEditDate) {
    return (target === "portal" &&
        lastEditDate &&
        new Date().getTime() - lastEditDate <= DOWNLOADS_LOCK_MS);
}
/**
 * @private
 */
function isDownloadEnabled(item, format) {
    const lowercasedFormat = format ? format.toLowerCase() : "";
    const isItemLevelDownloadEnabled = getProp(item, "properties.downloadsConfig.enabled") !== false;
    const formats = getProp(item, "properties.downloadsConfig.formats") || {};
    const isFormatDownloadEnabled = !formats[lowercasedFormat] || formats[lowercasedFormat].enabled !== false;
    return isItemLevelDownloadEnabled ? isFormatDownloadEnabled : false;
}

var ItemTypes;
(function (ItemTypes) {
    ItemTypes["FeatureService"] = "Feature Service";
    ItemTypes["MapService"] = "Map Service";
})(ItemTypes || (ItemTypes = {}));
const isCollectionType = (format) => format === DownloadFormats.CSV || format === DownloadFormats.KML;
/**
 * @private
 */
function portalRequestDownloadMetadata(params) {
    const { datasetId, authentication, format, spatialRefId, target, portal } = params;
    const { itemId, layerId } = parseDatasetId(datasetId);
    let serviceLastEditDate;
    let itemModifiedDate;
    let itemType;
    let fetchedItem;
    return getItem(itemId, { authentication, portal })
        .then((item) => {
        const { type, modified, url } = item;
        fetchedItem = item;
        itemModifiedDate = modified;
        itemType = type;
        return fetchCacheSearchMetadata({
            url,
            authentication,
            type,
            modified,
            format,
            layerId,
            portal,
        });
    })
        .then((metadata) => {
        const { modified, format: searchFormat } = metadata;
        serviceLastEditDate = modified;
        return searchItems({
            q: buildExistingExportsPortalQuery(itemId, {
                layerId,
                onlyTypes: [searchFormat],
                spatialRefId,
            }),
            num: 1,
            sortField: "modified",
            sortOrder: "DESC",
            authentication,
            portal,
        });
    })
        .then((searchResponse) => {
        return formatDownloadMetadata({
            cachedDownload: searchResponse.results[0],
            datasetId,
            format,
            spatialRefId,
            serviceLastEditDate,
            itemModifiedDate,
            itemType,
            authentication,
            target,
            item: fetchedItem,
            portal,
        });
    })
        .catch((err) => {
        throw err;
    });
}
function fetchCacheSearchMetadata(params) {
    const { format, layerId, url, type, modified, authentication, portal } = params;
    if (type !== ItemTypes.FeatureService && type !== ItemTypes.MapService) {
        return Promise.resolve({
            modified,
            format,
        });
    }
    return retryWithoutAuthOnFail(getService({ url, authentication, portal }))
        .then((response) => {
        const layers = response.layers || [];
        const promises = layers.map((layer) => {
            return retryWithoutAuthOnFail(getLayer({ url: `${url}/${layer.id}`, authentication, portal }));
        });
        return Promise.all(promises);
    })
        .then((layers) => {
        return {
            format: getPortalFormat({ format, layerId, layers }),
            modified: extractLastEditDate(layers),
        };
    });
}
function getPortalFormat(params) {
    const { format, layerId, layers } = params;
    const multilayer = isMultilayerRequest(layerId, layers);
    return multilayer && isCollectionType(format)
        ? `${format} Collection`
        : format;
}
function isMultilayerRequest(layerId, layers) {
    return layerId === undefined && layers.length > 1;
}
function extractLastEditDate(layers) {
    const result = layers
        .map((layer) => {
        const { editingInfo: { lastEditDate } = {} } = layer;
        return lastEditDate;
    })
        .filter((timestamp) => {
        return timestamp !== undefined;
    })
        .sort((a, b) => {
        return b - a;
    });
    return result[0];
}
function formatDownloadMetadata(params) {
    const { cachedDownload, serviceLastEditDate, authentication, target, item, format, portal, } = params;
    const lastEditDate = serviceLastEditDate === undefined
        ? undefined
        : new Date(serviceLastEditDate).toISOString();
    const { created, id } = cachedDownload || {};
    const recentlyUpdated = isRecentlyUpdated(target, serviceLastEditDate);
    const canDownload = isDownloadEnabled(item, format);
    const status = canDownload
        ? determineStatus(serviceLastEditDate, created, recentlyUpdated)
        : DownloadStatus.DISABLED;
    if (!cachedDownload) {
        return {
            downloadId: composeDownloadId(params),
            status,
            lastEditDate,
        };
    }
    return {
        downloadId: id,
        status,
        lastEditDate,
        contentLastModified: new Date(created).toISOString(),
        lastModified: new Date(created).toISOString(),
        downloadUrl: urlBuilder({
            host: portal || authentication.portal,
            route: `content/items/${id}/data`,
            query: { token: authentication === null || authentication === void 0 ? void 0 : authentication.token },
        }),
    };
}
function determineStatus(serviceLastEditDate, exportCreatedDate, recentlyUpdated) {
    if (!exportCreatedDate) {
        return recentlyUpdated ? DownloadStatus.LOCKED : DownloadStatus.NOT_READY;
    }
    if (!serviceLastEditDate) {
        return DownloadStatus.READY_UNKNOWN;
    }
    if (serviceLastEditDate > exportCreatedDate) {
        return recentlyUpdated ? DownloadStatus.STALE_LOCKED : DownloadStatus.STALE;
    }
    return DownloadStatus.READY;
}
/**
 * Takes a request promise and retries the request without authentication
 * if it fails.
 *
 * TODO - consider incorporating this into rest-js. Discussion at https://github.com/Esri/arcgis-rest-js/issues/920
 *
 * @param requestPromise
 * @private
 */
function retryWithoutAuthOnFail(requestPromise) {
    return requestPromise.catch((error) => {
        if (error.name === "ArcGISAuthError") {
            // try again with no auth
            return error.retry(() => Promise.resolve(null), 1);
        }
        else {
            throw error;
        }
    });
}

/**
 * ```js
 * import { requestDownloadMetadata } from "@esri/hub-downloads";
 * const params = {
 *   host: 'https://opendata.arcgis.com,
 *   datasetId: 'abcdef0123456789abcdef0123456789_0',
 *   format: 'CSV',
 *   target: 'hub'
 * };
 * requestDownloadMetadata(params)
 *   .then(response => {
 *     // {
 *     //   downloadId: 'abcdef0123456789abcdef0123456789_0::csv',
 *     //   contentLastModified: '2020-06-17T01:16:01.933Z',
 *     //   lastEditDate: '2020-06-18T01:17:31.492Z',
 *     //   lastModified: '2020-06-17T13:04:28.000Z',
 *     //   status: 'stale',
 *     //   downloadUrl: 'https://dev-hub-indexer.s3.amazonaws.com/files/dd4580c810204019a7b8eb3e0b329dd6/0/full/4326/dd4580c810204019a7b8eb3e0b329dd6_0_full_4326.csv',
 *     //   contentLength: 1391454,
 *     //   cacheTime: 13121
 *     // }
 *   });
 * ```
 * Fetch metadata for a Hub download.
 * @param {IDownloadMetadataRequestParams} params
 * @returns {Promise<ISearchResult>}
 */
function requestDownloadMetadata(params) {
    const { host, datasetId, spatialRefId, format, geometry, where, target, authentication, } = params;
    if (!target || target === "hub") {
        return hubRequestDownloadMetadata({
            host,
            datasetId,
            format,
            spatialRefId,
            geometry,
            where,
        });
    }
    return portalRequestDownloadMetadata({
        portal: `${host}/sharing/rest`,
        datasetId,
        format,
        authentication,
        spatialRefId,
        target,
    });
}

/* Copyright (c) 2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

function calculateSize(contentLength) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const bytes = contentLength;
  if (bytes === 0)
    return 'n/a';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  if (i === 0)
    return [bytes, sizes[i]];
  return [(bytes / (1024 ** i)).toFixed(1), sizes[i]];
}

const hubDownloadCardCss = ":host{font-size:1em}calcite-card div{font-size:1em}h3{font-size:1.25em}dl{font-size:inherit}dt,dd,calcite-dropdown-item{font-size:0.875em}dt{float:left;clear:left;margin-right:0.25rem}dt.ltr::after{content:':'}dd.rtl::after{content:':'}dd{margin:0px;padding:0px;margin-left:110px;-webkit-margin-start:0;margin-inline-start:0}a{vertical-align:middle}calcite-icon{margin-left:0.25rem}a:visited{color:inherit}calcite-dropdown{width:100%;--calcite-dropdown-width:100%}calcite-dropdown-item span{color:#323232}calcite-button{width:100%}calcite-card div{width:100%}";

const POLLING_INTERVAL = 5000;
const dateFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
function userCanExport(target, username) {
  // TODO - if the user is authenticated, this function should verify the user's export privs
  return (target === 'hub' || !!username);
}
const HubDownloadCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubDownloadCardResults = createEvent(this, "hubDownloadCardResults", 7);
    this.exportRequested = false;
    this.contentLengthString = null;
    this.poller = null;
    /**
     * API target for download requests. Public/Opendata downloads target `hub` (default), private downloads target 'portal', and Enterprise downloads target `enterprise`.
     */
    this.target = 'hub';
    /**
     * The well-known identifier of the coordinate system for the download data. Optional. For Hub API downloads, it must be either 4326 or the dataset's native coordinate system.
     */
    this.spatialRefId = '4326';
  }
  async componentWillLoad() {
    this.resetUndefinedProps();
    await this.setLocalization();
    this.setAuthentication();
    await this.fetchMetadataAndSetState();
    this.setTranslations();
  }
  resetUndefinedProps() {
    // Storybook knobs will set some of these to "undefined"
    ['spatialRefId', 'where', 'geometry', 'filename', 'target'].forEach(prop => {
      this[prop] = this[prop] === 'undefined' ? undefined : this[prop];
    });
    if (!this.spatialRefId) {
      this.spatialRefId = '4326';
    }
  }
  async setLocalization() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    // TODO: replace this w/ this.intl.formatDate()
    this.dateTimeFormatter = new Intl.DateTimeFormat(this.intl.locale, dateFormatOptions);
    // NOTE: ordinarily we'd just use this.intl.t() inline
    // but this component was already built around a hash of labels
    this.setLabels();
  }
  setLabels() {
    const labelKeys = ['buttonDownload', 'fileCreated', 'fileSize', 'buttonOptions', 'menuRequest'];
    this.labels = labelKeys.reduce((accum, key) => {
      accum[key] = this.intl.t(key);
      return accum;
    }, {});
  }
  setAuthentication() {
    if (this.username && this.token) {
      this.authentication = new UserSession({
        username: this.username,
        portal: `${this.host}/sharing/rest`,
        token: this.token,
      });
      this.authentication.getToken = () => new Promise((resolve) => {
        resolve(this.token);
      });
    }
  }
  setTranslations() {
    this.setContentLengthString();
  }
  setContentLengthString() {
    const { metadata: { contentLength } = {} } = this;
    if (contentLength) {
      const fileSize = calculateSize(contentLength);
      this.contentLengthString = typeof fileSize === 'string'
        ? this.intl.t(fileSize.toLowerCase()) // 'n/a'
        : `${fileSize[0]} ${this.intl.t(fileSize[1].toLowerCase())}`;
    }
  }
  async watchHandler() {
    this.resetUndefinedProps();
    await this.fetchMetadataAndSetState();
  }
  async disconnectedCallback() {
    this.resetUndefinedProps();
    if (this.poller) {
      this.poller.disablePoll();
    }
  }
  async fetchMetadataAndSetState() {
    if (this.poller) {
      this.poller.disablePoll();
    }
    const params = this.getServiceParams();
    try {
      this.metadata = await requestDownloadMetadata(params);
      this.pollingEvent = new eventemitter3();
      if (this.exportInProgress()) {
        this.poll();
      }
    }
    catch (error) {
      this.apiError = error;
    }
  }
  getServiceParams() {
    const params = {
      host: this.host,
      datasetId: this.datasetId,
      format: this.format,
      target: this.target,
      authentication: this.authentication,
      spatialRefId: this.spatialRefId,
    };
    if (this.where)
      params['where'] = this.where;
    if (this.geometry)
      params['geometry'] = this.geometry;
    return params;
  }
  poll() {
    const params = this.getServiceParams();
    this.pollingEvent.on(`${this.metadata.downloadId}ExportComplete`, this.exportDatasetComplete.bind(this));
    this.pollingEvent.on(`${this.metadata.downloadId}ExportError`, this.exportDatasetError.bind(this));
    this.pollingEvent.on(`${this.metadata.downloadId}PollingError`, this.exportPollingError.bind(this));
    this.poller = pollDownloadMetadata(Object.assign(Object.assign({}, params), { downloadId: this.metadata.downloadId, jobId: this.metadata.jobId, exportCreated: this.metadata.exportCreated, eventEmitter: this.pollingEvent, pollingInterval: POLLING_INTERVAL, existingFileDate: (new Date(this.metadata.lastModified || 0)).toISOString() }));
  }
  async download() {
    if (this.metadata && this.metadata.downloadUrl) {
      try {
        const file = this.transferFile(this.metadata.downloadUrl);
        this.hubDownloadCardResults.emit({ status: 'complete', context: 'cache', metadata: this.metadata });
        return file;
      }
      catch (error) {
        this.hubDownloadCardResults.emit({ status: 'error', context: 'cache', metadata: this.metadata });
        throw error;
      }
    }
    // In certain file states, the "Download" button actually triggers an export
    return await this.exportDataset();
  }
  transferFile(url) {
    if (this.format === 'Feature Collection') {
      return window.open(url);
    }
    return window.location.href = url;
  }
  async exportDataset() {
    this.exportRequested = true;
    this.metadata.status = this.downloadCached() ? 'updating' : 'creating';
    const params = Object.assign({ title: this.filename }, this.getServiceParams());
    try {
      const result = await requestDatasetExport(params);
      this.metadata = Object.assign(Object.assign({}, this.metadata), result);
      this.poll();
    }
    catch (error) {
      this.apiError = error;
      this.metadata.status = 'error';
      this.metadata.errors = [error];
    }
  }
  exportDatasetComplete(event) {
    this.exportDatasetHandler(event);
    this.hubDownloadCardResults.emit({ status: 'complete', context: 'export', metadata: this.metadata });
    if (this.exportRequested) {
      const { downloadUrl } = this.metadata;
      if (downloadUrl) {
        return this.transferFile(downloadUrl);
      }
    }
  }
  exportDatasetError(event) {
    this.exportDatasetHandler(event);
    this.hubDownloadCardResults.emit({ status: 'error', context: 'export', metadata: this.metadata });
  }
  exportPollingError(event) {
    this.apiError = event.detail.error;
    this.exportDatasetHandler(event);
    this.hubDownloadCardResults.emit({ status: 'error', context: 'export', metadata: this.metadata });
  }
  exportDatasetHandler(event) {
    this.metadata = Object.assign(Object.assign({}, this.metadata), event.detail.metadata);
    this.pollingEvent.off(`${this.metadata.downloadId}ExportComplete`, this.exportDatasetComplete);
    this.pollingEvent.off(`${this.metadata.downloadId}ExportError`, this.exportDatasetError);
    this.pollingEvent.off(`${this.metadata.downloadId}PollingError`, this.exportDatasetError);
  }
  renderNotice() {
    const { metadata, apiError, exportRequested } = this;
    const { status } = metadata || {};
    // TEMPORARY - Overwrite lock logic that remains in Hub.js for private downloads
    let modifiedStatus = status;
    if (status === 'locked') {
      modifiedStatus = 'not_ready';
    }
    else if (status === 'stale_locked') {
      modifiedStatus = 'stale';
    }
    const error = apiError ? apiError.status || apiError.message : undefined;
    return h("hub-download-notice", { "file-status": modifiedStatus, "export-requested": exportRequested, "api-error": error, "cannot-export": !userCanExport(this.target, this.username) });
  }
  exportInProgress() {
    const { metadata: { status } = {} } = this;
    return status === 'creating' || status === 'updating';
  }
  downloadCached() {
    const { metadata: { status } = {} } = this;
    return ['ready', 'ready_unknown', 'stale', 'stale_locked', 'updating', 'error_updating'].includes(status);
  }
  downloadUpToDate() {
    return this.metadata && this.metadata.status === 'ready';
  }
  isFormatDownloadDisabled() {
    return this.metadata && this.metadata.status === 'disabled';
  }
  renderFileDescription() {
    const fileDescription = [];
    const { metadata: { lastModified } = {} } = this;
    if (!this.downloadCached()) {
      return null;
    }
    if (lastModified) {
      if (this.intl.direction === 'rtl') {
        fileDescription.push(h("dt", null, this.dateTimeFormatter.format(new Date(lastModified))), h("dd", { class: "rtl" }, this.labels.fileCreated));
      }
      else {
        fileDescription.push(h("dt", { class: "ltr" }, this.labels.fileCreated), h("dd", null, this.dateTimeFormatter.format(new Date(lastModified))));
      }
    }
    if (this.contentLengthString) {
      if (this.intl.direction === 'rtl') {
        fileDescription.push(h("dt", null, this.contentLengthString), h("dd", { class: "rtl" }, this.labels.fileSize));
      }
      else {
        fileDescription.push(h("dt", { class: "ltr" }, this.labels.fileSize), h("dd", null, this.contentLengthString));
      }
    }
    return fileDescription;
  }
  renderDownloadControl() {
    if (this.shouldUseDownloadButton()) {
      return h("calcite-button", { width: "full", color: "blue", appearance: "outline", scale: "m", "icon-position": "start", disabled: this.shouldDisableDownload(), onClick: this.download.bind(this) }, this.labels.buttonDownload);
    }
    return (h("calcite-dropdown", { alignment: "start", scale: "m", type: "click", active: false }, h("calcite-button", { slot: "dropdown-trigger", color: "blue", appearance: "outline", scale: "m", "icon-end": "caretDown" }, this.labels.buttonOptions), h("calcite-dropdown-group", { "selection-mode": "none" }, h("calcite-dropdown-item", { tabindex: "0", role: "menuitem", "selection-mode": "none", onClick: this.exportDataset.bind(this), hidden: this.exportInProgress() }, h("span", null, this.labels.menuRequest)), h("calcite-dropdown-item", { tabindex: "0", role: "menuitem", "selection-mode": "none", onClick: this.download.bind(this) }, h("span", null, this.intl.t('menuDownload', { createdDate: this.dateTimeFormatter.format(new Date(this.metadata.lastModified)) }))))));
  }
  shouldUseDownloadButton() {
    return this.downloadUpToDate()
      || !this.downloadCached()
      || this.isFormatDownloadDisabled()
      || !userCanExport(this.target, this.username);
  }
  shouldDisableDownload() {
    return this.isFormatDownloadDisabled() || (this.exportInProgress() && !this.downloadCached());
  }
  render() {
    return (h("calcite-card", { dir: this.intl.direction }, h("h3", { slot: "title" }, this.name), h("dl", { slot: "subtitle" }, this.renderFileDescription()), h("div", { slot: "footer-leading" }, this.renderNotice(), this.renderDownloadControl())));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "host": ["watchHandler"],
    "datasetId": ["watchHandler"],
    "format": ["watchHandler"],
    "spatialRefId": ["watchHandler"],
    "where": ["watchHandler"],
    "geometry": ["watchHandler"],
    "target": ["watchHandler"],
    "username": ["watchHandler"],
    "token": ["watchHandler"]
  }; }
};
HubDownloadCard.style = hubDownloadCardCss;

export { HubDownloadCard as hub_download_card };
