import { j as forceUpdate, h } from './index-d836c4a8.js';
import { a as getElementDir } from './dom-35210035.js';
import { S as SLOTS } from './resources-a467bc91.js';
import { S as SLOTS$1 } from './resources-9f52028e.js';

const groupBufferHeight = 2;
const getMaxActionCount = ({ height, actionHeight, groupCount }) => {
  return Math.floor((height - groupCount * groupBufferHeight) / actionHeight);
};
const getOverflowCount = ({ actionCount, actionHeight, height, groupCount }) => {
  return Math.max(actionCount - getMaxActionCount({ height, actionHeight, groupCount }), 0);
};
const queryActions = (el) => {
  return Array.from(el.querySelectorAll("calcite-action")).filter((action) => action.closest("calcite-action-menu") ? action.slot === SLOTS.trigger : true);
};
const overflowActions = ({ actionGroups, expanded, overflowCount }) => {
  let needToSlotCount = overflowCount;
  actionGroups.reverse().forEach((group) => {
    let slottedWithinGroupCount = 0;
    const groupActions = queryActions(group).reverse();
    groupActions.forEach((groupAction) => {
      if (groupAction.slot === SLOTS$1.menuActions) {
        groupAction.removeAttribute("slot");
        groupAction.textEnabled = expanded;
      }
    });
    if (needToSlotCount > 0) {
      groupActions.some((groupAction) => {
        const unslottedActions = groupActions.filter((action) => !action.slot);
        if (unslottedActions.length > 1 && groupActions.length > 2 && !groupAction.closest("calcite-action-menu")) {
          groupAction.textEnabled = true;
          groupAction.setAttribute("slot", SLOTS$1.menuActions);
          slottedWithinGroupCount++;
          if (slottedWithinGroupCount > 1) {
            needToSlotCount--;
          }
        }
        return needToSlotCount < 1;
      });
    }
    forceUpdate(group);
  });
};

const ICONS = {
  chevronsLeft: "chevrons-left",
  chevronsRight: "chevrons-right"
};
function getCalcitePosition(position, el) {
  var _a;
  return position || ((_a = el.closest("calcite-shell-panel")) === null || _a === void 0 ? void 0 : _a.position) || "start";
}
function toggleChildActionText({ parent, expanded }) {
  queryActions(parent)
    .filter((el) => el.slot !== "menu-actions")
    .forEach((action) => (action.textEnabled = expanded));
  parent.querySelectorAll("calcite-action-group").forEach((group) => (group.expanded = expanded));
}
const setTooltipReference = ({ tooltip, referenceElement, expanded, ref }) => {
  if (tooltip) {
    tooltip.referenceElement = !expanded && referenceElement;
  }
  if (ref) {
    ref(referenceElement);
  }
  return referenceElement;
};
const CalciteExpandToggle = ({ expanded, intlExpand, intlCollapse, toggle, el, position, tooltip, ref, scale }) => {
  const rtl = getElementDir(el) === "rtl";
  const expandText = expanded ? intlCollapse : intlExpand;
  const icons = [ICONS.chevronsLeft, ICONS.chevronsRight];
  if (rtl) {
    icons.reverse();
  }
  const end = getCalcitePosition(position, el) === "end";
  const expandIcon = end ? icons[1] : icons[0];
  const collapseIcon = end ? icons[0] : icons[1];
  const actionNode = (h("calcite-action", { dir: rtl ? "rtl" : "ltr", icon: expanded ? expandIcon : collapseIcon, onClick: toggle, ref: (referenceElement) => setTooltipReference({ tooltip, referenceElement, expanded, ref }), scale: scale, text: expandText, textEnabled: expanded }));
  return tooltip ? h("calcite-tooltip-manager", null, actionNode) : actionNode;
};

export { CalciteExpandToggle as C, getOverflowCount as g, overflowActions as o, queryActions as q, toggleChildActionText as t };
