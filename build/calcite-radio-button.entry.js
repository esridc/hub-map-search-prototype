import { r as registerInstance, e as createEvent, h, g as getElement } from './index-d836c4a8.js';
import { g as guid } from './guid-9ad8042d.js';
import { f as focusElement, d as closestElementCrossShadowBoundary } from './dom-35210035.js';
import { h as hiddenInputStyle } from './form-4e89e2ad.js';

const CSS = {
  container: "calcite-radio-button__container"
};

const calciteRadioButtonCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}.sc-calcite-radio-button:root{--calcite-animation-timing:300ms}.calcite-animate.sc-calcite-radio-button{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in.sc-calcite-radio-button{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down.sc-calcite-radio-button{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up.sc-calcite-radio-button{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale.sc-calcite-radio-button{-webkit-animation-name:in-scale;animation-name:in-scale}.sc-calcite-radio-button:root{--calcite-popper-transition:150ms ease-in-out}[hidden].sc-calcite-radio-button-h{display:none}.sc-calcite-radio-button-h{cursor:pointer;display:block}.sc-calcite-radio-button-h .calcite-radio-button__container.sc-calcite-radio-button{position:relative}[disabled].sc-calcite-radio-button-h{cursor:pointer}";

const CalciteRadioButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteRadioButtonChange = createEvent(this, "calciteRadioButtonChange", 7);
    this.calciteRadioButtonCheckedChange = createEvent(this, "calciteRadioButtonCheckedChange", 7);
    this.calciteRadioButtonFocusedChange = createEvent(this, "calciteRadioButtonFocusedChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** The checked state of the radio button. */
    this.checked = false;
    /** The disabled state of the radio button. */
    this.disabled = false;
    /**
     * The focused state of the radio button.
     * @internal
     */
    this.focused = false;
    /** The radio button's hidden status.  When a radio button is hidden it is not focusable or checkable. */
    this.hidden = false;
    /**
     * The hovered state of the radio button.
     * @internal
     */
    this.hovered = false;
    /** Requires that a value is selected for the radio button group before the parent form will submit. */
    this.required = false;
    /** The scale (size) of the radio button. `scale` is passed as a property automatically from `calcite-radio-button-group`. */
    this.scale = "m";
    this.setInputEl = (el) => {
      this.inputEl = el;
    };
    this.formResetHandler = () => {
      var _a;
      this.checked = this.initialChecked;
      this.initialChecked && ((_a = this.inputEl) === null || _a === void 0 ? void 0 : _a.setAttribute("checked", ""));
    };
    this.hideInputEl = () => {
      this.inputEl.style.cssText = hiddenInputStyle;
    };
    this.onInputBlur = () => {
      this.focused = false;
      this.calciteRadioButtonFocusedChange.emit();
    };
    this.onInputFocus = () => {
      this.focused = true;
      this.calciteRadioButtonFocusedChange.emit();
    };
  }
  checkedChanged(newChecked) {
    if (newChecked) {
      this.uncheckOtherRadioButtonsInGroup();
    }
    if (this.inputEl) {
      this.inputEl.checked = newChecked;
    }
    this.calciteRadioButtonCheckedChange.emit(newChecked);
  }
  disabledChanged(disabled) {
    this.inputEl.disabled = disabled;
  }
  focusedChanged(focused) {
    if (!this.inputEl) {
      return;
    }
    if (focused && !this.el.hasAttribute("hidden")) {
      this.inputEl.focus();
    }
    else {
      this.inputEl.blur();
    }
  }
  hiddenChanged(newHidden) {
    this.inputEl.hidden = newHidden;
  }
  nameChanged(newName) {
    if (this.name === newName) {
      return;
    }
    if (this.inputEl) {
      this.inputEl.name = newName;
    }
    this.checkLastRadioButton();
    const currentValue = this.rootNode.querySelector(`input[name="${this.name}"]:checked`);
    if (!(currentValue === null || currentValue === void 0 ? void 0 : currentValue.value)) {
      this.uncheckAllRadioButtonsInGroup();
    }
  }
  requiredChanged(required) {
    this.inputEl.required = required;
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
  checkLastRadioButton() {
    const radioButtons = Array.from(this.rootNode.querySelectorAll("calcite-radio-button")).filter((radioButton) => radioButton.name === this.name);
    const checkedRadioButtons = radioButtons.filter((radioButton) => radioButton.checked);
    if ((checkedRadioButtons === null || checkedRadioButtons === void 0 ? void 0 : checkedRadioButtons.length) > 1) {
      const lastCheckedRadioButton = checkedRadioButtons[checkedRadioButtons.length - 1];
      checkedRadioButtons
        .filter((checkedRadioButton) => checkedRadioButton !== lastCheckedRadioButton)
        .forEach((checkedRadioButton) => {
        checkedRadioButton.checked = false;
        checkedRadioButton.emitCheckedChange();
      });
    }
  }
  /** @internal */
  async emitCheckedChange() {
    this.calciteRadioButtonCheckedChange.emit();
  }
  uncheckAllRadioButtonsInGroup() {
    const otherRadioButtons = Array.from(this.rootNode.querySelectorAll("calcite-radio-button")).filter((radioButton) => radioButton.name === this.name);
    otherRadioButtons.forEach((otherRadioButton) => {
      if (otherRadioButton.checked) {
        otherRadioButton.checked = false;
        otherRadioButton.focused = false;
      }
    });
  }
  uncheckOtherRadioButtonsInGroup() {
    const otherRadioButtons = Array.from(this.rootNode.querySelectorAll("calcite-radio-button")).filter((radioButton) => radioButton.name === this.name && radioButton.guid !== this.guid);
    otherRadioButtons.forEach((otherRadioButton) => {
      if (otherRadioButton.checked) {
        otherRadioButton.checked = false;
        otherRadioButton.focused = false;
      }
    });
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  check(event) {
    // Prevent parent label from clicking the first radio when calcite-radio-button is clicked
    if (this.el.closest("label") && event.composedPath().includes(this.el)) {
      event.preventDefault();
    }
    if (!this.disabled && !this.hidden) {
      this.uncheckOtherRadioButtonsInGroup();
      this.checked = true;
      this.focused = true;
      this.calciteRadioButtonChange.emit();
    }
  }
  mouseenter() {
    this.hovered = true;
  }
  mouseleave() {
    this.hovered = false;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.rootNode = this.el.getRootNode();
    this.guid = this.el.id || `calcite-radio-button-${guid()}`;
    this.initialChecked = this.checked;
    if (this.name) {
      this.checkLastRadioButton();
    }
    const form = closestElementCrossShadowBoundary(this.el, "form");
    if (form) {
      form.addEventListener("reset", this.formResetHandler);
    }
  }
  componentDidLoad() {
    this.hideInputEl();
    if (this.focused) {
      this.inputEl.focus();
    }
  }
  disconnectedCallback() {
    const form = closestElementCrossShadowBoundary(this.el, "form");
    if (form) {
      form.removeEventListener("reset", this.formResetHandler);
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    var _a;
    const value = (_a = this.value) === null || _a === void 0 ? void 0 : _a.toString();
    return (h("div", { class: CSS.container }, h("input", { "aria-label": this.label || null, checked: this.checked, disabled: this.disabled, hidden: this.hidden, id: `${this.guid}-input`, name: this.name, onBlur: this.onInputBlur, onFocus: this.onInputFocus, ref: this.setInputEl, required: this.required, type: "radio", value: value }), h("calcite-radio", { checked: this.checked, disabled: this.disabled, focused: this.focused, hidden: this.hidden, hovered: this.hovered, scale: this.scale })));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "checked": ["checkedChanged"],
    "disabled": ["disabledChanged"],
    "focused": ["focusedChanged"],
    "hidden": ["hiddenChanged"],
    "name": ["nameChanged"],
    "required": ["requiredChanged"]
  }; }
};
CalciteRadioButton.style = calciteRadioButtonCss;

export { CalciteRadioButton as calcite_radio_button };
