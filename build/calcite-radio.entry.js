import { r as registerInstance, h } from './index-d836c4a8.js';

const calciteRadioCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block}:host .radio{background-color:var(--calcite-ui-foreground-1);border-radius:9999px;cursor:pointer;transition-property:all;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);box-shadow:inset 0 0 0 1px var(--calcite-ui-border-input)}:host([hovered]) .radio,:host(:not([checked])[focused]) .radio{box-shadow:inset 0 0 0 2px var(--calcite-ui-brand)}:host([disabled]) .radio{cursor:default;opacity:var(--calcite-ui-opacity-disabled)}:host([hovered][disabled]) .radio{box-shadow:inset 0 0 0 1px var(--calcite-ui-border-input)}:host([scale=s]){--calcite-radio-size:var(--calcite-font-size--2)}:host([scale=m]){--calcite-radio-size:var(--calcite-font-size--1)}:host([scale=l]){--calcite-radio-size:var(--calcite-font-size-0)}.radio{height:var(--calcite-radio-size);max-width:var(--calcite-radio-size);min-width:var(--calcite-radio-size)}:host([scale=s][checked]) .radio,:host([hovered][scale=s][checked][disabled]) .radio{box-shadow:inset 0 0 0 4px var(--calcite-ui-brand)}:host([scale=s][focused][checked]) .radio{box-shadow:inset 0 0 0 4px var(--calcite-ui-brand), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-brand)}:host([scale=m][checked]) .radio,:host([hovered][scale=m][checked][disabled]) .radio{box-shadow:inset 0 0 0 5px var(--calcite-ui-brand)}:host([scale=m][focused][checked]) .radio{box-shadow:inset 0 0 0 5px var(--calcite-ui-brand), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-brand)}:host([scale=l][checked]) .radio,:host([hovered][scale=l][checked][disabled]) .radio{box-shadow:inset 0 0 0 6px var(--calcite-ui-brand)}:host([scale=l][focused][checked]) .radio{box-shadow:inset 0 0 0 6px var(--calcite-ui-brand), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-brand)}:host([hidden]){display:none}";

const CalciteRadio = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** The checked state of the radio. */
    this.checked = false;
    /** The disabled state of the radio. */
    this.disabled = false;
    /**
     * The focused state of the radio.
     * @internal
     */
    this.focused = false;
    /** The radio's hidden status. */
    this.hidden = false;
    /**
     * The hovered state of the radio.
     * @internal
     */
    this.hovered = false;
    /** The scale (size) of the radio. */
    this.scale = "m";
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return h("div", { class: "radio" });
  }
};
CalciteRadio.style = calciteRadioCss;

export { CalciteRadio as calcite_radio };
