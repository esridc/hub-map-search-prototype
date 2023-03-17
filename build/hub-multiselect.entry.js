import { r as registerInstance, e as createEvent, h } from './index-d836c4a8.js';

const hubMultiselectCss = "calcite-chip{margin:0.25rem;margin-bottom:0px;margin-left:0px}";

const HubMultiselect = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubMultiselectChange = createEvent(this, "hubMultiselectChange", 7);
    /**
     * A boolean value indicating whether the multiselect is disabled.
     */
    this.disabled = false;
    this.parsedValues = [];
  }
  /**
   * Property watchers
   */
  handleValuesChanged(values) {
    this.parsedValues = Array.isArray(values) ? values : values.split(',');
  }
  /**
   * Event handling
   */
  handleChipDismissEvent(event) {
    const optionValue = event.detail.value;
    const index = this.parsedValues.findIndex((value) => value === optionValue);
    // update the reference
    this.parsedValues = [
      ...this.parsedValues.slice(0, index),
      ...this.parsedValues.slice(index + 1)
    ];
    this.hubMultiselectChange.emit({
      values: this.parsedValues.slice()
    });
  }
  handleKeyEvent(event) {
    const input = event.target;
    // only response when
    // * the Enter key is pressed
    // * the input box has a value
    // * the input box value is not duplicated with any selected value
    if (event.key === 'Enter' && input.value && !this.parsedValues.includes(input.value)) {
      const newValue = input.value;
      // update reference
      this.parsedValues = [
        ...this.parsedValues,
        newValue
      ];
      this.hubMultiselectChange.emit({
        values: this.parsedValues.slice()
      });
      input.value = '';
    }
  }
  /**
   * Hooks
   */
  componentWillLoad() {
    if (this.values) {
      this.handleValuesChanged(this.values);
    }
  }
  /**
   * Functions
   */
  render() {
    return (h("div", null, this.disabled
      ? null
      : h("calcite-input", { disabled: this.disabled }), this.parsedValues.map((value) => h("calcite-chip", { value: value, dismissible: !this.disabled }, value))));
  }
  static get watchers() { return {
    "values": ["handleValuesChanged"]
  }; }
};
HubMultiselect.style = hubMultiselectCss;

export { HubMultiselect as hub_multiselect };
