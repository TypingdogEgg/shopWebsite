// 用于创建整个应用的路由器
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store" //引入仓库
Vue.use(VueRouter)

import routes from "./routes";

// 重写push方法；实现捕获和忽略编程式导航同状态多次点击报错情况
let originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resolve, reject) {
    // 如果成功回调与失败回调都返回了就调用原生push
    if (resolve && reject) {
        // 不能使用originPush()，因为originPush定义时this指向的是window，而push函数需要在vueRouter内使用，this指向不同，所以使用call()或者apply()来调用
        // call和apply函数都能调用函数并修改this指向，区别是apply函数的参数时要以数组形式添加
        originPush.call(this, location, resolve, reject)
    } else { //捕获异常并不做处理
        originPush.call(this, location, () => { }, () => { })
    }
}
// 重写replace 与上面相同
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else { //捕获异常并不做处理
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 创建并暴露一个路由器
const router = new VueRouter({
    // 引入路由配置
    routes,
    // 路由跳转后回到网页最上方
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
})
export default router
// 路由守卫
// 全局前置路由守卫
router.beforeEach((to, from, next) => {
    let token = store.state.User.token // 判断是否登录
    let name = store.state.User.userInfo.name // 用于判断用户数据是否存在 （空对象布尔值为真）
    if (token) { // 已登录
        if (to.path == '/login' || to.path == '/register') {
            next(false) // 已登录后试图进入注册登录页不会跳转
        } else { //去往其他组件
            if (name) { // 如果有userInfo 直接放行
                next()
            } else { // 没有就向服务器重新请求
                store.dispatch('getUserInfo').then(
                    () => { // 请求成功就放行
                        next()
                    }, (err) => { // token失效 需要删除本地存储的token重新登录
                        store.dispatch('clear') // 退出登录 清除token
                        next('/login') // 跳转到登录页
                    })
            }
        }
    } else { // 未登录状态 只能跳转到主页面、注册、登录、搜索、商品详情页面
        let toPath = to.path
        if (toPath.indexOf('/shopcart') != -1 || toPath.indexOf('/center') != -1) {
            // 携带原来访问的路径用query传给登录页面 登陆成功后又跳转回来
            next(`/login/?redirect=${toPath}`)
        } else { //其他页面直接放行
            next()
        }
    }
});
