import { h, r as registerInstance, f as Host, g as getElement } from './index-d836c4a8.js';
import { g as getContent } from './index-19f5f2eb.js';
import './index-5ebfac40.js';
import './index-bed14788.js';
import './index-5c68fb28.js';
import './index-923d9554.js';
import './index-d6e159fc.js';
import './_commonjsHelpers-93ec9c7a.js';

/**  @jsx h */
// Looks for element within host elRefName dom tree
// that has the corresponding slot name [name=slotName]
// and if not found, return the fallback element defined in the
// decorated method
function defaultSlot(slotName, elRefName) {
  return function nestedDecorator(_target, _propertyKey, descriptor) {
    const { value: original } = descriptor;
    return Object.assign(Object.assign({}, descriptor), { value(...args) {
        const slot = this[elRefName].querySelector(`[name="${slotName}"]`);
        if (slot) {
          return (h("slot", { name: slotName }));
        }
        else {
          return original.apply(this, args);
        }
      } });
  };
}
;

const arcgisHubContentMapCss = ":host{display:block}arcgis-hub-map{height:inherit;width:inherit}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const ArcgisHubContentMap = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * Base URL of Hub API requests
     */
    this.hubApiUrl = 'https://opendata.arcgis.com';
  }
  handleBoundarySourceChanged() {
    this.createGraphics();
  }
  handleidentifierChanged() {
    this.createGraphics();
  }
  handleUpdatemapEl() {
    this.updateMapElProps();
  }
  componentWillLoad() {
    if (this.el.querySelector('arcgis-hub-map')) {
      this.mapEl = this.el.querySelector('arcgis-hub-map');
    }
    this.createGraphics();
  }
  async createGraphics() {
    const content = await getContent(this.identifier, { hubApiUrl: this.hubApiUrl });
    this.extent = this.coordsToExtent(content.extent);
    const geometry = this.boundarySource === 'extent'
      ? this.coordsToExtent(content.extent)
      : content.boundary.geometry;
    const graphic = Object.assign(Object.assign({}, graphicTemplate), { geometry });
    this.graphics = [graphic];
    this.updateMapElProps();
  }
  coordsToExtent(coords) {
    return {
      xmin: coords[0][0],
      ymin: coords[0][1],
      xmax: coords[1][0],
      ymax: coords[1][1],
      spatialReference: {
        wkid: 4326
      }
    };
  }
  updateMapElProps() {
    if (this.mapEl) {
      this.mapEl.extent = this.extent;
      this.mapEl.graphics = this.graphics;
      this.mapEl.style.display = 'inline'; // slot default is hidden
    }
  }
  renderMapSlot() {
    return (h("arcgis-hub-map", { basemap: "streets", extent: this.extent, graphics: this.graphics, expand: 1.5 }));
  }
  render() {
    return (h(Host, null, this.renderMapSlot()));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "boundarySource": ["handleBoundarySourceChanged"],
    "identifier": ["handleidentifierChanged"],
    "extent": ["handleUpdatemapEl"],
    "graphics": ["handleUpdatemapEl"]
  }; }
};
__decorate([
  defaultSlot('arcgisHubMap', 'el')
], ArcgisHubContentMap.prototype, "renderMapSlot", null);
ArcgisHubContentMap.style = arcgisHubContentMapCss;

export { ArcgisHubContentMap as arcgis_hub_content_map };
