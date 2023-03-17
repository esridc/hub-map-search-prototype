import { r as registerInstance, h, g as getElement } from './index-d836c4a8.js';
import { c as componentLanguage, i as i18next } from './localizer-e674651b.js';
import './_commonjsHelpers-93ec9c7a.js';

const hubDownloadNoticeCss = "div{font-size:var(--calcite-font-size--1);line-height:1rem}calcite-notice{margin-bottom:0.5rem}calcite-loader{margin-right:0.5rem}calcite-loader[active]{display:inline-block}";

const HubDownloadNotice = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * Flag indicating if the user has triggered an export
     */
    this.exportRequested = false;
    /**
     * Current user is unable to request exports
     */
    this.cannotExport = false;
  }
  async componentWillLoad() {
    this.resetUndefinedProps();
    await this.setLocalization();
  }
  resetUndefinedProps() {
    // Storybook knobs will set some of these to "undefined"
    ['fileStatus', 'exportRequested', 'apiError'].forEach(prop => {
      this[prop] = this[prop] === 'undefined' ? undefined : this[prop];
    });
  }
  async setLanguage() {
    const language = componentLanguage(this.element);
    await i18next.changeLanguage(language);
  }
  async setLocalization() {
    const language = componentLanguage(this.element);
    await i18next.changeLanguage(language);
    await i18next.loadNamespaces('hub-download-notice');
    this.setLabels();
  }
  setLabels() {
    this.labels = {
      titleFileGeneration: i18next.t('hub-download-notice:titleFileGeneration'),
      titleDatasetNotFound: i18next.t('hub-download-notice:titleDatasetNotFound'),
      titleApiError: i18next.t('hub-download-notice:titleApiError'),
      titleFormatDisabled: i18next.t('hub-download-notice:titleFormatDisabled'),
      titleFileGenerationFailed: i18next.t('hub-download-notice:titleFileGenerationFailed'),
      messageCreatingFile: i18next.t('hub-download-notice:messageCreatingFile'),
      messageUpdatingFile: i18next.t('hub-download-notice:messageUpdatingFile'),
      messageFailedStaleAvailable: i18next.t('hub-download-notice:messageFailedStaleAvailable'),
      messageFileNeedsGenerating: i18next.t('hub-download-notice:messageFileNeedsGenerating'),
      messageFormatDisabled: i18next.t('hub-download-notice:messageFormatDisabled'),
    };
  }
  getNoticeTitle() {
    if (this.fileStatus === 'disabled') {
      return this.labels.titleFormatDisabled;
    }
    if (this.exportInProgress()) {
      return this.labels.titleFileGeneration;
    }
    if (this.apiError === '404') {
      return this.labels.titleDatasetNotFound;
    }
    if (this.apiError) {
      return this.labels.titleApiError;
    }
    if (this.requestedExportHasFailed()) {
      return this.labels.titleFileGenerationFailed;
    }
  }
  getNoticeMessage() {
    if (this.fileStatus === 'disabled') {
      return this.labels.messageFormatDisabled;
    }
    if (this.fileStatus === 'creating') {
      return this.labels.messageCreatingFile;
    }
    if (this.fileStatus === 'updating') {
      return this.labels.messageUpdatingFile;
    }
    if (this.downloadCached() && this.requestedExportHasFailed()) {
      return this.labels.messageFailedStaleAvailable;
    }
    if (this.fileStatus === 'ready_unknown') {
      return this.labels.messageFileNeedsGenerating;
    }
    if (this.fileStatus === 'locked' || this.fileStatus === 'stale_locked') {
      return this.labels.messageDataSourceLocked;
    }
    if (this.downloadCached()) {
      return this.labels.messageFileNeedsGenerating;
      ;
    }
    return this.labels.messageFileNeedsGenerating;
  }
  shouldShowMessage() {
    return !this.apiError && !this.exportFailed() && !this.requestedExportIsReady();
  }
  getNoticeColor() {
    if (this.requestedExportHasFailed() || this.apiError) {
      return 'red';
    }
    return 'yellow';
  }
  exportFailed() {
    return this.fileStatus === 'error' || this.fileStatus === 'error_creating' || this.fileStatus === 'error_updating';
  }
  exportInProgress() {
    return this.fileStatus === 'creating' || this.fileStatus === 'updating';
  }
  requestedExportIsReady() {
    return this.exportRequested && this.downloadUpToDate();
  }
  requestedExportHasFailed() {
    const { exportRequested, fileStatus } = this;
    return exportRequested && (fileStatus === 'error' || fileStatus === 'error_updating' || fileStatus === 'error_creating');
  }
  downloadCached() {
    return ['ready', 'ready_unknown', 'stale', 'updating', 'error_updating'].includes(this.fileStatus);
  }
  downloadUpToDate() {
    return this.fileStatus === 'ready';
  }
  shouldHide() {
    return this.downloadUpToDate()
      || this.cannotExport // just hide the notice because the user can't do anything
      || (this.exportFailed() && !this.exportRequested);
  }
  render() {
    if (this.shouldHide()) {
      return (h("calcite-notice", { active: false }));
    }
    const message = this.shouldShowMessage() ? h("div", { slot: "message" }, this.getNoticeMessage()) : null;
    return (h("calcite-notice", { scale: "m", width: "full", color: this.getNoticeColor(), dir: "ltr", active: true }, h("div", { slot: "title" }, h("calcite-loader", { active: this.exportInProgress(), inline: true, label: this.getNoticeMessage() }), this.getNoticeTitle()), message));
  }
  get element() { return getElement(this); }
};
HubDownloadNotice.style = hubDownloadNoticeCss;

export { HubDownloadNotice as hub_download_notice };
