import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-d836c4a8.js';

const calciteRadioButtonGroupCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;max-width:100vw}:host([layout=horizontal]){flex-direction:row;flex-wrap:wrap}:host([layout=horizontal][scale=s]){grid-gap:1rem;gap:1rem}:host([layout=horizontal][scale=m]){grid-gap:1.25rem;gap:1.25rem}:host([layout=horizontal][scale=l]){grid-gap:1.5rem;gap:1.5rem}:host([layout=vertical]){flex-direction:column}";

const CalciteRadioButtonGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteRadioButtonGroupChange = createEvent(this, "calciteRadioButtonGroupChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** The disabled state of the radio button group. */
    this.disabled = false;
    /** The radio button group's hidden status.  When a radio button group is hidden none of its options are focusable or checkable. */
    this.hidden = false;
    /** The layout direction of the radio buttons in a group. */
    this.layout = "horizontal";
    /** Requires that a value is selected for the radio button group before the parent form will submit. */
    this.required = false;
    /** The scale (size) of the radio button group. */
    this.scale = "m";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.passPropsToRadioButtons = () => {
      const radioButtons = this.el.querySelectorAll("calcite-radio-button");
      if (radioButtons.length > 0) {
        radioButtons.forEach((radioButton) => {
          radioButton.disabled = this.disabled || radioButton.disabled;
          radioButton.hidden = this.hidden;
          radioButton.name = this.name;
          radioButton.required = this.required;
          radioButton.scale = this.scale;
        });
      }
    };
  }
  onDisabledChange() {
    this.passPropsToRadioButtons();
  }
  onHiddenChange() {
    this.passPropsToRadioButtons();
  }
  onLayoutChange() {
    this.passPropsToRadioButtons();
  }
  onScaleChange() {
    this.passPropsToRadioButtons();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.passPropsToRadioButtons();
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  radioButtonChangeHandler(event) {
    this.calciteRadioButtonGroupChange.emit(event.target.value);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return (h(Host, { role: "radiogroup" }, h("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "disabled": ["onDisabledChange"],
    "hidden": ["onHiddenChange"],
    "layout": ["onLayoutChange"],
    "scale": ["onScaleChange"]
  }; }
};
CalciteRadioButtonGroup.style = calciteRadioButtonGroupCss;

export { CalciteRadioButtonGroup as calcite_radio_button_group };
