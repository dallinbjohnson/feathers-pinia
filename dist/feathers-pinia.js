var xt = Object.defineProperty;
var Jt = (e, t, r) => t in e ? xt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var je = (e, t, r) => (Jt(e, typeof t != "symbol" ? t + "" : t, r), r);
import { feathers as Kt } from "@feathersjs/feathers";
import { defineStore as zt } from "pinia";
import { unref as F, ref as j, isRef as K, computed as y, watch as Oe, reactive as ee, set as W, del as G } from "vue-demi";
import { _ as se } from "@feathersjs/commons";
import { sorter as Ht, select as Ye, filterQuery as Yt } from "@feathersjs/adapter-commons";
import { reactive as Xt, ref as Zt, watch as er, unref as tr, isRef as rr } from "vue";
import { BadRequest as nr } from "@feathersjs/errors";
import { FetchClient as ir } from "@feathersjs/rest-client";
var ye = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ie(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var sr = function e(t, r) {
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
const Xe = /* @__PURE__ */ Ie(sr);
var or = Function.prototype.toString, ke = Object.create, ur = Object.prototype.toString, ar = (
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
function cr() {
  return new ar();
}
function lr() {
  return /* @__PURE__ */ new WeakMap();
}
var fr = typeof WeakMap < "u" ? lr : cr;
function Ne(e) {
  if (!e)
    return ke(null);
  var t = e.constructor;
  if (t === Object)
    return e === Object.prototype ? {} : ke(e);
  if (~or.call(t).indexOf("[native code]"))
    try {
      return new t();
    } catch {
    }
  return ke(e);
}
function dr(e) {
  var t = "";
  return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.unicode && (t += "u"), e.sticky && (t += "y"), t;
}
function pr(e) {
  return e.flags;
}
var hr = /test/g.flags === "g" ? pr : dr;
function ut(e) {
  var t = ur.call(e);
  return t.substring(8, t.length - 1);
}
function vr(e) {
  return e[Symbol.toStringTag] || ut(e);
}
var yr = typeof Symbol < "u" ? vr : ut, mr = Object.defineProperty, gr = Object.getOwnPropertyDescriptor, at = Object.getOwnPropertyNames, De = Object.getOwnPropertySymbols, ct = Object.prototype, lt = ct.hasOwnProperty, Sr = ct.propertyIsEnumerable, ft = typeof De == "function";
function Or(e) {
  return at(e).concat(De(e));
}
var Ir = ft ? Or : at;
function be(e, t, r) {
  for (var n = Ir(e), i = 0, o = n.length, s = void 0, u = void 0; i < o; ++i)
    if (s = n[i], !(s === "callee" || s === "caller")) {
      if (u = gr(e, s), !u) {
        t[s] = r.copier(e[s], r);
        continue;
      }
      !u.get && !u.set && (u.value = r.copier(u.value, r));
      try {
        mr(t, s, u);
      } catch {
        t[s] = u.value;
      }
    }
  return t;
}
function br(e, t) {
  var r = new t.Constructor();
  t.cache.set(e, r);
  for (var n = 0, i = e.length; n < i; ++n)
    r[n] = t.copier(e[n], t);
  return r;
}
function wr(e, t) {
  var r = new t.Constructor();
  return t.cache.set(e, r), be(e, r, t);
}
function dt(e, t) {
  return e.slice(0);
}
function _r(e, t) {
  return e.slice(0, e.size, e.type);
}
function $r(e, t) {
  return new t.Constructor(dt(e.buffer));
}
function Pr(e, t) {
  return new t.Constructor(e.getTime());
}
function pt(e, t) {
  var r = new t.Constructor();
  return t.cache.set(e, r), e.forEach(function(n, i) {
    r.set(i, t.copier(n, t));
  }), r;
}
function jr(e, t) {
  return be(e, pt(e, t), t);
}
function kr(e, t) {
  var r = Ne(t.prototype);
  t.cache.set(e, r);
  for (var n in e)
    lt.call(e, n) && (r[n] = t.copier(e[n], t));
  return r;
}
function Er(e, t) {
  var r = Ne(t.prototype);
  t.cache.set(e, r);
  for (var n in e)
    lt.call(e, n) && (r[n] = t.copier(e[n], t));
  for (var i = De(e), o = 0, s = i.length, u = void 0; o < s; ++o)
    u = i[o], Sr.call(e, u) && (r[u] = t.copier(e[u], t));
  return r;
}
var Ar = ft ? Er : kr;
function qr(e, t) {
  var r = Ne(t.prototype);
  return t.cache.set(e, r), be(e, r, t);
}
function Ee(e, t) {
  return new t.Constructor(e.valueOf());
}
function Cr(e, t) {
  var r = new t.Constructor(e.source, hr(e));
  return r.lastIndex = e.lastIndex, r;
}
function me(e, t) {
  return e;
}
function ht(e, t) {
  var r = new t.Constructor();
  return t.cache.set(e, r), e.forEach(function(n) {
    r.add(t.copier(n, t));
  }), r;
}
function Fr(e, t) {
  return be(e, ht(e, t), t);
}
var Tr = Array.isArray, Re = Object.assign, Lr = Object.getPrototypeOf || function(e) {
  return e.__proto__;
}, vt = {
  array: br,
  arrayBuffer: dt,
  blob: _r,
  dataView: $r,
  date: Pr,
  error: me,
  map: pt,
  object: Ar,
  regExp: Cr,
  set: ht
}, Br = Re({}, vt, {
  array: wr,
  map: jr,
  object: qr,
  set: Fr
});
function Mr(e) {
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
function yt(e) {
  var t = Re({}, vt, e), r = Mr(t), n = r.Array, i = r.Object;
  function o(s, u) {
    if (u.prototype = u.Constructor = void 0, !s || typeof s != "object")
      return s;
    if (u.cache.has(s))
      return u.cache.get(s);
    if (u.prototype = Lr(s), u.Constructor = u.prototype && u.prototype.constructor, !u.Constructor || u.Constructor === Object)
      return i(s, u);
    if (Tr(s))
      return n(s, u);
    var a = r[yr(s)];
    return a ? a(s, u) : typeof s.then == "function" ? s : i(s, u);
  }
  return function(u) {
    return o(u, {
      Constructor: void 0,
      cache: fr(),
      copier: o,
      prototype: void 0
    });
  };
}
function Nr(e) {
  return yt(Re({}, Br, e));
}
var Ze = Nr({}), te = yt({});
function de(e, t) {
  return Object.keys(t).forEach((r) => {
    Object.defineProperty(e, r, {
      enumerable: !1,
      configurable: !0,
      value: t[r]
    });
  }), e;
}
function mt(e, t) {
  return Object.keys(t).forEach((r) => {
    Object.defineProperty(e, r, {
      enumerable: !1,
      configurable: !0,
      get: t[r]
    });
  }), e;
}
function Ji(e, t) {
  return Object.keys(t).forEach((r) => {
    Object.defineProperty(e, r, {
      enumerable: !1,
      configurable: !0,
      set: t[r]
    });
  }), e;
}
function ie(e, t) {
  return t && (Array.isArray(t) ? t.map((r) => e.new(r)) : t && Array.isArray(t.data) ? (t.data = t.data.map((r) => e.new(r)), t) : e.new(t));
}
function Ae({ queryInfo: e, service: t, store: r, qid: n }) {
  const o = r.pagination[n.value][e.queryId];
  if (!o)
    return null;
  const { total: s } = o, u = o[e.pageId];
  if (!u)
    return null;
  const { ids: a, queriedAt: c, ssr: l } = u, d = a.map((S) => r.itemsById[S]).filter((S) => S), g = ie(t, d);
  return { ...e, ids: a, items: g, total: s, queriedAt: c, queryState: o, ssr: l } || null;
}
function z(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Z(e) {
  const t = Array.isArray(e);
  return { items: t ? e : [e], isArray: t };
}
function Ce(e, t) {
  if (!t)
    return e;
  const n = (typeof t == "string" ? [t] : Array.isArray(t) ? t : Object.keys(t || e)).map((i) => i.toString().split(".")[0]);
  return se.pick(e, ...n);
}
function gt(e, t, r) {
  const n = Ce(e, r), i = Ce(t, r);
  return typeof r != "string" && !Array.isArray(r) && Object.assign(i, r), Xe(n, i) ? {} : Object.keys(i).reduce((u, a) => (Xe(e[a], i[a]) || (u[a] = i[a]), u), {});
}
function Dr(e, t, r = "__tempId") {
  const { items: n, isArray: i } = Z(e), { items: o } = Z(t);
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
function ne(e) {
  return e ? te(F(e)) : {};
}
function ce(e) {
  return new Promise((t) => setTimeout(t, e));
}
function et() {
  const e = j(0);
  return { count: e, add: () => {
    e.value = e.value + 1;
  }, sub: () => {
    e.value = e.value === 0 ? 0 : e.value - 1;
  } };
}
const Rr = (e) => e !== null && typeof e == "object", Qr = Array.isArray;
function St(e) {
  return e !== null && !K(e) && typeof e == "object" ? R(e) : F(e);
}
const Wr = (e) => e.map(St);
function Gr(e) {
  const t = {};
  return Object.keys(e).forEach((r) => {
    t[r] = St(e[r]);
  }), t;
}
function R(e) {
  const t = K(e) ? F(e) : e;
  return Rr(t) ? Qr(t) ? Wr(t) : Gr(t) : t;
}
function Ki(e, t) {
  const r = Object.keys(t), n = se.omit(e, ...r);
  return Object.assign(t, te(n));
}
function Ur(e, t) {
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
function Vr(e, t) {
  Object.keys(t).forEach((r) => Ot(e, r, t[r]));
}
const xr = [
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
function tt(e) {
  return typeof e == "function" ? e() : F(e);
}
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const rt = () => {
};
function Jr(e, t) {
  function r(...n) {
    return new Promise((i, o) => {
      Promise.resolve(e(() => t.apply(this, n), { fn: t, thisArg: this, args: n })).then(i).catch(o);
    });
  }
  return r;
}
function Kr(e, t = {}) {
  let r, n, i = rt;
  const o = (u) => {
    clearTimeout(u), i(), i = rt;
  };
  return (u) => {
    const a = tt(e), c = tt(t.maxWait);
    return r && o(r), a <= 0 || c !== void 0 && c <= 0 ? (n && (o(n), n = null), Promise.resolve(u())) : new Promise((l, d) => {
      i = t.rejectOnCancel ? d : l, c && !n && (n = setTimeout(() => {
        r && o(r), n = null, l(u());
      }, c)), r = setTimeout(() => {
        n && o(n), n = null, l(u());
      }, a);
    });
  };
}
function zr(e, t = 200, r = {}) {
  return Jr(
    Kr(t, r),
    e
  );
}
var Hr = function(e, t) {
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
        var d = l[u], g = o(s[d]);
        g && (a && (a += ","), a += JSON.stringify(d) + ":" + g);
      }
      return i.splice(c, 1), "{" + a + "}";
    }
  }(e);
};
const Se = /* @__PURE__ */ Ie(Hr);
function Yr(e, t) {
  const { queryId: r, pageId: n } = t, i = e[r], o = i && i[n];
  return o && o.ids || [];
}
function Xr(e, t, r) {
  const n = r.qid || "default", i = e.pagination[n] || {}, o = e.getQueryInfo(r);
  return Yr(i, o).map((a) => t.getFromStore(a).value).filter((a) => a);
}
function Zr(e) {
  const { limit: t, skip: r, total: n, request: i } = e, o = y(() => n.value ? Math.ceil(n.value / t.value) : 1), s = y({
    set(v) {
      v < 1 ? v = 1 : v > o.value && (v = o.value);
      const $ = t.value * Math.floor(v - 1);
      r.value = $;
    },
    get() {
      const v = r.value || 0;
      return o.value === 0 ? 0 : Math.floor(v / t.value + 1);
    }
  }), u = y(() => s.value - 1 > 0), a = y(() => s.value < o.value), c = async () => {
    i != null && i.value && await i.value;
  };
  return { pageCount: o, currentPage: s, canPrev: u, canNext: a, toStart: async () => (s.value = 1, await ce(0), c()), toEnd: async () => (s.value = o.value, await ce(0), c()), toPage: async (v) => (s.value = v, await ce(0), c()), next: async () => (s.value++, await ce(0), c()), prev: async () => (s.value--, await ce(0), c()) };
}
function en(e, t = {}, r) {
  var Je, Ke, ze, He;
  const { pagination: n, debounce: i = 100, immediate: o = !0, watch: s = !0, paginateOn: u = "client" } = t, { service: a } = r, { store: c } = a, l = y(() => {
    var k;
    return ((k = e.value) == null ? void 0 : k.qid) || "default";
  }), d = (n == null ? void 0 : n.limit) || j(((Ke = (Je = e.value) == null ? void 0 : Je.query) == null ? void 0 : Ke.$limit) || c.defaultLimit), g = (n == null ? void 0 : n.skip) || j(((He = (ze = e.value) == null ? void 0 : ze.query) == null ? void 0 : He.$skip) || 0), f = y(() => {
    var T;
    const k = R(((T = e.value) == null ? void 0 : T.query) || {});
    return {
      ...e.value,
      query: {
        ...k,
        $limit: d.value,
        $skip: g.value
      }
    };
  }), S = y(() => {
    var re;
    const k = R(((re = e.value) == null ? void 0 : re.query) || {}), T = se.omit(k, "$limit", "$skip");
    return { ...e.value, query: T };
  }), v = j(!1), $ = j(!1), O = j(!1), h = j(null), _ = () => h.value = null, m = j(R(e.value || {}));
  function I() {
    Se(m.value) !== Se(f.value) && (m.value = f.value);
  }
  let p = () => !0;
  const b = (k) => {
    p = k;
  }, w = y(() => {
    if (!c.pagination[l.value])
      return null;
    const T = c.getQueryInfo(m.value);
    return Ae({ queryInfo: T, service: a, store: c, qid: l });
  }), P = y(() => {
    if (!c.pagination[l.value])
      return null;
    const T = c.getQueryInfo(f.value);
    return Ae({ queryInfo: T, service: a, store: c, qid: l });
  }), E = y(() => (v.value ? w.value : P.value) == null && u !== "client" ? [] : a.findInStore(R(S.value)).data), q = y(() => {
    const k = v.value ? w.value : P.value;
    if (k == null)
      return [];
    const T = E.value, Q = k.items.find((Pe) => Pe), re = T.findIndex((Pe) => Pe[c.idField] === Q[c.idField]), ve = Math.min(re, g.value);
    return T.slice(0, ve);
  }), N = y(() => {
    const k = q.value, T = g.value + (k.length - g.value);
    return {
      ...f.value,
      query: {
        ...f.value.query,
        $limit: d.value,
        $skip: T
      }
    };
  }), C = y(() => u === "server" ? Xr(c, a, m.value) : u === "hybrid" ? a.findInStore(R(N)).data.filter((T) => T) : a.findInStore(R(f)).data.filter((T) => T)), M = j([]), A = y(() => M.value[M.value.length - 1] || null), L = y(() => M.value[M.value.length - 2] || null), J = j(0), Y = j(null);
  function pe() {
    var k;
    (k = P.value) != null && k.ssr || ($.value || ($.value = !0), _(), v.value || (v.value = !0), O.value && (O.value = !1));
  }
  async function $e(k) {
    const T = F(
      k ?? (u === "client" ? S.value : f.value)
    );
    if (!p())
      return Promise.resolve({ data: [] });
    pe(), J.value++;
    try {
      const Q = await a.find(T);
      if (Q.total) {
        const re = c.getQueryInfo(f.value), ve = Ae({ queryInfo: re, service: a, store: c, qid: l });
        ve && M.value.push(ve), M.value.length > 2 && M.value.shift();
      }
      return O.value = !0, Q;
    } catch (Q) {
      throw h.value = Q, Q;
    } finally {
      v.value = !1;
    }
  }
  const xe = zr($e, i), D = async (k) => {
    e.value !== null && (P.value && I(), p() && pe(), Y.value = xe(k), await Y.value, I());
  }, X = y(() => {
    if (["server", "hybrid"].includes(u)) {
      const k = P.value || w.value;
      return (k == null ? void 0 : k.total) || 0;
    } else
      return a.countInStore(S.value).value;
  }), he = Zr({ limit: d, skip: g, total: X, request: Y }), { pageCount: Mt, currentPage: Nt, canPrev: Dt, canNext: Rt, toStart: Qt, toEnd: Wt, toPage: Gt, next: Ut, prev: Vt } = he;
  return ["server", "hybrid"].includes(u) && s && (Oe(
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
  })), ee({
    paramsWithPagination: f,
    isSsr: y(() => (setTimeout(() => {
      j(X.value);
    }, 0), c.isSsr)),
    // ComputedRef<boolean>
    qid: l,
    // WritableComputedRef<string>
    // Data
    data: C,
    // ComputedRef<M[]>
    allLocalData: E,
    // ComputedRef<M[]>
    total: X,
    // ComputedRef<number>
    limit: d,
    // Ref<number>
    skip: g,
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
    queryWhen: b,
    // (queryWhenFn: () => boolean) => void
    // Request State
    isPending: y(() => v.value),
    // ComputedRef<boolean>
    haveBeenRequested: y(() => $.value),
    // ComputedRef<boolean>
    haveLoaded: y(() => O.value),
    // ComputedRef<boolean>
    error: y(() => h.value),
    // ComputedRef<any>
    clearError: _,
    // () => void
    // Pagination Utils
    pageCount: Mt,
    // Ref<number>
    currentPage: Nt,
    // Ref<number>
    canPrev: Dt,
    // ComputedRef<boolean>
    canNext: Rt,
    // ComputedRef<boolean>
    next: Ut,
    // () => Promise<void>
    prev: Vt,
    // () => Promise<void>
    toStart: Qt,
    // () => Promise<void>
    toEnd: Wt,
    // () => Promise<void>
    toPage: Gt
    // (page: number) => Promise<void>
  });
}
function tn(e, t = j({}), r) {
  const { service: n } = r, i = K(e) ? e : j(e), o = K(t) ? t : j(t), { immediate: s = !0, watch: u = !0 } = o.value, a = y(() => n.store.isSsr), c = j(!1), l = j(!1), d = j(null), g = () => d.value = null, f = j([]), S = y(() => f.value.length && f.value[f.value.length - 1]), v = y(() => c.value && S.value != null ? n.store.getFromStore(S.value, o).value : n.store.getFromStore(i.value, o).value), $ = n.store.getFromStore, O = y(() => !!v.value);
  let h = () => !0;
  const _ = (w) => {
    h = w;
  }, m = j(0), I = j(null);
  async function p() {
    const w = F(i), P = F(o);
    if (h()) {
      if (w == null)
        return null;
      m.value++, l.value = !0, c.value = !0, d.value = null;
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
  async function b() {
    return I.value = p(), await I.value;
  }
  return u && Oe(
    i,
    async () => {
      await b();
    },
    { immediate: s }
  ), ee({
    params: o,
    // Ref<GetClassParams>
    isSsr: a,
    // ComputedRef<boolean>
    // Data
    data: v,
    // ComputedRef<M | null>
    ids: f,
    // Ref<Id[]>
    getFromStore: $,
    // (id: Id | null, params: Params<Query>) => M | undefined
    // Requests & Watching
    get: b,
    // GetFn<M>
    request: I,
    // Ref<Promise<M | undefined>>
    requestCount: m,
    // Ref<number>
    queryWhen: _,
    // (queryWhenFn: () => boolean) => void
    // Request State
    isPending: y(() => c.value),
    // ComputedRef<boolean>
    hasBeenRequested: y(() => l.value),
    // ComputedRef<boolean>
    hasLoaded: y(() => O.value),
    // ComputedRef<boolean>
    error: y(() => d.value),
    // ComputedRef<any>
    clearError: g
    // () => void
  });
}
class rn {
  constructor(t, r) {
    je(this, "store");
    je(this, "servicePath", "");
    this.service = t, this.options = r, this.store = r.store, this.servicePath = r.servicePath;
    const n = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).concat(xr);
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
    return ee(r);
  }
  async find(t) {
    const r = ne(t);
    return await this.service.find(r);
  }
  async findOne(t) {
    const r = ne(t);
    r.query = r.query || {}, r.query.$limit = 1;
    const n = await this.service.find(r);
    return (n.data || n)[0] || null;
  }
  async count(t) {
    const r = ne(t);
    return r.query = r.query || {}, r.query.$limit = 0, await this.service.find(r);
  }
  async get(t, r) {
    const n = ne(r);
    return await this.service.get(t, n);
  }
  async create(t) {
    return await this.service.create(t);
  }
  async patch(t, r, n) {
    const i = ne(n);
    return await this.service.patch(t, r, i);
  }
  async remove(t, r) {
    const n = ne(r);
    return await this.service.remove(F(t), n);
  }
  findInStore(t) {
    const r = this.store.findInStore(t);
    return ee({
      ...r,
      data: y(() => r.data.map((n) => ie(this, n)))
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
    if (t == null && ((i = F(r)) != null && i.query))
      return this.store.removeByQuery(r);
  }
  /* hybrid methods */
  useFind(t, r) {
    const n = K(t) ? t : j(t);
    return en(n, r, { service: this });
  }
  useGet(t, r = j({})) {
    const n = K(t) ? t : j(t), i = K(r) ? r : j(r);
    return tn(n, i, { service: this });
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
var It = { exports: {} };
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
})(It);
var nn = It.exports, sn = nn;
const on = /* @__PURE__ */ Ie(sn);
function bt(e, t) {
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
    __tempId: e[r] == null && e.__tempId == null ? new on().toString() : e.__tempId || void 0,
    hasClone() {
      const d = this[this.__idField] || this.__tempId;
      return n[d] || null;
    },
    clone(d = {}, g = {}) {
      return i(this, d, g);
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
var Fe = function(e, t) {
  return Fe = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var i in n)
      Object.prototype.hasOwnProperty.call(n, i) && (r[i] = n[i]);
  }, Fe(e, t);
};
function B(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Fe(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
var Qe = function(e) {
  var t = "[object " + e + "]";
  return function(r) {
    return un(r) === t;
  };
}, un = function(e) {
  return Object.prototype.toString.call(e);
}, oe = function(e) {
  return e instanceof Date ? e.getTime() : ue(e) ? e.map(oe) : e && typeof e.toJSON == "function" ? e.toJSON() : e;
}, an = function(e) {
  return e ?? null;
}, ue = Qe("Array"), cn = Qe("Object"), ln = Qe("Function"), fn = function(e) {
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
  } else if (cn(e)) {
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
), wt = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, n, i, o, s) {
      var u = e.call(this, r, n, i, o) || this;
      return u.name = s, u;
    }
    return t;
  }(We)
), dn = (
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
}, pn = function(e) {
  return function(t, r, n, i) {
    return e(t, r, n, i);
  };
}, _e = function(e) {
  return pn(function(t, r, n, i) {
    var o = typeof oe(t), s = e(t);
    return new x(function(u) {
      var a = an(u);
      return typeof oe(a) === o && s(a);
    }, r, n, i);
  });
}, hn = function(e, t, r, n) {
  var i = n.operations[e];
  return i || _t(e), i(t, r, n, e);
}, _t = function(e) {
  throw new Error("Unsupported operation: " + e);
}, $t = function(e, t) {
  for (var r in e)
    if (t.operations.hasOwnProperty(r) || r.charAt(0) === "$")
      return !0;
  return !1;
}, vn = function(e, t, r, n, i) {
  if ($t(t, i)) {
    var o = Pt(t, r, i), s = o[0], u = o[1];
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
  }, u = Pt(e, null, s), a = u[0], c = u[1], l = [];
  return a.length && l.push(new Be([], e, t, s, a)), l.push.apply(l, c), l.length === 1 ? l[0] : new dn(e, t, s, l);
}, Pt = function(e, t, r) {
  var n = [], i = [];
  if (!fn(e))
    return n.push(new x(e, e, r)), [n, i];
  for (var o in e)
    if (r.operations.hasOwnProperty(o)) {
      var s = hn(o, e[o], e, r);
      if (s && !s.propop && t && !r.operations[t])
        throw new Error("Malformed query. " + o + " cannot be matched against property.");
      s != null && n.push(s);
    } else
      o.charAt(0) === "$" ? _t(o) : i.push(vn(o.split("."), e[o], o, e, r));
  return [n, i];
}, yn = function(e) {
  return function(t, r, n) {
    return e.reset(), e.next(t, r, n), e.keep;
  };
}, mn = (
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
), gn = (
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
), Sn = (
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
), jt = (
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
), kt = function(e) {
  if (e.length === 0)
    throw new Error("$and/$or/$nor must be a nonempty array");
}, Et = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !1, r;
    }
    return t.prototype.init = function() {
      var r = this;
      kt(this.params), this._ops = this.params.map(function(n) {
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
), On = (
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
  }(Et)
), At = (
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
        if ($t(n, r.options))
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
), In = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, n, i, o) {
      var s = e.call(this, r, n, i, o) || this;
      return s.propop = !0, s._in = new At(r, n, i, o), s;
    }
    return t.prototype.next = function(r, n, i, o) {
      this._in.next(r, n, i), ue(i) && !o ? this._in.keep ? (this.keep = !1, this.done = !0) : n == i.length - 1 && (this.keep = !0, this.done = !0) : (this.keep = !this._in.keep, this.done = !0);
    }, t.prototype.reset = function() {
      e.prototype.reset.call(this), this._in.reset();
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
    return t.prototype.next = function(r, n, i) {
      i.hasOwnProperty(n) === this.params && (this.done = !0, this.keep = !0);
    }, t;
  }(U)
), wn = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, n, i, o) {
      var s = e.call(this, r, n, i, r.map(function(u) {
        return ae(u, n, i);
      }), o) || this;
      return s.propop = !1, kt(r), s;
    }
    return t.prototype.next = function(r, n, i, o) {
      this.childrenNext(r, n, i, o);
    }, t;
  }(wt)
), _n = (
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
  }(wt)
), $n = function(e, t, r) {
  return new x(e, t, r);
}, Pn = function(e, t, r, n) {
  return new mn(e, t, r, n);
}, jn = function(e, t, r, n) {
  return new Et(e, t, r, n);
}, kn = function(e, t, r, n) {
  return new On(e, t, r, n);
}, En = function(e, t, r, n) {
  return new gn(e, t, r, n);
}, An = function(e, t, r, n) {
  return new In(e, t, r, n);
}, qn = function(e, t, r, n) {
  return new At(e, t, r, n);
}, Cn = _e(function(e) {
  return function(t) {
    return t != null && t < e;
  };
}), Fn = _e(function(e) {
  return function(t) {
    return t === e || t <= e;
  };
}), Tn = _e(function(e) {
  return function(t) {
    return t != null && t > e;
  };
}), Ln = _e(function(e) {
  return function(t) {
    return t === e || t >= e;
  };
}), Bn = function(e, t, r) {
  var n = e[0], i = e[1];
  return new x(function(o) {
    return oe(o) % n === i;
  }, t, r);
}, Mn = function(e, t, r, n) {
  return new bn(e, t, r, n);
}, Nn = function(e, t, r) {
  return new x(new RegExp(e, t.$options), t, r);
}, Dn = function(e, t, r, n) {
  return new Sn(e, t, r, n);
}, nt = {
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
}, Rn = function(e, t, r) {
  return new x(function(n) {
    if (typeof e == "string") {
      if (!nt[e])
        throw new Error("Type alias does not exist");
      return nt[e](n);
    }
    return n != null ? n instanceof e || n.constructor === e : !1;
  }, t, r);
}, Qn = function(e, t, r, n) {
  return new wn(e, t, r, n);
}, Wn = function(e, t, r, n) {
  return new _n(e, t, r, n);
}, Gn = function(e, t, r) {
  return new jt(e, t, r, "$size");
}, Un = function() {
  return null;
}, Vn = function(e, t, r) {
  var n;
  if (ln(e))
    n = e;
  else if (!process.env.CSP_ENABLED)
    n = new Function("obj", "return " + e);
  else
    throw new Error('In CSP mode, sift does not support strings in "$where" condition');
  return new x(function(i) {
    return n.bind(i)(i);
  }, t, r);
}, xn = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  $Size: jt,
  $eq: $n,
  $ne: Pn,
  $or: jn,
  $nor: kn,
  $elemMatch: En,
  $nin: An,
  $in: qn,
  $lt: Cn,
  $lte: Fn,
  $gt: Tn,
  $gte: Ln,
  $mod: Bn,
  $exists: Mn,
  $regex: Nn,
  $not: Dn,
  $type: Rn,
  $and: Qn,
  $all: Wn,
  $size: Gn,
  $options: Un,
  $where: Vn
}), Jn = function(e, t, r) {
  var n = r === void 0 ? {} : r, i = n.compare, o = n.operations;
  return ae(e, t, {
    compare: i,
    operations: Object.assign({}, xn, o || {})
  });
}, Kn = function(e, t) {
  t === void 0 && (t = {});
  var r = Jn(e, null, t);
  return yn(r);
};
function Ue(e, t, r = "g") {
  const n = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\"];
  return t = t.replace(new RegExp(`(\\${n.join("|\\")})`, r), "\\$1"), t = t.replace(/%/g, ".*").replace(/_/g, "."), RegExp(`^${t}$`, r).test(e);
}
function qt(e, t) {
  return Ue(e, t, "ig");
}
function zn(e, t, r) {
  return we((n) => Ue(n, e), t, r);
}
function it(e, t, r) {
  return we((n) => !Ue(n, e), t, r);
}
function st(e, t, r) {
  return we((n) => qt(n, e), t, r);
}
function Hn(e, t, r) {
  return we((n) => !qt(n, e), t, r);
}
const Yn = {
  $like: zn,
  $notLike: it,
  $notlike: it,
  $ilike: st,
  $iLike: st,
  $notILike: Hn
}, Xn = ["$sort", "$limit", "$skip", "$select"], Zn = [
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
  } = e, c = Object.assign({}, Yn, a), l = y(() => Zn.concat(u || []).concat(Object.keys(c))), d = (m, I = []) => {
    m = { ...F(m) };
    const p = s, b = se.omit(m.query || {}, ...p), { query: w, filters: P } = Yt(b, {
      operators: l.value
    });
    let E = I.concat(r.list.value);
    return n && m.temps && E.push(...n.list.value), P.$or && (w.$or = P.$or), P.$and && (w.$and = P.$and), E = E.filter(Kn(w, { operations: c })), { values: E, filters: P };
  };
  function g(m) {
    const I = y(() => {
      const p = F(m);
      p.query && (p.query = R(p.query));
      const b = d(p), w = b.filters;
      let P = b.values;
      const E = P.length;
      return w.$sort && P.sort(Ht(w.$sort)), w.$skip && (P = P.slice(w.$skip)), typeof w.$limit < "u" && (P = P.slice(0, w.$limit)), {
        total: E,
        limit: w.$limit || 0,
        skip: w.$skip || 0,
        data: p.clones ? P.map((q) => q.clone ? q.clone(void 0, { useExisting: !0 }) : q) : P
      };
    });
    return ee({
      total: y(() => I.value.total),
      limit: y(() => I.value.limit),
      skip: y(() => I.value.skip),
      data: y(() => I.value.data)
    });
  }
  function f(m) {
    const I = g(m);
    return y(() => I.data[0] || null);
  }
  function S(m) {
    return y(() => {
      if (m = { ...F(m) }, !m.query)
        throw new Error("params must contain a query object");
      return m.query = se.omit(m.query, ...Xn), g(m).total;
    });
  }
  const v = (m, I) => y(() => {
    const p = F(m);
    I = te(F(I) || {}), I.query && (I.query = R(I.query));
    let b = null;
    const w = r.getItem(p) && Ye(I, t)(r.getItem(p)), P = n && n.getItem(p) && Ye(I, "__tempId")(n.getItem(p));
    return w ? b = w : P && (b = P), I.clones && b.clone ? b.clone(void 0, { useExisting: !0 }) : b || null;
  });
  function $(m) {
    const { items: I, isArray: p } = Z(F(m)), b = I.map((w) => o(F(w)));
    return p ? b : b[0];
  }
  function O(m, I = {}, p = {}) {
    const b = F(m), w = F(I), P = F(p);
    function E(q) {
      return q.map((C) => {
        if (C = F(C), (typeof C == "number" || typeof C == "string") && (C = v(C).value), C == null)
          return null;
        const M = { ...C, ...w };
        return o(M);
      }).filter((C) => C);
    }
    if (b === null) {
      if (P != null && P.query && !Object.keys(P == null ? void 0 : P.query).length)
        throw new Error(
          'cannot perform multiple patchInStore with an empty query. You must explicitly provide a query. To patch all items, try using a query that matches all items, like "{ id: { $exists: true } }"'
        );
      const q = g(P).data;
      return E(q);
    } else {
      const { items: q, isArray: N } = Z(b), C = E(q);
      return N ? C : C[0];
    }
  }
  function h(m, I) {
    if (m === null && (I != null && I.query) && Object.keys(I == null ? void 0 : I.query).length) {
      const p = i ? i.list.value : [], { values: b } = d(I, p);
      return _(b);
    } else
      m !== null && _(m);
    return m;
  }
  function _(m) {
    const { items: I } = Z(m);
    return I.forEach((p) => {
      if (typeof p == "string")
        r.removeItem(p), n == null || n.removeItem(p), i == null || i.removeItem(p);
      else {
        if (p.__isClone)
          return i == null ? void 0 : i.remove(p);
        if (p.__isTemp)
          return n == null ? void 0 : n.remove(p);
        r.remove(p), n == null || n.remove(p), i == null || i.remove(p);
      }
    }), m;
  }
  return {
    findInStore: g,
    findOneInStore: f,
    countInStore: S,
    getFromStore: v,
    createInStore: $,
    patchInStore: O,
    removeFromStore: h
  };
}
function Ve({
  getId: e,
  onRead: t = (i) => i,
  beforeWrite: r = (i) => i,
  assign: n = (i, o) => Object.assign(i, o)
}) {
  const i = ee({}), o = y(() => Object.values(i)), s = y(() => Object.keys(i)), u = (h) => !!i[h], a = (h) => {
    const _ = e(h);
    return u(_);
  }, c = (h) => {
    const _ = i[h];
    return _ ? t(_) : null;
  }, l = (h, _) => {
    if (h == null)
      throw new Error("item has no id");
    return W(i, h, r(_)), c(h);
  }, d = (h) => {
    const _ = e(h);
    return l(_, h);
  }, g = (h) => {
    const _ = e(h), m = c(_);
    return m ? n(m, h) : l(_, h), c(_);
  }, f = (h) => {
    const _ = e(h);
    return c(_);
  }, S = (h) => {
    const _ = u(h);
    return _ && G(i, h), _;
  };
  return { byId: i, list: o, ids: s, getId: e, clear: () => {
    Object.keys(i).forEach((h) => {
      G(i, h);
    });
  }, has: a, hasItem: u, get: f, getItem: c, set: d, setItem: l, remove: (h) => {
    const _ = e(h);
    return S(_);
  }, removeItem: S, getKeys: () => s.value, merge: g };
}
function ei(e) {
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
function ti(e) {
  const { itemStorage: t, tempStorage: r, onRead: n, beforeWrite: i } = e, o = (f, S = {}, { isClone: v }) => te(Object.assign({}, f, S, { __isClone: v })), s = e.makeCopy || o, u = Ve({
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
  function c(f, S = {}, v = {}) {
    const $ = u.get(f);
    return a(f), $ && v.useExisting ? $ : d(f, S);
  }
  function l(f, S = {}) {
    const v = t.getId(f), $ = s(f, S, { isClone: !1 });
    return v ? (t.merge($), t.get($)) : (r.merge($), r.get($));
  }
  function d(f, S = {}) {
    const v = a(f);
    if (u.get(f)) {
      const O = s(v, S, { isClone: !0 });
      Object.keys(v).forEach((h) => {
        v[h] == null && G(O, h);
      }), u.merge(O);
    } else {
      const O = s(f, S, { isClone: !0 });
      u.set(O);
    }
    return u.get(f);
  }
  function g(f) {
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
    markAsClone: g
  };
}
function Ft(e) {
  const { getIdField: t, setupInstance: r } = e, n = (f, S = {}, { isClone: v }) => {
    const $ = te(f);
    return Object.assign($, S), Object.defineProperty($, "__isTemp", {
      configurable: !0,
      enumerable: !1,
      get() {
        return this[this.__idField] == null;
      }
    }), de($, {
      __isClone: v,
      __tempId: f.__tempId
    });
  }, i = Ve({
    getId: t,
    beforeWrite: r,
    onRead: r
  }), { tempStorage: o, moveTempToItems: s } = ei({
    getId: (f) => f.__tempId,
    itemStorage: i,
    beforeWrite: r,
    onRead: r
  }), { cloneStorage: u, clone: a, commit: c, reset: l, markAsClone: d } = ti({
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
function ri() {
  return {
    skipGetIfExists: !1
  };
}
function zi(e) {
  const t = Object.assign({}, ri(), e), { idField: r, customSiftOperators: n } = t, { itemStorage: i, tempStorage: o, cloneStorage: s, clone: u, commit: a, reset: c, addItemToStorage: l } = Ft({
    getIdField: (p) => p[r],
    setupInstance: h
  }), { findInStore: d, findOneInStore: g, countInStore: f, getFromStore: S, createInStore: v, patchInStore: $, removeFromStore: O } = Ct({
    idField: r,
    itemStorage: i,
    tempStorage: o,
    cloneStorage: s,
    addItemToStorage: l,
    customSiftOperators: n
  });
  function h(p) {
    const b = bt(p, {
      idField: r,
      clonesById: s.byId,
      clone: u,
      commit: a,
      reset: c,
      createInStore: v,
      removeFromStore: O
    });
    if (p.__isSetup)
      return b;
    {
      const w = t.setupInstance ? t.setupInstance(b) : b;
      return Object.defineProperty(w, "__isSetup", { value: !0 }), w;
    }
  }
  const _ = y(() => !!F(t.ssr));
  function m() {
    i.clear(), o.clear(), s.clear();
  }
  return {
    new: h,
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
    findOneInStore: g,
    countInStore: f,
    createInStore: v,
    getFromStore: S,
    patchInStore: $,
    removeFromStore: O,
    clearAll: m
  };
}
var Tt = {}, H = {};
Object.defineProperty(H, "__esModule", { value: !0 });
H.createDebug = H.setDebug = H.noopDebug = void 0;
const fe = {};
function Lt() {
  return function() {
  };
}
H.noopDebug = Lt;
let Bt = Lt;
function ni(e) {
  Bt = e, Object.keys(fe).forEach((t) => {
    fe[t] = e(t);
  });
}
H.setDebug = ni;
function ii(e) {
  return fe[e] || (fe[e] = Bt(e)), (...t) => fe[e](...t);
}
H.createDebug = ii;
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
})(Tt);
function si(e) {
  const { idField: t, isSsr: r } = e, n = e.defaultLimit || 10, i = j({});
  function o() {
    const { defaultLimit: c, defaultSkip: l } = i.value;
    i.value = { defaultLimit: c, defaultSkip: l };
  }
  function s({
    qid: c,
    response: l,
    query: d = {},
    preserveSsr: g = !1
  }) {
    var N, C;
    const { data: f, total: S } = l, v = f.map((M) => ge(M, t)), $ = (/* @__PURE__ */ new Date()).getTime(), { queryId: O, queryParams: h, pageId: _, pageParams: m } = a({ qid: c, query: d });
    i.value[c] || W(i.value, c, {}), !z(d, "$limit") && z(l, "limit") && W(i.value, "defaultLimit", l.limit), !z(d, "$skip") && z(l, "skip") && W(i.value, "defaultSkip", l.skip);
    const I = {
      query: d,
      queryId: O,
      queryParams: h,
      pageId: _,
      pageParams: m,
      queriedAt: $,
      total: S
    }, p = (C = (N = i.value[c]) == null ? void 0 : N[O]) == null ? void 0 : C[_], b = i.value[c] || {};
    Object.assign(b, { mostRecent: I }), W(b, O, b[O] || {});
    const w = {
      total: S,
      queryParams: h
    };
    W(b, O, Object.assign({}, b[O], w));
    const P = g ? p == null ? void 0 : p.ssr : r.value, E = {
      [_]: { pageParams: m, ids: v, queriedAt: $, ssr: !!P }
    };
    Object.assign(b[O], E);
    const q = Object.assign({}, i.value[c], b);
    W(i.value, c, q);
  }
  function u(c) {
    var v, $;
    const l = a(c), { qid: d, queryId: g, pageId: f } = l, S = ($ = (v = i.value[d]) == null ? void 0 : v[g]) == null ? void 0 : $[f];
    S.ssr = !1;
  }
  function a(c) {
    const l = R(c), { query: d = {} } = l, g = l.qid || "default", f = (d == null ? void 0 : d.$limit) || n, S = (d == null ? void 0 : d.$skip) || 0, v = f !== void 0 ? { $limit: f, $skip: S } : void 0, $ = v ? Se(v) : void 0, O = Tt._.omit(d, "$limit", "$skip"), h = Se(O);
    return {
      qid: g,
      query: d,
      queryId: h,
      queryParams: O,
      pageParams: v,
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
function ot() {
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
function oi() {
  const e = j(ot()), t = j({}), r = j({}), n = j({}), i = j({}), o = y(() => e.value.find > 0), s = y(() => e.value.count > 0), u = y(() => e.value.get > 0), a = y(() => e.value.create > 0 || Object.keys(t.value).length > 0), c = y(() => e.value.update > 0 || Object.keys(r.value).length > 0), l = y(() => e.value.patch > 0 || Object.keys(n.value).length > 0), d = y(() => e.value.remove > 0 || Object.keys(i.value).length > 0);
  function g($, O) {
    O ? e.value[$]++ : e.value[$]--;
  }
  function f($, O, h) {
    if ($ == null)
      return;
    let _;
    O === "create" ? _ = t.value : O === "update" ? _ = r.value : O === "patch" ? _ = n.value : O === "remove" && (_ = i.value), h ? W(_, $, !0) : G(_, $);
  }
  function S(...$) {
    $.forEach((O) => {
      O != null && (G(t.value, O), G(r.value, O), G(n.value, O), G(i.value, O));
    });
  }
  function v() {
    e.value = ot(), t.value = {}, r.value = {}, n.value = {}, i.value = {};
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
    setPending: g,
    setPendingById: f,
    unsetPendingById: S,
    clearAllPending: v
  };
}
function ui() {
  const e = ee({
    created: {},
    patched: {},
    updated: {},
    removed: {}
  });
  function t(n, i) {
    const { items: o } = Z(n);
    o.forEach((s) => {
      e[i][s] ? r(n, i) : (W(e[i], s, !0), setTimeout(() => {
        r(n, i);
      }, 250));
    });
  }
  function r(n, i) {
    const { items: o } = Z(n);
    o.forEach((s) => {
      G(e[i], s);
    });
  }
  return { eventLocks: e, toggleEventLock: t, clearEventLock: r };
}
function ai() {
  const e = Xt({});
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
function ci() {
  return {
    skipGetIfExists: !1
  };
}
function li(e) {
  const t = Object.assign({}, ci(), e), { idField: r, servicePath: n, whitelist: i, paramsForServer: o, defaultLimit: s, customSiftOperators: u } = t, { itemStorage: a, tempStorage: c, cloneStorage: l, clone: d, commit: g, reset: f, addItemToStorage: S } = Ft({
    getIdField: (D) => D[r],
    setupInstance: p
  }), { findInStore: v, findOneInStore: $, countInStore: O, getFromStore: h, createInStore: _, patchInStore: m, removeFromStore: I } = Ct({
    idField: r,
    itemStorage: a,
    tempStorage: c,
    cloneStorage: l,
    addItemToStorage: S,
    whitelist: i,
    paramsForServer: o,
    customSiftOperators: u
  });
  function p(D) {
    const X = bt(D, {
      idField: r,
      clonesById: l.byId,
      clone: d,
      commit: g,
      reset: f,
      createInStore: _,
      removeFromStore: I
    });
    if (D.__isSetup)
      return X;
    {
      const he = t.setupInstance ? t.setupInstance(X) : X;
      return Object.defineProperty(he, "__isSetup", { value: !0 }), he;
    }
  }
  const b = oi(), w = y(() => !!F(t.ssr)), { pagination: P, clearPagination: E, updatePaginationForQuery: q, getQueryInfo: N, unflagSsr: C } = si({
    idField: r,
    isSsr: w,
    defaultLimit: s
  }), { resultsByQid: M, getQid: A, setQid: L, clearQid: J, clearAllQids: Y } = ai();
  function pe() {
    a.clear(), c.clear(), l.clear(), E(), b.clearAllPending(), Y();
  }
  const $e = ui();
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
    commit: g,
    reset: f,
    // local queries
    findInStore: v,
    findOneInStore: $,
    countInStore: O,
    createInStore: _,
    getFromStore: h,
    patchInStore: m,
    removeFromStore: I,
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
    unflagSsr: C,
    getQueryInfo: N,
    ...b,
    ...$e
  };
}
const V = {};
function fi(e) {
  return `is${e.slice(0, 1).toUpperCase()}${e.slice(1, e.length - 1)}Pending`;
}
function di(e) {
  return {
    promise: null,
    isResolved: !1,
    getter: fi(e)
  };
}
function Hi(e, t) {
  return V[t] = V[t] || di(t), (!V[t].promise || V[t].isResolved) && (V[t].promise = new Promise((r) => {
    const n = Oe(
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
var pi = hi;
function hi(e, t, r, n) {
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
const Me = /* @__PURE__ */ Ie(pi);
function vi(e) {
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
    const g = ge(l, t.store.idField);
    if (c !== "created" && t.store.eventLocks[c][g]) {
      t.store.toggleEventLock(g, c);
      return;
    }
    d && !d(l, { service: t }) || (e.debounceEventsTime ? c === "removed" ? u(l) : o(l) : c === "removed" ? t.store.removeFromStore(l) : t.store.createInStore(l));
  }
  t.on("created", (c) => {
    const l = ie(t, c);
    a("created", l);
  }), t.on("updated", (c) => {
    const l = ie(t, c);
    a("updated", l);
  }), t.on("patched", (c) => {
    const l = ie(t, c);
    a("patched", l);
  }), t.on("removed", (c) => {
    const l = ie(t, c);
    a("removed", l);
  });
}
function yi() {
  return async (e, t) => {
    if (e.params.value && (e.params = R(e.params)), e.params.query && (e.params.query = R(e.params.query)), e.method === "find") {
      const r = e.params.query || {};
      r.$limit == null && (r.$limit = e.service.store.defaultLimit), r.$skip == null && (r.$skip = 0), e.params.query = r;
    }
    t && await t();
  };
}
function mi() {
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
function gi() {
  return async (e, t) => {
    const { id: r, method: n } = e, i = e.service.store, o = ["update", "patch", "remove"].includes(n), u = {
      update: "updated",
      patch: "patched",
      remove: "removed"
    }[n];
    o && r && !i.isSsr && i.toggleEventLock(r, u), await t(), o && r && !i.isSsr && i.clearEventLock(r, u);
  };
}
function Si() {
  return async (e, t) => {
    const { method: r, params: n } = e, i = e.service.store;
    if (r === "patch" && n.data && (e.data = n.data), t && await t(), !e.params.skipStore) {
      if (r === "remove")
        i.removeFromStore(e.result);
      else if (r === "create") {
        const o = Dr(e.data, e.result);
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
function Oi() {
  return async (e, t) => {
    var r;
    t && await t(), e.service.new && (Array.isArray((r = e.result) == null ? void 0 : r.data) ? e.result.data = e.result.data.map((n) => e.service.new(n)) : Array.isArray(e.result) ? e.result = e.result.map((n) => e.service.new(n)) : e.result = e.service.new(e.result));
  };
}
function Ii() {
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
function bi() {
  return async (e, t) => {
    if (e.method === "find") {
      const { params: r } = e, { query: n = {} } = r;
      (r.paginate === !0 || z(n, "$limit") || z(n, "$skip")) && (r.paginate = { default: !0 });
    }
    t && await t();
  };
}
function wi() {
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
function _i() {
  return async (e, t) => {
    const { method: r, data: n, params: i, id: o } = e, s = e.service.store;
    let u, a;
    const c = r === "patch" && !i.data && (n.__isClone || i.diff);
    if (c) {
      a = n;
      const l = s.getFromStore(o).value, d = gt(l, a, i.diff);
      if (u = te(l), i.eager !== !1 && n.commit(d), i.with) {
        const g = Ce(a, i.with);
        typeof i.with != "string" && !Array.isArray(i.with) && Object.assign(g, i.with), Object.assign(d, g);
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
function $i() {
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
function Pi() {
  return [
    yi(),
    mi(),
    gi(),
    Si(),
    Oi(),
    Ii(),
    bi(),
    wi(),
    _i(),
    $i()
  ];
}
function ji(e, t) {
  if (e.__isServiceInstance)
    return e;
  const { service: r, store: n } = t, i = (o, s) => Object.assign(o, s);
  return mt(e, {
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
        throw new nr("the item has no id");
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
function ki(e, t) {
  const r = {};
  Object.keys(t).forEach((n) => {
    const i = e[n], o = t[n], s = this.service(o);
    if (s || console.error(`there is no service at path ${o}. Check your storeAssociated config`, e, t), i && s) {
      const u = s.createInStore(i);
      r[n] = u;
    }
  }), de(e, r);
}
function Ei(e, t, r) {
  const n = JSON.stringify(t);
  r.setItem(e, n);
}
function Ai(e, t) {
  const r = t.getItem(e.$id);
  if (r) {
    const n = JSON.parse(r) || {};
    Object.assign(e, n);
  }
}
function qi(e, t, r = window.localStorage) {
  Ai(e, r);
  const n = Me(Ei, 500), i = y(() => se.pick(e, ...t));
  Oe(i, (o) => n(e.$id, o, r), { deep: !0 });
}
function Ci(e = window.localStorage) {
  const t = "service:";
  for (let r = 0; r < e.length; r++) {
    const n = e.key(r);
    n != null && n.startsWith(t) && e.removeItem(n);
  }
}
function Yi(e, t) {
  const r = Kt();
  r.defaultService = function(i) {
    var I;
    const o = ((I = t.services) == null ? void 0 : I[i]) || {}, s = o.idField || t.idField, u = o.defaultLimit || t.defaultLimit || 10, a = (o.whitelist || []).concat(t.whitelist || []), c = (o.paramsForServer || []).concat(t.paramsForServer || []), l = o.handleEvents || t.handleEvents, d = o.debounceEventsTime != null ? o.debounceEventsTime : t.debounceEventsTime, g = o.debounceEventsGuarantee != null ? o.debounceEventsGuarantee : t.debounceEventsGuarantee, f = Object.assign(
      {},
      o.customSiftOperators || {},
      t.customSiftOperators || {}
    );
    function S(p) {
      const b = Object.assign(p, t.customizeStore ? t.customizeStore(p) : p);
      return Object.assign(
        b,
        o.customizeStore ? o.customizeStore(b) : b
      );
    }
    function v(p) {
      const b = o.instanceServicePath || i, w = r.service(b), P = ji(p, {
        service: w,
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        store: h
      }), E = { app: r, service: w, servicePath: b }, q = t.setupInstance ? t.setupInstance(P, E) : P;
      return o.setupInstance ? o.setupInstance(q, E) : q;
    }
    const $ = o.storeName || `service:${i}`, O = t.pinia._s.get($);
    let h;
    if (O ? h = O : h = zt($, () => {
      const b = li({
        idField: s,
        servicePath: i,
        defaultLimit: u,
        whitelist: a,
        paramsForServer: c,
        customSiftOperators: f,
        ssr: t.ssr,
        setupInstance: v
      }), w = S(b);
      return { ...b, ...w };
    })(t.pinia), !t.ssr && t.storage) {
      const p = ["itemsById", "pagination"], b = t.syncWithStorage === !0 ? p : Array.isArray(t.syncWithStorage) ? t.syncWithStorage : [], w = o.syncWithStorage === !0 ? p : Array.isArray(o.syncWithStorage) ? o.syncWithStorage : [], P = [.../* @__PURE__ */ new Set([...b, ...w])];
      P.length > 0 && qi(h, P, t.storage);
    }
    const _ = e.service(i), m = new rn(_, { store: h, servicePath: i });
    return vi({
      service: m,
      debounceEventsTime: d,
      debounceEventsGuarantee: g,
      handleEvents: l
    }), m;
  };
  const n = (i) => {
    i.hooks({
      around: Pi()
    });
  };
  return r.mixins.push(n), mt(r, {
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
        return Ci(t.storage);
    }
  }), Object.assign(r, {
    // TODO: remove in v5
    storeAssociated: ki,
    pushToStore(i, o) {
      const s = r.service(o);
      return Ur(i, s);
    },
    defineVirtualProperty: Ot,
    defineVirtualProperties: Vr
  }), r;
}
class Xi extends ir {
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
const Zi = {
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
function Fi(e) {
  return decodeURIComponent(atob(e).replace(/(.)/g, (t, r) => {
    let n = r.charCodeAt(0).toString(16).toUpperCase();
    return n.length < 2 && (n = "0" + n), "%" + n;
  }));
}
function Ti(e) {
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
    return Fi(t);
  } catch {
    return atob(t);
  }
}
function Li(e, t) {
  if (typeof e != "string")
    throw new le("Invalid token specified: must be a string");
  t || (t = {});
  const r = t.header === !0 ? 0 : 1, n = e.split(".")[r];
  if (typeof n != "string")
    throw new le(`Invalid token specified: missing part #${r + 1}`);
  let i;
  try {
    i = Ti(n);
  } catch (o) {
    throw new le(`Invalid token specified: invalid base64 for part #${r + 1} (${o.message})`);
  }
  try {
    return JSON.parse(i);
  } catch (o) {
    throw new le(`Invalid token specified: invalid json for part #${r + 1} (${o.message})`);
  }
}
function es(e) {
  const { api: t, servicePath: r, skipTokenCheck: n } = e, i = r ? t.service(r) : null, o = e.entityKey || "user", s = j(), u = async () => {
  }, a = async (A) => {
    throw A;
  }, c = e.onSuccess || u, l = e.onError || a, d = e.onInitSuccess || u, g = e.onInitError || u, f = e.onLogoutSuccess || u, S = e.onLogoutError || a, v = j(null), $ = y(() => i && (i == null ? void 0 : i.getFromStore(v)).value || null), O = j(null), h = () => O.value = null, _ = et(), m = y(() => !!_.count.value), I = j(!1), p = (A) => {
    const L = A[o];
    if (i && L) {
      const J = i.store.createInStore(L);
      v.value = J[i.store.idField] || J.__tempId;
    }
    return I.value = !0, A;
  }, b = async (A) => (_.add(), h(), s.value = t.authenticate(A).then(p).then(async (L) => await c(L) || L).catch((L) => (O.value = L, l(L))).finally(() => {
    _.sub();
  }), s.value), w = (A) => {
    try {
      const L = Li(A);
      return (/* @__PURE__ */ new Date()).getTime() > L.exp * 1e3;
    } catch {
      return !1;
    }
  }, P = j(!1), E = async () => (_.add(), s.value = t.reAuthenticate().then(p).then(async (A) => await d(A) || A).catch((A) => (A.value = A, g(A))).finally(() => {
    _.sub(), P.value = !0;
  }), s.value), q = et(), N = y(() => !!q.count.value), C = async () => (q.add(), t.logout().then((A) => (v.value = null, I.value = !1, A)).then(f).catch((A) => (A.value = A, S(A))).finally(() => q.sub())), M = j(null);
  return {
    user: $,
    error: O,
    isPending: m,
    isLogoutPending: N,
    isInitDone: P,
    isAuthenticated: I,
    loginRedirect: M,
    getPromise: () => s.value,
    isTokenExpired: w,
    authenticate: b,
    reAuthenticate: E,
    logout: C,
    clearError: h
  };
}
function ts(e, t) {
  const r = Zt(null);
  er(e, async (o) => {
    var c, l;
    if (!e)
      return;
    const s = t == null ? void 0 : t.idField, u = s ? o == null ? void 0 : o[s] : o == null ? void 0 : o.id, a = s ? (c = r.value) == null ? void 0 : c[s] : (l = r.value) == null ? void 0 : l.id;
    u !== a && (r.value = Ze(o));
  }, { immediate: !0 });
  async function n() {
    const o = tr(e), s = gt(r.value, o, t == null ? void 0 : t.onlyProps);
    if (Object.keys(s).length)
      try {
        const u = await e.value.save({ data: s });
        r.value = Ze(u);
      } catch (u) {
        throw console.error("could not save", u), u;
      }
    else
      return o;
  }
  function i(o) {
    if (r.value) {
      const s = rr(o) ? o.value : o;
      Object.assign(s, r.value);
    }
    return o;
  }
  return { data: e, backup: r, save: n, restore: i };
}
export {
  Xi as OFetch,
  rn as PiniaService,
  Ci as clearStorage,
  Yi as createPiniaClient,
  mt as defineGetters,
  Ji as defineSetters,
  de as defineValues,
  Vr as defineVirtualProperties,
  Ot as defineVirtualProperty,
  gt as diff,
  gi as eventLocks,
  Zi as feathersPiniaAutoImport,
  Pi as feathersPiniaHooks,
  Z as getArray,
  Ae as getExtendedQueryInfo,
  ge as getId,
  ne as getParams,
  z as hasOwn,
  Ai as hydrateStore,
  Oi as makeModelInstances,
  bi as normalizeFind,
  Ce as pickDiff,
  Ur as pushToStore,
  Dr as restoreTempIds,
  mi as setPending,
  wi as skipGetIfExists,
  ki as storeAssociated,
  Si as syncStore,
  qi as syncWithStorage,
  ce as timeout,
  Ft as useAllStorageTypes,
  es as useAuth,
  ts as useBackup,
  zi as useDataStore,
  en as useFind,
  tn as useGet,
  Ki as useInstanceDefaults,
  bt as useModelInstance,
  Hi as useQueuePromise,
  ti as useServiceClones,
  ui as useServiceEventLocks,
  vi as useServiceEvents,
  ji as useServiceInstance,
  Ct as useServiceLocal,
  si as useServicePagination,
  oi as useServicePending,
  Ve as useServiceStorage,
  li as useServiceStore,
  ei as useServiceTemps,
  Ei as writeToStorage
};
//# sourceMappingURL=feathers-pinia.js.map
