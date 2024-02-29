"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_plugins_1 = require("@expo/config-plugins");
var androidPlugin_1 = require("./androidPlugin");
var iosPlugin_1 = require("./iosPlugin");
//A config plugin for configuring 'native-wechat' for Expo apps.
var withWechatLib = function (config) {
    return (0, config_plugins_1.withPlugins)(config, [
        //android plugins
        androidPlugin_1.wxapiAndroid,
        androidPlugin_1.wxapiAndroidManifest,
        //ios plugins TODO: add IOS plugins after making sured that native-wechat is ready for IOS
        iosPlugin_1.wxapiAppDelegateMm,
        iosPlugin_1.wxapiAppDelegateH,
        iosPlugin_1.wxapiInfoPlist,
    ]);
};
exports.default = withWechatLib;
