import type { ConfigPlugin } from '@expo/config-plugins'
import { withInfoPlist } from '@expo/config-plugins'

const wxapiInfoPlist: ConfigPlugin = (config) => {
  return withInfoPlist(config, (config) => {
    // Add or modify entries in the Info.plist as needed
    config.modResults.CFBundleURLTypes = [
      {
        CFBundleURLName: 'weixin',
        CFBundleURLSchemes: ['wx91390954a8079ed3'], // Replace with your actual WeChat app ID
      },
    ]

    config.modResults.LSApplicationQueriesSchemes = ['weixin', 'wechat', 'weixinULAPI']

    return config
  })
}

export default wxapiInfoPlist
