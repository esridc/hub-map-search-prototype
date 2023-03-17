import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { f as focusElement, h as hasLabel, a as getElementDir, C as CSS_UTILITY } from './dom-35210035.js';
import { h as hiddenInputStyle } from './form-4e89e2ad.js';
import { g as guid } from './guid-9ad8042d.js';
import { g as getKey } from './key-4c5a210a.js';

const calciteSwitchCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host([scale=s]) .container{height:0.75rem}:host([scale=s]) .track{width:1.5rem;height:0.75rem}:host([scale=s]) .handle{width:0.5rem;height:0.5rem}:host([scale=m]) .container{height:1rem}:host([scale=m]) .track{width:2rem;height:1rem}:host([scale=m]) .handle{width:0.75rem;height:0.75rem}:host([scale=l]) .container{height:1.5rem}:host([scale=l]) .track{width:3rem;height:1.5rem}:host([scale=l]) .handle{width:1.25rem;height:1.25rem}:host{display:inline-block;position:relative;width:auto;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle;tap-highlight-color:transparent}:host([disabled]){opacity:var(--calcite-ui-opacity-disabled);pointer-events:none;cursor:default}:host{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;width:auto}:host(:focus){outline:2px solid var(--calcite-ui-brand);outline-offset:2px}.track{position:relative;display:inline-block;vertical-align:top;background-color:var(--calcite-ui-foreground-2);border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-2);box-sizing:border-box;pointer-events:none;transition-property:all;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);border-radius:9999px}.handle{position:absolute;display:block;right:auto;background-color:var(--calcite-ui-foreground-1);border-width:2px;border-style:solid;border-color:var(--calcite-ui-border-input);transition-property:all;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);border-radius:9999px;pointer-events:none;top:-1px;left:-1px}:host(:hover) .handle,:host(:focus) .handle{border-color:var(--calcite-ui-brand);box-shadow:inset 0 0 0 1px var(--calcite-ui-brand)}:host([switched]) .track{background-color:var(--calcite-ui-brand);border-color:var(--calcite-ui-brand-hover)}:host([switched]) .handle{left:auto;border-color:var(--calcite-ui-brand);right:-1px}:host([switched]:hover) .track{background-color:var(--calcite-ui-brand);border-color:var(--calcite-ui-brand-hover)}:host([switched]:hover) .handle{border-color:var(--calcite-ui-brand-hover);box-shadow:inset 0 0 0 1px var(--calcite-ui-brand-hover)}.calcite--rtl .handle{left:auto;right:-1px}:host([switched]) .calcite--rtl .handle{right:auto;left:-1px}:host([switched]:active) .calcite--rtl .handle{right:auto;left:-1px}:host([switched]:focus) .calcite--rtl .handle{right:auto;left:-1px}";

const CalciteSwitch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteSwitchChange = createEvent(this, "calciteSwitchChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** True if the switch is disabled */
    this.disabled = false;
    /** The scale of the switch */
    this.scale = "m";
    /** True if the switch is initially on */
    this.switched = false;
    //--------------------------------------------------------------------------
    //
    //  Private Properties
    //
    //--------------------------------------------------------------------------
    this.inputEl = document.createElement("input");
  }
  disabledWatcher(newDisabled) {
    this.inputEl.disabled = newDisabled;
    this.tabindex = newDisabled ? -1 : 0;
  }
  nameChanged(newName) {
    this.inputEl.name = newName;
  }
  switchedWatcher(newSwitched) {
    this.inputEl.checked = newSwitched;
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    focusElement(this.inputEl);
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  setupInput() {
    this.switched && this.inputEl.setAttribute("checked", "");
    this.inputEl.disabled = this.disabled;
    this.inputEl.id = `${this.guid}-input`;
    this.inputEl.name = this.name;
    this.inputEl.style.cssText = hiddenInputStyle;
    this.inputEl.type = "checkbox";
    if (this.value) {
      this.inputEl.value = this.value != null ? this.value.toString() : "";
    }
    this.el.appendChild(this.inputEl);
  }
  toggle() {
    this.switched = !this.switched;
    this.calciteSwitchChange.emit({
      switched: this.switched
    });
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  handleLabelFocus(e) {
    if (!this.disabled &&
      !this.el.contains(e.detail.interactedEl) &&
      hasLabel(e.detail.labelEl, this.el)) {
      this.el.focus();
    }
    else {
      return;
    }
  }
  onClick(e) {
    // prevent duplicate click events that occur
    // when the component is wrapped in a label and checkbox is clicked
    if ((!this.disabled && this.el.closest("label") && e.target === this.inputEl) ||
      (!this.el.closest("label") && e.target === this.el)) {
      this.toggle();
    }
  }
  keyDownHandler(e) {
    const key = getKey(e.key);
    if (!this.disabled && (key === " " || key === "Enter")) {
      this.toggle();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    this.guid = this.el.id || `calcite-switch-${guid()}`;
    this.tabindex = this.el.getAttribute("tabindex") || this.disabled ? -1 : 0;
    this.setupInput();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const dir = getElementDir(this.el);
    return (h(Host, { tabindex: this.tabindex }, h("div", { "aria-checked": this.switched.toString(), class: { container: true, [CSS_UTILITY.rtl]: dir === "rtl" } }, h("div", { class: "track" }, h("div", { class: "handle" })))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "disabled": ["disabledWatcher"],
    "name": ["nameChanged"],
    "switched": ["switchedWatcher"]
  }; }
};
CalciteSwitch.style = calciteSwitchCss;

export { CalciteSwitch as calcite_switch };
