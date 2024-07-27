/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2020-10-20 08:56:59
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-06 00:00:30
 */
import { constantRoutes } from '@/router'
import { getTreePermission } from '@/api/system/permission/permission'
import { mapRouter } from '@/router/mapRouter'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route)
{
  // 这里原来的代码判断的是写死的代码,就是前端写死的,放在meta上面的
  if (route.meta && route.meta.roles)
  {
    return roles.some(role => route.meta.roles.includes(role))
  }
  else
  {
    return true
  }
}

/**
 * 递归处理后盾路由替换component的组件
 * @param {Array} serverRouter 服务端路由返回
 * @param {Object} mapRotuer 前端定义好组件位置
 * @returns { Array } serverRouter 返回处理完毕的服务器的路由
 */
function makePermissionRouters(serverRouter, mapRotuer)
{
  if (serverRouter && serverRouter instanceof Array && serverRouter.length > 0)
  {
    serverRouter.forEach(item =>
    {
      item.component = mapRouter[item.component]

      if (item.children)
      {
        makePermissionRouters(item.children, mapRotuer)
      }
    })

    return serverRouter
  }
}
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles)
{
  const res = []

  routes.forEach(route =>
  {
    const tmp = { ...route }

    if (hasPermission(roles, tmp))
    {
      if (tmp.children)
      {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state =
{
  routes: [],
  addRoutes: [],
  // 添加服务器路由
  serverRoutes: [],
  // 添加菜单表单
  addMenuFrom: {}
}

const mutations =
{
  // 设置路由
  SET_ROUTES: (state, routes) =>
  {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  // 设置服务器路由
  SET_SERVER_ROUTES: (state, routes) =>
  {
    state.serverRoutes = routes
  }
}

const actions = {
  /**
   * 更新服务端路由
   * @param {*} param0
   * @param {*} treeRotues
   */
  updateServerRotes({ commit }, treeRotues)
  {
    commit('SET_SERVER_ROUTES', treeRotues)
  },
  async generateRoutes({ commit }, roles)
  {
    const PermissionRouters = await getTreePermission().then(res =>
    {
      if (res.code === 0)
      {
        let serverRouters = res.data

        serverRouters = makePermissionRouters(serverRouters, mapRouter)

        return serverRouters
      }
    })

    // 提交服务器路由
    commit('SET_SERVER_ROUTES', PermissionRouters)
    return new Promise(resolve =>
    {
      let accessedRoutes

      // 如果是管理员,所有路由都可以 这是原来的逻辑 ,现在改为 develop
      if (roles.includes('develop'))
      {
        accessedRoutes = PermissionRouters || []
      }
      else
      {
        // 否则路由需要过滤
        accessedRoutes = filterAsyncRoutes(PermissionRouters, roles)
      }

      commit('SET_ROUTES', accessedRoutes)

      resolve(accessedRoutes)
    })
  }
}

export default
{
  namespaced: true,
  state,
  mutations,
  actions
}
