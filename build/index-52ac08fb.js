import { R as RemoteServerError$1, K as buildUrl, G as parseDatasetId } from './index-5ebfac40.js';

class RemoteServerError extends RemoteServerError$1 {
    constructor(message, url, status, error) {
        super(message, url, status);
        this.error = error;
    }
}
/**
 * returns Promise that resolves token to use in Discussions API requests
 *
 * @export
 * @param {IHubRequestOptions} options
 * @return {*}  {Promise<string>}
 */
function authenticateRequest(options) {
    const { token, authentication } = options;
    let tokenPromise = () => {
        return Promise.resolve(token);
    };
    if (authentication) {
        tokenPromise = authentication.getToken.bind(authentication, authentication.portal);
    }
    return tokenPromise();
}
/**
 * parses IHubRequestOptions and makes request against Discussions API
 *
 * @export
 * @template T
 * @param {string} route
 * @param {IHubRequestOptions} options
 * @param {string} [token]
 * @return {*}  {Promise<T>}
 */
function apiRequest(route, options, token) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
    }
    const opts = {
        headers,
        method: options.httpMethod || "GET",
        mode: options.mode,
        cache: options.cache,
        credentials: options.credentials,
    };
    const apiBase = buildUrl({
        // TODO: we _want_ to use getHubApiUrl(),
        // but have to deal w/ the fact that this package overwrites IHubRequestOptions
        host: options.hubApiUrl || "https://hub.arcgis.com",
        path: "/api/discussions/v1",
    });
    if (options.params) {
        if (options.httpMethod === "GET") {
            const queryParams = new URLSearchParams(options.params).toString();
            route += `?${queryParams}`;
        }
        else {
            opts.body = JSON.stringify(options.params);
        }
    }
    const url = [apiBase.replace(/\/$/, ""), route.replace(/^\//, "")].join("/");
    return fetch(url, opts).then((res) => {
        if (res.ok) {
            return res.json();
        }
        else {
            const { statusText, status } = res;
            return res.json().then((err) => {
                throw new RemoteServerError(statusText, url, status, JSON.stringify(err.message));
            });
        }
    });
}

/**
 * method that authenticates and makes requests to Discussions API
 *
 * @export
 * @template T
 * @param {string} url
 * @param {IHubRequestOptions} options
 * @return {*}  {Promise<T>}
 */
// NOTE: feasibly this could be replaced with @esi/hub-common hubApiRequest,
// if that method didn't prepend `/api/v3` to the supplied path. Additionally,
// there is the difference that hubApiRequest sets Authorization header without `Bearer`
// https://github.com/Esri/hub.js/blob/f35b1a0a868916bd07e1dfd84cb084bc2c876267/packages/common/src/request.ts#L62
function request(url, options) {
    return authenticateRequest(options).then(token => {
        return apiRequest(url, options, token);
    });
}

/* tslint:disable unified-signatures */
/**
 * search posts
 *
 * @export
 * @param {ISearchPostsOptions} options
 * @return {*}  {Promise<IPagedResponse<IPost>>}
 */
function searchPosts(options) {
    const url = `/posts`;
    options.httpMethod = "GET";
    return request(url, options);
}
/**
 * create post
 *
 * @export
 * @param {ICreatePostOptions} options
 * @return {*}  {Promise<IPost>}
 */
function createPost(options) {
    const url = `/posts`;
    options.httpMethod = "POST";
    return request(url, options);
}
/**
 * create reply to post
 *
 * @export
 * @param {ICreateReplyOptions} options
 * @return {*}  {Promise<IPost>}
 */
function createReply(options) {
    const url = `/posts/${options.postId}/reply`;
    options.httpMethod = "POST";
    return request(url, options);
}
/**
 * fetch post
 *
 * @export
 * @param {IFetchPostOptions} options
 * @return {*}  {Promise<IPost>}
 */
function fetchPost(options) {
    const url = `/posts/${options.postId}`;
    options.httpMethod = "GET";
    return request(url, options);
}
/**
 * remove post
 *
 * @export
 * @param {IRemovePostOptions} options
 * @return {*}  {Promise<IRemovePostResponse>}
 */
function removePost(options) {
    const url = `/posts/${options.postId}`;
    options.httpMethod = "DELETE";
    return request(url, options);
}
/**
 * update post
 * NOTE: this method currently only update post.title and post.body
 *
 * @export
 * @param {IUpdatePostOptions} options
 * @return {*}  {Promise<IPost>}
 */
function updatePost(options) {
    const url = `/posts/${options.postId}`;
    options.httpMethod = "PATCH";
    return request(url, options);
}
/**
 * update post channel
 * NOTE: this method will change the channel a post belongs to
 *
 * @export
 * @param {IUpdatePostSharingOptions} options
 * @return {*}  {Promise<IPost>}
 */
function updatePostSharing(options) {
    const url = `/posts/${options.postId}/sharing`;
    options.httpMethod = "PATCH";
    return request(url, options);
}
/**
 * update post status
 * NOTE: this method will only update a post's status
 *
 * @export
 * @param {IUpdatePostStatusOptions} options
 * @return {*}  {Promise<IPost>}
 */
function updatePostStatus(options) {
    const url = `/posts/${options.postId}/status`;
    options.httpMethod = "PATCH";
    return request(url, options);
}

/**
 * search channels
 *
 * @export
 * @param {ISearchChannelsOptions} options
 * @return {*}  {Promise<IPagedResponse<IChannel>>}
 */
function searchChannels(options) {
    options.httpMethod = "GET";
    return request(`/channels`, options);
}
/**
 * create channel
 *
 * @export
 * @param {ICreateChannelOptions} options
 * @return {*}  {Promise<IChannel>}
 */
function createChannel(options) {
    options.httpMethod = "POST";
    return request(`/channels`, options);
}
/**
 * fetch channel
 *
 * @export
 * @param {IFetchChannelOptions} options
 * @return {*}  {Promise<IChannel>}
 */
function fetchChannel(options) {
    options.httpMethod = "GET";
    return request(`/channels/${options.channelId}`, options);
}
/**
 * update channel
 * NOTE: only updates channel settings properties (softDelete, allowedReactions, etc). A Channel's
 * access and groups cannot be updated.
 *
 * @export
 * @param {IUpdateChannelOptions} options
 * @return {*}  {Promise<IChannel>}
 */
function updateChannel(options) {
    options.httpMethod = "PATCH";
    return request(`/channels/${options.channelId}`, options);
}
/**
 * remove channel
 *
 * @export
 * @param {IRemoveChannelOptions} options
 * @return {*}
 */
function removeChannel(options) {
    options.httpMethod = "DELETE";
    return request(`/channels/${options.channelId}`, options);
}

/**
 * create reaction to post
 *
 * @export
 * @param {ICreateReactionOptions} options
 * @return {*}  {Promise<IReaction>}
 */
function createReaction(options) {
    options.httpMethod = "POST";
    return request(`/reactions`, options);
}
/**
 * remove reaction
 *
 * @export
 * @param {IRemoveReactionOptions} options
 * @return {*}  {Promise<IRemoveReactionResponse>}
 */
function removeReaction(options) {
    const { reactionId } = options;
    options.httpMethod = "DELETE";
    return request(`/reactions/${reactionId}`, options);
}

/**
 * sort orders
 *
 * @export
 * @enum {number}
 */
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder || (SortOrder = {}));
/**
 * reactions to posts
 *
 * @export
 * @enum {number}
 */
var PostReaction;
(function (PostReaction) {
    PostReaction["THUMBS_UP"] = "thumbs_up";
    PostReaction["THUMBS_DOWN"] = "thumbs_down";
    PostReaction["THINKING"] = "thinking";
    PostReaction["HEART"] = "heart";
    PostReaction["ONE_HUNDRED"] = "one_hundred";
    PostReaction["SAD"] = "sad";
    PostReaction["LAUGH"] = "laugh";
    PostReaction["SURPRISED"] = "surprised";
})(PostReaction || (PostReaction = {}));
/**
 * platform sharing access values
 *
 * @export
 * @enum {number}
 */
var SharingAccess;
(function (SharingAccess) {
    SharingAccess["PUBLIC"] = "public";
    SharingAccess["ORG"] = "org";
    SharingAccess["PRIVATE"] = "private";
})(SharingAccess || (SharingAccess = {}));
/**
 * possible statuses of a post
 *
 * @export
 * @enum {number}
 */
var PostStatus;
(function (PostStatus) {
    PostStatus["PENDING"] = "pending";
    PostStatus["APPROVED"] = "approved";
    PostStatus["REJECTED"] = "rejected";
    PostStatus["DELETED"] = "deleted";
    PostStatus["HIDDEN"] = "hidden";
})(PostStatus || (PostStatus = {}));
/**
 * possible discussionn content types, i.e. a post can be about an item, dataset, or group
 *
 * @export
 * @enum {number}
 */
// TODO: Deprecate ITEM and DATASET keys at v10.0.0
var DiscussionType;
(function (DiscussionType) {
    DiscussionType["DATASET"] = "dataset";
    DiscussionType["ITEM"] = "item";
    DiscussionType["GROUP"] = "group";
    DiscussionType["CONTENT"] = "content";
})(DiscussionType || (DiscussionType = {}));
/**
 * source of a post, i.e. app context
 *
 * @export
 * @enum {number}
 */
var DiscussionSource;
(function (DiscussionSource) {
    DiscussionSource["HUB"] = "hub";
    DiscussionSource["AGO"] = "ago";
    DiscussionSource["URBAN"] = "urban";
})(DiscussionSource || (DiscussionSource = {}));
/**
 * relations of post entity
 *
 * @export
 * @enum {number}
 */
var PostRelation;
(function (PostRelation) {
    PostRelation["REPLIES"] = "replies";
    PostRelation["REACTIONS"] = "reactions";
    PostRelation["PARENT"] = "parent";
    PostRelation["CHANNEL"] = "channel";
})(PostRelation || (PostRelation = {}));
/**
 * relations of channel entity
 *
 * @export
 * @enum {number}
 */
var ChannelRelation;
(function (ChannelRelation) {
    ChannelRelation["SETTINGS"] = "settings";
})(ChannelRelation || (ChannelRelation = {}));
/**
 * relations of reaction entity
 *
 * @export
 * @enum {number}
 */
var ReactionRelation;
(function (ReactionRelation) {
    ReactionRelation["POST"] = "post";
})(ReactionRelation || (ReactionRelation = {}));

/**
 * Utility that parses a discussion URI string into its component parts
 *
 * @export
 * @param {string} discussion A discussion URI
 * @return {string}
 */
function parseDiscussionURI(discussion) {
    let url;
    try {
        url = new URL(discussion);
    }
    catch (e) {
        throw new Error(`Invalid URI: ${discussion}`);
    }
    const source = url.protocol.replace(":", "");
    const [, pathname] = discussion.split("://");
    const [type, identifier] = pathname.split("/");
    let id;
    let layer;
    if (identifier) {
        const { itemId, layerId } = parseDatasetId(identifier);
        [id, layer] = [itemId, layerId];
    }
    const searchParams = new URLSearchParams(url.search.replace("?", ""));
    const features = (searchParams.has("id") && searchParams.get("id").split(",")) || null;
    const attribute = (searchParams.has("attribute") && searchParams.get("attribute")) || null;
    return {
        source,
        type,
        id: id || null,
        layer: layer || null,
        features,
        attribute,
    };
}
/**
 * NOT IMPLEMENTED: this will inspect a group"s properties to determine if it is "discussable"
 *
 * @export
 * @param {IGroup} group
 * @return {boolean}
 */
function isGroupDiscussable(group) {
    /* tslint:disable no-console */
    console.warn("DEPRECATED: Use isDiscussable() instead. isGroupDiscussable will be removed at v10.0.0");
    return isDiscussable(group);
}
/**
 * NOT IMPLEMENTED: this will inspect an item"s properties to determine if it is "discussable"
 *
 * @export
 * @param {IItem} item
 * @return {boolean}
 */
function isItemDiscussable(item) {
    /* tslint:disable no-console */
    console.warn("DEPRECATED: Use isDiscussable() instead. isItemDiscussable will be removed at v10.0.0");
    return isDiscussable(item);
}
/**
 * Utility to determine if a given IGroup, IItem or IHubContent
 * is discussable.
 *
 * NOT IMPLEMENTED
 *
 * @export
 * @param {IGroup|IItem|IHubContent} The subject to evaluate
 * @return {boolean}
 */
function isDiscussable(subject) {
    // TODO: implement
    return true;
}

/**
 * Utility that returns reducer function that filters a user's groups
 * by membership type and produces an array of group id's
 *
 *
 * @export
 * @param {GroupMembership[]} membershipTypes
 * @return {*}  {((memo: string[], group: IGroup) => string[])}
 */
function reduceByGroupMembership(membershipTypes) {
    return function (memo, group) {
        if (membershipTypes.indexOf(group.userMembership.memberType) > -1) {
            memo.push(group.id);
        }
        return memo;
    };
}
/**
 * Utility that checks if a user is a portal org admin (default role)
 *
 * @export
 * @param {IUser} user
 * @return {*}  {boolean}
 */
// NOTE: this is not the same as @esri/arcgis-rest-portal isOrgAdmin,
// which first resolves `user` from `IUserRequestOptions` to make this determination
// https://github.com/Esri/arcgis-rest-js/blob/7ab072184f89dcb35367518101ee4abeb5a9d112/packages/arcgis-rest-portal/src/sharing/helpers.ts#L45
function isOrgAdmin(user) {
    return user.role === "org_admin" && !user.roleId;
}

function intersectGroups(membershipTypes, strict) {
    return (user, channel) => {
        const { groups: sharedGroups } = channel;
        const { groups: userGroups } = user;
        const eligibleUserGroups = userGroups.reduce(reduceByGroupMembership(membershipTypes), []);
        const method = strict ? "every" : "some";
        return sharedGroups[method](group => eligibleUserGroups.indexOf(group) > -1);
    };
}
function isChannelOrgMember(channel, user) {
    // orgs.length = 1 until collaboration/discussion between many orgs is ideated
    return channel.orgs.length === 1 && channel.orgs.indexOf(user.orgId) > -1;
}
function isChannelOrgAdmin(channel, user) {
    return isOrgAdmin(user) && channel.orgs.indexOf(user.orgId) > -1;
}
/**
 * Utility to determine whether User can view posts belonging to Channel
 *
 * @export
 * @param {IChannel} channel
 * @param {IUser} user
 * @return {*}  {boolean}
 */
function canReadFromChannel(channel, user) {
    if (channel.access === "private") {
        // ensure user is member of at least one group
        return intersectGroups(["member", "owner", "admin"])(user, channel);
    }
    else if (channel.access === "org") {
        return isChannelOrgMember(channel, user);
    }
    return true;
}
/**
 * Utility to determine whether User can modify channel settings and posts belonging to Channel
 *
 * @export
 * @param {IChannel} channel
 * @param {IUser} user
 * @return {*}  {boolean}
 */
function canModifyChannel(channel, user) {
    if (channel.access === "private") {
        // ensure user is owner/admin of at least one group
        return intersectGroups(["owner", "admin"])(user, channel);
    }
    // if org or public channel, must be org admin
    return isChannelOrgAdmin(channel, user);
}
/**
 * Utility to determine whether User can create Channel of provided IChannel properties
 *
 * @export
 * @param {IChannel} channel
 * @param {IUser} user
 * @return {*}  {boolean}
 */
function canCreateChannel(channel, user) {
    if (channel.access === "private") {
        // ensure user is member of all groups included
        return intersectGroups(["owner", "admin", "member"], true)(user, channel);
    }
    // if org or public channel, must be org admin
    return isChannelOrgAdmin(channel, user);
}
/**
 * Utility to determine whether User can create posts to Channel
 *
 * @export
 * @param {IChannel} channel
 * @param {IUser} user
 * @return {*}  {boolean}
 */
function canPostToChannel(channel, user) {
    if (channel.access === "private") {
        // ensure user is member of at least one
        return intersectGroups(["owner", "admin", "member"])(user, channel);
    }
    else if (channel.access === "org") {
        return isChannelOrgMember(channel, user);
    }
    else if (user.username === "anonymous") {
        return channel.allowAnonymous;
    }
    return true;
}
/**
 * Utility to determine whether a Channel definition (inner) is encapsulated by another Channel's definition (outer)
 *
 * @export
 * @param {IChannel} outer -- access and groups that should contain inner access and groups
 * @param {(IChannel | IPlatformSharing)} inner -- access and groups that should be contained by outer access and groups
 * @return {*}  {boolean}
 */
function isChannelInclusive(outer, inner) {
    let valid;
    let err;
    if (outer.access === "private" && outer.groups.length === 1) {
        valid = inner.access === "private" && inner.groups[0] === outer.groups[0];
        if (!valid) {
            err = "replies to private post must be shared to same team";
        }
    }
    else if (outer.access === "private") {
        valid =
            inner.access === "private" &&
                inner.groups.every((group) => outer.groups.indexOf(group) > -1);
        if (!valid) {
            err = "replies to shared post must be shared to subset of same teams";
        }
    }
    else if (outer.access === "org" && inner.access === "org") {
        valid = inner.orgs.every((org) => outer.orgs.indexOf(org) > -1);
        if (!valid) {
            err = "replies to org post must be shared to subset of same orgs";
        }
    }
    else if (outer.access === "org") {
        valid = inner.access !== "public";
        if (!valid) {
            err = "replies to org post cannot be shared to public";
        }
    }
    if (err) {
        throw new Error(err);
    }
    return valid;
}

/**
 * Utility that determines whether a Channel allows a given PostReaction
 *
 * @export
 * @param {IChannel} channel
 * @param {PostReaction} value
 * @return {*}  {boolean}
 */
function canCreateReaction(channel, value) {
    const { allowReaction, allowedReactions } = channel;
    if (allowReaction) {
        if (allowedReactions) {
            return allowedReactions.indexOf(value) > -1;
        }
        return true;
    }
    return false;
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

export { DiscussionType as D, SortOrder as S, fetchChannel as a, isItemDiscussable as b, createReply as c, createPost as d, SharingAccess as e, fetchPost as f, isGroupDiscussable as i, parseDiscussionURI as p, removePost as r, searchPosts as s, updatePost as u };
