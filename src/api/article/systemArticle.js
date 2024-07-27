/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-09-28 17:17:38
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-09-28 17:17:57
 */
import request from '@/utils/request'

// 获取文章
export function getSystemArticle(data)
{
  return request({
    url: '/getSystemArticle',
    method: 'post',
    data
  })
}
// 添加文章
export function addSystemArticle(data)
{
  return request({
    url: '/addSystemArticle',
    method: 'post',
    params: data
  })
}

// 更新文章
export function updateSystemArticle(data)
{
  return request({
    url: '/updateSystemArticle',
    method: 'post',
    data
  })
}

// 删除文章
export function deleteSystemArticle(data)
{
  return request({
    url: '/deleteSystemArticle',
    method: 'post',
    data
  })
}
// 删除文章
export function multipleDeleteSystemArticle(data)
{
  return request({
    url: '/multipleDeleteSystemArticle',
    method: 'post',
    data
  })
}
