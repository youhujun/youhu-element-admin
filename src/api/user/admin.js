/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-05-23 15:19:35
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-04 23:30:25
 */

import request from '@/utils/request'

/**
 * 获取管理员用户信息 作为选项使用
 * @returns
 */
export function getDefaultAdmin()
{
  return request({
    url: '/getDefaultAdmin',
    method: 'get'
  })
}

export function findAdmin(data)
{
  return request({
    url: '/findAdmin',
    method: 'post',
    data
  })
}
// 获取用户
export function getAdmin(data)
{
  return request({
    url: '/getAdmin',
    method: 'post',
    data
  })
}

// 添加用户
export function addAdmin(data)
{
  return request({
    url: '/addAdmin',
    method: 'post',
    data
  })
}

// 更新用户
export function updateAdmin(data)
{
  return request({
    url: '/updateAdmin',
    method: 'post',
    data
  })
}

// 禁用用户
export function disableAdmin(data)
{
  return request({
    url: '/disableAdmin',
    method: 'post',
    data
  })
}

// 删除用户
export function deleteAdmin(data)
{
  return request({
    url: '/deleteAdmin',
    method: 'post',
    data
  })
}

// 批量禁用用户
export function multipleDisableAdmin(data)
{
  return request({
    url: '/multipleDisableAdmin',
    method: 'post',
    data
  })
}

// 批量删除用户
export function multipleDeleteAdmin(data)
{
  return request({
    url: '/multipleDeleteAdmin',
    method: 'post',
    data
  })
}
