/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-18 10:39:20
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-03-28 15:50:43
 */
import request from '@/utils/request'

// 获取默认级别条件列表
export function getDefaultLevelItem()
{
  return request({
    url: '/defaultLevelItem',
    method: 'get'
  })
}

// 查找级别条件列表
export function findLevelItem(data)
{
  return request({
    url: '/findLevelItem',
    method: 'post',
    data
  })
}

// 获取
export function getLevelItem(data)
{
  return request({
    url: '/getLevelItem',
    method: 'post',
    data
  })
}

// 添加
export function addLevelItem(data)
{
  return request({
    url: '/addLevelItem',
    method: 'post',
    data
  })
}

// 更新
export function updateLevelItem(data)
{
  return request({
    url: '/updateLevelItem',
    method: 'post',
    data
  })
}

// 删除
export function deleteLevelItem(data)
{
  return request({
    url: '/deleteLevelItem',
    method: 'post',
    data
  })
}

// 批量删除
export function multipleDeleteLevelItem(data)
{
  return request({
    url: '/multipleDeleteLevelItem',
    method: 'post',
    data
  })
}
