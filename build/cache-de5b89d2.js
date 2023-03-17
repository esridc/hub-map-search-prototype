import { M as addUsersToGroup, g as getProp, u as includes, c as cloneObject, N as without, P as getWithDefault, Q as getHubProduct, S as getSubscriptionType, T as getCulture, U as convertToWellKnownLocale, V as fetchHubTranslation, W as emailOrgUsers, X as autoAddUsers, Y as inviteUsers, C as normalizeItemType, Z as getModelFromOptions, $ as withoutByProp, a0 as maybePush, a1 as failSafeUpdate, a2 as failSafe, a3 as unshareItemFromGroups, a4 as getModel, a5 as mapBy, a6 as unprotectModel, H as mergeObjects, a7 as serializeModel, a8 as deepSet, a9 as ensureUniqueString, aa as slugify, ab as shareItemToGroups, ac as uploadResourcesFromUrl, ad as propifyString, ae as createId, af as normalizeSolutionTemplateItem, ag as replaceItemId, ah as getItemAssets, ai as addSolutionResourceUrlToAssets, aj as interpolate, ak as getSiteById, al as buildDraft, am as objectToJsonBlob, an as SITE_SCHEMA_VERSION, ao as _ensureTelemetry, ap as _getDomainServiceUrl, b as getHubApiUrl, aq as _unprotectAndRemoveGroup, ar as _unprotectAndRemoveItem, as as getDomainsForSite, at as removeDomain, au as addDomain, e as getPortalApiUrl, av as _getHttpAndHttpsUris, J as camelize, aw as unique, ax as isGuid, ay as interpolateItemId, az as removeEmptyProps, aA as extend, aB as ensureUniqueDomainName, aC as stripProtocol, aD as upgradeSiteSchema, aE as batch, L as Logger, aF as getPortalUrl } from './index-5ebfac40.js';
import { n as searchGroups, w as createGroup, x as protectGroup, y as getGroup, z as getGroupUsers, A as searchGroupUsers, B as searchGroupContent, a as addGroupUsers, e as updateItem, u as unprotectGroup, r as removeGroup, C as removeGroupUsers, D as updateGroup, E as updateUserMemberships, d as removeItem, F as createItem, G as protectItem, s as shareItemWithGroup, m as getItemResources, H as removeItemResource, l as addItemResource, I as getItemResource, f as getItem, h as getItemData, J as getSelf, b as unprotectItem, k as searchItems, K as getUserUrl, L as joinGroup, M as leaveGroup, v as getUser } from './index-bed14788.js';
import { r as request } from './index-5c68fb28.js';

/**
 * Enum of the types of teams that the teams service supports
 */
const TEAMTYPES = [
    "core",
    "content",
    "followers",
    "team",
    "event",
    "edit",
];

/**
 * Attempts to Add, Invite, or email users about joining
 * a team depending on the requesting user's permissions
 * (see addUsersToGroup in hub-common)
 *
 * @param {string} groupId
 * @param {IUser[]} usersToAdd
 * @param {IHubRequestOptions} primaryRO Info and authentication for the requesting user
 * @param {IEmail} [email] Email to be sent (if qualifying users are passed in)
 * @param {IHubRequestOptions} [secondaryRO] Info and authentication for emailing members of a secondary organization (typically a community org)
 *
 * @returns {IConsolidatedResult} The operations attempted, whether they were successful and any errors
 */
function addUsersToTeam(teamId, usersToAdd, primaryRO, email, secondaryRO) {
    return addUsersToGroup(teamId, usersToAdd, primaryRO, email, secondaryRO);
}

/**
 * Hash of the team group templates.
 * This hash is used to determin what teams can be created in what products
 * based on what privs and stored in what properties
 * We define the various groups via json structures. The .config hash controls
 * the i18n, as well as the portal vs ago, and basic vs premium definition.
 * This allows us to add/remove/edit groups by simply modifying this hash
 * instead of spreading complex construction logic all over the application
 */
const WELLKNOWNTEAMS = [
    {
        config: {
            groupType: "Hub Collaboration Group",
            type: "core",
            availableIn: ["premium"],
            propertyName: "collaborationGroupId",
            requiredPrivs: ["portal:admin:createUpdateCapableGroup"],
            titleI18n: "collaborationTitle",
            descriptionI18n: "collaborationDesc",
            snippetI18n: "collaborationSnippet",
            privPropValues: [
                {
                    priv: "portal:user:addExternalMembersToGroup",
                    prop: "membershipAccess",
                    value: "collaboration",
                },
            ],
        },
        access: "org",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        capabilities: "updateitemcontrol",
        membershipAccess: "org",
        _edit_privacy: "on",
        _edit_contributors: "on",
        tags: [
            "Hub Group",
            "Hub Initiative Group",
            "Hub Site Group",
            "Hub Core Team Group",
            "Hub Team Group",
        ],
    },
    {
        config: {
            groupType: "Hub Collaboration Group",
            type: "core",
            availableIn: ["basic"],
            propertyName: "collaborationGroupId",
            requiredPrivs: ["portal:admin:createUpdateCapableGroup"],
            titleI18n: "collaborationTitleBasic",
            descriptionI18n: "collaborationDescBasic",
            snippetI18n: "collaborationSnippetBasic",
            privPropValues: [
                {
                    priv: "portal:user:addExternalMembersToGroup",
                    prop: "membershipAccess",
                    value: "collaboration",
                },
            ],
        },
        access: "org",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        capabilities: "updateitemcontrol",
        membershipAccess: "org",
        _edit_privacy: "on",
        _edit_contributors: "on",
        tags: [
            "Hub Group",
            "Hub Site Group",
            "Hub Core Team Group",
            "Hub Team Group",
        ],
    },
    {
        config: {
            groupType: "Portal Collaboration Group",
            type: "core",
            availableIn: ["portal"],
            propertyName: "collaborationGroupId",
            requiredPrivs: [
                "portal:user:createGroup",
                "portal:admin:createUpdateCapableGroup",
            ],
            titleI18n: "collaborationTitlePortal",
            descriptionI18n: "collaborationDescPortal",
            snippetI18n: "collaborationSnippetPortal",
        },
        access: "org",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        capabilities: "updateitemcontrol",
        _edit_privacy: "on",
        _edit_contributors: "on",
        tags: ["Sites Group", "Sites Core Team Group"],
    },
    {
        config: {
            groupType: "Hub Content Group",
            type: "content",
            availableIn: ["premium"],
            propertyName: "contentGroupId",
            requiredPrivs: ["portal:user:createGroup"],
            titleI18n: "contentTitle",
            descriptionI18n: "contentDesc",
            snippetI18n: "contentSnippet",
            privPropValues: [
                {
                    priv: "portal:user:addExternalMembersToGroup",
                    prop: "membershipAccess",
                    value: "",
                },
            ],
        },
        access: "public",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        membershipAccess: "org",
        tags: [
            "Hub Group",
            "Hub Content Group",
            "Hub Site Group",
            "Hub Initiative Group",
        ],
    },
    {
        config: {
            groupType: "Hub Content Group",
            type: "content",
            availableIn: ["basic"],
            propertyName: "contentGroupId",
            requiredPrivs: ["portal:user:createGroup"],
            titleI18n: "contentTitleBasic",
            descriptionI18n: "contentDescBasic",
            snippetI18n: "contentSnippetBasic",
            privPropValues: [
                {
                    priv: "portal:user:addExternalMembersToGroup",
                    prop: "membershipAccess",
                    value: "",
                },
            ],
        },
        access: "public",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        membershipAccess: "org",
        tags: ["Hub Group", "Hub Content Group", "Hub Site Group"],
    },
    {
        config: {
            groupType: "Portal Content Group",
            type: "content",
            availableIn: ["portal"],
            propertyName: "contentGroupId",
            requiredPrivs: ["portal:user:createGroup"],
            titleI18n: "contentTitle",
            descriptionI18n: "contentDescPortal",
            snippetI18n: "contentSnippetPortal",
        },
        access: "org",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        tags: ["Sites Group", "Sites Content Group"],
    },
    {
        // this is only ever created in AGO, so we don't have a second entry for followers
        config: {
            groupType: "Hub Followers Group",
            type: "followers",
            availableIn: ["premium"],
            propertyName: "followersGroupId",
            requiredPrivs: ["portal:user:createGroup"],
            titleI18n: "followersTitle",
            descriptionI18n: "followersDesc",
            snippetI18n: "followersSnippet",
            privPropValues: [
                {
                    priv: "portal:user:addExternalMembersToGroup",
                    prop: "membershipAccess",
                    value: "",
                },
            ],
        },
        access: "public",
        autoJoin: true,
        isInvitationOnly: false,
        isViewOnly: true,
        notificationsEnabled: true,
        sortField: "title",
        sortOrder: "asc",
        membershipAccess: "org",
        tags: [
            "Hub Group",
            "Hub Initiative Followers Group",
            "Hub Initiative Group",
        ],
    },
    {
        config: {
            groupType: "Generic AGO Site Team",
            type: "team",
            availableIn: ["basic"],
            requiredPrivs: ["portal:user:createGroup"],
            titleI18n: "teamTitle",
            descriptionI18n: "teamDesc",
            snippetI18n: "teamSnippet",
        },
        access: "org",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        tags: ["Site Team Group"],
    },
    {
        config: {
            groupType: "Generic AGO Initiative Team",
            type: "team",
            availableIn: ["premium"],
            requiredPrivs: [
                "portal:user:createGroup",
                "portal:user:addExternalMembersToGroup",
            ],
            titleI18n: "teamTitle",
            descriptionI18n: "teamDesc",
            snippetI18n: "teamSnippet",
        },
        access: "org",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        membershipAccess: "",
        tags: ["Hub Team Group"],
    },
    {
        config: {
            groupType: "Generic AGO Edit Supporting Team",
            type: "edit",
            availableIn: ["premium"],
            requiredPrivs: [
                "portal:user:createGroup",
                "portal:user:addExternalMembersToGroup",
            ],
            titleI18n: "teamTitle",
            descriptionI18n: "editTeamDesc",
            snippetI18n: "editTeamSnippet",
        },
        access: "org",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        capabilities: "updateitemcontrol",
        membershipAccess: "org",
        tags: ["Hub Team Group"],
        typekeyword: ["Hub Team", "Hub Edit Supporting Team"],
    },
    {
        config: {
            groupType: "Generic Portal Edit Supporting Team",
            type: "edit",
            availableIn: ["portal"],
            requiredPrivs: ["portal:user:createGroup"],
            titleI18n: "teamTitle",
            descriptionI18n: "editTeamDesc",
            snippetI18n: "editTeamSnippet",
        },
        access: "org",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        capabilities: "updateitemcontrol",
        membershipAccess: "org",
        tags: ["Site Team Group"],
        typekeyword: ["Site Team", "Site Edit Supporting Team"],
    },
    {
        config: {
            groupType: "Generic Portal Team",
            type: "team",
            availableIn: ["portal"],
            requiredPrivs: ["portal:user:createGroup"],
            titleI18n: "teamTitle",
            descriptionI18n: "teamDesc",
            snippetI18n: "teamSnippet",
        },
        access: "org",
        autoJoin: false,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "modified",
        sortOrder: "desc",
        tags: ["Site Team Group"],
    },
    {
        config: {
            groupType: "Generic Event Team",
            type: "event",
            availableIn: ["premium"],
            requiredPrivs: [
                "portal:user:createGroup",
                "portal:user:addExternalMembersToGroup",
            ],
            titleI18n: "eventTeamTitle",
            descriptionI18n: "eventTeamDesc",
            snippetI18n: "eventTeamSnippet",
        },
        access: "public",
        autoJoin: true,
        isInvitationOnly: false,
        isViewOnly: false,
        sortField: "title",
        sortOrder: "asc",
        membershipAccess: "",
        tags: ["Hub Group", "Hub Event Group", "Hub Initiative Group"],
    },
];

/**
 * Does a user have all the privileges in the passed in array
 * @param {current user from session} user
 * @param {array} privileges
 */
function hasAllPrivileges(user, privileges) {
    let result = false;
    // ensure we were passed an array...
    if (Array.isArray(privileges)) {
        result = privileges.every(priv => user.privileges.indexOf(priv) > -1);
    }
    return result;
}

/**
 * Predicate for filtering group templates based on product
 * and user privs required.
 * Param order is optimized for partial application
 * @param {object} user
 * @param {string} product basic, premium, portal
 * @param {object} template Team (group) template
 */
function canUserCreateTeamInProduct(user, product, template) {
    let result = false;
    const userGroups = getProp(user, "groups") || [];
    // can this be created in the current environment?
    if (userGroups.length < 507 &&
        includes(template.config.availableIn, product)) {
        // and user has required privs...
        result = hasAllPrivileges(user, template.config.requiredPrivs);
    }
    return result;
}

const ALLOWED_SUBSCRIPTION_TYPES = [
    "Demo & Marketing",
    "Demo and Marketing",
    "Organizational Plan",
    "Community",
    "In House",
    "ConnectED",
    "ELA",
    "Education Site License",
    "Education",
    "HUP Online",
];
/**
 * TODO: If/when AGO implements this logic or runs a script on their end we can remove
 * this logic, or simply return passed in user.
 * Returns a cloned copy of the user object with updated privileges
 * based on whether or not the user has a subscription type not in the
 * allowed list
 * @param {object} user
 * @param {string} subscriptionInfoType
 * @returns
 */
function removeInvalidPrivs(user, subscriptionInfoType) {
    // Clone User
    const clonedUser = cloneObject(user);
    // Get allowed list of sub types
    const allowedSubscriptionTypes = ALLOWED_SUBSCRIPTION_TYPES;
    // If portal self has a sub type OTHER than one of the allowed ones...
    if (!includes(allowedSubscriptionTypes, subscriptionInfoType)) {
        clonedUser.privileges = without(clonedUser.privileges, "portal:user:addExternalMembersToGroup");
    }
    return clonedUser;
}

/**
 * Updates template based upon new privPropValues property
 * In the templates config hash.
 * This allows us to conditionally change out parts of the template
 * @param {object} user
 * @param {object} template
 * @returns {object} Returns updated template
 */
function applyPrivPropValuesToTemplate(user, template) {
    const templateCopy = cloneObject(template);
    // Only two templates actually have this in config atm, so we want to be safe.
    const ppv = getWithDefault(template, "config.privPropValues", []);
    // iterate over privPropValues
    ppv.forEach((entry) => {
        // entry === each privPropValue obj { priv, prop, value}
        // If user privileges includes the privilege in privPropValue...
        if (includes(user.privileges, entry.priv)) {
            // update the group template with appropriate prop / value changes
            templateCopy[entry.prop] = entry.value; // for example updating the membershipAccess
        }
    });
    return templateCopy;
}

// TODO: Remove portalApiVersion at next breaking change
/**
 * Return array of group templates that the current user has licensing
 * and privs to create in the current environment (AGO vs Portal)
 * @param {object} user
 * @param {string} environment
 * @param {string} portalApiVersion
 * @param {string} subscriptionInfoType
 */
function getUserCreatableTeams(user, environment, portalApiVersion, // Depracated, remove at next breaking change
subscriptionInfoType = "") {
    /* tslint:disable no-console */
    console.warn("Hub.js::getUserCreatableTeams Deprecation warning portalApiVersion will be removed at v9.0.0");
    /* tslint:enable no-console */
    const teams = WELLKNOWNTEAMS;
    // Online is not properly respecting addExternalMembersToGroup for
    // certain subscription types known ones so far: Trial, personal use, developer, and evaluation
    const updatedUser = removeInvalidPrivs(user, subscriptionInfoType);
    // Update templates and remove the ones that aren't applicable.
    return cloneObject(teams).reduce((acc, teamTmpl) => {
        // Update template based on privPropValue
        const copyTemplate = applyPrivPropValuesToTemplate(updatedUser, teamTmpl);
        // If the user can create the team....
        if (canUserCreateTeamInProduct(updatedUser, environment, copyTemplate)) {
            // Add the team to the accumulator
            acc.push(copyTemplate);
        }
        return acc;
    }, []);
}

/**
 * Inject the translations into the Group object template
 * @param {object} template Json Template for the Group
 * @param {string} title Group Title
 * @param {object} translation Translation json
 * @private
 */
function _translateTeamTemplate(template, title, translation) {
    // the team template has the i18n keys in a configuration hash
    // we iterate those properties...
    ["titleI18n", "descriptionI18n", "snippetI18n"].forEach(key => {
        // get the actual i18n key from the template itself
        const i18nKey = template.config[key];
        // compute the target property name by removing the I18n
        const targetProp = key.replace("I18n", "");
        // get the translation out of the translation file we fetched
        const val = getProp(translation, `addons.services.teams.groups.${i18nKey}`);
        // interpolate the title name into the translation string
        template[targetProp] = val.replace(/{title}/g, title);
    });
    return template;
}

/**
 * Does a group with the specified title exist in the users org?
 * @param {String} title Group Title
 * @param {IHubRequestOptions} hubRequestOptions
 */
function doesGroupExist(title, hubRequestOptions) {
    const orgId = hubRequestOptions.portalSelf.id;
    const searchOpts = {
        q: `(title:"${title}" accountid:${orgId})`,
        authentication: hubRequestOptions.authentication
    };
    return searchGroups(searchOpts)
        .then(searchResponse => searchResponse.results.length > 0)
        .catch(err => {
        throw Error(`Error in team-utils::doesGroupExist ${err}`);
    });
}

/**
 * Given a title, construct a group title that is unique
 * in the user's org.
 * Given a title of "Medical Team", if a group with that title exists
 * this fn will add a number on the end, and increment until
 * an available group title is found - i.e. "Medical Team 3"
 * @param {String} title Group Title to ensure if unique
 * @param {IHubRequestOptions} hubRequestOptions
 * @param {Number} step Number to increment. Defaults to 0
 */
function getUniqueGroupTitle(title, hubRequestOptions, step = 0) {
    let combinedName = title;
    if (step) {
        combinedName = `${title} ${step}`;
    }
    return doesGroupExist(combinedName, hubRequestOptions)
        .then(result => {
        if (result) {
            step++;
            return getUniqueGroupTitle(title, hubRequestOptions, step);
        }
        else {
            return combinedName;
        }
    })
        .catch(err => {
        throw Error(`Error in team-utils::getUniqueGroupTitle ${err}`);
    });
}

/**
 * Portal Priviledges required to set group access to specific levels
 */
const GROUP_ACCESS_PRIVS = {
    public: ["portal:user:createGroup", "portal:user:shareGroupToPublic"],
    org: ["portal:user:createGroup", "portal:user:shareGroupToOrg"],
    private: ["portal:user:createGroup"]
};

/**
 * Returns the allowed group access based on a user's privileges
 * and org level settings
 * @param requestedAccess public || org || private
 * @param user User object w/ privileges array
 * @param portal optional
 */
function getAllowedGroupAccess(requestedAccess, user, portal) {
    // portal-wide flag takes presidence, and is not sync'd with privs
    const portalWideCanSharePublic = getProp(portal, "canSharePublic") || false;
    // compute what access level the current user can create the group with
    const canCreatePublic = portalWideCanSharePublic &&
        hasAllPrivileges(user, GROUP_ACCESS_PRIVS.public);
    const canCreateOrg = hasAllPrivileges(user, GROUP_ACCESS_PRIVS.org);
    // default to the requested access...
    let result = requestedAccess;
    // if they requested public, but can't make public...
    if (requestedAccess === "public" && !canCreatePublic) {
        // step down to org...
        result = "org";
        // but if they can't do that...
        if (!canCreateOrg) {
            // then do private
            result = "private";
        }
    }
    else {
        // if the requsted access was not public, it's either org or private
        // and if they can't create do org...
        if (requestedAccess === "org" && !canCreateOrg) {
            // must be private
            result = "private";
        }
    }
    return result;
}

/**
 * Create a team group. Will ensure the team name is unique in the users org
 * and return the group, with appropriate `.userMembership` attached.
 * @param {Object} user Current User
 * @param {Object} group Group to create
 * @param {IHubRequestOptions} hubRequestOptions
 * @private
 */
function _createTeamGroup(user, group, hubRequestOptions) {
    group.access = getAllowedGroupAccess(group.access, user, hubRequestOptions.portalSelf);
    return getUniqueGroupTitle(group.title, hubRequestOptions)
        .then(uniqueTitle => {
        group.title = uniqueTitle;
        return createGroup({
            group: group,
            authentication: hubRequestOptions.authentication
        });
    })
        .then(createResponse => {
        group.id = createResponse.group.id;
        return protectGroup({
            id: group.id,
            authentication: hubRequestOptions.authentication
        });
    })
        .then(() => {
        group.userMembership = {
            username: user.username,
            memberType: "owner",
            applications: 0
        };
        return group;
    })
        .catch(ex => {
        throw Error(`Error in team-utils::_createTeamGroup ${ex}`);
    });
}

/**
 * Internal: Actually create the team groups
 * @param {String} title Title for the Team group
 * @param {Array} groupTemplates Array of group definitions to create the groups
 * @param {IHubRequestOptions} hubRequestOptions
 * @private
 */
function _createTeamGroups(title, groupTemplates, translations, hubRequestOptions) {
    // now translate the templates...
    const translatedTemplates = groupTemplates.map(tmpl => {
        return _translateTeamTemplate(tmpl, title, translations);
    });
    // now we actually create the groups... obvs async...
    return Promise.all(translatedTemplates.map(grpTmpl => {
        return _createTeamGroup(hubRequestOptions.portalSelf.user, grpTmpl, hubRequestOptions);
    }))
        .then(groups => {
        // hoist out the id's into a structure that has the groupnameProperty: id
        const props = groups.reduce((acc, grp) => {
            // assign to the property, if one is specified
            if (grp.config.propertyName) {
                acc[grp.config.propertyName] = grp.id;
            }
            return acc;
        }, {});
        // remove config node
        groups.forEach(g => delete g.config);
        // construct the return the hash...
        // props: the props which can be spread into the item.properties hash..
        // groups: the array of groups that were created
        return {
            props,
            groups: groups
        };
    })
        .catch(ex => {
        throw Error(`Error in team-utils::_createTeamGroups ${ex}`);
    });
}

/**
 * Create a single Team, using the same logic as creating multiple Teams.
 * Also allows a set of custom props to be passed in and applied to the team.
 *
 * This should be used PRIOR to creating Sites/Initiatives.
 * @param {ICreateHubTeamOptions} createHubTeamOptions
 */
function createHubTeam(opts) {
    const { title, type, props, hubRequestOptions } = opts;
    // validate that the type is valid...
    if (TEAMTYPES.indexOf(type) === -1) {
        throw new Error(`createHubTeam was passed ${type} which is not a valid type of team. Please send one of: ${TEAMTYPES.join(",")}`);
    }
    // get all the groups the current user can create...
    // filter just the ones that match type...
    const portalSelf = hubRequestOptions.portalSelf;
    const product = getHubProduct(portalSelf);
    const subscriptionType = getSubscriptionType(portalSelf);
    const groupsToCreate = getUserCreatableTeams(portalSelf.user, product, portalSelf.currentVersion, subscriptionType)
        .filter((g) => {
        return g.config.type === type;
    })
        .map((grp) => {
        // If props are passed in, spread them over the group object, but only if type === `team`
        if (grp.config.type === "team") {
            return Object.assign({}, grp, props);
        }
        else {
            return grp;
        }
    });
    // use the locale of the current user, or en-us as a fall-back
    const culture = getCulture(hubRequestOptions);
    const locale = convertToWellKnownLocale(culture);
    // Fire that off
    return fetchHubTranslation(locale, hubRequestOptions.portalSelf)
        .then((translations) => {
        // delegate to createTeamGroups
        return _createTeamGroups(title, groupsToCreate, translations, hubRequestOptions);
    })
        .catch((ex) => {
        throw Error(`Error in team-utils::createHubTeam ${ex}`);
    });
}

/**
 * Create all the groups (aka Teams) required for a Site or Initiative
 * The group names are derived from the Site/Initiative title. Group names
 * must be unique on create, so if necessary we will increment the names
 * after translation. If you need to ADD a Team to an existing Site/Initiative,
 * use the teams-service::addTeams function
 * @param {ICreateHubTeamsOptions} createHubTeamsOptions
 */
function createHubTeams(opts) {
    const { title, types, hubRequestOptions } = opts;
    const product = getHubProduct(hubRequestOptions.portalSelf);
    // get all the groups that this user can create in this environment
    // and filter just the team types requested
    const subscriptionType = getSubscriptionType(hubRequestOptions.portalSelf);
    const teamsToCreate = getUserCreatableTeams(hubRequestOptions.portalSelf.user, product, hubRequestOptions.portalSelf.currentVersion, subscriptionType).filter((g) => {
        return types.indexOf(g.config.type) > -1;
    });
    // get the culture out of the
    const culture = getCulture(hubRequestOptions);
    const locale = convertToWellKnownLocale(culture);
    // Fire that off
    return fetchHubTranslation(locale, hubRequestOptions.portalSelf)
        .then((translations) => {
        // create the team groups
        return _createTeamGroups(title, teamsToCreate, translations, hubRequestOptions);
    })
        .catch((ex) => {
        throw Error(`Error in team-utils::createHubTeams ${ex}`);
    });
}

/**
 * Search for teams
 * @param {ISearchOptions} searchRequestOptions
 * @returns {Promise<ISearchResult>}
 * @private
 */
function _searchTeams(searchRequestOptions) {
    return searchGroups(searchRequestOptions);
}

/**
 * Determine if the current user can create a specific type of team
 * @param {Object} user Current User
 * @param {HubTeamType} hubTeamType
 * @param {*} hubRequestOptions
 */
function canUserCreateTeam(user, hubTeamType, hubRequestOptions) {
    const userGroups = getProp(user, "groups") || [];
    if (userGroups.length > 510) {
        return false;
    }
    else {
        const portalSelf = hubRequestOptions.portalSelf;
        const product = getHubProduct(portalSelf);
        const subscriptionType = getSubscriptionType(portalSelf);
        // get all the groups the user can create in this product...
        return getUserCreatableTeams(user, product, portalSelf.currentVersion, subscriptionType).some((t) => t.config.type === hubTeamType);
    }
}

/**
 * Return a map from the team names to the property names
 * @param {string} product Product Name (basic, premium, enterprise)
 */
function getTeamPropertiesMapForProduct(product) {
    // basic and enterprise, it's just the content group
    const map = {
        content: "contentGroupId",
        core: "collaborationGroupId"
    };
    // premium, we add core and followers
    if (product === "premium") {
        map.followers = "followersGroupId";
    }
    return map;
}

// TODO: at next breaking change remove portalApiVersion param
/**
 * Given a product, return the groups templates that are available
 * @param {string} product Product name portal | basic | premium
 */
function getTeamsAvailableInProduct(product, portalApiVersion // DEPRECATED
) {
    /* tslint:disable no-console */
    console.warn("Hub.js::getTeamsAvailableInProduct Deprecation warning portalApiVersion will be removed at v9.0.0");
    /* tslint:enable no-console */
    const teams = WELLKNOWNTEAMS;
    const filterFn = (tmpl) => {
        return tmpl.config.availableIn.indexOf(product) > -1;
    };
    return cloneObject(teams).filter(filterFn);
}

/**
 * Get the template for a team. This should be used sparingly,
 * usually when you need some of the default properties of the
 * group, but in a context outside of the normal team-service functions.
 * @param {string} team core \ content | followers | team
 * @param {string} product basic | premium | portal
 * @param {string} portalApiVersion portal version
 */
function getTeamTemplate(type, product, portalApiVersion) {
    return getTeamsAvailableInProduct(product, portalApiVersion).find(t => {
        return t.config.type === type;
    });
}

/**
 * Get the types of teams that can be created given the product
 * @param {string} product Product name portal | basic | premium
 */
function getTeamTypesAvailableInProduct(product, portalApiVersion) {
    return getTeamsAvailableInProduct(product, portalApiVersion).map(team => {
        return team.config.type;
    });
}

function getTeamsForProduct(product) {
    const teams = ["content", "core"];
    if (product === "premium") {
        teams.push("followers");
    }
    return teams;
}

/**
 * Enum of the types of teams mapped to their item properties
 */
const TYPEMAP = {
    core: "collaborationGroupId",
    content: "contentGroupId",
    followers: "followersGroupId"
};

/**
 * Get a team by id
 * @param {string} id group id
 * @param {IRequestOptions} hubRequestOptions
 * @returns {Promise<IGroup>}
 */
function getTeamById(id, hubRequestOptions) {
    return getGroup(id, hubRequestOptions);
}

/**
 * Get the users(usernames ONLY) that are members of the Group that backs the Team
 * @param {string} id group id
 * @param {IRequestOptions} hubRequestOptions
 * @returns {Promise<IGroupUsersResult>}
 */
function getTeamMembers(id, hubRequestOptions) {
    return getGroupUsers(id, hubRequestOptions);
}

/**
 * Get the users(actual USER OBJECTS) that are members of the Group that backs the Team
 * @param {string} id group id
 * @param {ISearchGroupUsersOptions} searchOptions
 * @returns {Promise<ISearchGroupUsersResult>}
 */
function searchTeamMembers(id, searchOptions) {
    return searchGroupUsers(id, searchOptions);
}

/**
 * Get the content of a team
 * @param {ISearchGroupContentOptions} searchOptions
 * @returns {Promise<ISearchResult<IItem>>}
 */
function searchTeamContent(searchOptions) {
    return searchGroupContent(searchOptions);
}

/**
 * Checks if user has access to edit a team
 * @param {IGroup} group
 * @param {IUser} user
 * @returns {boolean}
 */
function canEditTeam(group, user) {
    var _a, _b;
    const memberType = (_a = group.userMembership) === null || _a === void 0 ? void 0 : _a.memberType;
    const userName = (_b = group.userMembership) === null || _b === void 0 ? void 0 : _b.username;
    return (userName === user.username &&
        (memberType === "owner" || memberType === "admin"));
}

/**
 * @private
 * Returns an empty instance of the addorinviteresponse object.
 * We are using this because if you leave out any of the props
 * from the final object and you are concatting together arrays you can concat
 * an undeifined inside an array which will throw off array lengths.
 *
 * @export
 * @return {IAddOrInviteResponse}
 */
async function handleNoUsers(context, userType, shouldEmail) {
    return {
        notAdded: [],
        notEmailed: [],
        notInvited: [],
        users: [],
        errors: [],
    };
}

/**
 * @private
 * Auto add N users to a single group, with users added as admins of that group
 *
 * @export
 * @param {string} id Group ID
 * @param {IUser[]} admins array of users to add to group as admin
 * @param {IAuthenticationManager} authentication authentication manager
 * @return {IAddGroupUsersResult} Result of the transaction (null if no users are passed in)
 */
function autoAddUsersAsAdmins(id, admins, authentication) {
    let response = Promise.resolve(null);
    if (admins.length) {
        const args = {
            id,
            admins: admins.map((a) => a.username),
            authentication,
        };
        response = addGroupUsers(args);
    }
    return response;
}

/**
 * @private
 * Governs the logic for emailing N users. It acts under the assumption
 * that all the 'community' users are the ones being emailed (this is due to platform rules we conform to)
 * Function is called upstream depending on if an email object is attached to the context.
 * Email object contains its own auth as it'll require the community admin to send the email itself.
 * An individual email call goes out for each user due to how the response of multiple users in a single call works.
 *
 * @export
 * @param {IAddOrInviteContext} context context object
 * @return {IAddOrInviteResponse} response object
 */
async function processEmailUsers(context) {
    // Fetch users out of context. We only email community users so we are
    // explicit about that
    const users = getProp(context, "community");
    const notEmailed = [];
    let errors = [];
    // iterate through users as we want a distinct email call per user due to how
    // batch email will only respond with success: true/false
    // and if there is an error then it gets priority even though successes do still go through
    for (const user of users) {
        // Make email call...
        const emailResponse = await emailOrgUsers([user], getProp(context, "email.message"), getProp(context, "email.auth"), true);
        // If it's just a failed email
        // then add username to notEmailed array
        if (!emailResponse.success) {
            notEmailed.push(user.username);
            // If there was a legit error
            // Then only the error returns from
            // online. Add error AND include username in notEmailed array.
            if (emailResponse.errors) {
                errors = errors.concat(emailResponse.errors);
            }
        }
    }
    // if you leave out any of the props
    // from the final object and you are concatting together arrays you can concat
    // an undeifined inside an array which will throw off array lengths.
    return {
        users: users.map((u) => u.username),
        notEmailed,
        errors,
        notInvited: [],
        notAdded: [],
    };
}

/**
 * @private
 * Governs logic for automatically adding N users to a group.
 * Users are added as either a regular user OR as an administrator of the group
 * depending on the addUserAsGroupAdmin prop on the IAddOrInviteContext.
 * If there is an email object on the IAddOrInviteContext, then email notifications are sent.
 *
 * @export
 * @param {IAddOrInviteContext} context context object
 * @param {string} userType what type of user is it: org | world | community
 * @param {boolean} [shouldEmail=false] should the user be emailed?
 * @return {IAddOrInviteResponse} response object
 */
async function processAutoAddUsers(context, userType, shouldEmail = false) {
    // fetch users out of context object
    const users = getProp(context, userType);
    let autoAddResponse;
    let emailResponse;
    let notAdded = [];
    let errors = [];
    // fetch addUserAsGroupAdmin out of context
    const { addUserAsGroupAdmin } = context;
    if (addUserAsGroupAdmin) {
        // if is core team we elevate user to admin
        autoAddResponse = await autoAddUsersAsAdmins(getProp(context, "groupId"), users, getProp(context, "primaryRO"));
    }
    else {
        // if not then we are just auto adding them
        autoAddResponse = await autoAddUsers(getProp(context, "groupId"), users, getProp(context, "primaryRO"));
    }
    // handle notAdded users
    if (autoAddResponse.notAdded) {
        notAdded = notAdded.concat(autoAddResponse.notAdded);
    }
    // Merge errors into empty array
    if (autoAddResponse.errors) {
        errors = errors.concat(autoAddResponse.errors);
    }
    // run email process
    if (shouldEmail) {
        emailResponse = await processEmailUsers(context);
        // merge errors in to overall errors array to keep things flat
        if (emailResponse.errors && emailResponse.errors.length > 0) {
            errors = errors.concat(emailResponse.errors);
        }
    }
    // if you leave out any of the props
    // from the final object and you are concatting together arrays you can concat
    // an undeifined inside an array which will throw off array lengths.
    return {
        users: users.map(u => u.username),
        notAdded,
        errors,
        notEmailed: (emailResponse === null || emailResponse === void 0 ? void 0 : emailResponse.notEmailed) || [],
        notInvited: [],
    };
}

/**
 * @private
 * Governs the logic for inviting N users to a single group.
 * An individual invite call goes out for each user and the results are consolidated.
 * See comment in function about the for...of loop which explains reasoning.
 *
 * @export
 * @param {IAddOrInviteContext} context context object
 * @param {string} userType what type of user is it: org | world | community
 * @return {IAddOrInviteResponse} response object
 */
async function processInviteUsers(context, userType) {
    // Fetch users out of context based on userType
    const users = getProp(context, userType);
    const notInvited = [];
    let errors = [];
    const { addUserAsGroupAdmin } = context;
    // iterate through users as we want a distinct invite call per user due to how
    // batch invites will only respond with success: true/false
    // and if there is an error then it gets priority even though successes do still go through
    for (const user of users) {
        // Invite users call
        const inviteResponse = await inviteUsers(getProp(context, "groupId"), [user], getProp(context, "primaryRO"), 20160, // timeout
        addUserAsGroupAdmin ? "group_admin" : "group_member" // if we are in a core team we want to invite them as a group admin, otherwise a group member
        );
        // If it's just a failed invite then
        // add username to notInvited array
        if (!inviteResponse.success) {
            notInvited.push(user.username);
            // If there was a legit error
            // Then only the error returns from
            // online. Add error AND include username in notInvited array.
            if (inviteResponse.errors) {
                errors = errors.concat(inviteResponse.errors);
            }
        }
    }
    // if you leave out any of the props
    // from the final object and you are concatting together arrays you can concat
    // an undeifined inside an array which will throw off array lengths.
    return {
        users: users.map((u) => u.username),
        notInvited,
        errors,
        notEmailed: [],
        notAdded: [],
    };
}

/**
 * @private
 * Handles add/invite logic for community users
 * It returns either an empty instance of the addOrInviteResponse
 * object, or either ther esponse from processing auto adding
 * users or inviting users. If an email has been passed in it also notifies
 * processAutoAddUsers that emails should be sent.
 *
 * @export
 * @param {IAddOrInviteContext} context context object
 * @return {IAddOrInviteResponse} response object
 */
async function addOrInviteCommunityUsers(context) {
    // We default to handleNoUsers
    // we return an empty object because
    // if you leave out any of the props
    // from the final object and you are concatting together arrays you can concat
    // an undeifined inside an array which will throw off array lengths.
    let fnToCall = handleNoUsers;
    let shouldEmail = false;
    // If community users were passed in...
    if (context.community && context.community.length > 0) {
        // Default to either autoAdd or invite based on canAutoAddUser.
        fnToCall = context.canAutoAddUser
            ? processAutoAddUsers
            : processInviteUsers;
        // If we have an email object
        // Then we will auto add...
        // But whether or not we email is still in question
        if (context.email) {
            // If the email object has the groupId property...
            if (context.email.hasOwnProperty("groupId")) {
                // If the email objects groupId property is the same as the current groupId in context...
                // (This function is part of a flow that could work for N groupIds)
                if (context.email.groupId === context.groupId) {
                    // Then we auto add and send email
                    fnToCall = processAutoAddUsers;
                    shouldEmail = true;
                } // ELSE if the groupId's do NOT match, we will fall back
                // To autoAdd or invite as per line 32.
                // We are doing the above logic (lines 43 - 47) because
                // We wish to add users to core teams, followers, and content teams
                // but only to email the core team.
            }
            else {
                // If it does not have a groupId at all then we will autoAdd and email.
                fnToCall = processAutoAddUsers;
                shouldEmail = true;
            }
        }
    }
    // Return/call the function
    return fnToCall(context, "community", shouldEmail);
}

/**
 * @private
 * Handles add/invite logic for Org users
 * It returns either an empty instance of the addOrInviteResponse
 * object, or either ther esponse from processing auto adding a users or inviting a user
 *
 * @export
 * @param {IAddOrInviteContext} context context object
 * @return {IAddOrInviteResponse} response object
 */
async function addOrInviteOrgUsers(context) {
    // If there are no org users return handling no users
    if (!context.org || context.org.length === 0) {
        // we return an empty object because
        // if you leave out any of the props
        // from the final object and you are concatting together arrays you can concat
        // an undeifined inside an array which will throw off array lengths.
        return handleNoUsers();
    }
    // for org user if you have assignUsers then auto add the user
    // if not then invite the user
    return context.canAutoAddUser
        ? processAutoAddUsers(context, "org")
        : processInviteUsers(context, "org");
}

/**
 * @private
 * Handles add/invite logic for world users
 * It either returns an empty instance of the add/invite response
 * object, or a populated version from processInviteUsers
 *
 * @export
 * @param {IAddOrInviteContext} context Context object
 * @return {IAddOrInviteResponse} Response object
 */
async function addOrInviteWorldUsers(context) {
    // If there are no world users return handling no users
    if (!context.world || context.world.length === 0) {
        // we return an empty object because
        // if you leave out any of the props
        // from the final object and you are concatting together arrays you can concat
        // an undeifined inside an array which will throw off array lengths.
        return handleNoUsers();
    }
    // process invite
    return processInviteUsers(context, "world");
}

/**
 * @private
 * Takes users array and sorts them into an object by the type of user they are
 * based on the orgType prop (world|org|community)
 *
 * @export
 * @param {IUserWithOrgType[]} users array of users
 * @return {IUserOrgRelationship} Object of users sorted by type (world, org, community)
 */
function groupUsersByOrgRelationship(users) {
    return users.reduce((acc, user) => {
        // keyof needed to make bracket notation work without TS throwing a wobbly.
        const orgType = user.orgType;
        acc[orgType].push(user);
        return acc;
    }, { world: [], org: [], community: [], partnered: [] });
}

/**
 * Takes array of group ids, if it is a core team, and teams status
 * and returns array of groups
 *
 * @param {array} groupIds Array of group ids
 * @param {boolean} isCoreTeam is this a core team?
 * @param {ITeamsStatus} teamsStatus status of main teams associated with site (core, content, followers)
 */
function teamsToAddUsersTo(groupIds, isCoreTeam, teamsStatus) {
    // If it's a core team && we have the teamsStatus
    if (isCoreTeam && teamsStatus) {
        // Array<keyof etc is needed due to bracket notation to prevent TS from throwing a wobbly
        ["content", "followers"].forEach((teamProp) => {
            if (teamsStatus[teamProp] && teamsStatus[teamProp].isOk) {
                groupIds.push(teamsStatus[teamProp].id);
            }
        });
    }
    return groupIds;
}

/**
 * Given an item, a teamType and a user, return the status
 * of the team ('ok', 'missing', 'broken', 'fixable' ), along
 * with specific details:
 * id: id of the group
 * isMissing: was the group simply never created?
 * isBroken: true if the item has an id for the group, but the group can not be found
 * canFix: true if user can create the group
 * If a team that a route depends on returns `isBroken` the route should redirect
 * to /teams/repair, which will do a full inspection, list things that are broken
 * and then conduct any repairs that can be done. It will list the issues, with
 * the intent of training customers to NOT mess with Team groups in AGO.
 * Once repairs are complete, the user will click a button to return to the route they
 * we attempting to enter before this diversion.
 *
 * @export
 * @param {IItem} item Site or Initiative ITEM (not model)
 * @param {("core" | "content" | "followers")} teamType Type of team to check for
 * @param {IUser} user User Object
 * @param {IHubRequestOptions} ro Auth
 * @return {*}  {Promise<ITeamStatus>}
 */
async function getTeamStatus(item, teamType, user, ro) {
    // Set up Team status result object
    const result = {
        teamType,
        id: null,
        isOk: false,
        isMissing: true,
        isBroken: false,
        canFix: false,
        isMember: false,
    };
    // Get id out of item.properties.[the team type]
    const id = getProp(getProp(item, "properties"), TYPEMAP[teamType]);
    // If there's an id...
    if (id) {
        try {
            // Check to see if the team exists
            const group = await getTeamById(id, ro);
            // if it does..
            if (group) {
                result.id = id;
                result.isOk = true;
                result.isMissing = false;
            }
            else {
                // If it doesn't, then check to see if user can Create team
                result.id = id;
                result.isBroken = true;
                result.canFix = await canUserCreateTeam(user, teamType, ro);
            }
        }
        catch (ex) {
            // If the search errors then check if user can create team
            result.id = id;
            result.isBroken = true;
            result.canFix = await canUserCreateTeam(user, teamType, ro);
        }
    }
    else {
        // If there is not an id then check if the user can create the team
        result.canFix = await canUserCreateTeam(user, teamType, ro);
    }
    return result;
}

/**
 * Add or invite N users to a single team
 * Org|community|world logic flows are run even if there are no users applicable for that particular path.
 * Results from each path are consolidated and surfaced in the return object as failures and errors are of
 * more importance than successes.
 *
 * @export
 * @param {string} groupId Group we are adding users to
 * @param {IUserWithOrgType[]} users array of users to add
 * @param {IAuthenticationManager} primaryRO primary requestOptions
 * @param {boolean} canAutoAddUser Can we automatically add a user to the team?
 * @param {boolean} addUserAsGroupAdmin Should the user be added as a group administrator
 * @param {IAddOrInviteEmail} email Email object
 * @return {IAddOrInviteToTeamResult} Result object
 */
async function addOrInviteUsersToTeam(groupId, users, primaryRO, canAutoAddUser, addUserAsGroupAdmin, email) {
    // Group users by their org relationship
    const parsedUsers = groupUsersByOrgRelationship(users);
    // build up params for the context
    const inputParams = {
        groupId,
        primaryRO,
        allUsers: users,
        canAutoAddUser,
        addUserAsGroupAdmin,
        email,
    };
    // create context from params and parsed users
    const context = Object.assign(inputParams, parsedUsers);
    // result obj by org relationship
    const result = {
        community: await addOrInviteCommunityUsers(context),
        org: await addOrInviteOrgUsers(context),
        world: await addOrInviteWorldUsers(context),
        notAdded: [],
        notInvited: [],
        notEmailed: [],
        errors: [],
        groupId,
    };
    // Bring not added / invited / emailed / errors up to the top level
    result.notAdded = [
        ...result.community.notAdded,
        ...result.org.notAdded,
        ...result.world.notAdded,
    ];
    result.notInvited = [
        ...result.community.notInvited,
        ...result.org.notInvited,
        ...result.world.notInvited,
    ];
    result.notEmailed = [
        ...result.community.notEmailed,
        ...result.org.notEmailed,
        ...result.world.notEmailed,
    ];
    result.errors = [
        ...result.community.errors,
        ...result.org.errors,
        ...result.world.errors,
    ];
    return result;
}

/**
 * addOrInviteUsersToTeams adds/invites N users to N teams
 * Initial entry point function for add/invite members flow
 * when dealing with multiple teams.
 * Responses from each group are then consolidated into the final returned object.
 *
 * @export
 * @param {string[]} groupIds array of groups we are adding users to
 * @param {IUserWithOrgType[]} users array of users to add to those teams
 * @param {IAuthenticationManager} primaryRO primary requestOptions
 * @param {boolean} [canAutoAddUser=false] Can we automatically add a user to the team?
 * @param {boolean} [addUserAsGroupAdmin=false] Can the user be added to a team as an administrator of that team?
 * @param {IAddOrInviteEmail} [email] Email object contains auth for the email && the email object itself
 * @return {*}  {Promise<{
 *   notAdded: string[];
 *   notInvited: string[];
 *   notEmailed: string[];
 *   errors: ArcGISRequestError[];
 *   responses: IAddOrInviteToTeamResult[];
 * }>} Results object
 */
async function addOrInviteUsersToTeams(groupIds, users, primaryRO, canAutoAddUser = false, addUserAsGroupAdmin = false, email) {
    let notAdded = [];
    let notInvited = [];
    let notEmailed = [];
    let errors = [];
    const responses = [];
    // need to for..of loop this as a reduce will overwrite promises during execution
    // this way we get an object of each group id nicely.
    for (const groupId of groupIds) {
        // For each group we'll add the users to them.
        const result = await addOrInviteUsersToTeam(groupId, users, primaryRO, canAutoAddUser, addUserAsGroupAdmin, email);
        // attach each groups results
        responses.push(result);
        // surface results to the top of the stack...
        notAdded = notAdded.concat(result.notAdded);
        errors = errors.concat(result.errors);
        notInvited = notInvited.concat(result.notInvited);
        notEmailed = notEmailed.concat(result.notEmailed);
    }
    // Return built up result object.
    return {
        notAdded,
        notInvited,
        notEmailed,
        errors,
        responses,
    };
}

/**
 * Removes a Team from N hub models.
 * First, if passed deleteTeam, it will delete the team
 * Then it iterates over an array of IModels and removes the given team ID from their teams array
 *
 * @export
 * @param {string} teamId Team ID of the team we are removing
 * @param {IModel[]} models Array of IModels
 * @param {UserSession} authentication Auth
 * @return {*}  {Promise<IUpdateItemResponse[]>}
 */
async function removeTeamFromItems(teamId, models, authentication) {
    // Iterate over all items...
    return Promise.all(models.map((model) => {
        // clone the item before modifying
        const clonedModel = cloneObject(model);
        // remove the id from the item.properties.teams array
        clonedModel.item.properties.teams = without(clonedModel.item.properties.teams, teamId);
        // Check if the user has access to edit the item. itemControl is only present when the item is directly fetched
        // 
        return clonedModel.item.itemControl === "admin" || clonedModel.item.itemControl === "update"
            // If yes, then update the item
            ? updateItem({
                item: clonedModel.item,
                authentication,
            })
            // Otherwise return a 'fail' state for that item specifically
            : { id: clonedModel.item.id, success: false };
    }));
}

/**
 * removeTeam unprotects a group, then deletes it
 *
 * @export
 * @param {string} id Team Id
 * @param {UserSession} authentication authentication
 * @return {*}  {Promise<{groupId: string; success: boolean}>}
 */
async function removeTeam(id, authentication) {
    // unprotect the group
    const unprotectResult = await unprotectGroup({ id, authentication });
    // If that succeeded...
    return unprotectResult.success
        // Remove it.
        ? removeGroup({ id, authentication })
        // Otherwise return a fail state
        : { groupId: id, success: false };
}

/**
 * Remove N users from team. Acts as a wrapper around removeGroupUsers from arcgis-rest-portal
 *
 * @export
 * @param {string} id Group Id
 * @param {string[]} users Array of usernames to remove
 * @param {IAuthenticationManager} authentication auth
 * @return {*}  {Promise<IRemoveGroupUsersResult>}
 */
async function removeUsersFromTeam(id, users, authentication) {
    return removeGroupUsers({
        id,
        users,
        authentication,
    });
}

/**
 * Removes N users from N teams. Calls removeUsersFromTeam on each of the N teams
 *
 * @export
 * @param {string[]} teamIds Array of team ids
 * @param {string[]} usernames Array of usernames to remove
 * @param {IAuthenticationManager} ro Auth
 * @return {*}  {Promise<IRemoveGroupUsersResult[]>}
 */
async function removeUsersFromTeams(teamIds, usernames, ro) {
    return Promise.all(teamIds.map((id) => removeUsersFromTeam(id, usernames, ro)));
}

/**
 * Updates a group. Wrapper around updateGroup from arcgis-rest-portal
 *
 * @export
 * @param {IGroup} group Group object that's being updated
 * @param {IAuthenticationManager} authentication Auth
 * @return {*}  {Promise<{ success: boolean; groupId: string }>}
 */
async function updateTeam(group, authentication) {
    return updateGroup({ group, authentication });
}

/**
 * Updates users membership to admin or member, acts as a wrapper for updateUserMemberships from arcgis-rest-portal
 *
 * @export
 * @param {string} id Group id that the members belong to
 * @param {string[]} users Array of usernames to update membership level on
 * @param {("member" | "admin")} newMemberType The type of user to update the users to
 * @param {UserSession} authentication authentication
 * @return {*}  {Promise<IUpdateGroupUsersResult>}
 */
async function updateUserMembership(id, users, newMemberType, authentication) {
    return updateUserMemberships({
        id,
        users,
        newMemberType,
        authentication,
    });
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

/**
 * This is the list of page model properties
 * that are included in a page's draft
 */
const PAGE_DRAFT_INCLUDE_LIST = [
    "item.title",
    "item.snippet",
    "data.values.layout"
];

/**
 * This is the list of site model properties
 * that are included in a site's draft
 */
const SITE_DRAFT_INCLUDE_LIST = [
    "item.title",
    "item.snippet",
    "item.properties.schemaVersion",
    "data.values.layout",
    "data.values.theme",
    "data.values.headerCss",
    "data.values.headerSass",
    "data.values.footerSass",
    "data.values.footerCss",
    "data.values.faviconUrl",
    "data.values.telemetry",
    "data.values.map",
    "data.values.capabilities",
    "data.values.contentViews",
];

const UNPUBLISHED_CHANGES_KW = "state:hasUnpublishedChanges";

/**
 * Determines whether an item is a site item or not
 * @param item - the item
 */
function isSite(item) {
    return normalizeItemType(item) === "Hub Site Application";
}

/**
 * Remove a Site from the Page's list of sites it is connected to
 * @param {String} siteId Id of the site to unlink from the page
 * @param {Object} pageModel Page Model
 */
function removeSiteFromPage(siteId, pageModel) {
    // look for the site in the page hash...
    return getWithDefault(pageModel, "data.values.sites", []).filter((e) => {
        return e.id !== siteId;
    });
}

/**
 * Unlink a Page from a Site and vice-versa
 * This is a super tolerant function. It can be passed ids, models or a mix.
 * It will handle either the site or the page items being missing
 * It will handle cases where the current user lacks update privs to either item or rights
 * to change the sharing. Of course in those cases we clearly can't make the changes, and
 * this function will resolve as though they were made, usually the UI tier will have
 * ensured that the current user has write access to at least one of the main entities
 * @param {IUnlinkRequestOptions} unlinkRequestOptions {siteModel || siteId, pageModel || pageId, authorization...}
 */
function unlinkSiteAndPage(unlinkRequestOptions) {
    let unshareGroups = [];
    const promises = [];
    let pageModel;
    let siteModel;
    const requestOptions = {
        authentication: unlinkRequestOptions.authentication
    };
    // get the models from the options...
    return Promise.all([
        getModelFromOptions("page", unlinkRequestOptions),
        getModelFromOptions("site", unlinkRequestOptions)
    ])
        .then(models => {
        [pageModel, siteModel] = models;
        // Handle the site
        if (!siteModel.isMissing) {
            const pages = getWithDefault(siteModel, "data.values.pages", []);
            // remove the page from the pages array on the model
            siteModel.data.values.pages = withoutByProp("id", pageModel.item.id, pages);
            // collect the groups we'll unshare the page from
            unshareGroups = maybePush(getProp(siteModel, "item.properties.collaborationGroupId"), unshareGroups);
            unshareGroups = maybePush(getProp(siteModel, "item.properties.contentGroupId"), unshareGroups);
            // update the site, but failSafe so we don't have to do any checking if the current user can update it
            promises.push(failSafeUpdate(siteModel, requestOptions));
        }
        // Handle the page
        if (!pageModel.isMissing) {
            const sites = getWithDefault(pageModel, "data.values.sites", []);
            // remove site from sites array on the model
            pageModel.data.values.sites = withoutByProp("id", siteModel.item.id, sites);
            promises.push(failSafeUpdate(pageModel, requestOptions));
            // now about the groups
            const failSafeUnshare = failSafe(unshareItemFromGroups);
            promises.push(failSafeUnshare(pageModel.item.id, unshareGroups, requestOptions));
        }
        return Promise.all(promises);
    })
        .then(() => {
        // return the updated models
        return {
            pageModel,
            siteModel
        };
    });
}

/**
 * Remove a Page Item. This deletes the item.
 * @param {Object | String} idOrModel Model object or Item Id
 * @param {IRequestOptions} requestOptions
 */
function removePage(idOrModel, requestOptions) {
    let modelPromise = Promise.resolve(idOrModel);
    if (typeof idOrModel === "string") {
        modelPromise = getModel(idOrModel, requestOptions);
    }
    let pageModel;
    // fire it to get the model...
    return modelPromise
        .then((model) => {
        pageModel = model;
        // get the id's of the sites this page is linked to...
        const linkedSites = mapBy("id", getWithDefault(pageModel, "data.values.sites", []));
        // we need to unlink the page from all sites. However, these calls *could* fail
        // if the current user lacks rights to save the site item, so we just make sure these
        // always resolve. In the Ember service code, we used `allSettled` but that's RSVP special sauce
        const failSafeUnlink = failSafe(unlinkSiteAndPage);
        return Promise.all(linkedSites.map((siteId) => {
            const opts = Object.assign({
                pageModel,
                siteId,
            }, requestOptions);
            return failSafeUnlink(opts);
        }));
    })
        .then(() => {
        return unprotectModel(pageModel, requestOptions);
    })
        .then(() => {
        const opts = Object.assign({ id: pageModel.item.id }, requestOptions);
        return removeItem(opts);
    });
}

/**
 * Update a Page item
 * @param {Object} model Page Model
 * @param {IUpdatePageOptions} updateSiteOptions
 *
 * This function supports the equivalent of a PATCH REST operation
 * It will fetch the current item from ago, and then apply
 * a subset of property changes to the model if a patchList is included.
 * The patchList can include any property paths on the item.
 * If the list is empty, then the entire page model is overwritten.
 * TODO: Add calls to remove unused image resources
 */
function updatePage(model, updateSiteOptions) {
    const patchList = Array.isArray(updateSiteOptions.allowList)
        ? updateSiteOptions.allowList
        : [];
    // store info about last update and who did it
    model.data.values.updatedAt = new Date().toISOString();
    model.data.values.updatedBy = updateSiteOptions.authentication.username;
    // nuke out the url property just for good measure
    model.item.url = "";
    let prms = Promise.resolve(model);
    if (patchList.length) {
        prms = getModel(getProp(model, "item.id"), updateSiteOptions);
    }
    return prms.then(modelFromAGO => {
        if (patchList.length) {
            // "patch" operation
            model = mergeObjects(model, modelFromAGO, patchList);
        }
        // update it
        const opts = Object.assign({ item: serializeModel(model) }, updateSiteOptions);
        opts.params = { clearEmptyFields: true };
        return updateItem(opts);
    });
}

/**
 * Get the correct url used to edit the page
 * @param item the page item
 * @param isPortal from appSettings.isPortal
 * @param siteUrl the url of the parent site
 */
function getPageEditUrl(item, isPortal, siteUrl) {
    let prefix = "";
    if (isPortal) {
        prefix = siteUrl;
    }
    return `${prefix}/edit?pageId=${item.id}`;
}

function getPaths(componentName) {
    switch (componentName) {
        case "webmap-card":
            return ["component.settings.webmap"];
        case "survey-card":
            return ["component.settings.surveyId"];
        case "app-card":
            return ["component.settings.itemId"];
        case "summary-statistic-card":
            return ["component.settings.itemId"];
        case "items/gallery-card":
            return ["component.settings.ids"];
        default:
            return [];
    }
}
/**
 * Find all the paths dependencies for the given card
 *
 * @param {ICard} card
 */
function getCardDependencies(card) {
    const componentName = getProp(card, "component.name");
    const paths = getPaths(componentName);
    return paths.reduce(collectAndFlattenPropertyValues(card), []);
}
function collectAndFlattenPropertyValues(card) {
    return (acc, path) => {
        const propertyValue = getProp(card, path);
        if (!propertyValue) {
            return acc;
        }
        if (Array.isArray(propertyValue)) {
            return acc.concat(propertyValue);
        }
        else {
            return acc.concat([propertyValue]);
        }
    };
}

/**
 * Find all the cards for the given row
 *
 * @param {IRow} row
 */
function getRowDependencies(row) {
    return row.cards.reduce((deps, card) => {
        const cardDeps = getCardDependencies(card);
        if (cardDeps.length) {
            deps = deps.concat(cardDeps);
        }
        return deps;
    }, []);
}

/**
 * Find all the row and card dependencies for the given section
 *
 * @param {ISection} section
 */
function getSectionDependencies(section) {
    return section.rows.reduce((deps, row) => {
        return deps.concat(getRowDependencies(row));
    }, []);
}

/**
 * Find all the section/row/card dependencies for the given layout
 *
 * @param {ILayout} layout
 */
function getLayoutDependencies(layout) {
    return layout.sections.reduce((deps, section) => {
        return deps.concat(getSectionDependencies(section));
    }, []);
}

/**
 * Return a list of items this page depends on
 */
function getPageDependencies(model) {
    const layout = getWithDefault(model, "data.values.layout", {});
    return getLayoutDependencies(layout);
}

/**
 * The item type depends if the app is running
 * in ArcGIS Enterprise vs AGO
 * @param {boolean} isPortal Is this running in Enterprise?
 */
function getPageItemType(isPortal) {
    let type = "Hub Page";
    if (isPortal) {
        type = "Site Page";
    }
    return type;
}

const PAGE_TYPE_KEYWORD = "hubPage";

/**
 * Given a Page Model, ensure that it has all the requires properties set correctly
 * and return a new object
 * @param {Object} pageModel Page Model object
 * @param {Object} options {username, isPortal}
 */
function ensureRequiredPageProperties(pageModel, options) {
    // clone
    const result = cloneObject(pageModel);
    result.item.owner = options.username;
    result.item.access = "private";
    if (!result.data.values) {
        result.data.values = {};
    }
    result.data.values.updatedAt = new Date().toISOString();
    result.data.values.updatedBy = options.username;
    if (!result.data.values.sites) {
        result.data.values.sites = [];
    }
    // NOTE: until we have hub-home, we are setting the page url to ''
    if (result.item.url) {
        result.item.url = "";
    }
    result.item.type = getPageItemType(options.isPortal);
    // ensure it has the typeKeyword
    if (result.item.typeKeywords.indexOf(PAGE_TYPE_KEYWORD) === -1) {
        result.item.typeKeywords.push(PAGE_TYPE_KEYWORD);
    }
    return result;
}

const PAGE_TEMPLATE_KEYWORD = "hubPageTemplate";

/**
 * Link a Page and a Site, or vice-versa
 * This is a super tolerant function. It can be passed id's, models or a mix.
 * It will handle either the site or the page items being missing
 * It will handle cases where the current user lacks update privs to either item or rights
 * to change the sharing. Of course in those cases we clearly can't make the changes, and
 * this function will resolve as though they were made, usually the UI tier will have
 * ensured that the current user has write access to at least one of the main entities
 * @param {ILinkPageAndSiteRequestOptions} linkRequestOptions {siteModel || siteId, pageModel || pageId, authorization }
 */
function linkSiteAndPage(linkRequestOptions) {
    let shareGroups = [];
    const promises = [];
    let pageModel;
    let siteModel;
    const requestOptions = { authentication: linkRequestOptions.authentication };
    // get the models from the options...
    return Promise.all([
        getModelFromOptions("page", linkRequestOptions),
        getModelFromOptions("site", linkRequestOptions)
    ])
        .then(models => {
        // Should we handle either item being inaccessible?
        [pageModel, siteModel] = models;
        if (!siteModel.isMissing && !pageModel.isMissing) {
            // ensure we actually got a page and site
            if (!isSite(siteModel.item) ||
                !includes(["Hub Page", "Site Page"], pageModel.item.type)) {
                return Promise.resolve([]);
            }
            // if we got a both...
            // Link the Site into the Page...
            const siteEntry = {
                id: siteModel.item.id,
                title: siteModel.item.title
            };
            if (!getProp(pageModel, "data.values.sites")) {
                deepSet(pageModel, "data.values.sites", []);
            }
            const sites = getProp(pageModel, "data.values.sites");
            const hasSiteAlready = includes(sites.map((p) => p.id), siteEntry.id);
            if (!hasSiteAlready) {
                pageModel.data.values.sites.push(siteEntry);
                const opts = Object.assign({ item: serializeModel(pageModel) }, requestOptions);
                // Not failsafe - could reject
                promises.push(updateItem(opts));
            }
            // Link the Page into the Site
            const pageEntry = {
                id: pageModel.item.id,
                title: pageModel.item.title
            };
            if (!getProp(siteModel, "data.values.pages")) {
                deepSet(siteModel, "data.values.pages", []);
            }
            const pages = getProp(siteModel, "data.values.pages");
            const hasPageAlready = includes(pages.map((p) => p.id), pageEntry.id);
            if (!hasPageAlready) {
                const slugs = mapBy("slug", pages);
                // use the passed in slug, or generate a unique slug and add to the page entry...
                pageEntry.slug =
                    linkRequestOptions.pageSlug ||
                        ensureUniqueString(slugs, slugify(pageEntry.title));
                // push entry into pages array...
                siteModel.data.values.pages.push(pageEntry);
                // update the site item...
                const opts = Object.assign({ item: serializeModel(siteModel) }, requestOptions);
                // Not failsafe - could reject
                promises.push(updateItem(opts));
            }
            // Now we need to handle sharing of the Page to the site Collab & Content groups
            // The share functions handle pre-flights so we don't need to be concerned if the page is
            // somehow already shared to the group.
            shareGroups = maybePush(getProp(siteModel, "item.properties.collaborationGroupId"), shareGroups);
            shareGroups = maybePush(getProp(siteModel, "item.properties.contentGroupId"), shareGroups);
            // NOTE: Since sharing is limited to the owner || admin we failSafe the calls, and hope for the best.
            const failSafeShare = failSafe(shareItemToGroups);
            promises.push(failSafeShare(pageEntry.id, shareGroups, requestOptions));
            // return all the promises...
            return Promise.all(promises);
        }
        else {
            let msg = `The Page item (${pageModel.item.id}) is inaccessible.`;
            if (siteModel.isMissing) {
                if (pageModel.isMissing) {
                    msg = `Both the Page item (${pageModel.item.id}) and the Site item (${siteModel.item.id}) are inaccssible`;
                }
                else {
                    msg = `The Site item (${siteModel.item.id}) is inaccessible.`;
                }
            }
            throw new Error(`Linking Failed: ${msg}`);
        }
    })
        .then(() => {
        // Downside of optionally pusing entries into a promise array, is that you don't really know
        // what is in what index, so we really can't use the return values...
        return {
            pageModel,
            siteModel
        };
    })
        .catch((err) => {
        throw Error(`Error occured linking site ${siteModel.item.id} with ${pageModel.item.id}: ${err}`);
    });
}

/**
 * Given a Page model, create the item, protect it, share it, connect it to the site
 * and upload any resources.
 * @param {Object} model Page model to be created as an Item
 * @param {Object} options object containing shareTo, and space for future additions
 * @param {IHubRequestOptions} hubRequestOptions IRequestOptions object, with isPortal
 */
function createPage(model, options, hubRequestOptions) {
    // ensure we got authentication
    if (!hubRequestOptions.authentication) {
        throw new Error(`createPage must be passed hubRequestOptions.authentication`);
    }
    // ensure props
    const newPage = ensureRequiredPageProperties(model, {
        username: hubRequestOptions.authentication.username,
        isPortal: hubRequestOptions.isPortal
    });
    // convert to a flat object w. .data --> .text as a json string
    const serializedModel = serializeModel(newPage);
    // create the item
    return createItem({
        item: serializedModel,
        owner: newPage.item.owner,
        authentication: hubRequestOptions.authentication
    })
        .then(createResponse => {
        // hold onto the Id so we can return a complete model
        newPage.item.id = createResponse.id;
        // protect it
        return protectItem({
            id: newPage.item.id,
            owner: newPage.item.owner,
            authentication: hubRequestOptions.authentication
        });
    })
        .then(protectReponse => {
        // share to any groups
        let sharingPromises = [];
        if (Array.isArray(options.shareTo) && options.shareTo.length) {
            // map over the array sharing the item to all groups
            sharingPromises = options.shareTo.map((groupInfo) => {
                return shareItemWithGroup({
                    id: newPage.item.id,
                    groupId: groupInfo.id,
                    authentication: hubRequestOptions.authentication,
                    confirmItemControl: groupInfo.confirmItemControl || false
                });
            });
            newPage.item.access = "shared";
        }
        return Promise.all(sharingPromises);
    })
        .then(response => {
        // link page to sites
        const sites = getWithDefault(newPage, "data.values.sites", []);
        const requestOptions = {
            authentication: hubRequestOptions.authentication
        };
        return Promise.all(sites.map((entry) => {
            const opts = Object.assign({
                siteId: entry.id,
                pageModel: newPage
            }, requestOptions);
            return linkSiteAndPage(opts);
        }));
    })
        .then(siteLinkingResponse => {
        // upload resources
        const assets = getWithDefault(options, "assets", []);
        return uploadResourcesFromUrl(newPage, assets, hubRequestOptions);
    })
        .then(() => newPage)
        .catch(err => {
        throw Error(`createPage: Error creating page: ${err}`);
    });
}

/**
 * Traverse the layout graph, locating any cards that may have image resources
 * returning an array containing the resource information.
 * @param {Object} layout the layout to extract image cropIds from
 * @private
 */
function _getImageCropIdsFromLayout(layout) {
    const imgAssets = [];
    const headerLogo = getProp(layout, "header.component.settings.logo");
    if (headerLogo && headerLogo.cropId) {
        imgAssets.push(headerLogo);
    }
    const sections = getProp(layout, "sections") || [];
    return sections
        .reduce(collectSectionAssets, imgAssets)
        .filter(hasCropId)
        .map(extractCropId);
}
function collectSectionAssets(assets, section) {
    const sectionAssets = section.rows
        .reduce(collectCards, [])
        .filter(isImageOrJumbotronCard)
        .map(extractSettingsProperty);
    // retain crop info if section has an image background
    if (getProp(section, "style.background.cropSrc")) {
        sectionAssets.unshift(section.style.background);
    }
    return assets.concat(sectionAssets);
}
function collectCards(acc, row) {
    return acc.concat(row.cards);
}
function isImageOrJumbotronCard(card) {
    return ["image-card", "jumbotron-card"].indexOf(card.component.name) > -1;
}
function extractSettingsProperty(card) {
    return card.component.settings;
}
function hasCropId(entry) {
    return !!entry.cropId;
}
function extractCropId(entry) {
    return entry.cropId;
}

const converters = {
    "event-list-card": convertEventListCard,
    "follow-initiative-card": convertFollowCard,
    "items/gallery-card": convertItemGalleryCard,
    "image-card": convertImageCard,
    "jumbotron-card": convertImageCard
};
/**
 * Convert a card to a templatized version of itself
 * @param {ICard} card the card to templatize
 */
function convertCard(card) {
    const clone = cloneObject(card);
    const converter = converters[clone.component.name];
    if (converter) {
        return converter(clone);
    }
    return {
        card: clone,
        assets: []
    };
}
function convertEventListCard(card) {
    card.component.settings.initiativeIds = ["{{initiative.item.id}}"];
    return { card, assets: [] };
}
function convertFollowCard(card) {
    card.component.settings.initiativeId = "{{initiative.item.id}}";
    return { card, assets: [] };
}
function convertImageCard(card) {
    const result = {
        card,
        assets: []
    };
    if (getProp(card, "component.settings.fileSrc")) {
        result.assets.push(card.component.settings.fileSrc);
    }
    if (getProp(card, "component.settings.cropSrc")) {
        result.assets.push(card.component.settings.cropSrc);
    }
    return result;
}
function convertItemGalleryCard(card) {
    const settings = card.component.settings;
    const version = getProp(settings, "version");
    if (getProp(settings, "groups") && version < 4) {
        settings.groups = [
            {
                title: "{{solution.title}}",
                id: "{{teams.contentGroupId}}"
            }
        ];
    }
    if (getProp(settings, "query.groups")) {
        if (version >= 4) {
            settings.query.groups = ["{{teams.contentGroupId}}"];
        }
        else {
            settings.query.groups = [
                {
                    title: "{{solution.title}}",
                    id: "{{teams.contentGroupId}}"
                }
            ];
        }
    }
    if (getProp(settings, "query.orgId")) {
        settings.query.orgId = "{{organization.id}}";
    }
    if (getProp(settings, "orgId")) {
        settings.orgId = "{{organization.id}}";
    }
    if (settings.siteId) {
        settings.siteId = "{{appid}}";
    }
    return { card, assets: [] };
}

/**
 * Convert a row, collecting assets along the way...
 * @param {IRow} row the row to templatize
 */
function convertRow(row) {
    // if the section has a background image, and it has a url, we should
    // add that to the asset hash so it can be downloaded and added to the template item
    // and also cook some unique asset name so we can inject a placeholder
    return row.cards.reduce(convertToTemplatizedCard, { assets: [], cards: [] });
}
function convertToTemplatizedCard(acc, card) {
    const result = convertCard(card);
    acc.assets = acc.assets.concat(result.assets);
    acc.cards.push(result.card);
    return acc;
}

/**
 * Extract the fileSrc and cropSrc assets from settings.
 *
 * @param {ISettings} settings
 */
function extractAssets(settings) {
    const assets = [];
    if (settings.fileSrc) {
        assets.push(settings.fileSrc);
    }
    if (settings.cropSrc) {
        assets.push(settings.cropSrc);
    }
    return assets;
}

/**
 * Convert a section, collecting assets along the way...
 * @param {ISection} section the section to templatize
 */
function convertSection(section) {
    // if the section has a background image, and it has a url, we should
    // add that to the asset hash so it can be downloaded and added to the template item
    // and also cook some unique asset name so we can inject a placeholder
    const { rows, assets } = section.rows.reduce(toTemplatizedRows, {
        assets: [],
        rows: []
    });
    const result = {
        section: cloneObject(section),
        assets
    };
    result.section.rows = rows;
    if (sectionHasBackgroundFile(section)) {
        result.assets.push(...extractAssets(section.style.background));
    }
    return result;
}
function toTemplatizedRows(acc, row) {
    const { assets, cards } = convertRow(row);
    acc.assets.push(...assets);
    acc.rows.push({ cards });
    return acc;
}
function sectionHasBackgroundFile(clonedSection) {
    return getProp(clonedSection, "style.background.fileSrc");
}

/**
 * Convert a layout to a templatized version of itself
 * @param {ILayout} layout the layout to templatize
 */
function convertLayoutToTemplate(layout) {
    if (!layout) {
        return null;
    }
    // walk the sections, rows, cards... then call to fn's to convert specific cards...
    const converted = layout.sections.reduce((acc, section) => {
        const _result = convertSection(section);
        acc.assets = acc.assets.concat(_result.assets);
        acc.sections.push(_result.section);
        return acc;
    }, { assets: [], sections: [] });
    // assemble the response
    const result = {
        assets: converted.assets,
        layout: {
            sections: converted.sections
        }
    };
    if (layout.header) {
        result.layout.header = cloneObject(layout.header);
    }
    if (layout.footer) {
        result.layout.footer = cloneObject(layout.footer);
    }
    return result;
}

/**
 * THIS UTIL IS NO LONGER IN USE BUT MAY BE IN THE FUTURE - TATE
 */
/**
 * Removes any image "crop" versions that are no longer
 * used in the site layout.
 * TODO: Move to a module that is shared with Pages and then
 * also wire into the Page update cycle.
 * @param {String} id Id of the site or page item
 * @param {Object} layout Layout
 * @param {IHubRequestOptions} hubRequestOptions
 */
function removeUnusedResources(id, layout, hubRequestOptions) {
    const layoutImageCropIds = _getImageCropIdsFromLayout(layout);
    return getItemResources(id, hubRequestOptions).then(response => {
        const itemResourcesOnAGO = (response.resources || []).map(extractResourceProperty);
        const imageItemResourcesOnAGO = itemResourcesOnAGO.filter(resourceStartsWithImageSource);
        // getItemResources mutates the options, adding a params hash
        delete hubRequestOptions.params;
        const itemResourcesToRemove = getUnusedItemCrops(layoutImageCropIds, imageItemResourcesOnAGO);
        return removeUnusedResourcesFromAGO(id, itemResourcesToRemove, hubRequestOptions.authentication);
    });
}
function extractResourceProperty(entry) {
    return entry.resource;
}
function getUnusedItemCrops(layoutImageCropIds, itemImageResources) {
    if (!layoutContainsImageCards(layoutImageCropIds)) {
        // if there aren't any image cards in saved layout, delete all crops
        return itemImageResources;
    }
    // otherwise find crops for image cards that do not contain a current cropId
    return itemImageResources.filter(isNotACurrentImageCropId(layoutImageCropIds));
}
function layoutContainsImageCards(layoutImageCropIds) {
    return layoutImageCropIds.length > 0;
}
function resourceStartsWithImageSource(agoResource) {
    return agoResource.indexOf("hub-image-card-crop-") === 0;
}
function isNotACurrentImageCropId(imageCropIds) {
    const cropRegex = new RegExp(`-crop-(${imageCropIds.join("|")}).png$`);
    return (resource) => !resource.match(cropRegex);
}
function removeUnusedResourcesFromAGO(id, unusedCrops, authentication) {
    // failSafe these calls b/c this is not critical
    const failSaveRemoveItemResources = failSafe(removeItemResource, {
        success: true
    });
    return Promise.all(unusedCrops.map((resource) => failSaveRemoveItemResources({
        id,
        resource,
        authentication
    })));
}

/**
 * Return a list of items this site depends on
 */
function getSiteDependencies(model) {
    const pages = getProp(model, "data.values.pages") || [];
    const pageIds = pages.map((p) => p.id);
    const layout = getProp(model, "data.values.layout") || {};
    const layoutDepIds = getLayoutDependencies(layout);
    return layoutDepIds.concat(pageIds);
}

/**
 * Given a Page Model, return a template object
 * @param {Object} model The Page item model to convert into a template
 * @param {IHubRequestOptions} hubRequestOptions IRequestOptions object, with isPortal, and portalSelf
 */
function convertPageToTemplate(model, hubRequestOptions) {
    const tmpl = cloneObject(model);
    // set things we always want...
    tmpl.type = getPageItemType(hubRequestOptions.isPortal);
    tmpl.key = `${propifyString(model.item.title)}_${createId("i")}`;
    tmpl.itemId = model.item.id;
    // now pass the item off to be normalized
    tmpl.item = normalizeSolutionTemplateItem(tmpl.item);
    tmpl.data.values.sites = [];
    ["source", "updatedAt", "updatedBy", "folderId", "slug"].forEach(p => {
        delete tmpl.data.values[p];
    });
    // convert the layout...
    const layoutConversion = convertLayoutToTemplate(tmpl.data.values.layout);
    // the conversion can return an array of assets to convert, but for now, we are not using that...
    tmpl.data.values.layout = layoutConversion.layout;
    tmpl.dependencies = getSiteDependencies(model);
    // convert any internal references in /data to the item's id into `{{appId}}`
    tmpl.data = replaceItemId(tmpl.data, tmpl.itemId);
    if (!tmpl.item.properties) {
        tmpl.item.properties = {};
    }
    return getItemAssets(model.item, hubRequestOptions).then(assets => {
        tmpl.assets = assets;
        return tmpl;
    });
}

/**
 * Given a template, settings and transformation hashes, construct the new Page model.
 * Altough this is async, it does not persist the page
 * @param {Object} template Json Template of the Page
 * @param {Object} settings Hash of values to use in the interpolation
 * @param {Object} transforms Hash of transrormation functions available during interpolation
 * @param {IHubRequestOptions} requestOptions
 */
function createPageModelFromTemplate(template, settings, transforms, hubRequestOptions) {
    // add url to the assets, ref'ing the original location
    template.assets = addSolutionResourceUrlToAssets(template, hubRequestOptions);
    // request options is not currently used, but it *may* be needed, and this fn is part
    //  of an interface needed for Solution Generation and SOME item type will need
    // to make xhrs in this process
    const pageModel = interpolate(template, settings, transforms);
    if (!pageModel.item.properties) {
        pageModel.item.properties = {};
    }
    // Debatable if this should be in the template, but since it's
    // an important part of the relationship system we manually assign it
    const parentInitiativeId = getProp(settings, "initiative.id");
    if (parentInitiativeId) {
        deepSet(pageModel, "item.properties.parentInitiativeId", parentInitiativeId);
    }
    // put the slug into the hash so we can use it in following templates
    deepSet(pageModel, "data.values.slug", slugify(pageModel.item.title));
    // do any other work here...
    return Promise.resolve(pageModel);
}

/**
 * To account for complexities in the Solution generation process
 * we need to ensure that the site is linked to the Page before
 * we throw this all through the unlink/delete process
 * @param {Object} siteModel Site Model
 * @param {Objet} pageModel Page Model
 */
function ensurePageHasSiteEntry(siteModel, pageModel) {
    const siteId = siteModel.item.id;
    const parentInitiativeId = getProp(siteModel, "item.properties.parentInitiativeId");
    // swap initiativeId to siteId
    // for a period of time, this happened during Solution generation
    if (parentInitiativeId) {
        const currentSites = getProp(pageModel, "data.values.sites");
        const initiativeEntry = currentSites.find((e) => {
            return e.id === parentInitiativeId;
        });
        if (initiativeEntry) {
            initiativeEntry.id = siteId;
        }
    }
    // ensure that we have an entry for the site
    // during solution generation, we can't inject the
    // site id into the page because the page is created
    // before the site item. We need this present so that
    // the unlinkSiteFromPage functions will be able to update
    // the upstream site
    const sites = getProp(pageModel, "data.values.sites");
    const siteEntry = sites.find((e) => {
        return e.id === siteId;
    });
    if (!siteEntry) {
        pageModel.data.values.sites.push({
            id: siteId,
            title: "Current Site to ensure clean removal"
        });
    }
    return pageModel;
}

/**
 * Determines whether an item is a page item or not
 * @param item - the item
 */
function isPage(item) {
    return normalizeItemType(item) === "Hub Page";
}

/**
 * Returns the right include list for the item type.
 * @param siteOrPageModel - the site or page model
 * @private
 */
function _includeListFromItemType(siteOrPageItem) {
    let includeList;
    if (isSite(siteOrPageItem)) {
        includeList = SITE_DRAFT_INCLUDE_LIST;
    }
    else if (isPage(siteOrPageItem)) {
        includeList = PAGE_DRAFT_INCLUDE_LIST;
    }
    else {
        throw TypeError("@esri/hub-sites: drafts only belong to a site or a page item model");
    }
    return includeList;
}

/**
 * Returns true if site or page model has unpublished changes
 * @param siteOrPageModel
 */
function hasUnpublishedChanges(siteOrPageModel) {
    return includes(siteOrPageModel.item.typeKeywords, UNPUBLISHED_CHANGES_KW);
}

/**
 * Returns a copy of the model marked as having unpublished changes
 * @param {*} siteOrPageModel
 * @param {*} hubRequestOptions
 */
function markPublished(siteOrPageModel) {
    const model = cloneObject(siteOrPageModel);
    model.item.typeKeywords = model.item.typeKeywords.filter(kw => kw !== UNPUBLISHED_CHANGES_KW);
    return model;
}

/**
 * Returns a copy of the model marked as having unpublished changes
 * @param {*} siteOrPageModel
 * @param {*} hubRequestOptions
 */
function markUnpublished(siteOrPageModel) {
    const model = cloneObject(siteOrPageModel);
    if (!includes(model.item.typeKeywords, UNPUBLISHED_CHANGES_KW)) {
        model.item.typeKeywords.push(UNPUBLISHED_CHANGES_KW);
    }
    return model;
}

const SITE_UI_VERSION = "2.3";

/**
 * Return the Portal subdomain typekeyword
 * @param {string} subdomain Portal Subdomain
 * @private
 */
function _getPortalDomainTypeKeyword(subdomain) {
    return `hubsubdomain|${subdomain}`.toLowerCase();
}

/**
 * Ensure that an entry for the specified subdomain exists in the
 * typeKeyword array. Will also remove any other domain entries,
 * @param {String} subdomain Subdomain name
 * @param {Array} typeKeywords Array of typekeywords
 * @private
 */
function _ensurePortalDomainKeyword(subdomain, typeKeywords = []) {
    // if the current entry is in the keywords array, just return it
    const expectedKeyword = _getPortalDomainTypeKeyword(subdomain);
    if (includes(typeKeywords, expectedKeyword)) {
        return typeKeywords;
    }
    else {
        return typeKeywords.reduce((acc, kw) => {
            if (!/^hubsubdomain/.test(kw)) {
                acc.push(kw);
            }
            return acc;
        }, [expectedKeyword]);
    }
}

/**
 * Update an existing site item
 * This function supports the equivalent of a PATCH REST operation
 * It will fetch the current item from ago, and then apply
 * a subset of property changes to the model if a allowList is included.
 * The allowList can include any property paths on the item.
 * If the list is empty, then the entire site model is overwritten.
 * @param {Object} model Site Model to update
 * @param {IUpdateSiteOptions} updateSiteOptions
 */
function updateSite(model, updateSiteOptions) {
    const allowList = updateSiteOptions.allowList || [];
    const { updateVersions = true } = updateSiteOptions;
    // apply any on-save site upgrades here...
    deepSet(model, "data.values.uiVersion", SITE_UI_VERSION);
    deepSet(model, "data.values.updatedAt", new Date().toISOString());
    deepSet(model, "data.values.updatedBy", updateSiteOptions.authentication.username);
    // we only add these in if an allowList was passed in
    if (allowList.length) {
        allowList.push("data.values.updatedAt");
        allowList.push("data.values.updatedBy");
        if (updateVersions) {
            allowList.push("data.values.uiVersion");
            // any save needs to be able to update the schema version
            // which will have been bumped if a schema migration
            // occured during the load cycle
            allowList.push("item.properties.schemaVersion");
        }
    }
    // PORTAL-ENV: no domain service so we encode the subdomain in a typeKeyword
    if (updateSiteOptions.isPortal) {
        model.item.typeKeywords = _ensurePortalDomainKeyword(getProp(model, "data.values.subdomain"), model.item.typeKeywords);
        // see above comment why ths is gated...
        if (allowList.length) {
            allowList.push("item.typeKeywords");
        }
    }
    // Actually start the update process...
    let agoModelPromise;
    // if we have a allowList, refetch the site to check for changes...
    if (allowList.length) {
        agoModelPromise = getSiteById(model.item.id, updateSiteOptions);
    }
    else {
        // if we dont have a allowList, just resolve with the model we have
        agoModelPromise = Promise.resolve(model);
    }
    // Kick things off...
    return agoModelPromise
        .then((agoModel) => {
        if (allowList.length) {
            // merge the props in the allow list into the model from AGO
            model = mergeObjects(model, agoModel, allowList);
        }
        // send the update to ago
        return updateItem({
            item: serializeModel(model),
            authentication: updateSiteOptions.authentication,
            params: { clearEmptyFields: true },
        });
    })
        .catch((err) => {
        throw Error(`updateSite: Error updating site: ${err}`);
    });
}

/**
 * Saves the published status of a site or page model
 * leaving everything else on the model alone.
 *
 * @param siteOrPageModel
 * @param requestOptions
 */
function savePublishedStatus(siteOrPageModel, requestOptions) {
    const allowList = ["item.typeKeywords"]; // only want to save typeKeywords
    const { item } = siteOrPageModel;
    let prms;
    if (isSite(item)) {
        // when saving a draft site, we need to prevent the schemaVersion
        // from being updated. otherwise, if the user does not publish the draft,
        // functionality potentially will be broken for all users because the item
        // reflects the most recent schemaVersion without any of the actual schema
        // changes
        const isUnpublished = hasUnpublishedChanges(siteOrPageModel);
        prms = updateSite(siteOrPageModel, Object.assign(Object.assign({}, requestOptions), { allowList, updateVersions: !isUnpublished }));
    }
    else if (isPage(item)) {
        prms = updatePage(siteOrPageModel, Object.assign(Object.assign({}, requestOptions), { allowList }));
    }
    else {
        throw TypeError("@esri/hub-sites: only page or site models have a published state");
    }
    return prms;
}

const DRAFT_RESOURCE_REGEX = /^draft-(\d+).json$/;

/**
 * Gets the name of the resource for the current draft.
 * NOTE: There _should_ only be one, but sometimes it gets messed up.
 * @param siteOrPageId
 * @param hubRequestOptions
 * @private
 */
function _getDraftResourceNames(siteOrPageId, hubRequestOptions) {
    return getItemResources(siteOrPageId, {
        portal: hubRequestOptions.portal,
        authentication: hubRequestOptions.authentication
    }).then(response => {
        // search through the resources to find the draft
        const draftResourceNames = response.resources
            .map(({ resource: name }) => name)
            .filter((name) => name.search(DRAFT_RESOURCE_REGEX) !== -1);
        return draftResourceNames;
    });
}

/**
 * Given an item id, removes the current draft resource if exists
 * @param {*} siteOrPageId
 * @param {*} hubRequestOptions
 */
function deleteDraft(siteOrPageModel, hubRequestOptions) {
    const { item: { id, owner } } = siteOrPageModel;
    return _getDraftResourceNames(id, hubRequestOptions).then(draftResourceNames => Promise.all(draftResourceNames.map(resourceName => removeItemResource({
        id,
        owner,
        resource: resourceName,
        portal: hubRequestOptions.portal,
        authentication: hubRequestOptions.authentication
    }))));
}

/**
 * Given a site or page model, saves a draft
 *
 * NOTE - replaces current draft if exists
 * @param {*} siteOrPageModel
 * @param {*} hubRequestOptions
 */
function saveDraft(siteOrPageModel, hubRequestOptions) {
    const includeList = _includeListFromItemType(siteOrPageModel.item);
    const draft = buildDraft(siteOrPageModel, includeList);
    const draftBlob = objectToJsonBlob(draft);
    const draftName = `draft-${Date.now()}.json`;
    const itemId = getProp(siteOrPageModel, "item.id");
    return deleteDraft(siteOrPageModel, hubRequestOptions)
        .then((_) => addItemResource({
        id: itemId,
        owner: getProp(siteOrPageModel, "item.owner"),
        resource: draftBlob,
        name: draftName,
        private: false,
        portal: hubRequestOptions.portal,
        authentication: hubRequestOptions.authentication,
    }))
        .then((_) => draft);
}

/**
 *
 * @param draftName
 */
function getDraftDate(draftName) {
    const parsed = DRAFT_RESOURCE_REGEX.exec(draftName);
    let ret;
    try {
        ret = new Date(parseInt(parsed[1], 10));
    }
    catch (_a) {
        ret = null;
    }
    return ret;
}

/**
 * Gets the name of the most recent resource for the current draft.
 * NOTE: There _should_ only be one, but sometimes it gets messed up.
 * @param siteOrPageId
 * @param hubRequestOptions
 * @private
 */
function _getMostRecentDraftName(siteOrPageId, hubRequestOptions) {
    return _getDraftResourceNames(siteOrPageId, hubRequestOptions).then(draftNames => {
        if (!draftNames.length)
            return null;
        const dates = draftNames.map(name => [name, getDraftDate(name)]);
        dates.sort(([_, dateA], [__, dateB]) => {
            if (dateB > dateA) {
                return 1;
            }
            else if (dateA > dateB) {
                return -1;
            }
            else {
                return 0;
            }
        });
        return dates[0][0];
    });
}

const schemaVersionPath = "item.properties.schemaVersion";
const initialDraftVersion = 1.3;
/**
 * Applies the schema upgrades
 * @param draft IDraft
 */
function upgradeDraftSchema(draft) {
    if (getProp(draft, "item.properties.schemaVersion") === undefined) {
        deepSet(draft, schemaVersionPath, initialDraftVersion);
    }
    if (getProp(draft, "item.properties.schemaVersion") === SITE_SCHEMA_VERSION) {
        return draft;
    }
    else {
        let migrated = draft;
        // apply site schema upgrade functions in order...
        // don't have do do them all since drafts only got released
        // at version 1.3
        migrated = _ensureTelemetry(draft);
        return migrated;
    }
}

function isSiteDraft(draft) {
    // Maybe a better way to do this, but can't use item type
    // because we have Web Mapping Application sites in the wild
    // and typeKeywords don't exist on drafts.
    //
    // We could always request the site item and check it as part of
    // this but I'd rather not since that's an extra XHR and this is a
    // pretty robust schema check.
    return (getProp(draft, "data.values.capabilities") !== undefined &&
        getProp(draft, "data.values.theme") !== undefined);
}
/**
 * Fetches the draft for a site or page if exists.
 * @param {*} siteOrPageId
 * @param {*} hubRequestOptions
 */
function fetchDraft(siteOrPageId, hubRequestOptions) {
    return _getMostRecentDraftName(siteOrPageId, hubRequestOptions)
        .then(draftResourceName => {
        let ret = null;
        if (draftResourceName) {
            ret = getItemResource(siteOrPageId, {
                fileName: draftResourceName,
                readAs: "json",
                authentication: hubRequestOptions.authentication,
                portal: hubRequestOptions.portal
            });
        }
        return ret;
    })
        .then((draft) => {
        if (draft && isSiteDraft(draft)) {
            draft = upgradeDraftSchema(draft);
        }
        return draft;
    });
}

/**
 * Applies a draft resource to an item model
 * @param {*} siteOrPageModel
 * @param {*} draft
 */
function applyDraft(siteOrPageModel, draft) {
    if (!draft)
        return siteOrPageModel;
    const includeList = _includeListFromItemType(siteOrPageModel.item);
    return mergeObjects(draft, cloneObject(siteOrPageModel), includeList);
}

/**
 * This function fetches and applies the draft
 * to the site or page if the draft is available.
 *
 * It returns a completely new object with the draft applied
 * if there is one, otherwise it just returns the site or
 * page model argument.
 *
 * @param {*} siteOrPageModel
 * @param {*} hubRequestOptions
 */
function fetchAndApplyDraft(siteOrPageModel, hubRequestOptions) {
    return fetchDraft(getProp(siteOrPageModel, "item.id"), hubRequestOptions).then(draft => applyDraft(siteOrPageModel, draft));
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Get the domains associated with a Hub Site.
 * @param siteId - Identifier of the Hub Site
 * @param requestOptions - request options that may include authentication
 * @returns A Promise that will resolve with the domains associated with the site.
 */
function getDomains(siteId, requestOptions) {
    const url = _getDomainServiceUrl(getHubApiUrl(requestOptions));
    const options = Object.assign({ params: { siteId }, httpMethod: "GET" }, requestOptions);
    return request(url, options);
}
/**
 * Get the domain associated with a Hub Site. Since a site may have a
 * custom domain, in addition to a default domain, we will return the
 * custom domain over the default domain.
 *
 * @param siteId - Identifier of the Hub Site
 * @param requestOptions - request options that may include authentication
 * @returns A Promise that will resolve with the domains associated with the site.
 */
function getDomain(siteId, requestOptions) {
    return getDomains(siteId, requestOptions).then((response) => {
        if (response.length > 1) {
            // ok - in this case, it's likely that we have a default domain and a custom domain...
            // we want the one that's custom... i.e. does not contain arcgis.com
            const customEntry = response.reduce((acc, entry) => {
                if (!entry.hostname.includes("arcgis.com")) {
                    acc = entry;
                }
                return acc;
            }, null);
            if (customEntry) {
                // return the custom domain
                return customEntry.hostname;
            }
            else {
                // just pick the first one
                return response[0].hostname;
            }
        }
        else {
            // there is only 1, so return it
            return response[0].hostname;
        }
    });
}

/**
 * Remove the well-known team groups
 * Underlying calls are failsafe so this will never throw
 * but the groups may not be deleted
 * @param {Object} siteModel Site Model
 * @param {IRequestOptions} requestOptions
 * @private
 */
function _removeSiteGroups(siteModel, requestOptions) {
    const teamsToDelete = [
        "collaborationGroupId",
        "contentGroupId",
        "followersGroupId"
    ].reduce((acc, prop) => {
        return maybePush(getProp(siteModel, `item.properties.${prop}`), acc);
    }, []);
    const promises = teamsToDelete.map(id => {
        const opts = Object.assign({ id }, requestOptions);
        return _unprotectAndRemoveGroup(opts);
    });
    return Promise.all(promises);
}

/**
 * Remove the parent initiative item, if it exists
 * Failsafe
 * @param {Object} siteModel Site Model
 * @param {IRequestOptions} requestOptions
 * @private
 */
function _removeParentInitiative(siteModel, requestOptions) {
    const parentInitiativeId = getProp(siteModel, "item.properties.parentInitiativeId");
    if (parentInitiativeId) {
        const opts = Object.assign({ id: parentInitiativeId, owner: siteModel.item.owner }, requestOptions);
        return _unprotectAndRemoveItem(opts);
    }
    else {
        return Promise.resolve();
    }
}

/**
 * Remove a Site from the Hub Index system
 * @param {Object} siteModel Site Model
 * @param {IHubRequestOptions} hubRequestOptions
 * @private
 */
function _removeSiteFromIndex(siteModel, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        return Promise.resolve();
    }
    else {
        const url = `${getHubApiUrl(hubRequestOptions)}/api/v3/${siteModel.item.id}`;
        const opts = {
            method: "DELETE",
            mode: "cors",
            headers: {
                Authorization: hubRequestOptions.authentication.token,
            },
        };
        return fetch(url, opts)
            .then((raw) => raw.json())
            .then((_) => {
            // TODO: Should we do anything here?
            return { success: true };
        })
            .catch((err) => {
            throw Error(`_removeSiteFromIndex: Error removing site from index: ${err}`);
        });
    }
}

/**
 * Remove the Domain entries for a Site
 * @param {string} siteId Item Id of the site to remove the domain entries for
 * @param {IHubRequestOptions} hubRequestOptions
 * @private
 */
function _removeSiteDomains(siteId, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        return Promise.resolve([]);
    }
    else {
        return getDomainsForSite(siteId, hubRequestOptions).then((domains) => {
            return Promise.all(domains.map((domainEntry) => {
                return removeDomain(domainEntry.id, hubRequestOptions);
            }));
        });
    }
}

/**
 * We have updated aspects of the site templating logic, and now we need to
 * ensure that the groupId properties in the item template have :optional
 * if they are defined. This function simply does that.
 * @param {Object} itemTemplate template for the item part of the site
 * @private
 */
function _ensureOptionalGroupsTemplating(itemTemplate) {
    const props = ["collaborationGroupId", "contentGroupId", "followersGroupId"];
    const tmpl = cloneObject(itemTemplate);
    props.forEach(prop => {
        const val = getProp(tmpl, `properties.${prop}`);
        if (val) {
            if (val.match(/^\{\{.*\}\}$/)) {
                if (!val.match(/:optional\}\}$/g)) {
                    // replace it
                    tmpl.properties[prop] = val.replace("}}", ":optional}}");
                }
            }
            else {
                delete tmpl.properties[prop];
            }
        }
    });
    return tmpl;
}

/**
 * The item type depends if the app is running
 * in ArcGIS Enterprise vs AGO
 * @param {boolean} isPortal Is this running in Enterprise?
 */
function getSiteItemType(isPortal) {
    let type = "Hub Site Application";
    if (isPortal) {
        type = "Site Application";
    }
    return type;
}

/**
 * Enture that the site model has the correct type and tags
 * Mutates the Model
 * @param {Object} model Site Model
 * @param {Object} currentUser Current User
 * @param {Boolean} isPortal Is this running in ArcGIS Enterprise
 * @private
 */
function _ensureTypeAndTags(model, isPortal) {
    model = cloneObject(model);
    model.item.type = getSiteItemType(isPortal);
    // ensure typekeywords array
    if (!Array.isArray(model.item.typeKeywords)) {
        model.item.typeKeywords = [];
    }
    if (!includes(model.item.typeKeywords, "hubSite")) {
        model.item.typeKeywords.push("hubSite");
    }
    return model;
}

/**
 * Given a Site Model, add the required domains.
 * This should only be called as part of the `createSite` flow
 * @param {Object} model site model
 * @param {IHubRequestOptions} hubRequestOptions
 * @private
 */
function _addSiteDomains(model, hubRequestOptions) {
    if (hubRequestOptions.isPortal) {
        return Promise.resolve([]);
    }
    else {
        const props = ["defaultHostname", "customHostname"];
        return Promise.all(props.reduce((acc, prop) => {
            const hostname = getProp(model, `data.values.${prop}`);
            if (hostname) {
                const domainOpts = {
                    hostname,
                    clientKey: model.data.values.clientId,
                    orgId: hubRequestOptions.portalSelf.id,
                    orgTitle: hubRequestOptions.portalSelf.name,
                    orgKey: hubRequestOptions.portalSelf.urlKey,
                    siteId: model.item.id,
                    siteTitle: model.item.title,
                    sslOnly: true,
                };
                acc.push(addDomain(domainOpts, hubRequestOptions));
            }
            return acc;
        }, []));
    }
}

/**
 * Get the correct url used to edit the site
 * @param item the site item
 */
function getSiteEditUrl(item) {
    return `${item.url}/edit`;
}

/**
 * Update the redirect uri's that are valid for an existing app that's registered
 * for oAuth.
 * @param {string} clientId Client Id of the existing app to be updated
 * @param {Array} redirectUris Array of valid redirect uris for the app
 * @param {IRequestOptions} requestOptions
 */
function updateAppRedirectUris(clientId, redirectUris, requestOptions) {
    const url = `${getPortalApiUrl(requestOptions)}/oauth2/apps/${clientId}/update`;
    const options = {
        method: "POST",
        authentication: requestOptions.authentication,
        params: {
            client_id: clientId,
            redirect_uris: JSON.stringify(redirectUris)
        }
    };
    return request(url, options);
}

/**
 * Update the list of valid uris associated with the Site item
 * @param {Object} site Site Model
 * @param {Array} uris Array of valid uris for the site
 * @param {IHubRequestOptions} hubRequestOptions
 */
function updateSiteApplicationUris(site, uris, hubRequestOptions) {
    if (hubRequestOptions.isPortal)
        return Promise.resolve({});
    // get http and https versions of all uris
    const redirectUris = uris.reduce((acc, uri) => {
        return acc.concat(_getHttpAndHttpsUris(uri));
    }, []);
    // update the redirect uris for the application
    return updateAppRedirectUris(site.data.values.clientId, redirectUris, hubRequestOptions)
        .then(() => {
        // now we update the domains, removing any that are no longer used
        return getDomainsForSite(site.item.id, hubRequestOptions);
    })
        .then((domainInfos) => {
        // get all domains that are no longer associated with the site
        const domainsToRemove = domainInfos.filter((domain) => !includes(uris, domain.hostname));
        // get all new domains that are now associated with the site
        const hostnames = domainInfos.map((domain) => domain.hostname);
        const domainsToAdd = uris.filter((uri) => !includes(hostnames, uri));
        // finally, kick all the promises
        const domainPromises = [];
        domainsToRemove.forEach((domain) => domainPromises.push(removeDomain(domain.id, hubRequestOptions)));
        domainsToAdd.forEach((uri) => domainPromises.push(addDomain({
            orgKey: hubRequestOptions.portalSelf.urlKey,
            orgId: hubRequestOptions.portalSelf.id,
            orgTitle: hubRequestOptions.portalSelf.name,
            hostname: uri,
            siteId: site.item.id,
            siteTitle: site.item.title,
            clientKey: site.data.values.clientId,
            sslOnly: domainInfos[0] ? !!domainInfos[0].sslOnly : true,
        }, hubRequestOptions)));
        return Promise.all(domainPromises);
    });
}

/**
 * Register an Item as an application, enabling oAuth flows at custom
 * domains. Only item types with "Application" in the name are valid
 * with this API call.
 * @param {string} itemId Item Id of item to create an application for
 * @param {Array} redirectUris Array of valid redirect uris for the app
 * @param {string} appType Defaults to "browser"
 * @param {IRequestOptions} requestOptions
 */
function registerBrowserApp(itemId, redirectUris, requestOptions) {
    const url = `${getPortalApiUrl(requestOptions)}/oauth2/registerApp`;
    const options = {
        method: "POST",
        authentication: requestOptions.authentication,
        params: {
            itemId,
            appType: "browser",
            redirect_uris: JSON.stringify(redirectUris)
        }
    };
    return request(url, options);
}

/**
 * Register the Site item as an application so we can oauth against it
 * @param {string} siteId Item Id of the site
 * @param {Array} uris Arrayf valid uris for the site
 * @param {IHubRequestOptions} hubRequestOptions
 */
function registerSiteAsApplication(model, hubRequestOptions) {
    // PORTAL-ENV: we can't register sites as `arcgisonline` because it will bust sign in on the portal
    if (hubRequestOptions.isPortal)
        return Promise.resolve({});
    const uris = [model.data.values.defaultHostname];
    if (getProp(model, "data.values.customHostname")) {
        uris.push(model.data.values.customHostname);
    }
    // get both the http and https versions of the urls, just to cover all the bases
    const redirectUris = uris.reduce((acc, uri) => {
        return acc.concat(_getHttpAndHttpsUris(uri));
    }, []);
    return registerBrowserApp(model.item.id, redirectUris, hubRequestOptions);
}

/**
 * Given a site, update all the linked page items and remove their
 * references to the site
 * @param {Object} siteModel Site Model
 * @param {IRequestOptions} requestOptions
 */
function unlinkPagesFromSite(siteModel, requestOptions) {
    const linkedPages = mapBy("id", getWithDefault(siteModel, "data.values.pages", []));
    // we need to unlink the site from all it's pages. However, these calls *could* fail
    // if the current user lacks rights to save the site/page item, so we just make sure these
    // always resolve. In the Ember service code, we used `allSettled` but that's RSVP special sauce
    const failSafeUnlink = failSafe(unlinkSiteAndPage);
    return Promise.all(linkedPages.map((pageId) => {
        const opts = Object.assign({
            siteModel,
            pageId
        }, requestOptions);
        return failSafeUnlink(opts);
    }));
}

/**
 * Ensure that the item template has `:optional` on the item.properties.* team
 * properties. Does not mutate the passed in object - returns a clone.
 * @param {Object} itemTemplate Item Template to work with
 */
function ensureOptionalGroupsTemplating(itemTemplate) {
    const props = ["collaborationGroupId", "contentGroupId", "followersGroupId"];
    const tmpl = cloneObject(itemTemplate);
    props.forEach(prop => {
        const val = getProp(tmpl, `properties.${prop}`);
        if (val) {
            if (val.match(/^\{\{.*\}\}$/)) {
                if (!val.match(/:optional\}\}$/g)) {
                    // replace it
                    tmpl.properties[prop] = val.replace("}}", ":optional}}");
                }
            }
            else {
                delete tmpl.properties[prop];
            }
        }
    });
    return tmpl;
}

/**
 * Remove a Site Item
 * * Unlinks all pages
 * * removes all groups
 * * deletes any parent initiatve
 * * removes site from hub index,
 * * removes all domains associated with the site
 * * removes the site item
 *
 * @param {string || Object} idOrModel Id of the site or a site model
 * @param {IHubUserRequestOptions} hubRequestOptions
 */
function removeSite(idOrModel, hubRequestOptions) {
    let modelPromise;
    if (typeof idOrModel === "string") {
        modelPromise = getModel(idOrModel, hubRequestOptions);
    }
    else {
        modelPromise = Promise.resolve(idOrModel);
    }
    let siteModel;
    return modelPromise
        .then((model) => {
        siteModel = model;
        return unlinkPagesFromSite(siteModel, hubRequestOptions);
    })
        .then(() => {
        const opts = Object.assign({ id: siteModel.item.id, owner: siteModel.item.owner }, hubRequestOptions);
        return _unprotectAndRemoveItem(opts);
    })
        .then(() => {
        // remove the groups
        return _removeSiteGroups(siteModel, hubRequestOptions);
    })
        .then(() => {
        // remove the parent initiative if that's a thing
        return _removeParentInitiative(siteModel, hubRequestOptions);
    })
        .then(() => {
        // remove the domains associated with the site item
        return _removeSiteDomains(siteModel.item.id, hubRequestOptions);
    })
        .then(() => {
        // remove the site from the Hub index
        // failSafe because this is not critical
        return failSafe(_removeSiteFromIndex, { success: true })(siteModel, hubRequestOptions);
    })
        .catch((err) => {
        throw Error(`removeSite: Error removing site: ${err}`);
    });
}

/**
 * Enture that the site model has all the required properties
 * and force them to be bumped to all the current values.
 * Returns a clone of the model
 * @param {Object} model Site Model
 * @param {Object} currentUser Current User
 * @param {Boolean} isPortal Is this running in ArcGIS Enterprise
 */
function ensureRequiredSiteProperties(model, username, isPortal = false) {
    model = cloneObject(model);
    model.item.owner = username;
    model.item.access = "private";
    // ensure typekeywords array
    if (!Array.isArray(model.item.typeKeywords)) {
        model.item.typeKeywords = [];
    }
    model.data.values.updatedAt = new Date().toISOString();
    model.data.values.updatedBy = username;
    if (isPortal) {
        model.item.typeKeywords.push(_getPortalDomainTypeKeyword(model.data.values.subdomain));
    }
    // Handle item url - if it's set...
    if (!model.item.url) {
        const hostname = getProp(model, "data.values.customHostname") ||
            getProp(model, "data.values.defaultHostname");
        // unless a custom hostname was passed in AND the site item's url is falsey
        // (which currently should be impossible) we want the protocol of the item url
        // to be https.
        let protocol = "https";
        if (model.data.values.customHostname) {
            protocol = "http";
        }
        model.item.url = `${protocol}://${hostname}`;
    }
    // Ensure pages is an array...
    if (!Array.isArray(getProp(model, "data.values.pages"))) {
        deepSet(model, "data.values.pages", []);
    }
    deepSet(model, "data.values.uiVersion", SITE_UI_VERSION);
    // ensure the type and tags...
    model = _ensureTypeAndTags(model, isPortal);
    // ensure the capabilities...
    const caps = [
        "api_explorer",
        "pages",
        "my_data",
        "social_logins",
        "json_chart_card",
        "document_iframes",
        "items_view",
        "app_page",
        "underlinedLinks",
        "globalNav",
    ];
    if (!isPortal) {
        caps.push("socialSharing");
    }
    deepSet(model, "data.values.capabilities", caps);
    // return the clone
    return model;
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Wrapper for geometry service functions
 */
const geometryService = {
    // default geometry service url
    AGO_GEOMETRY_SERVICE: "https://utility.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer",
    /**
     * Get the geometry service url.
     * If a portal object is passed, it will extract the portal's geometry server
     * otherwise, it will return the public AGO geometry service
     *
     * @param portal
     */
    getUrl(portal) {
        let url = this.AGO_GEOMETRY_SERVICE;
        if (portal) {
            const portalService = getProp(portal, "helperServices.geometry.url");
            if (portalService) {
                url = portalService;
            }
        }
        return url;
    },
    /**
     * Should we add a token to the call - basically we never want to send
     * tokens to the public arcgisonline service.
     *
     * @param {string} url
     * @returns {boolean}
     */
    shouldAddTokenToCall(url) {
        let result = true;
        if (url.indexOf("arcgisonline") > -1) {
            result = false;
        }
        return result;
    },
    /**
     * Project a geometry using a specific geometry server
     *
     * @param {string} serviceUrl
     * @param {*} inSR input spatial reference - wkid or object
     * @param {*} outSR output spatial reference - wkid or object
     * @param {string} geometryType the type of the input geometries
     * @param {[any]} geometries array of geometryes
     * @param {IRequestOptions} requestOptions
     * @returns {Promise<any>}
     */
    project(serviceUrl, inSR, outSR, geometryType, geometries, requestOptions) {
        const url = `${serviceUrl}/project`;
        // we may be mutating this, so make a copy...
        const opts = Object.assign({}, requestOptions);
        opts.params = {
            geometries: {
                geometryType,
                geometries
            },
            transformForward: false,
            transformation: "",
            inSR,
            outSR,
            f: "json"
        };
        if (!this.shouldAddTokenToCall(url) && opts.authentication) {
            // remove the authentication...
            // if the same rO is used thru multiple calls...
            delete opts.authentication;
        }
        return request(url, opts);
    }
};

/**
 * Save an IModel. Generic function that will be used across all
 * type-specific save functions
 *
 * @export
 * @param {IModel} "model" object (i.e. `{item:{...}, data:{...}}`)
 * @param {IRequestOptions} requestOptions
 * @returns {Promise<IModel>}
 */
function saveModel(model, requestOptions) {
    const clone = cloneObject(model);
    const opts = createRequestOptions(clone, requestOptions);
    return createItem(opts).then((response) => {
        clone.item.id = response.id;
        return clone;
    });
}
/**
 * Update an IModel. Generic function that will be used across all
 * type-specific update functions
 *
 * @export
 * @param {IModel} "model" object (i.e. `{item:{...}, data:{...}}`)
 * @param {IRequestOptions} requestOptions
 * @returns {Promise<IModel>}
 */
function updateModel(model, requestOptions) {
    const clone = cloneObject(model);
    const opts = createRequestOptions(clone, requestOptions);
    return updateItem(opts).then(() => {
        // return a new ref to the model that was passed in...
        return clone;
    });
}
/**
 * Centralize the serialization of an IModel into an object
 * that we can send to the Item methods
 *
 * @param {IModel} model
 * @param {IRequestOptions} requestOptions
 * @returns {*}
 */
function createRequestOptions(model, requestOptions) {
    // construct an object to send to the API
    const item = cloneObject(model.item);
    item.data = cloneObject(model.data);
    // create the options...
    const opts = Object.assign({ item }, requestOptions);
    return opts;
}
/**
 * Given an extent, project it and return a BBOX lat/long string, which is the format
 * required when creating an item.
 * @param orgExtent Extent to project
 * @param portal
 * @returns {Promise<any>} Promise that will resolve with a bbox string (W,S,E,N)
 */
function getProjectedExtentAsBBOXString(options, requestOptions) {
    const url = geometryService.getUrl(options.portal);
    return geometryService
        .project(url, options.extent.spatialReference.wkid, 4326, "esriGeometryEnvelope", [options.extent], requestOptions)
        .then((response) => {
        const ext4326 = response.geometries[0];
        return (ext4326.xmin +
            "," +
            ext4326.ymin +
            "," +
            ext4326.xmax +
            "," +
            ext4326.ymax);
    });
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
const INITIATIVE_TYPE_NAME = "Hub Initiative";
/**
 * Save an Initiative model. If the model does not have an item.id
 * we will create a new item. Otherwise we update the existing item.
 * Returns the same model instance, with the item.id assigned;
 *
 * @export
 * @param {IInitiativeModel} model
 * @param {IRequestOptions} requestOptions
 * @returns {Promise<IInitiativeModel>}
 */
function addInitiative(model, requestOptions) {
    // delegate to model to do the save...
    return saveModel(model, requestOptions);
}
/**
 * Generate the default url for an Initiative - which is the route to the
 * initiative in the admin app
 *
 * @export
 * @param {string} itemId
 * @param {IRequestOptions} requestOptions
 * @returns {string} Url to the initiative in the admin app
 */
function getInitiativeUrl(itemId, requestOptions) {
    return `${getHubApiUrl(requestOptions)}/admin/initiatives/${itemId}`;
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Applies the initial version of the Initiaive schema to the model.
 * If `model.item.properties.schemaVersion >= 1` the original object
 * will be returned. Otherwise a new object with the updated schema
 * is returned.
 *
 * @protected
 * @param {IInitiativeModel} model Initiative Model
 * @param {string} [portalUrl] Url to the Portal. Defauls to `www.arcgis.com`
 * @returns {IInitiativeModel}
 */
function applyInitialSchema(model, portalUrl) {
    const curVersion = getProp(model, "item.properties.schemaVersion");
    // if no current version or it's below 1
    if (!curVersion || curVersion < 1) {
        // clone the model because we play by immutable rules
        const clone = cloneObject(model);
        // console.debug(`------- CLONE ---------`);
        // console.debug(JSON.stringify(clone, null, 2));
        // console.debug(`------- CLONE ---------`);
        // ensure some properties exist...
        if (!clone.data.values) {
            clone.data.values = {};
        }
        if (!clone.item.properties) {
            clone.item.properties = {};
        }
        // set the schema version...
        clone.item.properties.schemaVersion = 1.0;
        let isTemplate = false;
        if (clone.item.typeKeywords) {
            isTemplate =
                clone.item.typeKeywords.indexOf("hubInitiativeTemplate") >= 0;
        }
        // ensure source is in item.properties if it has a parent...
        const hasParent = !!clone.data.source;
        if (hasParent && clone.item.properties.source !== clone.data.source) {
            clone.item.properties.source = clone.data.source;
        }
        // convert configuratinSettings to steps array...
        // NOTE: this is only for 'templates', or Custom Initiatives
        if (clone.data.configurationSettings) {
            const config = cloneObject(clone.data.configurationSettings);
            delete clone.data.configurationSettings;
            // get the steps entry...
            const stepCategory = config.find((el) => {
                return el.category === "Steps";
            });
            // hoist step names into an array
            clone.data.values.steps = stepCategory.fields.map((entry) => {
                return entry.fieldName;
            });
            // move the label and tooltip to title and description, in the values.<fieldName> prop
            stepCategory.fields.forEach((entry) => {
                // ensure values prop exists...
                if (!clone.data.values[entry.fieldName]) {
                    clone.data.values[entry.fieldName] = {};
                }
                // assign in values
                clone.data.values[entry.fieldName].title = entry.label;
                clone.data.values[entry.fieldName].description = entry.tooltip;
                clone.data.values[entry.fieldName].id = entry.fieldName;
                // if a .items array exists, rename that to .templates
                if (clone.data.values[entry.fieldName].items) {
                    // if this is a template, then move items to templates...
                    if (isTemplate) {
                        clone.data.values[entry.fieldName].templates =
                            clone.data.values[entry.fieldName].items;
                        delete clone.data.values[entry.fieldName].items;
                    }
                }
                else {
                    // ensure empty arrays
                    clone.data.values[entry.fieldName].items = [];
                    clone.data.values[entry.fieldName].templates = [];
                }
            });
        }
        return clone;
    }
    else {
        return model;
    }
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Apply the 1.0 --> 1.1 Migration to an Initiative Model
 *
 * @param model
 * @param portalUrl
 * @protected
 */
function upgradeToOneDotOne(model, portalUrl) {
    const curVersion = getProp(model, "item.properties.schemaVersion");
    if (curVersion < 1.1) {
        const clone = cloneObject(model);
        // store the schemaVersion
        clone.item.properties.schemaVersion = 1.1;
        // add the assets...
        addDefaultResources(clone, portalUrl);
        if (!clone.data.values.bannerImage) {
            clone.data.values.bannerImage = {
                source: "bannerImage",
                display: {
                    position: { x: "50%", y: "10%" }
                }
            };
        }
        return clone;
    }
    else {
        // console.debug(`Not upgrading CurVersion: ${curVersion}`);
        return model;
    }
}
/**
 * As part of the 1.1 migration, we add a set of default image
 * resources into the hash.
 *
 * @protected
 * @param {IInitiativeModel} model
 * @param {string} [portalUrl]
 * @returns {IInitiativeModel}
 */
function addDefaultResources(model, portalUrl) {
    if (!model.data.assets) {
        model.data.assets = [
            {
                id: "bannerImage",
                url: getResourceUrl(model.item.id, "detail-image.jpg", portalUrl),
                properties: {
                    type: "resource",
                    fileName: "detail-image.jpg",
                    mimeType: "image/jepg"
                },
                license: {
                    type: "none"
                }
            },
            {
                id: "iconDark",
                url: getResourceUrl(model.item.id, "icon-dark.png", portalUrl),
                properties: {
                    type: "resource",
                    fileName: "icon-dark.png",
                    mimeType: "image/png"
                },
                license: {
                    type: "none"
                }
            },
            {
                id: "iconLight",
                url: getResourceUrl(model.item.id, "icon-light.png", portalUrl),
                properties: {
                    type: "resource",
                    fileName: "icon-light.png",
                    mimeType: "image/png"
                },
                license: {
                    type: "none"
                }
            }
        ];
    }
    return model;
}
/**
 * Construct the url for a resource. This is specific to the migration otherwise
 * if would be hoised into a more generic module
 *
 * @protected
 * @param {string} itemId
 * @param {string} resourceName
 * @param {string} [portal]
 * @param {string} [folder]
 * @returns {string}
 */
function getResourceUrl(itemId, resourceName, portal, folder) {
    // default to www.arcgis.com
    const portalUrl = portal || "https://www.arcgis.com/sharing/rest";
    let url = `${portalUrl}/content/items/${itemId}/resources`;
    if (folder) {
        url = `${url}/${folder}/${resourceName}`;
    }
    else {
        url = `${url}/${resourceName}`;
    }
    return url;
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Given an object, conduct checks to see if it is an indicator
 * @protected
 */
const isIndicator = function (obj) {
    let result = false;
    if (Array.isArray(obj.fields) && obj.fields.length > 0) {
        result = true;
    }
    return result;
};
/**
 * Convert the CAS formatted "field" into the new schema
 * @protected
 */
const convertIndicatorField = function (field) {
    return {
        id: field.fieldName,
        name: field.label,
        optional: field.optional || false,
        description: field.tooltip,
        supportedTypes: [...field.supportedTypes]
    };
};
/**
 * Convert a CAS formatted indicator to the .definition in the new schama
 * @protected
 */
const convertIndicatorToDefinition = function (ind) {
    const def = {
        id: ind.fieldName,
        type: "Data",
        name: ind.label || ind.fieldName,
        optional: ind.optional || false,
        definition: {
            description: ind.label || ind.fieldName,
            supportedTypes: [...ind.layerOptions.supportedTypes],
            geometryTypes: [...ind.layerOptions.geometryTypes],
            fields: ind.fields.map(convertIndicatorField)
        }
    };
    return def;
};
/**
 * Given the Indicators entry from a CAS configurationSettings array,
 * convert to an indicators object in the new schema
 * @protected
 */
function convertIndicatorsToDefinitions(indicatorsHash) {
    // the incoming structure should have a .fields property, and what we want will be in there...
    if (!indicatorsHash.fields || !Array.isArray(indicatorsHash.fields)) {
        indicatorsHash.fields = [];
    }
    const defs = indicatorsHash.fields.map(convertIndicatorToDefinition);
    // now we need to create an object which has props for each def
    return defs;
}
/**
 * Given the values hash, locate the properties that are Indicators
 * and return an array of cloned objects
 * @protected
 */
const extractIndicators = function (values) {
    return Object.keys(values).reduce((acc, prop) => {
        const obj = values[prop];
        if (isIndicator(obj)) {
            const clone = cloneObject(obj);
            // we want to keep the prop name as the id
            clone.id = prop;
            acc.push(clone);
        }
        return acc;
    }, []);
};
/**
 * CAS format had the field properties nested but
 * the new format is flattened
 * @protected
 */
const flattenField = function (field) {
    return {
        id: field.id,
        name: field.field.name,
        alias: field.field.alias,
        type: field.field.type
    };
};
/**
 * Given the indicator value object (from the Initiative), extract
 * the properties to create the .source hash
 * @protected
 */
const convertIndicatorValueToSource = function (indicator) {
    return {
        type: "Feature Layer",
        url: indicator.url,
        itemId: indicator.itemId,
        layerId: indicator.layerId,
        name: indicator.name || indicator.id,
        mappings: indicator.fields.map(flattenField)
    };
};
/**
 * Convert the "source" information
 * @protected
 */
const convertIndicator = function (indicator) {
    const result = {
        id: indicator.id,
        type: "Data",
        name: indicator.name || indicator.id,
        definition: {
            description: indicator.name || indicator.id
        },
        source: convertIndicatorValueToSource(indicator)
    };
    return result;
};
/**
 * Given the values hash that contains indicators, extract them
 * convert them, and return the indicators hash
 * @protected
 */
const convertInitiativeIndicators = function (values) {
    return extractIndicators(values).map(convertIndicator);
};
/**
 * Given a Step object, return a new object with the
 * updated schema
 * @protected
 */
const convertStep = function (step) {
    // can't use object spread b/c there are props we don't want to carry forward
    const templates = step.templates || [];
    const items = step.items || [];
    return {
        title: step.title,
        description: step.description,
        id: step.id,
        templateIds: templates.map(byId),
        itemIds: items.map(byId)
    };
};
/**
 * given the array of steps (prop names), construct an array
 * of the actual step objects while also falttening templates
 * and items arrays to just ids
 * @protected
 */
const convertSteps = function (steps, values) {
    if (steps && Array.isArray(steps)) {
        return steps.map(stepName => {
            return convertStep(values[stepName]);
        });
    }
    else {
        return [];
    }
};
/**
 * Extract the id property from an entry
 *
 * @protected
 * @param {*} entry
 * @returns
 */
function byId(entry) {
    return entry.id;
}
/**
 * Apply the 1.1 --> 2.0 Migration to an Initiative Model
 *
 * @protected
 * @param {IInitiativeModel} model
 * @param {string} [portalUrl]
 * @returns {IInitiativeModel}
 */
function upgradeToTwoDotZero(model, portalUrl) {
    const curVersion = getProp(model, "item.properties.schemaVersion");
    if (curVersion < 2) {
        const clone = cloneObject(model);
        // store the schemaVersion
        clone.item.properties.schemaVersion = 2.0;
        // convert the values and values.steps into data.steps
        clone.data.steps = convertSteps(clone.data.values.steps, clone.data.values);
        if (clone.data.values.steps) {
            // remove the data.values.steps properties
            clone.data.values.steps.forEach((propName) => {
                delete clone.data.values[propName];
            });
            delete clone.data.values.steps;
        }
        // convert the indicators
        clone.data.indicators = convertInitiativeIndicators(clone.data.values);
        return clone;
    }
    else {
        return model;
    }
}

/* Copyright (c) 2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Apply the 2.0 --> 2.1 Migration to an Initiative Model
 *
 * @param model
 * @protected
 */
function upgradeToTwoDotOne(model) {
    const currVersion = getProp(model, "item.properties.schemaVersion");
    if (currVersion < 2.1) {
        const clone = cloneObject(model);
        // store the schemaVersion
        clone.item.properties.schemaVersion = 2.1;
        const collaborationGroupId = getProp(model, "item.properties.groupId");
        if (collaborationGroupId) {
            clone.item.properties.collaborationGroupId = collaborationGroupId;
            delete clone.item.properties.groupId;
        }
        return clone;
    }
    else {
        return model;
    }
}

/* Copyright (c) 2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Apply the 2.1 --> 2.2 Migration to an Initiative Model
 * Note: we need this migration to run every time for now, so we
 * will always run it
 *
 * @param model
 * @protected
 */
function upgradeToTwoDotTwo(model) {
    // const currVersion = getProp(model, "item.properties.schemaVersion");
    // if (currVersion < 2.2) {
    const clone = cloneObject(model);
    // store the schemaVersion
    // clone.item.properties.schemaVersion = 2.2;
    const steps = getProp(clone, "data.steps");
    const templateIdsFromSteps = getTemplateIdsFromSteps(steps);
    const recommendedTemplates = getProp(clone, "data.recommendedTemplates") || [];
    const allTemplateIds = templateIdsFromSteps.concat(recommendedTemplates);
    // strip out duplicates
    clone.data.recommendedTemplates = allTemplateIds.reduce((acc, id) => {
        if (acc.indexOf(id) < 0) {
            acc.push(id);
        }
        return acc;
    }, []);
    return clone;
    // } else {
    //   return model;
    // }
}
/**
 * Reduce the solution template ids out of the steps array
 * @param steps is the steps array from an initiative item model.data
 */
function getTemplateIdsFromSteps(steps) {
    let templateIds = [];
    if (Array.isArray(steps)) {
        templateIds = steps.reduce((acc, step) => {
            if (getProp(step, "templateIds.length")) {
                return acc.concat(step.templateIds);
            }
            return acc;
        }, []);
    }
    return templateIds;
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Current Schema Version
 * @protected
 */
const CURRENT_SCHEMA_VERSION = 2.2;
/**
 * Handle Initiative Schema Migrations.
 * If the model is on the current schema, the model object is returned.
 * If a schema migration is applied, a new object will be returned.
 *
 * @export
 * @param {IInitiativeModelFoo} model
 * @param {string} portalUrl
 * @returns {IInitiativeModel}
 */
function migrateSchema(model, portalUrl) {
    // if the model is not on the current schema, we apply all of them
    // the individual migrations will early-exit if the item version
    // is at or above the migration
    if (getProp(model, "item.properties.schemaVersion") === CURRENT_SCHEMA_VERSION) {
        return model;
    }
    else {
        // apply upgrade functions in order...
        model = applyInitialSchema(model, portalUrl);
        model = upgradeToOneDotOne(model, portalUrl);
        model = upgradeToTwoDotZero(model, portalUrl);
        model = upgradeToTwoDotOne(model);
        model = upgradeToTwoDotTwo(model);
        // etc
        return model;
    }
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * getInitiative('3ef...')
 *  .then(initiativeModel => {
 *    // work with the initiative model
 *  })
 * ```
 * Get the initiative item + data in one call. This will also apply schema upgrades
 *
 *
 * @param id - Initiative Item Id
 * @param requestOptions - Initiative request options that may have authentication manager
 * @returns A Promise that will resolve with the Initiative item and data
 * @export
 */
function getInitiative(id, requestOptions) {
    // if we have specifically requested the data...
    return Promise.all([
        getItem(id, requestOptions),
        getItemData(id, requestOptions)
    ])
        .then(result => {
        // shape this into a model
        return {
            item: result[0],
            data: result[1]
        };
    })
        .then(model => {
        return migrateSchema(model, getPortalApiUrl(requestOptions));
    });
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Create an initiative collaboration or open data group
 * Note: This does not ensure a group with the proposed name does not exist. Please use
 * `checkGroupExists
 *
 * @export
 * @param {string} name
 * @param {string} description
 * @param {*} options {isOpenData: boolean, isSharedEditing: boolean}
 * @param {IRequestOptions} requestOptions
 * @returns {Promise<IInitiativeModel>}
 */
function createInitiativeGroup(name, description, options, requestOptions) {
    const group = {
        title: name,
        description,
        access: "org",
        sortField: "title",
        sortOrder: "asc"
    };
    if (options.isOpenData) {
        group.isOpenData = true;
        group.tags = ["Hub Initiative Group", "Open Data"];
        group.access = "public";
    }
    if (options.isSharedEditing) {
        group.capabilities = "updateitemcontrol";
        group._edit_privacy = "on";
        group._edit_contributors = "on";
        group.tags = ["Hub Initiative Group", "initiativeCollaborationGroup"];
    }
    const createOpts = Object.assign({ group }, requestOptions);
    // The protect call does not return the groupId, but we need to return it
    // from this function, so we create a var in this scope to hold it...
    let groupId;
    // create the group
    return createGroup(createOpts)
        .then((result) => {
        groupId = result.group.id;
        // protect it
        const protectOpts = Object.assign({ id: groupId }, requestOptions);
        return protectGroup(protectOpts);
    })
        .then(() => {
        return groupId;
    });
}
/**
 * Remove an Initiative group.
 * This assumes the group is protected
 *
 * @export
 * @param {string} id
 * @param {IRequestOptions} requestOptions
 * @returns {Promise<any>}
 */
function removeInitiativeGroup(id, requestOptions) {
    const opts = Object.assign({ id }, requestOptions);
    return unprotectGroup(opts).then(() => {
        return removeGroup(opts);
    }, ex => {
        // check if the failure is b/c the group does not exist...
        if (ex.messageCode === "COM_0003" && ex.code === 400) {
            return Promise.resolve({ success: true });
        }
        else {
            throw ex;
        }
    });
}
/**
 * Check if a group with a specific title exists in an org
 * If it does exist, and has the correct properties, we return the
 * @export
 * @param {string} title
 * @param {string} orgId
 * @param {IRequestOptions} requestOptions
 * @returns {Promise<boolean>}
 */
function checkGroupExists(title, orgId, requestOptions) {
    const options = Object.assign({ q: `("${title}") AND orgid: ${orgId}` }, requestOptions);
    return searchGroups(options).then((response) => {
        const result = {
            exists: false
        };
        if (response.total > 0) {
            result.exists = true;
            result.group = response.results[0];
        }
        return result;
    });
}
/**
 * Group names must be unique within an organization
 *
 * @export
 * @param {string} title
 * @param {string} orgId
 * @param {number} [step=0]
 * @param {IRequestOptions} requestOptions
 * @returns {Promise<string>}
 */
function getUniqueGroupName(title, orgId, step, requestOptions) {
    let proposedName = title;
    if (step) {
        proposedName = `${title} - ${step}`;
    }
    return checkGroupExists(proposedName, orgId, requestOptions).then(result => {
        if (result.exists) {
            // increment the step...
            step = step + 1;
            return getUniqueGroupName(title, orgId, step, requestOptions);
        }
        else {
            return proposedName;
        }
    });
}
function isSharedEditingGroup(group) {
    return !!(group.capabilities.indexOf("updateitemcontrol") > -1);
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Given an Initiative Template model, create a new Initiative model
 * Note: this does not save the model. It just sets up the new model.
 *
 * @export
 * @param {IInitiativeModel} template
 * @param {*} options
 * @param {IRequestOptions} requestOptions
 * @returns {Promise<IInitiativeModel>}
 */
function createInitiativeModelFromTemplate(template, options) {
    // start by making deep clone of the template...
    const model = {
        item: cloneObject(template.item),
        data: {}
    };
    model.item.title = options.title;
    model.item.tags = ["Hub Initiative"];
    // ensure we use the current type
    model.item.type = INITIATIVE_TYPE_NAME;
    // Assign the typeKeywords: remove hubInitiativeTemplate and add hubInitiative
    model.item.typeKeywords = without(model.item.typeKeywords, "hubInitiativeTemplate");
    model.item.typeKeywords.push("hubInitiative");
    // remove things that are irrelevant or are set server-side
    ["id", "owner", "created_at", "modified_at"].forEach(prop => delete model.item[prop]);
    // we store a bunch of Ids in here so we can avoid fetching /data for common interactions
    model.item.properties = {
        source: template.item.id,
        schemaVersion: CURRENT_SCHEMA_VERSION,
        initialParent: template.item.id
    };
    Object.assign(model.item.properties, options.groupIds); // add the groupIds
    // we create a new .data node so we're cleaning rogue properties as we go
    model.data = {
        assets: cloneObject(template.data.assets),
        steps: cloneObject(template.data.steps),
        indicators: [],
        source: template.item.id,
        values: {
            initiativeKey: options.initiativeKey,
            bannerImage: cloneObject(template.data.values.bannerImage)
        }
    };
    // if recommended exists, copy it over
    if (getProp(template, "data.recommendedTemplates")) {
        model.data.recommendedTemplates = template.data.recommendedTemplates;
    }
    Object.assign(model.data.values, options.groupIds); // add the groupIds, TODO stop storing groupIds in data.values
    // just in case the template does not have a banner image defined...
    if (!model.data.values.bannerImage) {
        model.data.values.bannerImage = {
            source: "bannerImage",
            display: {
                position: { x: "50%", y: "10%" }
            }
        };
    }
    return model;
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Update an existing Initiative Model
 * @param model
 * @param requestOptions
 * @returns {Promise<IInitiativeModel>}
 */
function updateInitiative(model, requestOptions) {
    return updateModel(model, requestOptions);
}

/**
 *  Copy an set of image resources from one item to another
 *
 * @export
 * @param {string} sourceItemId
 * @param {string} targetItemId
 * @param {string} owner
 * @param {[string]} assets
 * @param {IRequestOptions} requestOptions
 * @returns {Promise<boolean>}
 */
function copyImageResources(sourceItemId, targetItemId, owner, assets, requestOptions) {
    const itemResourceUrl = `${getPortalApiUrl(requestOptions)}/content/items/${sourceItemId}/resources`;
    /* istanbul ignore next blob responses are difficult to make cross platform we will just have to trust the isomorphic fetch will do its job */
    return requestOptions.authentication
        .getToken(itemResourceUrl)
        .then(token => {
        const assetPromises = assets.map(assetName => {
            const sourceUrl = `${itemResourceUrl}/${assetName}?token=${token}`;
            return addImageAsResource(targetItemId, owner, assetName, sourceUrl, requestOptions);
        });
        // This is really more of a fire-and-forget thing, as the Portal API
        // adds these requests into a queue for processing
        return Promise.all(assetPromises);
    })
        .then(() => {
        return true;
    });
}
/**
 *  Copy an set of embedded resources to an item
 *
 * @export
 * @param {string} targetItemId destination item id
 * @param {string} owner destination item owner
 * @param {any[]} assets list of assets to copy
 * @param {IRequestOptions} requestOptions
 * @returns {Promise<boolean>}
 */
function copyEmbeddedImageResources(targetItemId, owner, assets, requestOptions) {
    // need to move resources from embedded template into AGO
    const promises = assets.map((asset) => {
        return addImageAsResource(targetItemId, owner, asset.name, asset.url, requestOptions)
            .then(() => {
            return true;
        })
            .catch(() => {
            return true; // swallow the error
        });
    });
    return Promise.all(promises).then(() => {
        return true;
    });
}
/**
 * Load an image from a url, and store it as a resource on an existing item
 *
 * @export
 * @param {string} itemId
 * @param {string} owner
 * @param {string} filename
 * @param {string} url
 * @param {IRequestOptions} requestOptions
 * @returns {Promise<boolean>}
 */
function addImageAsResource(id, owner, name, url, requestOptions) {
    // We must use fetch directly here because AGSjs request determines how to parse
    // the response based on the `?f=<type>` param. But sending f=<anything-other-than-json>
    // to a resource end-point, throws an error. Rock, meet Hard-Place.
    const fetchOptions = {
        method: "GET",
        // ensures behavior mimics XMLHttpRequest. needed to support sending IWA cookies
        credentials: "same-origin"
    };
    return (
    // -------------------------------------------------
    // request(url, opts)
    // -------------------------------------------------
    fetch(url, fetchOptions)
        .then(x => {
        return x.blob();
    })
        .then(blob => {
        return addItemResource({
            id,
            owner,
            name,
            resource: blob,
            authentication: requestOptions.authentication
        }).then((response) => {
            return response.success;
        });
    }));
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Activate an Initiative
 * Creates an instance of an Initiative, based on an Initiative Template.
 *
 * @export
 * @param {string | any} template Initiative Template item or Id
 * @param {string} title
 * @param {any} groupIds hash of group props and ids
 * @param {IRequestOptions} requestOptions
 * @returns {Promise<IInitiativeModel>}
 * @private
 */
function activateInitiative(template, title, groupIds, requestOptions) {
    // make a copy of the request options so we can mutate things if needed...
    const ro = Object.assign({}, requestOptions);
    // create a state container to hold things we accumulate through the various promises
    const state = {
        initiativeKey: camelize(title)
    };
    let promise;
    if (typeof template === "string") {
        promise = getInitiative(template, ro);
    }
    else {
        promise = Promise.resolve(template);
    }
    return promise
        .then(async (templateItemModel) => {
        state.template = templateItemModel;
        // construct the options...
        const options = {
            title,
            description: title,
            initiativeKey: state.initiativeKey,
            groupIds
        };
        // cook the template...
        state.initiativeModel = createInitiativeModelFromTemplate(state.template, options);
        // now save it...
        return addInitiative(state.initiativeModel, ro);
    })
        .then((newModel) => {
        state.initiativeModel = newModel;
        const assets = getProp(state, "template.assets");
        if (assets) {
            return copyEmbeddedImageResources(newModel.item.id, newModel.item.owner, assets, ro);
        }
        else {
            const { id, owner } = newModel.item;
            const wellKnownAssets = [
                "detail-image.jpg",
                "icon-dark.png",
                "icon-light.png"
            ];
            // now copy assets from the parent initiative...
            return copyImageResources(state.template.item.id, id, owner, wellKnownAssets, ro);
        }
    })
        .then(() => {
        const collaborationGroupId = getProp(state, "initiativeModel.item.properties.collaborationGroupId");
        if (collaborationGroupId) {
            // create sharing options and share to the core team
            const shareOptions = Object.assign({ id: state.initiativeModel.item.id, groupId: collaborationGroupId, confirmItemControl: true }, requestOptions);
            return shareItemWithGroup(shareOptions);
        }
        else {
            return Promise.resolve({ success: true });
        }
    })
        .then(() => {
        return state.initiativeModel;
    });
}

/**
 * Remove the linkage between a site and an Initiative
 * Share the site to the Org's default Collaboration Group
 *
 * @export
 * @param {string} siteId
 * @param {*} collaborationGroupId
 * @param {IRequestOptions} requestOptions
 * @returns {Promise<any>}
 */
function detachSiteFromInitiative(siteId, collaborationGroupId, requestOptions) {
    // get the site item
    return getItem(siteId, requestOptions)
        .then((site) => {
        // remove the properties.parentInitiativeId property
        delete site.properties.parentInitiativeId;
        if (collaborationGroupId) {
            // reset the collaborationGroupId to the org's Open Data Group
            site.properties.collaborationGroupId = collaborationGroupId;
        }
        // update the site item
        const opts = Object.assign({ item: site }, requestOptions);
        return updateItem(opts);
    })
        .then(() => {
        // share it with the group if we got a group...
        if (collaborationGroupId) {
            const opts = Object.assign({ id: siteId, groupId: collaborationGroupId }, requestOptions);
            return shareItemWithGroup(opts);
        }
        else {
            return Promise.resolve({ success: true });
        }
    });
}

/**
 * Remove an Initiative, and its associated groups.
 * If the initiative has a site, it will be shared to
 * the organization's main collaboration group
 * @export
 * @param {string} id
 * @param {IRequestOptions} requestOptions
 * @returns {Promise<any>}
 */
function removeInitiative(id, requestOptions) {
    const state = {
        id
    };
    const processId = createId("remove-");
    const startTS = new Date().getTime();
    // first get the item, because we need to also remove the
    // collaboration and open data groups...
    // and the Portal because w need the org's default
    // collaboration group id
    return Promise.all([
        getInitiative(id, requestOptions),
        getSelf(requestOptions)
    ])
        .then(async (results) => {
        const model = results[0];
        const portal = results[1];
        const siteId = model.item.properties.siteId;
        if (siteId) {
            try {
                await getItem(siteId, requestOptions);
                state.hasSite = true;
                state.siteId = siteId;
            }
            catch (e) {
                state.hasSite = false;
            }
        }
        else {
            state.hasSite = false;
        }
        state.initiativeOwner = model.item.owner;
        state.collaborationGroupId = getProp(portal, "properties.openData.settings.groupId");
        // remove the groups...
        const prms = [];
        ["collaborationGroupId", "contentGroupId", "followersGroupId"].forEach(prop => {
            if (model.item.properties[prop]) {
                prms.push(removeInitiativeGroup(model.item.properties[prop], requestOptions).catch(() => Promise.resolve(true)) // swallow group delete failures
                );
            }
        });
        // if the item is protected, un-protect it...
        if (model.item.protected) {
            const opts = Object.assign({ id }, requestOptions);
            prms.push(unprotectItem(opts));
        }
        return Promise.all(prms);
    })
        .then(() => {
        const prms = [];
        const opts = Object.assign({ id, owner: state.initiativeOwner }, requestOptions);
        prms.push(removeItem(opts));
        // if we have a site, let's detach it from the initiative
        if (state.hasSite) {
            prms.push(detachSiteFromInitiative(state.siteId, state.collaborationGroupId, requestOptions));
        }
        return Promise.all(prms);
    })
        .then(() => {
        return { success: true };
    });
}

/**
 * Convert an Initiative Model into a template
 * Includes a hash of resources
 * @param {object} model Initiative model
 * @param {IHubRequestOptions} hubRequestOptions
 */
function convertInitiativeToTemplate(model, hubRequestOptions) {
    // clone this so we don't mess things up...
    const templateItem = model.item;
    const template = cloneObject(model);
    template.item = normalizeSolutionTemplateItem(templateItem);
    // clear url
    delete template.item.url;
    // clear the extent
    delete template.item.extent;
    // clear out item properties...
    delete template.item.properties.source;
    delete template.item.properties.collaborationGroupId;
    delete template.item.properties.contentGroupId;
    delete template.item.properties.followersGroupId;
    delete template.item.properties.groupId; // artifact of 2.0 initiatives
    // on the data side of things...
    delete template.data.values.collaborationGroupId;
    delete template.data.values.contentGroupId;
    delete template.data.values.followersGroupId;
    delete template.data.values.followerGroups;
    delete template.data.values.openDataGroupId;
    // Ensure some properties are set correctly
    template.type = "Hub Initiative Template";
    template.key = `${propifyString(model.item.title)}_${createId("i")}`;
    template.itemId = model.item.id;
    // remove the initiative keyword
    template.item.typeKeywords = without(template.item.typeKeywords, "hubInitiative");
    // add the typeKeyword
    template.item.typeKeywords.push("hubInitiativeTemplate");
    // if we have steps, and not recommended, convert them
    // this may happen if the model is fetched via something other
    // than the getInitiative fn, which applies schema upgrades
    if (getProp(template, "data.steps") &&
        !getProp(template, "data.recommendedTemplates")) {
        // collect up the ids from all the steps into `recommendedTemplates`
        template.data.recommendedTemplates = template.data.steps.reduce((acc, step) => {
            const stepTmpl = step.templateIds || [];
            return acc.concat(stepTmpl);
        }, []);
    }
    // get the resources...
    return getItemResources(template.itemId, hubRequestOptions).then(response => {
        // TODO: compute url to resource
        template.resources = response.resources.map((e) => e.resource);
        return template;
    });
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Search for Initiatives
 *
 * @export
 * @param {ISearchOptions} searchRequestOptions
 * @returns {Promise<ISearchResult>}
 */
function searchInitiatives(searchRequestOptions) {
    // since we are mutating the q, make a copy first...
    const opts = Object.assign({}, searchRequestOptions);
    //  inject the type...
    if (opts.q) {
        opts.q = `${opts.q} AND type: Hub Initiative`;
    }
    else {
        opts.q = `type: Hub Initiative`;
    }
    return searchItems(opts);
}
/**
 * Search for Initiative Templates
 *
 * @export
 * @param {ISearchOptions} searchRequestOptions
 * @returns {Promise<ISearchResult>}
 */
function searchInitiativeTemplates(searchRequestOptions) {
    // since we are mutating the q, make a copy first...
    const opts = Object.assign({}, searchRequestOptions);
    // inject the type and typeKeywords
    if (opts.q) {
        opts.q = `${opts.q} AND type: Hub Initiative AND typekeywords:hubInitiativeTemplate`;
    }
    else {
        opts.q = `type: Hub Initiative AND typekeywords:hubInitiativeTemplate`;
    }
    return searchItems(opts);
}

const getUserTag = (initiativeId) => `hubInitiativeId|${initiativeId}`;
const initiativeIdFromUserTag = (tag) => tag.replace(/^hubInitiativeId\|/, "");
const initiativeIdFromGroupTag = (tag) => tag.replace(/^hubInitiativeFollowers\|/, "");
const getUpdateUrl = (session) => `${getUserUrl(session)}/update`;
const currentlyFollowedInitiativesByUserTag = (user) => user.tags.map(initiativeIdFromUserTag);
const currentlyFollowedInitiativesByGroupMembership = (user) => {
    return user.groups
        .map(group => group.tags)
        .reduce((acc, item) => acc.concat(item), [])
        .filter(tags => tags.indexOf("hubInitiativeFollowers|") === 0)
        .map(initiativeIdFromGroupTag);
};
const currentlyFollowedInitiatives = (user) => {
    const byUserTags = currentlyFollowedInitiativesByUserTag(user);
    const byGroupMembership = currentlyFollowedInitiativesByGroupMembership(user);
    return [...byUserTags, ...byGroupMembership].filter(unique);
};
const isUserFollowing = (user, initiativeId) => currentlyFollowedInitiatives(user).indexOf(initiativeId) > -1;
/**
 * ```js
 * import { followInitiative } from "@esri/hub-initiatives";
 * //
 * followInitiative({
 *   initiativeId,
 *   authentication
 * })
 *   .then(response)
 * ```
 * Follow an initiative.
 */
function followInitiative(requestOptions) {
    // we dont call getUser() because the tags are cached and will be mutating
    return request(getUserUrl(requestOptions.authentication), {
        authentication: requestOptions.authentication
    })
        .then(user => {
        // don't update if already following
        if (isUserFollowing(user, requestOptions.initiativeId)) {
            return Promise.reject(`user is already following this initiative.`);
        }
        // if not already following, pass the user on
        return user;
    })
        .then(user => {
        return getInitiative(requestOptions.initiativeId, requestOptions).then((initiative) => ({
            user,
            initiative,
            hasFollowersGroup: false
        }));
    })
        .then(obj => {
        // if the initiative has a followersGroupId
        const groupId = getProp(obj, "initiative.item.properties.followersGroupId");
        if (groupId) {
            // attempt to join it
            return joinGroup({
                id: groupId,
                authentication: requestOptions.authentication
            }).then(groupJoinResponse => {
                obj.hasFollowersGroup = groupJoinResponse.success;
                return obj;
            });
        }
        return obj;
    })
        .then(obj => {
        if (!obj.hasFollowersGroup) {
            // else add the tag to the user
            const tag = getUserTag(requestOptions.initiativeId);
            const tags = JSON.parse(JSON.stringify(obj.user.tags));
            tags.push(tag);
            return request(getUpdateUrl(requestOptions.authentication), {
                params: { tags },
                authentication: requestOptions.authentication
            });
        }
        // the initiative has a followers group and we successfully joined it
        return { success: true, username: obj.user.username };
    });
}
/**
 * ```js
 * import { unfollowInitiative } from "@esri/hub-initiatives";
 * //
 * unfollowInitiative({
 *   initiativeId,
 *   authentication
 * })
 *   .then(response)
 * ```
 * Un-follow an initiative.
 */
function unfollowInitiative(requestOptions) {
    // we dont call getUser() because the tags are cached and will be mutating
    return request(getUserUrl(requestOptions.authentication), {
        authentication: requestOptions.authentication
    })
        .then(user => {
        // don't update if not already following
        if (!isUserFollowing(user, requestOptions.initiativeId)) {
            return Promise.reject(`user is not following this initiative.`);
        }
        // if already following, pass the user on
        return user;
    })
        .then(user => {
        const tag = getUserTag(requestOptions.initiativeId);
        const tags = JSON.parse(JSON.stringify(user.tags));
        if (tags.indexOf(tag) > -1) {
            // https://stackoverflow.com/questions/9792927/javascript-array-search-and-remove-string
            const index = tags.indexOf(tag);
            tags.splice(index, 1);
            // clear the last tag by passing ",".
            if (tags.length === 0) {
                tags.push(",");
            }
            return request(getUpdateUrl(requestOptions.authentication), {
                params: { tags },
                authentication: requestOptions.authentication
            }).then(_ => user);
        }
        return user;
    })
        .then(user => {
        return getInitiative(requestOptions.initiativeId, requestOptions).then((initiative) => ({ user, initiative }));
    })
        .then(obj => {
        // if there is an initiative followers group and the user is a member, attempt to leave it
        const groupId = getProp(obj, "initiative.item.properties.followersGroupId");
        if (groupId &&
            currentlyFollowedInitiativesByGroupMembership(obj.user).indexOf(requestOptions.initiativeId) > -1) {
            return leaveGroup({
                id: groupId,
                authentication: requestOptions.authentication
            }).then(groupLeaveResponse => {
                return { success: true, username: obj.user.username };
            });
        }
        return { success: true, username: obj.user.username };
    });
}

const DEFAULT_INITIATIVE_TEMPLATE = {
    item: {
        title: "{{solution.title}}",
        snippet: "{{solution.snippet}}",
        description: "{{solution.snippet}}",
        type: "Hub Initiative",
        typeKeywords: ["Hub", "hubInitiative"],
        tags: [],
        extent: "{{organization.defaultExtentBBox}}",
        culture: "{{user.culture}}",
        properties: {},
        url: ""
    },
    data: {
        assets: [],
        indicators: [],
        recommendedTemplates: []
    }
};

/**
 * Get the translated default initiative template
 * @param {IHubRequestOptions} hubRequestOptions
 */
function getDefaultInitiativeTemplate(hubRequestOptions) {
    const culture = getCulture(hubRequestOptions);
    const locale = convertToWellKnownLocale(culture);
    return fetchHubTranslation(locale, hubRequestOptions.portalSelf).then(translation => {
        // now we can get the embedded initiative template
        const tmpl = cloneObject(DEFAULT_INITIATIVE_TEMPLATE);
        // pluck values off the translation, and inject into the tmpl
        tmpl.item.description = getProp(translation, "addons.services.templates.customInitiative.item.description");
        tmpl.item.snippet = getProp(translation, "addons.services.templates.customInitiative.item.snippet");
        tmpl.item.culture = locale;
        // TODO: HANDLE RESOURCES!
        return tmpl;
    });
}

/**
 * Given the id of an initiative, fetch it, and convert to a template
 * If the fetch fails, it will return the default initiative template
 * @param {string} id Initiative Item Id
 * @param {IHubRequestOptions} hubRequestOptions
 * @private
 */
function _fetchAndConvertInitiativeToTemplate(id, hubRequestOptions) {
    return getInitiative(id, hubRequestOptions)
        .then(model => {
        return convertInitiativeToTemplate(model, hubRequestOptions);
    })
        .catch(_ => {
        return getDefaultInitiativeTemplate(hubRequestOptions);
    });
}

// TODO: the initiative will be in the site hash OR we pass it in
/**
 * Given a Site Template, do what we can to return an initiative template
 * In Hub, we expect the system to populate tmpl.properties.initiativeTemplate
 * In other apps, this may not be present, so we use the default template
 * (fetched from the Hub app)
 * @param {object} siteTemplate Site Template
 * @param {IHubRequestOptions} hubRequestOptions
 */
function getInitiativeTemplate(siteTemplate, hubRequestOptions) {
    let tmplPromise;
    const template = getProp(siteTemplate, "properties.initiativeTemplate");
    if (template) {
        tmplPromise = Promise.resolve(template);
    }
    else {
        // return the default template
        tmplPromise = getDefaultInitiativeTemplate(hubRequestOptions);
    }
    return tmplPromise;
}

/**
 * Update the Site associated with an Initiative by setting the
 * `item.properties.siteId` to a new value
 *
 * Used during createSite(...) and any time we need to
 * connect a different Site to an Initiative
 *
 * @param initiativeItemId string | IItem | IModel
 * @param siteId string
 * @param hubRequestOptions IHubRequestOptions
 */
function updateInitiativeSiteId(maybeModel, siteId, hubRequestOptions) {
    // assume it's an IItem
    let itemPromise = Promise.resolve(maybeModel);
    // if we got a string, treat it as an id
    if (typeof maybeModel === "string") {
        if (!isGuid(maybeModel)) {
            return Promise.reject(new Error("updateInitiativeSiteId was passed a string that is not a GUID."));
        }
        else {
            itemPromise = getItem(maybeModel, {
                authentication: hubRequestOptions.authentication
            });
        }
    }
    else {
        // if it's an IModel it will have `.item.id` defined
        if (getProp(maybeModel, "item.id")) {
            const m = maybeModel;
            itemPromise = Promise.resolve(m.item);
        }
    }
    // kick off the promise that will return an IItem
    return itemPromise.then((item) => {
        // oddly, IItem does not have .properties even as an optional O_o
        // regardless, ensure .properties exists
        if (!item.properties) {
            item.properties = {};
        }
        // set the siteId
        item.properties.siteId = siteId;
        // and... update the item
        return updateItem({
            item,
            authentication: hubRequestOptions.authentication
        });
    });
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

/**
 * Create a New Site
 * Creates and protects the site item
 * Uploads any assets/thumbnails passed in via options.assets array
 * If not portal..,
 * - register the site as an application, w/ needed redirect uris
 * - register the domains with the Hub Domain Service
 * @param {Object} model Site Model to create
 * @param {Object} options options hash. Key prop is assets
 * @param {IHubRequestOptions} hubRequestOptions
 */
function createSite(model, options, hubRequestOptions) {
    // ensure properties
    model = ensureRequiredSiteProperties(model, hubRequestOptions.authentication.username, hubRequestOptions.isPortal);
    // create the item
    return createItem({
        item: serializeModel(model),
        owner: model.item.owner,
        authentication: hubRequestOptions.authentication
    })
        .then(createResponse => {
        // hold onto the Id so we can return a complete model
        model.item.id = createResponse.id;
        // protect it
        return protectItem({
            id: model.item.id,
            owner: model.item.owner,
            authentication: hubRequestOptions.authentication
        });
    })
        .then(protectResponse => {
        // do app registration
        return registerSiteAsApplication(model, hubRequestOptions);
    })
        .then(appRegistrationResponse => {
        // store the clientId
        model.data.values.clientId = appRegistrationResponse.client_id;
        // If we have a dcat section, hoist it out as it may contain complex adlib
        // templates that are needed at run-time
        // If we have data.values.dcatConfig, yank it off b/c that may have adlib template stuff in it
        const dcatConfig = cloneObject(model.data.values.dcatConfig);
        delete model.data.values.dcatConfig;
        // with the id of the actual item
        model = interpolateItemId(model);
        // re-attach if we got anything...
        if (dcatConfig) {
            model.data.values.dcatConfig = dcatConfig;
        }
        return updateItem({
            item: serializeModel(model),
            authentication: hubRequestOptions.authentication
        });
    })
        .then(updateResponse => {
        // Handle domains
        return _addSiteDomains(model, hubRequestOptions);
    })
        .then(domainResponses => {
        // upload resources from url
        return uploadResourcesFromUrl(model, options.assets || [], hubRequestOptions);
    })
        .then(uploadResponses => {
        // default to a success response
        let sharePrms = Promise.resolve({ success: true });
        // share it to the collab team if that got created
        const collabGroupId = getProp(model, "item.properties.collaborationGroupId");
        if (collabGroupId) {
            sharePrms = shareItemWithGroup({
                id: model.item.id,
                groupId: collabGroupId,
                authentication: hubRequestOptions.authentication,
                confirmItemControl: true
            });
        }
        return sharePrms;
    })
        .then(resp => {
        // if we created an initiative, ensure we inject the site Id into it
        const initiativeItemId = getProp(model, "item.properties.parentInitiativeId");
        if (initiativeItemId) {
            // get the item and update it
            return updateInitiativeSiteId(initiativeItemId, model.item.id, hubRequestOptions);
        }
        else {
            return Promise.resolve(true);
        }
    })
        .then(resp => {
        return model;
    })
        .catch(err => {
        throw Error(`site-utils::createSite - Error creating site ${JSON.stringify(err)}`);
    });
}

/**
 * Return the correct route for the portal hosted site
 * @param {String} subdomain Subdomain for the site
 * @param {Object} portal Portal Self
 */
function getPortalSiteHostname(subdomain, portal) {
    let port;
    if (portal.allSSL) {
        port = portal.httpsPort !== 443 ? `:${portal.httpsPort}` : "";
    }
    else {
        port = portal.httpPort !== 80 ? `:${portal.httpPort}` : "";
    }
    // portalHostname will include the /<adaptor>
    // i.e. `dev0016196.esri.com/portal`, but since we may need to inject a port
    // we split things apart, and then recombine
    const parts = portal.portalHostname.split("/");
    const host = parts[0];
    let adaptor = "/"; // if there is no /<adaptor> then / should be valid
    if (parts[1]) {
        adaptor = `/${parts[1]}/`;
    }
    // construct the url
    return `${host}${port}${adaptor}apps/sites/#/${subdomain}`;
    // Note: in *most* cases the result would be the same as the line below
    // but there are some scenarios where we need to do the construction
    // so we can't simply use portalHostname
    // return `${portal.portalHostname}/apps/sites/#/${subdomain}`
}

/**
 * Construct the site url for a Portal Site item
 * @param {String} subdomain Subdomain for the site
 * @param {Object} portal Portal Self
 */
function getPortalSiteUrl(subdomain, portal) {
    let protocol = "http:";
    if (portal.allSSL) {
        protocol = "https:";
    }
    const siteRoute = getPortalSiteHostname(subdomain, portal);
    return `${protocol}//${siteRoute}`;
}

/**
 * Default Site Theme
 */
const DEFAULT_THEME = {
    header: {
        background: "#fff",
        text: "#4c4c4c"
    },
    body: {
        background: "#fff",
        text: "#4c4c4c",
        link: "#0079c1"
    },
    button: {
        background: "#0079c1",
        text: "#fff"
    },
    logo: {
        small: ""
    },
    fonts: {
        base: {
            url: "",
            family: "Avenir Next"
        },
        heading: {
            url: "",
            family: "Avenir Next"
        }
    }
};

/**
 * Return the default theme, extended with values from the Org's shared theme
 * @param {Object} portalSelf Org's Portal object
 */
function getTheme(portalSelf) {
    let defaultTheme = cloneObject(DEFAULT_THEME);
    let sharedTheme = getProp(portalSelf, "portalProperties.sharedTheme");
    if (sharedTheme) {
        sharedTheme = removeEmptyProps(sharedTheme);
        defaultTheme = extend(defaultTheme, sharedTheme);
    }
    return defaultTheme;
}

/**
 * Given a Site Template, locate the initiative template
 * then adlib it and create the initiative item
 * @param {object} siteTemplate Site Template
 * @param {object} settings adlib interpolation hash
 * @param {object} transforms adlib transforms hash
 * @param {IHubRequestOptions}} hubRequestOptions
 * @private
 */
function _createSiteInitiative(siteTemplate, settings, transforms, hubRequestOptions) {
    const cache = {};
    return getInitiativeTemplate(siteTemplate, hubRequestOptions)
        .then((initiativeTemplate) => {
        // set the url that will be in the site
        initiativeTemplate.item.url = settings.solution.url;
        initiativeTemplate.item.title = settings.solution.title;
        initiativeTemplate.item.owner = hubRequestOptions.authentication.username;
        initiativeTemplate.item.typeKeywords = without(initiativeTemplate.item.typeKeywords, "Hub Initiative Template");
        initiativeTemplate.item.type = "Hub Initiative";
        // set the teams...
        Object.assign(initiativeTemplate.item.properties, settings.teams);
        // adlib to pick up anything else...
        const initiativeModel = interpolate(initiativeTemplate, settings, transforms);
        // and save it
        return addInitiative(initiativeModel, hubRequestOptions);
    })
        .then((model) => {
        // hold in cache
        cache.model = model;
        // default to a success response
        let sharePrms = Promise.resolve({ success: true });
        // share it to the collab team if that got created
        const collabGroupId = getProp(settings, "teams.collaborationGroupId");
        if (collabGroupId) {
            sharePrms = shareItemWithGroup({
                id: model.item.id,
                groupId: collabGroupId,
                authentication: hubRequestOptions.authentication,
                confirmItemControl: true
            });
        }
        return sharePrms;
    })
        .then((_) => {
        return cache.model;
    })
        .catch((ex) => {
        throw Error(`site-utils::_createSiteInitiative Error ${ex}`);
    });
}

/**
 * Update the tags on the teams after the initiative is created
 * Specifically:
 * - add  `hubInitiativeFollowers|<initiaiveId> to the followers group
 * @param {object} initiativeModel Initiative Model
 * @param {object} teams hash of teams
 * @param {IHubRequestOptions} hubRequestOptions
 * @private
 */
function _updateTeamTags(initiativeModel, teams, hubRequestOptions) {
    let prms = Promise.resolve({ success: true });
    // we have a followers group
    // TODO: COVER THIS WITH TESTS (spying wasnt working)
    /* istanbul ignore if */
    if (getProp(teams, "props.followersGroupId")) {
        // get the followers group out of the teams.groups array
        const followersGroup = teams.groups.find((g) => g.id === teams.props.followersGroupId);
        // now we want to add a tag
        followersGroup.tags.push(`hubInitiativeFollowers|${initiativeModel.item.id}`);
        // now we want to fire off an update
        prms = updateGroup({
            group: followersGroup,
            authentication: hubRequestOptions.authentication
        });
    }
    return prms;
}

/**
 * Convert a Site Template into a Site Model
 * This will create Hub Teams and an Initiative, depending on licensing
 * and privs.
 *
 * The subdomain for the site will be constructed from the `settings.solution.title`
 * unless that contains unicode chars. In that case the initial subdomain will be `site`
 * and `ensureUniqueDomainName` will increment it as necessary (i.e. site-1, site-2 etc)
 *
 * This returns the Model that still needs to be saved!
 * @param {object} template Site Template
 * @param {object} settings Adlib interpolation hash
 * @param {object} transforms hash of transform functions
 * @param {IHubRequestOptions} hubRequestOptions
 */
function createSiteModelFromTemplate(template, settings, transforms, hubRequestOptions) {
    // add url to the assets, ref'ing the original location
    template.assets = addSolutionResourceUrlToAssets(template, hubRequestOptions);
    // We may have templates which lack .properties so let's ensure that exists
    if (!template.item.properties) {
        template.item.properties = {};
    }
    // Kill props we don't want to roll forward if they happen to exist in the template
    [
        "customHostname",
        "externalUrl",
        "contentGroupId",
        "followersGroupId",
        "collaborationGroupId",
        "parentInitiativeId",
    ].forEach((prop) => {
        delete template.data.values[prop];
    });
    const product = getHubProduct(hubRequestOptions.portalSelf);
    let title = getProp(settings, "solution.title") || "New Site";
    // handle issue with titles that are just numbers
    if (typeof title === "number") {
        title = title.toString();
        deepSet(settings, "solution.title", title);
    }
    // We need to carry some state through the promise chains
    // so we initialize an object outside the chain
    const state = {};
    // TODO: Eventually we'd like Enums
    const teamsToCreate = ["core", "content", "followers"];
    return createHubTeams({
        title,
        types: teamsToCreate,
        hubRequestOptions,
    })
        .then((teams) => {
        // fold teams into the settings hash - used mainly for cards
        settings.teams = cloneObject(teams.props);
        state.teams = teams;
        // directly set the teams into the template item as this ensures
        // the team props are always set vs relying on adlib vars to exist
        Object.assign(template.item.properties, teams.props);
        if (getProp(teams, "props.contentGroupId")) {
            deepSet(template, "data.catalog.groups", [teams.props.contentGroupId]);
        }
        // sites need unique domains names
        // We derive this from the title, unless the title has unicode chars
        // in which case we use `site`, and the `ensureUniqueDomainName` function
        // will increment that as needed - i.e. `site-23`
        let domainTitle = title;
        if (hasUnicodeChars(domainTitle)) {
            domainTitle = "site";
        }
        return ensureUniqueDomainName(slugify(domainTitle), hubRequestOptions);
    })
        .then((uniqueSubdomain) => {
        const portal = hubRequestOptions.portalSelf;
        // TODO: Revisit this if/when we do more site templates which we want to maintain their theme
        settings.solution.theme = getTheme(portal);
        // set site-specific settings properties...
        settings.solution.subdomain = uniqueSubdomain;
        // setup the url properties
        if (hubRequestOptions.isPortal) {
            settings.solution.defaultHostname = getPortalSiteHostname(uniqueSubdomain, portal);
            settings.solution.url = getPortalSiteUrl(uniqueSubdomain, portal);
        }
        else {
            const base = stripProtocol(getHubApiUrl(hubRequestOptions));
            settings.solution.defaultHostname = `${uniqueSubdomain}-${portal.urlKey}.${base}`;
            settings.solution.url = `https://${uniqueSubdomain}-${portal.urlKey}.${base}`;
        }
        // create the initiative
        let handleInitiative = Promise.resolve(null);
        if (product !== "portal") {
            handleInitiative = _createSiteInitiative(template, settings, transforms, hubRequestOptions);
        }
        return handleInitiative;
    })
        .then((maybeInitiative) => {
        // if we got an initiative back...
        let teamUpdatePromise = Promise.resolve(null);
        if (maybeInitiative) {
            // add to settings hash so it's available to the site
            // typically all that's used is initiative.item.id
            settings.initiative = maybeInitiative;
            // directly set the parentInitiativeId vs relying on adlib
            template.item.properties.parentInitiativeId = maybeInitiative.item.id;
            // check if we created a followers team because we need to add the initiativeId into a tag
            teamUpdatePromise = _updateTeamTags(maybeInitiative, state.teams, hubRequestOptions);
        }
        return teamUpdatePromise;
    })
        .then((_) => {
        // If we have data.values.dcatConfig, yank it off b/c that may have adlib template
        // for use at run-time vs now
        const dcatConfig = cloneObject(template.data.values.dcatConfig);
        delete template.data.values.dcatConfig;
        const siteModel = interpolate(template, settings, transforms);
        // Special logic for the site title
        // if the title is a string, containing only numbers, then the interpolation will set it as
        // a number, which causes some problems... in that case, we stomp it in as a string...
        if (typeof siteModel.item.title === "number") {
            siteModel.item.title = getProp(settings, "solution.title");
            siteModel.data.values.title = getProp(settings, "solution.title");
        }
        // re-attach dcat...
        if (dcatConfig) {
            siteModel.data.values.dcatConfig = dcatConfig;
        }
        return siteModel;
    })
        .catch((ex) => {
        throw Error(`site-utils::createSiteModelFromTemplate Error ${ex}`);
    });
}
/**
 * From Stackoverflow
 * https://stackoverflow.com/questions/147824/how-to-find-whether-a-particular-string-has-unicode-characters-esp-double-byte
 * This is the highest performance solution, combining three approaches
 */
const unicodeCharRegex = /[^\u0000-\u00ff]/;
function hasUnicodeChars(value) {
    if (value.charCodeAt(0) > 255)
        return true;
    return unicodeCharRegex.test(value);
}

/**
 * Convert an existing site into the Solution template format
 * @param {Object} model Site Model
 * @param {IHubRequestOptions} hubRequestOptions
 */
function convertSiteToTemplate(model, hubRequestOptions) {
    // clone it...
    const tmpl = cloneObject(model);
    // Ensure some properties are set correctly
    tmpl.type = getSiteItemType(hubRequestOptions.isPortal);
    tmpl.key = `${propifyString(model.item.title)}_${createId("i")}`;
    tmpl.itemId = model.item.id;
    // now pass the item off to be normalized
    tmpl.item = normalizeSolutionTemplateItem(tmpl.item);
    // remove the url as it will be set when it's created
    delete tmpl.item.url;
    // Note: We do not template in the various team groups
    // When a site is created from a template, those properties
    // will be injected as needed
    tmpl.item.properties = {
        schemaVersion: SITE_SCHEMA_VERSION,
        children: []
    };
    // inject interpolation propertues where we need them
    tmpl.item.title = "{{solution.title}}";
    tmpl.data.values.subdomain = "{{solution.subdomain}}";
    tmpl.data.values.defaultHostname = "{{solution.defaultHostname}}";
    tmpl.data.values.title = "{{solution.title}}";
    tmpl.data.values.subdomain = "{{solution.subdomain}}";
    tmpl.data.values.defaultHostname = "{{solution.defaultHostname}}";
    delete tmpl.data.catalog;
    // teams are set explicitly vs being interpolated
    delete tmpl.data.values.collaborationGroupId;
    // some props need to be reset to empty strings
    ["updatedAt", "updatedBy", "clientId", "siteId"].forEach(p => {
        tmpl.data.values[p] = "";
    });
    // others we should just delete
    [
        "customHostname",
        "externalUrl",
        "contentGroupId",
        "followersGroupId",
        "groups"
    ].forEach(p => {
        delete tmpl.data.values[p];
    });
    // update the default extent...
    if (getProp(tmpl, "data.values.defaultExtent")) {
        tmpl.data.values.defaultExtent = "{{organization.defaultExtent}}";
    }
    if (getProp(tmpl, "data.values.map.basemaps.primary.extent")) {
        tmpl.data.values.map.basemaps.primary.extent =
            "{{organization.defaultExtent}}";
    }
    // convert the layout...
    const layoutConversion = convertLayoutToTemplate(tmpl.data.values.layout);
    tmpl.data.values.layout = layoutConversion.layout;
    // convert any internal references in /data to the item's id into `{{appId}}`
    tmpl.data = replaceItemId(tmpl.data, tmpl.itemId);
    tmpl.dependencies = getSiteDependencies(model);
    return getItemAssets(model.item, hubRequestOptions).then(assets => {
        tmpl.assets = assets;
        return tmpl;
    });
}

/**
 * Fetch the data for a site item by Id.
 * No schema upgrades are applied.
 * @param {String} id Item Id of the site
 * @param {IHubRequestOptions} hubRequestOptions
 * @private
 */
function _getSiteDataById(id, hubRequestOptions) {
    // Note: this was migrated to ensure consistentcy but it should not be used
    return getItemData(id, hubRequestOptions).then(data => {
        if (data.values.groupId && !data.values.collaborationGroupId) {
            // some 2.0 sites were created with a groupId instead of a collaborationGroupId and then were migrated
            data.values.collaborationGroupId = data.values.groupId;
            delete data.values.groupId;
        }
        return data;
    });
}

/**
 * Return a hash of settings for the groups, including the itemControl flag
 * Both, one or neither of these groups may exist
 * @param {object} siteModel Site Model
 * @private
 */
function _getSecondPassSharingOptions(siteModel) {
    return [
        { prop: "item.properties.contentGroupId", itemControl: false },
        { prop: "item.properties.collaborationGroupId", itemControl: true }
    ].reduce((acc, entry) => {
        const groupId = getProp(siteModel, entry.prop);
        if (groupId) {
            acc.push({
                id: groupId,
                confirmItemControl: entry.itemControl
            });
        }
        return acc;
    }, []);
}

/**
 * Share all the other models to the Site's content and collaboration groups, if
 * those groups were created for the site (depends on user's privs)
 * **DEPRECATED: Use shareItemsToSiteGroups() instead**
 * @param {object} siteModel Site Model
 * @param {Array} solutionModels Array of all models created by the Solution
 * @param {IHubRequestOptions} hubRequestOptions
 * @private
 */
function _shareItemsToSiteGroups(siteModel, solutionModels, hubRequestOptions) {
    /* tslint:disable no-console */
    console.info(`DEPRECATED: _shareItemsToSiteGroups will be removed at v9.0.0. Use shareItemsToSiteGroups instead.`);
    return shareItemsToSiteGroups(siteModel, solutionModels, hubRequestOptions);
}
/**
 * Share all the other models to the Site's content and collaboration groups, if
 * those groups were created for the site (depends on user's privs)
 * @param {object} siteModel Site Model
 * @param {Array} solutionModels Array of all models created by the Solution
 * @param {IHubRequestOptions} hubRequestOptions
 * @exported
 */
function shareItemsToSiteGroups(siteModel, solutionModels, hubRequestOptions) {
    const otherModels = solutionModels.filter(m => {
        return m.item.id !== siteModel.item.id;
    });
    // Create Fail-safe version of share b/c this is not critical
    const failSafeShare = failSafe(shareItemWithGroup, { success: true });
    const groupsToShareTo = _getSecondPassSharingOptions(siteModel);
    // share all items in the solution to the groups
    return Promise.all(otherModels.reduce((acc, m) => {
        const itemSharePromises = groupsToShareTo.map(g => {
            const opts = {
                id: m.item.id,
                groupId: g.id,
                confirmItemControl: g.confirmItemControl,
                authentication: hubRequestOptions.authentication
            };
            return failSafeShare(opts);
        });
        return acc.concat(itemSharePromises);
    }, []));
}

/**
 * Post process the Page models, interpolating various values which would
 * not have existed when the Page item itself was created
 * @param {object} siteModel Site Model
 * @param {object} pageModel Page Model
 * @private
 */
function _secondPassAdlibPages(siteModel, pageModel) {
    // construct a hash of teams that were created and attached to the site
    const teams = [
        "collaborationGroupId",
        "followersGroupId",
        "contentGroupId"
    ].reduce((acc, prop) => {
        const teamId = getProp(siteModel, `item.properties.${prop}`);
        if (teamId) {
            acc[prop] = teamId;
        }
        return acc;
    }, {});
    const settings = {
        teams,
        siteId: getProp(siteModel, "item.id"),
        siteUrl: getProp(siteModel, "item.url"),
        initiative: {
            item: { id: getProp(siteModel, "item.properties.parentInitiativeId") }
        }
    };
    // weld in the site itself so it can be used for some interpolations
    settings[siteModel.key] = siteModel;
    return interpolate(pageModel, settings);
}

/**
 * Locate any Page items that were created in the Solution, and link them back to the Site
 * @param {object} siteModel Site Model
 * @param {Array} solutionModels Array of all models created by the Solution
 * @param {IHubRequestOptions} hubRequestOptions
 * @private
 */
function _updatePages(siteModel, solutionModels, hubRequestOptions) {
    // 2) for any page item, check if it has the site in it's pages array and if not add it
    const pageModels = solutionModels.filter(m => {
        return m.item.type.indexOf("Page") > -1;
    });
    // Create Fail-safe version of update b/c this is not critical
    const failSafeUpdate = failSafe(updateItem, { success: true });
    // check each one of these and see if the siteModel.item.id is in it's data.value.sites array
    // if not, add and update the item
    const siteEntry = {
        id: siteModel.item.id,
        title: siteModel.item.title
    };
    // iterate the pages
    return Promise.all(pageModels.map(m => {
        m.data.values.sites.push(siteEntry);
        m = _secondPassAdlibPages(siteModel, m);
        return failSafeUpdate({
            item: serializeModel(m),
            authentication: hubRequestOptions.authentication
        });
    }));
}

/**
 * Handle the Solution "Second Pass" for Site
 * @param {object} siteModel Site Model
 * @param {Array} solutionModels Array of all models created by the Solution
 * @param {IHubRequestOptions} hubRequestOptions
 */
function siteSecondPass(siteModel, solutionModels, hubRequestOptions) {
    let secondPassPromises = [];
    // get all the items that are not the site
    secondPassPromises = secondPassPromises.concat(_shareItemsToSiteGroups(siteModel, solutionModels, hubRequestOptions));
    // link the pages
    secondPassPromises = secondPassPromises.concat(_updatePages(siteModel, solutionModels, hubRequestOptions));
    return Promise.all(secondPassPromises);
}

/**
 * Get the data for a site item. Used by the UI to back-fill
 * a site model's `.data`, usually after we already have the item
 * as a result of a search.
 * Schema upgrades are applied.
 * @param {Object} item Site Item object
 * @param {IHubRequestOptions} hubRequestOptions
 */
function getDataForSiteItem(item, hubRequestOptions) {
    return getItemData(item.id, hubRequestOptions).then((data) => {
        return upgradeSiteSchema({
            item,
            data,
        });
    });
}

// TODO: once the Hub API User Search is complete, integrate
// it in this function for AGO users, and fallback to the
// current implementation for enterprise users
/**
 * Fetches and returns members given a list of usernames
 *
 * NOTE: AGO's user search endpoint is only available to
 * authenticated users; however, since unauthenticated users
 * should still be able to access public profiles, we support
 * fetching members for both unauthenticated/authenticated
 * users in this function
 *
 * @param {string[]} usernames List of usernames to search for
 * @param {object} requestOptions IHubRequestOptions
 */
function getMembers(usernames, requestOptions) {
    return requestOptions.authentication
        ? authenticatedGetMembers(usernames, requestOptions)
        : unauthenticatedGetMembers(usernames, requestOptions);
}
/**
 * groups the provided usernames in chunks of 100 and creates query
 * strings to batch fetch those members from AGO's user search
 * (/community/users) endpoint. AGO will only return the subset of
 * members which the current user has access to.
 *
 * @param {Array} usernames List of usernames to search for
 * @param {object} requestOptions IHubRequestOptions
 */
function authenticatedGetMembers(usernames, requestOptions) {
    const urlPath = `${getPortalUrl(requestOptions)}/sharing/rest/community/users`;
    const chunkSize = 100;
    const chunkedUsernames = [];
    for (let i = 0; i < usernames.length; i += chunkSize) {
        chunkedUsernames.push(usernames.slice(i, i + chunkSize));
    }
    const chunkedOptions = chunkedUsernames.map(chunk => {
        const q = chunk.map(username => `username:${username}`).join(" OR ");
        return {
            urlPath,
            requestOptions: Object.assign({ params: { q, num: chunk.length } }, requestOptions)
        };
    });
    return batch(chunkedOptions, batchMemberRequest).then(batchedMembers => {
        return batchedMembers.reduce((flat, toFlatten) => {
            return flat.concat(toFlatten);
        }, []);
    });
}
/**
 * fetch members individually from AGO's /community/users/{username}
 * endpoint. This endpoint, unlike the users search endpoint which
 * only returns the subset of members that the current user has acces
 * to, will only limit the information returned for each member
 * (i.e. firstname, lastname and fullname will be empty strings if
 * an unauthenticated user tries to access a non-public profile).
 *
 * @param {Array} usernames List of usernames to search for
 * @param {object} requestOptions IHubRequestOptions
 */
function unauthenticatedGetMembers(usernames, requestOptions) {
    return Promise.all(usernames.map(username => {
        return getUser(Object.assign({ username }, requestOptions))
            .then(response => {
            // if the firstname, lastname, and fullname are empty strings, assume that the
            // user is not accessible (i.e. not a public profile) and should not be returned
            // to the unauthenticated user
            if (response.firstName || response.lastName || response.fullName) {
                return response;
            }
        })
            .catch(e => {
            Logger.error(`Error fetching user, ${username}, from AGO user endpoint, ${e}`);
            return null;
        });
    })).then(members => members.filter(Boolean));
}
/**
 * callback function to batch the requests to the user search endpoint
 * if >100 usernames are supplied. This is necessary because the
 * endpoint sets the maximum number of results to be included in the
 * result set response to 100
 *
 * @param options IBatchMemberRequestOptions
 */
function batchMemberRequest(options) {
    return request(options.urlPath, options.requestOptions)
        .then(response => response.results)
        .catch(e => {
        Logger.error(`Error fetching members from AGO user search endpoint: ${e}`);
        return [];
    });
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

/**
 * The privately scoped cache
 */
const _cache = {};
/**
 * A decorator factory function that accepts the cache decorator configuration params
 *
 * @param params An ICacheParams object
 * @returns The cache decorator function
 */
function CacheDecoratorFactory(params = {}) {
  const { scope = 'default', // defaults to `default` cache scope
  getKey = (...[first]) => first, // defaults to first method argument
  ttl = 0 // defaults to indefinite caching
   } = params;
  if (!scope || typeof scope !== 'string') {
    throw new Error('must provide a valid cache scope');
  }
  if (ttl && (typeof ttl !== 'number' || ttl < 0)) {
    throw new Error('ttl must be a a number greater than or equal to zero');
  }
  if (typeof getKey !== 'function') {
    throw new Error('getKey must be a function');
  }
  /**
   * A decorator function that augments a class method with client caching behavior
   *
   * @param _target A reference to the class prototype
   * @param _propertyKey The name of the method being decorated
   * @param descriptor A PropertyDescriptor for the method being decorated
   * @returns A new PropertyDescriptor with caching behavior
   */
  function CacheDecorator(_target, _propertyKey, descriptor) {
    const { value: original } = descriptor;
    /**
     * A function that wraps the decorated function's implementation
     * with caching behavior.
     *
     * @remarks
     *
     * We could utilize the [Cache Web API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) to do request-level caching, but it
     * requires event assignment and garbage collection which would be more
     * appropriately handled in component lifecycle methods. Stencil does not
     * currently support class-level decorators or class inheritiance, but
     * [Stencil.js issue #2921](https://github.com/ionic-team/stencil/pull/2921) proposes adding a `Mixin` decorator that would
     * allow similar compositional patterns. If the `Mixin` decorator comes to
     * fruition, we can revisit this client caching strategy.
     *
     * @param args An array of method arguments
     * @returns A cached result
     */
    function value(...args) {
      // when the scope doesn't already exist
      if (!_cache[scope]) {
        // create it
        _cache[scope] = {};
      }
      // derive the cache key
      const key = getKey(...args);
      if (!key || typeof key !== 'string') {
        throw new Error('getKey must return a string');
      }
      // check for hits in the cache
      let cacheResult = _cache[scope][key];
      const now = Date.now();
      // if no hits in the cache for the key OR the ttl is > 0
      // and the ttl has expired
      if (!cacheResult || (ttl && now > cacheResult.created + ttl)) {
        // create a new cache result
        cacheResult = {
          created: now,
          result: original.apply(this, args)
        };
        _cache[scope][key] = cacheResult;
      }
      return cacheResult.result;
    }
    return Object.assign(Object.assign({}, descriptor), { value });
  }
  ;
  return CacheDecorator;
}
;

export { CacheDecoratorFactory as C, getTeamById as a, getMembers as g };
