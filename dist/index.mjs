import { TurboModuleRegistry as v, NativeModules as y, NativeEventEmitter as P } from "react-native";
import { useState as b, useEffect as w } from "react";
function M(e, t, n, r) {
  function s(a) {
    return a instanceof n ? a : new n(function(h) {
      h(a);
    });
  }
  return new (n || (n = Promise))(function(a, h) {
    function m(u) {
      try {
        l(r.next(u));
      } catch (d) {
        h(d);
      }
    }
    function g(u) {
      try {
        l(r.throw(u));
      } catch (d) {
        h(d);
      }
    }
    function l(u) {
      u.done ? a(u.value) : s(u.value).then(m, g);
    }
    l((r = r.apply(e, t || [])).next());
  });
}
class W {
  constructor() {
    Object.defineProperty(this, "handlers", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.handlers = /* @__PURE__ */ new Map();
  }
  getQueue(t) {
    const n = this.handlers.get(t);
    return n || (this.handlers.set(t, []), []);
  }
  listen(t, n) {
    const r = this.getQueue(t);
    this.handlers.set(t, r.concat(n));
  }
  once(t, n) {
    this.handlers.set(t, [n]);
  }
  clear(t) {
    this.handlers.set(t, []);
  }
  dispatch(t, ...n) {
    this.getQueue(t).forEach((s) => s(...n)), this.clear(t);
  }
}
const i = (e) => (...t) => new Promise((n, r) => {
  e(...t, (s, a) => {
    s ? r(a) : n(a);
  });
}), { Wechat: E } = y, o = v.get("Wechat") || E, q = () => {
  const [e, t] = b(!1);
  return w(() => {
    R().then(() => t(!0)).catch(() => t(!1));
  }, []), e;
}, f = new W();
let p = !1;
const S = (e) => new Error(`[Native Wechat]: (${e.errorCode}) ${e.errorStr}`), c = (e) => {
  if (!p)
    throw new Error(`Please register SDK before invoking ${e}`);
}, C = () => i(o.checkUniversalLinkReady)(), k = (e) => {
  p || (o.registerApp(e), p = !0);
  const n = new P(o).addListener("NativeWechat_Response", (r) => {
    const s = r.errorCode ? S(r) : null;
    f.dispatch(r.type, s, r);
  });
  return () => n.remove();
}, R = () => i(o.isWechatInstalled)(), x = (e = {
  scope: "snsapi_userinfo",
  state: ""
}) => {
  c("sendAuthRequest");
  const t = i(o.sendAuthRequest);
  return new Promise((n, r) => {
    t(e).catch(r), f.once("SendAuthResp", (s, a) => s ? r(s) : n(a));
  });
}, A = (e) => (c("shareText"), i(o.shareText)(e)), T = (e) => (c("shareImage"), i(o.shareImage)(e)), _ = (e) => (c("shareVideo"), i(o.shareVideo)(e)), L = (e) => (c("shareWebpage"), i(o.shareWebpage)(e)), Q = (e) => (c("shareMiniProgram"), i(o.shareMiniProgram)(e)), V = (e) => {
  c("requestPayment");
  const t = i(o.requestPayment);
  return new Promise((n, r) => M(void 0, void 0, void 0, function* () {
    t(e).catch(r), f.once("PayResp", (s, a) => s ? r(s) : n(a));
  }));
}, $ = (e) => {
  c("requestSubscribeMessage");
  const t = i(o.requestSubscribeMessage);
  return e.scene = +e.scene, t(e);
}, U = (e) => (c("openCustomerService"), i(o.openCustomerService)(e)), B = (e) => {
  c("launchMiniProgram"), e.miniProgramType = +e.miniProgramType;
  const t = i(o.launchMiniProgram);
  return f.once("WXLaunchMiniProgramResp", (n, r) => {
    var s;
    if (!n)
      return (s = e.onNavBack) === null || s === void 0 ? void 0 : s.call(e, r);
  }), t(e);
}, D = o.getConstants();
export {
  D as NativeWechatConstants,
  C as checkUniversalLinkReady,
  R as isWechatInstalled,
  B as launchMiniProgram,
  U as openCustomerService,
  k as registerApp,
  V as requestPayment,
  $ as requestSubscribeMessage,
  x as sendAuthRequest,
  T as shareImage,
  Q as shareMiniProgram,
  A as shareText,
  _ as shareVideo,
  L as shareWebpage,
  q as useWechatInstalled
};
