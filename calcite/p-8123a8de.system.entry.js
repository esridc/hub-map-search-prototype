System.register(["./p-3c9923f1.system.js","./p-a7a7301d.system.js","./p-2c235db8.system.js"],(function(t){"use strict";var e,a,i,n,o,r,l,s;return{setters:[function(t){e=t.r;a=t.h;i=t.F;n=t.g;o=t.c},function(t){r=t.a;l=t.g;s=t.C},function(){}],execute:function(){var c={main:"main",mainReversed:"main--reversed",content:"content",contentBehind:"content--behind",footer:"footer"};var d={centerRow:"center-row",primaryPanel:"primary-panel",contextualPanel:"contextual-panel",header:"header",footer:"footer"};var m="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{width:100%;height:100%;position:absolute;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden;top:0;right:0;bottom:0;left:0;--calcite-shell-tip-spacing:26vw}.main{height:100%;width:100%;-ms-flex:1 1 auto;flex:1 1 auto;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;position:relative;border-width:0;border-top-width:1px;border-bottom-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3);-ms-flex-pack:justify;justify-content:space-between;overflow:hidden}.main--reversed{-ms-flex-direction:row-reverse;flex-direction:row-reverse}.content{display:-ms-flexbox;display:flex;height:100%;overflow:auto;width:100%;border-width:0;border-left-width:1px;border-right-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3);-ms-flex-flow:column nowrap;flex-flow:column nowrap}.content ::slotted(calcite-shell-center-row),.content ::slotted(calcite-panel),.content ::slotted(calcite-flow){-ms-flex-item-align:stretch;align-self:stretch;-ms-flex:1 1 auto;flex:1 1 auto;max-height:unset}.content--behind{border-width:0;position:absolute;top:0;right:0;bottom:0;left:0;z-index:0;display:initial}::slotted(calcite-shell-center-row){width:unset}::slotted(.header .heading){font-weight:var(--calcite-font-weight-normal);font-size:var(--calcite-font-size--2);line-height:1.375}::slotted(calcite-shell-panel),::slotted(calcite-shell-center-row){position:relative;z-index:1}slot[name=center-row]::slotted(calcite-shell-center-row:not([detached])){border-left-width:1px;border-right-width:1px;border-color:var(--calcite-ui-border-3)}::slotted(calcite-tip-manager){border-radius:0.25rem;-webkit-box-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);box-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);position:absolute;-webkit-animation:in-up var(--calcite-animation-timing) ease-in-out;animation:in-up var(--calcite-animation-timing) ease-in-out;-webkit-box-sizing:border-box;box-sizing:border-box;bottom:0.5rem;left:var(--calcite-shell-tip-spacing);right:var(--calcite-shell-tip-spacing);z-index:2}";var h=t("calcite_shell",function(){function t(t){e(this,t);this.contentBehind=false}t.prototype.renderHeader=function(){var t=!!r(this.el,d.header);return t?a("slot",{name:d.header}):null};t.prototype.renderContent=function(){var t;var e=!!this.contentBehind?[a("div",{class:(t={},t[c.content]=true,t[c.contentBehind]=!!this.contentBehind,t)},a("slot",null)),a("slot",{name:d.centerRow})]:[a("div",{class:c.content},a("slot",null),a("slot",{name:d.centerRow}))];return e};t.prototype.renderFooter=function(){var t=!!r(this.el,d.footer);return t?a("div",{class:c.footer},a("slot",{name:d.footer})):null};t.prototype.renderMain=function(){var t;var e=r(this.el,d.primaryPanel);var i=(t={},t[c.main]=true,t[c.mainReversed]=(e===null||e===void 0?void 0:e.position)==="end",t);return a("div",{class:i},a("slot",{name:d.primaryPanel}),this.renderContent(),a("slot",{name:d.contextualPanel}))};t.prototype.render=function(){return a(i,null,this.renderHeader(),this.renderMain(),this.renderFooter())};Object.defineProperty(t.prototype,"el",{get:function(){return n(this)},enumerable:false,configurable:true});return t}());h.style=m;var p={actionBarContainer:"action-bar-container",content:"content"};var f={actionBar:"action-bar"};var b="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;overflow:hidden;background-color:transparent}.content{display:-ms-flexbox;display:flex;height:100%;margin:0;overflow:hidden;width:100%;-ms-flex:1 0 0px;flex:1 0 0}.action-bar-container{display:-ms-flexbox;display:flex}:host([detached]){border-width:0;border-radius:0.25rem;-webkit-box-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);box-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);margin-top:0.5rem;margin-bottom:1.5rem;margin-left:0.5rem;margin-right:0.5rem;-webkit-animation:in-up var(--calcite-animation-timing) ease-in-out;animation:in-up var(--calcite-animation-timing) ease-in-out}:host([position=end]){-ms-flex-item-align:end;align-self:flex-end}:host([position=start]){-ms-flex-item-align:start;align-self:flex-start}:host([height-scale=s]){height:33.333333%}:host([height-scale=m]){height:70%}:host([height-scale=l]){height:100%}:host([height-scale=l][detached]){height:calc(100% - 2rem)}::slotted(calcite-panel){width:100%;height:100%}::slotted(calcite-action-bar){border-right-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}::slotted(calcite-action-bar[position=end]){border-left-width:0;border-right-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}.calcite--rtl ::slotted(calcite-action-bar){border-right-width:0;border-left-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}.calcite--rtl ::slotted(calcite-action-bar[position=end]){border-left-width:0;border-right-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}";var x=t("calcite_shell_center_row",function(){function t(t){e(this,t);this.detached=false;this.heightScale="s";this.position="end"}t.prototype.render=function(){var t,e;var n=this.el;var o=l(n)==="rtl";var c=a("div",{class:(t={},t[p.content]=true,t[s.rtl]=o,t)},a("slot",null));var d=r(n,f.actionBar);var m=d?a("div",{class:(e={},e[p.actionBarContainer]=true,e[s.rtl]=o,e)},a("slot",{name:f.actionBar})):null;var h=[m,c];if((d===null||d===void 0?void 0:d.position)==="end"){h.reverse()}return a(i,null,h)};Object.defineProperty(t.prototype,"el",{get:function(){return n(this)},enumerable:false,configurable:true});return t}());x.style=b;var w={content:"content",contentHeader:"content__header",contentBody:"content__body",contentDetached:"content--detached"};var u={actionBar:"action-bar",header:"header"};var g="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;-ms-flex-align:stretch;align-items:stretch;background-color:transparent;pointer-events:none;--calcite-shell-panel-detached-max-height:unset}::slotted(calcite-panel),::slotted(calcite-flow){-ms-flex:1 1 auto;flex:1 1 auto;height:100%;width:100%;max-height:unset;max-width:unset}::slotted(.calcite-match-height){display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;overflow:hidden}.content{-ms-flex-align:stretch;align-items:stretch;-ms-flex-item-align:stretch;align-self:stretch;background-color:var(--calcite-ui-background);display:-ms-flexbox;display:flex;padding:0;pointer-events:auto;-ms-flex-direction:column;flex-direction:column;-ms-flex-wrap:nowrap;flex-wrap:nowrap;width:var(--calcite-shell-panel-width);max-width:var(--calcite-shell-panel-max-width);min-width:var(--calcite-shell-panel-min-width);-webkit-transition:max-height 150ms ease-in-out, max-width 150ms ease-in-out;transition:max-height 150ms ease-in-out, max-width 150ms ease-in-out}.content__header{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex:0 1 auto;flex:0 1 auto;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-align:stretch;align-items:stretch}.content__body{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-direction:column;flex-direction:column;overflow:hidden}:host([width-scale=s]) .content{--calcite-shell-panel-width:calc(var(--calcite-panel-width-multiplier) * 12vw);--calcite-shell-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 300px);--calcite-shell-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 150px)}:host([width-scale=m]) .content{--calcite-shell-panel-width:calc(var(--calcite-panel-width-multiplier) * 20vw);--calcite-shell-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 420px);--calcite-shell-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 240px)}:host([width-scale=l]) .content{--calcite-shell-panel-width:calc(var(--calcite-panel-width-multiplier) * 45vw);--calcite-shell-panel-max-width:calc(var(--calcite-panel-width-multiplier) * 680px);--calcite-shell-panel-min-width:calc(var(--calcite-panel-width-multiplier) * 340px)}:host([detached-height-scale=s]) .content--detached{--calcite-shell-panel-detached-max-height:40vh}:host([detached-height-scale=m]) .content--detached{--calcite-shell-panel-detached-max-height:60vh}:host([detached-height-scale=l]) .content--detached{--calcite-shell-panel-detached-max-height:80vh}.content--detached{border-radius:0.25rem;-webkit-box-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);box-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);height:auto;overflow:hidden;margin-top:0.5rem;margin-bottom:auto;margin-left:0.5rem;margin-right:0.5rem;max-height:var(--calcite-shell-panel-detached-max-height)}.content--detached ::slotted(calcite-panel),.content--detached ::slotted(calcite-flow){max-height:unset}.content[hidden]{display:none}:host([position=start]) slot[name=action-bar]::slotted(calcite-action-bar){border-right-width:1px;border-right-color:var(--calcite-ui-border-3);border-right-style:solid}:host([position=end]) slot[name=action-bar]::slotted(calcite-action-bar){border-left-width:1px;border-left-color:var(--calcite-ui-border-3);border-left-style:solid}";var y=t("calcite_shell_panel",function(){function t(t){e(this,t);this.calciteShellPanelToggle=o(this,"calciteShellPanelToggle",7);this.collapsed=false;this.detached=false;this.detachedHeightScale="l";this.widthScale="m"}t.prototype.watchHandler=function(){this.calciteShellPanelToggle.emit()};t.prototype.renderHeader=function(){var t=this.el;var e=r(t,u.header);return e?a("div",{class:w.contentHeader},a("slot",{name:u.header})):null};t.prototype.render=function(){var t;var e=this,n=e.collapsed,o=e.detached,r=e.position;var l=a("div",{class:(t={},t[w.content]=true,t[w.contentDetached]=o,t),hidden:n},this.renderHeader(),a("div",{class:w.contentBody},a("slot",null)));var s=a("slot",{name:u.actionBar});var c=[s,l];if(r==="end"){c.reverse()}return a(i,null,c)};Object.defineProperty(t.prototype,"el",{get:function(){return n(this)},enumerable:false,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{collapsed:["watchHandler"]}},enumerable:false,configurable:true});return t}());y.style=g}}}));