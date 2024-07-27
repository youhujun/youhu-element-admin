/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-18 11:27:34
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-26 18:37:00
 */

import { getTreeGoodsClass } from '@/api/system/group/goodsClass'

const state = {
  treeGoodsClass: []
}

const mutations = {
  SET_TREE_CLASS: (state, treeGoodsClass) =>
  {
    state.treeGoodsClass = treeGoodsClass
  }
}

const actions = {
  getTreeGoodsClass({ commit, state })
  {
    return new Promise((resolve, reject) =>
    {
      getTreeGoodsClass().then(res =>
      {
        if (res.code !== 0 || !res.data)
        {
          reject('获取产品分类失败')
        }

        commit('SET_TREE_CLASS', res.data)
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

