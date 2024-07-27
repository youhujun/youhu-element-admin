/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-12-12 15:18:45
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-12-29 07:24:24
 */
import request from '@/utils/request'

export function getBusinessRefundConfig(data)
{
  return request({
    url: '/getBusinessRefundConfig',
    method: 'get',
    data
  })
}

export function addBusinessRefundConfig(data)
{
  return request({
    url: '/addBusinessRefundConfig',
    method: 'post',
    data
  })
}

export function updateBusinessRefundConfig(data)
{
  return request({
    url: '/updateBusinessRefundConfig',
    method: 'post',
    data
  })
}

export function deleteBusinessRefundConfig(data)
{
  return request({
    url: '/deleteBusinessRefundConfig',
    method: 'post',
    data
  })
}

