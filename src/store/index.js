// 该文件用于创建Vuex中最核心的store

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入模块化的小仓库
import Home from './Home'
import User from './User'
import Search from './Search'
import Detail from './Detail'
import ShopCart from './ShopCart'
import Trade from './Trade'

// 用于异步操作 不进行数据操作
const actions = {

}
// 进行数据操作
const mutations = {

}
// 用于加工state内的数据 类似于computed
const getters = {

}
// 存储共享数据
const state = {

}

export default new Vuex.Store({
    // 模块化 项目大时便于管理
    modules: {
        Home,
        User,
        Search,
        Detail,
        ShopCart,
        Trade,
    }
})
