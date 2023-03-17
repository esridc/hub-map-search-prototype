var __awaiter=this&&this.__awaiter||function(e,t,i,n){function r(e){return e instanceof i?e:new i((function(t){t(e)}))}return new(i||(i=Promise))((function(i,a){function l(e){try{c(n.next(e))}catch(e){a(e)}}function s(e){try{c(n["throw"](e))}catch(e){a(e)}}function c(e){e.done?i(e.value):r(e.value).then(l,s)}c((n=n.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var i={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},n,r,a,l;return l={next:s(0),throw:s(1),return:s(2)},typeof Symbol==="function"&&(l[Symbol.iterator]=function(){return this}),l;function s(e){return function(t){return c([e,t])}}function c(l){if(n)throw new TypeError("Generator is already executing.");while(i)try{if(n=1,r&&(a=l[0]&2?r["return"]:l[0]?r["throw"]||((a=r["return"])&&a.call(r),0):r.next)&&!(a=a.call(r,l[1])).done)return a;if(r=0,a)l=[l[0]&2,a.value];switch(l[0]){case 0:case 1:a=l;break;case 4:i.label++;return{value:l[1],done:false};case 5:i.label++;r=l[1];l=[0];continue;case 7:l=i.ops.pop();i.trys.pop();continue;default:if(!(a=i.trys,a=a.length>0&&a[a.length-1])&&(l[0]===6||l[0]===2)){i=0;continue}if(l[0]===3&&(!a||l[1]>a[0]&&l[1]<a[3])){i.label=l[1];break}if(l[0]===6&&i.label<a[1]){i.label=a[1];a=l;break}if(a&&i.label<a[2]){i.label=a[2];i.ops.push(l);break}if(a[2])i.ops.pop();i.trys.pop();continue}l=t.call(e,i)}catch(e){l=[6,e];r=0}finally{n=a=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:true}}};System.register(["./p-a7a7301d.system.js","./p-482ec054.system.js","./p-53caa311.system.js","./p-3c9923f1.system.js"],(function(e){"use strict";var t,i,n,r,a,l,s;return{setters:[function(e){t=e.f;i=e.a;n=e.g},function(e){r=e.g},function(e){a=e.d},function(e){l=e.h;s=e.H}],execute:function(){e({I:void 0,a:f,b:h,c:d,d:x,e:v,f:S,g:_,h:O,i:u,j:E,k:g,l:p,m:c,r:y,s:I});function c(){this.setUpItems();this.setUpFilter()}var o=["ArrowUp","ArrowDown"];function u(){this.setUpItems();this.setUpFilter();this.emitCalciteListChange=a(b.bind(this),0)}function f(){var e;(e=this.mutationObserver)===null||e===void 0?void 0:e.observe(this.el,{childList:true,subtree:true})}function d(){var e;(e=this.mutationObserver)===null||e===void 0?void 0:e.disconnect()}function h(e){var i=this.selectedValues;var n=e.detail,r=n.item,a=n.value,l=n.selected,s=n.shiftPressed;if(l){if(this.multiple&&s){this.selectSiblings(r)}if(!this.multiple){this.deselectSiblingItems(r)}i.set(a,r)}else{i.delete(a);if(this.multiple&&s){this.selectSiblings(r,true)}}if(!this.multiple){w(r,l);if(l){t(r)}}this.lastSelectedItem=r;this.emitCalciteListChange()}function v(e){e.stopPropagation();var t=e.detail.oldValue;var i=this.selectedValues;if(i.has(t)){var n=i.get(t);i.delete(t);i.set(e.detail.newValue,n)}}function m(e){return!!o.find((function(t){return t===e}))}function p(e){var t=this,i=t.el,n=t.items,r=t.multiple,a=t.selectedValues;if(r){return}var l=!!i.contains(e.relatedTarget);if(l){w(e.target,false);return}n.forEach((function(t){return w(t,a.size===0?e.target===t:t.selected)}))}function g(e){var i=e.key,n=e.target;if(!m(i)){return}var a=this,l=a.items,s=a.multiple,c=a.selectionFollowsFocus;var o=l.length;var u=l.indexOf(n);if(!o||u===-1){return}e.preventDefault();var f=r(u+(i==="ArrowUp"?-1:1),o);var d=l[f];l.forEach((function(e){return w(e,e===d)}));if(!s&&c){d.selected=true}t(d)}function b(){this.calciteListChange.emit(this.selectedValues)}function y(e){if(e.defaultPrevented){return}var t=e.target;var i=this.selectedValues;if(t.parentElement.tagName==="CALCITE-PICK-LIST-GROUP"){t.parentElement.remove();Array.from(t.parentElement.children).forEach((function(e){return i.delete(e.value)}))}else{t.remove();i.delete(t.value)}this.emitCalciteListChange()}function w(e,t){if(t){e.removeAttribute("tabindex")}else{e.setAttribute("tabindex","-1")}}function E(e){return __awaiter(this,void 0,void 0,(function(){var i,n,r,a,l;return __generator(this,(function(s){switch(s.label){case 0:if(!(this.filterEnabled&&e==="filter"))return[3,2];return[4,t(this.filterEl)];case 1:s.sent();return[2];case 2:i=this,n=i.items,r=i.multiple,a=i.selectionFollowsFocus;if(n.length===0){return[2]}if(r){return[2,n[0].setFocus()]}l=n.find((function(e){return e.selected}))||n[0];if(a){l.selected=true}return[2,l.setFocus()]}}))}))}function S(e){var t=this;this.items=Array.from(this.el.querySelectorAll(e));var i=false;var n=this.items;n.forEach((function(e){e.icon=t.getIconType();if(!t.multiple){e.disableDeselect=true;w(e,false)}if(e.selected){i=true;w(e,true);t.selectedValues.set(e.value,e)}}));var r=n[0];if(!i&&r){w(r,true)}}function x(e){var t=this;this.items.forEach((function(i){if(i.value!==e.value){i.toggleSelected(false);if(t.selectedValues.has(i.value)){t.selectedValues.delete(i.value)}}}))}function I(e,t){var i=this;if(t===void 0){t=false}if(!this.lastSelectedItem){return}var n=this.items;var r=n.findIndex((function(e){return e.value===i.lastSelectedItem.value}));var a=n.findIndex((function(t){return t.value===e.value}));n.slice(Math.min(r,a),Math.max(r,a)).forEach((function(e){e.toggleSelected(!t);if(!t){i.selectedValues.set(e.value,e)}else{i.selectedValues.delete(e.value)}}))}var C;function O(e){var t=e.detail;var n=t.map((function(e){return e.value}));var r=false;if(!C){C=new Set}var a=this.items.filter((function(e){var t=e.parentElement;var i=t.matches("calcite-pick-list-group");if(i){C.add(t)}var a=n.includes(e.value);e.hidden=!a;if(!r){r=a&&e.selected}return a}));C.forEach((function(e){var t=a.some((function(t){return e.contains(t)}));e.hidden=!t;if(!t){return}var n=i(e,"parent-item");if(n){n.hidden=false;if(a.includes(n)){Array.from(e.children).forEach((function(e){return e.hidden=false}))}}}));C.clear();if(a.length>0&&!r&&!this.multiple){w(a[0],true)}}function _(){return this.items.map((function(e){return{label:e.label,description:e.description,metadata:e.metadata,value:e.value}}))}var A={sticky:"sticky"};var F;(function(e){e["circle"]="circle";e["square"]="square";e["grip"]="grip"})(F||(F=e("I",{})));var k={menuActions:"menu-actions"};var V=undefined&&undefined.__rest||function(e,t){var i={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0)i[n]=e[n];if(e!=null&&typeof Object.getOwnPropertySymbols==="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++){if(t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r]))i[n[r]]=e[n[r]]}return i};var j=e("L",(function(e){var t;var i=e.props,r=i.disabled,a=i.loading,c=i.filterEnabled,o=i.dataForFilter,u=i.handleFilter,f=i.filterPlaceholder,d=i.el,h=i.setFilterEl,v=V(e,["props"]);var m=l("slot",null);return l(s,Object.assign({"aria-busy":a.toString(),"aria-disabled":r.toString(),role:"menu"},v),l("section",null,l("header",{class:(t={},t[A.sticky]=true,t)},c?l("calcite-filter",{"aria-label":f,data:o,dir:n(d),disabled:a||r,onCalciteFilterChange:u,placeholder:f,ref:h}):null,l("slot",{name:k.menuActions})),a||r?l("calcite-scrim",{loading:a}):null,m))}));var P=e("C",{actions:"actions",actionsEnd:"actions--end",actionsStart:"actions--start",description:"description",handle:"handle",handleActivated:"handle--activated",highlight:"highlight",icon:"icon",iconDot:"icon-dot",label:"label",remove:"remove",title:"title",textContainer:"text-container"});var L=e("n",{checked:"check",remove:"x"});var U=e("S",{actionsEnd:"actions-end",actionsStart:"actions-start"});var T=e("T",{remove:"Remove"})}}}));