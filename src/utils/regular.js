// 用于存储正则表达式
const phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
const pwd = /[a-zA-Z]\w{5,17}$/
// 验证手机号格式
export const checkPhone = (data) => phone.test(data)
// 验证密码格式
export const checkPwd = (data) => pwd.test(data)
