import{r as t,h as a,F as i,g as n}from"./p-263e9c6f.js";import{S as e,I as o,T as r}from"./p-354fbadd.js";import{a as s}from"./p-c47fe2f9.js";import{S as c}from"./p-4fda49e6.js";import"./p-a4e6e35b.js";const l=class{constructor(a){t(this,a),this.expanded=!1,this.layout="vertical",this.menuOpen=!1,this.setMenuOpen=t=>{this.menuOpen=!!t.detail}}expandedHandler(){this.menuOpen=!1}renderTooltip(){const{el:t}=this;return s(t,e.menuTooltip)?a("slot",{name:e.menuTooltip,slot:c.tooltip}):null}renderMenu(){const{el:t,expanded:i,intlMore:n,menuOpen:l,scale:m}=this;return s(t,e.menuActions)?a("calcite-action-menu",{expanded:i,flipPlacements:["left","right"],label:n||r.more,onCalciteActionMenuOpenChange:this.setMenuOpen,open:l,placement:"leading-start",scale:m},a("calcite-action",{icon:o.menu,scale:m,slot:c.trigger,text:n||r.more,textEnabled:i}),a("slot",{name:e.menuActions}),this.renderTooltip()):null}render(){return a(i,null,a("slot",null),this.renderMenu())}get el(){return n(this)}static get watchers(){return{expanded:["expandedHandler"]}}};l.style='@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;padding:0;--calcite-action-group-columns:3}:host([columns="1"]){--calcite-action-group-columns:1}:host([columns="2"]){--calcite-action-group-columns:2}:host([columns="3"]){--calcite-action-group-columns:3}:host([columns="4"]){--calcite-action-group-columns:4}:host([columns="5"]){--calcite-action-group-columns:5}:host([columns="6"]){--calcite-action-group-columns:6}:host(:first-child){padding-top:0}:host([layout=horizontal]){-ms-flex-direction:row;flex-direction:row}:host([layout=grid]){background-color:var(--calcite-ui-background);display:grid;grid-gap:1px;gap:1px;place-content:stretch;padding:1px;grid-template-columns:repeat(var(--calcite-action-group-columns), auto)}';export{l as calcite_action_group}