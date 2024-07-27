/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-03-16 10:12:55
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-07-27 15:56:23
 */
import request from '@/utils/request'

// 获取后台登录日志
export function getAdminLoginLog(data)
{
  return request({
    url: '/getAdminLoginLog',
    method: 'post',
    data
  })
}

// 后台删除登录日志
export function deleteAdminLoginLog(data)
{
  return request({
    url: '/deleteAdminLoginLog',
    method: 'post',
    data
  })
}

// 后台多选删除登录日志
export function multipleDeleteAdminLoginLog(data)
{
  return request({
    url: '/multipleDeleteAdminLoginLog',
    method: 'post',
    data
  })
}

// 获取手机登录日志
export function getUserLoginLog(data)
{
  return request({
    url: '/getUserLoginLog',
    method: 'post',
    data
  })
}

// 手机删除登录日志
export function deleteUserLoginLog(data)
{
  return request({
    url: '/deleteUserLoginLog',
    method: 'post',
    data
  })
}

// 手机多选删除登录日志
export function multipleDeleteUserLoginLog(data)
{
  return request({
    url: '/multipleDeleteUserLoginLog',
    method: 'post',
    data
  })
}

// 获取后台事件日志
export function getAdminEventLog(data)
{
  return request({
    url: '/getAdminEventLog',
    method: 'post',
    data
  })
}

// 后台删除事件日志
export function deleteAdminEventLog(data)
{
  return request({
    url: '/deleteAdminEventLog',
    method: 'post',
    data
  })
}
// 后台多选删除事件日志
export function multipleDeleteAdminEventLog(data)
{
  return request({
    url: '/multipleDeleteAdminEventLog',
    method: 'post',
    data
  })
}

// 获取手机事件日志
export function getUserEventLog(data)
{
  return request({
    url: '/getUserEventLog',
    method: 'post',
    data
  })
}

// 手机删除事件日志
export function deleteUserEventLog(data)
{
  return request({
    url: '/deleteUserEventLog',
    method: 'post',
    data
  })
}
// 手机多选删除事件日志
export function multipleDeleteUserEventLog(data)
{
  return request({
    url: '/multipleDeleteUserEventLog',
    method: 'post',
    data
  })
}
