import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { e as escapeRegExp, f as forIn, d as debounce } from './lodash-b99b737e.js';
import { a as getElementDir } from './dom-35210035.js';
import { g as getKey } from './key-4c5a210a.js';
import { u as updatePopper, c as createPopper, C as CSS } from './popper-4adad776.js';
import { g as guid } from './guid-9ad8042d.js';
import { C as ComboboxItemGroup, a as ComboboxDefaultPlacement, b as ComboboxChildSelector, g as getItemAncestors, c as getItemChildren, h as hasActiveChildren, d as ComboboxItem } from './utils-23e7614e.js';
import { c as createObserver } from './observers-93f01172.js';

const filter = (data, value) => {
  const escapedValue = escapeRegExp(value);
  const regex = new RegExp(escapedValue, "ig");
  if (data.length === 0) {
    console.warn(`No data was passed to the filter function.
    The data argument should be an array of objects`);
  }
  const find = (input, RE) => {
    var _a;
    if ((_a = input) === null || _a === void 0 ? void 0 : _a.constant) {
      return true;
    }
    let found = false;
    forIn(input, (val) => {
      if (typeof val === "function") {
        return;
      }
      if (Array.isArray(val) || (typeof val === "object" && val !== null)) {
        if (find(val, RE)) {
          found = true;
        }
      }
      else if (RE.test(val)) {
        found = true;
      }
    });
    return found;
  };
  const result = data.filter((item) => {
    return find(item, regex);
  });
  return result;
};

const calciteComboboxCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;position:relative}:host([disabled]){pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;opacity:0.5}:host([scale=s]){font-size:var(--calcite-font-size--2);--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-input-height:1.5rem}:host([scale=m]){font-size:var(--calcite-font-size--1);--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-input-height:2rem}:host([scale=l]){font-size:var(--calcite-font-size-0);--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.75rem;--calcite-combobox-input-height:2.75rem}.wrapper{display:flex;flex-wrap:wrap;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-1);outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;box-shadow:inset 0 0 0 1px var(--calcite-ui-border-input);padding:var(--calcite-combobox-item-spacing-unit-s) var(--calcite-combobox-item-spacing-unit-l) 0 var(--calcite-combobox-item-spacing-unit-l)}:host(:focus-within) .wrapper,.wrapper--active{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.wrapper--single{padding:0 var(--calcite-combobox-item-spacing-unit-l);cursor:pointer;flex-wrap:nowrap}.input{flex-grow:1;font-family:inherit;padding:0;background-color:transparent;border-style:none;color:var(--calcite-ui-text-1);-webkit-appearance:none;-moz-appearance:none;appearance:none;font-size:inherit;height:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height);min-width:120px;margin-bottom:var(--calcite-combobox-item-spacing-unit-s)}.input:focus{outline:2px solid transparent;outline-offset:2px}.input--transparent{opacity:0}.input--single{margin-bottom:0;margin-top:0;padding:0}.wrapper--active .input-single{cursor:text}.input--hidden{width:0;min-width:0;opacity:0;pointer-events:none}.input--icon{padding:0 var(--calcite-combobox-item-spacing-unit-l)}.input-wrap{display:flex}.input-wrap--single{flex:1 1 auto;overflow:hidden}.label{padding:0;display:block;flex:1 1 auto;pointer-events:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;height:var(--calcite-combobox-input-height);line-height:var(--calcite-combobox-input-height)}.label--spaced{padding-top:0;padding-bottom:0;padding-left:var(--calcite-combobox-item-spacing-unit-l);padding-right:var(--calcite-combobox-item-spacing-unit-l)}.icon-end,.icon-start{cursor:pointer;display:flex;align-items:center;width:1rem}.popper-container{width:100%;display:block;position:absolute;z-index:900;transform:scale(0);visibility:hidden;pointer-events:none}.popper-container .calcite-popper-anim{position:relative;z-index:1;transition:var(--calcite-popper-transition);visibility:hidden;transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);border-radius:0.25rem}.popper-container[data-popper-placement^=bottom] .calcite-popper-anim{transform:translateY(-5px)}.popper-container[data-popper-placement^=top] .calcite-popper-anim{transform:translateY(5px)}.popper-container[data-popper-placement^=left] .calcite-popper-anim{transform:translateX(5px)}.popper-container[data-popper-placement^=right] .calcite-popper-anim{transform:translateX(-5px)}.popper-container[data-popper-placement] .calcite-popper-anim--active{opacity:1;visibility:visible;transform:translate(0)}.popper-container--active{pointer-events:initial;visibility:visible}.screen-readers-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}.list-container{overflow-y:auto;max-height:100vh;background-color:var(--calcite-ui-foreground-1);width:var(--calcite-dropdown-width)}.list{display:block;margin:0;padding:0}.list--hide{height:0;overflow:hidden}.chip{margin-right:var(--calcite-combobox-item-spacing-unit-s);margin-bottom:var(--calcite-combobox-item-spacing-unit-s);max-width:100%}.chip--active{background-color:var(--calcite-ui-foreground-3)}.chip:last-child{margin-right:0}.chip--rtl{margin-right:unset;margin-left:var(--calcite-combobox-item-spacing-unit-l)}.chip--rtl:last-child{margin-left:0}.item{display:block}";

const isGroup = (el) => el.tagName === ComboboxItemGroup;
const CalciteCombobox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteLookupChange = createEvent(this, "calciteLookupChange", 7);
    this.calciteComboboxChange = createEvent(this, "calciteComboboxChange", 7);
    this.calciteComboboxFilterChange = createEvent(this, "calciteComboboxFilterChange", 7);
    this.calciteComboboxChipDismiss = createEvent(this, "calciteComboboxChipDismiss", 7);
    this.calciteComboboxOpen = createEvent(this, "calciteComboboxOpen", 7);
    this.calciteComboboxClose = createEvent(this, "calciteComboboxClose", 7);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /** Opens or closes the combobox */
    this.active = false;
    /** Disable combobox input */
    this.disabled = false;
    /** Specify the maximum number of combobox items (including nested children) to display before showing the scroller */
    this.maxItems = 0;
    /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
    this.overlayPositioning = "absolute";
    /** specify the selection mode
     * - multi: allow any number of selected items (default)
     * - single: only one selection)
     * - ancestors: like multi, but show ancestors of selected items as selected, only deepest children shown in chips
     */
    this.selectionMode = "multi";
    /** Specify the scale of the combobox, defaults to m */
    this.scale = "m";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    this.items = [];
    this.groupItems = [];
    this.selectedItems = [];
    this.visibleItems = [];
    this.hideList = !this.active;
    this.activeItemIndex = -1;
    this.activeChipIndex = -1;
    this.activeDescendant = "";
    this.text = "";
    this.open = this.active;
    /** specifies the item wrapper height; it is updated when maxItems is > 0  **/
    this.maxScrollerHeight = 0;
    this.textInput = null;
    this.mutationObserver = createObserver("mutation", () => this.updateItems());
    this.guid = guid();
    this.inputHeight = 0;
    this.ignoreSelectedEventsFlag = false;
    this.activeTransitionProp = "opacity";
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.keydownHandler = (event) => {
      const key = getKey(event.key, getElementDir(this.el));
      switch (key) {
        case "Tab":
          this.activeChipIndex = -1;
          this.activeItemIndex = -1;
          if (this.allowCustomValues && this.text) {
            this.addCustomChip(this.text, true);
            event.preventDefault();
          }
          else {
            this.active = false;
          }
          break;
        case "ArrowLeft":
          this.previousChip();
          break;
        case "ArrowRight":
          this.nextChip();
          break;
        case "ArrowUp":
          event.preventDefault();
          this.active = true;
          this.shiftActiveItemIndex(-1);
          break;
        case "ArrowDown":
          event.preventDefault();
          this.active = true;
          this.shiftActiveItemIndex(1);
          break;
        case "Home":
          this.active = true;
          this.updateActiveItemIndex(0);
          break;
        case "End":
          this.active = true;
          this.updateActiveItemIndex(this.visibleItems.length - 1);
          break;
        case "Escape":
          this.active = false;
          break;
        case "Enter":
          if (this.activeItemIndex > -1) {
            this.toggleSelection(this.visibleItems[this.activeItemIndex]);
          }
          else if (this.activeChipIndex > -1) {
            this.removeActiveChip();
          }
          else if (this.allowCustomValues && this.text) {
            this.addCustomChip(this.text, true);
          }
          break;
        case "Delete":
        case "Backspace":
          if (this.activeChipIndex > -1) {
            this.removeActiveChip();
          }
          else if (!this.text && this.isMulti()) {
            this.removeLastChip();
          }
          break;
        default:
          if (!this.active) {
            this.setFocus();
          }
          break;
      }
    };
    this.toggleCloseEnd = () => {
      this.hideList = true;
      this.el.removeEventListener("calciteComboboxClose", this.toggleCloseEnd);
    };
    this.toggleOpenEnd = () => {
      this.hideList = false;
      this.el.removeEventListener("calciteComboboxOpen", this.toggleOpenEnd);
    };
    this.transitionEnd = (event) => {
      if (event.propertyName === this.activeTransitionProp) {
        this.active ? this.calciteComboboxOpen.emit() : this.calciteComboboxClose.emit();
      }
    };
    this.setMaxScrollerHeight = () => {
      if (this.active) {
        this.maxScrollerHeight = this.getMaxScrollerHeight(this.getCombinedItems());
      }
    };
    this.calciteChipDismissHandler = (event, comboboxItem) => {
      this.active = false;
      const selection = this.items.find((item) => item === comboboxItem);
      if (selection) {
        this.toggleSelection(selection, false);
      }
      this.calciteComboboxChipDismiss.emit(event.detail);
    };
    this.setFocusClick = () => {
      this.setFocus();
    };
    this.setInactiveIfNotContained = (event) => {
      const composedPath = event.composedPath();
      if (!this.active || composedPath.includes(this.el) || composedPath.includes(this.referenceEl)) {
        return;
      }
      if (this.allowCustomValues && this.text) {
        this.addCustomChip(this.text);
      }
      if (this.selectionMode === "single") {
        if (this.textInput) {
          this.textInput.value = "";
        }
        this.text = "";
        this.filterItems("");
        this.updateActiveItemIndex(-1);
      }
      this.active = false;
    };
    this.setMenuEl = (el) => {
      this.menuEl = el;
    };
    this.setListContainerEl = (el) => {
      this.listContainerEl = el;
    };
    this.setReferenceEl = (el) => {
      this.referenceEl = el;
    };
    this.inputHandler = (event) => {
      const value = event.target.value;
      this.text = value;
      this.filterItems(value);
      if (value) {
        this.activeChipIndex = -1;
      }
    };
    this.filterItems = (() => {
      const find = (item, filteredData) => item &&
        filteredData.some(({ label, value }) => {
          if (isGroup(item)) {
            return value === item.label || value === item.label;
          }
          return (value === item.textLabel ||
            value === item.value ||
            label === item.textLabel ||
            label === item.value);
        });
      return debounce((text) => {
        const filteredData = filter(this.data, text);
        const items = this.getCombinedItems();
        items.forEach((item) => {
          const hidden = !find(item, filteredData);
          item.hidden = hidden;
          const [parent, grandparent] = item.ancestors;
          if (find(parent, filteredData) || find(grandparent, filteredData)) {
            item.hidden = false;
          }
          if (!hidden) {
            item.ancestors.forEach((ancestor) => (ancestor.hidden = false));
          }
        });
        this.visibleItems = this.getVisibleItems();
        this.calciteComboboxFilterChange.emit({ visibleItems: [...this.visibleItems], text: text });
      }, 100);
    })();
    this.internalCalciteLookupChangeEvent = () => {
      this.calciteLookupChange.emit(this.selectedItems);
    };
    this.emitCalciteLookupChange = debounce(this.internalCalciteLookupChangeEvent, 0);
    this.internalComboboxChangeEvent = () => {
      const { selectedItems } = this;
      this.calciteComboboxChange.emit({ selectedItems });
    };
    this.emitComboboxChange = debounce(this.internalComboboxChangeEvent, 0);
    this.updateItems = () => {
      this.items = this.getItems();
      this.groupItems = this.getGroupItems();
      this.data = this.getData();
      this.selectedItems = this.getSelectedItems();
      this.visibleItems = this.getVisibleItems();
      this.needsIcon = this.getNeedsIcon();
      if (!this.allowCustomValues) {
        this.setMaxScrollerHeight();
      }
    };
    this.comboboxFocusHandler = () => {
      this.active = true;
      this.textInput.focus();
    };
    this.comboboxBlurHandler = (event) => {
      this.setInactiveIfNotContained(event);
    };
  }
  activeHandler(newValue, oldValue) {
    // when closing, wait transition time then hide to prevent overscroll
    if (oldValue && !newValue) {
      this.el.addEventListener("calciteComboboxClose", this.toggleCloseEnd);
      this.open = false;
    }
    else if (!oldValue && newValue) {
      this.el.addEventListener("calciteComboboxOpen", this.toggleOpenEnd);
      // give the combobox height, then reposition prior to opening
      requestAnimationFrame(() => {
        this.reposition();
        this.setMaxScrollerHeight();
        this.open = true;
      });
    }
    this.reposition();
    this.setMaxScrollerHeight();
  }
  maxItemsHandler() {
    this.setMaxScrollerHeight();
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  documentClickHandler(event) {
    this.setInactiveIfNotContained(event);
  }
  calciteComboboxItemChangeHandler(event) {
    if (this.ignoreSelectedEventsFlag) {
      return;
    }
    const target = event.target;
    this.toggleSelection(target, target.selected);
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Updates the position of the component. */
  async reposition() {
    const { popper, menuEl } = this;
    const modifiers = this.getModifiers();
    popper
      ? updatePopper({
        el: menuEl,
        modifiers,
        placement: ComboboxDefaultPlacement,
        popper
      })
      : this.createPopper();
  }
  /** Sets focus on the component. */
  async setFocus() {
    var _a;
    this.active = true;
    (_a = this.textInput) === null || _a === void 0 ? void 0 : _a.focus();
    this.activeChipIndex = -1;
    this.activeItemIndex = -1;
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
    this.createPopper();
  }
  componentWillLoad() {
    this.updateItems();
  }
  componentDidRender() {
    if (this.el.offsetHeight !== this.inputHeight) {
      this.reposition();
      this.inputHeight = this.el.offsetHeight;
    }
  }
  disconnectedCallback() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    this.destroyPopper();
  }
  /** when search text is cleared, reset active to  */
  textHandler() {
    this.updateActiveItemIndex(-1);
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
    const { menuEl, referenceEl, overlayPositioning } = this;
    const modifiers = this.getModifiers();
    this.popper = createPopper({
      el: menuEl,
      modifiers,
      overlayPositioning,
      placement: ComboboxDefaultPlacement,
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
  getMaxScrollerHeight(items) {
    const { maxItems } = this;
    let itemsToProcess = 0;
    let maxScrollerHeight = 0;
    items.forEach((item) => {
      if (itemsToProcess < maxItems && maxItems > 0) {
        const height = this.calculateSingleItemHeight(item);
        if (height > 0) {
          maxScrollerHeight += height;
          itemsToProcess++;
        }
      }
    });
    return maxScrollerHeight;
  }
  calculateSingleItemHeight(item) {
    let height = item.offsetHeight;
    // if item has children items, don't count their height twice
    const children = item.querySelectorAll(ComboboxChildSelector);
    children.forEach((child) => {
      height -= child.offsetHeight;
    });
    return height;
  }
  getCombinedItems() {
    return [...this.groupItems, ...this.items];
  }
  toggleSelection(item, value = !item.selected) {
    if (!item) {
      return;
    }
    if (this.isMulti()) {
      item.selected = value;
      this.updateAncestors(item);
      this.selectedItems = this.getSelectedItems();
      this.emitCalciteLookupChange();
      this.emitComboboxChange();
      this.resetText();
      this.textInput.focus();
      this.filterItems("");
    }
    else {
      this.ignoreSelectedEventsFlag = true;
      this.items.forEach((el) => (el.selected = el === item));
      this.ignoreSelectedEventsFlag = false;
      this.selectedItems = this.getSelectedItems();
      this.emitComboboxChange();
      this.textInput.value = item.textLabel;
      this.active = false;
      this.updateActiveItemIndex(-1);
      this.resetText();
      this.filterItems("");
    }
  }
  updateAncestors(item) {
    if (this.selectionMode !== "ancestors") {
      return;
    }
    const ancestors = getItemAncestors(item);
    const children = getItemChildren(item);
    if (item.selected) {
      ancestors.forEach((el) => {
        el.selected = true;
      });
    }
    else {
      children.forEach((el) => (el.selected = false));
      [...ancestors].forEach((el) => {
        if (!hasActiveChildren(el)) {
          el.selected = false;
        }
      });
    }
  }
  getVisibleItems() {
    return this.items.filter((item) => !item.hidden);
  }
  getSelectedItems() {
    return !this.isMulti()
      ? [this.items.find((item) => item.selected)]
      : this.items
        .filter((item) => item.selected && (this.selectionMode !== "ancestors" || !hasActiveChildren(item)))
        /** Preserve order of entered tags */
        .sort((a, b) => {
        const aIdx = this.selectedItems.indexOf(a);
        const bIdx = this.selectedItems.indexOf(b);
        if (aIdx > -1 && bIdx > -1) {
          return aIdx - bIdx;
        }
        return bIdx - aIdx;
      });
  }
  getData() {
    return this.items.map((item) => ({
      constant: item.constant,
      value: item.value,
      label: item.textLabel,
      guid: item.guid
    }));
  }
  getNeedsIcon() {
    return this.selectionMode === "single" && this.items.some((item) => item.icon);
  }
  resetText() {
    this.textInput.value = "";
    this.text = "";
  }
  getItems() {
    const items = Array.from(this.el.querySelectorAll(ComboboxItem));
    return items.filter((item) => !item.disabled);
  }
  getGroupItems() {
    return Array.from(this.el.querySelectorAll(ComboboxItemGroup));
  }
  addCustomChip(value, focus) {
    const existingItem = this.items.find((el) => el.textLabel === value);
    if (existingItem) {
      this.toggleSelection(existingItem, true);
    }
    else {
      const item = document.createElement(ComboboxItem);
      item.value = value;
      item.textLabel = value;
      item.guid = guid();
      item.selected = true;
      this.el.appendChild(item);
      this.resetText();
      if (focus) {
        this.setFocus();
      }
      this.updateItems();
      this.filterItems("");
      this.emitCalciteLookupChange();
      this.emitComboboxChange();
    }
  }
  removeActiveChip() {
    this.toggleSelection(this.selectedItems[this.activeChipIndex], false);
    this.setFocus();
  }
  removeLastChip() {
    this.toggleSelection(this.selectedItems[this.selectedItems.length - 1], false);
    this.setFocus();
  }
  previousChip() {
    if (this.text) {
      return;
    }
    const length = this.selectedItems.length - 1;
    const active = this.activeChipIndex;
    this.activeChipIndex = active === -1 ? length : Math.max(active - 1, 0);
    this.updateActiveItemIndex(-1);
    this.focusChip();
  }
  nextChip() {
    if (this.text || this.activeChipIndex === -1) {
      return;
    }
    const last = this.selectedItems.length - 1;
    const newIndex = this.activeChipIndex + 1;
    if (newIndex > last) {
      this.activeChipIndex = -1;
      this.setFocus();
    }
    else {
      this.activeChipIndex = newIndex;
      this.focusChip();
    }
    this.updateActiveItemIndex(-1);
  }
  focusChip() {
    var _a;
    const guid = (_a = this.selectedItems[this.activeChipIndex]) === null || _a === void 0 ? void 0 : _a.guid;
    const chip = this.referenceEl.querySelector(`#chip-${guid}`);
    chip === null || chip === void 0 ? void 0 : chip.setFocus();
  }
  shiftActiveItemIndex(delta) {
    const length = this.visibleItems.length;
    const newIndex = (this.activeItemIndex + length + delta) % length;
    this.updateActiveItemIndex(newIndex);
    // ensure active item is in view if we have scrolling
    const activeItem = this.visibleItems[this.activeItemIndex];
    const height = this.calculateSingleItemHeight(activeItem);
    const { offsetHeight, scrollTop } = this.listContainerEl;
    if (offsetHeight + scrollTop < activeItem.offsetTop + height) {
      this.listContainerEl.scrollTop = activeItem.offsetTop - offsetHeight + height;
    }
    else if (activeItem.offsetTop < scrollTop) {
      this.listContainerEl.scrollTop = activeItem.offsetTop;
    }
  }
  updateActiveItemIndex(index) {
    this.activeItemIndex = index;
    let activeDescendant = null;
    this.visibleItems.forEach((el, i) => {
      if (i === index) {
        el.active = true;
        activeDescendant = el.guid;
      }
      else {
        el.active = false;
      }
    });
    this.activeDescendant = activeDescendant;
    if (this.activeItemIndex > -1) {
      this.activeChipIndex = -1;
      this.textInput.focus();
    }
  }
  isMulti() {
    return this.selectionMode !== "single";
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  renderChips() {
    const { activeChipIndex, scale, selectionMode, el } = this;
    const dir = getElementDir(el);
    return this.selectedItems.map((item, i) => {
      const chipClasses = {
        chip: true,
        "chip--active": activeChipIndex === i,
        "chip--rtl": dir === "rtl"
      };
      const ancestors = [...getItemAncestors(item)].reverse();
      const pathLabel = [...ancestors, item].map((el) => el.textLabel);
      const label = selectionMode !== "ancestors" ? item.textLabel : pathLabel.join(" / ");
      return (h("calcite-chip", { "aria-label": label, class: chipClasses, dismissLabel: "remove tag", dismissible: true, icon: item.icon, id: `chip-${item.guid}`, key: item.textLabel, onCalciteChipDismiss: (event) => this.calciteChipDismissHandler(event, item), scale: scale, title: label, value: item.value }, label));
    });
  }
  renderInput() {
    const { active, disabled, placeholder, selectionMode, needsIcon, label, selectedItems } = this;
    const single = selectionMode === "single";
    const selectedItem = selectedItems[0];
    const showLabel = !active && single && !!selectedItem;
    return (h("span", { class: {
        "input-wrap": true,
        "input-wrap--single": single
      } }, showLabel && (h("span", { class: {
        label: true,
        "label--spaced": needsIcon
      }, key: "label", onFocus: this.comboboxFocusHandler, tabindex: "0" }, selectedItem.textLabel)), h("input", { "aria-activedescendant": this.activeDescendant, "aria-autocomplete": "list", "aria-controls": guid, "aria-label": label, class: {
        input: true,
        "input--transparent": this.activeChipIndex > -1,
        "input--single": single,
        "input--hidden": showLabel,
        "input--icon": single && needsIcon
      }, disabled: disabled, id: `${guid}-input`, key: "input", onBlur: this.comboboxBlurHandler, onFocus: this.comboboxFocusHandler, onInput: this.inputHandler, placeholder: placeholder, ref: (el) => (this.textInput = el), type: "text" })));
  }
  renderListBoxOptions() {
    return this.visibleItems.map((item) => (h("li", { "aria-selected": (!!item.selected).toString(), id: item.guid, role: "option", tabindex: "-1" }, item.textLabel)));
  }
  renderPopperContainer() {
    const { active, maxScrollerHeight, setMenuEl, setListContainerEl, hideList, open } = this;
    const classes = {
      "list-container": true,
      [CSS.animation]: true,
      [CSS.animationActive]: active
    };
    const style = {
      maxHeight: maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : ""
    };
    return (h("div", { "aria-hidden": "true", class: { "popper-container": true, "popper-container--active": open }, ref: setMenuEl }, h("div", { class: classes, onTransitionEnd: this.transitionEnd, ref: setListContainerEl, style: style }, h("ul", { class: { list: true, "list--hide": hideList } }, h("slot", null)))));
  }
  renderIconStart() {
    const { selectionMode, needsIcon, selectedItems } = this;
    const selectedItem = selectedItems[0];
    return (selectionMode === "single" &&
      needsIcon && (h("span", { class: "icon-start" }, (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.icon) && (h("calcite-icon", { class: "selected-icon", icon: selectedItem.icon, scale: "s" })))));
  }
  renderIconEnd() {
    return (this.selectionMode === "single" && (h("span", { class: "icon-end" }, h("calcite-icon", { icon: "chevron-down", scale: "s" }))));
  }
  render() {
    const { guid, open, label } = this;
    const single = this.selectionMode === "single";
    const labelId = `${guid}-label`;
    return (h(Host, { onKeyDown: this.keydownHandler }, h("div", { "aria-autocomplete": "list", "aria-expanded": open.toString(), "aria-haspopup": "listbox", "aria-labelledby": labelId, "aria-owns": guid, class: {
        wrapper: true,
        "wrapper--active": open,
        "wrapper--single": single
      }, onClick: this.setFocusClick, ref: this.setReferenceEl, role: "combobox" }, this.renderIconStart(), !single && this.renderChips(), h("label", { class: "screen-readers-only", htmlFor: `${guid}-input`, id: labelId }, label), this.renderInput(), this.renderIconEnd()), h("ul", { "aria-labelledby": labelId, "aria-multiselectable": "true", class: "screen-readers-only", id: guid, role: "listbox", tabIndex: -1 }, this.renderListBoxOptions()), this.renderPopperContainer()));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "active": ["activeHandler"],
    "maxItems": ["maxItemsHandler"],
    "text": ["textHandler"]
  }; }
};
CalciteCombobox.style = calciteComboboxCss;

export { CalciteCombobox as calcite_combobox };
