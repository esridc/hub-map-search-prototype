import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { s as setRequestedIcon, a as getElementDir, C as CSS_UTILITY } from './dom-35210035.js';
import { S as StatusIcons } from './interfaces-0207b5e9.js';
import './guid-9ad8042d.js';

const TEXT = {
  intlClose: "Close"
};
const DURATIONS = {
  slow: 14000,
  medium: 10000,
  fast: 6000
};
const SLOTS = {
  title: "title",
  message: "message",
  link: "link"
};

const calciteAlertCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host([scale=s]){--calcite-alert-width:40em;--calcite-alert-spacing-token-small:0.5rem;--calcite-alert-spacing-token-large:0.75rem}:host([scale=s]) slot[name=title]::slotted(*),:host([scale=s]) *::slotted([slot=title]){font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=s]) slot[name=message]::slotted(*),:host([scale=s]) *::slotted([slot=message]){font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=s]) slot[name=link]::slotted(*),:host([scale=s]) *::slotted([slot=link]){font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=s]) .alert-queue-count{margin-left:0.5rem;margin-right:0.5rem}:host([scale=s]) .container{--calcite-alert-min-height:3.5rem}:host([scale=s]) .alert-close{padding:0.5rem}:host([scale=m]){--calcite-alert-width:50em;--calcite-alert-spacing-token-small:0.75rem;--calcite-alert-spacing-token-large:1rem}:host([scale=m]) slot[name=title]::slotted(*),:host([scale=m]) *::slotted([slot=title]){font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=m]) slot[name=message]::slotted(*),:host([scale=m]) *::slotted([slot=message]){font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) slot[name=link]::slotted(*),:host([scale=m]) *::slotted([slot=link]){font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) .alert-queue-count{margin-left:0.75rem;margin-right:0.75rem}:host([scale=m]) .container{--calcite-alert-min-height:4.1875rem}:host([scale=l]){--calcite-alert-width:60em;--calcite-alert-spacing-token-small:1rem;--calcite-alert-spacing-token-large:1.25rem}:host([scale=l]) slot[name=title]::slotted(*),:host([scale=l]) *::slotted([slot=title]){font-size:var(--calcite-font-size-1);line-height:1.375;margin-bottom:0.25rem}:host([scale=l]) slot[name=message]::slotted(*),:host([scale=l]) *::slotted([slot=message]){font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) slot[name=link]::slotted(*),:host([scale=l]) *::slotted([slot=link]){font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) .alert-queue-count{margin-left:1rem;margin-right:1rem}:host([scale=l]) .container{--calcite-alert-min-height:5.625rem}:host{display:block}:host .container{box-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);display:flex;position:fixed;justify-content:center;align-items:center;pointer-events:none;margin-top:0;margin-bottom:0;margin-left:auto;margin-right:auto;background-color:var(--calcite-ui-foreground-1);opacity:0;left:0;right:0;bottom:0;border-radius:var(--calcite-border-radius);border-top:0px solid transparent;border-left:1px solid var(--calcite-ui-border-3);border-right:1px solid var(--calcite-ui-border-3);border-bottom:1px solid var(--calcite-ui-border-3);min-height:var(--calcite-alert-min-height);width:var(--calcite-alert-width);max-width:90%;max-height:0;z-index:101;transform:translate3d(0, 1.5rem, 0);transition:300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), all 0.15s ease-in-out}@media only screen and (max-width: 860px){:host .container{width:100%;max-width:100%;border-radius:0}}.container{display:flex;width:100%;justify-content:center;align-items:center}.alert-close{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.alert-close:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}:host([active]) .container:not(.queued){opacity:1;max-height:100%;border-top-width:2px;transform:translate3d(0, -1.5rem, 0);pointer-events:initial}@media only screen and (max-width: 860px){:host([active]) .container:not(.queued){transform:translate3d(0, 0, 0)}}slot[name=title]::slotted(*),*::slotted([slot=title]){font-weight:var(--calcite-font-weight-medium);font-size:var(--calcite-font-size-0);line-height:1.375;color:var(--calcite-ui-text-1)}slot[name=message]::slotted(*),*::slotted([slot=message]){display:inline;margin:0;margin-right:0.5rem;font-weight:var(--calcite-font-weight-normal);font-size:var(--calcite-font-size--1);line-height:1.375;color:var(--calcite-ui-text-2)}slot[name=link]::slotted(*),*::slotted([slot=link]){color:var(--calcite-ui-text-link);display:inline-flex}.calcite--rtl slot[name=message]::slotted(*),.calcite--rtl *::slotted([slot=message]){margin-left:0.5rem;margin-right:unset}.alert-content{padding:var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-large);flex:0 0 auto;transition:all 0.15s ease-in-out;word-wrap:break-word;overflow-wrap:break-word;background-color:var(--calcite-ui-foreground-1);flex:1 1 auto;min-width:0;padding:var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-small) 0;border-bottom-left-radius:var(--calcite-border-radius);border-bottom-right-radius:var(--calcite-border-radius)}@media only screen and (max-width: 860px){.alert-content{padding:1rem}}.alert-content:first-of-type:not(:only-child){padding-left:var(--calcite-alert-spacing-token-large)}.alert-content:only-child{padding:var(--calcite-alert-spacing-token-small)}@media only screen and (max-width: 860px){.alert-content{padding:var(--calcite-alert-spacing-token-large) var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-large) 0}}.calcite--rtl .alert-content{padding:var(--calcite-alert-spacing-token-small) 0 var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-small)}.calcite--rtl .alert-content:first-of-type:not(:only-child){padding-right:var(--calcite-alert-spacing-token-large)}@media only screen and (max-width: 860px){.calcite--rtl .alert-content{padding:var(--calcite-alert-spacing-token-large) 0 var(--calcite-alert-spacing-token-large) var(--calcite-alert-spacing-token-small)}}.alert-icon{padding:var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-large);flex:0 0 auto;transition:all 0.15s ease-in-out;padding-top:0;padding-bottom:0;display:flex;align-self:stretch;align-items:center;background-color:var(--calcite-ui-foreground-1)}@media only screen and (max-width: 860px){.alert-icon{padding:1rem}}@media only screen and (min-width: 860px){.alert-icon{border-bottom-left-radius:var(--calcite-border-radius)}}.alert-close{padding:var(--calcite-alert-spacing-token-small) var(--calcite-alert-spacing-token-large);flex:0 0 auto;transition:all 0.15s ease-in-out;padding-top:0;padding-bottom:0;align-self:stretch;background-color:var(--calcite-ui-foreground-1);border-style:none;outline:2px solid transparent;outline-offset:2px;cursor:pointer;color:var(--calcite-ui-text-3);overflow:hidden;border-bottom-right-radius:var(--calcite-border-radius)}@media only screen and (max-width: 860px){.alert-close{padding:1rem}}.alert-close:hover,.alert-close:focus{color:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-2)}.alert-close:active{background-color:var(--calcite-ui-foreground-3)}@media only screen and (max-width: 860px){.alert-close{border-radius:0}}.calcite--rtl .alert-close{border-bottom-left-radius:var(--calcite-border-radius);border-bottom-right-radius:unset}.alert-queue-count{display:flex;align-items:center;justify-content:space-around;align-self:stretch;overflow:hidden;visibility:hidden;font-weight:var(--calcite-font-weight-medium);text-align:center;color:var(--calcite-ui-text-2);background-color:var(--calcite-ui-foreground-1);opacity:0;cursor:default;border-left:0px solid transparent;border-right:0px solid transparent;border-top-right-radius:0;transition:all 0.15s ease-in-out}.alert-queue-count.active{visibility:visible;opacity:1}@media only screen and (min-width: 860px){.alert-queue-count.active{border-bottom-right-radius:var(--calcite-border-radius)}}:host([auto-dismiss])>.alert-queue-count{border-right:0px solid transparent}:host([auto-dismiss]) .calcite--rtl>.alert-queue-count{border-left:0px solid transparent}.alert-dismiss-progress{display:block;position:absolute;left:0;right:0;width:100%;overflow:hidden;top:-2px;height:2px;z-index:103;border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}.alert-dismiss-progress:after{top:0;right:0;display:block;position:absolute;height:2px;content:\"\";background-color:var(--calcite-alert-dismiss-progress-background);z-index:104}.calcite--rtl .alert-dismiss-progress:after{left:0;right:initial}:host([color=blue]) .container{border-top-color:var(--calcite-ui-info)}:host([color=blue]) .container .alert-icon{color:var(--calcite-ui-info)}:host([color=red]) .container{border-top-color:var(--calcite-ui-danger)}:host([color=red]) .container .alert-icon{color:var(--calcite-ui-danger)}:host([color=yellow]) .container{border-top-color:var(--calcite-ui-warning)}:host([color=yellow]) .container .alert-icon{color:var(--calcite-ui-warning)}:host([color=green]) .container{border-top-color:var(--calcite-ui-success)}:host([color=green]) .container .alert-icon{color:var(--calcite-ui-success)}:host([auto-dismiss-duration=fast]) .alert-dismiss-progress:after{-webkit-animation:dismissProgress 6000ms ease-out;animation:dismissProgress 6000ms ease-out}:host([auto-dismiss-duration=medium]) .alert-dismiss-progress:after{-webkit-animation:dismissProgress 10000ms ease-out;animation:dismissProgress 10000ms ease-out}:host([auto-dismiss-duration=slow]) .alert-dismiss-progress:after{-webkit-animation:dismissProgress 14000ms ease-out;animation:dismissProgress 14000ms ease-out}@-webkit-keyframes dismissProgress{0%{width:0;opacity:0.75}100%{width:100%;opacity:1}}@keyframes dismissProgress{0%{width:0;opacity:0.75}100%{width:100%;opacity:1}}";

const CalciteAlert = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteAlertClose = createEvent(this, "calciteAlertClose", 7);
    this.calciteAlertOpen = createEvent(this, "calciteAlertOpen", 7);
    this.calciteAlertSync = createEvent(this, "calciteAlertSync", 7);
    this.calciteAlertRegister = createEvent(this, "calciteAlertRegister", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //---------------------------------------------------------------------------
    /** Is the alert currently active or not */
    this.active = false;
    /** Close the alert automatically (recommended for passive, non-blocking alerts) */
    this.autoDismiss = false;
    /** Duration of autoDismiss (only used with `autoDismiss`) */
    this.autoDismissDuration = this.autoDismiss ? "medium" : null;
    /** Color for the alert (will apply to top border and icon) */
    this.color = "blue";
    /** string to override English close text
     * @default "Close"
     */
    this.intlClose = TEXT.intlClose;
    /** specify the scale of the button, defaults to m */
    this.scale = "m";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    /** the list of queued alerts */
    this.queue = [];
    /** the count of queued alerts */
    this.queueLength = 0;
    /** is the alert queued */
    this.queued = false;
    /** close and emit the closed alert and the queue */
    this.closeAlert = () => {
      this.queued = false;
      this.active = false;
      this.queue = this.queue.filter((e) => e !== this.el);
      this.determineActiveAlert();
      this.calciteAlertSync.emit({ queue: this.queue });
      this.calciteAlertClose.emit({
        el: this.el,
        queue: this.queue
      });
    };
  }
  watchActive() {
    if (this.active && !this.queued) {
      this.calciteAlertRegister.emit();
    }
    if (!this.active) {
      this.queue = this.queue.filter((e) => e !== this.el);
      this.calciteAlertSync.emit({ queue: this.queue });
    }
  }
  updateRequestedIcon() {
    this.requestedIcon = setRequestedIcon(StatusIcons, this.icon, this.color);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    if (this.active && !this.queued) {
      this.calciteAlertRegister.emit();
    }
  }
  componentWillLoad() {
    this.requestedIcon = setRequestedIcon(StatusIcons, this.icon, this.color);
  }
  componentDidLoad() {
    this.alertLinkEl = this.el.querySelectorAll("calcite-link")[0];
  }
  render() {
    const dir = getElementDir(this.el);
    const closeButton = (h("button", { "aria-label": this.intlClose, class: "alert-close", onClick: this.closeAlert, ref: (el) => (this.closeButton = el), type: "button" }, h("calcite-icon", { icon: "x", scale: this.scale === "l" ? "m" : "s" })));
    const queueText = `+${this.queueLength > 2 ? this.queueLength - 1 : 1}`;
    const queueCount = (h("div", { class: `${this.queueLength > 1 ? "active " : ""}alert-queue-count` }, h("calcite-chip", { scale: this.scale, value: queueText }, queueText)));
    const { active, autoDismiss, label, queued, requestedIcon } = this;
    const progress = h("div", { class: "alert-dismiss-progress" });
    const role = autoDismiss ? "alert" : "alertdialog";
    const hidden = !active;
    return (h(Host, { "aria-hidden": hidden.toString(), "aria-label": label, "calcite-hydrated-hidden": hidden, role: role }, h("div", { class: {
        container: true,
        queued,
        [CSS_UTILITY.rtl]: dir === "rtl"
      } }, requestedIcon ? (h("div", { class: "alert-icon" }, h("calcite-icon", { icon: requestedIcon, scale: this.scale === "l" ? "m" : "s" }))) : null, h("div", { class: "alert-content" }, h("slot", { name: SLOTS.title }), h("slot", { name: SLOTS.message }), h("slot", { name: SLOTS.link })), queueCount, !autoDismiss ? closeButton : null, active && !queued && autoDismiss ? progress : null)));
  }
  // when an alert is opened or closed, update queue and determine active alert
  alertSync(event) {
    if (this.queue !== event.detail.queue) {
      this.queue = event.detail.queue;
    }
    this.queueLength = this.queue.length;
    this.determineActiveAlert();
  }
  // when an alert is first registered, trigger a queue sync to get queue
  alertRegister() {
    if (this.active && !this.queue.includes(this.el)) {
      this.queued = true;
      this.queue.push(this.el);
    }
    this.calciteAlertSync.emit({ queue: this.queue });
    this.determineActiveAlert();
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    if (!this.closeButton && !this.alertLinkEl) {
      return;
    }
    else if (this.alertLinkEl) {
      this.alertLinkEl.setFocus();
    }
    else if (this.closeButton) {
      this.closeButton.focus();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /** determine which alert is active */
  determineActiveAlert() {
    var _a;
    if (((_a = this.queue) === null || _a === void 0 ? void 0 : _a[0]) === this.el) {
      this.openAlert();
      clearTimeout(this.autoDismissTimeout);
      if (this.autoDismiss) {
        this.autoDismissTimeout = window.setTimeout(() => this.closeAlert(), DURATIONS[this.autoDismissDuration]);
      }
    }
    else {
      return;
    }
  }
  /** emit the opened alert and the queue */
  openAlert() {
    clearTimeout(this.queueTimeout);
    this.queueTimeout = window.setTimeout(() => (this.queued = false), 300);
    this.calciteAlertOpen.emit({
      el: this.el,
      queue: this.queue
    });
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "active": ["watchActive"],
    "icon": ["updateRequestedIcon"],
    "color": ["updateRequestedIcon"]
  }; }
};
CalciteAlert.style = calciteAlertCss;

export { CalciteAlert as calcite_alert };
