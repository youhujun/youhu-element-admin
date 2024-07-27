/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-21 10:58:18
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-09-04 09:39:13
 */
import request from '@/utils/request'

// 下载店铺类型导入模板
export function downloadShopType(data)
{
  return request({
    url: '/downloadShopType',
    method: 'post',
    data
  })
}

// 获取
export function getShopType(data)
{
  return request({
    url: '/getShopType',
    method: 'post',
    data
  })
}

// 添加
export function addShopType(data)
{
  return request({
    url: '/addShopType',
    method: 'post',
    data
  })
}

// 更新
export function updateShopType(data)
{
  return request({
    url: '/updateShopType',
    method: 'post',
    data
  })
}

// 删除店铺类型
export function deleteShopType(data)
{
  return request({
    url: '/deleteShopType',
    method: 'post',
    data
  })
}

// 批量删除用户
export function multipleDeleteShopType(data)
{
  return request({
    url: '/multipleDeleteShopType',
    method: 'post',
    data
  })
}

// 获取默认店铺类型
export function getDefaultShopType(data)
{
  return request({
    url: '/defaultShopType',
    method: 'get',
    params: data
  })
}

// 查找店铺类型
export function findShopType(data)
{
  return request({
    url: '/findShopType',
    method: 'post',
    data
  })
}
