import type { ConfigPlugin } from '@expo/config-plugins'
import { withDangerousMod } from '@expo/config-plugins'
import * as fs from 'fs'
import * as path from 'path'
import { WechatConfigProps } from '..'

const wxapiAndroid: ConfigPlugin<WechatConfigProps> = (config, props) => {
  const { androidPackageName } = props
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const customePackageName = androidPackageName
      const packagePath = customePackageName.replace(/\./g, '/')
      const srcPath = path.resolve(config.modRequest.projectRoot, config.modRequest.platformProjectRoot, `app/src/main/java/${packagePath}`)
      //create a new file
      const newFileName = 'WXEntryActivity.java'
      const newFolderName = 'wxapi'
      const newFileContent = `
package ${customePackageName}.wxapi;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

public class WXEntryActivity extends Activity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    try {
      Intent intent = getIntent();
      Intent intentToBroadcast = new Intent();

      intentToBroadcast.setAction("com.hector.nativewechat.ACTION_REDIRECT_INTENT");
      intentToBroadcast.putExtra("intent", intent);

      sendBroadcast(intentToBroadcast);

      finish();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
`
      const newFilePath = path.resolve(srcPath, newFolderName, newFileName)

      //create a new folder
      const newFolderPath = path.resolve(srcPath, newFolderName)
      if (!fs.existsSync(newFolderPath)) {
        fs.mkdirSync(newFolderPath)
      }

      //create a new file
      if (!fs.existsSync(newFilePath)) {
        fs.writeFileSync(newFilePath, newFileContent)
      }

      //create the pay api file
      const payApiFileName = 'WXPayEntryActivity.java'
      const payApiFileContent = `
        package ${customePackageName}.wxapi;

        import android.app.Activity;
        import android.os.Bundle;

        public class WXPayEntryActivity extends Activity {
            @Override
            protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
                
                finish();
            }
        }
        `

      const payApiFilePath = path.resolve(srcPath, newFolderName, payApiFileName)
      if (!fs.existsSync(payApiFilePath)) {
        fs.writeFileSync(payApiFilePath, payApiFileContent)
      }

      return config
    },
  ])
}

export default wxapiAndroid
