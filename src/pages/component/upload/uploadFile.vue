<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-09 13:36:35
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-24 20:28:12
-->
<template>
  <div>
    <el-upload
      class="upload-demo"
      :show-file-list="showFileList"
      :before-upload="beforeUpload"
      :http-request="uploadFile"
      :headers="headers"
      :data="uploadData"
      :accept="accept"
      :action="uploadUrl"
      :name="fileName"
    >
      <el-button type="primary">{{ showContent }}</el-button>
    </el-upload>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import { uploadConfigFile } from '@/api/system/upload/upload'

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
      // 限制文件上传格式
      accept: {
        type: String,
        default: ''
      },
      // 是否显示文件
      showFileList: {
        type: Boolean,
        default: false
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
    // 上传数量超限回调
    handleExceed()
    {
      this.$message.error('超出最大上传数量限制')
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
    },
    // 自定义上传
    uploadFile(file)
    {
      const { file_type, use_type, type, save_path } = file.data
      const formData = new FormData()
      formData.append('file', file.file)
      formData.append('file_type', file_type)
      formData.append('use_type', use_type)
      formData.append('save_path', save_path)
      formData.append('type', type)
      uploadConfigFile(formData).then(res =>
      {
        if (res && res.code === 0)
        {
          this.$message(
            {
              message: res.msg,
              type: 'success'
            })

          this.$emit('update:filePath', res.data)
        }
        else
        {
          this.$message(
            {
              message: '文件上传失败',
              type: 'error'
            })
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
