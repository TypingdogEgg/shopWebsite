// detail组件的store仓库

// 引入axios goodsInfo
import { goodsInfo } from "@/api"
// 引入axios addUpdateShopcar
import { addUpdateShopcar } from "@/api"

// 用于异步操作 不进行数据操作
const actions = {
    // 发送请求获取categorylist数据
    async getGoodsInfo(context, skuId) {
        const result = await goodsInfo(skuId) //axios返回promise实例
        if (result.code == 200) { //成功接收
            context.commit('GETGOODSINFO', result)
        }
    },
    // 发送请求添加购物车商品信息 store读取的参数只能是单个
    // async函数返回的一定是一个promise对象
    async addShopcar(context, { skuId, skuNum }) {
        const result = await addUpdateShopcar(skuId, skuNum)
        // 加入购物车成功
        if (result.code == 200) {
            return 'ok'
        } else { //加入购物车失败
            return Promise.reject(new Error('失败!'))
        }
    }
}
// 进行数据操作
const mutations = {
    // 更新state中bannerList的值
    GETGOODSINFO(state, result) {
        state.goodsInfo = result.data
    },
}
// 用于加工state内的数据 类似于computed
const getters = {
    // 一二三级商品目录
    categoryView(state) {
        return state.goodsInfo.categoryView || {}
    },
    // 商品信息
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    // 商品平台售卖信息
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || []
    }
}
// 存储共享数据
const state = {
    goodsInfo: {}
}

export default { actions, mutations, getters, state }