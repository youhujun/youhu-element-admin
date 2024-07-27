/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-01 23:04:22
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-06-14 10:39:08
 */
import store from '@/store'

function checkPermission(el, binding)
{
  const { value } = binding
  const roles = store.getters && store.getters.roles

  if (value && value instanceof Array)
  {
    if (value.length > 0)
    {
      const permissionRoles = value

      const hasPermission = roles.some(role =>
      {
        return permissionRoles.includes(role)
      })

      if (!hasPermission)
      {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }
  else
  {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }
}

export default {
  inserted(el, binding)
  {
    checkPermission(el, binding)
  },
  update(el, binding)
  {
    checkPermission(el, binding)
  }
}
