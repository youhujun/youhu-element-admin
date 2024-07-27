import request from '@/utils/request'

// 获取订单
export function getOrder(data)
{
  return request({
    url: '/getOrder',
    method: 'post',
    data
  })
}

// 获取订单产品
export function getOrderGoods(data)
{
  return request({
    url: '/getOrderGoods',
    method: 'post',
    data
  })
}

// 获取订单产品地址
export function getOrderAddress(data)
{
  return request({
    url: '/getOrderAddress',
    method: 'post',
    data
  })
}

// 添加订单
export function addOrder(data)
{
  return request({
    url: '/addOrder',
    method: 'post',
    data
  })
}

// 更新订单
export function updateOrder(data)
{
  return request({
    url: '/updateOrder',
    method: 'post',
    data
  })
}

// 删除订单
export function deleteOrder(data)
{
  return request({
    url: '/deleteOrder',
    method: 'post',
    data
  })
}

// 批量删除订单
export function multipleDeleteOrder(data)
{
  return request({
    url: '/multipleDeleteOrder',
    method: 'post',
    data
  })
}

// 获取订单技师记录
export function getOrderTechnicianLog(data)
{
  return request({
    url: '/getOrderTechnicianLog',
    method: 'post',
    data
  })
}

// 设置/修改订单技师
export function setOrderTechnician(data)
{
  return request({
    url: '/setOrderTechnician',
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
