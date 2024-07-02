var Kt = Object.defineProperty;
var zt = (e, t, r) => t in e ? Kt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Ee = (e, t, r) => (zt(e, typeof t != "symbol" ? t + "" : t, r), r);
import { feathers as Ht } from "@feathersjs/feathers";
import { defineStore as Yt } from "pinia";
import { unref as L, ref as j, isRef as z, computed as g, watch as be, reactive as ie, set as Q, del as W } from "vue-demi";
import { _ as se } from "@feathersjs/commons";
import { sorter as Xt, select as et } from "@feathersjs/adapter-commons";
import { reactive as Zt, ref as er, watch as tr, unref as rr, isRef as nr } from "vue";
import { BadRequest as ir } from "@feathersjs/errors";
import { FetchClient as sr } from "@feathersjs/rest-client";
var me = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ie(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var or = function e(t, r) {
  if (t === r)
    return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor)
      return !1;
    var n, i, o;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length)
        return !1;
      for (i = n; i-- !== 0; )
        if (!e(t[i], r[i]))
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === r.toString();
    if (o = Object.keys(t), n = o.length, n !== Object.keys(r).length)
      return !1;
    for (i = n; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, o[i]))
        return !1;
    for (i = n; i-- !== 0; ) {
      var s = o[i];
      if (!e(t[s], r[s]))
        return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
};
const tt = /* @__PURE__ */ Ie(or);
var ur = Function.prototype.toString, Ae = Object.create, ar = Object.prototype.toString, cr = (
  /** @class */
  function() {
    function e() {
      this._keys = [], this._values = [];
    }
    return e.prototype.has = function(t) {
      return !!~this._keys.indexOf(t);
    }, e.prototype.get = function(t) {
      return this._values[this._keys.indexOf(t)];
    }, e.prototype.set = function(t, r) {
      this._keys.push(t), this._values.push(r);
    }, e;
  }()
);
function lr() {
  return new cr();
}
function fr() {
  return /* @__PURE__ */ new WeakMap();
}
var dr = typeof WeakMap < "u" ? fr : lr;
function Qe(e) {
  if (!e)
    return Ae(null);
  var t = e.constructor;
  if (t === Object)
    return e === Object.prototype ? {} : Ae(e);
  if (~ur.call(t).indexOf("[native code]"))
    try {
      return new t();
    } catch {
    }
  return Ae(e);
}
function pr(e) {
  var t = "";
  return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.unicode && (t += "u"), e.sticky && (t += "y"), t;
}
function hr(e) {
  return e.flags;
}
var vr = /test/g.flags === "g" ? hr : pr;
function lt(e) {
  var t = ar.call(e);
  return t.substring(8, t.length - 1);
}
function yr(e) {
  return e[Symbol.toStringTag] || lt(e);
}
var mr = typeof Symbol < "u" ? yr : lt, gr = Object.defineProperty, Sr = Object.getOwnPropertyDescriptor, ft = Object.getOwnPropertyNames, We = Object.getOwnPropertySymbols, dt = Object.prototype, pt = dt.hasOwnProperty, Or = dt.propertyIsEnumerable, ht = typeof We == "function";
function br(e) {
  return ft(e).concat(We(e));
}
var Ir = ht ? br : ft;
function we(e, t, r) {
  for (var n = Ir(e), i = 0, o = n.length, s = void 0, u = void 0; i < o; ++i)
    if (s = n[i], !(s === "callee" || s === "caller")) {
      if (u = Sr(e, s), !u) {
        t[s] = r.copier(e[s], r);
        continue;
      }
      !u.get && !u.set && (u.value = r.copier(u.value, r));
      try {
        gr(t, s, u);
      } catch {
        t[s] = u.value;
      }
    }
  return t;
}
function wr(e, t) {
  var r = new t.Constructor();
  t.cache.set(e, r);
  for (var n = 0, i = e.length; n < i; ++n)
    r[n] = t.copier(e[n], t);
  return r;
}
function _r(e, t) {
  var r = new t.Constructor();
  return t.cache.set(e, r), we(e, r, t);
}
function vt(e, t) {
  return e.slice(0);
}
function $r(e, t) {
  return e.slice(0, e.size, e.type);
}
function Pr(e, t) {
  return new t.Constructor(vt(e.buffer));
}
function jr(e, t) {
  return new t.Constructor(e.getTime());
}
function yt(e, t) {
  var r = new t.Constructor();
  return t.cache.set(e, r), e.forEach(function(n, i) {
    r.set(i, t.copier(n, t));
  }), r;
}
function kr(e, t) {
  return we(e, yt(e, t), t);
}
function Er(e, t) {
  var r = Qe(t.prototype);
  t.cache.set(e, r);
  for (var n in e)
    pt.call(e, n) && (r[n] = t.copier(e[n], t));
  return r;
}
function Ar(e, t) {
  var r = Qe(t.prototype);
  t.cache.set(e, r);
  for (var n in e)
    pt.call(e, n) && (r[n] = t.copier(e[n], t));
  for (var i = We(e), o = 0, s = i.length, u = void 0; o < s; ++o)
    u = i[o], Or.call(e, u) && (r[u] = t.copier(e[u], t));
  return r;
}
var qr = ht ? Ar : Er;
function Fr(e, t) {
  var r = Qe(t.prototype);
  return t.cache.set(e, r), we(e, r, t);
}
function qe(e, t) {
  return new t.Constructor(e.valueOf());
}
function Cr(e, t) {
  var r = new t.Constructor(e.source, vr(e));
  return r.lastIndex = e.lastIndex, r;
}
function ge(e, t) {
  return e;
}
function mt(e, t) {
  var r = new t.Constructor();
  return t.cache.set(e, r), e.forEach(function(n) {
    r.add(t.copier(n, t));
  }), r;
}
function Lr(e, t) {
  return we(e, mt(e, t), t);
}
var Tr = Array.isArray, Ge = Object.assign, Br = Object.getPrototypeOf || function(e) {
  return e.__proto__;
}, gt = {
  array: wr,
  arrayBuffer: vt,
  blob: $r,
  dataView: Pr,
  date: jr,
  error: ge,
  map: yt,
  object: qr,
  regExp: Cr,
  set: mt
}, Nr = Ge({}, gt, {
  array: _r,
  map: kr,
  object: Fr,
  set: Lr
});
function Mr(e) {
  return {
    Arguments: e.object,
    Array: e.array,
    ArrayBuffer: e.arrayBuffer,
    Blob: e.blob,
    Boolean: qe,
    DataView: e.dataView,
    Date: e.date,
    Error: e.error,
    Float32Array: e.arrayBuffer,
    Float64Array: e.arrayBuffer,
    Int8Array: e.arrayBuffer,
    Int16Array: e.arrayBuffer,
    Int32Array: e.arrayBuffer,
    Map: e.map,
    Number: qe,
    Object: e.object,
    Promise: ge,
    RegExp: e.regExp,
    Set: e.set,
    String: qe,
    WeakMap: ge,
    WeakSet: ge,
    Uint8Array: e.arrayBuffer,
    Uint8ClampedArray: e.arrayBuffer,
    Uint16Array: e.arrayBuffer,
    Uint32Array: e.arrayBuffer,
    Uint64Array: e.arrayBuffer
  };
}
function St(e) {
  var t = Ge({}, gt, e), r = Mr(t), n = r.Array, i = r.Object;
  function o(s, u) {
    if (u.prototype = u.Constructor = void 0, !s || typeof s != "object")
      return s;
    if (u.cache.has(s))
      return u.cache.get(s);
    if (u.prototype = Br(s), u.Constructor = u.prototype && u.prototype.constructor, !u.Constructor || u.Constructor === Object)
      return i(s, u);
    if (Tr(s))
      return n(s, u);
    var a = r[mr(s)];
    return a ? a(s, u) : typeof s.then == "function" ? s : i(s, u);
  }
  return function(u) {
    return o(u, {
      Constructor: void 0,
      cache: dr(),
      copier: o,
      prototype: void 0
    });
  };
}
function Rr(e) {
  return St(Ge({}, Nr, e));
}
var rt = Rr({}), ee = St({});
function he(e, t) {
  return Object.keys(t).forEach((r) => {
    Object.defineProperty(e, r, {
      enumerable: !1,
      configurable: !0,
      value: t[r]
    });
  }), e;
}
function Ot(e, t) {
  return Object.keys(t).forEach((r) => {
    Object.defineProperty(e, r, {
      enumerable: !1,
      configurable: !0,
      get: t[r]
    });
  }), e;
}
function is(e, t) {
  return Object.keys(t).forEach((r) => {
    Object.defineProperty(e, r, {
      enumerable: !1,
      configurable: !0,
      set: t[r]
    });
  }), e;
}
function ne(e, t) {
  return t && (Array.isArray(t) ? t.map((r) => e.new(r)) : t && Array.isArray(t.data) ? (t.data = t.data.map((r) => e.new(r)), t) : e.new(t));
}
function Dr(e) {
  return typeof Symbol < "u" ? Symbol.for(e) : e;
}
const Qr = Dr("@feathersjs/service");
function Fe({ queryInfo: e, service: t, store: r, qid: n }) {
  const o = r.pagination[n.value][e.queryId];
  if (!o)
    return null;
  const { total: s } = o, u = o[e.pageId];
  if (!u)
    return null;
  const { ids: a, queriedAt: c, ssr: l } = u, d = a.map((S) => r.itemsById[S]).filter((S) => S), I = ne(t, d);
  return { ...e, ids: a, items: I, total: s, queriedAt: c, queryState: o, ssr: l } || null;
}
function H(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Z(e) {
  const t = Array.isArray(e);
  return { items: t ? e : [e], isArray: t };
}
function Le(e, t) {
  if (!t)
    return e;
  const n = (typeof t == "string" ? [t] : Array.isArray(t) ? t : Object.keys(t || e)).map((i) => i.toString().split(".")[0]);
  return se.pick(e, ...n);
}
function bt(e, t, r) {
  const n = Le(e, r), i = Le(t, r);
  return typeof r != "string" && !Array.isArray(r) && Object.assign(i, r), tt(n, i) ? {} : Object.keys(i).reduce((u, a) => (tt(e[a], i[a]) || (u[a] = i[a]), u), {});
}
function Wr(e, t, r = "__tempId") {
  const { items: n, isArray: i } = Z(e), { items: o } = Z(t);
  return o.forEach((s, u) => {
    const a = n[u][r];
    a && he(s, { [r]: a });
  }), i ? o : o[0];
}
function Ce(e) {
  return typeof e == "object" && e != null ? e.toString() : e;
}
function Se(e, t) {
  if (e) {
    if (t && e[t] !== void 0)
      return Ce(e[t]);
    if (e.id !== void 0)
      return Ce(e.id);
    if (e._id !== void 0)
      return Ce(e._id);
  }
}
function X(e) {
  return e ? ee(L(e)) : {};
}
function fe(e) {
  return new Promise((t) => setTimeout(t, e));
}
function nt() {
  const e = j(0);
  return { count: e, add: () => {
    e.value = e.value + 1;
  }, sub: () => {
    e.value = e.value === 0 ? 0 : e.value - 1;
  } };
}
const Gr = (e) => e !== null && typeof e == "object", Ur = Array.isArray;
function It(e) {
  return e !== null && !z(e) && typeof e == "object" ? D(e) : L(e);
}
const Vr = (e) => e.map(It);
function Jr(e) {
  const t = {};
  return Object.keys(e).forEach((r) => {
    t[r] = It(e[r]);
  }), t;
}
function D(e) {
  const t = z(e) ? L(e) : e;
  return Gr(t) ? Ur(t) ? Vr(t) : Jr(t) : t;
}
function ss(e, t) {
  const r = Object.keys(t), n = se.omit(e, ...r);
  return Object.assign(t, ee(n));
}
function xr(e, t) {
  if (!e)
    return e;
  const r = (n) => t.createInStore(n);
  return Array.isArray(e) ? e.map(r) : r(e);
}
function wt(e, t, r) {
  const n = { enumerable: !1 };
  typeof r == "function" ? n.get = function() {
    return r(this);
  } : n.value = r, Object.defineProperty(e, t, n);
}
function Kr(e, t) {
  Object.keys(t).forEach((r) => wt(e, r, t[r]));
}
const zr = [
  "update",
  "hooks",
  "setMaxListeners",
  "getMaxListeners",
  "addListener",
  "prependListener",
  "once",
  "prependOnceListener",
  "removeListener",
  "off",
  "removeAllListeners",
  "listeners",
  "rawListeners",
  "emit",
  "eventNames",
  "listenerCount",
  "on"
];
function it(e) {
  return typeof e == "function" ? e() : L(e);
}
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const st = () => {
};
function Hr(e, t) {
  function r(...n) {
    return new Promise((i, o) => {
      Promise.resolve(e(() => t.apply(this, n), { fn: t, thisArg: this, args: n })).then(i).catch(o);
    });
  }
  return r;
}
function Yr(e, t = {}) {
  let r, n, i = st;
  const o = (u) => {
    clearTimeout(u), i(), i = st;
  };
  return (u) => {
    const a = it(e), c = it(t.maxWait);
    return r && o(r), a <= 0 || c !== void 0 && c <= 0 ? (n && (o(n), n = null), Promise.resolve(u())) : new Promise((l, d) => {
      i = t.rejectOnCancel ? d : l, c && !n && (n = setTimeout(() => {
        r && o(r), n = null, l(u());
      }, c)), r = setTimeout(() => {
        n && o(n), n = null, l(u());
      }, a);
    });
  };
}
function Xr(e, t = 200, r = {}) {
  return Hr(
    Yr(t, r),
    e
  );
}
var Zr = function(e, t) {
  t || (t = {}), typeof t == "function" && (t = { cmp: t });
  var r = typeof t.cycles == "boolean" ? t.cycles : !1, n = t.cmp && /* @__PURE__ */ function(o) {
    return function(s) {
      return function(u, a) {
        var c = { key: u, value: s[u] }, l = { key: a, value: s[a] };
        return o(c, l);
      };
    };
  }(t.cmp), i = [];
  return function o(s) {
    if (s && s.toJSON && typeof s.toJSON == "function" && (s = s.toJSON()), s !== void 0) {
      if (typeof s == "number")
        return isFinite(s) ? "" + s : "null";
      if (typeof s != "object")
        return JSON.stringify(s);
      var u, a;
      if (Array.isArray(s)) {
        for (a = "[", u = 0; u < s.length; u++)
          u && (a += ","), a += o(s[u]) || "null";
        return a + "]";
      }
      if (s === null)
        return "null";
      if (i.indexOf(s) !== -1) {
        if (r)
          return JSON.stringify("__cycle__");
        throw new TypeError("Converting circular structure to JSON");
      }
      var c = i.push(s) - 1, l = Object.keys(s).sort(n && n(s));
      for (a = "", u = 0; u < l.length; u++) {
        var d = l[u], I = o(s[d]);
        I && (a && (a += ","), a += JSON.stringify(d) + ":" + I);
      }
      return i.splice(c, 1), "{" + a + "}";
    }
  }(e);
};
const Oe = /* @__PURE__ */ Ie(Zr);
function en(e, t) {
  const { queryId: r, pageId: n } = t, i = e[r], o = i && i[n];
  return o && o.ids || [];
}
function tn(e, t, r) {
  const n = r.qid || "default", i = e.pagination[n] || {}, o = e.getQueryInfo(r);
  return en(i, o).map((a) => t.getFromStore(a).value).filter((a) => a);
}
function rn(e, t) {
  const { queryId: r } = t, n = e[r] || {};
  return [...new Set(Object.keys(n).filter((o) => !["total", "queryParams"].includes(o)).reduce((o, s) => {
    var u;
    return o = o.concat(((u = n == null ? void 0 : n[s]) == null ? void 0 : u.ids) || []), o;
  }, []))] || [];
}
function nn(e, t, r) {
  const n = r.qid || "default", i = e.pagination[n] || {}, o = e.getQueryInfo(r);
  return rn(i, o).map((a) => t.getFromStore(a).value).filter((a) => a);
}
function sn(e) {
  const { limit: t, skip: r, total: n, request: i } = e, o = g(() => n.value ? Math.ceil(n.value / t.value) : 1), s = g({
    set(h) {
      h < 1 ? h = 1 : h > o.value && (h = o.value);
      const w = t.value * Math.floor(h - 1);
      r.value = w;
    },
    get() {
      const h = r.value || 0;
      return o.value === 0 ? 0 : Math.floor(h / t.value + 1);
    }
  }), u = g(() => s.value - 1 > 0), a = g(() => s.value < o.value), c = async () => {
    i != null && i.value && await i.value;
  };
  return { pageCount: o, currentPage: s, canPrev: u, canNext: a, toStart: async () => (s.value = 1, await fe(0), c()), toEnd: async () => (s.value = o.value, await fe(0), c()), toPage: async (h) => (s.value = h, await fe(0), c()), next: async () => (s.value++, await fe(0), c()), prev: async () => (s.value--, await fe(0), c()) };
}
function on(e, t = {}, r) {
  var He, Ye, Xe, Ze;
  const { pagination: n, debounce: i = 100, immediate: o = !0, watch: s = !0, paginateOn: u = "client" } = t, { service: a } = r, { store: c } = a, l = g(() => {
    var k;
    return ((k = e.value) == null ? void 0 : k.qid) || "default";
  }), d = (n == null ? void 0 : n.limit) || j(((Ye = (He = e.value) == null ? void 0 : He.query) == null ? void 0 : Ye.$limit) || c.defaultLimit), I = (n == null ? void 0 : n.skip) || j(((Ze = (Xe = e.value) == null ? void 0 : Xe.query) == null ? void 0 : Ze.$skip) || 0), f = g(() => {
    var T;
    const k = D(((T = e.value) == null ? void 0 : T.query) || {});
    return {
      ...e.value,
      query: {
        ...k,
        $limit: d.value,
        $skip: I.value
      }
    };
  }), S = g(() => {
    var re;
    const k = D(((re = e.value) == null ? void 0 : re.query) || {}), T = se.omit(k, "$limit", "$skip");
    return { ...e.value, query: T };
  }), h = j(!1), w = j(!1), b = j(!1), m = j(null), O = () => m.value = null, A = j(D(e.value || {}));
  function _() {
    Oe(A.value) !== Oe(f.value) && (A.value = f.value);
  }
  let v = () => !0;
  const p = (k) => {
    v = k;
  }, y = g(() => {
    if (!c.pagination[l.value])
      return null;
    const T = c.getQueryInfo(A.value);
    return Fe({ queryInfo: T, service: a, store: c, qid: l });
  }), P = g(() => {
    if (!c.pagination[l.value])
      return null;
    const T = c.getQueryInfo(f.value);
    return Fe({ queryInfo: T, service: a, store: c, qid: l });
  }), $ = g(() => (h.value ? y.value : P.value) == null && u !== "client" ? [] : u === "server" ? nn(c, a, A.value) : a.findInStore(D(S.value)).data.filter((R) => R)), C = g(() => {
    const k = h.value ? y.value : P.value;
    if (k == null)
      return [];
    const T = $.value, R = k.items.find((ke) => ke), re = T.findIndex((ke) => ke[c.idField] === R[c.idField]), ye = Math.min(re, I.value);
    return T.slice(0, ye);
  }), F = g(() => {
    const k = C.value, T = I.value + (k.length - I.value);
    return {
      ...f.value,
      query: {
        ...f.value.query,
        $limit: d.value,
        $skip: T
      }
    };
  }), M = g(() => u === "server" ? tn(c, a, A.value) : u === "hybrid" ? a.findInStore(D(F)).data.filter((T) => T) : a.findInStore(D(f)).data.filter((T) => T)), q = j([]), E = g(() => q.value[q.value.length - 1] || null), B = g(() => q.value[q.value.length - 2] || null), x = j(0), te = j(null);
  function ce() {
    var k;
    (k = P.value) != null && k.ssr || (w.value || (w.value = !0), O(), h.value || (h.value = !0), b.value && (b.value = !1));
  }
  async function Pe(k) {
    const T = L(
      k ?? (u === "client" ? S.value : f.value)
    );
    if (!v())
      return Promise.resolve({ data: [] });
    ce(), x.value++;
    try {
      const R = await a.find(T);
      if (R.total) {
        const re = c.getQueryInfo(f.value), ye = Fe({ queryInfo: re, service: a, store: c, qid: l });
        ye && q.value.push(ye), q.value.length > 2 && q.value.shift();
      }
      return b.value = !0, R;
    } catch (R) {
      throw m.value = R, R;
    } finally {
      h.value = !1;
    }
  }
  const je = Xr(Pe, i), K = async (k) => {
    e.value !== null && (P.value && _(), v() && ce(), te.value = je(k), await te.value, _());
  }, U = g(() => {
    if (["server", "hybrid"].includes(u)) {
      const k = P.value || y.value;
      return (k == null ? void 0 : k.total) || 0;
    } else
      return a.countInStore(S.value).value;
  }), le = sn({ limit: d, skip: I, total: U, request: te }), { pageCount: ve, currentPage: Dt, canPrev: Qt, canNext: Wt, toStart: Gt, toEnd: Ut, toPage: Vt, next: Jt, prev: xt } = le, ze = g(() => (setTimeout(() => {
    j(U.value);
  }, 0), c.isSsr));
  return ze.value ? o && K() : ["server", "hybrid"].includes(u) && s && (be(
    f,
    () => {
      K();
    },
    { immediate: !1, flush: "sync" }
  ), o && K()), u === "server" && a.on && (a.on("created", () => {
    K();
  }), a.on("patched", () => {
    K();
  }), a.on("removed", () => {
    K();
  })), ie({
    paramsWithPagination: f,
    isSsr: ze,
    // ComputedRef<boolean>
    qid: l,
    // WritableComputedRef<string>
    // Data
    data: M,
    // ComputedRef<M[]>
    allLocalData: $,
    // ComputedRef<M[]>
    total: U,
    // ComputedRef<number>
    limit: d,
    // Ref<number>
    skip: I,
    // Ref<number>
    // Queries
    currentQuery: P,
    // ComputedRef<CurrentQuery<M> | null>
    cachedQuery: y,
    // ComputedRef<CurrentQuery<M> | null>
    latestQuery: E,
    // ComputedRef<QueryInfo | null>
    previousQuery: B,
    // ComputedRef<QueryInfo | null>
    // Requests & Watching
    find: K,
    // FindFn<M>
    request: te,
    // Ref<Promise<Paginated<M>>>
    requestCount: x,
    // Ref<number>
    queryWhen: p,
    // (queryWhenFn: () => boolean) => void
    // Request State
    isPending: g(() => h.value),
    // ComputedRef<boolean>
    haveBeenRequested: g(() => w.value),
    // ComputedRef<boolean>
    haveLoaded: g(() => b.value),
    // ComputedRef<boolean>
    error: g(() => m.value),
    // ComputedRef<any>
    clearError: O,
    // () => void
    // Pagination Utils
    pageCount: ve,
    // Ref<number>
    currentPage: Dt,
    // Ref<number>
    canPrev: Qt,
    // ComputedRef<boolean>
    canNext: Wt,
    // ComputedRef<boolean>
    next: Jt,
    // () => Promise<void>
    prev: xt,
    // () => Promise<void>
    toStart: Gt,
    // () => Promise<void>
    toEnd: Ut,
    // () => Promise<void>
    toPage: Vt
    // (page: number) => Promise<void>
  });
}
function un(e, t = j({}), r) {
  const { service: n } = r, i = z(e) ? e : j(e), o = z(t) ? t : j(t), { immediate: s = !0, watch: u = !0 } = o.value, a = g(() => n.store.isSsr), c = j(!1), l = j(!1), d = j(null), I = () => d.value = null, f = j([]), S = g(() => f.value.length && f.value[f.value.length - 1]), h = g(() => c.value && S.value != null ? n.store.getFromStore(S.value, o).value : n.store.getFromStore(i.value, o).value), w = n.store.getFromStore, b = g(() => !!h.value);
  let m = () => !0;
  const O = (y) => {
    m = y;
  }, A = j(0), _ = j(null);
  async function v() {
    const y = L(i), P = L(o);
    if (m()) {
      if (y == null)
        return null;
      A.value++, l.value = !0, c.value = !0, d.value = null;
      try {
        const $ = await n.get(y, P);
        return $ && y && f.value.push(y), $;
      } catch ($) {
        d.value = $;
      } finally {
        c.value = !1;
      }
    }
  }
  async function p() {
    return _.value = v(), await _.value;
  }
  return a.value ? s && p() : u && be(
    i,
    async () => {
      await p();
    },
    { immediate: s, flush: "pre" }
  ), ie({
    params: o,
    // Ref<GetClassParams>
    isSsr: a,
    // ComputedRef<boolean>
    // Data
    data: h,
    // ComputedRef<M | null>
    ids: f,
    // Ref<Id[]>
    getFromStore: w,
    // (id: Id | null, params: Params<Query>) => M | undefined
    // Requests & Watching
    get: p,
    // GetFn<M>
    request: _,
    // Ref<Promise<M | undefined>>
    requestCount: A,
    // Ref<number>
    queryWhen: O,
    // (queryWhenFn: () => boolean) => void
    // Request State
    isPending: g(() => c.value),
    // ComputedRef<boolean>
    hasBeenRequested: g(() => l.value),
    // ComputedRef<boolean>
    hasLoaded: g(() => b.value),
    // ComputedRef<boolean>
    error: g(() => d.value),
    // ComputedRef<any>
    clearError: I
    // () => void
  });
}
class an {
  constructor(t, r) {
    Ee(this, "store");
    Ee(this, "servicePath", "");
    this.service = t, this.options = r, this.store = r.store, this.servicePath = r.servicePath, this.options = r, this.options.methods = ["create", "patch", "remove"], this.options.events = ["created", "patched", "removed"];
    const n = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).concat(zr);
    for (const i in t)
      if (typeof t[i] == "function" && !n.includes(i)) {
        const o = this;
        o[i] = t[i].bind(t), this.options.methods.push(i);
      }
    Object.defineProperty(this, Qr, {
      value: this.options
    });
  }
  /**
   * Prepare new "instances" outside of store
   *
   * Functionally upgrades plain data to a service model "instance".
   * - flags each record with `__isSetup` to avoid duplicate work.
   */
  new(t = {}) {
    const r = this.store.new(t);
    return ie(r);
  }
  async find(t) {
    const r = X(t);
    return await this.service.find(r);
  }
  async findOne(t) {
    const r = X(t);
    r.query = r.query || {}, r.query.$limit = 1;
    const n = await this.service.find(r);
    return (n.data || n)[0] || null;
  }
  async count(t) {
    const r = X(t);
    return r.query = r.query || {}, r.query.$limit = 0, await this.service.find(r);
  }
  async get(t, r) {
    const n = X(r);
    return await this.service.get(t, n);
  }
  async create(t, r) {
    const n = X(r);
    return await this.service.create(t, n);
  }
  async patch(t, r, n) {
    const i = X(n);
    return await this.service.patch(t, r, i);
  }
  async remove(t, r) {
    const n = X(r);
    return await this.service.remove(L(t), n);
  }
  findInStore(t) {
    const r = this.store.findInStore(t);
    return ie({
      ...r,
      data: g(() => r.data.map((n) => ne(this, n)))
    });
  }
  findOneInStore(t) {
    return this.store.findOneInStore(t);
  }
  countInStore(t) {
    return this.store.countInStore(t);
  }
  getFromStore(t, r) {
    return this.store.getFromStore(t, r);
  }
  createInStore(t) {
    return this.store.createInStore(t);
  }
  patchInStore(t, r = {}, n = {}) {
    return this.store.patchInStore(t, r, n);
  }
  removeFromStore(t, r) {
    var i;
    const n = t != null ? this.getFromStore(t).value : null;
    if (n)
      return this.store.removeFromStore(n);
    if (t == null && ((i = L(r)) != null && i.query))
      return this.store.removeByQuery(r);
  }
  /* hybrid methods */
  useFind(t, r) {
    const n = z(t) ? t : j(t);
    return on(n, r, { service: this });
  }
  useGet(t, r = j({})) {
    const n = z(t) ? t : j(t), i = z(r) ? r : j(r);
    return un(n, i, { service: this });
  }
  useGetOnce(t, r = {}) {
    const n = z(r) ? r : j(r);
    Object.assign(n.value, { immediate: !1 });
    const i = this.useGet(t, n);
    return i.queryWhen(() => !i.data), i.get(), i;
  }
  /* events */
  on(t, r) {
    if (this.service.on)
      return this.service.on(t, r);
  }
  emit(t, ...r) {
    return this.service.emit ? this.service.emit(t, ...r) : !1;
  }
  removeListener(t, r) {
    if (this.service.removeListener)
      return this.service.removeListener(t, r);
  }
}
var _t = { exports: {} };
/*!
 * isomorphic-mongo-objectid - v@version@
 * Pure JavaScript implementation of mongodb ObjectId for the browser and server
 * https://github.com/john-doherty/isomorphic-mongo-objectid
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
(function(e) {
  (function() {
    var t = 0, r = Math.floor(Math.random() * 32767), n = Math.floor(Math.random() * 16777216);
    if (typeof window < "u") {
      var i = window.localStorage, o = parseInt(i.mongoMachineId, 10);
      o >= 0 && o <= 16777215 && (n = Math.floor(i.mongoMachineId)), i.mongoMachineId = n;
    }
    function s() {
      var u = arguments;
      if (!(this instanceof s))
        return u.length > 0 ? new s(u[0], u[1], u[2], u[3]) : new s();
      typeof u[0] == "object" ? (this.timestamp = u[0].timestamp, this.machine = u[0].machine, this.pid = u[0].pid, this.increment = u[0].increment) : typeof u[0] == "string" && u[0].length === 24 ? (this.timestamp = +("0x" + u[0].substr(0, 8)), this.machine = +("0x" + u[0].substr(8, 6)), this.pid = +("0x" + u[0].substr(14, 4)), this.increment = +("0x" + u[0].substr(18, 6))) : u.length === 4 && u[0] !== null ? (this.timestamp = u[0], this.machine = u[1], this.pid = u[2], this.increment = u[3]) : (this.timestamp = Math.floor((/* @__PURE__ */ new Date()).valueOf() / 1e3), this.machine = n, this.pid = r, this.increment = t++, t > 16777215 && (t = 0));
    }
    s.prototype.getDate = function() {
      return new Date(this.timestamp * 1e3);
    }, s.prototype.toArray = function() {
      var u = this.toString(), a = [], c;
      for (c = 0; c < 12; c++)
        a[c] = parseInt(u.slice(c * 2, c * 2 + 2), 16);
      return a;
    }, s.prototype.toString = function() {
      var u = this.timestamp.toString(16), a = this.machine.toString(16), c = this.pid.toString(16), l = this.increment.toString(16);
      return [
        "00000000".substr(0, 8 - u.length) + u,
        "000000".substr(0, 6 - a.length) + a,
        "0000".substr(0, 4 - c.length) + c,
        "000000".substr(0, 6 - l.length) + l
      ].join("");
    }, e.exports = s;
  })();
})(_t);
var cn = _t.exports, ln = cn;
const fn = /* @__PURE__ */ Ie(ln);
function $t(e, t) {
  if (e.__isStoreInstance)
    return e;
  const { idField: r, clonesById: n, clone: i, commit: o, reset: s, createInStore: u, removeFromStore: a } = t, c = e.__isClone || !1;
  return Object.defineProperty(e, "__isTemp", {
    configurable: !0,
    enumerable: !1,
    get() {
      return this[this.__idField] == null;
    }
  }), he(e, {
    __isStoreInstance: !0,
    __isClone: c,
    __idField: r,
    __tempId: e[r] == null && e.__tempId == null ? new fn().toString() : e.__tempId || void 0,
    hasClone() {
      const d = this[this.__idField] || this.__tempId;
      return n.value[d] || null;
    },
    clone(d = {}, I = {}) {
      return i(this, d, I);
    },
    commit(d = {}) {
      return o(this, d);
    },
    reset(d = {}) {
      return s(this, d);
    },
    createInStore() {
      return u(this);
    },
    removeFromStore() {
      return a(this);
    }
  });
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Te = function(e, t) {
  return Te = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var i in n)
      Object.prototype.hasOwnProperty.call(n, i) && (r[i] = n[i]);
  }, Te(e, t);
};
function N(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Te(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
var Ue = function(e) {
  var t = "[object " + e + "]";
  return function(r) {
    return dn(r) === t;
  };
}, dn = function(e) {
  return Object.prototype.toString.call(e);
}, oe = function(e) {
  return e instanceof Date ? e.getTime() : ue(e) ? e.map(oe) : e && typeof e.toJSON == "function" ? e.toJSON() : e;
}, pn = function(e) {
  return e ?? null;
}, ue = Ue("Array"), hn = Ue("Object"), vn = Ue("Function"), yn = function(e) {
  return e && (e.constructor === Object || e.constructor === Array || e.constructor.toString() === "function Object() { [native code] }" || e.constructor.toString() === "function Array() { [native code] }") && !e.toJSON;
}, Be = function(e, t) {
  if (e == null && e == t || e === t)
    return !0;
  if (Object.prototype.toString.call(e) !== Object.prototype.toString.call(t))
    return !1;
  if (ue(e)) {
    if (e.length !== t.length)
      return !1;
    for (var r = 0, n = e.length; r < n; r++)
      if (!Be(e[r], t[r]))
        return !1;
    return !0;
  } else if (hn(e)) {
    if (Object.keys(e).length !== Object.keys(t).length)
      return !1;
    for (var i in e)
      if (!Be(e[i], t[i]))
        return !1;
    return !0;
  }
  return !1;
}, Ne = function(e, t, r, n, i, o) {
  var s = t[n];
  if (ue(e) && isNaN(Number(s))) {
    for (var u = 0, a = e.length; u < a; u++)
      if (!Ne(e[u], t, r, n, u, e))
        return !1;
  }
  return n === t.length || e == null ? r(e, i, o, n === 0) : Ne(e[s], t, r, n + 1, s, e);
}, G = (
  /** @class */
  function() {
    function e(t, r, n, i) {
      this.params = t, this.owneryQuery = r, this.options = n, this.name = i, this.init();
    }
    return e.prototype.init = function() {
    }, e.prototype.reset = function() {
      this.done = !1, this.keep = !1;
    }, e;
  }()
), Ve = (
  /** @class */
  function(e) {
    N(t, e);
    function t(r, n, i, o) {
      var s = e.call(this, r, n, i) || this;
      return s.children = o, s;
    }
    return t.prototype.reset = function() {
      this.keep = !1, this.done = !1;
      for (var r = 0, n = this.children.length; r < n; r++)
        this.children[r].reset();
    }, t.prototype.childrenNext = function(r, n, i, o) {
      for (var s = !0, u = !0, a = 0, c = this.children.length; a < c; a++) {
        var l = this.children[a];
        if (l.done || l.next(r, n, i, o), l.keep || (u = !1), l.done) {
          if (!l.keep)
            break;
        } else
          s = !1;
      }
      this.done = s, this.keep = u;
    }, t;
  }(G)
), Pt = (
  /** @class */
  function(e) {
    N(t, e);
    function t(r, n, i, o, s) {
      var u = e.call(this, r, n, i, o) || this;
      return u.name = s, u;
    }
    return t;
  }(Ve)
), mn = (
  /** @class */
  function(e) {
    N(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !0, r;
    }
    return t.prototype.next = function(r, n, i, o) {
      this.childrenNext(r, n, i, o);
    }, t;
  }(Ve)
), Me = (
  /** @class */
  function(e) {
    N(t, e);
    function t(r, n, i, o, s) {
      var u = e.call(this, n, i, o, s) || this;
      return u.keyPath = r, u.propop = !0, u._nextNestedValue = function(a, c, l, d) {
        return u.childrenNext(a, c, l, d), !u.done;
      }, u;
    }
    return t.prototype.next = function(r, n, i) {
      Ne(r, this.keyPath, this._nextNestedValue, 0, n, i);
    }, t;
  }(Ve)
), Je = function(e, t) {
  if (e instanceof Function)
    return e;
  if (e instanceof RegExp)
    return function(n) {
      var i = typeof n == "string" && e.test(n);
      return e.lastIndex = 0, i;
    };
  var r = oe(e);
  return function(n) {
    return t(r, oe(n));
  };
}, J = (
  /** @class */
  function(e) {
    N(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !0, r;
    }
    return t.prototype.init = function() {
      this._test = Je(this.params, this.options.compare);
    }, t.prototype.next = function(r, n, i) {
      (!Array.isArray(i) || i.hasOwnProperty(n)) && this._test(r, n, i) && (this.done = !0, this.keep = !0);
    }, t;
  }(G)
), _e = function(e, t, r) {
  return new J(e, t, r);
}, gn = function(e) {
  return function(t, r, n, i) {
    return e(t, r, n, i);
  };
}, $e = function(e) {
  return gn(function(t, r, n, i) {
    var o = typeof oe(t), s = e(t);
    return new J(function(u) {
      var a = pn(u);
      return typeof oe(a) === o && s(a);
    }, r, n, i);
  });
}, Sn = function(e, t, r, n) {
  var i = n.operations[e];
  return i || jt(e), i(t, r, n, e);
}, jt = function(e) {
  throw new Error("Unsupported operation: " + e);
}, kt = function(e, t) {
  for (var r in e)
    if (t.operations.hasOwnProperty(r) || r.charAt(0) === "$")
      return !0;
  return !1;
}, On = function(e, t, r, n, i) {
  if (kt(t, i)) {
    var o = Et(t, r, i), s = o[0], u = o[1];
    if (u.length)
      throw new Error("Property queries must contain only operations, or exact objects.");
    return new Me(e, t, n, i, s);
  }
  return new Me(e, t, n, i, [
    new J(t, n, i)
  ]);
}, ae = function(e, t, r) {
  t === void 0 && (t = null);
  var n = r === void 0 ? {} : r, i = n.compare, o = n.operations, s = {
    compare: i || Be,
    operations: Object.assign({}, o || {})
  }, u = Et(e, null, s), a = u[0], c = u[1], l = [];
  return a.length && l.push(new Me([], e, t, s, a)), l.push.apply(l, c), l.length === 1 ? l[0] : new mn(e, t, s, l);
}, Et = function(e, t, r) {
  var n = [], i = [];
  if (!yn(e))
    return n.push(new J(e, e, r)), [n, i];
  for (var o in e)
    if (r.operations.hasOwnProperty(o)) {
      var s = Sn(o, e[o], e, r);
      if (s && !s.propop && t && !r.operations[t])
        throw new Error("Malformed query. " + o + " cannot be matched against property.");
      s != null && n.push(s);
    } else
      o.charAt(0) === "$" ? jt(o) : i.push(On(o.split("."), e[o], o, e, r));
  return [n, i];
}, bn = function(e) {
  return function(t, r, n) {
    return e.reset(), e.next(t, r, n), e.keep;
  };
}, In = (
  /** @class */
  function(e) {
    N(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !0, r;
    }
    return t.prototype.init = function() {
      this._test = Je(this.params, this.options.compare);
    }, t.prototype.reset = function() {
      e.prototype.reset.call(this), this.keep = !0;
    }, t.prototype.next = function(r) {
      this._test(r) && (this.done = !0, this.keep = !1);
    }, t;
  }(G)
), wn = (
  /** @class */
  function(e) {
    N(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !0, r;
    }
    return t.prototype.init = function() {
      if (!this.params || typeof this.params != "object")
        throw new Error("Malformed query. $elemMatch must by an object.");
      this._queryOperation = ae(this.params, this.owneryQuery, this.options);
    }, t.prototype.reset = function() {
      e.prototype.reset.call(this), this._queryOperation.reset();
    }, t.prototype.next = function(r) {
      if (ue(r)) {
        for (var n = 0, i = r.length; n < i; n++) {
          this._queryOperation.reset();
          var o = r[n];
          this._queryOperation.next(o, n, r, !1), this.keep = this.keep || this._queryOperation.keep;
        }
        this.done = !0;
      } else
        this.done = !1, this.keep = !1;
    }, t;
  }(G)
), _n = (
  /** @class */
  function(e) {
    N(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !0, r;
    }
    return t.prototype.init = function() {
      this._queryOperation = ae(this.params, this.owneryQuery, this.options);
    }, t.prototype.reset = function() {
      e.prototype.reset.call(this), this._queryOperation.reset();
    }, t.prototype.next = function(r, n, i, o) {
      this._queryOperation.next(r, n, i, o), this.done = this._queryOperation.done, this.keep = !this._queryOperation.keep;
    }, t;
  }(G)
), At = (
  /** @class */
  function(e) {
    N(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !0, r;
    }
    return t.prototype.init = function() {
    }, t.prototype.next = function(r) {
      ue(r) && r.length === this.params && (this.done = !0, this.keep = !0);
    }, t;
  }(G)
), qt = function(e) {
  if (e.length === 0)
    throw new Error("$and/$or/$nor must be a nonempty array");
}, Ft = (
  /** @class */
  function(e) {
    N(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !1, r;
    }
    return t.prototype.init = function() {
      var r = this;
      qt(this.params), this._ops = this.params.map(function(n) {
        return ae(n, null, r.options);
      });
    }, t.prototype.reset = function() {
      this.done = !1, this.keep = !1;
      for (var r = 0, n = this._ops.length; r < n; r++)
        this._ops[r].reset();
    }, t.prototype.next = function(r, n, i) {
      for (var o = !1, s = !1, u = 0, a = this._ops.length; u < a; u++) {
        var c = this._ops[u];
        if (c.next(r, n, i), c.keep) {
          o = !0, s = c.keep;
          break;
        }
      }
      this.keep = s, this.done = o;
    }, t;
  }(G)
), $n = (
  /** @class */
  function(e) {
    N(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !1, r;
    }
    return t.prototype.next = function(r, n, i) {
      e.prototype.next.call(this, r, n, i), this.keep = !this.keep;
    }, t;
  }(Ft)
), Ct = (
  /** @class */
  function(e) {
    N(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !0, r;
    }
    return t.prototype.init = function() {
      var r = this;
      this._testers = this.params.map(function(n) {
        if (kt(n, r.options))
          throw new Error("cannot nest $ under " + r.name.toLowerCase());
        return Je(n, r.options.compare);
      });
    }, t.prototype.next = function(r, n, i) {
      for (var o = !1, s = !1, u = 0, a = this._testers.length; u < a; u++) {
        var c = this._testers[u];
        if (c(r)) {
          o = !0, s = !0;
          break;
        }
      }
      this.keep = s, this.done = o;
    }, t;
  }(G)
), Pn = (
  /** @class */
  function(e) {
    N(t, e);
    function t(r, n, i, o) {
      var s = e.call(this, r, n, i, o) || this;
      return s.propop = !0, s._in = new Ct(r, n, i, o), s;
    }
    return t.prototype.next = function(r, n, i, o) {
      this._in.next(r, n, i), ue(i) && !o ? this._in.keep ? (this.keep = !1, this.done = !0) : n == i.length - 1 && (this.keep = !0, this.done = !0) : (this.keep = !this._in.keep, this.done = !0);
    }, t.prototype.reset = function() {
      e.prototype.reset.call(this), this._in.reset();
    }, t;
  }(G)
), jn = (
  /** @class */
  function(e) {
    N(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !0, r;
    }
    return t.prototype.next = function(r, n, i) {
      i.hasOwnProperty(n) === this.params && (this.done = !0, this.keep = !0);
    }, t;
  }(G)
), kn = (
  /** @class */
  function(e) {
    N(t, e);
    function t(r, n, i, o) {
      var s = e.call(this, r, n, i, r.map(function(u) {
        return ae(u, n, i);
      }), o) || this;
      return s.propop = !1, qt(r), s;
    }
    return t.prototype.next = function(r, n, i, o) {
      this.childrenNext(r, n, i, o);
    }, t;
  }(Pt)
), En = (
  /** @class */
  function(e) {
    N(t, e);
    function t(r, n, i, o) {
      var s = e.call(this, r, n, i, r.map(function(u) {
        return ae(u, n, i);
      }), o) || this;
      return s.propop = !0, s;
    }
    return t.prototype.next = function(r, n, i, o) {
      this.childrenNext(r, n, i, o);
    }, t;
  }(Pt)
), An = function(e, t, r) {
  return new J(e, t, r);
}, qn = function(e, t, r, n) {
  return new In(e, t, r, n);
}, Fn = function(e, t, r, n) {
  return new Ft(e, t, r, n);
}, Cn = function(e, t, r, n) {
  return new $n(e, t, r, n);
}, Ln = function(e, t, r, n) {
  return new wn(e, t, r, n);
}, Tn = function(e, t, r, n) {
  return new Pn(e, t, r, n);
}, Bn = function(e, t, r, n) {
  return new Ct(e, t, r, n);
}, Nn = $e(function(e) {
  return function(t) {
    return t != null && t < e;
  };
}), Mn = $e(function(e) {
  return function(t) {
    return t === e || t <= e;
  };
}), Rn = $e(function(e) {
  return function(t) {
    return t != null && t > e;
  };
}), Dn = $e(function(e) {
  return function(t) {
    return t === e || t >= e;
  };
}), Qn = function(e, t, r) {
  var n = e[0], i = e[1];
  return new J(function(o) {
    return oe(o) % n === i;
  }, t, r);
}, Wn = function(e, t, r, n) {
  return new jn(e, t, r, n);
}, Gn = function(e, t, r) {
  return new J(new RegExp(e, t.$options), t, r);
}, Un = function(e, t, r, n) {
  return new _n(e, t, r, n);
}, ot = {
  number: function(e) {
    return typeof e == "number";
  },
  string: function(e) {
    return typeof e == "string";
  },
  bool: function(e) {
    return typeof e == "boolean";
  },
  array: function(e) {
    return Array.isArray(e);
  },
  null: function(e) {
    return e === null;
  },
  timestamp: function(e) {
    return e instanceof Date;
  }
}, Vn = function(e, t, r) {
  return new J(function(n) {
    if (typeof e == "string") {
      if (!ot[e])
        throw new Error("Type alias does not exist");
      return ot[e](n);
    }
    return n != null ? n instanceof e || n.constructor === e : !1;
  }, t, r);
}, Jn = function(e, t, r, n) {
  return new kn(e, t, r, n);
}, xn = function(e, t, r, n) {
  return new En(e, t, r, n);
}, Kn = function(e, t, r) {
  return new At(e, t, r, "$size");
}, zn = function() {
  return null;
}, Hn = function(e, t, r) {
  var n;
  if (vn(e))
    n = e;
  else if (!process.env.CSP_ENABLED)
    n = new Function("obj", "return " + e);
  else
    throw new Error('In CSP mode, sift does not support strings in "$where" condition');
  return new J(function(i) {
    return n.bind(i)(i);
  }, t, r);
}, Yn = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  $Size: At,
  $eq: An,
  $ne: qn,
  $or: Fn,
  $nor: Cn,
  $elemMatch: Ln,
  $nin: Tn,
  $in: Bn,
  $lt: Nn,
  $lte: Mn,
  $gt: Rn,
  $gte: Dn,
  $mod: Qn,
  $exists: Wn,
  $regex: Gn,
  $not: Un,
  $type: Vn,
  $and: Jn,
  $all: xn,
  $size: Kn,
  $options: zn,
  $where: Hn
}), Xn = function(e, t, r) {
  var n = r === void 0 ? {} : r, i = n.compare, o = n.operations;
  return ae(e, t, {
    compare: i,
    operations: Object.assign({}, Yn, o || {})
  });
}, Zn = function(e, t) {
  t === void 0 && (t = {});
  var r = Xn(e, null, t);
  return bn(r);
};
function xe(e, t, r = "g") {
  const n = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\"];
  return t = t.replace(new RegExp(`(\\${n.join("|\\")})`, r), "\\$1"), t = t.replace(/%/g, ".*").replace(/_/g, "."), RegExp(`^${t}$`, r).test(e);
}
function Lt(e, t) {
  return xe(e, t, "ig");
}
function ei(e, t, r) {
  return _e((n) => xe(n, e), t, r);
}
function ut(e, t, r) {
  return _e((n) => !xe(n, e), t, r);
}
function at(e, t, r) {
  return _e((n) => Lt(n, e), t, r);
}
function ti(e, t, r) {
  return _e((n) => !Lt(n, e), t, r);
}
const ri = {
  $like: ei,
  $notLike: ut,
  $notlike: ut,
  $ilike: at,
  $iLike: at,
  $notILike: ti
}, Re = (e) => typeof e < "u" ? Number.parseInt(e, 10) : e;
function ni(e, t) {
  return Object.keys(t.filters).reduce((n, i) => {
    const o = e[i], s = t.filters[i];
    if (s) {
      const u = typeof s == "function" ? s(o, t) : o;
      u !== void 0 && (n[i] = u);
    }
    return n;
  }, {});
}
function ii(e) {
  return Object.keys(e).concat(Object.getOwnPropertySymbols(e)).reduce((r, n) => (typeof n == "string" && n.startsWith("$") || (r[n] = e[n]), r), {});
}
function si(e, t) {
  const r = Re(e);
  if (t && (t.default || t.max)) {
    const n = t.default || 0, i = typeof r == "number" && !Number.isNaN(r) && r >= 0 ? r : n, o = typeof t.max == "number" ? t.max : Number.MAX_VALUE;
    return Math.min(i, o);
  }
  return r;
}
const oi = ["$in", "$nin", "$lt", "$lte", "$gt", "$gte", "$ne", "$or"], ui = {
  $skip: (e) => Re(e),
  $sort: (e) => typeof e != "object" || Array.isArray(e) ? e : Object.keys(e).reduce((t, r) => (t[r] = typeof e[r] == "object" ? e[r] : Re(e[r]), t), {}),
  $limit: (e, { paginate: t }) => si(e, t),
  $select: (e) => Array.isArray(e) ? e.map((t) => `${t}`) : e,
  $or: (e) => e,
  $and: (e) => e
};
function ai(e, t = {}) {
  const r = e || {}, n = {
    ...t,
    filters: {
      ...ui,
      ...t.filters
    },
    operators: oi.concat(t.operators || [])
  };
  return {
    filters: ni(r, n),
    query: ii(r)
  };
}
const ci = ["$sort", "$limit", "$skip", "$select"], li = [
  "$in",
  "$nin",
  "$exists",
  "eq",
  "ne",
  "$mod",
  "$all",
  "$not",
  "$size",
  "$type",
  "$regex",
  "$options",
  "$where",
  "$elemMatch"
];
function Tt(e) {
  const {
    idField: t,
    itemStorage: r,
    tempStorage: n,
    cloneStorage: i,
    addItemToStorage: o,
    paramsForServer: s = [],
    whitelist: u = [],
    customSiftOperators: a = {},
    customFilters: c = []
  } = e, l = Object.assign({}, ri, a), d = g(() => li.concat(u || []).concat(Object.keys(l))), I = (_, v = []) => {
    _ = { ...L(_) };
    const p = se.omit(_.query || {}, ...s), { query: y, filters: P } = ai(p, {
      operators: d.value
    });
    let $ = v.concat(r.list.value);
    return n && _.temps && $.push(...n.list.value), $ = c.reduce((C, F) => p[F.key] ? F.operator(C, p[F.key], p) : C, $), P.$or && (y.$or = p.$or), P.$and && (y.$and = p.$and), $ = $.filter(Zn(y, { operations: l })), { values: $, filters: P };
  };
  function f(_) {
    const v = g(() => {
      const p = L(_);
      p.query && (p.query = D(p.query));
      const y = I(p), P = y.filters;
      let $ = y.values;
      const C = $.length;
      return P.$sort && $.sort(Xt(P.$sort)), P.$skip && ($ = $.slice(P.$skip)), typeof P.$limit < "u" && ($ = $.slice(0, P.$limit)), {
        total: C,
        limit: P.$limit || 0,
        skip: P.$skip || 0,
        data: p.clones ? $.map((F) => F.clone ? F.clone(void 0, { useExisting: !0 }) : F) : $
      };
    });
    return ie({
      total: g(() => v.value.total),
      limit: g(() => v.value.limit),
      skip: g(() => v.value.skip),
      data: g(() => v.value.data)
    });
  }
  function S(_) {
    const v = f(_);
    return g(() => v.data[0] || null);
  }
  function h(_) {
    return g(() => {
      if (_ = { ...L(_) }, !_.query)
        throw new Error("params must contain a query object");
      return _.query = se.omit(_.query, ...ci), f(_).total;
    });
  }
  const w = (_, v) => g(() => {
    const p = L(_);
    v = ee(L(v) || {}), v.query && (v.query = D(v.query));
    let y = null;
    const P = r.getItem(p) && et(v, t)(r.getItem(p)), $ = n && n.getItem(p) && et(v, "__tempId")(n.getItem(p));
    return P ? y = P : $ && (y = $), v.clones && y.clone ? y.clone(void 0, { useExisting: !0 }) : y || null;
  });
  function b(_) {
    const { items: v, isArray: p } = Z(L(_)), y = v.map((P) => o(L(P)));
    return p ? y : y[0];
  }
  function m(_, v = {}, p = {}) {
    const y = L(_), P = L(v), $ = L(p);
    function C(F) {
      return F.map((q) => {
        if (q = L(q), (typeof q == "number" || typeof q == "string") && (q = w(q).value), q == null)
          return null;
        const E = { ...q, ...P };
        return o(E);
      }).filter((q) => q);
    }
    if (y === null) {
      if ($ != null && $.query && !Object.keys($ == null ? void 0 : $.query).length)
        throw new Error(
          'cannot perform multiple patchInStore with an empty query. You must explicitly provide a query. To patch all items, try using a query that matches all items, like "{ id: { $exists: true } }"'
        );
      const F = f($).data;
      return C(F);
    } else {
      const { items: F, isArray: M } = Z(y), q = C(F);
      return M ? q : q[0];
    }
  }
  function O(_, v) {
    if (_ === null && (v != null && v.query) && Object.keys(v == null ? void 0 : v.query).length) {
      const p = i ? i.list.value : [], { values: y } = I(v, p);
      return A(y);
    } else
      _ !== null && A(_);
    return _;
  }
  function A(_) {
    const { items: v } = Z(_);
    return v.forEach((p) => {
      if (typeof p == "string")
        r.removeItem(p), n == null || n.removeItem(p), i == null || i.removeItem(p);
      else {
        if (p.__isClone)
          return i == null ? void 0 : i.remove(p);
        if (p.__isTemp)
          return n == null ? void 0 : n.remove(p);
        r.remove(p), n == null || n.remove(p), i == null || i.remove(p);
      }
    }), _;
  }
  return {
    findInStore: f,
    findOneInStore: S,
    countInStore: h,
    getFromStore: w,
    createInStore: b,
    patchInStore: m,
    removeFromStore: O
  };
}
function Ke({
  getId: e,
  onRead: t = (i) => i,
  beforeWrite: r = (i) => i,
  assign: n = (i, o) => Object.assign(i, o)
}) {
  const i = j({}), o = g(() => Object.values(i.value)), s = g(() => Object.keys(i.value)), u = (m) => !!i.value[m], a = (m) => {
    const O = e(m);
    return u(O);
  }, c = (m) => {
    const O = i.value[m];
    return O ? t(O) : null;
  }, l = (m, O) => {
    if (m == null)
      throw new Error("item has no id");
    return Q(i.value, m, r(O)), c(m);
  }, d = (m) => {
    const O = e(m);
    return l(O, m);
  }, I = (m) => {
    const O = e(m), A = c(O);
    return A ? n(A, m) : l(O, m), c(O);
  }, f = (m) => {
    const O = e(m);
    return c(O);
  }, S = (m) => {
    const O = u(m);
    return O && W(i.value, m), O;
  };
  return { byId: i, list: o, ids: s, getId: e, clear: () => {
    Object.keys(i.value).forEach((m) => {
      W(i.value, m);
    });
  }, has: a, hasItem: u, get: f, getItem: c, set: d, setItem: l, remove: (m) => {
    const O = e(m);
    return S(O);
  }, removeItem: S, getKeys: () => s.value, merge: I };
}
function fi(e) {
  const { getId: t, itemStorage: r, onRead: n, beforeWrite: i } = e, o = Ke({
    getId: t,
    onRead: n,
    beforeWrite: i
  });
  function s(u) {
    return o.has(u) && o.remove(u), r.set(u);
  }
  return { tempStorage: o, moveTempToItems: s };
}
function di(e) {
  const { itemStorage: t, tempStorage: r, onRead: n, beforeWrite: i } = e, o = (f, S = {}, { isClone: h }) => ee(Object.assign({}, f, S, { __isClone: h })), s = e.makeCopy || o, u = Ke({
    getId: (f) => {
      const S = t.getId(f);
      return S ?? r.getId(f);
    },
    onRead: n,
    beforeWrite: i
  });
  function a(f) {
    return f.__isClone || (t.has(f) ? t.merge(f) : r.has(f) && r.merge(f)), t.get(f) || r.get(f) || (t.getId(f) != null ? t.merge(f) : r.getId(f) != null && r.merge(f)), t.get(f) || r.get(f);
  }
  function c(f, S = {}, h = {}) {
    const w = u.get(f);
    return a(f), w && h.useExisting ? w : d(f, S);
  }
  function l(f, S = {}) {
    const h = t.getId(f), w = s(f, S, { isClone: !1 });
    return h ? (t.merge(w), t.get(w)) : (r.merge(w), r.get(w));
  }
  function d(f, S = {}) {
    const h = a(f);
    if (u.get(f)) {
      const b = s(h, S, { isClone: !0 });
      Object.keys(h).forEach((m) => {
        h[m] == null && W(b, m);
      }), u.merge(b);
    } else {
      const b = s(f, S, { isClone: !0 });
      u.set(b);
    }
    return u.get(f);
  }
  function I(f) {
    return Object.defineProperty(f, "__isClone", {
      writable: !1,
      enumerable: !1,
      value: !0
    }), f;
  }
  return {
    cloneStorage: u,
    clone: c,
    commit: l,
    reset: d,
    markAsClone: I
  };
}
function Bt(e) {
  const { getIdField: t, setupInstance: r } = e, n = (f, S = {}, { isClone: h }) => {
    const w = ee(f);
    return Object.assign(w, S), Object.defineProperty(w, "__isTemp", {
      configurable: !0,
      enumerable: !1,
      get() {
        return this[this.__idField] == null;
      }
    }), he(w, {
      __isClone: h,
      __tempId: f.__tempId
    });
  }, i = Ke({
    getId: t,
    beforeWrite: r,
    onRead: r
  }), { tempStorage: o, moveTempToItems: s } = fi({
    getId: (f) => f.__tempId,
    itemStorage: i,
    beforeWrite: r,
    onRead: r
  }), { cloneStorage: u, clone: a, commit: c, reset: l, markAsClone: d } = di({
    itemStorage: i,
    tempStorage: o,
    makeCopy: n,
    beforeWrite: (f) => (d(f), r(f)),
    onRead: r
  });
  return {
    itemStorage: i,
    tempStorage: o,
    cloneStorage: u,
    clone: a,
    commit: c,
    reset: l,
    addItemToStorage: (f) => {
      const S = t(f);
      return f = r(f), f.__isClone ? u.merge(f) : S != null && f.__tempId != null ? s(f) : S != null ? i.merge(f) : o && f.__tempId != null ? o == null ? void 0 : o.merge(f) : i.merge(f);
    }
  };
}
function pi() {
  return {
    skipGetIfExists: !1
  };
}
function os(e) {
  const t = Object.assign({}, pi(), e), { idField: r, customSiftOperators: n } = t, { itemStorage: i, tempStorage: o, cloneStorage: s, clone: u, commit: a, reset: c, addItemToStorage: l } = Bt({
    getIdField: (v) => v[r],
    setupInstance: m
  }), { findInStore: d, findOneInStore: I, countInStore: f, getFromStore: S, createInStore: h, patchInStore: w, removeFromStore: b } = Tt({
    idField: r,
    itemStorage: i,
    tempStorage: o,
    cloneStorage: s,
    addItemToStorage: l,
    customSiftOperators: n
  });
  function m(v) {
    const p = $t(v, {
      idField: r,
      clonesById: s.byId,
      clone: u,
      commit: a,
      reset: c,
      createInStore: h,
      removeFromStore: b
    });
    if (v.__isSetup)
      return p;
    {
      const y = t.setupInstance ? t.setupInstance(p) : p;
      return Object.defineProperty(y, "__isSetup", { value: !0 }), y;
    }
  }
  const O = g(() => !!L(t.ssr));
  function A() {
    i.clear(), o.clear(), s.clear();
  }
  return {
    new: m,
    idField: r,
    isSsr: O,
    // items
    itemsById: i.byId,
    items: i.list,
    itemIds: i.ids,
    // temps
    tempsById: o.byId,
    temps: o.list,
    tempIds: o.ids,
    // clones
    clonesById: s.byId,
    clones: s.list,
    cloneIds: s.ids,
    clone: u,
    commit: a,
    reset: c,
    // local queries
    findInStore: d,
    findOneInStore: I,
    countInStore: f,
    createInStore: h,
    getFromStore: S,
    patchInStore: w,
    removeFromStore: b,
    clearAll: A
  };
}
var Nt = {}, Y = {};
Object.defineProperty(Y, "__esModule", { value: !0 });
Y.createDebug = Y.setDebug = Y.noopDebug = void 0;
const pe = {};
function Mt() {
  return function() {
  };
}
Y.noopDebug = Mt;
let Rt = Mt;
function hi(e) {
  Rt = e, Object.keys(pe).forEach((t) => {
    pe[t] = e(t);
  });
}
Y.setDebug = hi;
function vi(e) {
  return pe[e] || (pe[e] = Rt(e)), (...t) => pe[e](...t);
}
Y.createDebug = vi;
(function(e) {
  var t = me && me.__createBinding || (Object.create ? function(s, u, a, c) {
    c === void 0 && (c = a);
    var l = Object.getOwnPropertyDescriptor(u, a);
    (!l || ("get" in l ? !u.__esModule : l.writable || l.configurable)) && (l = { enumerable: !0, get: function() {
      return u[a];
    } }), Object.defineProperty(s, c, l);
  } : function(s, u, a, c) {
    c === void 0 && (c = a), s[c] = u[a];
  }), r = me && me.__exportStar || function(s, u) {
    for (var a in s)
      a !== "default" && !Object.prototype.hasOwnProperty.call(u, a) && t(u, s, a);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.createSymbol = e.isPromise = e._ = e.stripSlashes = void 0;
  function n(s) {
    return s.replace(/^(\/+)|(\/+)$/g, "");
  }
  e.stripSlashes = n, e._ = {
    each(s, u) {
      s && typeof s.forEach == "function" ? s.forEach(u) : e._.isObject(s) && Object.keys(s).forEach((a) => u(s[a], a));
    },
    some(s, u) {
      return Object.keys(s).map((a) => [s[a], a]).some(([a, c]) => u(a, c));
    },
    every(s, u) {
      return Object.keys(s).map((a) => [s[a], a]).every(([a, c]) => u(a, c));
    },
    keys(s) {
      return Object.keys(s);
    },
    values(s) {
      return e._.keys(s).map((u) => s[u]);
    },
    isMatch(s, u) {
      return e._.keys(u).every((a) => s[a] === u[a]);
    },
    isEmpty(s) {
      return e._.keys(s).length === 0;
    },
    isObject(s) {
      return typeof s == "object" && !Array.isArray(s) && s !== null;
    },
    isObjectOrArray(s) {
      return typeof s == "object" && s !== null;
    },
    extend(s, ...u) {
      return Object.assign(s, ...u);
    },
    omit(s, ...u) {
      const a = e._.extend({}, s);
      return u.forEach((c) => delete a[c]), a;
    },
    pick(s, ...u) {
      return u.reduce((a, c) => (s[c] !== void 0 && (a[c] = s[c]), a), {});
    },
    // Recursively merge the source object into the target object
    merge(s, u) {
      return e._.isObject(s) && e._.isObject(u) && Object.keys(u).forEach((a) => {
        e._.isObject(u[a]) ? (s[a] || Object.assign(s, { [a]: {} }), e._.merge(s[a], u[a])) : Object.assign(s, { [a]: u[a] });
      }), s;
    }
  };
  function i(s) {
    return e._.isObject(s) && typeof s.then == "function";
  }
  e.isPromise = i;
  function o(s) {
    return typeof Symbol < "u" ? Symbol.for(s) : s;
  }
  e.createSymbol = o, r(Y, e);
})(Nt);
function yi(e) {
  const { idField: t, isSsr: r } = e, n = e.defaultLimit || 10, i = j({});
  function o() {
    const { defaultLimit: c, defaultSkip: l } = i.value;
    i.value = { defaultLimit: c, defaultSkip: l };
  }
  function s({
    qid: c,
    response: l,
    query: d = {},
    preserveSsr: I = !1
  }) {
    var F, M;
    const { data: f, total: S } = l, h = f.map((q) => Se(q, t)), w = (/* @__PURE__ */ new Date()).getTime(), { queryId: b, queryParams: m, pageId: O, pageParams: A } = a({ qid: c, query: d });
    i.value[c] || Q(i.value, c, {}), !H(d, "$limit") && H(l, "limit") && Q(i.value, "defaultLimit", l.limit), !H(d, "$skip") && H(l, "skip") && Q(i.value, "defaultSkip", l.skip);
    const _ = {
      query: d,
      queryId: b,
      queryParams: m,
      pageId: O,
      pageParams: A,
      queriedAt: w,
      total: S
    }, v = (M = (F = i.value[c]) == null ? void 0 : F[b]) == null ? void 0 : M[O], p = i.value[c] || {};
    Object.assign(p, { mostRecent: _ }), Q(p, b, p[b] || {});
    const y = {
      total: S,
      queryParams: m
    };
    Q(p, b, Object.assign({}, p[b], y));
    const P = I ? v == null ? void 0 : v.ssr : r.value, $ = {
      [O]: { pageParams: A, ids: h, queriedAt: w, ssr: !!P }
    };
    Object.assign(p[b], $);
    const C = Object.assign({}, i.value[c], p);
    Q(i.value, c, C);
  }
  function u(c) {
    var h, w;
    const l = a(c), { qid: d, queryId: I, pageId: f } = l, S = (w = (h = i.value[d]) == null ? void 0 : h[I]) == null ? void 0 : w[f];
    S.ssr = !1;
  }
  function a(c) {
    const l = D(c), { query: d = {} } = l, I = l.qid || "default", f = (d == null ? void 0 : d.$limit) || n, S = (d == null ? void 0 : d.$skip) || 0, h = f !== void 0 ? { $limit: f, $skip: S } : void 0, w = h ? Oe(h) : void 0, b = Nt._.omit(d, "$limit", "$skip"), m = Oe(b);
    return {
      qid: I,
      query: d,
      queryId: m,
      queryParams: b,
      pageParams: h,
      pageId: w,
      isExpired: !1
    };
  }
  return {
    pagination: i,
    updatePaginationForQuery: s,
    unflagSsr: u,
    getQueryInfo: a,
    clearPagination: o
  };
}
function ct() {
  return {
    find: 0,
    count: 0,
    get: 0,
    create: 0,
    update: 0,
    patch: 0,
    remove: 0
  };
}
function mi() {
  const e = j(ct()), t = j({}), r = j({}), n = j({}), i = j({}), o = g(() => e.value.find > 0), s = g(() => e.value.count > 0), u = g(() => e.value.get > 0), a = g(() => e.value.create > 0 || Object.keys(t.value).length > 0), c = g(() => e.value.update > 0 || Object.keys(r.value).length > 0), l = g(() => e.value.patch > 0 || Object.keys(n.value).length > 0), d = g(() => e.value.remove > 0 || Object.keys(i.value).length > 0);
  function I(w, b) {
    b ? e.value[w]++ : e.value[w]--;
  }
  function f(w, b, m) {
    if (w == null)
      return;
    let O;
    b === "create" ? O = t.value : b === "update" ? O = r.value : b === "patch" ? O = n.value : b === "remove" && (O = i.value), m ? Q(O, w, !0) : W(O, w);
  }
  function S(...w) {
    w.forEach((b) => {
      b != null && (W(t.value, b), W(r.value, b), W(n.value, b), W(i.value, b));
    });
  }
  function h() {
    e.value = ct(), t.value = {}, r.value = {}, n.value = {}, i.value = {};
  }
  return {
    isPending: e,
    createPendingById: t,
    updatePendingById: r,
    patchPendingById: n,
    removePendingById: i,
    isFindPending: o,
    isCountPending: s,
    isGetPending: u,
    isCreatePending: a,
    isUpdatePending: c,
    isPatchPending: l,
    isRemovePending: d,
    setPending: I,
    setPendingById: f,
    unsetPendingById: S,
    clearAllPending: h
  };
}
function gi() {
  const e = ie({
    created: {},
    patched: {},
    updated: {},
    removed: {}
  });
  function t(n, i) {
    const { items: o } = Z(n);
    o.forEach((s) => {
      e[i][s] ? r(n, i) : (Q(e[i], s, !0), setTimeout(() => {
        r(n, i);
      }, 250));
    });
  }
  function r(n, i) {
    const { items: o } = Z(n);
    o.forEach((s) => {
      W(e[i], s);
    });
  }
  return { eventLocks: e, toggleEventLock: t, clearEventLock: r };
}
function Si() {
  const e = Zt({});
  function t(o) {
    return e[o];
  }
  function r(o, s) {
    e[o] = s;
  }
  function n(o) {
    delete e[o];
  }
  function i() {
    Object.keys(e).forEach((o) => {
      n(o);
    });
  }
  return { resultsByQid: e, getQid: t, setQid: r, clearQid: n, clearAllQids: i };
}
function Oi() {
  return {
    skipGetIfExists: !1
  };
}
function bi(e) {
  const t = Object.assign({}, Oi(), e), { idField: r, servicePath: n, whitelist: i, paramsForServer: o, defaultLimit: s, customSiftOperators: u, customFilters: a } = t, { itemStorage: c, tempStorage: l, cloneStorage: d, clone: I, commit: f, reset: S, addItemToStorage: h } = Bt({
    getIdField: (U) => U[r],
    setupInstance: p
  }), { findInStore: w, findOneInStore: b, countInStore: m, getFromStore: O, createInStore: A, patchInStore: _, removeFromStore: v } = Tt({
    idField: r,
    itemStorage: c,
    tempStorage: l,
    cloneStorage: d,
    addItemToStorage: h,
    whitelist: i,
    paramsForServer: o,
    customSiftOperators: u,
    customFilters: a
  });
  function p(U) {
    const le = $t(U, {
      idField: r,
      clonesById: d.byId,
      clone: I,
      commit: f,
      reset: S,
      createInStore: A,
      removeFromStore: v
    });
    if (U.__isSetup)
      return le;
    {
      const ve = t.setupInstance ? t.setupInstance(le) : le;
      return Object.defineProperty(ve, "__isSetup", { value: !0 }), ve;
    }
  }
  const y = mi(), P = g(() => !!L(t.ssr)), { pagination: $, clearPagination: C, updatePaginationForQuery: F, getQueryInfo: M, unflagSsr: q } = yi({
    idField: r,
    isSsr: P,
    defaultLimit: s
  }), { resultsByQid: E, getQid: B, setQid: x, clearQid: te, clearAllQids: ce } = Si();
  function Pe() {
    c.clear(), l.clear(), d.clear(), C(), y.clearAllPending(), ce();
  }
  const je = gi();
  return {
    new: p,
    idField: r,
    servicePath: n,
    isSsr: P,
    defaultLimit: s,
    // items
    itemsById: c.byId,
    items: c.list,
    itemIds: c.ids,
    // temps
    tempsById: l.byId,
    temps: l.list,
    tempIds: l.ids,
    // clones
    clonesById: d.byId,
    clones: d.list,
    cloneIds: d.ids,
    clone: I,
    commit: f,
    reset: S,
    // local queries
    findInStore: w,
    findOneInStore: b,
    countInStore: m,
    createInStore: A,
    getFromStore: O,
    patchInStore: _,
    removeFromStore: v,
    clearAll: Pe,
    // ssr qid cache
    resultsByQid: E,
    getQid: B,
    setQid: x,
    clearQid: te,
    clearAllQids: ce,
    // server options
    whitelist: i,
    paramsForServer: o,
    // server pagination
    pagination: $,
    updatePaginationForQuery: F,
    unflagSsr: q,
    getQueryInfo: M,
    ...y,
    ...je
  };
}
const V = {};
function Ii(e) {
  return `is${e.slice(0, 1).toUpperCase()}${e.slice(1, e.length - 1)}Pending`;
}
function wi(e) {
  return {
    promise: null,
    isResolved: !1,
    getter: Ii(e)
  };
}
function us(e, t) {
  return V[t] = V[t] || wi(t), (!V[t].promise || V[t].isResolved) && (V[t].promise = new Promise((r) => {
    const n = be(
      () => e[V[t].getter],
      async (i) => {
        i || setTimeout(() => {
          n(), V[t].isResolved = !0, r(V[t].isResolved);
        }, 0);
      },
      { immediate: !0 }
    );
  })), V[t].promise;
}
var _i = $i;
function $i(e, t, r, n) {
  var i, o, s;
  return function() {
    if (s = this, o = Array.prototype.slice.call(arguments), i && (r || n))
      return;
    if (!r)
      return c(), i = setTimeout(a, t), i;
    i = setTimeout(c, t), e.apply(s, o);
    function a() {
      c(), e.apply(s, o);
    }
    function c() {
      clearTimeout(i), i = null;
    }
  };
}
const De = /* @__PURE__ */ Ie(_i);
function Pi(e) {
  if (!e.service || e.handleEvents === !1)
    return;
  const t = e.service, r = j({}), n = j({}), i = De(
    async () => {
      const c = Object.values(r.value);
      c.length !== 0 && (t.store.createInStore(c), r.value = {});
    },
    e.debounceEventsTime || 20,
    void 0,
    e.debounceEventsGuarantee
  );
  function o(c) {
    const l = Se(c, t.store.idField);
    l && (Q(r, l, c), H(n.value, l) && W(n, l), i());
  }
  const s = De(
    () => {
      const c = Object.values(n.value);
      c.length !== 0 && (t.store.removeFromStore(c), n.value = {});
    },
    e.debounceEventsTime || 20,
    void 0,
    e.debounceEventsGuarantee
  );
  function u(c) {
    const l = Se(c, t.store.idField);
    l && (Q(n, l, c), H(r.value, l) && W(r.value, l), s());
  }
  function a(c, l) {
    var f;
    const d = (f = e.handleEvents) == null ? void 0 : f[c];
    if (d === !1)
      return;
    const I = Se(l, t.store.idField);
    if (c !== "created" && t.store.eventLocks[c][I]) {
      t.store.toggleEventLock(I, c);
      return;
    }
    d && !d(l, { service: t }) || (e.debounceEventsTime ? c === "removed" ? u(l) : o(l) : c === "removed" ? t.store.removeFromStore(l) : t.store.createInStore(l));
  }
  t.on("created", (c) => {
    const l = ne(t, c);
    a("created", l);
  }), t.on("updated", (c) => {
    const l = ne(t, c);
    a("updated", l);
  }), t.on("patched", (c) => {
    const l = ne(t, c);
    a("patched", l);
  }), t.on("removed", (c) => {
    const l = ne(t, c);
    a("removed", l);
  });
}
function ji() {
  return async (e, t) => {
    if (e.params.value && (e.params = D(e.params)), e.params.query && (e.params.query = D(e.params.query)), e.method === "find") {
      const r = e.params.query || {};
      r.$limit == null && (r.$limit = e.service.store.defaultLimit), r.$skip == null && (r.$skip = 0), e.params.query = r;
    }
    t && await t();
  };
}
function ki() {
  return async (e, t) => {
    var i, o, s;
    const r = e.service.store;
    let n;
    if (!r.isSsr) {
      const u = e.method === "find" ? ((i = e.params.query) == null ? void 0 : i.$limit) === 0 ? "count" : "find" : e.method;
      r.setPending(u, !0), e.id != null && u !== "get" && r.setPendingById(e.id, u, !0);
      const a = (o = e.data) == null ? void 0 : o.__isTemp, c = (s = e.data) == null ? void 0 : s.__tempId;
      a && u === "create" && r.setPendingById(e.data.__tempId, u, !0), n = () => {
        r.setPending(u, !1);
        const l = e.id != null ? e.id : c;
        l != null && u !== "get" && r.setPendingById(l, u, !1);
      };
    }
    try {
      await t();
    } catch (u) {
      throw n && n(), u;
    }
    n && n();
  };
}
function Ei() {
  return async (e, t) => {
    const { id: r, method: n } = e, i = e.service.store, o = ["update", "patch", "remove"].includes(n), u = {
      update: "updated",
      patch: "patched",
      remove: "removed"
    }[n];
    o && r && !i.isSsr && i.toggleEventLock(r, u), await t(), o && r && !i.isSsr && i.clearEventLock(r, u);
  };
}
function Ai() {
  return async (e, t) => {
    const { method: r, params: n } = e, i = e.service.store;
    if (r === "patch" && n.data && (e.data = n.data), t && await t(), !e.params.skipStore) {
      if (r === "remove")
        i.removeFromStore(e.result);
      else if (r === "create") {
        const o = Wr(e.data, e.result);
        e.result = i.createInStore(o);
      } else
        r === "find" && Array.isArray(e.result.data) ? e.result.data = i.createInStore(e.result.data) : e.result = i.createInStore(e.result);
      if (r === "find" && e.result.total) {
        const { qid: o = "default", query: s, preserveSsr: u = !1 } = e.params;
        i.updatePaginationForQuery({ qid: o, response: e.result, query: s, preserveSsr: u });
      }
    }
  };
}
function qi() {
  return async (e, t) => {
    var r;
    t && await t(), e.service.new && (Array.isArray((r = e.result) == null ? void 0 : r.data) ? e.result.data = e.result.data.map((n) => e.service.new(n)) : Array.isArray(e.result) ? e.result = e.result.map((n) => e.service.new(n)) : e.result = e.service.new(e.result));
  };
}
function Fi() {
  return async (e, t) => {
    const r = e.service.store;
    if (e.method === "find") {
      const { params: n } = e, i = r.getQueryInfo(n), o = r.pagination[i.qid], s = o == null ? void 0 : o[i.queryId], u = s == null ? void 0 : s[i.pageId];
      u != null && u.ssr && (e.result = {
        data: u.ids.map((a) => r.getFromStore(a).value),
        limit: u.pageParams.$limit,
        skip: u.pageParams.$skip,
        total: s.total,
        fromSsr: !0
      }, n.preserveSsr || r.unflagSsr(n));
    }
    t && await t();
  };
}
function Ci() {
  return async (e, t) => {
    var r;
    if (e.method === "find") {
      const { params: n } = e, { query: i = {} } = n;
      (n.paginate === !0 || H(i, "$limit") || H(i, "$skip")) && (n.paginate = { default: !0 });
    }
    t && await t(), e.method === "find" && !((r = e.result) != null && r.data) && Array.isArray(e.result) && (e.result = {
      data: e.result,
      limit: e.params.$limit || e.result.length,
      skip: e.params.$skip || 0,
      total: e.result.length
    });
  };
}
function Li() {
  return async (e, t) => {
    const { params: r, id: n } = e, i = e.service.store;
    if (e.method === "get" && n != null) {
      const o = r.skipGetIfExists || i.skipGetIfExists;
      delete r.skipGetIfExists;
      const s = i.getFromStore(e.id, r);
      s && o && (e.result = s);
    }
    await t();
  };
}
function Ti() {
  return async (e, t) => {
    const { method: r, data: n, params: i, id: o } = e, s = e.service.store;
    let u, a;
    const c = r === "patch" && !i.data && (n.__isClone || i.diff);
    if (c) {
      a = n;
      const l = s.getFromStore(o).value, d = bt(l, a, i.diff);
      if (u = ee(l), i.eager !== !1 && n.commit(d), i.with) {
        const I = Le(a, i.with);
        typeof i.with != "string" && !Array.isArray(i.with) && Object.assign(I, i.with), Object.assign(d, I);
      }
      e.data = d, Object.keys(e.data).length === 0 && (e.result = a);
    } else
      e.data = ee(n);
    try {
      await t();
    } catch (l) {
      throw c && a && a.commit(u), l;
    }
  };
}
function Bi() {
  return async (e, t) => {
    const { params: r } = e, n = e.service.store;
    if (r.qid) {
      const i = n.getQid(r.qid);
      if (i !== void 0)
        return n.isSsr || setTimeout(() => {
          n.clearQid(r.qid);
        }, 500), e.result = i, await t();
    }
    await t(), r.qid && n.isSsr && n.setQid(r.qid, e.result);
  };
}
function Ni() {
  return [
    ji(),
    ki(),
    Ei(),
    Ai(),
    qi(),
    Fi(),
    Ci(),
    Li(),
    Ti(),
    Bi()
  ];
}
function Mi(e, t) {
  if (e.__isServiceInstance)
    return e;
  const { service: r, store: n } = t, i = (o, s) => Object.assign(o, s);
  return Ot(e, {
    isPending() {
      return this.isCreatePending || this.isPatchPending || this.isRemovePending;
    },
    isSavePending() {
      return this.isCreatePending || this.isPatchPending;
    },
    isCreatePending() {
      return !!(n.createPendingById[this[n.idField]] || n.createPendingById[this.__tempId]);
    },
    isPatchPending() {
      return !!n.patchPendingById[this[n.idField]];
    },
    isRemovePending() {
      return !!n.removePendingById[this[n.idField]];
    }
  }), he(e, {
    __isServiceInstance: !0,
    save(o) {
      return this[n.idField] != null ? this.patch(o) : this.create(o);
    },
    create(o) {
      return r.create(this, o).then((s) => i(this, s));
    },
    patch(o) {
      const s = this[n.idField];
      if (s === void 0)
        throw new ir("the item has no id");
      return r.patch(s, this, o).then((u) => i(this, u));
    },
    remove(o) {
      if (this.__isTemp)
        return n.removeFromStore(this.__tempId), Promise.resolve(this);
      {
        const s = this[n.idField];
        return r.remove(s, o).then((u) => i(this, u));
      }
    }
  }), e;
}
function Ri(e, t) {
  const r = {};
  Object.keys(t).forEach((n) => {
    const i = e[n], o = t[n], s = this.service(o);
    if (s || console.error(`there is no service at path ${o}. Check your storeAssociated config`, e, t), i && s) {
      const u = s.createInStore(i);
      r[n] = u;
    }
  }), he(e, r);
}
function Di(e, t, r) {
  const n = JSON.stringify(t);
  r.setItem(e, n);
}
function Qi(e, t) {
  const r = t.getItem(e.$id);
  if (r) {
    const n = JSON.parse(r) || {};
    Object.assign(e, n);
  }
}
function Wi(e, t, r = window.localStorage) {
  Qi(e, r);
  const n = De(Di, 500), i = g(() => se.pick(e, ...t));
  be(i, (o) => n(e.$id, o, r), { deep: !0 });
}
function Gi(e = window.localStorage) {
  const t = "service:";
  for (let r = 0; r < e.length; r++) {
    const n = e.key(r);
    n != null && n.startsWith(t) && e.removeItem(n);
  }
}
function as(e, t) {
  const r = Ht();
  r.defaultService = function(i) {
    var v;
    const o = ((v = t.services) == null ? void 0 : v[i]) || {}, s = o.idField || t.idField, u = o.defaultLimit || t.defaultLimit || 10, a = (o.whitelist || []).concat(t.whitelist || []), c = (o.paramsForServer || []).concat(t.paramsForServer || []), l = o.handleEvents || t.handleEvents, d = o.debounceEventsTime != null ? o.debounceEventsTime : t.debounceEventsTime, I = o.debounceEventsGuarantee != null ? o.debounceEventsGuarantee : t.debounceEventsGuarantee, f = Object.assign({}, o.customSiftOperators || {}, t.customSiftOperators || {}), S = [...o.customFilters || [], ...t.customFilters || []];
    function h(p) {
      const y = Object.assign(p, t.customizeStore ? t.customizeStore(p) : p);
      return Object.assign(
        y,
        o.customizeStore ? o.customizeStore(y) : y
      );
    }
    function w(p) {
      const y = o.instanceServicePath || i, P = r.service(y), $ = Mi(p, {
        service: P,
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        store: O
      }), C = { app: r, service: P, servicePath: y }, F = t.setupInstance ? t.setupInstance($, C) : $;
      return o.setupInstance ? o.setupInstance(F, C) : F;
    }
    const b = o.storeName || `service:${i}`, m = t.pinia._s.get(b);
    let O;
    if (m ? O = m : O = Yt(b, () => {
      const y = bi({
        idField: s,
        servicePath: i,
        defaultLimit: u,
        whitelist: a,
        paramsForServer: c,
        customSiftOperators: f,
        customFilters: S,
        ssr: t.ssr,
        setupInstance: w
      }), P = h(y);
      return { ...y, ...P };
    })(t.pinia), !t.ssr && t.storage) {
      const p = ["itemsById", "pagination"], y = t.syncWithStorage === !0 ? p : Array.isArray(t.syncWithStorage) ? t.syncWithStorage : [], P = o.syncWithStorage === !0 ? p : Array.isArray(o.syncWithStorage) ? o.syncWithStorage : [], $ = [.../* @__PURE__ */ new Set([...y, ...P])];
      $.length > 0 && Wi(O, $, t.storage);
    }
    const A = e.service(i), _ = new an(A, { store: O, servicePath: i });
    return Pi({
      service: _,
      debounceEventsTime: d,
      debounceEventsGuarantee: I,
      handleEvents: l
    }), _;
  };
  const n = (i) => {
    i.hooks({
      around: Ni()
    });
  };
  return r.mixins.push(n), Ot(r, {
    authentication() {
      return e.authentication;
    },
    authenticate() {
      return e.authenticate;
    },
    reAuthenticate() {
      return e.reAuthenticate;
    },
    logout() {
      return e.logout;
    },
    clearStorage() {
      if (!t.ssr && t.storage)
        return Gi(t.storage);
    }
  }), Object.assign(r, {
    // TODO: remove in v5
    storeAssociated: Ri,
    pushToStore(i, o) {
      const s = r.service(o);
      return xr(i, s);
    },
    defineVirtualProperty: wt,
    defineVirtualProperties: Kr
  }), r;
}
class cs extends sr {
  async request(t, r) {
    const n = Object.assign({}, t, r.connection);
    n.headers = Object.assign({ Accept: "application/json" }, this.options.headers, n.headers), t.body && (n.body = t.body);
    try {
      const i = await this.connection.raw(t.url, n), { _data: o, status: s } = i;
      return s === 204 ? null : o;
    } catch (i) {
      throw i.data;
    }
  }
}
const ls = {
  "feathers-pinia": [
    "useServiceInstance",
    "useInstanceDefaults",
    "useDataStore",
    "useAuth",
    "createPiniaClient",
    "defineGetters",
    "defineSetters",
    "defineValues",
    "useBackup"
  ]
};
class de extends Error {
}
de.prototype.name = "InvalidTokenError";
function Ui(e) {
  return decodeURIComponent(atob(e).replace(/(.)/g, (t, r) => {
    let n = r.charCodeAt(0).toString(16).toUpperCase();
    return n.length < 2 && (n = "0" + n), "%" + n;
  }));
}
function Vi(e) {
  let t = e.replace(/-/g, "+").replace(/_/g, "/");
  switch (t.length % 4) {
    case 0:
      break;
    case 2:
      t += "==";
      break;
    case 3:
      t += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return Ui(t);
  } catch {
    return atob(t);
  }
}
function Ji(e, t) {
  if (typeof e != "string")
    throw new de("Invalid token specified: must be a string");
  t || (t = {});
  const r = t.header === !0 ? 0 : 1, n = e.split(".")[r];
  if (typeof n != "string")
    throw new de(`Invalid token specified: missing part #${r + 1}`);
  let i;
  try {
    i = Vi(n);
  } catch (o) {
    throw new de(`Invalid token specified: invalid base64 for part #${r + 1} (${o.message})`);
  }
  try {
    return JSON.parse(i);
  } catch (o) {
    throw new de(`Invalid token specified: invalid json for part #${r + 1} (${o.message})`);
  }
}
function fs(e) {
  const { api: t, servicePath: r, skipTokenCheck: n } = e, i = r ? t.service(r) : null, o = e.entityKey || "user", s = j(), u = async () => {
  }, a = async (E) => {
    throw E;
  }, c = e.onSuccess || u, l = e.onError || a, d = e.onInitSuccess || u, I = e.onInitError || u, f = e.onLogoutSuccess || u, S = e.onLogoutError || a, h = j(null), w = g(() => !i || !h.value ? null : (i == null ? void 0 : i.store.itemsById[h.value]) || null), b = j(null), m = () => b.value = null, O = nt(), A = g(() => !!O.count.value), _ = j(!1), v = (E) => {
    const B = E[o];
    if (i && B) {
      const x = i.store.createInStore(B);
      h.value = x[i.store.idField] || x.__tempId;
    }
    return _.value = !0, E;
  }, p = async (E) => (O.add(), m(), s.value = t.authenticate(E).then(v).then(async (B) => await c(B) || B).catch((B) => (b.value = B, l(B))).finally(() => {
    O.sub();
  }), s.value), y = (E) => {
    try {
      const B = Ji(E);
      return (/* @__PURE__ */ new Date()).getTime() > B.exp * 1e3;
    } catch {
      return !1;
    }
  }, P = j(!1), $ = async () => (O.add(), s.value = t.reAuthenticate().then(v).then(async (E) => await d(E) || E).catch((E) => (E.value = E, I(E))).finally(() => {
    O.sub(), P.value = !0;
  }), s.value), C = nt(), F = g(() => !!C.count.value), M = async () => (C.add(), t.logout().then((E) => (h.value = null, _.value = !1, E)).then(f).catch((E) => (E.value = E, S(E))).finally(() => C.sub())), q = j(null);
  return {
    userId: h,
    user: w,
    error: b,
    isPending: A,
    isLogoutPending: F,
    isInitDone: P,
    isAuthenticated: _,
    loginRedirect: q,
    getPromise: () => s.value,
    isTokenExpired: y,
    authenticate: p,
    reAuthenticate: $,
    logout: M,
    clearError: m
  };
}
function ds(e, t) {
  const r = er(null);
  tr(e, async (o) => {
    var c, l;
    if (!e)
      return;
    const s = t == null ? void 0 : t.idField, u = s ? o == null ? void 0 : o[s] : o == null ? void 0 : o.id, a = s ? (c = r.value) == null ? void 0 : c[s] : (l = r.value) == null ? void 0 : l.id;
    u !== a && (r.value = rt(o));
  }, { immediate: !0 });
  async function n() {
    const o = rr(e), s = bt(r.value, o, t == null ? void 0 : t.onlyProps);
    if (Object.keys(s).length)
      try {
        const u = await e.value.save({ data: s });
        r.value = rt(u);
      } catch (u) {
        throw console.error("could not save", u), u;
      }
    else
      return o;
  }
  function i(o) {
    if (r.value) {
      const s = nr(o) ? o.value : o;
      Object.assign(s, r.value);
    }
    return o;
  }
  return { data: e, backup: r, save: n, restore: i };
}
export {
  at as $ilike,
  ei as $like,
  ut as $notLike,
  cs as OFetch,
  an as PiniaService,
  Qr as SERVICE,
  Gi as clearStorage,
  as as createPiniaClient,
  Dr as createSymbol,
  Ot as defineGetters,
  is as defineSetters,
  he as defineValues,
  Kr as defineVirtualProperties,
  wt as defineVirtualProperty,
  bt as diff,
  Ei as eventLocks,
  ls as feathersPiniaAutoImport,
  Ni as feathersPiniaHooks,
  Z as getArray,
  Fe as getExtendedQueryInfo,
  Se as getId,
  X as getParams,
  H as hasOwn,
  Qi as hydrateStore,
  Lt as iLike,
  xe as like,
  qi as makeModelInstances,
  Ci as normalizeFind,
  Le as pickDiff,
  xr as pushToStore,
  Wr as restoreTempIds,
  ki as setPending,
  Li as skipGetIfExists,
  ri as sqlOperations,
  Ri as storeAssociated,
  Ai as syncStore,
  Wi as syncWithStorage,
  fe as timeout,
  Bt as useAllStorageTypes,
  fs as useAuth,
  ds as useBackup,
  os as useDataStore,
  on as useFind,
  un as useGet,
  ss as useInstanceDefaults,
  $t as useModelInstance,
  us as useQueuePromise,
  di as useServiceClones,
  gi as useServiceEventLocks,
  Pi as useServiceEvents,
  Mi as useServiceInstance,
  Tt as useServiceLocal,
  yi as useServicePagination,
  mi as useServicePending,
  Ke as useServiceStorage,
  bi as useServiceStore,
  fi as useServiceTemps,
  Di as writeToStorage
};
//# sourceMappingURL=feathers-pinia.js.map
