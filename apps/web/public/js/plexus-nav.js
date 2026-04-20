var Ke = Object.defineProperty;
var c = (o, e) => Ke(o, "name", { value: e, configurable: !0 });
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, he = W.ShadowRoot && (W.ShadyCSS === void 0 || W.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ue = Symbol(), Ce = /* @__PURE__ */ new WeakMap();
var S;
let Ne = (S = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== ue) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (he && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = Ce.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Ce.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
}, c(S, "n"), S);
const Je = /* @__PURE__ */ c((o) => new Ne(typeof o == "string" ? o : o + "", void 0, ue), "r$4"), E = /* @__PURE__ */ c((o, ...e) => {
  const t = o.length === 1 ? o[0] : e.reduce((s, i, n) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[n + 1], o[0]);
  return new Ne(t, o, ue);
}, "i$3"), Ze = /* @__PURE__ */ c((o, e) => {
  if (he) o.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), i = W.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = t.cssText, o.appendChild(s);
  }
}, "S$1"), Ee = he ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return Je(t);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Qe, defineProperty: Xe, getOwnPropertyDescriptor: et, getOwnPropertyNames: tt, getOwnPropertySymbols: st, getPrototypeOf: it } = Object, y = globalThis, Pe = y.trustedTypes, ot = Pe ? Pe.emptyScript : "", se = y.reactiveElementPolyfillSupport, B = /* @__PURE__ */ c((o, e) => o, "d$1"), Y = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? ot : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, e) {
  let t = o;
  switch (e) {
    case Boolean:
      t = o !== null;
      break;
    case Number:
      t = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(o);
      } catch {
        t = null;
      }
  }
  return t;
} }, ge = /* @__PURE__ */ c((o, e) => !Qe(o, e), "f$1"), Se = { attribute: !0, type: String, converter: Y, reflect: !1, useDefault: !1, hasChanged: ge };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), y.litPropertyMetadata ?? (y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var U;
let P = (U = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Se) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, t);
      i !== void 0 && Xe(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: i, set: n } = et(this.prototype, e) ?? { get() {
      return this[t];
    }, set(r) {
      this[t] = r;
    } };
    return { get: i, set(r) {
      const l = i == null ? void 0 : i.call(this);
      n == null || n.call(this, r), this.requestUpdate(e, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Se;
  }
  static _$Ei() {
    if (this.hasOwnProperty(B("elementProperties"))) return;
    const e = it(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(B("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(B("properties"))) {
      const t = this.properties, s = [...tt(t), ...st(t)];
      for (const i of s) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, i] of t) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const i = this._$Eu(t, s);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const i of s) t.unshift(Ee(i));
    } else e !== void 0 && t.push(Ee(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ze(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var s;
      return (s = t.hostConnected) == null ? void 0 : s.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var s;
      return (s = t.hostDisconnected) == null ? void 0 : s.call(t);
    });
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$ET(e, t) {
    var n;
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const r = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : Y).toAttribute(t, s.type);
      this._$Em = e, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var n, r;
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const l = s.getPropertyOptions(i), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((n = l.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? l.converter : Y;
      this._$Em = i;
      const h = a.fromAttribute(t, l.type);
      this[i] = h ?? ((r = this._$Ej) == null ? void 0 : r.get(i)) ?? h, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, i = !1, n) {
    var r;
    if (e !== void 0) {
      const l = this.constructor;
      if (i === !1 && (n = this[e]), s ?? (s = l.getPropertyOptions(e)), !((s.hasChanged ?? ge)(n, t) || s.useDefault && s.reflect && n === ((r = this._$Ej) == null ? void 0 : r.get(e)) && !this.hasAttribute(l._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: i, wrapped: n }, r) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, r ?? t ?? this[e]), n !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, r] of i) {
        const { wrapped: l } = r, a = this[n];
        l !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, r, a);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (s = this._$EO) == null || s.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}, c(U, "y"), U);
P.elementStyles = [], P.shadowRootOptions = { mode: "open" }, P[B("elementProperties")] = /* @__PURE__ */ new Map(), P[B("finalized")] = /* @__PURE__ */ new Map(), se == null || se({ ReactiveElement: P }), (y.reactiveElementVersions ?? (y.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = globalThis, Ue = /* @__PURE__ */ c((o) => o, "i$1"), K = N.trustedTypes, Me = K ? K.createPolicy("lit-html", { createHTML: /* @__PURE__ */ c((o) => o, "createHTML") }) : void 0, Ie = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, Ve = "?" + _, rt = `<${Ve}>`, C = document, I = /* @__PURE__ */ c(() => C.createComment(""), "c"), V = /* @__PURE__ */ c((o) => o === null || typeof o != "object" && typeof o != "function", "a"), me = Array.isArray, nt = /* @__PURE__ */ c((o) => me(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", "d"), ie = `[ 	
\f\r]`, R = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Oe = /-->/g, De = />/g, k = RegExp(`>|${ie}(?:([^\\s"'>=/]+)(${ie}*=${ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Te = /'/g, He = /"/g, qe = /^(?:script|style|textarea|title)$/i, at = /* @__PURE__ */ c((o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), "x"), u = at(1), T = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), Le = /* @__PURE__ */ new WeakMap(), w = C.createTreeWalker(C, 129);
function Ge(o, e) {
  if (!me(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Me !== void 0 ? Me.createHTML(e) : e;
}
c(Ge, "V");
const lt = /* @__PURE__ */ c((o, e) => {
  const t = o.length - 1, s = [];
  let i, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = R;
  for (let l = 0; l < t; l++) {
    const a = o[l];
    let h, g, p = -1, f = 0;
    for (; f < a.length && (r.lastIndex = f, g = r.exec(a), g !== null); ) f = r.lastIndex, r === R ? g[1] === "!--" ? r = Oe : g[1] !== void 0 ? r = De : g[2] !== void 0 ? (qe.test(g[2]) && (i = RegExp("</" + g[2], "g")), r = k) : g[3] !== void 0 && (r = k) : r === k ? g[0] === ">" ? (r = i ?? R, p = -1) : g[1] === void 0 ? p = -2 : (p = r.lastIndex - g[2].length, h = g[1], r = g[3] === void 0 ? k : g[3] === '"' ? He : Te) : r === He || r === Te ? r = k : r === Oe || r === De ? r = R : (r = k, i = void 0);
    const $ = r === k && o[l + 1].startsWith("/>") ? " " : "";
    n += r === R ? a + rt : p >= 0 ? (s.push(h), a.slice(0, p) + Ie + a.slice(p) + _ + $) : a + _ + (p === -2 ? l : $);
  }
  return [Ge(o, n + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
}, "N"), J = class J {
  constructor({ strings: e, _$litType$: t }, s) {
    let i;
    this.parts = [];
    let n = 0, r = 0;
    const l = e.length - 1, a = this.parts, [h, g] = lt(e, t);
    if (this.el = J.createElement(h, s), w.currentNode = this.el.content, t === 2 || t === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = w.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(Ie)) {
          const f = g[r++], $ = i.getAttribute(p).split(_), F = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: n, name: F[2], strings: $, ctor: F[1] === "." ? ae : F[1] === "?" ? le : F[1] === "@" ? ce : L }), i.removeAttribute(p);
        } else p.startsWith(_) && (a.push({ type: 6, index: n }), i.removeAttribute(p));
        if (qe.test(i.tagName)) {
          const p = i.textContent.split(_), f = p.length - 1;
          if (f > 0) {
            i.textContent = K ? K.emptyScript : "";
            for (let $ = 0; $ < f; $++) i.append(p[$], I()), w.nextNode(), a.push({ type: 2, index: ++n });
            i.append(p[f], I());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ve) a.push({ type: 2, index: n });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(_, p + 1)) !== -1; ) a.push({ type: 7, index: n }), p += _.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const s = C.createElement("template");
    return s.innerHTML = e, s;
  }
};
c(J, "S");
let q = J;
function H(o, e, t = o, s) {
  var r, l;
  if (e === T) return e;
  let i = s !== void 0 ? (r = t._$Co) == null ? void 0 : r[s] : t._$Cl;
  const n = V(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), n === void 0 ? i = void 0 : (i = new n(o), i._$AT(o, t, s)), s !== void 0 ? (t._$Co ?? (t._$Co = []))[s] = i : t._$Cl = i), i !== void 0 && (e = H(o, i._$AS(o, e.values), i, s)), e;
}
c(H, "M");
const $e = class $e {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: s } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? C).importNode(t, !0);
    w.currentNode = i;
    let n = w.nextNode(), r = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let h;
        a.type === 2 ? h = new G(n, n.nextSibling, this, e) : a.type === 1 ? h = new a.ctor(n, a.name, a.strings, this, e) : a.type === 6 && (h = new de(n, this, e)), this._$AV.push(h), a = s[++l];
      }
      r !== (a == null ? void 0 : a.index) && (n = w.nextNode(), r++);
    }
    return w.currentNode = C, i;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
};
c($e, "R");
let ne = $e;
const Z = class Z {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, s, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = H(this, e, t), V(e) ? e === d || e == null || e === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : e !== this._$AH && e !== T && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : nt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== d && V(this._$AH) ? this._$AA.nextSibling.data = e : this.T(C.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: t, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = q.createElement(Ge(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(t);
    else {
      const r = new ne(i, this), l = r.u(this.options);
      r.p(t), this.T(l), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = Le.get(e.strings);
    return t === void 0 && Le.set(e.strings, t = new q(e)), t;
  }
  k(e) {
    me(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, i = 0;
    for (const n of e) i === t.length ? t.push(s = new Z(this.O(I()), this.O(I()), this, this.options)) : s = t[i], s._$AI(n), i++;
    i < t.length && (this._$AR(s && s._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = Ue(e).nextSibling;
      Ue(e).remove(), e = i;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
};
c(Z, "k");
let G = Z;
const _e = class _e {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, i, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(e, t = this, s, i) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) e = H(this, e, t, 0), r = !V(e) || e !== this._$AH && e !== T, r && (this._$AH = e);
    else {
      const l = e;
      let a, h;
      for (e = n[0], a = 0; a < n.length - 1; a++) h = H(this, l[s + a], t, a), h === T && (h = this._$AH[a]), r || (r = !V(h) || h !== this._$AH[a]), h === d ? e = d : e !== d && (e += (h ?? "") + n[a + 1]), this._$AH[a] = h;
    }
    r && !i && this.j(e);
  }
  j(e) {
    e === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
};
c(_e, "H");
let L = _e;
const ye = class ye extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === d ? void 0 : e;
  }
};
c(ye, "I");
let ae = ye;
const xe = class xe extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== d);
  }
};
c(xe, "L");
let le = xe;
const ke = class ke extends L {
  constructor(e, t, s, i, n) {
    super(e, t, s, i, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = H(this, e, t, 0) ?? d) === T) return;
    const s = this._$AH, i = e === d && s !== d || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
};
c(ke, "z");
let ce = ke;
const we = class we {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    H(this, e);
  }
};
c(we, "Z");
let de = we;
const oe = N.litHtmlPolyfillSupport;
oe == null || oe(q, G), (N.litHtmlVersions ?? (N.litHtmlVersions = [])).push("3.3.2");
const ct = /* @__PURE__ */ c((o, e, t) => {
  const s = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = (t == null ? void 0 : t.renderBefore) ?? null;
    s._$litPart$ = i = new G(e.insertBefore(I(), n), n, void 0, t ?? {});
  }
  return i._$AI(o), i;
}, "D");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A = globalThis, Ae = class Ae extends P {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ct(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return T;
  }
};
c(Ae, "i");
let v = Ae;
var Be;
v._$litElement$ = !0, v.finalized = !0, (Be = A.litElementHydrateSupport) == null || Be.call(A, { LitElement: v });
const re = A.litElementPolyfillSupport;
re == null || re({ LitElement: v });
(A.litElementVersions ?? (A.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const be = /* @__PURE__ */ c((o) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(o, e);
  }) : customElements.define(o, e);
}, "t");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt = { attribute: !0, type: String, converter: Y, reflect: !1, hasChanged: ge }, pt = /* @__PURE__ */ c((o = dt, e, t) => {
  const { kind: s, metadata: i } = t;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), s === "setter" && ((o = Object.create(o)).wrapped = !0), n.set(t.name, o), s === "accessor") {
    const { name: r } = t;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(r, a, o, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(r, void 0, o, l), l;
    } };
  }
  if (s === "setter") {
    const { name: r } = t;
    return function(l) {
      const a = this[r];
      e.call(this, l), this.requestUpdate(r, a, o, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
}, "r$1");
function x(o) {
  return (e, t) => typeof t == "object" ? pt(o, e, t) : ((s, i, n) => {
    const r = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, s), r ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(o, e, t);
}
c(x, "n");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Q(o) {
  return x({ ...o, state: !0, attribute: !1 });
}
c(Q, "r");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht = /* @__PURE__ */ c((o, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(o, e, t), t), "e$1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function X(o, e) {
  return (t, s, i) => {
    const n = /* @__PURE__ */ c((r) => {
      var l;
      return ((l = r.renderRoot) == null ? void 0 : l.querySelector(o)) ?? null;
    }, "o");
    return ht(t, s, { get() {
      return n(this);
    } });
  };
}
c(X, "e");
const ut = E`
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
`, gt = E`
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
`, mt = E`
  .transition-colors {
    transition: color 0.15s ease;
  }

  .transition-all {
    transition: all 0.15s ease;
  }

  .transition-transform {
    transition: transform 0.2s ease;
  }
`, bt = E`
  .focus-ring:focus-visible {
    outline: 2px solid var(--plexus-purple);
    outline-offset: 2px;
  }
`, fe = [ut, gt, mt, bt], ft = [
  ...fe,
  E`
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
  `
], ze = u`
  <svg class="icon-chevron" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
  </svg>
`, vt = u`
  <svg class="icon-chevron-small" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
    <path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
  </svg>
`, Fe = u`
  <svg class="icon-github" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
`, $t = u`
  <svg class="icon-hamburger" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
  </svg>
`, _t = u`
  <svg class="icon-close" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
`, We = u`
  <svg class="icon-rss" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
    <path fill="currentColor" d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z"/>
  </svg>
`, je = "", Ye = ["library", "agent", "application", "specification"], pe = {
  library: "/libraries",
  agent: "/agents",
  application: "/applications",
  specification: "/specifications"
}, ve = "https://github.com/plexusone", yt = [
  ...fe,
  E`
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

    .footer-divider {
      color: var(--text-dim);
      margin: 0 0.25rem;
    }

    .footer-link-legal {
      font-size: 12px;
    }

    .mega-menu-stats {
      font-size: 12px;
      color: var(--text-dim);
    }
  `
];
var xt = Object.defineProperty, kt = Object.getOwnPropertyDescriptor, ee = /* @__PURE__ */ c((o, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? kt(e, t) : e, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (i = (s ? r(e, t, i) : r(i)) || i);
  return s && i && xt(e, t, i), i;
}, "__decorateClass$2"), M;
let z = (M = class extends v {
  constructor() {
    super(...arguments), this.open = !1, this.data = null, this.baseUrl = "https://plexusone.dev", this._handleBackdropClick = () => {
      this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
    }, this._handleLinkClick = () => {
      this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
    };
  }
  _getProductsByCategory(e) {
    return this.data ? this.data.products.filter((t) => t.category === e && t.featured && t.docsUrl).slice(0, 5) : [];
  }
  _getCategoryCount(e) {
    return this.data ? this.data.products.filter((t) => t.category === e && t.docsUrl).length : 0;
  }
  _getProductUrl(e) {
    const t = pe[e.category] || "/products";
    return `${this.baseUrl}${t}/${e.slug}`;
  }
  _getCategoryUrl(e) {
    return `${this.baseUrl}${pe[e]}`;
  }
  render() {
    if (!this.data) return d;
    const e = this.data.products.length, t = Object.keys(this.data.categories).length;
    return u`
      <div class="mega-menu">
        <div class="mega-menu-backdrop" @click=${this._handleBackdropClick}></div>
        <div class="mega-menu-panel">
          <div class="mega-menu-content">
            <div class="mega-menu-grid">
              ${Ye.map((s) => this._renderCategory(s))}
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
                  href="${ve}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="footer-link"
                >
                  GitHub
                </a>
                <span class="footer-divider">|</span>
                <a
                  href="${this.baseUrl}/trust/privacy-policy/"
                  class="footer-link footer-link-legal"
                  @click=${this._handleLinkClick}
                >
                  Privacy
                </a>
                <a
                  href="${this.baseUrl}/trust/terms-of-service/"
                  class="footer-link footer-link-legal"
                  @click=${this._handleLinkClick}
                >
                  Terms
                </a>
              </div>
              <span class="mega-menu-stats">
                ${e} products across ${t} categories
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  _renderCategory(e) {
    var l;
    const t = (l = this.data) == null ? void 0 : l.categories[e];
    if (!t) return d;
    const s = this._getProductsByCategory(e), n = this._getCategoryCount(e) - s.length, r = this._getCategoryUrl(e);
    return u`
      <div class="category">
        <div class="category-header">
          <h3 class="category-title">
            <a href=${r} @click=${this._handleLinkClick}>
              ${t.label}
            </a>
          </h3>
          <p class="category-desc">${t.description}</p>
        </div>
        <ul class="products-list">
          ${s.map(
      (a) => u`
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
            `
    )}
        </ul>
        ${n > 0 ? u`
              <a href=${r} class="view-more" @click=${this._handleLinkClick}>
                +${n} more ${t.label.toLowerCase()}
                ${vt}
              </a>
            ` : d}
      </div>
    `;
  }
}, c(M, "PlexusMegaMenu"), M);
z.styles = yt;
ee([
  x({ type: Boolean, reflect: !0 })
], z.prototype, "open", 2);
ee([
  x({ type: Object })
], z.prototype, "data", 2);
ee([
  x({ type: String })
], z.prototype, "baseUrl", 2);
z = ee([
  be("plexus-mega-menu")
], z);
const wt = [
  ...fe,
  E`
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
  `
];
var At = Object.defineProperty, Ct = Object.getOwnPropertyDescriptor, te = /* @__PURE__ */ c((o, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? Ct(e, t) : e, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (i = (s ? r(e, t, i) : r(i)) || i);
  return s && i && At(e, t, i), i;
}, "__decorateClass$1"), O;
let j = (O = class extends v {
  constructor() {
    super(...arguments), this.open = !1, this.data = null, this.baseUrl = "https://plexusone.dev", this._handleLinkClick = () => {
      this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
    };
  }
  render() {
    return this.data ? u`
      <div class="mobile-menu" role="navigation" aria-label="Mobile navigation">
        <!-- Products section -->
        <div class="mobile-section">
          <span class="mobile-label">Products</span>
          ${Ye.map((e) => {
      var i;
      const t = (i = this.data) == null ? void 0 : i.categories[e];
      if (!t) return d;
      const s = `${this.baseUrl}${pe[e]}`;
      return u`
              <a href=${s} class="mobile-link" @click=${this._handleLinkClick}>
                ${t.label}
              </a>
            `;
    })}
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
          <a
            href="${this.baseUrl}/tools/"
            class="mobile-link"
            @click=${this._handleLinkClick}
          >
            Tools
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
            ${We}
            RSS Feed
          </a>
        </div>

        <!-- GitHub section -->
        <div class="mobile-section">
          <a
            href="${ve}"
            target="_blank"
            rel="noopener noreferrer"
            class="mobile-link mobile-link-github"
          >
            ${Fe}
            GitHub
          </a>
        </div>
      </div>
    ` : d;
  }
}, c(O, "PlexusMobileMenu"), O);
j.styles = wt;
te([
  x({ type: Boolean, reflect: !0 })
], j.prototype, "open", 2);
te([
  x({ type: Object })
], j.prototype, "data", 2);
te([
  x({ type: String })
], j.prototype, "baseUrl", 2);
j = te([
  be("plexus-mobile-menu")
], j);
var Et = Object.defineProperty, Pt = Object.getOwnPropertyDescriptor, b = /* @__PURE__ */ c((o, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? Pt(e, t) : e, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (i = (s ? r(e, t, i) : r(i)) || i);
  return s && i && Et(e, t, i), i;
}, "__decorateClass"), D;
let m = (D = class extends v {
  constructor() {
    super(), this.config = {}, this._data = null, this._megaMenuOpen = !1, this._mobileMenuOpen = !1, this._activeDropdown = null, this._baseUrl = je, this._boundHandleKeydown = this._handleKeydown.bind(this), this._boundHandleClickOutside = this._handleClickOutside.bind(this);
  }
  connectedCallback() {
    super.connectedCallback(), this._baseUrl = this.config.baseUrl ?? je, this._fetchProducts(), document.addEventListener("keydown", this._boundHandleKeydown), document.addEventListener("mousedown", this._boundHandleClickOutside);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("keydown", this._boundHandleKeydown), document.removeEventListener("mousedown", this._boundHandleClickOutside);
  }
  async _fetchProducts() {
    const e = this.config.productsUrl ?? `${this._baseUrl}/data/products.json`;
    try {
      const t = await fetch(e);
      if (!t.ok) throw new Error(`Failed to fetch: ${t.status}`);
      this._data = await t.json();
    } catch (t) {
      console.warn("PlexusNav: Failed to load products.json", t);
    }
  }
  _handleKeydown(e) {
    var t, s;
    e.key === "Escape" && (this._activeDropdown ? this._activeDropdown = null : this._megaMenuOpen ? (this._megaMenuOpen = !1, (t = this._megaMenuTrigger) == null || t.focus()) : this._mobileMenuOpen && (this._mobileMenuOpen = !1, (s = this._mobileToggle) == null || s.focus()));
  }
  _handleClickOutside(e) {
    const t = e.target;
    if (this._activeDropdown) {
      const s = this._activeDropdown === "developers" ? this._developersDropdown : this._communityDropdown;
      s && !s.contains(t) && (this._activeDropdown = null);
    }
  }
  _toggleMegaMenu() {
    this._activeDropdown = null, this._megaMenuOpen = !this._megaMenuOpen;
  }
  _toggleDropdown(e) {
    this._megaMenuOpen = !1, this._activeDropdown = this._activeDropdown === e ? null : e;
  }
  _toggleMobileMenu() {
    this._mobileMenuOpen = !this._mobileMenuOpen;
  }
  _closeMegaMenu() {
    this._megaMenuOpen = !1;
  }
  _closeMobileMenu() {
    this._mobileMenuOpen = !1;
  }
  _closeDropdowns() {
    this._activeDropdown = null;
  }
  render() {
    return u`
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
    `;
  }
  _renderBrand() {
    return u`
      <a href="${this._baseUrl}/" class="nav-brand">
        <img src="${this._baseUrl}/icon.png" alt="PlexusOne" class="nav-logo" />
        <span class="nav-title">
          <span class="gradient-text">Plexus</span><span class="nav-title-light">One</span>
        </span>
      </a>
    `;
  }
  _renderDesktopLinks() {
    return u`
      <div class="nav-links">
        <!-- Products mega menu trigger -->
        <button
          class="nav-link megamenu-trigger"
          aria-expanded=${this._megaMenuOpen}
          aria-haspopup="true"
          @click=${this._toggleMegaMenu}
        >
          Products ${ze}
        </button>

        <!-- Projects link -->
        <a href="${this._baseUrl}/projects" class="nav-link">Projects</a>

        <!-- Developers dropdown -->
        ${this._renderDropdown("developers", "Developers", [
      { label: "Academy", url: `${this._baseUrl}/academy` },
      { label: "MCP", url: `${this._baseUrl}/mcp` },
      { label: "Tools", url: `${this._baseUrl}/tools/` }
    ])}

        <!-- Community dropdown -->
        ${this._renderDropdown(
      "community",
      "Community",
      [
        { label: "Blog", url: `${this._baseUrl}/blog` },
        { label: "Releases", url: `${this._baseUrl}/releases` },
        { label: "Philosophy", url: `${this._baseUrl}/#philosophy` }
      ],
      [
        {
          label: "RSS Feed",
          url: `${this._baseUrl}/blog/atom.xml`,
          external: !0,
          icon: We
        }
      ]
    )}

        <!-- GitHub button -->
        <a
          href="${ve}"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-github"
        >
          ${Fe} GitHub
        </a>
      </div>
    `;
  }
  _renderDropdown(e, t, s, i) {
    const n = this._activeDropdown === e;
    return u`
      <div class="nav-dropdown ${n ? "open" : ""}" data-dropdown=${e}>
        <button
          class="nav-link"
          aria-expanded=${n}
          aria-haspopup="true"
          @click=${() => this._toggleDropdown(e)}
        >
          ${t} ${ze}
        </button>
        <div class="nav-dropdown-menu">
          ${s.map(
      (r) => u`
              <a
                href=${r.url}
                class="nav-dropdown-item"
                @click=${this._closeDropdowns}
              >
                ${r.label}
              </a>
            `
    )}
          ${i ? u`
                <div class="nav-dropdown-divider"></div>
                ${i.map(
      (r) => u`
                    <a
                      href=${r.url}
                      class="nav-dropdown-item"
                      target=${r.external ? "_blank" : d}
                      rel=${r.external ? "noopener noreferrer" : d}
                      @click=${this._closeDropdowns}
                    >
                      ${r.icon} ${r.label}
                    </a>
                  `
    )}
              ` : d}
        </div>
      </div>
    `;
  }
  _renderMobileToggle() {
    return u`
      <button
        class="nav-mobile-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded=${this._mobileMenuOpen}
        aria-controls="mobile-menu"
        @click=${this._toggleMobileMenu}
      >
        ${$t} ${_t}
      </button>
    `;
  }
}, c(D, "PlexusNav"), D);
m.styles = ft;
b([
  x({ type: Object })
], m.prototype, "config", 2);
b([
  Q()
], m.prototype, "_data", 2);
b([
  Q()
], m.prototype, "_megaMenuOpen", 2);
b([
  Q()
], m.prototype, "_mobileMenuOpen", 2);
b([
  Q()
], m.prototype, "_activeDropdown", 2);
b([
  X(".nav-mobile-toggle")
], m.prototype, "_mobileToggle", 2);
b([
  X(".megamenu-trigger")
], m.prototype, "_megaMenuTrigger", 2);
b([
  X('[data-dropdown="developers"]')
], m.prototype, "_developersDropdown", 2);
b([
  X('[data-dropdown="community"]')
], m.prototype, "_communityDropdown", 2);
m = b([
  be("plexus-nav")
], m);
function Re() {
  const o = document.getElementById("plexus-nav-root");
  if (o && !o.querySelector("plexus-nav")) {
    const e = document.createElement("plexus-nav");
    o.appendChild(e);
  }
}
c(Re, "autoInit");
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Re) : Re();
export {
  Ye as CATEGORY_ORDER,
  pe as CATEGORY_PATHS,
  je as DEFAULT_BASE_URL,
  ve as GITHUB_URL,
  z as PlexusMegaMenu,
  j as PlexusMobileMenu,
  m as PlexusNav
};
//# sourceMappingURL=plexus-nav.js.map
