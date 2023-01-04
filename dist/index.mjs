import { NativeModules as h, TurboModuleRegistry as g, NativeEventEmitter as p } from "react-native";
var d = function() {
  function e() {
    Object.defineProperty(this, "handlers", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.handlers = /* @__PURE__ */ new Map();
  }
  return Object.defineProperty(e.prototype, "getQueue", {
    enumerable: !1,
    configurable: !0,
    writable: !0,
    value: function(r) {
      var n = this.handlers.get(r);
      return n || (this.handlers.set(r, []), []);
    }
  }), Object.defineProperty(e.prototype, "listen", {
    enumerable: !1,
    configurable: !0,
    writable: !0,
    value: function(r, n) {
      var t = this.getQueue(r);
      this.handlers.set(r, t.concat(n));
    }
  }), Object.defineProperty(e.prototype, "once", {
    enumerable: !1,
    configurable: !0,
    writable: !0,
    value: function(r, n) {
      this.handlers.set(r, [n]);
    }
  }), Object.defineProperty(e.prototype, "clear", {
    enumerable: !1,
    configurable: !0,
    writable: !0,
    value: function(r) {
      this.handlers.set(r, []);
    }
  }), Object.defineProperty(e.prototype, "dispatch", {
    enumerable: !1,
    configurable: !0,
    writable: !0,
    value: function(r) {
      for (var n = [], t = 1; t < arguments.length; t++)
        n[t - 1] = arguments[t];
      var a = this.getQueue(r);
      a.forEach(function(s) {
        return s.apply(void 0, n);
      }), this.clear(r);
    }
  }), e;
}();
function v(e, r, n) {
  if (n || arguments.length === 2)
    for (var t = 0, a = r.length, s; t < a; t++)
      (s || !(t in r)) && (s || (s = Array.prototype.slice.call(r, 0, t)), s[t] = r[t]);
  return e.concat(s || Array.prototype.slice.call(r));
}
var u = function(e) {
  return function() {
    for (var r = [], n = 0; n < arguments.length; n++)
      r[n] = arguments[n];
    return new Promise(function(t, a) {
      e.apply(void 0, v(v([], r, !1), [function(s, l) {
        s ? a(l) : t(l);
      }], !1));
    });
  };
}, b = h.Wechat;
const i = g.get("Wechat") || b;
var c = new d(), f = !1, m = function(e) {
  return new Error("[Native Wechat]: (".concat(e.errorCode, ") ").concat(e.errorStr));
}, o = function(e) {
  if (!f)
    throw new Error("Please register SDK before invoking ".concat(e));
}, P = function() {
  var e = u(i.checkUniversalLinkReady);
  return e();
}, w = function(e) {
  if (!f) {
    f = !0, i.registerApp(e);
    var r = new p(i), n = r.addListener("NativeWechat_Response", function(t) {
      var a = t.errorCode ? m(t) : null;
      c.dispatch(t.type, a, t);
    });
    return function() {
      return n.remove();
    };
  }
}, M = function() {
  return u(i.isWechatInstalled)();
}, W = function(e) {
  return e === void 0 && (e = {
    scope: "snsapi_userinfo",
    state: ""
  }), o("sendAuthRequest"), i.sendAuthRequest(e), new Promise(function(r, n) {
    c.once("SendAuthResp", function(t, a) {
      return t ? n(t) : r(a);
    });
  });
}, R = function(e) {
  o("shareText");
  var r = u(i.shareText);
  return r(e);
}, N = function(e) {
  o("shareImage");
  var r = u(i.shareImage);
  return r(e);
}, A = function(e) {
  o("shareVideo");
  var r = u(i.shareVideo);
  return r(e);
}, S = function(e) {
  o("shareWebpage");
  var r = u(i.shareWebpage);
  return r(e);
}, C = function(e) {
  o("shareMiniProgram");
  var r = u(i.shareMiniProgram);
  return r(e);
}, E = function(e) {
  return o("requestPayment"), i.requestPayment(e), new Promise(function(r, n) {
    c.once("PayResp", function(t, a) {
      return t ? n(t) : r(a);
    });
  });
}, j = function(e) {
  o("requestSubscribeMessage");
  var r = u(i.requestSubscribeMessage);
  return e.scene = +e.scene, r(e);
}, k = function(e) {
  o("openCustomerService");
  var r = u(i.openCustomerService);
  return r(e);
}, O = function(e) {
  o("launchMiniProgram"), e.miniProgramType = +e.miniProgramType;
  var r = u(i.launchMiniProgram);
  return c.once("WXLaunchMiniProgramResp", function(n, t) {
    var a;
    if (!n)
      return (a = e.onNavBack) === null || a === void 0 ? void 0 : a.call(e, t);
  }), r(e);
}, T = i.getConstants();
export {
  T as NativeWechatConstants,
  P as checkUniversalLinkReady,
  M as isWechatInstalled,
  O as launchMiniProgram,
  k as openCustomerService,
  w as registerApp,
  E as requestPayment,
  j as requestSubscribeMessage,
  W as sendAuthRequest,
  N as shareImage,
  C as shareMiniProgram,
  R as shareText,
  A as shareVideo,
  S as shareWebpage
};
