<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-09-22 14:51:37
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-09-12 13:38:47
 * @LastEditTime: 2021-09-23 18:51:53
-->
<template>
  <div>
    <el-form
      ref="addAdminForm"
      :model="addAdminForm"
      :rules="addAdminRules"
      label-width="100px"
      :inline="true"
      label-position="left"
      status-icon
      inline-message
      style="width:98%;text-align: center;padding-top:20px;"
    >
      <el-row v-permission="['develop','super']" type="flex">
        <el-col :span="24">
          <el-form-item label="用户" prop="user_id">
            <selectUser :user-id.sync="addAdminForm.user_id" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-permission="['develop','super']" type="flex">
        <el-col :span="24">
          <el-form-item label="管理员角色" prop="role">
            <el-cascader
              ref="role"
              v-model="addAdminForm.role"
              :options="systemRoles"
              :props="{ expandTrigger: 'hover',value:'id',label:'role_name',leaf:'id',multiple: true, checkStrictly: true}"
              filterable
              clearable
              :show-all-levels="false"
              placeholder="请选择管理员角色(可多选)"
              style="width:300px;"
            >
              <template slot-scope="{ node, data }">
                <span>{{ data.role_name }}</span>
                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
              </template>
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button type="primary" @click="submitForm('addAdminForm')">添加管理员</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button @click="resetForm('addAdminForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import selectUser from './selectUser'
import { debounce } from '@/utils'
import { mapGetters } from 'vuex'

import { addAdmin } from '@/api/user/admin'
import permission from '@/directive/permission/index.js' // 权限判断指令

export default
{
  // 组件名称
  name: 'AddAdminForm',
  // 组件
  components:
    {
      selectUser
    },
  directives: { permission },
  props:
    {

    },
  // 数据
  data()
  {
    return {

      // 添加菜单表单
      addAdminForm: {
        user_id: null,
        role: []
      },
      // 添加表单规则
      addAdminRules: {
        user_id: [
          { required: true, message: '必须有用户', trigger: 'blur' }
        ]
      }
    }
  },
  // 计算属性
  computed:
  {
    ...mapGetters(['systemRoles'])
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
    // 页面刷新,从vuex重新加载管理员角色
    this.$store.dispatch('system/getTreeRole')
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
    initAdminForm()
    {
      this.addAdminForm = {
        id: 0,
        user_id: null,
        role: []
      }
    },
    // 提交表单
    submitForm: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          this.addAdmin(this.addAdminForm)
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
      this.initAdminForm()
    },

    /**
     * 添加菜单
     */
    addAdmin(data)
    {
      addAdmin(data).then(res =>
      {
        // console.log(res)
        if (res && res.code === 0)
        {
          this.$emit('handleCloseDialog', false)
          this.$emit('hanldeUpdateData', true)

          this.$message(
            {
              message: res.msg,
              type: 'success'
            })
          this.initAdminForm()
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
