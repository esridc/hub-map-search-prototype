System.register(["./p-3c9923f1.system.js","./p-a7a7301d.system.js","./p-95dfb659.system.js","./p-2c235db8.system.js"],(function(e){"use strict";var t,i,n,a,r,o,c,l,s,d,h,m;return{setters:[function(e){t=e.r;i=e.c;n=e.h;a=e.H;r=e.g},function(e){o=e.f;c=e.n;l=e.a;s=e.g;d=e.C;h=e.l},function(e){m=e.g},function(){}],execute:function(){var f;(function(e){e["Single"]="single";e["Multi"]="multi";e["Children"]="children";e["MultiChildren"]="multi-children";e["Ancestors"]="ancestors"})(f||(f={}));var p="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;outline:2px solid transparent;outline-offset:2px}";var u=e("calcite_tree",function(){function e(e){t(this,e);this.calciteTreeSelect=i(this,"calciteTreeSelect",7);this.lines=false;this.inputEnabled=false;this.scale="m";this.selectionMode=f.Single}e.prototype.componentWillRender=function(){var e=this.el.parentElement.closest("calcite-tree");this.lines=e?e.lines:this.lines;this.scale=e?e.scale:this.scale;this.selectionMode=e?e.selectionMode:this.selectionMode;this.child=!!e};e.prototype.render=function(){return n(a,{"aria-multiselectable":(this.selectionMode===f.Multi||this.selectionMode===f.MultiChildren).toString(),role:!this.child?"tree":undefined,tabIndex:this.getRootTabIndex()},n("slot",null))};e.prototype.onFocus=function(){if(!this.child){var e=this.el.querySelector("calcite-tree-item[selected]")||this.el.querySelector("calcite-tree-item");o(e)}};e.prototype.onFocusIn=function(e){var t=e.relatedTarget===this.el||!this.el.contains(e.relatedTarget);if(t){this.el.tabIndex=-1}};e.prototype.onFocusOut=function(e){var t=!this.el.contains(e.relatedTarget);if(t){this.el.tabIndex=this.getRootTabIndex()}};e.prototype.onClick=function(e){var t=e.target;var i=c(t.querySelectorAll("calcite-tree-item"));if(this.child){return}if(!this.child){e.preventDefault();e.stopPropagation()}if(this.selectionMode===f.Ancestors&&!this.child){this.updateAncestorTree(e);return}var n=this.selectionMode!==null&&(!t.hasChildren||t.hasChildren&&(this.selectionMode===f.Children||this.selectionMode===f.MultiChildren));var a=e.detail.modifyCurrentSelection&&(this.selectionMode===f.Multi||this.selectionMode===f.MultiChildren);var r=this.selectionMode===f.MultiChildren||this.selectionMode===f.Children;var o=!a&&((this.selectionMode===f.Single||this.selectionMode===f.Multi)&&i.length<=0||this.selectionMode===f.Children||this.selectionMode===f.MultiChildren);var l=this.selectionMode===f.Children||this.selectionMode===f.MultiChildren;if(!this.child){var s=[];if(n){s.push(t)}if(r){i.forEach((function(e){s.push(e)}))}if(o){var d=c(this.el.querySelectorAll("calcite-tree-item[selected]"));d.forEach((function(e){if(!s.includes(e)){e.selected=false}}))}if(l&&!e.detail.forceToggle){t.expanded=true}if(a){window.getSelection().removeAllRanges()}if(a&&t.selected||r&&e.detail.forceToggle){s.forEach((function(e){e.selected=false}))}else{s.forEach((function(e){e.selected=true}))}}this.calciteTreeSelect.emit({selected:c(this.el.querySelectorAll("calcite-tree-item")).filter((function(e){return e.selected}))})};e.prototype.updateAncestorTree=function(e){var t=e.target;var i=t.querySelectorAll("calcite-tree-item");var n=[];var a=t.parentElement.closest("calcite-tree-item");while(a){n.push(a);a=a.parentElement.closest("calcite-tree-item")}t.selected=!t.selected;t.indeterminate=false;if(i===null||i===void 0?void 0:i.length){i.forEach((function(e){e.selected=t.selected;e.indeterminate=false}))}if(n){n.forEach((function(e){var t=c(e.querySelectorAll("calcite-tree-item"));var i=t.filter((function(e){return e.selected}));if(i.length===0){e.selected=false;e.indeterminate=false;return}var n=i.length<t.length;e.indeterminate=n;e.selected=!n}))}this.calciteTreeSelect.emit({selected:c(this.el.querySelectorAll("calcite-tree-item")).filter((function(e){return e.selected}))})};e.prototype.getRootTabIndex=function(){return!this.child?0:-1};Object.defineProperty(e.prototype,"el",{get:function(){return r(this)},enumerable:false,configurable:true});return e}());u.style=p;var b={checkboxLabel:"checkbox-label",checkbox:"checkbox",chevron:"chevron",nodeContainer:"node-container",childrenContainer:"children-container",bulletPointIcon:"bullet-point",checkmarkIcon:"checkmark"};var k={children:"children"};var g={bulletPoint:"bullet-point",checkmark:"check",chevronRight:"chevron-right"};var y='@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{--calcite-tree-indicator:var(--calcite-ui-border-1);--calcite-tree-indicator-active:var(--calcite-ui-brand);--calcite-tree-text:var(--calcite-ui-text-3);--calcite-tree-text-active:var(--calcite-ui-text-1);display:block;cursor:pointer;outline:2px solid transparent;outline-offset:2px;max-width:100%;color:var(--calcite-tree-text)}:host([scale=s]){font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-tree-padding-y:0.25rem}:host([scale=s]) .node-container .checkbox{-webkit-margin-start:1.5rem;margin-inline-start:1.5rem}:host([scale=m]){font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-tree-padding-y:0.5rem}:host([scale=m]) .node-container .checkbox{-webkit-margin-start:2rem;margin-inline-start:2rem}:host([scale=l]){font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-tree-padding-y:0.75rem}:host([scale=l]) .node-container .checkbox{-webkit-margin-start:2.5rem;margin-inline-start:2.5rem}:host([lines]){--calcite-tree-line:var(--calcite-ui-border-2);--calcite-tree-line-hover:var(--calcite-ui-border-1)}:host(:not([lines])) .node-container:after{display:none}::slotted(*){word-wrap:break-word;overflow-wrap:break-word;min-width:0;max-width:100%;color:inherit;text-decoration:none !important}::slotted(*):hover{text-decoration:none !important}::slotted(a){width:100%;text-decoration:none}:host{outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host(:focus){outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.checkbox{outline:2px solid transparent;outline-offset:2px;line-height:0}.checkbox-label{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;pointer-events:none}.children-container{position:relative;overflow:hidden;height:0;-webkit-margin-start:1.25rem;margin-inline-start:1.25rem;-webkit-margin-end:1.25rem;margin-inline-end:1.25rem;-webkit-transform:scaleY(0);transform:scaleY(0);opacity:0;-webkit-transition:0.15s cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity 0.15s cubic-bezier(0.215, 0.44, 0.42, 0.88), all 0.15s ease-in-out;transition:0.15s cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity 0.15s cubic-bezier(0.215, 0.44, 0.42, 0.88), all 0.15s ease-in-out;-webkit-transform-origin:top;transform-origin:top}.children-container:after{-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-delay:0s;transition-delay:0s;-webkit-transition-property:background-color, border-color, color, fill, stroke;transition-property:background-color, border-color, color, fill, stroke;top:0;position:absolute;width:1px;height:96%;content:"";background-color:var(--calcite-tree-line);z-index:-1}:host([expanded])>.children-container{-webkit-transform:scaleY(1);transform:scaleY(1);opacity:1;height:auto}.node-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;position:relative;padding:var(--calcite-tree-padding-y) 0}.node-container .checkmark,.node-container .bullet-point{-webkit-margin-start:var(--calcite-tree-padding-y);margin-inline-start:var(--calcite-tree-padding-y);-webkit-margin-end:var(--calcite-tree-padding-y);margin-inline-end:var(--calcite-tree-padding-y)}.node-container .checkbox{-webkit-margin-end:var(--calcite-tree-padding-y);margin-inline-end:var(--calcite-tree-padding-y)}.node-container .checkmark,.node-container .bullet-point{-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-delay:0s;transition-delay:0s;opacity:0;color:var(--calcite-tree-indicator)}.node-container:hover ::slotted(*),:host([selected]) .node-container:hover ::slotted(*),:host(:focus) .node-container ::slotted(*){color:var(--calcite-tree-text-hover)}.node-container:hover .checkmark,.node-container:hover .bullet-point,:host([selected]) .node-container:hover .checkmark,:host([selected]) .node-container:hover .bullet-point,:host(:focus) .node-container .checkmark,:host(:focus) .node-container .bullet-point{opacity:1}:host([selected])>.node-container,:host([selected])>.node-container:hover{color:var(--calcite-tree-text-active);font-weight:var(--calcite-font-weight-medium)}:host([selected])>.node-container .bullet-point,:host([selected])>.node-container .checkmark,:host([selected])>.node-container:hover .bullet-point,:host([selected])>.node-container:hover .checkmark{opacity:1;color:var(--calcite-ui-brand)}:host(:not([has-children]))[scale=s]>.node-container[data-selection-mode=ancestors] .checkbox{-webkit-padding-start:1.25rem;padding-inline-start:1.25rem}:host(:not([has-children]))[scale=m]>.node-container[data-selection-mode=ancestors] .checkbox{-webkit-padding-start:1.5rem;padding-inline-start:1.5rem}:host(:not([has-children]))[scale=l]>.node-container[data-selection-mode=ancestors] .checkbox{-webkit-padding-start:1.75rem;padding-inline-start:1.75rem}:host([has-children])>.node-container[data-selection-mode=ancestors] .checkbox{-webkit-margin-start:0;margin-inline-start:0}:host([has-children])>.node-container .bullet-point,:host([has-children])>.node-container .checkmark{display:none}:host([has-children][expanded]:not([selected]))>.node-container ::slotted(*){font-weight:var(--calcite-font-weight-medium);color:var(--calcite-tree-text-active)}:host([has-children][selected])>.node-container[data-selection-mode=children],:host([has-children][selected])>.node-container[data-selection-mode=multi-children]{color:var(--calcite-tree-indicator-active)}.chevron{-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-delay:0s;transition-delay:0s;position:relative;-ms-flex-item-align:center;align-self:center;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-margin-start:var(--calcite-tree-padding-y);margin-inline-start:var(--calcite-tree-padding-y);-webkit-margin-end:var(--calcite-tree-padding-y);margin-inline-end:var(--calcite-tree-padding-y);-webkit-transform:rotate(0deg);transform:rotate(0deg);color:var(--calcite-tree-text)}.calcite--rtl .chevron{-webkit-transform:rotate(180deg);transform:rotate(180deg)}:host([expanded])>.node-container>.chevron{-webkit-transform:rotate(90deg);transform:rotate(90deg)}:host([scale=s])>.node-container .checkbox{-webkit-margin-end:0.5rem;margin-inline-end:0.5rem}:host([scale=m])>.node-container .checkbox{-webkit-margin-end:0.75rem;margin-inline-end:0.75rem}:host([scale=l])>.node-container .checkbox{-webkit-margin-end:1rem;margin-inline-end:1rem}:host([selected]) .checkmark,:host([selected]) .bullet-point{color:var(--calcite-tree-indicator-active)}';var v=e("calcite_tree_item",function(){function e(e){var n=this;t(this,e);this.calciteTreeItemSelect=i(this,"calciteTreeItemSelect",7);this.selected=false;this.expanded=false;this.parentExpanded=false;this.depth=-1;this.hasChildren=null;this.iconClickHandler=function(e){e.stopPropagation();n.expanded=!n.expanded;if(n.selectionMode!==f.Ancestors){n.calciteTreeItemSelect.emit({modifyCurrentSelection:e.shiftKey,forceToggle:true})}};this.childrenClickHandler=function(e){return e.stopPropagation()}}e.prototype.expandedHandler=function(e){var t=l(this.el,"children",{all:true,selector:"calcite-tree-item"});t.forEach((function(t){return t.parentExpanded=e}))};e.prototype.connectedCallback=function(){this.expandedHandler(this.expanded)};e.prototype.componentWillRender=function(){this.hasChildren=!!this.el.querySelector("calcite-tree");this.depth=0;var e=this.el.closest("calcite-tree");if(!e){return}this.selectionMode=e.selectionMode;this.scale=e.scale||"m";this.lines=e.lines;var t;while(e){t=e.parentElement.closest("calcite-tree");if(t===e){break}else{e=t;this.depth=this.depth+1}}};e.prototype.render=function(){var e,t,i,r;var o=this;var c=s(this.el)==="rtl";var l=this.selectionMode===f.Single||this.selectionMode===f.Children;var h=this.selectionMode===f.Multi||this.selectionMode===f.MultiChildren;var m=this.hasChildren?n("calcite-icon",{class:(e={},e[b.chevron]=true,e[d.rtl]=c,e),"data-test-id":"icon",icon:g.chevronRight,onClick:this.iconClickHandler,scale:"s"}):null;var p=this.selectionMode===f.Ancestors?n("label",{class:b.checkboxLabel},n("calcite-checkbox",{checked:this.selected,class:b.checkbox,"data-test-id":"checkbox",indeterminate:this.hasChildren&&this.indeterminate,scale:this.scale,tabIndex:-1}),n("slot",null)):null;var u=l?g.bulletPoint:h?g.checkmark:null;var y=u?n("calcite-icon",{class:(t={},t[b.bulletPointIcon]=u===g.bulletPoint,t[b.checkmarkIcon]=u===g.checkmark,t[d.rtl]=c,t),icon:u,scale:"s"}):null;var v=!(this.parentExpanded||this.depth===1);return n(a,{"aria-expanded":this.hasChildren?this.expanded.toString():undefined,"aria-hidden":v.toString(),"aria-selected":this.selected?"true":h?"false":undefined,"calcite-hydrated-hidden":v,role:"treeitem",tabindex:this.parentExpanded||this.depth===1?"0":"-1"},n("div",{class:(i={},i[b.nodeContainer]=true,i[d.rtl]=c,i),"data-selection-mode":this.selectionMode,ref:function(e){return o.defaultSlotWrapper=e}},m,y,p?p:n("slot",null)),n("div",{class:(r={},r[b.childrenContainer]=true,r[d.rtl]=c,r),"data-test-id":"calcite-tree-children",onClick:this.childrenClickHandler,ref:function(e){return o.childrenSlotWrapper=e},role:this.hasChildren?"group":undefined},n("slot",{name:k.children})))};e.prototype.onClick=function(e){var t=h(this.el,"a")[0];if(t&&e.composedPath()[0].tagName.toLowerCase()!=="a"){var i=t.target===""?"_self":t.target;window.open(t.href,i)}this.expanded=!this.expanded;this.calciteTreeItemSelect.emit({modifyCurrentSelection:e.shiftKey||this.selectionMode===f.Ancestors,forceToggle:false})};e.prototype.keyDownHandler=function(e){var t;switch(m(e.key)){case" ":this.calciteTreeItemSelect.emit({modifyCurrentSelection:e.shiftKey,forceToggle:false});e.preventDefault();e.stopPropagation();break;case"Enter":var i=c(this.el.children).find((function(e){return e.matches("a")}));if(i){i.click();this.selected=true}else{this.calciteTreeItemSelect.emit({modifyCurrentSelection:e.shiftKey,forceToggle:false})}e.preventDefault();e.stopPropagation();break;case"ArrowLeft":if(this.hasChildren&&this.expanded){this.expanded=false;e.preventDefault();e.stopPropagation();break}var n=this.el.parentElement.closest("calcite-tree-item");if(n&&(!this.hasChildren||this.expanded===false)){n.focus();e.preventDefault();e.stopPropagation();break}break;case"ArrowRight":if(this.hasChildren&&this.expanded===false){this.expanded=true;e.preventDefault();e.stopPropagation();break}if(this.hasChildren&&this.expanded){this.el.querySelector("calcite-tree-item").focus();break}break;case"ArrowUp":var a=this.el.previousElementSibling;if(a&&a.matches("calcite-tree-item")){a.focus()}break;case"ArrowDown":var r=this.el.nextElementSibling;if(r&&r.matches("calcite-tree-item")){r.focus()}break;case"Home":t=this.el.closest("calcite-tree:not([child])");var o=t.querySelector("calcite-tree-item");o.focus();break;case"End":t=this.el.closest("calcite-tree:not([child])");var l=t.children[t.children.length-1];var s=c(l.children).find((function(e){return e.matches("calcite-tree")}));while(s){l=s.children[t.children.length-1];s=c(l.children).find((function(e){return e.matches("calcite-tree")}))}l.focus();break}};Object.defineProperty(e.prototype,"el",{get:function(){return r(this)},enumerable:false,configurable:true});Object.defineProperty(e,"watchers",{get:function(){return{expanded:["expandedHandler"]}},enumerable:false,configurable:true});return e}());v.style=y}}}));