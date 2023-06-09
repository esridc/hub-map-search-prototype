import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { T as TreeSelectionMode } from './interfaces-f2da78c0.js';
import { b as getSlotted, a as getElementDir, C as CSS_UTILITY, k as filterDirectChildren, n as nodeListToArray } from './dom-35210035.js';
import { g as getKey } from './key-4c5a210a.js';
import './guid-9ad8042d.js';

const CSS = {
  checkboxLabel: "checkbox-label",
  checkbox: "checkbox",
  chevron: "chevron",
  nodeContainer: "node-container",
  childrenContainer: "children-container",
  bulletPointIcon: "bullet-point",
  checkmarkIcon: "checkmark"
};
const SLOTS = {
  children: "children"
};
const ICONS = {
  bulletPoint: "bullet-point",
  checkmark: "check",
  chevronRight: "chevron-right"
};

const calciteTreeItemCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{--calcite-tree-indicator:var(--calcite-ui-border-1);--calcite-tree-indicator-active:var(--calcite-ui-brand);--calcite-tree-text:var(--calcite-ui-text-3);--calcite-tree-text-active:var(--calcite-ui-text-1);display:block;cursor:pointer;outline:2px solid transparent;outline-offset:2px;max-width:100%;color:var(--calcite-tree-text)}:host([scale=s]){font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-tree-padding-y:0.25rem}:host([scale=s]) .node-container .checkbox{-webkit-margin-start:1.5rem;margin-inline-start:1.5rem}:host([scale=m]){font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-tree-padding-y:0.5rem}:host([scale=m]) .node-container .checkbox{-webkit-margin-start:2rem;margin-inline-start:2rem}:host([scale=l]){font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-tree-padding-y:0.75rem}:host([scale=l]) .node-container .checkbox{-webkit-margin-start:2.5rem;margin-inline-start:2.5rem}:host([lines]){--calcite-tree-line:var(--calcite-ui-border-2);--calcite-tree-line-hover:var(--calcite-ui-border-1)}:host(:not([lines])) .node-container:after{display:none}::slotted(*){word-wrap:break-word;overflow-wrap:break-word;min-width:0;max-width:100%;color:inherit;text-decoration:none !important}::slotted(*):hover{text-decoration:none !important}::slotted(a){width:100%;text-decoration:none}:host{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus){outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.checkbox{outline:2px solid transparent;outline-offset:2px;line-height:0}.checkbox-label{display:flex;align-items:center;pointer-events:none}.children-container{position:relative;overflow:hidden;height:0;-webkit-margin-start:1.25rem;margin-inline-start:1.25rem;-webkit-margin-end:1.25rem;margin-inline-end:1.25rem;transform:scaleY(0);opacity:0;transition:0.15s cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity 0.15s cubic-bezier(0.215, 0.44, 0.42, 0.88), all 0.15s ease-in-out;transform-origin:top}.children-container:after{transition-property:all;transition-duration:150ms;transition-timing-function:ease-in-out;transition-delay:0s;transition-property:background-color, border-color, color, fill, stroke;top:0;position:absolute;width:1px;height:96%;content:\"\";background-color:var(--calcite-tree-line);z-index:-1}:host([expanded])>.children-container{transform:scaleY(1);opacity:1;height:auto}.node-container{display:flex;align-items:center;position:relative;padding:var(--calcite-tree-padding-y) 0}.node-container .checkmark,.node-container .bullet-point{-webkit-margin-start:var(--calcite-tree-padding-y);margin-inline-start:var(--calcite-tree-padding-y);-webkit-margin-end:var(--calcite-tree-padding-y);margin-inline-end:var(--calcite-tree-padding-y)}.node-container .checkbox{-webkit-margin-end:var(--calcite-tree-padding-y);margin-inline-end:var(--calcite-tree-padding-y)}.node-container .checkmark,.node-container .bullet-point{transition-property:all;transition-duration:150ms;transition-timing-function:ease-in-out;transition-delay:0s;opacity:0;color:var(--calcite-tree-indicator)}.node-container:hover ::slotted(*),:host([selected]) .node-container:hover ::slotted(*),:host(:focus) .node-container ::slotted(*){color:var(--calcite-tree-text-hover)}.node-container:hover .checkmark,.node-container:hover .bullet-point,:host([selected]) .node-container:hover .checkmark,:host([selected]) .node-container:hover .bullet-point,:host(:focus) .node-container .checkmark,:host(:focus) .node-container .bullet-point{opacity:1}:host([selected])>.node-container,:host([selected])>.node-container:hover{color:var(--calcite-tree-text-active);font-weight:var(--calcite-font-weight-medium)}:host([selected])>.node-container .bullet-point,:host([selected])>.node-container .checkmark,:host([selected])>.node-container:hover .bullet-point,:host([selected])>.node-container:hover .checkmark{opacity:1;color:var(--calcite-ui-brand)}:host(:not([has-children]))[scale=s]>.node-container[data-selection-mode=ancestors] .checkbox{-webkit-padding-start:1.25rem;padding-inline-start:1.25rem}:host(:not([has-children]))[scale=m]>.node-container[data-selection-mode=ancestors] .checkbox{-webkit-padding-start:1.5rem;padding-inline-start:1.5rem}:host(:not([has-children]))[scale=l]>.node-container[data-selection-mode=ancestors] .checkbox{-webkit-padding-start:1.75rem;padding-inline-start:1.75rem}:host([has-children])>.node-container[data-selection-mode=ancestors] .checkbox{-webkit-margin-start:0;margin-inline-start:0}:host([has-children])>.node-container .bullet-point,:host([has-children])>.node-container .checkmark{display:none}:host([has-children][expanded]:not([selected]))>.node-container ::slotted(*){font-weight:var(--calcite-font-weight-medium);color:var(--calcite-tree-text-active)}:host([has-children][selected])>.node-container[data-selection-mode=children],:host([has-children][selected])>.node-container[data-selection-mode=multi-children]{color:var(--calcite-tree-indicator-active)}.chevron{transition-property:all;transition-duration:150ms;transition-timing-function:ease-in-out;transition-delay:0s;position:relative;align-self:center;flex:0 0 auto;-webkit-margin-start:var(--calcite-tree-padding-y);margin-inline-start:var(--calcite-tree-padding-y);-webkit-margin-end:var(--calcite-tree-padding-y);margin-inline-end:var(--calcite-tree-padding-y);transform:rotate(0deg);color:var(--calcite-tree-text)}.calcite--rtl .chevron{transform:rotate(180deg)}:host([expanded])>.node-container>.chevron{transform:rotate(90deg)}:host([scale=s])>.node-container .checkbox{-webkit-margin-end:0.5rem;margin-inline-end:0.5rem}:host([scale=m])>.node-container .checkbox{-webkit-margin-end:0.75rem;margin-inline-end:0.75rem}:host([scale=l])>.node-container .checkbox{-webkit-margin-end:1rem;margin-inline-end:1rem}:host([selected]) .checkmark,:host([selected]) .bullet-point{color:var(--calcite-tree-indicator-active)}";

const CalciteTreeItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteTreeItemSelect = createEvent(this, "calciteTreeItemSelect", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** Is the item currently selected */
    this.selected = false;
    /** True if the item is in an expanded state */
    this.expanded = false;
    /** @internal Is the parent of this item expanded? */
    this.parentExpanded = false;
    /** @internal What level of depth is this item at? */
    this.depth = -1;
    /** @internal Does this tree item have a tree inside it? */
    this.hasChildren = null;
    this.iconClickHandler = (event) => {
      event.stopPropagation();
      this.expanded = !this.expanded;
      if (this.selectionMode !== TreeSelectionMode.Ancestors) {
        this.calciteTreeItemSelect.emit({
          modifyCurrentSelection: event.shiftKey,
          forceToggle: true
        });
      }
    };
    this.childrenClickHandler = (event) => event.stopPropagation();
  }
  expandedHandler(newValue) {
    const items = getSlotted(this.el, "children", {
      all: true,
      selector: "calcite-tree-item"
    });
    items.forEach((item) => (item.parentExpanded = newValue));
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.expandedHandler(this.expanded);
  }
  componentWillRender() {
    this.hasChildren = !!this.el.querySelector("calcite-tree");
    this.depth = 0;
    let parentTree = this.el.closest("calcite-tree");
    if (!parentTree) {
      return;
    }
    this.selectionMode = parentTree.selectionMode;
    this.scale = parentTree.scale || "m";
    this.lines = parentTree.lines;
    let nextParentTree;
    while (parentTree) {
      nextParentTree = parentTree.parentElement.closest("calcite-tree");
      if (nextParentTree === parentTree) {
        break;
      }
      else {
        parentTree = nextParentTree;
        this.depth = this.depth + 1;
      }
    }
  }
  render() {
    const rtl = getElementDir(this.el) === "rtl";
    const showBulletPoint = this.selectionMode === TreeSelectionMode.Single ||
      this.selectionMode === TreeSelectionMode.Children;
    const showCheckmark = this.selectionMode === TreeSelectionMode.Multi ||
      this.selectionMode === TreeSelectionMode.MultiChildren;
    const chevron = this.hasChildren ? (h("calcite-icon", { class: {
        [CSS.chevron]: true,
        [CSS_UTILITY.rtl]: rtl
      }, "data-test-id": "icon", icon: ICONS.chevronRight, onClick: this.iconClickHandler, scale: "s" })) : null;
    const checkbox = this.selectionMode === TreeSelectionMode.Ancestors ? (h("label", { class: CSS.checkboxLabel }, h("calcite-checkbox", { checked: this.selected, class: CSS.checkbox, "data-test-id": "checkbox", indeterminate: this.hasChildren && this.indeterminate, scale: this.scale, tabIndex: -1 }), h("slot", null))) : null;
    const selectedIcon = showBulletPoint
      ? ICONS.bulletPoint
      : showCheckmark
        ? ICONS.checkmark
        : null;
    const bulletOrCheckIcon = selectedIcon ? (h("calcite-icon", { class: {
        [CSS.bulletPointIcon]: selectedIcon === ICONS.bulletPoint,
        [CSS.checkmarkIcon]: selectedIcon === ICONS.checkmark,
        [CSS_UTILITY.rtl]: rtl
      }, icon: selectedIcon, scale: "s" })) : null;
    const hidden = !(this.parentExpanded || this.depth === 1);
    return (h(Host, { "aria-expanded": this.hasChildren ? this.expanded.toString() : undefined, "aria-hidden": hidden.toString(), "aria-selected": this.selected ? "true" : showCheckmark ? "false" : undefined, "calcite-hydrated-hidden": hidden, role: "treeitem", tabindex: this.parentExpanded || this.depth === 1 ? "0" : "-1" }, h("div", { class: {
        [CSS.nodeContainer]: true,
        [CSS_UTILITY.rtl]: rtl
      }, "data-selection-mode": this.selectionMode, ref: (el) => (this.defaultSlotWrapper = el) }, chevron, bulletOrCheckIcon, checkbox ? checkbox : h("slot", null)), h("div", { class: {
        [CSS.childrenContainer]: true,
        [CSS_UTILITY.rtl]: rtl
      }, "data-test-id": "calcite-tree-children", onClick: this.childrenClickHandler, ref: (el) => (this.childrenSlotWrapper = el), role: this.hasChildren ? "group" : undefined }, h("slot", { name: SLOTS.children }))));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  onClick(e) {
    // Solve for if the item is clicked somewhere outside the slotted anchor.
    // Anchor is triggered anywhere you click
    const [link] = filterDirectChildren(this.el, "a");
    if (link && e.composedPath()[0].tagName.toLowerCase() !== "a") {
      const target = link.target === "" ? "_self" : link.target;
      window.open(link.href, target);
    }
    this.expanded = !this.expanded;
    this.calciteTreeItemSelect.emit({
      modifyCurrentSelection: e.shiftKey || this.selectionMode === TreeSelectionMode.Ancestors,
      forceToggle: false
    });
  }
  keyDownHandler(e) {
    let root;
    switch (getKey(e.key)) {
      case " ":
        this.calciteTreeItemSelect.emit({
          modifyCurrentSelection: e.shiftKey,
          forceToggle: false
        });
        e.preventDefault();
        e.stopPropagation();
        break;
      case "Enter":
        // activates a node, i.e., performs its default action. For parent nodes, one possible default action is to open or close the node. In single-select trees where selection does not follow focus (see note below), the default action is typically to select the focused node.
        const link = nodeListToArray(this.el.children).find((e) => e.matches("a"));
        if (link) {
          link.click();
          this.selected = true;
        }
        else {
          this.calciteTreeItemSelect.emit({
            modifyCurrentSelection: e.shiftKey,
            forceToggle: false
          });
        }
        e.preventDefault();
        e.stopPropagation();
        break;
      case "ArrowLeft":
        // When focus is on an open node, closes the node.
        if (this.hasChildren && this.expanded) {
          this.expanded = false;
          e.preventDefault();
          e.stopPropagation();
          break;
        }
        // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
        const parentItem = this.el.parentElement.closest("calcite-tree-item");
        if (parentItem && (!this.hasChildren || this.expanded === false)) {
          parentItem.focus();
          e.preventDefault();
          e.stopPropagation();
          break;
        }
        // When focus is on a root node that is also either an end node or a closed node, does nothing.
        break;
      case "ArrowRight":
        // When focus is on a closed node, opens the node; focus does not move.
        if (this.hasChildren && this.expanded === false) {
          this.expanded = true;
          e.preventDefault();
          e.stopPropagation();
          break;
        }
        // When focus is on a open node, moves focus to the first child node.
        if (this.hasChildren && this.expanded) {
          this.el.querySelector("calcite-tree-item").focus();
          break;
        }
        // When focus is on an end node, does nothing.
        break;
      case "ArrowUp":
        const previous = this.el.previousElementSibling;
        if (previous && previous.matches("calcite-tree-item")) {
          previous.focus();
        }
        break;
      case "ArrowDown":
        const next = this.el.nextElementSibling;
        if (next && next.matches("calcite-tree-item")) {
          next.focus();
        }
        break;
      case "Home":
        root = this.el.closest("calcite-tree:not([child])");
        const firstNode = root.querySelector("calcite-tree-item");
        firstNode.focus();
        break;
      case "End":
        root = this.el.closest("calcite-tree:not([child])");
        let currentNode = root.children[root.children.length - 1]; // last child
        let currentTree = nodeListToArray(currentNode.children).find((e) => e.matches("calcite-tree"));
        while (currentTree) {
          currentNode = currentTree.children[root.children.length - 1];
          currentTree = nodeListToArray(currentNode.children).find((e) => e.matches("calcite-tree"));
        }
        currentNode.focus();
        break;
    }
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "expanded": ["expandedHandler"]
  }; }
};
CalciteTreeItem.style = calciteTreeItemCss;

export { CalciteTreeItem as calcite_tree_item };
