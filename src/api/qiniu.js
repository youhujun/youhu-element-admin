/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-05-23 15:19:35
 * @LastEditors: YouHuJun
 * @LastEditTime: 2021-05-29 16:42:40
 */
import request from '@/utils/request'

export function getToken()
{
  return request({
    url: '/qiniu/upload/token', // 假地址 自行替换
    method: 'get'
  })
}
