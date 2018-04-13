import axios from 'axios'
import Vue from 'vue'
import moment from 'moment'
import Cookie from '../util/cookie'
import { load } from '../components/load/loading'

class AJAX {
  constructor(cfg) {
    // 成功标志key
    this.reqSuccessKey = cfg.reqSuccessKey
    // 成功标志value
    this.reqSuccessValue = cfg.reqSuccessValue
    // 消息key
    this.msgKey = cfg.msgKey
    // 拦截错误
    this.interceptError = cfg.interceptError
    this.instance = axios.create({
      baseURL: cfg.baseUrl,
      timeout: 30000
    })
    this.initInterceptors()
  }
  get(url, params) {
    return this.fetch(url, params)
  }
  post(url, params, flag) {
    return this.fetch(url, params, flag)
  }
  fetch(url, params, flag) {

    let instance = flag ? this.instance.post(url, params) : this.instance.get(url, params)
    return new Promise((resolve, reject) => {
      instance.then((res) => {
        let code = res && res[this.reqSuccessKey]
        if (this.reqSuccessValue.indexOf(code) > -1) {
          resolve(res)
        } else {
          let msg = res && res[this.msgKey] || JSON.stringify(res) || '错误类型未知'
          res && Vue.prototype.$notify({
            title: '',
            message: msg,
            type: 'error',
            offset: 100,
            duration: 2000
          })
          reject(res)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  }

  initInterceptors() {

    var index = 0;
    // 添加一个请求拦截器，给header添加token
    this.instance.interceptors.request.use(function (config) {
      //在请求发出之前进行一些操作
      config.headers['ADMIN-AUTH-HEADER'] = Cookie.get("token");
      //  loading begain
      load.loading = true;
      index++;
      return config
    });


    //添加一个响应拦截器
    this.instance.interceptors.response.use((response) => {
      // //在这里对返回的数据进行处理
      // closeLoading
      index--;
      if (!index) {
        load.loading = false;
      }
      response = response.data
      let callbackFn = this.interceptError
      // 校验授权失败
      if (response.messageCode === "10001" || response.messageCode === "10002") {
        callbackFn && callbackFn();
        Vue.prototype.$notify({
          type: 'warning',
          message: response.message,
          offset: 100,
          duration: 2000
        })

      } else {
        return response
      }
    }, (res) => {

      // closeLoading
      index--;
      if (!index) {
        load.loading = false;
      }

      res = res.response
      let msg = '请求服务失败'
      if (res && res.status) {
        msg += `，错误码${res.status}`
      }
      Vue.prototype.$notify({
        type: 'error',
        // title: '错误提示',
        message: msg,
        offset: 100,
        duration: 2000
      })
      // return Promise.reject(error)
    })
  }
}
export default AJAX
