/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-18 10:39:27
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-11-28 15:09:50
 */
import request from '@/utils/request'

export function getTreeLabel()
{
  return request({
    url: '/getTreeLabel',
    method: 'get'
  })
}

export function addLabel(data)
{
  return request({
    url: '/addLabel',
    method: 'post',
    data
  })
}

export function updateLabel(data)
{
  return request({
    url: '/updateLabel',
    method: 'post',
    data
  })
}

export function moveLabel(data)
{
  return request({
    url: '/moveLabel',
    method: 'post',
    data
  })
}

export function deleteLabel(data)
{
  return request({
    url: '/deleteLabel',
    method: 'post',
    data
  })
}
