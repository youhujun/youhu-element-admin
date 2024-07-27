/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-05-23 15:19:35
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-02 05:06:10
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config =>
  {
    /* httpAgent= new http.Agent({ keepAlive: true }),
    httpsAgent= new https.Agent({ keepAlive: true }), */
    // 代理转发
    /* config.proxy = {
      host: '127.0.0.1',
      port: 9000,
      auth: {
        username: 'mikeymike',
        password: 'rapunz3l'
      }
    } */
    // do something before request is sent

    if (store.getters.token)
    {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    config.headers['time'] = new Date().getTime()
    return config
  },

  error =>
  {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response =>
  {
    // console.log(response)
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    // if the custom code is not 0, it is judged as an error.
    if (res.code !== 0)
    {
      Message({
        // message: res.msg || 'Error',
        message: res.msg || '错误!',
        type: 'error',
        duration: 2 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 90010)
      {
        // to re-login
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        MessageBox.confirm('您已经退出, 您可以取消留在该页,或者重新登录', '确认退出', {
          // confirmButtonText: 'Re-Login',
          confirmButtonText: '重新登录',
          // cancelButtonText: 'Cancel',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>
        {
          store.dispatch('user/resetToken').then(() =>
          {
            location.reload(true)
          })
        }).catch(() =>
        {
          return
        })
      }
    }
    else
    {
      return res
    }
  },
  error =>
  {
    if (error.response)
    {
      // console.log(error.response)
      if (error.response.status === 422)
      {
        // console.log(error.response.data.message)
        let msg = ''

        for (const key in error.response.data.errors)
        {
          msg += (error.response.data.errors[key][0] + '|')
        }
        Message({
          message: msg,
          type: 'error',
          duration: 2 * 1000
        })
      }
      else if (error.response.status === 429)
      {
        // console.log(error.response.data.message)
        Message({
          message: '请求太频繁了',
          type: 'error',
          duration: 2 * 1000
        })
      }
      else
      {
        // console.log('err' + error) // for debug
        // console.log('报错:' + error.response) // for debug
        Message({
          message: error.msg,
          type: 'error',
          duration: 2 * 1000
        })
      }
      return Promise.reject(error.response)
    }
  }
)

export default service
