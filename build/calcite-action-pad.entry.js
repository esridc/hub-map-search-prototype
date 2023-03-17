import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { t as toggleChildActionText, C as CalciteExpandToggle } from './CalciteExpandToggle-e5374ee4.js';
import { f as focusElement, b as getSlotted, a as getElementDir, C as CSS_UTILITY } from './dom-35210035.js';
import './resources-a467bc91.js';
import './resources-9f52028e.js';
import './guid-9ad8042d.js';

const CSS = {
  actionGroupBottom: "action-group--bottom",
  container: "container"
};
const TEXT = {
  expand: "Expand",
  collapse: "Collapse"
};
const SLOTS = {
  expandTooltip: "expand-tooltip"
};

const calciteActionPadCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;-webkit-animation:in var(--calcite-animation-timing) ease-in-out;animation:in var(--calcite-animation-timing) ease-in-out;border-radius:0.125rem}:host([expanded]){max-width:20vw}::slotted(calcite-action-group){border-width:0;border-bottom-width:1px;border-color:var(--calcite-ui-border-3);border-style:solid;padding-bottom:0;padding-top:0}.container{flex-direction:column;display:inline-flex;overflow-y:auto;border-radius:0.25rem;background-color:var(--calcite-ui-background);box-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);max-width:15vw}.action-group--bottom{flex-grow:1;justify-content:flex-end;padding-bottom:0}:host([layout=horizontal]) .container{flex-direction:row;max-width:unset}:host([layout=horizontal]) .container .action-group--bottom{padding:0}:host([layout=horizontal]) .container ::slotted(calcite-action-group){border-width:0;border-right-width:1px;padding:0}:host([layout=horizontal]) .container.calcite--rtl ::slotted(calcite-action-group){border-width:0;border-left-width:1px}::slotted(calcite-action-group:last-child){border-bottom-width:0}";

const CalciteActionPad = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteActionPadToggle = createEvent(this, "calciteActionPadToggle", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * When set to true, the expand-toggling behavior will be disabled.
     */
    this.expandDisabled = false;
    /**
     * Indicates whether widget is expanded.
     */
    this.expanded = false;
    /**
     * Indicates the horizontal or vertical layout of the component.
     */
    this.layout = "vertical";
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.actionMenuOpenChangeHandler = (event) => {
      if (event.detail) {
        const composedPath = event.composedPath();
        Array.from(this.el.querySelectorAll("calcite-action-group")).forEach((group) => {
          if (!composedPath.includes(group)) {
            group.menuOpen = false;
          }
        });
      }
    };
    this.toggleExpand = () => {
      this.expanded = !this.expanded;
    };
    this.setExpandToggleRef = (el) => {
      this.expandToggleEl = el;
    };
  }
  expandHandler(expandDisabled) {
    if (!expandDisabled) {
      toggleChildActionText({ parent: this.el, expanded: this.expanded });
    }
  }
  expandedHandler(expanded) {
    if (!this.expandDisabled) {
      toggleChildActionText({ parent: this.el, expanded });
    }
    this.calciteActionPadToggle.emit();
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  componentWillLoad() {
    const { el, expandDisabled, expanded } = this;
    if (!expandDisabled) {
      toggleChildActionText({ parent: el, expanded });
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus(focusId) {
    if (focusId === "expand-toggle") {
      await focusElement(this.expandToggleEl);
      return;
    }
    this.el.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------
  renderBottomActionGroup() {
    const { expanded, expandDisabled, intlExpand, intlCollapse, el, position, toggleExpand, scale } = this;
    const tooltip = getSlotted(el, SLOTS.expandTooltip);
    const expandLabel = intlExpand || TEXT.expand;
    const collapseLabel = intlCollapse || TEXT.collapse;
    const expandToggleNode = !expandDisabled ? (h(CalciteExpandToggle, { el: el, expanded: expanded, intlCollapse: collapseLabel, intlExpand: expandLabel, position: position, ref: this.setExpandToggleRef, scale: scale, toggle: toggleExpand, tooltip: tooltip })) : null;
    return expandToggleNode ? (h("calcite-action-group", { class: CSS.actionGroupBottom, scale: scale }, h("slot", { name: SLOTS.expandTooltip }), expandToggleNode)) : null;
  }
  render() {
    const rtl = getElementDir(this.el) === "rtl";
    const containerClasses = {
      [CSS.container]: true,
      [CSS_UTILITY.rtl]: rtl
    };
    return (h(Host, { onCalciteActionMenuOpenChange: this.actionMenuOpenChangeHandler }, h("div", { class: containerClasses }, h("slot", null), this.renderBottomActionGroup())));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "expandDisabled": ["expandHandler"],
    "expanded": ["expandedHandler"]
  }; }
};
CalciteActionPad.style = calciteActionPadCss;

export { CalciteActionPad as calcite_action_pad };
