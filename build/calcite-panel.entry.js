import { r as registerInstance, e as createEvent, h, F as Fragment, g as getElement } from './index-d836c4a8.js';
import { a as getElementDir, b as getSlotted, C as CSS_UTILITY } from './dom-35210035.js';
import { C as CalciteHeading } from './CalciteHeading-96d682fd.js';
import { S as SLOTS$1 } from './resources-a467bc91.js';
import './guid-9ad8042d.js';

const CSS = {
  backButton: "back-button",
  container: "container",
  header: "header",
  heading: "heading",
  summary: "summary",
  headerContent: "header-content",
  headerActions: "header-actions",
  headerActionsEnd: "header-actions--end",
  headerActionsStart: "header-actions--start",
  contentContainer: "content-container",
  fabContainer: "fab-container",
  footer: "footer",
  menuContainer: "menu-container",
  menuButton: "menu-button",
  menu: "menu",
  menuOpen: "menu--open"
};
const ICONS = {
  close: "x",
  menu: "ellipsis",
  backLeft: "chevron-left",
  backRight: "chevron-right"
};
const SLOTS = {
  headerActionsStart: "header-actions-start",
  headerActionsEnd: "header-actions-end",
  headerMenuActions: "header-menu-actions",
  headerContent: "header-content",
  fab: "fab",
  footer: "footer",
  footerActions: "footer-actions"
};
const TEXT = {
  back: "Back",
  close: "Close",
  open: "Open",
  options: "Options"
};
const HEADING_LEVEL = 3;

const calcitePanelCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;flex:1 1 auto;overflow:hidden;position:relative;width:100%;--calcite-min-header-height:calc(var(--calcite-icon-size) * 3);--calcite-panel-max-height:unset;--calcite-panel-width:100%;--calcite-panel-min-width:unset;--calcite-panel-max-width:unset}.header{margin:0;display:flex;align-items:center;align-content:space-between;color:var(--calcite-ui-text-2);}.heading{font-weight:var(--calcite-font-weight-medium);margin:0;padding:0}.header .heading{flex:1 1 auto;padding:0.5rem}h1.heading{font-size:var(--calcite-font-size-2);line-height:1.5rem}h2.heading{font-size:var(--calcite-font-size-1);line-height:1.5rem}h3.heading{font-size:var(--calcite-font-size-0);line-height:1.25rem}h4.heading,h5.heading{font-size:var(--calcite-font-size--1);line-height:1rem}.container{display:flex;flex:1 1 auto;flex-direction:column;align-items:stretch;background-color:var(--calcite-ui-background);width:100%;padding:0;margin:0;max-height:var(--calcite-panel-max-height);width:var(--calcite-panel-width);max-width:var(--calcite-panel-max-width);min-width:var(--calcite-panel-min-width);transition:max-height 150ms ease-in-out, width 150ms ease-in-out}:host([height-scale=s]){--calcite-panel-max-height:40vh}:host([height-scale=m]){--calcite-panel-max-height:60vh}:host([height-scale=l]){--calcite-panel-max-height:80vh}:host([width-scale=s]){--calcite-panel-width:calc(var(--calcite-panel-width-multiplier) * 12vw);--calcite-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 300px);--calcite-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 150px)}:host([width-scale=m]){--calcite-panel-width:calc(var(--calcite-panel-width-multiplier) * 20vw);--calcite-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 420px);--calcite-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 240px)}:host([width-scale=l]){--calcite-panel-width:calc(var(--calcite-panel-width-multiplier) * 45vw);--calcite-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 680px);--calcite-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 340px)}.container[hidden]{display:none}:host([loading]) .container,:host([disabled]) .container{position:relative;z-index:1}.header{border-bottom:1px solid;align-items:stretch;background-color:var(--calcite-ui-foreground-1);justify-content:flex-start;position:sticky;top:0;border-bottom-color:var(--calcite-ui-border-2);width:100%;flex:0 0 auto;min-height:3rem;z-index:2}.header-content{display:block;overflow:hidden;margin-right:auto;padding-top:1.25rem;padding-bottom:1.25rem;padding-left:1rem;padding-right:1rem}.header-content .heading,.header-content .summary{padding:0;display:block;overflow:hidden;white-space:nowrap;width:100%;text-overflow:ellipsis}.header-content .heading{font-weight:var(--calcite-font-weight-medium);margin-top:0;margin-left:0;margin-right:0;margin-bottom:0.25rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}.header-content .heading:only-child{margin-bottom:0}.header-content .summary{color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1);line-height:1rem}.back-button{border-color:var(--calcite-ui-border-2);border-style:solid;border-width:0;border-right-width:1px}.calcite--rtl .back-button{border-right-width:0;border-left-width:1px}.header-actions{display:flex;align-items:stretch;flex-direction:row;flex-wrap:nowrap}.header-actions--end{margin-left:auto}.menu-container:only-child{margin-left:auto}.menu-button{align-self:stretch;flex:0 1 auto;height:100%;position:relative}.menu{min-width:10rem;flex-flow:column nowrap}.content-container{align-items:stretch;background-color:var(--calcite-ui-background);display:flex;flex:1 1 auto;overflow:auto;flex-wrap:nowrap;flex-direction:column}.footer{border-top:1px solid;background-color:var(--calcite-ui-foreground-1);border-top-color:var(--calcite-ui-border-3);display:flex;justify-content:space-evenly;position:sticky;bottom:0;width:100%;flex:0 0 auto;min-height:3rem;padding:0.5rem}.calcite--rtl .header-content{margin-left:auto;margin-right:unset}.calcite--rtl .header-actions--end{margin-right:auto;margin-left:unset}.calcite--rtl .menu-container:only-child{margin-right:auto;margin-left:unset}.fab-container{display:inline-block;position:sticky;margin-top:0;margin-bottom:0;margin-left:auto;margin-right:auto;padding:0.5rem;bottom:0;left:0;right:0;z-index:1}";

const CalcitePanel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calcitePanelDismissedChange = createEvent(this, "calcitePanelDismissedChange", 7);
    this.calcitePanelScroll = createEvent(this, "calcitePanelScroll", 7);
    this.calcitePanelBackClick = createEvent(this, "calcitePanelBackClick", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Hides the panel.
     */
    this.dismissed = false;
    /**
     * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
     */
    this.disabled = false;
    /**
     * Displays a close button in the trailing side of the header.
     */
    this.dismissible = false;
    /**
     * Shows a back button in the header.
     */
    this.showBackButton = false;
    /**
     * When true, content is waiting to be loaded. This state shows a busy indicator.
     */
    this.loading = false;
    /**
     * Opens the action menu.
     */
    this.menuOpen = false;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.setContainerRef = (node) => {
      this.containerEl = node;
    };
    this.setDismissRef = (node) => {
      this.dismissButtonEl = node;
    };
    this.setBackRef = (node) => {
      this.backButtonEl = node;
    };
    this.panelKeyUpHandler = (event) => {
      if (event.key === "Escape") {
        this.dismiss();
      }
    };
    this.dismiss = () => {
      this.dismissed = true;
    };
    this.panelScrollHandler = () => {
      this.calcitePanelScroll.emit();
    };
    this.backButtonClick = () => {
      this.calcitePanelBackClick.emit();
    };
  }
  dismissedHandler() {
    this.calcitePanelDismissedChange.emit();
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus(focusId) {
    var _a, _b, _c;
    if (focusId === "dismiss-button") {
      (_a = this.dismissButtonEl) === null || _a === void 0 ? void 0 : _a.setFocus();
      return;
    }
    if (focusId === "back-button") {
      (_b = this.backButtonEl) === null || _b === void 0 ? void 0 : _b.setFocus();
      return;
    }
    (_c = this.containerEl) === null || _c === void 0 ? void 0 : _c.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderBackButton() {
    const { el } = this;
    const rtl = getElementDir(el) === "rtl";
    const { showBackButton, intlBack, backButtonClick } = this;
    const label = intlBack || TEXT.back;
    const icon = rtl ? ICONS.backRight : ICONS.backLeft;
    return showBackButton ? (h("calcite-action", { "aria-label": label, class: CSS.backButton, icon: icon, key: "back-button", onClick: backButtonClick, ref: this.setBackRef, scale: "m", slot: SLOTS.headerActionsStart, text: label })) : null;
  }
  renderHeaderContent() {
    const { heading, headingLevel, summary } = this;
    const headingNode = heading ? (h(CalciteHeading, { class: CSS.heading, level: headingLevel || HEADING_LEVEL }, heading)) : null;
    const summaryNode = summary ? h("span", { class: CSS.summary }, summary) : null;
    return headingNode || summaryNode ? (h("div", { class: CSS.headerContent, key: "header-content" }, headingNode, summaryNode)) : null;
  }
  /**
   * Allows user to override the entire header-content node.
   */
  renderHeaderSlottedContent() {
    return (h("div", { class: CSS.headerContent, key: "header-content" }, h("slot", { name: SLOTS.headerContent })));
  }
  renderHeaderStartActions() {
    const { el } = this;
    const hasStartActions = getSlotted(el, SLOTS.headerActionsStart);
    return hasStartActions ? (h("div", { class: { [CSS.headerActionsStart]: true, [CSS.headerActions]: true }, key: "header-actions-start" }, h("slot", { name: SLOTS.headerActionsStart }))) : null;
  }
  renderHeaderActionsEnd() {
    const { dismiss, dismissible, el, intlClose } = this;
    const text = intlClose || TEXT.close;
    const dismissibleNode = dismissible ? (h("calcite-action", { "aria-label": text, icon: ICONS.close, onClick: dismiss, ref: this.setDismissRef, text: text })) : null;
    const slotNode = h("slot", { name: SLOTS.headerActionsEnd });
    const hasEndActions = getSlotted(el, SLOTS.headerActionsEnd);
    return hasEndActions || dismissibleNode ? (h("div", { class: { [CSS.headerActionsEnd]: true, [CSS.headerActions]: true }, key: "header-actions-end" }, slotNode, dismissibleNode)) : null;
  }
  renderMenu() {
    const { el, intlOptions, menuOpen } = this;
    const hasMenuItems = getSlotted(el, SLOTS.headerMenuActions);
    return hasMenuItems ? (h("calcite-action-menu", { flipPlacements: ["top", "bottom"], label: intlOptions || TEXT.options, open: menuOpen, placement: "bottom-end" }, h("calcite-action", { icon: ICONS.menu, slot: SLOTS$1.trigger, text: intlOptions || TEXT.options }), h("slot", { name: SLOTS.headerMenuActions }))) : null;
  }
  renderHeaderNode() {
    const { el, showBackButton } = this;
    const backButtonNode = this.renderBackButton();
    const hasHeaderSlottedContent = getSlotted(el, SLOTS.headerContent);
    const headerContentNode = hasHeaderSlottedContent
      ? this.renderHeaderSlottedContent()
      : this.renderHeaderContent();
    const actionsNodeStart = this.renderHeaderStartActions();
    const actionsNodeEnd = this.renderHeaderActionsEnd();
    const headerMenuNode = this.renderMenu();
    return actionsNodeStart ||
      headerContentNode ||
      actionsNodeEnd ||
      headerMenuNode ||
      showBackButton ? (h("header", { class: CSS.header }, backButtonNode, actionsNodeStart, headerContentNode, actionsNodeEnd, headerMenuNode)) : null;
  }
  /**
   * Allows user to override the entire footer node.
   */
  renderFooterSlottedContent() {
    const { el } = this;
    const hasFooterSlottedContent = getSlotted(el, SLOTS.footer);
    return hasFooterSlottedContent ? (h("footer", { class: CSS.footer }, h("slot", { name: SLOTS.footer }))) : null;
  }
  renderFooterActions() {
    const { el } = this;
    const hasFooterActions = getSlotted(el, SLOTS.footerActions);
    return hasFooterActions ? (h("footer", { class: CSS.footer }, h("slot", { name: SLOTS.footerActions }))) : null;
  }
  renderContent() {
    return (h("section", { class: CSS.contentContainer, onScroll: this.panelScrollHandler, tabIndex: 0 }, h("slot", null), this.renderFab()));
  }
  renderFab() {
    const { el } = this;
    const hasFab = getSlotted(el, SLOTS.fab);
    return hasFab ? (h("div", { class: CSS.fabContainer }, h("slot", { name: SLOTS.fab }))) : null;
  }
  render() {
    const { dismissed, disabled, dismissible, el, loading, panelKeyUpHandler } = this;
    const rtl = getElementDir(el) === "rtl";
    const panelNode = (h("article", { "aria-busy": loading.toString(), class: {
        [CSS.container]: true,
        [CSS_UTILITY.rtl]: rtl
      }, hidden: dismissible && dismissed, onKeyUp: panelKeyUpHandler, ref: this.setContainerRef, tabIndex: dismissible ? 0 : -1 }, this.renderHeaderNode(), this.renderContent(), this.renderFooterSlottedContent() || this.renderFooterActions()));
    return (h(Fragment, null, loading || disabled ? h("calcite-scrim", { loading: loading }) : null, panelNode));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "dismissed": ["dismissedHandler"]
  }; }
};
CalcitePanel.style = calcitePanelCss;

export { CalcitePanel as calcite_panel };
