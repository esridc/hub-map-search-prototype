var __awaiter=this&&this.__awaiter||function(i,t,e,a){function r(i){return i instanceof e?i:new e((function(t){t(i)}))}return new(e||(e=Promise))((function(e,n){function o(i){try{l(a.next(i))}catch(i){n(i)}}function c(i){try{l(a["throw"](i))}catch(i){n(i)}}function l(i){i.done?e(i.value):r(i.value).then(o,c)}l((a=a.apply(i,t||[])).next())}))};var __generator=this&&this.__generator||function(i,t){var e={label:0,sent:function(){if(n[0]&1)throw n[1];return n[1]},trys:[],ops:[]},a,r,n,o;return o={next:c(0),throw:c(1),return:c(2)},typeof Symbol==="function"&&(o[Symbol.iterator]=function(){return this}),o;function c(i){return function(t){return l([i,t])}}function l(o){if(a)throw new TypeError("Generator is already executing.");while(e)try{if(a=1,r&&(n=o[0]&2?r["return"]:o[0]?r["throw"]||((n=r["return"])&&n.call(r),0):r.next)&&!(n=n.call(r,o[1])).done)return n;if(r=0,n)o=[o[0]&2,n.value];switch(o[0]){case 0:case 1:n=o;break;case 4:e.label++;return{value:o[1],done:false};case 5:e.label++;r=o[1];o=[0];continue;case 7:o=e.ops.pop();e.trys.pop();continue;default:if(!(n=e.trys,n=n.length>0&&n[n.length-1])&&(o[0]===6||o[0]===2)){e=0;continue}if(o[0]===3&&(!n||o[1]>n[0]&&o[1]<n[3])){e.label=o[1];break}if(o[0]===6&&e.label<n[1]){e.label=n[1];n=o;break}if(n&&e.label<n[2]){e.label=n[2];e.ops.push(o);break}if(n[2])e.ops.pop();e.trys.pop();continue}o=t.call(i,e)}catch(i){o=[6,i];r=0}finally{a=n=0}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:true}}};System.register(["./p-3c9923f1.system.js","./p-a7a7301d.system.js","./p-2c235db8.system.js"],(function(i){"use strict";var t,e,a,r,n,o,c,l;return{setters:[function(i){t=i.r;e=i.c;a=i.h;r=i.g},function(i){n=i.a;o=i.g;c=i.C},function(i){l=i.g}],execute:function(){var s={title:"title",close:"close",chipImageContainer:"chip-image-container",calciteChipIcon:"calcite-chip--icon"};var p={close:"Close"};var u={image:"image"};var h={close:"x"};var m="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host([scale=s]){height:1.5rem;font-size:var(--calcite-font-size--2);--calcite-chip-spacing-unit-l:0.5rem;--calcite-chip-spacing-unit-s:0.25rem}:host([scale=s]) .chip-image-container{height:1.25rem;width:1.25rem}:host([scale=m]){height:2rem;font-size:var(--calcite-font-size--1);--calcite-chip-spacing-unit-l:0.75rem;--calcite-chip-spacing-unit-s:6px}:host([scale=m]) .chip-image-container{height:1.5rem;width:1.5rem;padding-left:0.25rem}:host([scale=l]){height:2.75rem;font-size:var(--calcite-font-size-0);--calcite-chip-spacing-unit-l:1rem;--calcite-chip-spacing-unit-s:0.5rem}:host([scale=l]) .chip-image-container{height:2rem;width:2rem;padding-left:0.25rem}:host([scale=m]) .calcite--rtl .chip-image-container{padding-left:0;padding-right:0.25rem}:host([scale=l]) .calcite--rtl .chip-image-container{padding-left:0;padding-right:0.25rem}:host{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-1);color:var(--calcite-ui-text-1);font-weight:var(--calcite-font-weight-medium);cursor:default;border-radius:9999px;-webkit-box-sizing:border-box;box-sizing:border-box;--calcite-chip-button-border-radius:0 50px 50px 0}.container{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;height:100%;max-width:100%}.title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.calcite--rtl{text-align:right;--calcite-chip-button-border-radius:50px 0 0 50px}:host span{padding:0 var(--calcite-chip-spacing-unit-l)}:host([dismissible]) span{padding:0 var(--calcite-chip-spacing-unit-s) 0 var(--calcite-chip-spacing-unit-l)}:host([dismissible]) .calcite--rtl span{padding:0 var(--calcite-chip-spacing-unit-l) 0 var(--calcite-chip-spacing-unit-s)}:host([icon]:not([dismissible])) span{padding:0 var(--calcite-chip-spacing-unit-l)}:host([icon]:not([dismissible])) .calcite--rtl span{padding:0 var(--calcite-chip-spacing-unit-l)}:host button{margin:0;background-color:transparent;outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;display:-ms-inline-flexbox;display:inline-flex;min-height:100%;max-height:100%;-ms-flex-item-align:stretch;align-self:stretch;-ms-flex-align:center;align-items:center;border-style:none;cursor:pointer;-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-delay:0s;transition-delay:0s;color:var(--calcite-ui-text-1);-webkit-appearance:none;border-radius:var(--calcite-chip-button-border-radius);padding:0 var(--calcite-chip-spacing-unit-s);color:inherit;--calcite-chip-transparent-hover:var(--calcite-button-transparent-hover);--calcite-chip-transparent-press:var(--calcite-button-transparent-press)}:host button:hover{background-color:var(--calcite-chip-transparent-hover)}:host button:focus{background-color:var(--calcite-chip-transparent-hover);outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}:host button:active{background-color:var(--calcite-chip-transparent-press)}.chip-image-container{border-radius:50%;overflow:hidden;display:-ms-inline-flexbox;display:inline-flex}:host slot[name=image]::slotted(*){display:-ms-flexbox;display:flex;height:100%;width:100%;border-radius:50%;overflow:hidden}.calcite-chip--icon{display:-ms-inline-flexbox;display:inline-flex;position:relative;margin-top:0;margin-bottom:0;margin-right:0;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);margin-left:var(--calcite-chip-spacing-unit-l);border-radius:var(--calcite-chip-button-border-radius)}.calcite--rtl .calcite-chip--icon{margin-top:0;margin-bottom:0;margin-left:0;margin-right:var(--calcite-chip-spacing-unit-l)}:host([color=blue][appearance=solid]){border-color:transparent;background-color:var(--calcite-ui-info);color:var(--calcite-ui-text-inverse)}:host([color=red][appearance=solid]){border-color:transparent;background-color:var(--calcite-ui-danger);color:var(--calcite-ui-text-inverse)}:host([color=yellow][appearance=solid]){border-color:transparent;background-color:var(--calcite-ui-warning);color:#151515}:host([color=green][appearance=solid]){border-color:transparent;background-color:var(--calcite-ui-success);color:#151515}:host([color=grey][appearance=solid]){border-color:transparent;background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}:host([color=grey][appearance=solid]) button,:host([color=grey][appearance=solid]) calcite-icon{color:var(--calcite-ui-text-3)}:host([color=blue][appearance=clear]){border-color:var(--calcite-ui-info)}:host([color=blue][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-info)}:host([color=red][appearance=clear]){border-color:var(--calcite-ui-danger)}:host([color=red][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-danger)}:host([color=yellow][appearance=clear]){border-color:var(--calcite-ui-warning)}:host([color=yellow][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-warning)}:host([color=green][appearance=clear]){border-color:var(--calcite-ui-success)}:host([color=green][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-success)}:host([color=grey][appearance=clear]){border-color:var(--calcite-ui-border-1)}:host([color=grey][appearance=clear]) .calcite-chip--icon{color:var(--calcite-ui-text-3)}";var d=i("calcite_chip",function(){function i(i){var a=this;t(this,i);this.calciteChipDismiss=e(this,"calciteChipDismiss",7);this.appearance="solid";this.color="grey";this.dismissible=false;this.dismissLabel=p.close;this.iconFlipRtl=false;this.scale="m";this.closeClickHandler=function(i){i.preventDefault();a.calciteChipDismiss.emit(a.el)};this.guid=l()}i.prototype.setFocus=function(){return __awaiter(this,void 0,void 0,(function(){var i;return __generator(this,(function(t){(i=this.closeButton)===null||i===void 0?void 0:i.focus();return[2]}))}))};i.prototype.renderChipImage=function(){var i=this.el;var t=n(i,u.image);return t?a("div",{class:s.chipImageContainer},a("slot",{name:u.image})):null};i.prototype.render=function(){var i;var t=this;var e=o(this.el);var r=a("calcite-icon",{class:s.calciteChipIcon,dir:e,flipRtl:this.iconFlipRtl,icon:this.icon,scale:"s"});var n=a("button",{"aria-describedby":this.guid,"aria-label":this.dismissLabel,class:s.close,onClick:this.closeClickHandler,ref:function(i){return t.closeButton=i}},a("calcite-icon",{icon:h.close,scale:"s"}));return a("div",{class:(i={container:true},i[c.rtl]=e==="rtl",i)},this.renderChipImage(),this.icon?r:null,a("span",{class:s.title,id:this.guid},a("slot",null)),this.dismissible?n:null)};Object.defineProperty(i.prototype,"el",{get:function(){return r(this)},enumerable:false,configurable:true});return i}());d.style=m}}}));