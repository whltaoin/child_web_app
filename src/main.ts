import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'amfe-flexible' // 引入移动端适配
import 'vant/lib/index.css' // 引入vant样式

const app = createApp(App)
app.mount('#app')
