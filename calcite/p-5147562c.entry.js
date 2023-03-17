import{r as t,h as e,H as a,g as i}from"./p-263e9c6f.js";import{g as n}from"./p-a4e6e35b.js";import{d as o,u as r,c as s,C as l}from"./p-4ae01d80.js";import{q as c}from"./p-c47fe2f9.js";import{g as p}from"./p-cebd4de5.js";const m="data-calcite-tooltip-reference",f=class{constructor(e){t(this,e),this.offsetDistance=o,this.offsetSkidding=0,this.open=!1,this.overlayPositioning="absolute",this.placement="auto",this.guid=`calcite-tooltip-${n()}`,this.setUpReferenceElement=()=>{this.removeReferences(),this.effectiveReferenceElement=this.getReferenceElement();const{el:t,referenceElement:e,effectiveReferenceElement:a}=this;e&&!a&&console.warn(`${t.tagName}: reference-element id "${e}" was not found.`,{el:t}),this.addReferences(),this.createPopper()},this.getId=()=>this.el.id||this.guid,this.addReferences=()=>{const{effectiveReferenceElement:t}=this;if(!t)return;const e=this.getId();t.setAttribute(m,e),t.setAttribute("aria-describedby",e)},this.removeReferences=()=>{const{effectiveReferenceElement:t}=this;t&&(t.removeAttribute(m),t.removeAttribute("aria-describedby"))},this.show=()=>{this.open=!0},this.hide=()=>{this.open=!1}}offsetDistanceOffsetHandler(){this.reposition()}offsetSkiddingHandler(){this.reposition()}openHandler(){this.reposition()}placementHandler(){this.reposition()}referenceElementHandler(){this.setUpReferenceElement()}componentWillLoad(){this.setUpReferenceElement()}componentDidLoad(){this.reposition()}disconnectedCallback(){this.removeReferences(),this.destroyPopper()}async reposition(){const{popper:t,el:e,placement:a}=this,i=this.getModifiers();t?r({el:e,modifiers:i,placement:a,popper:t}):this.createPopper()}getReferenceElement(){const{referenceElement:t,el:e}=this;return("string"==typeof t?c(e,`#${t}`):t)||null}getModifiers(){const{arrowEl:t,offsetDistance:e,offsetSkidding:a}=this;return[{name:"arrow",enabled:!0,options:{element:t}},{name:"offset",enabled:!0,options:{offset:[a,e]}}]}createPopper(){this.destroyPopper();const{el:t,placement:e,effectiveReferenceElement:a,overlayPositioning:i}=this,n=this.getModifiers();this.popper=s({el:t,modifiers:n,placement:e,overlayPositioning:i,referenceEl:a})}destroyPopper(){const{popper:t}=this;t&&t.destroy(),this.popper=null}render(){const{effectiveReferenceElement:t,label:i,open:n}=this,o=t&&n,r=!o;return e(a,{"aria-hidden":r.toString(),"aria-label":i,"calcite-hydrated-hidden":r,id:this.getId(),role:"tooltip"},e("div",{class:{[l.animation]:!0,[l.animationActive]:o}},e("div",{class:"arrow",ref:t=>this.arrowEl=t}),e("div",{class:"container"},e("slot",null))))}get el(){return i(this)}static get watchers(){return{offsetDistance:["offsetDistanceOffsetHandler"],offsetSkidding:["offsetSkiddingHandler"],open:["openHandler"],placement:["placementHandler"],referenceElement:["referenceElementHandler"]}}};f.style='@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block;position:absolute;z-index:999;-webkit-transform:scale(0);transform:scale(0)}.calcite-popper-anim{position:relative;z-index:1;-webkit-transition:var(--calcite-popper-transition);transition:var(--calcite-popper-transition);visibility:hidden;-webkit-transition-property:visibility, opacity, -webkit-transform;transition-property:visibility, opacity, -webkit-transform;transition-property:transform, visibility, opacity;transition-property:transform, visibility, opacity, -webkit-transform;opacity:0;-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);border-radius:0.25rem}:host([data-popper-placement^=bottom]) .calcite-popper-anim{-webkit-transform:translateY(-5px);transform:translateY(-5px)}:host([data-popper-placement^=top]) .calcite-popper-anim{-webkit-transform:translateY(5px);transform:translateY(5px)}:host([data-popper-placement^=left]) .calcite-popper-anim{-webkit-transform:translateX(5px);transform:translateX(5px)}:host([data-popper-placement^=right]) .calcite-popper-anim{-webkit-transform:translateX(-5px);transform:translateX(-5px)}:host([data-popper-placement]) .calcite-popper-anim--active{opacity:1;visibility:visible;-webkit-transform:translate(0);transform:translate(0)}.arrow,.arrow::before{position:absolute;width:8px;height:8px;z-index:-1}.arrow::before{content:"";-webkit-box-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);box-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);-webkit-transform:rotate(45deg);transform:rotate(45deg);background:var(--calcite-ui-foreground-1)}:host([data-popper-placement^=top]) .arrow{bottom:-4px}:host([data-popper-placement^=bottom]) .arrow{top:-4px}:host([data-popper-placement^=left]) .arrow{right:-4px}:host([data-popper-placement^=right]) .arrow{left:-4px}.container{position:relative;background-color:var(--calcite-ui-foreground-1);display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-direction:column;flex-direction:column;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1);padding-top:0.75rem;padding-bottom:0.75rem;padding-left:1rem;padding-right:1rem;overflow:hidden;font-size:var(--calcite-font-size--2);line-height:1.375;border-radius:0.25rem;max-width:20rem;max-height:20rem}.calcite-popper-anim{background-color:var(--calcite-ui-foreground-1);border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3);border-radius:0.25rem}.arrow::before{outline:1px solid var(--calcite-ui-border-3)}';const h=class{constructor(e){t(this,e),this.hoverTimeouts=new WeakMap,this.selector=`[${m}]`,this.queryTooltip=t=>{var e;const{selector:a,el:i}=this,n=null===(e=t.closest(a))||void 0===e?void 0:e.getAttribute(m);return c(i,`#${n}`)},this.clearHoverTimeout=t=>{const{hoverTimeouts:e}=this;e.has(t)&&(window.clearTimeout(e.get(t)),e.delete(t))},this.closeExistingTooltip=()=>{const{tooltipEl:t}=this;t&&this.toggleTooltip(t,!1)},this.focusTooltip=({tooltip:t,value:e})=>{this.closeExistingTooltip(),e&&this.clearHoverTimeout(t),this.toggleTooltip(t,e)},this.toggleTooltip=(t,e)=>{t.open=e,e&&(this.tooltipEl=t)},this.hoverToggle=({tooltip:t,value:e})=>{const{hoverTimeouts:a}=this;a.delete(t),e&&this.closeExistingTooltip(),this.toggleTooltip(t,e)},this.hoverTooltip=({tooltip:t,value:e})=>{this.clearHoverTimeout(t);const{hoverTimeouts:a}=this,i=window.setTimeout((()=>this.hoverToggle({tooltip:t,value:e})),500);a.set(t,i)},this.activeTooltipHover=t=>{const{tooltipEl:e,hoverTimeouts:a}=this;e&&(t.composedPath().includes(e)?this.clearHoverTimeout(e):a.has(e)||this.hoverTooltip({tooltip:e,value:!1}))},this.hoverEvent=(t,e)=>{const a=this.queryTooltip(t.target);this.activeTooltipHover(t),a&&this.hoverTooltip({tooltip:a,value:e})},this.focusEvent=(t,e)=>{const a=this.queryTooltip(t.target);a&&a!==this.clickedTooltip?this.focusTooltip({tooltip:a,value:e}):this.clickedTooltip=null}}render(){return e("slot",null)}keyUpHandler(t){if("Escape"===p(t.key)){const{tooltipEl:t}=this;t&&(this.clearHoverTimeout(t),this.toggleTooltip(t,!1))}}mouseEnterShow(t){this.hoverEvent(t,!0)}mouseLeaveHide(t){this.hoverEvent(t,!1)}clickHandler(t){const e=this.queryTooltip(t.target);this.clickedTooltip=e,e&&this.toggleTooltip(e,!1)}focusShow(t){this.focusEvent(t,!0)}blurHide(t){this.focusEvent(t,!1)}get el(){return i(this)}};h.style="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:block}";export{f as calcite_tooltip,h as calcite_tooltip_manager}