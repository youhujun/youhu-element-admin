const Mock = require('mockjs')
const { deepClone } = require('../utils')
const { asyncRoutes, constantRoutes } = require('./routes.js')

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const result = [
  {
    id: 1,
    revision: 0,
    created_at: '2022-01-26 10:01:56',
    updated_at: '0000-00-00 00:00:00',
    deleted_at: null,
    created_time: 1643162516,
    updated_time: 0,
    deleted_time: 0,
    parent_id: 0,
    role_name: '开发者',
    logic_name: 'develop',
    deep: 1,
    sort: 100,
    switch: 1,
    permission: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21
    ]
  },
  {
    id: 2,
    revision: 0,
    created_at: '2022-01-26 10:01:56',
    updated_at: '0000-00-00 00:00:00',
    deleted_at: null,
    created_time: 1643162516,
    updated_time: 0,
    deleted_time: 0,
    parent_id: 0,
    role_name: '超级管理员',
    logic_name: 'super',
    deep: 1,
    sort: 100,
    switch: 1,
    permission: [
      1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21
    ]
  },
  {
    id: 3,
    revision: 0,
    created_at: '2022-01-26 10:01:56',
    updated_at: '0000-00-00 00:00:00',
    deleted_at: null,
    created_time: 1643162516,
    updated_time: 0,
    deleted_time: 0,
    parent_id: 0,
    role_name: '管理员',
    logic_name: 'admin',
    deep: 1,
    sort: 100,
    switch: 1,
    permission: [1, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21]
  },
  {
    id: 4,
    revision: 0,
    created_at: '2022-01-26 10:01:56',
    updated_at: '0000-00-00 00:00:00',
    deleted_at: null,
    created_time: 1643162516,
    updated_time: 0,
    deleted_time: 0,
    parent_id: 0,
    role_name: '用户',
    logic_name: 'user',
    deep: 1,
    sort: 100,
    switch: 1,
    permission: []
  }
]

/* const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: routes
  },
  {
    key: 'editor',
    name: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: routes.filter(i => i.path !== '/permission')// just a mock
  },
  {
    key: 'visitor',
    name: 'visitor',
    description: 'Just a visitor. Can only see the home page and the document page',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
] */

module.exports = [
  // mock get all routes form server
  {
    url: '/routes',
    type: 'get',
    response: (_) =>
    {
      return {
        code: 0,
        data: routes
      }
    }
  },

  // mock get all roles form server
  {
    url: '/roles',
    type: 'get',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '获取角色成功',
        data: result
      }
    }
  },
  // 添加角色
  {
    url: '/addRole',
    type: 'post',
    response: (req, res) =>
    {
      result.push({
        id: 5,
        revision: 0,
        created_at: '2022-01-26 10:01:56',
        updated_at: '0000-00-00 00:00:00',
        deleted_at: null,
        created_time: 1643162516,
        updated_time: 0,
        deleted_time: 0,
        parent_id: 0,
        role_name: '客服',
        logic_name: 'server',
        deep: 1,
        sort: 100,
        switch: 1,
        permission: []
      })
      return {
        code: 0,
        msg: '添加角色成功',
        data: result
      }
    }
  },
  // add role
  {
    url: '/role',
    type: 'post',
    response: {
      code: 0,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },
  // 删除角色
  {
    url: '/deleteRole',
    type: 'post',
    response: (req, res) =>
    {
      result.pop()
      return {
        code: 0,
        msg: '删除角色成功',
        data: result
      }
    }
  },
  // 更新角色
  {
    url: '/updateRole',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '更新角色成功',
        data: result
      }
    }
  },
  // 重置权限角色失败
  {
    url: '/resetRolePermission',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '重置权角色权限成功',
        data: result
      }
    }
  },
  // update role
  {
    url: '/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 0,
      data: {
        status: 'success'
      }
    }
  },
  // delete role
  {
    url: '/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 0,
      data: {
        status: 'success'
      }
    }
  }
]
