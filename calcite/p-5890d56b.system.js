System.register(["./p-3c9923f1.system.js","./p-a7a7301d.system.js","./p-d53c2d2e.system.js","./p-8a30b93d.system.js"],(function(t){"use strict";var e,n,r,o,i;return{setters:[function(t){e=t.f;n=t.h},function(t){r=t.g},function(t){o=t.S},function(t){i=t.S}],execute:function(){t("t",h);var c=2;var a=function(t){var e=t.height,n=t.actionHeight,r=t.groupCount;return Math.floor((e-r*c)/n)};var u=t("g",(function(t){var e=t.actionCount,n=t.actionHeight,r=t.height,o=t.groupCount;return Math.max(e-a({height:r,actionHeight:n,groupCount:o}),0)}));var l=t("q",(function(t){return Array.from(t.querySelectorAll("calcite-action")).filter((function(t){return t.closest("calcite-action-menu")?t.slot===o.trigger:true}))}));var f=t("o",(function(t){var n=t.actionGroups,r=t.expanded,o=t.overflowCount;var c=o;n.reverse().forEach((function(t){var n=0;var o=l(t).reverse();o.forEach((function(t){if(t.slot===i.menuActions){t.removeAttribute("slot");t.textEnabled=r}}));if(c>0){o.some((function(t){var e=o.filter((function(t){return!t.slot}));if(e.length>1&&o.length>2&&!t.closest("calcite-action-menu")){t.textEnabled=true;t.setAttribute("slot",i.menuActions);n++;if(n>1){c--}}return c<1}))}e(t)}))}));var s={chevronsLeft:"chevrons-left",chevronsRight:"chevrons-right"};function v(t,e){var n;return t||((n=e.closest("calcite-shell-panel"))===null||n===void 0?void 0:n.position)||"start"}function h(t){var e=t.parent,n=t.expanded;l(e).filter((function(t){return t.slot!=="menu-actions"})).forEach((function(t){return t.textEnabled=n}));e.querySelectorAll("calcite-action-group").forEach((function(t){return t.expanded=n}))}var d=function(t){var e=t.tooltip,n=t.referenceElement,r=t.expanded,o=t.ref;if(e){e.referenceElement=!r&&n}if(o){o(n)}return n};var p=t("C",(function(t){var e=t.expanded,o=t.intlExpand,i=t.intlCollapse,c=t.toggle,a=t.el,u=t.position,l=t.tooltip,f=t.ref,h=t.scale;var p=r(a)==="rtl";var g=e?i:o;var m=[s.chevronsLeft,s.chevronsRight];if(p){m.reverse()}var x=v(u,a)==="end";var E=x?m[1]:m[0];var y=x?m[0]:m[1];var C=n("calcite-action",{dir:p?"rtl":"ltr",icon:e?E:y,onClick:c,ref:function(t){return d({tooltip:l,referenceElement:t,expanded:e,ref:f})},scale:h,text:g,textEnabled:e});return l?n("calcite-tooltip-manager",null,C):C}))}}}));