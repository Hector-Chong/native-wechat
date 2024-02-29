"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_plugins_1 = require("@expo/config-plugins");
var wxapiAppDelegateMm = function (config) {
    return (0, config_plugins_1.withAppDelegate)(config, function (config) {
        config.modResults.path = 'ios/JohomePro/AppDelegate.mm';
        config.modResults = customAppDelegateTransform(config, config.modResults);
        return config;
    });
};
var customAppDelegateTransform = function (config, appDelegate) {
    if (appDelegate.contents.includes('// WxApi Config done by JohomePro plugin')) {
        return appDelegate;
    }
    appDelegate.contents = appDelegate.contents
        .replace('- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {', '- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {\n[WXApi handleOpenURL:url delegate:self];')
        .replace('return [super application:application continueUserActivity:userActivity restorationHandler:restorationHandler] || result;', "\n  BOOL wxApiResult = [WXApi handleOpenUniversalLink:userActivity delegate:self];\n  return [super application:application continueUserActivity:userActivity restorationHandler:restorationHandler] || wxApiResult || result;\n      ")
        .replace('@end', "\n- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {\n  return [WXApi handleOpenURL:url delegate:self];\n}\n// WxApi Config done by JohomePro plugin\n\n@end");
    return appDelegate;
};
exports.default = wxapiAppDelegateMm;
