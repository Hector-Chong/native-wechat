import { ConfigPlugin, withPlugins } from '@expo/config-plugins'
import { wxapiAndroid, wxapiAndroidManifest } from './androidPlugin'
import { wxapiAppDelegateH, wxapiAppDelegateMm, wxapiInfoPlist } from './iosPlugin'

export interface WechatConfigProps {
  wxAppId: string
  iosProjectName: string
  androidPackageName: string
}
//A config plugin for configuring 'native-wechat' for Expo apps.
const withWechatLib: ConfigPlugin<WechatConfigProps> = (config, props) => {
  const { wxAppId, iosProjectName, androidPackageName } = props
  return withPlugins(config, [
    //android plugins
    [wxapiAndroid, { androidPackageName }],
    wxapiAndroidManifest,
    //ios plugins TODO: add IOS plugins after making sured that native-wechat is ready for IOS
    [wxapiAppDelegateMm, { iosProjectName }],
    [wxapiAppDelegateH, { iosProjectName }],
    [wxapiInfoPlist, { wxAppId }],
  ])
}

export default withWechatLib
