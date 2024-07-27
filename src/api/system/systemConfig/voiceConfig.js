/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-07 11:55:36
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-07-20 09:31:27
 */
import request from '@/utils/request'

// 获取所有的
export function getAllSystemVoiceConfig(data)
{
  return request({
    url: '/getAllSystemVoiceConfig',
    method: 'get',
    data
  })
}

// 获取
export function getVoiceConfig(data)
{
  return request({
    url: '/getVoiceConfig',
    method: 'post',
    data
  })
}

// 添加
export function addVoiceConfig(data)
{
  return request({
    url: '/addVoiceConfig',
    method: 'post',
    data
  })
}

// 更新
export function updateVoiceConfig(data)
{
  return request({
    url: '/updateVoiceConfig',
    method: 'post',
    data
  })
}

// 删除
export function deleteVoiceConfig(data)
{
  return request({
    url: '/deleteVoiceConfig',
    method: 'post',
    data
  })
}

// 批量删除
export function multipleDeleteVoiceConfig(data)
{
  return request({
    url: '/multipleDeleteVoiceConfig',
    method: 'post',
    data
  })
}
