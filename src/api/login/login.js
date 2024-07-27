import request from '@/utils/request'

export function login(data)
{
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getAdminInfo(token)
{
  return request({
    url: '/getAdminInfo',
    method: 'get',
    params: { token }
  })
}

export function logout()
{
  return request({
    url: '/logout',
    method: 'get'
  })
}
