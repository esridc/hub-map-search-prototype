import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { g as getKey, n as numberKeys, i as isActivationKey } from './key-4c5a210a.js';
import { i as isValidNumber } from './number-01151d2a.js';
import { m as maxTenthForMinuteAndSecond, b as formatTimePart, a as getMeridiem, g as getMeridiemHour } from './time-104387f2.js';

const CSS = {
  buttonBottomLeft: "button--bottom-left",
  buttonBottomRight: "button--bottom-right",
  button: "button",
  delimiter: "delimiter",
  hour: "hour",
  buttonHourDown: "button--hour-down",
  buttonHourUp: "button--hour-up",
  input: "input",
  meridiem: "meridiem",
  buttonMeridiemDown: "button--meridiem-down",
  buttonMeridiemUp: "button--meridiem-up",
  minute: "minute",
  buttonMinuteDown: "button--minute-down",
  buttonMinuteUp: "button--minute-up",
  second: "second",
  buttonSecondDown: "button--second-down",
  buttonSecondUp: "button--second-up",
  timePicker: "time-picker",
  buttonTopLeft: "button--top-left",
  buttonTopRight: "button--top-right"
};
const TEXT = {
  hour: "Hour",
  hourDown: "Decrease hour",
  hourUp: "Increase hour",
  meridiem: "AM/PM",
  meridiemDown: "Decrease AM/PM",
  meridiemUp: "Increase AM/PM",
  minute: "Minute",
  minuteDown: "Decrease minute",
  minuteUp: "Increase minute",
  second: "Second",
  secondDown: "Decrease second",
  secondUp: "Increase second"
};

const calciteTimePickerCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{color:var(--calcite-ui-text-1);display:inline-block;font-weight:var(--calcite-font-weight-medium);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.time-picker{box-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);align-items:center;display:flex;border-radius:var(--calcite-border-radius)}span{align-items:center;background-color:var(--calcite-ui-foreground-1);display:inline-flex;justify-content:center}span.button{cursor:pointer}span.button:hover,span.button:focus{background-color:var(--calcite-ui-foreground-2)}span.button:focus{outline:2px solid transparent;outline-offset:2px}span.button:active{background-color:var(--calcite-ui-foreground-3)}span.button.top-left{border-top-left-radius:var(--calcite-border-radius)}span.button.bottom-left{border-bottom-left-radius:var(--calcite-border-radius)}span.button.top-right{border-top-right-radius:var(--calcite-border-radius)}span.button.bottom-right{border-bottom-right-radius:var(--calcite-border-radius)}span.button calcite-icon{color:var(--calcite-ui-text-3)}span.input{font-weight:var(--calcite-font-weight-medium);position:relative}span.input:hover{box-shadow:inset 0 0 0 2px var(--calcite-ui-foreground-2)}span.input:focus,span.input:hover:focus{outline:2px solid transparent;outline-offset:2px;box-shadow:inset 0 0 0 2px var(--calcite-ui-brand)}:host([scale=s]){font-size:var(--calcite-font-size--1)}:host([scale=s]) span{height:24px;width:40px}:host([scale=s]) .delimiter{height:72px}:host([scale=s][hour-display-format=\"12\"]) .time-picker{width:124.2px}:host([scale=s][hour-display-format=\"12\"]:not([step=\"60\"])) .time-picker{width:168px}:host([scale=s][hour-display-format=\"24\"]) .time-picker{width:84.2px}:host([scale=s][hour-display-format=\"24\"]:not([step=\"60\"])) .time-picker{width:128.4px}:host([scale=m]){font-size:var(--calcite-font-size-0)}:host([scale=m]) span{height:32px;width:44px}:host([scale=m]) .delimiter{height:96px}:host([scale=m][hour-display-format=\"12\"]) .time-picker{width:136.8px}:host([scale=m][hour-display-format=\"12\"]:not([step=\"60\"])) .time-picker{width:186px}:host([scale=m][hour-display-format=\"24\"]) .time-picker{width:92.8px}:host([scale=m][hour-display-format=\"24\"]:not([step=\"60\"])) .time-picker{width:141.6px}:host([scale=l]){font-size:var(--calcite-font-size-1)}:host([scale=l]) span{height:48px;width:64px}:host([scale=l]) .delimiter{height:144px}:host([scale=l][hour-display-format=\"12\"]) .time-picker{width:198px}:host([scale=l][hour-display-format=\"12\"]:not([step=\"60\"])) .time-picker{width:268px}:host([scale=l][hour-display-format=\"24\"]) .time-picker{width:134px}:host([scale=l][hour-display-format=\"24\"]:not([step=\"60\"])) .time-picker{width:204px}";

const CalciteTimePicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteTimePickerBlur = createEvent(this, "calciteTimePickerBlur", 7);
    this.calciteTimePickerChange = createEvent(this, "calciteTimePickerChange", 7);
    this.calciteTimePickerFocus = createEvent(this, "calciteTimePickerFocus", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** The hour value (24-hour format) */
    this.hour = null;
    /** Format of the hour value (12-hour or 24-hour) (this will be replaced by locale eventually) */
    this.hourDisplayFormat = "12";
    /** aria-label for the hour input
     * @default "Hour"
     */
    this.intlHour = TEXT.hour;
    /** aria-label for the hour down button
     * @default "Decrease hour"
     */
    this.intlHourDown = TEXT.hourDown;
    /** aria-label for the hour up button
     * @default "Increase hour"
     */
    this.intlHourUp = TEXT.hourUp;
    /** aria-label for the meridiem (am/pm) input
     * @default "AM/PM"
     */
    this.intlMeridiem = TEXT.meridiem;
    /** aria-label for the meridiem (am/pm) down button
     * @default "Decrease AM/PM"
     */
    this.intlMeridiemDown = TEXT.meridiemDown;
    /** aria-label for the meridiem (am/pm) up button
     * @default "Increase AM/PM"
     */
    this.intlMeridiemUp = TEXT.meridiemUp;
    /** aria-label for the minute input
     * @default "Minute"
     */
    this.intlMinute = TEXT.minute;
    /** aria-label for the minute down button
     * @default "Decrease minute"
     */
    this.intlMinuteDown = TEXT.minuteDown;
    /** aria-label for the minute up button
     * @default "Increase minute"
     */
    this.intlMinuteUp = TEXT.minuteUp;
    /** aria-label for the second input
     * @default "Second"
     */
    this.intlSecond = TEXT.second;
    /** aria-label for the second down button
     * @default "Decrease second"
     */
    this.intlSecondDown = TEXT.secondDown;
    /** aria-label for the second up button
     * @default "Increase second"
     */
    this.intlSecondUp = TEXT.secondUp;
    /** The minute value */
    this.minute = null;
    /** The second value */
    this.second = null;
    /** The scale (size) of the time picker */
    this.scale = "m";
    /** number that specifies the granularity that the value must adhere to */
    this.step = 60;
    this.timeChanged = false;
    // --------------------------------------------------------------------------
    //
    //  State
    //
    // --------------------------------------------------------------------------
    /** The am/pm value */
    this.meridiem = null;
    this.displayHour = this.getDisplayHour();
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.decrementHour = () => {
      const newHour = !this.hour ? 0 : this.hour === "00" ? 23 : parseInt(this.hour) - 1;
      this.setTime("hour", newHour);
    };
    this.decrementMeridiem = () => {
      const newMeridiem = this.meridiem === "PM" ? "AM" : "PM";
      this.setTime("meridiem", newMeridiem);
    };
    this.decrementMinuteOrSecond = (key) => {
      let newValue;
      if (isValidNumber(this[key])) {
        const valueAsNumber = parseInt(this[key]);
        newValue = valueAsNumber === 0 ? 59 : valueAsNumber - 1;
      }
      else {
        newValue = 59;
      }
      this.setTime(key, newValue);
    };
    this.decrementMinute = () => {
      this.decrementMinuteOrSecond("minute");
    };
    this.decrementSecond = () => {
      this.decrementMinuteOrSecond("second");
    };
    this.focusHandler = (event) => {
      this.activeEl = event.currentTarget;
    };
    this.hourDownButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.decrementHour();
      }
    };
    this.hourKeyDownHandler = (event) => {
      const key = getKey(event.key);
      if (numberKeys.includes(key)) {
        const keyAsNumber = parseInt(key);
        let newHour;
        if (isValidNumber(this.hour)) {
          switch (this.hourDisplayFormat) {
            case "12":
              newHour =
                this.hour === "01" && keyAsNumber >= 0 && keyAsNumber <= 2
                  ? `1${keyAsNumber}`
                  : keyAsNumber;
              break;
            case "24":
              if (this.hour === "01") {
                newHour = `1${keyAsNumber}`;
              }
              else if (this.hour === "02" && keyAsNumber >= 0 && keyAsNumber <= 3) {
                newHour = `2${keyAsNumber}`;
              }
              else {
                newHour = keyAsNumber;
              }
              break;
          }
        }
        else {
          newHour = keyAsNumber;
        }
        this.setTime("hour", newHour);
      }
      else {
        switch (key) {
          case "Backspace":
          case "Delete":
            this.setTime("hour", null);
            break;
          case "ArrowDown":
            event.preventDefault();
            this.decrementHour();
            break;
          case "ArrowUp":
            event.preventDefault();
            this.incrementHour();
            break;
          case " ":
          case "Spacebar":
            event.preventDefault();
            break;
        }
      }
    };
    this.hourUpButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.incrementHour();
      }
    };
    this.incrementMeridiem = () => {
      const newMeridiem = this.meridiem === "AM" ? "PM" : "AM";
      this.setTime("meridiem", newMeridiem);
    };
    this.incrementHour = () => {
      const newHour = isValidNumber(this.hour)
        ? this.hour === "23"
          ? 0
          : parseInt(this.hour) + 1
        : 1;
      this.setTime("hour", newHour);
    };
    this.incrementMinuteOrSecond = (key) => {
      const newValue = isValidNumber(this[key])
        ? this[key] === "59"
          ? 0
          : parseInt(this[key]) + 1
        : 0;
      this.setTime(key, newValue);
    };
    this.incrementMinute = () => {
      this.incrementMinuteOrSecond("minute");
    };
    this.incrementSecond = () => {
      this.incrementMinuteOrSecond("second");
    };
    this.meridiemDownButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.decrementMeridiem();
      }
    };
    this.meridiemKeyDownHandler = (event) => {
      switch (getKey(event.key)) {
        case "a":
          this.setTime("meridiem", "AM");
          break;
        case "p":
          this.setTime("meridiem", "PM");
          break;
        case "Backspace":
        case "Delete":
          this.setTime("meridiem", null);
          break;
        case "ArrowUp":
          event.preventDefault();
          this.incrementMeridiem();
          break;
        case "ArrowDown":
          event.preventDefault();
          this.decrementMeridiem();
          break;
        case " ":
        case "Spacebar":
          event.preventDefault();
          break;
      }
    };
    this.meridiemUpButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.incrementMeridiem();
      }
    };
    this.minuteDownButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.decrementMinute();
      }
    };
    this.minuteKeyDownHandler = (event) => {
      const key = getKey(event.key);
      if (numberKeys.includes(key)) {
        const keyAsNumber = parseInt(key);
        let newMinute;
        if (isValidNumber(this.minute) && this.minute.startsWith("0")) {
          const minuteAsNumber = parseInt(this.minute);
          newMinute =
            minuteAsNumber > maxTenthForMinuteAndSecond
              ? keyAsNumber
              : `${minuteAsNumber}${keyAsNumber}`;
        }
        else {
          newMinute = keyAsNumber;
        }
        this.setTime("minute", newMinute);
      }
      else {
        switch (key) {
          case "Backspace":
          case "Delete":
            this.setTime("minute", null);
            break;
          case "ArrowDown":
            event.preventDefault();
            this.decrementMinute();
            break;
          case "ArrowUp":
            event.preventDefault();
            this.incrementMinute();
            break;
          case " ":
          case "Spacebar":
            event.preventDefault();
            break;
        }
      }
    };
    this.minuteUpButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.incrementMinute();
      }
    };
    this.secondDownButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.decrementSecond();
      }
    };
    this.secondKeyDownHandler = (event) => {
      const key = getKey(event.key);
      if (numberKeys.includes(key)) {
        const keyAsNumber = parseInt(key);
        let newSecond;
        if (isValidNumber(this.second) && this.second.startsWith("0")) {
          const secondAsNumber = parseInt(this.second);
          newSecond =
            secondAsNumber > maxTenthForMinuteAndSecond
              ? keyAsNumber
              : `${secondAsNumber}${keyAsNumber}`;
        }
        else {
          newSecond = keyAsNumber;
        }
        this.setTime("second", newSecond);
      }
      else {
        switch (key) {
          case "Backspace":
          case "Delete":
            this.setTime("second", null);
            break;
          case "ArrowDown":
            event.preventDefault();
            this.decrementSecond();
            break;
          case "ArrowUp":
            event.preventDefault();
            this.incrementSecond();
            break;
          case " ":
          case "Spacebar":
            event.preventDefault();
            break;
        }
      }
    };
    this.secondUpButtonKeyDownHandler = (event) => {
      if (this.buttonActivated(event)) {
        this.incrementSecond();
      }
    };
    this.setTime = (key, value, emit = true) => {
      switch (key) {
        default:
          return;
        case "hour":
          this.hour = typeof value === "number" ? formatTimePart(value) : value;
          break;
        case "minute":
          this.minute = typeof value === "number" ? formatTimePart(value) : value;
          break;
        case "second":
          this.second = typeof value === "number" ? formatTimePart(value) : value;
          break;
        case "meridiem":
          if (isValidNumber(this.hour)) {
            const hourAsNumber = parseInt(this.hour);
            switch (value) {
              case "AM":
                if (hourAsNumber >= 12) {
                  this.hour = formatTimePart(hourAsNumber - 12);
                }
                break;
              case "PM":
                if (hourAsNumber < 12) {
                  this.hour = formatTimePart(hourAsNumber + 12);
                }
                break;
            }
            this.meridiem = value;
          }
          else {
            this.meridiem = value;
          }
          break;
      }
      this.timeChanged = true;
      if (emit) {
        this.calciteTimePickerChange.emit(this.getTime());
      }
    };
  }
  hourChanged(newHour) {
    if (this.hourDisplayFormat === "12" && isValidNumber(newHour)) {
      this.meridiem = getMeridiem(newHour);
    }
  }
  timeChangeHandler() {
    const { hour, minute } = this.getTime();
    if (!hour && !minute) {
      this.setTime("meridiem", null, false);
    }
    if (this.timeChanged) {
      this.timeChanged = false;
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  hostBlurHandler() {
    this.calciteTimePickerBlur.emit();
  }
  hostFocusHandler() {
    this.calciteTimePickerFocus.emit();
  }
  keyDownHandler(event) {
    const key = getKey(event.key);
    switch (this.activeEl) {
      case this.hourEl:
        if (key === "ArrowRight") {
          this.setFocus("minute");
        }
        break;
      case this.minuteEl:
        switch (key) {
          case "ArrowLeft":
            this.setFocus("hour");
            break;
          case "ArrowRight":
            if (this.step !== 60) {
              this.setFocus("second");
            }
            else if (this.hourDisplayFormat === "12") {
              this.setFocus("meridiem");
            }
            break;
        }
        break;
      case this.secondEl:
        switch (key) {
          case "ArrowLeft":
            this.setFocus("minute");
            break;
          case "ArrowRight":
            if (this.hourDisplayFormat === "12") {
              this.setFocus("meridiem");
            }
            break;
        }
        break;
      case this.meridiemEl:
        switch (key) {
          case "ArrowLeft":
            if (this.step !== 60) {
              this.setFocus("second");
            }
            else {
              this.setFocus("minute");
            }
            break;
        }
        break;
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus(target) {
    var _a;
    (_a = this[`${target || "hour"}El`]) === null || _a === void 0 ? void 0 : _a.focus();
  }
  buttonActivated(event) {
    const key = getKey(event.key);
    if (key === " ") {
      event.preventDefault();
    }
    return isActivationKey(key);
  }
  getDisplayHour() {
    if (!this.hour) {
      return "--";
    }
    if (this.hourDisplayFormat === "12") {
      return getMeridiemHour(this.hour);
    }
    return this.hour;
  }
  getTime() {
    return {
      hour: this.hour,
      minute: this.minute,
      second: this.second
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    if (this.hourDisplayFormat === "12") {
      this.meridiem = getMeridiem(this.hour);
    }
    if (isValidNumber(this.hour)) {
      this.hour = formatTimePart(parseInt(this.hour));
    }
    if (isValidNumber(this.minute)) {
      this.minute = formatTimePart(parseInt(this.minute));
    }
    if (isValidNumber(this.second)) {
      this.second = formatTimePart(parseInt(this.second));
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const iconScale = this.scale === "s" || this.scale === "m" ? "s" : "m";
    const includeSeconds = this.step !== 60;
    const hourIsNumber = isValidNumber(this.hour);
    const minuteIsNumber = isValidNumber(this.minute);
    const secondIsNumber = isValidNumber(this.second);
    return (h(Host, null, h("div", { class: CSS.timePicker }, h("div", { role: "group" }, h("span", { "aria-label": this.intlHourUp, class: {
        [CSS.button]: true,
        [CSS.buttonHourUp]: true,
        [CSS.buttonTopLeft]: true
      }, onClick: this.incrementHour, onKeyDown: this.hourUpButtonKeyDownHandler, role: "button", tabIndex: -1 }, h("calcite-icon", { icon: "chevron-up", scale: iconScale })), h("span", { "aria-label": this.intlHour, "aria-valuemax": "23", "aria-valuemin": "1", "aria-valuenow": hourIsNumber && parseInt(this.hour), "aria-valuetext": this.hour, class: {
        [CSS.input]: true,
        [CSS.hour]: true
      }, onFocus: this.focusHandler, onKeyDown: this.hourKeyDownHandler, ref: (el) => (this.hourEl = el), role: "spinbutton", tabIndex: 0 }, this.getDisplayHour()), h("span", { "aria-label": this.intlHourDown, class: {
        [CSS.button]: true,
        [CSS.buttonHourDown]: true,
        [CSS.buttonBottomLeft]: true
      }, onClick: this.decrementHour, onKeyDown: this.hourDownButtonKeyDownHandler, role: "button", tabIndex: -1 }, h("calcite-icon", { icon: "chevron-down", scale: iconScale }))), h("span", { class: CSS.delimiter }, ":"), h("div", { role: "group" }, h("span", { "aria-label": this.intlMinuteUp, class: {
        [CSS.button]: true,
        [CSS.buttonMinuteUp]: true
      }, onClick: this.incrementMinute, onKeyDown: this.minuteUpButtonKeyDownHandler, role: "button", tabIndex: -1 }, h("calcite-icon", { icon: "chevron-up", scale: iconScale })), h("span", { "aria-label": this.intlMinute, "aria-valuemax": "12", "aria-valuemin": "1", "aria-valuenow": minuteIsNumber && parseInt(this.minute), "aria-valuetext": this.minute, class: {
        [CSS.input]: true,
        [CSS.minute]: true
      }, onFocus: this.focusHandler, onKeyDown: this.minuteKeyDownHandler, ref: (el) => (this.minuteEl = el), role: "spinbutton", tabIndex: 0 }, this.minute ? this.minute : "--"), h("span", { "aria-label": this.intlMinuteDown, class: {
        [CSS.button]: true,
        [CSS.buttonMinuteDown]: true
      }, onClick: this.decrementMinute, onKeyDown: this.minuteDownButtonKeyDownHandler, role: "button", tabIndex: -1 }, h("calcite-icon", { icon: "chevron-down", scale: iconScale }))), includeSeconds && h("span", { class: CSS.delimiter }, ":"), includeSeconds && (h("div", { role: "group" }, h("span", { "aria-label": this.intlSecondUp, class: {
        [CSS.button]: true,
        [CSS.buttonSecondUp]: true
      }, onClick: this.incrementSecond, onKeyDown: this.secondUpButtonKeyDownHandler, role: "button", tabIndex: -1 }, h("calcite-icon", { icon: "chevron-up", scale: iconScale })), h("span", { "aria-label": this.intlSecond, "aria-valuemax": "59", "aria-valuemin": "0", "aria-valuenow": secondIsNumber && parseInt(this.second), "aria-valuetext": this.second, class: {
        [CSS.input]: true,
        [CSS.second]: true
      }, onFocus: this.focusHandler, onKeyDown: this.secondKeyDownHandler, ref: (el) => (this.secondEl = el), role: "spinbutton", tabIndex: 0 }, this.second ? this.second : "--"), h("span", { "aria-label": this.intlSecondDown, class: {
        [CSS.button]: true,
        [CSS.buttonSecondDown]: true
      }, onClick: this.decrementSecond, onKeyDown: this.secondDownButtonKeyDownHandler, role: "button", tabIndex: -1 }, h("calcite-icon", { icon: "chevron-down", scale: iconScale })))), this.hourDisplayFormat === "12" && (h("div", { role: "group" }, h("span", { "aria-label": this.intlMeridiemUp, class: {
        [CSS.button]: true,
        [CSS.buttonMeridiemUp]: true,
        [CSS.buttonTopRight]: true
      }, onClick: this.incrementMeridiem, onKeyDown: this.meridiemUpButtonKeyDownHandler, role: "button", tabIndex: -1 }, h("calcite-icon", { icon: "chevron-up", scale: iconScale })), h("span", { "aria-label": this.intlMeridiem, "aria-valuemax": "2", "aria-valuemin": "1", "aria-valuenow": this.meridiem === "AM" ? "1" : this.meridiem === "PM" ? "2" : undefined, "aria-valuetext": this.meridiem, class: {
        [CSS.input]: true,
        [CSS.meridiem]: true
      }, onFocus: this.focusHandler, onKeyDown: this.meridiemKeyDownHandler, ref: (el) => (this.meridiemEl = el), role: "spinbutton", tabIndex: 0 }, this.meridiem ? this.meridiem : "--"), h("span", { "aria-label": this.intlMeridiemDown, class: {
        [CSS.button]: true,
        [CSS.buttonMeridiemDown]: true,
        [CSS.buttonBottomRight]: true
      }, onClick: this.decrementMeridiem, onKeyDown: this.meridiemDownButtonKeyDownHandler, role: "button", tabIndex: -1 }, h("calcite-icon", { icon: "chevron-down", scale: iconScale })))))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "hour": ["hourChanged", "timeChangeHandler"],
    "minute": ["timeChangeHandler"],
    "second": ["timeChangeHandler"]
  }; }
};
CalciteTimePicker.style = calciteTimePickerCss;

export { CalciteTimePicker as calcite_time_picker };
