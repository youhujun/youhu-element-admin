/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2024-02-01 11:36:13
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-12 20:37:50
 * @FilePath: \src\api\system\platform\cacheConfig.js
 */
import request from '@/utils/request'

/**
 * 清理全部配置缓存
 * @returns
 */
export function cleanConfigCache()
{
  return request({
    url: '/cleanConfigCache',
    method: 'get'
  })
}

/**
 * 清理地区缓存
 * @returns
 */
export function cleanRegionCache()
{
  return request({
    url: '/cleanRegionCache',
    method: 'get'
  })
}

/**
 * 清理角色缓存
 * @returns
 */
export function cleanRoleCache()
{
  return request({
    url: '/cleanRoleCache',
    method: 'get'
  })
}

/**
 * 清理产品分类缓存
 * @returns
 */
export function cleanGoodsClassCache()
{
  return request({
    url: '/cleanGoodsClassCache',
    method: 'get'
  })
}

/**
 * 清理文章分类缓存
 * @returns
 */
export function cleanCategoryCache()
{
  return request({
    url: '/cleanCategoryCache',
    method: 'get'
  })
}

/**
 * 清理标签分类缓存
 * @returns
 */
export function cleanLabelCache()
{
  return request({
    url: '/cleanLabelCache',
    method: 'get'
  })
}

/**
 * 清理系统配置缓存
 * @returns
 */
export function cleanSystemConfigCache()
{
  return request({
    url: '/cleanSystemConfigCache',
    method: 'get'
  })
}

/**
 * 清理权限路由缓存
 * @returns
 */
export function cleanPermissionCache()
{
  return request({
    url: '/cleanPermissionCache',
    method: 'get'
  })
}

/**
 * 清理登录用户信息缓存
 * @returns
 */
export function cleanLoginUserInfoCache()
{
  return request({
    url: '/cleanLoginUserInfoCache',
    method: 'get'
  })
}

