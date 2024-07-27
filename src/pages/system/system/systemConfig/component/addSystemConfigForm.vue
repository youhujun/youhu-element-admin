<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-09-22 14:51:37
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-19 11:45:22
 * @LastEditTime: 2021-09-23 18:51:53
-->
<template>
  <div>
    <el-form
      ref="addSystemConfigForm"
      :model="addSystemConfigForm"
      :rules="addSystemConfigRules"
      label-width="150px"
      :inline="true"
      label-position="left"
      status-icon
      inline-message
      style="width:80%;margin-left:auto;margin-right: auto;padding:30px 20px;"
    >
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="配置项类型" prop="item_type">
            <el-select v-model="addSystemConfigForm.item_type" placeholder="请选择" class="select">
              <el-option v-for="item in chooseOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="配置项标签" prop="item_label">
            <el-input v-model="addSystemConfigForm.item_label" placeholder="配置项标签" class="input" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">配置项标签(代码里用)</el-col>
      </el-row>
      <el-row v-show="addSystemConfigForm.item_type === 20" type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="配置项值" prop="item_value">
            <el-input v-model="addSystemConfigForm.item_value" placeholder="配置项值" class="input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="addSystemConfigForm.item_type === 30" type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="配置项数值" prop="item_price">
            <el-input v-model="addSystemConfigForm.item_price" placeholder="配置项数值值" class="input" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">只能是整数或者小数</el-col>
      </el-row>
      <el-row v-show="addSystemConfigForm.item_type === 40" type="flex">
        <el-col :span="8" class="center">
          <el-form-item label="配置项文件路径" prop="item_path">
            <UploadFile
              :file-path.sync="addSystemConfigForm.item_path"
              file-name="file"
              action-url="uploadConfigFile"
              :upload-data="{type:null, use_type:10, file_type: '', save_path: 'config'}"
              type="excel"
              show-content="上传文件"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="addSystemConfigForm.item_path" :span="16" style="vertical-align: middle;line-height:40px;">
          <span>{{ `路径：/${addSystemConfigForm.item_path}` }}</span>
          <!-- <span class="upload-submit">替换上传</span> -->
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="配置项说明" prop="item_introduction">
            <el-input v-model="addSystemConfigForm.item_introduction" placeholder="配置项说明" class="input" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">配置项说明</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="addSystemConfigForm.sort" class="input" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">数值越大,顺序靠前,默认100</el-col>
      </el-row>
      <el-row type="flex" justify="center" style="margin-top:30px">
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button type="primary" @click="submitForm('addSystemConfigForm')">添加系统配置</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button @click="resetForm('addSystemConfigForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { addSystemConfig } from '@/api/system/systemConfig/systemConfig'
import { debounce } from '@/utils'
import UploadFile from '@/pages/component/upload/uploadFile'

export default
{
  // 组件名称
  name: 'AddSystemConfigForm',
  // 组件
  components:
    {
      UploadFile
    },
  props:
    {

    },
  // 数据
  data()
  {
    return {
      // 添加菜单表单
      addSystemConfigForm: {
        id: 0,
        item_type: 20,
        // 配置项值
        item_value: '',
        // 配置项数值
        item_price: 0,
        // 配置项标签
        item_label: '',
        // 配置项说明
        item_introduction: '',
        // 排序
        sort: 100,
        // 配置项路径
        item_path: ''
      },
      // 添加表单规则
      addSystemConfigRules: {
        sort: [
          { pattern: /^[0-9]{1,10}$/, message: '只能0-9的数字', trigger: 'blur' }
        ],
        item_label: [
          { type: 'string', required: true, message: '请填写配置项label', trigger: 'blur' }
        ],
        item_value: [
          { type: 'string', message: '', trigger: 'blur' }
        ],
        item_price: [
          { pattern: /^[0-9.]{0,50}$/, message: '只能是整数或者小数', trigger: 'blur' }
        ],
        item_introduction: [
          { type: 'string', message: '', trigger: 'blur' }
        ]
      },
      // 配置项选项
      chooseOptions: [
        { value: 20, label: '字符' },
        { value: 30, label: '数值' },
        { value: 40, label: '文件' }
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
    initSystemConfigForm()
    {
      this.$refs.addSystemConfigForm.resetFields()
    },
    // 提交表单
    submitForm: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          this.addSystemConfig(this.addSystemConfigForm)
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
      this.initSystemConfigForm()
    },

    /**
     * 添加系统配置项
     */
    addSystemConfig(data)
    {
      const that = this
      addSystemConfig(data).then(res =>
      {
        if (res && res.code === 0)
        {
          that.$emit('handleCloseDialog', false)
          that.$message(
            {
              message: res.msg,
              type: 'success'
            })
          that.initSystemConfigForm()
        }
      })
    }

  }
}
</script>
<style lang='scss' scoped>
.select,
.input {
  width: 300px;
}
.upload-submit {
  margin-left: 10px;
  font-size: 12px;
  color: #409eff;
  &:hover {
    text-decoration:underline
  }
}
</style>
