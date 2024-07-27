/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-05-28 23:01:59
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-11 21:25:14
 */
import Layout from '@/layout'

const System = {
  path: '/permission',
  component: Layout,
  redirect: '/permission/page',
  alwaysShow: true, // will always show the root menu
  name: 'Permission',
  meta: {
    title: 'Permission',
    icon: 'lock',
    roles: ['editor'] // you can set roles in root nav
  },
  children: [
    {
      path: 'page',
      component: () => import('@/views/permission/page'),
      name: 'PagePermission',
      meta: {
        title: 'Page Permission',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'directive',
      component: () => import('@/views/permission/directive'),
      name: 'DirectivePermission',
      meta: {
        title: 'Directive Permission'
        // if do not set roles, means: this page does not require permission
      }
    },
    {
      path: 'role',
      component: () => import('@/views/permission/role'),
      name: 'RolePermission',
      meta: {
        title: 'Role Permission',
        roles: ['admin']
      }
    }
  ]
}

const editUser = {
  path: 'edit/:id(\\d+)',
  component: () => import('@/views/example/edit'),
  name: 'EditArticle',
  meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  hidden: true
}

/* const Config =
{
  path: '/config',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/pages/config'),
      name: 'Config',
      meta: { title: '配置页', icon: 'documentation', affix: true }
    }
  ]
} */

export
{
  System,
  editUser
  // Config
}
