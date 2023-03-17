import { r as registerInstance, e as createEvent, h, g as getElement } from './index-d836c4a8.js';
import { g as guid } from './guid-9ad8042d.js';
import { f as focusElement, d as closestElementCrossShadowBoundary } from './dom-35210035.js';
import { h as hiddenInputStyle } from './form-4e89e2ad.js';

const calciteCheckboxCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host([scale=s]){--calcite-checkbox-size:0.75rem}:host([scale=m]){--calcite-checkbox-size:var(--calcite-font-size--1)}:host([scale=l]){--calcite-checkbox-size:1rem}:host{display:inline-flex;cursor:pointer;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}:host .check-svg{overflow:hidden;display:block;background-color:var(--calcite-ui-foreground-1);pointer-events:none;box-sizing:border-box;transition-property:all;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);width:var(--calcite-checkbox-size);height:var(--calcite-checkbox-size);box-shadow:inset 0 0 0 1px var(--calcite-ui-border-input);fill:var(--calcite-ui-background)}:host ::slotted(input){width:var(--calcite-checkbox-size);height:var(--calcite-checkbox-size)}:host(:hover) .check-svg,:host([hovered]) .check-svg{box-shadow:inset 0 0 0 2px var(--calcite-ui-brand)}:host([checked]) .check-svg,:host([indeterminate]) .check-svg{background-color:var(--calcite-ui-brand);box-shadow:0 0 0 1px var(--calcite-ui-brand)}:host .focused .check-svg{box-shadow:inset 0 0 0 1px var(--calcite-ui-brand), 0 0 0 2px var(--calcite-ui-foreground-1), 0 0 0 4px var(--calcite-ui-brand);transition:150ms ease-in-out}:host([disabled]){cursor:default;opacity:var(--calcite-ui-opacity-disabled);pointer-events:none}";

const CalciteCheckbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteCheckboxChange = createEvent(this, "calciteCheckboxChange", 7);
    this.calciteCheckboxFocusedChange = createEvent(this, "calciteCheckboxFocusedChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** The checked state of the checkbox. */
    this.checked = false;
    /** True if the checkbox is disabled */
    this.disabled = false;
    /**
     * The hovered state of the checkbox.
     * @internal
     */
    this.hovered = false;
    /**
     * True if the checkbox is initially indeterminate,
     * which is independent from its checked state
     * https://css-tricks.com/indeterminate-checkboxes/
     * */
    this.indeterminate = false;
    /** The name of the checkbox input */
    this.name = "";
    /** specify the scale of the checkbox, defaults to m */
    this.scale = "m";
    //--------------------------------------------------------------------------
    //
    //  Private Properties
    //
    //--------------------------------------------------------------------------
    this.checkedPath = "M5.5 12L2 8.689l.637-.636L5.5 10.727l8.022-7.87.637.637z";
    this.indeterminatePath = "M13 8v1H3V8z";
    //--------------------------------------------------------------------------
    //
    //  State
    //
    //--------------------------------------------------------------------------
    /** The focused state of the checkbox. */
    this.focused = false;
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.getPath = () => this.indeterminate ? this.indeterminatePath : this.checked ? this.checkedPath : "";
    this.toggle = () => {
      if (!this.disabled) {
        this.checked = !this.checked;
        focusElement(this.input);
        this.indeterminate = false;
        this.calciteCheckboxChange.emit();
      }
    };
    this.formResetHandler = () => {
      this.checked = this.initialChecked;
    };
    this.nativeLabelClickHandler = ({ target }) => {
      if (!this.el.closest("calcite-label") &&
        target.nodeName === "LABEL" &&
        target.parentNode.nodeName !== "CALCITE-LABEL" &&
        this.el.id &&
        target.htmlFor === this.el.id) {
        this.toggle();
      }
    };
  }
  checkedWatcher(newChecked) {
    this.input.checked = newChecked;
  }
  disabledChanged(disabled) {
    this.input.disabled = disabled;
  }
  nameChanged(newName) {
    this.input.name = newName;
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    focusElement(this.input);
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  onClick(event) {
    // This line prevents double-triggering when wrapped inside either a <label> or a <calcite-label>
    // by preventing the browser default behavior, which is to click the label's first input child element
    if (event.target === this.el) {
      event.preventDefault();
    }
    this.toggle();
  }
  mouseenter() {
    this.hovered = true;
  }
  mouseleave() {
    this.hovered = false;
  }
  onInputBlur() {
    this.focused = false;
    this.calciteCheckboxFocusedChange.emit(false);
  }
  onInputFocus() {
    this.focused = true;
    this.calciteCheckboxFocusedChange.emit(true);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.guid = this.el.id || `calcite-checkbox-${guid()}`;
    this.initialChecked = this.checked;
    this.renderHiddenCheckboxInput();
    const form = closestElementCrossShadowBoundary(this.el, "form");
    if (form) {
      form.addEventListener("reset", this.formResetHandler);
    }
    document.addEventListener("click", this.nativeLabelClickHandler);
  }
  disconnectedCallback() {
    this.input.parentNode.removeChild(this.input);
    const form = closestElementCrossShadowBoundary(this.el, "form");
    if (form) {
      form.removeEventListener("reset", this.formResetHandler);
    }
    document.removeEventListener("click", this.nativeLabelClickHandler);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderHiddenCheckboxInput() {
    this.input = document.createElement("input");
    this.checked && this.input.setAttribute("checked", "");
    this.input.disabled = this.disabled;
    this.input.id = `${this.guid}-input`;
    this.input.name = this.name;
    this.input.onblur = this.onInputBlur.bind(this);
    this.input.onfocus = this.onInputFocus.bind(this);
    this.input.style.cssText = hiddenInputStyle;
    this.input.type = "checkbox";
    if (this.label) {
      this.input.setAttribute("aria-label", this.label);
    }
    else {
      this.input.removeAttribute("aria-label");
    }
    if (this.value) {
      this.input.value = this.value != null ? this.value.toString() : "";
    }
    this.el.appendChild(this.input);
  }
  render() {
    return (h("div", { class: { focused: this.focused } }, h("svg", { class: "check-svg", viewBox: "0 0 16 16" }, h("path", { d: this.getPath() })), h("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "checked": ["checkedWatcher"],
    "disabled": ["disabledChanged"],
    "name": ["nameChanged"]
  }; }
};
CalciteCheckbox.style = calciteCheckboxCss;

export { CalciteCheckbox as calcite_checkbox };
