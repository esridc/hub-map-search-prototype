import { r as registerInstance, e as createEvent, j as forceUpdate, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { a as getElementDir, C as CSS_UTILITY } from './dom-35210035.js';
import { c as createObserver } from './observers-93f01172.js';
import './guid-9ad8042d.js';

const CSS = {
  button: "button",
  buttonTextVisible: "button--text-visible",
  buttonCompact: "button--compact",
  iconContainer: "icon-container",
  slotContainer: "slot-container",
  slotContainerHidden: "slot-container--hidden",
  textContainer: "text-container",
  textContainerVisible: "text-container--visible"
};
const TEXT = {
  loading: "Loading"
};

const calciteActionCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:flex;background-color:transparent}:host([disabled]){pointer-events:none}.button{background-color:var(--calcite-ui-foreground-1);border-style:none;cursor:pointer;fill:var(--calcite-ui-text-3);display:flex;outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;align-items:center;justify-content:flex-start;margin:0;position:relative;font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-3);width:auto;font-family:inherit;text-align:unset}.button:hover{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1);fill:var(--calcite-ui-text-1)}.button:focus{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1);fill:var(--calcite-ui-text-1);outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.button:active{background-color:var(--calcite-ui-foreground-3)}.button .icon-container{display:flex;align-items:center;justify-content:center;margin:0;pointer-events:none;min-width:1rem;min-height:1rem}.button .text-container{line-height:1rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0;width:0;opacity:0;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;transition-property:opacity;transition-property:margin;transition-property:width}.button .text-container--visible{flex:1 1 auto;opacity:1;width:auto}:host([scale=s]) .button{font-weight:var(--calcite-font-weight-normal);padding:0.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) .button--text-visible .icon-container{margin-right:0.5rem}:host([scale=m]) .button{font-weight:var(--calcite-font-weight-normal);padding:1rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) .button--text-visible .icon-container{margin-right:0.75rem}:host([scale=l]) .button{font-weight:var(--calcite-font-weight-normal);padding:1.25rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) .button--text-visible .icon-container{margin-right:1rem}:host([alignment=center]) .button{justify-content:center;width:100%}:host([alignment=end]) .button{justify-content:flex-end}:host([alignment=end]) .button .text-container--visible{flex:0 1 auto}:host([scale=s][compact]) .button,:host([scale=m][compact]) .button,:host([scale=l][compact]) .button{padding-left:0;padding-right:0}.slot-container{display:flex}.slot-container--hidden{display:none}.button--text-visible{width:100%}.button--text-visible .icon-container{margin:0}.button--text-visible .text-container--visible{margin:0;margin-right:0.5rem}.button--text-visible.calcite--rtl .text-container--visible{margin:0;margin-left:0.5rem}:host([scale=s]) .button--text-visible.calcite--rtl .icon-container{margin:0;margin-left:0.5rem}:host([scale=m]) .button--text-visible.calcite--rtl .icon-container{margin:0;margin-left:0.75rem}:host([scale=l]) .button--text-visible.calcite--rtl .icon-container{margin:0;margin-left:1rem}:host([active]) .button,:host([active]) .button:hover,:host([active]) .button:focus,:host([active][loading]) .button{color:var(--calcite-ui-text-1);fill:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-3)}:host([active]) .button:active{background-color:var(--calcite-ui-foreground-1)}:host([appearance=clear]) .button{background-color:transparent;transition-property:box-shadow;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}:host([appearance=clear]) .button:hover,:host([appearance=clear]) .button:focus{background-color:transparent;box-shadow:0 0 0 2px var(--calcite-ui-border-1) inset}:host([active][appearance=clear]) .button,:host([active][appearance=clear]) .button:hover,:host([active][appearance=clear]) .button:focus{color:var(--calcite-ui-text-1);fill:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-3)}:host([appearance=clear][loading]) .button,:host([appearance=clear][disabled]) .button{background-color:transparent}:host([loading]) .button,:host([loading]) .button:hover,:host([loading]) .button:focus{background-color:var(--calcite-ui-foreground-1)}:host([loading]) .button .text-container,:host([loading]) .button:hover .text-container,:host([loading]) .button:focus .text-container{opacity:var(--calcite-ui-opacity-disabled)}:host([loading]) calcite-loader[inline]{margin-right:0;color:var(--calcite-ui-text-3)}:host([disabled]) .button,:host([disabled]) .button:hover,:host([disabled]) .button:focus{cursor:default;opacity:var(--calcite-ui-opacity-disabled);background-color:var(--calcite-ui-foreground-1)}:host([disabled][active]) .button,:host([disabled][active]) .button:hover,:host([disabled][active]) .button:focus{opacity:var(--calcite-ui-opacity-disabled);background-color:var(--calcite-ui-foreground-3)}:host([indicator]) .button--text-visible,:host([indicator][scale=s]) .button--text-visible,:host([indicator][scale=l]) .button--text-visible{padding-right:1rem}:host([indicator]) .button::after{content:\"\";position:absolute;border-width:2px;background-color:var(--calcite-ui-brand);border-radius:9999px;height:0.5rem;width:0.5rem;z-index:10;border-color:var(--calcite-ui-foreground-1);bottom:0.5rem;right:0.5rem}:host([indicator][scale=s]) .button::after{bottom:0.25rem;right:0.25rem}:host([indicator][scale=l]) .button::after{bottom:0.5rem;right:0.5rem}:host([indicator]) .calcite--rtl::after{right:auto;left:0.25rem}:host([indicator]) .button--text-visible.calcite--rtl{padding-right:0.75rem;padding-left:1rem}:host([indicator]) .button:hover::after,:host([indicator]) .button:focus::after{border-color:var(--calcite-ui-foreground-1)}:host([indicator][active]) .button::after{border-color:var(--calcite-ui-foreground-3)}:host([indicator]) .button--text-visible::after,:host([indicator][scale=s]) .button--text-visible::after,:host([indicator][scale=l]) .button--text-visible::after{bottom:auto;right:0.5rem}:host([indicator]) .button--text-visible.calcite--rtl::after,:host([indicator][scale=s]) .button--text-visible.calcite--rtl::after,:host([indicator][scale=l]) .button--text-visible.calcite--rtl::after{right:auto;left:0.5rem}";

const CalciteAction = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteActionClick = createEvent(this, "calciteActionClick", 7);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /** Specify the appearance style of the action, defaults to solid. */
    this.appearance = "solid";
    /**
     * Indicates whether the action is highlighted.
     */
    this.active = false;
    /**
     * Compact mode is used internally by components to reduce side padding, e.g. calcite-block-section.
     */
    this.compact = false;
    /**
     * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
     */
    this.disabled = false;
    /**
     * Indicates unread changes.
     */
    this.indicator = false;
    /** string to override English loading text
     * @default "Loading"
     */
    this.intlLoading = TEXT.loading;
    /**
     * When true, content is waiting to be loaded. This state shows a busy indicator.
     */
    this.loading = false;
    /**
     * Specifies the size of the action.
     */
    this.scale = "m";
    /**
     * Indicates whether the text is displayed.
     */
    this.textEnabled = false;
    this.mutationObserver = createObserver("mutation", () => forceUpdate(this));
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.calciteActionClickHandler = () => {
      if (!this.disabled) {
        this.calciteActionClick.emit();
      }
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
  }
  disconnectedCallback() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    this.buttonEl.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderTextContainer() {
    const { text, textEnabled } = this;
    const textContainerClasses = {
      [CSS.textContainer]: true,
      [CSS.textContainerVisible]: textEnabled
    };
    return text ? (h("div", { class: textContainerClasses, key: "text-container" }, text)) : null;
  }
  renderIconContainer() {
    var _a;
    const { loading, icon, scale, el, intlLoading } = this;
    const iconScale = scale === "l" ? "m" : "s";
    const calciteLoaderNode = loading ? (h("calcite-loader", { active: true, inline: true, label: intlLoading, scale: iconScale })) : null;
    const calciteIconNode = icon ? h("calcite-icon", { icon: icon, scale: iconScale }) : null;
    const iconNode = calciteLoaderNode || calciteIconNode;
    const hasIconToDisplay = iconNode || ((_a = el.children) === null || _a === void 0 ? void 0 : _a.length);
    const slotContainerNode = (h("div", { class: {
        [CSS.slotContainer]: true,
        [CSS.slotContainerHidden]: loading
      } }, h("slot", null)));
    return hasIconToDisplay ? (h("div", { "aria-hidden": "true", class: CSS.iconContainer, key: "icon-container" }, iconNode, slotContainerNode)) : null;
  }
  render() {
    const { compact, disabled, loading, el, textEnabled, label, text } = this;
    const ariaLabel = label || text;
    const rtl = getElementDir(el) === "rtl";
    const buttonClasses = {
      [CSS.button]: true,
      [CSS.buttonTextVisible]: textEnabled,
      [CSS.buttonCompact]: compact,
      [CSS_UTILITY.rtl]: rtl
    };
    return (h(Host, { onClick: this.calciteActionClickHandler }, h("button", { "aria-busy": loading.toString(), "aria-disabled": disabled.toString(), "aria-label": ariaLabel, class: buttonClasses, disabled: disabled, ref: (buttonEl) => (this.buttonEl = buttonEl) }, this.renderIconContainer(), this.renderTextContainer())));
  }
  get el() { return getElement(this); }
};
CalciteAction.style = calciteActionCss;

export { CalciteAction as calcite_action };
