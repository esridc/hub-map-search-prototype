import { r as registerInstance, e as createEvent, h, f as Host, k as Build, g as getElement } from './index-d836c4a8.js';
import { T as TEXT, g as getLocaleData } from './resources-d62e29ce.js';
import { a as getElementDir } from './dom-35210035.js';
import { d as dateToISO, a as dateFromISO, b as dateFromRange, s as sameDate, p as parseDateString, i as inRange } from './date-732ad2f8.js';
import { g as getKey } from './key-4c5a210a.js';
import { u as updatePopper, C as CSS, c as createPopper } from './popper-4adad776.js';
import './locale-2363f7c1.js';
import './number-01151d2a.js';
import './guid-9ad8042d.js';

const calciteInputDatePickerCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{--calcite-icon-size:1rem;--calcite-spacing-eighth:0.125rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{box-shadow:none;display:inline-block;vertical-align:top;width:100%;position:relative;overflow:visible}:host .menu-container .calcite-popper-anim{position:relative;z-index:1;transition:var(--calcite-popper-transition);visibility:hidden;transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);border-radius:0.25rem}:host .menu-container[data-popper-placement^=bottom] .calcite-popper-anim{transform:translateY(-5px)}:host .menu-container[data-popper-placement^=top] .calcite-popper-anim{transform:translateY(5px)}:host .menu-container[data-popper-placement^=left] .calcite-popper-anim{transform:translateX(5px)}:host .menu-container[data-popper-placement^=right] .calcite-popper-anim{transform:translateX(-5px)}:host .menu-container[data-popper-placement] .calcite-popper-anim--active{opacity:1;visibility:visible;transform:translate(0)}.calendar-picker-wrapper{box-shadow:none;position:static;width:100%;transform:translate3d(0, 0, 0)}.input-wrapper{position:relative}:host([range]) .input-container{display:flex}:host([range]) .input-wrapper{flex:1 1 auto}:host([range]) .horizontal-arrow-container{background-color:var(--calcite-ui-background);padding-top:0;padding-bottom:0;padding-left:0.25rem;padding-right:0.25rem;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-input);border-left-width:0;border-right-width:0;display:flex;align-items:center}:host([range][layout=vertical]) .input-wrapper{width:100%}:host([range][layout=vertical]) .input-container{flex-direction:column;align-items:flex-start}:host([range][layout=vertical]) .calendar-picker-wrapper--end{transform:translate3d(0, 0, 0)}:host([range][layout=vertical]) .vertical-arrow-container{top:1.5rem;left:0;padding-left:0.625rem;padding-right:0.625rem;margin-left:1px;margin-right:1px;position:absolute;z-index:10;background-color:var(--calcite-ui-foreground-1)}:host([scale=s][range]:not([layout=vertical])) .calendar-picker-wrapper{width:216px}:host([scale=m][range]:not([layout=vertical])) .calendar-picker-wrapper{width:286px}:host([scale=l][range]:not([layout=vertical])) .calendar-picker-wrapper{width:398px}.menu-container{display:block;position:absolute;z-index:900;transform:scale(0);visibility:hidden;pointer-events:none}:host([active]) .menu-container{visibility:visible;pointer-events:auto}.input .calcite-input__wrapper{margin-top:0}:host([range][layout=vertical][scale=m]) .vertical-arrow-container{top:1.5rem;padding-left:0.75rem}:host([range][layout=vertical][scale=m]) .vertical-arrow-container calcite-icon{width:0.75rem;height:0.75rem;min-width:0}:host([range][layout=vertical][scale=l]) .vertical-arrow-container{top:2.25rem;padding-left:0.875rem;padding-right:0.875rem}:host([range][layout=vertical][active]) .vertical-arrow-container{display:none}";

const DEFAULT_PLACEMENT = "bottom-leading";
const CalciteInputDatePicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteDatePickerChange = createEvent(this, "calciteDatePickerChange", 7);
    this.calciteDatePickerRangeChange = createEvent(this, "calciteDatePickerRangeChange", 7);
    this.calciteInputDatePickerOpen = createEvent(this, "calciteInputDatePickerOpen", 7);
    this.calciteInputDatePickerClose = createEvent(this, "calciteInputDatePickerClose", 7);
    /** Expand or collapse when calendar does not have input */
    this.active = false;
    /** Localized string for "previous month" (used for aria label)
     * @default "Previous month"
     */
    this.intlPrevMonth = TEXT.prevMonth;
    /** Localized string for "next month" (used for aria label)
     * @default "Next month"
     */
    this.intlNextMonth = TEXT.nextMonth;
    /** BCP 47 language tag for desired language and country format */
    this.locale = document.documentElement.lang || "en";
    /** specify the scale of the date picker */
    this.scale = "m";
    /** Range mode activation */
    this.range = false;
    /** Describes the type of positioning to use for the overlaid content. If your element is in a fixed container, use the 'fixed' value. */
    this.overlayPositioning = "absolute";
    /** Disables the default behaviour on the third click of narrowing or extending the range and instead starts a new range. */
    this.proximitySelectionDisabled = false;
    /** Layout */
    this.layout = "horizontal";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    this.focusedInput = "start";
    this.activeTransitionProp = "opacity";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.transitionEnd = (event) => {
      if (event.propertyName === this.activeTransitionProp) {
        this.active
          ? this.calciteInputDatePickerOpen.emit()
          : this.calciteInputDatePickerClose.emit();
      }
    };
    this.setStartInput = (el) => {
      this.startInput = el;
    };
    this.setEndInput = (el) => {
      this.endInput = el;
    };
    this.deactivate = () => {
      this.active = false;
    };
    this.keyUpHandler = (e) => {
      if (getKey(e.key) === "Escape") {
        this.active = false;
      }
    };
    this.inputBlur = (e) => {
      this.blur(e.detail);
    };
    this.startInputFocus = () => {
      this.active = true;
      this.focusedInput = "start";
    };
    this.endInputFocus = () => {
      this.active = true;
      this.focusedInput = "end";
    };
    this.inputInput = (e) => {
      this.input(e.detail.value);
    };
    this.setMenuEl = (el) => {
      if (el) {
        this.menuEl = el;
        this.createPopper();
      }
    };
    this.setStartWrapper = (el) => {
      this.startWrapper = el;
      this.setReferenceEl();
    };
    this.setEndWrapper = (el) => {
      this.endWrapper = el;
      this.setReferenceEl();
    };
    /**
     * Event handler for when the selected date changes
     */
    this.handleDateChange = (event) => {
      if (this.range) {
        return;
      }
      this.value = dateToISO(event.detail);
    };
    this.handleDateRangeChange = (event) => {
      var _a, _b;
      if (!this.range || !event.detail) {
        return;
      }
      const { startDate, endDate } = event.detail;
      this.start = dateToISO(startDate);
      this.end = dateToISO(endDate);
      if (this.shouldFocusRangeEnd()) {
        (_a = this.endInput) === null || _a === void 0 ? void 0 : _a.setFocus();
      }
      else if (this.shouldFocusRangeStart()) {
        (_b = this.startInput) === null || _b === void 0 ? void 0 : _b.setFocus();
      }
    };
  }
  activeHandler() {
    this.reposition();
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  calciteDaySelectHandler() {
    if (this.shouldFocusRangeStart() || this.shouldFocusRangeEnd()) {
      return;
    }
    this.active = false;
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
        placement: DEFAULT_PLACEMENT,
        popper
      })
      : this.createPopper();
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    if (this.value) {
      this.valueAsDate = dateFromISO(this.value);
    }
    if (this.start) {
      this.startAsDate = dateFromISO(this.start);
    }
    if (this.end) {
      this.endAsDate = dateFromISO(this.end);
    }
    if (this.min) {
      this.minAsDate = dateFromISO(this.min);
    }
    if (this.max) {
      this.maxAsDate = dateFromISO(this.max);
    }
    this.createPopper();
  }
  async componentWillLoad() {
    await this.loadLocaleData();
  }
  disconnectedCallback() {
    this.destroyPopper();
  }
  render() {
    var _a, _b;
    const date = dateFromRange(this.range ? this.startAsDate : this.valueAsDate, this.minAsDate, this.maxAsDate);
    const endDate = this.range
      ? dateFromRange(this.endAsDate, this.minAsDate, this.maxAsDate)
      : null;
    const formattedEndDate = endDate ? endDate.toLocaleDateString(this.locale) : "";
    const formattedDate = date ? date.toLocaleDateString(this.locale) : "";
    const dir = getElementDir(this.el);
    return (h(Host, { onBlur: this.deactivate, onKeyUp: this.keyUpHandler, role: "application" }, this.localeData && (h("div", { "aria-expanded": this.active.toString(), class: "input-container", dir: dir, role: "application" }, h("div", { class: "input-wrapper", ref: this.setStartWrapper }, h("calcite-input", { class: `input ${this.layout === "vertical" && this.range ? `no-bottom-border` : ``}`, icon: "calendar", "number-button-type": "none", onCalciteInputBlur: this.inputBlur, onCalciteInputFocus: this.startInputFocus, onCalciteInputInput: this.inputInput, placeholder: (_a = this.localeData) === null || _a === void 0 ? void 0 : _a.placeholder, ref: this.setStartInput, scale: this.scale, type: "text", value: formattedDate })), h("div", { "aria-hidden": (!this.active).toString(), class: "menu-container", ref: this.setMenuEl }, h("div", { class: {
        ["calendar-picker-wrapper"]: true,
        ["calendar-picker-wrapper--end"]: this.focusedInput === "end",
        [CSS.animation]: true,
        [CSS.animationActive]: this.active
      }, onTransitionEnd: this.transitionEnd }, h("calcite-date-picker", { activeRange: this.focusedInput, endAsDate: this.endAsDate, headingLevel: this.headingLevel, intlNextMonth: this.intlNextMonth, intlPrevMonth: this.intlPrevMonth, locale: this.locale, max: this.max, maxAsDate: this.maxAsDate, min: this.min, minAsDate: this.minAsDate, onCalciteDatePickerChange: this.handleDateChange, onCalciteDatePickerRangeChange: this.handleDateRangeChange, proximitySelectionDisabled: this.proximitySelectionDisabled, range: this.range, scale: this.scale, startAsDate: this.startAsDate, tabIndex: 0, valueAsDate: this.valueAsDate }))), this.range && this.layout === "horizontal" && (h("div", { class: "horizontal-arrow-container" }, h("calcite-icon", { flipRtl: true, icon: "arrow-right", scale: "s" }))), this.range && this.layout === "vertical" && this.scale !== "s" && (h("div", { class: "vertical-arrow-container" }, h("calcite-icon", { icon: "arrow-down", scale: "s" }))), this.range && (h("div", { class: "input-wrapper", ref: this.setEndWrapper }, h("calcite-input", { class: {
        input: true,
        "border-t-color-1": this.layout === "vertical" && this.range
      }, icon: "calendar", "number-button-type": "none", onCalciteInputBlur: this.inputBlur, onCalciteInputFocus: this.endInputFocus, onCalciteInputInput: this.inputInput, placeholder: (_b = this.localeData) === null || _b === void 0 ? void 0 : _b.placeholder, ref: this.setEndInput, scale: this.scale, type: "text", value: formattedEndDate })))))));
  }
  setReferenceEl() {
    const { focusedInput, layout, endWrapper, startWrapper } = this;
    this.referenceEl =
      focusedInput === "end" || layout === "vertical"
        ? endWrapper || startWrapper
        : startWrapper || endWrapper;
    this.createPopper();
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
    if (!menuEl || !referenceEl) {
      return;
    }
    const modifiers = this.getModifiers();
    this.popper = createPopper({
      el: menuEl,
      modifiers,
      overlayPositioning,
      placement: DEFAULT_PLACEMENT,
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
  valueWatcher(value) {
    this.valueAsDate = dateFromISO(value);
  }
  startWatcher(start) {
    this.startAsDate = dateFromISO(start);
  }
  endWatcher(end) {
    this.endAsDate = dateFromISO(end);
  }
  async loadLocaleData() {
    if (!Build.isBrowser) {
      return;
    }
    const { locale } = this;
    this.localeData = await getLocaleData(locale);
  }
  clearCurrentValue() {
    if (!this.range) {
      this.value = undefined;
      return;
    }
    const { focusedInput } = this;
    if (focusedInput === "start") {
      this.start = undefined;
    }
    else if (focusedInput === "end") {
      this.end = undefined;
    }
  }
  /**
   * If inputted string is a valid date, update value/active
   */
  input(value) {
    const date = this.getDateFromInput(value);
    if (!date) {
      this.clearCurrentValue();
      return;
    }
    if (!this.range) {
      this.value = dateToISO(date);
      return;
    }
    const { focusedInput } = this;
    if (focusedInput === "start") {
      if (!this.startAsDate || !sameDate(date, this.startAsDate)) {
        this.start = dateToISO(date);
        this.calciteDatePickerRangeChange.emit({
          startDate: date,
          endDate: this.endAsDate
        });
      }
    }
    else if (focusedInput === "end") {
      if (!this.endAsDate || !sameDate(date, this.endAsDate)) {
        this.end = dateToISO(date);
        this.calciteDatePickerRangeChange.emit({
          startDate: this.startAsDate,
          endDate: date
        });
      }
    }
  }
  /**
   * Clean up invalid date from input on blur
   */
  blur(target) {
    const { locale, focusedInput, endAsDate, range, startAsDate, valueAsDate } = this;
    const date = this.getDateFromInput(target.value);
    if (!date) {
      if (!range && valueAsDate) {
        target.value = valueAsDate.toLocaleDateString(locale);
      }
      else if (focusedInput === "start" && startAsDate) {
        target.value = startAsDate.toLocaleDateString(locale);
      }
      else if (focusedInput === "end" && endAsDate) {
        target.value = endAsDate.toLocaleDateString(locale);
      }
    }
  }
  shouldFocusRangeStart() {
    return !!(this.endAsDate &&
      !this.startAsDate &&
      this.focusedInput === "end" &&
      this.startInput);
  }
  shouldFocusRangeEnd() {
    return !!(this.startAsDate &&
      !this.endAsDate &&
      this.focusedInput === "start" &&
      this.endInput);
  }
  /**
   * Find a date from input string
   * return false if date is invalid, or out of range
   */
  getDateFromInput(value) {
    if (!this.localeData) {
      return false;
    }
    const { separator } = this.localeData;
    const { day, month, year } = parseDateString(value, this.localeData);
    const validDay = day > 0;
    const validMonth = month > -1;
    const date = new Date(year, month, day);
    date.setFullYear(year);
    const validDate = !isNaN(date.getTime());
    const validLength = value.split(separator).filter((c) => c).length > 2;
    const validYear = year.toString().length > 0;
    if (validDay &&
      validMonth &&
      validDate &&
      validLength &&
      validYear &&
      inRange(date, this.min, this.max)) {
      return date;
    }
    return false;
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "active": ["activeHandler"],
    "layout": ["setReferenceEl"],
    "focusedInput": ["setReferenceEl"],
    "value": ["valueWatcher"],
    "start": ["startWatcher"],
    "end": ["endWatcher"],
    "locale": ["loadLocaleData"]
  }; }
};
CalciteInputDatePicker.style = calciteInputDatePickerCss;

export { CalciteInputDatePicker as calcite_input_date_picker };
