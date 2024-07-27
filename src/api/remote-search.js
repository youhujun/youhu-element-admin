/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-05-23 15:19:35
 * @LastEditors: YouHuJun
 * @LastEditTime: 2021-10-12 09:00:04
 */
import request from '@/utils/request'

export function searchUser(name)
{
  return request({
    url: '/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query)
{
  return request({
    url: '/transaction/list',
    method: 'get',
    params: query
  })
}
