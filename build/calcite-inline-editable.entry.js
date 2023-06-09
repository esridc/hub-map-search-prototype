import { r as registerInstance, e as createEvent, h, g as getElement } from './index-d836c4a8.js';
import { g as getElementProp } from './dom-35210035.js';
import './guid-9ad8042d.js';

const CSS = {
  wrapper: "calcite-inline-editable__wrapper",
  confirmChangesButton: "calcite-inline-editable__confirm-changes-button",
  cancelEditingButton: "calcite-inline-editable__cancel-editing-button",
  inputWrapper: "calcite-inline-editable__input-wrapper",
  cancelEditingButtonWrapper: "calcite-inline-editable__cancel-editing-button-wrapper",
  enableEditingButton: "calcite-inline-editable__enable-editing-button",
  controlsWrapper: "calcite-inline-editable__controls-wrapper"
};
const TEXT = {
  intlEnablingEditing: "Click to edit",
  intlCancelEditing: "Cancel",
  intlConfirmChanges: "Save"
};

const calciteInlineEditableCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}.sc-calcite-inline-editable:root{--calcite-animation-timing:300ms}.calcite-animate.sc-calcite-inline-editable{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in.sc-calcite-inline-editable{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down.sc-calcite-inline-editable{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up.sc-calcite-inline-editable{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale.sc-calcite-inline-editable{-webkit-animation-name:in-scale;animation-name:in-scale}.sc-calcite-inline-editable:root{--calcite-popper-transition:150ms ease-in-out}[hidden].sc-calcite-inline-editable-h{display:none}[scale=s].sc-calcite-inline-editable-h .calcite-inline-editable__controls-wrapper.sc-calcite-inline-editable{height:1.5rem}[scale=m].sc-calcite-inline-editable-h .calcite-inline-editable__controls-wrapper.sc-calcite-inline-editable{height:2rem}[scale=l].sc-calcite-inline-editable-h .calcite-inline-editable__controls-wrapper.sc-calcite-inline-editable{height:2.75rem}.sc-calcite-inline-editable-h:not([editing-enabled]):not([disabled]) .calcite-inline-editable__wrapper.sc-calcite-inline-editable:hover{background-color:var(--calcite-ui-foreground-2)}.calcite-inline-editable__wrapper.sc-calcite-inline-editable{box-sizing:border-box;display:flex;justify-content:space-between;background-color:var(--calcite-ui-foreground-1);transition-property:all;transition-duration:150ms;transition-timing-function:ease-in-out;transition-delay:0s}.calcite-inline-editable__wrapper.sc-calcite-inline-editable .calcite-inline-editable__input-wrapper.sc-calcite-inline-editable{flex:1 1 0%}.calcite-inline-editable__controls-wrapper.sc-calcite-inline-editable{display:flex}[disabled].sc-calcite-inline-editable-h .calcite-inline-editable__cancel-editing-button-wrapper.sc-calcite-inline-editable{border-color:var(--calcite-ui-border-2)}.sc-calcite-inline-editable-h.sc-calcite-inline-editable-s .calcite-input__element-wrapper textarea,.sc-calcite-inline-editable-h.sc-calcite-inline-editable-s .calcite-input__element-wrapper input{transition-property:all;transition-duration:150ms;transition-timing-function:ease-in-out;transition-delay:0s}.sc-calcite-inline-editable-h:not([editing-enabled]).sc-calcite-inline-editable-s .calcite-input__element-wrapper{background-color:transparent}.sc-calcite-inline-editable-h:not([editing-enabled]).sc-calcite-inline-editable-s .sc-calcite-input{display:none}.sc-calcite-inline-editable-h:not([editing-enabled]).sc-calcite-inline-editable-s .calcite-input__element-wrapper{display:flex;cursor:pointer}.sc-calcite-inline-editable-h:not([editing-enabled]).sc-calcite-inline-editable-s .calcite-input__element-wrapper textarea,.sc-calcite-inline-editable-h:not([editing-enabled]).sc-calcite-inline-editable-s .calcite-input__element-wrapper input{display:flex;cursor:pointer;padding-left:0;border-color:transparent}.sc-calcite-inline-editable-h:not([editing-enabled]):not([disabled]):hover.sc-calcite-inline-editable-s textarea,.sc-calcite-inline-editable-h:not([editing-enabled]):not([disabled]):hover.sc-calcite-inline-editable-s input{background-color:var(--calcite-ui-foreground-2)}.sc-calcite-inline-editable-h[dir=rtl]:not([editing-enabled]).sc-calcite-inline-editable-s .calcite-input__element-wrapper textarea,.sc-calcite-inline-editable-h[dir=rtl]:not([editing-enabled]).sc-calcite-inline-editable-s .calcite-input__element-wrapper input{padding-left:unset;padding-right:0}[dir=rtl] .sc-calcite-inline-editable-h:not([editing-enabled]).sc-calcite-inline-editable-s .calcite-input__element-wrapper textarea,[dir=rtl] .sc-calcite-inline-editable-h:not([editing-enabled]).sc-calcite-inline-editable-s .calcite-input__element-wrapper input{padding-left:unset;padding-right:0}";

const CalciteInlineEditable = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteInlineEditableEditingCancel = createEvent(this, "calciteInlineEditableEditingCancel", 7);
    this.calciteInlineEditableChangesConfirm = createEvent(this, "calciteInlineEditableChangesConfirm", 7);
    this.calciteInlineEditableEnableEditingChange = createEvent(this, "calciteInlineEditableEnableEditingChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Props
    //
    //--------------------------------------------------------------------------
    /** specify whether editing can be enabled */
    this.disabled = false;
    /** specify whether the wrapped input element is editable, defaults to false */
    this.editingEnabled = false;
    /** specify whether the confirm button should display a loading state, defaults to false */
    this.loading = false;
    /** specify whether save/cancel controls should be displayed when editingEnabled is true, defaults to false */
    this.controls = false;
    /** specify text to be user for the enable editing button's aria-label, defaults to `Click to edit`
     * @default "Click to edit"
     */
    this.intlEnableEditing = TEXT.intlEnablingEditing;
    /** specify text to be user for the cancel editing button's aria-label, defaults to `Cancel`
     * @default "Cancel"
     */
    this.intlCancelEditing = TEXT.intlCancelEditing;
    /** specify text to be user for the confirm changes button's aria-label, defaults to `Save`
     * @default "Save"
     */
    this.intlConfirmChanges = TEXT.intlConfirmChanges;
    this.editingCancelTransitionProp = "border-top-color";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.transitionEnd = (event) => {
      if (!this.editingEnabled && event.propertyName === this.editingCancelTransitionProp) {
        this.calciteInlineEditableEditingCancel.emit(event);
      }
    };
    this.enableEditing = () => {
      this.htmlInput.tabIndex = undefined;
      this.valuePriorToEditing = this.inputElement.value;
      this.editingEnabled = true;
      this.inputElement.setFocus();
      this.calciteInlineEditableEnableEditingChange.emit();
    };
    this.disableEditing = () => {
      this.htmlInput.tabIndex = -1;
      this.editingEnabled = false;
    };
    this.cancelEditingEnd = () => {
      this.enableEditingButton.setFocus();
      this.el.removeEventListener("calciteInlineEditableEditingCancel", this.cancelEditingEnd);
    };
    this.cancelEditing = () => {
      this.inputElement.value = this.valuePriorToEditing;
      this.el.addEventListener("calciteInlineEditableEditingCancel", this.cancelEditingEnd);
      this.disableEditing();
    };
    this.escapeKeyHandler = async (e) => {
      if (e.key !== "Escape") {
        return;
      }
      this.cancelEditing();
    };
    this.cancelEditingHandler = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.cancelEditing();
    };
    this.enableEditingHandler = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.disabled) {
        return;
      }
      if (!this.editingEnabled) {
        this.enableEditing();
      }
    };
    this.confirmChangesHandler = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.calciteInlineEditableChangesConfirm.emit();
      try {
        if (this.afterConfirm) {
          this.loading = true;
          await this.afterConfirm();
          this.disableEditing();
        }
      }
      catch (e) {
      }
      finally {
        this.loading = false;
      }
    };
  }
  disabledWatcher(disabled) {
    this.inputElement.disabled = disabled;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    this.inputElement = this.el.querySelector("calcite-input");
    this.inputElement.disabled = this.disabled;
    this.scale =
      this.scale || this.inputElement.scale || getElementProp(this.el, "scale", undefined);
  }
  componentDidLoad() {
    this.htmlInput = this.inputElement.querySelector("input");
    if (!this.editingEnabled) {
      this.htmlInput.tabIndex = -1;
    }
  }
  render() {
    return (h("div", { class: CSS.wrapper, onClick: this.enableEditingHandler, onKeyDown: this.escapeKeyHandler, onTransitionEnd: this.transitionEnd }, h("div", { class: CSS.inputWrapper }, h("slot", null)), h("div", { class: CSS.controlsWrapper }, !this.editingEnabled && (h("calcite-button", { appearance: "transparent", class: CSS.enableEditingButton, color: "neutral", disabled: this.disabled, iconStart: "pencil", label: this.intlEnableEditing, onClick: this.enableEditingHandler, ref: (el) => (this.enableEditingButton = el), scale: this.scale })), this.shouldShowControls && [
      h("div", { class: CSS.cancelEditingButtonWrapper }, h("calcite-button", { appearance: "transparent", class: CSS.cancelEditingButton, color: "neutral", disabled: this.disabled, iconStart: "x", label: this.intlCancelEditing, onClick: this.cancelEditingHandler, scale: this.scale })),
      h("calcite-button", { appearance: "solid", class: CSS.confirmChangesButton, color: "blue", disabled: this.disabled, iconStart: "check", label: this.intlConfirmChanges, loading: this.loading, onClick: this.confirmChangesHandler, scale: this.scale })
    ])));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  blurHandler() {
    if (!this.controls) {
      this.disableEditing();
    }
  }
  handleLabelFocus(e) {
    const htmlTarget = e.target;
    if (!(htmlTarget.parentElement.tagName === "LABEL" ||
      htmlTarget.parentElement.tagName === "CALCITE-LABEL")) {
      return;
    }
    if (!htmlTarget.parentElement.contains(this.el)) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (this.editingEnabled) {
      this.inputElement.setFocus();
    }
    else {
      this.enableEditingButton.setFocus();
    }
  }
  get shouldShowControls() {
    return this.editingEnabled && this.controls;
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "disabled": ["disabledWatcher"]
  }; }
};
CalciteInlineEditable.style = calciteInlineEditableCss;

export { CalciteInlineEditable as calcite_inline_editable };
