import { r as registerInstance, h, F as Fragment, g as getElement } from './index-d836c4a8.js';
import { b as getSlotted } from './dom-35210035.js';
import './guid-9ad8042d.js';

const SLOTS = {
  contentStart: "content-start",
  contentEnd: "content-end"
};

const calciteTileCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{background-color:var(--calcite-ui-foreground-1);box-sizing:border-box;color:var(--calcite-ui-text-3);display:inline-block;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host(:not([embed])){padding:0.75rem;box-shadow:0 0 0 1px var(--calcite-ui-border-2)}:host(:not([embed])[href]:hover){cursor:pointer;box-shadow:0 0 0 2px var(--calcite-ui-brand)}:host(:not([embed])[href]:active){box-shadow:0 0 0 3px var(--calcite-ui-brand)}:host([icon][heading]:not([description]):not([embed])){padding:0}:host([disabled]){opacity:var(--calcite-ui-opacity-disabled);pointer-events:none}.container{display:grid;grid-template-columns:repeat(1, minmax(0, 1fr));grid-gap:0.5rem;gap:0.5rem;pointer-events:none}.content{justify-content:center;display:flex;flex:1 1 auto;flex-direction:column;grid-gap:0.5rem;gap:0.5rem}.content-container{display:flex;flex:1 1 auto;outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;align-items:stretch;padding:0;color:var(--calcite-ui-text-2)}.content-slot-container{display:flex;align-items:center;background-color:var(--calcite-ui-foreground-1)}.content-slot-container:first-child{padding-right:0.75rem}.content-slot-container:last-child{padding-left:0.75rem}.heading{font-size:var(--calcite-font-size--1);line-height:1.375;color:var(--calcite-ui-text-2);transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);font-weight:var(--calcite-font-weight-medium);pointer-events:none}.large-visual{align-items:center;min-height:12rem}.large-visual .icon{align-self:flex-end}.large-visual .content-container{align-self:center}.description{font-size:var(--calcite-font-size--2);line-height:1.375;color:var(--calcite-ui-text-3);transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);pointer-events:none}:host(:hover) .heading,:host([active]) .heading{color:var(--calcite-ui-text-1)}:host(:hover) .description,:host([active]) .description{color:var(--calcite-ui-text-2)}";

const CalciteTile = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** The active state of the tile. */
    this.active = false;
    /**
     * When true, prevents interaction.
     */
    this.disabled = false;
    /** The embed mode of the tile.  When true, renders without a border and padding for use by other components. */
    this.embed = false;
    /**
     * The focused state of the tile.
     * @internal
     */
    this.focused = false;
    /** The hidden state of the tile. */
    this.hidden = false;
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderTile() {
    const { icon, el, heading, description } = this;
    const isLargeVisual = heading && icon && !description;
    const iconStyle = isLargeVisual
      ? {
        height: "64px",
        width: "64px"
      }
      : undefined;
    return (h("div", { class: { container: true, "large-visual": isLargeVisual } }, icon && (h("div", { class: "icon" }, h("calcite-icon", { icon: icon, scale: "l", style: iconStyle }))), h("div", { class: "content-container" }, getSlotted(el, SLOTS.contentStart) ? (h("div", { class: "content-slot-container" }, h("slot", { name: SLOTS.contentStart }))) : null, h("div", { class: "content" }, heading && h("div", { class: "heading" }, heading), description && h("div", { class: "description" }, description)), getSlotted(el, SLOTS.contentEnd) ? (h("div", { class: "content-slot-container" }, h("slot", { name: SLOTS.contentEnd }))) : null)));
  }
  render() {
    return (h(Fragment, null, this.href ? (h("calcite-link", { disabled: this.disabled, href: this.href }, this.renderTile())) : (this.renderTile())));
  }
  get el() { return getElement(this); }
};
CalciteTile.style = calciteTileCss;

export { CalciteTile as calcite_tile };
