/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-05-23 15:19:35
 * @LastEditors: YouHuJun
 * @LastEditTime: 2021-06-14 16:14:51
 */
import Vue from 'vue'
import Clipboard from 'clipboard'

function clipboardSuccess()
{
  Vue.prototype.$message({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500
  })
}

function clipboardError()
{
  Vue.prototype.$message({
    message: 'Copy failed',
    type: 'error'
  })
}

export default function handleClipboard(text, event)
{
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () =>
  {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () =>
  {
    clipboardError()
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
