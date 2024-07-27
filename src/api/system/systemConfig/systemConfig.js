/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-07 11:55:36
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-07-20 08:17:53
 */
import request from '@/utils/request'

// 获取
export function downloadSystemConfig(data)
{
  return request({
    url: '/downloadSystemConfig',
    method: 'post',
    data
  })
}
// 获取
export function getSystemConfig(data)
{
  return request({
    url: '/getSystemConfig',
    method: 'post',
    data
  })
}

// 添加
export function addSystemConfig(data)
{
  return request({
    url: '/addSystemConfig',
    method: 'post',
    data
  })
}

// 更新
export function updateSystemConfig(data)
{
  return request({
    url: '/updateSystemConfig',
    method: 'post',
    data
  })
}

// 移动
export function moveSystemConfig(data)
{
  return request({
    url: '/moveSystemConfig',
    method: 'post',
    data
  })
}

// 禁用
export function disableSystemConfig(data)
{
  return request({
    url: '/disableSystemConfig',
    method: 'post',
    data
  })
}

// 删除用户
export function deleteSystemConfig(data)
{
  return request({
    url: '/deleteSystemConfig',
    method: 'post',
    data
  })
}

// 批量禁用用户
export function multipleDisableSystemConfig(data)
{
  return request({
    url: '/multipleDisableSystemConfig',
    method: 'post',
    data
  })
}

// 批量删除用户
export function multipleDeleteSystemConfig(data)
{
  return request({
    url: '/multipleDeleteSystemConfig',
    method: 'post',
    data
  })
}
