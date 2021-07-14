import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 导入图片懒加载依赖包
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: import('./assets/images/error.svg'), //加载失败显示的图片
  loading: require('./assets/images/loadding.svg'), // 加载中显示的图片
  attempt: 3, 
})

// 导入工具包
import mixins from './utils/mixin'
// 全局混入
Vue.mixin(mixins)

// 导入 Element_ui
import ElementUI from 'element-ui'
// 导入 Element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'
// 插件 Element-ui
Vue.use(ElementUI)

// 导入全局初始化样式
import './assets/css/index.css'



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载到Vue示例上
  router
}).$mount('#app')
