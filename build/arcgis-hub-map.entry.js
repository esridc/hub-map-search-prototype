import { r as registerInstance, e as createEvent, h, f as Host } from './index-d836c4a8.js';
import { c as createCommonjsModule, a as commonjsGlobal, g as getDefaultExportFromCjs } from './_commonjsHelpers-93ec9c7a.js';

var esriLoader = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	'object' === 'object' && 'object' !== 'undefined' ? factory(exports) :
	typeof undefined === 'function' && undefined.amd ? undefined(['exports'], factory) :
	(factory((global.esriLoader = global.esriLoader || {})));
}(commonjsGlobal, (function (exports) { 'use strict';

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
var isBrowser = typeof window !== 'undefined';
// allow consuming libraries to provide their own Promise implementations
var utils = {
    Promise: isBrowser ? window['Promise'] : undefined
};

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
var DEFAULT_VERSION = '4.21';
var NEXT = 'next';
function parseVersion(version) {
    if (version.toLowerCase() === NEXT) {
        return NEXT;
    }
    var match = version && version.match(/^(\d)\.(\d+)/);
    return match && {
        major: parseInt(match[1], 10),
        minor: parseInt(match[2], 10)
    };
}
/**
 * Get the CDN url for a given version
 *
 * @param version Ex: '4.21' or '3.38'. Defaults to the latest 4.x version.
 */
function getCdnUrl(version) {
    if (version === void 0) { version = DEFAULT_VERSION; }
    return "https://js.arcgis.com/" + version + "/";
}
/**
 * Get the CDN url for a the CSS for a given version and/or theme
 *
 * @param version Ex: '4.21', '3.38', or 'next'. Defaults to the latest 4.x version.
 */
function getCdnCssUrl(version) {
    if (version === void 0) { version = DEFAULT_VERSION; }
    var baseUrl = getCdnUrl(version);
    var parsedVersion = parseVersion(version);
    if (parsedVersion !== NEXT && parsedVersion.major === 3) {
        // NOTE: at 3.11 the CSS moved from the /js folder to the root
        var path = parsedVersion.minor <= 10 ? 'js/' : '';
        return "" + baseUrl + path + "esri/css/esri.css";
    }
    else {
        // assume 4.x
        return baseUrl + "esri/themes/light/main.css";
    }
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
function createStylesheetLink(href) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    return link;
}
function insertLink(link, before) {
    if (before) {
        // the link should be inserted before a specific node
        var beforeNode = document.querySelector(before);
        beforeNode.parentNode.insertBefore(link, beforeNode);
    }
    else {
        // append the link to then end of the head tag
        document.head.appendChild(link);
    }
}
// check if the css url has been injected or added manually
function getCss(url) {
    return document.querySelector("link[href*=\"" + url + "\"]");
}
function getCssUrl(urlOrVersion) {
    return !urlOrVersion || parseVersion(urlOrVersion)
        // if it's a valid version string return the CDN URL
        ? getCdnCssUrl(urlOrVersion)
        // otherwise assume it's a URL and return that
        : urlOrVersion;
}
// lazy load the CSS needed for the ArcGIS API
function loadCss(urlOrVersion, before) {
    var url = getCssUrl(urlOrVersion);
    var link = getCss(url);
    if (!link) {
        // create & load the css link
        link = createStylesheetLink(url);
        insertLink(link, before);
    }
    return link;
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
var defaultOptions = {};
function createScript(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.setAttribute('data-esri-loader', 'loading');
    return script;
}
// add a one-time load handler to script
// and optionally add a one time error handler as well
function handleScriptLoad(script, callback, errback) {
    var onScriptError;
    if (errback) {
        // set up an error handler as well
        onScriptError = handleScriptError(script, errback);
    }
    var onScriptLoad = function () {
        // pass the script to the callback
        callback(script);
        // remove this event listener
        script.removeEventListener('load', onScriptLoad, false);
        if (onScriptError) {
            // remove the error listener as well
            script.removeEventListener('error', onScriptError, false);
        }
    };
    script.addEventListener('load', onScriptLoad, false);
}
// add a one-time error handler to the script
function handleScriptError(script, callback) {
    var onScriptError = function (e) {
        // reject the promise and remove this event listener
        callback(e.error || new Error("There was an error attempting to load " + script.src));
        // remove this event listener
        script.removeEventListener('error', onScriptError, false);
    };
    script.addEventListener('error', onScriptError, false);
    return onScriptError;
}
// allow the user to configure default script options rather than passing options to `loadModules` each time
function setDefaultOptions(options) {
    if (options === void 0) { options = {}; }
    defaultOptions = options;
}
// get the script injected by this library
function getScript() {
    return document.querySelector('script[data-esri-loader]');
}
// has ArcGIS API been loaded on the page yet?
function isLoaded() {
    var globalRequire = window['require'];
    // .on() ensures that it's Dojo's AMD loader
    return globalRequire && globalRequire.on;
}
// load the ArcGIS API on the page
function loadScript(options) {
    if (options === void 0) { options = {}; }
    // we would have liked to use spread like { ...defaultOptions, ...options }
    // but TS would inject a polyfill that would require use to configure rollup w content: 'window'
    // if we have another occasion to use spread, let's do that and replace this for...in
    var opts = {};
    [defaultOptions, options].forEach(function (obj) {
        for (var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                opts[prop] = obj[prop];
            }
        }
    });
    // URL to load
    var version = opts.version;
    var url = opts.url || getCdnUrl(version);
    return new utils.Promise(function (resolve, reject) {
        var script = getScript();
        if (script) {
            // the API is already loaded or in the process of loading...
            // NOTE: have to test against scr attribute value, not script.src
            // b/c the latter will return the full url for relative paths
            var src = script.getAttribute('src');
            if (src !== url) {
                // potentially trying to load a different version of the API
                reject(new Error("The ArcGIS API for JavaScript is already loaded (" + src + ")."));
            }
            else {
                if (isLoaded()) {
                    // the script has already successfully loaded
                    resolve(script);
                }
                else {
                    // wait for the script to load and then resolve
                    handleScriptLoad(script, resolve, reject);
                }
            }
        }
        else {
            if (isLoaded()) {
                // the API has been loaded by some other means
                // potentially trying to load a different version of the API
                reject(new Error("The ArcGIS API for JavaScript is already loaded."));
            }
            else {
                // this is the first time attempting to load the API
                var css = opts.css;
                if (css) {
                    var useVersion = css === true;
                    // load the css before loading the script
                    loadCss(useVersion ? version : css, opts.insertCssBefore);
                }
                // create a script object whose source points to the API
                script = createScript(url);
                // _currentUrl = url;
                // once the script is loaded...
                handleScriptLoad(script, function () {
                    // update the status of the script
                    script.setAttribute('data-esri-loader', 'loaded');
                    // return the script
                    resolve(script);
                }, reject);
                // load the script
                document.body.appendChild(script);
            }
        }
    });
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
// wrap Dojo's require() in a promise
function requireModules(modules) {
    return new utils.Promise(function (resolve, reject) {
        // If something goes wrong loading the esri/dojo scripts, reject with the error.
        var errorHandler = window['require'].on('error', reject);
        window['require'](modules, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // remove error handler
            errorHandler.remove();
            // Resolve with the parameters from dojo require as an array.
            resolve(args);
        });
    });
}
// returns a promise that resolves with an array of the required modules
// also will attempt to lazy load the ArcGIS API if it has not already been loaded
function loadModules(modules, loadScriptOptions) {
    if (loadScriptOptions === void 0) { loadScriptOptions = {}; }
    if (!isLoaded()) {
        // script is not yet loaded, is it in the process of loading?
        var script = getScript();
        var src = script && script.getAttribute('src');
        if (!loadScriptOptions.url && src) {
            // script is still loading and user did not specify a URL
            // in this case we want to default to the URL that's being loaded
            // instead of defaulting to the latest 4.x URL
            loadScriptOptions.url = src;
        }
        // attempt to load the script then load the modules
        return loadScript(loadScriptOptions).then(function () { return requireModules(modules); });
    }
    else {
        // script is already loaded, just load the modules
        return requireModules(modules);
    }
}

/*
  Copyright (c) 2017 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
// re-export the functions that are part of the public API

exports.utils = utils;
exports.loadModules = loadModules;
exports.getScript = getScript;
exports.isLoaded = isLoaded;
exports.loadScript = loadScript;
exports.setDefaultOptions = setDefaultOptions;
exports.loadCss = loadCss;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=esri-loader.js.map
});

const esriLoader$1 = /*@__PURE__*/getDefaultExportFromCjs(esriLoader);

const arcgisHubMapCss = ":host{display:block}#hub-map{height:inherit;width:inherit}";

const ArcgisHubMap = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubMapViewReady = createEvent(this, "arcgisHubMapViewReady", 7);
    this.arcgisHubMapExtentChanged = createEvent(this, "arcgisHubMapExtentChanged", 7);
    /**
     * Map center: lng,lat
     */
    this.center = '0,0';
    /**
     * Level of Detail (LOD)
     */
    this.zoom = 2;
  }
  handleBasemapChanged(basemap) {
    this.map.basemap = this._Basemap.fromId(basemap);
  }
  handleCenterChanged(center) {
    this.center = center;
    const point = this.centerToCoords(center);
    this.view.center = this._Point.fromJSON({
      longitude: point[0],
      latitude: point[1]
    });
  }
  handleGraphicsChanged(graphics) {
    // empty graphics layer and re-populate
    if (!this.isMapLoaded())
      return;
    this.view.graphics.removeAll();
    if (graphics) {
      this.view.graphics.addMany(this.buildGraphics());
    }
  }
  handleExtentChanged() {
    if (!this.isMapLoaded())
      return;
    this.setExtent();
  }
  /**
   * Adds a layer to the map
   * @param layerUrl
   */
  addLayer(layerUrl) {
    if (!this.isMapLoaded())
      return;
    esriLoader.loadModules(['esri/layers/FeatureLayer'])
      .then(([FeatureLayer]) => {
      const featureLayer = new FeatureLayer({
        url: layerUrl
      });
      // let _featureLayerView;
      // featureLayer.when(() => {
      //   this.view.whenLayerView(featureLayer).then(function(layerView) {
      //     _featureLayerView = layerView
      //   })
      // })
      this.view.map.add(featureLayer);
    });
  }
  /**
   * Remove one or more layers
   * @param layerIndexes leave blank to remove all layers
   */
  removeLayers(layerIDs = null) {
    if (!this.isMapLoaded())
      return;
    if (layerIDs === null) {
      this.view.map.removeAll();
    }
    else {
      let layers = [];
      layerIDs.map(layerId => {
        layers.push(this.view.map.findLayerById(layerId));
      });
      this.view.map.removeMany(layers);
    }
  }
  isMapLoaded() {
    return !!this.map;
  }
  centerToCoords(center) {
    return center.split(',').map(coord => +coord);
  }
  buildGraphics() {
    try {
      const graphicsArr = this.graphics.map(graphic => {
        return this._Graphic.fromJSON(graphic);
      });
      return graphicsArr;
    }
    catch (err) {
      // if unable to parse graphics arr
      // return empty array
      return [];
    }
  }
  setExtent() {
    let extent = this._Extent.fromJSON(this.extent);
    if (this.expand) {
      extent = extent.expand(this.expand);
    }
    this.view.extent = extent;
  }
  async componentDidLoad() {
    const _esriDeps = [
      'esri/kernel',
      'esri/Map',
      'esri/views/MapView',
      'esri/Basemap',
      'esri/geometry/Point',
      'esri/geometry/Extent',
      'esri/Graphic'
    ];
    const [esriNS, Map, MapView, Basemap, Point, Extent, Graphic] = await esriLoader.loadModules(_esriDeps); // LOAD ESRI MODULES W/ ESRI_LOADER
    // Esri StyleSheet intelligent loading
    const apiVersion = esriNS.version;
    const apiStyleSheet = document.querySelector('link[rel="stylesheet"][href*="/esri/themes"]');
    if (apiStyleSheet) {
      // stylesheet exists, but warn is version out of sync
      const isVersionMatch = (new RegExp(apiVersion)).test(apiStyleSheet.href);
      if (!isVersionMatch) {
        console.warn(`Your ArcGIS API for JavaScript StyleSheet file should match the current hub-components version: ${apiVersion}.`);
      }
    }
    else {
      // stylesheet does not exist, so add it
      esriLoader.loadCss();
    }
    this._Basemap = Basemap;
    this._Point = Point;
    this._Graphic = Graphic;
    this._Extent = Extent;
    this.map = new Map({
      basemap: Basemap.fromId(this.basemap)
    });
    this.view = new MapView({
      map: this.map,
      container: 'hub-map',
      center: this.centerToCoords(this.center),
      zoom: this.zoom
    });
    if (this.extent) {
      this.setExtent();
    }
    let extentEmitter = this.arcgisHubMapExtentChanged;
    this.view.watch("extent", function (newExtent) {
      // The event object contains the mapPoint and the screen coordinates of the location
      // that was clicked.
      extentEmitter.emit({ extent: newExtent });
    });
    this.view.graphics.addMany(this.buildGraphics());
    this.arcgisHubMapViewReady.emit({ view: this.view, loadModules: esriLoader.loadModules });
  }
  render() {
    return (h(Host, null, h("div", { id: "hub-map" })));
  }
  static get watchers() { return {
    "basemap": ["handleBasemapChanged"],
    "center": ["handleCenterChanged"],
    "graphics": ["handleGraphicsChanged"],
    "extent": ["handleExtentChanged"],
    "expand": ["handleExtentChanged"]
  }; }
};
ArcgisHubMap.style = arcgisHubMapCss;

export { ArcgisHubMap as arcgis_hub_map };
