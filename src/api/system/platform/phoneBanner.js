import request from '@/utils/request'

export function getPhoneBanner(data)
{
  return request({
    url: '/getPhoneBanner',
    method: 'post',
    data
  })
}

export function addPhoneBanner(data)
{
  return request({
    url: '/addPhoneBanner',
    method: 'post',
    data
  })
}

export function updatePhoneBanner(data)
{
  return request({
    url: '/updatePhoneBanner',
    method: 'post',
    data
  })
}

export function deletePhoneBanner(data)
{
  return request({
    url: '/deletePhoneBanner',
    method: 'post',
    data
  })
}

// 修改轮播图图片
export function updatePhoneBannerPicture(data)
{
  return request({
    url: '/updatePhoneBannerPicture',
    method: 'post',
    data
  })
}

// 修改轮播图跳转
export function updatePhoneBannerUrl(data)
{
  return request({
    url: '/updatePhoneBannerUrl',
    method: 'post',
    data
  })
}

// 修改轮播图排序
export function updatePhoneBannerSort(data)
{
  return request({
    url: '/updatePhoneBannerSort',
    method: 'post',
    data
  })
}

// 修改轮播图备注
export function updatePhoneBannerRemarkInfo(data)
{
  return request({
    url: '/updatePhoneBannerRemarkInfo',
    method: 'post',
    data
  })
}
