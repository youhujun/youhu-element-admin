/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-07-30 17:42:31
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-26 17:39:53
 */
const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  // 用户tkoen
  token: state => state.user.token,
  // 用户头像
  avatar: state => state.user.avatar,
  // 用户昵称
  name: state => state.user.name,
  // 用户简介
  introduction: state => state.user.introduction,
  // 用户角色
  roles: state => state.user.roles,
  // 所有权限路由
  permission_routes: state => state.permission.routes,
  // 服务器路由
  serverRoutes: state => state.permission.serverRoutes,
  // 所有树形地区
  treeRegions: state => state.region.treeRegions,
  // 所有地区
  regions: state => state.region.regions,
  // 系统所有角色
  systemRoles: state => state.system.systemRoles,
  // 系统所有用户级别
  systemUserLevels: state => state.system.systemUserLevels,
  // 所有产品分类
  treeGoodsClass: state => state.goodsClass.treeGoodsClass,
  // 所有文章分类
  treeCategory: state => state.category.treeCategory,
  // 所有标签分类
  treeLabel: state => state.label.treeLabel,
  errorLogs: state => state.errorLog.logs
}
export default getters
