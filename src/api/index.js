// 该文件用于写所有接口请求函数

import requests from './ajax'
import mockRequests from './ajaxMock'

// 获取商品的三级分类列表 get请求
export const categoryList = () => requests.get('/product/getBaseCategoryList')

// 获取搜索模块的信息 post请求
// 必须传递参数params，默认是{}
export const searchInfo = (params) => requests({
    url: '/list',
    method: 'post',
    data: params
})

// 获取详情商品数据 get请求  携带参数skuId
export const goodsInfo = (skuId) => requests.get(`/item/${skuId}`)

// 将加入购物车的商品信息(或要修改的商品数量信息)传入服务器中 post请求，发送/{skuId}/{skuNum}
export const addUpdateShopcar = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',
})
// 获取购物车数据 get请求
export const cartList = () => requests.get('/cart/cartList')
// 通过skuId删除购物车商品数据 delete请求
export const deleteCart = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})
// 修改商品的选中状态 get请求 传递参数/cart/checkCart/{skuID}/{isChecked}
export const changeCartChecked = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})
// 获取注册验证码 get请求 路径传递参数/api/user/passport/sendCode/{phone}
export const getRegisterCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
// 用户注册 post请求 传递参数password、phone、code
export const userRegister = (data) => requests({
    url: '/user/passport/register',
    data,
    method: 'post'
})
// 用户登录 post请求 传递参数phone、password
export const userLogin = (data) => requests({
    url: '/user/passport/login',
    method: 'post',
    data
})
// 通过token请求登录用户的信息 get请求
export const userInfo = () => requests.get('/user/passport/auth/getUserInfo')
// 发请求退出登录 清除服务器的token数据 get请求
export const clearUserInfo = () => requests.get('/user/passport/logout')
// 发送请求获取交易支付页数据 get请求
export const tradeInfo = () => requests.get('/order/auth/trade')
// 发送请求提交订单 post请求 tradeNo带在路径上，其他参数data传递
export const reqSubmitOrder = (tradeNo, data) => requests({
    method: 'post',
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data
})
// 发送请求提供订单编号 获取支付界面的信息 get请求
export const payInfo = (orderId) => requests.get(`/payment/weixin/createNative/${orderId}`)
// 发送请求获取是否支付订单 get请求
export const payOrderCase = (orderId) => requests.get(`/payment/weixin/queryPayStatus/${orderId}`)
// 发送请求获取我的订单数据 get请求
export const myOrderList = (page, limit) => requests.get(`/order/auth/${page}/${limit}`)

// mock模拟数据的获取
export const bannerList = () => mockRequests.get('/banner')
export const floorList = () => mockRequests.get('/floor')
export const userAddressList = () => mockRequests.get('/useraddresslist')