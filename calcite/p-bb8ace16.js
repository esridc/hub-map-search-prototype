import{f as t,h as e}from"./p-263e9c6f.js";import{g as o}from"./p-c47fe2f9.js";import{S as n}from"./p-4fda49e6.js";import{S as a}from"./p-354fbadd.js";const i=({actionCount:t,actionHeight:e,height:o,groupCount:n})=>Math.max(t-(({height:t,actionHeight:e,groupCount:o})=>Math.floor((t-2*o)/e))({height:o,actionHeight:e,groupCount:n}),0),c=t=>Array.from(t.querySelectorAll("calcite-action")).filter((t=>!t.closest("calcite-action-menu")||t.slot===n.trigger)),r=({actionGroups:e,expanded:o,overflowCount:n})=>{let i=n;e.reverse().forEach((e=>{let n=0;const r=c(e).reverse();r.forEach((t=>{t.slot===a.menuActions&&(t.removeAttribute("slot"),t.textEnabled=o)})),i>0&&r.some((t=>(r.filter((t=>!t.slot)).length>1&&r.length>2&&!t.closest("calcite-action-menu")&&(t.textEnabled=!0,t.setAttribute("slot",a.menuActions),n++,n>1&&i--),i<1))),t(e)}))};function l({parent:t,expanded:e}){c(t).filter((t=>"menu-actions"!==t.slot)).forEach((t=>t.textEnabled=e)),t.querySelectorAll("calcite-action-group").forEach((t=>t.expanded=e))}const s=({expanded:t,intlExpand:n,intlCollapse:a,toggle:i,el:c,position:r,tooltip:l,ref:s,scale:p})=>{const f="rtl"===o(c),d=t?a:n,u=["chevrons-left","chevrons-right"];f&&u.reverse();const g="end"===function(t,e){var o;return t||(null===(o=e.closest("calcite-shell-panel"))||void 0===o?void 0:o.position)||"start"}(r,c),h=e("calcite-action",{dir:f?"rtl":"ltr",icon:t?g?u[1]:u[0]:g?u[0]:u[1],onClick:i,ref:e=>(({tooltip:t,referenceElement:e,expanded:o,ref:n})=>(t&&(t.referenceElement=!o&&e),n&&n(e),e))({tooltip:l,referenceElement:e,expanded:t,ref:s}),scale:p,text:d,textEnabled:t});return l?e("calcite-tooltip-manager",null,h):h};export{s as C,i as g,r as o,c as q,l as t}