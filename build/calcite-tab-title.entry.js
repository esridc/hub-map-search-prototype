import { r as registerInstance, e as createEvent, k as Build, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { g as guid } from './guid-9ad8042d.js';
import { g as getElementProp, a as getElementDir, C as CSS_UTILITY } from './dom-35210035.js';
import { g as getKey } from './key-4c5a210a.js';
import { c as createObserver } from './observers-93f01172.js';

const calciteTabTitleCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;flex:0 1 auto;outline:2px solid transparent;outline-offset:2px;margin-right:1.25rem;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:1.25rem;margin-inline-end:1.25rem}:host([layout=center]){text-align:center;margin-top:0;margin-bottom:0;margin-left:1.25rem;margin-right:1.25rem;flex-basis:12rem}:host([position=below]) a{border-bottom-width:0;border-top-width:2px;border-top-color:transparent;border-top-style:solid}:host a{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus) a{outline:2px solid var(--calcite-ui-brand);outline-offset:2px}:host(:active) a,:host(:focus) a,:host(:hover) a{text-decoration:none;color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-border-2)}:host([active]) a{color:var(--calcite-ui-text-1);border-color:transparent}:host([disabled]){pointer-events:none}:host([disabled]) span,:host([disabled]) a{pointer-events:none;opacity:0.5}:host([scale=s]){-webkit-margin-end:1rem;margin-inline-end:1rem}:host([scale=s]) a,:host([scale=s]) span{font-size:var(--calcite-font-size--2);line-height:1rem;padding-top:0.25rem;padding-bottom:0.25rem}:host([scale=m]) a,:host([scale=m]) span{font-size:var(--calcite-font-size--1);line-height:1rem;padding-top:0.5rem;padding-bottom:0.5rem}:host([scale=l]){-webkit-margin-end:1.5rem;margin-inline-end:1.5rem}:host([scale=l]) a,:host([scale=l]) span{font-size:var(--calcite-font-size-0);line-height:1.25rem;padding-top:0.75rem;padding-bottom:0.75rem}a,span{box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-bottom-width:2px;border-bottom-color:transparent;width:100%;height:100%;display:flex;justify-content:center;color:var(--calcite-ui-text-3);font-size:var(--calcite-font-size--1);line-height:1rem;transition-property:all;transition-duration:150ms;transition-timing-function:ease-in-out;transition-delay:0s;padding-left:0;padding-right:0;padding-top:0.5rem;padding-bottom:0.5rem;border-bottom-style:solid}span{cursor:default}.calcite-tab-title--icon{display:inline-flex;position:relative;margin:0;align-self:center}.calcite-tab-title--icon svg{transition-property:all;transition-duration:150ms;transition-timing-function:ease-in-out;transition-delay:0s}.container--has-text .calcite-tab-title--icon.icon-start{margin-right:0.5rem}.container--has-text .calcite-tab-title--icon.icon-end{margin-left:0.5rem}:host([icon-start][icon-end]) .calcite-tab-title--icon:first-child{margin-right:0.5rem}.container--has-text.calcite--rtl .calcite-tab-title--icon.icon-end{margin-left:0;margin-right:0.5rem}.container--has-text.calcite--rtl .calcite-tab-title--icon.icon-start{margin-left:0.5rem;margin-right:0}:host([icon-start][icon-end]) .calcite--rtl .calcite-tab-title--icon:first-child{margin-left:0.5rem;margin-right:0}:host([bordered]){-webkit-margin-end:0;margin-inline-end:0}:host([bordered][active]){box-shadow:inset 0px -2px var(--calcite-ui-foreground-1)}:host([bordered][active][position=below]){box-shadow:inset 0 2px 0 var(--calcite-ui-foreground-1)}:host([bordered]:hover) a,:host([bordered]:focus) a,:host([bordered]:active) a{position:relative}:host([bordered]:hover) a{background-color:var(--calcite-button-transparent-hover);transition-property:all;transition-duration:150ms;transition-timing-function:ease-in-out;transition-delay:0s}:host([bordered]) a{border-bottom-style:unset}:host([bordered][position=below]) a{border-top-style:unset}:host([active][bordered]) a{border-left:1px solid var(--calcite-ui-border-1);border-right:1px solid var(--calcite-ui-border-1)}:host([bordered]) a,:host([bordered]) span{padding-left:0.75rem;padding-right:0.75rem}:host([bordered][scale=s]) a,:host([bordered][scale=s]) span{padding-left:0.5rem;padding-right:0.5rem}:host([bordered][scale=l]) a,:host([bordered][scale=l]) span{padding-left:1rem;padding-right:1rem}";

const CalciteTabTitle = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteTabsActivate = createEvent(this, "calciteTabsActivate", 7);
    this.calciteTabsFocusNext = createEvent(this, "calciteTabsFocusNext", 7);
    this.calciteTabsFocusPrevious = createEvent(this, "calciteTabsFocusPrevious", 7);
    this.calciteTabTitleRegister = createEvent(this, "calciteTabTitleRegister", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** Show this tab title as selected */
    this.active = false;
    /** Disable this tab title  */
    this.disabled = false;
    /** @internal Parent tabs component bordered value */
    this.bordered = false;
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    /** watches for changing text content **/
    this.mutationObserver = createObserver("mutation", () => this.updateHasText());
    /** determine if there is slotted text for styling purposes */
    this.hasText = false;
    /**
     * @internal
     */
    this.guid = `calcite-tab-title-${guid()}`;
  }
  activeTabChanged() {
    if (this.active) {
      this.emitActiveTab();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.setupTextContentObserver();
    this.parentTabNavEl = this.el.closest("calcite-tab-nav");
    this.parentTabsEl = this.el.closest("calcite-tabs");
  }
  disconnectedCallback() {
    var _a, _b;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    // Dispatching to body in order to be listened by other elements that are still connected to the DOM.
    (_b = document.body) === null || _b === void 0 ? void 0 : _b.dispatchEvent(new CustomEvent("calciteTabTitleUnregister", {
      detail: this.el
    }));
  }
  componentWillLoad() {
    if (Build.isBrowser) {
      this.updateHasText();
    }
    if (this.tab && this.active) {
      this.emitActiveTab();
    }
  }
  componentWillRender() {
    if (this.parentTabsEl) {
      this.layout = this.parentTabsEl.layout;
      this.position = this.parentTabsEl.position;
      this.scale = this.parentTabsEl.scale;
      this.bordered = this.parentTabsEl.bordered;
    }
    // handle case when tab-nav is only parent
    if (!this.parentTabsEl && this.parentTabNavEl) {
      this.position = getElementProp(this.parentTabNavEl, "position", this.position);
      this.scale = getElementProp(this.parentTabNavEl, "scale", this.scale);
    }
  }
  render() {
    const dir = getElementDir(this.el);
    const id = this.el.id || this.guid;
    const Tag = this.disabled ? "span" : "a";
    const showSideBorders = this.bordered && !this.disabled && this.layout !== "center";
    const iconStartEl = (h("calcite-icon", { class: "calcite-tab-title--icon icon-start", dir: dir, flipRtl: this.iconFlipRtl === "start" || this.iconFlipRtl === "both", icon: this.iconStart, scale: "s" }));
    const iconEndEl = (h("calcite-icon", { class: "calcite-tab-title--icon icon-end", dir: dir, flipRtl: this.iconFlipRtl === "end" || this.iconFlipRtl === "both", icon: this.iconEnd, scale: "s" }));
    return (h(Host, { "aria-controls": this.controls, "aria-expanded": this.active.toString(), id: id, role: "tab", tabindex: this.disabled ? "-1" : "0" }, h(Tag, { class: {
        container: true,
        "container--has-text": this.hasText,
        [CSS_UTILITY.rtl]: dir === "rtl"
      }, style: showSideBorders && { width: `${this.parentTabNavEl.indicatorWidth}px` } }, this.iconStart ? iconStartEl : null, h("slot", null), this.iconEnd ? iconEndEl : null)));
  }
  async componentDidLoad() {
    this.calciteTabTitleRegister.emit(await this.getTabIdentifier());
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  tabChangeHandler(event) {
    if (this.parentTabNavEl === event.target) {
      if (this.tab) {
        this.active = this.tab === event.detail.tab;
      }
      else {
        this.getTabIndex().then((index) => {
          this.active = index === event.detail.tab;
        });
      }
    }
  }
  onClick() {
    this.emitActiveTab();
  }
  keyDownHandler(e) {
    switch (getKey(e.key)) {
      case " ":
      case "Enter":
        this.emitActiveTab();
        e.preventDefault();
        break;
      case "ArrowRight":
        if (getElementDir(this.el) === "ltr") {
          this.calciteTabsFocusNext.emit();
        }
        else {
          this.calciteTabsFocusPrevious.emit();
        }
        break;
      case "ArrowLeft":
        if (getElementDir(this.el) === "ltr") {
          this.calciteTabsFocusPrevious.emit();
        }
        else {
          this.calciteTabsFocusNext.emit();
        }
        break;
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Return the index of this title within the nav
   */
  async getTabIndex() {
    return Array.prototype.indexOf.call(this.el.parentElement.querySelectorAll("calcite-tab-title"), this.el);
  }
  /**
   * @internal
   */
  async getTabIdentifier() {
    return this.tab ? this.tab : this.getTabIndex();
  }
  /**
   * @internal
   */
  async updateAriaInfo(tabIds = [], titleIds = []) {
    this.controls = tabIds[titleIds.indexOf(this.el.id)] || null;
  }
  updateHasText() {
    this.hasText = this.el.textContent.trim().length > 0;
  }
  setupTextContentObserver() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
  }
  emitActiveTab() {
    if (!this.disabled) {
      this.calciteTabsActivate.emit({
        tab: this.tab
      });
    }
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "active": ["activeTabChanged"]
  }; }
};
CalciteTabTitle.style = calciteTabTitleCss;

export { CalciteTabTitle as calcite_tab_title };
