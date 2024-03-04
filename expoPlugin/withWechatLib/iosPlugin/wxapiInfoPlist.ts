import type { ConfigPlugin } from '@expo/config-plugins'
import { withInfoPlist } from '@expo/config-plugins'
import { WechatConfigProps } from '..'

const wxapiInfoPlist: ConfigPlugin<WechatConfigProps> = (config, props) => {
  const { wxAppId } = props
  return withInfoPlist(config, (config) => {
    // Add or modify entries in the Info.plist as needed
    config.modResults.CFBundleURLTypes = [
      {
        CFBundleURLName: 'weixin',
        CFBundleURLSchemes: [wxAppId], // Replace with your actual WeChat app ID
      },
    ]

    config.modResults.LSApplicationQueriesSchemes = ['weixin', 'wechat', 'weixinULAPI']

    return config
  })
}

export default wxapiInfoPlist
