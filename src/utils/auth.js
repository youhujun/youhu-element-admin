/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-05-23 15:19:35
 * @LastEditors: YouHuJun
 * @LastEditTime: 2021-06-14 16:12:57
 */
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken()
{
  return Cookies.get(TokenKey)
}

export function setToken(token)
{
  return Cookies.set(TokenKey, token)
}

export function removeToken()
{
  return Cookies.remove(TokenKey)
}
