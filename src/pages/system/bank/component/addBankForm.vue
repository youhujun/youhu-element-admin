<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-09-22 14:51:37
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-04-21 14:10:10
 * @LastEditTime: 2021-09-23 18:51:53
-->
<template>
  <div>
    <el-form
      ref="addBankForm"
      :model="addBankForm"
      :rules="addBankRules"
      label-width="100px"
      :inline="true"
      label-position="left"
      status-icon
      inline-message
      style="width:98%;margin-left:auto;margin-right: auto;padding:10px 10px;"
    >
      <el-row type="flex">
        <el-col :span="12" class="center">
          <el-form-item label="银行名称" prop="bank_name">
            <el-input v-model="addBankForm.bank_name" placeholder="一般为汉字" />
          </el-form-item>
        </el-col>
        <el-col :span="12" class="center">
          <el-form-item label="银行编码" prop="bank_code">
            <el-input v-model="addBankForm.bank_code" placeholder="英文或拼音(非必填)" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="12" class="center">
          <el-form-item label="是否常用" prop="is_default">
            <el-switch
              v-model="addBankForm.is_default"
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
            <el-input v-model="addBankForm.sort" placeholder="默认100" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button type="primary" @click="submitForm('addBankForm')">添加银行</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button @click="resetForm('addBankForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>

import { debounce } from '@/utils'
import { addBank } from '@/api/system/bank/bank'
import permission from '@/directive/permission/index.js' // 权限判断指令
export default
{
  // 组件名称
  name: 'AddBankForm',
  // 组件
  components:
    {
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
      addBankForm: {
        id: 0,
        bank_name: '',
        bank_code: '',
        is_default: 1,
        sort: 100

      },
      // 添加表单规则
      addBankRules: {
        bank_name: [
          { required: true, message: '必须有银行名称', trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fa5\W]{2,20}$/, message: '只能是汉字,个数2-20', trigger: 'blur' }
        ],
        bank_code: [
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

    initBankForm()
    {
      this.$refs.addBankForm.resetFields()
    },
    // 提交表单
    submitForm: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          // console.log(this.addBankForm)
          this.addBank(this.addBankForm)
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
      this.initBankForm()
    },

    /**
     * 添加菜单
     */
    addBank(data)
    {
      const that = this
      addBank(data).then(res =>
      {
        // console.log(res)
        if (res && res.code === 0)
        {
          that.$emit('handleCloseDialog', false)
          that.$emit('hanldeUpdateData', true)

          that.$message(
            {
              message: res.msg,
              type: 'success'
            })
          that.initBankForm()
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
</style>
