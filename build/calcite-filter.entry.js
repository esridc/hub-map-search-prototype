import { r as registerInstance, e as createEvent, h, F as Fragment, g as getElement } from './index-d836c4a8.js';
import { d as debounce, f as forIn } from './lodash-b99b737e.js';
import { f as focusElement, a as getElementDir, C as CSS_UTILITY } from './dom-35210035.js';
import './guid-9ad8042d.js';

const CSS = {
  container: "container",
  searchIcon: "search-icon",
  clearButton: "clear-button"
};
const TEXT = {
  filterLabel: "Filter",
  clear: "Clear filter"
};
const ICONS = {
  search: "search",
  close: "x"
};

const calciteFilterCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;width:100%}.container{display:flex;width:100%;padding:0.5rem}label{display:flex;align-items:center;overflow:hidden;position:relative;width:100%;margin-left:0.25rem;margin-right:0.25rem;margin-top:0;margin-bottom:0}input[type=text]{background-color:transparent;border-style:none;font-family:inherit;color:var(--calcite-ui-text-1);font-size:var(--calcite-font-size--2);line-height:1rem;margin-bottom:0.25rem;width:100%;padding-top:0.25rem;padding-bottom:0.25rem;padding-right:0.25rem;padding-left:1.5rem;transition:padding 150ms ease-in-out, box-shadow 150ms ease-in-out}input[type=text]::-ms-clear{display:none}.search-icon{display:flex;left:0;position:absolute;color:var(--calcite-ui-text-2);transition:left 150ms ease-in-out, right 150ms ease-in-out, opacity 150ms ease-in-out}.calcite--rtl .search-icon{right:0}input[type=text]:focus{border-color:var(--calcite-ui-brand);outline:2px solid transparent;outline-offset:2px;padding-left:0.25rem;padding-right:0.25rem;box-shadow:0 2px 0 var(--calcite-ui-brand)}input[type=text]:focus~.search-icon{left:calc(1rem * -1);opacity:0}.calcite--rtl input[type=text]{padding-left:0.25rem;padding-right:1.5rem}.calcite--rtl input[type=text]:focus{padding-right:1.25rem}.calcite--rtl input[type=text]:focus~.search-icon{right:calc(1rem * -1)}.clear-button{color:var(--calcite-ui-text-2);background-color:transparent;border-width:0;cursor:pointer}.clear-button:hover,.clear-button:focus{color:var(--calcite-ui-text-1)}";

const filterDebounceInMs = 250;
const CalciteFilter = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteFilterChange = createEvent(this, "calciteFilterChange", 7);
    /**
     * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
     */
    this.disabled = false;
    this.empty = true;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.filter = debounce((value) => {
      const regex = new RegExp(value, "ig");
      if (this.data.length === 0) {
        console.warn(`No data was passed to calcite-filter.
      The data property expects an array of objects`);
        this.calciteFilterChange.emit([]);
        return;
      }
      const find = (input, RE) => {
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
      const result = this.data.filter((item) => {
        return find(item, regex);
      });
      this.calciteFilterChange.emit(result);
    }, filterDebounceInMs);
    this.inputHandler = (event) => {
      const target = event.target;
      this.empty = target.value === "";
      this.filter(target.value);
    };
    this.keyDownHandler = ({ key }) => {
      if (key === "Escape") {
        this.clear();
      }
    };
    this.clear = () => {
      this.textInput.value = "";
      this.empty = true;
      this.calciteFilterChange.emit(this.data);
      this.setFocus();
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    focusElement(this.textInput);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const rtl = getElementDir(this.el) === "rtl";
    const { disabled } = this;
    return (h(Fragment, null, disabled ? h("calcite-scrim", null) : null, h("div", { class: CSS.container }, h("label", { class: rtl ? CSS_UTILITY.rtl : null }, h("input", { "aria-label": this.intlLabel || TEXT.filterLabel, disabled: this.disabled, onInput: this.inputHandler, onKeyDown: this.keyDownHandler, placeholder: this.placeholder, ref: (el) => {
        this.textInput = el;
      }, type: "text", value: "" }), h("div", { class: CSS.searchIcon }, h("calcite-icon", { icon: ICONS.search, scale: "s" }))), !this.empty ? (h("button", { "aria-label": this.intlClear || TEXT.clear, class: CSS.clearButton, onClick: this.clear }, h("calcite-icon", { icon: ICONS.close }))) : null)));
  }
  get el() { return getElement(this); }
};
CalciteFilter.style = calciteFilterCss;

export { CalciteFilter as calcite_filter };
