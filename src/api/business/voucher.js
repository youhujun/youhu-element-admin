/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-21 10:58:18
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-02-20 14:00:29
 */
import request from '@/utils/request'

// 获取
export function getVoucherList(data)
{
  return request({
    url: '/getCouponConfig',
    method: 'post',
    data
  })
}

// 添加
export function addVoucherList(data)
{
  return request({
    url: '/addCouponConfig',
    method: 'post',
    data
  })
}

// 更新
export function updateVoucherList(data)
{
  return request({
    url: '/updateCouponConfig',
    method: 'post',
    data
  })
}

// 删除
export function deleteadVoucherList(data)
{
  return request({
    url: '/deleteadCouponConfig',
    method: 'post',
    data
  })
}

// 批量删除
export function multipleadVoucherList(data)
{
  return request({
    url: '/multipleDeleteadCouponConfig',
    method: 'post',
    data
  })
}
