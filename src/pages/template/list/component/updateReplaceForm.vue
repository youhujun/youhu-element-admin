<!--
 * @Descripttion:
 * @revision:
 * @Author: YouHuJun
 * @Date: 2021-09-22 14:51:37
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-17 21:38:04
-->
<template>
  <div>
    <el-form
      ref="updateReplaceForm"
      :model="updateReplaceForm"
      :rules="updateReplaceRules"
      label-width="100px"
      :inline="true"
      label-position="left"
      status-icon
      inline-message
      style="width:98%;margin-left:auto;margin-right: auto;padding:10px 10px;"
    >
      <el-row type="flex">
        <el-col :span="12" class="center">
          <el-form-item label="地址名称" prop="replace_name">
            <el-input v-model="updateReplaceForm.replace_name" placeholder="一般为汉字" />
          </el-form-item>
        </el-col>
        <el-col :span="12" class="center">
          <el-form-item label="地址编码" prop="replace_code">
            <el-input v-model="updateReplaceForm.replace_code" placeholder="英文或拼音(非必填)" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="12" class="center">
          <el-form-item label="是否常用" prop="is_default">
            <el-switch
              v-model="updateReplaceForm.is_default"
              active-text="是"
              inactive-text="否"
              :width="40"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" class="center">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="updateReplaceForm.sort" placeholder="默认100" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button type="primary" @click="submitForm('updateReplaceForm')">修改地址</el-button>
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

import { debounce } from '@/utils'

import { updateReplace } from '@/api/replace'
import permission from '@/directive/permission/index.js' // 权限判断指令
export default
{
  // 组件名称
  name: 'UpdateReplaceForm',
  // 组件
  components:
    {
    },
  directives: { permission },
  props:
    {
      userList: {
        type: Array,
        default: () =>
        {
          return []
        }
      },
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
        replace_name: '',
        replace_code: '',
        is_default: 0,
        sort: 100
      },
      // 添加表单规则
      updateReplaceRules: {
        replace_name: [
          { required: true, message: '必须有地址名称', trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fa5\W]{2,10}$/, message: '只能是汉字,个数2-10', trigger: 'blur' }
        ],
        replace_code: [
          { pattern: /[.]*/, message: '随便', trigger: 'blur' }
        ],
        is_default: [
          { pattern: /^[01]$/, message: '只能是0或1', trigger: 'blur' }
        ],
        sort: [
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
    beforeReplaceForm: {
      handler(value)
      {
        this.updateReplaceForm.id = value.id
        this.updateReplaceForm.replace_name = value.replace_name
        this.updateReplaceForm.replace_name = value.replace_name
        this.updateReplaceForm.is_default = value.is_default
        this.updateReplaceForm.sort = value.sort
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
      // console.log(this.beforeReplaceForm)
      Object.assign(this.updateReplaceForm, this.beforeReplaceForm)
    },
    // 提交表单
    submitForm: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          // console.log(this.updateReplaceForm)
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
     * 添加菜单
     */
    updateReplace(data)
    {
      const that = this
      updateReplace(data).then(res =>
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
          that.initReplaceForm()
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
/**表单 */
 /* .content::v-deep .el-form-item__label{
   width:100px;
 } */
</style>
