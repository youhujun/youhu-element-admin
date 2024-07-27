/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-05-23 15:19:35
 * @LastEditors: YouHuJun
 * @LastEditTime: 2021-06-14 16:14:58
 */
import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value)
{
  if (value && value instanceof Array && value.length > 0)
  {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role =>
    {
      return permissionRoles.includes(role)
    })
    return hasPermission
  }
  else
  {
    // console.error(`need roles! Like v-permission="['admin','editor']"`)
    console.error(`需要角色! Like v-permission="['admin','editor']"`)
    return false
  }
}
