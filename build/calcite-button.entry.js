import { r as registerInstance, k as Build, h, g as getElement } from './index-d836c4a8.js';
import { q as queryElementRoots, d as closestElementCrossShadowBoundary, a as getElementDir, C as CSS_UTILITY } from './dom-35210035.js';
import { c as createObserver } from './observers-93f01172.js';
import './guid-9ad8042d.js';

const CSS = {
  buttonLoader: "calcite-button--loader",
  content: "content",
  contentSlotted: "content--slotted",
  icon: "icon",
  iconStart: "icon--start",
  iconEnd: "icon--end",
  loadingIn: "loading-in",
  loadingOut: "loading-out"
};
const TEXT = {
  loading: "Loading"
};

const calciteButtonCss = "@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:300ms}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:150ms ease-in-out}:host([hidden]){display:none}:host{display:inline-block;width:auto;vertical-align:middle}:host([round]){border-radius:50px}:host([round]) a,:host([round]) button{border-radius:50px}:host button,:host a{outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host button:focus,:host a:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:2px}:host button,:host a{--calcite-button-content-margin:0.5rem;--calcite-button-padding-x:7px;--calcite-button-padding-y:3px;padding:var(--calcite-button-padding-y) var(--calcite-button-padding-x) var(--calcite-button-padding-y) var(--calcite-button-padding-x);position:relative;display:flex;align-items:center;justify-content:center;text-decoration:none;width:100%;height:100%;border-radius:0;border-style:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;text-align:center;box-sizing:border-box;font-family:inherit;font-weight:var(--calcite-font-weight-normal);transition:color 0.15s ease-in-out, background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}:host button:hover,:host a:hover{text-decoration:none}.content{display:flex;flex-basis:auto;margin-left:var(--calcite-button-content-margin);margin-right:var(--calcite-button-content-margin)}:host([scale=m]) button,:host([scale=m]) a{--calcite-button-content-margin:0.75rem}:host([scale=l]) button,:host([scale=l]) a{--calcite-button-content-margin:1rem}:host(:not([icon-start])) .content{margin-left:unset}:host(:not([icon-end])) .content{margin-right:unset}:host([icon-start]:not([icon-end])) .calcite--rtl .content{margin-left:unset;margin-right:var(--calcite-button-content-margin)}:host([icon-end]:not([icon-start])) .calcite--rtl .content{margin-right:unset;margin-left:var(--calcite-button-content-margin)}:host([width=auto]){width:auto}:host([width=half]){width:50%}:host([width=full]){width:100%}:host([alignment=center]:not([width=auto])) a,:host([alignment=center]:not([width=auto])) button{justify-content:center}:host([alignment=start]:not([width=auto])) a,:host([alignment=start]:not([width=auto])) button{justify-content:flex-start}:host([alignment=end]:not([width=auto])) a,:host([alignment=end]:not([width=auto])) button{justify-content:flex-end}:host([alignment*=space-between]:not([width=auto])) a,:host([alignment*=space-between]:not([width=auto])) button{justify-content:space-between}:host([alignment=icon-start-space-between]:not([width=auto])) .icon--start{margin-right:auto}:host([alignment=icon-start-space-between]:not([width=auto])) a,:host([alignment=icon-start-space-between]:not([width=auto])) button{text-align:unset}:host([alignment=icon-end-space-between]:not([width=auto])) .icon--end{margin-left:auto}:host([alignment=icon-end-space-between]:not([width=auto])) a,:host([alignment=icon-end-space-between]:not([width=auto])) button{text-align:unset}:host([alignment=icon-start-space-between]:not([width=auto])) .calcite--rtl .icon--start{margin-right:unset;margin-left:auto}:host([alignment=icon-end-space-between]:not([width=auto])) .calcite--rtl .icon--end{margin-left:unset;margin-right:auto}:host([alignment=center]) a:not(.content--slotted) .icon--start+.icon--end,:host([alignment=center]) button:not(.content--slotted) .icon--start+.icon--end{margin-left:var(--calcite-button-content-margin)}:host([alignment=center]) a.calcite--rtl:not(.content--slotted) .icon--start+.icon--end,:host([alignment=center]) button.calcite--rtl:not(.content--slotted) .icon--start+.icon--end{margin-left:unset;margin-right:var(--calcite-button-content-margin)}.icon{display:inline-flex;position:relative;margin:0;font-weight:var(--calcite-font-weight-normal);line-height:inherit}:host([loading]),:host([disabled]){pointer-events:none}:host([loading]) button,:host([loading]) a,:host([disabled]) button,:host([disabled]) a{pointer-events:none;opacity:var(--calcite-ui-opacity-disabled)}@-webkit-keyframes loader-in{0%{width:0;opacity:0;transform:scale(0.5)}100%{width:1em;opacity:1;transform:scale(1)}}@keyframes loader-in{0%{width:0;opacity:0;transform:scale(0.5)}100%{width:1em;opacity:1;transform:scale(1)}}@-webkit-keyframes loader-out{0%{width:1em;opacity:1;transform:scale(1)}100%{width:0;opacity:0;transform:scale(0.5)}}@keyframes loader-out{0%{width:1em;opacity:1;transform:scale(1)}100%{width:0;opacity:0;transform:scale(0.5)}}.calcite-button--loader{display:flex}.calcite-button--loader calcite-loader{margin:0;transition:width 300ms ease-in-out, opacity 300ms ease-in-out, transform 300ms ease-in-out}.calcite-button--loader calcite-loader.loading-in{-webkit-animation-name:loader-in;animation-name:loader-in;-webkit-animation-duration:310ms;animation-duration:310ms}.calcite-button--loader calcite-loader.loading-out{-webkit-animation-name:loader-out;animation-name:loader-out;-webkit-animation-duration:310ms;animation-duration:310ms}:host([loading]) button.content--slotted .calcite-button--loader calcite-loader,:host([loading]) a.content--slotted .calcite-button--loader calcite-loader{-webkit-margin-end:var(--calcite-button-content-margin);margin-inline-end:var(--calcite-button-content-margin)}:host([loading]) button:not(.content--slotted) .icon--start,:host([loading]) button:not(.content--slotted) .icon--end,:host([loading]) a:not(.content--slotted) .icon--start,:host([loading]) a:not(.content--slotted) .icon--end{display:none}:host([appearance=solid]) button,:host([appearance=solid]) a{border-width:1px;border-style:solid;border-color:transparent}:host([appearance=solid][color=blue]) button,:host([appearance=solid][color=blue]) a{color:var(--calcite-ui-text-inverse);background-color:var(--calcite-ui-brand)}:host([appearance=solid][color=blue]) button:hover,:host([appearance=solid][color=blue]) button:focus,:host([appearance=solid][color=blue]) a:hover,:host([appearance=solid][color=blue]) a:focus{background-color:var(--calcite-ui-brand-hover)}:host([appearance=solid][color=blue]) button:active,:host([appearance=solid][color=blue]) a:active{background-color:var(--calcite-ui-brand-press)}:host([appearance=solid][color=blue]) button calcite-loader,:host([appearance=solid][color=blue]) a calcite-loader{color:var(--calcite-ui-text-inverse)}:host([appearance=solid][color=red]) button,:host([appearance=solid][color=red]) a{color:var(--calcite-ui-text-inverse);background-color:var(--calcite-ui-danger)}:host([appearance=solid][color=red]) button:hover,:host([appearance=solid][color=red]) button:focus,:host([appearance=solid][color=red]) a:hover,:host([appearance=solid][color=red]) a:focus{background-color:var(--calcite-ui-danger-hover)}:host([appearance=solid][color=red]) button:active,:host([appearance=solid][color=red]) a:active{background-color:var(--calcite-ui-danger-press)}:host([appearance=solid][color=red]) button calcite-loader,:host([appearance=solid][color=red]) a calcite-loader{color:var(--calcite-ui-text-inverse)}:host([appearance=solid][color=neutral]) button,:host([appearance=solid][color=neutral]) a{color:var(--calcite-ui-text-1);background-color:var(--calcite-ui-foreground-3)}:host([appearance=solid][color=neutral]) button:hover,:host([appearance=solid][color=neutral]) button:focus,:host([appearance=solid][color=neutral]) a:hover,:host([appearance=solid][color=neutral]) a:focus{background-color:var(--calcite-ui-foreground-2)}:host([appearance=solid][color=neutral]) button:active,:host([appearance=solid][color=neutral]) a:active{background-color:var(--calcite-ui-foreground-1)}:host([appearance=solid][color=neutral]) button calcite-loader,:host([appearance=solid][color=neutral]) a calcite-loader{color:var(--calcite-ui-text-1)}:host([appearance=solid][color=inverse]) button,:host([appearance=solid][color=inverse]) a{color:var(--calcite-ui-text-inverse);background-color:var(--calcite-ui-inverse)}:host([appearance=solid][color=inverse]) button:hover,:host([appearance=solid][color=inverse]) button:focus,:host([appearance=solid][color=inverse]) a:hover,:host([appearance=solid][color=inverse]) a:focus{background-color:var(--calcite-ui-inverse-hover)}:host([appearance=solid][color=inverse]) button:active,:host([appearance=solid][color=inverse]) a:active{background-color:var(--calcite-ui-inverse-press)}:host([appearance=solid][color=inverse]) button calcite-loader,:host([appearance=solid][color=inverse]) a calcite-loader{color:var(--calcite-ui-text-inverse)}:host([appearance=outline]) button,:host([appearance=outline]) a{background-color:var(--calcite-ui-foreground-1);border-width:1px;border-style:solid;box-shadow:inset 0 0 0 1px transparent}:host([appearance=outline][color=blue]) button,:host([appearance=outline][color=blue]) a{border-color:var(--calcite-ui-brand);color:var(--calcite-ui-brand)}:host([appearance=outline][color=blue]) button:hover,:host([appearance=outline][color=blue]) a:hover{border-color:var(--calcite-ui-brand-hover);color:var(--calcite-ui-brand-hover);box-shadow:inset 0 0 0 1px var(--calcite-ui-brand-hover)}:host([appearance=outline][color=blue]) button:focus,:host([appearance=outline][color=blue]) a:focus{border-color:var(--calcite-ui-brand);color:var(--calcite-ui-brand);box-shadow:inset 0 0 0 2px var(--calcite-ui-brand)}:host([appearance=outline][color=blue]) button:active,:host([appearance=outline][color=blue]) a:active{border-color:var(--calcite-ui-brand-press);color:var(--calcite-ui-brand-press);box-shadow:inset 0 0 0 2px var(--calcite-ui-brand-press)}:host([appearance=outline][color=blue]) button calcite-loader,:host([appearance=outline][color=blue]) a calcite-loader{color:var(--calcite-ui-brand)}:host([appearance=outline][color=red]) button,:host([appearance=outline][color=red]) a{border-color:var(--calcite-ui-danger);color:var(--calcite-ui-danger)}:host([appearance=outline][color=red]) button:hover,:host([appearance=outline][color=red]) a:hover{border-color:var(--calcite-ui-danger-hover);color:var(--calcite-ui-danger-hover);box-shadow:inset 0 0 0 1px var(--calcite-ui-danger-hover)}:host([appearance=outline][color=red]) button:focus,:host([appearance=outline][color=red]) a:focus{border-color:var(--calcite-ui-danger);color:var(--calcite-ui-danger);box-shadow:inset 0 0 0 2px var(--calcite-ui-danger)}:host([appearance=outline][color=red]) button:active,:host([appearance=outline][color=red]) a:active{border-color:var(--calcite-ui-danger-press);color:var(--calcite-ui-danger-press);box-shadow:inset 0 0 0 2px var(--calcite-ui-danger-press)}:host([appearance=outline][color=red]) button calcite-loader,:host([appearance=outline][color=red]) a calcite-loader{color:var(--calcite-ui-danger)}:host([appearance=outline][color=neutral]) button,:host([appearance=outline][color=neutral]) a{color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-foreground-3)}:host([appearance=outline][color=neutral]) button:hover,:host([appearance=outline][color=neutral]) a:hover{box-shadow:inset 0 0 0 1px var(--calcite-ui-foreground-3)}:host([appearance=outline][color=neutral]) button:focus,:host([appearance=outline][color=neutral]) a:focus{box-shadow:inset 0 0 0 2px var(--calcite-ui-foreground-3)}:host([appearance=outline][color=neutral]) button:active,:host([appearance=outline][color=neutral]) a:active{box-shadow:inset 0 0 0 2px var(--calcite-ui-foreground-3)}:host([appearance=outline][color=neutral]) button calcite-loader,:host([appearance=outline][color=neutral]) a calcite-loader{color:var(--calcite-ui-text-1)}:host([appearance=outline][color=inverse]) button,:host([appearance=outline][color=inverse]) a{color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-inverse)}:host([appearance=outline][color=inverse]) button:hover,:host([appearance=outline][color=inverse]) a:hover{border-color:var(--calcite-ui-inverse-hover);box-shadow:inset 0 0 0 1px var(--calcite-ui-inverse-hover)}:host([appearance=outline][color=inverse]) button:focus,:host([appearance=outline][color=inverse]) a:focus{border-color:var(--calcite-ui-inverse);box-shadow:inset 0 0 0 2px var(--calcite-ui-inverse)}:host([appearance=outline][color=inverse]) button:active,:host([appearance=outline][color=inverse]) a:active{border-color:var(--calcite-ui-inverse-press);box-shadow:inset 0 0 0 2px var(--calcite-ui-inverse-press)}:host([appearance=outline][color=inverse]) button calcite-loader,:host([appearance=outline][color=inverse]) a calcite-loader{color:var(--calcite-ui-text-1)}:host([appearance=clear]) button,:host([appearance=clear]) a{background-color:transparent;border-width:1px;border-style:solid;box-shadow:inset 0 0 0 1px transparent}:host([appearance=clear][color=blue]) button,:host([appearance=clear][color=blue]) a{border-color:var(--calcite-ui-brand);color:var(--calcite-ui-brand)}:host([appearance=clear][color=blue]) button:hover,:host([appearance=clear][color=blue]) a:hover{border-color:var(--calcite-ui-brand-hover);color:var(--calcite-ui-brand-hover);box-shadow:inset 0 0 0 1px var(--calcite-ui-brand-hover)}:host([appearance=clear][color=blue]) button:focus,:host([appearance=clear][color=blue]) a:focus{border-color:var(--calcite-ui-brand);color:var(--calcite-ui-brand);box-shadow:inset 0 0 0 2px var(--calcite-ui-brand)}:host([appearance=clear][color=blue]) button:active,:host([appearance=clear][color=blue]) a:active{border-color:var(--calcite-ui-brand-press);color:var(--calcite-ui-brand-press);box-shadow:inset 0 0 0 2px var(--calcite-ui-brand-press)}:host([appearance=clear][color=blue]) button calcite-loader,:host([appearance=clear][color=blue]) a calcite-loader{color:var(--calcite-ui-brand)}:host([appearance=clear][color=red]) button,:host([appearance=clear][color=red]) a{border-color:var(--calcite-ui-danger);color:var(--calcite-ui-danger)}:host([appearance=clear][color=red]) button:hover,:host([appearance=clear][color=red]) a:hover{border-color:var(--calcite-ui-danger-hover);color:var(--calcite-ui-danger-hover);box-shadow:inset 0 0 0 1px var(--calcite-ui-danger-hover)}:host([appearance=clear][color=red]) button:focus,:host([appearance=clear][color=red]) a:focus{border-color:var(--calcite-ui-danger);color:var(--calcite-ui-danger);box-shadow:inset 0 0 0 2px var(--calcite-ui-danger)}:host([appearance=clear][color=red]) button:active,:host([appearance=clear][color=red]) a:active{border-color:var(--calcite-ui-danger-press);color:var(--calcite-ui-danger-press);box-shadow:inset 0 0 0 2px var(--calcite-ui-danger-press)}:host([appearance=clear][color=red]) button calcite-loader,:host([appearance=clear][color=red]) a calcite-loader{color:var(--calcite-ui-danger)}:host([appearance=clear][color=neutral]) button,:host([appearance=clear][color=neutral]) a{color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-foreground-3)}:host([appearance=clear][color=neutral]) button:hover,:host([appearance=clear][color=neutral]) a:hover{box-shadow:inset 0 0 0 1px var(--calcite-ui-foreground-3)}:host([appearance=clear][color=neutral]) button:focus,:host([appearance=clear][color=neutral]) a:focus{box-shadow:inset 0 0 0 2px var(--calcite-ui-foreground-3)}:host([appearance=clear][color=neutral]) button:active,:host([appearance=clear][color=neutral]) a:active{box-shadow:inset 0 0 0 2px var(--calcite-ui-foreground-3)}:host([appearance=clear][color=neutral]) button calcite-loader,:host([appearance=clear][color=neutral]) a calcite-loader{color:var(--calcite-ui-text-1)}:host([appearance=clear][color=inverse]) button,:host([appearance=clear][color=inverse]) a{color:var(--calcite-ui-text-1);border-color:var(--calcite-ui-inverse)}:host([appearance=clear][color=inverse]) button:hover,:host([appearance=clear][color=inverse]) a:hover{border-color:var(--calcite-ui-inverse-hover);box-shadow:inset 0 0 0 1px var(--calcite-ui-inverse-hover)}:host([appearance=clear][color=inverse]) button:focus,:host([appearance=clear][color=inverse]) a:focus{border-color:var(--calcite-ui-inverse);box-shadow:inset 0 0 0 2px var(--calcite-ui-inverse)}:host([appearance=clear][color=inverse]) button:active,:host([appearance=clear][color=inverse]) a:active{border-color:var(--calcite-ui-inverse-press);box-shadow:inset 0 0 0 2px var(--calcite-ui-inverse-press)}:host([appearance=clear][color=inverse]) button calcite-loader,:host([appearance=clear][color=inverse]) a calcite-loader{color:var(--calcite-ui-text-1)}:host([appearance=outline][split-child=primary]) button,:host([appearance=clear][split-child=primary]) button{border-right-width:0;border-left-width:1px}:host([appearance=outline][split-child=primary]) button.calcite--rtl,:host([appearance=clear][split-child=primary]) button.calcite--rtl{border-left-width:0;border-right-width:1px}:host([appearance=outline][split-child=secondary]) button,:host([appearance=clear][split-child=secondary]) button{border-left-width:0;border-right-width:1px}:host([appearance=outline][split-child=secondary]) button.calcite--rtl,:host([appearance=clear][split-child=secondary]) button.calcite--rtl{border-right-width:0;border-left-width:1px}:host([appearance=transparent]:not(.calcite-inline-editable__enable-editing-button)) button,:host([appearance=transparent]:not(.calcite-inline-editable__enable-editing-button)) a{background-color:transparent}:host([appearance=transparent]:not(.calcite-inline-editable__enable-editing-button)) button:hover,:host([appearance=transparent]:not(.calcite-inline-editable__enable-editing-button)) button:focus,:host([appearance=transparent]:not(.calcite-inline-editable__enable-editing-button)) a:hover,:host([appearance=transparent]:not(.calcite-inline-editable__enable-editing-button)) a:focus{background-color:var(--calcite-button-transparent-hover)}:host([appearance=transparent]:not(.calcite-inline-editable__enable-editing-button)) button:active,:host([appearance=transparent]:not(.calcite-inline-editable__enable-editing-button)) a:active{background-color:var(--calcite-button-transparent-press)}:host([appearance=transparent][color=blue]) button,:host([appearance=transparent][color=blue]) a{color:var(--calcite-ui-brand)}:host([appearance=transparent][color=blue]) button:hover,:host([appearance=transparent][color=blue]) a:hover{color:var(--calcite-ui-brand-hover)}:host([appearance=transparent][color=blue]) button:focus,:host([appearance=transparent][color=blue]) a:focus{color:var(--calcite-ui-brand)}:host([appearance=transparent][color=blue]) button:active,:host([appearance=transparent][color=blue]) a:active{color:var(--calcite-ui-brand-press)}:host([appearance=transparent][color=blue]) button calcite-loader,:host([appearance=transparent][color=blue]) a calcite-loader{color:var(--calcite-ui-brand)}:host([appearance=transparent][color=red]) button,:host([appearance=transparent][color=red]) a{color:var(--calcite-ui-danger)}:host([appearance=transparent][color=red]) button:hover,:host([appearance=transparent][color=red]) a:hover{color:var(--calcite-ui-danger-hover)}:host([appearance=transparent][color=red]) button:focus,:host([appearance=transparent][color=red]) a:focus{color:var(--calcite-ui-danger)}:host([appearance=transparent][color=red]) button:active,:host([appearance=transparent][color=red]) a:active{color:var(--calcite-ui-danger-press)}:host([appearance=transparent][color=red]) button calcite-loader,:host([appearance=transparent][color=red]) a calcite-loader{color:var(--calcite-ui-danger)}:host([appearance=transparent][color=neutral]:not(.calcite-inline-editable__cancel-editing-button)) button,:host([appearance=transparent][color=neutral]:not(.calcite-inline-editable__cancel-editing-button)) a,:host([appearance=transparent][color=neutral]:not(.calcite-inline-editable__cancel-editing-button)) calcite-loader{color:var(--calcite-ui-text-1)}:host([appearance=transparent][color=neutral].calcite-inline-editable__cancel-editing-button) button{color:var(--calcite-ui-text-3);border-top-width:1px;border-top-color:var(--calcite-ui-border-input);border-bottom-width:1px;border-bottom-color:var(--calcite-ui-border-input);border-bottom-style:solid;border-top-style:solid}:host([appearance=transparent][color=neutral].calcite-inline-editable__cancel-editing-button) button:not(.content--slotted){--calcite-button-padding-y:0}:host([appearance=transparent][color=neutral].calcite-inline-editable__cancel-editing-button) button:hover{color:var(--calcite-ui-text-1)}:host([appearance=transparent][color=neutral].calcite-inline-editable__enable-editing-button) button{background-color:transparent}:host([appearance=transparent][color=inverse]) button,:host([appearance=transparent][color=inverse]) a,:host([appearance=transparent][color=inverse]) calcite-loader{color:var(--calcite-ui-text-inverse)}:host([scale=s]) button.content--slotted,:host([scale=s]) a.content--slotted{font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s][appearance=transparent]) button.content--slotted,:host([scale=s][appearance=transparent]) a.content--slotted{--calcite-button-padding-x:0.5rem;--calcite-button-padding-y:0.25rem}:host([scale=m]) button.content--slotted,:host([scale=m]) a.content--slotted{--calcite-button-padding-x:11px;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]:not([appearance=transparent])) button.content--slotted,:host([scale=m]:not([appearance=transparent])) a.content--slotted{--calcite-button-padding-y:7px}:host([scale=m][appearance=transparent]) button.content--slotted,:host([scale=m][appearance=transparent]) a.content--slotted{--calcite-button-padding-x:0.75rem;--calcite-button-padding-y:0.5rem}:host([scale=l]) button.content--slotted,:host([scale=l]) a.content--slotted{--calcite-button-padding-x:15px;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]:not([appearance=transparent])) button.content--slotted,:host([scale=l]:not([appearance=transparent])) a.content--slotted{--calcite-button-padding-y:11px}:host([scale=l][appearance=transparent]) button.content--slotted,:host([scale=l][appearance=transparent]) a.content--slotted{--calcite-button-padding-x:1rem;--calcite-button-padding-y:0.75rem}:host([scale=s]) button:not(.content--slotted),:host([scale=s]) a:not(.content--slotted){--calcite-button-padding-x:0.125rem;--calcite-button-padding-y:3px;font-size:var(--calcite-font-size-0);line-height:1.25rem;width:1.5rem;min-height:1.5rem}:host([scale=s][appearance=transparent]) button:not(.content--slotted),:host([scale=s][appearance=transparent]) a:not(.content--slotted){--calcite-button-padding-y:0.25rem}:host([scale=m]) button:not(.content--slotted),:host([scale=m]) a:not(.content--slotted){--calcite-button-padding-x:0.125rem;--calcite-button-padding-y:7px;font-size:var(--calcite-font-size-0);line-height:1.25rem;width:2rem;min-height:2rem}:host([scale=m][appearance=transparent]) button:not(.content--slotted),:host([scale=m][appearance=transparent]) a:not(.content--slotted){--calcite-button-padding-y:0.5rem}:host([scale=l]) button:not(.content--slotted),:host([scale=l]) a:not(.content--slotted){--calcite-button-padding-x:0.125rem;--calcite-button-padding-y:9px;font-size:var(--calcite-font-size-0);line-height:1.25rem;width:2.75rem;min-height:2.75rem}:host([scale=l][appearance=transparent]) button:not(.content--slotted),:host([scale=l][appearance=transparent]) a:not(.content--slotted){--calcite-button-padding-y:0.625rem}:host([scale=s][icon-start][icon-end]) button:not(.content--slotted),:host([scale=s][icon-start][icon-end]) a:not(.content--slotted){--calcite-button-padding-x:23px;font-size:var(--calcite-font-size-0);line-height:1.25rem;height:1.5rem}:host([scale=s][icon-start][icon-end][appearance=transparent]) button:not(.content--slotted),:host([scale=s][icon-start][icon-end][appearance=transparent]) a:not(.content--slotted){--calcite-button-padding-x:1.5rem}:host([scale=m][icon-start][icon-end]) button:not(.content--slotted),:host([scale=m][icon-start][icon-end]) a:not(.content--slotted){--calcite-button-padding-x:2rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;height:2rem}:host([scale=m][icon-start][icon-end][appearance=transparent]) button:not(.content--slotted),:host([scale=m][icon-start][icon-end][appearance=transparent]) a:not(.content--slotted){--calcite-button-padding-x:33px}:host([scale=l][icon-start][icon-end]) button:not(.content--slotted),:host([scale=l][icon-start][icon-end]) a:not(.content--slotted){--calcite-button-padding-x:43px;font-size:var(--calcite-font-size-0);line-height:1.25rem;height:2.75rem}:host([scale=l][icon-start][icon-end]) button:not(.content--slotted) .icon--start+.icon--end,:host([scale=l][icon-start][icon-end]) a:not(.content--slotted) .icon--start+.icon--end{-webkit-margin-start:1rem;margin-inline-start:1rem}:host([scale=l][icon-start][icon-end][appearance=transparent]) button:not(.content--slotted),:host([scale=l][icon-start][icon-end][appearance=transparent]) a:not(.content--slotted){--calcite-button-padding-x:2.75rem}";

const CalciteButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** optionally specify alignment of button elements. */
    this.alignment = "center";
    /** specify the appearance style of the button, defaults to solid. */
    this.appearance = "solid";
    /** specify the color of the button, defaults to blue */
    this.color = "blue";
    /** is the button disabled  */
    this.disabled = false;
    /** string to override English loading text
     * @default "Loading"
     */
    this.intlLoading = TEXT.loading;
    /** optionally add a calcite-loader component to the button, disabling interaction.  */
    this.loading = false;
    /** optionally add a round style to the button  */
    this.round = false;
    /** specify the scale of the button, defaults to m */
    this.scale = "m";
    /** is the button a child of a calcite-split-button */
    this.splitChild = false;
    /** specify the width of the button, defaults to auto */
    this.width = "auto";
    //--------------------------------------------------------------------------
    //
    //  Private State/Props
    //
    //--------------------------------------------------------------------------
    /** watches for changing text content **/
    this.mutationObserver = createObserver("mutation", () => this.updateHasContent());
    /** the node type of the rendered child element */
    this.childElType = "button";
    /** determine if there is slotted content for styling purposes */
    this.hasContent = false;
    /** determine if loader present for styling purposes */
    this.hasLoader = false;
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    // act on a requested or nearby form based on type
    this.handleClick = (e) => {
      const { childElType, form, el, type } = this;
      // this.type refers to type attribute, not child element type
      if (childElType === "button" && type !== "button") {
        const targetForm = form
          ? queryElementRoots(el, `#${form}`)
          : closestElementCrossShadowBoundary(el, "form");
        if (targetForm) {
          const targetFormSubmitFunction = targetForm.onsubmit;
          switch (type) {
            case "submit":
              if (targetFormSubmitFunction) {
                targetFormSubmitFunction();
              }
              else if (targetForm.checkValidity()) {
                targetForm.submit();
              }
              else {
                targetForm.reportValidity();
              }
              break;
            case "reset":
              targetForm.reset();
              break;
          }
        }
        e.preventDefault();
      }
    };
  }
  loadingChanged(newValue, oldValue) {
    if (!!newValue && !oldValue) {
      this.hasLoader = true;
    }
    if (!newValue && !!oldValue) {
      window.setTimeout(() => {
        this.hasLoader = false;
      }, 300);
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.childElType = this.href ? "a" : "button";
    this.hasLoader = this.loading;
    this.setupTextContentObserver();
  }
  disconnectedCallback() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  componentWillLoad() {
    if (Build.isBrowser) {
      this.updateHasContent();
      if (this.childElType === "button" && !this.type) {
        this.type = "submit";
      }
    }
  }
  render() {
    const dir = getElementDir(this.el);
    const Tag = this.childElType;
    const loader = (h("div", { class: CSS.buttonLoader }, this.hasLoader ? (h("calcite-loader", { active: true, class: this.loading ? CSS.loadingIn : CSS.loadingOut, inline: true, label: this.intlLoading, scale: "m" })) : null));
    const iconStartEl = (h("calcite-icon", { class: { [CSS.icon]: true, [CSS.iconStart]: true }, flipRtl: this.iconFlipRtl === "start" || this.iconFlipRtl === "both", icon: this.iconStart, scale: "s" }));
    const iconEndEl = (h("calcite-icon", { class: { [CSS.icon]: true, [CSS.iconEnd]: true }, flipRtl: this.iconFlipRtl === "end" || this.iconFlipRtl === "both", icon: this.iconEnd, scale: "s" }));
    const contentEl = (h("span", { class: CSS.content }, h("slot", null)));
    return (h(Tag, { "aria-label": this.label, class: { [CSS_UTILITY.rtl]: dir === "rtl", [CSS.contentSlotted]: this.hasContent }, disabled: this.disabled || this.loading, href: this.childElType === "a" && this.href, name: this.childElType === "button" && this.name, onClick: this.handleClick, ref: (el) => (this.childEl = el), rel: this.childElType === "a" && this.rel, tabIndex: this.disabled || this.loading ? -1 : null, target: this.childElType === "a" && this.target, type: this.childElType === "button" && this.type }, loader, this.iconStart ? iconStartEl : null, this.hasContent ? contentEl : null, this.iconEnd ? iconEndEl : null));
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    this.childEl.focus();
  }
  updateHasContent() {
    var _a, _b;
    const slottedContent = this.el.textContent.trim().length > 0 || this.el.childNodes.length > 0;
    this.hasContent =
      this.el.childNodes.length === 1 && ((_a = this.el.childNodes[0]) === null || _a === void 0 ? void 0 : _a.nodeName) === "#text"
        ? ((_b = this.el.textContent) === null || _b === void 0 ? void 0 : _b.trim().length) > 0
        : slottedContent;
  }
  setupTextContentObserver() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "loading": ["loadingChanged"]
  }; }
};
CalciteButton.style = calciteButtonCss;

export { CalciteButton as calcite_button };
