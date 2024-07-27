/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-21 10:58:18
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-03-13 13:08:31
 */
import request from '@/utils/request'

// 获取
export function getCommentList(data)
{
  return request({
    url: '/getCommentConfig',
    method: 'post',
    data
  })
}

// 添加
export function addComment(data)
{
  return request({
    url: '/addCommentConfig',
    method: 'post',
    data
  })
}

// 更新
export function updateComment(data)
{
  return request({
    url: '/updateCommentConfig',
    method: 'post',
    data
  })
}

// 删除
export function deleteComment(data)
{
  return request({
    url: '/deleteCommentConfig',
    method: 'post',
    data
  })
}

// 批量删除
export function multipleDeleteComment(data)
{
  return request({
    url: '/multipleDeleteCommentConfig',
    method: 'post',
    data
  })
}
