import { r as registerInstance, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { s as setRequestedIcon, g as getElementProp, a as getElementDir, C as CSS_UTILITY } from './dom-35210035.js';
import './guid-9ad8042d.js';

var StatusIconDefaults;
(function (StatusIconDefaults) {
  StatusIconDefaults["valid"] = "check-circle";
  StatusIconDefaults["invalid"] = "exclamation-mark-triangle";
  StatusIconDefaults["idle"] = "information";
})(StatusIconDefaults || (StatusIconDefaults = {}));

const calciteInputMessageCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host([active][scale=m]),:host([active][scale=l]){--calcite-input-message-spacing-value:0.25rem}:host{display:flex;align-items:center;width:100%;box-sizing:border-box;color:var(--calcite-ui-text-1);font-weight:var(--calcite-font-weight-medium);visibility:hidden;height:0;pointer-events:none;opacity:0;transition-property:all;transition-duration:150ms;transition-timing-function:ease-in-out;transition-delay:0s}:host([active]){height:auto;visibility:visible;opacity:1;transition-property:all;transition-duration:150ms;transition-timing-function:ease-in-out;transition-delay:0s}:host([active][scale=m]),:host([active][scale=l]){margin-top:var(--calcite-input-message-spacing-value)}.calcite-input-message-icon{display:inline-flex;flex-shrink:0;pointer-events:none;margin-right:0.5rem;transition-property:all;transition-duration:150ms;transition-timing-function:ease-in-out;transition-delay:0s}.calcite-input-message-icon.calcite--rtl{margin-left:0.5rem;margin-right:0}:host([status=invalid]) .calcite-input-message-icon{color:var(--calcite-ui-danger)}:host([status=warning]) .calcite-input-message-icon{color:var(--calcite-ui-warning)}:host([status=valid]) .calcite-input-message-icon{color:var(--calcite-ui-success)}:host([status=idle]) .calcite-input-message-icon{color:var(--calcite-ui-brand)}:host([status][active]){color:var(--calcite-ui-text-1);font-weight:var(--calcite-font-weight-medium)}:host([status][active][scale=s]){font-size:var(--calcite-font-size--3);line-height:0.75rem}:host([status][active][scale=m]){font-size:var(--calcite-font-size--2);line-height:1rem;margin-top:0.25rem}:host([status][active][scale=l]){font-size:var(--calcite-font-size--1);line-height:1rem;margin-top:0.25rem}";

const CalciteInputMessage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** Indicates whether the message is displayed. */
    this.active = false;
    /** specify the scale of the input, defaults to m */
    this.scale = "m";
    /** specify the status of the input field, determines message and icons */
    this.status = "idle";
  }
  handleIconEl() {
    this.requestedIcon = setRequestedIcon(StatusIconDefaults, this.icon, this.status);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.status = getElementProp(this.el, "status", this.status);
    this.scale = getElementProp(this.el, "scale", this.scale);
    this.requestedIcon = setRequestedIcon(StatusIconDefaults, this.icon, this.status);
  }
  render() {
    const hidden = !this.active;
    return (h(Host, { "calcite-hydrated-hidden": hidden }, this.renderIcon(this.requestedIcon), h("slot", null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  renderIcon(iconName) {
    if (iconName) {
      const dir = getElementDir(this.el);
      return (h("calcite-icon", { class: { ["calcite-input-message-icon"]: true, [CSS_UTILITY.rtl]: dir === "rtl" }, icon: iconName, scale: "s" }));
    }
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "status": ["handleIconEl"],
    "icon": ["handleIconEl"]
  }; }
};
CalciteInputMessage.style = calciteInputMessageCss;

export { CalciteInputMessage as calcite_input_message };
