/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-18 10:39:20
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-11-28 15:10:40
 */
import request from '@/utils/request'

export function getTreeCategory()
{
  return request({
    url: '/getTreeCategory',
    method: 'get'
  })
}

export function addCategory(data)
{
  return request({
    url: '/addCategory',
    method: 'post',
    data
  })
}

export function updateCategory(data)
{
  return request({
    url: '/updateCategory',
    method: 'post',
    data
  })
}

export function moveCategory(data)
{
  return request({
    url: '/moveCategory',
    method: 'post',
    data
  })
}

export function deleteCategory(data)
{
  return request({
    url: '/deleteCategory',
    method: 'post',
    data
  })
}
