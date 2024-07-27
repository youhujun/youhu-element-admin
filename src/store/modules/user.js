import { login, logout, getAdminInfo } from '@/api/login/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) =>
  {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) =>
  {
    state.introduction = introduction
  },
  SET_NAME: (state, name) =>
  {
    state.name = name
  },
  SET_AVATAR: (state, avatar) =>
  {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) =>
  {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo)
  {
    const { username, password } = userInfo
    return new Promise((resolve, reject) =>
    {
      login({ username: username.trim(), password: password }).then(response =>
      {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error =>
      {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state })
  {
    return new Promise((resolve, reject) =>
    {
      getAdminInfo(state.token).then(response =>
      {
        if (!response || response === undefined)
        {
          reject('验证失败,请重新登录')
        }
        const { data } = response

        if (!data)
        {
          // reject('Verification failed, please Login again.')
          reject('验证失败,请重新登录')
        }

        const { roles, name, avatar, introduction } = data

        const newAvatar = avatar.replaceAll('\\', '\/')

        // roles must be a non-empty array
        if (!roles || roles.length <= 0)
        {
          // reject('getInfo: roles must be a non-null array!')
          reject('用户信息:角色必须是不为空的数组')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', newAvatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error =>
      {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch })
  {
    return new Promise((resolve, reject) =>
    {
      logout(state.token).then(res =>
      {
        const data = res

        if (!data)
        {
          reject('退出失败')
        }
        else
        {
          if (data.code !== 0)
          {
            reject(data.msg)
          }
        }
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(error =>
      {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit })
  {
    return new Promise(resolve =>
    {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role)
  {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getAdminInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
