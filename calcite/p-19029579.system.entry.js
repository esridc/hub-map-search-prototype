System.register(["./p-3c9923f1.system.js"],(function(t){"use strict";var a,i,e;return{setters:[function(t){a=t.r;i=t.h;e=t.g}],execute:function(){var n={scrim:"scrim",content:"content"};var r={loading:"Loading"};var o="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;position:absolute;z-index:50;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:stretch;align-items:stretch;width:100%;height:100%;top:0;right:0;bottom:0;left:0}@-webkit-keyframes calcite-scrim-fade-in{0%{--bg-opacity:0}100%{--text-opacity:1}}@keyframes calcite-scrim-fade-in{0%{--bg-opacity:0}100%{--text-opacity:1}}.scrim{display:-ms-flexbox;display:flex;position:absolute;overflow:hidden;top:0;right:0;bottom:0;left:0;-ms-flex-line-pack:center;align-content:center;-ms-flex-align:center;align-items:center;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;-webkit-animation:calcite-scrim-fade-in 250ms ease-in-out;animation:calcite-scrim-fade-in 250ms ease-in-out;background-color:var(--calcite-scrim-background)}.content{padding:1rem}";var s=t("calcite_scrim",function(){function t(t){a(this,t);this.intlLoading=r.loading;this.loading=false}t.prototype.render=function(){var t=this,a=t.el,e=t.loading,r=t.intlLoading;var o=a.innerHTML.trim().length>0;var s=e?i("calcite-loader",{active:true,label:r}):null;var c=o?i("div",{class:n.content},i("slot",null)):null;return i("div",{class:n.scrim},s,c)};Object.defineProperty(t.prototype,"el",{get:function(){return e(this)},enumerable:false,configurable:true});return t}());s.style=o}}}));