//
//  RTNWechatUtils.m
//  CocoaAsyncSocket
//
//  Created by Hector Chong on 10/21/22.
//

#import <Foundation/Foundation.h>
#import "RTNWechatUtils.h"

@implementation RTNWechatUtils

+ (void)downloadFile:(NSURL *)url onSuccess:(void (^)(NSData * _Nullable data))onSuccess onError:(void (^)(NSError *error))onError
{
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    
    NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
    NSURLSession *session = [NSURLSession sessionWithConfiguration:configuration];
    
    NSURLSessionDataTask *task = [session dataTaskWithRequest: request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
      if(error){
          onError(error);
      }else{
          onSuccess(data);
      }
    }];
    
    [task resume];
}

@end
