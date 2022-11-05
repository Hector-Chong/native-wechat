package com.hector.nativewechat;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.tencent.mm.opensdk.constants.ConstantsAPI;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.modelbiz.WXLaunchMiniProgram;
import com.tencent.mm.opensdk.modelmsg.SendAuth;

public class NativeWechatRespDataHelper {
  private static String type = "";

  public static WritableMap downcastResp(BaseResp baseResp) {
    WritableMap argument = Arguments.createMap();

    if (baseResp.errCode == 0) {
      if (baseResp instanceof SendAuth.Resp) {
        type = "SendAuthResp";
        SendAuth.Resp resp = (SendAuth.Resp) baseResp;

        argument.putString("code", resp.code);
        argument.putString("state", resp.state);
        argument.putString("lang", resp.lang);
        argument.putString("country", resp.country);
      }

      if (baseResp.getType() == ConstantsAPI.COMMAND_LAUNCH_WX_MINIPROGRAM) {
        type = "WXLaunchMiniProgramResp";
        WXLaunchMiniProgram.Resp resp = (WXLaunchMiniProgram.Resp) baseResp;

        argument.putString("extMsg", resp.extMsg);
      }

      if (baseResp.getType() == ConstantsAPI.COMMAND_PAY_BY_WX) {
        type = "PayResp";
      }
    }

    WritableMap response = wrapResponse(baseResp, argument);

    return response;
  }

  private static WritableMap wrapResponse(BaseResp baseResp, WritableMap data) {
    WritableMap argument = Arguments.createMap();

    argument.putString("type", type);
    argument.putInt("errorCode", baseResp.errCode);
    argument.putString("errorStr", baseResp.errStr);
    argument.putString("transaction", baseResp.transaction);
    argument.putMap("data", data);

    return argument;
  }
}
