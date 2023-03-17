import { r as registerInstance, e as createEvent, h, f as Host } from './index-d836c4a8.js';

const arcgisHubSearchInputCss = ":host{display:block}";

const ArcgisHubSearchInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.inputChange = createEvent(this, "hubSearchInputChange", 7);
    /**
     * Button Text
     */
    this.text = "Search";
    /**
     * Listen for the click of the button and
     * raise the event
     * @param ev
     */
    this.handleClick = (ev) => {
      ev.preventDefault();
      this.inputChange.emit(this.value);
    };
  }
  /**
   * When enter key is pressed, the calcite-input raises this event
   */
  handleInputChange() {
    this.inputChange.emit(this.value);
  }
  /**
   * Keep the internal value syncronized with the calcite-input
   * @param ev
   */
  handleInput(ev) {
    this.value = ev.detail.value;
  }
  render() {
    return (h(Host, null, h("calcite-input", { value: this.value, placeholder: this.placeholder }, h("calcite-button", { slot: "action", onClick: (ev) => this.handleClick(ev) }, this.text))));
  }
};
ArcgisHubSearchInput.style = arcgisHubSearchInputCss;

export { ArcgisHubSearchInput as arcgis_hub_search_input };
