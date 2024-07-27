<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-09-22 14:51:37
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-01-06 16:16:04
 * @LastEditTime: 2021-09-23 18:51:53
-->
<template>
  <div>
    <el-form
      ref="addLabelForm"
      :model="addLabelForm"
      :rules="addLabelRules"
      label-width="110px"
      :inline="true"
      label-position="left"
      status-icon
      inline-message
      style="width:80%;margin-left:auto;margin-right: auto;padding:30px 20px;"
    >
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="标签名称" prop="label_name">
            <el-input v-model="addLabelForm.label_name" placeholder="名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">显示用的名称</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="标签代码" prop="label_code">
            <el-input v-model="addLabelForm.label_code" placeholder="代码" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">标签标识代码</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="addLabelForm.sort" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">数值越大,顺序靠前,默认100</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="备注信息" prop="remark_info">
            <el-input
              v-model="addLabelForm.remark_info"
              type="textarea"
              :rows="1"
              :autosize="{ minRows: 2, maxRows: 6 }"
              placeholder="请输入内容"
              maxlength="1000"
              show-word-limit
              class="info"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="标签图片" prop="label_picture_id">
            <UploadSinglePicture :picture-id.sync="addLabelForm.label_picture_id" :upload-data="{id:0, use_type:20, file_type: '', save_path: 'picture'}" show-content="标签图片" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button type="primary" @click="submitForm('addLabelForm')">添加标签</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button @click="resetForm('addLabelForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import UploadSinglePicture from '@/pages/component/upload/uploadSinglePicture'
import { addLabel } from '@/api/system/group/label'
import { debounce } from '@/utils'
export default
{
  // 组件名称
  name: 'AddLabelForm',
  // 组件
  components:
  {
    UploadSinglePicture
  },
  props:
  {
    newAddLabelFrom: {
      type: Object,
      default: null
    }
  },
  // 数据
  data()
  {
    return {
      // 添加菜单表单
      addLabelForm: {
        id: 0,
        parent_id: 0,
        deep: 1,
        sort: 100,
        // 标签名称
        classification_name: '',
        // 标签代码
        classification_code: '',
        // 备注信息
        remark_info: '',
        // 标签图片id
        label_picture_id: null
      },
      // 添加表单规则
      addLabelRules: {
        sort: [
          { required: true, message: '必须有排序', trigger: 'blur' },
          { pattern: /^[0-9]{1,10}$/, message: '只能0-9的数字', trigger: 'blur' }
        ],
        label_name: [
          { type: 'string', required: true, message: '请填写显示名称', trigger: 'blur' }
        ],
        label_code: [
          { type: 'string', message: '请填写代码标识', trigger: 'blur' }
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
    newAddLabelFrom:
    {
      handler(value)
      {
        // console.log(value)
        if (value)
        {
          this.addLabelForm.parent_id = value.parent_id
          this.addLabelForm.deep = value.deep
        }
      },
      deep: true,
      immediate: true
    }
  },
  // 方法
  methods:
  {
    initLabelForm()
    {
      this.$refs.addLabelForm.resetFields()
    },
    // 提交表单
    submitForm: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          this.addLabel(this.addLabelForm)
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
      this.initLabelForm()
    },

    /**
     * 添加
     */
    addLabel(data)
    {
      const that = this
      addLabel(data).then(res =>
      {
        if (res && res.code === 0)
        {
          that.$store.dispatch('label/getTreeLabel')
          that.$emit('handleCloseDialog', false)
          that.$message(
            {
              message: res.msg,
              type: 'success'
            })
          that.initLabelForm()
        }
      })
    }

  }
}
</script>
<style lang='scss' scoped>
/**表单 */
 .content::v-deep .el-form-item__label{
   width:150px;
 }
 .info{
   width: 400px;
 }
</style>
