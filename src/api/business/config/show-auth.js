/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-07 11:55:36
 * @LastEditors: YouHuJun
 * @LastEditTime: 2023-02-27 15:51:09
 */
import request from '@/utils/request'

// 获取显示权限基本配置
export function getBusinessShowConfig()
{
  return request({
    url: '/getBusinessShowConfig',
    method: 'get'
  })
}

// 更改显示权限配置地区类型
export function changeBusinessShowConfigRegionType(data)
{
  return request({
    url: '/changeBusinessShowConfigRegionType',
    method: 'post',
    data
  })
}

// 更改显示权限配置显示状态
export function changeBusinessShowConfigShowStatus(data)
{
  return request({
    url: '/changeBusinessShowConfigShowStatus',
    method: 'post',
    data
  })
}

// 获取显示权限基本配置
export function getBusinessShowConfigByRegion()
{
  return request({
    url: '/getBusinessShowConfigByRegion',
    method: 'get'
  })
}

// 更该单个地区单项显示配置
export function changeSingleBusinessShowConfigShowStatus(data)
{
  return request({
    url: '/changeSingleBusinessShowConfigShowStatus',
    method: 'post',
    data
  })
}

// 更该批量地区单项显示配置
export function changeMultipleBusinessShowConfigShowStatus(data)
{
  return request({
    url: '/changeMultipleBusinessShowConfigShowStatus',
    method: 'post',
    data
  })
}
