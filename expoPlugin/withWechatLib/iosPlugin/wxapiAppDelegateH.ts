import type { ConfigPlugin } from '@expo/config-plugins'
import { withDangerousMod } from '@expo/config-plugins'
import * as fs from 'fs'
import * as path from 'path'

const wxapiAppDelegateH: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      //read the target file
      const fileName = 'AppDelegate.h'
      const projectName = 'JohomePro'
      const srcFilePath = path.resolve(config.modRequest.platformProjectRoot, projectName, fileName)

      //read the file
      const data = fs.readFileSync(srcFilePath, 'utf-8')
      if (data.includes('#import "WXApi.h"')) {
        return config
      }
      //modify the file
      const newData = data
        .replace('#import <UIKit/UIKit.h>', '#import <UIKit/UIKit.h>\n#import "WXApi.h"')
        .replace('EXAppDelegateWrapper', 'RCTAppDelegate <UIApplicationDelegate, WXApiDelegate>')
      //write the file
      fs.writeFileSync(srcFilePath, newData, 'utf-8')

      return config
    },
  ])
}

export default wxapiAppDelegateH
