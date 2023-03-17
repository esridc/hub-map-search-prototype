import { r as registerInstance, h, f as Host } from './index-d836c4a8.js';

const arcgisHubSelectCss = ":host{display:block}";

const ArcgisHubSelect = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};
ArcgisHubSelect.style = arcgisHubSelectCss;

export { ArcgisHubSelect as arcgis_hub_select };
