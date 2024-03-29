import {defineConfig, UserConfig} from 'vite';
import {resolve} from 'path';
import react from '@vitejs/plugin-react-swc';
import typescript from '@rollup/plugin-typescript';

/**
 * @description Build Config
 */
const build_as_lib: UserConfig = {
  base: './',
  plugins: [react(), typescript()],
  build: {
    lib: {
      name: 'native-wechat',
      fileName: 'index',
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['es'],
    },
    minify: 'esbuild',
    rollupOptions: {
      external: ['react', 'react-native'],
      output: {
        globals: {
          react: 'react',
          'react-native': 'react-native',
        },
      },
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
};

export default defineConfig(build_as_lib);
