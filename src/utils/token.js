// 用于存储token
// 存储token
export const setToken = (token) => {
    sessionStorage.setItem('Token', token)
}
// 获取token
export const getToken = () => {
    return sessionStorage.getItem('Token')
}
// 清除token
export const removeToken = () => {
    sessionStorage.removeItem('Token')
}
