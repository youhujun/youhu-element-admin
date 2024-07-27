/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-21 10:58:18
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-03-15 09:11:52
 */
import request from '@/utils/request'

// 获取
export function getShopOrder(data)
{
  return request({
    url: '/getShopOrderRateConfig',
    method: 'post',
    data
  })
}

// 添加
export function addShopOrder(data)
{
  return request({
    url: '/addShopOrderRateConfig',
    method: 'post',
    data
  })
}

// 更新
export function updateShopOrder(data)
{
  return request({
    url: '/updateShopOrderRateConfig',
    method: 'post',
    data
  })
}

// 删除店铺类型
export function deleteShopOrder(data)
{
  return request({
    url: '/deleteShopOrderRateConfig',
    method: 'post',
    data
  })
}

// 批量删除用户
export function multipleDeleteShopOrder(data)
{
  return request({
    url: '/multipleDeleteShopOrderRateConfig',
    method: 'post',
    data
  })
}
