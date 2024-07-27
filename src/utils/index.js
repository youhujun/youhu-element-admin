/**
 * Created by PanJiaChen on 16/11/18.
 */
export function group(array, subGroupLength)
{
  let index = 0
  const newArray = []
  while (index < array.length)
  {
    newArray.push(array.slice(index, index += subGroupLength))
  }
  return newArray
}

// 防抖
export const debounce = (func, wait) =>
{
  var timeout

  return function()
  {
    var context = this
    var args = arguments

    clearTimeout(timeout)
    timeout = setTimeout(function()
    {
      func.apply(context, args)
    }, wait)
  }
}
// 节流
export const throttle = (fn, wait) =>
{
  let canRun = true // 通过闭包保存一个标记
  return function()
  {
    if (!canRun) return // 在函数开头判断标记是否为true，不为true则return
    canRun = false // 立即设置为false
    setTimeout(() =>
    { // 将外部传入的函数的执行放在setTimeout中
      fn.apply(this, arguments)
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
      canRun = true
    }, wait)
  }
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat)
{
  if (arguments.length === 0 || !time)
  {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object')
  {
    date = time
  }
  else
  {
    if ((typeof time === 'string'))
    {
      if ((/^[0-9]+$/.test(time)))
      {
        // support "1548221490638"
        time = parseInt(time)
      }
      else
      {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10))
    {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) =>
  {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a')
    {
      return ['日', '一', '二', '三', '四', '五', '六'][value ]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option)
{
  if (('' + time).length === 10)
  {
    time = parseInt(time) * 1000
  }
  else
  {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30)
  {
    return '刚刚'
  }
  else if (diff < 3600)
  {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  }
  else if (diff < 3600 * 24)
  {
    return Math.ceil(diff / 3600) + '小时前'
  }
  else if (diff < 3600 * 24 * 2)
  {
    return '1天前'
  }
  if (option)
  {
    return parseTime(time, option)
  }
  else
  {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url)
{
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) =>
  {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str)
{
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--)
  {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual)
{
  const newArray = []
  for (let i = 0; i < actual.length; i++)
  {
    if (actual[i])
    {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json)
{
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key =>
    {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url)
{
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search)
  {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v =>
  {
    const index = v.indexOf('=')
    if (index !== -1)
    {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val)
{
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source)
{
  if (typeof target !== 'object')
  {
    target = {}
  }
  if (Array.isArray(source))
  {
    return source.slice()
  }
  Object.keys(source).forEach(property =>
  {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object')
    {
      target[property] = objectMerge(target[property], sourceProperty)
    }
    else
    {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className)
{
  if (!element || !className)
  {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1)
  {
    classString += '' + className
  }
  else
  {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type)
{
  if (type === 'start')
  {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  }
  else
  {
    return new Date(new Date().toDateString())
  }
}

// 获取当前时间
export function getAllTime(string)
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

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
/* export function debounce(func, wait, immediate)
{
  let timeout, args, context, timestamp, result

  const later = function()
  {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0)
    {
      timeout = setTimeout(later, wait - last)
    }
    else
    {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate)
      {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args)
  {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow)
    {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
} */

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source)
{
  if (!source && typeof source !== 'object')
  {
    // throw new Error('error arguments', 'deepClone')
    throw new Error('错误的参数', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys =>
  {
    if (source[keys] && typeof source[keys] === 'object')
    {
      targetObj[keys] = deepClone(source[keys])
    }
    else
    {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr)
{
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString()
{
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls)
{
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls)
{
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls)
{
  if (hasClass(ele, cls))
  {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

/**
 * 根据id 获取 地区名称
 */
export function getRegionNameById(id, allRegion)
{
  let name = ''
  allRegion.some(element =>
  {
    if (element.id === id)
    {
      name = element.region_name
      return true
    }
  })
  return name
}

/**
 * 根据 地址数组 返回 地址名称
 */
export function getAddress(address = [], allRegion = [])
{
  if (address.length > 0)
  {
    const regionName = []

    address.forEach(element =>
    {
      let [name, province_name, region_name, city_name] = ['', '', '', '']

      if (element.province_id)
      {
        province_name = getRegionNameById(element.province_id, allRegion)
      }

      if (element.region_id)
      {
        region_name = getRegionNameById(element.region_id, allRegion)
      }

      if (element.city_id)
      {
        city_name = getRegionNameById(element.city_id, allRegion)
      }

      name = province_name + '-' + region_name + '-' + city_name

      if (element.address_info)
      {
        name = name + '-' + element.address_info
      }

      regionName.push(name)
    })

    if (regionName.length < 1)
    {
      regionName.push('暂无地址')
    }
    return regionName
  }
}

/**
 *
 * @param {array} treeArray 树形数组,过滤出来的唯一还有子级的数组
 * @param {array} idArray  []空数组
 * @returns idArray 处理完的数组
 */
export function getAllTreeId(treeArray, idArray)
{
  treeArray.forEach(element =>
  {
    idArray.push(element.id)
    if (element.children)
    {
      getAllTreeId(element.children, idArray)
    }
  })
  return idArray
}
