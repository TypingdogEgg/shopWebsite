// 生成唯一的游客id
import { nanoid } from "nanoid"
export const nanoid_token = () => {
    // 在本地存储中寻找有没有游客id
    let nanoId = localStorage.getItem('nanoid_token')
    // 没有就新建一个
    if (!nanoId) {
        nanoId = nanoid()
        localStorage.setItem('nanoid_token', nanoId)
    }
    return nanoId
}