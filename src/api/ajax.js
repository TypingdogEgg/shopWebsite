// 该文件用于配置axios
import axios from "axios"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 引入游客id/token
import store from "@/store"

// 配置不显示右上角的旋转进度条, 只显示水平进度条
NProgress.configure({ showSpinner: false })

const requests = axios.create({
    baseURL: '/api', // 设置公共路径
    timeout: 1000 * 10 // 设置请求超过时间 10s
})


// 添加请求拦截器
requests.interceptors.request.use(
    (config) => {
        // 这里写发送请求后的操作
        // 如果有游客id就将这个id写在header里带给服务器 会返回对应的id的购物车信息
        if (store.state.ShopCart.nanoid_token) {
            config.headers.userTempId = store.state.ShopCart.nanoid_token
        }
        // 用户登录的token
        if (store.state.User.token) {
            config.headers.token = store.state.User.token
        }
        NProgress.start() // 显示请求中的水平进度条
        return config  //返回配置对象
    },
    (err) => {
        // 这里写对请求错误执行的操作
        return Promise.reject(err)
    }
)

// 添加响应拦截器
requests.interceptors.response.use(
    (config) => {
        // 这里写响应请求后的操作
        NProgress.done() // 隐藏进度条
        // 返回响应体数据
        return config.data

    },
    (err) => {
        // 这里写对响应错误执行的操作
        NProgress.done() // 隐藏进度条
        alert(`请求出错：${err.message}` || '未知错误')

        return Promise.reject(err)
    }
)

export default requests