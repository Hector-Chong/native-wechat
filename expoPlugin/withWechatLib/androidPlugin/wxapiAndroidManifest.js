"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_plugins_1 = require("@expo/config-plugins");
var getMainApplicationOrThrow = config_plugins_1.AndroidConfig.Manifest.getMainApplicationOrThrow;
var wxapiAndroidManifest = function (expoconfig) {
    return (0, config_plugins_1.withAndroidManifest)(expoconfig, function (manifestConfig) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = manifestConfig;
                    return [4 /*yield*/, addCustomActivity(expoconfig, manifestConfig.modResults)
                        //add new package into queries+ this remove the need to add the package into AndroidManifest.xml
                    ];
                case 1:
                    _a.modResults = _b.sent();
                    //add new package into queries+ this remove the need to add the package into AndroidManifest.xml
                    manifestConfig.modResults.manifest['queries'] = __spreadArray(__spreadArray([], manifestConfig.modResults.manifest['queries'], true), [
                        {
                            package: [
                                {
                                    $: {
                                        'android:name': 'com.tencent.mm',
                                    },
                                },
                            ],
                        },
                    ], false);
                    return [2 /*return*/, manifestConfig];
            }
        });
    }); });
};
function addCustomActivity(config, androidManifest) {
    return __awaiter(this, void 0, void 0, function () {
        var mainApplication;
        return __generator(this, function (_a) {
            mainApplication = getMainApplicationOrThrow(androidManifest);
            mainApplication.activity = __spreadArray(__spreadArray([], mainApplication.activity, true), [
                {
                    $: {
                        'android:name': '.wxapi.WXEntryActivity',
                        'android:exported': 'true',
                        'android:label': '@string/app_name',
                        'android:launchMode': 'singleTask',
                        'android:taskAffinity': 'com.johome.pro',
                        'android:theme': '@android:style/Theme.Translucent.NoTitleBar',
                    },
                },
                {
                    $: {
                        'android:name': '.wxapi.WXPayEntryActivity',
                        'android:exported': 'true',
                        'android:label': '@string/app_name',
                    },
                },
            ], false);
            return [2 /*return*/, androidManifest];
        });
    });
}
exports.default = wxapiAndroidManifest;
