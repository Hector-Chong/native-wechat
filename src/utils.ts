import {NativeWechatResponse} from './typing';

export const promisifyNativeFunction = <T = NativeWechatResponse>(
  fn: Function,
) => {
  return (...args) => {
    return new Promise<T>((resolve, reject) => {
      fn(...args, (err, res) => {
        err ? reject(res) : resolve(res);
      });
    });
  };
};
