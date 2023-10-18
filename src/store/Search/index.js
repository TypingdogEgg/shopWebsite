// search组件的store仓库
import { searchInfo } from '@/api'
// 引入axios addUpdateShopcar
import { addUpdateShopcar } from "@/api"

// 用于异步操作 不进行数据操作
const actions = {
    async getSearchList(context, params = {}) {
        const result = await searchInfo(params)
        if (result.code == 200) {
            context.commit('GETSEARCHLIST', result)
        }
    },
}
// 进行数据操作
const mutations = {
    GETSEARCHLIST(state, result) {
        state.searchList = result.data
    }
}
// 用于加工state内的数据 类似于computed
const getters = {
    // 这里的形参state是小仓库的state
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    goodsList(state) {
        return state.searchList.goodsList || [] //没有读取到goodsList就设置为空数组，页面就不会报错
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
}
// 存储共享数据
const state = {
    searchList: {},
}

export default { actions, mutations, getters, state }