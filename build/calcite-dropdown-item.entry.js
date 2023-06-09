import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { g as getElementProp, a as getElementDir, C as CSS_UTILITY } from './dom-35210035.js';
import { g as getKey } from './key-4c5a210a.js';
import './guid-9ad8042d.js';

const CSS = {
  containerLink: "container--link",
  containerSmall: "container--s",
  containerMedium: "container--m",
  containerLarge: "container--l",
  containerMulti: "container--multi-selection",
  containerSingle: "container--single-selection",
  containerNone: "container--none-selection"
};

const calciteDropdownItemCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}.container--s{font-size:var(--calcite-font-size--2);line-height:1rem;padding-right:0.5rem;padding-left:1.5rem;padding-top:0.25rem;padding-bottom:0.25rem}.container--m{font-size:var(--calcite-font-size--1);line-height:1rem;padding-right:0.75rem;padding-left:2rem;padding-top:0.5rem;padding-bottom:0.5rem}.container--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;padding-right:1rem;padding-left:2.5rem;padding-top:0.75rem;padding-bottom:0.75rem}.container--s.calcite--rtl{padding-right:1.5rem;padding-left:0.5rem}.container--m.calcite--rtl{padding-right:2rem;padding-left:0.75rem}.container--l.calcite--rtl{padding-right:2.5rem;padding-left:1rem}:host{display:flex;flex-grow:1;align-items:center;position:relative}.container{display:flex;flex-grow:1;align-items:center;color:var(--calcite-ui-text-3);transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);cursor:pointer;text-decoration:none;outline:2px solid transparent;outline-offset:2px;position:relative}.dropdown-item-content{margin-right:auto;margin-left:0.25rem}.calcite--rtl .dropdown-item-content{margin-left:auto;margin-right:0}:host,.container--link a{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus),.container--link a:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.container--link{padding:0}.container--link a{display:flex;flex-grow:1;align-items:center;color:var(--calcite-ui-text-3);transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);cursor:pointer;text-decoration:none;outline:2px solid transparent;outline-offset:2px;position:relative}.container--s .dropdown-link{padding-left:0.75rem;padding-right:0.75rem;padding-top:0.5rem;padding-bottom:0.5rem}.container--m .dropdown-link{padding-left:1rem;padding-right:1rem;padding-top:0.75rem;padding-bottom:0.75rem}.container--l .dropdown-link{padding-left:1.25rem;padding-right:1.25rem;padding-top:1rem;padding-bottom:1rem}:host(:hover) .container,:host(:active) .container{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1);text-decoration:none}:host(:focus) .container{color:var(--calcite-ui-text-1);text-decoration:none}:host(:active) .container{background-color:var(--calcite-ui-foreground-3)}:host(:hover) .container:before,:host(:active) .container:before,:host(:focus) .container:before{opacity:1}.calcite--rtl:before{left:unset;right:1rem}:host([active]) .container:not(.container--none-selection){color:var(--calcite-ui-text-1);font-weight:var(--calcite-font-weight-medium)}:host([active]) .container:not(.container--none-selection):before{opacity:1;color:var(--calcite-ui-brand)}:host([active]) .container:not(.container--none-selection) calcite-icon{color:var(--calcite-ui-brand)}.container--s.container--none-selection{padding-left:0.25rem}.container--m.container--none-selection{padding-left:0.5rem}.container--l.container--none-selection{padding-left:0.75rem}.container--multi-selection:before,.container--none-selection:before{display:none}.container--s:before{left:0.5rem}.container--m:before{left:0.75rem}.container--l:before{left:1rem}.calcite--rtl:before{left:unset}.container--s.calcite--rtl:before{right:0.5rem}.container--m.calcite--rtl:before{right:0.75rem}.container--l.calcite--rtl:before{right:1rem}.dropdown-item-icon{position:absolute;opacity:0;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:scale(0.9)}.container--s .dropdown-item-icon{left:0.25rem}.container--m .dropdown-item-icon{left:0.5rem}.container--l .dropdown-item-icon{left:0.75rem}.calcite--rtl .dropdown-item-icon{left:unset;margin-left:0}.container--s.calcite--rtl .dropdown-item-icon{right:0.25rem}.container--m.calcite--rtl .dropdown-item-icon{right:0.5rem}.container--l.calcite--rtl .dropdown-item-icon{right:0.75rem}:host(:hover) .dropdown-item-icon{color:var(--calcite-ui-border-1);opacity:1}:host([active]) .dropdown-item-icon{color:var(--calcite-ui-brand);opacity:1}.container--s .dropdown-item-icon-start{margin-right:0.5rem;margin-left:0.25rem}.container--s .dropdown-item-icon-end{margin-left:0.5rem}.container--m .dropdown-item-icon-start{margin-right:0.75rem;margin-left:0.25rem}.container--m .dropdown-item-icon-end{margin-left:0.75rem}.container--l .dropdown-item-icon-start{margin-right:1rem;margin-left:0.25rem}.container--l .dropdown-item-icon-end{margin-left:1rem}.calcite--rtl .dropdown-item-icon-start{margin-right:0}.calcite--rtl .dropdown-item-icon-end{margin-left:0}.container--s.calcite--rtl .dropdown-item-icon-start{margin-left:0.5rem}.container--s.calcite--rtl .dropdown-item-icon-end{margin-right:0.5rem}.container--m.calcite--rtl .dropdown-item-icon-start{margin-left:0.75rem}.container--m.calcite--rtl .dropdown-item-icon-end{margin-right:0.75rem}.container--l.calcite--rtl .dropdown-item-icon-start{margin-left:1rem}.container--l.calcite--rtl .dropdown-item-icon-end{margin-right:1rem}.calcite--rtl calcite-icon{margin-right:0;margin-left:0.75rem}";

const CalciteDropdownItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteDropdownItemSelect = createEvent(this, "calciteDropdownItemSelect", 7);
    this.calciteDropdownItemKeyEvent = createEvent(this, "calciteDropdownItemKeyEvent", 7);
    this.calciteDropdownCloseRequest = createEvent(this, "calciteDropdownCloseRequest", 7);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /** Indicates whether the item is active. */
    this.active = false;
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    this.el.focus();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.selectionMode = getElementProp(this.el, "selection-mode", "single");
    this.parentDropdownGroupEl = this.el.closest("calcite-dropdown-group");
    if (this.selectionMode === "none") {
      this.active = false;
    }
  }
  render() {
    const dir = getElementDir(this.el);
    const scale = getElementProp(this.el, "scale", "m");
    const iconStartEl = (h("calcite-icon", { class: "dropdown-item-icon-start", dir: dir, flipRtl: this.iconFlipRtl === "start" || this.iconFlipRtl === "both", icon: this.iconStart, scale: "s" }));
    const contentNode = (h("span", { class: "dropdown-item-content" }, h("slot", null)));
    const iconEndEl = (h("calcite-icon", { class: "dropdown-item-icon-end", dir: dir, flipRtl: this.iconFlipRtl === "end" || this.iconFlipRtl === "both", icon: this.iconEnd, scale: "s" }));
    const slottedContent = this.iconStart && this.iconEnd
      ? [iconStartEl, contentNode, iconEndEl]
      : this.iconStart
        ? [iconStartEl, h("slot", null)]
        : this.iconEnd
          ? [contentNode, iconEndEl]
          : contentNode;
    const contentEl = !this.href ? (slottedContent) : (h("a", { "aria-label": this.label, class: "dropdown-link", href: this.href, ref: (el) => (this.childLink = el), rel: this.rel, target: this.target }, slottedContent));
    const itemRole = this.href
      ? null
      : this.selectionMode === "single"
        ? "menuitemradio"
        : this.selectionMode === "multi"
          ? "menuitemcheckbox"
          : "menuitem";
    const itemAria = this.selectionMode !== "none" ? this.active.toString() : null;
    return (h(Host, { "aria-checked": itemAria, role: itemRole, tabindex: "0" }, h("div", { class: {
        container: true,
        [CSS_UTILITY.rtl]: dir === "rtl",
        [CSS.containerLink]: !!this.href,
        [CSS.containerSmall]: scale === "s",
        [CSS.containerMedium]: scale === "m",
        [CSS.containerLarge]: scale === "l",
        [CSS.containerMulti]: this.selectionMode === "multi",
        [CSS.containerSingle]: this.selectionMode === "single",
        [CSS.containerNone]: this.selectionMode === "none"
      } }, this.selectionMode !== "none" ? (h("calcite-icon", { class: "dropdown-item-icon", icon: this.selectionMode === "multi" ? "check" : "bullet-point", scale: "s" })) : null, contentEl)));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  onClick() {
    this.emitRequestedItem();
  }
  keyDownHandler(e) {
    switch (getKey(e.key)) {
      case " ":
        this.emitRequestedItem();
        if (this.href) {
          e.preventDefault();
          this.childLink.click();
        }
        break;
      case "Enter":
        this.emitRequestedItem();
        if (this.href) {
          this.childLink.click();
        }
        break;
      case "Escape":
        this.calciteDropdownCloseRequest.emit();
        break;
      case "Tab":
      case "ArrowUp":
      case "ArrowDown":
      case "Home":
      case "End":
        this.calciteDropdownItemKeyEvent.emit({ keyboardEvent: e });
        break;
    }
    e.preventDefault();
  }
  updateActiveItemOnChange(event) {
    const parentEmittedChange = event.composedPath().includes(this.parentDropdownGroupEl);
    if (parentEmittedChange) {
      this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
      this.requestedDropdownItem = event.detail.requestedDropdownItem;
      this.determineActiveItem();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  determineActiveItem() {
    switch (this.selectionMode) {
      case "multi":
        if (this.el === this.requestedDropdownItem) {
          this.active = !this.active;
        }
        break;
      case "single":
        if (this.el === this.requestedDropdownItem) {
          this.active = true;
        }
        else if (this.requestedDropdownGroup === this.parentDropdownGroupEl) {
          this.active = false;
        }
        break;
      case "none":
        this.active = false;
        break;
    }
  }
  emitRequestedItem() {
    this.calciteDropdownItemSelect.emit({
      requestedDropdownItem: this.el,
      requestedDropdownGroup: this.parentDropdownGroupEl
    });
  }
  get el() { return getElement(this); }
};
CalciteDropdownItem.style = calciteDropdownItemCss;

export { CalciteDropdownItem as calcite_dropdown_item };
