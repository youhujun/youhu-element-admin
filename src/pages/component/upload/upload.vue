<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-09 13:36:35
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-05-07 09:14:42
-->
<template>
  <div>
    <el-upload
      class="upload-demo"
      :show-file-list="false"
      :on-success="handleUploadSuccess"
      :before-upload="beforeUpload"
      :headers="headers"
      :data="uploadData"
      :accept="accept"
      :action="uploadUrl"
      :name="fileName"
    >
      <el-button type="warning">{{ showContent }}</el-button>
    </el-upload>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
export default
{
  // 组件名称
  name: 'UploadFile',
  // 组件
  components:
    {
    },
  props:
    {
      picture: {
        type: Boolean,
        default: false
      },
      fileName: {
        type: String,
        default: 'file'
      },
      actionUrl: {
        type: String,
        default: 'uploadFile'
      },
      uploadData: {
        type: Object,
        default: () =>
        {
          return {}
        }
      },
      accept: {
        type: String,
        default: 'image/*,.pdf'
      },
      type: {
        type: String,
        default: 'file'
      },
      showContent: {
        type: String,
        default: '导入'
      }
    },
  // 数据
  data()
  {
    return {
      baseUrl: '',
      uploadUrl: '',
      headers: {
        'time': new Date().getTime(),
        'type': this.type,
        'X-Token': getToken()
      }
    }
  },
  // 计算属性
  computed:
    {
    },
  // 监听
  watch:
    {
    },
  // 实例创建之前
  beforeCreate()
  {
  },
  // 创建
  created()
  {
  },
  // 挂载之前
  beforeMount()
  {
  },
  // 挂载 --常用
  mounted()
  {
    this.baseUrl = process.env.VUE_APP_URL
    this.uploadUrl = process.env.VUE_APP_BASE_API + this.actionUrl
  },
  // 更新之前
  beforeUpdate()
  {
  },
  // 跟新后
  updated()
  {
  },
  // 销毁之前
  beforeDestroy()
  {
  },
  // 销毁后
  destroyed()
  {
  },
  // 方法
  methods:
  {
    /**
     * 上传成功回调
     */
    handleUploadSuccess(res, file)
    {
      if (res && res.code === 0)
      {
        this.$emit('hanldeUpdateData', true)

        this.$message(
          {
            message: res.msg,
            type: 'success'
          })
      }
      else
      {
        this.$message(
          {
            message: '文件上传失败',
            type: 'error'
          })
      }
    },
    /**
     *上传成功回调限制
     */
    beforeUpload(file)
    {
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isLt5M)
      {
        this.$message.error('上传文件小不能超过 5MB!')
      }
      return isLt5M
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
