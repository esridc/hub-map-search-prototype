import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { g as guid } from './guid-9ad8042d.js';
import { g as getKey } from './key-4c5a210a.js';
import { f as formatTimeString, p as parseTimeString, g as getMeridiemHour, a as getMeridiem } from './time-104387f2.js';
import './number-01151d2a.js';

const calciteInputTimePickerCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:inline-block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}";

const CalciteInputTimePicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteInputTimePickerChange = createEvent(this, "calciteInputTimePickerChange", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** The active state of the time input */
    this.active = false;
    /** The disabled state of the time input */
    this.disabled = false;
    /** Format of the hour value (12-hour or 24-hour) (this will be replaced by locale eventually) */
    this.hourDisplayFormat = "12";
    /** The scale (size) of the time input */
    this.scale = "m";
    /** number that specifies the granularity that the value must adhere to */
    this.step = 60;
    /** The selected time */
    this.value = null;
    /** whether the value of the input was changed as a result of user typing or not */
    this.internalValueChange = false;
    this.previousValidValue = null;
    this.referenceElementId = `input-time-picker-${guid()}`;
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    this.calciteInputBlurHandler = () => {
      this.active = false;
      const newValue = formatTimeString(this.calciteInputEl.value) || formatTimeString(this.value);
      if (newValue !== this.calciteInputEl.value) {
        this.setInputValue(newValue);
      }
    };
    this.calciteInputFocusHandler = () => {
      this.active = true;
    };
    this.calciteInputInputHandler = (event) => {
      this.setValue({ value: event.detail.value });
    };
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.setCalciteInputEl = (el) => {
      this.calciteInputEl = el;
    };
    this.setCalciteTimePickerEl = (el) => {
      this.calciteTimePickerEl = el;
    };
    this.setInputValue = (newInputValue) => {
      if (!this.calciteInputEl) {
        return;
      }
      if (this.hourDisplayFormat === "12") {
        const { hour, minute, second } = parseTimeString(newInputValue);
        this.calciteInputEl.value = newInputValue
          ? `${getMeridiemHour(hour)}:${minute}${this.step !== 60 ? ":" + second : ""} ${getMeridiem(hour)}`
          : null;
      }
      else {
        this.calciteInputEl.value = newInputValue;
      }
    };
    this.setValue = ({ value, origin = "input" }) => {
      const previousValue = this.value;
      const validatedNewValue = formatTimeString(value);
      this.internalValueChange = origin !== "external" && origin !== "loading";
      const shouldEmit = origin !== "loading" &&
        origin !== "external" &&
        ((value !== this.previousValidValue && !value) ||
          !!(!this.previousValidValue && validatedNewValue) ||
          (validatedNewValue !== this.previousValidValue && validatedNewValue));
      if (value) {
        if (shouldEmit) {
          this.previousValidValue = validatedNewValue;
        }
        if (validatedNewValue && validatedNewValue !== this.value) {
          this.value = validatedNewValue;
        }
      }
      else {
        this.value = value;
      }
      if (origin === "time-picker" || origin === "external") {
        this.setInputValue(validatedNewValue);
      }
      if (shouldEmit) {
        const changeEvent = this.calciteInputTimePickerChange.emit();
        if (changeEvent.defaultPrevented) {
          this.internalValueChange = false;
          this.value = previousValue;
          this.setInputValue(previousValue);
          this.previousValidValue = previousValue;
        }
        else {
          this.previousValidValue = validatedNewValue;
        }
      }
    };
  }
  valueWatcher(newValue) {
    if (!this.internalValueChange) {
      this.setValue({ value: newValue, origin: "external" });
    }
    this.internalValueChange = false;
  }
  clickHandler(event) {
    if (event.composedPath().includes(this.calciteTimePickerEl)) {
      return;
    }
    this.setFocus();
  }
  keyUpHandler(event) {
    if (getKey(event.key) === "Escape" && this.active) {
      this.active = false;
    }
  }
  timePickerBlurHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    this.active = false;
  }
  timePickerChangeHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.detail) {
      const { hour, minute, second } = event.detail;
      let value;
      if (hour && minute) {
        value = second && this.step !== 60 ? `${hour}:${minute}:${second}` : `${hour}:${minute}`;
      }
      else {
        value = "";
      }
      this.setValue({ value, origin: "time-picker" });
    }
  }
  timePickerFocusHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    this.active = true;
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    this.calciteInputEl.setFocus();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    if (this.value) {
      this.setValue({ value: this.value, origin: "loading" });
    }
  }
  componentDidLoad() {
    if (this.calciteInputEl.value !== this.value) {
      this.setInputValue(this.value);
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const { hour, minute, second } = parseTimeString(this.value);
    const popoverId = `${this.referenceElementId}-popover`;
    return (h(Host, null, h("div", { "aria-controls": popoverId, "aria-haspopup": "dialog", "aria-label": this.name, "aria-owns": popoverId, id: this.referenceElementId, role: "combobox" }, h("calcite-input", { disabled: this.disabled, icon: "clock", name: this.name, onCalciteInputBlur: this.calciteInputBlurHandler, onCalciteInputFocus: this.calciteInputFocusHandler, onCalciteInputInput: this.calciteInputInputHandler, ref: this.setCalciteInputEl, scale: this.scale, step: this.step })), h("calcite-popover", { id: popoverId, label: "Time Picker", open: this.active || false, referenceElement: this.referenceElementId }, h("calcite-time-picker", { hour: hour, "hour-display-format": this.hourDisplayFormat, intlHour: this.intlHour, intlHourDown: this.intlHourDown, intlHourUp: this.intlHourUp, intlMeridiem: this.intlMeridiem, intlMeridiemDown: this.intlMeridiemDown, intlMeridiemUp: this.intlMeridiemUp, intlMinute: this.intlMinute, intlMinuteDown: this.intlMinuteDown, intlMinuteUp: this.intlMinuteUp, intlSecond: this.intlSecond, intlSecondDown: this.intlSecondDown, intlSecondUp: this.intlSecondUp, minute: minute, ref: this.setCalciteTimePickerEl, scale: this.scale, second: second, step: this.step }))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "value": ["valueWatcher"]
  }; }
};
CalciteInputTimePicker.style = calciteInputTimePickerCss;

export { CalciteInputTimePicker as calcite_input_time_picker };
