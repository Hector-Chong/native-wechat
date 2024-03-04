"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_plugins_1 = require("@expo/config-plugins");
var wxapiInfoPlist = function (config, props) {
    var wxAppId = props.wxAppId;
    return (0, config_plugins_1.withInfoPlist)(config, function (config) {
        // Add or modify entries in the Info.plist as needed
        config.modResults.CFBundleURLTypes = [
            {
                CFBundleURLName: 'weixin',
                CFBundleURLSchemes: [wxAppId], // Replace with your actual WeChat app ID
            },
        ];
        config.modResults.LSApplicationQueriesSchemes = ['weixin', 'wechat', 'weixinULAPI'];
        return config;
    });
};
exports.default = wxapiInfoPlist;
