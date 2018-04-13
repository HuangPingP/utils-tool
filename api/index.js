import Ajax from '../api/ajax'
import {
    redirectToLogin
} from '../util/redirect'
// 创建用户信息接口实例
const eucApi = new Ajax({
    baseUrl: '/store-pass-portals',
    // baseUrl: '',
    reqSuccessKey: 'messageCode',
    reqSuccessValue: ["200", "100013", "100014"],
    msgKey: 'message',
    interceptError: redirectToLogin
})

export default eucApi



// 登录 ==> 短信登录
export const loginIn = (params) => eucApi.post('/login/mobile/v1', {...params }, true)

// 图形验证码
export const getValideCode = (params) => eucApi.get('/resource/getValideCode/v1', {...params })

// 短信验证码
export const getSms = (params) => eucApi.get('/sms/login/v1', {...params })

//切换分店
export const switchStore = (params) => eucApi.get('/account/switchStore/v1', {...params });

//集团用户收索
export const searchGroup = (params) => eucApi.post('/store/searchGroup/v1', {...params }, true)