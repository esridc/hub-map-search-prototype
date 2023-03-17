import { r as registerInstance, h, f as Host } from './index-d836c4a8.js';
import { S as SortDirection } from './index-bed4f024.js';
import { aG as upgradeProtocol, aH as _searchGroups, aI as mergeGroupFilters } from './index-5ebfac40.js';
import './index-bed14788.js';
import './index-5c68fb28.js';
import './index-923d9554.js';

const arcgisHubTeamGalleryCss = ":host{display:block}";

const ArcgisHubTeamGallery = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * Default number of results to show, sort field and sort order
     */
    this.limit = 10;
    /**
     * Field to sort results
     */
    this.sortField = 'modified';
    /**
     * Sort Order
     */
    this.sortOrder = 'desc';
    /**
     * List layout: list or grid, default is list
     */
    this.layout = 'list';
    /**
     * Show/hide the thumbnail
     */
    this.showThumbnail = true;
    /**
     * Boolean to pass down to the child component
     * True when entities are being fetched
     */
    this.loading = true;
    /**
     * List of sort options to pass to `arcgis-hub-search-sort`
     */
    this.sortOptions = [
      { attribute: 'title', label: 'Title', order: 'asc' },
      { attribute: 'created', label: 'Date Created', order: 'desc' },
      { attribute: 'modified', label: 'Date Updated', order: 'desc' }
    ];
  }
  connectedCallback() {
    // Find the sort option that is currently selected
    this.activeSortOption = this.sortOptions.find(option => option.attribute === this.sortField);
    this.sortOrder = this.sortField === 'title' ? 'asc' : 'desc';
    this.prepareAndExecuteSearch();
  }
  /**
   * Build the search options and filters then excute the search
   */
  prepareAndExecuteSearch() {
    const activeFilter = this._buildSearchFilter(this.query, this.filter);
    // If a site url is passed, construct the siteModel ourselves
    const siteModel = typeof this.site === 'string' ? { item: { url: upgradeProtocol(this.site) } } : this.site;
    this.options = this._buildSearchOpts(this.limit, this.sortField, this.sortOrder, this.session, siteModel);
    this.search(activeFilter, this.options);
  }
  /**
   * 'Excute' the _searchGroups fn and assign 'num' of results to 'this.teams'
   * @param filter Filter<"group">
   * @param options IHubSearchOptions
   */
  search(filter, options) {
    this.loading = true;
    this.teams = this.generateSkeletonEntities('team', this.limit);
    _searchGroups(filter, options)
      .then(response => {
      this.loading = false;
      this.teams = response.results.map(c => {
        c.entityType = 'team';
        return c;
      });
    })
      .catch(err => {
      this.loading = false;
      throw new Error(`Error loading teams: ${err}`);
    });
  }
  /**
   * we generate a list of skeleton entities with the entity type so it can be used to determine
   * which view component to render, i.e. arcgis-hub-team-view
   * @param type entity type
   * @param limit numbers of entities to show
   * @returns a list of skeleton entities which contains the entity type and loading true state
   */
  generateSkeletonEntities(type, limit) {
    const entity = { entityType: type, loading: true };
    const entities = new Array(limit);
    entities.fill(entity);
    return entities;
  }
  /**
   * Listen for changes on the search input
   * @param evt
   */
  handleSearchChange(evt) {
    console.info(`Caught search term ${evt.detail}`);
    this.query = evt.detail;
    this.prepareAndExecuteSearch();
  }
  /**
   * Build the filter object for `search` fn
   * if no filter was set, build a default filter based on the query
   * if no specified filter was set, i.e. 'esri' vs 'owner: esri', search with term, i.e. 'term: esri'
   * for groups, term search for id, title, description, snippet, tags and owner
   * if neither query nor filter is passed, the api will return no results
   * @param filter
   * @param query
   */
  _buildSearchFilter(query = '*', filter) {
    const filters = [];
    if (query) {
      let parsedQuery = {
        filterType: "group"
      };
      const key = query.split(':')[0];
      const value = query.split(':')[1];
      if (value) {
        parsedQuery[key] = value;
      }
      else {
        parsedQuery.term = key;
      }
      filters.push(parsedQuery);
    }
    if (filter) {
      filters.push(filter);
    }
    const f = mergeGroupFilters(filters);
    return f;
  }
  /**
   * @returns search options to pass into the '_searchGroups' fn
   */
  _buildSearchOpts(limit, sortField, sortOrder, session, site) {
    let opts = {
      num: limit,
      sortField: sortField,
      sortOrder: SortDirection[sortOrder]
    };
    if (session) {
      opts.authentication = session;
    }
    opts.site = site;
    return opts;
  }
  /**
   * Only render sort when set to do so
   * @returns the -search-sort component
   */
  renderSort() {
    if (this.showSort) {
      return h("arcgis-hub-search-sort", { sortOptions: this.sortOptions, activeSortOption: this.activeSortOption, onHubSearchSortChange: (ev) => this.changeSortField(ev) }, h("span", { slot: 'dropdown-button-text' }, this.activeSortOption.label));
    }
  }
  /**
   * Triggered every time sort field has changed
   * @param event
   */
  changeSortField(event) {
    this.sortField = event.detail.attribute;
    this.sortOrder = event.detail.order;
    this.activeSortOption = this.sortOptions.find(option => option.attribute === this.sortField);
    this.prepareAndExecuteSearch();
  }
  renderSearch() {
    if (this.showSearch) {
      return (h("arcgis-hub-search-input", { placeholder: "Enter Query...", text: "Search" }));
    }
  }
  render() {
    return (h(Host, null, this.renderSearch(), this.renderSort(), h("arcgis-hub-list", { entities: this.teams, layout: this.layout, loading: this.loading, showThumbnail: this.showThumbnail, newTab: this.newTab })));
  }
};
ArcgisHubTeamGallery.style = arcgisHubTeamGalleryCss;

export { ArcgisHubTeamGallery as arcgis_hub_team_gallery };
