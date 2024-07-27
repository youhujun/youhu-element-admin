/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-18 10:39:04
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-26 17:18:51
 */
import request from '@/utils/request'

export function getTreeGoodsClass()
{
  return request({
    url: '/getTreeGoodsClass',
    method: 'get'
  })
}

export function addGoodsClass(data)
{
  return request({
    url: '/addGoodsClass',
    method: 'post',
    data
  })
}

export function updateGoodsClass(data)
{
  return request({
    url: '/updateGoodsClass',
    method: 'post',
    data
  })
}

export function moveGoodsClass(data)
{
  return request({
    url: '/moveGoodsClass',
    method: 'post',
    data
  })
}

export function deleteGoodsClass(data)
{
  return request({
    url: '/deleteGoodsClass',
    method: 'post',
    data
  })
}
