import { h, r as registerInstance, e as createEvent, g as getElement } from './index-d836c4a8.js';

class Input {
  constructor(params) {
    this.changeEventName = 'calciteInputInput';
    /**
     * calcite-input can render a variety of different input types. We
     * can change this inputType in the derived class to support more
     * types.
     */
    this.inputType = 'text';
    this.params = params;
  }
  render() {
    return (h("calcite-input", { type: this.inputType, value: this.params.value, disabled: this.params.disabled, required: this.params.required }));
  }
  getChangeValue(event) {
    // empty string is treated as a missing value so returns undefined
    return event.detail.value || undefined;
  }
}

// textarea is a special type of input in calcite-component
class Textarea extends Input {
  constructor() {
    super(...arguments);
    this.inputType = 'textarea';
  }
  // NOTE: The <textarea> does not respect the "value" attribute in the Ember app and
  // we have to manually inject the value into the slot.
  render() {
    return (h("calcite-input", { type: this.inputType, value: this.params.value, disabled: this.params.disabled, required: this.params.required }));
  }
}

class DatePicker {
  constructor(params) {
    this.changeEventName = 'calciteDatePickerChange';
    this.params = params;
  }
  render() {
    return (h("calcite-date-picker", { value: this.params.value }));
  }
  getChangeValue(event) {
    const date = event.detail;
    // remove the timezone in the datetime string
    return date.toISOString().split('T').shift();
  }
}

class Select {
  constructor(params) {
    this.changeEventName = 'calciteSelectChange';
    this.params = params;
  }
  render() {
    const schema = this.params.schema;
    return (h("calcite-select", { disabled: this.params.disabled, label: schema.title }, schema.enum.map((value, index) => {
      const selected = value === this.params.value;
      return (h("calcite-option", { selected: selected, "data-option-index": index }, value));
    })));
  }
  getChangeValue(event) {
    const element = event.target;
    const index = element.selectedOption.getAttribute('data-option-index');
    return this.params.schema.enum[index];
  }
}

class Multiselect {
  constructor(params) {
    this.params = params;
    this.changeEventName = 'hubMultiselectChange';
  }
  render() {
    const values = this.params.value || [];
    return (h("hub-multiselect", { values: values, disabled: this.params.disabled }));
  }
  getChangeValue(event) {
    return event.detail.values;
  }
}

// calcite-input renders an input type="color" when inputType === 'color' 
// when calcite-components implements input-color (https://github.com/Esri/calcite-components/issues/1934)
// we should switch to that
class ColorPicker extends Input {
  constructor() {
    super(...arguments);
    this.inputType = 'color';
  }
}

function create(params) {
  const schema = params.schema;
  if (schema.type === 'array') {
    return new Multiselect(params);
  }
  else if (Array.isArray(schema.enum)) {
    // create a select input when there is an "enum" array in the schema
    return new Select(params);
  }
  else if (schema.type === 'string') {
    // create different string inputs for string value
    return createStringInput(params);
  }
}
function createStringInput(params) {
  if (params.schema.format === 'date') {
    return new DatePicker(params);
  }
  else if (params.schema.subtype === 'long-text') {
    // longer text needs a textarea
    return new Textarea(params);
  }
  else if (params.schema.subtype === 'color') {
    return new ColorPicker(params);
  }
  else {
    // input is the default input element for string
    return new Input(params);
  }
}

const hubMetadataEditorFieldCss = ".disabled-text{min-height:44px;display:flex;align-items:center}";

// copied from https://github.com/lodash/lodash/blob/d35a9c40beb594d09814ba7f7673b81d4d67a816/lodash.isnil/index.js#L30-L32
function isNil(value) {
  return value == null;
}
const HubMetadataEditorField = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hubMetadataEditorFieldChange = createEvent(this, "hubMetadataEditorFieldChange", 7);
    /**
     * A boolean value indicating whether the value is valid
     */
    this.invalid = false;
    /**
     * A boolean value indicating whether the field is disabled
     */
    this.disabled = false;
    /**
     * A boolean value indicating whether the field value is required
     */
    this.required = false;
    /**
     * States
     */
    /**
     * Validation state for the field value
     */
    this.status = "idle";
  }
  /**
   * Hooks
   */
  componentWillLoad() {
    this.handleSchemaChange(this.schema);
    this.handleInvalidChange(this.invalid);
  }
  /**
   * Property watchers
   */
  handleSchemaChange(schema) {
    if (!schema) {
      throw new Error('schema attribute is required');
    }
    ;
    this.parsedSchema = this.parseJson(schema);
  }
  handlePropertyChange(property) {
    if (!property) {
      throw new Error('property attribute is required');
    }
    ;
  }
  handleInvalidChange(invalid) {
    this.status = invalid ? 'invalid' : 'idle';
  }
  /**
   * Functions
   */
  parseJson(json) {
    return typeof json === 'string' ? JSON.parse(json) : json;
  }
  updateFieldInput(params) {
    // remove the change event handler if any
    if (this.fieldInput && this.changeEventHandler) {
      this.element.removeEventListener(this.fieldInput.changeEventName, this.changeEventHandler);
    }
    this.fieldInput = create(params);
    // add the handler for the current change event
    this.changeEventHandler = (event) => {
      this.hubMetadataEditorFieldChange.emit({
        property: this.property,
        value: this.fieldInput.getChangeValue(event)
      });
    };
    this.element.addEventListener(this.fieldInput.changeEventName, this.changeEventHandler);
  }
  /**
   * Renders
   */
  render() {
    const value = [this.value, this.parsedSchema.default, this.parsedSchema.const].find((value) => !isNil(value));
    const disabled = this.disabled || !isNil(this.parsedSchema.const);
    const params = {
      schema: this.parsedSchema,
      value,
      disabled,
      required: this.required
    };
    this.updateFieldInput(params);
    return (h("calcite-label", { status: this.status }, this.parsedSchema.title, " ", this.required ? "*" : null, params.disabled
      ? h("div", { class: "disabled-text" }, params.value)
      : this.fieldInput.render()));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "schema": ["handleSchemaChange"],
    "property": ["handlePropertyChange"],
    "invalid": ["handleInvalidChange"]
  }; }
};
HubMetadataEditorField.style = hubMetadataEditorFieldCss;

export { HubMetadataEditorField as hub_metadata_editor_field };
