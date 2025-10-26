import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'amfe-flexible' // 引入移动端适配
import 'vant/lib/index.css' // 引入vant样式
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
