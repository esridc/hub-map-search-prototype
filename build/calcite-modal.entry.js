import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { i as isCalciteFocusable, f as focusElement, a as getElementDir, C as CSS_UTILITY, b as getSlotted, e as ensureId } from './dom-35210035.js';
import { g as getKey } from './key-4c5a210a.js';
import { c as createObserver } from './observers-93f01172.js';
import './guid-9ad8042d.js';

/**
 * Traverses the slots of the open shadowroots and returns all children matching the query.
 * @param {ShadowRoot | HTMLElement} root
 * @param skipNode
 * @param isMatch
 * @param {number} maxDepth
 * @param {number} depth
 * @returns {HTMLElement[]}
 */
function queryShadowRoot(root, skipNode, isMatch, maxDepth = 20, depth = 0) {
    let matches = [];
    // If the depth is above the max depth, abort the searching here.
    if (depth >= maxDepth) {
        return matches;
    }
    // Traverses a slot element
    const traverseSlot = ($slot) => {
        // Only check nodes that are of the type Node.ELEMENT_NODE
        // Read more here https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
        const assignedNodes = $slot.assignedNodes().filter(node => node.nodeType === 1);
        if (assignedNodes.length > 0) {
            return queryShadowRoot(assignedNodes[0].parentElement, skipNode, isMatch, maxDepth, depth + 1);
        }
        return [];
    };
    // Go through each child and continue the traversing if necessary
    // Even though the typing says that children can't be undefined, Edge 15 sometimes gives an undefined value.
    // Therefore we fallback to an empty array if it is undefined.
    const children = Array.from(root.children || []);
    for (const $child of children) {
        // Check if the node and its descendants should be skipped
        if (skipNode($child)) {
            continue;
        }
        // If the child matches we always add it
        if (isMatch($child)) {
            matches.push($child);
        }
        if ($child.shadowRoot != null) {
            matches.push(...queryShadowRoot($child.shadowRoot, skipNode, isMatch, maxDepth, depth + 1));
        }
        else if ($child.tagName === "SLOT") {
            matches.push(...traverseSlot($child));
        }
        else {
            matches.push(...queryShadowRoot($child, skipNode, isMatch, maxDepth, depth + 1));
        }
    }
    return matches;
}

/**
 * Returns whether the element is hidden.
 * @param $elem
 */
function isHidden($elem) {
    return $elem.hasAttribute("hidden")
        || ($elem.hasAttribute("aria-hidden") && $elem.getAttribute("aria-hidden") !== "false")
        // A quick and dirty way to check whether the element is hidden.
        // For a more fine-grained check we could use "window.getComputedStyle" but we don't because of bad performance.
        // If the element has visibility set to "hidden" or "collapse", display set to "none" or opacity set to "0" through CSS
        // we won't be able to catch it here. We accept it due to the huge performance benefits.
        || $elem.style.display === `none`
        || $elem.style.opacity === `0`
        || $elem.style.visibility === `hidden`
        || $elem.style.visibility === `collapse`;
    // If offsetParent is null we can assume that the element is hidden
    // https://stackoverflow.com/questions/306305/what-would-make-offsetparent-null
    //|| $elem.offsetParent == null;
}
/**
 * Returns whether the element is disabled.
 * @param $elem
 */
function isDisabled($elem) {
    return $elem.hasAttribute("disabled")
        || ($elem.hasAttribute("aria-disabled") && $elem.getAttribute("aria-disabled") !== "false");
}
/**
 * Determines whether an element is focusable.
 * Read more here: https://stackoverflow.com/questions/1599660/which-html-elements-can-receive-focus/1600194#1600194
 * Or here: https://stackoverflow.com/questions/18261595/how-to-check-if-a-dom-element-is-focusable
 * @param $elem
 */
function isFocusable($elem) {
    // Discard elements that are removed from the tab order.
    if ($elem.getAttribute("tabindex") === "-1" || isHidden($elem) || isDisabled($elem)) {
        return false;
    }
    return (
    // At this point we know that the element can have focus (eg. won't be -1) if the tabindex attribute exists
    $elem.hasAttribute("tabindex")
        // Anchor tags or area tags with a href set
        || ($elem instanceof HTMLAnchorElement || $elem instanceof HTMLAreaElement) && $elem.hasAttribute("href")
        // Form elements which are not disabled
        || ($elem instanceof HTMLButtonElement
            || $elem instanceof HTMLInputElement
            || $elem instanceof HTMLTextAreaElement
            || $elem instanceof HTMLSelectElement)
        // IFrames
        || $elem instanceof HTMLIFrameElement);
}

const CSS = {
  title: "title",
  header: "header",
  footer: "footer",
  scrim: "scrim",
  back: "back",
  close: "close",
  secondary: "secondary",
  primary: "primary",
  overflowHidden: "overflow-hidden"
};
const ICONS = {
  close: "x"
};
const SLOTS = {
  content: "content",
  header: "header",
  back: "back",
  secondary: "secondary",
  primary: "primary"
};
const TEXT = {
  close: "Close"
};

const calciteModalCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{position:fixed;top:0;right:0;bottom:0;left:0;display:flex;justify-content:center;align-items:center;overflow-y:hidden;color:var(--calcite-ui-text-2);opacity:0;visibility:hidden !important;transition:visibility 0ms linear 300ms, opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88);z-index:101}:host([scale=s]){--calcite-modal-padding:0.75rem;--calcite-modal-padding-large:1rem;--calcite-modal-title-text:var(--calcite-font-size-1);--calcite-modal-content-text:var(--calcite-font-size--1)}:host([scale=m]){--calcite-modal-padding:1rem;--calcite-modal-padding-large:1.25rem;--calcite-modal-title-text:var(--calcite-font-size-2);--calcite-modal-content-text:var(--calcite-font-size-0)}:host([scale=l]){--calcite-modal-padding:1.25rem;--calcite-modal-padding-large:1.5rem;--calcite-modal-title-text:var(--calcite-font-size-3);--calcite-modal-content-text:var(--calcite-font-size-1)}.scrim{--calcite-scrim-background:rgba(0, 0, 0, 0.75);position:fixed;top:0;right:0;bottom:0;left:0;display:flex;overflow-y:hidden}.modal{display:flex;flex-direction:column;box-shadow:0 2px 12px -4px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.16);box-sizing:border-box;float:none;margin:1.5rem;border-radius:0.25rem;background-color:var(--calcite-ui-foreground-1);width:100%;opacity:0;pointer-events:none;overflow:hidden;z-index:102;-webkit-overflow-scrolling:touch;visibility:hidden;transition:transform 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), visibility 0ms linear 300ms, opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88);transform:translate3d(0, 20px, 0)}:host([active]){opacity:1;visibility:visible !important;transition-delay:0ms}:host([active]) .modal{opacity:1;pointer-events:auto;visibility:visible;transform:translate3d(0, 0, 0);transition:transform 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), visibility 0ms linear, opacity 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), max-width 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88), max-height 300ms cubic-bezier(0.215, 0.44, 0.42, 0.88);transition-delay:0ms}.header{display:flex;max-width:100%;min-width:0;border-top-left-radius:0.25rem;border-top-right-radius:0.25rem;background-color:var(--calcite-ui-foreground-1);border-width:0;border-bottom-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3);flex:0 0 auto;z-index:2}.close{margin:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-style:none;color:var(--calcite-ui-text-3);order:2;cursor:pointer;border-top-right-radius:0.25rem;background-color:transparent;outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;padding:var(--calcite-modal-padding);flex:0 0 auto;transition:all 0.15s ease-in-out}.close calcite-icon{pointer-events:none;vertical-align:-2px}.close:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.close:hover,.close:focus,.close:active{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}.calcite--rtl .close{border-top-left-radius:0.25rem;border-top-right-radius:0}.title{display:flex;align-items:center;order:1;min-width:0;flex:1 1 auto;padding:var(--calcite-modal-padding) var(--calcite-modal-padding-large)}slot[name=header]::slotted(*),*::slotted([slot=header]){margin:0;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-1);font-size:var(--calcite-modal-title-text)}.content{position:relative;padding:0;height:100%;overflow:auto;display:block;background-color:var(--calcite-ui-foreground-1);box-sizing:border-box;max-height:calc(100vh - 12rem);z-index:1}.content--spaced{padding:var(--calcite-modal-padding) var(--calcite-modal-padding-large)}.content--no-footer{border-bottom-right-radius:0.25rem;border-bottom-left-radius:0.25rem}slot[name=content]::slotted(*),*::slotted([slot=content]){font-size:var(--calcite-modal-content-text)}:host([background-color=grey]) .content{background-color:var(--calcite-ui-background)}.footer{display:flex;justify-content:space-between;margin-top:auto;box-sizing:border-box;border-bottom-right-radius:0.25rem;border-bottom-left-radius:0.25rem;width:100%;background-color:var(--calcite-ui-foreground-1);border-width:0;border-top-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3);flex:0 0 auto;padding:var(--calcite-modal-padding) var(--calcite-modal-padding-large);z-index:2}.footer--hide-back .back,.footer--hide-secondary .secondary{display:none}.back{display:block;margin-right:auto}.calcite--rtl .back{margin-left:auto;margin-right:0}.secondary{display:block;margin-left:0.25rem;margin-right:0.25rem}slot[name=primary]{display:block}:host([width=small]) .modal{width:auto}:host([width=s]) .modal{max-width:32rem}@media screen and (max-width: 35rem){:host([width=s]) .modal{height:100%;max-height:100%;width:100%;max-width:100%;margin:0;border-radius:0}:host([width=s]) .content{flex:1 1 auto;max-height:unset}:host([width=s][docked]){align-items:flex-end}}:host([width=m]) .modal{max-width:48rem}@media screen and (max-width: 51rem){:host([width=m]) .modal{height:100%;max-height:100%;width:100%;max-width:100%;margin:0;border-radius:0}:host([width=m]) .content{flex:1 1 auto;max-height:unset}:host([width=m][docked]){align-items:flex-end}}:host([width=l]) .modal{max-width:94rem}@media screen and (max-width: 97rem){:host([width=l]) .modal{height:100%;max-height:100%;width:100%;max-width:100%;margin:0;border-radius:0}:host([width=l]) .content{flex:1 1 auto;max-height:unset}:host([width=l][docked]){align-items:flex-end}}:host([fullscreen]){background-color:transparent}:host([fullscreen]) .modal{height:100%;max-height:100%;width:100%;max-width:100%;margin:0;transform:translate3D(0, 20px, 0) scale(0.95)}:host([fullscreen]) .content{max-height:100%;flex:1 1 auto}:host([active][fullscreen]) .modal{transform:translate3D(0, 0, 0) scale(1)}:host([active][fullscreen]) .header{border-radius:0}:host([active][fullscreen]) .footer{border-radius:0}:host([docked]) .modal{height:auto}:host([docked]) .content{height:auto;flex:1 1 auto}@media screen and (max-width: 860px){:host([docked]) .modal{border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}:host([docked]) .close{border-radius:0 var(--calcite-border-radius) 0 0}}@media screen and (max-width: 860px){:host([docked]) .calcite--rtl .close{border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}}:host([color=red]) .modal{border-color:var(--calcite-ui-danger)}:host([color=blue]) .modal{border-color:var(--calcite-ui-info)}:host([color=red]) .modal,:host([color=blue]) .modal{border-width:0;border-top-width:4px;border-style:solid}:host([color=red]) .header,:host([color=blue]) .header{border-radius:0.25rem;border-bottom-right-radius:0;border-bottom-left-radius:0}@media screen and (max-width: 860px){slot[name=header]::slotted(*),*::slotted([slot=header]){font-size:var(--calcite-font-size-1)}.footer{position:sticky;bottom:0}}@media screen and (max-width: 480px){.footer{flex-direction:column}.calcite--rtl .back,.back,.secondary{margin:0;margin-bottom:0.25rem}}";

const isFocusableExtended = (el) => {
  return isCalciteFocusable(el) || isFocusable(el);
};
const getFocusableElements = (el) => {
  return queryShadowRoot(el, isHidden, isFocusableExtended);
};
const CalciteModal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteModalOpen = createEvent(this, "calciteModalOpen", 7);
    this.calciteModalClose = createEvent(this, "calciteModalClose", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** Add the active attribute to open the modal */
    this.active = false;
    /** Optionally pass a function to run before close */
    this.beforeClose = () => Promise.resolve();
    /** Disables the display a close button within the Modal */
    this.disableCloseButton = false;
    /** Disables the closing of the Modal when clicked outside. */
    this.disableOutsideClose = false;
    /** Aria label for the close button */
    this.intlClose = TEXT.close;
    /** Flag to disable the default close on escape behavior */
    this.disableEscape = false;
    /** specify the scale of modal, defaults to m */
    this.scale = "m";
    /** Set the width of the modal. Can use stock sizes or pass a number (in pixels) */
    this.width = "m";
    /** Background color of modal content */
    this.backgroundColor = "white";
    /** Turn off spacing around the content area slot */
    this.noPadding = false;
    //--------------------------------------------------------------------------
    //
    //  Variables
    //
    //--------------------------------------------------------------------------
    this.hasFooter = true;
    this.mutationObserver = createObserver("mutation", () => this.updateFooterVisibility());
    this.activeTransitionProp = "opacity";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.transitionEnd = (event) => {
      if (event.propertyName === this.activeTransitionProp) {
        this.active ? this.calciteModalOpen.emit() : this.calciteModalClose.emit();
      }
    };
    this.openEnd = () => {
      this.setFocus();
      this.el.removeEventListener("calciteModalOpen", this.openEnd);
    };
    this.handleOutsideClose = () => {
      if (this.disableOutsideClose) {
        return;
      }
      this.close();
    };
    /** Close the modal, first running the `beforeClose` method */
    this.close = () => {
      return this.beforeClose(this.el).then(() => {
        this.active = false;
        focusElement(this.previousActiveElement);
        this.removeOverflowHiddenClass();
      });
    };
    this.focusFirstElement = () => {
      focusElement(this.closeButtonEl);
    };
    this.focusLastElement = () => {
      const focusableElements = getFocusableElements(this.el).filter((el) => !el.getAttribute("data-focus-fence"));
      if (focusableElements.length > 0) {
        focusElement(focusableElements[focusableElements.length - 1]);
      }
      else {
        focusElement(this.closeButtonEl);
      }
    };
    this.updateFooterVisibility = () => {
      this.hasFooter = !!this.el.querySelector(`[slot=${SLOTS.back}], [slot=${SLOTS.secondary}], [slot=${SLOTS.primary}]`);
    };
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    // when modal initially renders, if active was set we need to open as watcher doesn't fire
    if (this.active) {
      this.open();
    }
  }
  connectedCallback() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
    this.updateFooterVisibility();
  }
  disconnectedCallback() {
    var _a;
    this.removeOverflowHiddenClass();
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  render() {
    const dir = getElementDir(this.el);
    return (h(Host, { "aria-describedby": this.contentId, "aria-labelledby": this.titleId, "aria-modal": "true", role: "dialog" }, h("calcite-scrim", { class: CSS.scrim, onClick: this.handleOutsideClose }), this.renderStyle(), h("div", { class: { modal: true, [CSS_UTILITY.rtl]: dir === "rtl" }, onTransitionEnd: this.transitionEnd }, h("div", { "data-focus-fence": true, onFocus: this.focusLastElement, tabindex: "0" }), h("div", { class: CSS.header }, this.renderCloseButton(), h("header", { class: CSS.title }, h("slot", { name: CSS.header }))), h("div", { class: {
        content: true,
        "content--spaced": !this.noPadding,
        "content--no-footer": !this.hasFooter
      }, ref: (el) => (this.modalContent = el) }, h("slot", { name: SLOTS.content })), this.renderFooter(), h("div", { "data-focus-fence": true, onFocus: this.focusFirstElement, tabindex: "0" }))));
  }
  renderFooter() {
    return this.hasFooter ? (h("div", { class: CSS.footer }, h("span", { class: CSS.back }, h("slot", { name: SLOTS.back })), h("span", { class: CSS.secondary }, h("slot", { name: SLOTS.secondary })), h("span", { class: CSS.primary }, h("slot", { name: SLOTS.primary })))) : null;
  }
  renderCloseButton() {
    return !this.disableCloseButton ? (h("button", { "aria-label": this.intlClose, class: CSS.close, onClick: this.close, ref: (el) => (this.closeButtonEl = el), title: this.intlClose }, h("calcite-icon", { icon: ICONS.close, scale: this.scale === "s" ? "s" : "l" }))) : null;
  }
  renderStyle() {
    const hasCustomWidth = !isNaN(parseInt(`${this.width}`));
    return hasCustomWidth ? (h("style", null, `
        .modal {
          max-width: ${this.width}px !important;
        }
        @media screen and (max-width: ${this.width}px) {
          .modal {
            height: 100% !important;
            max-height: 100% !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            border-radius: 0 !important;
          }
          .content {
            flex: 1 1 auto !important;
            max-height: unset !important;
          }
        }
      `)) : null;
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  handleEscape(e) {
    if (this.active && !this.disableEscape && getKey(e.key) === "Escape") {
      this.close();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Focus first interactive element
   * @deprecated use `setFocus` instead.
   */
  async focusElement(el) {
    if (el) {
      el.focus();
    }
    return this.setFocus();
  }
  /**
   * Sets focus on the component.
   *
   * By default, will try to focus on any focusable content. If there is none, it will focus on the close button.
   * If you want to focus on the close button, you can use the `close-button` focus ID.
   */
  async setFocus(focusId) {
    const closeButton = this.closeButtonEl;
    return focusElement(focusId === "close-button" ? closeButton : getFocusableElements(this.el)[0] || closeButton);
  }
  /** Set the scroll top of the modal content */
  async scrollContent(top = 0, left = 0) {
    if (this.modalContent) {
      if (this.modalContent.scrollTo) {
        this.modalContent.scrollTo({ top, left, behavior: "smooth" });
      }
      else {
        this.modalContent.scrollTop = top;
        this.modalContent.scrollLeft = left;
      }
    }
  }
  async toggleModal(value, oldValue) {
    if (value !== oldValue) {
      if (value) {
        this.open();
      }
      else if (!value) {
        this.close();
      }
    }
  }
  /** Open the modal */
  open() {
    this.previousActiveElement = document.activeElement;
    this.el.addEventListener("calciteModalOpen", this.openEnd);
    this.active = true;
    const titleEl = getSlotted(this.el, SLOTS.header);
    const contentEl = getSlotted(this.el, SLOTS.content);
    this.titleId = ensureId(titleEl);
    this.contentId = ensureId(contentEl);
    document.documentElement.classList.add(CSS.overflowHidden);
  }
  removeOverflowHiddenClass() {
    document.documentElement.classList.remove(CSS.overflowHidden);
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "active": ["toggleModal"]
  }; }
};
CalciteModal.style = calciteModalCss;

export { CalciteModal as calcite_modal };
