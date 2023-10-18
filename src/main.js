import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入store仓库
import store from './store'

// 三级联动导航菜单 全局组件;以后只需要标签引入使用
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
// carousel轮播图全局组件 封装swiper
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
// 分页器 全局组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)

// 引入mock数据
import '@/mock/mockServer'
// 全局引入swiper样式和vue-awesome-swiper
// import "swiper/css/swiper.css"
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// Vue.use(VueAwesomeSwiper)
// 引入api所有请求
import * as api from '@/api'

// 局部引入饿了么的消息弹出框组件
import { MessageBox, Button } from 'element-ui';
Vue.component(MessageBox.name, MessageBox)
// Vue.use(MessageBox) //这种引用方式会导致每次刷新都弹窗
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入图片懒加载
import VueLazyload from 'vue-lazyload'
import loadimage from '@/assets/loading.gif'
Vue.use(VueLazyload, {
  loading: loadimage
})

Vue.config.productionTip = false

new Vue({
  beforeCreate() {
    // 全局事件总线$bus配置
    Vue.prototype.$bus = this
    // 将api挂载到vue原型上，方便调用api请求
    Vue.prototype.$api = api
  },
  render: h => h(App),
  router, // 注册路由信息
  store, // 存储组件共享数据和操作

}).$mount('#app')



