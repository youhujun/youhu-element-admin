/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-05-23 15:19:35
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-25 00:05:01
 */
import request from '@/utils/request'

export function getTreeRole()
{
  return request({
    url: '/getTreeRole',
    method: 'get'
  })
}

export function addRole(data)
{
  return request({
    url: '/addRole',
    method: 'post',
    data
  })
}

export function updateRole(data)
{
  return request({
    url: `updateRole`,
    method: 'post',
    data
  })
}

export function moveRole(data)
{
  return request({
    url: `moveRole`,
    method: 'post',
    data
  })
}

export function deleteRole(data)
{
  return request({
    url: `deleteRole`,
    method: 'post',
    data
  })
}

export function resetRolePermission(data)
{
  return request({
    url: `resetRolePermission`,
    method: 'post',
    data
  })
}
