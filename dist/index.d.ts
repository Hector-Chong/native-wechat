import { NativeWechatModuleConstants, NativeWechatResponse, SendAuthRequestResponse, LaunchMiniProgramResponse, UniversalLinkCheckingResponse } from './typing';
export declare const checkUniversalLinkReady: () => Promise<UniversalLinkCheckingResponse>;
export declare const registerApp: (request: {
    appid: string;
    universalLink?: string;
    log?: boolean;
    logPrefix?: string;
}) => (() => any) | undefined;
export declare const isWechatInstalled: () => Promise<boolean>;
export declare const sendAuthRequest: (request?: {
    scope: string;
    state?: string;
}) => Promise<SendAuthRequestResponse>;
export declare const shareText: (request: {
    text: string;
    scene: number;
}) => Promise<Promise<boolean>>;
export declare const shareImage: (request: {
    src: string;
    scene: number;
}) => Promise<Promise<boolean>>;
export declare const shareVideo: (request: {
    title?: string;
    description?: string;
    scene: number;
    videoUrl: string;
    videoLowBandUrl?: string;
    coverUrl?: string;
}) => Promise<Promise<boolean>>;
export declare const shareWebpage: (request: {
    title?: string;
    description?: string;
    scene: number;
    webpageUrl: string;
    coverUrl?: string;
}) => Promise<Promise<boolean>>;
export declare const shareMiniProgram: (request: {
    userName: string;
    path: string;
    miniprogramType: number;
    webpageUrl: string;
    withShareTicket?: boolean;
    title?: string;
    description?: string;
    coverUrl?: string;
}) => Promise<Promise<boolean>>;
export declare const requestPayment: (request: {
    partnerId: string;
    prepayId: string;
    nonceStr: string;
    timeStamp: string;
    sign: string;
}) => Promise<NativeWechatResponse<import("./typing").Recordable<any>>>;
export declare const requestSubscribeMessage: (request: {
    scene: number;
    templateId: string;
    reserved?: string;
}) => Promise<Promise<boolean>>;
export declare const openCustomerService: (request: {
    corpid: string;
    url: string;
}) => Promise<Promise<boolean>>;
export declare const launchMiniProgram: (request: {
    userName: string;
    path: string;
    miniProgramType: number;
    onNavBack?: ((res: LaunchMiniProgramResponse) => void) | undefined;
}) => Promise<Promise<boolean>>;
export declare const NativeWechatConstants: NativeWechatModuleConstants;
