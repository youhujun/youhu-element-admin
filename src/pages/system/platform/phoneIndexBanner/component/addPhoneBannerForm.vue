<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-09-22 14:51:37
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-12 23:31:09
 * @LastEditTime: 2021-09-23 18:51:53
-->
<template>
  <div>
    <el-form
      ref="addPhoneBannerForm"
      :model="addPhoneBannerForm"
      :rules="addPhoneBannerRules"
      label-width="150px"
      :inline="true"
      label-position="left"
      status-icon
      inline-message
      style="width:60%;margin: 0 auto;padding-top:30px;"
    >
      <el-row type="flex">
        <el-col :span="17" class="center">
          <el-form-item label="轮播图图片" prop="album_picture_id">
            <UploadSinglePicture
              :picture-id.sync="addPhoneBannerForm.album_picture_id"
              :upload-data="{id:1, use_type:10, file_type: '', save_path: 'banner'}"
              show-content="轮播图图片"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7" style="vertical-align: middle;line-height:35px;">
          <span>建议图片大小750*556</span>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="跳转url" prop="redirect_url">
            <el-input v-model="addPhoneBannerForm.redirect_url" placeholder="请输入" class="input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="备注信息" prop="remark_info">
            <el-input
              v-model="addPhoneBannerForm.remark_info"
              type="textarea"
              placeholder="请填写描述"
              class="input"
              maxlength="32"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="addPhoneBannerForm.sort" placeholder="默认100" class="input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="12" class="center">
          <el-form-item>
            <el-button type="primary" @click="submitForm('addPhoneBannerForm')">添加轮播图</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button @click="resetForm('addPhoneBannerForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import UploadSinglePicture from '@/pages/component/upload/uploadSinglePicture'
import { debounce } from '@/utils'
import { addPhoneBanner } from '@/api/system/platform/phoneBanner'
import permission from '@/directive/permission/index.js' // 权限判断指令
export default
{
  // 组件名称
  name: 'AddPhoneBannerForm',
  // 组件
  components:
    {
      UploadSinglePicture
    },
  directives: { permission },
  // 数据
  data()
  {
    return {
      pictureUrl: '',
      // 添加菜单表单
      addPhoneBannerForm: {
        id: 0,
        sort: 100,
        redirect_url: '',
        remark_info: '',
        album_picture_id: null
      },
      // 添加表单规则
      addPhoneBannerRules: {
        redirect_url: [
          { type: 'string', required: false, message: '请输入跳转链接', trigger: 'blur' },
          { pattern: /[\s\S]{1,}$/, message: '只能以字母,数字,-,.,/和_字符组成,不低于1位', trigger: 'blur' }
        ],
        remark_info: [
          { type: 'string', required: false, message: '请填写轮播图备注', trigger: 'blur' },
          { pattern: /^([\u4e00-\u9fa5\W]|[a-zA-Z0-9_]){2,}$/, message: '只能以字母,数字,汉字和_这种字符组成,不低于2位', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '必须填写排序', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: '只能是0-9数字', trigger: 'blur' }
        ]
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
    this.pictureUrl = process.env.VUE_APP_URL
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
    initPhoneBannerForm()
    {
      this.$refs.addPhoneBannerForm.resetFields()
    },
    // 提交表单
    submitForm: debounce(function(formName)
    {
      if (!this.addPhoneBannerForm.album_picture_id)
      {
        return this.$message.warning('请上传图片')
      }
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          this.addPhoneBanner(this.addPhoneBannerForm)
        }
        else
        {
          console.log('未通过验证!')
          return false
        }
      })
    }, 600),

    // 重置表单
    resetForm()
    {
      this.initPhoneBannerForm()
    },

    /**
     * 添加菜单
     */
    addPhoneBanner(data)
    {
      addPhoneBanner(data).then(res =>
      {
        if (res && res.code === 0)
        {
          this.$emit('handleCloseDialog', false)
          this.$emit('hanldeUpdateData', true)

          this.$message(
            {
              message: res.msg,
              type: 'success'
            })
          this.initPhoneBannerForm()
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
 .center{
    text-align: center;
 }
 .input,
 .select {
  width: 260px;
 }
</style>
