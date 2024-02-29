import { ExpoConfig } from '@expo/config'
import { AndroidConfig, ConfigPlugin, withAndroidManifest } from '@expo/config-plugins'

const { getMainApplicationOrThrow } = AndroidConfig.Manifest

const wxapiAndroidManifest: ConfigPlugin = (expoconfig) => {
  return withAndroidManifest(expoconfig, async (manifestConfig) => {
    manifestConfig.modResults = await addCustomActivity(expoconfig, manifestConfig.modResults)

    //add new package into queries+ this remove the need to add the package into AndroidManifest.xml
    manifestConfig.modResults.manifest['queries'] = [
      ...manifestConfig.modResults.manifest['queries'],
      {
        package: [
          {
            $: {
              'android:name': 'com.tencent.mm',
            },
          },
        ],
      },
    ]

    return manifestConfig
  })
}

async function addCustomActivity(
  config: Pick<ExpoConfig, 'android'>,
  androidManifest: AndroidConfig.Manifest.AndroidManifest
): Promise<AndroidConfig.Manifest.AndroidManifest> {
  const mainApplication = getMainApplicationOrThrow(androidManifest)
  mainApplication.activity = [
    ...mainApplication.activity,
    {
      $: {
        'android:name': '.wxapi.WXEntryActivity',
        'android:exported': 'true',
        'android:label': '@string/app_name',
        'android:launchMode': 'singleTask',
        'android:taskAffinity': 'com.johome.pro',
        'android:theme': '@android:style/Theme.Translucent.NoTitleBar',
      },
    },
    {
      $: {
        'android:name': '.wxapi.WXPayEntryActivity',
        'android:exported': 'true',
        'android:label': '@string/app_name',
      },
    },
  ]
  return androidManifest
}

export default wxapiAndroidManifest
