import { a as abab, L as Logger, i as itemToContent, c as cloneObject, d as datasetToContent, g as getProp, h as hubApiSearch, s as setContentSiteUrls, b as getHubApiUrl, e as getPortalApiUrl, f as fetchSite, j as categories, k as getCategory, l as addDays, n as getTypes, o as chunkArray, p as getTypeCategories } from './index-5ebfac40.js';
import { k as searchItems } from './index-bed14788.js';

/**
 * Defines an enum for common booleans used to create a search filter
 */
var IBooleanOperator;
(function (IBooleanOperator) {
    IBooleanOperator["AND"] = "AND";
    IBooleanOperator["OR"] = "OR";
    IBooleanOperator["NOT"] = "NOT";
})(IBooleanOperator || (IBooleanOperator = {}));

const DATE_FILTER_FIELDS = ["created", "modified"];
/**
 * Determines if filter value is a non-empty string
 * @param filterValue - a filter value
 */
function isFilterANonEmptyString(filterValue) {
    return filterValue && typeof filterValue === "string";
}
/**
 * Determines if filter value is a non-empty array
 * @param filterValue - a filter value
 */
function isFilterAnArrayWithData(filterValue) {
    return Array.isArray(filterValue) && filterValue.length > 0;
}
/**
 * Determines if filter is non-falsey and corresponds to a date field
 * @param filterValue - a filter's field name
 * @param filterValue - a filter's value
 */
function isFilterFieldADateRange(filterField, filterValue) {
    return DATE_FILTER_FIELDS.indexOf(filterField) >= 0 && filterValue;
}

const TERM_FIELD$1 = "terms";
const DEFAULT_FILTERS = ['(-type: "code attachment")'];
const STRING_ENCLOSED_FILTER_FIELDS = [
    "title",
    "type",
    "typekeywords",
    "description",
    "tags",
    "snippet",
    "categories",
];
/**
 * Converts the common request format of contentSearch to a format specific to the Portal API
 * @param request - the IContentSearchRequest instance for searching
 */
function convertToPortalParams(request, defaultPortal, defaultAuthentication) {
    const q = processFilter$1(request);
    const paging = processPage$1(request) || { start: 1, num: 10 };
    return createSearchOptions$1(q, paging, request.options, defaultPortal, defaultAuthentication);
}
function processFilter$1(request) {
    const filter = request.filter || {};
    const filters = Object.keys(filter).reduce((arr, key) => {
        const clause = convertToPortalFilterClause(key, filter[key]);
        if (clause) {
            arr.push(clause);
        }
        return arr;
    }, []);
    const filtersWithDefaults = addDefaultFilters(filters);
    return filtersWithDefaults.join(" AND ").trim();
}
/**
 * Processes the paging parameters provided as part of a search request
 * @param request content search request
 */
function processPage$1(request) {
    const options = request.options || {};
    const providedPage = options.page || {
        start: 1,
        num: 10,
    };
    return typeof providedPage === "string"
        ? decodePage(providedPage)
        : providedPage;
}
function createSearchOptions$1(q, page, options = {}, defaultPortal, defaultAuthentication) {
    return {
        q,
        sortOrder: options.sortOrder,
        sortField: options.sortField,
        params: {
            countFields: options.aggregations,
            countSize: options.aggregations ? 200 : undefined,
            start: page.start,
            num: page.num,
        },
        bbox: options.bbox,
        portal: options.portal || defaultPortal,
        authentication: options.authentication || defaultAuthentication,
        httpMethod: "POST",
    };
}
function convertToPortalFilterClause(filterField, filterValue) {
    if (isFilterANonEmptyString(filterValue)) {
        return processStringFilter(filterField, filterValue);
    }
    else if (isFilterAnArrayWithData(filterValue)) {
        return processArrayFilter$1(filterField, filterValue);
    }
    else if (isFilterFieldADateRange(filterField, filterValue)) {
        return processDateField$1(filterField, filterValue);
    }
    else {
        return processFieldFilter$1(filterField, filterValue);
    }
}
function addDefaultFilters(filters) {
    return filters.concat(DEFAULT_FILTERS);
}
function processStringFilter(filterField, filterValue) {
    if (filterField === TERM_FIELD$1) {
        return `(${stringifyFilterValue(filterField, filterValue)})`;
    }
    return `(${filterField}: ${stringifyFilterValue(filterField, filterValue)})`;
}
function processArrayFilter$1(filterField, filterArray) {
    const filters = filterArray.map((filter) => stringifyFilterValue(filterField, filter));
    return `(${filterField}: ${filters.join(` OR ${filterField}: `)})`;
}
function processDateField$1(filterField, filterValue) {
    return `(${filterField}: [${filterValue.from || 0} TO ${filterValue.to || new Date().getTime()}])`;
}
function processFieldFilter$1(filterField, contentFilter) {
    if (!contentFilter || !isFilterAnArrayWithData(contentFilter.value)) {
        return undefined;
    }
    const operator = contentFilter.bool || IBooleanOperator.OR;
    const filters = contentFilter.value.map((filter) => stringifyFilterValue(filterField, filter));
    if (operator === IBooleanOperator.NOT) {
        return `(-${filterField}: ${filters.join(` AND -${filterField}: `)})`;
    }
    else {
        return `(${filterField}: ${filters.join(` ${operator.toString()} ${filterField}: `)})`;
    }
}
function stringifyFilterValue(filterField, filterValue) {
    return STRING_ENCLOSED_FILTER_FIELDS.indexOf(filterField) >= 0
        ? `"${filterValue}"`
        : filterValue;
}
function decodePage(page) {
    try {
        const decodedPage = abab.atob(page);
        if (decodedPage === null) {
            throw new Error();
        }
        return JSON.parse(decodedPage);
    }
    catch (err) {
        Logger.error(`error decoding and parsing the provided page: ${page}. Defaulting to starting page`);
        return undefined;
    }
}

const TERM_FIELD = "terms";
const VALID_CATALOG_PROPS = ["id", "orgid", "group", "initiativeid"];
// Necessary to map Portal API-supported properties to Hub Indexer Search API properties
const PROP_MAP$1 = {
    group: "groupIds",
    title: "name",
    typekeywords: "typeKeywords",
    orgid: "orgId",
    initiativeid: "initiativeId",
};
// Necessary to map Portal API-supported values of properties to Hub Indexer Search API properties
const VALUE_MAP = {
    access: {
        org: "organization",
        shared: "team",
        private: "myself",
    },
};
/**
 * Converts the common request format of contentSearch to a format specific to the Hub V3 Search API
 * @param request - the IContentSearchRequest instance for searching
 */
function convertToHubParams(request) {
    const { termField, filterFields, catalogFields } = splitFilterTerms(request);
    const filter = Object.keys(filterFields).length
        ? processFilter(filterFields)
        : undefined;
    const catalog = Object.keys(catalogFields).length
        ? processCatalog(catalogFields)
        : undefined;
    const paging = processPage(request);
    return createSearchOptions({
        termField,
        filter,
        catalog,
        paging,
        options: request.options,
    });
}
function splitFilterTerms(request) {
    const filter = request.filter || {};
    return Object.keys(filter).reduce((filterObj, key) => {
        const hubKey = PROP_MAP$1[key] ? PROP_MAP$1[key] : key;
        if (isFilterATerm(key)) {
            filterObj.termField = filter[key];
        }
        else if (isFilterACatalogFilter(key)) {
            filterObj.catalogFields[hubKey] = filter[key];
        }
        else {
            filterObj.filterFields[hubKey] = filter[key];
        }
        return filterObj;
    }, { termField: undefined, filterFields: {}, catalogFields: {} });
}
function processFilter(filterFields) {
    return Object.keys(filterFields).reduce((filterObj, key) => {
        const clause = convertToHubFilterClause(key, filterFields[key]);
        if (clause) {
            filterObj[key] = clause;
        }
        return filterObj;
    }, {});
}
function processCatalog(catalogFields) {
    return Object.keys(catalogFields).reduce((catalogObj, key) => {
        const clause = convertToHubFilterClause(key, catalogFields[key]);
        if (clause) {
            catalogObj[key] = clause;
        }
        return catalogObj;
    }, {});
}
function processPage(request) {
    const options = request.options || {};
    return options.page;
}
function createSearchOptions(params) {
    const options = params.options || {};
    const sort = createSort(options.sortField, options.sortOrder);
    const agg = getAggregations(options.aggregations);
    const fields = getFields(options.fields);
    const searchParams = {
        q: params.termField || undefined,
        sort,
        filter: params.filter,
        catalog: params.catalog,
        page: params.paging && { key: params.paging },
        agg,
        fields,
    };
    return searchParams;
}
function convertToHubFilterClause(filterField, filterValue) {
    if (isFilterANonEmptyString(filterValue)) {
        return processArrayFilter(filterField, [filterValue]);
    }
    else if (isFilterAnArrayWithData(filterValue)) {
        return processArrayFilter(filterField, filterValue);
    }
    else if (isFilterFieldADateRange(filterField, filterValue)) {
        return processDateField(filterValue);
    }
    else {
        return processFieldFilter(filterValue);
    }
}
function processArrayFilter(field, filterArray) {
    const modifiedFilterValues = filterArray.map((filter) => {
        if (VALUE_MAP[field] && VALUE_MAP[field][filter]) {
            return VALUE_MAP[field][filter];
        }
        return filter;
    });
    return `any(${modifiedFilterValues.join(",")})`;
}
function processDateField(dateFilterValue) {
    const from = dateFilterValue.from || 0;
    const to = dateFilterValue.to || new Date().getTime();
    return `between(${convertDateEpochToString(from)},${convertDateEpochToString(to)})`;
}
function processFieldFilter(contentFilter) {
    if (!contentFilter || !isFilterAnArrayWithData(contentFilter.value)) {
        return undefined;
    }
    const operator = contentFilter.bool || IBooleanOperator.OR;
    const hubOperator = convertToHubOperator(operator);
    const filters = contentFilter.value;
    return `${hubOperator}(${filters.join(",")})`;
}
function convertDateEpochToString(epoch) {
    const date = new Date(epoch).toISOString();
    return date.substring(0, 10);
}
function convertToHubOperator(operator) {
    if (operator === IBooleanOperator.NOT) {
        return "not";
    }
    else if (operator === IBooleanOperator.AND) {
        return "all";
    }
    return "any";
}
function isFilterATerm(filterField) {
    return TERM_FIELD === filterField;
}
function isFilterACatalogFilter(filterField) {
    return VALID_CATALOG_PROPS.indexOf(filterField) >= 0;
}
function createSort(sortField, sortOrder) {
    if (!sortField || sortField.toLowerCase() === "relevance") {
        return undefined;
    }
    const hubSortField = PROP_MAP$1[sortField] ? PROP_MAP$1[sortField] : sortField;
    const order = sortOrder && sortOrder.toLowerCase() === "desc" ? "-" : "";
    return `${order}${hubSortField}`;
}
function getAggregations(aggregations) {
    return aggregations
        ? {
            fields: aggregations,
        }
        : undefined;
}
function getFields(fields) {
    return fields
        ? {
            datasets: fields,
        }
        : undefined;
}

/**
 * Converts the response format returned by the Portal API to a common format
 * @param request - the ISearchOptions instance used to invoke the request
 * @param response - the ISearchResult JSON returned by the Portal API
 */
function convertPortalResponse(request, response) {
    const results = response.results.map(itemToContent);
    const count = response.num;
    const total = response.total;
    const hasNext = response.nextStart > -1;
    const query = response.query;
    const aggregations = response.aggregations
        ? mapAggregations$1(response.aggregations)
        : undefined;
    const next = getNextFunction$1(request, response.nextStart, response.total);
    return {
        results,
        count,
        total,
        hasNext,
        query,
        aggregations,
        next,
    };
}
function mapAggregations$1(aggregations) {
    return Object.keys(aggregations).reduce((contentAggs, aggType) => {
        // Built in as a safety if Portal returns unsupported aggregations
        /* istanbul ignore else */
        if (aggType.toLowerCase() === "counts") {
            contentAggs.counts = mapCountAggregations$1(aggregations[aggType]);
        }
        return contentAggs;
    }, {});
}
function mapCountAggregations$1(countAggs) {
    return countAggs.map((agg) => {
        const mappedAggs = agg.fieldValues.map((aggValue) => ({
            label: aggValue.value,
            value: aggValue.count,
        }));
        return {
            fieldName: agg.fieldName,
            aggregations: mappedAggs,
        };
    });
}
function getNextFunction$1(request, nextStart, total) {
    const clonedRequest = cloneObject(request);
    // Authentication not properly cloned
    clonedRequest.authentication = request.authentication;
    clonedRequest.start = nextStart > -1 ? nextStart : total + 1;
    return (authentication) => {
        if (authentication) {
            clonedRequest.authentication = authentication;
        }
        return searchItems(clonedRequest).then((response) => {
            return convertPortalResponse(clonedRequest, response);
        });
    };
}

const PROP_MAP = {
    title: "name",
};
/**
 * Converts the response format returned by the Hub Indexer V3 API to a common format
 * @param request - the ISearchParams instance used to invoke the request
 * @param response - the JSON returned by the Hub Indexer V3 API
 * @param defaultAuthentication - a default UserSession instance that can be used for the next() request if none provided
 */
function convertHubResponse(request, response = { data: [], meta: {} }, defaultAuthentication) {
    const results = response.data.map(datasetToContent);
    const { count, total, hasNext, query, aggregations } = getResponseMetadata(response);
    const next = getNextFunction(request, response, hasNext, defaultAuthentication);
    return {
        results,
        count,
        total,
        hasNext,
        query,
        aggregations: aggregations ? mapAggregations(aggregations) : undefined,
        next,
    };
}
function mapAggregations(aggregations) {
    return {
        counts: mapCountAggregations(aggregations),
    };
}
function mapCountAggregations(countAggs) {
    return Object.keys(countAggs).map((aggKey) => {
        const aggregations = countAggs[aggKey]
            ? countAggs[aggKey].map((agg) => ({
                label: agg.key.toLowerCase(),
                value: agg.docCount,
            }))
            : [];
        return {
            fieldName: aggKey,
            aggregations,
        };
    });
}
function getNextFunction(request, response, hasNext, defaultAuthentication) {
    return (auth) => {
        const authentication = auth || defaultAuthentication;
        const headers = authentication &&
            authentication.serialize &&
            new Headers({ authentication: authentication.serialize() });
        if (hasNext) {
            // should this use hubRequest instead of fetch?
            return fetch(response.meta.next, {
                method: "GET",
                mode: "cors",
                headers,
            })
                .then((res) => res.json())
                .then((res) => convertHubResponse(request, res, defaultAuthentication));
        }
        const metadata = getResponseMetadata(response);
        return Promise.resolve({
            results: [],
            count: 0,
            total: metadata.total,
            hasNext: false,
            query: metadata.query,
            aggregations: metadata.aggregations
                ? mapAggregations(metadata.aggregations)
                : undefined,
            next: getNextFunction(request, response, false),
        });
    };
}
function getResponseMetadata(response) {
    const respQuery = getProp(response, "meta.queryParameters");
    const query = respQuery ? JSON.stringify(respQuery) : undefined;
    const respAggregations = getProp(response, "meta.stats.aggs") || {};
    const aggregations = Object.keys(respAggregations).length > 0 ? respAggregations : undefined;
    return {
        count: getProp(response, "meta.stats.count") || 0,
        total: getProp(response, "meta.stats.totalCount") || 0,
        hasNext: !!getProp(response, "meta.next"),
        query,
        aggregations,
    };
}

/**
 * A search service for searching content across the Portal API only or Portal API and the
 * Hub Indexer V3 API. Has a single public method for searching.
 *
 * @param portal The Portal Sharing URL of the portal for which content should be searched
 * @param isPortal Flag to determine if content searching should be limited to a Portal API
 * @param authentication Optional User Session instance that can be used for authentication
 *
 * ```js
 * import { ContentSearchService } from '@esri/hub-search'
 *
 * const service = new ContentSearchService({
 *     portal: 'https://hub.arcgis.com/sharing/rest,
 *     isPortal: false
 *     session: new UserSession({ ... })
 * });
 *
 * const searchResults = await service.search({ filters, options })
 * ```
 */
class ContentSearchService {
    constructor(params) {
        this.portal = params.portal;
        this.isPortal = params.isPortal;
        this.authentication = params.authentication;
    }
    /**
     * Entrypoint for Portal API-only or Portal API and Hub V3 API Search
     * @param request - the IContentSearchRequest instance for searching
     */
    search(request) {
        const isPortal = getProp(request, "options.isPortal") || this.isPortal;
        if (isPortal) {
            return this.enterpriseSearch(request);
        }
        return this.onlineSearch(request);
    }
    enterpriseSearch(request = { filter: {}, options: {} }) {
        return performEnterpriseContentSearch(request, this.portal, this.authentication);
    }
    onlineSearch(request = { filter: {}, options: {} }) {
        // merge instance's portal and authentication into options
        const { portal, authentication } = this;
        const options = Object.assign({ portal, authentication }, request.options);
        return performHubContentSearch(Object.assign(Object.assign({}, request), { options }));
    }
}
/**
 * A standalone function for searching Hub content
 *
 * A content search is configured by passing `searchContent` an object of type `IContentSearchRequest`.
 * This configuration object is composed of two important child objects: `filter` and `options`.
 *
 * The `filter` object allows the caller to filter results based on attributes exposed by AGO and
 * the Hub API. A complete list of attributes can be found at the docs for `IContentSearchFilter`,
 * but some examples include:
 * - access
 * - id
 * - group
 * - orgid
 *
 * The `options` object allows the caller to specify more general attributes about the request itself.
 * A complete list of options can be found at the docs for `IContentSearchOptions`, but some examples include:
 * - the authenticated user
 * - whether the call is happening in an enterprise environment
 * - what site catalog to search
 *
 * Combined, both filters and options allow you to create complex queries against AGO / Hub API.
 * Here are examples of some common use cases:
 *
 * ```js
 * import { searchContent, IBooleanOperator } from '@esri/hub-search';
 * ...
 *
 * /////////////////////////////////////////////////////////////////////
 * // Search for all public and private content associated with a site
 * /////////////////////////////////////////////////////////////////////
 * const options: IContentSearchOptions = {
 *    site: 'https://my-site.hub.arcgis.com',
 *    portal: 'https://www.arcgis.com',
 *    // Any private content that the authenticated user can access will be included in the results
 *    authentication: new UserSession(...),
 * }
 * const searchResults = await searchContent({ options });
 * ...
 *
 * ///////////////////////////////////////////////////////////
 * // Search for all public content associated with a site
 * ///////////////////////////////////////////////////////////
 * const options: IContentSearchOptions = {
 *    site: 'https://my-site.hub.arcgis.com',
 *    portal: 'https://www.arcgis.com',
 *    authentication: new UserSession(...),
 * }
 * const filter: IContentSearchFilter = {
 *    access: 'public'
 * }
 * const searchResults = await searchContent({ filter, options });
 * ...
 *
 * //////////////////////////////////////////////////////////
 * // Search for all private content associated with a site
 * ///////////////////////////////////////////////////////////
 *
 * // TODO: As of 8/17/21 the hub api has a bug in which
 * // Any query with a not filter on the access field
 * // (e.g access: not('public')) will return no results
 *
 * const options: IContentSearchOptions = {
 *    site: 'https://my-site.hub.arcgis.com',
 *    portal: 'https://www.arcgis.com',
 *    // Any private content that the authenticated user can access will be included in the results
 *    authentication: new UserSession(...),
 * }
 * const filter: IContentSearchFilter = {
 *    access: {
 *        value: ['public'],
 *        bool: IBooleanOperator.NOT
 *    }
 * }
 * const searchResults = await searchContent({ filter, options });
 *
 * ...
 * /////////////////////////////////
 * // Search for a specific item
 * /////////////////////////////////
 * const options: IContentSearchOptions = {
 *    portal: 'https://www.arcgis.com',
 *    authentication: new UserSession(...),
 * }
 * const filter: IContentSearchFilter = {
 *    id: 'my_item_id'
 * }
 * const searchResults = await searchContent({ filter, options });
 * ```
 * There are a couple gotchas that need to be accounted for:
 *
 * 1) There is no way to specify the number of results per page. If you need to fetch all
 * items that match a given query, you'll need to utilize the `hasNext` flag as well as the
 * `next` function included on the return object and make multiple XHR requests.
 *
 * 2) Results returned from the hub index (i.e. 'public items') will be structured differently than
 * results returned from AGO/Enterprise (i.e. 'private' items). A comprehensive list of differences cannot
 * be given here, but developers should be aware that they exist. Additionally, the structure of 'public'
 * items can change when either the indexing process or schema of the Hub API is modified. To showcase
 * some of the possible differences between 'public' and 'private' items, we've provided examples of both
 * types of results below:
 *
 * ```js
 * ///////////////
 * // Private
 * ///////////////
 * {
 *  access: "myself",
 *  appCategories: [],
 *  avgRating: 0,
 *  categories: [],
 *  collection: ["Map"],
 *  contentOrigin: "self",
 *  created: 1623945553000,
 *  culture: "en-us",
 *  description: “A description",
 *  extent: {
 *    coordinates: [],
 *    type: "envelope"
 *  },
 *  hubType: "map",
 *  id: "06c0cdadc2ec48509576c20da8572bf8",
 *  industries: [],
 *  isOrgItem: true,
 *  languages: [],
 *  listed: false,
 *  modified: 1629220743000,
 *  name: "Traffic Camera Enforcement Locations in Washington DC",
 *  numComments: 0,
 *  numRatings: 0,
 *  numViews: 0,
 *  owner: "juliana_pa",
 *  properties: {...}
 *  protected: false,
 *  scoreCompleteness: 66,
 *  screenshots: [],
 *  searchDescription: “A description”,
 *  size: -1,
 *  subInfo: 0,
 *  tags: ["DC GIS", "police", "speed", "speeding", "ticket", "traffic", "violation"],
 *  thumbnail: "thumbnail/ago_downloaded.png",
 *  title: "Traffic Camera Enforcement Locations in Washington DC",
 *  type: "Web Map",
 *  typeKeywords: ["ArcGIS Online", "Explorer Web Map", "Map", "Online Map", "Web Map"],
 * }
 *
 * /////////////
 * // Public
 * /////////////
 * {
 *  access: "public",
 *  additionalResources: []
 *  boundary: {...}
 *  categories: []
 *  collection: ["Map"]
 *  commentsEnabled: true
 *  composeStatus: {...}
 *  composedAt: 1629220762412
 *  content: "Web Map"
 *  created: 1619446871000
 *  culture: "en-us"
 *  description: "A pretty brief summary"
 *  downloadable: false
 *  enrichCoverage: "global"
 *  enrichQuality: 55
 *  errors: []
 *  extent: {...}
 *  groupIds: []
 *  hasApi: false
 *  hubType: "Web Map"
 *  id: "ebfe6f6712ff4a23b5447f0ce53d65c2"
 *  itemExtent: [...]
 *  itemModified: 1629220760000
 *  license: "none"
 *  modified: 1629220760000
 *  modifiedProvenance: "item.modified"
 *  name: "My map"
 *  openData: false
 *  orgExtent: {...}
 *  orgId: "Xj56SBi2udA78cC9"
 *  orgName: "QA Premium Alpha Hub"
 *  organization: "QA Premium Alpha Hub"
 *  owner: "juliana_pa"
 *  region: "US"
 *  searchDescription: "A pretty brief summary"
 *  server: null
 *  size: 1142
 *  slug: "qa-pre-a-hub::my-map"
 *  snippet: "A pretty brief summary"
 *  source: "QA Premium Alpha Hub"
 *  sourceProvenance: "org.name"
 *  structuredLicense: { type: "none" }
 *  tags: []
 *  thumbnail: "thumbnail/ago_downloaded.png"
 *  thumbnailUrl: "thumbnail/ago_downloaded.png"
 *  title: "My map"type: "Web Map"
 *  typeCategories: ["Map"]
 *  typeKeywords: ["ArcGIS Hub", "ArcGIS Online", "Explorer Web Map", "Map", "Online Map", "Web Map"]
 *  validExtent: true
 * }
 * ```
 *
 * @param request - the IContentSearchRequest instance for searching
 *
 */
async function searchContent(request = { filter: {}, options: {} }) {
    var _a;
    const siteModel = await getSiteModelFromOptions(request.options);
    const siteCatalog = (_a = siteModel === null || siteModel === void 0 ? void 0 : siteModel.data) === null || _a === void 0 ? void 0 : _a.catalog;
    if (siteCatalog) {
        const { groups: group, orgId: orgid } = siteCatalog;
        request.filter = Object.assign({ group, orgid }, request.filter);
    }
    const response = getProp(request, "options.isPortal")
        ? await performEnterpriseContentSearch(request)
        : await performHubContentSearch(request);
    if (siteModel) {
        // append the absolute URL to the content on the site
        response.results = response.results.map((content) => setContentSiteUrls(content, siteModel));
    }
    return response;
}
function performEnterpriseContentSearch(request, defaultPortal, defaultAuthentication) {
    const requestParams = convertToPortalParams(request, defaultPortal, defaultAuthentication);
    return searchItems(requestParams).then((response) => convertPortalResponse(requestParams, response));
}
/**
 * Function to search the Hub API (v3)
 * using the same arguments as searchContent()
 *
 * NOTE: this returns the Hub API's raw JSONAPI response
 * and invalid parameters like isPortal will be ignored
 *
 * @param request - see searchContent()
 * @returns Hub API's JSONAPI response
 */
function searchDatasets(request) {
    const params = convertToHubParams(request);
    const requestOptions = Object.assign(Object.assign({}, getHubRequestOptions(request.options)), { params });
    return hubApiSearch(requestOptions);
}
function performHubContentSearch(request) {
    const authentication = getProp(request, "options.authentication");
    return searchDatasets(request).then((response) => {
        const requestParams = convertToHubParams(request);
        return convertHubResponse(requestParams, response, authentication);
    });
}
function getSiteModelFromOptions(options) {
    if (!options || !options.site)
        return null;
    const ro = getHubRequestOptions(options);
    return fetchSite(options.site, ro);
}
// used above
function getHubRequestOptions(options) {
    return {
        authentication: options.authentication,
        isPortal: options.isPortal,
        hubApiUrl: getHubApiUrl(options.portal),
        portal: getPortalApiUrl(options.portal),
    };
}

const apiTypes = categories.apiTypes.map((type) => type.toLowerCase());
// implements the 'hasApi' facet from AGO results. V3 datasets have this property computed
// during the harvesting process but AGO results need this result computed at runtime
function hasApiAgg(agoAggregations = {}) {
    const typeAggs = (getProp(agoAggregations, "counts") || []).filter((agg) => agg.fieldName === "type")[0];
    if (!typeAggs)
        return { hasApi: {} };
    return typeAggs.fieldValues.reduce((formattedAggs, fieldVal) => {
        if (apiTypes.indexOf(fieldVal.value) > -1) {
            formattedAggs.hasApi.true += fieldVal.count;
        }
        else {
            formattedAggs.hasApi.false += fieldVal.count;
        }
        return formattedAggs;
    }, { hasApi: { true: 0, false: 0 } });
}

// implements the 'downloadable' facet from AGO results. V3 datasets have this property computed
// during the harvesting process but AGO results need this result computed at runtime
function downloadableAgg(response) {
    // Get counts of true and false for downloadable facet
    // i.e. { true: 10, false: 15 }
    return response.results.reduce((formattedAggs, result) => {
        if ((result.typeKeywords || []).indexOf("Data") > -1 ||
            categories.downloadableTypes.indexOf(result.type) > -1) {
            formattedAggs.downloadable.true++;
        }
        else {
            formattedAggs.downloadable.false++;
        }
        return formattedAggs;
    }, { downloadable: { true: 0, false: 0 } });
}

// implements the 'collection' facet from AGO results. V3 datasets have this property computed
// during the harvesting process but AGO results need this result computed at runtime
/**
 * Calculate raw counts for collection based on AGO type aggregations
 * @param agoAggregations aggregations from ago results
 */
function collectionAgg(agoAggregations = {}) {
    const typeAggs = (getProp(agoAggregations, "counts") || []).filter((agg) => agg.fieldName === "type")[0];
    if (!typeAggs)
        return { collection: {} };
    return typeAggs.fieldValues.reduce((formattedAggs, fieldVal) => {
        const category = getCategory(fieldVal.value);
        let collectionType;
        if (category) {
            // upper case first letter and return as element in array for backwards compatibility
            collectionType = category
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
        }
        else {
            collectionType = "Other";
        }
        formattedAggs.collection[collectionType] = fieldVal.count;
        return formattedAggs;
    }, { collection: {} });
}

// format raw counts for an agg field which has format like
// { hasApi: { 'true': 2, 'false': 4 } } or { downloadable: { 'true': 7, 'false': 0 } }
// into v3 like { hasApi: [{ key: 'false', docCount: 4 }, { key: 'true', docCount: 2 }] }
function format(rawCounts) {
    return Object.keys(rawCounts).reduce((formattedAggs, field) => {
        formattedAggs[field] = Object.keys(rawCounts[field])
            .reduce((formatted, key) => {
            formatted.push({ key, docCount: rawCounts[field][key] });
            return formatted;
        }, [])
            .sort(compareReverse);
        return formattedAggs;
    }, {});
}
function compareReverse(a, b) {
    return b.docCount > a.docCount ? 1 : -1;
}

const agoSupportedAggs = ["tags", "type", "access", "categories"];
const aggsAlias = {
    collection: "type"
};
/**
 * Get aggreations query object that AGO understands i.e. countFields and countSize
 * only on fields supported by AGO
 * @param facets comma separated list of aggregation fields
 */
function createAggs(facets) {
    // return aggs that are supported by AGO - tags, type, access
    const agoFacets = facets
        .split(",")
        .filter((facet) => agoSupportedAggs.indexOf(facet) > -1);
    const aliases = facets
        .split(",")
        .filter((facet) => Object.keys(aggsAlias).indexOf(facet) > -1);
    // if there is `collection` in facets, then check if its alias has already been added
    Object.keys(aggsAlias).forEach((key) => {
        if (aliases.indexOf(key) > -1 && !(aggsAlias[key] in agoFacets)) {
            agoFacets.push(aggsAlias[key]);
        }
    });
    return {
        countFields: agoFacets.join(","),
        countSize: 200 // max supported by AGO
    };
}

/**
 * Flatten categories as expected by Hub
 *
 * @param {any} categoriesAggs categories aggs array as [{ key, docCount }]
 * @returns {any}
 *
 * Input example:
 * [{ key: '/categories/economy', docCount: 4 }, { key: 'categories/economy/business', docCount: 5 }]
 * Output: [{ key: 'economy', docCount: 9 }, { key: 'business', docCount: 5 }]
 */
function flattenCategories(categoriesAggs = []) {
    const set = new Set();
    const exclude = ["", "categories"];
    // 1. get a flattened unique set of categories
    categoriesAggs.forEach((agg) => {
        const candidates = agg.key
            .split("/")
            .filter((k) => exclude.indexOf(k) === -1);
        candidates.forEach((k) => {
            set.add(k);
        });
    });
    // 2. sum docCount for unique keys
    const flattenedCategoriesAggs = Array.from(set).reduce((flattenedAggs, uniqueKey) => {
        const docCount = categoriesAggs
            .filter((agg) => agg.key.includes(uniqueKey))
            .map((agg) => agg.docCount)
            .reduce((x, y) => x + y);
        flattenedAggs.push({
            key: uniqueKey,
            docCount
        });
        return flattenedAggs;
    }, []);
    return flattenedCategoriesAggs;
}

const legalSortFields = [
    "title",
    "created",
    "type",
    "owner",
    "modified",
    "avgrating",
    "numratings",
    "numcomments",
    "numviews"
];
const hubSortFieldToAGOSortFieldMap = {
    name: "title"
};
function getSortField(field) {
    if (legalSortFields.indexOf(field) >= 0) {
        return field;
    }
    else if (field in hubSortFieldToAGOSortFieldMap) {
        return hubSortFieldToAGOSortFieldMap[field];
    }
}

const filterSchema = {
    orgId: {
        type: "filter",
        dataType: "string",
        defaultOp: "any",
        catalogDefinition: true
    },
    q: { type: "simple" },
    page: { type: "simple" },
    tags: {
        type: "filter",
        dataType: "string",
        defaultOp: "any"
    },
    source: {
        type: "filter",
        dataType: "string",
        defaultOp: "any"
    },
    bbox: { type: "simple" },
    location_name: { type: "simple" },
    sort: { type: "simple" },
    groupIds: {
        type: "filter",
        dataType: "string",
        defaultOp: "any",
        catalogDefinition: true
    },
    catalog: { type: "simple" },
    owner: {
        type: "filter",
        dataType: "string",
        defaultOp: "any"
    },
    access: {
        type: "filter",
        dataType: "string",
        defaultOp: "any"
    },
    type: {
        type: "filter",
        dataType: "string",
        defaultOp: "any"
    },
    hubType: {
        type: "filter",
        dataType: "string",
        defaultOp: "any"
    },
    downloadable: {
        type: "filter",
        dataType: "boolean"
    },
    hasApi: {
        type: "filter",
        dataType: "boolean"
    },
    openData: {
        type: "filter",
        dataType: "boolean"
    },
    id: {
        type: "filter",
        dataType: "string",
        defaultOp: "any",
        catalogDefinition: true
    },
    collection: {
        type: "filter",
        dataType: "string",
        defaultOp: "any"
    },
    sector: {
        type: "filter",
        dataType: "string",
        defaultOp: "any"
    },
    region: {
        type: "filter",
        dataType: "string",
        defaultOp: "any"
    },
    initiativeId: {
        type: "filter",
        dataType: "string",
        defaultOp: "any",
        catalogDefinition: true
    },
    categories: {
        type: "filter",
        dataType: "string",
        defaultOp: "any"
    },
    license: {
        type: "filter",
        dataType: "string",
        defaultOp: "any"
    },
    modified: {
        type: "filter",
        dataType: "string",
        defaultOp: "between"
    }
};

/**
 * Create filters object based on raw params like tags=a,b or tags=any(a,b)
 *
 * @param {ISearchParams} params
 * @returns {any}
 */
// return a standard filter object
// given a query string that looks like this:
//
// ?tags=tag1,tag2&source=source1,source2
//
// This function will return a filter like:
//
// {
//   filter: {
//     tags: {
//       fn: 'all',
//       terms: [ 'tag1', 'tag2' ]
//     },
//     source: {
//       fn: 'any',
//       terms: [ 'source1', 'source2' ]
//     }
//   }
// }
function createFilters(params) {
    if (!params) {
        return {};
    }
    const filter = Object.keys(params).reduce((filters, key) => {
        const filterDefinition = filterSchema[key] || {};
        if (params[key] &&
            filterDefinition.type === "filter" &&
            filterDefinition.dataType) {
            const values = params[key];
            filters[key] = generateFilter(values, filterDefinition);
        }
        return filters;
    }, {});
    return filter;
}
function generateFilter(values, filterDefinition) {
    const match = values.match(/(any|all|between)\((.+)\)/);
    if (match) {
        return {
            fn: match[1],
            terms: match[2].split(","),
            catalogDefinition: filterDefinition.catalogDefinition
        };
    }
    else {
        return {
            fn: filterDefinition.defaultOp || null,
            terms: values.split(","),
            catalogDefinition: filterDefinition.catalogDefinition
        };
    }
}

function encodeFilters(filters = {}) {
    return Object.keys(filters)
        .map(name => {
        const attribute = filters[name];
        const { fn, terms } = attribute;
        // filters that are part of the catalog definition are OR'd together then and-ed to the query
        const type = attribute.catalogDefinition ? "catalog" : "filter";
        const key = encodeURIComponent(`${type}[${name}]`);
        const values = terms.map(encodeURIComponent).join(",");
        return fn ? `${key}=${fn}(${values})` : `${key}=${values}`;
    })
        .join("&");
}

function buildFilter(queryFilters, key) {
    const terms = getProp(queryFilters, `${key}.terms`) || [];
    const joinType = getProp(queryFilters, `${key}.fn`);
    // all params to AGO queries MUST be lower case, so we're going to force
    // lowerCase here because we use `orgId` for Hub index, and need it as `orgid`
    // for AGO. This will allow us to use whatever casing for Hub and still
    // adhere to AGO requirements
    let filter;
    if (joinType === "between") {
        const startDate = terms[0];
        let endDate = terms[1];
        if (startDate === endDate) {
            // add 1 day
            endDate = addDays(startDate, 1);
        }
        const timestamps = [startDate, endDate].map((term) => new Date(term).getTime());
        filter = `${key.toLowerCase()}: [${timestamps.join(agoJoin(joinType))}]`;
    }
    else {
        filter = terms
            .map((term) => `${key.toLowerCase()}:"${term}"`)
            .join(agoJoin(joinType));
    }
    if (joinType === "not") {
        // "not" filter means everything but not those given terms
        filter = `NOT ${filter}`;
    }
    return `(${filter})`;
}
// This function returns the AGO-translation for the query types
// 'any' -> ' OR '
// 'all' => ' AND '
// 'not' => ' NOT '
// ... more filters to come, like the ones below
// 'gt' => ...
// 'lt' => ...
// 'gte' => ...
// 'lte' => ...
// 'range' => ...
function agoJoin(joinType) {
    const key = joinType || "any";
    const joinMap = {
        any: " OR ",
        all: " AND ",
        not: " NOT ",
        between: " TO "
    };
    return joinMap[key];
}

// builds the filter for the 'downloadable' facet
function downloadableFilter(queryFilters) {
    const download = (getProp(queryFilters, "downloadable.terms") || [])[0];
    let downloadFilter;
    let typeKeywordFilter;
    if (download === "true") {
        downloadFilter = categories.downloadableTypes.map((type) => {
            return `type:"${type}"`;
        });
        typeKeywordFilter = categories.downloadableTypeKeywords.map((type) => {
            return `typekeywords:"${type}"`;
        });
    }
    else {
        downloadFilter = categories.downloadableTypes.map((type) => {
            return `-type:"${type}"`;
        });
        typeKeywordFilter = categories.downloadableTypeKeywords.map((type) => {
            return `-typekeywords:"${type}"`;
        });
    }
    return `(${downloadFilter.concat(typeKeywordFilter).join(" OR ")})`;
}

function hasApiFilter(queryFilters) {
    const hasApiTrue = (getProp(queryFilters, "hasApi.terms") || [])[0];
    let apiFilter;
    if (hasApiTrue) {
        apiFilter = categories.apiTypes
            .map((type) => {
            return `type:"${type}"`;
        })
            .join(" OR ");
    }
    else {
        apiFilter = categories.apiTypes
            .map((type) => {
            return `-type:"${type}"`;
        })
            .join(" OR ");
    }
    return `(${apiFilter})`;
}

// builds the groupIds filter
function groupIds(queryFilters) {
    const groups = getProp(queryFilters, "groupIds.terms") || [];
    const groupsFilter = groups
        .map((id) => {
        return `group:"${id}"`;
    })
        .join(" OR ");
    return `(${groupsFilter})`;
}

function collectionFilter(queryFilters) {
    const categories = getProp(queryFilters, "collection.terms") || [];
    const typesArr = categories.map((c) => getTypes(c));
    // flatten typesArr
    const filter = typesArr
        .filter((types) => !!types)
        .reduce((singleArr, types) => {
        types.forEach(type => {
            singleArr.push(`type:"${type}"`);
        });
        return singleArr;
    }, [])
        .join(" OR ");
    return `(${filter})`;
}

// custom filter functions
const customFilters = {
    downloadable: downloadableFilter,
    hasApi: hasApiFilter,
    groupIds,
    collection: collectionFilter
};
function isCustomFilter(filter) {
    return !!customFilters[filter];
}
/**
 * Convert filter object into AGO filter string
 * @param queryFilters filter object created by create-filters like { tags: { fn: 'all', terms: ['a'] } }
 */
function handleFilter(queryFilters) {
    const catalogDefinition = [];
    const otherFilters = [];
    Object.keys(queryFilters).forEach(key => {
        let clause;
        if (isCustomFilter(key)) {
            clause = customFilters[key](queryFilters, key);
        }
        else {
            clause = buildFilter(queryFilters, key);
        }
        if (queryFilters[key].catalogDefinition) {
            catalogDefinition.push(clause);
        }
        else {
            otherFilters.push(clause);
        }
    });
    if (catalogDefinition.length) {
        const catalogClause = `(${catalogDefinition.join(" OR ")})`;
        if (otherFilters.length) {
            return `${catalogClause} AND (${otherFilters.join(" AND ")})`;
        }
        else {
            return catalogClause;
        }
    }
    else if (otherFilters.length) {
        return otherFilters.join(" AND ");
    }
    else {
        return "";
    }
}

/**
 * Url-encoding of search params. This function is generic enough to encode a deeply nested object
 * ```
 * Example:
 * Input: { a: { b: 2 }, c: 3 }
 * Output: 'a[b]=2&c=3'
 * ```
 * @param {Any} params (query params from hub indexer)
 * @returns {String}
 */
function encodeParams(params = {}) {
    // get raw paths
    const paths = getPaths(params);
    const flatPaths = paths.filter(path => {
        return typeof getProp(params, path.join(".")) !== "object";
    });
    const parts = [];
    // for each nested path, we want to surround it with `[]`
    // i.e. if a path is like ['a', 'b'], we want encoding as 'a[b]=2' given the input object { a: { b: 2 }, c: 3 }
    flatPaths.forEach(path => {
        let str = "";
        for (let i = 0; i < path.length; i++) {
            if (i === 0) {
                str += path[i];
            }
            else {
                str += `[${path[i]}]`;
            }
        }
        const right = encodeURIComponent(getProp(params, path.join(".")) || "");
        const left = encodeURIComponent(str);
        if (right) {
            parts.push(`${left}=${right}`);
        }
        return str;
    });
    const serialized = parts.join("&");
    return serialized;
}
/**
 * Get all paths to properties of an object as an array of arrays
 * where each array is a path to a property in the nested object
 * ```
 * Example:
 * Input: { a: { b: 2 }, c: 3 }
 * Output: [['a'], ['a', 'b'], ['c']]
 * ```
 * @param {Any} root the input object
 * @returns {String}
 */
function getPaths(root = {}) {
    const paths = [];
    const nodes = [
        {
            obj: root,
            path: []
        }
    ];
    while (nodes.length > 0) {
        const n = nodes.pop();
        Object.keys(n.obj).forEach(k => {
            if (typeof n.obj[k] === "object") {
                const path = n.path.concat(k);
                paths.push(path);
                nodes.unshift({
                    obj: n.obj[k],
                    path
                });
            }
            else {
                paths.push(n.path.concat(k));
            }
        });
    }
    return paths;
}

/**
 * Construct a query object with filters, and queryParams sent by hub indexer
 * @param queryObject any
 */
function encodeAgoQuery(queryParams = {}) {
    const query = {
        q: null,
        start: getProp(queryParams, "page.start") || 1,
        num: getProp(queryParams, "page.size") || 10
    };
    // start with 'implicit' query filters
    let queryParts = ['-type:"code attachment"'];
    if (queryParams.restricted) {
        queryParts.push("-access:public");
    }
    // Build the potentially enourmous 'q' parameter. In future use SearchQueryBuilder from arcgis-rest-js
    if (queryParams.q) {
        queryParts.push(queryParams.q);
    }
    if (queryParams.catalog) {
        const filter = createFilters(queryParams.catalog);
        queryParts.push(handleFilter(filter));
    }
    const implicitFilters = createFilters(queryParams);
    // queryParams filter is an obj with key<string>: value<string> where value is serialized as 'all(a,b)'
    // so parse each filter string into fn and terms
    const explicitFilters = createFilters(queryParams.filter);
    const filters = Object.assign(Object.assign({}, implicitFilters), explicitFilters);
    if (Object.keys(filters).length) {
        // add each parsed filter object into ago query
        queryParts.push(handleFilter(filters));
    }
    // cleanse queryParts by removing blank strings
    queryParts = queryParts.filter(qp => !!qp);
    query.q = queryParts.join(" AND ");
    if (queryParams.bbox) {
        query.bbox = queryParams.bbox;
    }
    if (queryParams.sort) {
        const sortOrder = queryParams.sort[0] === "-" ? "desc" : "asc";
        // AGO supports sorting on only 1 field at a time
        let sortField = sortOrder === "desc"
            ? queryParams.sort.substring(1).split(",")[0]
            : queryParams.sort.split(",")[0];
        sortField = getSortField(sortField);
        if (sortField) {
            query.sortField = sortField;
            query.sortOrder = sortOrder;
        }
    }
    if (queryParams.agg && queryParams.agg.fields) {
        // fields may be passed as array of fields, rather than comma-separated string
        // if so join fields to string, else leave as is
        let fields;
        if (Array.isArray(queryParams.agg.fields)) {
            fields = queryParams.agg.fields.join(",");
        }
        else {
            fields = queryParams.agg.fields;
        }
        const { countFields, countSize } = createAggs(fields);
        query.countFields = countFields;
        query.countSize = countSize;
    }
    return query;
}

const MAX_COUNTFIELDS = 3;
// Search for Items in ArcGIS and return raw ago response
async function getItems(params, token, portal, authentication) {
    const agoParams = encodeAgoQuery(params);
    if (agoParams.countFields) {
        const chunkedCountFields = chunkArray(agoParams.countFields.split(","), MAX_COUNTFIELDS).map((fieldArrayChunk) => fieldArrayChunk.join(","));
        const promises = chunkedCountFields.map((chunk) => {
            return searchItems(Object.assign(Object.assign({}, agoParams), { params: {
                    token,
                    countFields: chunk,
                    countSize: agoParams.countSize,
                }, portal,
                authentication, httpMethod: "POST" }));
        });
        const responses = await Promise.all(promises);
        let allCounts = [];
        for (const response of responses) {
            const counts = getProp(response, "aggregations.counts") || [];
            allCounts = allCounts.concat(counts);
        }
        responses[0].aggregations = {
            counts: allCounts,
        };
        return responses[0];
    }
    else {
        return searchItems(Object.assign(Object.assign({}, agoParams), { params: {
                token,
                countFields: agoParams.countFields,
                countSize: agoParams.countSize,
            }, portal, httpMethod: "POST", authentication }));
    }
}

// these custom aggs are based on a field that are not supported by AGO aggregations
const customAggsNotSupportedByAgo = ["downloadable"];
// these custom aggs are based on a field that are supported by AGO aggregations
const customAggsSupportedByAgo = ["hasApi", "collection"];
const customAggsFunctions = {
    downloadable: downloadableAgg,
    hasApi: hasApiAgg,
    collection: collectionAgg
};
/**
 * Calculate item facets based on ago aggregations and/or compute custom aggregations not supported by AGO
 *
 * @param {any} agoAggregations aggregations from AGO
 * @param {ISearchParams} params search params
 * @param {String} token AGO token to make a search if calculating custom aggs like downloadable
 * @param {String} portal AGO portal against which search is being done
 * @param {UserSession} authentication UserSession object
 * @returns {Promise<any>}
 */
async function computeItemsFacets(agoAggregations = { counts: Array() }, // aggregations from ago search that ago supports by default
params, // query params are needed to another search for custom facets
token, portal, authentication) {
    const aggFields = getProp(params, "agg.fields");
    const aggs = aggFields ? aggFields.split(",") : [];
    // 1. For custom aggregations like downloadable, which AGO does not support,
    // we need to fetch 100 results and calc aggs on them
    let customAggs = intersection(aggs, customAggsNotSupportedByAgo);
    let facets1 = {};
    if (customAggs.length > 0) {
        const paramsCopy = Object.assign(Object.assign({}, params), { start: 1, num: 100 });
        paramsCopy.agg = {};
        const response = await getItems(paramsCopy, token, portal, authentication);
        customAggs.forEach(customAgg => {
            const rawCounts = customAggsFunctions[customAgg](response);
            facets1 = Object.assign(Object.assign({}, facets1), format(rawCounts));
        });
    }
    // 2. for agoAggregations already provided which are sorted, just format them into v3 style
    const facets2 = agoAggregations.counts.reduce((formattedAggs, agg) => {
        formattedAggs[agg.fieldName] = agg.fieldValues.map((fieldVal) => {
            return {
                key: fieldVal.value,
                docCount: fieldVal.count
            };
        });
        return formattedAggs;
    }, {});
    // 3. for custom aggs that are based on some field included in ago aggs
    customAggs = intersection(aggs, customAggsSupportedByAgo);
    let facets3 = {};
    if (customAggs.length > 0) {
        customAggs.forEach(customAgg => {
            const rawCounts = Object.assign({}, customAggsFunctions[customAgg](agoAggregations));
            facets3 = Object.assign(Object.assign({}, facets3), format(rawCounts));
        });
    }
    const computedFacets = Object.assign(Object.assign(Object.assign({}, facets1), facets2), facets3);
    // 4. format categories facet
    if (computedFacets.categories) {
        computedFacets.categories = flattenCategories(computedFacets.categories);
    }
    return computedFacets;
}
function intersection(arr1, arr2) {
    return arr1.filter(val => arr2.indexOf(val) !== -1);
}

function calcHighlights(input, query, property) {
    // 1. identify all the matches case insensitively
    // 2. Replace the original match(es) with mark tags
    // We want to match case insensitively but highlight case sensitively the original term
    // E.g. input string: `Capital bike share... blah blah capital.... CAPITAL`
    // We would like to highlight: `Capital`, `capital`, `CAPITAL`
    if (!input)
        return undefined;
    try {
        const matches = input.match(new RegExp(query, "ig")); // search globally and case insensitively
        if (!matches)
            return undefined;
        return matches.reduce(injectHighlightMarkdown(property), input);
    }
    catch (err) {
        // the most likely error is that the RegExp could not be compiled, eg: query=*
        // this is not catastrophic failure
        return undefined;
    }
}
function injectHighlightMarkdown(property) {
    return (highlights, match) => {
        // match is what appears as is in the input string
        const replacement = `<mark class="hub-search-highlight ${property}-highlight">${match}</mark>`;
        // replace the case sensitive match with mark tags
        return highlights.replace(new RegExp(match, "g"), replacement);
    };
}

// helper functions to make items look more like datasets
function formatItem(item, query) {
    const formattedItem = {
        id: item.id,
        type: "item",
        attributes: formatItemAttributes(item)
    };
    if (query) {
        // create highlights since AGO does not return them
        formattedItem.meta = {};
        formattedItem.meta.highlights = highlights(item, query);
    }
    return formattedItem;
}
function formatItemAttributes(item) {
    const hubType = getCategory(item.type);
    const additionalAttrs = {
        // computed or null attributes so items & datasets look the same
        name: item.title,
        searchDescription: item.description,
        hubType: hubType || "Other",
        collection: getTypeCategories(item),
        extent: formatExtent(item.extent)
    };
    return Object.assign(Object.assign({}, item), additionalAttrs);
}
function formatExtent(extent) {
    return {
        coordinates: extent,
        type: "envelope"
    };
}
function highlights(item, query) {
    // calculate highlights based on AGO restricted item, hence use description field but return as `searchDescription`
    // because the search-result/component expects searchDescription
    return {
        name: calcHighlights(item.title, query, "name"),
        searchDescription: calcHighlights(item.description, query, "description")
    };
}

// This function is responsible for formatting results from the AGO API into the JSONAPI collection format
function agoFormatItemCollection(searchResults, facets = {}, params) {
    const queryParams = Object.assign({}, params);
    return {
        data: searchResults.results.map(result => {
            return formatItem(result, queryParams.q);
        }),
        meta: {
            query: searchResults.query,
            queryParameters: queryParams,
            stats: {
                aggs: facets,
                count: searchResults.results.length,
                totalCount: searchResults.total
            },
            page: {
                start: searchResults.start,
                size: searchResults.num,
                nextStart: searchResults.nextStart
            }
        }
    };
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * Search for Items in ArcGIS, compute facets and format the response into V3 like datasets
 *
 * @export
 * @param {ISearchParams} params (query params from hub indexer)
 * @param {UserSession} authentication
 * @returns {Promise<ISearchResult>}
 */
async function agoSearch(params, token, portal, authentication) {
    const agoResponse = await getItems(params, token, portal, authentication);
    const facets = await computeItemsFacets(agoResponse.aggregations, params, token, portal);
    const model = agoFormatItemCollection(agoResponse, facets, params);
    return model;
}

/**
 * ```
 * serialize raw query parameters into hub specific URI encoding
 * Example:
 * Input: { q: 'crime', tags: 'a,b,c', sort: 'name' }
 * Output: 'q=crime&tags=all(a,b,c)&sort=name'
 * ```
 * @export
 * @param {ISearchParams} searchParams
 * @returns {string}
 */
function serialize(searchParams) {
    // 1. handle filterable params like tags, source, hasApi, groupIds since they follow custom logic
    const filters = createFilters(searchParams);
    const encodedFilters = encodeFilters(filters);
    // 2. handle non-filters like q, sort etc which have <string: string> type and also nested types like page, agg.
    // extract non-filterable fields from search params
    const nonFilterKeys = Object.keys(searchParams).filter(param => !isFilterable(param));
    const nonFilterSearchParams = {};
    nonFilterKeys.forEach(key => {
        nonFilterSearchParams[key] = searchParams[key];
    });
    const encodedNonFilters = encodeParams(nonFilterSearchParams);
    const parts = [];
    // don't include blank strings in the URI encoding
    if (encodedNonFilters)
        parts.push(encodedNonFilters);
    if (encodedFilters)
        parts.push(encodedFilters);
    return parts.join("&");
}
function isFilterable(field) {
    return filterSchema[field] && filterSchema[field].type === "filter";
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

/**
 * k-way merge implementation that merges (and potentially sorts) k individually sorted arrays
 * based on the k-way merge algorithm (https://en.wikipedia.org/wiki/K-way_merge_algorithm)
 *
 * If a comparator function used to compare data is provided, a k-way merge sort is performed using
 * a Binary Heap implementation. Otherwise data from each input array is merged incrementally
 *
 * The returned object contains merged (and potentially sorted) data, as well as key-value
 * pairs that represent the index of a result set in the "data" parameter (the key) tied to how
 * many results (the value) of that result set were added to the final merged data array.
 * For example, if "data" represents an array of two result sets, with 3 and 5 results added to the final
 * result set, respectively, the returned object would be { data: [...], "0": 3, "1": 5 }
 *
 * @param data An array of result sets, each an array of type T
 * @param resultLimit the maximum number of merged results to return, defaults to 10
 * @param cmptr comparator function that takes in two instances of type T and returns a negative number if a is less than b, a positive if a is greater than b, 0 if equal
 * @param direction specifies whether data should be ordered ascending or descending
 * @returns list of results and key-value pairs indicating how many from each were added to returned data
 */
function kMerge(data, resultLimit = 10, cmptr, direction) {
    const results = cmptr
        ? kMergeSort(data, cmptr, direction, resultLimit)
        : kMergeDefault(data, resultLimit);
    // Zero-fill any result set that did not have any results added to final
    for (let i = 0; i < data.length; i++) {
        if (!results[i.toString()]) {
            results[i.toString()] = 0;
        }
    }
    return results;
}
function kMergeDefault(data, resultLimit) {
    const results = {
        data: []
    };
    let totalDataRemaining = _getRemainingResults(data);
    while (!_hasReachedLimit(results.data.length, resultLimit) &&
        totalDataRemaining > 0) {
        const dataToAdd = [];
        data.forEach((dataArr, index) => {
            if (dataArr.length > 0 &&
                _canDataBeAdded(dataToAdd, results.data, resultLimit)) {
                results[index.toString()] = results[index.toString()]
                    ? results[index.toString()] + 1
                    : 1;
                dataToAdd.push(dataArr.splice(0, 1)[0]);
            }
        });
        results.data.push(...dataToAdd);
        totalDataRemaining = _getRemainingResults(data);
    }
    return results;
}
function kMergeSort(data, cmptr, direction, resultLimit) {
    const nodes = data.map((datum, index) => ({ data: datum, label: index.toString() }));
    const heap = new BinaryHeap(nodes, cmptr, direction);
    const results = {
        data: []
    };
    while (results.data.length < resultLimit && heap.length() > 0) {
        const node = heap.remove();
        if (node.data.length > 0) {
            results[node.label] = results[node.label] ? results[node.label] + 1 : 1;
            results.data.push(node.data.splice(0, 1)[0]);
            heap.insert(node);
        }
    }
    return results;
}
function _getRemainingResults(data) {
    return data.reduce((length, arr) => {
        return length + arr.length;
    }, 0);
}
function _hasReachedLimit(results, resultLimit) {
    return results - resultLimit >= 0;
}
function _canDataBeAdded(dataToAdd, resultsAdded, resultLimit) {
    return resultsAdded.length + dataToAdd.length < resultLimit;
}
/**
 * Binary Heap Implementation that implements the 'insert' and 'remove' methods
 * of the IBinaryHeap interface. Example use is for k-way merge sorting of k sorted arrays.
 * Performance is O(n log n) for initialization (could be further optimized), O(log n) for insertion and O(log n) for deletion
 *
 * @param nodes An array of INode objects of type T. If undefined or null are explicitly provided it defaults to empty array
 * @param cmptr comparator function that takes in two instances of type T and returns a number to determine sorting order
 * @param direction A HeapDirection that determines if heap should be min ("ASC") or max ("DESC") implementation
 */
class BinaryHeap {
    constructor(nodes, cmptr, direction = "ASC") {
        this._validate({ cmptr, direction });
        this._comparator = cmptr;
        this._direction = direction;
        this._initialize(nodes);
    }
    /**
     * Inserts node into binary heap
     * @param node
     */
    insert(node) {
        if (!this._hasData(node)) {
            return;
        }
        this._nodes.push(node);
        let currIndex = this.length() - 1;
        let parentIndex = this._getParentIndex(currIndex);
        while (this._shouldSwap(parentIndex, currIndex)) {
            this._swap(parentIndex, currIndex);
            currIndex = parentIndex;
            parentIndex = this._getParentIndex(currIndex);
        }
    }
    /**
     * Removes either the minimum or the maximum node, depending on heap implementation
     * @returns the min/max node or null if heap is empty.
     */
    remove() {
        if (this.length() === 0)
            return null;
        this._swap(0, this.length() - 1);
        const node = this._nodes.pop();
        this._siftDown(0);
        return node;
    }
    /**
     * Returns number of nodes in heap
     * @returns number of nodes
     */
    length() {
        return this._nodes.length;
    }
    /**
     * Returns a readonly version of the heap as an array
     * @returns Readonly array representation of the heap
     */
    heap() {
        return this._nodes;
    }
    _initialize(nodes) {
        this._nodes = [];
        if (!nodes || nodes.length === 0) {
            return;
        }
        for (const node of nodes) {
            this.insert(node);
        }
    }
    _siftDown(index) {
        let [childOne, childTwo] = this._getChildIndices(index);
        let childIndexToSwap = this._shouldSwap(childOne, childTwo)
            ? childTwo
            : childOne;
        while (!this._isInvalidIndex(childIndexToSwap) &&
            this._shouldSwap(index, childIndexToSwap)) {
            this._swap(index, childIndexToSwap);
            index = childIndexToSwap;
            [childOne, childTwo] = this._getChildIndices(index);
            childIndexToSwap = this._shouldSwap(childOne, childTwo)
                ? childTwo
                : childOne;
        }
    }
    _getParentIndex(index) {
        return Math.trunc((index - 1) / 2);
    }
    _getChildIndices(index) {
        return [index * 2 + 1, index * 2 + 2];
    }
    _shouldSwap(lowerIndex, higherIndex) {
        if (this._isInvalidIndex(lowerIndex) || this._isInvalidIndex(higherIndex)) {
            return false;
        }
        return ((this._greaterThan(lowerIndex, higherIndex) &&
            this._direction === "ASC") ||
            (this._lessThan(lowerIndex, higherIndex) && this._direction === "DESC"));
    }
    _isInvalidIndex(index) {
        return index < 0 || index >= this.length();
    }
    _lessThan(lowerIndex, higherIndex) {
        return (this._comparator(this._nodes[lowerIndex].data, this._nodes[higherIndex].data) < 0);
    }
    _greaterThan(lowerIndex, higherIndex) {
        return (this._comparator(this._nodes[lowerIndex].data, this._nodes[higherIndex].data) > 0);
    }
    _hasData(node) {
        return node && node.data !== undefined && node.data !== null;
    }
    _swap(one, two) {
        if (one === two)
            return;
        const oneCopy = this._nodes[one];
        this._nodes[one] = this._nodes[two];
        this._nodes[two] = oneCopy;
    }
    _validate(args) {
        if (!args.cmptr) {
            throw new Error("Comparator function must be defined");
        }
        if (!args.direction) {
            throw new Error("Provided heap direction is invalid");
        }
    }
}

/**
 * The default merge function for merging aggregations. Simply sums the aggregations
 * @param valueOne the value of one aggregatiom
 * @param valueTwo the value of the second aggregation
 * @returns the sum of the two values
 */
const sumAggregations = (valueOne, valueTwo) => {
    return valueOne + valueTwo;
};
/**
 * Function to merge multiple aggregations results from different result sets. Explicitly assumed
 * that sets can contain overlapping aggregations that should be merged. Also explicitly assumed
 * that they can contain aggregation values that are undefined or null (0 is valid),
 * and/or contain entire aggregation result sets that are empty or falsey
 *
 * @param aggs a list of aggregation result sets from different requests/sources
 * @param mergeFunction a merge function used to merge aggregation values across result sets
 * @returns a list of merged aggregations
 */
function mergeAggregations(aggs = [], mergeFunction = sumAggregations) {
    if (!Array.isArray(aggs) || aggs.length === 0) {
        return [];
    }
    const aggResultMapList = aggs.map((aggResultList) => _combineAggResultsToMap(aggResultList));
    const mergedMap = _createMergedMap(aggResultMapList, mergeFunction);
    return _convertMapToResult(mergedMap);
}
function _combineAggResultsToMap(aggResultList) {
    return aggResultList.reduce((aggResultMap, aggResult) => {
        const aggMap = _createAggMap(aggResult);
        if (Object.keys(aggMap).length > 0) {
            const lowercasedFieldName = aggResult.fieldName.toLowerCase();
            aggResultMap[lowercasedFieldName] = aggMap;
        }
        return aggResultMap;
    }, {});
}
function _createAggMap(aggResult) {
    const aggregations = aggResult.aggregations || [];
    return aggregations.reduce((map, agg) => {
        if (agg.value !== undefined && agg.value !== null) {
            const lowercasedLabel = agg.label.toLowerCase();
            map[lowercasedLabel] = agg.value;
        }
        return map;
    }, {});
}
function _createMergedMap(aggResultMapList, mergeFunction) {
    return aggResultMapList.reduce((mergedMap, map) => {
        Object.keys(map).forEach((fieldName) => {
            if (!mergedMap[fieldName]) {
                mergedMap[fieldName] = map[fieldName];
            }
            else {
                mergedMap[fieldName] = _mergeMaps(mergedMap[fieldName], map[fieldName], mergeFunction);
            }
        });
        return mergedMap;
    }, {});
}
function _mergeMaps(existingMap, newMap, mergeFunction) {
    const mergedMap = Object.assign(existingMap);
    Object.keys(newMap).forEach((label) => {
        if (!mergedMap[label]) {
            mergedMap[label] = newMap[label];
        }
        else {
            mergedMap[label] = mergeFunction(existingMap[label], newMap[label]);
        }
    });
    return mergedMap;
}
function _convertMapToResult(mergedMap) {
    return Object.keys(mergedMap).map(fieldName => {
        const aggregations = Object.keys(mergedMap[fieldName]).map((name) => {
            return {
                label: name,
                value: mergedMap[fieldName][name]
            };
        });
        return {
            fieldName,
            aggregations
        };
    });
}

class InvalidPaginationInputError extends Error {
    constructor(message, input) {
        super(message);
        this.input = input;
    }
}

/**
 * When multiple data sources underly a paginated search, the search implementation should be able to
 * search at the appropriate starting point for each source for a given paged set of results. This
 * function merges an array of page states for each source, denoted by their label, into a base64-
 * encoded cursor string that the implementation can use for the next set of results.
 *
 * @param pages an array of page states denoted by their label and the starting point for the next page
 * @returns a base64-encoded cursor string to use when obtaining next page of results.
 *
 */
function mergePages(pages) {
    if (!pages || !Array.isArray(pages)) {
        throw new InvalidPaginationInputError(`Invalid Input Error. Must be array of IDataPageNextStart, received: ${typeof pages}`, pages);
    }
    const mergedPages = pages.reduce((pageObj, page) => {
        pageObj[page.label] = page.nextPageStart || 1;
        return pageObj;
    }, {});
    return abab.btoa(JSON.stringify(mergedPages));
}

/**
 * Defines an enum SortDirection
 */
var SortDirection;
(function (SortDirection) {
    SortDirection["asc"] = "asc";
    SortDirection["desc"] = "desc";
})(SortDirection || (SortDirection = {}));

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

export { SortDirection as S };
