var __extends=this&&this.__extends||function(){var e=function(t,r){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)if(Object.prototype.hasOwnProperty.call(t,r))e[r]=t[r]};return e(t,r)};return function(t,r){if(typeof r!=="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");e(t,r);function n(){this.constructor=t}t.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}();var __awaiter=this&&this.__awaiter||function(e,t,r,n){function a(e){return e instanceof r?e:new r((function(t){t(e)}))}return new(r||(r=Promise))((function(r,i){function l(e){try{$(n.next(e))}catch(e){i(e)}}function o(e){try{$(n["throw"](e))}catch(e){i(e)}}function $(e){e.done?r(e.value):a(e.value).then(l,o)}$((n=n.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var r={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},n,a,i,l;return l={next:o(0),throw:o(1),return:o(2)},typeof Symbol==="function"&&(l[Symbol.iterator]=function(){return this}),l;function o(e){return function(t){return $([e,t])}}function $(l){if(n)throw new TypeError("Generator is already executing.");while(r)try{if(n=1,a&&(i=l[0]&2?a["return"]:l[0]?a["throw"]||((i=a["return"])&&i.call(a),0):a.next)&&!(i=i.call(a,l[1])).done)return i;if(a=0,i)l=[l[0]&2,i.value];switch(l[0]){case 0:case 1:i=l;break;case 4:r.label++;return{value:l[1],done:false};case 5:r.label++;a=l[1];l=[0];continue;case 7:l=r.ops.pop();r.trys.pop();continue;default:if(!(i=r.trys,i=i.length>0&&i[i.length-1])&&(l[0]===6||l[0]===2)){r=0;continue}if(l[0]===3&&(!i||l[1]>i[0]&&l[1]<i[3])){r.label=l[1];break}if(l[0]===6&&r.label<i[1]){r.label=i[1];i=l;break}if(i&&r.label<i[2]){r.label=i[2];r.ops.push(l);break}if(i[2])r.ops.pop();r.trys.pop();continue}l=t.call(e,r)}catch(e){l=[6,e];a=0}finally{n=i=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:true}}};var __spreadArray=this&&this.__spreadArray||function(e,t){for(var r=0,n=t.length,a=e.length;r<n;r++,a++)e[a]=t[r];return e};System.register([],(function(e,t){"use strict";return{execute:function(){var r=this;var n=e("N","calcite");var a;var i;var l;var o=false;var $=false;var s=false;var f=false;var u=false;var c=typeof window!=="undefined"?window:{};var v=e("d",c.document||{head:{}});var d={$flags$:0,$resourcesUrl$:"",jmp:function(e){return e()},raf:function(e){return requestAnimationFrame(e)},ael:function(e,t,r,n){return e.addEventListener(t,r,n)},rel:function(e,t,r,n){return e.removeEventListener(t,r,n)},ce:function(e,t){return new CustomEvent(e,t)}};var h=true;var m=e("p",(function(e){return Promise.resolve(e)}));var p=function(){try{new CSSStyleSheet;return typeof(new CSSStyleSheet).replace==="function"}catch(e){}return false}();var g=function(e,t,r,n){if(r){r.map((function(r){var n=r[0],a=r[1],i=r[2];var l=b(e,n);var o=y(t,i);var $=w(n);d.ael(l,a,o,$);(t.$rmListeners$=t.$rmListeners$||[]).push((function(){return d.rel(l,a,o,$)}))}))}};var y=function(e,t){return function(r){try{{if(e.$flags$&256){e.$lazyInstance$[t](r)}else{(e.$queuedListeners$=e.$queuedListeners$||[]).push([t,r])}}}catch(e){Qe(e)}}};var b=function(e,t){if(t&4)return v;if(t&8)return c;if(t&16)return v.body;return e};var w=function(e){return(e&2)!==0};var N="r";var R="o";var x="s";var S="t";var k="s-id";var _="sty-id";var T="c-id";var L="{visibility:hidden}[calcite-hydrated]{visibility:inherit}";var C="http://www.w3.org/1999/xlink";var A=function(e,t){if(t===void 0){t=""}{return function(){return}}};var E=function(e,t){{return function(){return}}};var I=new WeakMap;var j=function(e,t,r){var n=Ze.get(e);if(p&&r){n=n||new CSSStyleSheet;n.replace(t)}else{n=t}Ze.set(e,n)};var M=function(e,t,r,n){var a=O(t);var i=Ze.get(a);e=e.nodeType===11?e:v;if(i){if(typeof i==="string"){e=e.head||e;var l=I.get(e);var o=void 0;if(!l){I.set(e,l=new Set)}if(!l.has(a)){if(e.host&&(o=e.querySelector("["+_+'="'+a+'"]'))){o.innerHTML=i}else{{o=v.createElement("style");o.innerHTML=i}e.insertBefore(o,e.querySelector("link"))}if(l){l.add(a)}}}else if(!e.adoptedStyleSheets.includes(i)){e.adoptedStyleSheets=__spreadArray(__spreadArray([],e.adoptedStyleSheets),[i])}}return a};var P=function(e){var t=e.$cmpMeta$;var r=e.$hostElement$;var n=t.$flags$;var a=A("attachStyles",t.$tagName$);var i=M(r.shadowRoot?r.shadowRoot:r.getRootNode(),t);if(n&10){r["s-sc"]=i;r.classList.add(i+"-h");if(n&2){r.classList.add(i+"-s")}}a()};var O=function(e,t){return"sc-"+e.$tagName$};var B=function(e){return e.replace(/\/\*!@([^\/]+)\*\/[^\{]+\{/g,"$1{")};var U={};var z="http://www.w3.org/2000/svg";var q="http://www.w3.org/1999/xhtml";var V=function(e){return e!=null};var H=function(e){e=typeof e;return e==="object"||e==="function"};var W=e("h",(function(e,t){var r=[];for(var n=2;n<arguments.length;n++){r[n-2]=arguments[n]}var a=null;var i=null;var l=null;var o=false;var $=false;var s=[];var f=function(t){for(var r=0;r<t.length;r++){a=t[r];if(Array.isArray(a)){f(a)}else if(a!=null&&typeof a!=="boolean"){if(o=typeof e!=="function"&&!H(a)){a=String(a)}if(o&&$){s[s.length-1].$text$+=a}else{s.push(o?D(null,a):a)}$=o}}};f(r);if(t){if(t.key){i=t.key}if(t.name){l=t.name}{var u=t.className||t.class;if(u){t.class=typeof u!=="object"?u:Object.keys(u).filter((function(e){return u[e]})).join(" ")}}}if(typeof e==="function"){return e(t===null?{}:t,s,J)}var c=D(e,null);c.$attrs$=t;if(s.length>0){c.$children$=s}{c.$key$=i}{c.$name$=l}return c}));var D=function(e,t){var r={$flags$:0,$tag$:e,$text$:t,$elm$:null,$children$:null};{r.$attrs$=null}{r.$key$=null}{r.$name$=null}return r};var F=e("H",{});var G=function(e){return e&&e.$tag$===F};var J={forEach:function(e,t){return e.map(K).forEach(t)},map:function(e,t){return e.map(K).map(t).map(Q)}};var K=function(e){return{vattrs:e.$attrs$,vchildren:e.$children$,vkey:e.$key$,vname:e.$name$,vtag:e.$tag$,vtext:e.$text$}};var Q=function(e){if(typeof e.vtag==="function"){var t=Object.assign({},e.vattrs);if(e.vkey){t.key=e.vkey}if(e.vname){t.name=e.vname}return W.apply(void 0,__spreadArray([e.vtag,t],e.vchildren||[]))}var r=D(e.vtag,e.vtext);r.$attrs$=e.vattrs;r.$children$=e.vchildren;r.$key$=e.vkey;r.$name$=e.vname;return r};var X=function(e,t,r,n,a,i){if(r!==n){var l=Ke(e,t);var o=t.toLowerCase();if(t==="class"){var $=e.classList;var s=Z(r);var f=Z(n);$.remove.apply($,s.filter((function(e){return e&&!f.includes(e)})));$.add.apply($,f.filter((function(e){return e&&!s.includes(e)})))}else if(t==="style"){{for(var u in r){if(!n||n[u]==null){if(u.includes("-")){e.style.removeProperty(u)}else{e.style[u]=""}}}}for(var u in n){if(!r||n[u]!==r[u]){if(u.includes("-")){e.style.setProperty(u,n[u])}else{e.style[u]=n[u]}}}}else if(t==="key");else if(t==="ref"){if(n){n(e)}}else if(!l&&t[0]==="o"&&t[1]==="n"){if(t[2]==="-"){t=t.slice(3)}else if(Ke(c,o)){t=o.slice(2)}else{t=o[2]+t.slice(3)}if(r){d.rel(e,t,r,false)}if(n){d.ael(e,t,n,false)}}else{var v=H(n);if((l||v&&n!==null)&&!a){try{if(!e.tagName.includes("-")){var h=n==null?"":n;if(t==="list"){l=false}else if(r==null||e[t]!=h){e[t]=h}}else{e[t]=n}}catch(e){}}var m=false;{if(o!==(o=o.replace(/^xlink\:?/,""))){t=o;m=true}}if(n==null||n===false){if(n!==false||e.getAttribute(t)===""){if(m){e.removeAttributeNS(C,t)}else{e.removeAttribute(t)}}}else if((!l||i&4||a)&&!v){n=n===true?"":n;if(m){e.setAttributeNS(C,t,n)}else{e.setAttribute(t,n)}}}}};var Y=/\s/;var Z=function(e){return!e?[]:e.split(Y)};var ee=function(e,t,r,n){var a=t.$elm$.nodeType===11&&t.$elm$.host?t.$elm$.host:t.$elm$;var i=e&&e.$attrs$||U;var l=t.$attrs$||U;{for(n in i){if(!(n in l)){X(a,n,i[n],undefined,r,t.$flags$)}}}for(n in l){X(a,n,i[n],l[n],r,t.$flags$)}};var te=function(e,t,r,n){var $=t.$children$[r];var u=0;var c;var d;var h;if(!o){s=true;if($.$tag$==="slot"){if(a){n.classList.add(a+"-s")}$.$flags$|=$.$children$?2:1}}if($.$text$!==null){c=$.$elm$=v.createTextNode($.$text$)}else if($.$flags$&1){c=$.$elm$=v.createTextNode("")}else{if(!f){f=$.$tag$==="svg"}c=$.$elm$=v.createElementNS(f?z:q,$.$flags$&2?"slot-fb":$.$tag$);if(f&&$.$tag$==="foreignObject"){f=false}{ee(null,$,f)}if(V(a)&&c["s-si"]!==a){c.classList.add(c["s-si"]=a)}if($.$children$){for(u=0;u<$.$children$.length;++u){d=te(e,$,u,c);if(d){c.appendChild(d)}}}{if($.$tag$==="svg"){f=false}else if(c.tagName==="foreignObject"){f=true}}}{c["s-hn"]=l;if($.$flags$&(2|1)){c["s-sr"]=true;c["s-cr"]=i;c["s-sn"]=$.$name$||"";h=e&&e.$children$&&e.$children$[r];if(h&&h.$tag$===$.$tag$&&e.$elm$){re(e.$elm$,false)}}}return c};var re=function(e,t){d.$flags$|=1;var r=e.childNodes;for(var n=r.length-1;n>=0;n--){var a=r[n];if(a["s-hn"]!==l&&a["s-ol"]){$e(a).insertBefore(a,oe(a));a["s-ol"].remove();a["s-ol"]=undefined;s=true}if(t){re(a,t)}}d.$flags$&=~1};var ne=function(e,t,r,n,a,i){var o=e["s-cr"]&&e["s-cr"].parentNode||e;var $;if(o.shadowRoot&&o.tagName===l){o=o.shadowRoot}for(;a<=i;++a){if(n[a]){$=te(null,r,a,e);if($){n[a].$elm$=$;o.insertBefore($,oe(t))}}}};var ae=function(e,t,r,n,a){for(;t<=r;++t){if(n=e[t]){a=n.$elm$;de(n);{$=true;if(a["s-ol"]){a["s-ol"].remove()}else{re(a,true)}}a.remove()}}};var ie=function(e,t,r,n){var a=0;var i=0;var l=0;var o=0;var $=t.length-1;var s=t[0];var f=t[$];var u=n.length-1;var c=n[0];var v=n[u];var d;var h;while(a<=$&&i<=u){if(s==null){s=t[++a]}else if(f==null){f=t[--$]}else if(c==null){c=n[++i]}else if(v==null){v=n[--u]}else if(le(s,c)){se(s,c);s=t[++a];c=n[++i]}else if(le(f,v)){se(f,v);f=t[--$];v=n[--u]}else if(le(s,v)){if(s.$tag$==="slot"||v.$tag$==="slot"){re(s.$elm$.parentNode,false)}se(s,v);e.insertBefore(s.$elm$,f.$elm$.nextSibling);s=t[++a];v=n[--u]}else if(le(f,c)){if(s.$tag$==="slot"||v.$tag$==="slot"){re(f.$elm$.parentNode,false)}se(f,c);e.insertBefore(f.$elm$,s.$elm$);f=t[--$];c=n[++i]}else{l=-1;{for(o=a;o<=$;++o){if(t[o]&&t[o].$key$!==null&&t[o].$key$===c.$key$){l=o;break}}}if(l>=0){h=t[l];if(h.$tag$!==c.$tag$){d=te(t&&t[i],r,l,e)}else{se(h,c);t[l]=undefined;d=h.$elm$}c=n[++i]}else{d=te(t&&t[i],r,i,e);c=n[++i]}if(d){{$e(s.$elm$).insertBefore(d,oe(s.$elm$))}}}}if(a>$){ne(e,n[u+1]==null?null:n[u+1].$elm$,r,n,i,u)}else if(i>u){ae(t,a,$)}};var le=function(e,t){if(e.$tag$===t.$tag$){if(e.$tag$==="slot"){return e.$name$===t.$name$}{return e.$key$===t.$key$}}return false};var oe=function(e){return e&&e["s-ol"]||e};var $e=function(e){return(e["s-ol"]?e["s-ol"]:e).parentNode};var se=function(e,t){var r=t.$elm$=e.$elm$;var n=e.$children$;var a=t.$children$;var i=t.$tag$;var l=t.$text$;var o;if(l===null){{f=i==="svg"?true:i==="foreignObject"?false:f}{if(i==="slot");else{ee(e,t,f)}}if(n!==null&&a!==null){ie(r,n,t,a)}else if(a!==null){if(e.$text$!==null){r.textContent=""}ne(r,null,t,a,0,a.length-1)}else if(n!==null){ae(n,0,n.length-1)}if(f&&i==="svg"){f=false}}else if(o=r["s-cr"]){o.parentNode.textContent=l}else if(e.$text$!==l){r.data=l}};var fe=function(e){var t=e.childNodes;var r;var n;var a;var i;var l;var o;for(n=0,a=t.length;n<a;n++){r=t[n];if(r.nodeType===1){if(r["s-sr"]){l=r["s-sn"];r.hidden=false;for(i=0;i<a;i++){o=t[i].nodeType;if(t[i]["s-hn"]!==r["s-hn"]||l!==""){if(o===1&&l===t[i].getAttribute("slot")){r.hidden=true;break}}else{if(o===1||o===3&&t[i].textContent.trim()!==""){r.hidden=true;break}}}}fe(r)}}};var ue=[];var ce=function(e){var t;var r;var n;var a;var i;var l;var o=0;var s=e.childNodes;var f=s.length;for(;o<f;o++){t=s[o];if(t["s-sr"]&&(r=t["s-cr"])&&r.parentNode){n=r.parentNode.childNodes;a=t["s-sn"];for(l=n.length-1;l>=0;l--){r=n[l];if(!r["s-cn"]&&!r["s-nr"]&&r["s-hn"]!==t["s-hn"]){if(ve(r,a)){i=ue.find((function(e){return e.$nodeToRelocate$===r}));$=true;r["s-sn"]=r["s-sn"]||a;if(i){i.$slotRefNode$=t}else{ue.push({$slotRefNode$:t,$nodeToRelocate$:r})}if(r["s-sr"]){ue.map((function(e){if(ve(e.$nodeToRelocate$,r["s-sn"])){i=ue.find((function(e){return e.$nodeToRelocate$===r}));if(i&&!e.$slotRefNode$){e.$slotRefNode$=i.$slotRefNode$}}}))}}else if(!ue.some((function(e){return e.$nodeToRelocate$===r}))){ue.push({$nodeToRelocate$:r})}}}}if(t.nodeType===1){ce(t)}}};var ve=function(e,t){if(e.nodeType===1){if(e.getAttribute("slot")===null&&t===""){return true}if(e.getAttribute("slot")===t){return true}return false}if(e["s-sn"]===t){return true}return t===""};var de=function(e){{e.$attrs$&&e.$attrs$.ref&&e.$attrs$.ref(null);e.$children$&&e.$children$.map(de)}};var he=function(e,t){var r=e.$hostElement$;var n=e.$cmpMeta$;var f=e.$vnode$||D(null,null);var u=G(t)?t:W(null,null,t);l=r.tagName;if(n.$attrsToReflect$){u.$attrs$=u.$attrs$||{};n.$attrsToReflect$.map((function(e){var t=e[0],n=e[1];return u.$attrs$[n]=r[t]}))}u.$tag$=null;u.$flags$|=4;e.$vnode$=u;u.$elm$=f.$elm$=r.shadowRoot||r;{a=r["s-sc"]}{i=r["s-cr"];o=(n.$flags$&1)!==0;$=false}se(f,u);{d.$flags$|=1;if(s){ce(u.$elm$);var c=void 0;var h=void 0;var m=void 0;var p=void 0;var g=void 0;var y=void 0;var b=0;for(;b<ue.length;b++){c=ue[b];h=c.$nodeToRelocate$;if(!h["s-ol"]){m=v.createTextNode("");m["s-nr"]=h;h.parentNode.insertBefore(h["s-ol"]=m,h)}}for(b=0;b<ue.length;b++){c=ue[b];h=c.$nodeToRelocate$;if(c.$slotRefNode$){p=c.$slotRefNode$.parentNode;g=c.$slotRefNode$.nextSibling;m=h["s-ol"];while(m=m.previousSibling){y=m["s-nr"];if(y&&y["s-sn"]===h["s-sn"]&&p===y.parentNode){y=y.nextSibling;if(!y||!y["s-nr"]){g=y;break}}}if(!g&&p!==h.parentNode||h.nextSibling!==g){if(h!==g){if(!h["s-hn"]&&h["s-ol"]){h["s-hn"]=h["s-ol"].parentNode.nodeName}p.insertBefore(h,g)}}}else{if(h.nodeType===1){h.hidden=true}}}}if($){fe(u.$elm$)}d.$flags$&=~1;ue.length=0}};var me=e("g",(function(e){return Fe(e).$hostElement$}));var pe=e("c",(function(e,t,r){var n=me(e);return{emit:function(e){return ge(n,t,{bubbles:!!(r&4),composed:!!(r&2),cancelable:!!(r&1),detail:e})}}}));var ge=function(e,t,r){var n=d.ce(t,r);e.dispatchEvent(n);return n};var ye=function(e,t){if(t&&!e.$onRenderResolve$&&t["s-p"]){t["s-p"].push(new Promise((function(t){return e.$onRenderResolve$=t})))}};var be=function(e,t){{e.$flags$|=16}if(e.$flags$&4){e.$flags$|=512;return}ye(e,e.$ancestorComponent$);var r=function(){return we(e,t)};return lt(r)};var we=function(e,t){var r=A("scheduleUpdate",e.$cmpMeta$.$tagName$);var n=e.$lazyInstance$;var a;if(t){{e.$flags$|=256;if(e.$queuedListeners$){e.$queuedListeners$.map((function(e){var t=e[0],r=e[1];return _e(n,t,r)}));e.$queuedListeners$=null}}{a=_e(n,"componentWillLoad")}}{a=Te(a,(function(){return _e(n,"componentWillRender")}))}r();return Te(a,(function(){return Ne(e,n,t)}))};var Ne=function(e,t,n){return __awaiter(r,void 0,void 0,(function(){var r,a,i,l,o,$;return __generator(this,(function(s){r=e.$hostElement$;a=A("update",e.$cmpMeta$.$tagName$);i=r["s-rc"];if(n){P(e)}l=A("render",e.$cmpMeta$.$tagName$);{Re(e,t)}if(i){i.map((function(e){return e()}));r["s-rc"]=undefined}l();a();{o=r["s-p"];$=function(){return xe(e)};if(o.length===0){$()}else{Promise.all(o).then($);e.$flags$|=4;o.length=0}}return[2]}))}))};var Re=function(e,t,r){try{t=t.render();{e.$flags$&=~16}{e.$flags$|=2}{{{he(e,t)}}}}catch(t){Qe(t,e.$hostElement$)}return null};var xe=function(e){var t=e.$cmpMeta$.$tagName$;var r=e.$hostElement$;var n=A("postUpdate",t);var a=e.$lazyInstance$;var i=e.$ancestorComponent$;{_e(a,"componentDidRender")}if(!(e.$flags$&64)){e.$flags$|=64;{Le(r)}{_e(a,"componentDidLoad")}n();{e.$onReadyResolve$(r);if(!i){ke()}}}else{{_e(a,"componentDidUpdate")}n()}{e.$onInstanceResolve$(r)}{if(e.$onRenderResolve$){e.$onRenderResolve$();e.$onRenderResolve$=undefined}if(e.$flags$&512){it((function(){return be(e,false)}))}e.$flags$&=~(4|512)}};var Se=e("f",(function(e){{var t=Fe(e);var r=t.$hostElement$.isConnected;if(r&&(t.$flags$&(2|16))===2){be(t,false)}return r}}));var ke=function(e){{Le(v.documentElement)}it((function(){return ge(c,"appload",{detail:{namespace:n}})}))};var _e=function(e,t,r){if(e&&e[t]){try{return e[t](r)}catch(e){Qe(e)}}return undefined};var Te=function(e,t){return e&&e.then?e.then(t):t()};var Le=function(e){return e.setAttribute("calcite-hydrated","")};var Ce=function(e,t,r,n){var a=A("hydrateClient",t);var i=e.shadowRoot;var l=[];var o=[];var $=i?[]:null;var s=n.$vnode$=D(t,null);if(!d.$orgLocNodes$){Ee(v.body,d.$orgLocNodes$=new Map)}e[k]=r;e.removeAttribute(k);Ae(s,l,o,$,e,e,r);l.map((function(e){var r=e.$hostId$+"."+e.$nodeId$;var n=d.$orgLocNodes$.get(r);var a=e.$elm$;if(n&&h&&n["s-en"]===""){n.parentNode.insertBefore(a,n.nextSibling)}if(!i){a["s-hn"]=t;if(n){a["s-ol"]=n;a["s-ol"]["s-nr"]=a}}d.$orgLocNodes$.delete(r)}));if(i){$.map((function(e){if(e){i.appendChild(e)}}))}a()};var Ae=function(e,t,r,n,a,i,l){var o;var $;var s;var f;if(i.nodeType===1){o=i.getAttribute(T);if(o){$=o.split(".");if($[0]===l||$[0]==="0"){s={$flags$:0,$hostId$:$[0],$nodeId$:$[1],$depth$:$[2],$index$:$[3],$tag$:i.tagName.toLowerCase(),$elm$:i,$attrs$:null,$children$:null,$key$:null,$name$:null,$text$:null};t.push(s);i.removeAttribute(T);if(!e.$children$){e.$children$=[]}e.$children$[s.$index$]=s;e=s;if(n&&s.$depth$==="0"){n[s.$index$]=s.$elm$}}}for(f=i.childNodes.length-1;f>=0;f--){Ae(e,t,r,n,a,i.childNodes[f],l)}if(i.shadowRoot){for(f=i.shadowRoot.childNodes.length-1;f>=0;f--){Ae(e,t,r,n,a,i.shadowRoot.childNodes[f],l)}}}else if(i.nodeType===8){$=i.nodeValue.split(".");if($[1]===l||$[1]==="0"){o=$[0];s={$flags$:0,$hostId$:$[1],$nodeId$:$[2],$depth$:$[3],$index$:$[4],$elm$:i,$attrs$:null,$children$:null,$key$:null,$name$:null,$tag$:null,$text$:null};if(o===S){s.$elm$=i.nextSibling;if(s.$elm$&&s.$elm$.nodeType===3){s.$text$=s.$elm$.textContent;t.push(s);i.remove();if(!e.$children$){e.$children$=[]}e.$children$[s.$index$]=s;if(n&&s.$depth$==="0"){n[s.$index$]=s.$elm$}}}else if(s.$hostId$===l){if(o===x){s.$tag$="slot";if($[5]){i["s-sn"]=s.$name$=$[5]}else{i["s-sn"]=""}i["s-sr"]=true;if(n){s.$elm$=v.createElement(s.$tag$);if(s.$name$){s.$elm$.setAttribute("name",s.$name$)}i.parentNode.insertBefore(s.$elm$,i);i.remove();if(s.$depth$==="0"){n[s.$index$]=s.$elm$}}r.push(s);if(!e.$children$){e.$children$=[]}e.$children$[s.$index$]=s}else if(o===N){if(n){i.remove()}else{a["s-cr"]=i;i["s-cn"]=true}}}}}else if(e&&e.$tag$==="style"){var u=D(null,i.textContent);u.$elm$=i;u.$index$="0";e.$children$=[u]}};var Ee=function(e,t){if(e.nodeType===1){var r=0;for(;r<e.childNodes.length;r++){Ee(e.childNodes[r],t)}if(e.shadowRoot){for(r=0;r<e.shadowRoot.childNodes.length;r++){Ee(e.shadowRoot.childNodes[r],t)}}}else if(e.nodeType===8){var n=e.nodeValue.split(".");if(n[0]===R){t.set(n[1]+"."+n[2],e);e.nodeValue="";e["s-en"]=n[3]}}};var Ie=function(e,t){if(e!=null&&!H(e)){if(t&4){return e==="false"?false:e===""||!!e}if(t&2){return parseFloat(e)}if(t&1){return String(e)}return e}return e};var je=function(e,t){return Fe(e).$instanceValues$.get(t)};var Me=function(e,t,r,n){var a=Fe(e);var i=a.$hostElement$;var l=a.$instanceValues$.get(t);var o=a.$flags$;var $=a.$lazyInstance$;r=Ie(r,n.$members$[t][0]);if((!(o&8)||l===undefined)&&r!==l){a.$instanceValues$.set(t,r);if($){if(n.$watchers$&&o&128){var s=n.$watchers$[t];if(s){s.map((function(e){try{$[e](r,l,t)}catch(e){Qe(e,i)}}))}}if((o&(2|16))===2){if($.componentShouldUpdate){if($.componentShouldUpdate(r,l,t)===false){return}}be(a,false)}}}};var Pe=function(e,t,r){if(t.$members$){if(e.watchers){t.$watchers$=e.watchers}var n=Object.entries(t.$members$);var a=e.prototype;n.map((function(e){var n=e[0],i=e[1][0];if(i&31||r&2&&i&32){Object.defineProperty(a,n,{get:function(){return je(this,n)},set:function(e){Me(this,n,e,t)},configurable:true,enumerable:true})}else if(r&1&&i&64){Object.defineProperty(a,n,{value:function(){var e=[];for(var t=0;t<arguments.length;t++){e[t]=arguments[t]}var r=Fe(this);return r.$onInstancePromise$.then((function(){var t;return(t=r.$lazyInstance$)[n].apply(t,e)}))}})}}));if(r&1){var i=new Map;a.attributeChangedCallback=function(e,t,r){var n=this;d.jmp((function(){var t=i.get(e);if(n.hasOwnProperty(t)){r=n[t];delete n[t]}n[t]=r===null&&typeof n[t]==="boolean"?false:r}))};e.observedAttributes=n.filter((function(e){var t=e[0],r=e[1];return r[0]&15})).map((function(e){var r=e[0],n=e[1];var a=n[1]||r;i.set(a,r);if(n[0]&512){t.$attrsToReflect$.push([r,a])}return a}))}}return e};var Oe=function(e,t,n,a,i){return __awaiter(r,void 0,void 0,(function(){var e,r,a,l,o,$,s;return __generator(this,(function(f){switch(f.label){case 0:if(!((t.$flags$&32)===0))return[3,3];t.$flags$|=32;i=Ye(n);if(!i.then)return[3,2];e=E();return[4,i];case 1:i=f.sent();e();f.label=2;case 2:if(!i.isProxied){{n.$watchers$=i.watchers}Pe(i,n,2);i.isProxied=true}r=A("createInstance",n.$tagName$);{t.$flags$|=8}try{new i(t)}catch(e){Qe(e)}{t.$flags$&=~8}{t.$flags$|=128}r();Be(t.$lazyInstance$);if(i.style){a=i.style;l=O(n);if(!Ze.has(l)){o=A("registerStyles",n.$tagName$);j(l,a,!!(n.$flags$&1));o()}}f.label=3;case 3:$=t.$ancestorComponent$;s=function(){return be(t,true)};if($&&$["s-rc"]){$["s-rc"].push(s)}else{s()}return[2]}}))}))};var Be=function(e){{_e(e,"connectedCallback")}};var Ue=function(e){if((d.$flags$&1)===0){var t=Fe(e);var r=t.$cmpMeta$;var n=A("connectedCallback",r.$tagName$);if(!(t.$flags$&1)){t.$flags$|=1;var a=void 0;{a=e.getAttribute(k);if(a){if(r.$flags$&1){var i=M(e.shadowRoot,r);e.classList.remove(i+"-h",i+"-s")}Ce(e,r.$tagName$,a,t)}}if(!a){if(r.$flags$&(4|8)){ze(e)}}{var l=e;while(l=l.parentNode||l.host){if(l.nodeType===1&&l.hasAttribute("s-id")&&l["s-p"]||l["s-p"]){ye(t,t.$ancestorComponent$=l);break}}}if(r.$members$){Object.entries(r.$members$).map((function(t){var r=t[0],n=t[1][0];if(n&31&&e.hasOwnProperty(r)){var a=e[r];delete e[r];e[r]=a}}))}{Oe(e,t,r)}}else{g(e,t,r.$listeners$);Be(t.$lazyInstance$)}n()}};var ze=function(e){var t=e["s-cr"]=v.createComment("");t["s-cn"]=true;e.insertBefore(t,e.firstChild)};var qe=function(e){if((d.$flags$&1)===0){var t=Fe(e);var r=t.$lazyInstance$;{if(t.$rmListeners$){t.$rmListeners$.map((function(e){return e()}));t.$rmListeners$=undefined}}{_e(r,"disconnectedCallback")}}};var Ve=e("b",(function(e,t){if(t===void 0){t={}}var r=A();var n=[];var a=t.exclude||[];var i=c.customElements;var l=v.head;var o=l.querySelector("meta[charset]");var $=v.createElement("style");var s=[];var f=v.querySelectorAll("["+_+"]");var u;var h=true;var m=0;Object.assign(d,t);d.$resourcesUrl$=new URL(t.resourcesUrl||"./",v.baseURI).href;{d.$flags$|=2}{for(;m<f.length;m++){j(f[m].getAttribute(_),B(f[m].innerHTML),true)}}e.map((function(e){return e[1].map((function(t){var r={$flags$:t[0],$tagName$:t[1],$members$:t[2],$listeners$:t[3]};{r.$members$=t[2]}{r.$listeners$=t[3]}{r.$attrsToReflect$=[]}{r.$watchers$={}}var l=r.$tagName$;var o=function(e){__extends(t,e);function t(t){var n=e.call(this,t)||this;t=n;Je(t,r);if(r.$flags$&1){{{t.attachShadow({mode:"open"})}}}return n}t.prototype.connectedCallback=function(){var e=this;if(u){clearTimeout(u);u=null}if(h){s.push(this)}else{d.jmp((function(){return Ue(e)}))}};t.prototype.disconnectedCallback=function(){var e=this;d.jmp((function(){return qe(e)}))};t.prototype.componentOnReady=function(){return Fe(this).$onReadyPromise$};return t}(HTMLElement);r.$lazyBundleId$=e[0];if(!a.includes(l)&&!i.get(l)){n.push(l);i.define(l,Pe(o,r,1))}}))}));{$.innerHTML=n+L;$.setAttribute("data-styles","");l.insertBefore($,o?o.nextSibling:l.firstChild)}h=false;if(s.length){s.map((function(e){return e.connectedCallback()}))}else{{d.jmp((function(){return u=setTimeout(ke,30)}))}}r()}));var He=e("a",(function(e){var t=new URL(e,d.$resourcesUrl$);return t.origin!==c.location.origin?t.href:t.pathname}));var We=e("F",(function(e,t){return t}));var De=new WeakMap;var Fe=function(e){return De.get(e)};var Ge=e("r",(function(e,t){return De.set(t.$lazyInstance$=e,t)}));var Je=function(e,t){var r={$flags$:0,$hostElement$:e,$cmpMeta$:t,$instanceValues$:new Map};{r.$onInstancePromise$=new Promise((function(e){return r.$onInstanceResolve$=e}))}{r.$onReadyPromise$=new Promise((function(e){return r.$onReadyResolve$=e}));e["s-p"]=[];e["s-rc"]=[]}g(e,r,t.$listeners$);return De.set(e,r)};var Ke=function(e,t){return t in e};var Qe=function(e,t){return(0,console.error)(e,t)};var Xe=new Map;var Ye=function(e,r,n){var a=e.$tagName$.replace(/-/g,"_");var i=e.$lazyBundleId$;var l=Xe.get(i);if(l){return l[a]}return t.import("./"+i+".entry.js"+"").then((function(e){{Xe.set(i,e)}return e[a]}),Qe)};var Ze=new Map;var et=[];var tt=[];var rt=function(e,t){return function(r){e.push(r);if(!u){u=true;if(t&&d.$flags$&4){it(at)}else{d.raf(at)}}}};var nt=function(e){for(var t=0;t<e.length;t++){try{e[t](performance.now())}catch(e){Qe(e)}}e.length=0};var at=function(){nt(et);{nt(tt);if(u=et.length>0){d.raf(at)}}};var it=function(e){return m().then(e)};var lt=rt(tt,true)}}}));