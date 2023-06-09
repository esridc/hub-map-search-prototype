import { r as registerInstance, e as createEvent, h, g as getElement } from './index-d836c4a8.js';
import { b as getSlotted, a as getElementDir, C as CSS_UTILITY } from './dom-35210035.js';
import { g as guid } from './guid-9ad8042d.js';

const CSS = {
  title: "title",
  close: "close",
  chipImageContainer: "chip-image-container",
  calciteChipIcon: "calcite-chip--icon"
};
const TEXT = {
  close: "Close"
};
const SLOTS = {
  image: "image"
};
const ICONS = {
  close: "x"
};

const calciteChipCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host([scale=s]){height:1.5rem;font-size:var(--calcite-font-size--2);--calcite-chip-spacing-unit-l:0.5rem;--calcite-chip-spacing-unit-s:0.25rem}:host([scale=s]) .chip-image-container{height:1.25rem;width:1.25rem}:host([scale=m]){height:2rem;font-size:var(--calcite-font-size--1);--calcite-chip-spacing-unit-l:0.75rem;--calcite-chip-spacing-unit-s:6px}:host([scale=m]) .chip-image-container{height:1.5rem;width:1.5rem;padding-left:0.25rem}:host([scale=l]){height:2.75rem;font-size:var(--calcite-font-size-0);--calcite-chip-spacing-unit-l:1rem;--calcite-chip-spacing-unit-s:0.5rem}:host([scale=l]) .chip-image-container{height:2rem;width:2rem;padding-left:0.25rem}:host([scale=m]) .calcite--rtl .chip-image-container{padding-left:0;padding-right:0.25rem}:host([scale=l]) .calcite--rtl .chip-image-container{padding-left:0;padding-right:0.25rem}:host{display:inline-flex;align-items:center;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-1);color:var(--calcite-ui-text-1);font-weight:var(--calcite-font-weight-medium);cursor:default;border-radius:9999px;box-sizing:border-box;--calcite-chip-button-border-radius:0 50px 50px 0}.container{display:inline-flex;align-items:center;height:100%;max-width:100%}.title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.calcite--rtl{text-align:right;--calcite-chip-button-border-radius:50px 0 0 50px}:host span{padding:0 var(--calcite-chip-spacing-unit-l)}:host([dismissible]) span{padding:0 var(--calcite-chip-spacing-unit-s) 0 var(--calcite-chip-spacing-unit-l)}:host([dismissible]) .calcite--rtl span{padding:0 var(--calcite-chip-spacing-unit-l) 0 var(--calcite-chip-spacing-unit-s)}:host([icon]:not([dismissible])) span{padding:0 var(--calcite-chip-spacing-unit-l)}:host([icon]:not([dismissible])) .calcite--rtl span{padding:0 var(--calcite-chip-spacing-unit-l)}:host button{margin:0;background-color:transparent;outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;display:inline-flex;min-height:100%;max-height:100%;align-self:stretch;align-items:center;border-style:none;cursor:pointer;transition-property:all;transition-duration:150ms;transition-timing-function:ease-in-out;transition-delay:0s;color:var(--calcite-ui-text-1);-webkit-appearance:none;border-radius:var(--calcite-chip-button-border-radius);padding:0 var(--calcite-chip-spacing-unit-s);color:inherit;--calcite-chip-transparent-hover:var(--calcite-button-transparent-hover);--calcite-chip-transparent-press:var(--calcite-button-transparent-press)}:host button:hover{background-color:var(--calcite-chip-transparent-hover)}:host button:focus{background-color:var(--calcite-chip-transparent-hover);outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}:host button:active{background-color:var(--calcite-chip-transparent-press)}.chip-image-container{border-radius:50%;overflow:hidden;display:inline-flex}:host slot[name=image]::slotted(*){display:flex;height:100%;width:100%;border-radius:50%;overflow:hidden}.calcite-chip--icon{display:inline-flex;position:relative;margin-top:0;margin-bottom:0;margin-right:0;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);margin-left:var(--calcite-chip-spacing-unit-l);border-radius:var(--calcite-chip-button-border-radius)}.calcite--rtl .calcite-chip--icon{margin-top:0;margin-bottom:0;margin-left:0;margin-right:var(--calcite-chip-spacing-unit-l)}:host([color=blue][appearance=solid]){border-color:transparent;background-color:var(--calcite-ui-info);color:var(--calcite-ui-text-inverse)}:host([color=red][appearance=solid]){border-color:transparent;background-color:var(--calcite-ui-danger);color:var(--calcite-ui-text-inverse)}:host([color=yellow][appearance=solid]){border-color:transparent;background-color:var(--calcite-ui-warning);color:#151515}:host([color=green][appearance=solid]){border-color:transparent;background-color:var(--calcite-ui-success);color:#151515}:host([color=grey][appearance=solid]){border-color:transparent;background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}:host([color=grey][appearance=solid]) button,:host([color=grey][appearance=solid]) calcite-icon{color:var(--calcite-ui-text-3)}:host([color=blue][appearance=clear]){border-color:var(--calcite-ui-info)}:host([color=blue][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-info)}:host([color=red][appearance=clear]){border-color:var(--calcite-ui-danger)}:host([color=red][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-danger)}:host([color=yellow][appearance=clear]){border-color:var(--calcite-ui-warning)}:host([color=yellow][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-warning)}:host([color=green][appearance=clear]){border-color:var(--calcite-ui-success)}:host([color=green][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-success)}:host([color=grey][appearance=clear]){border-color:var(--calcite-ui-border-1)}:host([color=grey][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-text-3)}";

const CalciteChip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteChipDismiss = createEvent(this, "calciteChipDismiss", 7);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /** specify the appearance style of the button, defaults to solid. */
    this.appearance = "solid";
    /** specify the color of the button, defaults to blue */
    this.color = "grey";
    /** Optionally show a button the user can click to dismiss the chip */
    this.dismissible = false;
    /** Aria label for the "x" button
     * @default "Close"
     */
    this.dismissLabel = TEXT.close;
    /** flip the icon in rtl */
    this.iconFlipRtl = false;
    /** specify the scale of the chip, defaults to m */
    this.scale = "m";
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.closeClickHandler = (event) => {
      event.preventDefault();
      this.calciteChipDismiss.emit(this.el);
    };
    this.guid = guid();
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    var _a;
    (_a = this.closeButton) === null || _a === void 0 ? void 0 : _a.focus();
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  renderChipImage() {
    const { el } = this;
    const hasChipImage = getSlotted(el, SLOTS.image);
    return hasChipImage ? (h("div", { class: CSS.chipImageContainer }, h("slot", { name: SLOTS.image }))) : null;
  }
  render() {
    const dir = getElementDir(this.el);
    const iconEl = (h("calcite-icon", { class: CSS.calciteChipIcon, dir: dir, flipRtl: this.iconFlipRtl, icon: this.icon, scale: "s" }));
    const closeButton = (h("button", { "aria-describedby": this.guid, "aria-label": this.dismissLabel, class: CSS.close, onClick: this.closeClickHandler, ref: (el) => (this.closeButton = el) }, h("calcite-icon", { icon: ICONS.close, scale: "s" })));
    return (h("div", { class: { container: true, [CSS_UTILITY.rtl]: dir === "rtl" } }, this.renderChipImage(), this.icon ? iconEl : null, h("span", { class: CSS.title, id: this.guid }, h("slot", null)), this.dismissible ? closeButton : null));
  }
  get el() { return getElement(this); }
};
CalciteChip.style = calciteChipCss;

export { CalciteChip as calcite_chip };
