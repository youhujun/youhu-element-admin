<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-24 09:54:50
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-09-07 16:46:26
-->
<template>
  <div>
    <el-row>
      <el-col>
        <img v-if="pictureUrl" :src="pictureUrl" alt="" width="10%">
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getUserQrcode } from '@/api/user/user'
export default
{
  // 组件名称
  name: 'Qrcode',
  props:
    {
      rowList: {
        type: Object,
        default: () =>
        {
          return {}
        }
      }
    },
  // 数据
  data()
  {
    return {
      pictureUrl: ''
    }
  },
  // 挂载 --常用
  mounted()
  {
    this.getUserQrcode()
  },
  // 方法
  methods:
  {
    // 获取用户二维码
    getUserQrcode()
    {
      const params = {}
      params['user_id'] = this.rowList.id
      getUserQrcode(params).then(res =>
      {
        if (res.data)
        {
          this.pictureUrl = res.data.picture
        }
        else
        {
          this.pictureUrl = ''
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
