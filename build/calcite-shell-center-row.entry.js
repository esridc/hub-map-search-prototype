import { r as registerInstance, h, F as Fragment, g as getElement } from './index-d836c4a8.js';
import { a as getElementDir, C as CSS_UTILITY, b as getSlotted } from './dom-35210035.js';
import './guid-9ad8042d.js';

const CSS = {
  actionBarContainer: "action-bar-container",
  content: "content"
};
const SLOTS = {
  actionBar: "action-bar"
};

const calciteShellCenterRowCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;flex:1 1 auto;overflow:hidden;background-color:transparent}.content{display:flex;height:100%;margin:0;overflow:hidden;width:100%;flex:1 0 0}.action-bar-container{display:flex}:host([detached]){border-width:0;border-radius:0.25rem;box-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);margin-top:0.5rem;margin-bottom:1.5rem;margin-left:0.5rem;margin-right:0.5rem;-webkit-animation:in-up var(--calcite-animation-timing) ease-in-out;animation:in-up var(--calcite-animation-timing) ease-in-out}:host([position=end]){align-self:flex-end}:host([position=start]){align-self:flex-start}:host([height-scale=s]){height:33.333333%}:host([height-scale=m]){height:70%}:host([height-scale=l]){height:100%}:host([height-scale=l][detached]){height:calc(100% - 2rem)}::slotted(calcite-panel){width:100%;height:100%}::slotted(calcite-action-bar){border-right-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}::slotted(calcite-action-bar[position=end]){border-left-width:0;border-right-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}.calcite--rtl ::slotted(calcite-action-bar){border-right-width:0;border-left-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}.calcite--rtl ::slotted(calcite-action-bar[position=end]){border-left-width:0;border-right-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}";

const CalciteShellCenterRow = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * This property makes the content area appear like a "floating" panel.
     */
    this.detached = false;
    /**
     * Specifies the maxiumum height of the row.
     */
    this.heightScale = "s";
    /**
     * Arranges the component depending on the elements 'dir' property.
     */
    this.position = "end";
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const { el } = this;
    const rtl = getElementDir(el) === "rtl";
    const contentNode = (h("div", { class: { [CSS.content]: true, [CSS_UTILITY.rtl]: rtl } }, h("slot", null)));
    const actionBar = getSlotted(el, SLOTS.actionBar);
    const actionBarNode = actionBar ? (h("div", { class: { [CSS.actionBarContainer]: true, [CSS_UTILITY.rtl]: rtl } }, h("slot", { name: SLOTS.actionBar }))) : null;
    const children = [actionBarNode, contentNode];
    if ((actionBar === null || actionBar === void 0 ? void 0 : actionBar.position) === "end") {
      children.reverse();
    }
    return h(Fragment, null, children);
  }
  get el() { return getElement(this); }
};
CalciteShellCenterRow.style = calciteShellCenterRowCss;

export { CalciteShellCenterRow as calcite_shell_center_row };
