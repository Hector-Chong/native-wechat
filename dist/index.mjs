import { TurboModuleRegistry as l, NativeModules as g, NativeEventEmitter as d } from "react-native";
class f {
  constructor() {
    Object.defineProperty(this, "handlers", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.handlers = /* @__PURE__ */ new Map();
  }
  getQueue(t) {
    const r = this.handlers.get(t);
    return r || (this.handlers.set(t, []), []);
  }
  listen(t, r) {
    const n = this.getQueue(t);
    this.handlers.set(t, n.concat(r));
  }
  once(t, r) {
    this.handlers.set(t, [r]);
  }
  clear(t) {
    this.handlers.set(t, []);
  }
  dispatch(t, ...r) {
    this.getQueue(t).forEach((a) => a(...r)), this.clear(t);
  }
}
const i = (e) => (...t) => new Promise((r, n) => {
  e(...t, (a, h) => {
    a ? n(h) : r(h);
  });
}), { Wechat: m } = g, s = l.get("Wechat") || m, c = new f();
let u = !1;
const v = (e) => new Error(`[Native Wechat]: (${e.errorCode}) ${e.errorStr}`), o = (e) => {
  if (!u)
    throw new Error(`Please register SDK before invoking ${e}`);
}, P = () => i(s.checkUniversalLinkReady)(), b = (e) => {
  if (u)
    return;
  u = !0, s.registerApp(e);
  const r = new d(s).addListener("NativeWechat_Response", (n) => {
    const a = n.errorCode ? v(n) : null;
    c.dispatch(n.type, a, n);
  });
  return () => r.remove();
}, M = () => i(s.isWechatInstalled)(), y = (e = {
  scope: "snsapi_userinfo",
  state: ""
}) => (o("sendAuthRequest"), s.sendAuthRequest(e), new Promise((t, r) => {
  c.once("SendAuthResp", (n, a) => n ? r(n) : t(a));
})), R = (e) => (o("shareText"), i(s.shareText)(e)), W = (e) => (o("shareImage"), i(s.shareImage)(e)), w = (e) => (o("shareVideo"), i(s.shareVideo)(e)), N = (e) => (o("shareWebpage"), i(s.shareWebpage)(e)), S = (e) => (o("shareMiniProgram"), i(s.shareMiniProgram)(e)), E = (e) => (o("requestPayment"), s.requestPayment(e), new Promise((t, r) => {
  c.once("PayResp", (n, a) => n ? r(n) : t(a));
})), q = (e) => {
  o("requestSubscribeMessage");
  const t = i(s.requestSubscribeMessage);
  return e.scene = +e.scene, t(e);
}, C = (e) => (o("openCustomerService"), i(s.openCustomerService)(e)), k = (e) => {
  o("launchMiniProgram"), e.miniProgramType = +e.miniProgramType;
  const t = i(s.launchMiniProgram);
  return c.once("WXLaunchMiniProgramResp", (r, n) => {
    var a;
    if (!r)
      return (a = e.onNavBack) === null || a === void 0 ? void 0 : a.call(e, n);
  }), t(e);
}, A = s.getConstants();
export {
  A as NativeWechatConstants,
  P as checkUniversalLinkReady,
  M as isWechatInstalled,
  k as launchMiniProgram,
  C as openCustomerService,
  b as registerApp,
  E as requestPayment,
  q as requestSubscribeMessage,
  y as sendAuthRequest,
  W as shareImage,
  S as shareMiniProgram,
  R as shareText,
  w as shareVideo,
  N as shareWebpage
};
