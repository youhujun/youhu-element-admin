/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-13 13:17:55
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-25 00:25:23
 */
import { getTreeRole } from '@/api/system/role/role'

const state = {
  systemRoles: []
}

const mutations = {
  SET_SYSTEMROLES: (state, systemRoles) =>
  {
    state.systemRoles = systemRoles
  }
}

const actions = {

  getTreeRole({ commit, state })
  {
    return new Promise((resolve, reject) =>
    {
      getTreeRole().then(res =>
      {
        // console.log(res)
        if (!res || res === undefined)
        {
          reject('获取角色失败')
        }

        if (res.code !== 0)
        {
          reject('获取角色失败')
        }
        const systemRoles = res.data
        commit('SET_SYSTEMROLES', systemRoles)
      }).catch(err =>
      {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
