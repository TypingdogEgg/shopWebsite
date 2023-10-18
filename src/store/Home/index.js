// home组件的store仓库

// 引入axios CategoryList
import { categoryList, bannerList, floorList } from "@/api"

// 用于异步操作 不进行数据操作
const actions = {
    // 发送请求获取categorylist数据
    async getCategoryList(context) {
        const result = await categoryList() //axios返回promise实例
        if (result.code == 200) { //成功接收
            context.commit('GETCATEGORYLIST', result)
        }
    },
    // 发送请求获取bannerList数据
    async getBannerList(context) {
        const result = await bannerList()
        if (result.code == 200) {
            context.commit('GETBANNERLIST', result)
        }
    },
    // 发送请求获取floorList数据
    async getFloorList(context) {
        const result = await floorList()
        if (result.code == 200) {
            context.commit('GETFLOORLIST', result)
        }
    },
}
// 进行数据操作
const mutations = {
    // 更新state中categoryList的值
    GETCATEGORYLIST(state, result) {
        state.categoryList = result.data
    },
    // 更新state中bannerList的值
    GETBANNERLIST(state, result) {
        state.bannerList = result.data
    },
    // 更新state中bannerList的值
    GETFLOORLIST(state, result) {
        state.floorList = result.data
    },
}
// 用于加工state内的数据 类似于computed
const getters = {

}
// 存储共享数据
const state = {
    categoryList: [],
    bannerList: [],
    floorList: [],
}

export default { actions, mutations, getters, state }