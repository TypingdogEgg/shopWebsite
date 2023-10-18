// 引入mock.js
import Mock from "mockjs";
// 引入json
// webpack默认图片和json数据格式对外暴露
import banner from '@/mock/banner.json'
import floor from '@/mock/floor.json'
import userAddressList from '@/mock/userAddressList.json'

// mock数据:第一个参数请求地址;第二个参数请求数据
// 当发送ajax请求该地址时,浏览器拦截这条请求并将该数据返回
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })
Mock.mock('/mock/useraddresslist', { code: 200, data: userAddressList })

