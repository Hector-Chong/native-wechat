import type { ConfigPlugin } from '@expo/config-plugins'
import { withInfoPlist } from '@expo/config-plugins'

const wxapiInfoPlist: ConfigPlugin = (config) => {
  return withInfoPlist(config, (config) => {
    // Add or modify entries in the Info.plist as needed
    config.modResults.LSApplicationQueriesSchemes = ['weixin', 'wechat', 'weixinULAPI']

    return config
  })
}

export default wxapiInfoPlist
