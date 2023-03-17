import { r as registerInstance, e as createEvent, h, F as Fragment, g as getElement } from './index-d836c4a8.js';
import { b as getSlotted } from './dom-35210035.js';
import './guid-9ad8042d.js';

const CSS = {
  content: "content",
  contentHeader: "content__header",
  contentBody: "content__body",
  contentDetached: "content--detached"
};
const SLOTS = {
  actionBar: "action-bar",
  header: "header"
};

const calciteShellPanelCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;align-items:stretch;background-color:transparent;pointer-events:none;--calcite-shell-panel-detached-max-height:unset}::slotted(calcite-panel),::slotted(calcite-flow){flex:1 1 auto;height:100%;width:100%;max-height:unset;max-width:unset}::slotted(.calcite-match-height){display:flex;flex:1 1 auto;overflow:hidden}.content{align-items:stretch;align-self:stretch;background-color:var(--calcite-ui-background);display:flex;padding:0;pointer-events:auto;flex-direction:column;flex-wrap:nowrap;width:var(--calcite-shell-panel-width);max-width:var(--calcite-shell-panel-max-width);min-width:var(--calcite-shell-panel-min-width);transition:max-height 150ms ease-in-out, max-width 150ms ease-in-out}.content__header{display:flex;flex-direction:column;flex:0 1 auto;flex-wrap:nowrap;align-items:stretch}.content__body{display:flex;flex:1 1 auto;flex-direction:column;overflow:hidden}:host([width-scale=s]) .content{--calcite-shell-panel-width:calc(var(--calcite-panel-width-multiplier) * 12vw);--calcite-shell-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 300px);--calcite-shell-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 150px)}:host([width-scale=m]) .content{--calcite-shell-panel-width:calc(var(--calcite-panel-width-multiplier) * 20vw);--calcite-shell-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 420px);--calcite-shell-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 240px)}:host([width-scale=l]) .content{--calcite-shell-panel-width:calc(var(--calcite-panel-width-multiplier) * 45vw);--calcite-shell-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 680px);--calcite-shell-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 340px)}:host([detached-height-scale=s]) .content--detached{--calcite-shell-panel-detached-max-height:40vh}:host([detached-height-scale=m]) .content--detached{--calcite-shell-panel-detached-max-height:60vh}:host([detached-height-scale=l]) .content--detached{--calcite-shell-panel-detached-max-height:80vh}.content--detached{border-radius:0.25rem;box-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);height:auto;overflow:hidden;margin-top:0.5rem;margin-bottom:auto;margin-left:0.5rem;margin-right:0.5rem;max-height:var(--calcite-shell-panel-detached-max-height)}.content--detached ::slotted(calcite-panel),.content--detached ::slotted(calcite-flow){max-height:unset}.content[hidden]{display:none}:host([position=start]) slot[name=action-bar]::slotted(calcite-action-bar){border-right-width:1px;border-right-color:var(--calcite-ui-border-3);border-right-style:solid}:host([position=end]) slot[name=action-bar]::slotted(calcite-action-bar){border-left-width:1px;border-left-color:var(--calcite-ui-border-3);border-left-style:solid}";

const CalciteShellPanel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteShellPanelToggle = createEvent(this, "calciteShellPanelToggle", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Hide the content panel.
     */
    this.collapsed = false;
    /**
     * This property makes the content area appear like a "floating" panel.
     */
    this.detached = false;
    /**
     * Specifies the maxiumum height of the contents when detached.
     */
    this.detachedHeightScale = "l";
    /**
     * This sets width of the content area.
     */
    this.widthScale = "m";
  }
  watchHandler() {
    this.calciteShellPanelToggle.emit();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderHeader() {
    const { el } = this;
    const hasHeader = getSlotted(el, SLOTS.header);
    return hasHeader ? (h("div", { class: CSS.contentHeader }, h("slot", { name: SLOTS.header }))) : null;
  }
  render() {
    const { collapsed, detached, position } = this;
    const contentNode = (h("div", { class: { [CSS.content]: true, [CSS.contentDetached]: detached }, hidden: collapsed }, this.renderHeader(), h("div", { class: CSS.contentBody }, h("slot", null))));
    const actionBarNode = h("slot", { name: SLOTS.actionBar });
    const mainNodes = [actionBarNode, contentNode];
    if (position === "end") {
      mainNodes.reverse();
    }
    return h(Fragment, null, mainNodes);
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "collapsed": ["watchHandler"]
  }; }
};
CalciteShellPanel.style = calciteShellPanelCss;

export { CalciteShellPanel as calcite_shell_panel };
