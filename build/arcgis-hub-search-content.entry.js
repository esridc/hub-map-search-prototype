import { r as registerInstance, e as createEvent, h, f as Host } from './index-d836c4a8.js';
import { _ as _searchContent } from './index-5ebfac40.js';
import './index-bed14788.js';
import './index-5c68fb28.js';
import './index-923d9554.js';

const arcgisHubSearchContentCss = ":host{display:block}#results{overflow-y:auto;height:100vh}calcite-card{cursor:pointer;margin-bottom:1em}";

const ArcgisHubSearchContent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.contentSelected = createEvent(this, "contentSelected", 7);
    this.contentUpdated = createEvent(this, "contentUpdated", 7);
    /**
     * Search input query
     */
    this.query = "trees";
    /**
     * Maximum number of content items to return
     */
    this.limit = 10;
    /**
     * Optional catalog filters, e.g. groups, types, etc.
     * Nominally:
     * {
     *   filterType: "content",
     *   type: {any: ["Feature Layer", "Feature Service", "Map Service", "CSV"]},
     *   term: query,
     *   groups: {any: ["group1", "group2"]}
     * }
     */
    this.filters = { filterType: "content" };
    /**
     * Cache of search results
     */
    this.content = [];
  }
  async queryChanged(_newQuery) {
    this.content = await this.search(this.query);
  }
  selectedContent(item) {
    console.debug("search-content event: selectedContent", item);
    this.contentSelected.emit(item);
  }
  async componentWillLoad() {
    console.debug("hub-search-content: componentWillRender", [this.query]);
    // This will update this.content
    this.search(this.query);
  }
  /**
   * Search for content by query, store in this.content
   * @param query string term to match
   * @returns Content results, also stores in this.content
   */
  async search(query) {
    this.filters.term = query;
    console.debug("hub-search-content: search", [this.filters]);
    let opts = {
      num: this.limit,
      sortField: "",
      sortOrder: "desc"
    };
    let results = await _searchContent(this.filters, opts);
    this.content = results.results;
    this.contentUpdated.emit(results.results);
    // Return for any callers
    return this.content;
  }
  renderResults() {
    let output = [];
    console.debug("hub-search-content: renderResults", { content: this.content });
    if (!this.content || this.content.length === 0) {
      output.push(h("calcite-loader", { active: true, scale: "m" }));
    }
    this.content.map((item) => {
      output.push(h("calcite-card", { onclick: () => this.selectedContent(item) }, h("h3", { slot: "title" }, item.title), h("span", { slot: "subtitle" }, item.summary), h("calcite-button", null, "Download"), h("calcite-button", null, "Preview")));
    });
    return (output);
  }
  render() {
    return (h(Host, null, h("slot", null), h("div", { id: "results" }, this.renderResults())));
  }
  static get watchers() { return {
    "query": ["queryChanged"]
  }; }
};
ArcgisHubSearchContent.style = arcgisHubSearchContentCss;

export { ArcgisHubSearchContent as arcgis_hub_search_content };
