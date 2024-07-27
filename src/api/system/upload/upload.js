import request from '@/utils/request'

// 单图替换上传
export function uploadConfigFile(data)
{
  return request({
    url: `/uploadConfigFile`,
    method: 'post',
    withCredentials: false,
    data
  })
}

