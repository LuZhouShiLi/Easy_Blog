import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router'
import "@/assets/icon/iconfont.css"
import ElementPlus from 'element-plus'

// 引入elementPlus的样式
import "element-plus/dist/index.css"

import Request from '@/utils/Request'
import message from '@/utils/Message'


// createApp(App).mount('#app')
const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.mount('#app');
app.config.globalProperties.Request = Request;
app.config.globalProperties.message = message;