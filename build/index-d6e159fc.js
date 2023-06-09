import { c as cleanUrl, _ as __assign, r as request, b as appendCustomParams, g as __rest } from './index-5c68fb28.js';

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { getFeature } from '@esri/arcgis-rest-feature-layer';
 * //
 * const url = "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0";
 * //
 * getFeature({
 *   url,
 *   id: 42
 * }).then(feature => {
 *  console.log(feature.attributes.FID); // 42
 * });
 * ```
 * Get a feature by id.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the feature or the [response](https://developer.mozilla.org/en-US/docs/Web/API/Response) itself if `rawResponse: true` was passed in.
 */
function getFeature(requestOptions) {
    var url = cleanUrl(requestOptions.url) + "/" + requestOptions.id;
    // default to a GET request
    var options = __assign({ httpMethod: "GET" }, requestOptions);
    return request(url, options).then(function (response) {
        if (options.rawResponse) {
            return response;
        }
        return response.feature;
    });
}
/**
 * ```js
 * import { queryFeatures } from '@esri/arcgis-rest-feature-layer';
 * //
 * queryFeatures({
 *   url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3",
 *   where: "STATE_NAME = 'Alaska'"
 * })
 *   .then(result)
 * ```
 * Query a feature service. See [REST Documentation](https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with the query response.
 */
function queryFeatures(requestOptions) {
    var queryOptions = appendCustomParams(requestOptions, [
        "where",
        "objectIds",
        "relationParam",
        "time",
        "distance",
        "units",
        "outFields",
        "geometry",
        "geometryType",
        "spatialRel",
        "returnGeometry",
        "maxAllowableOffset",
        "geometryPrecision",
        "inSR",
        "outSR",
        "gdbVersion",
        "returnDistinctValues",
        "returnIdsOnly",
        "returnCountOnly",
        "returnExtentOnly",
        "orderByFields",
        "groupByFieldsForStatistics",
        "outStatistics",
        "returnZ",
        "returnM",
        "multipatchOption",
        "resultOffset",
        "resultRecordCount",
        "quantizationParameters",
        "returnCentroid",
        "resultType",
        "historicMoment",
        "returnTrueCurves",
        "sqlFormat",
        "returnExceededLimitFeatures",
        "f"
    ], {
        httpMethod: "GET",
        params: __assign({ 
            // set default query parameters
            where: "1=1", outFields: "*" }, requestOptions.params)
    });
    return request(cleanUrl(requestOptions.url) + "/query", queryOptions);
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { addFeatures } from '@esri/arcgis-rest-feature-layer';
 * //
 * addFeatures({
 *   url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/ServiceRequest/FeatureServer/0",
 *   features: [{
 *     geometry: { x: -120, y: 45, spatialReference: { wkid: 4326 } },
 *     attributes: { status: "alive" }
 *   }]
 * })
 *   .then(response)
 * ```
 * Add features request. See the [REST Documentation](https://developers.arcgis.com/rest/services-reference/add-features.htm) for more information.
 *
 * @param requestOptions - Options for the request.
 * @returns A Promise that will resolve with the addFeatures response.
 */
function addFeatures(requestOptions) {
    var url = cleanUrl(requestOptions.url) + "/addFeatures";
    // edit operations are POST only
    var options = appendCustomParams(requestOptions, ["features", "gdbVersion", "returnEditMoment", "rollbackOnFailure"], { params: __assign({}, requestOptions.params) });
    return request(url, options);
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 *
 * ```js
 * import { updateFeatures } from '@esri/arcgis-rest-feature-layer';
 * //
 * updateFeatures({
 *   url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/ServiceRequest/FeatureServer/0",
 *   features: [{
 *     geometry: { x: -120, y: 45, spatialReference: { wkid: 4326 } },
 *     attributes: { status: "alive" }
 *   }]
 * });
 * ```
 * Update features request. See the [REST Documentation](https://developers.arcgis.com/rest/services-reference/update-features.htm) for more information.
 *
 * @param requestOptions - Options for the request.
 * @returns A Promise that will resolve with the updateFeatures response.
 */
function updateFeatures(requestOptions) {
    var url = cleanUrl(requestOptions.url) + "/updateFeatures";
    // edit operations are POST only
    var options = appendCustomParams(requestOptions, ["features", "gdbVersion", "returnEditMoment", "rollbackOnFailure", "trueCurveClient"], { params: __assign({}, requestOptions.params) });
    return request(url, options);
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { deleteFeatures } from '@esri/arcgis-rest-feature-layer';
 * //
 * deleteFeatures({
 *   url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/ServiceRequest/FeatureServer/0",
 *   objectIds: [1,2,3]
 * });
 * ```
 * Delete features request. See the [REST Documentation](https://developers.arcgis.com/rest/services-reference/delete-features.htm) for more information.
 *
 * @param deleteFeaturesRequestOptions - Options for the request.
 * @returns A Promise that will resolve with the deleteFeatures response.
 */
function deleteFeatures(requestOptions) {
    var url = cleanUrl(requestOptions.url) + "/deleteFeatures";
    // edit operations POST only
    var options = appendCustomParams(requestOptions, [
        "where",
        "objectIds",
        "gdbVersion",
        "returnEditMoment",
        "rollbackOnFailure"
    ], { params: __assign({}, requestOptions.params) });
    return request(url, options);
}

/* Copyright (c) 2017-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { applyEdits } from '@esri/arcgis-rest-feature-layer';
 * //
 * applyEdits({
 *   url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/ServiceRequest/FeatureServer/0",
 *   adds: [{
 *     geometry: { x: -120, y: 45, spatialReference: { wkid: 4326 } },
 *     attributes: { status: "alive" }
 *   }],
 *   updates: [{
 *     attributes: { OBJECTID: 1004, status: "alive" }
 *   }],
 *   deletes: [862, 1548]
 * })
 *   .then(response)
 * ```
 * Apply edits request. See the [REST Documentation](https://developers.arcgis.com/rest/services-reference/apply-edits-feature-service-layer-.htm) for more information.
 *
 * @param requestOptions - Options for the request.
 * @returns A Promise that will resolve with the applyEdits response.
 */
function applyEdits(requestOptions) {
    var url = cleanUrl(requestOptions.url) + "/applyEdits";
    // edit operations are POST only
    var options = appendCustomParams(requestOptions, [
        "adds",
        "updates",
        "deletes",
        "useGlobalIds",
        "attachments",
        "gdbVersion",
        "returnEditMoment",
        "rollbackOnFailure",
        "trueCurveClient",
    ], { params: __assign({}, requestOptions.params) });
    return request(url, options);
}

/* Copyright (c) 2017-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
var serviceRegex = new RegExp(/.+(?:map|feature|image)server/i);
/**
 * Return the service url. If not matched, returns what was passed in
 */
function parseServiceUrl(url) {
    var match = url.match(serviceRegex);
    if (match) {
        return match[0];
    }
    else {
        return stripQueryString(url);
    }
}
function stripQueryString(url) {
    var stripped = url.split('?')[0];
    return cleanUrl(stripped);
}

/**
 * ```js
 * import { getAllLayersAndTables } from '@esri/arcgis-rest-feature-layer';
 * getAllLayersAndTables({
 *   url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/ServiceRequest/FeatureServer/0"
 * })
 *   .then(response) // { layers: [...], tables: [...] }
 * ```
 * Fetches all the layers and tables associated with a given layer service.
 * Wrapper for https://developers.arcgis.com/rest/services-reference/all-layers-and-tables.htm
 *
 * @param options - Request options, including the url for the layer service
 * @returns A Promise that will resolve with the layers and tables for the given service
 */
// TODO: should we expand this to support other valid params of the endpoint?
function getAllLayersAndTables(options) {
    var url = options.url, requestOptions = __rest(options, ["url"]);
    var layersUrl = parseServiceUrl(url) + "/layers";
    return request(layersUrl, requestOptions);
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { getAttachments } from '@esri/arcgis-rest-feature-layer';
 * //
 * getAttachments({
 *   url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/ServiceRequest/FeatureServer/0",
 *   featureId: 8484
 * });
 * ```
 * Request `attachmentInfos` of a feature by id. See [Attachment Infos](https://developers.arcgis.com/rest/services-reference/attachment-infos-feature-service-.htm) for more information.
 *
 * @param requestOptions - Options for the request.
 * @returns A Promise that will resolve with the `getAttachments()` response.
 */
function getAttachments(requestOptions) {
    var options = __assign({ httpMethod: "GET" }, requestOptions);
    // pass through
    return request(cleanUrl(options.url) + "/" + options.featureId + "/attachments", options);
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { addAttachment } from '@esri/arcgis-rest-feature-layer';
 * //
 * addAttachment({
 *   url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/ServiceRequest/FeatureServer/0",
 *   featureId: 8484,
 *   attachment: myFileInput.files[0]
 * })
 *   .then(response)
 * ```
 * Attach a file to a feature by id. See [Add Attachment](https://developers.arcgis.com/rest/services-reference/add-attachment.htm) for more information.
 *
 * @param requestOptions - Options for the request.
 * @returns A Promise that will resolve with the `addAttachment()` response.
 */
function addAttachment(requestOptions) {
    var options = __assign({ params: {} }, requestOptions);
    // `attachment` --> params: {}
    options.params.attachment = requestOptions.attachment;
    return request(cleanUrl(options.url) + "/" + options.featureId + "/addAttachment", options);
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 *
 * ```js
 * import { updateAttachment } from '@esri/arcgis-rest-feature-layer';
 * //
 * updateAttachment({
 *   url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/ServiceRequest/FeatureServer/0",
 *   featureId: 8484,
 *   attachment: myFileInput.files[0],
 *   attachmentId: 306
 * });
 * ```
 * Update a related attachment to a feature by id. See [Update Attachment](https://developers.arcgis.com/rest/services-reference/update-attachment.htm) for more information.
 *
 * @param requestOptions - Options for the request.
 * @returns A Promise that will resolve with the `updateAttachment()` response.
 */
function updateAttachment(requestOptions) {
    var options = __assign({ params: {} }, requestOptions);
    // `attachment` and `attachmentId` --> params: {}
    options.params.attachment = requestOptions.attachment;
    options.params.attachmentId = requestOptions.attachmentId;
    return request(cleanUrl(options.url) + "/" + options.featureId + "/updateAttachment", options);
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { deleteAttachments } from '@esri/arcgis-rest-feature-layer';
 * //
 * deleteAttachments({
 *   url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/ServiceRequest/FeatureServer/0",
 *   featureId: 8484,
 *   attachmentIds: [306]
 * });
 * ```
 * Delete existing attachment files of a feature by id. See [Delete Attachments](https://developers.arcgis.com/rest/services-reference/delete-attachments.htm) for more information.
 *
 * @param requestOptions - Options for the request.
 * @returns A Promise that will resolve with the `deleteAttachments()` response.
 */
function deleteAttachments(requestOptions) {
    var options = __assign({ params: {} }, requestOptions);
    // `attachmentIds` --> params: {}
    options.params.attachmentIds = requestOptions.attachmentIds;
    return request(cleanUrl(options.url) + "/" + options.featureId + "/deleteAttachments", options);
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 *
 * ```js
 * import { queryRelated } from '@esri/arcgis-rest-feature-layer'
 * //
 * queryRelated({
 *  url: "http://services.myserver/OrgID/ArcGIS/rest/services/Petroleum/KSPetro/FeatureServer/0",
 *  relationshipId: 1,
 *  params: { returnCountOnly: true }
 * })
 *  .then(response) // response.relatedRecords
 * ```
 * Query the related records for a feature service. See the [REST Documentation](https://developers.arcgis.com/rest/services-reference/query-related-records-feature-service-.htm) for more information.
 *
 * @param requestOptions
 * @returns A Promise that will resolve with the query response
 */
function queryRelated(requestOptions) {
    var options = appendCustomParams(requestOptions, ["objectIds", "relationshipId", "definitionExpression", "outFields"], {
        httpMethod: "GET",
        params: __assign({ 
            // set default query parameters
            definitionExpression: "1=1", outFields: "*", relationshipId: 0 }, requestOptions.params)
    });
    return request(cleanUrl(requestOptions.url) + "/queryRelatedRecords", options);
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { getLayer } from '@esri/arcgis-rest-feature-layer';
 * //
 * getLayer({
 *   url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/ServiceRequest/FeatureServer/0"
 * })
 *   .then(response) // { name: "311", id: 0, ... }
 * ```
 * Layer (Feature Service) request. See the [REST Documentation](https://developers.arcgis.com/rest/services-reference/layer-feature-service-.htm) for more information.
 *
 * @param options - Options for the request.
 * @returns A Promise that will resolve with the addFeatures response.
 */
function getLayer(options) {
    return request(cleanUrl(options.url), options);
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { getService } from '@esri/arcgis-rest-feature-layer';
 * //
 * getService({
 *   url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/ServiceRequest/FeatureServer"
 * })
 *   .then(response) // { name: "311", id: 0, ... }
 * ```
 * Feature Service request. See the [REST Documentation](https://developers.arcgis.com/rest/services-reference/feature-service.htm) for more information.
 *
 * @param options - Options for the request.
 * @returns A Promise that will resolve with the getService response.
 */
function getService(options) {
    return request(cleanUrl(options.url), options);
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { queryFeatures, decodeValues } from '@esri/arcgis-rest-feature-layer';
 * //
 * const url = `https://sampleserver6.arcgisonline.com/arcgis/rest/services/ServiceRequest/FeatureServer/0`
 * queryFeatures({ url })
 *   .then(queryResponse => {
 *     decodeValues({
 *       url,
 *       queryResponse
 *     })
 *       .then(decodedResponse)
 *   })
 * ```
 * Replaces the raw coded domain values in a query response with descriptions (for legibility).
 *
 * @param requestOptions - Options for the request.
 * @returns A Promise that will resolve with the addFeatures response.
 */
function decodeValues(requestOptions) {
    var prms;
    if (requestOptions.fields) {
        prms = Promise.resolve(requestOptions.fields);
    }
    else {
        prms = getLayer({ url: requestOptions.url }).then(function (metadata) {
            return metadata.fields;
        });
    }
    return prms.then(function (fields) {
        // extract coded value domains
        var domains = extractCodedValueDomains(fields);
        if (Object.keys(domains).length < 1) {
            // no values to decode
            return requestOptions.queryResponse;
        }
        // don't mutate original features
        var decodedFeatures = requestOptions.queryResponse.features.map(function (feature) {
            var decodedAttributes = {};
            for (var key in feature.attributes) {
                /* istanbul ignore next */
                if (!Object.prototype.hasOwnProperty.call(feature.attributes, key))
                    continue;
                var value = feature.attributes[key];
                var domain = domains[key];
                decodedAttributes[key] =
                    value !== null && domain ? decodeValue(value, domain) : value;
            }
            // merge decoded attributes into the feature
            return __assign(__assign({}, feature), { attributes: decodedAttributes });
        });
        // merge decoded features into the response
        return __assign(__assign({}, requestOptions.queryResponse), { features: decodedFeatures });
    });
}
function extractCodedValueDomains(fields) {
    return fields.reduce(function (domains, field) {
        var domain = field.domain;
        if (domain && domain.type === "codedValue") {
            domains[field.name] = domain;
        }
        return domains;
    }, {});
}
// TODO: add type for domain?
function decodeValue(value, domain) {
    var codedValue = domain.codedValues.find(function (d) {
        return value === d.code;
    });
    return codedValue ? codedValue.name : value;
}

/* Copyright (c) 2018-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

export { getAllLayersAndTables as a, getLayer as b, getService as g, parseServiceUrl as p, queryFeatures as q };
