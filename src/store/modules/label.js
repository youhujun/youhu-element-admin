/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-18 16:23:06
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-26 21:30:49
 */
import { getTreeLabel } from '@/api/system/group/label'

const state = {
  treeLabel: []
}

const mutations = {
  SET_TREE_LABEL: (state, treeLabel) =>
  {
    state.treeLabel = treeLabel
  }
}

const actions = {
  getTreeLabel({ commit, state })
  {
    return new Promise((resolve, reject) =>
    {
      getTreeLabel().then(res =>
      {
        if (!res || res === undefined)
        {
          reject('获取文章分类失败')
        }

        if (res.code !== 0 || !res.data)
        {
          reject('获取文章分类失败')
        }

        const treeLabel = res.data

        commit('SET_TREE_LABEL', treeLabel)
      }).catch(error =>
      {
        reject(error)
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

