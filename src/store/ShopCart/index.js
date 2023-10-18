// detail组件的store仓库

// 引入axios cartList
import { cartList } from "@/api"
// deleteCartInfo
import { deleteCart } from "@/api"
// 引入游客id nanoid_token
import { nanoid_token } from "@/utils/nanoid_token"
// 引入添加或修改购物车数量
import { addUpdateShopcar } from "@/api"
// 引入修改商品选中状态
import { changeCartChecked } from "@/api"

// 用于异步操作 不进行数据操作
const actions = {
    // 发送请求获取购物车商品的信息
    async getCartList(context) {
        const result = await cartList()
        if (result.code == 200) {
            context.commit('GETCARTLIST', result.data)
        }
    },
    // 发送请求删除skuId商品的数据
    async deleteCartInfo(context, skuId) {
        const result = await deleteCart(skuId)
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject();
        }
    },
    // 发送请求修改购物车商品信息 store读取的参数只能是单个;skuNum为原来数量的加减(-1 3等)
    // async函数返回的一定是一个promise对象
    async UpdateShopcar(context, { skuId, skuNum }) {
        const result = await addUpdateShopcar(skuId, skuNum)
        // 修改数量成功
        if (result.code == 200) {
            return 'ok'
        } else { //修改数量失败
            return Promise.reject(new Error('失败!'))
        }
    },
    // 发送请求修改商品的选中状态isChecked
    async changeChecked(context, { skuId, isChecked }) {
        let result = await changeCartChecked(skuId, isChecked)
        // 修改选中状态成功
        if (result.code == 200) {
            return 'ok'
        } else { // 修改选中状态失败
            console.log(result);
            return Promise.reject(new Error('失败！'))
        }
    },
    // 删除所有选中状态的商品  
    deleteAllChecked({ getters, dispatch }) {
        let promises = []
        getters.cartList.forEach(item => {
            if (item.isChecked == 1) {
                // 删除选中的元素
                let p = dispatch('deleteCartInfo', item.skuId) //每次返回一个promise对象
                promises.push(p) //将单个promise存放进数组中
            }
        })
        // Promise.all([p1,p2,...])只要有一个promise对象rejected那么整个promise数组都是rejected
        return Promise.all(promises)
    },
    // 点击全选或反选，传入isChecked为真说明是正选，反之是反选；和删除所有选中商品的思路一致
    clickAllChecked({ getters, dispatch }, isChecked) {
        let promises = []
        getters.cartList.forEach(item => {
            if (item.isChecked != isChecked) {
                // 和全选复选框状态不一致则修改
                let p = dispatch('changeChecked', {
                    skuId: item.skuId,
                    isChecked
                })
                promises.push(p) // 将小promise对象存放到数组中
            }
        })
        return Promise.all(promises)
    },
}
// 进行数据操作
const mutations = {
    GETCARTLIST(state, result) {
        state.cartData = result[0] || []
    }
}
// 用于加工state内的数据 类似于computed
const getters = {
    cartList(state) {
        return state.cartData.cartInfoList || []
    }
}
// 存储共享数据
const state = {
    cartData: [],
    nanoid_token: nanoid_token()
}

export default { actions, mutations, getters, state }