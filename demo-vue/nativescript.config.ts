import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.carouseldemovue',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
  discardUncaughtJsExceptions: true,
  name: 'carousel-demo-vue',
  version: '1.0.0',
  appPath: 'app',
} as NativeScriptConfig;
