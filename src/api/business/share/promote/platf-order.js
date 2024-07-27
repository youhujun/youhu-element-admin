/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-21 10:58:18
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-03-15 09:11:08
 */
import request from '@/utils/request'

// 获取
export function getPlatformOrder(data)
{
  return request({
    url: '/getPlatformOrderRateConfig',
    method: 'post',
    data
  })
}

// 添加
export function addPlatformOrder(data)
{
  return request({
    url: '/addPlatformOrderRateConfig',
    method: 'post',
    data
  })
}

// 更新
export function updatePlatformOrder(data)
{
  return request({
    url: '/updatePlatformOrderRateConfig',
    method: 'post',
    data
  })
}

// 删除店铺类型
export function deletePlatformOrder(data)
{
  return request({
    url: '/deletePlatformOrderRateConfig',
    method: 'post',
    data
  })
}

// 批量删除用户
export function multipleDeletePlatformOrder(data)
{
  return request({
    url: '/multipleDeletePlatformOrderRateConfig',
    method: 'post',
    data
  })
}
