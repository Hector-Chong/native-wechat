//
//  ExpoWechatDelegate.swift
//  ExpoNativeWechat
//
//  Created by Hector Chong on 2/28/24.
//

import ExpoModulesCore

public class ExpoWechatDelegate: ExpoAppDelegateSubscriber, WXApiDelegate {
    public func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        return WXApi.handleOpen(url, delegate: self);
    }
    
    public func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        return WXApi.handleOpenUniversalLink(userActivity, delegate: self);
    }
    
    public func application(_ application: UIApplication, open url: URL, sourceApplication: String?, annotation: Any) -> Bool {
        return WXApi.handleOpen(url, delegate: self);
    }
}
