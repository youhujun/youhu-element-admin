/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2023-02-24 22:39:19
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-11 23:29:20
 * @FilePath: \src\socket.js
 */
import Echo from 'laravel-echo'

import io from 'socket.io-client'

window.io = io

const host = process.env.VUE_APP_SOCKET_HOST

window.Echo = new Echo({
  broadcaster: 'socket.io',
  host: host
})

const Socket = window.Echo

export default Socket

