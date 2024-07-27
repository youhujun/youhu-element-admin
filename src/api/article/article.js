/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-05-23 15:19:35
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-03-15 15:41:11
 */
import request from '@/utils/request'

// 获取文章
export function getArticle(data)
{
  return request({
    url: '/getArticle',
    method: 'post',
    data
  })
}
// 添加文章
export function addArticle(data)
{
  return request({
    url: '/addArticle',
    method: 'post',
    params: data
  })
}

// 更新文章
export function updateArticle(data)
{
  return request({
    url: '/updateArticle',
    method: 'post',
    data
  })
}

// 删除文章
export function deleteArticle(data)
{
  return request({
    url: '/deleteArticle',
    method: 'post',
    data
  })
}
// 删除文章
export function multipleDeleteArticle(data)
{
  return request({
    url: '/multipleDeleteArticle',
    method: 'post',
    data
  })
}
// 文章置顶
export function toTopArticle(data)
{
  return request({
    url: '/toTopArticle',
    method: 'post',
    data
  })
}

// 批量置顶
export function multipleToTopArticle(data)
{
  return request({
    url: '/multipleToTopArticle',
    method: 'post',
    data
  })
}

// 批量取消置顶
export function multipleUnTopArticle(data)
{
  return request({
    url: '/multipleUnTopArticle',
    method: 'post',
    data
  })
}

export function fetchList(query)
{
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id)
{
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv)
{
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data)
{
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

