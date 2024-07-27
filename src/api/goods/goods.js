import request from '@/utils/request'

// 获取产品
export function getGoods(data)
{
  return request({
    url: '/getGoods',
    method: 'post',
    data
  })
}

// 添加产品
export function addGoods(data)
{
  return request({
    url: '/addGoods',
    method: 'post',
    data
  })
}

// 更新产品
export function updateGoods(data)
{
  return request({
    url: '/updateGoods',
    method: 'post',
    data
  })
}

// 禁用产品
export function disableGoods(data)
{
  return request({
    url: '/disableGoods',
    method: 'post',
    data
  })
}

// 删除产品
export function deleteGoods(data)
{
  return request({
    url: '/deleteGoods',
    method: 'post',
    data
  })
}

// 批量禁用产品
export function multipleDisableGoods(data)
{
  return request({
    url: '/multipleDisableGoods',
    method: 'post',
    data
  })
}

// 批量删除产品
export function multipleDeleteGoods(data)
{
  return request({
    url: '/multipleDeleteGoods',
    method: 'post',
    data
  })
}

// 审核申请产品
export function checkGoods(data)
{
  return request({
    url: '/checkGoods',
    method: 'post',
    data
  })
}

// 获取产品主图
export function getGoodsMainPicture(data)
{
  return request({
    url: '/getGoodsMainPicture',
    method: 'post',
    data
  })
}

// 获取产品分类
export function getGoodsClassification(data)
{
  return request({
    url: '/getGoodsClassification',
    method: 'post',
    data
  })
}

// 获取产品详情
export function getGoodsInfo(data)
{
  return request({
    url: '/getGoodsInfo',
    method: 'post',
    data
  })
}

// 获取产品地区
export function getGoodsRegion(data)
{
  return request({
    url: '/getGoodsRegion',
    method: 'post',
    data
  })
}

// 获取产品地区
export function getUpdateGoods(data)
{
  return request({
    url: '/getupdateGoods',
    method: 'post',
    data
  })
}

// 产品上下架
export function ShowGoods(data)
{
  return request({
    url: '/showGoods',
    method: 'post',
    data
  })
}

// 产品批量上下架
export function multipleShowGoods(data)
{
  return request({
    url: '/multipleShowGoods',
    method: 'post',
    data
  })
}

// 添加产品主图
export function addGoodsMainPicture(data)
{
  return request({
    url: '/addGoodsMainPicture',
    method: 'post',
    data
  })
}

// 删除产品主图
export function deleteGoodsMainPicture(data)
{
  return request({
    url: '/deleteGoodsMainPicture',
    method: 'post',
    data
  })
}

// 添加产品分类
export function addGoodsClassification(data)
{
  return request({
    url: '/addGoodsClassification',
    method: 'post',
    data
  })
}

// 删除产品分类
export function deleteGoodsClassification(data)
{
  return request({
    url: '/deleteGoodsClassification',
    method: 'post',
    data
  })
}

// 添加产品地区
export function addGoodsRegion(data)
{
  return request({
    url: '/addGoodsRegion',
    method: 'post',
    data
  })
}

// 删除产品地区
export function deleteGoodsRegion(data)
{
  return request({
    url: '/deleteGoodsRegion',
    method: 'post',
    data
  })
}

// 修改产品简介
export function updateGoodsIntroduction(data)
{
  return request({
    url: '/updateGoodsIntroduction',
    method: 'post',
    data
  })
}

// 修改产品描述
export function updateGoodsDescription(data)
{
  return request({
    url: '/updateGoodsDescription',
    method: 'post',
    data
  })
}

// 更改产品类型
export function updateGoodsType(data)
{
  return request({
    url: '/updateGoodsType',
    method: 'post',
    data
  })
}

// 更改产品属性
export function updateGoodsProperty(data)
{
  return request({
    url: '/updateGoodsProperty',
    method: 'post',
    data
  })
}

// 获取产品申请
export function getGoodsApply(data)
{
  return request({
    url: '/getGoodsApply',
    method: 'post',
    data
  })
}

// 获取产品统计
export function getGoodsTotal(data)
{
  return request({
    url: '/getGoodsTotal',
    method: 'post',
    data
  })
}

// 修改产品统计属性
export function updateGoodsTotalProperty(data)
{
  return request({
    url: '/updateGoodsTotalProperty',
    method: 'post',
    data
  })
}

// 修改订单属性
export function updateOrderProperty(data)
{
  return request({
    url: '/updateOrderProperty',
    method: 'post',
    data
  })
}
