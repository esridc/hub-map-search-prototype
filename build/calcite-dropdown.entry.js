import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { g as getKey } from './key-4c5a210a.js';
import { a as getElementDir, C as CSS_UTILITY, f as focusElement } from './dom-35210035.js';
import { C as CSS, u as updatePopper, c as createPopper } from './popper-4adad776.js';
import './guid-9ad8042d.js';

const DefaultDropdownPlacement = "bottom-leading";
const SLOTS = {
  dropdownTrigger: "dropdown-trigger"
};

const calciteDropdownCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{position:relative;display:inline-flex;flex:0 1 auto}:host([disabled]){pointer-events:none;opacity:var(--calcite-ui-opacity-disabled)}:host .calcite-dropdown-wrapper{display:block;position:absolute;z-index:900;transform:scale(0);visibility:hidden;pointer-events:none}.calcite-dropdown-wrapper .calcite-popper-anim{position:relative;z-index:1;transition:var(--calcite-popper-transition);visibility:hidden;transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);border-radius:0.25rem}.calcite-dropdown-wrapper[data-popper-placement^=bottom] .calcite-popper-anim{transform:translateY(-5px)}.calcite-dropdown-wrapper[data-popper-placement^=top] .calcite-popper-anim{transform:translateY(5px)}.calcite-dropdown-wrapper[data-popper-placement^=left] .calcite-popper-anim{transform:translateX(5px)}.calcite-dropdown-wrapper[data-popper-placement^=right] .calcite-popper-anim{transform:translateX(-5px)}.calcite-dropdown-wrapper[data-popper-placement] .calcite-popper-anim--active{opacity:1;visibility:visible;transform:translate(0)}:host([active]) .calcite-dropdown-wrapper{pointer-events:initial;visibility:visible}:host .calcite-dropdown-content{background-color:var(--calcite-ui-foreground-1);overflow:hidden;overflow-y:auto;width:auto;max-height:90vh;width:var(--calcite-dropdown-width)}.calcite-dropdown-trigger-container{display:flex;flex:1 1 auto;position:relative}:host([width=s]){--calcite-dropdown-width:12rem}:host([width=m]){--calcite-dropdown-width:14rem}:host([width=l]){--calcite-dropdown-width:16rem}:host([scale=s]){--calcite-dropdown-group-padding:0.5rem 0;--calcite-dropdown-item-padding:0.25rem 0.75rem 0.25rem 1.5rem}:host([scale=m]){--calcite-dropdown-group-padding:0.5rem 0;--calcite-dropdown-item-padding:0.5rem 0.75rem 0.5rem 1.5rem}:host([scale=l]){--calcite-dropdown-group-padding:0.75rem 0;--calcite-dropdown-item-padding:0.5rem 0.75rem 0.5rem 1.5rem}:host([scale=s]) .calcite--rtl{--calcite-dropdown-item-padding:0.25rem 1.5rem 0.25rem 0.75rem}:host([scale=m]) .calcite--rtl{--calcite-dropdown-item-padding:0.5rem 1.5rem 0.5rem 0.75rem}:host([scale=l]) .calcite--rtl{--calcite-dropdown-item-padding:0.5rem 1.5rem 0.5rem 0.75rem}";

const CalciteDropdown = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteDropdownSelect = createEvent(this, "calciteDropdownSelect", 7);
    this.calciteDropdownOpen = createEvent(this, "calciteDropdownOpen", 7);
    this.calciteDropdownClose = createEvent(this, "calciteDropdownClose", 7);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /** Opens or closes the dropdown */
    this.active = false;
    /**
     allow the dropdown to remain open after a selection is made
     if the selection-mode of the selected item's containing group is "none", the dropdown will always close
     */
    this.disableCloseOnSelect = false;
    /** is the dropdown disabled  */
    this.disabled = false;
    /**
     specify the maximum number of calcite-dropdown-items to display before showing the scroller, must be greater than 0 -
     this value does not include groupTitles passed to calcite-dropdown-group
    */
    this.maxItems = 0;
    /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
    this.overlayPositioning = "absolute";
    /**
     * Determines where the dropdown will be positioned relative to the button.
     * @default "bottom-leading"
     */
    this.placement = DefaultDropdownPlacement;
    /** specify the scale of dropdown, defaults to m */
    this.scale = "m";
    /**
     * **read-only** The currently selected items
     *
     * @readonly
     */
    this.selectedItems = [];
    /** specify whether the dropdown is opened by hover or click of a trigger element */
    this.type = "click";
    /** specify the width of dropdown, defaults to m */
    this.width = "m";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    this.items = [];
    /** specifies the item wrapper height; it is updated when maxItems is > 0  **/
    this.maxScrollerHeight = 0;
    this.activeTransitionProp = "opacity";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.transitionEnd = (event) => {
      if (event.propertyName === this.activeTransitionProp) {
        this.active ? this.calciteDropdownOpen.emit() : this.calciteDropdownClose.emit();
      }
    };
    this.setReferenceEl = (el) => {
      this.referenceEl = el;
    };
    this.setMenuEl = (el) => {
      this.menuEl = el;
    };
    this.openDropdown = (e) => {
      const target = e.target;
      if (this.triggers.includes(target) ||
        this.triggers.some((trigger) => trigger.contains(target))) {
        e.preventDefault();
        e.stopPropagation();
        this.openCalciteDropdown();
      }
    };
    this.keyDownHandler = (e) => {
      const target = e.target;
      const key = getKey(e.key);
      if (this.triggers.includes(target) ||
        this.triggers.some((trigger) => trigger.contains(target))) {
        if (target.nodeName !== "BUTTON" && target.nodeName !== "CALCITE-BUTTON") {
          switch (key) {
            case " ":
            case "Enter":
              this.openCalciteDropdown();
              break;
            case "Escape":
              this.closeCalciteDropdown();
              break;
          }
        }
        else if (this.active && (key === "Escape" || (e.shiftKey && key === "Tab"))) {
          this.closeCalciteDropdown();
        }
      }
    };
    this.focusOnFirstActiveOrFirstItem = () => {
      this.getFocusableElement(this.items.find((item) => item.active) || this.items[0]);
    };
    this.toggleOpenEnd = () => {
      this.focusOnFirstActiveOrFirstItem();
      this.el.removeEventListener("calciteDropdownOpen", this.toggleOpenEnd);
    };
    this.openCalciteDropdown = () => {
      this.active = !this.active;
      if (this.active) {
        this.el.addEventListener("calciteDropdownOpen", this.toggleOpenEnd);
      }
    };
  }
  activeHandler() {
    this.reposition();
  }
  placementHandler() {
    this.reposition();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.createPopper();
  }
  componentWillLoad() {
    // get initially selected items
    this.updateSelectedItems();
  }
  componentDidLoad() {
    this.triggers = Array.from(this.el.querySelectorAll("[slot=dropdown-trigger]"));
    const groups = Array.from(this.el.querySelectorAll("calcite-dropdown-group"));
    this.maxScrollerHeight = this.getMaxScrollerHeight(groups);
    this.items = Array.from(this.el.querySelectorAll("calcite-dropdown-item"));
    this.reposition();
  }
  disconnectedCallback() {
    this.destroyPopper();
  }
  render() {
    const { active, maxScrollerHeight } = this;
    const dir = getElementDir(this.el);
    return (h(Host, { tabIndex: this.disabled ? -1 : null }, h("div", { class: { ["calcite-dropdown-trigger-container"]: true, [CSS_UTILITY.rtl]: dir === "rtl" }, onClick: this.openDropdown, onKeyDown: this.keyDownHandler, ref: this.setReferenceEl }, h("slot", { "aria-expanded": active.toString(), "aria-haspopup": "true", name: SLOTS.dropdownTrigger })), h("div", { "aria-hidden": (!active).toString(), class: "calcite-dropdown-wrapper", ref: this.setMenuEl }, h("div", { class: {
        ["calcite-dropdown-content"]: true,
        [CSS.animation]: true,
        [CSS.animationActive]: active
      }, onTransitionEnd: this.transitionEnd, style: {
        maxHeight: maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : ""
      } }, h("slot", null)))));
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Updates the position of the component. */
  async reposition() {
    const { popper, menuEl, placement } = this;
    const modifiers = this.getModifiers();
    popper
      ? updatePopper({
        el: menuEl,
        modifiers,
        placement,
        popper
      })
      : this.createPopper();
  }
  closeCalciteDropdownOnClick(e) {
    const target = e.target;
    if (!this.disableCloseOnSelect &&
      this.active &&
      target.nodeName !== "CALCITE-DROPDOWN-ITEM" &&
      target.nodeName !== "CALCITE-DROPDOWN-GROUP") {
      this.closeCalciteDropdown();
    }
  }
  closeCalciteDropdownOnEvent() {
    this.closeCalciteDropdown();
  }
  closeCalciteDropdownOnOpenEvent(e) {
    if (e.composedPath().includes(this.el)) {
      return;
    }
    this.active = false;
  }
  mouseEnterHandler() {
    if (this.type === "hover") {
      this.openCalciteDropdown();
    }
  }
  mouseLeaveHandler() {
    if (this.type === "hover") {
      this.closeCalciteDropdown();
    }
  }
  calciteDropdownItemKeyEvent(e) {
    const { keyboardEvent } = e.detail;
    // handle edge
    const target = keyboardEvent.target;
    const itemToFocus = target.nodeName !== "A" ? target : target.parentNode;
    const isFirstItem = this.itemIndex(itemToFocus) === 0;
    const isLastItem = this.itemIndex(itemToFocus) === this.items.length - 1;
    switch (getKey(keyboardEvent.key)) {
      case "Tab":
        if (isLastItem && !keyboardEvent.shiftKey) {
          this.closeCalciteDropdown();
        }
        else if (isFirstItem && keyboardEvent.shiftKey) {
          this.closeCalciteDropdown();
        }
        else if (keyboardEvent.shiftKey) {
          this.focusPrevItem(itemToFocus);
        }
        else {
          this.focusNextItem(itemToFocus);
        }
        break;
      case "ArrowDown":
        this.focusNextItem(itemToFocus);
        break;
      case "ArrowUp":
        this.focusPrevItem(itemToFocus);
        break;
      case "Home":
        this.focusFirstItem();
        break;
      case "End":
        this.focusLastItem();
        break;
    }
    e.stopPropagation();
  }
  handleItemSelect(event) {
    this.updateSelectedItems();
    event.stopPropagation();
    this.calciteDropdownSelect.emit();
    if (!this.disableCloseOnSelect ||
      event.detail.requestedDropdownGroup.selectionMode === "none") {
      this.closeCalciteDropdown();
    }
  }
  getModifiers() {
    const flipModifier = {
      name: "flip",
      enabled: true
    };
    flipModifier.options = {
      fallbackPlacements: ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"]
    };
    return [flipModifier];
  }
  createPopper() {
    this.destroyPopper();
    const { menuEl, referenceEl, placement, overlayPositioning } = this;
    const modifiers = this.getModifiers();
    this.popper = createPopper({
      el: menuEl,
      modifiers,
      overlayPositioning,
      placement,
      referenceEl
    });
  }
  destroyPopper() {
    const { popper } = this;
    if (popper) {
      popper.destroy();
    }
    this.popper = null;
  }
  updateSelectedItems() {
    const items = Array.from(this.el.querySelectorAll("calcite-dropdown-item"));
    this.selectedItems = items.filter((item) => item.active);
  }
  getMaxScrollerHeight(groups) {
    const { maxItems } = this;
    let itemsToProcess = 0;
    let maxScrollerHeight = 0;
    let groupHeaderHeight;
    groups.forEach((group) => {
      if (maxItems > 0 && itemsToProcess < maxItems) {
        Array.from(group.children).forEach((item, index) => {
          if (index === 0) {
            if (isNaN(groupHeaderHeight)) {
              groupHeaderHeight = item.offsetTop;
            }
            maxScrollerHeight += groupHeaderHeight;
          }
          if (itemsToProcess < maxItems) {
            maxScrollerHeight += item.offsetHeight;
            itemsToProcess += 1;
          }
        });
      }
    });
    return maxScrollerHeight;
  }
  closeCalciteDropdown() {
    this.active = false;
    focusElement(this.triggers[0]);
  }
  focusFirstItem() {
    const firstItem = this.items[0];
    this.getFocusableElement(firstItem);
  }
  focusLastItem() {
    const lastItem = this.items[this.items.length - 1];
    this.getFocusableElement(lastItem);
  }
  focusNextItem(e) {
    const index = this.itemIndex(e);
    const nextItem = this.items[index + 1] || this.items[0];
    this.getFocusableElement(nextItem);
  }
  focusPrevItem(e) {
    const index = this.itemIndex(e);
    const prevItem = this.items[index - 1] || this.items[this.items.length - 1];
    this.getFocusableElement(prevItem);
  }
  itemIndex(e) {
    return this.items.indexOf(e);
  }
  getFocusableElement(item) {
    if (!item) {
      return;
    }
    const target = item.attributes.isLink
      ? item.shadowRoot.querySelector("a")
      : item;
    focusElement(target);
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "active": ["activeHandler"],
    "placement": ["placementHandler"]
  }; }
};
CalciteDropdown.style = calciteDropdownCss;

export { CalciteDropdown as calcite_dropdown };
