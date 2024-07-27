<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-09-22 14:51:37
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-03-29 11:53:14
 * @LastEditTime: 2021-09-23 18:51:53
-->
<template>
  <div>
    <el-form
      ref="addUserLevelForm"
      :model="addUserLevelForm"
      :rules="addUserLevelRules"
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
            <el-input v-model="addUserLevelForm.sort" placeholder="默认100" class="input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="级别名称" prop="level_name">
            <el-input v-model="addUserLevelForm.level_name" placeholder="请输入级别名称" class="input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="级别编码" prop="level_code">
            <el-input v-model="addUserLevelForm.level_code" placeholder="请输入级别编码" class="input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="金额" prop="amount">
            <el-input v-model="addUserLevelForm.amount" placeholder="请输入" class="input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="描述" prop="bak_info">
            <el-input
              v-model="addUserLevelForm.bak_info"
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
          <el-form-item label="背景图片" prop="background_id">
            <UploadSinglePicture
              :picture-id.sync="addUserLevelForm.background_id"
              show-content="背景图片"
              :upload-data="{id:0, use_type:20, file_type: '', save_path: 'picture'}"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="12" class="center">
          <el-form-item>
            <el-button type="primary" @click="submitForm('addUserLevelForm')">添加用户级别</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button @click="resetForm('addUserLevelForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>

import { debounce } from '@/utils'
import { addUserLevel } from '@/api/system/level/userLevel'
import permission from '@/directive/permission/index.js' // 权限判断指令
import UploadSinglePicture from '@/pages/component/upload/uploadSinglePicture'

export default
{
  // 组件名称
  name: 'AddUserLevelForm',
  // 组件
  components:
    {
      UploadSinglePicture
    },
  directives: { permission },
  // 数据
  data()
  {
    return {
      // 添加菜单表单
      addUserLevelForm: {
        id: 0,
        sort: 100,
        level_code: '',
        level_name: '',
        amount: 0,
        background_id: null,
        bak_info: ''
      },
      // 添加表单规则
      addUserLevelRules: {
        level_code: [
          { type: 'string', required: true, message: '请填写级别编码', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_]{1,}$/, message: '只能以字母,数字和_字符组成,不低于1位', trigger: 'blur' }
        ],
        level_name: [
          { type: 'string', required: true, message: '请填写级别名称', trigger: 'blur' },
          { pattern: /^([\u4e00-\u9fa5\W]|[a-zA-Z0-9_]){2,}$/, message: '只能以字母,数字,汉字和_这种字符组成,不低于2位', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '请填写金额', trigger: 'blur' },
          { pattern: /^[0-9]+([.]{1}[0-9]+){0,1}$/, message: '只能是数字', trigger: 'blur' }
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
    initUserLevelForm()
    {
      this.$refs.addUserLevelForm.resetFields()
    },
    // 提交表单
    submitForm: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          this.addUserLevel(this.addUserLevelForm)
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
      this.initUserLevelForm()
    },

    /**
     * 添加菜单
     */
    addUserLevel(data)
    {
      addUserLevel(data).then(res =>
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
          this.initUserLevelForm()
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.input {
  width: 260px;
}
</style>
