#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import "WXApi.h"

@interface RTNWechat : RCTEventEmitter <RCTBridgeModule, WXApiDelegate>

@property (nonatomic, copy) NSString *appid;

@end
