<!--
 * @Descripttion:
 * @revision:
 * @Author: YouHuJun
 * @Date: 2021-09-22 14:51:37
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-12-08 16:50:25
-->
<template>
  <div>
    <el-form
      ref="updateReplaceForm"
      :model="updateReplaceForm"
      :rules="updateReplaceRules"
      label-width="220px"
      :inline="true"
      label-position="left"
      status-icon
      inline-message
      style="width:80%;margin-left:auto;margin-right: auto;padding:30px 20px;"
    >
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="updateReplaceForm.sort" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">数值越大,顺序靠前,默认100</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="分润比例" prop="rate">
            <el-input v-model="updateReplaceForm.rate" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">分配利润的比例,默认0,不分配</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="分类名称" prop="replace_name">
            <el-input v-model="updateReplaceForm.replace_name" placeholder="名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">显示用的名称</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="备注信息" prop="remark_info">
            <el-input
              v-model="updateReplaceForm.remark_info"
              type="textarea"
              :rows="1"
              :autosize="{ minRows: 2, maxRows: 6 }"
              placeholder="请输入内容"
              maxlength="30"
              show-word-limit
              class="info"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="分类图片" prop="category_picture_id">
            <UploadSinglePicture :picture-id.sync="updateReplaceForm.replace_picture_id" show-content="分类图片" :before-picture-object="updateReplaceForm.picture" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button type="primary" @click="submitForm('updateReplaceForm')">修改分类</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button @click="resetForm('updateReplaceForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import UploadSinglePicture from '@/pages/component/upload/uploadSinglePicture'
import { updateReplace } from '@/api/replace'
import { debounce } from '@/utils'
export default
{
  // 组件名称
  name: 'UpdateReplaceForm',
  // 组件
  components:
    {
      UploadSinglePicture
    },
  props:
    {
      beforeReplaceForm: {
        type: Object,
        default: null
      }
    },
  // 数据
  data()
  {
    return {
      // 添加菜单表单
      updateReplaceForm: {
        id: 0,
        parent_id: 0,
        deep: 1,
        rate: 0,
        revision: 0,
        sort: 100,
        replace_name: ''
      },
      // 添加表单规则
      updateReplaceRules: {
        id: [
          { type: 'number', required: true, message: '必须有级别id', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '必须有排序', trigger: 'blur' },
          { pattern: /^[0-9]{1,10}$/, message: '只能0-9的数字', trigger: 'blur' }
        ],
        rate: [
          { pattern: /^[0-9]{1,3}$/, message: '只能0-9的数字', trigger: 'blur' }
        ],
        replace_name: [
          { type: 'string', required: true, message: '请填写显示名称', trigger: 'blur' },
          { pattern: /^([\u4e00-\u9fa5\W]|[a-zA-Z0-9_]){2,10}$/, message: '只能以字母,数字,汉字和_这种字符组成,不低于2位', trigger: 'blur' }
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
    beforeReplaceForm: {
      handler(value)
      {
        console.log(value)
        this.updateReplaceForm['id'] = value['id']
        this.updateReplaceForm['parent_id'] = value['parent_id']
        this.updateReplaceForm['deep'] = value['deep']
        this.updateReplaceForm['sort'] = value['sort']
        this.updateReplaceForm['rate'] = value['rate']
        this.updateReplaceForm['replace_name'] = value['replace_name']
        this.updateReplaceForm['replace_code'] = value['replace_code']
        this.updateReplaceForm['remark_info'] = value['remark_info']
        this.updateReplaceForm['replace_picture_id'] = value['replace_picture_id']
        this.updateReplaceForm['picture'] = value['picture']
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
    initReplaceForm()
    {
      const convertData = this.beforeCategoryForm
      this.updateReplaceForm['id'] = convertData['id']
      this.updateReplaceForm['parent_id'] = convertData['parent_id']
      this.updateReplaceForm['deep'] = convertData['deep']
      this.updateReplaceForm['sort'] = convertData['sort']
      this.updateReplaceForm['rate'] = convertData['rate']
      this.updateReplaceForm['_name'] = convertData['_name']
      this.updateReplaceForm['_code'] = convertData['_code']
      this.updateReplaceForm['remark_info'] = convertData['remark_info']
      this.updateReplaceForm['_picture_id'] = convertData['_picture_id']
      this.updateReplaceForm['picture'] = convertData['picture']
    },
    // 提交表单
    submitForm: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          this.updateReplace(this.updateReplaceForm)
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
      this.initReplaceForm()
    },

    /**
     * 更新菜单
     */
    updateReplace(data)
    {
      const that = this
      updateReplace(data).then(res =>
      {
        if (res && res.code === 0)
        {
          that.$store.dispatch('replace/getTreeReplace', res.data)
          that.$emit('closeDialog', false)

          that.$message(
            {
              message: res.msg,
              type: 'success'
            })
          that.initReplaceForm()
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
