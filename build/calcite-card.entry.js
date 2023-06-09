import { r as registerInstance, e as createEvent, h, g as getElement } from './index-d836c4a8.js';
import { a as getElementDir, C as CSS_UTILITY } from './dom-35210035.js';
import { g as getKey } from './key-4c5a210a.js';
import './guid-9ad8042d.js';

const CSS = {
  container: "container",
  header: "header",
  footer: "footer",
  title: "title",
  subtitle: "subtitle",
  thumbnailWrapper: "thumbnail-wrapper",
  checkboxWrapper: "checkbox-wrapper"
};
const SLOTS = {
  thumbnail: "thumbnail",
  title: "title",
  subtitle: "subtitle",
  footerLeading: "footer-leading",
  footerTrailing: "footer-trailing"
};
const TEXT = {
  select: "Select",
  deselect: "Deselect",
  loading: "Loading"
};

const calciteCardCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{max-width:100%;display:block}:host .calcite-card-container{display:flex;height:100%;flex-direction:column;justify-content:space-between;background-color:var(--calcite-ui-foreground-1);transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);position:relative;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-2);color:var(--calcite-ui-text-3);box-shadow:none}:host .calcite-card-container:hover{box-shadow:0 4px 16px 0 rgba(0, 0, 0, 0.08), 0 2px 8px 0 rgba(0, 0, 0, 0.04);z-index:1}:host .calcite-card-container:active{box-shadow:0 1px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 2px -1px rgba(0, 0, 0, 0.08);transition-duration:75ms;z-index:1}.container{flex:1 1 auto;display:flex;flex-direction:column}:host([loading]) .calcite-card-container *:not(calcite-loader):not(.calcite-card-loader-container){opacity:0;pointer-events:none}:host([loading]) .calcite-card-loader-container{display:flex;align-items:center;position:absolute;top:0;right:0;bottom:0;left:0}.header,.footer{padding-top:0.75rem;padding-bottom:0.25rem;padding-left:0.75rem;padding-right:0.75rem;display:flex}.header{flex-direction:column}.footer{padding-top:0.25rem;padding-bottom:0.75rem;padding-left:0.75rem;padding-right:0.75rem;flex-direction:row;align-content:space-between;justify-content:space-between;margin-top:auto}.card-content{padding:0.75rem;color:var(--calcite-ui-text-3);font-size:var(--calcite-font-size--2);line-height:1.375}:host([selectable]) .calcite-card-container:active{box-shadow:0 1px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 2px -1px rgba(0, 0, 0, 0.08)}:host([selected]) .calcite-card-container{border-color:var(--calcite-ui-brand)}slot[name=title]::slotted(*),*::slotted([slot=title]){font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1);margin:0;font-size:var(--calcite-font-size--1);line-height:1.375}slot[name=subtitle]::slotted(*),*::slotted([slot=subtitle]){font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-2);margin:0;margin-top:0.5rem;font-size:var(--calcite-font-size--2);line-height:1.375}slot[name=thumbnail]::slotted(img),img::slotted([slot=thumbnail]){max-width:100%;min-width:100%}slot[name=footer-leading]::slotted(*),*::slotted([slot=footer-leading]){align-self:center;font-size:var(--calcite-font-size--2);line-height:1.375;-webkit-margin-end:auto;margin-inline-end:auto}slot[name=footer-trailing]::slotted(*),*::slotted([slot=footer-trailing]){align-self:center;font-size:var(--calcite-font-size--2);line-height:1.375}.thumbnail-wrapper{font-size:var(--calcite-font-size-0);line-height:1.375}.checkbox-wrapper{position:absolute;margin:0;padding:0;top:0.5rem;right:0.5rem}.calcite--rtl .checkbox-wrapper{right:auto;left:0.5rem}";

const CalciteCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteCardSelect = createEvent(this, "calciteCardSelect", 7);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /**  When true, the cards content is waiting to be loaded. This state shows a busy indicator.*/
    this.loading = false;
    /** Indicates whether the card is selected. */
    this.selected = false;
    /** Indicates whether the card is selectable. */
    this.selectable = false;
    /** string to override English loading text
     * @default "Loading"
     */
    this.intlLoading = TEXT.loading;
    /** string to override English select text for checkbox when selectable is true
     * @default "Select"
     */
    this.intlSelect = TEXT.select;
    /** string to override English deselect text for checkbox when selectable is true
     * @default "Deselect"
     */
    this.intlDeselect = TEXT.deselect;
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.cardSelectClick = () => {
      this.selectCard();
    };
    this.cardSelectKeyDown = (e) => {
      switch (getKey(e.key)) {
        case " ":
        case "Enter":
          this.selectCard();
          e.preventDefault();
          break;
      }
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  render() {
    const dir = getElementDir(this.el);
    return (h("div", { class: { "calcite-card-container": true, [CSS_UTILITY.rtl]: dir === "rtl" } }, this.loading ? (h("div", { class: "calcite-card-loader-container" }, h("calcite-loader", { active: true, label: this.intlLoading }))) : null, h("section", { "aria-busy": this.loading.toString(), class: { [CSS.container]: true } }, this.selectable ? this.renderCheckbox() : null, this.renderThumbnail(), this.renderHeader(), h("div", { class: "card-content" }, h("slot", null)), this.renderFooter())));
  }
  selectCard() {
    this.selected = !this.selected;
    this.calciteCardSelect.emit();
  }
  renderThumbnail() {
    const hasThumbnail = this.el.querySelector(`[slot=${SLOTS.thumbnail}]`);
    return hasThumbnail ? (h("div", { class: CSS.thumbnailWrapper }, h("slot", { name: SLOTS.thumbnail }))) : null;
  }
  renderCheckbox() {
    const checkboxLabel = this.selected ? this.intlDeselect : this.intlSelect;
    return (h("label", { "aria-label": checkboxLabel, class: CSS.checkboxWrapper, onClick: this.cardSelectClick, onKeyDown: this.cardSelectKeyDown, title: checkboxLabel }, h("calcite-checkbox", { checked: this.selected })));
  }
  renderHeader() {
    const title = this.el.querySelector(`[slot=${SLOTS.title}]`);
    const subtitle = this.el.querySelector(`[slot=${SLOTS.subtitle}]`);
    const hasHeader = title || subtitle;
    return hasHeader ? (h("header", { class: CSS.header }, h("slot", { name: SLOTS.title }), h("slot", { name: SLOTS.subtitle }))) : null;
  }
  renderFooter() {
    const leadingFooter = this.el.querySelector(`[slot=${SLOTS.footerLeading}]`);
    const trailingFooter = this.el.querySelector(`[slot=${SLOTS.footerTrailing}]`);
    const hasFooter = leadingFooter || trailingFooter;
    return hasFooter ? (h("footer", { class: CSS.footer }, h("slot", { name: SLOTS.footerLeading }), h("slot", { name: SLOTS.footerTrailing }))) : null;
  }
  get el() { return getElement(this); }
};
CalciteCard.style = calciteCardCss;

export { CalciteCard as calcite_card };
