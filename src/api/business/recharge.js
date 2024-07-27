/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-21 10:58:18
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-03-03 21:19:00
 */
import request from '@/utils/request'

// 获取
export function getRechargeList()
{
  return request({
    url: '/getRechargeConfig',
    method: 'get'
  })
}

// 添加
export function addRechargeList(data)
{
  return request({
    url: '/addRechargeConfig',
    method: 'post',
    data
  })
}

// 更新
export function updateRechargeList(data)
{
  return request({
    url: '/updateRechargeConfig',
    method: 'post',
    data
  })
}

// 删除
export function deleteadRechargeList(data)
{
  return request({
    url: '/deleteRechargeConfig',
    method: 'post',
    data
  })
}

// 修改充值设置地区
export function updateRechargeConfigUnionRegion(data)
{
  return request({
    url: '/updateRechargeConfigUnionRegion',
    method: 'post',
    data
  })
}

// 获取充值设置地区
export function getRechargeConfigUnionRegion(data)
{
  return request({
    url: '/getRechargeConfigUnionRegion',
    method: 'post',
    data
  })
}
