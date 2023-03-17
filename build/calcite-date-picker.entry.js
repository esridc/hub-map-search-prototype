import { r as registerInstance, e as createEvent, h, f as Host, k as Build, g as getElement } from './index-d836c4a8.js';
import { T as TEXT, g as getLocaleData, H as HEADING_LEVEL } from './resources-d62e29ce.js';
import { a as getElementDir } from './dom-35210035.js';
import { g as getDaysDiff, d as dateToISO, a as dateFromISO, b as dateFromRange } from './date-732ad2f8.js';
import { g as getKey } from './key-4c5a210a.js';
import './locale-2363f7c1.js';
import './number-01151d2a.js';
import './guid-9ad8042d.js';

const calciteDatePickerCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:inline-block;vertical-align:top;width:100%;position:relative;overflow:visible;border-radius:0;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-2);background-color:var(--calcite-ui-foreground-1)}:host([scale=s]){max-width:216px}:host([scale=m]){max-width:286px}:host([scale=l]){max-width:398px}";

const CalciteDatePicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteDatePickerChange = createEvent(this, "calciteDatePickerChange", 7);
    this.calciteDatePickerRangeChange = createEvent(this, "calciteDatePickerRangeChange", 7);
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
    /** Disables the default behaviour on the third click of narrowing or extending the range and instead starts a new range. */
    this.proximitySelectionDisabled = false;
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.keyUpHandler = (e) => {
      if (getKey(e.key) === "Escape") {
        this.reset();
      }
    };
    this.monthHeaderSelectChange = (e) => {
      const date = new Date(e.detail);
      if (!this.range) {
        this.activeDate = date;
      }
      else {
        if (this.activeRange === "end") {
          this.activeEndDate = date;
        }
        else {
          this.activeStartDate = date;
        }
        this.mostRecentRangeValue = date;
      }
    };
    this.monthActiveDateChange = (e) => {
      const date = new Date(e.detail);
      if (!this.range) {
        this.activeDate = date;
      }
      else {
        if (this.activeRange === "end") {
          this.activeEndDate = date;
        }
        else {
          this.activeStartDate = date;
        }
        this.mostRecentRangeValue = date;
      }
    };
    this.monthHoverChange = (e) => {
      if (!this.startAsDate) {
        this.hoverRange = undefined;
        return;
      }
      const date = new Date(e.detail);
      this.hoverRange = {
        focused: this.activeRange || "start",
        start: this.startAsDate,
        end: this.endAsDate
      };
      if (!this.proximitySelectionDisabled) {
        if (this.endAsDate) {
          const startDiff = getDaysDiff(date, this.startAsDate);
          const endDiff = getDaysDiff(date, this.endAsDate);
          if (endDiff > 0) {
            this.hoverRange.end = date;
            this.hoverRange.focused = "end";
          }
          else if (startDiff < 0) {
            this.hoverRange.start = date;
            this.hoverRange.focused = "start";
          }
          else if (startDiff > endDiff) {
            this.hoverRange.start = date;
            this.hoverRange.focused = "start";
          }
          else {
            this.hoverRange.end = date;
            this.hoverRange.focused = "end";
          }
        }
        else {
          if (date < this.startAsDate) {
            this.hoverRange = {
              focused: "start",
              start: date,
              end: this.startAsDate
            };
          }
          else {
            this.hoverRange.end = date;
            this.hoverRange.focused = "end";
          }
        }
      }
      else {
        if (!this.endAsDate) {
          if (date < this.startAsDate) {
            this.hoverRange = {
              focused: "start",
              start: date,
              end: this.startAsDate
            };
          }
          else {
            this.hoverRange.end = date;
            this.hoverRange.focused = "end";
          }
        }
        else {
          this.hoverRange = undefined;
        }
      }
    };
    this.monthMouseOutChange = () => {
      if (this.hoverRange) {
        this.hoverRange = undefined;
      }
    };
    /**
     * Reset active date and close
     */
    this.reset = () => {
      var _a, _b, _c, _d, _e, _f;
      if (this.valueAsDate && ((_a = this.valueAsDate) === null || _a === void 0 ? void 0 : _a.getTime()) !== ((_b = this.activeDate) === null || _b === void 0 ? void 0 : _b.getTime())) {
        this.activeDate = new Date(this.valueAsDate);
      }
      if (this.startAsDate && ((_c = this.startAsDate) === null || _c === void 0 ? void 0 : _c.getTime()) !== ((_d = this.activeStartDate) === null || _d === void 0 ? void 0 : _d.getTime())) {
        this.activeStartDate = new Date(this.startAsDate);
      }
      if (this.endAsDate && ((_e = this.endAsDate) === null || _e === void 0 ? void 0 : _e.getTime()) !== ((_f = this.activeEndDate) === null || _f === void 0 ? void 0 : _f.getTime())) {
        this.activeEndDate = new Date(this.endAsDate);
      }
    };
    /**
     * Event handler for when the selected date changes
     */
    this.monthDateChange = (e) => {
      const date = new Date(e.detail);
      if (!this.range) {
        this.value = dateToISO(date);
        this.activeDate = date;
        return;
      }
      if (!this.startAsDate || (!this.endAsDate && date < this.startAsDate)) {
        if (this.startAsDate) {
          this.setEndDate(new Date(this.startAsDate));
        }
        if (this.activeRange == "end") {
          this.setEndDate(date);
        }
        else {
          this.setStartDate(date);
        }
      }
      else if (!this.endAsDate) {
        this.setEndDate(date);
      }
      else {
        if (!this.proximitySelectionDisabled) {
          if (this.activeRange) {
            if (this.activeRange == "end") {
              this.setEndDate(date);
            }
            else {
              this.setStartDate(date);
            }
          }
          else {
            const startDiff = getDaysDiff(date, this.startAsDate);
            const endDiff = getDaysDiff(date, this.endAsDate);
            if (endDiff === 0 || startDiff < 0) {
              this.setStartDate(date);
            }
            else if (startDiff === 0 || endDiff < 0) {
              this.setEndDate(date);
            }
            else if (startDiff < endDiff) {
              this.setStartDate(date);
            }
            else {
              this.setEndDate(date);
            }
          }
        }
        else {
          this.setStartDate(date);
          this.endAsDate = this.activeEndDate = this.end = undefined;
        }
      }
    };
  }
  handleValueAsDate(date) {
    this.activeDate = date;
    this.calciteDatePickerChange.emit(date);
  }
  handleRangeChange() {
    const { startAsDate: startDate, endAsDate: endDate } = this;
    this.activeEndDate = endDate;
    this.activeStartDate = startDate;
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
      this.setStartAsDate(dateFromISO(this.start));
    }
    if (this.end) {
      this.setEndAsDate(dateFromISO(this.end));
    }
    if (this.min) {
      this.minAsDate = dateFromISO(this.min);
    }
    if (this.max) {
      this.maxAsDate = dateFromISO(this.max);
    }
  }
  async componentWillLoad() {
    await this.loadLocaleData();
  }
  render() {
    var _a;
    const date = dateFromRange(this.range ? this.startAsDate : this.valueAsDate, this.minAsDate, this.maxAsDate);
    const activeStartDate = this.range
      ? this.getActiveStartDate(date, this.minAsDate, this.maxAsDate)
      : this.getActiveDate(date, this.minAsDate, this.maxAsDate);
    let activeDate = activeStartDate;
    const endDate = this.range
      ? dateFromRange(this.endAsDate, this.minAsDate, this.maxAsDate)
      : null;
    const activeEndDate = this.getActiveEndDate(endDate, this.minAsDate, this.maxAsDate);
    if ((this.activeRange === "end" ||
      (((_a = this.hoverRange) === null || _a === void 0 ? void 0 : _a.focused) === "end" && (!this.proximitySelectionDisabled || endDate))) &&
      activeEndDate) {
      activeDate = activeEndDate;
    }
    if (this.range && this.mostRecentRangeValue) {
      activeDate = this.mostRecentRangeValue;
    }
    const minDate = this.range && this.activeRange
      ? this.activeRange === "start"
        ? this.minAsDate
        : date || this.minAsDate
      : this.minAsDate;
    const maxDate = this.range && this.activeRange
      ? this.activeRange === "start"
        ? endDate || this.maxAsDate
        : this.maxAsDate
      : this.maxAsDate;
    const dir = getElementDir(this.el);
    return (h(Host, { onBlur: this.reset, onKeyUp: this.keyUpHandler, role: "application" }, this.renderCalendar(activeDate, dir, maxDate, minDate, date, endDate)));
  }
  valueWatcher(value) {
    this.valueAsDate = dateFromISO(value);
  }
  startWatcher(start) {
    this.setStartAsDate(dateFromISO(start));
  }
  endWatcher(end) {
    this.setEndAsDate(dateFromISO(end));
  }
  async loadLocaleData() {
    if (!Build.isBrowser) {
      return;
    }
    const { locale } = this;
    this.localeData = await getLocaleData(locale);
  }
  /**
   * Render calcite-date-picker-month-header and calcite-date-picker-month
   */
  renderCalendar(activeDate, dir, maxDate, minDate, date, endDate) {
    return (this.localeData && [
      h("calcite-date-picker-month-header", { activeDate: activeDate, dir: dir, headingLevel: this.headingLevel || HEADING_LEVEL, intlNextMonth: this.intlNextMonth, intlPrevMonth: this.intlPrevMonth, localeData: this.localeData, max: maxDate, min: minDate, onCalciteDatePickerSelect: this.monthHeaderSelectChange, scale: this.scale, selectedDate: this.activeRange === "end" ? endDate : date || new Date() }),
      h("calcite-date-picker-month", { activeDate: activeDate, dir: dir, endDate: this.range ? endDate : undefined, hoverRange: this.hoverRange, localeData: this.localeData, max: maxDate, min: minDate, onCalciteDatePickerActiveDateChange: this.monthActiveDateChange, onCalciteDatePickerHover: this.monthHoverChange, onCalciteDatePickerMouseOut: this.monthMouseOutChange, onCalciteDatePickerSelect: this.monthDateChange, scale: this.scale, selectedDate: this.activeRange === "end" ? endDate : date, startDate: this.range ? date : undefined })
    ]);
  }
  /**
   * Update date instance of start if valid
   */
  setStartAsDate(startDate, emit) {
    this.startAsDate = startDate;
    this.mostRecentRangeValue = this.startAsDate;
    if (emit) {
      this.calciteDatePickerRangeChange.emit({
        startDate,
        endDate: this.endAsDate
      });
    }
  }
  /**
   * Update date instance of end if valid
   */
  setEndAsDate(endDate, emit) {
    this.endAsDate = endDate;
    this.mostRecentRangeValue = this.endAsDate;
    if (emit) {
      this.calciteDatePickerRangeChange.emit({
        startDate: this.startAsDate,
        endDate
      });
    }
  }
  setEndDate(date) {
    this.end = dateToISO(date);
    this.setEndAsDate(date, true);
    this.activeEndDate = date;
  }
  setStartDate(date) {
    this.start = dateToISO(date);
    this.setStartAsDate(date, true);
    this.activeStartDate = date;
  }
  /**
   * Get an active date using the value, or current date as default
   */
  getActiveDate(value, min, max) {
    return dateFromRange(this.activeDate, min, max) || value || dateFromRange(new Date(), min, max);
  }
  getActiveStartDate(value, min, max) {
    return (dateFromRange(this.activeStartDate, min, max) || value || dateFromRange(new Date(), min, max));
  }
  getActiveEndDate(value, min, max) {
    return (dateFromRange(this.activeEndDate, min, max) || value || dateFromRange(new Date(), min, max));
  }
  static get assetsDirs() { return ["assets"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "valueAsDate": ["handleValueAsDate"],
    "startAsDate": ["handleRangeChange"],
    "endAsDate": ["handleRangeChange"],
    "value": ["valueWatcher"],
    "start": ["startWatcher"],
    "end": ["endWatcher"],
    "locale": ["loadLocaleData"]
  }; }
};
CalciteDatePicker.style = calciteDatePickerCss;

export { CalciteDatePicker as calcite_date_picker };
