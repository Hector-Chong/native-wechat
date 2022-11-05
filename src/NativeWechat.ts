import type {TurboModule} from 'react-native/Libraries/TurboModule/RCTExport';
import {TurboModuleRegistry, NativeModules} from 'react-native';

const {Wechat} = NativeModules;

export interface Spec extends TurboModule {}

export default TurboModuleRegistry.get<Spec>('Wechat') || (Wechat as any);
