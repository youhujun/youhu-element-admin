/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-05-23 15:19:35
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-21 16:54:31
 */
import request from '@/utils/request'

// 添加银行卡
export function addUserBank(data)
{
  return request({
    url: '/addUserBank',
    method: 'post',
    data
  })
}

// 添加银行卡
export function setDefaultBank(data)
{
  return request({
    url: '/setUserDefaultBank',
    method: 'post',
    data
  })
}

// 添加银行卡
export function deleteBank(data)
{
  return request({
    url: '/deleteUserBank',
    method: 'post',
    data
  })
}

// 获取默认选项用户
export function getDefaultUser(params)
{
  console.log(params)
  return request({
    url: '/getDefaultUser',
    method: 'get',
    params
  })
}

// 查找用户
export function findUser(data)
{
  return request({
    url: '/findUser',
    method: 'post',
    data
  })
}

// 获取用户
export function getUser(data)
{
  return request({
    url: '/getUser',
    method: 'post',
    data
  })
}

// 添加用户
export function addUser(data)
{
  return request({
    url: '/addUser',
    method: 'post',
    data
  })
}

// 更新用户
export function updateUser(data)
{
  return request({
    url: '/updateUser',
    method: 'post',
    data
  })
}

// 禁用用户
export function disableUser(data)
{
  return request({
    url: '/disableUser',
    method: 'post',
    data
  })
}

// 删除用户
export function deleteUser(data)
{
  return request({
    url: '/deleteUser',
    method: 'post',
    data
  })
}

// 批量禁用用户
export function multipleDisableUser(data)
{
  return request({
    url: '/multipleDisableUser',
    method: 'post',
    data
  })
}

// 批量删除用户
export function multipleDeleteUser(data)
{
  return request({
    url: '/multipleDeleteUser',
    method: 'post',
    data
  })
}

// 审核实名认证用户
export function realAuthUser(data)
{
  return request({
    url: '/realAuthUser',
    method: 'post',
    data
  })
}

// 获取用户银行卡
export function getUserBank(data)
{
  return request({
    url: '/getUserBank',
    method: 'post',
    data
  })
}

// 更改用户级别
export function changeUserLevel(data)
{
  return request({
    url: '/changeUserLevel',
    method: 'post',
    data
  })
}

// 获取用户身份证
export function getUserIdCard(data)
{
  return request({
    url: '/getUserIdCard',
    method: 'post',
    data
  })
}

// 设置用户身份证
export function setUserIdCard(data)
{
  return request({
    url: '/setUserIdCard',
    method: 'post',
    data
  })
}

// 获取用户的上级用户(推荐用户)
export function getUserRecommend(data)
{
  return request({
    url: '/getUserRecommend',
    method: 'post',
    data
  })
}

// 获取用户二维码
export function getUserQrcode(data)
{
  return request({
    url: '/getUserQrcode',
    method: 'post',
    data
  })
}

// 获取用户下级团队
export function getUserLowerTeam(data)
{
  return request({
    url: '/getUserLowerTeam',
    method: 'post',
    data
  })
}

// 修改用户手机号
export function updateUserPhone(data)
{
  return request({
    url: '/updateUserPhone',
    method: 'post',
    data
  })
}

// 获取用户地址
export function getUserAddress(params)
{
  return request({
    url: '/getUserAddress',
    method: 'get',
    params
  })
}

// 添加用户地址
export function addUserAddress(data)
{
  return request({
    url: '/addUserAddress',
    method: 'post',
    data
  })
}

// 删除用户地址
export function deleteUserAddress(params)
{
  return request({
    url: '/deleteUserAddress',
    method: 'get',
    params
  })
}

// 设置用户默认地址
export function setDefaultUserAddress(params)
{
  return request({
    url: '/setDefaultUserAddress',
    method: 'get',
    params
  })
}

// 修改用户真实姓名
export function updateUserRealName(data)
{
  return request({
    url: '/updateUserRealName',
    method: 'post',
    data
  })
}

// 修改用身份证号
export function updateUserIdNumber(data)
{
  return request({
    url: '/updateUserIdNumber',
    method: 'post',
    data
  })
}

// 修改用户昵称
export function updateUserNickName(data)
{
  return request({
    url: '/updateUserNickName',
    method: 'post',
    data
  })
}

// 修改用户性别
export function updateUserSex(data)
{
  return request({
    url: '/updateUserSex',
    method: 'post',
    data
  })
}

// 修改用户生日
export function updateUserBirthdayTime(data)
{
  return request({
    url: '/updateUserBirthdayTime',
    method: 'post',
    data
  })
}

// 修改用户密码
export function resetUserPassword(data)
{
  return request({
    url: '/resetUserPassword',
    method: 'post',
    data
  })
}

// 获取用户实名认证申请
export function getUserRealAuthApply(data)
{
  return request({
    url: '/getUserRealAuthApply',
    method: 'post',
    data
  })
}

// 获取用户账户日志
export function getUserAccountLog(data)
{
  return request({
    url: '/getUserAccountLog',
    method: 'post',
    data
  })
}

// 设置用户账户
export function setUserAccount(data)
{
  return request({
    url: '/setUserAccount',
    method: 'post',
    data
  })
}

// 修改头像
export function uploadUserAvatar(data)
{
  return request({
    url: `/uploadUserAvatar`,
    method: 'post',
    data
  })
}
