<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-03-30 16:18:02
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-05 00:33:35
-->
<template>
  <div>
    <el-upload
      ref="upload"
      :action="uploadUrl"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="uploadPicture"
      :headers="headers"
      :data="uploadData"
      accept="image/*"
      name="picture"
    >
      <el-avatar :size="120" :src="baseAvatar" fit="cover">
        <!-- 图片加载失败时的默认图片 -->
        <img src="~@/assets/img/header/avatar.gif">
      </el-avatar>
    </el-upload>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import { uploadUserAvatar } from '@/api/user/user'
export default
{
  // 组件名称
  name: 'Avatar',
  // 组件
  components:
    {
    },
  props:
    {
      uploadData: {
        type: Object,
        default: () =>
        {
          return {}
        }
      },
      // 用户对象
      avatar: {
        type: String,
        default: ''
      }
    },
  // 数据
  data()
  {
    return {
      uploadUrl: 'uploadSinglePicture',
      baseAvatar: '',
      headers: {
        'time': new Date().getTime(),
        'type': 'picture',
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
    this.baseAvatar = this.avatar
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
      // 自定义上传图片
      uploadPicture(file)
      {
        const formData = new FormData()
        formData.set('id', file.data.id)
        formData.append('picture', file.file)
        formData.append('use_type', file.data.use_type)
        formData.append('file_type', file.data.file_type)
        formData.append('save_path', file.data.save_path)
        formData.append('user_id', file.data.user_id)
        uploadUserAvatar(formData).then(res =>
        {
          if (res && res.code === 0)
          {
            this.baseAvatar = res.data.picture
            this.event.$emit('updateData', true)
            this.$message({
              type: 'success',
              message: '上传成功'
            })
          }
        })
      },
      /**
     *上传成功回调限制
     */
      beforeAvatarUpload(file)
      {
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isLt2M)
        {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
      }
    }
}
</script>
<style lang='scss' scoped>
</style>
