import { r as registerInstance, e as createEvent, h, f as Host } from './index-d836c4a8.js';
import { b as getLayer, q as queryFeatures } from './index-d6e159fc.js';
import './index-5c68fb28.js';

const arcgisHubSearchDatasetCss = ":host{display:block}#results{overflow-y:auto;height:100vh}calcite-card{cursor:pointer;margin-bottom:1em}";

const ArcgisHubSearchDataset = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.featureHighlighted = createEvent(this, "featureHighlighted", 7);
    this.featureSelected = createEvent(this, "featureSelected", 7);
    /**
     * Dataset title
     */
    this.datasetTitle = "";
    /**
     * Feature Layer 'where' query
     */
    this.where = null;
    /**
     * Spatial location filter
     */
    this.geometry = null;
    /**
     * GeoServices layer URL
     */
    this.serverUrl = "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3";
    /**
     * Cache of returned features
     */
    this.features = [];
    /**
     * Store the layer displayFieldName
     */
    this.titleAttribute = "";
  }
  async componentWillLoad() {
    console.debug("hub-search-dataset: willLoad", { resultsCount: this.features.length });
    this.search(this.where);
  }
  whereChanged(newWhere) {
    this.search(newWhere, this.geometry);
  }
  geometryChanged(newGeometry) {
    console.debug('hub-search-dataset: geometryChanged', { newGeometry });
    this.search(this.where, newGeometry);
  }
  /**
   * Get features from the layer
   * Currently uses parameters instead of internal state
   * so that it could be used externally.
   * This may be confusing since internal features are also updated.
   * TODO: Consider if methods should use properties or parameters
   * @param where Geoservices WHERE query, "STATE_NAME LIKE 'Al%'"
   * @param geometry Geoservices geometry object
   * @returns Search results. Also updates cache of features
   */
  async search(where = null, geometry = null) {
    this.layer = await getLayer({
      url: this.serverUrl
    });
    // Assume Layer 0 if not specified in an item
    let query = {
      url: this.serverUrl.replace(/Server\/?$/, 'Server/0'),
      returnGeometry: false
    };
    if (!!this.where) {
      query.where = where;
    }
    if (!!this.geometry) {
      query.geometry = JSON.stringify(geometry);
    }
    const result = await queryFeatures(query);
    this.titleAttribute = this.layer.displayField;
    this.features = result.features;
    console.debug("hub-search-dataset: search", [this.titleAttribute, query, result]);
    return result;
  }
  highlightedFeature(feature) {
    this.featureHighlighted.emit(feature);
  }
  selectedFeature(feature) {
    // Hack to store the display attribute in a hidden field
    feature.attributes['_title'] = feature.attributes[this.titleAttribute];
    console.debug("hub-search-dataset event: featureSelected", feature);
    this.featureSelected.emit(feature);
  }
  renderFeature(feature) {
    return (h("calcite-card", { onmouseover: () => this.highlightedFeature(feature), onclick: () => this.selectedFeature(feature) }, h("h3", { slot: "title" }, feature.attributes[this.titleAttribute]), h("span", { slot: "subtitle" }, "...")));
  }
  render() {
    console.debug("hub-search-dataset: render", { featureCount: this.features.length });
    return (h(Host, null, h("slot", null), h("h3", null, this.datasetTitle), h("arcgis-hub-search-input", { placeholder: "Search withing dataset", text: "Search", value: '' }), h("div", { id: "results" }, this.features.length === 0 ? h("calcite-loader", { active: true, scale: "m" }) : "", this.features.map((feature) => this.renderFeature(feature)))));
  }
  static get watchers() { return {
    "where": ["whereChanged"],
    "geometry": ["geometryChanged"]
  }; }
};
ArcgisHubSearchDataset.style = arcgisHubSearchDatasetCss;

export { ArcgisHubSearchDataset as arcgis_hub_search_dataset };
