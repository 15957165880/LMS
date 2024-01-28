import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import { viteMockServe } from "vite-plugin-mock";
// import mkcert from "vite-plugin-mkcert";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    // mkcert(),
    viteMockServe({
      mockPath: 'mock', // 指定 mock 数据的文件夹
      localEnabled: true, // 开发环境是否开启
      logger: true
    }),
  ],

  server: {
    proxy: {
      // '/foo': 'http://localhost:4567',
      // '/api/':'https://api.binance.com',

      // '^/api/.*': {
      //   target: 'https://api.binance.com/api',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ''),
      // },

      '/api': {
        target: 'https://api.binance.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          console.log(7)
          return path.replace(/^\/api/, '')
        }
      }

      // '/api': {
      //   target: 'https://api.binance.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
      // '/api': {
      //   target: 'https://api.binance.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ''),
      // //   // headers: {
      // //   //   // 在请求头中添加自定义的 headers
      // //   //   // 'X-MBX-APIKEY': 'apiKey',
      // //   // },
      // },
      
    },
    cors: true,
    host: '0.0.0.0',
    // https: true 
  },
  
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
