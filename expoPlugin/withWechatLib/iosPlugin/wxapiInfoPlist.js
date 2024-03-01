"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_plugins_1 = require("@expo/config-plugins");
var wxapiInfoPlist = function (config) {
    return (0, config_plugins_1.withInfoPlist)(config, function (config) {
        // Add or modify entries in the Info.plist as needed
        config.modResults.LSApplicationQueriesSchemes = ['weixin', 'wechat', 'weixinULAPI'];
        return config;
    });
};
exports.default = wxapiInfoPlist;
