/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2024-05-05 23:57:38
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-25 00:47:21
 * @FilePath: \src\api\system\permission\permission.js
 */
import request from '@/utils/request'

/**
 * 获取树形路由
 * @returns
 */
export function getTreePermission()
{
  return request({
    url: 'getTreePermission',
    method: 'get'
  })
}

// 添加菜单
export function addMenu(data)
{
  return request({
    url: '/addMenu',
    method: 'post',
    data
  })
}

// 修改菜单
export function updateMenu(data)
{
  return request({
    url: '/updateMenu',
    method: 'post',
    data
  })
}

// 移动菜单
export function moveMenu(data)
{
  return request({
    url: '/moveMenu',
    method: 'post',
    data
  })
}

// 删除菜单
export function deleteMenu(data)
{
  return request({
    url: '/deleteMenu',
    method: 'post',
    data
  })
}

// 禁用菜单
export function switchdMenu(data)
{
  return request({
    url: '/switchMenu',
    method: 'post',
    data
  })
}

