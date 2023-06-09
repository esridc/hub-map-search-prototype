import { r as registerInstance, e as createEvent, h, g as getElement } from './index-d836c4a8.js';
import { a as getElementDir } from './dom-35210035.js';
import './guid-9ad8042d.js';

const CSS = {
  container: "split-button__container",
  dividerContainer: "split-button__divider-container",
  divider: "split-button__divider",
  widthAuto: "width-auto",
  widthHalf: "width-half",
  widthFull: "width-full"
};

const calciteSplitButtonCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host .split-button__container{display:flex;align-items:stretch}:host .split-button__container>calcite-dropdown>calcite-button{height:100%;vertical-align:top}:host([appearance=solid]):host([color=blue]){--calcite-split-button-background:var(--calcite-ui-brand);--calcite-split-button-divider:var(--calcite-ui-foreground-1)}:host([appearance=solid]):host([color=red]){--calcite-split-button-background:var(--calcite-ui-danger);--calcite-split-button-divider:var(--calcite-ui-foreground-1)}:host([appearance=solid]):host([color=neutral]){--calcite-split-button-background:var(--calcite-ui-foreground-3);--calcite-split-button-divider:var(--calcite-ui-text-1)}:host([appearance=solid]):host([color=inverse]){--calcite-split-button-background:var(--calcite-ui-inverse);--calcite-split-button-divider:var(--calcite-ui-foreground-1)}:host([appearance=transparent]):host([color=blue]){--calcite-split-button-divider:var(--calcite-ui-brand)}:host([appearance=transparent]):host([color=red]){--calcite-split-button-divider:var(--calcite-ui-danger)}:host([appearance=transparent]):host([color=neutral]){--calcite-split-button-divider:var(--calcite-ui-text-1)}:host([appearance=transparent]):host([color=inverse]){--calcite-split-button-divider:var(--calcite-ui-foreground-1)}:host([appearance=clear]),:host([appearance=transparent]){--calcite-split-button-background:transparent}:host([appearance=outline]){--calcite-split-button-background:var(--calcite-ui-foreground-1)}:host([appearance=clear]):host([color=blue]),:host([appearance=outline]):host([color=blue]){--calcite-split-button-divider:var(--calcite-ui-brand)}:host([appearance=clear]):host([color=red]),:host([appearance=outline]):host([color=red]){--calcite-split-button-divider:var(--calcite-ui-danger)}:host([appearance=clear]):host([color=neutral]),:host([appearance=outline]):host([color=neutral]){--calcite-split-button-divider:var(--calcite-ui-foreground-3)}:host([appearance=clear]):host([color=inverse]),:host([appearance=outline]):host([color=inverse]){--calcite-split-button-divider:var(--calcite-ui-inverse)}.width-auto{width:auto}.width-half{width:50%}.width-full{width:100%}.split-button__divider-container{width:1px;display:flex;align-items:stretch;transition:0.15s ease-in-out;background-color:var(--calcite-split-button-background)}.split-button__divider{width:1px;margin-top:0.25rem;margin-bottom:0.25rem;display:inline-block;background-color:var(--calcite-split-button-divider)}:host([appearance=outline]) .split-button__divider-container,:host([appearance=clear]) .split-button__divider-container{border-top:1px solid var(--calcite-split-button-divider);border-bottom:1px solid var(--calcite-split-button-divider)}:host([appearance=outline]):hover .split-button__divider-container,:host([appearance=clear]):hover .split-button__divider-container{background-color:var(--calcite-split-button-divider)}:host([appearance=outline]:hover) .split-button__divider-container,:host([appearance=clear]:hover) .split-button__divider-container{background-color:var(--calcite-split-button-divider)}:host([appearance=outline]:focus-within):host([color=blue]),:host([appearance=clear]:focus-within):host([color=blue]){--calcite-split-button-divider:var(--calcite-ui-brand-press)}:host([appearance=outline]:focus-within):host([color=red]),:host([appearance=clear]:focus-within):host([color=red]){--calcite-split-button-divider:var(--calcite-ui-danger-press)}:host([appearance=outline]:focus-within) .split-button__divider-container,:host([appearance=clear]:focus-within) .split-button__divider-container{background-color:var(--calcite-split-button-divider)}:host([disabled]) .split-button__divider-container{opacity:var(--calcite-ui-opacity-disabled)}:host([disabled]) calcite-dropdown>calcite-button{pointer-events:none}";

const CalciteSplitButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteSplitButtonPrimaryClick = createEvent(this, "calciteSplitButtonPrimaryClick", 7);
    this.calciteSplitButtonSecondaryClick = createEvent(this, "calciteSplitButtonSecondaryClick", 7);
    /** specify the appearance style of the button, defaults to solid. */
    this.appearance = "solid";
    /** specify the color of the control, defaults to blue */
    this.color = "blue";
    /** is the control disabled  */
    this.disabled = false;
    /**
     * Is the dropdown currently active or not
     * @internal
     */
    this.active = false;
    /** specify the icon used for the dropdown menu, defaults to chevron */
    this.dropdownIconType = "chevron";
    /** optionally add a calcite-loader component to the control,
     disabling interaction. with the primary button */
    this.loading = false;
    /** specify the scale of the control, defaults to m */
    this.scale = "m";
    /** specify the width of the button, defaults to auto */
    this.width = "auto";
    this.calciteSplitButtonPrimaryClickHandler = (e) => this.calciteSplitButtonPrimaryClick.emit(e);
    this.calciteSplitButtonSecondaryClickHandler = (e) => this.calciteSplitButtonSecondaryClick.emit(e);
  }
  render() {
    const dir = getElementDir(this.el);
    const widthClasses = {
      [CSS.container]: true,
      [CSS.widthAuto]: this.width === "auto",
      [CSS.widthHalf]: this.width === "half",
      [CSS.widthFull]: this.width === "full"
    };
    const buttonWidth = this.width === "auto" ? "auto" : "full";
    return (h("div", { class: widthClasses, dir: dir }, h("calcite-button", { appearance: this.appearance, color: this.color, dir: dir, disabled: this.disabled, "icon-end": this.primaryIconEnd ? this.primaryIconEnd : null, "icon-start": this.primaryIconStart ? this.primaryIconStart : null, iconFlipRtl: this.primaryIconFlipRtl ? this.primaryIconFlipRtl : null, label: this.primaryLabel, loading: this.loading, onClick: this.calciteSplitButtonPrimaryClickHandler, scale: this.scale, splitChild: "primary", width: buttonWidth }, this.primaryText), h("div", { class: CSS.dividerContainer }, h("div", { class: CSS.divider })), h("calcite-dropdown", { active: this.active, dir: dir, onClick: this.calciteSplitButtonSecondaryClickHandler, placement: "bottom-trailing", scale: this.scale, width: this.scale }, h("calcite-button", { appearance: this.appearance, color: this.color, dir: dir, disabled: this.disabled, "icon-start": this.dropdownIcon, label: this.dropdownLabel, scale: this.scale, slot: "dropdown-trigger", splitChild: "secondary" }), h("slot", null))));
  }
  get dropdownIcon() {
    return this.dropdownIconType === "chevron"
      ? "chevronDown"
      : this.dropdownIconType === "caret"
        ? "caretDown"
        : this.dropdownIconType === "ellipsis"
          ? "ellipsis"
          : "handle-vertical";
  }
  get el() { return getElement(this); }
};
CalciteSplitButton.style = calciteSplitButtonCss;

export { CalciteSplitButton as calcite_split_button };
