import type { ConfigPlugin } from '@expo/config-plugins'
import { withAppDelegate } from '@expo/config-plugins'
import { WechatConfigProps } from '..'

const wxapiAppDelegateMm: ConfigPlugin<WechatConfigProps> = (config, props) => {
  const { iosProjectName } = props
  return withAppDelegate(config, (config) => {
    config.modResults.path = `ios/${iosProjectName}/AppDelegate.mm`
    config.modResults = customAppDelegateTransform(config, config.modResults)
    return config
  })
}

const customAppDelegateTransform = (config, appDelegate) => {
  if (appDelegate.contents.includes('// WxApi Config done by expo plugin')) {
    return appDelegate
  }
  appDelegate.contents = appDelegate.contents
    .replace(
      '- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {',
      '- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {\n[WXApi handleOpenURL:url delegate:self];'
    )
    .replace(
      'return [super application:application continueUserActivity:userActivity restorationHandler:restorationHandler] || result;',
      `
  BOOL wxApiResult = [WXApi handleOpenUniversalLink:userActivity delegate:self];
  return [super application:application continueUserActivity:userActivity restorationHandler:restorationHandler] || wxApiResult || result;
      `
    )
    .replace(
      '@end',
      `
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  return [WXApi handleOpenURL:url delegate:self];
}
// WxApi Config done by expo plugin

@end`
    )

  return appDelegate
}

export default wxapiAppDelegateMm
