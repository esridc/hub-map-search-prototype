import { r as registerInstance, e as createEvent, h, f as Host, g as getElement } from './index-d836c4a8.js';
import { f as focusElement, n as nodeListToArray } from './dom-35210035.js';
import { T as TreeSelectionMode } from './interfaces-f2da78c0.js';
import './guid-9ad8042d.js';

const calciteTreeCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;outline:2px solid transparent;outline-offset:2px}";

const CalciteTree = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteTreeSelect = createEvent(this, "calciteTreeSelect", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** Display indentation guide lines */
    this.lines = false;
    /** Display input
     * @deprecated use "ancestors" selection-mode for checkbox input
     */
    this.inputEnabled = false;
    /** Specify the scale of the tree, defaults to m */
    this.scale = "m";
    /** Customize how tree selection works (single, multi, children, multi-children, ancestors)
     * @default "single"
     * @see [TreeSelectionMode](https://github.com/Esri/calcite-components/blob/master/src/components/calcite-tree/interfaces.ts#L5)
     */
    this.selectionMode = TreeSelectionMode.Single;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillRender() {
    const parent = this.el.parentElement.closest("calcite-tree");
    this.lines = parent ? parent.lines : this.lines;
    this.scale = parent ? parent.scale : this.scale;
    this.selectionMode = parent ? parent.selectionMode : this.selectionMode;
    this.child = !!parent;
  }
  render() {
    return (h(Host, { "aria-multiselectable": (this.selectionMode === TreeSelectionMode.Multi ||
        this.selectionMode === TreeSelectionMode.MultiChildren).toString(), role: !this.child ? "tree" : undefined, tabIndex: this.getRootTabIndex() }, h("slot", null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  onFocus() {
    if (!this.child) {
      const focusTarget = this.el.querySelector("calcite-tree-item[selected]") ||
        this.el.querySelector("calcite-tree-item");
      focusElement(focusTarget);
    }
  }
  onFocusIn(event) {
    const focusedFromRootOrOutsideTree = event.relatedTarget === this.el || !this.el.contains(event.relatedTarget);
    if (focusedFromRootOrOutsideTree) {
      this.el.tabIndex = -1;
    }
  }
  onFocusOut(event) {
    const willFocusOutsideTree = !this.el.contains(event.relatedTarget);
    if (willFocusOutsideTree) {
      this.el.tabIndex = this.getRootTabIndex();
    }
  }
  onClick(e) {
    const target = e.target;
    const childItems = nodeListToArray(target.querySelectorAll("calcite-tree-item"));
    if (this.child) {
      return;
    }
    if (!this.child) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (this.selectionMode === TreeSelectionMode.Ancestors && !this.child) {
      this.updateAncestorTree(e);
      return;
    }
    const shouldSelect = this.selectionMode !== null &&
      (!target.hasChildren ||
        (target.hasChildren &&
          (this.selectionMode === TreeSelectionMode.Children ||
            this.selectionMode === TreeSelectionMode.MultiChildren)));
    const shouldModifyToCurrentSelection = e.detail.modifyCurrentSelection &&
      (this.selectionMode === TreeSelectionMode.Multi ||
        this.selectionMode === TreeSelectionMode.MultiChildren);
    const shouldSelectChildren = this.selectionMode === TreeSelectionMode.MultiChildren ||
      this.selectionMode === TreeSelectionMode.Children;
    const shouldClearCurrentSelection = !shouldModifyToCurrentSelection &&
      (((this.selectionMode === TreeSelectionMode.Single ||
        this.selectionMode === TreeSelectionMode.Multi) &&
        childItems.length <= 0) ||
        this.selectionMode === TreeSelectionMode.Children ||
        this.selectionMode === TreeSelectionMode.MultiChildren);
    const shouldExpandTarget = this.selectionMode === TreeSelectionMode.Children ||
      this.selectionMode === TreeSelectionMode.MultiChildren;
    if (!this.child) {
      const targetItems = [];
      if (shouldSelect) {
        targetItems.push(target);
      }
      if (shouldSelectChildren) {
        childItems.forEach((treeItem) => {
          targetItems.push(treeItem);
        });
      }
      if (shouldClearCurrentSelection) {
        const selectedItems = nodeListToArray(this.el.querySelectorAll("calcite-tree-item[selected]"));
        selectedItems.forEach((treeItem) => {
          if (!targetItems.includes(treeItem)) {
            treeItem.selected = false;
          }
        });
      }
      if (shouldExpandTarget && !e.detail.forceToggle) {
        target.expanded = true;
      }
      if (shouldModifyToCurrentSelection) {
        window.getSelection().removeAllRanges();
      }
      if ((shouldModifyToCurrentSelection && target.selected) ||
        (shouldSelectChildren && e.detail.forceToggle)) {
        targetItems.forEach((treeItem) => {
          treeItem.selected = false;
        });
      }
      else {
        targetItems.forEach((treeItem) => {
          treeItem.selected = true;
        });
      }
    }
    this.calciteTreeSelect.emit({
      selected: nodeListToArray(this.el.querySelectorAll("calcite-tree-item")).filter((i) => i.selected)
    });
  }
  updateAncestorTree(e) {
    const item = e.target;
    const children = item.querySelectorAll("calcite-tree-item");
    const ancestors = [];
    let parent = item.parentElement.closest("calcite-tree-item");
    while (parent) {
      ancestors.push(parent);
      parent = parent.parentElement.closest("calcite-tree-item");
    }
    item.selected = !item.selected;
    item.indeterminate = false;
    if (children === null || children === void 0 ? void 0 : children.length) {
      children.forEach((el) => {
        el.selected = item.selected;
        el.indeterminate = false;
      });
    }
    if (ancestors) {
      ancestors.forEach((ancestor) => {
        const descendants = nodeListToArray(ancestor.querySelectorAll("calcite-tree-item"));
        const activeDescendants = descendants.filter((el) => el.selected);
        if (activeDescendants.length === 0) {
          ancestor.selected = false;
          ancestor.indeterminate = false;
          return;
        }
        const indeterminate = activeDescendants.length < descendants.length;
        ancestor.indeterminate = indeterminate;
        ancestor.selected = !indeterminate;
      });
    }
    this.calciteTreeSelect.emit({
      selected: nodeListToArray(this.el.querySelectorAll("calcite-tree-item")).filter((i) => i.selected)
    });
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  getRootTabIndex() {
    return !this.child ? 0 : -1;
  }
  get el() { return getElement(this); }
};
CalciteTree.style = calciteTreeCss;

export { CalciteTree as calcite_tree };
