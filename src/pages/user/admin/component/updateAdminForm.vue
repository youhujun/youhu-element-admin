<!--
 * @Descripttion:
 * @revision:
 * @Author: YouHuJun
 * @Date: 2021-09-22 14:51:37
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-04 23:31:38
-->
<template>
  <div>
    <el-form
      ref="updateAdminForm"
      :model="updateAdminForm"
      :rules="updateAdminRules"
      label-width="100px"
      :inline="true"
      label-position="left"
      status-icon
      inline-message
      style="width:98%;text-align: center;padding-top:20px;"
    >
      <el-row v-permission="['develop','super']" type="flex">
        <el-col :span="24">
          <el-form-item label="管理员角色" prop="role">
            <el-cascader
              ref="role"
              v-model="updateAdminForm.role"
              :options="systemRoles"
              :props="{ expandTrigger: 'hover',value:'id',label:'role_name',leaf:'id',multiple: true, checkStrictly: true}"
              filterable
              clearable
              :show-all-levels="false"
              placeholder="请选择管理员角色(可多选)"
              style="width:400px;"
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
            <el-button type="primary" @click="submitForm('updateAdminForm')">修改管理员</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button @click="resetForm('updateAdminForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>

import { debounce } from '@/utils'
import { mapGetters } from 'vuex'
import { updateAdmin } from '@/api/user/admin'
import permission from '@/directive/permission/index.js' // 权限判断指令
export default
{
  // 组件名称
  name: 'UpdateAdminForm',
  // 组件
  components:
    {
    },
  directives: { permission },
  props:
    {
      beforeAdminForm: {
        type: Object,
        default: null
      }
    },
  // 数据
  data()
  {
    return {

      // 添加菜单表单
      updateAdminForm: {
        id: 0,
        user_id: '',
        role: []
      },
      // 添加表单规则
      updateAdminRules: {}
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
    beforeAdminForm: {
      handler(value)
      {
        this.updateAdminForm.id = value.id
        this.updateAdminForm.user_id = value.user_id

        const role = []
        for (const key in value.user.role)
        {
          if (value.user.role[key])
          {
            const array = []
            array.push(value.user.role[key].id)
            role.push(array)
          }
        }
        this.updateAdminForm.role = role
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
      this.$refs.updateAdminForm.resetFields()
    },
    // 提交表单
    submitForm: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          this.updateAdmin(this.updateAdminForm)
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
     * 修改菜单
     */
    updateAdmin(data)
    {
      updateAdmin(data).then(res =>
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
          this.initAdminForm()
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
