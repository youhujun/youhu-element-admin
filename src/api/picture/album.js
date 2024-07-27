/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-28 14:48:53
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-09-14 11:37:39
 */
import request from '@/utils/request'

export function getAlbum(data)
{
  return request({
    url: '/getAlbum',
    method: 'post',
    data
  })
}

export function addAlbum(data)
{
  return request({
    url: '/addAlbum',
    method: 'post',
    data
  })
}

export function updateAlbum(data)
{
  return request({
    url: `/updateAlbum`,
    method: 'post',
    data
  })
}

export function deleteAlbum(data)
{
  return request({
    url: `/deleteAlbum`,
    method: 'post',
    data
  })
}

export function getAlbumPicture(data)
{
  return request({
    url: `/getAlbumPicture`,
    method: 'post',
    data
  })
}

// 头像上传
export function uploadAvatarPicture(data)
{
  return request({
    url: '/uploadAvatarPicture',
    method: 'post',
    withCredentials: false,
    headers: { 'type': 'picture', 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 单图上传
export function uploadSinglePicture(data)
{
  return request({
    url: `/uploadSinglePicture`,
    method: 'post',
    withCredentials: false,
    headers: { 'type': 'picture', 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 多图上传
export function uploadMultiplePicture(data)
{
  return request({
    url: `/uploadMultiplePicture`,
    method: 'post',
    withCredentials: false,
    headers: { 'type': 'picture', 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 单图替换上传
export function uploadResetPicture(data)
{
  return request({
    url: `/uploadResetPicture`,
    method: 'post',
    withCredentials: false,
    data
  })
}

// 单图替换上传
export function setCover(data)
{
  return request({
    url: `/setCover`,
    method: 'post',
    data
  })
}

// 转移相册
export function moveAlbum(data)
{
  return request({
    url: `/moveAlbum`,
    method: 'post',
    data
  })
}

// 批量转移相册
export function moveMultipleAlbum(data)
{
  return request({
    url: `/moveMultipleAlbum`,
    method: 'post',
    data
  })
}

// 删除图片
export function deletePicture(data)
{
  return request({
    url: `/deletePicture`,
    method: 'post',
    data
  })
}

// 批量删除图片
export function deleteMultiplePicture(data)
{
  return request({
    url: `/deleteMultiplePicture`,
    method: 'post',
    data
  })
}

// 修改图片名称
export function updatePictureName(data)
{
  return request({
    url: `/updatePictureName`,
    method: 'post',
    data
  })
}

// 获取默认相册
export function getDefaultAlbum(data)
{
  return request({
    url: `/getDefaultAlbum`,
    method: 'post',
    data
  })
}

// 查找相册
export function findAlbum(data)
{
  return request({
    url: `/findAlbum`,
    method: 'post',
    data
  })
}
