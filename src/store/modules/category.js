/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-18 16:22:55
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-26 21:30:59
 */
import { getTreeCategory } from '@/api/system/group/category'

const state = {
  treeCategory: []
}

const mutations = {
  SET_TREE_CATEGORY: (state, treeCategory) =>
  {
    state.treeCategory = treeCategory
  }
}

const actions = {
  getTreeCategory({ commit, state })
  {
    return new Promise((resolve, reject) =>
    {
      getTreeCategory().then(res =>
      {
        if (!res || res === undefined)
        {
          reject('获取文章分类失败')
        }

        if (res.code !== 0 || !res.data)
        {
          reject('获取文章分类失败')
        }

        const treeCategory = res.data

        commit('SET_TREE_CATEGORY', treeCategory)
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
