import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-d836c4a8.js';

const arcgisHubSearchSortCss = "";

const ArcgisHubSearchSort = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubSearchSortChange = createEvent(this, "hubSearchSortChange", 7);
    this.sortOrder = "desc";
  }
  connectedCallback() {
    this.sortOrderIcon = this.activeSortOption.order === 'asc' ? "sort-ascending-arrow" : "sort-descending-arrow";
  }
  /**
   * Listen to the sort field dropdown change and fire the sort change fn with new activeSortOption
   */
  handleFieldChangeEvent() {
    // Use the ref to the dropdown to get the selected items, and map out the "value"
    const selectedValues = this.dropdownEl.selectedItems.map(el => el.getAttribute('value'));
    if (selectedValues.length) {
      // Component is set to single-select mode, so there should only ever be one
      // Find entry with the value in this.sortOptions
      this.activeSortOption = this.sortOptions.find(e => e.attribute === selectedValues[0]);
      this.activeSortOption.order = this.sortOrder;
      this.hubSearchSortChange.emit(this.activeSortOption);
    }
  }
  setDropdownEl(el) {
    this.dropdownEl = el;
  }
  /**
   * Whenever sort order button is clicked, change the sort order and its icon, then
   * Fire the sort change fn with new activeSortOption
   */
  sortOrderChange() {
    this.activeSortOption.order = this.activeSortOption.order === "asc" ? "desc" : "asc";
    this.sortOrderIcon = this.activeSortOption.order === 'asc' ? "sort-ascending-arrow" : "sort-descending-arrow";
    this.hubSearchSortChange.emit(this.activeSortOption);
  }
  render() {
    return (h(Host, null, h("calcite-dropdown", { ref: this.setDropdownEl.bind(this) }, h("calcite-button", { slot: "dropdown-trigger", appearance: "transparent", color: "neutral", "icon-end": "caret-down" }, h("slot", { name: "dropdown-button-text" })), h("calcite-dropdown-group", { "selection-mode": "single" }, this.sortOptions.map(option => h("calcite-dropdown-item", { value: option.attribute }, option.label)))), h("calcite-button", { appearance: "transparent", color: "neutral", "icon-end": this.sortOrderIcon, onClick: this.sortOrderChange.bind(this) })));
  }
  get el() { return getElement(this); }
};
ArcgisHubSearchSort.style = arcgisHubSearchSortCss;

export { ArcgisHubSearchSort as arcgis_hub_search_sort };
