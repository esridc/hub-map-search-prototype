import { r as registerInstance, e as createEvent, h, F as Fragment, g as getElement } from './index-d836c4a8.js';
import { h as hasLabel, a as getElementDir, C as CSS_UTILITY } from './dom-35210035.js';
import { g as guid } from './guid-9ad8042d.js';

const TEXT = {
  rating: "Rating",
  stars: "Stars: ${num}"
};

const calciteRatingCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;align-items:center;position:relative;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content}:host([scale=s]){height:1.5rem;--calcite-rating-spacing-unit:0.25rem}:host([scale=m]){height:2rem;--calcite-rating-spacing-unit:0.5rem}:host([scale=l]){height:2.75rem;--calcite-rating-spacing-unit:0.75rem}:host([disabled]){pointer-events:none;opacity:0.5}:host([read-only]){pointer-events:none}.fieldset{padding:0;margin:0;border-width:0;display:flex}.wrapper{display:inline-block;margin-right:var(--calcite-rating-spacing-unit)}.calcite--rtl .wrapper{margin-right:0;margin-left:var(--calcite-rating-spacing-unit)}.star{position:relative;display:flex;cursor:pointer;outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;color:var(--calcite-ui-border-input);transition:150ms ease-in-out;transform:scale(1)}.star:active{transform:scale(1.1)}.focused{outline:2px solid var(--calcite-ui-brand);outline-offset:2px}.average,.fraction{color:var(--calcite-ui-warning)}.hovered,.selected,:host([read-only]) .average,:host([read-only]) .fraction{color:var(--calcite-ui-brand)}.hovered:not(.selected){transform:scale(0.9)}:host .fraction{position:absolute;overflow:hidden;pointer-events:none;top:0;left:0;transition:150ms ease-in-out}.calcite--rtl .fraction{right:0;left:auto}calcite-chip{cursor:default;pointer-events:none}.number--average{font-weight:var(--calcite-font-weight-bold)}.number--count{color:var(--calcite-ui-text-2);font-style:italic}.number--count:not(:first-child){margin-left:var(--calcite-rating-spacing-unit)}.calcite--rtl .number--count:not(:first-child){margin-left:0;margin-right:var(--calcite-rating-spacing-unit)}.visually-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}";

const CalciteRating = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteRatingChange = createEvent(this, "calciteRatingChange", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /** specify the scale of the component, defaults to m */
    this.scale = "m";
    /** the value of the rating component */
    this.value = 0;
    /** is the rating component in a selectable mode */
    this.readOnly = false;
    /** is the rating component in a selectable mode */
    this.disabled = false;
    /** Show average and count data summary chip (if available) */
    this.showChip = false;
    /** Localized string for "Rating" (used for aria label)
     * @default "Rating"
     */
    this.intlRating = TEXT.rating;
    /** Localized string for labelling each star, `${num}` in the string will be replaced by the number
     * @default "Stars: ${num}"
     */
    this.intlStars = TEXT.stars;
    this.guid = `calcite-ratings-${guid()}`;
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  handleLabelFocus(e) {
    if (hasLabel(e.detail.labelEl, this.el) &&
      e.detail.interactedEl !== this.el &&
      !this.el.contains(e.detail.interactedEl)) {
      this.setFocus();
    }
  }
  blurHandler() {
    this.hasFocus = false;
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderStars() {
    return [1, 2, 3, 4, 5].map((i) => {
      const selected = this.value >= i;
      const average = this.average && !this.value && i <= this.average;
      const hovered = i <= this.hoverValue;
      const fraction = this.average && this.average + 1 - i;
      const partial = !this.value && !hovered && fraction > 0 && fraction < 1;
      const focused = this.hasFocus && this.focusValue === i;
      return (h("span", { class: { wrapper: true } }, h("label", { class: { star: true, focused, selected, average, hovered, partial }, htmlFor: `${this.guid}-${i}`, onMouseOver: () => {
          this.hoverValue = i;
        } }, h("calcite-icon", { "aria-hidden": "true", class: "icon", icon: selected || average || this.readOnly ? "star-f" : "star", scale: this.scale }), partial && (h("div", { class: "fraction", style: { width: `${fraction * 100}%` } }, h("calcite-icon", { icon: "star-f", scale: this.scale }))), h("span", { class: "visually-hidden" }, this.intlStars.replace("${num}", `${i}`))), h("input", { checked: i === this.value, class: "visually-hidden", disabled: this.disabled || this.readOnly, id: `${this.guid}-${i}`, name: this.guid, onChange: () => this.updateValue(i), onFocus: () => {
          this.hasFocus = true;
          this.focusValue = i;
        }, ref: (el) => (i === 1 || i === this.value) && (this.inputFocusRef = el), type: "radio", value: i })));
    });
  }
  render() {
    const { intlRating, showChip, scale, count, average } = this;
    const dir = getElementDir(this.el);
    return (h(Fragment, null, h("fieldset", { class: { fieldset: true, [CSS_UTILITY.rtl]: dir === "rtl" }, onBlur: () => (this.hoverValue = null), onMouseLeave: () => (this.hoverValue = null), onTouchEnd: () => (this.hoverValue = null) }, h("legend", { class: "visually-hidden" }, intlRating), this.renderStars()), (count || average) && showChip ? (h("calcite-chip", { class: { [CSS_UTILITY.rtl]: dir === "rtl" }, dir: dir, scale: scale, value: count === null || count === void 0 ? void 0 : count.toString() }, !!average && h("span", { class: "number--average" }, average.toString()), !!count && h("span", { class: "number--count" }, "(", count === null || count === void 0 ? void 0 :
      count.toString(), ")"))) : null));
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  updateValue(value) {
    this.value = value;
    this.calciteRatingChange.emit({ value });
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    this.inputFocusRef.focus();
  }
  get el() { return getElement(this); }
};
CalciteRating.style = calciteRatingCss;

export { CalciteRating as calcite_rating };
