/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-21 10:58:18
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-03-15 09:16:59
 */
import request from '@/utils/request'

// 获取
export function getAgentRate(data)
{
  return request({
    url: '/getAgentOrderRateConfig',
    method: 'post',
    data
  })
}

// 添加
export function addAgentRate(data)
{
  return request({
    url: '/addAgentOrderRateConfig',
    method: 'post',
    data
  })
}

// 更新
export function updateAgentRate(data)
{
  return request({
    url: '/updateAgentOrderRateConfig',
    method: 'post',
    data
  })
}

// 删除
export function deleteAgentRate(data)
{
  return request({
    url: '/deleteAgentOrderRateConfig',
    method: 'post',
    data
  })
}

// 批量删除
export function multipleDeleteAgentRate(data)
{
  return request({
    url: '/multipleDeleteAgentOrderRateConfig',
    method: 'post',
    data
  })
}

// 获取代理分润地区
export function getAgentOrderRateConfigUnionRegion(data)
{
  return request({
    url: '/getAgentOrderRateConfigUnionRegion',
    method: 'post',
    data
  })
}

// 修改代理分润地区
export function updateAgentOrderRateConfigUnionRegion(data)
{
  return request({
    url: 'updateAgentOrderRateConfigUnionRegion',
    method: 'post',
    data
  })
}
