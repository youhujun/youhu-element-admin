<!--
 * @Descripttion:
 * @revision:
 * @Author: YouHuJun
 * @Date: 2021-09-22 14:51:37
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-03-29 12:21:31
-->
<template>
  <div>
    <el-form
      ref="updateLevelItemForm"
      :model="updateLevelItemForm"
      :rules="updateLevelItemRules"
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
            <el-input v-model="updateLevelItemForm.sort" placeholder="默认100" class="input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="级别类型" prop="type">
            <el-select v-model="updateLevelItemForm.type" placeholder="请选择" class="select">
              <el-option label="数值" value="10" />
              <el-option label="百分比" value="20" />
              <el-option label="时间" value="30" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="级别名称" prop="item_name">
            <el-input v-model="updateLevelItemForm.item_name" placeholder="请输入" class="input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="级别编码" prop="item_code">
            <el-input v-model="updateLevelItemForm.item_code" placeholder="请输入" class="input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="描述" prop="description">
            <el-input
              v-model="updateLevelItemForm.description"
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
        <el-col :span="12" class="center">
          <el-form-item>
            <el-button type="primary" @click="submitForm('updateLevelItemForm')">修改级别类型</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button @click="resetForm('updateLevelItemForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { updateLevelItem } from '@/api/system/level/levelItem'
import { debounce } from '@/utils'
import permission from '@/directive/permission/index.js' // 权限判断指令

export default
{
  // 组件名称
  name: 'UpdateLevelItemForm',
  // 组件
  components:
    {
    },
  directives: { permission },
  props:
    {
      beforeLevelItemForm: {
        type: Object,
        default: null
      }
    },
  // 数据
  data()
  {
    return {
      // 添加菜单表单
      updateLevelItemForm: {
        id: 0,
        sort: 100,
        type: '10',
        item_name: '',
        item_code: '',
        description: ''
      },
      // 添加表单规则
      updateLevelItemRules: {
        type: [
          { required: true, message: '必须选择配置项', trigger: 'blur' }
        ],
        item_code: [
          { type: 'string', required: true, message: '请填写级别编码', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_]{1,}$/, message: '只能以字母,数字和_字符组成,不低于1位', trigger: 'blur' }
        ],
        item_name: [
          { type: 'string', required: true, message: '请填写级别名称', trigger: 'blur' },
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
    beforeLevelItemForm: {
      handler(value)
      {
        this.updateLevelItemForm = JSON.parse(JSON.stringify(value))
        this.updateLevelItemForm.type = String(this.updateLevelItemForm.type)
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
    initLevelItemLevelForm()
    {
      this.$refs.updateLevelItemForm.resetFields()
    },
    // 提交表单
    submitForm: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          this.updateLevelItem(this.updateLevelItemForm)
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
      this.initLevelItemLevelForm()
    },

    /**
     * 更新菜单
     */
    updateLevelItem(data)
    {
      const that = this
      updateLevelItem(data).then(res =>
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
          that.initLevelItemLevelForm()
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
