import { c as cleanUrl, _ as __assign, r as request, b as appendCustomParams, w as warn, f as __spreadArrays } from './index-5c68fb28.js';

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Helper that returns the appropriate portal url for a given request. `requestOptions.portal` is given
 * precedence over `authentication.portal`. If neither `portal` nor `authentication` is present,
 * `www.arcgis.com/sharing/rest` is returned.
 *
 * @param requestOptions - Request options that may have authentication manager
 * @returns Portal url to be used in API requests
 */
function getPortalUrl(requestOptions) {
    if (requestOptions === void 0) { requestOptions = {}; }
    // use portal in options if specified
    if (requestOptions.portal) {
        return cleanUrl(requestOptions.portal);
    }
    // if auth was passed, use that portal
    if (requestOptions.authentication) {
        // the portal url is already scrubbed in the auth package
        return requestOptions.authentication.portal;
    }
    // default to arcgis.com
    return "https://www.arcgis.com/sharing/rest";
}

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Serialize an item and its data into a json format accepted by the Portal API for create and update operations
 *
 * @param item Item to be serialized
 * @returns a formatted json object to be sent to Portal
 */
function serializeItem(item) {
    // create a clone so we're not messing with the original
    var clone = JSON.parse(JSON.stringify(item));
    // binary data needs POSTed as a `file`
    // JSON object literals should be passed as `text`.
    if (clone.data) {
        (typeof Blob !== "undefined" && item.data instanceof Blob) ||
            // Node.js doesn't implement Blob
            item.data.constructor.name === "ReadStream"
            ? (clone.file = item.data)
            : (clone.text = item.data);
        delete clone.data;
    }
    return clone;
}
/**
 * `requestOptions.owner` is given priority, `requestOptions.item.owner` will be checked next. If neither are present, `authentication.getUserName()` will be used instead.
 */
function determineOwner(requestOptions) {
    if (requestOptions.owner) {
        return Promise.resolve(requestOptions.owner);
    }
    else if (requestOptions.item && requestOptions.item.owner) {
        return Promise.resolve(requestOptions.item.owner);
    }
    else if (requestOptions.authentication &&
        requestOptions.authentication.getUsername) {
        return requestOptions.authentication.getUsername();
    }
    else {
        return Promise.reject(new Error("Could not determine the owner of this item. Pass the `owner`, `item.owner`, or `authentication` option."));
    }
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { updateItem } from "@esri/arcgis-rest-portal";
 * //
 * updateItem({
 *   item: {
 *     id: "3ef",
 *     description: "A three hour tour"
 *   },
 *   authentication
 * })
 *   .then(response)
 * ```
 * Update an Item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/update-item.htm) for more information.
 *
 * @param requestOptions - Options for the request.
 * @returns A Promise that updates an item.
 */
function updateItem(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = requestOptions.folderId
            ? getPortalUrl(requestOptions) + "/content/users/" + owner + "/" + requestOptions.folderId + "/items/" + requestOptions.item.id + "/update"
            : getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.item.id + "/update";
        // serialize the item into something Portal will accept
        requestOptions.params = __assign(__assign({}, requestOptions.params), serializeItem(requestOptions.item));
        return request(url, requestOptions);
    });
}
/**
 * ```js
 * import { updateItemInfo } from "@esri/arcgis-rest-portal";
 * //
 * updateItemInfo({
 *   id: '3ef',
 *   file: file,
 *   authentication
 * })
 *   .then(response)
 * ```
 * Update an info file associated with an item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/update-info.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that updates an item info file.
 */
function updateItemInfo(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/updateinfo";
        // mix in user supplied params
        requestOptions.params = __assign({ folderName: requestOptions.folderName, file: requestOptions.file }, requestOptions.params);
        return request(url, requestOptions);
    });
}
/**
 * ```js
 * import { updateItemResource } from "@esri/arcgis-rest-portal";
 * //
 * updateItemResource({
 *   id: '3ef',
 *   resource: file,
 *   name: 'bigkahuna.jpg',
 *   authentication
 * })
 *   .then(response)
 * ```
 * Update a resource associated with an item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/update-resources.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that updates an item resource.
 */
function updateItemResource(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/updateResources";
        // mix in user supplied params
        requestOptions.params = __assign({ file: requestOptions.resource, fileName: requestOptions.name, resourcesPrefix: requestOptions.prefix, text: requestOptions.content }, requestOptions.params);
        // only override the access specified previously if 'private' is passed explicitly
        if (typeof requestOptions.private !== "undefined") {
            requestOptions.params.access = requestOptions.private
                ? "private"
                : "inherit";
        }
        return request(url, requestOptions);
    });
}
/**
 * ```js
 * import { moveItem } from "@esri/arcgis-rest-portal";
 * //
 * moveItem({
 *   itemId: "3ef",
 *   folderId: "7c5",
 *   authentication: userSession
 * })
 * ```
 * Move an item to a folder. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/move-item.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that resolves with owner and folder details once the move has been completed
 */
function moveItem(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.itemId + "/move";
        var folderId = requestOptions.folderId;
        if (!folderId) {
            folderId = "/";
        }
        requestOptions.params = __assign({ folder: folderId }, requestOptions.params);
        return request(url, requestOptions);
    });
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { addItemData } from "@esri/arcgis-rest-portal";
 * //
 * addItemData({
 *   id: '3ef',
 *   data: file,
 *   authentication
 * })
 *   .then(response)
 * ```
 * Send a file or blob to an item to be stored as the `/data` resource. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/update-item.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with an object reporting
 *        success/failure and echoing the item id.
 */
function addItemData(requestOptions) {
    var options = __assign({ item: {
            id: requestOptions.id,
            data: requestOptions.data
        } }, requestOptions);
    delete options.id;
    delete options.data;
    return updateItem(options);
}
/**
 * ```js
 * import { addItemRelationship } from "@esri/arcgis-rest-portal";
 * //
 * addItemRelationship({
 *   originItemId: '3ef',
 *   destinationItemId: 'ae7',
 *   relationshipType: 'Service2Layer',
 *   authentication
 * })
 *   .then(response)
 * ```
 * Add a relationship between two items. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/add-relationship.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to add item resources.
 */
function addItemRelationship(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/addRelationship";
        var options = appendCustomParams(requestOptions, ["originItemId", "destinationItemId", "relationshipType"], { params: __assign({}, requestOptions.params) });
        return request(url, options);
    });
}
/**
 * ```js
 * import { addItemResource } from "@esri/arcgis-rest-portal";
 * //
 * // Add a file resource
 * addItemResource({
 *   id: '3ef',
 *   resource: file,
 *   name: 'bigkahuna.jpg',
 *   authentication
 * })
 *   .then(response)
 * //
 * // Add a text resource
 * addItemResource({
 *   id: '4fg',
 *   content: "Text content",
 *   name: 'bigkahuna.txt',
 *   authentication
 * })
 *   .then(response)
 * ```
 * Add a resource associated with an item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/add-resources.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to add item resources.
 */
function addItemResource(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/addResources";
        requestOptions.params = __assign({ file: requestOptions.resource, fileName: requestOptions.name, resourcesPrefix: requestOptions.prefix, text: requestOptions.content, access: requestOptions.private ? "private" : "inherit" }, requestOptions.params);
        return request(url, requestOptions);
    });
}

/**
 * ```js
 * import { getUserContent } from "@esri/arcgis-rest-portal";
 * //
 * getUserContent({
 *    owner: 'geemike',
 *    folderId: 'bao7',
 *    start: 1,
 *    num: 20,
 *    authentication
 * })
 * ```
 * Returns a listing of the user's content. If the `username` is not supplied, it defaults to the username of the authenticated user. If `start` is not specificed it defaults to the first page.
 * If the `num` is not supplied it is defaulted to 10. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/user-content.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise<IUserContentResponse>
 */
var getUserContent = function (requestOptions) {
    var folder = requestOptions.folderId, _a = requestOptions.start, start = _a === void 0 ? 1 : _a, _b = requestOptions.num, num = _b === void 0 ? 10 : _b, authentication = requestOptions.authentication;
    var suffix = folder ? "/" + folder : "";
    return determineOwner(requestOptions)
        .then(function (owner) { return getPortalUrl(requestOptions) + "/content/users/" + owner + suffix; })
        .then(function (url) { return request(url, {
        httpMethod: "GET",
        authentication: authentication,
        params: {
            start: start,
            num: num,
        },
    }); });
};

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { createFolder } from "@esri/arcgis-rest-portal";
 * //
 * createFolder({
 *   title: 'Map Collection',
 *   authentication: userSession
 * })
 *   .then(response)
 * ```
 * Create a folder. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/create-folder.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that resolves with folder details once the folder has been created
 */
function createFolder(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var baseUrl = getPortalUrl(requestOptions) + "/content/users/" + owner;
        var url = baseUrl + "/createFolder";
        requestOptions.params = __assign({ title: requestOptions.title }, requestOptions.params);
        return request(url, requestOptions);
    });
}
/**
 * ```js
 * import { createItemInFolder } from "@esri/arcgis-rest-portal";
 * //
 * createItemInFolder({
 *   item: {
 *     title: "The Amazing Voyage",
 *     type: "Web Map"
 *   },
 *   folderId: 'fe8',
 *   authentication
 * })
 * ```
 * Create an item in a folder. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/add-item.htm) for more information.
 *
 * @param requestOptions = Options for the request
 */
function createItemInFolder(requestOptions) {
    if (requestOptions.multipart && !requestOptions.filename) {
        return Promise.reject(new Error("The filename is required for a multipart request."));
    }
    return determineOwner(requestOptions).then(function (owner) {
        var baseUrl = getPortalUrl(requestOptions) + "/content/users/" + owner;
        var url = baseUrl + "/addItem";
        if (requestOptions.folderId) {
            url = baseUrl + "/" + requestOptions.folderId + "/addItem";
        }
        requestOptions.params = __assign(__assign({}, requestOptions.params), serializeItem(requestOptions.item));
        // serialize the item into something Portal will accept
        var options = appendCustomParams(requestOptions, [
            "owner",
            "folderId",
            "file",
            "dataUrl",
            "text",
            "async",
            "multipart",
            "filename",
            "overwrite"
        ], {
            params: __assign({}, requestOptions.params)
        });
        return request(url, options);
    });
}
/**
 * ```js
 * import { createItem } from "@esri/arcgis-rest-portal";
 * //
 * createItem({
 *   item: {
 *     title: "The Amazing Voyage",
 *     type: "Web Map"
 *   },
 *   authentication
 * })
 * ```
 * Create an Item in the user's root folder. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/add-item.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that creates an item.
 */
function createItem(requestOptions) {
    // delegate to createItemInFolder placing in the root of the filestore
    var options = __assign({ folderId: null }, requestOptions);
    return createItemInFolder(options);
}

/**
 * ```js
 * import { exportItem } from "@esri/arcgis-rest-portal";
 * //
 * exportItem({
 *      id: '3daf',
 *      owner: 'geemike',
 *      exportFormat: 'CSV',
 *      exportParameters: {
 *        layers: [
 *          { id: 0 },
 *          { id: 1, where: 'POP1999 > 100000' }
 *        ]
 *      },
 *      authentication,
 *    })
 * ```
 * Exports an item from the portal. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/export-item.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise<IExportItemResponse>
 */
var exportItem = function (requestOptions) {
    var authentication = requestOptions.authentication, itemId = requestOptions.id, title = requestOptions.title, exportFormat = requestOptions.exportFormat, exportParameters = requestOptions.exportParameters;
    return determineOwner(requestOptions)
        .then(function (owner) { return getPortalUrl(requestOptions) + "/content/users/" + owner + "/export"; })
        .then(function (url) { return request(url, {
        httpMethod: 'POST',
        authentication: authentication,
        params: {
            itemId: itemId,
            title: title,
            exportFormat: exportFormat,
            exportParameters: exportParameters
        }
    }); });
};

// eslint-disable-next-line no-control-regex
var CONTROL_CHAR_MATCHER = /[\x00-\x1F\x7F-\x9F\xA0]/g;
/**
 * Returns a new string with all control characters removed.
 *
 * Doesn't remove characters from input string.
 *
 * @param str - the string to scrub
 */
function scrubControlChars(str) {
    return str.replace(CONTROL_CHAR_MATCHER, "");
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```
 * import { getItem } from "@esri/arcgis-rest-portal";
 * //
 * getItem("ae7")
 *   .then(response);
 * // or
 * getItem("ae7", { authentication })
 *   .then(response)
 * ```
 * Get an item by id. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/item.htm) for more information.
 *
 * @param id - Item Id
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the data from the response.
 */
function getItem(id, requestOptions) {
    var url = getItemBaseUrl(id, requestOptions);
    // default to a GET request
    var options = __assign({ httpMethod: "GET" }, requestOptions);
    return request(url, options);
}
/**
 * Get the fully qualified base URL to the REST end point for an item.
 * @param id Item Id
 * @param portalUrlOrRequestOptions a portal URL or request options
 * @returns URL to the item's REST end point, defaults to `https://www.arcgis.com/sharing/rest/content/items/{id}`
 */
var getItemBaseUrl = function (id, portalUrlOrRequestOptions) {
    var portalUrl = typeof portalUrlOrRequestOptions === "string"
        ? portalUrlOrRequestOptions
        : getPortalUrl(portalUrlOrRequestOptions);
    return portalUrl + "/content/items/" + id;
};
/**
 * ```
 * import { getItemData } from "@esri/arcgis-rest-portal";
 * //
 * getItemData("ae7")
 *   .then(response)
 * // or
 * getItemData("ae7", { authentication })
 *   .then(response)
 * ```
 * Get the /data for an item. If no data exists, returns `undefined`. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/item-data.htm) for more information.
 * @param id - Item Id
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the json data for the item.
 */
function getItemData(id, requestOptions) {
    var url = getItemBaseUrl(id, requestOptions) + "/data";
    // default to a GET request
    var options = __assign({ httpMethod: "GET", params: {} }, requestOptions);
    if (options.file) {
        options.params.f = null;
    }
    return request(url, options).catch(function (err) {
        /* if the item doesn't include data, the response will be empty
           and the internal call to response.json() will fail */
        var emptyResponseErr = RegExp(/The string did not match the expected pattern|(Unexpected end of (JSON input|data at line 1 column 1))/i);
        /* istanbul ignore else */
        if (emptyResponseErr.test(err.message)) {
            return;
        }
        else
            throw err;
    });
}
/**
 * ```
 * import { getRelatedItems } from "@esri/arcgis-rest-portal";
 * //
 * getRelatedItems({
 *   id: "ae7",
 *   relationshipType: "Service2Layer" // or several ["Service2Layer", "Map2Area"]
 * })
 *   .then(response)
 * ```
 * Get the related items. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/related-items.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to get some item resources.
 */
function getRelatedItems(requestOptions) {
    var url = getItemBaseUrl(requestOptions.id, requestOptions) + "/relatedItems";
    var options = __assign({ httpMethod: "GET", params: {
            direction: requestOptions.direction
        } }, requestOptions);
    if (typeof requestOptions.relationshipType === "string") {
        options.params.relationshipType = requestOptions.relationshipType;
    }
    else {
        options.params.relationshipTypes = requestOptions.relationshipType;
    }
    delete options.direction;
    delete options.relationshipType;
    return request(url, options);
}
/**
 * Get the resources associated with an item
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to get some item resources.
 */
function getItemResources(id, requestOptions) {
    var url = getItemBaseUrl(id, requestOptions) + "/resources";
    // Mix in num:1000 with any user supplied params
    // Key thing - we don't want to mutate the passed in requestOptions
    // as that may be used in other (subsequent) calls in the course
    // of a long promise chains
    var options = __assign({}, requestOptions);
    options.params = __assign({ num: 1000 }, options.params);
    return request(url, options);
}
/**
 * ```js
 * import { getItemResource } from "@esri/arcgis-rest-portal";
 *
 * // Parses contents as blob by default
 * getItemResource("3ef", { fileName: "resource.jpg", ...})
 *  .then(resourceContents => {});
 *
 * // Can override parse method
 * getItemResource("3ef", { fileName: "resource.json", readAs: 'json', ...})
 *  .then(resourceContents => {});
 *
 * // Get the response object instead
 * getItemResource("3ef",{ rawResponse: true, fileName: "resource.json" })
 *  .then(response => {})
 * ```
 * Fetches an item resource and optionally parses it to the correct format.
 *
 * Note: provides JSON parse error protection by sanitizing out any unescaped control
 * characters before parsing that would otherwise cause an error to be thrown
 *
 * @param {string} itemId
 * @param {IGetItemResourceOptions} requestOptions
 */
function getItemResource(itemId, requestOptions) {
    var readAs = requestOptions.readAs || 'blob';
    return getItemFile(itemId, "/resources/" + requestOptions.fileName, readAs, requestOptions);
}
/**
 * ```js
 * import { getItemGroups } from "@esri/arcgis-rest-portal";
 * //
 * getItemGroups("30e5fe3149c34df1ba922e6f5bbf808f")
 *   .then(response)
 * ```
 * Lists the groups of which the item is a part, only showing the groups that the calling user can access. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/groups.htm) for more information.
 *
 * @param id - The Id of the item to query group association for.
 * @param requestOptions - Options for the request
 * @returns A Promise to get some item groups.
 */
function getItemGroups(id, requestOptions) {
    var url = getItemBaseUrl(id, requestOptions) + "/groups";
    return request(url, requestOptions);
}
/**
 * ```js
 * import { getItemStatus } from "@esri/arcgis-rest-portal";
 * //
 * getItemStatus({
 *   id: "30e5fe3149c34df1ba922e6f5bbf808f",
 *   authentication
 * })
 *   .then(response)
 * ```
 * Inquire about status when publishing an item, adding an item in async mode, or adding with a multipart upload. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/status.htm) for more information.
 *
 * @param id - The Id of the item to get status for.
 * @param requestOptions - Options for the request
 * @returns A Promise to get the item status.
 */
function getItemStatus(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/status";
        var options = appendCustomParams(requestOptions, ["jobId", "jobType"], { params: __assign({}, requestOptions.params) });
        return request(url, options);
    });
}
/**
 * ```js
 * import { getItemParts } from "@esri/arcgis-rest-portal";
 * //
 * getItemParts({
 *   id: "30e5fe3149c34df1ba922e6f5bbf808f",
 *   authentication
 * })
 *   .then(response)
 * ```
 * Lists the part numbers of the file parts that have already been uploaded in a multipart file upload. This method can be used to verify the parts that have been received as well as those parts that were not received by the server. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/parts.htm) for more information.
 *
 * @param id - The Id of the item to get part list.
 * @param requestOptions - Options for the request
 * @returns A Promise to get the item part list.
 */
function getItemParts(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/parts";
        return request(url, requestOptions);
    });
}
/**
 * ```
 * import { getItemInfo } from "@esri/arcgis-rest-portal";
 * // get the "Info Card" for the item
 * getItemInfo("ae7")
 *   .then(itemInfoXml) // XML document as a string
 * // or get the contents of a specific file
 * getItemInfo("ae7", { fileName: "form.json", readAs: "json", authentication })
 *   .then(formJson) // JSON document as JSON
 * ```
 * Get an info file for an item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/item-info-file.htm) for more information.
 * @param id - Item Id
 * @param requestOptions - Options for the request, including the file name which defaults to `iteminfo.xml`.
 * If the file is not a text file (XML, HTML, etc) you will need to specify the `readAs` parameter
 * @returns A Promise that will resolve with the contents of the info file for the item.
 */
function getItemInfo(id, requestOptions) {
    var _a = requestOptions || {}, _b = _a.fileName, fileName = _b === void 0 ? "iteminfo.xml" : _b, _c = _a.readAs, readAs = _c === void 0 ? "text" : _c;
    var options = __assign({ httpMethod: "GET" }, requestOptions);
    return getItemFile(id, "/info/" + fileName, readAs, options);
}
/**
 * ```
 * import { getItemMetadata } from "@esri/arcgis-rest-portal";
 * // get the metadata for the item
 * getItemMetadata("ae7")
 *   .then(itemMetadataXml) // XML document as a string
 * // or with additional request options
 * getItemMetadata("ae7", { authentication })
 *   .then(itemMetadataXml) // XML document as a string
 * ```
 * Get the standard formal metadata XML file for an item (`/info/metadata/metadata.xml`)
 * @param id - Item Id
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the contents of the metadata file for the item as a string.
 */
function getItemMetadata(id, requestOptions) {
    var options = __assign(__assign({}, requestOptions), { fileName: "metadata/metadata.xml" });
    return getItemInfo(id, options);
}
// overrides request()'s default behavior for reading the response
// which is based on `params.f` and defaults to JSON
// Also adds JSON parse error protection by sanitizing out any unescaped control characters before parsing
function getItemFile(id, 
// NOTE: fileName should include any folder/subfolders
fileName, readMethod, requestOptions) {
    var url = "" + getItemBaseUrl(id, requestOptions) + fileName;
    // preserve escape hatch to let the consumer read the response
    // and ensure the f param is not appended to the query string
    var options = __assign({ params: {} }, requestOptions);
    var justReturnResponse = options.rawResponse;
    options.rawResponse = true;
    options.params.f = null;
    return request(url, options).then(function (response) {
        if (justReturnResponse) {
            return response;
        }
        return readMethod !== 'json'
            ? response[readMethod]()
            : response.text().then(function (text) { return JSON.parse(scrubControlChars(text)); });
    });
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Protect an item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/protect.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to protect an item.
 */
function protectItem(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/protect";
        return request(url, requestOptions);
    });
}
/**
 * Unprotect an item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/unprotect.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to unprotect an item.
 */
function unprotectItem(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/unprotect";
        return request(url, requestOptions);
    });
}

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { getGroup } from "@esri/arcgis-rest-portal";
 * //
 * getGroup("fxb988") // id
 *   .then(response)
 * ```
 * Fetch a group using its id. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/group.htm) for more information.
 *
 * @param id - Group Id
 * @param requestOptions  - Options for the request
 * @returns  A Promise that will resolve with the data from the response.
 */
function getGroup(id, requestOptions) {
    var url = getPortalUrl(requestOptions) + "/community/groups/" + id;
    // default to a GET request
    var options = __assign({ httpMethod: "GET" }, requestOptions);
    return request(url, options);
}
/**
 * Gets the category schema set on a group
 *
 * @param id - Group Id
 * @param requestOptions  - Options for the request
 * @returns A promise that will resolve with JSON of group's category schema
 * @see https://developers.arcgis.com/rest/users-groups-and-items/group-category-schema.htm
 */
function getGroupCategorySchema(id, requestOptions) {
    var url = getPortalUrl(requestOptions) + "/community/groups/" + id + "/categorySchema";
    // default to a GET request
    var options = __assign({ httpMethod: "GET" }, requestOptions);
    return request(url, options);
}
/**
 * Returns the content of a Group. Since the group may contain 1000s of items
 * the requestParams allow for paging.
 * @param id - Group Id
 * @param requestOptions  - Options for the request, including paging parameters.
 * @returns  A Promise that will resolve with the content of the group.
 */
function getGroupContent(id, requestOptions) {
    var url = getPortalUrl(requestOptions) + "/content/groups/" + id;
    // default to a GET request
    var options = __assign(__assign({ httpMethod: "GET" }, { params: { start: 1, num: 100 } }), requestOptions);
    // is this the most concise way to mixin with the defaults above?
    if (requestOptions && requestOptions.paging) {
        options.params = __assign({}, requestOptions.paging);
    }
    return request(url, options);
}
/**
 * Get the usernames of the admins and members. Does not return actual 'User' objects. Those must be
 * retrieved via separate calls to the User's API.
 * @param id - Group Id
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with arrays of the group admin usernames and the member usernames
 */
function getGroupUsers(id, requestOptions) {
    var url = getPortalUrl(requestOptions) + "/community/groups/" + id + "/users";
    // default to a GET request
    var options = __assign({ httpMethod: "GET" }, requestOptions);
    return request(url, options);
}
/**
 * ```js
 * import { searchGroupUsers } from "@esri/arcgis-rest-portal";
 * //
 * searchGroupUsers('abc123')
 *   .then(response)
 * ```
 * Search the users in a group. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/group-users-list.htm) for more information.
 *
 * @param id - The group id
 * @param searchOptions - Options for the request, including paging parameters.
 * @returns A Promise that will resolve with the data from the response.
 */
function searchGroupUsers(id, searchOptions) {
    var url = getPortalUrl(searchOptions) + "/community/groups/" + id + "/userlist";
    var options = appendCustomParams(searchOptions || {}, ["name", "num", "start", "sortField", "sortOrder", "joined", "memberType"], {
        httpMethod: "GET"
    });
    return request(url, options);
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
function getSharingUrl(requestOptions) {
    var username = requestOptions.authentication.username;
    var owner = requestOptions.owner || username;
    return getPortalUrl(requestOptions) + "/content/users/" + encodeURIComponent(owner) + "/items/" + requestOptions.id + "/share";
}
function isItemOwner(requestOptions) {
    var username = requestOptions.authentication.username;
    var owner = requestOptions.owner || username;
    return owner === username;
}
/**
 * Check it the user is a full org_admin
 * @param requestOptions
 * @returns Promise resolving in a boolean indicating if the user is an ArcGIS Organization administrator
 */
function isOrgAdmin(requestOptions) {
    var session = requestOptions.authentication;
    return session.getUser(requestOptions).then(function (user) {
        return user && user.role === "org_admin" && !user.roleId;
    });
}
/**
 * Get the User Membership for a particular group. Use this if all you have is the groupId.
 * If you have the group object, check the `userMembership.memberType` property instead of calling this method.
 *
 * @param requestOptions
 * @returns A Promise that resolves with "owner" | "admin" | "member" | "nonmember"
 */
function getUserMembership(requestOptions) {
    // fetch the group...
    return getGroup(requestOptions.groupId, requestOptions)
        .then(function (group) {
        return group.userMembership.memberType;
    })
        .catch(function () {
        return "none";
    });
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { reassignItem } from '@esri/arcgis-rest-portal';
 * //
 * reassignItem({
 *   id: "abc123",
 *   currentOwner: "charles",
 *   targetUsername: "leslie",
 *   authentication
 * })
 * ```
 * Reassign an item from one user to another.
 * Caller must be an org admin or the request will fail.
 * `currentOwner` and `targetUsername` must be in the same
 * organization or the request will fail
 * @param reassignOptions - Options for the request
 */
function reassignItem(reassignOptions) {
    return isOrgAdmin(reassignOptions).then(function (isAdmin) {
        if (!isAdmin) {
            throw Error("Item " + reassignOptions.id + " can not be reassigned because current user is not an organization administrator.");
        }
        // we're operating as an org-admin
        var url = getPortalUrl(reassignOptions) + "/content/users/" + reassignOptions.currentOwner + "/items/" + reassignOptions.id + "/reassign";
        var opts = {
            params: {
                targetUsername: reassignOptions.targetUsername,
                targetFolderName: reassignOptions.targetFolderName
            },
            authentication: reassignOptions.authentication
        };
        return request(url, opts);
    });
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { removeItem } from "@esri/arcgis-rest-portal";
 * //
 * removeItem({
 *   id: "3ef",
 *   authentication
 * })
 * ```
 * Delete an item from the portal. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/delete-item.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that deletes an item.
 */
function removeItem(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/delete";
        return request(url, requestOptions);
    });
}
/**
 * ```js
 * import { removeItemRelationship } from "@esri/arcgis-rest-portal";
 * //
 * removeItemRelationship({
 *   originItemId: '3ef',
 *   destinationItemId: 'ae7',
 *   relationshipType: 'Service2Layer',
 *   authentication
 * })
 *   .then(response)
 * ```
 * Remove a relationship between two items. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/delete-relationship.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to add item resources.
 */
function removeItemRelationship(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/deleteRelationship";
        var options = appendCustomParams(requestOptions, ["originItemId", "destinationItemId", "relationshipType"], { params: __assign({}, requestOptions.params) });
        return request(url, options);
    });
}
/**
 * Remove a resource associated with an item
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that deletes an item resource.
 */
function removeItemResource(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/removeResources";
        // mix in user supplied params
        requestOptions.params = __assign(__assign({}, requestOptions.params), { resource: requestOptions.resource });
        // only override the deleteAll param specified previously if it is passed explicitly
        if (typeof requestOptions.deleteAll !== "undefined") {
            requestOptions.params.deleteAll = requestOptions.deleteAll;
        }
        return request(url, requestOptions);
    });
}
/**
 * ```js
 * import { removeFolder } from "@esri/arcgis-rest-portal";
 * //
 * removeFolder({
 *   folderId: "fe4",
 *   owner: "c@sey",
 *   authentication
 * })
 *   .then(response)
 *
 * ```
 * Delete a non-root folder and all the items it contains. See the [REST
 * Documentation](https://developers.arcgis.com/rest/users-groups-and-items/delete-folder.htm) for
 * more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that deletes a folder
 */
function removeFolder(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + encodeURIComponent(owner) + "/" + requestOptions.folderId + "/delete";
        return request(url, requestOptions);
    });
}

/* Copyright (c) 2018-2021 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * `SearchQueryBuilder` can be used to construct the `q` param for
 * [`searchItems`](/arcgis-rest-js/api/portal/searchItems#searchItems-search) or
 * [`searchGroups`](/arcgis-rest-js/api/portal/searchGroups#searchGroups-search).
 * By chaining methods, it helps build complex search queries.
 *
 * ```js
 * const startDate = new Date("2020-01-01");
 * const endDate = new Date("2020-09-01");
 * const query = new SearchQueryBuilder()
 *  .match("Patrick")
 *  .in("owner")
 *  .and()
 *  .from(startDate)
 *  .to(endDate)
 *  .in("created")
 *  .and()
 *  .startGroup()
 *    .match("Web Mapping Application")
 *    .in("type")
 *    .or()
 *    .match("Mobile Application")
 *    .in("type")
 *    .or()
 *    .match("Application")
 *    .in("type")
 *  .endGroup()
 *  .and()
 *  .match("Demo App");
 *
 * searchItems(query).then((res) => {
 *   console.log(res.results);
 * });
 * ```
 *
 * Will search for items matching
 * ```
 * "owner: Patrick AND created:[1577836800000 TO 1598918400000] AND (type:"Web Mapping Application" OR type:"Mobile Application" OR type:Application) AND Demo App"
 * ```
 */
var SearchQueryBuilder = /** @class */ (function () {
    /**
     * @param q An existing query string to start building from.
     */
    function SearchQueryBuilder(q) {
        if (q === void 0) { q = ""; }
        this.termStack = [];
        this.rangeStack = [];
        this.openGroups = 0;
        this.q = q;
    }
    /**
     * Defines strings to search for.
     *
     * ```js
     * const query = new SearchQueryBuilder()
     *   .match("My Layer")
     * ```
     *
     * @param terms strings to search for.
     */
    SearchQueryBuilder.prototype.match = function () {
        var terms = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            terms[_i] = arguments[_i];
        }
        this.termStack = this.termStack.concat(terms);
        return this;
    };
    /**
     * Defines fields to search in. You can pass `"*"` or call this method without arguments to search a default set of fields
     *
     * ```js
     * const query = new SearchQueryBuilder()
     *   .match("My Layer")
     *   .in("title")
     * ```
     *
     * @param field The field to search for the previous match in.
     */
    SearchQueryBuilder.prototype.in = function (field) {
        var fn = "`in(" + (field ? "\"" + field + "\"" : "") + ")`";
        if (!this.hasRange && !this.hasTerms) {
            warn(
            // apparently-p-rettier-ignore causes some
            fn + " was called with no call to `match(...)` or `from(...)`/`to(...)`. Your query was not modified.");
            return this;
        }
        if (field && field !== "*") {
            this.q += field + ":";
        }
        return this.commit();
    };
    /**
     * Starts a new search group.
     *
     * ```js
     * const query = new SearchQueryBuilder()
     *   .startGroup()
     *     .match("Lakes")
     *     .in("title")
     *   .endGroup()
     *   .or()
     *   .startGroup()
     *     .match("Rivers")
     *     .in("title")
     *   .endGroup()
     * ```
     */
    SearchQueryBuilder.prototype.startGroup = function () {
        this.commit();
        if (this.openGroups > 0) {
            this.q += " ";
        }
        this.openGroups++;
        this.q += "(";
        return this;
    };
    /**
     * Ends a search group.
     *
     * ```js
     * const query = new SearchQueryBuilder()
     *   .startGroup()
     *     .match("Lakes")
     *     .in("title")
     *   .endGroup()
     *   .or()
     *   .startGroup()
     *     .match("Rivers")
     *     .in("title")
     *   .endGroup()
     * ```
     */
    SearchQueryBuilder.prototype.endGroup = function () {
        if (this.openGroups <= 0) {
            warn("`endGroup(...)` was called without calling `startGroup(...)` first. Your query was not modified.");
            return this;
        }
        this.commit();
        this.openGroups--;
        this.q += ")";
        return this;
    };
    /**
     * Joins two sets of queries with an `AND` clause.
     *
     * ```js
     * const query = new SearchQueryBuilder()
     *   .match("Lakes")
     *   .in("title")
     *   .and()
     *   .match("Rivers")
     *   .in("title")
     * ```
     */
    SearchQueryBuilder.prototype.and = function () {
        return this.addModifier("and");
    };
    /**
     * Joins two sets of queries with an `OR` clause.
     *
     * ```js
     * const query = new SearchQueryBuilder()
     *   .match("Lakes")
     *   .in("title")
     *   .or()
     *   .match("Rivers")
     *   .in("title")
     * ```
     */
    SearchQueryBuilder.prototype.or = function () {
        return this.addModifier("or");
    };
    /**
     * Joins two sets of queries with a `NOT` clause. Another option for filtering results is the [prohibit operator '-'](https://developers.arcgis.com/rest/users-groups-and-items/search-reference.htm#ESRI_SECTION1_5C6C35DB9E4A4F4492C5B937BDA2BF67).
     *
     * ```js
     * // omit results with "Rivers" in their title
     * const query = new SearchQueryBuilder()
     *   .not()
     *   .match("Rivers")
     *   .in("title")
     *
     * // equivalent
     * const query = new SearchQueryBuilder()
     *   .match("Rivers")
     *   .in("-title")
     * ```
     */
    SearchQueryBuilder.prototype.not = function () {
        return this.addModifier("not");
    };
    /**
     * Begins a new range query.
     *
     * ```js
     *
     * const NEWYEARS = new Date("2020-01-01")
     * const TODAY = new Date()
     *
     * const query = new SearchQueryBuilder()
     *   .from(NEWYEARS)
     *   .to(TODAY)
     *   .in("created")
     * ```
     */
    SearchQueryBuilder.prototype.from = function (term) {
        if (this.hasTerms) {
            warn(
            // apparently-p*rettier-ignore causes prettier to strip *all* comments O_o
            "`from(...)` is not allowed after `match(...)` try using `.from(...).to(...).in(...)`. Optionally, you may see this because dates are incorrectly formatted. Dates should be a primative Date value, aka a number in milliseconds or Date object, ie new Date(\"2020-01-01\").  Your query was not modified.");
            return this;
        }
        this.rangeStack[0] = term;
        return this;
    };
    /**
     * Ends a range query.
     *
     * ```js
     * const query = new SearchQueryBuilder()
     *   .from(yesterdaysDate)
     *   .to(todaysDate)
     *   .in("created")
     * ```
     */
    SearchQueryBuilder.prototype.to = function (term) {
        if (this.hasTerms) {
            warn(
            // apparently-p*rettier-ignore causes prettier to strip *all* comments O_o
            "`to(...)` is not allowed after `match(...)` try using `.from(...).to(...).in(...)`. Optionally, you may see this because dates are incorrectly formatted. Dates should be a primative Date value, aka a number in milliseconds or Date object, ie new Date(\"2020-01-01\"). Your query was not modified.");
            return this;
        }
        this.rangeStack[1] = term;
        return this;
    };
    /**
     * Boosts the previous term to increase its rank in the results.
     *
     * ```js
     * const query = new SearchQueryBuilder()
     *   .match("Lakes")
     *   .in("title")
     *   .or()
     *   .match("Rivers")
     *   .in("title")
     *   .boost(3)
     * ```
     */
    SearchQueryBuilder.prototype.boost = function (num) {
        this.commit();
        this.q += "^" + num;
        return this;
    };
    /**
     * Returns the current query string. Called internally when the request is made.
     */
    SearchQueryBuilder.prototype.toParam = function () {
        this.commit();
        this.cleanup();
        return this.q;
    };
    /**
     * Returns a new instance of `SearchQueryBuilder` based on the current instance.
     */
    SearchQueryBuilder.prototype.clone = function () {
        this.commit();
        this.cleanup();
        return new SearchQueryBuilder(this.q + "");
    };
    SearchQueryBuilder.prototype.addModifier = function (modifier) {
        if (this.currentModifer) {
            warn(
            // apparently-p*rettier-ignore causes prettier to strip *all* comments O_o
            "You have called `" + this.currentModifer + "()` after `" + modifier + "()`. Your current query was not modified.");
            return this;
        }
        this.commit();
        if (this.q === "" && modifier !== "not") {
            warn("You have called `" + modifier + "()` without calling another method to modify your query first. Try calling `match()` first.");
            return this;
        }
        this.currentModifer = modifier;
        this.q += this.q === "" ? "" : " ";
        this.q += modifier.toUpperCase() + " ";
        return this;
    };
    SearchQueryBuilder.prototype.needsQuotes = function (s) {
        return /\s|:/g.test(s);
    };
    SearchQueryBuilder.prototype.formatTerm = function (term) {
        if (term instanceof Date) {
            return term.getTime();
        }
        if (typeof term === "string" && this.needsQuotes(term)) {
            return "\"" + term + "\"";
        }
        return term;
    };
    SearchQueryBuilder.prototype.commit = function () {
        var _this = this;
        this.currentModifer = undefined;
        if (this.hasRange) {
            this.q += "[" + this.formatTerm(this.rangeStack[0]) + " TO " + this.formatTerm(this.rangeStack[1]) + "]";
            this.rangeStack = [undefined, undefined];
        }
        if (this.hasTerms) {
            this.q += this.termStack
                .map(function (term) {
                return _this.formatTerm(term);
            })
                .join(" ");
            this.termStack = [];
        }
        return this;
    };
    Object.defineProperty(SearchQueryBuilder.prototype, "hasTerms", {
        get: function () {
            return this.termStack.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SearchQueryBuilder.prototype, "hasRange", {
        get: function () {
            return this.rangeStack.length && this.rangeStack[0] && this.rangeStack[1];
        },
        enumerable: false,
        configurable: true
    });
    SearchQueryBuilder.prototype.cleanup = function () {
        // end a group if we have started one
        if (this.openGroups > 0) {
            warn(
            // apparently-p*rettier-ignore causes prettier to strip *all* comments O_o
            "Automatically closing " + this.openGroups + " group(s). You can use `endGroup(...)` to remove this warning.");
            while (this.openGroups > 0) {
                this.q += ")";
                this.openGroups--;
            }
        }
        var oldQ = this.q;
        this.q = oldQ.replace(/( AND ?| NOT ?| OR ?)*$/, "");
        if (oldQ !== this.q) {
            warn("`startGroup(...)` was called without calling `endGroup(...)` first. Your query was not modified.");
        }
        // clear empty groups
        this.q = this.q.replace(/(\(\))*/, "");
    };
    return SearchQueryBuilder;
}());

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
function genericSearch(search, searchType) {
    var options;
    if (typeof search === "string" || search instanceof SearchQueryBuilder) {
        options = {
            httpMethod: "GET",
            params: {
                q: search,
            },
        };
    }
    else {
        // searchUserAccess has one (knonw) valid value: "groupMember"
        options = appendCustomParams(search, [
            "q",
            "num",
            "start",
            "sortField",
            "sortOrder",
            "searchUserAccess",
            "searchUserName",
            "filter",
            "countFields",
            "countSize",
            "categories",
            "categoryFilters",
        ], {
            httpMethod: "GET",
        });
    }
    var path;
    switch (searchType) {
        case "item":
            path = "/search";
            break;
        case "group":
            path = "/community/groups";
            break;
        case "groupContent":
            // Need to have groupId property to do group contents search,
            // cso filter out all but ISearchGroupContentOptions
            if (typeof search !== "string" &&
                !(search instanceof SearchQueryBuilder) &&
                search.groupId) {
                path = "/content/groups/" + search.groupId + "/search";
            }
            else {
                return Promise.reject(new Error("you must pass a `groupId` option to `searchGroupContent`"));
            }
            break;
        default:
            // "users"
            path = "/portals/self/users/search";
            break;
    }
    var url = getPortalUrl(options) + path;
    // send the request
    return request(url, options).then(function (r) {
        if (r.nextStart && r.nextStart !== -1) {
            r.nextPage = function () {
                var newOptions;
                if (typeof search === "string" ||
                    search instanceof SearchQueryBuilder) {
                    newOptions = {
                        q: search,
                        start: r.nextStart,
                    };
                }
                else {
                    newOptions = search;
                    newOptions.start = r.nextStart;
                }
                return genericSearch(newOptions, searchType);
            };
        }
        return r;
    });
}

/* Copyright (c) 2018-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { searchItems } from "@esri/arcgis-rest-portal";
 * //
 * searchItems('water')
 *   .then(response) // response.total => 355
 * ```
 * Search a portal for items. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/search.htm) for more information.
 *
 * @param search - A string or RequestOptions object to pass through to the endpoint.
 * @returns A Promise that will resolve with the data from the response.
 */
function searchItems(search) {
    return genericSearch(search, "item");
}

/* Copyright (c) 2017-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { addItemPart } from "@esri/arcgis-rest-portal";
 * //
 * addItemPart({
 *   id: "30e5fe3149c34df1ba922e6f5bbf808f",
 *   file: data,
 *   partNum: 1,
 *   authentication
 * })
 *   .then(response)
 * ```
 * Add Item Part allows the caller to upload a file part when doing an add or update item operation in multipart mode. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/add-item-part.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to add the item part status.
 */
function addItemPart(requestOptions) {
    var partNum = requestOptions.partNum;
    if (!Number.isInteger(partNum) || partNum < 1 || partNum > 10000) {
        return Promise.reject(new Error('The part number must be an integer between 1 to 10000, inclusive.'));
    }
    return determineOwner(requestOptions).then(function (owner) {
        // AGO adds the "partNum" parameter in the query string, not in the body
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/addPart?partNum=" + partNum;
        var options = appendCustomParams(requestOptions, ["file"], { params: __assign({}, requestOptions.params) });
        return request(url, options);
    });
}
/**
 * ```js
 * import { commitItemUpload } from "@esri/arcgis-rest-portal";
 * //
 * commitItemUpload({
 *   id: "30e5fe3149c34df1ba922e6f5bbf808f",
 *   authentication
 * })
 *   .then(response)
 * ```
 * Commit is called once all parts are uploaded during a multipart Add Item or Update Item operation. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/commit.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to get the commit result.
 */
function commitItemUpload(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/commit";
        var options = appendCustomParams(requestOptions, [], {
            params: __assign(__assign({}, requestOptions.params), serializeItem(requestOptions.item))
        });
        return request(url, options);
    });
}
/**
 * ```js
 * import { cancelItemUpload } from "@esri/arcgis-rest-portal";
 * //
 * cancelItemUpload({
 *   id: "30e5fe3149c34df1ba922e6f5bbf808f",
 *   authentication
 * })
 *   .then(response)
 * ```
 * Cancels a multipart upload on an item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/cancel.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to get the commit result.
 */
function cancelItemUpload(requestOptions) {
    return determineOwner(requestOptions).then(function (owner) {
        var url = getPortalUrl(requestOptions) + "/content/users/" + owner + "/items/" + requestOptions.id + "/cancel";
        return request(url, requestOptions);
    });
}

/* Copyright (c) 2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
function chunk(array, size) {
    if (array.length === 0) {
        return [];
    }
    var chunks = [];
    for (var i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { addGroupUsers } from "@esri/arcgis-rest-portal";
 * //
 * addGroupUsers({
 *   id: groupId,
 *   users: ["username1", "username2"],
 *   admins: ["username3"],
 *   authentication
 * })
 * .then(response);
 * ```
 * Add users to a group. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/add-users-to-group.htm) for more information.
 *
 * @param requestOptions  - Options for the request
 * @returns A Promise
 */
function addGroupUsers(requestOptions) {
    var id = requestOptions.id;
    var url = getPortalUrl(requestOptions) + "/community/groups/" + id + "/addUsers";
    var baseOptions = Object.assign({}, requestOptions, {
        admins: undefined,
        users: undefined
    });
    var batchRequestOptions = __spreadArrays(_prepareRequests("users", requestOptions.users, baseOptions), _prepareRequests("admins", requestOptions.admins, baseOptions));
    var promises = batchRequestOptions.map(function (options) {
        return _sendSafeRequest$2(url, options);
    });
    return Promise.all(promises).then(_consolidateRequestResults);
}
function _prepareRequests(type, usernames, baseOptions) {
    if (!usernames || usernames.length < 1) {
        return [];
    }
    // the ArcGIS REST API only allows to add no more than 25 users per request,
    // see https://developers.arcgis.com/rest/users-groups-and-items/add-users-to-group.htm
    var userChunks = chunk(usernames, 25);
    return userChunks.map(function (users) {
        return _generateRequestOptions$2(type, users, baseOptions);
    });
}
function _generateRequestOptions$2(type, usernames, baseOptions) {
    var _a, _b;
    return Object.assign({}, baseOptions, (_a = {},
        _a[type] = usernames,
        _a.params = __assign(__assign({}, baseOptions.params), (_b = {}, _b[type] = usernames, _b)),
        _a));
}
// this request is safe since the request error will be handled
function _sendSafeRequest$2(url, requestOptions) {
    return request(url, requestOptions).catch(function (error) {
        return {
            errors: [error]
        };
    });
}
function _consolidateRequestResults(results) {
    var notAdded = results
        .filter(function (result) { return result.notAdded; })
        .reduce(function (collection, result) { return collection.concat(result.notAdded); }, []);
    var errors = results
        .filter(function (result) { return result.errors; })
        .reduce(function (collection, result) { return collection.concat(result.errors); }, []);
    var consolidated = { notAdded: notAdded };
    if (errors.length > 0) {
        consolidated.errors = errors;
    }
    return consolidated;
}

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { removeGroupUsers } from "@esri/arcgis-rest-portal";
 * //
 * removeGroupUsers({
 *   id: groupId,
 *   users: ["username1", "username2"],
 *   authentication
 * })
 * .then(response);
 * ```
 * Add users to a group. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/remove-users-from-group.htm) for more information.
 *
 * @param requestOptions  - Options for the request
 * @returns A Promise
 */
function removeGroupUsers(requestOptions) {
    var id = requestOptions.id, usersToRemove = requestOptions.users;
    var url = getPortalUrl(requestOptions) + "/community/groups/" + id + "/removeUsers";
    var safeSend = function (users) {
        var options = __assign(__assign({}, requestOptions), { users: users, params: { users: users } });
        return request(url, options)
            .catch(function (error) { return ({ errors: [error] }); });
    };
    // the ArcGIS REST API only allows to add no more than 25 users per request,
    // see https://developers.arcgis.com/rest/users-groups-and-items/remove-users-from-group.htm
    var promises = chunk(usersToRemove, 25).map(function (usersChunk) { return safeSend(usersChunk); });
    return Promise.all(promises)
        .then(function (results) {
        var filtered = function (propName) { return results
            .filter(function (result) { return result[propName]; })
            .reduce(function (collection, result) { return collection.concat(result[propName]); }, []); };
        var errors = filtered('errors');
        var consolidated = { notRemoved: filtered('notRemoved') };
        return errors.length ? __assign(__assign({}, consolidated), { errors: errors }) : consolidated;
    });
}

/**
 * Invites users to join a group. Operation success
 * will be indicated by a flag on the return
 * object. If there are any errors, they will be
 * placed in an errors array on the return object
 *
 * ```js
 * const authentication: IAuthenticationManager; // Typically passed into to the function
 * //
 * const options: IInviteGroupUsersOptions = {
 *  id: 'group_id',
 *  users: ['ed', 'edd', 'eddy'],
 *  role: 'group-member',
 *  expiration: 20160,
 *  authentication
 * }
 * //
 * const result = await inviteGroupUsers(options);
 * //
 * const if_success_result_looks_like = {
 *  success: true
 * }
 * //
 * const if_failure_result_looks_like = {
 *  success: false,
 *  errors: [ArcGISRequestError]
 * }
 * ```
 * @param {IInviteGroupUsersOptions} options
 *
 * @returns {Promise<IAddGroupUsersResult>}
 */
function inviteGroupUsers(options) {
    var id = options.id;
    var url = getPortalUrl(options) + "/community/groups/" + id + "/invite";
    var batches = _generateBatchRequests$1(options);
    var promises = batches.map(function (batch) { return _sendSafeRequest$1(url, batch); });
    return Promise.all(promises).then(_combineResults$1);
}
/**
 * @private
 */
function _generateBatchRequests$1(options) {
    var userBatches = chunk(options.users, 25);
    return userBatches.map(function (users) { return _generateRequestOptions$1(users, options); });
}
/**
 * @private
 */
function _generateRequestOptions$1(users, baseOptions) {
    var requestOptions = Object.assign({}, baseOptions);
    requestOptions.params = __assign(__assign({}, requestOptions.params), { users: users, role: requestOptions.role, expiration: requestOptions.expiration });
    return requestOptions;
}
/**
 * @private
 */
function _sendSafeRequest$1(url, requestOptions) {
    return request(url, requestOptions)
        .catch(function (error) { return ({ errors: [error] }); });
}
/**
 * @private
 */
function _combineResults$1(responses) {
    var success = responses.every(function (res) { return res.success; });
    var errors = responses.reduce(function (collection, res) { return collection.concat(res.errors || []); }, []);
    var combined = { success: success };
    if (errors.length > 0) {
        combined.errors = errors;
    }
    return combined;
}

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { createGroup } from "@esri/arcgis-rest-portal";
 * //
 * createGroup({
 *   group: {
 *     title: "No Homers",
 *     access: "public"
 *   },
 *   authentication
 * })
 *   .then(response)
 * ```
 * Create a new Group. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/create-group.htm) for more information.
 *
 * Note: The group name must be unique within the user's organization.
 * @param requestOptions  - Options for the request, including a group object
 * @returns A Promise that will resolve with the success/failure status of the request
 */
function createGroup(requestOptions) {
    var url = getPortalUrl(requestOptions) + "/community/createGroup";
    requestOptions.params = __assign(__assign({}, requestOptions.params), requestOptions.group);
    return request(url, requestOptions);
}

/* Copyright (c) 2017-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { createGroupNotification } from '@esri/arcgis-rest-portal';
 * // send an email to an entire group
 * createGroupNotification({
 *   authentication: UserSession,
 *   subject: "hello",
 *   message: "world!",
 *   id: groupId
 * })
 * ```
 * Create a group notification.
 *
 * @param requestOptions - Options for the request
 *
 * @returns A Promise that will resolve with the success/failure status of the request
 */
function createGroupNotification(requestOptions) {
    var url = getPortalUrl(requestOptions) + "/community/groups/" + requestOptions.id + "/createNotification";
    var options = __assign({ params: __assign({ subject: requestOptions.subject, message: requestOptions.message, users: requestOptions.users, notificationChannelType: requestOptions.notificationChannelType || "email", clientId: requestOptions.clientId, silentNotification: requestOptions.silentNotification, notifyAll: !requestOptions.users || requestOptions.users.length === 0 }, requestOptions.params) }, requestOptions);
    return request(url, options);
}

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { protectGroup } from '@esri/arcgis-rest-portal';
 * //
 * protectGroup({
 *   id: groupId,
 *   authentication
 * })
 *   .then(response)
 * ```
 * Protect a group to avoid accidental deletion. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/protect-group.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the success/failure status of the request
 */
function protectGroup(requestOptions) {
    var url = getPortalUrl(requestOptions) + "/community/groups/" + requestOptions.id + "/protect";
    return request(url, requestOptions);
}
/**
 * ```js
 * import { unprotectGroup } from '@esri/arcgis-rest-portal';
 * //
 * unprotectGroup({
 *   id: groupId,
 *   authentication
 * })
 *   .then(response)
 * ```
 * Unprotect a Group. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/unprotect-group.htm) for more information.
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the success/failure status of the request
 */
function unprotectGroup(requestOptions) {
    var url = getPortalUrl(requestOptions) + "/community/groups/" + requestOptions.id + "/unprotect";
    return request(url, requestOptions);
}

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { removeGroup } from '@esri/arcgis-rest-portal';
 * //
 * removeGroup({
 *   id: groupId,
 *   authentication
 * })
 *   .then(response)
 * ```
 * Delete a group. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/delete-group.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the success/failure status of the request
 */
function removeGroup(requestOptions) {
    var url = getPortalUrl(requestOptions) + "/community/groups/" + requestOptions.id + "/delete";
    var options = __assign({}, requestOptions);
    return request(url, options);
}

/* Copyright (c) 2018-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { searchGroups } from "@esri/arcgis-rest-portal";
 * //
 * searchGroups('water')
 *   .then(response) // response.total => 355
 * ```
 * Search a portal for groups. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/group-search.htm) for more information.
 *
 * @param search - A string or RequestOptions object to pass through to the endpoint.
 * @returns A Promise that will resolve with the data from the response.
 */
function searchGroups(search) {
    return genericSearch(search, "group");
}
/**
 * ```js
 * import { searchGroupContent } from "@esri/arcgis-rest-portal";
 * //
 * searchGroupContent('water')
 *   .then(response) // response.total => 355
 * ```
 * Search a portal for items in a group. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/group-content-search.htm) for more information.
 *
 * @param options - RequestOptions object amended with search parameters.
 * @returns A Promise that will resolve with the data from the response.
 */
function searchGroupContent(options) {
    return genericSearch(options, "groupContent");
}

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { updateGroup } from '@esri/arcgis-rest-portal';
 * //
 * updateGroup({
 *   group: { id: "fgr344", title: "new" }
 * })
 *   .then(response)
 * ```
 * Update the properties of a group. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/update-group.htm) for more information.
 *
 * @param requestOptions - Options for the request, including the group
 * @returns A Promise that will resolve with the success/failure status of the request
 */
function updateGroup(requestOptions) {
    var url = getPortalUrl(requestOptions) + "/community/groups/" + requestOptions.group.id + "/update";
    requestOptions.params = __assign(__assign({}, requestOptions.params), requestOptions.group);
    return request(url, requestOptions);
}

/**
 * ```js
 * import { updateUserMemberships } from "@esri/arcgis-rest-portal";
 * //
 * updateUserMemberships({
 *   id: groupId,
 *   admins: ["username3"],
 *   authentication
 * })
 * .then(response);
 * ```
 * Change the user membership levels of existing users in a group
 *
 * @param requestOptions  - Options for the request
 * @returns A Promise
 */
function updateUserMemberships(requestOptions) {
    var url = getPortalUrl(requestOptions) + "/community/groups/" + requestOptions.id + "/updateUsers";
    var opts = {
        authentication: requestOptions.authentication,
        params: {}
    };
    // add the correct params depending on the type of membership we are changing to
    if (requestOptions.newMemberType === "admin") {
        opts.params.admins = requestOptions.users;
    }
    else {
        opts.params.users = requestOptions.users;
    }
    // make the request
    return request(url, opts);
}

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { joinGroup } from '@esri/arcgis-rest-portal';
 * //
 * joinGroup({
 *   id: groupId,
 *   authentication
 * })
 *   .then(response)
 * ```
 * Make a request as the authenticated user to join a Group. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/join-group.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the success/failure status of the request and the groupId.
 */
function joinGroup(requestOptions) {
    var url = getPortalUrl(requestOptions) + "/community/groups/" + requestOptions.id + "/join";
    return request(url, requestOptions);
}
/**
 * ```js
 * import { leaveGroup } from '@esri/arcgis-rest-portal';
 * //
 * leaveGroup({
 *   id: groupId,
 *   authentication
 * })
 *   .then(response)
 * ```
 * Make a request as the authenticated user to leave a Group. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/leave-group.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the success/failure status of the request and the groupId.
 */
function leaveGroup(requestOptions) {
    var url = getPortalUrl(requestOptions) + "/community/groups/" + requestOptions.id + "/leave";
    return request(url, requestOptions);
}

/**
 * Send a notification to members of the requesting user's org.
 * Operation success will be indicated by a flag on the return
 * object. If there are any errors, they will be placed in an
 * errors array on the return object
 *
 * ```js
 * const authentication: IAuthenticationManager; // Typically passed into to the function
 * //
 * const options: IInviteGroupUsersOptions = {
 *  id: 'group_id',
 *  users: ['larry', 'curly', 'moe'],
 *  notificationChannelType: 'email',
 *  expiration: 20160,
 *  authentication
 * }
 * //
 * const result = await createOrgNotification(options);
 * //
 * const if_success_result_looks_like = {
 *  success: true
 * }
 * //
 * const if_failure_result_looks_like = {
 *  success: false,
 *  errors: [ArcGISRequestError]
 * }
 * ```
 * @param {ICreateOrgNotificationOptions} options
 *
 * @returns {ICreateOrgNotificationResult}
 */
function createOrgNotification(options) {
    var url = getPortalUrl(options) + "/portals/self/createNotification";
    var batches = _generateBatchRequests(options);
    var promises = batches.map(function (batch) { return _sendSafeRequest(url, batch); });
    return Promise.all(promises).then(_combineResults);
}
/**
 * @private
 */
function _generateBatchRequests(options) {
    var userBatches = chunk(options.users, options.batchSize || 25);
    return userBatches.map(function (users) { return _generateRequestOptions(users, options); });
}
/**
 * @private
 */
function _generateRequestOptions(users, baseOptions) {
    var requestOptions = Object.assign({}, baseOptions);
    requestOptions.params = __assign(__assign({}, requestOptions.params), { users: users, subject: baseOptions.subject, message: baseOptions.message, notificationChannelType: requestOptions.notificationChannelType });
    return requestOptions;
}
/**
 * @private
 */
function _sendSafeRequest(url, requestOptions) {
    return request(url, requestOptions)
        .catch(function (error) { return ({ errors: [error] }); });
}
/**
 * @private
 */
function _combineResults(responses) {
    var success = responses.every(function (res) { return res.success; });
    var errors = responses.reduce(function (collection, res) { return collection.concat(res.errors || []); }, []);
    var combined = { success: success };
    if (errors.length > 0) {
        combined.errors = errors;
    }
    return combined;
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { getUser } from '@esri/arcgis-rest-portal';
 * //
 * getUser("jsmith")
 *   .then(response)
 * // => { firstName: "John", lastName: "Smith",tags: ["GIS Analyst", "City of Redlands"] }
 * ```
 * Get information about a user. This method has proven so generically useful that you can also call [`UserSession.getUser()`](/arcgis-rest-js/api/auth/UserSession#getUser-summary).
 *
 * @param requestOptions - options to pass through in the request
 * @returns A Promise that will resolve with metadata about the user
 */
function getUser(requestOptions) {
    var url;
    var options = { httpMethod: "GET" };
    // if a username is passed, assume ArcGIS Online
    if (typeof requestOptions === "string") {
        url = "https://www.arcgis.com/sharing/rest/community/users/" + requestOptions;
    }
    else {
        // if an authenticated session is passed, default to that user/portal unless another username is provided manually
        var username = requestOptions.username || requestOptions.authentication.username;
        url = getPortalUrl(requestOptions) + "/community/users/" + encodeURIComponent(username);
        options = __assign(__assign({}, requestOptions), options);
    }
    // send the request
    return request(url, options);
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { getUserTags } from '@esri/arcgis-rest-portal';
 * //
 * getUserTags({
 *   username: "jsmith",
 *   authentication
 * })
 *   .then(response)
 * ```
 *  Users tag the content they publish in their portal via the add and update item calls. This resource lists all the tags used by the user along with the number of times the tags have been used. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/user-tags.htm) for more information.
 *
 * @param IGetUserOptions - options to pass through in the request
 * @returns A Promise that will resolve with the user tag array
 */
function getUserTags(requestOptions) {
    var username = requestOptions.username || requestOptions.authentication.username;
    var url = getPortalUrl(requestOptions) + "/community/users/" + encodeURIComponent(username) + "/tags";
    // send the request
    return request(url, requestOptions);
}

/* Copyright (c) 2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Helper that returns the [user](https://developers.arcgis.com/rest/users-groups-and-items/user.htm) for a given portal.
 *
 * @param session
 * @returns User url to be used in API requests.
 */
function getUserUrl(session) {
    return getPortalUrl(session) + "/community/users/" + encodeURIComponent(session.username);
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { getUserInvitations } from '@esri/arcgis-rest-portal';
 * // username is inferred from UserSession
 * getUserInvitations({ authentication })
 *   .then(response) // response.userInvitations.length => 3
 * ```
 * Get all invitations for a user. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/user-invitations.htm) for more information.
 *
 * @param requestOptions - options to pass through in the request
 * @returns A Promise that will resolve with the user's invitations
 */
function getUserInvitations(requestOptions) {
    var options = { httpMethod: "GET" };
    var username = encodeURIComponent(requestOptions.authentication.username);
    var portalUrl = getPortalUrl(requestOptions);
    var url = portalUrl + "/community/users/" + username + "/invitations";
    options = __assign(__assign({}, requestOptions), options);
    // send the request
    return request(url, options);
}
/**
 * ```js
 * import { getUserInvitation } from '@esri/arcgis-rest-portal';
 * // username is inferred from UserSession
 * getUserInvitation({
 *   invitationId: "3ef",
 *   authentication
 * })
 *   .then(response) // => response.accepted => true
 * ```
 * Get an invitation for a user by id. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/user-invitation.htm) for more information.
 *
 * @param requestOptions - options to pass through in the request
 * @returns A Promise that will resolve with the invitation
 */
function getUserInvitation(requestOptions) {
    var username = encodeURIComponent(requestOptions.authentication.username);
    var portalUrl = getPortalUrl(requestOptions);
    var url = portalUrl + "/community/users/" + username + "/invitations/" + requestOptions.invitationId;
    var options = { httpMethod: "GET" };
    options = __assign(__assign({}, requestOptions), options);
    // send the request
    return request(url, options);
}
/**
 * ```js
 * import { acceptInvitation } from '@esri/arcgis-rest-portal';
 * // username is inferred from UserSession
 * acceptInvitation({
 *   invitationId: "3ef",
 *   authentication
 * })
 *   .then(response)
 * ```
 * Accept an invitation. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/accept-invitation.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the success/failure status of the request
 */
function acceptInvitation(requestOptions) {
    var username = encodeURIComponent(requestOptions.authentication.username);
    var portalUrl = getPortalUrl(requestOptions);
    var url = portalUrl + "/community/users/" + username + "/invitations/" + requestOptions.invitationId + "/accept";
    var options = __assign({}, requestOptions);
    return request(url, options);
}
/**
 * ```js
 * import { declineInvitation } from '@esri/arcgis-rest-portal';
 * // username is inferred from UserSession
 * declineInvitation({
 *   invitationId: "3ef",
 *   authentication
 * })
 *   .then(response)
 * ```
 * Decline an invitation. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/decline-invitation.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the success/failure status of the request
 */
function declineInvitation(requestOptions) {
    var username = encodeURIComponent(requestOptions.authentication.username);
    var portalUrl = getPortalUrl(requestOptions);
    var url = portalUrl + "/community/users/" + username + "/invitations/" + requestOptions.invitationId + "/decline";
    var options = __assign({}, requestOptions);
    return request(url, options);
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { getUserNotifications } from '@esri/arcgis-rest-portal';
 * // username is inferred from UserSession
 * getUserNotifications({ authentication })
 *   .then(results) // results.notifications.length) => 3
 * ```
 * Get notifications for a user.
 *
 * @param requestOptions - options to pass through in the request
 * @returns A Promise that will resolve with the user's notifications
 */
function getUserNotifications(requestOptions) {
    var options = { httpMethod: "GET" };
    var username = encodeURIComponent(requestOptions.authentication.username);
    var portalUrl = getPortalUrl(requestOptions);
    var url = portalUrl + "/community/users/" + username + "/notifications";
    options = __assign(__assign({}, requestOptions), options);
    // send the request
    return request(url, options);
}
/**
 * Delete a notification.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the success/failure status of the request
 */
function removeNotification(requestOptions) {
    var username = encodeURIComponent(requestOptions.authentication.username);
    var portalUrl = getPortalUrl(requestOptions);
    var url = portalUrl + "/community/users/" + username + "/notifications/" + requestOptions.id + "/delete";
    return request(url, requestOptions);
}

/**
 * ```js
 * import { searchItems } from "@esri/arcgis-rest-portal";
 * //
 * searchUsers({ q: 'tommy', authentication })
 *   .then(response) // response.total => 355
 * ```
 * Search a portal for users.
 *
 * @param search - A RequestOptions object to pass through to the endpoint.
 * @returns A Promise that will resolve with the data from the response.
 */
function searchUsers(search) {
    return genericSearch(search, "user");
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { updateUser } from '@esri/arcgis-rest-portal';
 * // any user can update their own profile
 * updateUser({
 *   authentication,
 *   user: { description: "better than the last one" }
 * })
 *   .then(response)
 * // org administrators must declare the username that will be updated explicitly
 * updateUser({
 *   authentication,
 *   user: { username: "c@sey", description: "" }
 * })
 *   .then(response)
 * // => { "success": true, "username": "c@sey" }
 * ```
 * Update a user profile. The username will be extracted from the authentication session unless it is provided explicitly. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/update-user.htm) for more information.
 *
 * @param requestOptions - options to pass through in the request
 * @returns A Promise that will resolve with metadata about the user
 */
function updateUser(requestOptions) {
    // default to the authenticated username unless another username is provided manually
    var username = requestOptions.user.username || requestOptions.authentication.username;
    var updateUrl = getPortalUrl(requestOptions) + "/community/users/" + encodeURIComponent(username) + "/update";
    // mixin custom params and the user information, then drop the user info
    requestOptions.params = __assign(__assign({}, requestOptions.user), requestOptions.params);
    delete requestOptions.user;
    // send the request
    return request(updateUrl, requestOptions);
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { setItemAccess } from "@esri/arcgis-rest-portal";
 * //
 * setItemAccess({
 *   id: "abc123",
 *   access: "public", // 'org' || 'private'
 *   authentication: session
 * })
 * ```
 * Change who is able to access an item.
 *
 * @param requestOptions - Options for the request.
 * @returns A Promise that will resolve with the data from the response.
 */
function setItemAccess(requestOptions) {
    var url = getSharingUrl(requestOptions);
    if (isItemOwner(requestOptions)) {
        // if the user owns the item, proceed
        return updateItemAccess(url, requestOptions);
    }
    else {
        // otherwise we need to check to see if they are an organization admin
        return isOrgAdmin(requestOptions).then(function (admin) {
            if (admin) {
                return updateItemAccess(url, requestOptions);
            }
            else {
                // if neither, updating the sharing isnt possible
                throw Error("This item can not be shared by " + requestOptions.authentication.username + ". They are neither the item owner nor an organization admin.");
            }
        });
    }
}
function updateItemAccess(url, requestOptions) {
    requestOptions.params = __assign({ org: false, everyone: false }, requestOptions.params);
    // if the user wants to make the item private, it needs to be unshared from any/all groups as well
    if (requestOptions.access === "private") {
        requestOptions.params.groups = " ";
    }
    if (requestOptions.access === "org") {
        requestOptions.params.org = true;
    }
    // if sharing with everyone, share with the entire organization as well.
    if (requestOptions.access === "public") {
        // this is how the ArcGIS Online Home app sets public access
        // setting org = true instead of account = true will cancel out all sharing
        requestOptions.params.account = true;
        requestOptions.params.everyone = true;
    }
    return request(url, requestOptions);
}

/**
 * ```js
 * import { isItemSharedWithGroup } from "@esri/arcgis-rest-portal";
 * //
 * isItemSharedWithGroup({
 *   groupId: 'bc3,
 *   itemId: 'f56,
 *   authentication
 * })
 * .then(isShared => {})
 * ```
 * Find out whether or not an item is already shared with a group.
 *
 * @param requestOptions - Options for the request. NOTE: `rawResponse` is not supported by this operation.
 * @returns Promise that will resolve with true/false
 */
function isItemSharedWithGroup(requestOptions) {
    var searchOpts = {
        q: "id: " + requestOptions.id + " AND group: " + requestOptions.groupId,
        start: 1,
        num: 10,
        sortField: "title",
        authentication: requestOptions.authentication,
        httpMethod: "POST"
    };
    return searchItems(searchOpts).then(function (searchResponse) {
        var result = false;
        if (searchResponse.total > 0) {
            result = searchResponse.results.some(function (itm) {
                return itm.id === requestOptions.id;
            });
            return result;
        }
    });
}

/**
 * ```js
 * import { shareItemWithGroup } from '@esri/arcgis-rest-portal';
 * //
 * shareItemWithGroup({
 *   id: "abc123",
 *   groupId: "xyz987",
 *   owner: "some-owner",
 *   authentication
 * })
 * ```
 * Share an item with a group, either as an
 * [item owner](https://developers.arcgis.com/rest/users-groups-and-items/share-item-as-item-owner-.htm),
 * [group admin](https://developers.arcgis.com/rest/users-groups-and-items/share-item-as-group-admin-.htm) or
 * organization admin.
 *
 * Note: Sharing the item as an Admin will use the `/content/users/:ownername/items/:itemid/share` end-point
 *
 * @param requestOptions - Options for the request.
 * @returns A Promise that will resolve with the data from the response.
 */
function shareItemWithGroup(requestOptions) {
    return isItemSharedWithGroup(requestOptions)
        .then(function (isShared) {
        if (isShared) {
            // already shared, exit early with success response
            return {
                itemId: requestOptions.id,
                shortcut: true,
                notSharedWith: [],
            };
        }
        var username = requestOptions.authentication.username, owner = requestOptions.owner, confirmItemControl = requestOptions.confirmItemControl;
        var itemOwner = owner || username;
        // non-item owner
        if (itemOwner !== username) {
            // need to track if the user is an admin
            var isAdmin_1 = false;
            // track if the admin & owner are in the same org
            var isCrossOrgSharing_1 = false;
            // next perform any necessary membership adjustments for
            // current user and/or item owner
            return Promise.all([
                getUser({
                    username: username,
                    authentication: requestOptions.authentication,
                }),
                getUser({
                    username: itemOwner,
                    authentication: requestOptions.authentication,
                }),
                getUserMembership(requestOptions),
            ])
                .then(function (_a) {
                var currentUser = _a[0], ownerUser = _a[1], membership = _a[2];
                var isSharedEditingGroup = !!confirmItemControl;
                isAdmin_1 = currentUser.role === "org_admin" && !currentUser.roleId;
                isCrossOrgSharing_1 = currentUser.orgId !== ownerUser.orgId;
                return getMembershipAdjustments(currentUser, isSharedEditingGroup, membership, isAdmin_1, ownerUser, requestOptions);
            })
                .then(function (membershipAdjustments) {
                var _a = membershipAdjustments[0], revert = (_a === void 0 ? {
                    promise: Promise.resolve({ notAdded: [] }),
                    revert: function (sharingResults) {
                        return Promise.resolve(sharingResults);
                    },
                } : _a).revert;
                // perform all membership adjustments
                return Promise.all(membershipAdjustments.map(function (_a) {
                    var promise = _a.promise;
                    return promise;
                }))
                    .then(function () {
                    // then attempt the share
                    return shareToGroup(requestOptions, isAdmin_1, isCrossOrgSharing_1);
                })
                    .then(function (sharingResults) {
                    // lastly, if the admin user was added to the group,
                    // remove them from the group. this is a no-op that
                    // immediately resolves the sharingResults when no
                    // membership adjustment was needed
                    return revert(sharingResults);
                });
            });
        }
        // item owner, let it call through
        return shareToGroup(requestOptions);
    })
        .then(function (sharingResponse) {
        if (sharingResponse.notSharedWith.length) {
            throw Error("Item " + requestOptions.id + " could not be shared to group " + requestOptions.groupId + ".");
        }
        else {
            // all is well
            return sharingResponse;
        }
    });
}
function getMembershipAdjustments(currentUser, isSharedEditingGroup, membership, isAdmin, ownerUser, requestOptions) {
    var membershipGuarantees = [];
    if (requestOptions.groupId !== currentUser.favGroupId) {
        if (isSharedEditingGroup) {
            if (!isAdmin) {
                // abort and reject promise
                throw Error("This item can not be shared to shared editing group " + requestOptions.groupId + " by " + currentUser.username + " as they not the item owner or org admin.");
            }
            membershipGuarantees.push(
            // admin user must be a group member to share, should be reverted afterwards
            ensureMembership(currentUser, currentUser, false, "Error adding " + currentUser.username + " as member to edit group " + requestOptions.groupId + ". Consequently item " + requestOptions.id + " was not shared to the group.", requestOptions), 
            // item owner must be a group admin
            ensureMembership(currentUser, ownerUser, true, membership === "none"
                ? "Error adding user " + ownerUser.username + " to edit group " + requestOptions.groupId + ". Consequently item " + requestOptions.id + " was not shared to the group."
                : "Error promoting user " + ownerUser.username + " to admin in edit group " + requestOptions.groupId + ". Consequently item " + requestOptions.id + " was not shared to the group.", requestOptions));
        }
        else if (isAdmin) {
            // admin user must be a group member to share, should be reverted afterwards
            membershipGuarantees.push(ensureMembership(currentUser, currentUser, false, "Error adding " + currentUser.username + " as member to view group " + requestOptions.groupId + ". Consequently item " + requestOptions.id + " was not shared to the group.", requestOptions));
        }
        else if (membership === "none") {
            // all other non-item owners must be a group member
            throw new Error("This item can not be shared by " + currentUser.username + " as they are not a member of the specified group " + requestOptions.groupId + ".");
        }
    }
    return membershipGuarantees;
}
function shareToGroup(requestOptions, isAdmin, isCrossOrgSharing) {
    if (isAdmin === void 0) { isAdmin = false; }
    if (isCrossOrgSharing === void 0) { isCrossOrgSharing = false; }
    var username = requestOptions.authentication.username;
    var itemOwner = requestOptions.owner || username;
    // decide what url to use
    // default to the non-owner url...
    var url = getPortalUrl(requestOptions) + "/content/items/" + requestOptions.id + "/share";
    // but if they are the owner, or org_admin, use this route
    // Note: When using this end-point as an admin, apparently the admin does not need to be a member of the group (the itemOwner does)
    // Note: Admin's can only use this route when the item is in the same org they are admin for
    if (itemOwner === username || (isAdmin && !isCrossOrgSharing)) {
        url = getPortalUrl(requestOptions) + "/content/users/" + itemOwner + "/items/" + requestOptions.id + "/share";
    }
    // now its finally time to do the sharing
    requestOptions.params = {
        groups: requestOptions.groupId,
        confirmItemControl: requestOptions.confirmItemControl,
    };
    return request(url, requestOptions);
}
function ensureMembership(currentUser, ownerUser, shouldPromote, errorMessage, requestOptions) {
    var _a;
    var ownerGroups = ownerUser.groups || [];
    var group = ownerGroups.find(function (g) {
        return g.id === requestOptions.groupId;
    });
    // if they are in different orgs, eject
    if (currentUser.orgId !== ownerUser.orgId) {
        throw Error("User " + ownerUser.username + " is not a member of the same org as " + currentUser.username + ". Consequently they can not be added added to group " + requestOptions.groupId + " nor can item " + requestOptions.id + " be shared to the group.");
    }
    // if owner is not a member, and has 512 groups
    if (!group && ownerGroups.length > 511) {
        throw Error("User " + ownerUser.username + " already has 512 groups, and can not be added to group " + requestOptions.groupId + ". Consequently item " + requestOptions.id + " can not be shared to the group.");
    }
    var promise;
    var revert;
    // decide if we need to add them or upgrade them
    if (group) {
        // they are in the group...
        // check member type
        if (shouldPromote && group.userMembership.memberType === "member") {
            // promote them
            promise = updateUserMemberships({
                id: requestOptions.groupId,
                users: [ownerUser.username],
                newMemberType: "admin",
                authentication: requestOptions.authentication,
            })
                .then(function (results) {
                // convert the result into the right type
                var notAdded = results.results.reduce(function (acc, entry) {
                    if (!entry.success) {
                        acc.push(entry.username);
                    }
                    return acc;
                }, []);
                // and return it
                return Promise.resolve({ notAdded: notAdded });
            })
                .catch(function () { return ({ notAdded: [ownerUser.username] }); });
            revert = function (sharingResults) {
                return updateUserMemberships({
                    id: requestOptions.groupId,
                    users: [ownerUser.username],
                    newMemberType: "member",
                    authentication: requestOptions.authentication,
                })
                    .then(function () { return sharingResults; })
                    .catch(function () { return sharingResults; });
            };
        }
        else {
            // they are already an admin in the group
            // return the same response the API would if we added them
            promise = Promise.resolve({ notAdded: [] });
            revert = function (sharingResults) { return Promise.resolve(sharingResults); };
        }
    }
    else {
        // attempt to add user to group
        var userType = shouldPromote ? "admins" : "users";
        // can't currently determine if the group is within the admin's
        // org without performing a search, so attempt to add and handle
        // the api error
        promise = addGroupUsers((_a = {
                id: requestOptions.groupId
            },
            _a[userType] = [ownerUser.username],
            _a.authentication = requestOptions.authentication,
            _a))
            .then(function (results) {
            // results.errors includes an ArcGISAuthError when the group
            // is in a different org, but notAdded is empty, throw here
            // to normalize the results in below catch
            if (results.errors && results.errors.length) {
                throw results.errors[0];
            }
            return results;
        })
            .catch(function () { return ({ notAdded: [ownerUser.username] }); });
        revert = function (sharingResults) {
            return removeGroupUsers({
                id: requestOptions.groupId,
                users: [ownerUser.username],
                authentication: requestOptions.authentication,
            }).then(function () {
                // always resolves, suppress any resolved errors
                return sharingResults;
            });
        };
    }
    return {
        promise: promise.then(function (membershipResponse) {
            if (membershipResponse.notAdded.length) {
                throw new Error(errorMessage);
            }
            return membershipResponse;
        }),
        revert: revert,
    };
}

/**
 * Stop sharing an item with a group, either as an
 * [item owner](https://developers.arcgis.com/rest/users-groups-and-items/unshare-item-as-item-owner-.htm),
 * [group admin](https://developers.arcgis.com/rest/users-groups-and-items/unshare-item-as-group-admin-.htm) or
 * organization admin.
 *
 * ```js
 * import { unshareItemWithGroup } from '@esri/arcgis-rest-portal';
 *
 * unshareItemWithGroup({
 *   id: "abc123",
 *   groupId: "xyz987",
 *   owner: "some-owner",
 *   authentication: session
 * })
 * ```
 *
 * @param requestOptions - Options for the request.
 * @returns A Promise that will resolve with the data from the response.
 */
function unshareItemWithGroup(requestOptions) {
    return isItemSharedWithGroup(requestOptions)
        .then(function (isShared) {
        // not shared
        if (!isShared) {
            // exit early with success response
            return Promise.resolve({
                itemId: requestOptions.id,
                shortcut: true,
                notUnsharedFrom: []
            });
        }
        var username = requestOptions.authentication.username, owner = requestOptions.owner;
        // next check if the user is a member of the group
        return Promise.all([
            getUserMembership(requestOptions),
            getUser({
                username: username,
                authentication: requestOptions.authentication
            })
        ])
            .then(function (_a) {
            var membership = _a[0], currentUser = _a[1];
            var itemOwner = owner || username;
            var isItemOwner = itemOwner === username;
            var isAdmin = currentUser.role === 'org_admin' && !currentUser.roleId;
            if (!isItemOwner && !isAdmin && ['admin', 'owner'].indexOf(membership) < 0) {
                // abort and reject promise
                throw Error("This item can not be unshared from group " + requestOptions.groupId + " by " + username + " as they not the item owner, an org admin, group admin or group owner.");
            }
            // let the sharing call go
            return unshareFromGroup(requestOptions);
        })
            .then(function (sharingResponse) {
            if (sharingResponse.notUnsharedFrom.length) {
                throw Error("Item " + requestOptions.id + " could not be unshared to group " + requestOptions.groupId);
            }
            else {
                // all is well
                return sharingResponse;
            }
        });
    });
}
function unshareFromGroup(requestOptions) {
    var username = requestOptions.authentication.username;
    var itemOwner = requestOptions.owner || username;
    // decide what url to use
    // default to the non-owner url...
    var url = getPortalUrl(requestOptions) + "/content/items/" + requestOptions.id + "/unshare";
    // but if they are the owner, we use a different path...
    if (itemOwner === username) {
        url = getPortalUrl(requestOptions) + "/content/users/" + itemOwner + "/items/" + requestOptions.id + "/unshare";
    }
    // now its finally time to do the sharing
    requestOptions.params = {
        groups: requestOptions.groupId
    };
    return request(url, requestOptions);
}

/* Copyright (c) 2018-2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Determine if a specific service name is available in the current user's organization
 *
 * @export
 * @param {string} name
 * @param {UserSession} session
 * @return {*}  {Promise<IServiceNameAvailable>}
 */
function isServiceNameAvailable(name, type, session) {
    var url = session.portal + "/portals/self/isServiceNameAvailable";
    return request(url, {
        params: {
            name: name,
            type: type,
        },
        httpMethod: "GET",
        authentication: session,
    });
}

/* Copyright (c) 2018-2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Given a starting name, return a service name that is unqieu within
 * the current users organization
 *
 * @export
 * @param {string} name
 * @param {UserSession} session
 * @param {number} step
 * @return {*}  {Promise<string>}
 */
function getUniqueServiceName(name, type, session, step) {
    var nameToCheck = name;
    if (step) {
        nameToCheck = name + "_" + step;
    }
    return isServiceNameAvailable(nameToCheck, type, session).then(function (response) {
        if (response.available) {
            return nameToCheck;
        }
        else {
            step = step + 1;
            return getUniqueServiceName(name, type, session, step);
        }
    });
}

/* Copyright (c) 2017-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Get the portal
 * @param requestOptions
 */
function getSelf(requestOptions) {
    // just delegate to getPortal w/o an id
    return getPortal(null, requestOptions);
}
/**
 * ```js
 * import { getPortal } from "@esri/arcgis-rest-request";
 * //
 * getPortal()
 * getPortal("fe8")
 * getPortal(null, { portal: "https://custom.maps.arcgis.com/sharing/rest/" })
 * ```
 * Fetch information about the specified portal by id. If no id is passed, portals/self will be called.
 * Note that if you intend to request a portal by id and it is different from the portal specified by options.authentication, you must also pass options.portal.
 * @param id
 * @param requestOptions
 */
function getPortal(id, requestOptions) {
    // construct the search url
    var idOrSelf = id ? id : "self";
    var url = getPortalUrl(requestOptions) + "/portals/" + idOrSelf;
    // default to a GET request
    var options = __assign({ httpMethod: "GET" }, requestOptions);
    // send the request
    return request(url, options);
}

/* Copyright (c) 2017-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { getPortalSettings } from "@esri/arcgis-rest-portal";
 * //
 * getPortalSettings()
 * getPortalSettings("fe8")
 * getPortalSettings(null, { portal: "https://custom.maps.arcgis.com/sharing/rest/" })
 * ```
 * Fetch the settings for the current portal by id. If no id is passed, portals/self/settings will be called
 * @param id
 * @param requestOptions
 */
function getPortalSettings(id, requestOptions) {
    // construct the search url
    var idOrSelf = id ? id : "self";
    var url = getPortalUrl(requestOptions) + "/portals/" + idOrSelf + "/settings";
    // default to a GET request
    var options = __assign({ httpMethod: "GET" }, requestOptions);
    // send the request
    return request(url, options);
}

/* Copyright (c) 2017-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { getSubscriptionInfo } from "@esri/arcgis-rest-request";
 * //
 * getSubscriptionInfo()
 * getSubscriptionInfo("fe8")
 * getSubscriptionInfo(null, { portal: "https://custom.maps.arcgis.com/sharing/rest/" })
 * ```
 * Fetch subscription information about the current portal by id. If no id is passed, portals/self/subscriptionInfo will be called
 * @param id
 * @param requestOptions
 */
function getSubscriptionInfo(id, requestOptions) {
    // construct the search url
    var idOrSelf = id ? id : "self";
    var url = getPortalUrl(requestOptions) + "/portals/" + idOrSelf + "/subscriptionInfo";
    // default to a GET request
    var options = __assign({ httpMethod: "GET" }, requestOptions);
    // send the request
    return request(url, options);
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

/* Copyright (c) 2018-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

export { searchGroupUsers as A, searchGroupContent as B, removeGroupUsers as C, updateGroup as D, updateUserMemberships as E, createItem as F, protectItem as G, removeItemResource as H, getItemResource as I, getSelf as J, getUserUrl as K, joinGroup as L, leaveGroup as M, getUserContent as N, createFolder as O, setItemAccess as P, moveItem as Q, getItemStatus as R, SearchQueryBuilder as S, exportItem as T, getPortal as U, addGroupUsers as a, unprotectItem as b, createOrgNotification as c, removeItem as d, updateItem as e, getItem as f, getPortalUrl as g, getItemData as h, inviteGroupUsers as i, unshareItemWithGroup as j, searchItems as k, addItemResource as l, getItemResources as m, searchGroups as n, searchUsers as o, getRelatedItems as p, getItemMetadata as q, removeGroup as r, shareItemWithGroup as s, getItemGroups as t, unprotectGroup as u, getUser as v, createGroup as w, protectGroup as x, getGroup as y, getGroupUsers as z };
