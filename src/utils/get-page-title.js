/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-05-23 15:19:35
 * @LastEditors: YouHuJun
 * @LastEditTime: 2021-06-14 16:14:44
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Element Admin'

export default function getPageTitle(pageTitle)
{
  if (pageTitle)
  {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
