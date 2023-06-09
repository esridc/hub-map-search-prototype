import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { a as getElementDir, g as getElementProp } from './dom-35210035.js';
import { c as createObserver } from './observers-93f01172.js';
import './guid-9ad8042d.js';

const SLOTS = {
  input: "input"
};
const CSS = {
  radioGroupItemIcon: "radio-group-item-icon"
};

const calciteRadioGroupItemCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;align-self:stretch;cursor:pointer;font-weight:var(--calcite-font-weight-normal);transition:background-color 0.1s ease-in-out, border-color 0.1s ease-in-out}:host label{display:flex;flex:1 1 0%;color:var(--calcite-ui-text-3);box-sizing:border-box;pointer-events:none;align-items:center;margin:0.125rem;transition:background-color 0.1s ease-in-out, border-color 0.1s ease-in-out}.label--horizontal{justify-content:center}:host{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus){outline:2px solid var(--calcite-ui-brand);outline-offset:-2px;outline-offset:-1px}.label--scale-s{font-size:var(--calcite-font-size--2);line-height:1rem;padding-left:0.5rem;padding-right:0.5rem;padding-top:0.125rem;padding-bottom:0.125rem}.label--scale-m{font-size:var(--calcite-font-size--1);line-height:1rem;padding-left:0.75rem;padding-right:0.75rem;padding-top:0.375rem;padding-bottom:0.375rem}.label--scale-l{font-size:var(--calcite-font-size-0);line-height:1.25rem;padding-left:1rem;padding-right:1rem;padding-top:0.625rem;padding-bottom:0.625rem}:host(:hover) label{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}:host(:active) label{background-color:var(--calcite-ui-foreground-3)}:host([checked]) label{background-color:var(--calcite-ui-brand);border-color:var(--calcite-ui-brand);cursor:default;color:var(--calcite-ui-background)}:host([checked]) .label--outline{background-color:var(--calcite-ui-foreground-1);border-color:var(--calcite-ui-brand);box-shadow:inset 0 0 0 1px var(--calcite-ui-brand);color:var(--calcite-ui-brand)}::slotted(input){display:none}.radio-group-item-icon{display:inline-flex;position:relative;margin:0;transition-property:all;transition-duration:150ms;transition-timing-function:ease-in-out;transition-delay:0s;line-height:inherit}:host([icon-position=start]) .label--scale-s .radio-group-item-icon{-webkit-margin-end:0.5rem;margin-inline-end:0.5rem}:host([icon-position=end]) .label--scale-s .radio-group-item-icon{-webkit-margin-end:unset;margin-inline-end:unset;-webkit-margin-start:0.5rem;margin-inline-start:0.5rem}:host([icon-position=start]) .label--scale-m .radio-group-item-icon{-webkit-margin-end:0.75rem;margin-inline-end:0.75rem}:host([icon-position=end]) .label--scale-m .radio-group-item-icon{-webkit-margin-end:unset;margin-inline-end:unset;-webkit-margin-start:0.75rem;margin-inline-start:0.75rem}:host([icon-position=start]) .label--scale-l .radio-group-item-icon{-webkit-margin-end:1rem;margin-inline-end:1rem}:host([icon-position=end]) .label--scale-l .radio-group-item-icon{-webkit-margin-end:unset;margin-inline-end:unset;-webkit-margin-start:1rem;margin-inline-start:1rem}";

const CalciteRadioGroupItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteRadioGroupItemChange = createEvent(this, "calciteRadioGroupItemChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** Indicates whether the control is checked. */
    this.checked = false;
    /** flip the icon in rtl */
    this.iconFlipRtl = false;
    /** optionally used with icon, select where to position the icon */
    this.iconPosition = "start";
    this.mutationObserver = createObserver("mutation", () => this.syncFromExternalInput());
  }
  handleCheckedChange() {
    this.calciteRadioGroupItemChange.emit();
    this.syncToExternalInput();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    var _a;
    const inputProxy = this.el.querySelector(`input[slot=${SLOTS.input}]`);
    if (inputProxy) {
      this.value = inputProxy.value;
      this.checked = inputProxy.checked;
      (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(inputProxy, { attributes: true });
    }
    this.inputProxy = inputProxy;
  }
  disconnectedCallback() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  componentWillLoad() {
    // only use default slot content in browsers that support shadow dom
    // or if ie11 has no label provided (#374)
    const label = this.el.querySelector("label");
    this.useFallback = !label || label.textContent === "";
  }
  render() {
    const { checked, useFallback, value } = this;
    const dir = getElementDir(this.el);
    const scale = getElementProp(this.el, "scale", "m");
    const appearance = getElementProp(this.el, "appearance", "solid");
    const layout = getElementProp(this.el, "layout", "horizontal");
    const iconEl = (h("calcite-icon", { class: CSS.radioGroupItemIcon, dir: dir, flipRtl: this.iconFlipRtl, icon: this.icon, scale: "s" }));
    return (h(Host, { "aria-checked": checked.toString(), role: "radio" }, h("label", { class: {
        "label--scale-s": scale === "s",
        "label--scale-m": scale === "m",
        "label--scale-l": scale === "l",
        "label--horizontal": layout === "horizontal",
        "label--outline": appearance === "outline"
      } }, this.icon && this.iconPosition === "start" ? iconEl : null, h("slot", null, useFallback ? value : ""), h("slot", { name: SLOTS.input }), this.icon && this.iconPosition === "end" ? iconEl : null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  syncFromExternalInput() {
    if (this.inputProxy) {
      this.value = this.inputProxy.value;
      this.checked = this.inputProxy.checked;
    }
  }
  syncToExternalInput() {
    if (!this.inputProxy) {
      return;
    }
    this.inputProxy.value = this.value;
    if (this.checked) {
      this.inputProxy.setAttribute("checked", "");
    }
    else {
      this.inputProxy.removeAttribute("checked");
    }
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "checked": ["handleCheckedChange"]
  }; }
};
CalciteRadioGroupItem.style = calciteRadioGroupItemCss;

export { CalciteRadioGroupItem as calcite_radio_group_item };
