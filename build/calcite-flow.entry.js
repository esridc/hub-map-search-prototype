import { r as registerInstance, h, g as getElement } from './index-d836c4a8.js';
import { c as createObserver } from './observers-93f01172.js';

const CSS = {
  frame: "frame",
  frameAdvancing: "frame--advancing",
  frameRetreating: "frame--retreating"
};

const calciteFlowCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;flex:1 1 auto;align-items:stretch;background-color:transparent;width:100%;overflow:hidden;position:relative}:host .frame{display:flex;flex:1 1 auto;align-items:stretch;width:100%;padding:0;margin:0;flex-direction:column;position:relative}:host ::slotted(calcite-panel){height:100%}:host ::slotted(.calcite-match-height:last-child){display:flex;flex:1 1 auto;overflow:hidden}:host .frame--advancing{-webkit-animation:calcite-frame-advance 150ms ease-in-out;animation:calcite-frame-advance 150ms ease-in-out}:host .frame--retreating{-webkit-animation:calcite-frame-retreat 150ms ease-in-out;animation:calcite-frame-retreat 150ms ease-in-out}@-webkit-keyframes calcite-frame-advance{0%{--bg-opacity:0.5;transform:translate3d(50px, 0, 0)}100%{--bg-opacity:1;transform:translate3d(0, 0, 0)}}@keyframes calcite-frame-advance{0%{--bg-opacity:0.5;transform:translate3d(50px, 0, 0)}100%{--bg-opacity:1;transform:translate3d(0, 0, 0)}}@-webkit-keyframes calcite-frame-retreat{0%{--bg-opacity:0.5;transform:translate3d(-50px, 0, 0)}100%{--bg-opacity:1;transform:translate3d(0, 0, 0)}}@keyframes calcite-frame-retreat{0%{--bg-opacity:0.5;transform:translate3d(-50px, 0, 0)}100%{--bg-opacity:1;transform:translate3d(0, 0, 0)}}";

const CalciteFlow = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.panelCount = 0;
    this.flowDirection = null;
    this.panels = [];
    this.getFlowDirection = (oldPanelCount, newPanelCount) => {
      const allowRetreatingDirection = oldPanelCount > 1;
      const allowAdvancingDirection = oldPanelCount && newPanelCount > 1;
      if (!allowAdvancingDirection && !allowRetreatingDirection) {
        return null;
      }
      return newPanelCount < oldPanelCount ? "retreating" : "advancing";
    };
    this.updateFlowProps = () => {
      const { panels } = this;
      const newPanels = Array.from(this.el.querySelectorAll("calcite-panel"));
      const oldPanelCount = panels.length;
      const newPanelCount = newPanels.length;
      const activePanel = newPanels[newPanelCount - 1];
      const previousPanel = newPanels[newPanelCount - 2];
      if (newPanelCount && activePanel) {
        newPanels.forEach((panelNode) => {
          panelNode.showBackButton = newPanelCount > 1;
          panelNode.hidden = panelNode !== activePanel;
        });
      }
      if (previousPanel) {
        previousPanel.menuOpen = false;
      }
      this.panels = newPanels;
      if (oldPanelCount !== newPanelCount) {
        const flowDirection = this.getFlowDirection(oldPanelCount, newPanelCount);
        this.panelCount = newPanelCount;
        this.flowDirection = flowDirection;
      }
    };
    this.panelItemMutationObserver = createObserver("mutation", this.updateFlowProps);
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /**
   * Removes the currently active `calcite-panel`.
   */
  async back() {
    const lastItem = this.el.querySelector("calcite-panel:last-child");
    if (!lastItem) {
      return;
    }
    const beforeBack = lastItem.beforeBack
      ? lastItem.beforeBack
      : () => Promise.resolve();
    return beforeBack.call(lastItem).then(() => {
      lastItem.remove();
      return lastItem;
    });
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    var _a;
    (_a = this.panelItemMutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
    this.updateFlowProps();
  }
  disconnectedCallback() {
    var _a;
    (_a = this.panelItemMutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------
  handleCalcitePanelBackClick() {
    this.back();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const { flowDirection, panelCount } = this;
    const frameDirectionClasses = {
      [CSS.frame]: true,
      [CSS.frameAdvancing]: flowDirection === "advancing",
      [CSS.frameRetreating]: flowDirection === "retreating"
    };
    return (h("div", { class: frameDirectionClasses, key: panelCount }, h("slot", null)));
  }
  get el() { return getElement(this); }
};
CalciteFlow.style = calciteFlowCss;

export { CalciteFlow as calcite_flow };
