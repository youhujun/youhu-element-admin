/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-12-12 15:18:45
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-12-12 15:20:29
 */
import request from '@/utils/request'

export function getBusinessSystemConfig(data)
{
  return request({
    url: '/getBusinessSystemConfig',
    method: 'get',
    data
  })
}

export function changeBusinessSystemConfig(data)
{
  return request({
    url: '/changeBusinessSystemConfig',
    method: 'post',
    data
  })
}
