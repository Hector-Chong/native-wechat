<h1 align="center">
  <a href="https://native-wechat.hector.im/">
    Native Wechat
  </a>
</h1>

<p align="center">
  <strong>A React Native library for supporting Wechat APIs on Android and iOS</strong>
</p>

<p align="center">
  <a href="https://github.com/Hector-Chong/native-wechat/blob/HEAD/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Native Wechatis released under the MIT license." />
  </a>
  <a href="https://www.npmjs.org/package/native-wechat">
    <img src="https://img.shields.io/npm/v/native-wechat?color=brightgreen&label=npm%20package" alt="Current npm package version." />
  </a>
</p>

## For Expo Project

Please refer to [Expo Native Wechat](https://github.com/Hector-Chong/expo-native-wechat)


# Motivation

Most developers using React Native to build apps are not equipped with native developing skills, not to mention connecting their apps with WeChat.

Especially, WeChat OpenSDK is something pain in the ass because of [shitty docs](https://developers.weixin.qq.com/doc/oplatform/Mobile_App/Access_Guide/iOS.html) where lots of APIs are not clear and intuitive. To help developers using React Native, I tried as much as possible to create this library. And I hope you benefit from this and be less frustrated with WeChat.

# Why

- Native WeChat is new, and many libraries like it are no longer maintained and keep up with the latest WeChat.
- Native WeChat supports both legacy and new React Native architecture.
- Native WeChat is a TurboModule that supports lazy loading, allowing for faster app startup.
- Supports TypeScript for better intellisense and easy-to-check typing errors.
- All Apis are promisified.

# Getting Started

## Register SDK
Before invoking any APIs, registering Native WeChat by invoking `registerApp` is essential.

```typescript
import {registerApp} from 'native-wechat';

useEffect(()=>{
	return registerApp('wx964290141ebe9b7b');
}, [])
```

When invoking `registerApp`, there will be a listener to receive events from Wechat. `registerApp` returns a function to remove the listener, and no events will be received from Wechat.

## Invoking API

Now is the time to invoke API. For example, we will send an auth request to Wechat and receive the code. You may use the API named `sendAuthRequest` here.

```jsx
import {registerApp, sendAuthRequest} from 'native-wechat';
import {Button, Text} from 'react-native';
import {verifyWechatCode} from '@/api/auth/wechat'

useEffect(()=>{
	registerApp('wx964290141ebe9b7b');
}, [])

const onButtonClicked = async () =>{
  const {data: {code}} = await sendAuthRequest();
  
  await verifyWechatCode(code);
}

return <Button onClick={onButtonClicked}>
  <Text>Send Auth Request</Text>
</Button>
```

Most APIs in Native WeChat are promisified. So is `sendAuthRequest` which will return a promise. When the user confirms the request on Wechat, the promise is resolved to be data with a code. All promisifed APIs return a generic type named `NativeWechatResponse`.

```typescript
export type NativeWechatResponse<T = Record<string, unknown>> = {
  type: string;
  errorCode: number;
  errorStr: string | null;
  data: T;
};
```

# Support

If you have trouble using this library, do not hesitate to open an issue. I am always here to help.
