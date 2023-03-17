import { r as registerInstance, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { f as getItem, h as getItemData } from './index-bed14788.js';
import { _ as __assign, r as request, b as appendCustomParams, c as cleanUrl } from './index-5c68fb28.js';

// Helper utilities for working with Hub
/**
 * Lookup domain record by URL
 *
 * Example response:
 * {
 * "id": "12502",
 * "domain": "data-tog.opendata.arcgis.com",
 * "hostname": "data-tog.opendata.arcgis.com",
 * "siteId": "f4c43cd9741e43c7b078a37b757392e0",
 * "clientKey": "qoKo06zr4kAtu0J2",
 * "orgKey": "TOG",
 * "siteTitle": "Gilbert, Arizona Open Data Portal",
 * "orgId": "JLuzSHjNrLL4Okwb",
 * "orgTitle": "Gilbert, Arizona",
 * "createdAt": "2017-09-21T15:22:55Z",
 * "updatedAt": "2019-10-11T00:01:22Z",
 * "sslOnly": true,
 * "permanentRedirect": false
 * }
 * @param domain Site custom or subdomain, e.g. "opendata.dc.gov"
 * @returns Object with domain record details
 */
async function getDomainDetails(domain) {
  const domainUrl = `https://opendata.arcgis.com/utilities/domains/${domain}`;
  return new Promise((resolve, reject) => {
    fetch(domainUrl).then((response) => {
      resolve(response.json());
    }).catch(reject);
  });
}
/**
 * Fetch a Site item and data model.
 * @param domain Site custom or subdomain, e.g. "opendata.dc.gov"
 * @returns
 */
async function getSite(domain) {
  const domainDetails = await getDomainDetails(domain);
  const [siteItem, siteData] = [
    await getItem(domainDetails.siteId),
    await getItemData(domainDetails.siteId)
  ];
  const site = { item: siteItem, data: siteData };
  return site;
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
// https always
var ARCGIS_ONLINE_GEOCODING_URL = "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/";
var ARCGIS_ONLINE_BULK_GEOCODING_URL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/";
/**
 * Used to fetch metadata from a geocoding service.
 *
 * ```js
 * import { getGeocoderServiceInfo } from '@esri/arcgis-rest-geocoding';
 *
 * getGeocoderServiceInfo()
 *   .then((response) => {
 *     response.serviceDescription; // => 'World Geocoder'
 *   });
 * ```
 *
 * @param requestOptions - Request options can contain a custom geocoding service to fetch metadata from.
 * @returns A Promise that will resolve with the data from the response.
 */
function getGeocodeService(requestOptions) {
    var url = (requestOptions && requestOptions.endpoint) || ARCGIS_ONLINE_GEOCODING_URL;
    var options = __assign({ httpMethod: "GET", maxUrlLength: 2000 }, requestOptions);
    return request(url, options);
}

/* @preserve
* @terraformer/arcgis - v2.0.7 - MIT
* Copyright (c) 2012-2021 Environmental Systems Research Institute, Inc.
* Thu Jul 22 2021 13:58:30 GMT-0700 (Pacific Daylight Time)
*/
/* Copyright (c) 2012-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

var edgeIntersectsEdge = function edgeIntersectsEdge(a1, a2, b1, b2) {
  var uaT = (b2[0] - b1[0]) * (a1[1] - b1[1]) - (b2[1] - b1[1]) * (a1[0] - b1[0]);
  var ubT = (a2[0] - a1[0]) * (a1[1] - b1[1]) - (a2[1] - a1[1]) * (a1[0] - b1[0]);
  var uB = (b2[1] - b1[1]) * (a2[0] - a1[0]) - (b2[0] - b1[0]) * (a2[1] - a1[1]);

  if (uB !== 0) {
    var ua = uaT / uB;
    var ub = ubT / uB;

    if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
      return true;
    }
  }

  return false;
};
var coordinatesContainPoint = function coordinatesContainPoint(coordinates, point) {
  var contains = false;

  for (var i = -1, l = coordinates.length, j = l - 1; ++i < l; j = i) {
    if ((coordinates[i][1] <= point[1] && point[1] < coordinates[j][1] || coordinates[j][1] <= point[1] && point[1] < coordinates[i][1]) && point[0] < (coordinates[j][0] - coordinates[i][0]) * (point[1] - coordinates[i][1]) / (coordinates[j][1] - coordinates[i][1]) + coordinates[i][0]) {
      contains = !contains;
    }
  }

  return contains;
};
var pointsEqual = function pointsEqual(a, b) {
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
};
var arrayIntersectsArray = function arrayIntersectsArray(a, b) {
  for (var i = 0; i < a.length - 1; i++) {
    for (var j = 0; j < b.length - 1; j++) {
      if (edgeIntersectsEdge(a[i], a[i + 1], b[j], b[j + 1])) {
        return true;
      }
    }
  }

  return false;
};

/* Copyright (c) 2012-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

var closeRing = function closeRing(coordinates) {
  if (!pointsEqual(coordinates[0], coordinates[coordinates.length - 1])) {
    coordinates.push(coordinates[0]);
  }

  return coordinates;
}; // determine if polygon ring coordinates are clockwise. clockwise signifies outer ring, counter-clockwise an inner ring
// or hole. this logic was found at http://stackoverflow.com/questions/1165647/how-to-determine-if-a-list-of-polygon-
// points-are-in-clockwise-order

var ringIsClockwise = function ringIsClockwise(ringToTest) {
  var total = 0;
  var i = 0;
  var rLength = ringToTest.length;
  var pt1 = ringToTest[i];
  var pt2;

  for (i; i < rLength - 1; i++) {
    pt2 = ringToTest[i + 1];
    total += (pt2[0] - pt1[0]) * (pt2[1] + pt1[1]);
    pt1 = pt2;
  }

  return total >= 0;
}; // This function ensures that rings are oriented in the right directions
// from http://jsperf.com/cloning-an-object/2

var shallowClone = function shallowClone(obj) {
  var target = {};

  for (var i in obj) {
    // both arcgis attributes and geojson props are just hardcoded keys
    if (obj.hasOwnProperty(i)) {
      // eslint-disable-line no-prototype-builtins
      target[i] = obj[i];
    }
  }

  return target;
};

/* Copyright (c) 2012-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

var coordinatesContainCoordinates = function coordinatesContainCoordinates(outer, inner) {
  var intersects = arrayIntersectsArray(outer, inner);
  var contains = coordinatesContainPoint(outer, inner[0]);

  if (!intersects && contains) {
    return true;
  }

  return false;
}; // do any polygons in this array contain any other polygons in this array?
// used for checking for holes in arcgis rings


var convertRingsToGeoJSON = function convertRingsToGeoJSON(rings) {
  var outerRings = [];
  var holes = [];
  var x; // iterator

  var outerRing; // current outer ring being evaluated

  var hole; // current hole being evaluated
  // for each ring

  for (var r = 0; r < rings.length; r++) {
    var ring = closeRing(rings[r].slice(0));

    if (ring.length < 4) {
      continue;
    } // is this ring an outer ring? is it clockwise?


    if (ringIsClockwise(ring)) {
      var polygon = [ring.slice().reverse()]; // wind outer rings counterclockwise for RFC 7946 compliance

      outerRings.push(polygon); // push to outer rings
    } else {
      holes.push(ring.slice().reverse()); // wind inner rings clockwise for RFC 7946 compliance
    }
  }

  var uncontainedHoles = []; // while there are holes left...

  while (holes.length) {
    // pop a hole off out stack
    hole = holes.pop(); // loop over all outer rings and see if they contain our hole.

    var contained = false;

    for (x = outerRings.length - 1; x >= 0; x--) {
      outerRing = outerRings[x][0];

      if (coordinatesContainCoordinates(outerRing, hole)) {
        // the hole is contained push it into our polygon
        outerRings[x].push(hole);
        contained = true;
        break;
      }
    } // ring is not contained in any outer ring
    // sometimes this happens https://github.com/Esri/esri-leaflet/issues/320


    if (!contained) {
      uncontainedHoles.push(hole);
    }
  } // if we couldn't match any holes using contains we can try intersects...


  while (uncontainedHoles.length) {
    // pop a hole off out stack
    hole = uncontainedHoles.pop(); // loop over all outer rings and see if any intersect our hole.

    var intersects = false;

    for (x = outerRings.length - 1; x >= 0; x--) {
      outerRing = outerRings[x][0];

      if (arrayIntersectsArray(outerRing, hole)) {
        // the hole is contained push it into our polygon
        outerRings[x].push(hole);
        intersects = true;
        break;
      }
    }

    if (!intersects) {
      outerRings.push([hole.reverse()]);
    }
  }

  if (outerRings.length === 1) {
    return {
      type: 'Polygon',
      coordinates: outerRings[0]
    };
  } else {
    return {
      type: 'MultiPolygon',
      coordinates: outerRings
    };
  }
};

var getId = function getId(attributes, idAttribute) {
  var keys = idAttribute ? [idAttribute, 'OBJECTID', 'FID'] : ['OBJECTID', 'FID'];

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (key in attributes && (typeof attributes[key] === 'string' || typeof attributes[key] === 'number')) {
      return attributes[key];
    }
  }

  throw Error('No valid id attribute found');
};

var arcgisToGeoJSON = function arcgisToGeoJSON(arcgis, idAttribute) {
  var geojson = {};

  if (arcgis.features) {
    geojson.type = 'FeatureCollection';
    geojson.features = [];

    for (var i = 0; i < arcgis.features.length; i++) {
      geojson.features.push(arcgisToGeoJSON(arcgis.features[i], idAttribute));
    }
  }

  if (typeof arcgis.x === 'number' && typeof arcgis.y === 'number') {
    geojson.type = 'Point';
    geojson.coordinates = [arcgis.x, arcgis.y];

    if (typeof arcgis.z === 'number') {
      geojson.coordinates.push(arcgis.z);
    }
  }

  if (arcgis.points) {
    geojson.type = 'MultiPoint';
    geojson.coordinates = arcgis.points.slice(0);
  }

  if (arcgis.paths) {
    if (arcgis.paths.length === 1) {
      geojson.type = 'LineString';
      geojson.coordinates = arcgis.paths[0].slice(0);
    } else {
      geojson.type = 'MultiLineString';
      geojson.coordinates = arcgis.paths.slice(0);
    }
  }

  if (arcgis.rings) {
    geojson = convertRingsToGeoJSON(arcgis.rings.slice(0));
  }

  if (typeof arcgis.xmin === 'number' && typeof arcgis.ymin === 'number' && typeof arcgis.xmax === 'number' && typeof arcgis.ymax === 'number') {
    geojson.type = 'Polygon';
    geojson.coordinates = [[[arcgis.xmax, arcgis.ymax], [arcgis.xmin, arcgis.ymax], [arcgis.xmin, arcgis.ymin], [arcgis.xmax, arcgis.ymin], [arcgis.xmax, arcgis.ymax]]];
  }

  if (arcgis.geometry || arcgis.attributes) {
    geojson.type = 'Feature';
    geojson.geometry = arcgis.geometry ? arcgisToGeoJSON(arcgis.geometry) : null;
    geojson.properties = arcgis.attributes ? shallowClone(arcgis.attributes) : null;

    if (arcgis.attributes) {
      try {
        geojson.id = getId(arcgis.attributes, idAttribute);
      } catch (err) {// don't set an id
      }
    }
  } // if no valid geometry was encountered


  if (JSON.stringify(geojson.geometry) === JSON.stringify({})) {
    geojson.geometry = null;
  }

  if (arcgis.spatialReference && arcgis.spatialReference.wkid && arcgis.spatialReference.wkid !== 4326) {
    console.warn('Object converted in non-standard crs - ' + JSON.stringify(arcgis.spatialReference));
  }

  return geojson;
};

/* Copyright (c) 2012-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
// outer rings are clockwise, holes are counterclockwise
// used for converting GeoJSON Polygons to ArcGIS Polygons

var orientRings = function orientRings(poly) {
  var output = [];
  var polygon = poly.slice(0);
  var outerRing = closeRing(polygon.shift().slice(0));

  if (outerRing.length >= 4) {
    if (!ringIsClockwise(outerRing)) {
      outerRing.reverse();
    }

    output.push(outerRing);

    for (var i = 0; i < polygon.length; i++) {
      var hole = closeRing(polygon[i].slice(0));

      if (hole.length >= 4) {
        if (ringIsClockwise(hole)) {
          hole.reverse();
        }

        output.push(hole);
      }
    }
  }

  return output;
}; // This function flattens holes in multipolygons to one array of polygons
// used for converting GeoJSON Polygons to ArcGIS Polygons


var flattenMultiPolygonRings = function flattenMultiPolygonRings(rings) {
  var output = [];

  for (var i = 0; i < rings.length; i++) {
    var polygon = orientRings(rings[i]);

    for (var x = polygon.length - 1; x >= 0; x--) {
      var ring = polygon[x].slice(0);
      output.push(ring);
    }
  }

  return output;
};

var geojsonToArcGIS = function geojsonToArcGIS(geojson, idAttribute) {
  idAttribute = idAttribute || 'OBJECTID';
  var spatialReference = {
    wkid: 4326
  };
  var result = {};
  var i;

  switch (geojson.type) {
    case 'Point':
      result.x = geojson.coordinates[0];
      result.y = geojson.coordinates[1];

      if (geojson.coordinates[2]) {
        result.z = geojson.coordinates[2];
      }

      result.spatialReference = spatialReference;
      break;

    case 'MultiPoint':
      result.points = geojson.coordinates.slice(0);

      if (geojson.coordinates[0][2]) {
        result.hasZ = true;
      }

      result.spatialReference = spatialReference;
      break;

    case 'LineString':
      result.paths = [geojson.coordinates.slice(0)];

      if (geojson.coordinates[0][2]) {
        result.hasZ = true;
      }

      result.spatialReference = spatialReference;
      break;

    case 'MultiLineString':
      result.paths = geojson.coordinates.slice(0);

      if (geojson.coordinates[0][0][2]) {
        result.hasZ = true;
      }

      result.spatialReference = spatialReference;
      break;

    case 'Polygon':
      result.rings = orientRings(geojson.coordinates.slice(0));

      if (geojson.coordinates[0][0][2]) {
        result.hasZ = true;
      }

      result.spatialReference = spatialReference;
      break;

    case 'MultiPolygon':
      result.rings = flattenMultiPolygonRings(geojson.coordinates.slice(0));

      if (geojson.coordinates[0][0][0][2]) {
        result.hasZ = true;
      }

      result.spatialReference = spatialReference;
      break;

    case 'Feature':
      if (geojson.geometry) {
        result.geometry = geojsonToArcGIS(geojson.geometry, idAttribute);
      }

      result.attributes = geojson.properties ? shallowClone(geojson.properties) : {};

      if (geojson.id) {
        result.attributes[idAttribute] = geojson.id;
      }

      break;

    case 'FeatureCollection':
      result = [];

      for (i = 0; i < geojson.features.length; i++) {
        result.push(geojsonToArcGIS(geojson.features[i], idAttribute));
      }

      break;

    case 'GeometryCollection':
      result = [];

      for (i = 0; i < geojson.geometries.length; i++) {
        result.push(geojsonToArcGIS(geojson.geometries[i], idAttribute));
      }

      break;
  }

  return result;
};

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { geocode } from '@esri/arcgis-rest-geocoding';
 * //
 * geocode("LAX")
 *   .then((response) => {
 *     response.candidates[0].location; // => { x: -118.409, y: 33.943, spatialReference: ...  }
 *   });
 * //
 * geocode({
 *   address: "1600 Pennsylvania Ave",
 *   postal: 20500,
 *   countryCode: "USA"
 * })
 *   .then((response) => {
 *     response.candidates[1].location; // => { x: -77.036533, y: 38.898719, spatialReference: ... }
 *   });
 * ```
 * Used to determine the location of a single address or point of interest. See the [REST Documentation](https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find-address-candidates.htm) for more information.
 * @param address String representing the address or point of interest or RequestOptions to pass to the endpoint.
 * @returns A Promise that will resolve with address candidates for the request. The spatial reference will be added to candidate locations and extents unless `rawResponse: true` was passed.
 */
function geocode(address) {
    var options = {};
    var endpoint;
    if (typeof address === "string") {
        options.params = { singleLine: address };
        endpoint = ARCGIS_ONLINE_GEOCODING_URL;
    }
    else {
        endpoint = address.endpoint || ARCGIS_ONLINE_GEOCODING_URL;
        options = appendCustomParams(address, [
            "singleLine",
            "address",
            "address2",
            "address3",
            "neighborhood",
            "city",
            "subregion",
            "region",
            "postal",
            "postalExt",
            "countryCode",
            "outFields",
            "magicKey"
        ], { params: __assign({}, address.params) });
    }
    // add spatialReference property to individual matches
    return request(cleanUrl(endpoint) + "/findAddressCandidates", options).then(function (response) {
        if (typeof address !== "string" && address.rawResponse) {
            return response;
        }
        var sr = response.spatialReference;
        response.candidates.forEach(function (candidate) {
            candidate.location.spatialReference = sr;
            if (candidate.extent) {
                candidate.extent.spatialReference = sr;
            }
        });
        // geoJson
        if (sr.wkid === 4326) {
            var features = response.candidates.map(function (candidate) {
                return {
                    type: "Feature",
                    geometry: arcgisToGeoJSON(candidate.location),
                    properties: Object.assign({
                        address: candidate.address,
                        score: candidate.score,
                    }, candidate.attributes),
                };
            });
            response.geoJson = {
                type: "FeatureCollection",
                features: features,
            };
        }
        return response;
    });
}

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { suggest } from '@esri/arcgis-rest-geocoding';
 * //
 * suggest("Starb")
 *   .then(response) // response.text === "Starbucks"
 * ```
 * Used to return a placename [suggestion](https://developers.arcgis.com/rest/geocode/api-reference/geocoding-suggest.htm) for a partial string.
 *
 * @param requestOptions - Options for the request including authentication and other optional parameters.
 * @returns A Promise that will resolve with the data from the response.
 */
function suggest(partialText, requestOptions) {
    var options = __assign({ endpoint: ARCGIS_ONLINE_GEOCODING_URL, params: {} }, requestOptions);
    options.params.text = partialText;
    return request(cleanUrl(options.endpoint) + "/suggest", options);
}
const suggest$1 = {
    suggest: suggest
};

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
function isLocationArray(coords) {
    return (coords.length === 2 ||
        coords.length === 3);
}
function isLocation(coords) {
    return (coords.latitude !== undefined ||
        coords.lat !== undefined);
}
/**
 * ```js
 * import { reverseGeocode } from '@esri/arcgis-rest-geocoding';
 * //
 * reverseGeocode([-118.409,33.943 ]) // long, lat
 *   .then((response) => {
 *     response.address.PlaceName; // => "LA Airport"
 *   });
 * // or
 * reverseGeocode({ long: -118.409, lat: 33.943 })
 * reverseGeocode({ latitude: 33.943, latitude: -118.409 })
 * reverseGeocode({ x: -118.409, y: 33.9425 }) // wgs84 is assumed
 * reverseGeocode({ x: -13181226, y: 4021085, spatialReference: { wkid: 3857 })
 * ```
 * Used to determine the address of a [location](https://developers.arcgis.com/rest/geocode/api-reference/geocoding-reverse-geocode.htm).
 *
 * @param coordinates - the location you'd like to associate an address with.
 * @param requestOptions - Additional options for the request including authentication.
 * @returns A Promise that will resolve with the data from the response.
 */
function reverseGeocode(coords, requestOptions) {
    var options = __assign({ endpoint: ARCGIS_ONLINE_GEOCODING_URL, params: {} }, requestOptions);
    if (isLocationArray(coords)) {
        options.params.location = coords.join();
    }
    else if (isLocation(coords)) {
        if (coords.lat) {
            options.params.location = coords.long + "," + coords.lat;
        }
        if (coords.latitude) {
            options.params.location = coords.longitude + "," + coords.latitude;
        }
    }
    else {
        // if input is a point, we can pass it straight through, with or without a spatial reference
        options.params.location = coords;
    }
    return request(cleanUrl(options.endpoint) + "/reverseGeocode", options);
}
const reverse = {
    reverseGeocode: reverseGeocode
};

/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { bulkGeocode } from '@esri/arcgis-rest-geocoding';
 * import { ApplicationSession } from '@esri/arcgis-rest-auth';
 * //
 * const addresses = [
 *   { "OBJECTID": 1, "SingleLine": "380 New York Street 92373" },
 *   { "OBJECTID": 2, "SingleLine": "1 World Way Los Angeles 90045" }
 * ];
 * //
 * bulkGeocode({ addresses, authentication: session })
 *   .then((response) => {
 *     response.locations[0].location; // => { x: -117, y: 34, spatialReference: { wkid: 4326 } }
 *   });
 * ```
 * Used to geocode a [batch](https://developers.arcgis.com/rest/geocode/api-reference/geocoding-geocode-addresses.htm) of addresses.
 *
 * @param requestOptions - Request options to pass to the geocoder, including an array of addresses and authentication session.
 * @returns A Promise that will resolve with the data from the response. The spatial reference will be added to address locations unless `rawResponse: true` was passed.
 */
function bulkGeocode(requestOptions // must POST, which is the default
) {
    var options = __assign({ endpoint: ARCGIS_ONLINE_BULK_GEOCODING_URL, params: {} }, requestOptions);
    options.params.addresses = {
        records: requestOptions.addresses.map(function (address) {
            return { attributes: address };
        })
    };
    // the SAS service does not support anonymous requests
    if (!requestOptions.authentication &&
        options.endpoint === ARCGIS_ONLINE_BULK_GEOCODING_URL) {
        return Promise.reject("bulk geocoding using the ArcGIS service requires authentication");
    }
    return request(cleanUrl(options.endpoint) + "/geocodeAddresses", options).then(function (response) {
        if (options.rawResponse) {
            return response;
        }
        var sr = response.spatialReference;
        response.locations.forEach(function (address) {
            if (address.location) {
                address.location.spatialReference = sr;
            }
        });
        return response;
    });
}

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

// Use the anonymous (no-token) free API because no storage
const ARCGIS_GEOCODE_ANONYMOUS = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/";
async function suggestLocations(address, extent) {
  return new Promise((resolve, reject) => {
    let geocodeOptions = {
      address: address,
    };
    if (extent !== undefined && extent !== null) {
      const searchExtent = [...extent[0], ...extent[1]].join(',');
      geocodeOptions = Object.assign(geocodeOptions, { "params": { searchExtent } });
    }
    suggest(address, geocodeOptions).then((suggestions) => {
      console.debug("suggestLocations", suggestions);
      resolve(suggestions);
    }).catch(reject);
  });
}
async function getLocation(address, extent) {
  console.debug("arcgis-geocoding: getLocation extent", extent);
  let geocodeOptions = {
    address: address,
    endpoint: ARCGIS_GEOCODE_ANONYMOUS,
    outFields: "*"
  };
  if (extent !== undefined && extent !== null) {
    const searchExtent = [...extent[0], ...extent[1]].join(',');
    geocodeOptions = Object.assign(geocodeOptions, { "params": { searchExtent } });
  }
  let response = await geocode(geocodeOptions);
  if (response.candidates.length == 0) {
    throw new Error('No locations found at this address.');
  }
  console.debug("arcgis-geocoding: getLocation", { geocodeOptions: geocodeOptions, response: response });
  // {
  //  address: "101 4th St NE, Washington, District of Columbia, 20002"
  //  attributes: {}
  //  extent: {xmin: -77.00135662250611, ymin: 38.89010092953365, xmax: -76.9993566225061, ymax: 38.89210092953365, spatialReference: {…}}
  //  location: {x: -77.0003566225061, y: 38.89110092953365, spatialReference: {…}}
  //  score: 100
  // }
  return response.candidates[0];
}

const arcgisHubSearchCss = ":host{display:block;height:100%;--header-height:0px}.container{display:grid;grid-template-columns:25rem 1fr;grid-gap:1rem}#sidebar{height:calc(100vh - var(--header-height));padding-bottom:15px;margin-left:1rem}#results{overflow-y:auto;height:80vh;border:1px solid #eee}#map{background-color:black;width:100%}#controls{margin:1rem}arcgis-hub-map{display:block;height:100%}arcgis-hub-search-input{margin-bottom:0.5rem}";

var searchContextType;
(function (searchContextType) {
  searchContextType["Content"] = "content";
  searchContextType["Dataset"] = "dataset";
  searchContextType["Feature"] = "feature";
})(searchContextType || (searchContextType = {}));
const graphicTemplate = {
  symbol: {
    type: "esriSFS",
    style: "esriSFSSolid",
    color: [
      227,
      139,
      79,
      204
    ],
    outline: {
      type: "esriSLS",
      style: "esriSLSSolid",
      color: [
        255,
        255,
        255
      ],
      width: 1
    }
  }
};
const ArcgisHubSearch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.zoom = 2;
    ////////////////////////////////////////////////////////////
    // 
    // Map Geometry Updates
    // 
    ////////////////////////////////////////////////////////////
    /**
     * Should Results update automatically with map move?
     */
    this.mapUpdate = false;
    ////////////////////////////////////////////////////////////
    // 
    // Properties
    // 
    ////////////////////////////////////////////////////////////
    /**
     * Search input
     */
    this.query = "";
    /**
     * Filter results by geometry
     */
    this.mapGeometry = null;
    /**
     * Hub site to use for search
     * TODO: handle full URI with scheme ('https://...')
     */
    this.siteUrl = "";
    ////////////////////////////////////////////////////////////
    // 
    // State
    // 
    ////////////////////////////////////////////////////////////
    this.site = null;
    /**
     * Which search UI is currently displayed
     */
    this.searchContext = searchContextType.Content;
    /**
     * Cached content item
     */
    this.contentItem = null;
    /**
      * Cached selected feature
      */
    this.feature = null;
    ////////////////////////////////////////////////////////////
    // 
    // Variables
    // 
    ////////////////////////////////////////////////////////////
    /**
     * cached feature layer view
     * TODO: remove this from state
     */
    this.featureLayerView = null;
  }
  /**
   * Listen for changes on the search input
   * @param evt
   */
  async handleSearchChange(evt) {
    try {
      const location = await getLocation(evt.detail, this.site.item.extent);
      console.debug(`hub-search: InputChange`, { event: evt.detail, location: location });
      if (location && location.score >= 80) {
        this.feature = {
          attributes: location.attributes,
          geometry: location.location
        };
        // Custom attribute to display feature title
        this.feature['_title'] = location.address;
        // Draw the feature
        this.createGraphics(this.feature, location.extent);
        this.searchContext = searchContextType.Feature;
      }
      else {
        this.query = evt.detail;
      }
    }
    catch (_a) {
      this.query = evt.detail;
    }
  }
  // Map Utils
  async createGraphics(feature = null, extent = null) {
    if (!!extent) {
      if (extent.length) {
        this.extent = this.coordsToExtent(extent);
      }
      else {
        this.extent = extent;
      }
    }
    const graphic = Object.assign({}, graphicTemplate);
    if (!!feature) {
      graphic.geometry = feature.geometry;
    }
    this.graphics = [graphic];
    this.updateMapElProps();
  }
  coordsToExtent(coords) {
    return {
      xmin: (coords[0][0] < -180 ? -180 : coords[0][0]),
      ymin: (coords[0][1] < -85 ? -85 : coords[0][1]),
      xmax: (coords[1][0] > 180 ? 180 : coords[1][0]),
      ymax: (coords[1][1] > 85 ? 85 : coords[1][1]),
      spatialReference: {
        wkid: 4326
      }
    };
  }
  updateMapElProps() {
    console.debug('hub-search: updateMapElProps', [this.mapEl, this.extent, this.graphics]);
    if (this.mapEl) {
      this.mapEl.extent = this.extent;
      this.mapEl.graphics = this.graphics;
      this.mapEl.style.display = 'inline'; // slot default is hidden
    }
  }
  addLayer(layerUrl) {
    console.debug("hub-search: addLayer 0", { flv: this.featureLayerView });
    this.mapModules(['esri/layers/FeatureLayer'])
      .then(([FeatureLayer]) => {
      const featureLayer = new FeatureLayer({
        url: layerUrl
      });
      console.debug("hub-search: addLayer 1", { featureLayer });
      let that = this;
      featureLayer.when(() => {
        this.mapView.whenLayerView(featureLayer).then(function (layerView) {
          console.debug("hub-search: addLayer 2", { lv: layerView, flv: that.featureLayerView });
          that.featureLayerView = layerView;
        });
      });
      this.mapView.map.add(featureLayer);
    });
  }
  /////////////
  // Map Events
  /////////////
  async hubMapLoaded(event) {
    console.debug("hub-search: hubMapLoaded", { site: this.site });
    const { detail: { view, loadModules } } = event;
    this.mapView = view;
    this.mapModules = loadModules;
    const [watchUtils] = await loadModules(['esri/core/watchUtils']);
    watchUtils.watch(view, 'stationary', () => {
      console.log('hub-search: stationary', view.extent);
      if (view.extent) {
        this.mapGeometry = view.extent;
      }
    });
    // Items may not have set an extent
    if (!!this.site && this.site.item.extent.length > 0) {
      this.extent = this.coordsToExtent(this.site.item.extent);
    }
  }
  // @Listen('arcgisHubMapExtentChanged')
  hubMapExtentChanged(event) {
    console.debug('hub-search: hubMapExtentChanged', { extent: event.detail.extent });
    this.mapGeometry = event.detail.extent;
  }
  // Event is empty
  mapUpdateControlChanged(event) {
    this.mapUpdate = event.target.checked;
    console.debug('hub-search: mapUpdateControlChanged', { mapUpdate: this.mapUpdate, event: event });
  }
  extentUpdated() {
    if (this.mapEl) {
      this.mapEl.extent = this.extent;
    }
  }
  ////////////////////////////////////////////////////////////
  // 
  // Lifecycle
  // 
  ////////////////////////////////////////////////////////////
  async componentWillLoad() {
    this.site = await getSite(this.siteUrl);
    console.debug("hub-search: componentWillLoad site", [this.site]);
  }
  // TODO: handle case where contents load before map is ready
  handleContentUpdated(evt) {
    console.debug("hub-search: contentUpdated", evt.detail);
    const layers = evt.detail.slice(0, 3);
    this.previewResults(layers);
  }
  /**
   * loads the first N layers on the map
   */
  previewResults(contentLayers) {
    console.debug("hub-search: previewResults", { layers: contentLayers });
    // First, clear the map
    this.mapEl.removeLayers();
    contentLayers.map((layer) => {
      this.addLayer(layer.url);
    });
  }
  contentSelected(evt) {
    console.debug("hub-search: contentSelected", evt.detail);
    this.contentItem = evt.detail;
    this.searchContext = searchContextType.Dataset;
    this.showDataset(this.contentItem);
  }
  /**
   * Draw Dataset on the map
   * @param contentItem
   */
  showDataset(contentItem) {
    this.createGraphics(null, contentItem.extent);
    // Quick layer hack
    // this.mapEl.addLayer(contentItem.url)
    this.addLayer(contentItem.url);
  }
  featureHighlighted(evt) {
    console.debug("hub-search: featureHighlighted", {});
    // Remove previous highlight
    if (this.highlightedFeature) {
      this.highlightedFeature.remove();
    }
    const highlightFeature = evt.detail;
    this.highlightedFeature = this.featureLayerView.highlight(highlightFeature.attributes["OBJECTID"]);
  }
  async featureSelected(evt) {
    this.feature = evt.detail;
    // this.createGraphics(evt.detail)
    // Find layer by ID involves odd castings...
    const selectedLayer = this.mapEl.map.allLayers.find((layer) => {
      let fl = layer;
      return `${fl.url}/${fl.layerId}` === this.contentItem.url;
    });
    console.debug("hub-search: selectedLayer", { selectedLayer, url: selectedLayer.title });
    let sl = selectedLayer;
    let featureSet = await sl.queryFeatures({
      where: `OBJECTID=${this.feature.attributes['OBJECTID']}`,
      outFields: [],
      returnGeometry: true
    });
    // Josh special code for "zoom to point"
    // if (pointFeaturesCount === 1) {
    //   const pointFeatures = await pointLayer.queryFeatures();
    //   const { x, y, spatialReference } = pointFeatures.features[0].geometry;
    //   const tolerance = 0.005;
    //   pointExtent = new Extent({
    //     xmin: x - tolerance,
    //     ymin: y - tolerance,
    //     xmax: x + tolerance,
    //     ymax: y + tolerance,
    //     spatialReference
    //   });
    // } else {
    //   pointExtent = pointLayer.queryExtent();
    // }
    console.debug("hub-search: queryFeatures", { featureSet });
    this.mapEl.view.goTo({
      target: featureSet.features[0]
    }, {
      duration: 2000,
      easing: "ease-in-out"
    });
    this.searchContext = searchContextType.Feature;
  }
  /**
   * When changing context / state, update shared elements
   * This context is our _end state_
   * TODO: make this a state machine
   * @param newContext
   * @param _oldContext
   */
  searchContextUpdated(newContext, oldContext) {
    switch (newContext) {
      case searchContextType.Content:
        // Currently, remove all layers
        this.mapEl.removeLayers();
        this.contentItem = null;
        break;
      case searchContextType.Dataset:
        // Currently, remove all layers, but add back in this dataset
        if (oldContext == searchContextType.Content) {
          this.mapEl.removeLayers();
        }
        // this.showDataset(this.contentItem);
        break;
      case searchContextType.Feature:
        break;
      default:
    }
  }
  changeContext() {
    console.debug("hub-search: changeContext", this.searchContext);
    // the context is from our _start state_, 
    // now determine our _end state_
    switch (this.searchContext) {
      case searchContextType.Content:
        this.searchContext = searchContextType.Content;
        break;
      case searchContextType.Dataset:
        this.searchContext = searchContextType.Content;
        break;
      case searchContextType.Feature:
        // if we geocode a location, we don't have a content item
        this.searchContext = this.contentItem ? searchContextType.Dataset : searchContextType.Content;
        break;
      default:
        this.searchContext = searchContextType.Content;
    }
  }
  renderResults(context) {
    console.debug("hub-search: renderResults", { mapUpdate: this.mapUpdate, context: context, contentItem: this.contentItem, feature: this.feature });
    let output = [];
    switch (context) {
      case searchContextType.Content:
        const filters = {
          filterType: "content",
          type: { any: ["Feature Layer", "Feature Service", "Map Service", "CSV"] },
          group: { any: this.site.data.catalog.groups }
        };
        output.push(h("arcgis-hub-search-input", { ref: (el) => this.searchInputEl = el, placeholder: "Search by location", text: "Search", value: this.query }));
        output.push(h("calcite-panel", { heading: "Discover Content" }, h("calcite-action", { slot: "header-menu-actions", "text-enabled": "", text: "Subscribe", label: "Add Item", icon: "plus" }), h("arcgis-hub-search-content", { query: this.query, filters: filters, limit: 10 })));
        break;
      case searchContextType.Dataset:
        output.push(h("calcite-panel", { "show-back-button": this.searchContext != searchContextType.Content, heading: "Search", summary: "Explore content" }, h("calcite-action", { slot: "header-menu-actions", "text-enabled": "", text: "Subscribe", label: "Add Item", icon: "plus" }), h("arcgis-hub-search-dataset", { datasetTitle: this.contentItem.title,
          // where={this.query}
          serverUrl: this.contentItem.url, geometry: this.mapUpdate ? this.mapGeometry : null })));
        break;
      case searchContextType.Feature:
        output.push(h("calcite-panel", { "show-back-button": this.searchContext != searchContextType.Content, heading: this.contentItem ? this.contentItem.title : this.feature['_title'], summary: this.contentItem ? "Go back to dataset" : "Go back to search" }, h("arcgis-hub-feature", { feature: this.feature })));
        break;
      default:
        output.push(h("em", null, "No search context"));
    }
    return (output);
  }
  render() {
    return (h(Host, null, h("div", { class: "container" }, h("div", { id: "sidebar" }, h("div", { id: "results" }, this.renderResults(this.searchContext)), h("div", { id: "controls" }, h("calcite-label", { layout: "inline", for: "checked-item" }, h("calcite-checkbox", { ref: (el) => this.mapUpdateControlEl = el, checked: this.mapUpdate ? 'true' : 'false', id: "checked-item", name: "checked-item" }), "Update results when map moves"))), h("div", { id: "map" }, h("arcgis-hub-map", { ref: (el) => this.mapEl = el, graphics: this.graphics, basemap: "dark-gray-vector", center: "-100,28", zoom: this.zoom })))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "extent": ["extentUpdated"],
    "searchContext": ["searchContextUpdated"]
  }; }
};
ArcgisHubSearch.style = arcgisHubSearchCss;

export { ArcgisHubSearch as arcgis_hub_search };
