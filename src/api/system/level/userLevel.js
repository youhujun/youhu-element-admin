/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-18 10:39:20
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-03-29 10:35:00
 */
import request from '@/utils/request'

// 获取默认用户级别条件列表
export function getDefaultUserLevel()
{
  return request({
    url: '/defaultUserLevel',
    method: 'get'
  })
}

// 查找用户级别条件列表
export function findUserLevel(data)
{
  return request({
    url: '/findUserLevel',
    method: 'post',
    data
  })
}

// 获取
export function getUserLevel(data)
{
  return request({
    url: '/getUserLevel',
    method: 'post',
    data
  })
}

// 添加
export function addUserLevel(data)
{
  return request({
    url: '/addUserLevel',
    method: 'post',
    data
  })
}

// 更新
export function updateUserLevel(data)
{
  return request({
    url: '/updateUserLevel',
    method: 'post',
    data
  })
}

// 删除
export function deleteUserLevel(data)
{
  return request({
    url: '/deleteUserLevel',
    method: 'post',
    data
  })
}

// 批量删除
export function multipleDeleteUserLevel(data)
{
  return request({
    url: '/multipleDeleteUserLevel',
    method: 'post',
    data
  })
}

// 添加用户级别配置项
export function addUserLevelItemUnion(data)
{
  return request({
    url: '/addUserLevelItemUnion',
    method: 'post',
    data
  })
}

// 更新用户级别配置项
export function updateUserLevelItemUnion(data)
{
  return request({
    url: '/updateUserLevelItemUnion',
    method: 'post',
    data
  })
}

// 删除用户级别配置项
export function deleteUserLevelItemUnion(data)
{
  return request({
    url: '/deleteUserLevelItemUnion',
    method: 'post',
    data
  })
}
