import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  server:{
    hmr:true,
    port:65535,
    proxy:{
      '/api':{
        target:"mongodb://test:FJTGYXAzqsbnfh123@81.69.24.244:27017/?&authSource=nanqiuu_test&readPreference=primary&ssl=false&directConnection=true",
        secure:false,
        changeOrigin:true,// 开启代理  在本地创建一个虚拟服务端
        pathRewrite:{
          '^/api':'/api',
        },
      },
    },
  },

  resolve:{
    // 配置路径别名
    alias:{
      '@':path.resolve(__dirname,'./src'),
    },
  },
})
