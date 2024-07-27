/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-05-23 15:19:35
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-21 16:54:31
 */
import request from '@/utils/request'

// 获取用户的上级用户(推荐用户)
export function getUserSource(data)
{
  return request({
    url: '/getUserSource',
    method: 'post',
    data
  })
}

// 获取用户下级团队
export function getUserLowerTeam(data)
{
  return request({
    url: '/getUserLowerTeam',
    method: 'post',
    data
  })
}

