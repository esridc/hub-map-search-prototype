import { r as registerInstance, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { J as camelize, z as getItemThumbnailUrl } from './index-5ebfac40.js';
import { c as componentLanguage, g as getLocale } from './localizer-e674651b.js';
import { i as intlManager } from './intl-manager-cb377693.js';
import './index-bed14788.js';
import './index-5c68fb28.js';
import './index-923d9554.js';
import './_commonjsHelpers-93ec9c7a.js';

/**
 * Get the content icon based on the content type
 * @param content
 * @returns corresponding calcite icon
 */
function getContentIcon(content) {
  var _a;
  const contentType = camelize(content.type);
  const iconMap = {
    appbuilderExtension: 'file',
    appbuilderWidgetPackage: 'widgets-source',
    application: 'web',
    arcgisProMap: 'desktop',
    cadDrawing: 'file-cad',
    cityEngineWebScene: 'urban-model',
    codeAttachment: 'file-code',
    colorSet: 'palette',
    contentCategorySet: 'label',
    cSV: 'file-csv',
    cSVCollection: 'file-csv',
    dashboard: 'dashboard',
    desktopApplication: 'desktop',
    documentLink: 'link',
    excaliburImageryProject: 'file',
    explorerMap: 'file',
    exportPackage: 'file',
    featureCollection: 'data',
    featureCollectionTemplate: 'file',
    featureLayer: 'data',
    featureService: 'data',
    fileGeodatabase: 'data',
    form: 'survey',
    geocodingService: 'file',
    geodataService: 'file',
    geometryService: 'file',
    geopackage: 'file',
    geoprocessingService: 'file',
    globeLayer: 'layers',
    globeService: 'file',
    hubInitiative: 'mountain-summit-nocap',
    hubInitiativeTemplate: 'initiative-template-outlines',
    hubPage: 'browser',
    hubSiteApplication: 'web',
    image: 'file-image',
    imageService: 'data',
    insightsModel: 'file',
    insightsPage: 'graph-moving-average',
    insightsTheme: 'palette',
    insightsWorkbook: 'graph-moving-average',
    iWorkPages: 'calcite-file-text',
    iWorkKeynote: 'presentation',
    iWorkNumbers: 'file-report',
    kML: 'data',
    kMLCollection: 'data',
    layer: 'layers',
    layerPackage: 'layers',
    locatorPackage: 'file',
    mapArea: 'file',
    mapDocument: 'map-contents',
    mapImageLayer: 'collection',
    mapPackage: 'file',
    mapService: 'collection',
    microsoftExcel: 'file-report',
    microsoftPowerpoint: 'presentation',
    microsoftWord: 'calcite-file-text',
    mission: 'file',
    mobileMapPackage: 'map-contents',
    nativeApplication: 'mobile',
    nativeApplicationInstaller: 'file',
    nativeApplicationTemplate: 'file',
    mobileApplication: 'mobile',
    networkAnalysisService: 'file',
    notebook: 'code',
    orientedImageryCatalog: 'file',
    orthoMappingProject: 'file',
    orthoMappingTemplate: 'file',
    pDF: 'file-pdf',
    quickCaptureProject: 'mobile',
    rasterLayer: 'map',
    realTimeAnalytic: 'file',
    relationalDatabaseConnection: 'file',
    reportTemplate: 'file',
    sceneLayer: 'data',
    sceneService: 'urban-model',
    serviceDefinition: 'file',
    shapefile: 'data',
    solution: 'solutions',
    sqliteGeodatabase: 'file',
    statisticalDataCollection: 'file',
    storyMap: 'tour',
    symbolSet: 'file',
    table: 'table',
    urbanModel: 'urban-model',
    vectorTileService: 'map',
    visioDocument: 'conditional-rules',
    webExperience: 'apps',
    webMap: 'map',
    webMappingApplication: 'apps',
    webScene: 'urban-model',
    wFS: 'map',
    wMS: 'map',
    wMTS: 'map',
    workflowManagerService: 'file',
    workforceProject: 'list-check'
  };
  return (_a = iconMap[contentType]) !== null && _a !== void 0 ? _a : 'file';
}

const arcgisHubContentViewCss = ":host{display:block}calcite-card{height:100%;width:100%;--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.content-type{display:flex;align-items:center;padding-bottom:1.25rem}.content-type calcite-icon{margin-right:0.5rem}a{overflow:hidden;font-size:var(--calcite-font-size-2);line-height:1.5rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-link);text-decoration:none;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.owner{font-size:14px}.snippet{margin-left:0px;margin-right:0px;margin-top:1rem;margin-bottom:1rem;overflow:hidden;font-size:var(--calcite-font-size-0);line-height:1.25rem;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}:host([layout=\"card\"]){height:100%}:host([layout=\"card\"]) .thumbnail{width:100%;aspect-ratio:200 / 133}:host([layout=\"card\"]) .empty-thumbnail{height:auto;width:100%;background-color:var(--calcite-ui-foreground-3);color:var(--calcite-ui-text-3);aspect-ratio:200 / 133}:host([layout=\"row\"]){--calcite-animation-timing:0ms;margin-bottom:1rem;display:grid;grid-template-columns:repeat(4, minmax(0, 1fr));--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);grid-template-areas:\"thumbnail main main main\"}:host([layout=\"row\"]:hover) calcite-card{--tw-shadow:0 4px 16px 0 rgba(0, 0, 0, 0.08), 0 2px 8px 0 rgba(0, 0, 0, 0.04);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);}:host([layout=\"row\"]:hover) calcite-card:hover{--tw-shadow:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([layout=\"row\"]:hover) .thumbnail{box-shadow:-8px 4px 16px 0 rgb(0 0 0 / 8%), -4px 2px 8px 0 rgb(0 0 0 / 4%)}:host([layout=\"row\"]) .empty-thumbnail{height:auto;width:100%;background-color:var(--calcite-ui-foreground-3);color:var(--calcite-ui-text-3);aspect-ratio:200 / 167}:host([layout=\"row\"]) .thumbnail{background-color:var(--calcite-ui-foreground-1);aspect-ratio:200 / 167}:host([layout=\"row\"]) .thumbnail,:host([layout=\"row\"]) .empty-thumbnail{grid-area:thumbnail}:host([layout=\"row\"]) .thumbnail,:host([layout=\"row\"]) .empty-thumbnail{height:100%;min-width:100%;max-width:100%;border-width:1px;border-right-width:0px;border-style:solid;border-color:var(--calcite-ui-border-2);-o-object-fit:cover;object-fit:cover;-o-object-position:center;object-position:center}:host([layout=\"row\"]) .thumbnail,:host([layout=\"row\"]) .empty-thumbnail{box-shadow:1px 0px var(--calcite-ui-foreground-1);z-index:2}:host([layout=\"row\"]) calcite-card{grid-area:main;--tw-shadow:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}dl[slot=\"footer-leading\"]{margin:0px;display:grid;width:100%;grid-template-columns:repeat(2, minmax(0, 1fr));gap:0.25rem;font-size:14px;grid-template-columns:repeat(auto-fill, minmax(max(200px, (100% - (2 - 1) * 0.25rem) / 2), 1fr))}dl[slot=\"footer-leading\"]>div{display:flex}dl[slot=\"footer-leading\"] dt{font-weight:var(--calcite-font-weight-bold)}dl[slot=\"footer-leading\"] dt::after{content:':'}dl[slot=\"footer-leading\"] dd{margin:0px;margin-left:0.25rem;-webkit-margin-start:5px;margin-inline-start:5px}";

const ArcgisHubContentView = class {
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
    this.portalUrl = 'https://www.arcgis.com/sharing/rest';
  }
  async componentWillRender() {
    this.intl = await intlManager.loadIntlForComponent(this.element);
    if (!this.loading) {
      this.lastUpdatedDate = this.parseDate(this.entity.modified);
      this.createdDate = this.parseDate(this.entity.created);
      this.thumbnailUrl = getItemThumbnailUrl(this.entity, this.portalUrl);
      this.contentIcon = getContentIcon(this.entity);
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
      if (this.thumbnailUrl && !this.hasThumbnailError) {
        result = h("img", { alt: "footer thumbnail", class: 'thumbnail', slot: "thumbnail", src: this.thumbnailUrl, ref: this.setThumbnailEl.bind(this) });
      }
      else {
        return h("calcite-icon", { icon: "image", slot: "thumbnail", class: `${layout}-empty-thumbnail empty-thumbnail` });
      }
    }
    return result;
  }
  renderDateCreated() {
    return h("div", null, h("dt", null, this.intl.t('dateCreated')), h("dd", null, this.createdDate));
  }
  /**
   * Render the card or row
   * Since <calcite-card> does not support horizontal layout natively
   * For rows, we have to manually position it with flex-box and render the thumbnail outside of <calcite-card>
   * @param content
   * @param isLoading
   * @param layout card or row
   * @returns layout element
   */
  renderLayout(content, isLoading = false) {
    return (h(Host, null, this.layout === 'row' ? this.renderThumbnail(this.layout) : '', h("calcite-card", { loading: isLoading, dir: this.intl.direction }, this.layout === 'card' ? this.renderThumbnail(this.layout) : '', h("div", { slot: 'title', class: 'content-type' }, h("calcite-icon", { icon: this.contentIcon }), h("span", null, content.family)), h("a", { slot: 'title', href: content.urls ? content.urls.site : '#', target: this.newTab ? '_blank' : '_self', class: 'title' }, content.title), h("div", { slot: 'subtitle', class: 'owner' }, content.owner), h("div", { slot: 'subtitle', class: 'snippet' }, content.snippet), h("dl", { slot: 'footer-leading' }, h("div", null, h("dt", null, this.intl.t('type')), h("dd", null, content.type)), this.layout === 'row' ? this.renderDateCreated() : '', h("div", null, h("dt", null, this.intl.t('dateUpdated')), h("dd", null, this.lastUpdatedDate))))));
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
ArcgisHubContentView.style = arcgisHubContentViewCss;

export { ArcgisHubContentView as arcgis_hub_content_view };
