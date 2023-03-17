import { r as registerInstance, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { aJ as capitalize } from './index-5ebfac40.js';
import { c as componentLanguage, g as getLocale } from './localizer-e674651b.js';
import { i as intlManager } from './intl-manager-cb377693.js';
import './index-bed14788.js';
import './index-5c68fb28.js';
import './index-923d9554.js';
import './_commonjsHelpers-93ec9c7a.js';

const arcgisHubTeamViewCss = ":host{display:block}calcite-card{height:100%;width:100%;--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}a{overflow:hidden;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-link);text-decoration:none;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.plain-title{overflow:hidden;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium);overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.snippet{margin-left:0px;margin-right:0px;margin-top:1rem;margin-bottom:1rem;overflow:hidden;font-size:var(--calcite-font-size-0);line-height:1.25rem;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}:host([layout=\"card\"]){height:100%}:host([layout=\"card\"]) .thumbnail{width:100%;aspect-ratio:200 / 133}:host([layout=\"card\"]) .empty-thumbnail{height:auto;width:100%;background-color:var(--calcite-ui-foreground-3);color:var(--calcite-ui-text-3);aspect-ratio:200 / 133}:host([layout=\"row\"]){--calcite-animation-timing:0ms;margin-bottom:1rem;display:grid;grid-template-columns:repeat(4, minmax(0, 1fr));--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);grid-template-areas:\"thumbnail main main main\"}:host([layout=\"row\"]:hover) calcite-card{--tw-shadow:0 4px 16px 0 rgba(0, 0, 0, 0.08), 0 2px 8px 0 rgba(0, 0, 0, 0.04);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);}:host([layout=\"row\"]:hover) calcite-card:hover{--tw-shadow:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([layout=\"row\"]:hover) .thumbnail{box-shadow:-8px 4px 16px 0 rgb(0 0 0 / 8%), -4px 2px 8px 0 rgb(0 0 0 / 4%)}:host([layout=\"row\"]) .empty-thumbnail{height:auto;width:100%;background-color:var(--calcite-ui-foreground-3);color:var(--calcite-ui-text-3);aspect-ratio:200 / 167}:host([layout=\"row\"]) .thumbnail{background-color:var(--calcite-ui-foreground-1);aspect-ratio:200 / 167}:host([layout=\"row\"]) .thumbnail,:host([layout=\"row\"]) .empty-thumbnail{grid-area:thumbnail}:host([layout=\"row\"]) .thumbnail,:host([layout=\"row\"]) .empty-thumbnail{height:100%;min-width:100%;max-width:100%;border-width:1px;border-right-width:0px;border-style:solid;border-color:var(--calcite-ui-border-2);-o-object-fit:cover;object-fit:cover;-o-object-position:center;object-position:center}:host([layout=\"row\"]) .thumbnail,:host([layout=\"row\"]) .empty-thumbnail{box-shadow:1px 0px var(--calcite-ui-foreground-1);z-index:2}:host([layout=\"row\"]) calcite-card{grid-area:main;--tw-shadow:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}dl[slot=\"footer-leading\"]{margin:0px;display:grid;width:100%;grid-template-columns:repeat(2, minmax(0, 1fr));gap:0.25rem;font-size:14px;grid-template-columns:repeat(auto-fill, minmax(max(200px, (100% - (2 - 1) * 0.25rem) / 2), 1fr))}dl[slot=\"footer-leading\"]>div{display:flex}dl[slot=\"footer-leading\"] dt{font-weight:var(--calcite-font-weight-bold)}dl[slot=\"footer-leading\"] dt::after{content:':'}dl[slot=\"footer-leading\"] dd{margin:0px;margin-left:0.25rem;-webkit-margin-start:5px;margin-inline-start:5px}";

const ArcgisHubTeamView = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * Layout of each team, row(list) or card(grid)
     */
    this.layout = 'row';
    /**
     * Internal variables
     */
    /**
     * True when there is error rendering the thumbnail
     */
    this.hasThumbnailError = false;
  }
  async componentWillRender() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    if (!this.loading) {
      this.lastUpdatedDate = this.parseDate(this.entity.modified);
    }
  }
  /**
   * Convert the unix timestamp to 'month day, year' format
   */
  parseDate(timestamp) {
    const language = componentLanguage(this.element);
    const locale = getLocale(language) || 'en-us';
    const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour12: false };
    this.dateTimeFormatter = new Intl.DateTimeFormat(locale, dateFormatOptions);
    return this.dateTimeFormatter.format(new Date(timestamp));
  }
  setThumbnailEl(el) {
    this.thumbnailEl = el;
  }
  componentDidRender() {
    if (this.thumbnailEl) {
      const onError = _ => {
        this.hasThumbnailError = true;
        this.thumbnailEl.removeEventListener('error', onError);
      };
      this.thumbnailEl.addEventListener('error', onError);
    }
  }
  /**
   * Render the thumbnail if showThumbnail is true
   * We will render an image icon with a gray background if the item does not contain a thumbnail
   * @returns thumbnail html element
   */
  renderThumbnail(layout) {
    let result;
    // Only render the thumbnail when not in loading state
    // so the <calcite-card> loader will not appear in thumbnail slot in row layout
    if (this.showThumbnail && !this.loading) {
      if (this.entity.thumbnailUrl && !this.hasThumbnailError) {
        result = h("img", { alt: "footer thumbnail", class: 'thumbnail', slot: "thumbnail", src: this.entity.thumbnailUrl, ref: this.setThumbnailEl.bind(this) });
      }
      else {
        return h("calcite-icon", { icon: "image", slot: "thumbnail", class: `${layout}-empty-thumbnail empty-thumbnail` });
      }
    }
    return result;
  }
  /**
   * When there is no site team url, render a plain text title instead of a link
   * @returns team title
   */
  renderTitle() {
    if (this.entity.siteTeamUrl) {
      return h("a", { slot: 'title', href: this.entity.siteTeamUrl, target: this.newTab ? '_blank' : '_self' }, this.entity.title);
    }
    else {
      return h("div", { slot: 'title', class: 'plain-title' }, this.entity.title);
    }
  }
  /**
   * Render the card or row
   * Since <calcite-card> does not support horizontal layout natively
   * For rows, we have to manually position it with flex-box and render the thumbnail outside of <calcite-card>
   * @param team
   * @param isLoading
   * @param layout card or row
   * @returns layout element
   */
  renderLayout(team, isLoading = false) {
    return (h(Host, null, this.layout === 'row' ? this.renderThumbnail(this.layout) : '', h("calcite-card", { loading: isLoading, dir: this.intl.direction }, this.layout === 'card' ? this.renderThumbnail(this.layout) : '', this.renderTitle(), h("div", { slot: 'subtitle', class: 'snippet' }, team.snippet), h("dl", { slot: 'footer-leading' }, h("div", null, h("dt", null, this.intl.t('teamAccess')), h("dd", null, team.access ? capitalize(team.access) : '')), h("div", null, h("dt", null, this.intl.t('dateUpdated')), h("dd", null, this.lastUpdatedDate))))));
  }
  render() {
    if (this.entity) {
      return this.renderLayout(this.entity, this.loading);
    }
    else {
      return `No data.`;
    }
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
};
ArcgisHubTeamView.style = arcgisHubTeamViewCss;

export { ArcgisHubTeamView as arcgis_hub_team_view };
