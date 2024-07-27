/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-10-02 12:36:58
 * @LastEditors: YouHuJun
 * @LastEditTime: 2023-02-25 12:17:04
 */

function encodeMessage(event, data)
{
  return JSON.stringify([event, data])
}

function decodeMessage(socket, event)
{
  let result = null

  const code = Number(event.data.substring(0, 2))

  if (code === 42)
  {
    const data = JSON.parse(event.data.slice(2))

    // console.log(data)

    result = data[1]

    socket.close()
  }

  return result
}

function socketConnect()
{
  const wsServer = `ws://${process.env.VUE_APP_HOST}:${process.env.VUE_APP_SOCKET_PORT}`

  const socket = new WebSocket(wsServer)

  return socket
}

export function executeSocket(param, callback)
{
  const socket = socketConnect()

  socket.onopen = function(event)
  {
    const { route, sendData } = param
    socket.send(encodeMessage(route, sendData))
    console.log('Connected to socket server.')
  }

  socket.onmessage = function(event)
  {
    const data = decodeMessage(socket, event)
    if (data)
    {
      // console.log(data)
      callback(data)
    }
    // console.log('Retrieved data from server: ' + event.data)
  }

  socket.onclose = function(event)
  {
    console.log('Disconnected')
  }

  socket.onerror = function(event, e)
  {
    console.log('Error occured: ' + event.data)
  }
}
