/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-12 15:54:24
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-28 00:11:57
 */
import { getRegions, getTreeRegions } from '@/api/system/region/region'

const state = {
  treeRegions: [],
  regions: []
}

const mutations = {
  SET_TREE_REGIONS: (state, treeRegions) =>
  {
    state.treeRegions = treeRegions
  },
  SET_REGIONS: (state, regions) =>
  {
    state.regions = regions
  }
}

const actions = {
  getRegions({ commit, state })
  {
    return new Promise((resolve, reject) =>
    {
      getRegions().then(res =>
      {
        if (!res || res === undefined)
        {
          reject('获取地区失败')
        }

        if (res.code !== 0 || !res.data)
        {
          reject('获取地区失败')
        }

        const regions = res.data

        commit('SET_REGIONS', regions)
      }).catch(error =>
      {
        reject(error)
      })
    })
  },

  getTreeRegions({ commit, state })
  {
    return new Promise((resolve, reject) =>
    {
      getTreeRegions().then(res =>
      {
        // console.log(res)
        if (!res || res === undefined)
        {
          reject('获取树形地区失败')
        }

        if (res.code !== 0 || !res.data)
        {
          reject('获取树形地区失败')
        }

        const treeRegions = res.data

        commit('SET_TREE_REGIONS', treeRegions)
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

