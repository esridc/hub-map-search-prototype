import{f as t,a as i,g as s}from"./p-c47fe2f9.js";import{g as e}from"./p-0ae16e31.js";import{d as n}from"./p-58421494.js";import{h as a,H as o}from"./p-263e9c6f.js";function c(){this.setUpItems(),this.setUpFilter()}const r=["ArrowUp","ArrowDown"];function l(){this.setUpItems(),this.setUpFilter(),this.emitCalciteListChange=n(v.bind(this),0)}function h(){var t;null===(t=this.mutationObserver)||void 0===t||t.observe(this.el,{childList:!0,subtree:!0})}function u(){var t;null===(t=this.mutationObserver)||void 0===t||t.disconnect()}function f(i){const{selectedValues:s}=this,{item:e,value:n,selected:a,shiftPressed:o}=i.detail;a?(this.multiple&&o&&this.selectSiblings(e),this.multiple||this.deselectSiblingItems(e),s.set(n,e)):(s.delete(n),this.multiple&&o&&this.selectSiblings(e,!0)),this.multiple||(g(e,a),a&&t(e)),this.lastSelectedItem=e,this.emitCalciteListChange()}function d(t){t.stopPropagation();const i=t.detail.oldValue,s=this.selectedValues;if(s.has(i)){const e=s.get(i);s.delete(i),s.set(t.detail.newValue,e)}}function m(t){const{el:i,items:s,multiple:e,selectedValues:n}=this;e||(i.contains(t.relatedTarget)?g(t.target,!1):s.forEach((i=>g(i,0===n.size?t.target===i:i.selected))))}function p(i){const{key:s,target:n}=i;if(!function(t){return!!r.find((i=>i===t))}(s))return;const{items:a,multiple:o,selectionFollowsFocus:c}=this,{length:l}=a,h=a.indexOf(n);if(!l||-1===h)return;i.preventDefault();const u=a[e(h+("ArrowUp"===s?-1:1),l)];a.forEach((t=>g(t,t===u))),!o&&c&&(u.selected=!0),t(u)}function v(){this.calciteListChange.emit(this.selectedValues)}function b(t){if(t.defaultPrevented)return;const i=t.target,s=this.selectedValues;"CALCITE-PICK-LIST-GROUP"===i.parentElement.tagName?(i.parentElement.remove(),Array.from(i.parentElement.children).forEach((t=>s.delete(t.value)))):(i.remove(),s.delete(i.value)),this.emitCalciteListChange()}function g(t,i){i?t.removeAttribute("tabindex"):t.setAttribute("tabindex","-1")}async function j(i){if(this.filterEnabled&&"filter"===i)return void await t(this.filterEl);const{items:s,multiple:e,selectionFollowsFocus:n}=this;if(0===s.length)return;if(e)return s[0].setFocus();const a=s.find((t=>t.selected))||s[0];return n&&(a.selected=!0),a.setFocus()}function F(t){this.items=Array.from(this.el.querySelectorAll(t));let i=!1;const{items:s}=this;s.forEach((t=>{t.icon=this.getIconType(),this.multiple||(t.disableDeselect=!0,g(t,!1)),t.selected&&(i=!0,g(t,!0),this.selectedValues.set(t.value,t))}));const[e]=s;!i&&e&&g(e,!0)}function w(t){this.items.forEach((i=>{i.value!==t.value&&(i.toggleSelected(!1),this.selectedValues.has(i.value)&&this.selectedValues.delete(i.value))}))}function y(t,i=!1){if(!this.lastSelectedItem)return;const{items:s}=this,e=s.findIndex((t=>t.value===this.lastSelectedItem.value)),n=s.findIndex((i=>i.value===t.value));s.slice(Math.min(e,n),Math.max(e,n)).forEach((t=>{t.toggleSelected(!i),i?this.selectedValues.delete(t.value):this.selectedValues.set(t.value,t)}))}let A;function C(t){const s=t.detail.map((t=>t.value));let e=!1;A||(A=new Set);const n=this.items.filter((t=>{const i=t.parentElement;i.matches("calcite-pick-list-group")&&A.add(i);const n=s.includes(t.value);return t.hidden=!n,e||(e=n&&t.selected),n}));A.forEach((t=>{const s=n.some((i=>t.contains(i)));if(t.hidden=!s,!s)return;const e=i(t,"parent-item");e&&(e.hidden=!1,n.includes(e)&&Array.from(t.children).forEach((t=>t.hidden=!1)))})),A.clear(),n.length>0&&!e&&!this.multiple&&g(n[0],!0)}function k(){return this.items.map((t=>({label:t.label,description:t.description,metadata:t.metadata,value:t.value})))}var x;!function(t){t.circle="circle",t.square="square",t.grip="grip"}(x||(x={}));const O=t=>{var{props:{disabled:i,loading:e,filterEnabled:n,dataForFilter:c,handleFilter:r,filterPlaceholder:l,el:h,setFilterEl:u}}=t,f=function(t,i){var s={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&i.indexOf(e)<0&&(s[e]=t[e]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(e=Object.getOwnPropertySymbols(t);n<e.length;n++)i.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(t,e[n])&&(s[e[n]]=t[e[n]])}return s}(t,["props"]);const d=a("slot",null);return a(o,Object.assign({"aria-busy":e.toString(),"aria-disabled":i.toString(),role:"menu"},f),a("section",null,a("header",{class:{sticky:!0}},n?a("calcite-filter",{"aria-label":l,data:c,dir:s(h),disabled:e||i,onCalciteFilterChange:r,placeholder:l,ref:u}):null,a("slot",{name:"menu-actions"})),e||i?a("calcite-scrim",{loading:e}):null,d))},E={actions:"actions",actionsEnd:"actions--end",actionsStart:"actions--start",description:"description",handle:"handle",handleActivated:"handle--activated",highlight:"highlight",icon:"icon",iconDot:"icon-dot",label:"label",remove:"remove",title:"title",textContainer:"text-container"},S={checked:"check",remove:"x"},I={actionsEnd:"actions-end",actionsStart:"actions-start"},L={remove:"Remove"};export{E as C,x as I,O as L,I as S,L as T,h as a,f as b,u as c,w as d,d as e,F as f,k as g,C as h,l as i,j,p as k,m as l,c as m,S as n,b as r,y as s}