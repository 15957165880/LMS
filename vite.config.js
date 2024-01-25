import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    viteMockServe({
      mockPath: 'mock', // 指定 mock 数据的文件夹
      localEnabled: true, // 开发环境是否开启
      logger: true
    }),
  ],
  
  css: {
    modules: {
      generateScopedName: '[name]_[local]_[hash:base64:5]',
      hashPrefix: 'prefix',
    },
    preprocessorOptions: {
      less: {
        javascript: true,
        math: 'always'
      }
    }
  },
  // base: './',
})
