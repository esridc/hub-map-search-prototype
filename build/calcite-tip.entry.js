import { r as registerInstance, e as createEvent, h, F as Fragment, g as getElement } from './index-d836c4a8.js';
import { H as HEADING_LEVEL$1 } from './resources-ed9e05cf.js';
import { b as getSlotted } from './dom-35210035.js';
import { c as constrainHeadingLevel, C as CalciteHeading } from './CalciteHeading-96d682fd.js';
import './guid-9ad8042d.js';

const CSS = {
  container: "container",
  header: "header",
  heading: "heading",
  close: "close",
  imageFrame: "image-frame",
  content: "content",
  info: "info"
};
const ICONS = {
  close: "x"
};
const SLOTS = {
  thumbnail: "thumbnail"
};
const TEXT = {
  close: "Close"
};
const HEADING_LEVEL = (HEADING_LEVEL$1 + 1);

const calciteTipCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{position:relative;display:flex;flex-direction:row;margin:1rem;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-2);box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1);line-height:1rem}:host *{box-sizing:border-box}.container{padding:1rem;width:100%}:host([dismissed]),:host([dismissed]) .container{display:none}:host([selected]) .container{border-style:none;margin:0;padding:0}.header{margin:0;display:flex;align-items:center;align-content:space-between;color:var(--calcite-ui-text-2);}.heading{font-weight:var(--calcite-font-weight-medium);margin:0;padding:0}.header .heading{flex:1 1 auto;padding:0.5rem}h1.heading{font-size:var(--calcite-font-size-2);line-height:1.5rem}h2.heading{font-size:var(--calcite-font-size-1);line-height:1.5rem}h3.heading{font-size:var(--calcite-font-size-0);line-height:1.25rem}h4.heading,h5.heading{font-size:var(--calcite-font-size--1);line-height:1rem}.header{margin-bottom:0.5rem}.header .heading{color:var(--calcite-ui-text-1);padding:0}.container[hidden]{display:none}.content{display:flex}.info{padding-top:0;padding-bottom:0;padding-left:1rem;padding-right:1rem;width:70%}.info:only-child{width:100%;padding-left:0;padding-right:0}::slotted(p){margin-top:0}::slotted(a){outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;color:var(--calcite-ui-brand)}::slotted(a:focus){outline:2px solid var(--calcite-ui-brand);outline-offset:2px}.image-frame{width:25%}.image-frame img{max-width:100%}::slotted(img){max-width:100%}";

const CalciteTip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteTipDismiss = createEvent(this, "calciteTipDismiss", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * No longer displays the tip.
     */
    this.dismissed = false;
    /**
     * Indicates whether the tip can be dismissed.
     */
    this.nonDismissible = false;
    /**
     * The selected state of the tip if it is being used inside a `calcite-tip-manager`.
     */
    this.selected = false;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.hideTip = () => {
      this.dismissed = true;
      this.calciteTipDismiss.emit();
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderHeader() {
    var _a;
    const { heading, headingLevel, el } = this;
    const parentLevel = (_a = el.closest("calcite-tip-manager")) === null || _a === void 0 ? void 0 : _a.headingLevel;
    const relativeLevel = parentLevel ? constrainHeadingLevel(parentLevel + 1) : null;
    const level = headingLevel || relativeLevel || HEADING_LEVEL;
    return heading ? (h("header", { class: CSS.header }, h(CalciteHeading, { class: CSS.heading, level: level }, heading))) : null;
  }
  renderDismissButton() {
    const { nonDismissible, hideTip, intlClose } = this;
    const text = intlClose || TEXT.close;
    return !nonDismissible ? (h("calcite-action", { class: CSS.close, icon: ICONS.close, onClick: hideTip, scale: "l", text: text })) : null;
  }
  renderImageFrame() {
    const { el } = this;
    return getSlotted(el, SLOTS.thumbnail) ? (h("div", { class: CSS.imageFrame }, h("slot", { name: SLOTS.thumbnail }))) : null;
  }
  renderInfoNode() {
    return (h("div", { class: CSS.info }, h("slot", null)));
  }
  renderContent() {
    return (h("div", { class: CSS.content }, this.renderImageFrame(), this.renderInfoNode()));
  }
  render() {
    return (h(Fragment, null, h("article", { class: CSS.container }, this.renderHeader(), this.renderContent()), this.renderDismissButton()));
  }
  get el() { return getElement(this); }
};
CalciteTip.style = calciteTipCss;

export { CalciteTip as calcite_tip };
