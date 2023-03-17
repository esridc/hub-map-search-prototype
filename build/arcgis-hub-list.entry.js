import { r as registerInstance, h, f as Host } from './index-d836c4a8.js';
import { c as cloneObject } from './index-5ebfac40.js';
import './index-bed14788.js';
import './index-5c68fb28.js';
import './index-923d9554.js';

const arcgisHubListCss = ":host{display:block}:host(.grid){display:grid;gap:15px;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr))}";

const ArcgisHubList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * Entities to show in the List
     * May be stringified JSON (when passed from storybook), IHubContent, IHubUser or IHubTeam objects
     * The List will render the appropriate component
     */
    this.entities = [];
    /**
     * Properties received from the parent component and to pass down to the child components
     */
    /**
     * List layout: list or grid, default is list
     */
    this.layout = 'list';
    /**
     * Internal variables
     */
    /**
     * Parsed if entities is a string
     */
    this.parsedEntities = [];
    /**
     * Layout to use in the child entity view component
     * Computed from the layout prop in the parent component
     */
    this.childLayout = 'row';
  }
  componentWillRender() {
    this.parsedEntities = this.parseEntities(this.entities);
    /**
     * We convert grid to card and list to row when pass it down to the child entity view component
     * In the context of the Gallery, only row and card are relevant
     */
    this.childLayout = this.layout === 'grid' ? 'card' : 'row';
  }
  /**
   * When passed in from storybook, entities have to be a string
   * we need to parse it in order to use it in the list
   * @param entities string or array, depends on whether they are passed in from storybook or other components
   */
  parseEntities(entities = []) {
    let results;
    if (!entities) {
      throw new Error('entities attribute is required');
    }
    ;
    if (typeof entities === 'string') {
      try {
        results = JSON.parse(entities);
      }
      catch (_a) {
        results = [];
      }
    }
    else {
      results = cloneObject(entities);
    }
    return results;
  }
  render() {
    let components;
    if (this.parsedEntities.length) {
      components = this.parsedEntities.map(entity => {
        /**
         * We need to decide which view component to render in the list, i.e. content, user, team
         * every entity object has an 'entityType' property, which we can use to identify the entity type
        */
        const Component = `arcgis-hub-${entity.entityType}-view`;
        return h(Component, { entity: entity, layout: this.childLayout, loading: this.loading, showThumbnail: this.showThumbnail, newTab: this.newTab });
      });
    }
    else {
      // some empty state handling here...
      return h("div", null, "empty...");
    }
    return (h(Host, { class: this.layout }, components));
  }
};
ArcgisHubList.style = arcgisHubListCss;

export { ArcgisHubList as arcgis_hub_list };
