var Ut = Object.defineProperty;
var Vt = (e, t, r) => t in e ? Ut(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var _e = (e, t, r) => (Vt(e, typeof t != "symbol" ? t + "" : t, r), r);
import { feathers as Jt } from "@feathersjs/feathers";
import { defineStore as Kt } from "pinia";
import { unref as C, ref as j, isRef as J, computed as m, watch as me, reactive as X, set as R, del as G } from "vue-demi";
import { _ as oe } from "@feathersjs/commons";
import { sorter as zt, select as ze, filterQuery as Ht } from "@feathersjs/adapter-commons";
import { BadRequest as Yt } from "@feathersjs/errors";
import { FetchClient as Xt } from "@feathersjs/rest-client";
var de = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ge(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Zt = function e(t, r) {
  if (t === r)
    return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor)
      return !1;
    var n, o, u;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length)
        return !1;
      for (o = n; o-- !== 0; )
        if (!e(t[o], r[o]))
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === r.toString();
    if (u = Object.keys(t), n = u.length, n !== Object.keys(r).length)
      return !1;
    for (o = n; o-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, u[o]))
        return !1;
    for (o = n; o-- !== 0; ) {
      var i = u[o];
      if (!e(t[i], r[i]))
        return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
};
const He = /* @__PURE__ */ ge(Zt);
var er = Function.prototype.toString, $e = Object.create, tr = Object.prototype.toString, rr = (
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
function nr() {
  return new rr();
}
function or() {
  return /* @__PURE__ */ new WeakMap();
}
var ir = typeof WeakMap < "u" ? or : nr;
function Be(e) {
  if (!e)
    return $e(null);
  var t = e.constructor;
  if (t === Object)
    return e === Object.prototype ? {} : $e(e);
  if (~er.call(t).indexOf("[native code]"))
    try {
      return new t();
    } catch {
    }
  return $e(e);
}
function sr(e) {
  var t = "";
  return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.unicode && (t += "u"), e.sticky && (t += "y"), t;
}
function ur(e) {
  return e.flags;
}
var ar = /test/g.flags === "g" ? ur : sr;
function it(e) {
  var t = tr.call(e);
  return t.substring(8, t.length - 1);
}
function cr(e) {
  return e[Symbol.toStringTag] || it(e);
}
var lr = typeof Symbol < "u" ? cr : it, fr = Object.defineProperty, dr = Object.getOwnPropertyDescriptor, st = Object.getOwnPropertyNames, Me = Object.getOwnPropertySymbols, ut = Object.prototype, at = ut.hasOwnProperty, pr = ut.propertyIsEnumerable, ct = typeof Me == "function";
function hr(e) {
  return st(e).concat(Me(e));
}
var vr = ct ? hr : st;
function Se(e, t, r) {
  for (var n = vr(e), o = 0, u = n.length, i = void 0, s = void 0; o < u; ++o)
    if (i = n[o], !(i === "callee" || i === "caller")) {
      if (s = dr(e, i), !s) {
        t[i] = r.copier(e[i], r);
        continue;
      }
      !s.get && !s.set && (s.value = r.copier(s.value, r));
      try {
        fr(t, i, s);
      } catch {
        t[i] = s.value;
      }
    }
  return t;
}
function yr(e, t) {
  var r = new t.Constructor();
  t.cache.set(e, r);
  for (var n = 0, o = e.length; n < o; ++n)
    r[n] = t.copier(e[n], t);
  return r;
}
function mr(e, t) {
  var r = new t.Constructor();
  return t.cache.set(e, r), Se(e, r, t);
}
function lt(e, t) {
  return e.slice(0);
}
function gr(e, t) {
  return e.slice(0, e.size, e.type);
}
function Sr(e, t) {
  return new t.Constructor(lt(e.buffer));
}
function Or(e, t) {
  return new t.Constructor(e.getTime());
}
function ft(e, t) {
  var r = new t.Constructor();
  return t.cache.set(e, r), e.forEach(function(n, o) {
    r.set(o, t.copier(n, t));
  }), r;
}
function Ir(e, t) {
  return Se(e, ft(e, t), t);
}
function br(e, t) {
  var r = Be(t.prototype);
  t.cache.set(e, r);
  for (var n in e)
    at.call(e, n) && (r[n] = t.copier(e[n], t));
  return r;
}
function wr(e, t) {
  var r = Be(t.prototype);
  t.cache.set(e, r);
  for (var n in e)
    at.call(e, n) && (r[n] = t.copier(e[n], t));
  for (var o = Me(e), u = 0, i = o.length, s = void 0; u < i; ++u)
    s = o[u], pr.call(e, s) && (r[s] = t.copier(e[s], t));
  return r;
}
var _r = ct ? wr : br;
function $r(e, t) {
  var r = Be(t.prototype);
  return t.cache.set(e, r), Se(e, r, t);
}
function Pe(e, t) {
  return new t.Constructor(e.valueOf());
}
function Pr(e, t) {
  var r = new t.Constructor(e.source, ar(e));
  return r.lastIndex = e.lastIndex, r;
}
function pe(e, t) {
  return e;
}
function dt(e, t) {
  var r = new t.Constructor();
  return t.cache.set(e, r), e.forEach(function(n) {
    r.add(t.copier(n, t));
  }), r;
}
function jr(e, t) {
  return Se(e, dt(e, t), t);
}
var kr = Array.isArray, Ne = Object.assign, Er = Object.getPrototypeOf || function(e) {
  return e.__proto__;
}, pt = {
  array: yr,
  arrayBuffer: lt,
  blob: gr,
  dataView: Sr,
  date: Or,
  error: pe,
  map: ft,
  object: _r,
  regExp: Pr,
  set: dt
}, Ar = Ne({}, pt, {
  array: mr,
  map: Ir,
  object: $r,
  set: jr
});
function qr(e) {
  return {
    Arguments: e.object,
    Array: e.array,
    ArrayBuffer: e.arrayBuffer,
    Blob: e.blob,
    Boolean: Pe,
    DataView: e.dataView,
    Date: e.date,
    Error: e.error,
    Float32Array: e.arrayBuffer,
    Float64Array: e.arrayBuffer,
    Int8Array: e.arrayBuffer,
    Int16Array: e.arrayBuffer,
    Int32Array: e.arrayBuffer,
    Map: e.map,
    Number: Pe,
    Object: e.object,
    Promise: pe,
    RegExp: e.regExp,
    Set: e.set,
    String: Pe,
    WeakMap: pe,
    WeakSet: pe,
    Uint8Array: e.arrayBuffer,
    Uint8ClampedArray: e.arrayBuffer,
    Uint16Array: e.arrayBuffer,
    Uint32Array: e.arrayBuffer,
    Uint64Array: e.arrayBuffer
  };
}
function ht(e) {
  var t = Ne({}, pt, e), r = qr(t), n = r.Array, o = r.Object;
  function u(i, s) {
    if (s.prototype = s.Constructor = void 0, !i || typeof i != "object")
      return i;
    if (s.cache.has(i))
      return s.cache.get(i);
    if (s.prototype = Er(i), s.Constructor = s.prototype && s.prototype.constructor, !s.Constructor || s.Constructor === Object)
      return o(i, s);
    if (kr(i))
      return n(i, s);
    var a = r[lr(i)];
    return a ? a(i, s) : typeof i.then == "function" ? i : o(i, s);
  }
  return function(s) {
    return u(s, {
      Constructor: void 0,
      cache: ir(),
      copier: u,
      prototype: void 0
    });
  };
}
function Cr(e) {
  return ht(Ne({}, Ar, e));
}
Cr({});
var Z = ht({});
function le(e, t) {
  return Object.keys(t).forEach((r) => {
    Object.defineProperty(e, r, {
      enumerable: !1,
      configurable: !0,
      value: t[r]
    });
  }), e;
}
function vt(e, t) {
  return Object.keys(t).forEach((r) => {
    Object.defineProperty(e, r, {
      enumerable: !1,
      configurable: !0,
      get: t[r]
    });
  }), e;
}
function Bo(e, t) {
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
function je({ queryInfo: e, service: t, store: r, qid: n }) {
  const u = r.pagination[n.value][e.queryId];
  if (!u)
    return null;
  const { total: i } = u, s = u[e.pageId];
  if (!s)
    return null;
  const { ids: a, queriedAt: c, ssr: l } = s, d = a.map((S) => r.itemsById[S]).filter((S) => S), g = ne(t, d);
  return { ...e, ids: a, items: g, total: i, queriedAt: c, queryState: u, ssr: l } || null;
}
function K(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function Y(e) {
  const t = Array.isArray(e);
  return { items: t ? e : [e], isArray: t };
}
function Ee(e, t) {
  if (!t)
    return e;
  const n = (typeof t == "string" ? [t] : Array.isArray(t) ? t : Object.keys(t || e)).map((o) => o.toString().split(".")[0]);
  return oe.pick(e, ...n);
}
function Fr(e, t, r) {
  const n = Ee(e, r), o = Ee(t, r);
  return typeof r != "string" && !Array.isArray(r) && Object.assign(o, r), He(n, o) ? {} : Object.keys(o).reduce((s, a) => (He(e[a], o[a]) || (s[a] = o[a]), s), {});
}
function Lr(e, t, r = "__tempId") {
  const { items: n, isArray: o } = Y(e), { items: u } = Y(t);
  return u.forEach((i, s) => {
    const a = n[s][r];
    a && le(i, { [r]: a });
  }), o ? u : u[0];
}
function ke(e) {
  return typeof e == "object" && e != null ? e.toString() : e;
}
function he(e, t) {
  if (e) {
    if (t && e[t] !== void 0)
      return ke(e[t]);
    if (e.id !== void 0)
      return ke(e.id);
    if (e._id !== void 0)
      return ke(e._id);
  }
}
function re(e) {
  return e ? Z(C(e)) : {};
}
function ae(e) {
  return new Promise((t) => setTimeout(t, e));
}
function Ye() {
  const e = j(0);
  return { count: e, add: () => {
    e.value = e.value + 1;
  }, sub: () => {
    e.value = e.value === 0 ? 0 : e.value - 1;
  } };
}
const Tr = (e) => e !== null && typeof e == "object", Br = Array.isArray;
function yt(e) {
  return e !== null && !J(e) && typeof e == "object" ? W(e) : C(e);
}
const Mr = (e) => e.map(yt);
function Nr(e) {
  const t = {};
  return Object.keys(e).forEach((r) => {
    t[r] = yt(e[r]);
  }), t;
}
function W(e) {
  const t = J(e) ? C(e) : e;
  return Tr(t) ? Br(t) ? Mr(t) : Nr(t) : t;
}
function Mo(e, t) {
  const r = Object.keys(t), n = oe.omit(e, ...r);
  return Object.assign(t, Z(n));
}
const Dr = [
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
function Xe(e) {
  return typeof e == "function" ? e() : C(e);
}
const Ze = () => {
};
function Rr(e, t) {
  function r(...n) {
    return new Promise((o, u) => {
      Promise.resolve(e(() => t.apply(this, n), { fn: t, thisArg: this, args: n })).then(o).catch(u);
    });
  }
  return r;
}
function Wr(e, t = {}) {
  let r, n, o = Ze;
  const u = (s) => {
    clearTimeout(s), o(), o = Ze;
  };
  return (s) => {
    const a = Xe(e), c = Xe(t.maxWait);
    return r && u(r), a <= 0 || c !== void 0 && c <= 0 ? (n && (u(n), n = null), Promise.resolve(s())) : new Promise((l, d) => {
      o = t.rejectOnCancel ? d : l, c && !n && (n = setTimeout(() => {
        r && u(r), n = null, l(s());
      }, c)), r = setTimeout(() => {
        n && u(n), n = null, l(s());
      }, a);
    });
  };
}
function Gr(e, t = 200, r = {}) {
  return Rr(
    Wr(t, r),
    e
  );
}
var xr = function(e, t) {
  t || (t = {}), typeof t == "function" && (t = { cmp: t });
  var r = typeof t.cycles == "boolean" ? t.cycles : !1, n = t.cmp && function(u) {
    return function(i) {
      return function(s, a) {
        var c = { key: s, value: i[s] }, l = { key: a, value: i[a] };
        return u(c, l);
      };
    };
  }(t.cmp), o = [];
  return function u(i) {
    if (i && i.toJSON && typeof i.toJSON == "function" && (i = i.toJSON()), i !== void 0) {
      if (typeof i == "number")
        return isFinite(i) ? "" + i : "null";
      if (typeof i != "object")
        return JSON.stringify(i);
      var s, a;
      if (Array.isArray(i)) {
        for (a = "[", s = 0; s < i.length; s++)
          s && (a += ","), a += u(i[s]) || "null";
        return a + "]";
      }
      if (i === null)
        return "null";
      if (o.indexOf(i) !== -1) {
        if (r)
          return JSON.stringify("__cycle__");
        throw new TypeError("Converting circular structure to JSON");
      }
      var c = o.push(i) - 1, l = Object.keys(i).sort(n && n(i));
      for (a = "", s = 0; s < l.length; s++) {
        var d = l[s], g = u(i[d]);
        g && (a && (a += ","), a += JSON.stringify(d) + ":" + g);
      }
      return o.splice(c, 1), "{" + a + "}";
    }
  }(e);
};
const ve = /* @__PURE__ */ ge(xr);
function Qr(e, t) {
  const { queryId: r, pageId: n } = t, o = e[r], u = o && o[n];
  return u && u.ids || [];
}
function Ur(e, t, r) {
  const n = r.qid || "default", o = e.pagination[n] || {}, u = e.getQueryInfo(r);
  return Qr(o, u).map((a) => t.getFromStore(a).value).filter((a) => a);
}
function Vr(e) {
  const { limit: t, skip: r, total: n, request: o } = e, u = m(() => n.value ? Math.ceil(n.value / t.value) : 1), i = m({
    set(h) {
      h < 1 ? h = 1 : h > u.value && (h = u.value);
      const _ = t.value * Math.floor(h - 1);
      r.value = _;
    },
    get() {
      const h = r.value || 0;
      return u.value === 0 ? 0 : Math.floor(h / t.value + 1);
    }
  }), s = m(() => i.value - 1 > 0), a = m(() => i.value < u.value), c = async () => {
    o != null && o.value && await o.value;
  };
  return { pageCount: u, currentPage: i, canPrev: s, canNext: a, toStart: async () => (i.value = 1, await ae(0), c()), toEnd: async () => (i.value = u.value, await ae(0), c()), toPage: async (h) => (i.value = h, await ae(0), c()), next: async () => (i.value++, await ae(0), c()), prev: async () => (i.value--, await ae(0), c()) };
}
function Jr(e, t = {}, r) {
  var Ue, Ve, Je, Ke;
  const { pagination: n, debounce: o = 100, immediate: u = !0, watch: i = !0, paginateOn: s = "client" } = t, { service: a } = r, { store: c } = a, l = m(() => {
    var k;
    return ((k = e.value) == null ? void 0 : k.qid) || "default";
  }), d = (n == null ? void 0 : n.limit) || j(((Ve = (Ue = e.value) == null ? void 0 : Ue.query) == null ? void 0 : Ve.$limit) || c.defaultLimit), g = (n == null ? void 0 : n.skip) || j(((Ke = (Je = e.value) == null ? void 0 : Je.query) == null ? void 0 : Ke.$skip) || 0), f = m(() => {
    var T;
    const k = W(((T = e.value) == null ? void 0 : T.query) || {});
    return {
      ...e.value,
      query: {
        ...k,
        $limit: d.value,
        $skip: g.value
      }
    };
  }), S = m(() => {
    var te;
    const k = W(((te = e.value) == null ? void 0 : te.query) || {}), T = oe.omit(k, "$limit", "$skip");
    return { ...e.value, query: T };
  }), h = j(!1), _ = j(!1), I = j(!1), v = j(null), b = () => v.value = null, y = j(W(e.value || {}));
  function O() {
    ve(y.value) !== ve(f.value) && (y.value = f.value);
  }
  const p = m(() => {
    const k = $.value, T = g.value + (k.length - g.value);
    return {
      ...f.value,
      query: {
        ...f.value.query,
        $limit: d.value,
        $skip: T
      }
    };
  }), w = m(() => s === "server" ? Ur(c, a, y.value) : s === "hybrid" ? a.findInStore(W(p)).data.filter((T) => T) : a.findInStore(W(f)).data.filter((T) => T)), $ = m(() => {
    const k = h.value ? M.value : A.value;
    if (k == null)
      return [];
    const T = P.value, D = k.items.find((we) => we), te = T.findIndex((we) => we[c.idField] === D[c.idField]), fe = Math.min(te, g.value);
    return T.slice(0, fe);
  }), P = m(() => (h.value ? M.value : A.value) == null && s !== "client" ? [] : a.findInStore(W(S.value)).data);
  let E = () => !0;
  const F = (k) => {
    E = k;
  }, M = m(() => {
    if (!c.pagination[l.value])
      return null;
    const T = c.getQueryInfo(y.value);
    return je({ queryInfo: T, service: a, store: c, qid: l });
  }), A = m(() => {
    if (!c.pagination[l.value])
      return null;
    const T = c.getQueryInfo(f.value);
    return je({ queryInfo: T, service: a, store: c, qid: l });
  }), N = j([]), q = m(() => N.value[N.value.length - 1] || null), L = m(() => N.value[N.value.length - 2] || null), x = j(0), H = j(null);
  function Qe() {
    var k;
    (k = A.value) != null && k.ssr || (_.value || (_.value = !0), b(), h.value || (h.value = !0), I.value && (I.value = !1));
  }
  async function Ft(k) {
    const T = C(
      k ?? (s === "client" ? S.value : f.value)
    );
    if (!E())
      return Promise.resolve({ data: [] });
    Qe(), x.value++;
    try {
      const D = await a.find(T);
      if (D.total) {
        const te = c.getQueryInfo(f.value), fe = je({ queryInfo: te, service: a, store: c, qid: l });
        fe && N.value.push(fe), N.value.length > 2 && N.value.shift();
      }
      return I.value = !0, D;
    } catch (D) {
      throw v.value = D, D;
    } finally {
      h.value = !1;
    }
  }
  const Lt = Gr(Ft, o), ee = async (k) => {
    e.value !== null && (A.value && O(), E() && Qe(), H.value = Lt(k), await H.value, O());
  }, be = m(() => {
    if (["server", "hybrid"].includes(s)) {
      const k = A.value || M.value;
      return (k == null ? void 0 : k.total) || 0;
    } else
      return a.countInStore(S.value).value;
  }), Tt = Vr({ limit: d, skip: g, total: be, request: H }), { pageCount: Bt, currentPage: Mt, canPrev: Nt, canNext: Dt, toStart: Rt, toEnd: Wt, toPage: Gt, next: xt, prev: Qt } = Tt;
  return ["server", "hybrid"].includes(s) && i && (me(
    f,
    () => {
      ee();
    },
    { immediate: !1 }
  ), u && ee()), s === "server" && (a.on("created", () => {
    ee();
  }), a.on("patched", () => {
    ee();
  }), a.on("removed", () => {
    ee();
  })), X({
    paramsWithPagination: f,
    isSsr: m(() => (setTimeout(() => {
      j(be.value);
    }, 0), c.isSsr)),
    // ComputedRef<boolean>
    qid: l,
    // WritableComputedRef<string>
    // Data
    data: w,
    // ComputedRef<M[]>
    allLocalData: P,
    // ComputedRef<M[]>
    total: be,
    // ComputedRef<number>
    limit: d,
    // Ref<number>
    skip: g,
    // Ref<number>
    // Queries
    currentQuery: A,
    // ComputedRef<CurrentQuery<M> | null>
    cachedQuery: M,
    // ComputedRef<CurrentQuery<M> | null>
    latestQuery: q,
    // ComputedRef<QueryInfo | null>
    previousQuery: L,
    // ComputedRef<QueryInfo | null>
    // Requests & Watching
    find: ee,
    // FindFn<M>
    request: H,
    // Ref<Promise<Paginated<M>>>
    requestCount: x,
    // Ref<number>
    queryWhen: F,
    // (queryWhenFn: () => boolean) => void
    // Request State
    isPending: m(() => h.value),
    // ComputedRef<boolean>
    haveBeenRequested: m(() => _.value),
    // ComputedRef<boolean>
    haveLoaded: m(() => I.value),
    // ComputedRef<boolean>
    error: m(() => v.value),
    // ComputedRef<any>
    clearError: b,
    // () => void
    // Pagination Utils
    pageCount: Bt,
    // Ref<number>
    currentPage: Mt,
    // Ref<number>
    canPrev: Nt,
    // ComputedRef<boolean>
    canNext: Dt,
    // ComputedRef<boolean>
    next: xt,
    // () => Promise<void>
    prev: Qt,
    // () => Promise<void>
    toStart: Rt,
    // () => Promise<void>
    toEnd: Wt,
    // () => Promise<void>
    toPage: Gt
    // (page: number) => Promise<void>
  });
}
function Kr(e, t = j({}), r) {
  const { service: n } = r, o = J(e) ? e : j(e), u = J(t) ? t : j(t), { immediate: i = !0, watch: s = !0 } = u.value, a = m(() => n.store.isSsr), c = j(!1), l = j(!1), d = j(null), g = () => d.value = null, f = j([]), S = m(() => f.value.length && f.value[f.value.length - 1]), h = m(() => c.value && S.value != null ? n.store.getFromStore(S.value, u).value : n.store.getFromStore(o.value, u).value), _ = n.store.getFromStore, I = m(() => !!h.value);
  let v = () => !0;
  const b = ($) => {
    v = $;
  }, y = j(0), O = j(null);
  async function p() {
    const $ = C(o), P = C(u);
    if (v()) {
      if ($ == null)
        return null;
      y.value++, l.value = !0, c.value = !0, d.value = null;
      try {
        const E = await n.get($, P);
        return E && $ && f.value.push($), E;
      } catch (E) {
        d.value = E;
      } finally {
        c.value = !1;
      }
    }
  }
  async function w() {
    return O.value = p(), await O.value;
  }
  return s && me(
    o,
    async () => {
      await w();
    },
    { immediate: i }
  ), X({
    params: u,
    // Ref<GetClassParams>
    isSsr: a,
    // ComputedRef<boolean>
    // Data
    data: h,
    // ComputedRef<M | null>
    ids: f,
    // Ref<Id[]>
    getFromStore: _,
    // (id: Id | null, params: Params<Query>) => M | undefined
    // Requests & Watching
    get: w,
    // GetFn<M>
    request: O,
    // Ref<Promise<M | undefined>>
    requestCount: y,
    // Ref<number>
    queryWhen: b,
    // (queryWhenFn: () => boolean) => void
    // Request State
    isPending: m(() => c.value),
    // ComputedRef<boolean>
    hasBeenRequested: m(() => l.value),
    // ComputedRef<boolean>
    hasLoaded: m(() => I.value),
    // ComputedRef<boolean>
    error: m(() => d.value),
    // ComputedRef<any>
    clearError: g
    // () => void
  });
}
class zr {
  constructor(t, r) {
    _e(this, "store");
    _e(this, "servicePath", "");
    this.service = t, this.options = r, this.store = r.store, this.servicePath = r.servicePath;
    const n = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).concat(Dr);
    for (const o in t)
      if (typeof t[o] == "function" && !n.includes(o)) {
        const u = this;
        u[o] = t[o].bind(t);
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
    return X(r);
  }
  async find(t) {
    const r = re(t);
    return await this.service.find(r);
  }
  async findOne(t) {
    const r = re(t);
    r.query = r.query || {}, r.query.$limit = 1;
    const n = await this.service.find(r);
    return (n.data || n)[0] || null;
  }
  async count(t) {
    const r = re(t);
    return r.query = r.query || {}, r.query.$limit = 0, await this.service.find(r);
  }
  async get(t, r) {
    const n = re(r);
    return await this.service.get(t, n);
  }
  async create(t) {
    return await this.service.create(t);
  }
  async patch(t, r, n) {
    const o = re(n);
    return await this.service.patch(t, r, o);
  }
  async remove(t, r) {
    const n = re(r);
    return await this.service.remove(C(t), n);
  }
  findInStore(t) {
    const r = this.store.findInStore(t);
    return X({
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
    var o;
    const n = t != null ? this.getFromStore(t).value : null;
    if (n)
      return this.store.removeFromStore(n);
    if (t == null && ((o = C(r)) != null && o.query))
      return this.store.removeByQuery(r);
  }
  /* hybrid methods */
  useFind(t, r) {
    const n = J(t) ? t : j(t);
    return Jr(n, r, { service: this });
  }
  useGet(t, r = j({})) {
    const n = J(t) ? t : j(t), o = J(r) ? r : j(r);
    return Kr(n, o, { service: this });
  }
  useGetOnce(t, r = {}) {
    const n = J(r) ? r : j(r);
    Object.assign(n.value, { immediate: !1 });
    const o = this.useGet(t, n);
    return o.queryWhen(() => !o.data), o.get(), o;
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
var mt = { exports: {} };
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
      var o = window.localStorage, u = parseInt(o.mongoMachineId, 10);
      u >= 0 && u <= 16777215 && (n = Math.floor(o.mongoMachineId)), o.mongoMachineId = n;
    }
    function i() {
      var s = arguments;
      if (!(this instanceof i))
        return s.length > 0 ? new i(s[0], s[1], s[2], s[3]) : new i();
      typeof s[0] == "object" ? (this.timestamp = s[0].timestamp, this.machine = s[0].machine, this.pid = s[0].pid, this.increment = s[0].increment) : typeof s[0] == "string" && s[0].length === 24 ? (this.timestamp = +("0x" + s[0].substr(0, 8)), this.machine = +("0x" + s[0].substr(8, 6)), this.pid = +("0x" + s[0].substr(14, 4)), this.increment = +("0x" + s[0].substr(18, 6))) : s.length === 4 && s[0] !== null ? (this.timestamp = s[0], this.machine = s[1], this.pid = s[2], this.increment = s[3]) : (this.timestamp = Math.floor((/* @__PURE__ */ new Date()).valueOf() / 1e3), this.machine = n, this.pid = r, this.increment = t++, t > 16777215 && (t = 0));
    }
    i.prototype.getDate = function() {
      return new Date(this.timestamp * 1e3);
    }, i.prototype.toArray = function() {
      var s = this.toString(), a = [], c;
      for (c = 0; c < 12; c++)
        a[c] = parseInt(s.slice(c * 2, c * 2 + 2), 16);
      return a;
    }, i.prototype.toString = function() {
      var s = this.timestamp.toString(16), a = this.machine.toString(16), c = this.pid.toString(16), l = this.increment.toString(16);
      return [
        "00000000".substr(0, 8 - s.length) + s,
        "000000".substr(0, 6 - a.length) + a,
        "0000".substr(0, 4 - c.length) + c,
        "000000".substr(0, 6 - l.length) + l
      ].join("");
    }, e.exports = i;
  })();
})(mt);
var Hr = mt.exports, Yr = Hr;
const Xr = /* @__PURE__ */ ge(Yr);
function gt(e, t) {
  if (e.__isStoreInstance)
    return e;
  const { idField: r, clonesById: n, clone: o, commit: u, reset: i, createInStore: s, removeFromStore: a } = t, c = e.__isClone || !1;
  return Object.defineProperty(e, "__isTemp", {
    configurable: !0,
    enumerable: !1,
    get() {
      return this[this.__idField] == null;
    }
  }), le(e, {
    __isStoreInstance: !0,
    __isClone: c,
    __idField: r,
    __tempId: e[r] == null && e.__tempId == null ? new Xr().toString() : e.__tempId || void 0,
    hasClone() {
      const d = this[this.__idField] || this.__tempId;
      return n[d] || null;
    },
    clone(d = {}, g = {}) {
      return o(this, d, g);
    },
    commit(d = {}) {
      return u(this, d);
    },
    reset(d = {}) {
      return i(this, d);
    },
    createInStore() {
      return s(this);
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
var Ae = function(e, t) {
  return Ae = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var o in n)
      Object.prototype.hasOwnProperty.call(n, o) && (r[o] = n[o]);
  }, Ae(e, t);
};
function B(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Ae(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
var De = function(e) {
  var t = "[object " + e + "]";
  return function(r) {
    return Zr(r) === t;
  };
}, Zr = function(e) {
  return Object.prototype.toString.call(e);
}, ie = function(e) {
  return e instanceof Date ? e.getTime() : se(e) ? e.map(ie) : e && typeof e.toJSON == "function" ? e.toJSON() : e;
}, en = function(e) {
  return e ?? null;
}, se = De("Array"), tn = De("Object"), rn = De("Function"), nn = function(e) {
  return e && (e.constructor === Object || e.constructor === Array || e.constructor.toString() === "function Object() { [native code] }" || e.constructor.toString() === "function Array() { [native code] }") && !e.toJSON;
}, qe = function(e, t) {
  if (e == null && e == t || e === t)
    return !0;
  if (Object.prototype.toString.call(e) !== Object.prototype.toString.call(t))
    return !1;
  if (se(e)) {
    if (e.length !== t.length)
      return !1;
    for (var r = 0, n = e.length; r < n; r++)
      if (!qe(e[r], t[r]))
        return !1;
    return !0;
  } else if (tn(e)) {
    if (Object.keys(e).length !== Object.keys(t).length)
      return !1;
    for (var o in e)
      if (!qe(e[o], t[o]))
        return !1;
    return !0;
  }
  return !1;
}, Ce = function(e, t, r, n, o, u) {
  var i = t[n];
  if (se(e) && isNaN(Number(i))) {
    for (var s = 0, a = e.length; s < a; s++)
      if (!Ce(e[s], t, r, n, s, e))
        return !1;
  }
  return n === t.length || e == null ? r(e, o, u, n === 0) : Ce(e[i], t, r, n + 1, i, e);
}, Q = (
  /** @class */
  function() {
    function e(t, r, n, o) {
      this.params = t, this.owneryQuery = r, this.options = n, this.name = o, this.init();
    }
    return e.prototype.init = function() {
    }, e.prototype.reset = function() {
      this.done = !1, this.keep = !1;
    }, e;
  }()
), Re = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, n, o, u) {
      var i = e.call(this, r, n, o) || this;
      return i.children = u, i;
    }
    return t.prototype.reset = function() {
      this.keep = !1, this.done = !1;
      for (var r = 0, n = this.children.length; r < n; r++)
        this.children[r].reset();
    }, t.prototype.childrenNext = function(r, n, o, u) {
      for (var i = !0, s = !0, a = 0, c = this.children.length; a < c; a++) {
        var l = this.children[a];
        if (l.done || l.next(r, n, o, u), l.keep || (s = !1), l.done) {
          if (!l.keep)
            break;
        } else
          i = !1;
      }
      this.done = i, this.keep = s;
    }, t;
  }(Q)
), St = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, n, o, u, i) {
      var s = e.call(this, r, n, o, u) || this;
      return s.name = i, s;
    }
    return t;
  }(Re)
), on = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !0, r;
    }
    return t.prototype.next = function(r, n, o, u) {
      this.childrenNext(r, n, o, u);
    }, t;
  }(Re)
), Fe = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, n, o, u, i) {
      var s = e.call(this, n, o, u, i) || this;
      return s.keyPath = r, s.propop = !0, s._nextNestedValue = function(a, c, l, d) {
        return s.childrenNext(a, c, l, d), !s.done;
      }, s;
    }
    return t.prototype.next = function(r, n, o) {
      Ce(r, this.keyPath, this._nextNestedValue, 0, n, o);
    }, t;
  }(Re)
), We = function(e, t) {
  if (e instanceof Function)
    return e;
  if (e instanceof RegExp)
    return function(n) {
      var o = typeof n == "string" && e.test(n);
      return e.lastIndex = 0, o;
    };
  var r = ie(e);
  return function(n) {
    return t(r, ie(n));
  };
}, V = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !0, r;
    }
    return t.prototype.init = function() {
      this._test = We(this.params, this.options.compare);
    }, t.prototype.next = function(r, n, o) {
      (!Array.isArray(o) || o.hasOwnProperty(n)) && this._test(r, n, o) && (this.done = !0, this.keep = !0);
    }, t;
  }(Q)
), Oe = function(e, t, r) {
  return new V(e, t, r);
}, sn = function(e) {
  return function(t, r, n, o) {
    return e(t, r, n, o);
  };
}, Ie = function(e) {
  return sn(function(t, r, n, o) {
    var u = typeof ie(t), i = e(t);
    return new V(function(s) {
      var a = en(s);
      return typeof ie(a) === u && i(a);
    }, r, n, o);
  });
}, un = function(e, t, r, n) {
  var o = n.operations[e];
  return o || Ot(e), o(t, r, n, e);
}, Ot = function(e) {
  throw new Error("Unsupported operation: " + e);
}, It = function(e, t) {
  for (var r in e)
    if (t.operations.hasOwnProperty(r) || r.charAt(0) === "$")
      return !0;
  return !1;
}, an = function(e, t, r, n, o) {
  if (It(t, o)) {
    var u = bt(t, r, o), i = u[0], s = u[1];
    if (s.length)
      throw new Error("Property queries must contain only operations, or exact objects.");
    return new Fe(e, t, n, o, i);
  }
  return new Fe(e, t, n, o, [
    new V(t, n, o)
  ]);
}, ue = function(e, t, r) {
  t === void 0 && (t = null);
  var n = r === void 0 ? {} : r, o = n.compare, u = n.operations, i = {
    compare: o || qe,
    operations: Object.assign({}, u || {})
  }, s = bt(e, null, i), a = s[0], c = s[1], l = [];
  return a.length && l.push(new Fe([], e, t, i, a)), l.push.apply(l, c), l.length === 1 ? l[0] : new on(e, t, i, l);
}, bt = function(e, t, r) {
  var n = [], o = [];
  if (!nn(e))
    return n.push(new V(e, e, r)), [n, o];
  for (var u in e)
    if (r.operations.hasOwnProperty(u)) {
      var i = un(u, e[u], e, r);
      if (i && !i.propop && t && !r.operations[t])
        throw new Error("Malformed query. " + u + " cannot be matched against property.");
      i != null && n.push(i);
    } else
      u.charAt(0) === "$" ? Ot(u) : o.push(an(u.split("."), e[u], u, e, r));
  return [n, o];
}, cn = function(e) {
  return function(t, r, n) {
    return e.reset(), e.next(t, r, n), e.keep;
  };
}, ln = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !0, r;
    }
    return t.prototype.init = function() {
      this._test = We(this.params, this.options.compare);
    }, t.prototype.reset = function() {
      e.prototype.reset.call(this), this.keep = !0;
    }, t.prototype.next = function(r) {
      this._test(r) && (this.done = !0, this.keep = !1);
    }, t;
  }(Q)
), fn = (
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
      this._queryOperation = ue(this.params, this.owneryQuery, this.options);
    }, t.prototype.reset = function() {
      e.prototype.reset.call(this), this._queryOperation.reset();
    }, t.prototype.next = function(r) {
      if (se(r)) {
        for (var n = 0, o = r.length; n < o; n++) {
          this._queryOperation.reset();
          var u = r[n];
          this._queryOperation.next(u, n, r, !1), this.keep = this.keep || this._queryOperation.keep;
        }
        this.done = !0;
      } else
        this.done = !1, this.keep = !1;
    }, t;
  }(Q)
), dn = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !0, r;
    }
    return t.prototype.init = function() {
      this._queryOperation = ue(this.params, this.owneryQuery, this.options);
    }, t.prototype.reset = function() {
      e.prototype.reset.call(this), this._queryOperation.reset();
    }, t.prototype.next = function(r, n, o, u) {
      this._queryOperation.next(r, n, o, u), this.done = this._queryOperation.done, this.keep = !this._queryOperation.keep;
    }, t;
  }(Q)
), wt = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !0, r;
    }
    return t.prototype.init = function() {
    }, t.prototype.next = function(r) {
      se(r) && r.length === this.params && (this.done = !0, this.keep = !0);
    }, t;
  }(Q)
), _t = function(e) {
  if (e.length === 0)
    throw new Error("$and/$or/$nor must be a nonempty array");
}, $t = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !1, r;
    }
    return t.prototype.init = function() {
      var r = this;
      _t(this.params), this._ops = this.params.map(function(n) {
        return ue(n, null, r.options);
      });
    }, t.prototype.reset = function() {
      this.done = !1, this.keep = !1;
      for (var r = 0, n = this._ops.length; r < n; r++)
        this._ops[r].reset();
    }, t.prototype.next = function(r, n, o) {
      for (var u = !1, i = !1, s = 0, a = this._ops.length; s < a; s++) {
        var c = this._ops[s];
        if (c.next(r, n, o), c.keep) {
          u = !0, i = c.keep;
          break;
        }
      }
      this.keep = i, this.done = u;
    }, t;
  }(Q)
), pn = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !1, r;
    }
    return t.prototype.next = function(r, n, o) {
      e.prototype.next.call(this, r, n, o), this.keep = !this.keep;
    }, t;
  }($t)
), Pt = (
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
        if (It(n, r.options))
          throw new Error("cannot nest $ under " + r.name.toLowerCase());
        return We(n, r.options.compare);
      });
    }, t.prototype.next = function(r, n, o) {
      for (var u = !1, i = !1, s = 0, a = this._testers.length; s < a; s++) {
        var c = this._testers[s];
        if (c(r)) {
          u = !0, i = !0;
          break;
        }
      }
      this.keep = i, this.done = u;
    }, t;
  }(Q)
), hn = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, n, o, u) {
      var i = e.call(this, r, n, o, u) || this;
      return i.propop = !0, i._in = new Pt(r, n, o, u), i;
    }
    return t.prototype.next = function(r, n, o, u) {
      this._in.next(r, n, o), se(o) && !u ? this._in.keep ? (this.keep = !1, this.done = !0) : n == o.length - 1 && (this.keep = !0, this.done = !0) : (this.keep = !this._in.keep, this.done = !0);
    }, t.prototype.reset = function() {
      e.prototype.reset.call(this), this._in.reset();
    }, t;
  }(Q)
), vn = (
  /** @class */
  function(e) {
    B(t, e);
    function t() {
      var r = e !== null && e.apply(this, arguments) || this;
      return r.propop = !0, r;
    }
    return t.prototype.next = function(r, n, o) {
      o.hasOwnProperty(n) === this.params && (this.done = !0, this.keep = !0);
    }, t;
  }(Q)
), yn = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, n, o, u) {
      var i = e.call(this, r, n, o, r.map(function(s) {
        return ue(s, n, o);
      }), u) || this;
      return i.propop = !1, _t(r), i;
    }
    return t.prototype.next = function(r, n, o, u) {
      this.childrenNext(r, n, o, u);
    }, t;
  }(St)
), mn = (
  /** @class */
  function(e) {
    B(t, e);
    function t(r, n, o, u) {
      var i = e.call(this, r, n, o, r.map(function(s) {
        return ue(s, n, o);
      }), u) || this;
      return i.propop = !0, i;
    }
    return t.prototype.next = function(r, n, o, u) {
      this.childrenNext(r, n, o, u);
    }, t;
  }(St)
), gn = function(e, t, r) {
  return new V(e, t, r);
}, Sn = function(e, t, r, n) {
  return new ln(e, t, r, n);
}, On = function(e, t, r, n) {
  return new $t(e, t, r, n);
}, In = function(e, t, r, n) {
  return new pn(e, t, r, n);
}, bn = function(e, t, r, n) {
  return new fn(e, t, r, n);
}, wn = function(e, t, r, n) {
  return new hn(e, t, r, n);
}, _n = function(e, t, r, n) {
  return new Pt(e, t, r, n);
}, $n = Ie(function(e) {
  return function(t) {
    return t != null && t < e;
  };
}), Pn = Ie(function(e) {
  return function(t) {
    return t === e || t <= e;
  };
}), jn = Ie(function(e) {
  return function(t) {
    return t != null && t > e;
  };
}), kn = Ie(function(e) {
  return function(t) {
    return t === e || t >= e;
  };
}), En = function(e, t, r) {
  var n = e[0], o = e[1];
  return new V(function(u) {
    return ie(u) % n === o;
  }, t, r);
}, An = function(e, t, r, n) {
  return new vn(e, t, r, n);
}, qn = function(e, t, r) {
  return new V(new RegExp(e, t.$options), t, r);
}, Cn = function(e, t, r, n) {
  return new dn(e, t, r, n);
}, et = {
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
}, Fn = function(e, t, r) {
  return new V(function(n) {
    if (typeof e == "string") {
      if (!et[e])
        throw new Error("Type alias does not exist");
      return et[e](n);
    }
    return n != null ? n instanceof e || n.constructor === e : !1;
  }, t, r);
}, Ln = function(e, t, r, n) {
  return new yn(e, t, r, n);
}, Tn = function(e, t, r, n) {
  return new mn(e, t, r, n);
}, Bn = function(e, t, r) {
  return new wt(e, t, r, "$size");
}, Mn = function() {
  return null;
}, Nn = function(e, t, r) {
  var n;
  if (rn(e))
    n = e;
  else if (!process.env.CSP_ENABLED)
    n = new Function("obj", "return " + e);
  else
    throw new Error('In CSP mode, sift does not support strings in "$where" condition');
  return new V(function(o) {
    return n.bind(o)(o);
  }, t, r);
}, Dn = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  $Size: wt,
  $eq: gn,
  $ne: Sn,
  $or: On,
  $nor: In,
  $elemMatch: bn,
  $nin: wn,
  $in: _n,
  $lt: $n,
  $lte: Pn,
  $gt: jn,
  $gte: kn,
  $mod: En,
  $exists: An,
  $regex: qn,
  $not: Cn,
  $type: Fn,
  $and: Ln,
  $all: Tn,
  $size: Bn,
  $options: Mn,
  $where: Nn
}), Rn = function(e, t, r) {
  var n = r === void 0 ? {} : r, o = n.compare, u = n.operations;
  return ue(e, t, {
    compare: o,
    operations: Object.assign({}, Dn, u || {})
  });
}, Wn = function(e, t) {
  t === void 0 && (t = {});
  var r = Rn(e, null, t);
  return cn(r);
};
function Ge(e, t, r = "g") {
  const n = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\"];
  return t = t.replace(new RegExp(`(\\${n.join("|\\")})`, r), "\\$1"), t = t.replace(/%/g, ".*").replace(/_/g, "."), RegExp(`^${t}$`, r).test(e);
}
function jt(e, t) {
  return Ge(e, t, "ig");
}
function Gn(e, t, r) {
  return Oe((n) => Ge(n, e), t, r);
}
function tt(e, t, r) {
  return Oe((n) => !Ge(n, e), t, r);
}
function rt(e, t, r) {
  return Oe((n) => jt(n, e), t, r);
}
function xn(e, t, r) {
  return Oe((n) => !jt(n, e), t, r);
}
const Qn = {
  $like: Gn,
  $notLike: tt,
  $notlike: tt,
  $ilike: rt,
  $iLike: rt,
  $notILike: xn
}, Un = ["$sort", "$limit", "$skip", "$select"], Vn = [
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
function kt(e) {
  const {
    idField: t,
    itemStorage: r,
    tempStorage: n,
    cloneStorage: o,
    addItemToStorage: u,
    paramsForServer: i = [],
    whitelist: s = [],
    customSiftOperators: a = {}
  } = e, c = Object.assign({}, Qn, a), l = m(() => Vn.concat(s || []).concat(Object.keys(c))), d = (y, O = []) => {
    y = { ...C(y) };
    const p = i, w = oe.omit(y.query || {}, ...p), { query: $, filters: P } = Ht(w, {
      operators: l.value
    });
    let E = O.concat(r.list.value);
    return n && y.temps && E.push(...n.list.value), P.$or && ($.$or = P.$or), P.$and && ($.$and = P.$and), E = E.filter(Wn($, { operations: c })), { values: E, filters: P };
  };
  function g(y) {
    const O = m(() => {
      const p = C(y);
      p.query && (p.query = W(p.query));
      const w = d(p), $ = w.filters;
      let P = w.values;
      const E = P.length;
      return $.$sort && P.sort(zt($.$sort)), $.$skip && (P = P.slice($.$skip)), typeof $.$limit < "u" && (P = P.slice(0, $.$limit)), {
        total: E,
        limit: $.$limit || 0,
        skip: $.$skip || 0,
        data: p.clones ? P.map((F) => F.clone ? F.clone(void 0, { useExisting: !0 }) : F) : P
      };
    });
    return X({
      total: m(() => O.value.total),
      limit: m(() => O.value.limit),
      skip: m(() => O.value.skip),
      data: m(() => O.value.data)
    });
  }
  function f(y) {
    const O = g(y);
    return m(() => O.data[0] || null);
  }
  function S(y) {
    return m(() => {
      if (y = { ...C(y) }, !y.query)
        throw new Error("params must contain a query object");
      return y.query = oe.omit(y.query, ...Un), g(y).total;
    });
  }
  const h = (y, O) => m(() => {
    const p = C(y);
    O = Z(C(O) || {}), O.query && (O.query = W(O.query));
    let w = null;
    const $ = r.getItem(p) && ze(O, t)(r.getItem(p)), P = n && n.getItem(p) && ze(O, "__tempId")(n.getItem(p));
    return $ ? w = $ : P && (w = P), O.clones && w.clone ? w.clone(void 0, { useExisting: !0 }) : w || null;
  });
  function _(y) {
    const { items: O, isArray: p } = Y(C(y)), w = O.map(($) => u(C($)));
    return p ? w : w[0];
  }
  function I(y, O = {}, p = {}) {
    const w = C(y), $ = C(O), P = C(p);
    function E(F) {
      return F.map((A) => {
        if (A = C(A), (typeof A == "number" || typeof A == "string") && (A = h(A).value), A == null)
          return null;
        const N = { ...A, ...$ };
        return u(N);
      }).filter((A) => A);
    }
    if (w === null) {
      if (P != null && P.query && !Object.keys(P == null ? void 0 : P.query).length)
        throw new Error(
          'cannot perform multiple patchInStore with an empty query. You must explicitly provide a query. To patch all items, try using a query that matches all items, like "{ id: { $exists: true } }"'
        );
      const F = g(P).data;
      return E(F);
    } else {
      const { items: F, isArray: M } = Y(w), A = E(F);
      return M ? A : A[0];
    }
  }
  function v(y, O) {
    if (y === null && (O != null && O.query) && Object.keys(O == null ? void 0 : O.query).length) {
      const p = o ? o.list.value : [], { values: w } = d(O, p);
      return b(w);
    } else
      y !== null && b(y);
    return y;
  }
  function b(y) {
    const { items: O } = Y(y);
    return O.forEach((p) => {
      if (typeof p == "string")
        r.removeItem(p), n == null || n.removeItem(p), o == null || o.removeItem(p);
      else {
        if (p.__isClone)
          return o == null ? void 0 : o.remove(p);
        if (p.__isTemp)
          return n == null ? void 0 : n.remove(p);
        r.remove(p), n == null || n.remove(p), o == null || o.remove(p);
      }
    }), y;
  }
  return {
    findInStore: g,
    findOneInStore: f,
    countInStore: S,
    getFromStore: h,
    createInStore: _,
    patchInStore: I,
    removeFromStore: v
  };
}
function xe({
  getId: e,
  onRead: t = (o) => o,
  beforeWrite: r = (o) => o,
  assign: n = (o, u) => Object.assign(o, u)
}) {
  const o = X({}), u = m(() => Object.values(o)), i = m(() => Object.keys(o)), s = (v) => !!o[v], a = (v) => {
    const b = e(v);
    return s(b);
  }, c = (v) => {
    const b = o[v];
    return b ? t(b) : null;
  }, l = (v, b) => {
    if (v == null)
      throw new Error("item has no id");
    return R(o, v, r(b)), c(v);
  }, d = (v) => {
    const b = e(v);
    return l(b, v);
  }, g = (v) => {
    const b = e(v), y = c(b);
    return y ? n(y, v) : l(b, v), c(b);
  }, f = (v) => {
    const b = e(v);
    return c(b);
  }, S = (v) => {
    const b = s(v);
    return b && G(o, v), b;
  };
  return { byId: o, list: u, ids: i, getId: e, clear: () => {
    Object.keys(o).forEach((v) => {
      G(o, v);
    });
  }, has: a, hasItem: s, get: f, getItem: c, set: d, setItem: l, remove: (v) => {
    const b = e(v);
    return S(b);
  }, removeItem: S, getKeys: () => i.value, merge: g };
}
function Jn(e) {
  const { getId: t, itemStorage: r, onRead: n, beforeWrite: o } = e, u = xe({
    getId: t,
    onRead: n,
    beforeWrite: o
  });
  function i(s) {
    return u.has(s) && u.remove(s), r.set(s);
  }
  return { tempStorage: u, moveTempToItems: i };
}
function Kn(e) {
  const { itemStorage: t, tempStorage: r, onRead: n, beforeWrite: o } = e, u = (f, S = {}, { isClone: h }) => Z(Object.assign({}, f, S, { __isClone: h })), i = e.makeCopy || u, s = xe({
    getId: (f) => {
      const S = t.getId(f);
      return S ?? r.getId(f);
    },
    onRead: n,
    beforeWrite: o
  });
  function a(f) {
    return f.__isClone || (t.has(f) ? t.merge(f) : r.has(f) && r.merge(f)), t.get(f) || r.get(f) || (t.getId(f) != null ? t.merge(f) : r.getId(f) != null && r.merge(f)), t.get(f) || r.get(f);
  }
  function c(f, S = {}, h = {}) {
    const _ = s.get(f);
    return a(f), _ && h.useExisting ? _ : d(f, S);
  }
  function l(f, S = {}) {
    const h = t.getId(f), _ = i(f, S, { isClone: !1 });
    return h ? (t.merge(_), t.get(_)) : (r.merge(_), r.get(_));
  }
  function d(f, S = {}) {
    const h = a(f);
    if (s.get(f)) {
      const I = i(h, S, { isClone: !0 });
      Object.keys(h).forEach((v) => {
        h[v] == null && G(I, v);
      }), s.merge(I);
    } else {
      const I = i(f, S, { isClone: !0 });
      s.set(I);
    }
    return s.get(f);
  }
  function g(f) {
    return Object.defineProperty(f, "__isClone", {
      writable: !1,
      enumerable: !1,
      value: !0
    }), f;
  }
  return {
    cloneStorage: s,
    clone: c,
    commit: l,
    reset: d,
    markAsClone: g
  };
}
function Et(e) {
  const { getIdField: t, setupInstance: r } = e, n = (f, S = {}, { isClone: h }) => {
    const _ = Z(f);
    return Object.assign(_, S), Object.defineProperty(_, "__isTemp", {
      configurable: !0,
      enumerable: !1,
      get() {
        return this[this.__idField] == null;
      }
    }), le(_, {
      __isClone: h,
      __tempId: f.__tempId
    });
  }, o = xe({
    getId: t,
    beforeWrite: r,
    onRead: r
  }), { tempStorage: u, moveTempToItems: i } = Jn({
    getId: (f) => f.__tempId,
    itemStorage: o,
    beforeWrite: r,
    onRead: r
  }), { cloneStorage: s, clone: a, commit: c, reset: l, markAsClone: d } = Kn({
    itemStorage: o,
    tempStorage: u,
    makeCopy: n,
    beforeWrite: (f) => (d(f), r(f)),
    onRead: r
  });
  return {
    itemStorage: o,
    tempStorage: u,
    cloneStorage: s,
    clone: a,
    commit: c,
    reset: l,
    addItemToStorage: (f) => {
      const S = t(f);
      return f = r(f), f.__isClone ? s.merge(f) : S != null && f.__tempId != null ? i(f) : S != null ? o.merge(f) : u && f.__tempId != null ? u == null ? void 0 : u.merge(f) : o.merge(f);
    }
  };
}
function zn() {
  return {
    skipGetIfExists: !1
  };
}
function No(e) {
  const t = Object.assign({}, zn(), e), { idField: r, customSiftOperators: n } = t, { itemStorage: o, tempStorage: u, cloneStorage: i, clone: s, commit: a, reset: c, addItemToStorage: l } = Et({
    getIdField: (p) => p[r],
    setupInstance: v
  }), { findInStore: d, findOneInStore: g, countInStore: f, getFromStore: S, createInStore: h, patchInStore: _, removeFromStore: I } = kt({
    idField: r,
    itemStorage: o,
    tempStorage: u,
    cloneStorage: i,
    addItemToStorage: l,
    customSiftOperators: n
  });
  function v(p) {
    const w = gt(p, {
      idField: r,
      clonesById: i.byId,
      clone: s,
      commit: a,
      reset: c,
      createInStore: h,
      removeFromStore: I
    });
    if (p.__isSetup)
      return w;
    {
      const $ = t.setupInstance ? t.setupInstance(w) : w;
      return Object.defineProperty($, "__isSetup", { value: !0 }), $;
    }
  }
  const b = m(() => !!C(t.ssr));
  function y() {
    o.clear(), u.clear(), i.clear();
  }
  return {
    new: v,
    idField: r,
    isSsr: b,
    // items
    itemsById: o.byId,
    items: o.list,
    itemIds: o.ids,
    // temps
    tempsById: u.byId,
    temps: u.list,
    tempIds: u.ids,
    // clones
    clonesById: i.byId,
    clones: i.list,
    cloneIds: i.ids,
    clone: s,
    commit: a,
    reset: c,
    // local queries
    findInStore: d,
    findOneInStore: g,
    countInStore: f,
    createInStore: h,
    getFromStore: S,
    patchInStore: _,
    removeFromStore: I,
    clearAll: y
  };
}
var At = {}, z = {};
Object.defineProperty(z, "__esModule", { value: !0 });
z.createDebug = z.setDebug = z.noopDebug = void 0;
const ce = {};
function qt() {
  return function() {
  };
}
z.noopDebug = qt;
let Ct = qt;
function Hn(e) {
  Ct = e, Object.keys(ce).forEach((t) => {
    ce[t] = e(t);
  });
}
z.setDebug = Hn;
function Yn(e) {
  return ce[e] || (ce[e] = Ct(e)), (...t) => ce[e](...t);
}
z.createDebug = Yn;
(function(e) {
  var t = de && de.__createBinding || (Object.create ? function(i, s, a, c) {
    c === void 0 && (c = a);
    var l = Object.getOwnPropertyDescriptor(s, a);
    (!l || ("get" in l ? !s.__esModule : l.writable || l.configurable)) && (l = { enumerable: !0, get: function() {
      return s[a];
    } }), Object.defineProperty(i, c, l);
  } : function(i, s, a, c) {
    c === void 0 && (c = a), i[c] = s[a];
  }), r = de && de.__exportStar || function(i, s) {
    for (var a in i)
      a !== "default" && !Object.prototype.hasOwnProperty.call(s, a) && t(s, i, a);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.createSymbol = e.isPromise = e._ = e.stripSlashes = void 0;
  function n(i) {
    return i.replace(/^(\/+)|(\/+)$/g, "");
  }
  e.stripSlashes = n, e._ = {
    each(i, s) {
      i && typeof i.forEach == "function" ? i.forEach(s) : e._.isObject(i) && Object.keys(i).forEach((a) => s(i[a], a));
    },
    some(i, s) {
      return Object.keys(i).map((a) => [i[a], a]).some(([a, c]) => s(a, c));
    },
    every(i, s) {
      return Object.keys(i).map((a) => [i[a], a]).every(([a, c]) => s(a, c));
    },
    keys(i) {
      return Object.keys(i);
    },
    values(i) {
      return e._.keys(i).map((s) => i[s]);
    },
    isMatch(i, s) {
      return e._.keys(s).every((a) => i[a] === s[a]);
    },
    isEmpty(i) {
      return e._.keys(i).length === 0;
    },
    isObject(i) {
      return typeof i == "object" && !Array.isArray(i) && i !== null;
    },
    isObjectOrArray(i) {
      return typeof i == "object" && i !== null;
    },
    extend(i, ...s) {
      return Object.assign(i, ...s);
    },
    omit(i, ...s) {
      const a = e._.extend({}, i);
      return s.forEach((c) => delete a[c]), a;
    },
    pick(i, ...s) {
      return s.reduce((a, c) => (i[c] !== void 0 && (a[c] = i[c]), a), {});
    },
    // Recursively merge the source object into the target object
    merge(i, s) {
      return e._.isObject(i) && e._.isObject(s) && Object.keys(s).forEach((a) => {
        e._.isObject(s[a]) ? (i[a] || Object.assign(i, { [a]: {} }), e._.merge(i[a], s[a])) : Object.assign(i, { [a]: s[a] });
      }), i;
    }
  };
  function o(i) {
    return e._.isObject(i) && typeof i.then == "function";
  }
  e.isPromise = o;
  function u(i) {
    return typeof Symbol < "u" ? Symbol.for(i) : i;
  }
  e.createSymbol = u, r(z, e);
})(At);
function Xn(e) {
  const { idField: t, isSsr: r } = e, n = e.defaultLimit || 10, o = j({});
  function u() {
    const { defaultLimit: c, defaultSkip: l } = o.value;
    o.value = { defaultLimit: c, defaultSkip: l };
  }
  function i({
    qid: c,
    response: l,
    query: d = {},
    preserveSsr: g = !1
  }) {
    var M, A;
    const { data: f, total: S } = l, h = f.map((N) => he(N, t)), _ = (/* @__PURE__ */ new Date()).getTime(), { queryId: I, queryParams: v, pageId: b, pageParams: y } = a({ qid: c, query: d });
    o.value[c] || R(o.value, c, {}), !K(d, "$limit") && K(l, "limit") && R(o.value, "defaultLimit", l.limit), !K(d, "$skip") && K(l, "skip") && R(o.value, "defaultSkip", l.skip);
    const O = {
      query: d,
      queryId: I,
      queryParams: v,
      pageId: b,
      pageParams: y,
      queriedAt: _,
      total: S
    }, p = (A = (M = o.value[c]) == null ? void 0 : M[I]) == null ? void 0 : A[b], w = o.value[c] || {};
    Object.assign(w, { mostRecent: O }), R(w, I, w[I] || {});
    const $ = {
      total: S,
      queryParams: v
    };
    R(w, I, Object.assign({}, w[I], $));
    const P = g ? p == null ? void 0 : p.ssr : r.value, E = {
      [b]: { pageParams: y, ids: h, queriedAt: _, ssr: !!P }
    };
    Object.assign(w[I], E);
    const F = Object.assign({}, o.value[c], w);
    R(o.value, c, F);
  }
  function s(c) {
    var h, _;
    const l = a(c), { qid: d, queryId: g, pageId: f } = l, S = (_ = (h = o.value[d]) == null ? void 0 : h[g]) == null ? void 0 : _[f];
    S.ssr = !1;
  }
  function a(c) {
    const l = W(c), { query: d = {} } = l, g = l.qid || "default", f = (d == null ? void 0 : d.$limit) || n, S = (d == null ? void 0 : d.$skip) || 0, h = f !== void 0 ? { $limit: f, $skip: S } : void 0, _ = h ? ve(h) : void 0, I = At._.omit(d, "$limit", "$skip"), v = ve(I);
    return {
      qid: g,
      query: d,
      queryId: v,
      queryParams: I,
      pageParams: h,
      pageId: _,
      isExpired: !1
    };
  }
  return {
    pagination: o,
    updatePaginationForQuery: i,
    unflagSsr: s,
    getQueryInfo: a,
    clearPagination: u
  };
}
function nt() {
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
function Zn() {
  const e = j(nt()), t = j({}), r = j({}), n = j({}), o = j({}), u = m(() => e.value.find > 0), i = m(() => e.value.count > 0), s = m(() => e.value.get > 0), a = m(() => e.value.create > 0 || Object.keys(t.value).length > 0), c = m(() => e.value.update > 0 || Object.keys(r.value).length > 0), l = m(() => e.value.patch > 0 || Object.keys(n.value).length > 0), d = m(() => e.value.remove > 0 || Object.keys(o.value).length > 0);
  function g(_, I) {
    I ? e.value[_]++ : e.value[_]--;
  }
  function f(_, I, v) {
    if (_ == null)
      return;
    let b;
    I === "create" ? b = t.value : I === "update" ? b = r.value : I === "patch" ? b = n.value : I === "remove" && (b = o.value), v ? R(b, _, !0) : G(b, _);
  }
  function S(..._) {
    _.forEach((I) => {
      I != null && (G(t.value, I), G(r.value, I), G(n.value, I), G(o.value, I));
    });
  }
  function h() {
    e.value = nt(), t.value = {}, r.value = {}, n.value = {}, o.value = {};
  }
  return {
    isPending: e,
    createPendingById: t,
    updatePendingById: r,
    patchPendingById: n,
    removePendingById: o,
    isFindPending: u,
    isCountPending: i,
    isGetPending: s,
    isCreatePending: a,
    isUpdatePending: c,
    isPatchPending: l,
    isRemovePending: d,
    setPending: g,
    setPendingById: f,
    unsetPendingById: S,
    clearAllPending: h
  };
}
function eo() {
  const e = X({
    created: {},
    patched: {},
    updated: {},
    removed: {}
  });
  function t(n, o) {
    const { items: u } = Y(n);
    u.forEach((i) => {
      e[o][i] ? r(n, o) : (R(e[o], i, !0), setTimeout(() => {
        r(n, o);
      }, 250));
    });
  }
  function r(n, o) {
    const { items: u } = Y(n);
    u.forEach((i) => {
      G(e[o], i);
    });
  }
  return { eventLocks: e, toggleEventLock: t, clearEventLock: r };
}
function to() {
  return {
    skipGetIfExists: !1
  };
}
function ro(e) {
  const t = Object.assign({}, to(), e), { idField: r, whitelist: n, paramsForServer: o, defaultLimit: u, customSiftOperators: i } = t, { itemStorage: s, tempStorage: a, cloneStorage: c, clone: l, commit: d, reset: g, addItemToStorage: f } = Et({
    getIdField: (L) => L[r],
    setupInstance: O
  }), { findInStore: S, findOneInStore: h, countInStore: _, getFromStore: I, createInStore: v, patchInStore: b, removeFromStore: y } = kt({
    idField: r,
    itemStorage: s,
    tempStorage: a,
    cloneStorage: c,
    addItemToStorage: f,
    whitelist: n,
    paramsForServer: o,
    customSiftOperators: i
  });
  function O(L) {
    const x = gt(L, {
      idField: r,
      clonesById: c.byId,
      clone: l,
      commit: d,
      reset: g,
      createInStore: v,
      removeFromStore: y
    });
    if (L.__isSetup)
      return x;
    {
      const H = t.setupInstance ? t.setupInstance(x) : x;
      return Object.defineProperty(H, "__isSetup", { value: !0 }), H;
    }
  }
  const p = Zn(), w = m(() => !!C(t.ssr)), { pagination: $, clearPagination: P, updatePaginationForQuery: E, getQueryInfo: F, unflagSsr: M } = Xn({
    idField: r,
    isSsr: w,
    defaultLimit: u
  });
  function A() {
    s.clear(), a.clear(), c.clear(), P(), p.clearAllPending();
  }
  const N = eo();
  return {
    new: O,
    idField: r,
    isSsr: w,
    defaultLimit: u,
    // items
    itemsById: s.byId,
    items: s.list,
    itemIds: s.ids,
    // temps
    tempsById: a.byId,
    temps: a.list,
    tempIds: a.ids,
    // clones
    clonesById: c.byId,
    clones: c.list,
    cloneIds: c.ids,
    clone: l,
    commit: d,
    reset: g,
    // local queries
    findInStore: S,
    findOneInStore: h,
    countInStore: _,
    createInStore: v,
    getFromStore: I,
    patchInStore: b,
    removeFromStore: y,
    clearAll: A,
    // server options
    whitelist: n,
    paramsForServer: o,
    // server pagination
    pagination: $,
    updatePaginationForQuery: E,
    unflagSsr: M,
    getQueryInfo: F,
    ...p,
    ...N
  };
}
const U = {};
function no(e) {
  return `is${e.slice(0, 1).toUpperCase()}${e.slice(1, e.length - 1)}Pending`;
}
function oo(e) {
  return {
    promise: null,
    isResolved: !1,
    getter: no(e)
  };
}
function Do(e, t) {
  return U[t] = U[t] || oo(t), (!U[t].promise || U[t].isResolved) && (U[t].promise = new Promise((r) => {
    const n = me(
      () => e[U[t].getter],
      async (o) => {
        o || setTimeout(() => {
          n(), U[t].isResolved = !0, r(U[t].isResolved);
        }, 0);
      },
      { immediate: !0 }
    );
  })), U[t].promise;
}
var io = so;
function so(e, t, r, n) {
  var o, u, i;
  return function() {
    if (i = this, u = Array.prototype.slice.call(arguments), o && (r || n))
      return;
    if (!r)
      return c(), o = setTimeout(a, t), o;
    o = setTimeout(c, t), e.apply(i, u);
    function a() {
      c(), e.apply(i, u);
    }
    function c() {
      clearTimeout(o), o = null;
    }
  };
}
const Le = /* @__PURE__ */ ge(io);
function uo(e) {
  if (!e.service || e.handleEvents === !1)
    return;
  const t = e.service, r = j({}), n = j({}), o = Le(
    async () => {
      const c = Object.values(r.value);
      c.length !== 0 && (t.store.createInStore(c), r.value = {});
    },
    e.debounceEventsTime || 20,
    void 0,
    e.debounceEventsGuarantee
  );
  function u(c) {
    const l = he(c, t.store.idField);
    l && (R(r, l, c), K(n.value, l) && G(n, l), o());
  }
  const i = Le(
    () => {
      const c = Object.values(n.value);
      c.length !== 0 && (t.store.removeFromStore(c), n.value = {});
    },
    e.debounceEventsTime || 20,
    void 0,
    e.debounceEventsGuarantee
  );
  function s(c) {
    const l = he(c, t.store.idField);
    l && (R(n, l, c), K(r.value, l) && G(r.value, l), i());
  }
  function a(c, l) {
    var f;
    const d = (f = e.handleEvents) == null ? void 0 : f[c];
    if (d === !1)
      return;
    const g = he(l, t.store.idField);
    if (c !== "created" && t.store.eventLocks[c][g]) {
      t.store.toggleEventLock(g, c);
      return;
    }
    d && !d(l, { service: t }) || (e.debounceEventsTime ? c === "removed" ? s(l) : u(l) : c === "removed" ? t.store.removeFromStore(l) : t.store.createInStore(l));
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
function ao() {
  return async (e, t) => {
    if (e.params.query && (e.params.query = W(e.params.query)), e.method === "find") {
      const r = e.params.query || {};
      r.$limit == null && (r.$limit = e.service.store.defaultLimit), r.$skip == null && (r.$skip = 0), e.params.query = r;
    }
    t && await t();
  };
}
function co() {
  return async (e, t) => {
    var o, u, i;
    const r = e.service.store;
    let n;
    if (!r.isSsr) {
      const s = e.method === "find" ? ((o = e.params.query) == null ? void 0 : o.$limit) === 0 ? "count" : "find" : e.method;
      r.setPending(s, !0), e.id != null && s !== "get" && r.setPendingById(e.id, s, !0);
      const a = (u = e.data) == null ? void 0 : u.__isTemp, c = (i = e.data) == null ? void 0 : i.__tempId;
      a && s === "create" && r.setPendingById(e.data.__tempId, s, !0), n = () => {
        r.setPending(s, !1);
        const l = e.id != null ? e.id : c;
        l != null && s !== "get" && r.setPendingById(l, s, !1);
      };
    }
    try {
      await t();
    } catch (s) {
      throw n && n(), s;
    }
    n && n();
  };
}
function lo() {
  return async (e, t) => {
    const { id: r, method: n } = e, o = e.service.store, u = ["update", "patch", "remove"].includes(n), s = {
      update: "updated",
      patch: "patched",
      remove: "removed"
    }[n];
    u && r && !o.isSsr && o.toggleEventLock(r, s), await t(), u && r && !o.isSsr && o.clearEventLock(r, s);
  };
}
function fo() {
  return async (e, t) => {
    const { method: r, params: n } = e, o = e.service.store;
    if (r === "patch" && n.data && (e.data = n.data), t && await t(), !e.params.skipStore) {
      if (r === "remove")
        o.removeFromStore(e.result);
      else if (r === "create") {
        const u = Lr(e.data, e.result);
        e.result = o.createInStore(u);
      } else
        r === "find" && Array.isArray(e.result.data) ? e.result.data = o.createInStore(e.result.data) : e.result = o.createInStore(e.result);
      if (r === "find" && e.result.total) {
        const { qid: u = "default", query: i, preserveSsr: s = !1 } = e.params;
        o.updatePaginationForQuery({ qid: u, response: e.result, query: i, preserveSsr: s });
      }
    }
  };
}
function po() {
  return async (e, t) => {
    var r;
    t && await t(), e.service.new && (Array.isArray((r = e.result) == null ? void 0 : r.data) ? e.result.data = e.result.data.map((n) => e.service.new(n)) : Array.isArray(e.result) ? e.result = e.result.map((n) => e.service.new(n)) : e.result = e.service.new(e.result));
  };
}
function ho() {
  return async (e, t) => {
    const r = e.service.store;
    if (e.method === "find") {
      const { params: n } = e, o = r.getQueryInfo(n), u = r.pagination[o.qid], i = u == null ? void 0 : u[o.queryId], s = i == null ? void 0 : i[o.pageId];
      s != null && s.ssr && (e.result = {
        data: s.ids.map((a) => r.getFromStore(a).value),
        limit: s.pageParams.$limit,
        skip: s.pageParams.$skip,
        total: i.total,
        fromSsr: !0
      }, n.preserveSsr || r.unflagSsr(n));
    }
    t && await t();
  };
}
function vo() {
  return async (e, t) => {
    if (e.method === "find") {
      const { params: r } = e, { query: n = {} } = r;
      (r.paginate === !0 || K(n, "$limit") || K(n, "$skip")) && (r.paginate = { default: !0 });
    }
    t && await t();
  };
}
function yo() {
  return async (e, t) => {
    const { params: r, id: n } = e, o = e.service.store;
    if (e.method === "get" && n != null) {
      const u = r.skipGetIfExists || o.skipGetIfExists;
      delete r.skipGetIfExists;
      const i = o.getFromStore(e.id, r);
      i && u && (e.result = i);
    }
    await t();
  };
}
function mo() {
  return async (e, t) => {
    const { method: r, data: n, params: o, id: u } = e, i = e.service.store;
    let s, a;
    const c = r === "patch" && !o.data && (n.__isClone || o.diff);
    if (c) {
      a = n;
      const l = i.getFromStore(u).value, d = Fr(l, a, o.diff);
      if (s = Z(l), o.eager !== !1 && n.commit(d), o.with) {
        const g = Ee(a, o.with);
        typeof o.with != "string" && !Array.isArray(o.with) && Object.assign(g, o.with), Object.assign(d, g);
      }
      e.data = d, Object.keys(e.data).length === 0 && (e.result = a);
    } else
      e.data = Z(n);
    try {
      await t();
    } catch (l) {
      throw c && a && a.commit(s), l;
    }
  };
}
function go() {
  return [
    ao(),
    co(),
    lo(),
    fo(),
    po(),
    ho(),
    vo(),
    yo(),
    mo()
  ];
}
function So(e, t) {
  if (e.__isServiceInstance)
    return e;
  const { service: r, store: n } = t, o = (u, i) => Object.assign(u, i);
  return vt(e, {
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
  }), le(e, {
    __isServiceInstance: !0,
    save(u) {
      return this[n.idField] != null ? this.patch(u) : this.create(u);
    },
    create(u) {
      return r.create(this, u).then((i) => o(this, i));
    },
    patch(u) {
      const i = this[n.idField];
      if (i === void 0)
        throw new Yt("the item has no id");
      return r.patch(i, this, u).then((s) => o(this, s));
    },
    remove(u) {
      if (this.__isTemp)
        return n.removeFromStore(this.__tempId), Promise.resolve(this);
      {
        const i = this[n.idField];
        return r.remove(i, u).then((s) => o(this, s));
      }
    }
  }), e;
}
function Oo(e, t) {
  const r = {};
  Object.keys(t).forEach((n) => {
    const o = e[n], u = t[n], i = this.service(u);
    if (i || console.error(`there is no service at path ${u}. Check your storeAssociated config`, e, t), o && i) {
      const s = i.createInStore(o);
      r[n] = s;
    }
  }), le(e, r);
}
function Io(e, t, r) {
  const n = JSON.stringify(t);
  r.setItem(e, n);
}
function bo(e, t) {
  const r = t.getItem(e.$id);
  if (r) {
    const n = JSON.parse(r) || {};
    Object.assign(e, n);
  }
}
function wo(e, t, r = window.localStorage) {
  bo(e, r);
  const n = Le(Io, 500), o = m(() => oe.pick(e, ...t));
  me(o, (u) => n(e.$id, u, r), { deep: !0 });
}
function _o(e = window.localStorage) {
  const t = "service:";
  for (let r = 0; r < e.length; r++) {
    const n = e.key(r);
    n != null && n.startsWith(t) && e.removeItem(n);
  }
}
function Ro(e, t) {
  const r = Jt();
  r.defaultService = function(o) {
    var O;
    const u = ((O = t.services) == null ? void 0 : O[o]) || {}, i = u.idField || t.idField, s = u.defaultLimit || t.defaultLimit || 10, a = (u.whitelist || []).concat(t.whitelist || []), c = (u.paramsForServer || []).concat(t.paramsForServer || []), l = u.handleEvents || t.handleEvents, d = u.debounceEventsTime != null ? u.debounceEventsTime : t.debounceEventsTime, g = u.debounceEventsGuarantee != null ? u.debounceEventsGuarantee : t.debounceEventsGuarantee, f = Object.assign(
      {},
      u.customSiftOperators || {},
      t.customSiftOperators || {}
    );
    function S(p) {
      const w = Object.assign(p, t.customizeStore ? t.customizeStore(p) : p);
      return Object.assign(
        w,
        u.customizeStore ? u.customizeStore(w) : w
      );
    }
    function h(p) {
      const w = r.service(o), $ = So(p, {
        service: w,
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        store: v
      }), P = { app: r, service: r.service(o), servicePath: o }, E = t.setupInstance ? t.setupInstance($, P) : $;
      return u.setupInstance ? u.setupInstance(p, P) : E;
    }
    const _ = `service:${o}`, v = Kt(_, () => {
      const p = ro({
        idField: i,
        defaultLimit: s,
        whitelist: a,
        paramsForServer: c,
        customSiftOperators: f,
        ssr: t.ssr,
        setupInstance: h
      }), w = S(p);
      return { ...p, ...w };
    })(t.pinia);
    if (!t.ssr && t.storage) {
      const p = ["itemsById", "pagination"], w = t.syncWithStorage === !0 ? p : Array.isArray(t.syncWithStorage) ? t.syncWithStorage : [], $ = u.syncWithStorage === !0 ? p : Array.isArray(u.syncWithStorage) ? u.syncWithStorage : [], P = [.../* @__PURE__ */ new Set([...w, ...$])];
      P.length > 0 && wo(v, P, t.storage);
    }
    const b = e.service(o), y = new zr(b, { store: v, servicePath: o });
    return uo({
      service: y,
      debounceEventsTime: d,
      debounceEventsGuarantee: g,
      handleEvents: l
    }), y;
  };
  const n = (o) => {
    o.hooks({
      around: go()
    });
  };
  return r.mixins.push(n), vt(r, {
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
        return _o(t.storage);
    }
  }), Object.assign(r, { storeAssociated: Oo }), r;
}
class Wo extends Xt {
  async request(t, r) {
    const n = Object.assign({}, t, r.connection);
    n.headers = Object.assign({ Accept: "application/json" }, this.options.headers, n.headers), t.body && (n.body = t.body);
    try {
      const o = await this.connection.raw(t.url, n), { _data: u, status: i } = o;
      return i === 204 ? null : u;
    } catch (o) {
      throw o.data;
    }
  }
}
const Go = {
  "feathers-pinia": [
    "useServiceInstance",
    "useInstanceDefaults",
    "useDataStore",
    "useAuth",
    "createPiniaClient",
    "defineGetters",
    "defineSetters",
    "defineValues"
  ]
};
function Te(e) {
  this.message = e;
}
Te.prototype = new Error(), Te.prototype.name = "InvalidCharacterError";
var ot = typeof window < "u" && window.atob && window.atob.bind(window) || function(e) {
  var t = String(e).replace(/=+$/, "");
  if (t.length % 4 == 1)
    throw new Te("'atob' failed: The string to be decoded is not correctly encoded.");
  for (var r, n, o = 0, u = 0, i = ""; n = t.charAt(u++); ~n && (r = o % 4 ? 64 * r + n : n, o++ % 4) ? i += String.fromCharCode(255 & r >> (-2 * o & 6)) : 0)
    n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(n);
  return i;
};
function $o(e) {
  var t = e.replace(/-/g, "+").replace(/_/g, "/");
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
      throw "Illegal base64url string!";
  }
  try {
    return function(r) {
      return decodeURIComponent(ot(r).replace(/(.)/g, function(n, o) {
        var u = o.charCodeAt(0).toString(16).toUpperCase();
        return u.length < 2 && (u = "0" + u), "%" + u;
      }));
    }(t);
  } catch {
    return ot(t);
  }
}
function ye(e) {
  this.message = e;
}
function Po(e, t) {
  if (typeof e != "string")
    throw new ye("Invalid token specified");
  var r = (t = t || {}).header === !0 ? 0 : 1;
  try {
    return JSON.parse($o(e.split(".")[r]));
  } catch (n) {
    throw new ye("Invalid token specified: " + n.message);
  }
}
ye.prototype = new Error(), ye.prototype.name = "InvalidTokenError";
function xo(e) {
  const { api: t, servicePath: r, skipTokenCheck: n } = e, o = r ? t.service(r) : null, u = e.entityKey || "user", i = j(), s = async () => {
  }, a = async (q) => {
    throw q;
  }, c = e.onSuccess || s, l = e.onError || a, d = e.onInitSuccess || s, g = e.onInitError || s, f = e.onLogoutSuccess || s, S = e.onLogoutError || a, h = j(null), _ = m(() => o && (o == null ? void 0 : o.getFromStore(h)).value || null), I = j(null), v = () => I.value = null, b = Ye(), y = m(() => !!b.count.value), O = j(!1), p = (q) => {
    const L = q[u];
    if (o && L) {
      const x = o.store.createInStore(L);
      h.value = x[o.store.idField] || x.__tempId;
    }
    return O.value = !0, q;
  }, w = async (q) => (b.add(), v(), i.value = t.authenticate(q).then(p).then(async (L) => await c(L) || L).catch((L) => (I.value = L, l(L))).finally(() => {
    b.sub();
  }), i.value), $ = (q) => {
    try {
      const L = Po(q);
      return (/* @__PURE__ */ new Date()).getTime() > L.exp * 1e3;
    } catch {
      return !1;
    }
  }, P = j(!1), E = async () => (b.add(), i.value = t.reAuthenticate().then(p).then(async (q) => await d(q) || q).catch((q) => (q.value = q, g(q))).finally(() => {
    b.sub(), P.value = !0;
  }), i.value), F = Ye(), M = m(() => !!F.count.value), A = async () => (F.add(), t.logout().then((q) => (h.value = null, O.value = !1, q)).then(f).catch((q) => (q.value = q, S(q))).finally(() => F.sub())), N = j(null);
  return {
    user: _,
    error: I,
    isPending: y,
    isLogoutPending: M,
    isInitDone: P,
    isAuthenticated: O,
    loginRedirect: N,
    getPromise: () => i.value,
    isTokenExpired: $,
    authenticate: w,
    reAuthenticate: E,
    logout: A,
    clearError: v
  };
}
export {
  Wo as OFetch,
  zr as PiniaService,
  _o as clearStorage,
  Ro as createPiniaClient,
  vt as defineGetters,
  Bo as defineSetters,
  le as defineValues,
  lo as eventLocks,
  Go as feathersPiniaAutoImport,
  go as feathersPiniaHooks,
  bo as hydrateStore,
  po as makeModelInstances,
  vo as normalizeFind,
  co as setPending,
  yo as skipGetIfExists,
  Oo as storeAssociated,
  fo as syncStore,
  wo as syncWithStorage,
  Et as useAllStorageTypes,
  xo as useAuth,
  No as useDataStore,
  Jr as useFind,
  Kr as useGet,
  Mo as useInstanceDefaults,
  gt as useModelInstance,
  Do as useQueuePromise,
  Kn as useServiceClones,
  eo as useServiceEventLocks,
  uo as useServiceEvents,
  So as useServiceInstance,
  kt as useServiceLocal,
  Xn as useServicePagination,
  Zn as useServicePending,
  xe as useServiceStorage,
  ro as useServiceStore,
  Jn as useServiceTemps,
  Io as writeToStorage
};
//# sourceMappingURL=feathers-pinia.js.map
