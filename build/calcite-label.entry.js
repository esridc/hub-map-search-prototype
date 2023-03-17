import { r as registerInstance, e as createEvent, h, g as getElement } from './index-d836c4a8.js';
import { q as queryElementRoots, a as getElementDir, C as CSS_UTILITY } from './dom-35210035.js';
import './guid-9ad8042d.js';

const calciteLabelCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}.sc-calcite-label:root{--calcite-animation-timing:300ms}.calcite-animate.sc-calcite-label{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in.sc-calcite-label{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down.sc-calcite-label{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up.sc-calcite-label{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale.sc-calcite-label{-webkit-animation-name:in-scale;animation-name:in-scale}.sc-calcite-label:root{--calcite-popper-transition:150ms ease-in-out}[hidden].sc-calcite-label-h{display:none}[alignment=start].sc-calcite-label-h,[alignment=end].sc-calcite-label-h .calcite--rtl.sc-calcite-label{text-align:left}[alignment=end].sc-calcite-label-h,[alignment=start].sc-calcite-label-h .calcite--rtl.sc-calcite-label{text-align:right}[alignment=center].sc-calcite-label-h{text-align:center}[scale=s].sc-calcite-label-h label.sc-calcite-label{font-size:var(--calcite-font-size--2);line-height:1rem;margin-bottom:0.5rem}[scale=m].sc-calcite-label-h label.sc-calcite-label{font-size:var(--calcite-font-size--1);line-height:1rem;margin-bottom:0.75rem}[scale=l].sc-calcite-label-h label.sc-calcite-label{font-size:var(--calcite-font-size-0);line-height:1.25rem;margin-bottom:1rem}.sc-calcite-label-h label.sc-calcite-label{color:var(--calcite-ui-text-1);cursor:pointer;width:100%;margin-top:0;margin-right:0;margin-left:0;line-height:1.375}[layout=default].sc-calcite-label-h label.sc-calcite-label{display:flex;flex-direction:column;grid-gap:0.25rem;gap:0.25rem}[layout=inline].sc-calcite-label-h label.sc-calcite-label,[layout=inline-space-between].sc-calcite-label-h label.sc-calcite-label{display:flex;align-items:center;flex-direction:row;grid-gap:0.5rem;gap:0.5rem}[layout=inline][scale=l].sc-calcite-label-h label.sc-calcite-label{grid-gap:0.75rem;gap:0.75rem}[layout=inline-space-between].sc-calcite-label-h label.sc-calcite-label{justify-content:space-between}[disabled].sc-calcite-label-h>label.sc-calcite-label{pointer-events:none;opacity:var(--calcite-ui-opacity-disabled)}.sc-calcite-label-h[disabled] .sc-calcite-label-s>*{pointer-events:none}.sc-calcite-label-h[disabled] .sc-calcite-label-s>*[disabled],.sc-calcite-label-h[disabled] .sc-calcite-label-s>*[disabled] *{--bg-opacity:1}.sc-calcite-label-h[disabled] .sc-calcite-label-s>calcite-input-message:not([active]){--bg-opacity:0}[disable-spacing].sc-calcite-label-h label.sc-calcite-label{grid-gap:0;gap:0;margin:0}";

const CalciteLabel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteLabelFocus = createEvent(this, "calciteLabelFocus", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** specify the text alignment of the label */
    this.alignment = "start";
    /** specify the status of the label and any child input / input messages */
    this.status = "idle";
    /** specify the scale of the input, defaults to m */
    this.scale = "m";
    /** is the wrapped element positioned inline with the label slotted text */
    this.layout = "default";
    /** eliminates any space around the label */
    this.disableSpacing = false;
    /** is the label disabled  */
    this.disabled = false;
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.handleCalciteHtmlForClicks = (target) => {
      // 1. has htmlFor
      if (!this.for) {
        return;
      }
      // 2. htmlFor matches a calcite component
      const inputForThisLabel = queryElementRoots(this.el, `#${this.for}`);
      if (!inputForThisLabel) {
        return;
      }
      if (!inputForThisLabel.localName.startsWith("calcite")) {
        return;
      }
      // 5. target is NOT the calcite component that this label matches
      if (target === inputForThisLabel) {
        return;
      }
      // 3. target is not a labelable native form element
      const labelableNativeElements = [
        "button",
        "input",
        "meter",
        "output",
        "progress",
        "select",
        "textarea"
      ];
      if (labelableNativeElements.includes(target.localName)) {
        return;
      }
      // 4. target is not a labelable calcite form element
      const labelableCalciteElements = [
        "calcite-button",
        "calcite-checkbox",
        "calcite-date",
        "calcite-inline-editable",
        "calcite-input",
        "calcite-radio",
        "calcite-radio-button",
        "calcite-radio-button-group",
        "calcite-radio-group",
        "calcite-rating",
        "calcite-select",
        "calcite-slider",
        "calcite-switch"
      ];
      if (labelableCalciteElements.includes(target.localName)) {
        return;
      }
      // 5. target is not a child of a labelable calcite form element
      for (let i = 0; i < labelableCalciteElements.length; i++) {
        if (target.closest(labelableCalciteElements[i])) {
          return;
        }
      }
      inputForThisLabel.click();
    };
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  onClick(event) {
    const target = event.target;
    this.calciteLabelFocus.emit({
      labelEl: this.el,
      interactedEl: target,
      requestedInput: this.for
    });
    this.handleCalciteHtmlForClicks(target);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  render() {
    const dir = getElementDir(this.el);
    return (h("label", { class: { [CSS_UTILITY.rtl]: dir === "rtl" }, htmlFor: this.for }, h("slot", null)));
  }
  get el() { return getElement(this); }
};
CalciteLabel.style = calciteLabelCss;

export { CalciteLabel as calcite_label };
