export type Recordable<T = any> = Record<string, T>;
export type NativeWechatResponse<T = Recordable> = {
    type: string;
    errorCode: number;
    errorStr: string | null;
    transaction: string | null;
    data: T;
};
export type UniversalLinkCheckingResponse = {
    suggestion: string;
    errorInfo: string;
};
export type SendAuthRequestResponse = NativeWechatResponse<{
    code: string;
    country: string;
    lang: string;
    state: string;
}>;
export type LaunchMiniProgramResponse = NativeWechatResponse<{
    extMsg?: string;
}>;
export type WechatShareScene = {
    WXSceneSession: number;
    WXSceneTimeline: number;
    WXSceneFavorite: number;
};
export type WechatMiniprogramType = {
    WXMiniProgramTypeRelease: number;
    WXMiniProgramTypeTest: number;
    WXMiniProgramTypePreview: number;
};
export type NativeWechatModuleConstants = WechatShareScene & WechatMiniprogramType;
