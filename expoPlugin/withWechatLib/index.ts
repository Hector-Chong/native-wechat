import { ConfigPlugin, withPlugins } from '@expo/config-plugins'
import { wxapiAndroid, wxapiAndroidManifest } from './androidPlugin'

//A config plugin for configuring 'native-wechat' for Expo apps.
const withWechatLib: ConfigPlugin = (config) => {
  return withPlugins(config, [
    //android plugins
    wxapiAndroid,
    wxapiAndroidManifest,
  ])
}

export default withWechatLib
