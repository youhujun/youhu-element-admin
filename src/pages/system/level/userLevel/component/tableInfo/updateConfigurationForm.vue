<!--
 * @Descripttion:
 * @revision:
 * @Author: YouHuJun
 * @Date: 2021-09-22 14:51:37
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-27 22:24:00
-->
<template>
  <div>
    <el-form
      ref="updateConfigurationForm"
      :model="updateConfigurationForm"
      :rules="updateConfigurationRules"
      label-width="150px"
      :inline="true"
      label-position="left"
      status-icon
      inline-message
      style="width:60%;margin-left:auto;margin-right: auto;padding:10px 10px;"
    >
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="updateConfigurationForm.sort" placeholder="默认100" class="input" @input="input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="级别配置项" prop="level_item_id">
            <selectUserLevel :level-item-id.sync="updateConfigurationForm.level_item_id" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="值" prop="value">
            <el-input v-model="updateConfigurationForm.value" placeholder="请输入" class="input" @input="input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="与值之间的关系" prop="value_type">
            <el-select v-model="updateConfigurationForm.value_type" placeholder="请选择" class="select" @input="input">
              <el-option v-for="item in valueTypeOptions" :key="item.value" :value="item.value" :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="12" class="center">
          <el-form-item>
            <el-button type="primary" @click="submitForm('updateConfigurationForm')">修改用户级别配置项</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button @click="resetForm('updateConfigurationForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { updateUserLevelItemUnion } from '@/api/system/level/userLevel'
import { debounce } from '@/utils'
import permission from '@/directive/permission/index.js' // 权限判断指令
import SelectUserLevel from './selectUserLevel.vue'

export default
{
  // 组件
  components:
    {
      SelectUserLevel
    },
  directives: { permission },
  props:
    {
      beforeConfiguration: {
        type: Object,
        default: null
      }
    },
  // 数据
  data()
  {
    return {
      // 添加菜单表单
      updateConfigurationForm: {},
      // 添加表单规则
      updateConfigurationRules: {
        level_item_id: [
          { required: true, message: '请选择级别配置项', trigger: 'change' }
        ],
        value_type: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        value: [
          { required: true, message: '请选择与值之间的关系', trigger: 'blur' },
          { pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/, message: '只能是数字', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '必须填写排序', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: '只能是0-9数字', trigger: 'blur' }
        ]
      },
      valueTypeOptions: [
        { value: 10, label: '=' },
        { value: 20, label: '>' },
        { value: 30, label: '<' },
        { value: 40, label: '>=' },
        { value: 50, label: '<=' }
      ]
    }
  },
  // 计算属性
  computed:
  {

  },
  // 监听
  watch:
  {
    beforeConfiguration: {
      handler(value)
      {
        this.updateConfigurationForm = JSON.parse(JSON.stringify(value.user_level_item_value))
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
    initUserLevelLevelForm()
    {
      this.$refs.updateConfigurationForm.resetFields()
    },
    // 提交表单
    submitForm: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          this.updateUserLevelItemUnion(this.updateConfigurationForm)
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
      this.initUserLevelLevelForm()
    },

    /**
     * 更新菜单
     */
    updateUserLevelItemUnion(data)
    {
      const that = this
      updateUserLevelItemUnion(data).then(res =>
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
          that.initUserLevelLevelForm()
        }
      })
    },
    // 解决选中不改变方法
    input()
    {
      this.$forceUpdate()
    }
  }
}
</script>
<style lang='scss' scoped>
 .input,
 .select {
  width: 300px;
 }
</style>
