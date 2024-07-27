<!--
 * @Descripttion:
 * @revision:
 * @Author: YouHuJun
 * @Date: 2021-09-22 14:51:37
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-08-28 14:48:10
-->
<template>
  <div>
    <el-form
      ref="updatePhoneBannerForm"
      :model="updatePhoneBannerForm"
      :rules="updatePhoneBannerRules"
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
              :picture-id.sync="updatePhoneBannerForm.album_picture_id"
              :before-picture-object="updatePhoneBannerForm.picture"
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
            <el-input v-model="updatePhoneBannerForm.redirect_url" placeholder="请输入" class="input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="备注信息" prop="remark_info">
            <el-input
              v-model="updatePhoneBannerForm.remark_info"
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
            <el-input v-model="updatePhoneBannerForm.sort" placeholder="默认100" class="input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="12" class="center">
          <el-form-item>
            <el-button type="primary" @click="submitForm('updatePhoneBannerForm')">修改轮播图</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button @click="resetForm('updatePhoneBannerForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { updatePhoneBanner } from '@/api/system/platform/phoneBanner'
import { debounce } from '@/utils'
import permission from '@/directive/permission/index.js' // 权限判断指令
import UploadSinglePicture from '@/pages/component/upload/uploadSinglePicture'
export default
{
  // 组件名称
  name: 'UpdatePhoneBannerForm',
  // 组件
  components:
    {
      UploadSinglePicture
    },
  directives: { permission },
  props:
    {
      beforePhoneBannerForm: {
        type: Object,
        default: null
      }
    },
  // 数据
  data()
  {
    return {
      pictureUrl: process.env.VUE_APP_URL,
      // 添加菜单表单
      updatePhoneBannerForm: {
        id: 0,
        sort: 100,
        redirect_url: '',
        remark_info: '',
        album_picture_id: ''
      },
      // 添加表单规则
      updatePhoneBannerRules: {
        redirect_url: [
          { type: 'string', required: false, message: '跳转链接', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9\._-]{1,}$/, message: '只能以字母,数字,-,.和_字符组成,不低于1位', trigger: 'blur' }
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
    beforePhoneBannerForm: {
      handler(value)
      {
        this.updatePhoneBannerForm = JSON.parse(JSON.stringify(value))
      },
      deep: true,
      immediate: true
    }
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
    initPhoneBannerLevelForm()
    {
      this.$refs.updatePhoneBannerForm.resetFields()
    },
    // 提交表单
    submitForm: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          this.updatePhoneBannerForm.album_picture_id = this.updatePhoneBannerForm.album_picture_id.join()
          this.updatePhoneBanner(this.updatePhoneBannerForm)
        }
        else
        {
          console.log('未通过验证!')
          return false
        }
      })
    }, 600),

    // 重置表单
    resetForm(formName)
    {
      this.initPhoneBannerLevelForm()
    },

    /**
     * 更新菜单
     */
    updatePhoneBanner(data)
    {
      const that = this
      updatePhoneBanner(data).then(res =>
      {
        if (res && res.code === 0)
        {
          that.$emit('handleCloseDialog', false)
          that.$emit('hanldeUpdateData', true)

          that.$message(
            {
              message: res.msg,
              type: 'success'
            })
          that.initPhoneBannerLevelForm()
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
