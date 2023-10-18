// Trade组件的store仓库

// 引入axios tradeInfo
import { tradeInfo, userAddressList } from "@/api"


// 用于异步操作 不进行数据操作
const actions = {
    // 发送请求获取交易页数据
    async getTradeInfo(context) {
        let result = await tradeInfo()
        if (result.code == 200) {
            context.commit('GETTRADEINFO', result.data)
        }
    },
    // 发送请求获取用户地址信息
    async getUserAddressList(context) {
        let result = await userAddressList()
        if (result.code == 200) {
            context.commit('GETUSERADDRESSLIST', result.data)
        }
    }
}
// 进行数据操作
const mutations = {
    GETTRADEINFO(state, data) {
        state.tradeInfo = data
    },
    GETUSERADDRESSLIST(state, data) {
        state.addressList = data
    }
}
// 用于加工state内的数据 类似于computed
const getters = {

}
// 存储共享数据
const state = {
    tradeInfo: {},
    addressList: []
}

export default { actions, mutations, getters, state }