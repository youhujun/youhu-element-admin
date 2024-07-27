/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-21 10:58:18
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-03-15 09:22:44
 */
import request from '@/utils/request'

// 获取
export function getTechnicianRate(data)
{
  return request({
    url: '/getTechnicianOrderRateConfig',
    method: 'post',
    data
  })
}

// 添加
export function addTechnicianRate(data)
{
  return request({
    url: '/addTechnicianOrderRateConfig',
    method: 'post',
    data
  })
}

// 更新
export function updateTechnicianRate(data)
{
  return request({
    url: '/updateTechnicianOrderRateConfig',
    method: 'post',
    data
  })
}

// 删除
export function deleteTechnicianRate(data)
{
  return request({
    url: '/deleteTechnicianOrderRateConfig',
    method: 'post',
    data
  })
}

// 批量删除
export function multipleDeleteTechnicianRate(data)
{
  return request({
    url: '/multipleDeleteTechnicianOrderRateConfig',
    method: 'post',
    data
  })
}

// 获取技师分润地区
export function getTechnicianOrderRateConfigUnionRegion(data)
{
  return request({
    url: '/getTechnicianOrderRateConfigUnionRegion',
    method: 'post',
    data
  })
}

// 修改技师分润地区
export function updateTechnicianOrderRateConfigUnionRegion(data)
{
  return request({
    url: '/updateTechnicianOrderRateConfigUnionRegion',
    method: 'post',
    data
  })
}
