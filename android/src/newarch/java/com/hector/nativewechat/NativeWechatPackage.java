package com.hector.nativewechat;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.TurboReactPackage;
import com.hector.nativewechat.NativeWechatModule;

import java.util.HashMap;
import java.util.Map;

public class NativeWechatPackage extends TurboReactPackage {
  @Nullable
  @Override
  public NativeModule getModule(String name, ReactApplicationContext reactContext) {
    if (name.equals(NativeWechatModuleImpl.NAME)) {
      return new NativeWechatModule(reactContext);
    } else {
      return null;
    }
  }

  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
    return () -> {
      final Map<String, ReactModuleInfo> moduleInfos = new HashMap<>();
      boolean isTurboModule = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;

      moduleInfos.put(
        NativeWechatModuleImpl.NAME,
        new ReactModuleInfo(
          NativeWechatModuleImpl.NAME,
          NativeWechatModuleImpl.NAME,
          false,
          false,
          true,
          false,
          isTurboModule
        ));

      return moduleInfos;
    };
  }

}
