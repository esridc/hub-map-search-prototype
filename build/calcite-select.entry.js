import { r as registerInstance, e as createEvent, h, F as Fragment, g as getElement } from './index-d836c4a8.js';
import { f as focusElement, C as CSS_UTILITY, a as getElementDir } from './dom-35210035.js';
import { c as createObserver } from './observers-93f01172.js';
import './guid-9ad8042d.js';

const CSS = {
  icon: "icon",
  iconContainer: "icon-container",
  select: "select"
};

const calciteSelectCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{--calcite-icon-size:1rem;--calcite-spacing-eighth:0.125rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;align-items:stretch;position:relative;width:var(--select-width)}:host([scale=s]){height:1.5rem;--calcite-select-font-size:var(--calcite-font-size--2);--calcite-select-spacing:0 2rem 0 0.5rem;--calcite-select-spacing-rtl:0 0.5rem 0 2rem}:host([scale=s]) .icon-container{padding-left:0.5rem;padding-right:0.5rem}:host([scale=m]){height:2rem;--calcite-select-font-size:var(--calcite-font-size--1);--calcite-select-spacing:0 2.5rem 0 0.75rem;--calcite-select-spacing-rtl:0 0.75rem 0 2.5rem}:host([scale=m]) .icon-container{padding-left:0.75rem;padding-right:0.75rem}:host([scale=l]){height:44px;--calcite-select-font-size:var(--calcite-font-size-0);--calcite-select-spacing:0 3rem 0 1rem;--calcite-select-spacing-rtl:0 1rem 0 3rem}:host([scale=l]) .icon-container{padding-left:1rem;padding-right:1rem}:host([width=auto]){width:auto}:host([width=half]){width:50%}:host([width=full]){width:100%}.select{-webkit-appearance:none;-moz-appearance:none;appearance:none;border-width:1px;border-style:solid;border-right-width:0;background-color:var(--calcite-ui-foreground-1);border-color:var(--calcite-ui-border-input);border-radius:0;color:var(--calcite-ui-text-2);cursor:pointer;font-family:inherit;margin:0;width:100%;outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;box-sizing:border-box;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:var(--calcite-select-font-size);padding:var(--calcite-select-spacing)}.select:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.select:hover{background-color:var(--calcite-ui-foreground-2)}.select.calcite--rtl{border-width:1px;border-color:var(--calcite-ui-border-input);padding:var(--calcite-select-spacing-rtl)}select:disabled{border-color:var(--calcite-ui-border-input);--bg-opacity:1}:host([disabled]){pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}.icon-container{align-items:center;background-color:transparent;border-width:0;border-right-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);border-left-width:0;color:var(--calcite-ui-text-2);display:flex;pointer-events:none;position:absolute;right:0;top:0;bottom:0}.icon-container.calcite--rtl{border-left-width:1px;border-right-width:0;left:0;right:unset}.select:focus~.icon-container{border-color:transparent}";

function isOption(optionOrGroup) {
  return optionOrGroup.tagName === "CALCITE-OPTION";
}
function isOptionGroup(optionOrGroup) {
  return optionOrGroup.tagName === "CALCITE-OPTION-GROUP";
}
const CalciteSelect = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteSelectChange = createEvent(this, "calciteSelectChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /**
     * When true, it prevents the option from being selected.
     */
    this.disabled = false;
    /**
     * The component scale.
     */
    this.scale = "m";
    /**
     * The component width.
     */
    this.width = "auto";
    this.componentToNativeEl = new Map();
    this.mutationObserver = createObserver("mutation", () => this.populateInternalSelect());
    this.handleInternalSelectChange = () => {
      const selected = this.selectEl.selectedOptions[0];
      this.selectFromNativeOption(selected);
      requestAnimationFrame(() => this.emitChangeEvent());
    };
    this.populateInternalSelect = () => {
      const optionsAndGroups = Array.from(this.el.children);
      this.clearInternalSelect();
      optionsAndGroups.forEach((optionOrGroup) => { var _a; return (_a = this.selectEl) === null || _a === void 0 ? void 0 : _a.append(this.toNativeElement(optionOrGroup)); });
    };
    this.storeSelectRef = (node) => {
      this.selectEl = node;
      this.populateInternalSelect();
      const selected = this.selectEl.selectedOptions[0];
      this.selectFromNativeOption(selected);
    };
    this.emitChangeEvent = () => {
      this.calciteSelectChange.emit();
    };
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    var _a;
    const { el } = this;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(el, {
      subtree: true,
      childList: true
    });
  }
  disconnectedCallback() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    focusElement(this.selectEl);
  }
  handleOptionOrGroupChange(event) {
    event.stopPropagation();
    const optionOrGroup = event.target;
    const nativeEl = this.componentToNativeEl.get(optionOrGroup);
    if (!nativeEl) {
      return;
    }
    this.updateNativeElement(optionOrGroup, nativeEl);
    if (isOption(optionOrGroup) && optionOrGroup.selected) {
      this.deselectAllExcept(optionOrGroup);
    }
  }
  handleLabelFocus(event) {
    const { requestedInput, labelEl } = event.detail;
    const { el } = this;
    if (labelEl.contains(el) || (requestedInput && requestedInput === el.getAttribute("id"))) {
      this.setFocus();
      event.stopImmediatePropagation();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  updateNativeElement(optionOrGroup, nativeOptionOrGroup) {
    nativeOptionOrGroup.disabled = optionOrGroup.disabled;
    nativeOptionOrGroup.label = optionOrGroup.label;
    if (isOption(optionOrGroup)) {
      const option = nativeOptionOrGroup;
      option.selected = optionOrGroup.selected;
      option.value = optionOrGroup.value;
      // need to set innerText for mobile
      // see https://stackoverflow.com/questions/35021620/ios-safari-not-showing-all-options-for-select-menu/41749701
      option.innerText = optionOrGroup.label;
    }
  }
  clearInternalSelect() {
    this.componentToNativeEl.forEach((value) => value.remove());
    this.componentToNativeEl.clear();
  }
  selectFromNativeOption(nativeOption) {
    if (!nativeOption) {
      return;
    }
    let futureSelected;
    this.componentToNativeEl.forEach((nativeOptionOrGroup, optionOrGroup) => {
      if (isOption(optionOrGroup) && nativeOptionOrGroup === nativeOption) {
        optionOrGroup.selected = true;
        futureSelected = optionOrGroup;
        this.deselectAllExcept(optionOrGroup);
      }
    });
    if (futureSelected) {
      requestAnimationFrame(() => (this.selectedOption = futureSelected));
    }
  }
  toNativeElement(optionOrGroup) {
    if (isOption(optionOrGroup)) {
      const option = document.createElement("option");
      this.updateNativeElement(optionOrGroup, option);
      this.componentToNativeEl.set(optionOrGroup, option);
      return option;
    }
    if (isOptionGroup(optionOrGroup)) {
      const group = document.createElement("optgroup");
      this.updateNativeElement(optionOrGroup, group);
      Array.from(optionOrGroup.children).forEach((option) => {
        const nativeOption = this.toNativeElement(option);
        group.append(nativeOption);
        this.componentToNativeEl.set(optionOrGroup, nativeOption);
      });
      this.componentToNativeEl.set(optionOrGroup, group);
      return group;
    }
    throw new Error("unsupported element child provided");
  }
  deselectAllExcept(except) {
    this.el.querySelectorAll("calcite-option").forEach((option) => {
      if (option === except) {
        return;
      }
      option.selected = false;
    });
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  renderChevron(dir) {
    return (h("div", { class: { [CSS.iconContainer]: true, [CSS_UTILITY.rtl]: dir === "rtl" } }, h("calcite-icon", { class: CSS.icon, icon: "chevron-down", scale: "s" })));
  }
  render() {
    const dir = getElementDir(this.el);
    return (h(Fragment, null, h("select", { "aria-label": this.label, class: { [CSS.select]: true, [CSS_UTILITY.rtl]: dir === "rtl" }, disabled: this.disabled, onChange: this.handleInternalSelectChange, ref: this.storeSelectRef }, h("slot", null)), this.renderChevron(dir)));
  }
  get el() { return getElement(this); }
};
CalciteSelect.style = calciteSelectCss;

export { CalciteSelect as calcite_select };
