var Jt = Object.defineProperty;
var Kt = (e, t, r) => t in e ? Jt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var je = (e, t, r) => (Kt(e, typeof t != "symbol" ? t + "" : t, r), r);
import { feathers as zt } from "@feathersjs/feathers";
import { defineStore as Ht } from "pinia";
import { unref as C, ref as j, isRef as K, computed as m, watch as Ie, reactive as ie, set as W, del as G } from "vue-demi";
import { _ as se } from "@feathersjs/commons";
import { sorter as Yt, select as Xe, filterQuery as Xt } from "@feathersjs/adapter-commons";
import { reactive as Zt, ref as er, watch as tr, unref as rr, isRef as nr } from "vue";
import { BadRequest as ir } from "@feathersjs/errors";
import { FetchClient as sr } from "@feathersjs/rest-client";
var ye = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Oe(e) {
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
const Ze = /* @__PURE__ */ Oe(or);
var ur = Function.prototype.toString, ke = Object.create, ar = Object.prototype.toString, cr = (
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
function Ne(e) {
  if (!e)
    return ke(null);
  var t = e.constructor;
  if (t === Object)
    return e === Object.prototype ? {} : ke(e);
  if (~ur.call(t).indexOf("[native code]"))
    try {
      return new t();
    } catch {
    }
  return ke(e);
}
function pr(e) {
  var t = "";
  return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.unicode && (t += "u"), e.sticky && (t += "y"), t;
}
function hr(e) {
  return e.flags;
}
var vr = /test/g.flags === "g" ? hr : pr;
function at(e) {
  var t = ar.call(e);
  return t.substring(8, t.length - 1);
}
function yr(e) {
  return e[Symbol.toStringTag] || at(e);
}
var mr = typeof Symbol < "u" ? yr : at, gr = Object.defineProperty, Sr = Object.getOwnPropertyDescriptor, ct = Object.getOwnPropertyNames, De = Object.getOwnPropertySymbols, lt = Object.prototype, ft = lt.hasOwnProperty, Ir = lt.propertyIsEnumerable, dt = typeof De == "function";
function Or(e) {
  return ct(e).concat(De(e));
}
var br = dt ? Or : ct;
function be(e, t, r) {
  for (var n = br(e), i = 0, o = n.length, s = void 0, u = void 0; i < o; ++i)
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
  return t.cache.set(e, r), be(e, r, t);
}
function pt(e, t) {
  return e.slice(0);
}
function $r(e, t) {
  return e.slice(0, e.size, e.type);
}
function Pr(e, t) {
  return new t.Constructor(pt(e.buffer));
}
function jr(e, t) {
  return new t.Constructor(e.getTime());
}
function ht(e, t) {
  var r = new t.Constructor();
  return t.cache.set(e, r), e.forEach(function(n, i) {
    r.set(i, t.copier(n, t));
  }), r;
}
function kr(e, t) {
  return be(e, ht(e, t), t);
}
function Er(e, t) {
  var r = Ne(t.prototype);
  t.cache.set(e, r);
  for (var n in e)
    ft.call(e, n) && (r[n] = t.copier(e[n], t));
  return r;
}
function Ar(e, t) {
  var r = Ne(t.prototype);
  t.cache.set(e, r);
  for (var n in e)
    ft.call(e, n) && (r[n] = t.copier(e[n], t));
  for (var i = De(e), o = 0, s = i.length, u = void 0; o < s; ++o)
    u = i[o], Ir.call(e, u) && (r[u] = t.copier(e[u], t));
  return r;
}
var qr = dt ? Ar : Er;
function Fr(e, t) {
  var r = Ne(t.prototype);
  return t.cache.set(e, r), be(e, r, t);
}
function Ee(e, t) {
  return new t.Constructor(e.valueOf());
}
function Cr(e, t) {
  var r = new t.Constructor(e.source, vr(e));
  return r.lastIndex = e.lastIndex, r;
}
function me(e, t) {
  return e;
}
function vt(e, t) {
  var r = new t.Constructor();
  return t.cache.set(e, r), e.forEach(function(n) {
    r.add(t.copier(n, t));
  }), r;
}
function Tr(e, t) {
  return be(e, vt(e, t), t);
}
var Lr = Array.isArray, Re = Object.assign, Br = Object.getPrototypeOf || function(e) {
  return e.__proto__;
}, yt = {
  array: wr,
  arrayBuffer: pt,
  blob: $r,
  dataView: Pr,
  date: jr,
  error: me,
  map: ht,
  object: qr,
  regExp: Cr,
  set: vt
}, Mr = Re({}, yt, {
  array: _r,
  map: kr,
  object: Fr,
  set: Tr
});
function Nr(e) {
  return {
    Arguments: e.object,
    Array: e.array,
    ArrayBuffer: e.arrayBuffer,
    Blob: e.blob,
    Boolean: Ee,
    DataView: e.dataView,
    Date: e.date,
    Error: e.error,
    Float32Array: e.arrayBuffer,
    Float64Array: e.arrayBuffer,
    Int8Array: e.arrayBuffer,
    Int16Array: e.arrayBuffer,
    Int32Array: e.arrayBuffer,
    Map: e.map,
    Number: Ee,
    Object: e.object,
    Promise: me,
    RegExp: e.regExp,
    Set: e.set,
    String: Ee,
    WeakMap: me,
    WeakSet: me,
    Uint8Array: e.arrayBuffer,
    Uint8ClampedArray: e.arrayBuffer,
    Uint16Array: e.arrayBuffer,
    Uint32Array: e.arrayBuffer,
    Uint64Array: e.arrayBuffer
  };
}
function mt(e) {
  var t = Re({}, yt, e), r = Nr(t), n = r.Array, i = r.Object;
  function o(s, u) {
    if (u.prototype = u.Constructor = void 0, !s || typeof s != "object")
      return s;
    if (u.cache.has(s))
      return u.cache.get(s);
    if (u.prototype = Br(s), u.Constructor = u.prototype && u.prototype.constructor, !u.Constructor || u.Constructor === Object)
      return i(s, u);
    if (Lr(s))
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
function Dr(e) {
  return mt(Re({}, Mr, e));
}
var et = Dr({}), te = mt({});
function de(e, t) {
  return Object.keys(t).forEach((r) => {
    Object.defineProperty(e, r, {
      enumerable: !1,
      configurable: !0,
      value: t[r]
    });
  }), e;
}
function gt(e, t) {
  return Object.keys(t).forEach((r) => {
    Object.defineProperty(e, r, {
      enumerable: !1,
      configurable: !0,
      get: t[r]
    });
  }), e;
}
function Hi(e, t) {
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
function Ae({ queryInfo: e, service: t, store: r, qid: n }) {
  const o = r.pagination[n.value][e.queryId];
  if (!o)
    return null;
  const { total: s } = o, u = o[e.pageId];
  if (!u)
    return null;
  const { ids: a, queriedAt: c, ssr: l } = u, d = a.map((I) => r.itemsById[I]).filter((I) => I), S = ne(t, d);
  return { ...e, ids: a, items: S, total: s, queriedAt: c, queryState: o, ssr: l } || null;
}
function z(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function ee(e) {
  const t = Array.isArray(e);
  return { items: t ? e : [e], isArray: t };
}
function Fe(e, t) {
  if (!t)
    return e;
  const n = (typeof t == "string" ? [t] : Array.isArray(t) ? t : Object.keys(t || e)).map((i) => i.toString().split(".")[0]);
  return se.pick(e, ...n);
}
function St(e, t, r) {
  const n = Fe(e, r), i = Fe(t, r);
  return typeof r != "string" && !Array.isArray(r) && Object.assign(i, r), Ze(n, i) ? {} : Object.keys(i).reduce((u, a) => (Ze(e[a], i[a]) || (u[a] = i[a]), u), {});
}
function Rr(e, t, r = "__tempId") {
  const { items: n, isArray: i } = ee(e), { items: o } = ee(t);
  return o.forEach((s, u) => {
    const a = n[u][r];
    a && de(s, { [r]: a });
  }), i ? o : o[0];
}
function qe(e) {
  return typeof e == "object" && e != null ? e.toString() : e;
}
function ge(e, t) {
  if (e) {
    if (t && e[t] !== void 0)
      return qe(e[t]);
    if (e.id !== void 0)
      return qe(e.id);
    if (e._id !== void 0)
      return qe(e._id);
  }
}
function Z(e) {
  return e ? te(C(e)) : {};
}
function ce(e) {
  return new Promise((t) => setTimeout(t, e));
}
function tt() {
  const e = j(0);
  return { count: e, add: () => {
    e.value = e.value + 1;
  }, sub: () => {
    e.value = e.value === 0 ? 0 : e.value - 1;
  } };
}
const Qr = (e) => e !== null && typeof e == "object", Wr = Array.isArray;
function It(e) {
  return e !== null && !K(e) && typeof e == "object" ? Q(e) : C(e);
}
const Gr = (e) => e.map(It);
function Ur(e) {
  const t = {};
  return Object.keys(e).forEach((r) => {
    t[r] = It(e[r]);
  }), t;
}
function Q(e) {
  const t = K(e) ? C(e) : e;
  return Qr(t) ? Wr(t) ? Gr(t) : Ur(t) : t;
}
function Yi(e, t) {
  const r = Object.keys(t), n = se.omit(e, ...r);
  return Object.assign(t, te(n));
}
function Vr(e, t) {
  if (!e)
    return e;
  const r = (n) => t.createInStore(n);
  return Array.isArray(e) ? e.map(r) : r(e);
}
function Ot(e, t, r) {
  const n = { enumerable: !1 };
  typeof r == "function" ? n.get = function() {
    return r(this);
  } : n.value = r, Object.defineProperty(e, t, n);
}
function xr(e, t) {
  Object.keys(t).forEach((r) => Ot(e, r, t[r]));
}
const Jr = [
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
function rt(e) {
  return typeof e == "function" ? e() : C(e);
}
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const nt = () => {
};
function Kr(e, t) {
  function r(...n) {
    return new Promise((i, o) => {
      Promise.resolve(e(() => t.apply(this, n), { fn: t, thisArg: this, args: n })).then(i).catch(o);
    });
  }
  return r;
}
function zr(e, t = {}) {
  let r, n, i = nt;
  const o = (u) => {
    clearTimeout(u), i(), i = nt;
  };
  return (u) => {
    const a = rt(e), c = rt(t.maxWait);
    return r && o(r), a <= 0 || c !== void 0 && c <= 0 ? (n && (o(n), n = null), Promise.resolve(u())) : new Promise((l, d) => {
      i = t.rejectOnCancel ? d : l, c && !n && (n = setTimeout(() => {
        r && o(r), n = null, l(u());
      }, c)), r = setTimeout(() => {
        n && o(n), n = null, l(u());
      }, a);
    });
  };
}
function Hr(e, t = 200, r = {}) {
  return Kr(
    zr(t, r),
    e
  );
}
var Yr = function(e, t) {
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
        var d = l[u], S = o(s[d]);
        S && (a && (a += ","), a += JSON.stringify(d) + ":" + S);
      }
      return i.splice(c, 1), "{" + a + "}";
    }
  }(e);
};
const Se = /* @__PURE__ */ Oe(Yr);
function Xr(e, t) {
  const { queryId: r, pageId: n } = t, i = e[r], o = i && i[n];
  return o && o.ids || [];
}
function Zr(e, t, r) {
  const n = r.qid || "default", i = e.pagination[n] || {}, o = e.getQueryInfo(r);
  return Xr(i, o).map((a) => t.getFromStore(a).value).filter((a) => a);
}
function en(e, t) {
  const { queryId: r } = t, n = e[r] || {};
  return [...new Set(Object.keys(n).filter((o) => !["total", "queryParams"].includes(o)).reduce((o, s) => {
    var u;
    return o = o.concat(((u = n == null ? void 0 : n[s]) == null ? void 0 : u.ids) || []), o;
  }, []))] || [];
}
function tn(e, t, r) {
  const n = r.qid || "default", i = e.pagination[n] || {}, o = e.getQueryInfo(r);
  return en(i, o).map((a) => t.getFromStore(a).value).filter((a) => a);
}
function rn(e) {
  const { limit: t, skip: r, total: n, request: i } = e, o = m(() => n.value ? Math.ceil(n.value / t.value) : 1), s = m({
    set(h) {
      h < 1 ? h = 1 : h > o.value && (h = o.value);
      const $ = t.value * Math.floor(h - 1);
      r.value = $;
    },
    get() {
      const h = r.value || 0;
      return o.value === 0 ? 0 : Math.floor(h / t.value + 1);
    }
  }), u = m(() => s.value - 1 > 0), a = m(() => s.value < o.value), c = async () => {
    i != null && i.value && await i.value;
  };
  return { pageCount: o, currentPage: s, canPrev: u, canNext: a, toStart: async () => (s.value = 1, await ce(0), c()), toEnd: async () => (s.value = o.value, await ce(0), c()), toPage: async (h) => (s.value = h, await ce(0), c()), next: async () => (s.value++, await ce(0), c()), prev: async () => (s.value--, await ce(0), c()) };
}
function nn(e, t = {}, r) {
  var Ke, ze, He, Ye;
  const { pagination: n, debounce: i = 100, immediate: o = !0, watch: s = !0, paginateOn: u = "client" } = t, { service: a } = r, { store: c } = a, l = m(() => {
    var k;
    return ((k = e.value) == null ? void 0 : k.qid) || "default";
  }), d = (n == null ? void 0 : n.limit) || j(((ze = (Ke = e.value) == null ? void 0 : Ke.query) == null ? void 0 : ze.$limit) || c.defaultLimit), S = (n == null ? void 0 : n.skip) || j(((Ye = (He = e.value) == null ? void 0 : He.query) == null ? void 0 : Ye.$skip) || 0), f = m(() => {
    var T;
    const k = Q(((T = e.value) == null ? void 0 : T.query) || {});
    return {
      ...e.value,
      query: {
        ...k,
        $limit: d.value,
        $skip: S.value
      }
    };
  }), I = m(() => {
    var re;
    const k = Q(((re = e.value) == null ? void 0 : re.query) || {}), T = se.omit(k, "$limit", "$skip");
    return { ...e.value, query: T };
  }), h = j(!1), $ = j(!1), O = j(!1), v = j(null), _ = () => v.value = null, y = j(Q(e.value || {}));
  function b() {
    Se(y.value) !== Se(f.value) && (y.value = f.value);
  }
  let p = () => !0;
  const g = (k) => {
    p = k;
  }, w = m(() => {
    if (!c.pagination[l.value])
      return null;
    const T = c.getQueryInfo(y.value);
    return Ae({ queryInfo: T, service: a, store: c, qid: l });
  }), P = m(() => {
    if (!c.pagination[l.value])
      return null;
    const T = c.getQueryInfo(f.value);
    return Ae({ queryInfo: T, service: a, store: c, qid: l });
  }), E = m(() => (h.value ? w.value : P.value) == null && u !== "client" ? [] : u === "server" ? tn(c, a, y.value) : a.findInStore(Q(I.value)).data.filter((R) => R)), q = m(() => {
    const k = h.value ? w.value : P.value;
    if (k == null)
      return [];
    const T = E.value, R = k.items.find((Pe) => Pe), re = T.findIndex((Pe) => Pe[c.idField] === R[c.idField]), ve = Math.min(re, S.value);
    return T.slice(0, ve);
  }), N = m(() => {
    const k = q.value, T = S.value + (k.length - S.value);
    return {
      ...f.value,
      query: {
        ...f.value.query,
        $limit: d.value,
        $skip: T
      }
    };
  }), F = m(() => u === "server" ? Zr(c, a, y.value) : u === "hybrid" ? a.findInStore(Q(N)).data.filter((T) => T) : a.findInStore(Q(f)).data.filter((T) => T)), M = j([]), A = m(() => M.value[M.value.length - 1] || null), L = m(() => M.value[M.value.length - 2] || null), J = j(0), Y = j(null);
  function pe() {
    var k;
    (k = P.value) != null && k.ssr || ($.value || ($.value = !0), _(), h.value || (h.value = !0), O.value && (O.value = !1));
  }
  async function $e(k) {
    const T = C(
      k ?? (u === "client" ? I.value : f.value)
    );
    if (!p())
      return Promise.resolve({ data: [] });
    pe(), J.value++;
    try {
      const R = await a.find(T);
      if (R.total) {
        const re = c.getQueryInfo(f.value), ve = Ae({ queryInfo: re, service: a, store: c, qid: l });
        ve && M.value.push(ve), M.value.length > 2 && M.value.shift();
      }
      return O.value = !0, R;
    } catch (R) {
      throw v.value = R, R;
    } finally {
      h.value = !1;
    }
  }
  const xe = Hr($e, i), D = async (k) => {
    e.value !== null && (P.value && b(), p() && pe(), Y.value = xe(k), await Y.value, b());
  }, X = m(() => {
    if (["server", "hybrid"].includes(u)) {
      const k = P.value || w.value;
      return (k == null ? void 0 : k.total) || 0;
    } else
      return a.countInStore(I.value).value;
  }), he = rn({ limit: d, skip: S, total: X, request: Y }), { pageCount: Nt, currentPage: Dt, canPrev: Rt, canNext: Qt, toStart: Wt, toEnd: Gt, toPage: Ut, next: Vt, prev: xt } = he, Je = m(() => (setTimeout(() => {
    j(X.value);
  }, 0), c.isSsr));
  return Je.value ? o && D() : ["server", "hybrid"].includes(u) && s && (Ie(
    f,
    () => {
      D();
    },
    { immediate: !1, flush: "sync" }
  ), o && D()), u === "server" && a.on && (a.on("created", () => {
    D();
  }), a.on("patched", () => {
    D();
  }), a.on("removed", () => {
    D();
  })), ie({
    paramsWithPagination: f,
    isSsr: Je,
    // ComputedRef<boolean>
    qid: l,
    // WritableComputedRef<string>
    // Data
    data: F,
    // ComputedRef<M[]>
    allLocalData: E,
    // ComputedRef<M[]>
    total: X,
    // ComputedRef<number>
    limit: d,
    // Ref<number>
    skip: S,
    // Ref<number>
    // Queries
    currentQuery: P,
    // ComputedRef<CurrentQuery<M> | null>
    cachedQuery: w,
    // ComputedRef<CurrentQuery<M> | null>
    latestQuery: A,
    // ComputedRef<QueryInfo | null>
    previousQuery: L,
    // ComputedRef<QueryInfo | null>
    // Requests & Watching
    find: D,
    // FindFn<M>
    request: Y,
    // Ref<Promise<Paginated<M>>>
    requestCount: J,
    // Ref<number>
    queryWhen: g,
    // (queryWhenFn: () => boolean) => void
    // Request State
    isPending: m(() => h.value),
    // ComputedRef<boolean>
    haveBeenRequested: m(() => $.value),
    // ComputedRef<boolean>
    haveLoaded: m(() => O.value),
    // ComputedRef<boolean>
    error: m(() => v.value),
    // ComputedRef<any>
    clearError: _,
    // () => void
    // Pagination Utils
    pageCount: Nt,
    // Ref<number>
    currentPage: Dt,
    // Ref<number>
    canPrev: Rt,
    // ComputedRef<boolean>
    canNext: Qt,
    // ComputedRef<boolean>
    next: Vt,
    // () => Promise<void>
    prev: xt,
    // () => Promise<void>
    toStart: Wt,
    // () => Promise<void>
    toEnd: Gt,
    // () => Promise<void>
    toPage: Ut
    // (page: number) => Promise<void>
  });
}
function sn(e, t = j({}), r) {
  const { service: n } = r, i = K(e) ? e : j(e), o = K(t) ? t : j(t), { immediate: s = !0, watch: u = !0 } = o.value, a = m(() => n.store.isSsr), c = j(!1), l = j(!1), d = j(null), S = () => d.value = null, f = j([]), I = m(() => f.value.length && f.value[f.value.length - 1]), h = m(() => c.value && I.value != null ? n.store.getFromStore(I.value, o).value : n.store.getFromStore(i.value, o).value), $ = n.store.getFromStore, O = m(() => !!h.value);
  let v = () => !0;
  const _ = (w) => {
    v = w;
  }, y = j(0), b = j(null);
  async function p() {
    const w = C(i), P = C(o);
    if (v()) {
      if (w == null)
        return null;
      y.value++, l.value = !0, c.value = !0, d.value = null;
      try {
        const E = await n.get(w, P);
        return E && w && f.value.push(w), E;
      } catch (E) {
        d.value = E;
      } finally {
        c.value = !1;
      }
    }
  }
  async function g() {
    return b.value = p(), await b.value;
  }
  return a.value ? s && g() : u && Ie(
    i,
    async () => {
      await g();
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
    getFromStore: $,
    // (id: Id | null, params: Params<Query>) => M | undefined
    // Requests & Watching
    get: g,
    // GetFn<M>
    request: b,
    // Ref<Promise<M | undefined>>
    requestCount: y,
    // Ref<number>
    queryWhen: _,
    // (queryWhenFn: () => boolean) => void
    // Request State
    isPending: m(() => c.value),
    // ComputedRef<boolean>
    hasBeenRequested: m(() => l.value),
    // ComputedRef<boolean>
    hasLoaded: m(() => O.value),
    // ComputedRef<boolean>
    error: m(() => d.value),
    // ComputedRef<any>
    clearError: S
    // () => void
  });
}
class on {
  constructor(t, r) {
    je(this, "store");
    je(this, "servicePath", "");
    this.service = t, this.options = r, this.store = r.store, this.servicePath = r.servicePath;
    const n = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).concat(Jr);
    for (const i in t)
      if (typeof t[i] == "function" && !n.includes(i)) {
        const o = this;
        o[i] = t[i].bind(t);
      }
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
    const r = Z(t);
    return await this.service.find(r);
  }
  async findOne(t) {
    const r = Z(t);
    r.query = r.query || {}, r.query.$limit = 1;
    const n = await this.service.find(r);
    return (n.data || n)[0] || null;
  }
  async count(t) {
    const r = Z(t);
    return r.query = r.query || {}, r.query.$limit = 0, await this.service.find(r);
  }
  async get(t, r) {
    const n = Z(r);
    return await this.service.get(t, n);
  }
  async create(t, r) {
    const n = Z(r);
    return await this.service.create(t, n);
  }
  async patch(t, r, n) {
    const i = Z(n);
    return await this.service.patch(t, r, i);
  }
  async remove(t, r) {
    const n = Z(r);
    return await this.service.remove(C(t), n);
  }
  findInStore(t) {
    const r = this.store.findInStore(t);
    return ie({
      ...r,
      data: m(() => r.data.map((n) => ne(this, n)))
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
    if (t == null && ((i = C(r)) != null && i.query))
      return this.store.removeByQuery(r);
  }
  /* hybrid methods */
  useFind(t, r) {
    const n = K(t) ? t : j(t);
    return nn(n, r, { service: this });
  }
  useGet(t, r = j({})) {
    const n = K(t) ? t : j(t), i = K(r) ? r : j(r);
    return sn(n, i, { service: this });
  }
  useGetOnce(t, r = {}) {
    const n = K(r) ? r : j(r);
    Object.assign(n.value, { immediate: !1 });
    const i = this.useGet(t, n);
    return i.queryWhen(() => !i.data), i.get(), i;
  }
  /* events */
  on(t, r) {
    return this.service.on(t, r);
  }
  emit(t, ...r) {
    return this.service.emit(t, ...r);
  }
  removeListener(t, r) {
    return this.service.removeListener(t, r);
  }
}
var bt = { exports: {} };
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
})(bt);
var un = bt.exports, an = un;
const cn = /* @__PURE__ */ Oe(an);
function wt(e, t) {
  if (e.__isStoreInstance)
    return e;
  const { idField: r, clonesById: n, clone: i, commit: o, reset: s, createInStore: u, removeFromStore: a } = t, c = e.__isClone || !1;
  return Object.defineProperty(e, "__isTemp", {
    configurable: !0,
    enumerable: !1,
    get() {
      return this[this.__idField] == null;
    }
  }), de(e, {
    __isStoreInstance: !0,
    __isClone: c,
    __idField: r,
    __tempId: e[r] == null && e.__tempId == null ? new cn().toString() : e.__tempId || void 0,
    hasClone() {
      const d = this[this.__idField] || this.__tempId;
      return n.value[d] || null;
    },
    clone(d = {}, S = {}) {
      return i(this, d, S);
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
var Ce = function(e, t) {
  return Ce = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var i in n)
      Object.prototype.hasOwnProperty.call(n, i) && (r[i] = n[i]);
  }, Ce(e, t);
};
function B(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Ce(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
var Qe = function(e) {
  var t = "[object " + e + "]";
  return function(r) {
    return ln(r) === t;
  };
}, ln = function(e) {
  return Object.prototype.toString.call(e);
}, oe = function(e) {
  return e instanceof Date ? e.getTime() : ue(e) ? e.map(oe) : e && typeof e.toJSON == "function" ? e.toJSON() : e;
}, fn = function(e) {
  return e ?? null;
}, ue = Qe("Array"), dn = Qe("Object"), pn = Qe("Function"), hn = function(e) {
  return e && (e.constructor === Object || e.constructor === Array || e.constructor.toString() === "function Object() { [native code] }" || e.constructor.toString() === "function Array() { [native code] }") && !e.toJSON;
}, Te = function(e, t) {
  if (e == null && e == t || e === t)
    return !0;
  if (Object.prototype.toString.call(e) !== Object.prototype.toString.call(t))
    return !1;
  if (ue(e)) {
    if (e.length !== t.length)
      return !1;
    for (var r = 0, n = e.length; r < n; r++)
      if (!Te(e[r], t[r]))
        return !1;
    return !0;
  } else if (dn(e)) {
    if (Object.keys(e).length !== Object.keys(t).length)
      return !1;
    for (var i in e)
      if (!Te(e[i], t[i]))
        return !1;
    return !0;
  }
  return !1;
}, Le = function(e, t, r, n, i, o) {
  var s = t[n];
  if (ue(e) && isNaN(Number(s))) {
    for (var u = 0, a = e.length; u < a; u++)
      if (!Le(e[u], t, r, n, u, e))
        return !1;
  }
  return n === t.length || e == null ? r(e, i, o, n === 0) : Le(e[s], t, r, n + 1, s, e);
}, U = (
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
), We = (
  /** @class */
  function(e) {
    B(t, e);
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
  }(U)
), _t = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, n, i, o, s) {
      var u = e.call(this, r, n, i, o) || this;
      return u.name = s, u;
    }
    return t;
  }(We)
), vn = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !0, r;
    }
    return t.prototype.next = function(r, n, i, o) {
      this.childrenNext(r, n, i, o);
    }, t;
  }(We)
), Be = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, n, i, o, s) {
      var u = e.call(this, n, i, o, s) || this;
      return u.keyPath = r, u.propop = !0, u._nextNestedValue = function(a, c, l, d) {
        return u.childrenNext(a, c, l, d), !u.done;
      }, u;
    }
    return t.prototype.next = function(r, n, i) {
      Le(r, this.keyPath, this._nextNestedValue, 0, n, i);
    }, t;
  }(We)
), Ge = function(e, t) {
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
}, x = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !0, r;
    }
    return t.prototype.init = function() {
      this._test = Ge(this.params, this.options.compare);
    }, t.prototype.next = function(r, n, i) {
      (!Array.isArray(i) || i.hasOwnProperty(n)) && this._test(r, n, i) && (this.done = !0, this.keep = !0);
    }, t;
  }(U)
), we = function(e, t, r) {
  return new x(e, t, r);
}, yn = function(e) {
  return function(t, r, n, i) {
    return e(t, r, n, i);
  };
}, _e = function(e) {
  return yn(function(t, r, n, i) {
    var o = typeof oe(t), s = e(t);
    return new x(function(u) {
      var a = fn(u);
      return typeof oe(a) === o && s(a);
    }, r, n, i);
  });
}, mn = function(e, t, r, n) {
  var i = n.operations[e];
  return i || $t(e), i(t, r, n, e);
}, $t = function(e) {
  throw new Error("Unsupported operation: " + e);
}, Pt = function(e, t) {
  for (var r in e)
    if (t.operations.hasOwnProperty(r) || r.charAt(0) === "$")
      return !0;
  return !1;
}, gn = function(e, t, r, n, i) {
  if (Pt(t, i)) {
    var o = jt(t, r, i), s = o[0], u = o[1];
    if (u.length)
      throw new Error("Property queries must contain only operations, or exact objects.");
    return new Be(e, t, n, i, s);
  }
  return new Be(e, t, n, i, [
    new x(t, n, i)
  ]);
}, ae = function(e, t, r) {
  t === void 0 && (t = null);
  var n = r === void 0 ? {} : r, i = n.compare, o = n.operations, s = {
    compare: i || Te,
    operations: Object.assign({}, o || {})
  }, u = jt(e, null, s), a = u[0], c = u[1], l = [];
  return a.length && l.push(new Be([], e, t, s, a)), l.push.apply(l, c), l.length === 1 ? l[0] : new vn(e, t, s, l);
}, jt = function(e, t, r) {
  var n = [], i = [];
  if (!hn(e))
    return n.push(new x(e, e, r)), [n, i];
  for (var o in e)
    if (r.operations.hasOwnProperty(o)) {
      var s = mn(o, e[o], e, r);
      if (s && !s.propop && t && !r.operations[t])
        throw new Error("Malformed query. " + o + " cannot be matched against property.");
      s != null && n.push(s);
    } else
      o.charAt(0) === "$" ? $t(o) : i.push(gn(o.split("."), e[o], o, e, r));
  return [n, i];
}, Sn = function(e) {
  return function(t, r, n) {
    return e.reset(), e.next(t, r, n), e.keep;
  };
}, In = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !0, r;
    }
    return t.prototype.init = function() {
      this._test = Ge(this.params, this.options.compare);
    }, t.prototype.reset = function() {
      e.prototype.reset.call(this), this.keep = !0;
    }, t.prototype.next = function(r) {
      this._test(r) && (this.done = !0, this.keep = !1);
    }, t;
  }(U)
), On = (
  /** @class */
  function(e) {
    B(t, e);
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
  }(U)
), bn = (
  /** @class */
  function(e) {
    B(t, e);
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
  }(U)
), kt = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !0, r;
    }
    return t.prototype.init = function() {
    }, t.prototype.next = function(r) {
      ue(r) && r.length === this.params && (this.done = !0, this.keep = !0);
    }, t;
  }(U)
), Et = function(e) {
  if (e.length === 0)
    throw new Error("$and/$or/$nor must be a nonempty array");
}, At = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !1, r;
    }
    return t.prototype.init = function() {
      var r = this;
      Et(this.params), this._ops = this.params.map(function(n) {
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
  }(U)
), wn = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !1, r;
    }
    return t.prototype.next = function(r, n, i) {
      e.prototype.next.call(this, r, n, i), this.keep = !this.keep;
    }, t;
  }(At)
), qt = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !0, r;
    }
    return t.prototype.init = function() {
      var r = this;
      this._testers = this.params.map(function(n) {
        if (Pt(n, r.options))
          throw new Error("cannot nest $ under " + r.name.toLowerCase());
        return Ge(n, r.options.compare);
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
  }(U)
), _n = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, n, i, o) {
      var s = e.call(this, r, n, i, o) || this;
      return s.propop = !0, s._in = new qt(r, n, i, o), s;
    }
    return t.prototype.next = function(r, n, i, o) {
      this._in.next(r, n, i), ue(i) && !o ? this._in.keep ? (this.keep = !1, this.done = !0) : n == i.length - 1 && (this.keep = !0, this.done = !0) : (this.keep = !this._in.keep, this.done = !0);
    }, t.prototype.reset = function() {
      e.prototype.reset.call(this), this._in.reset();
    }, t;
  }(U)
), $n = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !0, r;
    }
    return t.prototype.next = function(r, n, i) {
      i.hasOwnProperty(n) === this.params && (this.done = !0, this.keep = !0);
    }, t;
  }(U)
), Pn = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, n, i, o) {
      var s = e.call(this, r, n, i, r.map(function(u) {
        return ae(u, n, i);
      }), o) || this;
      return s.propop = !1, Et(r), s;
    }
    return t.prototype.next = function(r, n, i, o) {
      this.childrenNext(r, n, i, o);
    }, t;
  }(_t)
), jn = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, n, i, o) {
      var s = e.call(this, r, n, i, r.map(function(u) {
        return ae(u, n, i);
      }), o) || this;
      return s.propop = !0, s;
    }
    return t.prototype.next = function(r, n, i, o) {
      this.childrenNext(r, n, i, o);
    }, t;
  }(_t)
), kn = function(e, t, r) {
  return new x(e, t, r);
}, En = function(e, t, r, n) {
  return new In(e, t, r, n);
}, An = function(e, t, r, n) {
  return new At(e, t, r, n);
}, qn = function(e, t, r, n) {
  return new wn(e, t, r, n);
}, Fn = function(e, t, r, n) {
  return new On(e, t, r, n);
}, Cn = function(e, t, r, n) {
  return new _n(e, t, r, n);
}, Tn = function(e, t, r, n) {
  return new qt(e, t, r, n);
}, Ln = _e(function(e) {
  return function(t) {
    return t != null && t < e;
  };
}), Bn = _e(function(e) {
  return function(t) {
    return t === e || t <= e;
  };
}), Mn = _e(function(e) {
  return function(t) {
    return t != null && t > e;
  };
}), Nn = _e(function(e) {
  return function(t) {
    return t === e || t >= e;
  };
}), Dn = function(e, t, r) {
  var n = e[0], i = e[1];
  return new x(function(o) {
    return oe(o) % n === i;
  }, t, r);
}, Rn = function(e, t, r, n) {
  return new $n(e, t, r, n);
}, Qn = function(e, t, r) {
  return new x(new RegExp(e, t.$options), t, r);
}, Wn = function(e, t, r, n) {
  return new bn(e, t, r, n);
}, it = {
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
}, Gn = function(e, t, r) {
  return new x(function(n) {
    if (typeof e == "string") {
      if (!it[e])
        throw new Error("Type alias does not exist");
      return it[e](n);
    }
    return n != null ? n instanceof e || n.constructor === e : !1;
  }, t, r);
}, Un = function(e, t, r, n) {
  return new Pn(e, t, r, n);
}, Vn = function(e, t, r, n) {
  return new jn(e, t, r, n);
}, xn = function(e, t, r) {
  return new kt(e, t, r, "$size");
}, Jn = function() {
  return null;
}, Kn = function(e, t, r) {
  var n;
  if (pn(e))
    n = e;
  else if (!process.env.CSP_ENABLED)
    n = new Function("obj", "return " + e);
  else
    throw new Error('In CSP mode, sift does not support strings in "$where" condition');
  return new x(function(i) {
    return n.bind(i)(i);
  }, t, r);
}, zn = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  $Size: kt,
  $eq: kn,
  $ne: En,
  $or: An,
  $nor: qn,
  $elemMatch: Fn,
  $nin: Cn,
  $in: Tn,
  $lt: Ln,
  $lte: Bn,
  $gt: Mn,
  $gte: Nn,
  $mod: Dn,
  $exists: Rn,
  $regex: Qn,
  $not: Wn,
  $type: Gn,
  $and: Un,
  $all: Vn,
  $size: xn,
  $options: Jn,
  $where: Kn
}), Hn = function(e, t, r) {
  var n = r === void 0 ? {} : r, i = n.compare, o = n.operations;
  return ae(e, t, {
    compare: i,
    operations: Object.assign({}, zn, o || {})
  });
}, Yn = function(e, t) {
  t === void 0 && (t = {});
  var r = Hn(e, null, t);
  return Sn(r);
};
function Ue(e, t, r = "g") {
  const n = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\"];
  return t = t.replace(new RegExp(`(\\${n.join("|\\")})`, r), "\\$1"), t = t.replace(/%/g, ".*").replace(/_/g, "."), RegExp(`^${t}$`, r).test(e);
}
function Ft(e, t) {
  return Ue(e, t, "ig");
}
function Xn(e, t, r) {
  return we((n) => Ue(n, e), t, r);
}
function st(e, t, r) {
  return we((n) => !Ue(n, e), t, r);
}
function ot(e, t, r) {
  return we((n) => Ft(n, e), t, r);
}
function Zn(e, t, r) {
  return we((n) => !Ft(n, e), t, r);
}
const ei = {
  $like: Xn,
  $notLike: st,
  $notlike: st,
  $ilike: ot,
  $iLike: ot,
  $notILike: Zn
}, ti = ["$sort", "$limit", "$skip", "$select"], ri = [
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
function Ct(e) {
  const {
    idField: t,
    itemStorage: r,
    tempStorage: n,
    cloneStorage: i,
    addItemToStorage: o,
    paramsForServer: s = [],
    whitelist: u = [],
    customSiftOperators: a = {}
  } = e, c = Object.assign({}, ei, a), l = m(() => ri.concat(u || []).concat(Object.keys(c))), d = (y, b = []) => {
    y = { ...C(y) };
    const p = s, g = se.omit(y.query || {}, ...p), { query: w, filters: P } = Xt(g, {
      operators: l.value
    });
    let E = b.concat(r.list.value);
    return n && y.temps && E.push(...n.list.value), P.$or && (w.$or = P.$or), P.$and && (w.$and = P.$and), E = E.filter(Yn(w, { operations: c })), { values: E, filters: P };
  };
  function S(y) {
    const b = m(() => {
      const p = C(y);
      p.query && (p.query = Q(p.query));
      const g = d(p), w = g.filters;
      let P = g.values;
      const E = P.length;
      return w.$sort && P.sort(Yt(w.$sort)), w.$skip && (P = P.slice(w.$skip)), typeof w.$limit < "u" && (P = P.slice(0, w.$limit)), {
        total: E,
        limit: w.$limit || 0,
        skip: w.$skip || 0,
        data: p.clones ? P.map((q) => q.clone ? q.clone(void 0, { useExisting: !0 }) : q) : P
      };
    });
    return ie({
      total: m(() => b.value.total),
      limit: m(() => b.value.limit),
      skip: m(() => b.value.skip),
      data: m(() => b.value.data)
    });
  }
  function f(y) {
    const b = S(y);
    return m(() => b.data[0] || null);
  }
  function I(y) {
    return m(() => {
      if (y = { ...C(y) }, !y.query)
        throw new Error("params must contain a query object");
      return y.query = se.omit(y.query, ...ti), S(y).total;
    });
  }
  const h = (y, b) => m(() => {
    const p = C(y);
    b = te(C(b) || {}), b.query && (b.query = Q(b.query));
    let g = null;
    const w = r.getItem(p) && Xe(b, t)(r.getItem(p)), P = n && n.getItem(p) && Xe(b, "__tempId")(n.getItem(p));
    return w ? g = w : P && (g = P), b.clones && g.clone ? g.clone(void 0, { useExisting: !0 }) : g || null;
  });
  function $(y) {
    const { items: b, isArray: p } = ee(C(y)), g = b.map((w) => o(C(w)));
    return p ? g : g[0];
  }
  function O(y, b = {}, p = {}) {
    const g = C(y), w = C(b), P = C(p);
    function E(q) {
      return q.map((F) => {
        if (F = C(F), (typeof F == "number" || typeof F == "string") && (F = h(F).value), F == null)
          return null;
        const M = { ...F, ...w };
        return o(M);
      }).filter((F) => F);
    }
    if (g === null) {
      if (P != null && P.query && !Object.keys(P == null ? void 0 : P.query).length)
        throw new Error(
          'cannot perform multiple patchInStore with an empty query. You must explicitly provide a query. To patch all items, try using a query that matches all items, like "{ id: { $exists: true } }"'
        );
      const q = S(P).data;
      return E(q);
    } else {
      const { items: q, isArray: N } = ee(g), F = E(q);
      return N ? F : F[0];
    }
  }
  function v(y, b) {
    if (y === null && (b != null && b.query) && Object.keys(b == null ? void 0 : b.query).length) {
      const p = i ? i.list.value : [], { values: g } = d(b, p);
      return _(g);
    } else
      y !== null && _(y);
    return y;
  }
  function _(y) {
    const { items: b } = ee(y);
    return b.forEach((p) => {
      if (typeof p == "string")
        r.removeItem(p), n == null || n.removeItem(p), i == null || i.removeItem(p);
      else {
        if (p.__isClone)
          return i == null ? void 0 : i.remove(p);
        if (p.__isTemp)
          return n == null ? void 0 : n.remove(p);
        r.remove(p), n == null || n.remove(p), i == null || i.remove(p);
      }
    }), y;
  }
  return {
    findInStore: S,
    findOneInStore: f,
    countInStore: I,
    getFromStore: h,
    createInStore: $,
    patchInStore: O,
    removeFromStore: v
  };
}
function Ve({
  getId: e,
  onRead: t = (i) => i,
  beforeWrite: r = (i) => i,
  assign: n = (i, o) => Object.assign(i, o)
}) {
  const i = j({}), o = m(() => Object.values(i.value)), s = m(() => Object.keys(i.value)), u = (v) => !!i.value[v], a = (v) => {
    const _ = e(v);
    return u(_);
  }, c = (v) => {
    const _ = i.value[v];
    return _ ? t(_) : null;
  }, l = (v, _) => {
    if (v == null)
      throw new Error("item has no id");
    return W(i.value, v, r(_)), c(v);
  }, d = (v) => {
    const _ = e(v);
    return l(_, v);
  }, S = (v) => {
    const _ = e(v), y = c(_);
    return y ? n(y, v) : l(_, v), c(_);
  }, f = (v) => {
    const _ = e(v);
    return c(_);
  }, I = (v) => {
    const _ = u(v);
    return _ && G(i.value, v), _;
  };
  return { byId: i, list: o, ids: s, getId: e, clear: () => {
    Object.keys(i.value).forEach((v) => {
      G(i.value, v);
    });
  }, has: a, hasItem: u, get: f, getItem: c, set: d, setItem: l, remove: (v) => {
    const _ = e(v);
    return I(_);
  }, removeItem: I, getKeys: () => s.value, merge: S };
}
function ni(e) {
  const { getId: t, itemStorage: r, onRead: n, beforeWrite: i } = e, o = Ve({
    getId: t,
    onRead: n,
    beforeWrite: i
  });
  function s(u) {
    return o.has(u) && o.remove(u), r.set(u);
  }
  return { tempStorage: o, moveTempToItems: s };
}
function ii(e) {
  const { itemStorage: t, tempStorage: r, onRead: n, beforeWrite: i } = e, o = (f, I = {}, { isClone: h }) => te(Object.assign({}, f, I, { __isClone: h })), s = e.makeCopy || o, u = Ve({
    getId: (f) => {
      const I = t.getId(f);
      return I ?? r.getId(f);
    },
    onRead: n,
    beforeWrite: i
  });
  function a(f) {
    return f.__isClone || (t.has(f) ? t.merge(f) : r.has(f) && r.merge(f)), t.get(f) || r.get(f) || (t.getId(f) != null ? t.merge(f) : r.getId(f) != null && r.merge(f)), t.get(f) || r.get(f);
  }
  function c(f, I = {}, h = {}) {
    const $ = u.get(f);
    return a(f), $ && h.useExisting ? $ : d(f, I);
  }
  function l(f, I = {}) {
    const h = t.getId(f), $ = s(f, I, { isClone: !1 });
    return h ? (t.merge($), t.get($)) : (r.merge($), r.get($));
  }
  function d(f, I = {}) {
    const h = a(f);
    if (u.get(f)) {
      const O = s(h, I, { isClone: !0 });
      Object.keys(h).forEach((v) => {
        h[v] == null && G(O, v);
      }), u.merge(O);
    } else {
      const O = s(f, I, { isClone: !0 });
      u.set(O);
    }
    return u.get(f);
  }
  function S(f) {
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
    markAsClone: S
  };
}
function Tt(e) {
  const { getIdField: t, setupInstance: r } = e, n = (f, I = {}, { isClone: h }) => {
    const $ = te(f);
    return Object.assign($, I), Object.defineProperty($, "__isTemp", {
      configurable: !0,
      enumerable: !1,
      get() {
        return this[this.__idField] == null;
      }
    }), de($, {
      __isClone: h,
      __tempId: f.__tempId
    });
  }, i = Ve({
    getId: t,
    beforeWrite: r,
    onRead: r
  }), { tempStorage: o, moveTempToItems: s } = ni({
    getId: (f) => f.__tempId,
    itemStorage: i,
    beforeWrite: r,
    onRead: r
  }), { cloneStorage: u, clone: a, commit: c, reset: l, markAsClone: d } = ii({
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
      const I = t(f);
      return f = r(f), f.__isClone ? u.merge(f) : I != null && f.__tempId != null ? s(f) : I != null ? i.merge(f) : o && f.__tempId != null ? o == null ? void 0 : o.merge(f) : i.merge(f);
    }
  };
}
function si() {
  return {
    skipGetIfExists: !1
  };
}
function Xi(e) {
  const t = Object.assign({}, si(), e), { idField: r, customSiftOperators: n } = t, { itemStorage: i, tempStorage: o, cloneStorage: s, clone: u, commit: a, reset: c, addItemToStorage: l } = Tt({
    getIdField: (p) => p[r],
    setupInstance: v
  }), { findInStore: d, findOneInStore: S, countInStore: f, getFromStore: I, createInStore: h, patchInStore: $, removeFromStore: O } = Ct({
    idField: r,
    itemStorage: i,
    tempStorage: o,
    cloneStorage: s,
    addItemToStorage: l,
    customSiftOperators: n
  });
  function v(p) {
    const g = wt(p, {
      idField: r,
      clonesById: s.byId,
      clone: u,
      commit: a,
      reset: c,
      createInStore: h,
      removeFromStore: O
    });
    if (p.__isSetup)
      return g;
    {
      const w = t.setupInstance ? t.setupInstance(g) : g;
      return Object.defineProperty(w, "__isSetup", { value: !0 }), w;
    }
  }
  const _ = m(() => !!C(t.ssr));
  function y() {
    i.clear(), o.clear(), s.clear();
  }
  return {
    new: v,
    idField: r,
    isSsr: _,
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
    findOneInStore: S,
    countInStore: f,
    createInStore: h,
    getFromStore: I,
    patchInStore: $,
    removeFromStore: O,
    clearAll: y
  };
}
var Lt = {}, H = {};
Object.defineProperty(H, "__esModule", { value: !0 });
H.createDebug = H.setDebug = H.noopDebug = void 0;
const fe = {};
function Bt() {
  return function() {
  };
}
H.noopDebug = Bt;
let Mt = Bt;
function oi(e) {
  Mt = e, Object.keys(fe).forEach((t) => {
    fe[t] = e(t);
  });
}
H.setDebug = oi;
function ui(e) {
  return fe[e] || (fe[e] = Mt(e)), (...t) => fe[e](...t);
}
H.createDebug = ui;
(function(e) {
  var t = ye && ye.__createBinding || (Object.create ? function(s, u, a, c) {
    c === void 0 && (c = a);
    var l = Object.getOwnPropertyDescriptor(u, a);
    (!l || ("get" in l ? !u.__esModule : l.writable || l.configurable)) && (l = { enumerable: !0, get: function() {
      return u[a];
    } }), Object.defineProperty(s, c, l);
  } : function(s, u, a, c) {
    c === void 0 && (c = a), s[c] = u[a];
  }), r = ye && ye.__exportStar || function(s, u) {
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
  e.createSymbol = o, r(H, e);
})(Lt);
function ai(e) {
  const { idField: t, isSsr: r } = e, n = e.defaultLimit || 10, i = j({});
  function o() {
    const { defaultLimit: c, defaultSkip: l } = i.value;
    i.value = { defaultLimit: c, defaultSkip: l };
  }
  function s({
    qid: c,
    response: l,
    query: d = {},
    preserveSsr: S = !1
  }) {
    var N, F;
    const { data: f, total: I } = l, h = f.map((M) => ge(M, t)), $ = (/* @__PURE__ */ new Date()).getTime(), { queryId: O, queryParams: v, pageId: _, pageParams: y } = a({ qid: c, query: d });
    i.value[c] || W(i.value, c, {}), !z(d, "$limit") && z(l, "limit") && W(i.value, "defaultLimit", l.limit), !z(d, "$skip") && z(l, "skip") && W(i.value, "defaultSkip", l.skip);
    const b = {
      query: d,
      queryId: O,
      queryParams: v,
      pageId: _,
      pageParams: y,
      queriedAt: $,
      total: I
    }, p = (F = (N = i.value[c]) == null ? void 0 : N[O]) == null ? void 0 : F[_], g = i.value[c] || {};
    Object.assign(g, { mostRecent: b }), W(g, O, g[O] || {});
    const w = {
      total: I,
      queryParams: v
    };
    W(g, O, Object.assign({}, g[O], w));
    const P = S ? p == null ? void 0 : p.ssr : r.value, E = {
      [_]: { pageParams: y, ids: h, queriedAt: $, ssr: !!P }
    };
    Object.assign(g[O], E);
    const q = Object.assign({}, i.value[c], g);
    W(i.value, c, q);
  }
  function u(c) {
    var h, $;
    const l = a(c), { qid: d, queryId: S, pageId: f } = l, I = ($ = (h = i.value[d]) == null ? void 0 : h[S]) == null ? void 0 : $[f];
    I.ssr = !1;
  }
  function a(c) {
    const l = Q(c), { query: d = {} } = l, S = l.qid || "default", f = (d == null ? void 0 : d.$limit) || n, I = (d == null ? void 0 : d.$skip) || 0, h = f !== void 0 ? { $limit: f, $skip: I } : void 0, $ = h ? Se(h) : void 0, O = Lt._.omit(d, "$limit", "$skip"), v = Se(O);
    return {
      qid: S,
      query: d,
      queryId: v,
      queryParams: O,
      pageParams: h,
      pageId: $,
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
function ut() {
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
function ci() {
  const e = j(ut()), t = j({}), r = j({}), n = j({}), i = j({}), o = m(() => e.value.find > 0), s = m(() => e.value.count > 0), u = m(() => e.value.get > 0), a = m(() => e.value.create > 0 || Object.keys(t.value).length > 0), c = m(() => e.value.update > 0 || Object.keys(r.value).length > 0), l = m(() => e.value.patch > 0 || Object.keys(n.value).length > 0), d = m(() => e.value.remove > 0 || Object.keys(i.value).length > 0);
  function S($, O) {
    O ? e.value[$]++ : e.value[$]--;
  }
  function f($, O, v) {
    if ($ == null)
      return;
    let _;
    O === "create" ? _ = t.value : O === "update" ? _ = r.value : O === "patch" ? _ = n.value : O === "remove" && (_ = i.value), v ? W(_, $, !0) : G(_, $);
  }
  function I(...$) {
    $.forEach((O) => {
      O != null && (G(t.value, O), G(r.value, O), G(n.value, O), G(i.value, O));
    });
  }
  function h() {
    e.value = ut(), t.value = {}, r.value = {}, n.value = {}, i.value = {};
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
    setPending: S,
    setPendingById: f,
    unsetPendingById: I,
    clearAllPending: h
  };
}
function li() {
  const e = ie({
    created: {},
    patched: {},
    updated: {},
    removed: {}
  });
  function t(n, i) {
    const { items: o } = ee(n);
    o.forEach((s) => {
      e[i][s] ? r(n, i) : (W(e[i], s, !0), setTimeout(() => {
        r(n, i);
      }, 250));
    });
  }
  function r(n, i) {
    const { items: o } = ee(n);
    o.forEach((s) => {
      G(e[i], s);
    });
  }
  return { eventLocks: e, toggleEventLock: t, clearEventLock: r };
}
function fi() {
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
function di() {
  return {
    skipGetIfExists: !1
  };
}
function pi(e) {
  const t = Object.assign({}, di(), e), { idField: r, servicePath: n, whitelist: i, paramsForServer: o, defaultLimit: s, customSiftOperators: u } = t, { itemStorage: a, tempStorage: c, cloneStorage: l, clone: d, commit: S, reset: f, addItemToStorage: I } = Tt({
    getIdField: (D) => D[r],
    setupInstance: p
  }), { findInStore: h, findOneInStore: $, countInStore: O, getFromStore: v, createInStore: _, patchInStore: y, removeFromStore: b } = Ct({
    idField: r,
    itemStorage: a,
    tempStorage: c,
    cloneStorage: l,
    addItemToStorage: I,
    whitelist: i,
    paramsForServer: o,
    customSiftOperators: u
  });
  function p(D) {
    const X = wt(D, {
      idField: r,
      clonesById: l.byId,
      clone: d,
      commit: S,
      reset: f,
      createInStore: _,
      removeFromStore: b
    });
    if (D.__isSetup)
      return X;
    {
      const he = t.setupInstance ? t.setupInstance(X) : X;
      return Object.defineProperty(he, "__isSetup", { value: !0 }), he;
    }
  }
  const g = ci(), w = m(() => !!C(t.ssr)), { pagination: P, clearPagination: E, updatePaginationForQuery: q, getQueryInfo: N, unflagSsr: F } = ai({
    idField: r,
    isSsr: w,
    defaultLimit: s
  }), { resultsByQid: M, getQid: A, setQid: L, clearQid: J, clearAllQids: Y } = fi();
  function pe() {
    a.clear(), c.clear(), l.clear(), E(), g.clearAllPending(), Y();
  }
  const $e = li();
  return {
    new: p,
    idField: r,
    servicePath: n,
    isSsr: w,
    defaultLimit: s,
    // items
    itemsById: a.byId,
    items: a.list,
    itemIds: a.ids,
    // temps
    tempsById: c.byId,
    temps: c.list,
    tempIds: c.ids,
    // clones
    clonesById: l.byId,
    clones: l.list,
    cloneIds: l.ids,
    clone: d,
    commit: S,
    reset: f,
    // local queries
    findInStore: h,
    findOneInStore: $,
    countInStore: O,
    createInStore: _,
    getFromStore: v,
    patchInStore: y,
    removeFromStore: b,
    clearAll: pe,
    // ssr qid cache
    resultsByQid: M,
    getQid: A,
    setQid: L,
    clearQid: J,
    clearAllQids: Y,
    // server options
    whitelist: i,
    paramsForServer: o,
    // server pagination
    pagination: P,
    updatePaginationForQuery: q,
    unflagSsr: F,
    getQueryInfo: N,
    ...g,
    ...$e
  };
}
const V = {};
function hi(e) {
  return `is${e.slice(0, 1).toUpperCase()}${e.slice(1, e.length - 1)}Pending`;
}
function vi(e) {
  return {
    promise: null,
    isResolved: !1,
    getter: hi(e)
  };
}
function Zi(e, t) {
  return V[t] = V[t] || vi(t), (!V[t].promise || V[t].isResolved) && (V[t].promise = new Promise((r) => {
    const n = Ie(
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
var yi = mi;
function mi(e, t, r, n) {
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
const Me = /* @__PURE__ */ Oe(yi);
function gi(e) {
  if (!e.service || e.handleEvents === !1)
    return;
  const t = e.service, r = j({}), n = j({}), i = Me(
    async () => {
      const c = Object.values(r.value);
      c.length !== 0 && (t.store.createInStore(c), r.value = {});
    },
    e.debounceEventsTime || 20,
    void 0,
    e.debounceEventsGuarantee
  );
  function o(c) {
    const l = ge(c, t.store.idField);
    l && (W(r, l, c), z(n.value, l) && G(n, l), i());
  }
  const s = Me(
    () => {
      const c = Object.values(n.value);
      c.length !== 0 && (t.store.removeFromStore(c), n.value = {});
    },
    e.debounceEventsTime || 20,
    void 0,
    e.debounceEventsGuarantee
  );
  function u(c) {
    const l = ge(c, t.store.idField);
    l && (W(n, l, c), z(r.value, l) && G(r.value, l), s());
  }
  function a(c, l) {
    var f;
    const d = (f = e.handleEvents) == null ? void 0 : f[c];
    if (d === !1)
      return;
    const S = ge(l, t.store.idField);
    if (c !== "created" && t.store.eventLocks[c][S]) {
      t.store.toggleEventLock(S, c);
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
function Si() {
  return async (e, t) => {
    if (e.params.value && (e.params = Q(e.params)), e.params.query && (e.params.query = Q(e.params.query)), e.method === "find") {
      const r = e.params.query || {};
      r.$limit == null && (r.$limit = e.service.store.defaultLimit), r.$skip == null && (r.$skip = 0), e.params.query = r;
    }
    t && await t();
  };
}
function Ii() {
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
function Oi() {
  return async (e, t) => {
    const { id: r, method: n } = e, i = e.service.store, o = ["update", "patch", "remove"].includes(n), u = {
      update: "updated",
      patch: "patched",
      remove: "removed"
    }[n];
    o && r && !i.isSsr && i.toggleEventLock(r, u), await t(), o && r && !i.isSsr && i.clearEventLock(r, u);
  };
}
function bi() {
  return async (e, t) => {
    const { method: r, params: n } = e, i = e.service.store;
    if (r === "patch" && n.data && (e.data = n.data), t && await t(), !e.params.skipStore) {
      if (r === "remove")
        i.removeFromStore(e.result);
      else if (r === "create") {
        const o = Rr(e.data, e.result);
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
function wi() {
  return async (e, t) => {
    var r;
    t && await t(), e.service.new && (Array.isArray((r = e.result) == null ? void 0 : r.data) ? e.result.data = e.result.data.map((n) => e.service.new(n)) : Array.isArray(e.result) ? e.result = e.result.map((n) => e.service.new(n)) : e.result = e.service.new(e.result));
  };
}
function _i() {
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
function $i() {
  return async (e, t) => {
    if (e.method === "find") {
      const { params: r } = e, { query: n = {} } = r;
      (r.paginate === !0 || z(n, "$limit") || z(n, "$skip")) && (r.paginate = { default: !0 });
    }
    t && await t();
  };
}
function Pi() {
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
function ji() {
  return async (e, t) => {
    const { method: r, data: n, params: i, id: o } = e, s = e.service.store;
    let u, a;
    const c = r === "patch" && !i.data && (n.__isClone || i.diff);
    if (c) {
      a = n;
      const l = s.getFromStore(o).value, d = St(l, a, i.diff);
      if (u = te(l), i.eager !== !1 && n.commit(d), i.with) {
        const S = Fe(a, i.with);
        typeof i.with != "string" && !Array.isArray(i.with) && Object.assign(S, i.with), Object.assign(d, S);
      }
      e.data = d, Object.keys(e.data).length === 0 && (e.result = a);
    } else
      e.data = te(n);
    try {
      await t();
    } catch (l) {
      throw c && a && a.commit(u), l;
    }
  };
}
function ki() {
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
function Ei() {
  return [
    Si(),
    Ii(),
    Oi(),
    bi(),
    wi(),
    _i(),
    $i(),
    Pi(),
    ji(),
    ki()
  ];
}
function Ai(e, t) {
  if (e.__isServiceInstance)
    return e;
  const { service: r, store: n } = t, i = (o, s) => Object.assign(o, s);
  return gt(e, {
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
  }), de(e, {
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
function qi(e, t) {
  const r = {};
  Object.keys(t).forEach((n) => {
    const i = e[n], o = t[n], s = this.service(o);
    if (s || console.error(`there is no service at path ${o}. Check your storeAssociated config`, e, t), i && s) {
      const u = s.createInStore(i);
      r[n] = u;
    }
  }), de(e, r);
}
function Fi(e, t, r) {
  const n = JSON.stringify(t);
  r.setItem(e, n);
}
function Ci(e, t) {
  const r = t.getItem(e.$id);
  if (r) {
    const n = JSON.parse(r) || {};
    Object.assign(e, n);
  }
}
function Ti(e, t, r = window.localStorage) {
  Ci(e, r);
  const n = Me(Fi, 500), i = m(() => se.pick(e, ...t));
  Ie(i, (o) => n(e.$id, o, r), { deep: !0 });
}
function Li(e = window.localStorage) {
  const t = "service:";
  for (let r = 0; r < e.length; r++) {
    const n = e.key(r);
    n != null && n.startsWith(t) && e.removeItem(n);
  }
}
function es(e, t) {
  const r = zt();
  r.defaultService = function(i) {
    var b;
    const o = ((b = t.services) == null ? void 0 : b[i]) || {}, s = o.idField || t.idField, u = o.defaultLimit || t.defaultLimit || 10, a = (o.whitelist || []).concat(t.whitelist || []), c = (o.paramsForServer || []).concat(t.paramsForServer || []), l = o.handleEvents || t.handleEvents, d = o.debounceEventsTime != null ? o.debounceEventsTime : t.debounceEventsTime, S = o.debounceEventsGuarantee != null ? o.debounceEventsGuarantee : t.debounceEventsGuarantee, f = Object.assign(
      {},
      o.customSiftOperators || {},
      t.customSiftOperators || {}
    );
    function I(p) {
      const g = Object.assign(p, t.customizeStore ? t.customizeStore(p) : p);
      return Object.assign(
        g,
        o.customizeStore ? o.customizeStore(g) : g
      );
    }
    function h(p) {
      const g = o.instanceServicePath || i, w = r.service(g), P = Ai(p, {
        service: w,
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        store: v
      }), E = { app: r, service: w, servicePath: g }, q = t.setupInstance ? t.setupInstance(P, E) : P;
      return o.setupInstance ? o.setupInstance(q, E) : q;
    }
    const $ = o.storeName || `service:${i}`, O = t.pinia._s.get($);
    let v;
    if (O ? v = O : v = Ht($, () => {
      const g = pi({
        idField: s,
        servicePath: i,
        defaultLimit: u,
        whitelist: a,
        paramsForServer: c,
        customSiftOperators: f,
        ssr: t.ssr,
        setupInstance: h
      }), w = I(g);
      return { ...g, ...w };
    })(t.pinia), !t.ssr && t.storage) {
      const p = ["itemsById", "pagination"], g = t.syncWithStorage === !0 ? p : Array.isArray(t.syncWithStorage) ? t.syncWithStorage : [], w = o.syncWithStorage === !0 ? p : Array.isArray(o.syncWithStorage) ? o.syncWithStorage : [], P = [.../* @__PURE__ */ new Set([...g, ...w])];
      P.length > 0 && Ti(v, P, t.storage);
    }
    const _ = e.service(i), y = new on(_, { store: v, servicePath: i });
    return gi({
      service: y,
      debounceEventsTime: d,
      debounceEventsGuarantee: S,
      handleEvents: l
    }), y;
  };
  const n = (i) => {
    i.hooks({
      around: Ei()
    });
  };
  return r.mixins.push(n), gt(r, {
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
        return Li(t.storage);
    }
  }), Object.assign(r, {
    // TODO: remove in v5
    storeAssociated: qi,
    pushToStore(i, o) {
      const s = r.service(o);
      return Vr(i, s);
    },
    defineVirtualProperty: Ot,
    defineVirtualProperties: xr
  }), r;
}
class ts extends sr {
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
const rs = {
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
class le extends Error {
}
le.prototype.name = "InvalidTokenError";
function Bi(e) {
  return decodeURIComponent(atob(e).replace(/(.)/g, (t, r) => {
    let n = r.charCodeAt(0).toString(16).toUpperCase();
    return n.length < 2 && (n = "0" + n), "%" + n;
  }));
}
function Mi(e) {
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
    return Bi(t);
  } catch {
    return atob(t);
  }
}
function Ni(e, t) {
  if (typeof e != "string")
    throw new le("Invalid token specified: must be a string");
  t || (t = {});
  const r = t.header === !0 ? 0 : 1, n = e.split(".")[r];
  if (typeof n != "string")
    throw new le(`Invalid token specified: missing part #${r + 1}`);
  let i;
  try {
    i = Mi(n);
  } catch (o) {
    throw new le(`Invalid token specified: invalid base64 for part #${r + 1} (${o.message})`);
  }
  try {
    return JSON.parse(i);
  } catch (o) {
    throw new le(`Invalid token specified: invalid json for part #${r + 1} (${o.message})`);
  }
}
function ns(e) {
  const { api: t, servicePath: r, skipTokenCheck: n } = e, i = r ? t.service(r) : null, o = e.entityKey || "user", s = j(), u = async () => {
  }, a = async (A) => {
    throw A;
  }, c = e.onSuccess || u, l = e.onError || a, d = e.onInitSuccess || u, S = e.onInitError || u, f = e.onLogoutSuccess || u, I = e.onLogoutError || a, h = j(null), $ = m(() => !i || !h.value ? null : (i == null ? void 0 : i.store.itemsById[h.value]) || null), O = j(null), v = () => O.value = null, _ = tt(), y = m(() => !!_.count.value), b = j(!1), p = (A) => {
    const L = A[o];
    if (i && L) {
      const J = i.store.createInStore(L);
      h.value = J[i.store.idField] || J.__tempId;
    }
    return b.value = !0, A;
  }, g = async (A) => (_.add(), v(), s.value = t.authenticate(A).then(p).then(async (L) => await c(L) || L).catch((L) => (O.value = L, l(L))).finally(() => {
    _.sub();
  }), s.value), w = (A) => {
    try {
      const L = Ni(A);
      return (/* @__PURE__ */ new Date()).getTime() > L.exp * 1e3;
    } catch {
      return !1;
    }
  }, P = j(!1), E = async () => (_.add(), s.value = t.reAuthenticate().then(p).then(async (A) => await d(A) || A).catch((A) => (A.value = A, S(A))).finally(() => {
    _.sub(), P.value = !0;
  }), s.value), q = tt(), N = m(() => !!q.count.value), F = async () => (q.add(), t.logout().then((A) => (h.value = null, b.value = !1, A)).then(f).catch((A) => (A.value = A, I(A))).finally(() => q.sub())), M = j(null);
  return {
    userId: h,
    user: $,
    error: O,
    isPending: y,
    isLogoutPending: N,
    isInitDone: P,
    isAuthenticated: b,
    loginRedirect: M,
    getPromise: () => s.value,
    isTokenExpired: w,
    authenticate: g,
    reAuthenticate: E,
    logout: F,
    clearError: v
  };
}
function is(e, t) {
  const r = er(null);
  tr(e, async (o) => {
    var c, l;
    if (!e)
      return;
    const s = t == null ? void 0 : t.idField, u = s ? o == null ? void 0 : o[s] : o == null ? void 0 : o.id, a = s ? (c = r.value) == null ? void 0 : c[s] : (l = r.value) == null ? void 0 : l.id;
    u !== a && (r.value = et(o));
  }, { immediate: !0 });
  async function n() {
    const o = rr(e), s = St(r.value, o, t == null ? void 0 : t.onlyProps);
    if (Object.keys(s).length)
      try {
        const u = await e.value.save({ data: s });
        r.value = et(u);
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
  ts as OFetch,
  on as PiniaService,
  Li as clearStorage,
  es as createPiniaClient,
  gt as defineGetters,
  Hi as defineSetters,
  de as defineValues,
  xr as defineVirtualProperties,
  Ot as defineVirtualProperty,
  St as diff,
  Oi as eventLocks,
  rs as feathersPiniaAutoImport,
  Ei as feathersPiniaHooks,
  ee as getArray,
  Ae as getExtendedQueryInfo,
  ge as getId,
  Z as getParams,
  z as hasOwn,
  Ci as hydrateStore,
  wi as makeModelInstances,
  $i as normalizeFind,
  Fe as pickDiff,
  Vr as pushToStore,
  Rr as restoreTempIds,
  Ii as setPending,
  Pi as skipGetIfExists,
  qi as storeAssociated,
  bi as syncStore,
  Ti as syncWithStorage,
  ce as timeout,
  Tt as useAllStorageTypes,
  ns as useAuth,
  is as useBackup,
  Xi as useDataStore,
  nn as useFind,
  sn as useGet,
  Yi as useInstanceDefaults,
  wt as useModelInstance,
  Zi as useQueuePromise,
  ii as useServiceClones,
  li as useServiceEventLocks,
  gi as useServiceEvents,
  Ai as useServiceInstance,
  Ct as useServiceLocal,
  ai as useServicePagination,
  ci as useServicePending,
  Ve as useServiceStorage,
  pi as useServiceStore,
  ni as useServiceTemps,
  Fi as writeToStorage
};
//# sourceMappingURL=feathers-pinia.js.map
