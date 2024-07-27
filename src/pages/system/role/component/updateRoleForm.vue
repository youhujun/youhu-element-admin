<!--
 * @Descripttion:
 * @revision:
 * @Author: YouHuJun
 * @Date: 2021-09-22 14:51:37
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-09-06 08:46:37
-->
<template>
  <div>
    <el-form
      ref="updateRoleForm"
      :model="updateRoleForm"
      :rules="updateRoleRules"
      label-width="150px"
      :inline="true"
      label-position="left"
      status-icon
      inline-message
      style="width:98%;margin-left:auto;margin-right: auto;padding:30px 20px;"
    >
      <el-row type="flex" justify="center">
        <el-col :span="14">
          <el-form-item label="逻辑名称" prop="logic_name">
            <el-input v-model="updateRoleForm.logic_name" placeholder="happy" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">实际代码执行用名称</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="14">
          <el-form-item label="角色名称" prop="role_name">
            <el-input v-model="updateRoleForm.role_name" placeholder="汉字名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">显示用的名称</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="14">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="updateRoleForm.sort" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">数值越大,顺序靠前,默认100</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button type="primary" @click="submitForm('updateRoleForm')">修改角色</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button @click="resetForm('updateRoleForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { updateRole } from '@/api/system/role/role'
import { debounce } from '@/utils'
export default
{
  // 组件名称
  name: 'UpdateRoleForm',
  // 组件
  components:
    {
    },
  props:
    {
      beforeRoleForm: {
        type: Object,
        default: null
      }
    },
  // 数据
  data()
  {
    return {
      // 添加菜单表单
      updateRoleForm: {
        id: 0,
        parent_id: 0,
        deep: 1,
        revision: 0,
        sort: 100,
        role_name: '',
        logic_name: ''
      },
      // 添加表单规则
      updateRoleRules: {
        sort: [
          { required: true, message: '必须有排序', trigger: 'blur' },
          { pattern: /^[0-9]{1,10}$/, message: '只能0-9的数字', trigger: 'blur' }
        ],
        role_name: [
          { type: 'string', required: true, message: '请填写显示名称', trigger: 'blur' },
          { pattern: /^([\u4e00-\u9fa5]|[a-zA-Z0-9_-]){2,10}$/, message: '只能是汉字、数字、字母或_-组成', trigger: 'blur' }
        ],
        logic_name: [
          { type: 'string', required: true, message: '请输入逻辑名称', trigger: 'blur' },
          { pattern: /^([a-zA-Z0-9/_-]){1,60}$/, message: '只能以数字,字母和/_-组成,且不得低于3位', trigger: 'blur' }
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
    beforeRoleForm: {
      handler(value)
      {
        this.updateRoleForm = JSON.parse(JSON.stringify(value))
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
    initRoleForm()
    {
      this.$refs.updateRoleForm.resetFields()
    },
    // 提交表单
    submitForm: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          this.updateRole(this.updateRoleForm)
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
      this.initRoleForm()
    },

    /**
     * 更新菜单
     */
    updateRole(data)
    {
      const that = this
      updateRole(data).then(res =>
      {
        if (res && res.code === 0)
        {
          that.$store.dispatch('system/getTreeRole')
          that.$emit('handleCloseDialog', false)

          that.$message(
            {
              message: res.msg,
              type: 'success'
            })
          that.initRoleForm()
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
</style>
