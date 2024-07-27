/*
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2024-01-08 10:06:01
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-07-22 17:38:21
 * @FilePath: \src\router\mapRouter.js
 */

import Layout from '@/layout'

export const mapRouter = {
  'Layout': Layout,
  // 系统设置
  //    平台配置
  'platformConfig': () => import('@/pages/system/platform/index'),
  //        缓存设置
  'cacheConfig': () => import('@/pages/system/platform/cacheConfig/index'),
  //        首页轮播
  'phoneIndexBanner': () => import('@/pages/system/platform/phoneIndexBanner/index'),
  //    系统配置
  'system': () => import('@/pages/system/system/index'),
  //		参数配置
  'systemConfig': () => import('@/pages/system/system/systemConfig/index'),
  //		提示配置
  'voiceConfig': () => import('@/pages/system/system/voiceConfig/index'),
  //    菜单管理
  'permission': () => import('@/pages/system/permission/index'),
  //    角色管理
  'role': () => import('@/pages/system/role/index'),
  //    分类管理
  'group': () => import('@/pages/system/group/index'),
  //        产品分类
  'goodsClass': () => import('@/pages/system/group/goodsClass/index'),
  //        文章分类
  'category': () => import('@/pages/system/group/category/index'),
  //        标签管理
  'label': () => import('@/pages/system/group/label/index'),
  //    级别管理
  'level': () => import('@/pages/system/level/index'),
  //        级别条件
  'levelItem': () => import('@/pages/system/level/levelItem/index'),
  //        用户级别
  'userLevel': () => import('@/pages/system/level/userLevel/index'),
  //    地区管理
  'region': () => import('@/pages/system/region/index'),
  //    银行管理
  'bank': () => import('@/pages/system/bank/index'),

  // 用户管理
  //    管理员管理
  'admin': () => import('@/pages/user/admin/admin'),
  //    用户管理
  'user': () => import('@/pages/user/user/index'),
  //        等待认证
  'userCheck': () => import('@/pages/user/user/userCheck/index'),
  //        用户列表
  'userList': () => import('@/pages/user/user/userList/user'),
  //        编辑用户
  'editUser': () => import('@/pages/user/user/editUser/index'),


  // 财务管理
  //    提现管理
  'withdraw': () => import('@/pages/financial/withdraw/index'),

  // 文章管理
  //    公告管理
  'notice': () => import('@/pages/article/notice/notice'),
  //    系统文章
  'systemArticle': () => import('@/pages/article/systemArticle/index'),

  // 图片空间
  //    我的相册
  'album': () => import('@/pages/picture/album/album'),

  // 日志管理
  //    登录日志
  'loginLog': () => import('@/pages/log/login/index'),
  //        手机登录日志
  'phoneLogin': () => import('@/pages/log/login/phoneLogin/index'),
  //        后台登录日志
  'adminLogin': () => import('@/pages/log/login/adminLogin/index'),
  //    事件日志
  'eventLog': () => import('@/pages/log/event/index'),
  //        手机事件日志
  'phoneEvent': () => import('@/pages/log/event/phoneEvent/index'),
  //        后台事件日志
  'adminEvent': () => import('@/pages/log/event/adminEvent/index')

  // 建议反馈

  // 消息通知

}

