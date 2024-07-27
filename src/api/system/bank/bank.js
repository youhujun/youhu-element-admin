/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-21 10:58:18
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-05-09 11:01:24
 */
import request from '@/utils/request'

// 获取
export function downloadBank(data)
{
  return request({
    url: '/downloadBank',
    method: 'post',
    data
  })
}

// 获取默认银行
export function defaultBank(params)
{
  return request({
    url: '/defaultBank',
    method: 'get',
    params
  })
}

// 获取默认银行
export function findBank(data)
{
  return request({
    url: '/findBank',
    method: 'post',
    data
  })
}

// 获取
export function getBank(data)
{
  return request({
    url: '/getBank',
    method: 'post',
    data
  })
}

// 添加
export function addBank(data)
{
  return request({
    url: '/addBank',
    method: 'post',
    data
  })
}

// 更新
export function updateBank(data)
{
  return request({
    url: '/updateBank',
    method: 'post',
    data
  })
}

// 禁用
export function disableBank(data)
{
  return request({
    url: '/disableBank',
    method: 'post',
    data
  })
}

// 删除用户
export function deleteBank(data)
{
  return request({
    url: '/deleteBank',
    method: 'post',
    data
  })
}

// 批量禁用用户
export function multipleDisableBank(data)
{
  return request({
    url: '/multipleDisableBank',
    method: 'post',
    data
  })
}

// 批量删除用户
export function multipleDeleteBank(data)
{
  return request({
    url: '/multipleDeleteBank',
    method: 'post',
    data
  })
}
