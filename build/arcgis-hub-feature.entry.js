import { r as registerInstance, h, f as Host } from './index-d836c4a8.js';

const arcgisHubFeatureCss = ":host{display:block}table{width:100%;border-collapse:collapse;border-spacing:2px;border-color:gray}tr,td{border:1px solid #ccc;padding:0.25rem;text-align:left}tbody tr:nth-child(odd){background-color:white}calcite-card{cursor:pointer;margin-bottom:1em}";

const ArcgisHubFeature = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.feature = null;
    this.title = "Null Island Dataset";
  }
  renderAttributes(attributes) {
    return (h("table", null, h("tbody", null, Object.keys(attributes).map(key => {
      return (h("tr", null, h("td", null, key), h("td", null, attributes[key])));
    }))));
  }
  render() {
    return (h(Host, null, h("h3", null, this.feature.attributes['_title']), h("calcite-tabs", null, h("calcite-tab-nav", { slot: "tab-nav" }, h("calcite-tab-title", { tab: "tab1", active: true }, "About"), h("calcite-tab-title", { tab: "tab2" }, "Nearby"), h("calcite-tab-title", { tab: "tab3" }, "Discuss")), h("calcite-tab", { tab: "tab1", active: true }, this.renderAttributes(this.feature.attributes)), h("calcite-tab", { tab: "tab2" }, h("calcite-card", null, h("h3", { slot: "title" }, "Nearby Location 1")), h("calcite-card", null, h("h3", { slot: "title" }, "Nearby Location 2"))), h("calcite-tab", { tab: "tab1", active: true }, h("em", null, "Discussion")))));
  }
};
ArcgisHubFeature.style = arcgisHubFeatureCss;

export { ArcgisHubFeature as arcgis_hub_feature };
