import { r as registerInstance, h, F as Fragment, g as getElement } from './index-d836c4a8.js';

const CSS = {
  footer: "footer",
  header: "header",
  subtitle: "subtitle",
  title: "title",
  value: "value",
  valueContainer: "value-container",
  valueColorProp: "--valueColor",
  unit: "unit"
};
const SLOTS = {
  headerMedia: "header-media",
  valueMedia: "value-media",
  footer: "footer"
};

const arcgisStatCardCss = ":host{display:block}.header{display:flex;align-items:center;justify-content:space-between}.title{margin:0px;display:flex;font-size:var(--calcite-font-size-3);line-height:2rem}.header calcite-icon{margin:0.25rem}.subtitle{font-size:var(--calcite-font-size-2);line-height:1.5rem}.footer{display:flex;width:100%;flex-direction:column;align-items:flex-start}.value-container{display:flex;font-size:var(--calcite-font-size-6);line-height:4rem;color:var(--valueColor, var(--calcite-ui-brand))}.value{display:flex;flex-direction:row;align-items:center}:host([unit-position=\"below\"]) .value-container{flex-direction:column}:host([unit-position=\"below\"]) .value{line-height:3rem}:host([unit-position=\"below\"]) .unit{font-size:var(--calcite-font-size-1);line-height:1.5rem}:host([text-align=\"center\"]) .header{flex-direction:column-reverse}:host([text-align=\"end\"]) .header{justify-content:flex-end}:host([text-align=\"center\"]) .value-container,:host([text-align=\"center\"]) .footer{align-items:center;justify-content:center}:host([text-align=\"end\"]) .value-container,:host([text-align=\"end\"]) .footer{align-items:flex-end;justify-content:flex-end}:host([text-align=\"center\"]) .subtitle{text-align:center}:host([text-align=\"end\"]) .subtitle{text-align:text-end}";

const ArcgisStatCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * The alignment of the text (optional)
     *
     * @type {Alignment}
     * @memberof ArcgisStatCard
     */
    this.textAlign = 'start';
    /**
     * The color in which to render the value (optional)
     *
     * @type {string=--calcite-ui-brand}
     * @memberof ArcgisStatCard
     */
    this.valueColor = '';
    /**
     * Where to render the unit (optional)
     *
     * @type {UnitPosition=after}
     * @memberof ArcgisStatCard
     */
    this.unitPosition = 'after';
  }
  onColorChanged(newVal) {
    const cssVar = CSS.valueColorProp;
    if (newVal) {
      this.el.style.setProperty(cssVar, newVal);
    }
    else {
      this.el.style.removeProperty(cssVar);
    }
  }
  componentDidLoad() {
    this.onColorChanged(this.valueColor);
  }
  renderHeader(title, tooltip) {
    return h("div", { class: "header", slot: "title" }, h("h1", { class: CSS.title }, title, this.renderTooltip(tooltip)), h("slot", { name: SLOTS.headerMedia }));
  }
  renderTooltip(tooltip) {
    let result;
    if (tooltip) {
      result = h(Fragment, null, h("calcite-tooltip-manager", null, h("calcite-icon", { icon: "information-f", scale: "s", id: "tooltip-button" })), h("calcite-tooltip", { "reference-element": "tooltip-button" }, tooltip));
    }
    return result;
  }
  renderSubtitle(subtitle) {
    return subtitle && h("h2", { class: CSS.subtitle, slot: "subtitle" }, subtitle);
  }
  renderValue(value, unit) {
    const result = [
      h("span", { class: CSS.value }, value, h("slot", { name: SLOTS.valueMedia }))
    ];
    if (unit) {
      result.push(h("span", { class: CSS.unit }, unit));
    }
    if (this.unitPosition === 'before') {
      result.reverse();
    }
    return result;
  }
  renderFooter(trailingText) {
    /*
      this could be a bit confusing we render a div with slot="footer-leading"
      that means, "put that div in the calcite-card's 'footer-leading' slot"
      _inside that_ we render whatever we got on the trailingText prop
      _then_ whatever we got in _this component's_ 'footer' slot
    */
    return h("div", { class: CSS.footer, slot: "footer-leading" }, trailingText, h("slot", { name: SLOTS.footer }));
  }
  get isLoading() {
    return !this.value;
  }
  render() {
    return h("calcite-card", { loading: this.isLoading }, this.renderHeader(this.cardTitle, this.titleTooltip), this.renderSubtitle(this.subtitle), h("div", { class: CSS.valueContainer }, this.renderValue(this.value, this.unit)), this.renderFooter(this.trailingText));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "valueColor": ["onColorChanged"]
  }; }
};
ArcgisStatCard.style = arcgisStatCardCss;

export { ArcgisStatCard as arcgis_stat_card };
