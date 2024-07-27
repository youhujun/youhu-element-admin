/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-12 08:59:59
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-11-28 13:59:23
 */
import request from '@/utils/request'

export function getRegions()
{
  return request({
    url: '/getRegions',
    method: 'get'
  })
}

export function getTreeRegions()
{
  return request({
    url: '/getTreeRegions',
    method: 'get'
  })
}

export function addRegion(data)
{
  return request({
    url: '/addRegion',
    method: 'post',
    data
  })
}

export function updateRegion(data)
{
  return request({
    url: '/updateRegion',
    method: 'post',
    data
  })
}

export function moveRegion(data)
{
  return request({
    url: '/moveRegion',
    method: 'post',
    data
  })
}

export function deleteRegion(data)
{
  return request({
    url: '/deleteRegion',
    method: 'post',
    data
  })
}
