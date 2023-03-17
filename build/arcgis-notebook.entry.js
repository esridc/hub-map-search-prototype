import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { U as UserSession } from './index-923d9554.js';
import { I as getItemResource } from './index-bed14788.js';
import { c as componentLanguage, i as i18next } from './localizer-e674651b.js';
import './index-5c68fb28.js';
import './_commonjsHelpers-93ec9c7a.js';

const arcgisNotebookCss = ":host{display:block;height:100%;width:100%}iframe{height:100%;width:100%;border-style:none}calcite-notice[active],calcite-loader[active]{margin-top:1rem}";

const ArcgisNotebook = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcGisNotebookError = createEvent(this, "arcGisNotebookError", 7);
    /**
     * The portal rest api url
     *
     * @type {string}
     * @memberof HubArcgisNotebook
     */
    this.portalUrl = 'https://www.arcgis.com/sharing/rest';
    /**
     * Indicates whether the iframe is allowed to run scripts
     *
     * @type {boolean}
     * @memberof HubArcgisNotebook
     */
    this.allowScripts = false;
    this.isLoading = true;
  }
  onItemIdChanged() {
    this.fetchPreview();
  }
  onTokenChanged() {
    this.fetchPreview();
  }
  onPortalUrlChanged() {
    this.fetchPreview();
  }
  onPreviewChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.updateIframe();
    }
  }
  async componentWillLoad() {
    await this.setLocalization();
    return this.fetchPreview();
  }
  componentShouldUpdate(_newVal, _oldVal, propName) {
    // NOTE: we render an iframe and we use the dom api to write stuff into it
    // thus, we don't want to re-render if the prop that changed was portalUrl, itemId, token, or notebookPreview
    // because in the case of portalUrl, itemId, and token, what we want to do is fetch the preview
    // and in the case of notebookPreview we want to use the dom api to write the preview into the iframe
    const noUpdateProps = ['portalUrl', 'itemId', 'token', 'notebookPreview'];
    return !noUpdateProps.includes(propName);
  }
  get requestOpts() {
    const authentication = new UserSession({
      portal: this.portalUrl,
      token: this.token,
    });
    return {
      fileName: 'notebook_preview.json',
      readAs: 'json',
      authentication,
      httpMethod: 'GET'
    };
  }
  get sandboxSettings() {
    // this is not State because we don't expect it to change
    const result = ['allow-same-origin'];
    if (this.allowScripts) {
      result.push("allow-scripts");
    }
    return result.join(' ');
  }
  async setLocalization() {
    const language = componentLanguage(this.el);
    await i18next.changeLanguage(language);
    await i18next.loadNamespaces('arcgis-notebook');
    this.setLabels();
  }
  setLabels() {
    this.labels = {
      messageFetchError: i18next.t('arcgis-notebook:messageFetchError'),
      labelLoading: i18next.t('arcgis-notebook:labelLoading'),
    };
  }
  reset() {
    this.notebookPreview = '';
    this.isLoading = true;
    this.error = null;
  }
  updateIframe() {
    var _a;
    const doc = (_a = this.iFrameEl) === null || _a === void 0 ? void 0 : _a.contentWindow.document;
    if (doc) {
      doc.write(this.notebookPreview); // when you call write, open is automatically called
      doc.close();
    }
  }
  fetchPreview() {
    this.reset();
    const opts = this.requestOpts;
    getItemResource(this.itemId, opts)
      .then(obj => {
      this.notebookPreview = obj.html;
    }).catch((e) => {
      this.error = this.labels.messageFetchError;
      this.arcGisNotebookError.emit(`Error in arcgis-notebook fetchPreview: ${e.message}`);
    })
      .finally(() => {
      this.isLoading = false;
    });
  }
  setIframeEl(el) {
    this.iFrameEl = el;
  }
  render() {
    return (h(Host, null, h("calcite-notice", { scale: "m", color: "red", width: "half", dir: "ltr", active: !!this.error }, h("div", { slot: "title" }, this.error)), h("calcite-loader", { active: this.isLoading, label: this.labels.labelLoading }), h("iframe", { sandbox: this.sandboxSettings, title: this.notebookTitle, ref: this.setIframeEl.bind(this) })));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "itemId": ["onItemIdChanged"],
    "token": ["onTokenChanged"],
    "portalUrl": ["onPortalUrlChanged"],
    "notebookPreview": ["onPreviewChanged"]
  }; }
};
ArcgisNotebook.style = arcgisNotebookCss;

export { ArcgisNotebook as arcgis_notebook };
