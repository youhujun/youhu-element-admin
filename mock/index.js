/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-05-23 15:19:35
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-02-15 12:47:21
 */
const Mock = require('mockjs')
const { param2Obj } = require('./utils')
// 用户级别/登录
const user = require('./user')
// 角色管理
const role = require('./role')
// 菜单管理
const permission = require('./permission')
// 系统文章
const article = require('./article-manager/system-article')
const search = require('./remote-search')
// 标签管理
const label = require('./system/categories/label')
// 产品分类
const classes = require('./system/categories/classes')
// 地区管理
const region = require('./system/region')
// 系统文章
const articleCategory = require('./system/categories/article-category')
const picture = require('./picture')
// 店铺类型
const shopType = require('./business/config/shop-type')
// 系统类型
const systemConfig = require('./system/system-config')
// 银行管理
const bank = require('./system/bank')
// 集合设置
const collectionSet = require('./business/config/collection-set')
// 退款设置
const refund = require('./business/config/refund')
// 管理员管理
const manager = require('./uesr-manage/manager')
// 事件日志
const eventLog = require('./log-manage/event-log')
// 登录日志
const loginLog = require('./log-manage/login-log')
// 充值设置
const recharge = require('./business/recharge')
// 评论设置
const comment = require('./business/comment')

const mocks = [
  ...user,
  ...role, // 角色管理
  ...article, // 系统文章
  ...search,
  ...permission, // 菜单管理
  // 新增mock
  ...label,
  ...classes, // 产品分类
  ...region, // 地区管理
  ...articleCategory, // 系统文章
  ...picture,
  ...shopType, // 店铺类型
  ...systemConfig, // 系统配置
  ...bank, // 银行管理
  ...collectionSet, // 集合设置
  ...refund, // 退款设置
  ...manager, // 管理员管理
  ...eventLog, // 事件日志
  ...loginLog, // 登录日志
  ...recharge, // 充值设置
  ...comment // 评论设置
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR()
{
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function()
  {
    if (this.custom.xhr)
    {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType)
      {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond)
  {
    return function(options)
    {
      let result = null
      if (respond instanceof Function)
      {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      }
      else
      {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks)
  {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks,
  mockXHR
}
