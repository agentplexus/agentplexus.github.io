var PlexusNav=function(d){"use strict";var At=Object.defineProperty;var c=(d,M)=>At(d,"name",{value:M,configurable:!0});/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var D,T,qe,H,L,N;const M=globalThis,se=M.ShadowRoot&&(M.ShadyCSS===void 0||M.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ie=Symbol(),Pe=new WeakMap;let Ce=(D=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==ie)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(se&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=Pe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&Pe.set(t,e))}return e}toString(){return this.cssText}},c(D,"n"),D);const Fe=c(n=>new Ce(typeof n=="string"?n:n+"",void 0,ie),"r$4"),k=c((n,...e)=>{const t=n.length===1?n[0]:e.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new Ce(t,n,ie)},"i$3"),We=c((n,e)=>{if(se)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=M.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,n.appendChild(s)}},"S$1"),Me=se?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return Fe(t)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ye,defineProperty:Ke,getOwnPropertyDescriptor:Je,getOwnPropertyNames:Ze,getOwnPropertySymbols:Qe,getPrototypeOf:Xe}=Object,$=globalThis,Ee=$.trustedTypes,et=Ee?Ee.emptyScript:"",oe=$.reactiveElementPolyfillSupport,R=c((n,e)=>n,"d$1"),q={toAttribute(n,e){switch(e){case Boolean:n=n?et:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},ne=c((n,e)=>!Ye(n,e),"f$1"),Se={attribute:!0,type:String,converter:q,reflect:!1,useDefault:!1,hasChanged:ne};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);let E=(T=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Se){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&Ke(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:r}=Je(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:i,set(o){const l=i==null?void 0:i.call(this);r==null||r.call(this,o),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Se}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;const e=Xe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){const t=this.properties,s=[...Ze(t),...Qe(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(Me(i))}else e!==void 0&&t.push(Me(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return We(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var r;const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const o=(((r=s.converter)==null?void 0:r.toAttribute)!==void 0?s.converter:q).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(e,t){var r,o;const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const l=s.getPropertyOptions(i),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((r=l.converter)==null?void 0:r.fromAttribute)!==void 0?l.converter:q;this._$Em=i;const u=a.fromAttribute(t,l.type);this[i]=u??((o=this._$Ej)==null?void 0:o.get(i))??u,this._$Em=null}}requestUpdate(e,t,s,i=!1,r){var o;if(e!==void 0){const l=this.constructor;if(i===!1&&(r=this[e]),s??(s=l.getPropertyOptions(e)),!((s.hasChanged??ne)(r,t)||s.useDefault&&s.reflect&&r===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(l._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),r!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,o]of i){const{wrapped:l}=o,a=this[r];l!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,o,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(i=>{var r;return(r=i.hostUpdate)==null?void 0:r.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}},c(T,"y"),T);E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[R("elementProperties")]=new Map,E[R("finalized")]=new Map,oe==null||oe({ReactiveElement:E}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const j=globalThis,Ue=c(n=>n,"i$1"),F=j.trustedTypes,Oe=F?F.createPolicy("lit-html",{createHTML:c(n=>n,"createHTML")}):void 0,De="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,Te="?"+_,tt=`<${Te}>`,w=document,z=c(()=>w.createComment(""),"c"),B=c(n=>n===null||typeof n!="object"&&typeof n!="function","a"),re=Array.isArray,st=c(n=>re(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function","d"),ae=`[ 	
\f\r]`,I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,He=/-->/g,Le=/>/g,A=RegExp(`>|${ae}(?:([^\\s"'>=/]+)(${ae}*=${ae}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ne=/'/g,Re=/"/g,je=/^(?:script|style|textarea|title)$/i,it=c(n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),"x"),g=it(1),S=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),ze=new WeakMap,P=w.createTreeWalker(w,129);function Be(n,e){if(!re(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Oe!==void 0?Oe.createHTML(e):e}c(Be,"V");const ot=c((n,e)=>{const t=n.length-1,s=[];let i,r=e===2?"<svg>":e===3?"<math>":"",o=I;for(let l=0;l<t;l++){const a=n[l];let u,m,p=-1,f=0;for(;f<a.length&&(o.lastIndex=f,m=o.exec(a),m!==null);)f=o.lastIndex,o===I?m[1]==="!--"?o=He:m[1]!==void 0?o=Le:m[2]!==void 0?(je.test(m[2])&&(i=RegExp("</"+m[2],"g")),o=A):m[3]!==void 0&&(o=A):o===A?m[0]===">"?(o=i??I,p=-1):m[1]===void 0?p=-2:(p=o.lastIndex-m[2].length,u=m[1],o=m[3]===void 0?A:m[3]==='"'?Re:Ne):o===Re||o===Ne?o=A:o===He||o===Le?o=I:(o=A,i=void 0);const x=o===A&&n[l+1].startsWith("/>")?" ":"";r+=o===I?a+tt:p>=0?(s.push(u),a.slice(0,p)+De+a.slice(p)+_+x):a+_+(p===-2?l:x)}return[Be(n,r+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},"N"),X=class X{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let r=0,o=0;const l=e.length-1,a=this.parts,[u,m]=ot(e,t);if(this.el=X.createElement(u,s),P.currentNode=this.el.content,t===2||t===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=P.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const p of i.getAttributeNames())if(p.endsWith(De)){const f=m[o++],x=i.getAttribute(p).split(_),te=/([.?@])?(.*)/.exec(f);a.push({type:1,index:r,name:te[2],strings:x,ctor:te[1]==="."?ce:te[1]==="?"?de:te[1]==="@"?he:O}),i.removeAttribute(p)}else p.startsWith(_)&&(a.push({type:6,index:r}),i.removeAttribute(p));if(je.test(i.tagName)){const p=i.textContent.split(_),f=p.length-1;if(f>0){i.textContent=F?F.emptyScript:"";for(let x=0;x<f;x++)i.append(p[x],z()),P.nextNode(),a.push({type:2,index:++r});i.append(p[f],z())}}}else if(i.nodeType===8)if(i.data===Te)a.push({type:2,index:r});else{let p=-1;for(;(p=i.data.indexOf(_,p+1))!==-1;)a.push({type:7,index:r}),p+=_.length-1}r++}}static createElement(e,t){const s=w.createElement("template");return s.innerHTML=e,s}};c(X,"S");let G=X;function U(n,e,t=n,s){var o,l;if(e===S)return e;let i=s!==void 0?(o=t._$Co)==null?void 0:o[s]:t._$Cl;const r=B(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==r&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=i:t._$Cl=i),i!==void 0&&(e=U(n,i._$AS(n,e.values),i,s)),e}c(U,"M");const $e=class $e{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=((e==null?void 0:e.creationScope)??w).importNode(t,!0);P.currentNode=i;let r=P.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let u;a.type===2?u=new V(r,r.nextSibling,this,e):a.type===1?u=new a.ctor(r,a.name,a.strings,this,e):a.type===6&&(u=new pe(r,this,e)),this._$AV.push(u),a=s[++l]}o!==(a==null?void 0:a.index)&&(r=P.nextNode(),o++)}return P.currentNode=w,i}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}};c($e,"R");let le=$e;const ee=class ee{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=U(this,e,t),B(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):st(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&B(this._$AH)?this._$AA.nextSibling.data=e:this.T(w.createTextNode(e)),this._$AH=e}$(e){var r;const{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=G.createElement(Be(s.h,s.h[0]),this.options)),s);if(((r=this._$AH)==null?void 0:r._$AD)===i)this._$AH.p(t);else{const o=new le(i,this),l=o.u(this.options);o.p(t),this.T(l),this._$AH=o}}_$AC(e){let t=ze.get(e.strings);return t===void 0&&ze.set(e.strings,t=new G(e)),t}k(e){re(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const r of e)i===t.length?t.push(s=new ee(this.O(z()),this.O(z()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e!==this._$AB;){const i=Ue(e).nextSibling;Ue(e).remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}};c(ee,"k");let V=ee;const _e=class _e{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(e,t=this,s,i){const r=this.strings;let o=!1;if(r===void 0)e=U(this,e,t,0),o=!B(e)||e!==this._$AH&&e!==S,o&&(this._$AH=e);else{const l=e;let a,u;for(e=r[0],a=0;a<r.length-1;a++)u=U(this,l[s+a],t,a),u===S&&(u=this._$AH[a]),o||(o=!B(u)||u!==this._$AH[a]),u===h?e=h:e!==h&&(e+=(u??"")+r[a+1]),this._$AH[a]=u}o&&!i&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}};c(_e,"H");let O=_e;const ye=class ye extends O{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}};c(ye,"I");let ce=ye;const xe=class xe extends O{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}};c(xe,"L");let de=xe;const ke=class ke extends O{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=U(this,e,t,0)??h)===S)return;const s=this._$AH,i=e===h&&s!==h||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==h&&(s===h||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}};c(ke,"z");let he=ke;const we=class we{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){U(this,e)}};c(we,"Z");let pe=we;const ue=j.litHtmlPolyfillSupport;ue==null||ue(G,V),(j.litHtmlVersions??(j.litHtmlVersions=[])).push("3.3.2");const nt=c((n,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let i=s._$litPart$;if(i===void 0){const r=(t==null?void 0:t.renderBefore)??null;s._$litPart$=i=new V(e.insertBefore(z(),r),r,void 0,t??{})}return i._$AI(n),i},"D");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=globalThis,Ae=class Ae extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=nt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return S}};c(Ae,"i");let v=Ae;v._$litElement$=!0,v.finalized=!0,(qe=C.litElementHydrateSupport)==null||qe.call(C,{LitElement:v});const ge=C.litElementPolyfillSupport;ge==null||ge({LitElement:v}),(C.litElementVersions??(C.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const me=c(n=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,e)}):customElements.define(n,e)},"t");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rt={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:ne},at=c((n=rt,e,t)=>{const{kind:s,metadata:i}=t;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),s==="setter"&&((n=Object.create(n)).wrapped=!0),r.set(t.name,n),s==="accessor"){const{name:o}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(o,a,n,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,n,l),l}}}if(s==="setter"){const{name:o}=t;return function(l){const a=this[o];e.call(this,l),this.requestUpdate(o,a,n,!0,l)}}throw Error("Unsupported decorator location: "+s)},"r$1");function y(n){return(e,t)=>typeof t=="object"?at(n,e,t):((s,i,r)=>{const o=i.hasOwnProperty(r);return i.constructor.createProperty(r,s),o?Object.getOwnPropertyDescriptor(i,r):void 0})(n,e,t)}c(y,"n");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function W(n){return y({...n,state:!0,attribute:!1})}c(W,"r");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lt=c((n,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(n,e,t),t),"e$1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Y(n,e){return(t,s,i)=>{const r=c(o=>{var l;return((l=o.renderRoot)==null?void 0:l.querySelector(n))??null},"o");return lt(t,s,{get(){return r(this)}})}}c(Y,"e");const ct=k`
  :host {
    /* Brand colors */
    --plexus-cyan: #06b6d4;
    --plexus-cyan-light: #22d3ee;
    --plexus-purple: #8b5cf6;
    --plexus-purple-light: #a78bfa;
    --plexus-pink: #ec4899;
    --plexus-dark: rgba(10, 14, 26, 1);
    --plexus-dark-80: rgba(10, 14, 26, 0.8);
    --plexus-dark-95: rgba(10, 14, 26, 0.95);
    --plexus-dark-98: rgba(10, 15, 28, 0.98);

    /* Text colors */
    --text-primary: #ffffff;
    --text-secondary: #d1d5db;
    --text-muted: #9ca3af;
    --text-subtle: #6b7280;
    --text-dim: #4b5563;

    /* Border colors */
    --border-light: rgba(255, 255, 255, 0.1);
    --border-lighter: rgba(255, 255, 255, 0.05);

    /* Shadows */
    --shadow-dropdown: 0 10px 40px rgba(0, 0, 0, 0.3);
    --shadow-mega: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
`,dt=k`
  :host {
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .gradient-text {
    background: linear-gradient(135deg, var(--plexus-cyan), var(--plexus-purple), var(--plexus-pink));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`,ht=k`
  .transition-colors {
    transition: color 0.15s ease;
  }

  .transition-all {
    transition: all 0.15s ease;
  }

  .transition-transform {
    transition: transform 0.2s ease;
  }
`,pt=k`
  .focus-ring:focus-visible {
    outline: 2px solid var(--plexus-purple);
    outline-offset: 2px;
  }
`,be=[ct,dt,ht,pt],ut=[...be,k`
    :host {
      display: block;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    .nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: var(--plexus-dark-80);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-light);
    }

    .nav-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1rem;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* Brand */
    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      border-radius: 8px;
    }

    .nav-brand:focus-visible {
      outline: 2px solid var(--plexus-purple);
      outline-offset: 2px;
    }

    .nav-logo {
      width: 40px;
      height: 40px;
    }

    .nav-title {
      font-size: 20px;
      font-weight: 700;
    }

    .nav-title-light {
      color: var(--text-primary);
    }

    /* Desktop Links */
    .nav-links {
      display: none;
      align-items: center;
      gap: 2rem;
    }

    @media (min-width: 769px) {
      .nav-links {
        display: flex;
      }
    }

    .nav-link {
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      padding: 8px 0;
      border: none;
      background: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: color 0.15s ease;
      border-radius: 4px;
    }

    .nav-link:hover,
    .nav-link[aria-expanded="true"],
    .nav-link.active {
      color: var(--plexus-cyan);
    }

    .nav-link:focus-visible {
      outline: 2px solid var(--plexus-purple);
      outline-offset: 2px;
    }

    .nav-link .icon-chevron {
      transition: transform 0.2s ease;
    }

    .nav-link[aria-expanded="true"] .icon-chevron {
      transform: rotate(180deg);
    }

    /* Dropdowns */
    .nav-dropdown {
      position: relative;
    }

    .nav-dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: 0.5rem;
      min-width: 12rem;
      padding: 0.5rem 0;
      background: var(--plexus-dark-95);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--border-light);
      border-radius: 8px;
      box-shadow: var(--shadow-dropdown);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px);
      transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s ease;
    }

    .nav-dropdown.open .nav-dropdown-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .nav-dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 8px 16px;
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 14px;
      transition: color 0.15s ease, background 0.15s ease;
    }

    .nav-dropdown-item:hover {
      color: var(--plexus-cyan);
      background: rgba(255, 255, 255, 0.05);
    }

    .nav-dropdown-divider {
      border-top: 1px solid var(--border-light);
      margin: 0.5rem 0;
    }

    /* GitHub Button */
    .nav-github {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: rgba(139, 92, 246, 0.2);
      border: 1px solid rgba(139, 92, 246, 0.5);
      border-radius: 8px;
      color: var(--plexus-purple-light);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: background 0.15s ease;
    }

    .nav-github:hover {
      background: rgba(139, 92, 246, 0.3);
    }

    .nav-github:focus-visible {
      outline: 2px solid var(--plexus-purple);
      outline-offset: 2px;
    }

    /* Mobile Toggle */
    .nav-mobile-toggle {
      display: flex;
      padding: 0.5rem;
      background: none;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      border-radius: 8px;
    }

    .nav-mobile-toggle:focus-visible {
      outline: 2px solid var(--plexus-purple);
      outline-offset: 2px;
    }

    @media (min-width: 769px) {
      .nav-mobile-toggle {
        display: none;
      }
    }

    .nav-mobile-toggle .icon-close {
      display: none;
    }

    .nav-mobile-toggle[aria-expanded="true"] .icon-hamburger {
      display: none;
    }

    .nav-mobile-toggle[aria-expanded="true"] .icon-close {
      display: block;
    }

    /* Skip Link */
    .skip-link {
      position: absolute;
      top: -100%;
      left: 0;
      padding: 0.5rem 1rem;
      background: var(--plexus-purple);
      color: white;
      text-decoration: none;
      border-radius: 4px;
      z-index: 1000;
    }

    .skip-link:focus {
      top: 1rem;
      left: 1rem;
    }
  `],Ie=g`
  <svg class="icon-chevron" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
  </svg>
`,gt=g`
  <svg class="icon-chevron-small" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
    <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
  </svg>
`,Ge=g`
  <svg class="icon-github" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
`,mt=g`
  <svg class="icon-hamburger" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
  </svg>
`,bt=g`
  <svg class="icon-close" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
`,Ve=g`
  <svg class="icon-rss" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
    <path fill="currentColor" d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z"/>
  </svg>
`,ve="https://plexusone.dev",fe=["library","agent","application","specification"],K={library:"/libraries",agent:"/agents",application:"/applications",specification:"/specifications"},J="https://github.com/plexusone",vt=[...be,k`
    :host {
      display: block;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    .mega-menu {
      display: none;
      position: fixed;
      top: 64px;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    :host([open]) .mega-menu {
      display: block;
    }

    @media (max-width: 768px) {
      .mega-menu {
        display: none !important;
      }
    }

    .mega-menu-backdrop {
      position: fixed;
      inset: 64px 0 0 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
    }

    .mega-menu-panel {
      position: relative;
      background: var(--plexus-dark-98);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-light);
      box-shadow: var(--shadow-mega);
    }

    .mega-menu-content {
      max-width: 80rem;
      margin: 0 auto;
      padding: 2rem;
    }

    .mega-menu-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
    }

    /* Category */
    .category {
      min-width: 0;
    }

    .category-header {
      margin-bottom: 1rem;
    }

    .category-title {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-primary);
      margin: 0 0 4px 0;
    }

    .category-title a {
      color: inherit;
      text-decoration: none;
      transition: color 0.15s;
    }

    .category-title a:hover {
      color: var(--plexus-cyan);
    }

    .category-desc {
      font-size: 11px;
      color: var(--text-subtle);
      margin: 0;
    }

    /* Products list */
    .products-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .product-item {
      margin-bottom: 0.75rem;
    }

    .product-link {
      display: block;
      text-decoration: none;
      transition: color 0.15s;
    }

    .product-name {
      font-size: 14px;
      font-weight: 500;
      color: #e5e7eb;
      transition: color 0.15s;
    }

    .product-link:hover .product-name {
      color: var(--plexus-cyan);
    }

    .product-tagline {
      font-size: 11px;
      color: var(--text-subtle);
      margin-top: 2px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* View more link */
    .view-more {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-top: 12px;
      font-size: 11px;
      color: var(--plexus-cyan);
      text-decoration: none;
      transition: color 0.15s;
    }

    .view-more:hover {
      color: var(--plexus-cyan-light);
    }

    .view-more .icon-chevron-small {
      transform: rotate(-90deg);
    }

    /* Footer */
    .mega-menu-footer {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-light);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .footer-links {
      display: flex;
      gap: 1.5rem;
    }

    .footer-link {
      font-size: 14px;
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.15s;
    }

    .footer-link:hover {
      color: var(--text-primary);
    }

    .mega-menu-stats {
      font-size: 12px;
      color: var(--text-dim);
    }
  `];var ft=Object.defineProperty,$t=Object.getOwnPropertyDescriptor,Z=c((n,e,t,s)=>{for(var i=s>1?void 0:s?$t(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&ft(e,t,i),i},"__decorateClass$2");d.PlexusMegaMenu=(H=class extends v{constructor(){super(...arguments),this.open=!1,this.data=null,this.baseUrl="https://plexusone.dev",this._handleBackdropClick=()=>{this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))},this._handleLinkClick=()=>{this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}}_getProductsByCategory(e){return this.data?this.data.products.filter(t=>t.category===e&&t.featured&&t.docsUrl).slice(0,5):[]}_getCategoryCount(e){return this.data?this.data.products.filter(t=>t.category===e&&t.docsUrl).length:0}_getProductUrl(e){const t=K[e.category]||"/products";return`${this.baseUrl}${t}/${e.slug}`}_getCategoryUrl(e){return`${this.baseUrl}${K[e]}`}render(){if(!this.data)return h;const e=this.data.products.length,t=Object.keys(this.data.categories).length;return g`
      <div class="mega-menu">
        <div class="mega-menu-backdrop" @click=${this._handleBackdropClick}></div>
        <div class="mega-menu-panel">
          <div class="mega-menu-content">
            <div class="mega-menu-grid">
              ${fe.map(s=>this._renderCategory(s))}
            </div>
            <div class="mega-menu-footer">
              <div class="footer-links">
                <a
                  href="${this.baseUrl}/#products"
                  class="footer-link"
                  @click=${this._handleLinkClick}
                >
                  All Products
                </a>
                <a
                  href="${this.baseUrl}/integrations"
                  class="footer-link"
                  @click=${this._handleLinkClick}
                >
                  Integrations
                </a>
                <a
                  href="${J}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="footer-link"
                >
                  GitHub
                </a>
              </div>
              <span class="mega-menu-stats">
                ${e} products across ${t} categories
              </span>
            </div>
          </div>
        </div>
      </div>
    `}_renderCategory(e){var l;const t=(l=this.data)==null?void 0:l.categories[e];if(!t)return h;const s=this._getProductsByCategory(e),r=this._getCategoryCount(e)-s.length,o=this._getCategoryUrl(e);return g`
      <div class="category">
        <div class="category-header">
          <h3 class="category-title">
            <a href=${o} @click=${this._handleLinkClick}>
              ${t.label}
            </a>
          </h3>
          <p class="category-desc">${t.description}</p>
        </div>
        <ul class="products-list">
          ${s.map(a=>g`
              <li class="product-item">
                <a
                  href=${this._getProductUrl(a)}
                  class="product-link"
                  @click=${this._handleLinkClick}
                >
                  <span class="product-name">${a.name}</span>
                  <p class="product-tagline">${a.tagline}</p>
                </a>
              </li>
            `)}
        </ul>
        ${r>0?g`
              <a href=${o} class="view-more" @click=${this._handleLinkClick}>
                +${r} more ${t.label.toLowerCase()}
                ${gt}
              </a>
            `:h}
      </div>
    `}},c(H,"PlexusMegaMenu"),H),d.PlexusMegaMenu.styles=vt,Z([y({type:Boolean,reflect:!0})],d.PlexusMegaMenu.prototype,"open",2),Z([y({type:Object})],d.PlexusMegaMenu.prototype,"data",2),Z([y({type:String})],d.PlexusMegaMenu.prototype,"baseUrl",2),d.PlexusMegaMenu=Z([me("plexus-mega-menu")],d.PlexusMegaMenu);const _t=[...be,k`
    :host {
      display: none;
    }

    :host([open]) {
      display: block;
    }

    @media (min-width: 769px) {
      :host {
        display: none !important;
      }
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    .mobile-menu {
      padding: 1rem;
      border-top: 1px solid var(--border-light);
      background: var(--plexus-dark-80);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }

    .mobile-section {
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--border-lighter);
    }

    .mobile-section:last-child {
      border-bottom: none;
    }

    .mobile-label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-subtle);
      margin-bottom: 8px;
    }

    .mobile-link {
      display: block;
      padding: 8px 0;
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 14px;
      transition: color 0.15s ease;
      border-radius: 4px;
    }

    .mobile-link:hover {
      color: var(--plexus-cyan);
    }

    .mobile-link:focus-visible {
      outline: 2px solid var(--plexus-purple);
      outline-offset: 2px;
    }

    .mobile-link-github {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--plexus-purple-light);
    }

    .mobile-link-rss {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
  `];var yt=Object.defineProperty,xt=Object.getOwnPropertyDescriptor,Q=c((n,e,t,s)=>{for(var i=s>1?void 0:s?xt(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&yt(e,t,i),i},"__decorateClass$1");d.PlexusMobileMenu=(L=class extends v{constructor(){super(...arguments),this.open=!1,this.data=null,this.baseUrl="https://plexusone.dev",this._handleLinkClick=()=>{this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}}render(){return this.data?g`
      <div class="mobile-menu" role="navigation" aria-label="Mobile navigation">
        <!-- Products section -->
        <div class="mobile-section">
          <span class="mobile-label">Products</span>
          ${fe.map(e=>{var i;const t=(i=this.data)==null?void 0:i.categories[e];if(!t)return h;const s=`${this.baseUrl}${K[e]}`;return g`
              <a href=${s} class="mobile-link" @click=${this._handleLinkClick}>
                ${t.label}
              </a>
            `})}
          <a
            href="${this.baseUrl}/integrations"
            class="mobile-link"
            @click=${this._handleLinkClick}
          >
            Integrations
          </a>
        </div>

        <!-- Projects section -->
        <div class="mobile-section">
          <a
            href="${this.baseUrl}/projects"
            class="mobile-link"
            @click=${this._handleLinkClick}
          >
            Projects
          </a>
        </div>

        <!-- Developers section -->
        <div class="mobile-section">
          <span class="mobile-label">Developers</span>
          <a
            href="${this.baseUrl}/academy"
            class="mobile-link"
            @click=${this._handleLinkClick}
          >
            Academy
          </a>
          <a
            href="${this.baseUrl}/mcp"
            class="mobile-link"
            @click=${this._handleLinkClick}
          >
            MCP
          </a>
        </div>

        <!-- Community section -->
        <div class="mobile-section">
          <span class="mobile-label">Community</span>
          <a
            href="${this.baseUrl}/blog"
            class="mobile-link"
            @click=${this._handleLinkClick}
          >
            Blog
          </a>
          <a
            href="${this.baseUrl}/releases"
            class="mobile-link"
            @click=${this._handleLinkClick}
          >
            Releases
          </a>
          <a
            href="${this.baseUrl}/#philosophy"
            class="mobile-link"
            @click=${this._handleLinkClick}
          >
            Philosophy
          </a>
          <a
            href="${this.baseUrl}/blog/atom.xml"
            target="_blank"
            rel="noopener noreferrer"
            class="mobile-link mobile-link-rss"
          >
            ${Ve}
            RSS Feed
          </a>
        </div>

        <!-- GitHub section -->
        <div class="mobile-section">
          <a
            href="${J}"
            target="_blank"
            rel="noopener noreferrer"
            class="mobile-link mobile-link-github"
          >
            ${Ge}
            GitHub
          </a>
        </div>
      </div>
    `:h}},c(L,"PlexusMobileMenu"),L),d.PlexusMobileMenu.styles=_t,Q([y({type:Boolean,reflect:!0})],d.PlexusMobileMenu.prototype,"open",2),Q([y({type:Object})],d.PlexusMobileMenu.prototype,"data",2),Q([y({type:String})],d.PlexusMobileMenu.prototype,"baseUrl",2),d.PlexusMobileMenu=Q([me("plexus-mobile-menu")],d.PlexusMobileMenu);var kt=Object.defineProperty,wt=Object.getOwnPropertyDescriptor,b=c((n,e,t,s)=>{for(var i=s>1?void 0:s?wt(e,t):e,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=(s?o(e,t,i):o(i))||i);return s&&i&&kt(e,t,i),i},"__decorateClass");return d.PlexusNav=(N=class extends v{constructor(){super(),this.config={},this._data=null,this._megaMenuOpen=!1,this._mobileMenuOpen=!1,this._activeDropdown=null,this._baseUrl=ve,this._boundHandleKeydown=this._handleKeydown.bind(this),this._boundHandleClickOutside=this._handleClickOutside.bind(this)}connectedCallback(){super.connectedCallback(),this._baseUrl=this.config.baseUrl??ve,this._fetchProducts(),document.addEventListener("keydown",this._boundHandleKeydown),document.addEventListener("mousedown",this._boundHandleClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this._boundHandleKeydown),document.removeEventListener("mousedown",this._boundHandleClickOutside)}async _fetchProducts(){const e=this.config.productsUrl??`${this._baseUrl}/data/products.json`;try{const t=await fetch(e);if(!t.ok)throw new Error(`Failed to fetch: ${t.status}`);this._data=await t.json()}catch(t){console.warn("PlexusNav: Failed to load products.json",t)}}_handleKeydown(e){var t,s;e.key==="Escape"&&(this._activeDropdown?this._activeDropdown=null:this._megaMenuOpen?(this._megaMenuOpen=!1,(t=this._megaMenuTrigger)==null||t.focus()):this._mobileMenuOpen&&(this._mobileMenuOpen=!1,(s=this._mobileToggle)==null||s.focus()))}_handleClickOutside(e){const t=e.target;if(this._activeDropdown){const s=this._activeDropdown==="developers"?this._developersDropdown:this._communityDropdown;s&&!s.contains(t)&&(this._activeDropdown=null)}}_toggleMegaMenu(){this._activeDropdown=null,this._megaMenuOpen=!this._megaMenuOpen}_toggleDropdown(e){this._megaMenuOpen=!1,this._activeDropdown=this._activeDropdown===e?null:e}_toggleMobileMenu(){this._mobileMenuOpen=!this._mobileMenuOpen}_closeMegaMenu(){this._megaMenuOpen=!1}_closeMobileMenu(){this._mobileMenuOpen=!1}_closeDropdowns(){this._activeDropdown=null}render(){return g`
      <nav class="nav" aria-label="PlexusOne main navigation">
        <a href="#main-content" class="skip-link">Skip to main content</a>

        <div class="nav-container">
          ${this._renderBrand()}
          ${this._renderDesktopLinks()}
          ${this._renderMobileToggle()}
        </div>

        <plexus-mega-menu
          ?open=${this._megaMenuOpen}
          .data=${this._data}
          .baseUrl=${this._baseUrl}
          @close=${this._closeMegaMenu}
        ></plexus-mega-menu>

        <plexus-mobile-menu
          ?open=${this._mobileMenuOpen}
          .data=${this._data}
          .baseUrl=${this._baseUrl}
          @close=${this._closeMobileMenu}
        ></plexus-mobile-menu>
      </nav>
    `}_renderBrand(){return g`
      <a href="${this._baseUrl}/" class="nav-brand">
        <img src="${this._baseUrl}/icon.png" alt="PlexusOne" class="nav-logo" />
        <span class="nav-title">
          <span class="gradient-text">Plexus</span><span class="nav-title-light">One</span>
        </span>
      </a>
    `}_renderDesktopLinks(){return g`
      <div class="nav-links">
        <!-- Products mega menu trigger -->
        <button
          class="nav-link megamenu-trigger"
          aria-expanded=${this._megaMenuOpen}
          aria-haspopup="true"
          @click=${this._toggleMegaMenu}
        >
          Products ${Ie}
        </button>

        <!-- Projects link -->
        <a href="${this._baseUrl}/projects" class="nav-link">Projects</a>

        <!-- Developers dropdown -->
        ${this._renderDropdown("developers","Developers",[{label:"Academy",url:`${this._baseUrl}/academy`},{label:"MCP",url:`${this._baseUrl}/mcp`}])}

        <!-- Community dropdown -->
        ${this._renderDropdown("community","Community",[{label:"Blog",url:`${this._baseUrl}/blog`},{label:"Releases",url:`${this._baseUrl}/releases`},{label:"Philosophy",url:`${this._baseUrl}/#philosophy`}],[{label:"RSS Feed",url:`${this._baseUrl}/blog/atom.xml`,external:!0,icon:Ve}])}

        <!-- GitHub button -->
        <a
          href="${J}"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-github"
        >
          ${Ge} GitHub
        </a>
      </div>
    `}_renderDropdown(e,t,s,i){const r=this._activeDropdown===e;return g`
      <div class="nav-dropdown ${r?"open":""}" data-dropdown=${e}>
        <button
          class="nav-link"
          aria-expanded=${r}
          aria-haspopup="true"
          @click=${()=>this._toggleDropdown(e)}
        >
          ${t} ${Ie}
        </button>
        <div class="nav-dropdown-menu">
          ${s.map(o=>g`
              <a
                href=${o.url}
                class="nav-dropdown-item"
                @click=${this._closeDropdowns}
              >
                ${o.label}
              </a>
            `)}
          ${i?g`
                <div class="nav-dropdown-divider"></div>
                ${i.map(o=>g`
                    <a
                      href=${o.url}
                      class="nav-dropdown-item"
                      target=${o.external?"_blank":h}
                      rel=${o.external?"noopener noreferrer":h}
                      @click=${this._closeDropdowns}
                    >
                      ${o.icon} ${o.label}
                    </a>
                  `)}
              `:h}
        </div>
      </div>
    `}_renderMobileToggle(){return g`
      <button
        class="nav-mobile-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded=${this._mobileMenuOpen}
        aria-controls="mobile-menu"
        @click=${this._toggleMobileMenu}
      >
        ${mt} ${bt}
      </button>
    `}},c(N,"PlexusNav"),N),d.PlexusNav.styles=ut,b([y({type:Object})],d.PlexusNav.prototype,"config",2),b([W()],d.PlexusNav.prototype,"_data",2),b([W()],d.PlexusNav.prototype,"_megaMenuOpen",2),b([W()],d.PlexusNav.prototype,"_mobileMenuOpen",2),b([W()],d.PlexusNav.prototype,"_activeDropdown",2),b([Y(".nav-mobile-toggle")],d.PlexusNav.prototype,"_mobileToggle",2),b([Y(".megamenu-trigger")],d.PlexusNav.prototype,"_megaMenuTrigger",2),b([Y('[data-dropdown="developers"]')],d.PlexusNav.prototype,"_developersDropdown",2),b([Y('[data-dropdown="community"]')],d.PlexusNav.prototype,"_communityDropdown",2),d.PlexusNav=b([me("plexus-nav")],d.PlexusNav),d.CATEGORY_ORDER=fe,d.CATEGORY_PATHS=K,d.DEFAULT_BASE_URL=ve,d.GITHUB_URL=J,Object.defineProperty(d,Symbol.toStringTag,{value:"Module"}),d}({});
//# sourceMappingURL=plexus-nav.min.js.map
