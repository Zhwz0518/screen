import Vue from 'vue'
import App from './App'
import i18n from './i18n'
import store from './store'
import router from './router'
import Print from 'vue-print-nb'
import './mixin/global'
Vue.use(Print)
import '@/vab'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
/**
 * @description 正式环境默认使用mock，正式项目记得注释后再打包
 */

// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('@/utils/static')
//   mockXHR()
// }

Vue.config.productionTip = false
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: (h) => h(App),
})
