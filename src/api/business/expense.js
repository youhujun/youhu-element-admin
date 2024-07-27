/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-21 10:58:18
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-03-13 09:21:55
 */
import request from '@/utils/request'

// 获取
export function getExpenseList()
{
  return request({
    url: '/getExpenseConfig',
    method: 'get'
  })
}

// 添加
export function addExpenseList(data)
{
  return request({
    url: '/addExpenseConfig',
    method: 'post',
    data
  })
}

// 更新
export function updateExpenseList(data)
{
  return request({
    url: '/updateExpenseConfig',
    method: 'post',
    data
  })
}

// 删除
export function deleteadExpenseList(data)
{
  return request({
    url: '/deleteExpenseConfig',
    method: 'post',
    data
  })
}

// 修改充值设置地区
export function updateExpenseConfigUnionRegion(data)
{
  return request({
    url: '/updateExpenseConfigUnionRegion',
    method: 'post',
    data
  })
}

// 获取充值设置地区
export function getExpenseConfigUnionRegion(data)
{
  return request({
    url: '/getExpenseConfigUnionRegion',
    method: 'post',
    data
  })
}
