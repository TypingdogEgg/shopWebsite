// register组件和login组件的store仓库
import { getRegisterCode, userRegister, userLogin, userInfo, clearUserInfo } from "@/api"
// 引入token存储
import { getToken, setToken, removeToken } from "@/utils/token"
// 用于异步操作 不进行数据操作
const actions = {
    // 发送注册验证码
    async getCode(context, phone) {
        let result = await getRegisterCode(phone)
        if (result.code == 200) { // 发送验证码成功
            context.commit('GETCODE', result.data)
        } else {
            return Promise.reject(new Error('failed!'))
        }
    },
    // 发送用户注册请求
    async register(context, { phone, password, code }) {
        let result = await userRegister({ phone, password, code })
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('register failed!'))
        }
    },
    // 发送用户登录请求
    async login(context, { phone, password }) {
        let result = await userLogin({ phone, password })
        if (result.code == 200) {
            context.commit('LOGIN', result.data.token)
            // sessionStorage.setItem('Token', result.data.token) //会话存储token
            // 持久化存储
            setToken(result.data.token)

            return 'ok'
        } else {
            return Promise.reject(new Error('login failed!'))
        }
    },
    // 发送获取用户信息请求 通过token
    async getUserInfo(context) {
        let result = await userInfo()
        if (result.code == 200) {
            context.commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('获取用户信息失败！'))
        }
    },
    // 发送退出登录的请求
    async clear(context) {
        let result = await clearUserInfo()
        console.log(result);
        if (result.code == 200) {
            // 必须在mutations处理数据
            context.commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('退出登录失败！'))
        }
    }
}
// 进行数据操作
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    LOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, data) {
        // 将用户信息存储到state
        state.userInfo = data
    },
    CLEAR(state) {
        state.token = ''
        state.nickName = ''
        state.userInfo = {}
        removeToken()
    },
}
// 用于加工state内的数据 类似于computed
const getters = {

}
// 存储共享数据
const state = {
    code: '',
    // 获取本地存储
    token: getToken() || '',
    userInfo: {},
}

export default { actions, mutations, getters, state }