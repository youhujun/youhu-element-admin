/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-18 10:39:20
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-03-29 17:12:06
 */
import request from '@/utils/request'

// 获取
export function getShopLevel(data)
{
  return request({
    url: '/getShopLevel',
    method: 'post',
    data
  })
}

// 添加
export function addShopLevel(data)
{
  return request({
    url: '/addShopLevel',
    method: 'post',
    data
  })
}

// 更新
export function updateShopLevel(data)
{
  return request({
    url: '/updateShopLevel',
    method: 'post',
    data
  })
}

// 删除
export function deleteShopLevel(data)
{
  return request({
    url: '/deleteShopLevel',
    method: 'post',
    data
  })
}

// 批量删除
export function multipleDeleteShopLevel(data)
{
  return request({
    url: '/multipleDeleteShopLevel',
    method: 'post',
    data
  })
}

// 添加级别配置项
export function addShopLevelItemUnion(data)
{
  return request({
    url: '/addShopLevelItemUnion',
    method: 'post',
    data
  })
}

// 更新级别配置项
export function updateShopLevelItemUnion(data)
{
  return request({
    url: '/updateShopLevelItemUnion',
    method: 'post',
    data
  })
}

// 删除级别配置项
export function deleteShopLevelItemUnion(data)
{
  return request({
    url: '/deleteShopLevelItemUnion',
    method: 'post',
    data
  })
}
