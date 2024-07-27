/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-08-25 21:00:59
 * @LastEditors: YouHuJun
 * @LastEditTime: 2021-10-14 09:15:47
 */

const help = {

  /**
   *  将对象转换为字符串
   * @param {object} object
   * @returns {string}  string
   */
  Json(object)
  {
    return JSON.stringify(object)
  },

  /**
   *  将json字符串 转换为对象
   * @param {string } string
   * @returns {object} object
   */
  String(string)
  {
    return JSON.parse(string)
  },

  /**
   * 设置本地缓存
   * @param {*} key
   * @param {*} value
   */
  set(key, value)
  {
    localStorage.setItem(key, JSON.stringify(value))
  },

  /**
   *  获取本地缓存
   * @param {*} key
   * @returns
   */
  get(key)
  {
    return JSON.parse(localStorage.getItem(key))
  },

  /**
   * 删除本地缓存
   * @param {*} key
   */
  remove(key)
  {
    localStorage.removeItem(key)
  },

  // 获取当前时间
  getAllTime(string)
  {
    const tt = {
      now_time: '',
      time: 0
    }
    let d = 0
    if (typeof (string) !== 'undefined')
    {
      d = new Date(string)
    }
    else
    {
      d = new Date()
    }

    // 获取年
    const y = d.getFullYear()
    // 获取月 月份需要加1
    let m = d.getMonth() + 1
    if (m < 10)
    {
      m = '0' + m
    }
    // 获取日
    let r = d.getDate()
    if (r < 10)
    {
      r = '0' + r
    }
    // 获取时
    let h = d.getHours()
    if (h < 10)
    {
      h = '0' + h
    }
    // 获取分
    let i = d.getMinutes()
    if (i < 10)
    {
      i = '0' + i
    }
    // 获取秒
    let s = d.getSeconds()
    if (s < 10)
    {
      s = '0' + s
    }
    const now_time = y + '-' + m + '-' + r + ' ' + h + ':' + i + ':' + s
    const time = Date.parse(d)
    tt.now_time = now_time
    tt.time = time
    return tt
  }

}

export default help
