/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-07 11:55:36
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-07-20 08:19:00
 */
import request from '@/utils/request'

// 获取
export function downloadReplace(data)
{
  return request({
    url: '/downloadReplace',
    method: 'post',
    data
  })
}

// 树形获取
export function getTreeReplace()
{
  return request({
    url: '/getTreeReplace',
    method: 'get'
  })
}

// 获取
export function getReplace(data)
{
  return request({
    url: '/getReplace',
    method: 'post',
    data
  })
}

// 添加
export function addReplace(data)
{
  return request({
    url: '/addReplace',
    method: 'post',
    data
  })
}

// 更新
export function updateReplace(data)
{
  return request({
    url: '/updateReplace',
    method: 'post',
    data
  })
}

// 移动
export function moveReplace(data)
{
  return request({
    url: '/moveReplace',
    method: 'post',
    data
  })
}

// 禁用
export function disableReplace(data)
{
  return request({
    url: '/disableReplace',
    method: 'post',
    data
  })
}

// 删除
export function deleteReplace(data)
{
  return request({
    url: '/deleteReplace',
    method: 'post',
    data
  })
}

// 批量禁用
export function multipleDisableReplace(data)
{
  return request({
    url: '/multipleDisableReplace',
    method: 'post',
    data
  })
}

// 批量删除
export function multipleDeleteReplace(data)
{
  return request({
    url: '/multipleDeleteReplace',
    method: 'post',
    data
  })
}
