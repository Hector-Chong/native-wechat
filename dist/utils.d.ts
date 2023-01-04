import { NativeWechatResponse } from './typing';
export declare const promisifyNativeFunction: <T = NativeWechatResponse<import("./typing").Recordable<any>>>(fn: Function) => (...args: any[]) => Promise<T>;
