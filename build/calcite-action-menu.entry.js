import { r as registerInstance, e as createEvent, h, F as Fragment, g as getElement } from './index-d836c4a8.js';
import { S as SLOTS, C as CSS, I as ICONS } from './resources-a467bc91.js';
import { b as getSlotted, f as focusElement } from './dom-35210035.js';
import { g as getRoundRobinIndex } from './array-e627ad50.js';
import { g as guid } from './guid-9ad8042d.js';
import { c as createObserver } from './observers-93f01172.js';

const calciteActionMenuCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;flex-direction:column;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size-1)}.menu ::slotted(calcite-action){display:flex;outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;margin:0.125rem}::slotted(calcite-action[active]){outline:2px solid var(--calcite-ui-brand);outline-offset:2px;outline-offset:0px}.default-trigger{align-self:stretch;flex:0 1 auto;height:100%;position:relative}slot[name=trigger]::slotted(calcite-action),calcite-action::slotted([slot=trigger]){align-self:stretch;flex:0 1 auto;height:100%;position:relative}.menu{flex-direction:column;flex-wrap:nowrap;outline:2px solid transparent;outline-offset:2px}";

const SUPPORTED_BUTTON_NAV_KEYS = ["ArrowUp", "ArrowDown"];
const SUPPORTED_MENU_NAV_KEYS = ["ArrowUp", "ArrowDown", "End", "Home"];
const CalciteActionMenu = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteActionMenuOpenChange = createEvent(this, "calciteActionMenuOpenChange", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * Indicates whether widget is expanded.
     */
    this.expanded = false;
    /**
     * Opens the action menu.
     */
    this.open = false;
    /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
    this.overlayPositioning = "absolute";
    /**
     * Determines where the component will be positioned relative to the referenceElement.
     * @see [PopperPlacement](https://github.com/Esri/calcite-components/blob/master/src/utils/popper.ts#L25)
     */
    this.placement = "auto";
    this.actionElements = [];
    this.mutationObserver = createObserver("mutation", () => this.getActions());
    this.guid = `calcite-action-menu-${guid()}`;
    this.menuId = `${this.guid}-menu`;
    this.menuButtonId = `${this.guid}-menu-button`;
    this.activeMenuItemIndex = -1;
    // --------------------------------------------------------------------------
    //
    //  Component Methods
    //
    // --------------------------------------------------------------------------
    this.connectMenuButtonEl = () => {
      const { el, menuButtonId, menuId, open, label } = this;
      const menuButtonEl = getSlotted(el, SLOTS.trigger) || this.defaultMenuButtonEl;
      if (this.menuButtonEl === menuButtonEl) {
        return;
      }
      this.disconnectMenuButtonEl();
      this.menuButtonEl = menuButtonEl;
      this.setTooltipReferenceElement();
      if (!menuButtonEl) {
        return;
      }
      menuButtonEl.active = open;
      menuButtonEl.setAttribute("aria-controls", menuId);
      menuButtonEl.setAttribute("aria-expanded", open.toString());
      menuButtonEl.setAttribute("aria-haspopup", "true");
      if (!menuButtonEl.id) {
        menuButtonEl.id = menuButtonId;
      }
      if (!menuButtonEl.label) {
        menuButtonEl.label = label;
      }
      if (!menuButtonEl.text) {
        menuButtonEl.text = label;
      }
      menuButtonEl.addEventListener("click", this.menuButtonClick);
      menuButtonEl.addEventListener("keydown", this.menuButtonKeyDown);
      menuButtonEl.addEventListener("keyup", this.menuButtonKeyUp);
    };
    this.disconnectMenuButtonEl = () => {
      const { menuButtonEl } = this;
      if (!menuButtonEl) {
        return;
      }
      menuButtonEl.removeEventListener("click", this.menuButtonClick);
      menuButtonEl.removeEventListener("keydown", this.menuButtonKeyDown);
      menuButtonEl.removeEventListener("keyup", this.menuButtonKeyUp);
    };
    this.setDefaultMenuButtonEl = (el) => {
      this.defaultMenuButtonEl = el;
      this.connectMenuButtonEl();
    };
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.handleCalciteActionClick = () => {
      this.open = false;
      this.setFocus();
    };
    this.menuButtonClick = () => {
      this.toggleOpen();
    };
    this.setTooltipReferenceElement = () => {
      const { el, expanded, menuButtonEl } = this;
      const slotted = getSlotted(el, SLOTS.tooltip);
      const tooltip = (slotted === null || slotted === void 0 ? void 0 : slotted.tagName) === "SLOT" ? slotted.assignedElements()[0] : slotted;
      if ((tooltip === null || tooltip === void 0 ? void 0 : tooltip.tagName) === "CALCITE-TOOLTIP") {
        tooltip.referenceElement = !expanded ? menuButtonEl : null;
      }
    };
    this.updateAction = (action, index) => {
      const { guid, activeMenuItemIndex } = this;
      const id = `${guid}-action-${index}`;
      action.tabIndex = -1;
      action.setAttribute("role", "menuitem");
      if (!action.id) {
        action.id = id;
      }
      action.active = index === activeMenuItemIndex;
    };
    this.updateActions = (actions) => {
      actions === null || actions === void 0 ? void 0 : actions.forEach(this.updateAction);
    };
    this.getActions = () => {
      const { el } = this;
      const assignedActions = this.getAssignedElements().filter((element) => element.tagName === "CALCITE-ACTION" && element.slot !== "trigger");
      const actionElements = assignedActions.length
        ? assignedActions
        : Array.from(el.querySelectorAll("calcite-action:not([slot=trigger])"));
      this.updateActions(actionElements);
      this.actionElements = actionElements;
      this.connectMenuButtonEl();
    };
    this.menuButtonKeyUp = (event) => {
      const { key } = event;
      const { actionElements } = this;
      if (!this.isValidKey(key, SUPPORTED_BUTTON_NAV_KEYS)) {
        return;
      }
      event.preventDefault();
      if (!actionElements.length) {
        return;
      }
      this.toggleOpen(true);
      this.handleActionNavigation(key, actionElements);
    };
    this.menuButtonKeyDown = (event) => {
      const { key } = event;
      if (!this.isValidKey(key, SUPPORTED_BUTTON_NAV_KEYS)) {
        return;
      }
      event.preventDefault();
    };
    this.menuActionsContainerKeyDown = (event) => {
      const { key } = event;
      const { actionElements, activeMenuItemIndex } = this;
      if (key === "Tab") {
        this.open = false;
        return;
      }
      if (key === " " || key === "Enter") {
        event.preventDefault();
        const action = actionElements[activeMenuItemIndex];
        action ? action.click() : this.toggleOpen(false);
        return;
      }
      if (this.isValidKey(key, SUPPORTED_MENU_NAV_KEYS)) {
        event.preventDefault();
      }
    };
    this.menuActionsContainerKeyUp = (event) => {
      const { key } = event;
      const { actionElements } = this;
      if (key === "Escape") {
        this.toggleOpen(false);
        return;
      }
      if (!this.isValidKey(key, SUPPORTED_MENU_NAV_KEYS)) {
        return;
      }
      event.preventDefault();
      if (!actionElements.length) {
        return;
      }
      this.handleActionNavigation(key, actionElements);
    };
    this.handleActionNavigation = (key, actions) => {
      const currentIndex = this.activeMenuItemIndex;
      if (key === "Home") {
        this.activeMenuItemIndex = 0;
      }
      if (key === "End") {
        this.activeMenuItemIndex = actions.length - 1;
      }
      if (key === "ArrowUp") {
        this.activeMenuItemIndex = getRoundRobinIndex(Math.max(currentIndex - 1, -1), actions.length);
      }
      if (key === "ArrowDown") {
        this.activeMenuItemIndex = getRoundRobinIndex(currentIndex + 1, actions.length);
      }
    };
    this.toggleOpenEnd = () => {
      this.setFocus();
      this.el.removeEventListener("calcitePopoverOpen", this.toggleOpenEnd);
    };
    this.toggleOpen = (value = !this.open) => {
      this.el.addEventListener("calcitePopoverOpen", this.toggleOpenEnd);
      this.open = value;
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    this.mutationObserver.observe(this.el, { childList: true, subtree: true });
    this.getActions();
  }
  disconnectedCallback() {
    this.mutationObserver.disconnect();
    this.disconnectMenuButtonEl();
  }
  expandedHandler() {
    this.open = false;
    this.setTooltipReferenceElement();
  }
  openHandler(open) {
    this.activeMenuItemIndex = this.open ? 0 : -1;
    if (this.menuButtonEl) {
      this.menuButtonEl.active = open;
    }
    this.calciteActionMenuOpenChange.emit(open);
  }
  closeCalciteActionMenuOnClick(event) {
    const composedPath = event.composedPath();
    if (composedPath.includes(this.el)) {
      return;
    }
    this.open = false;
  }
  activeMenuItemIndexHandler() {
    this.updateActions(this.actionElements);
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    focusElement(this.open ? this.menuEl : this.menuButtonEl);
  }
  renderMenuButton() {
    const { el, label, scale } = this;
    const menuButtonSlot = (h("slot", { name: SLOTS.trigger }, h("calcite-action", { class: CSS.defaultTrigger, icon: ICONS.menu, ref: this.setDefaultMenuButtonEl, scale: scale, text: label })));
    return getSlotted(el, SLOTS.tooltip) ? (h("calcite-tooltip-manager", null, menuButtonSlot)) : (menuButtonSlot);
  }
  renderMenuItems() {
    const { actionElements, activeMenuItemIndex, open, menuId, menuButtonEl, label, placement, overlayPositioning } = this;
    const activeAction = actionElements[activeMenuItemIndex];
    const activeDescendantId = (activeAction === null || activeAction === void 0 ? void 0 : activeAction.id) || null;
    return (h("calcite-popover", { disablePointer: true, label: label, offsetDistance: 0, open: open, overlayPositioning: overlayPositioning, placement: placement, referenceElement: menuButtonEl }, h("div", { "aria-activedescendant": activeDescendantId, "aria-labelledby": menuButtonEl === null || menuButtonEl === void 0 ? void 0 : menuButtonEl.id, class: CSS.menu, id: menuId, onClick: this.handleCalciteActionClick, onKeyDown: this.menuActionsContainerKeyDown, onKeyUp: this.menuActionsContainerKeyUp, ref: (el) => (this.menuEl = el), role: "menu", tabIndex: -1 }, h("slot", null))));
  }
  render() {
    return (h(Fragment, null, this.renderMenuButton(), this.renderMenuItems(), h("slot", { name: SLOTS.tooltip })));
  }
  getAssignedElements() {
    return Array.from(this.el.querySelectorAll("slot"))
      .map((slot) => slot.assignedElements({ flatten: true }))
      .reduce((ar, val) => ar.concat(val), []);
  }
  isValidKey(key, supportedKeys) {
    return !!supportedKeys.find((k) => k === key);
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "expanded": ["expandedHandler"],
    "open": ["openHandler"],
    "activeMenuItemIndex": ["activeMenuItemIndexHandler"]
  }; }
};
CalciteActionMenu.style = calciteActionMenuCss;

export { CalciteActionMenu as calcite_action_menu };
