import { r as registerInstance, h, g as getElement } from './index-d836c4a8.js';
import { e as getAncestors, f as getDepth } from './utils-23e7614e.js';
import { g as guid } from './guid-9ad8042d.js';
import { g as getElementProp, a as getElementDir, C as CSS_UTILITY } from './dom-35210035.js';

const CSS = {
  list: "list",
  label: "label",
  title: "title"
};

const calciteComboboxItemGroupCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{--calcite-combobox-item-indent-start-1:var(--calcite-combobox-item-spacing-indent-1);--calcite-combobox-item-indent-end-1:unset;--calcite-combobox-item-indent-start-2:var(--calcite-combobox-item-spacing-indent-2);--calcite-combobox-item-indent-end-2:unset}.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-item-spacing-indent-1:0.5rem;--calcite-combobox-item-spacing-indent-2:1rem}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-item-spacing-indent-1:0.75rem;--calcite-combobox-item-spacing-indent-2:1.5rem}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.75rem;--calcite-combobox-item-spacing-indent-1:1rem;--calcite-combobox-item-spacing-indent-2:2rem}.calcite--rtl{--calcite-combobox-item-indent-start-1:unset;--calcite-combobox-item-indent-end-1:var(--calcite-combobox-item-spacing-indent-1);--calcite-combobox-item-indent-start-2:unset;--calcite-combobox-item-indent-end-2:var(--calcite-combobox-item-spacing-indent-2)}:host,.list{display:flex;flex-direction:column;margin:0;padding:0;outline:2px solid transparent;outline-offset:2px}.label{box-sizing:border-box;width:100%;max-width:100%;min-width:0;color:var(--calcite-ui-text-3);display:flex}.label--indent-1{padding-left:var(--calcite-combobox-item-indent-start-1);padding-right:var(--calcite-combobox-item-indent-end-1)}.label--indent-2{padding-left:var(--calcite-combobox-item-indent-start-2);padding-right:var(--calcite-combobox-item-indent-end-2)}.title{border:0 solid;display:block;flex:1 1 0%;border-bottom-color:var(--calcite-ui-border-3);border-bottom-width:1px;color:var(--calcite-ui-text-2);font-weight:var(--calcite-font-weight-bold);word-wrap:break-word;word-break:break-word;padding:var(--calcite-combobox-item-spacing-unit-l) 0;margin-left:var(--calcite-combobox-item-spacing-unit-s);margin-right:var(--calcite-combobox-item-spacing-unit-s)}";

const CalciteComboboxItemGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.guid = guid();
    this.scale = "m";
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    this.ancestors = getAncestors(this.el);
    this.scale = getElementProp(this.el, "scale", this.scale);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const { el, scale } = this;
    const dir = getElementDir(el);
    const indent = `${CSS.label}--indent-${getDepth(el)}`;
    return (h("ul", { "aria-labelledby": this.guid, class: { [CSS.list]: true, [CSS_UTILITY.rtl]: dir === "rtl", [`scale--${scale}`]: true }, role: "group" }, h("li", { class: { [CSS.label]: true, [indent]: true }, id: this.guid, role: "presentation" }, h("span", { class: CSS.title }, this.label)), h("slot", null)));
  }
  get el() { return getElement(this); }
};
CalciteComboboxItemGroup.style = calciteComboboxItemGroupCss;

export { CalciteComboboxItemGroup as calcite_combobox_item_group };
