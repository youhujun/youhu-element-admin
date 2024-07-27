<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-09-22 14:51:37
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-16 10:40:03
 * @LastEditTime: 2021-09-23 18:51:53
-->
<template>
  <div>
    <el-form
      ref="addUserForm"
      :model="addUserForm"
      :rules="addUserRules"
      label-width="150px"
      :inline="true"
      label-position="left"
      status-icon
      inline-message
      style="padding:20px; text-align: center"
    >
      <el-row type="flex">
        <el-col :span="24">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="addUserForm.phone" placeholder="请输入手机号" class="input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <el-form-item label="昵称" prop="nick_name">
            <!-- readonly
              onfocus="this.removeAttribute('readonly')"
              @input="$forceUpdate()"
              解决浏览器自动填充昵称问题
            -->
            <el-input
              v-model="addUserForm.nick_name"
              placeholder="请输入昵称"
              class="input"
              readonly
              onfocus="this.removeAttribute('readonly')"
              @input="$forceUpdate()"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <el-form-item :label="'密码\n(默认密码:abc123)'" prop="password">
            <el-input v-model="addUserForm.password" placeholder="密码" type="password" class="input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="addUserForm.sex" placeholder="请选择" class="select">
              <el-option
                v-for="item in sexOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="submitForm('addUserForm')">添加用户</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-button @click="resetForm('addUserForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { debounce } from '@/utils'
import { validPassword, validPhone } from '@/utils/validate'
import { addUser } from '@/api/user/user'

export default
{
  // 组件名称
  name: 'AddUserForm',
  props:
    {
      recommendId: {
        type: Number,
        default: () =>
        {
          return 0
        }
      }
    },
  // 数据
  data()
  {
    const validatePhone = (rule, value, callback) =>
    {
      if (!validPhone(value))
      {
        callback(new Error('手机号不正确'))
      }
      else
      {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) =>
    {
      if (!validPassword(value))
      {
        callback(new Error('请输入正确密码'))
      }
      else
      {
        callback()
      }
    }
    return {
      sexOptions: [{
        value: '1',
        label: '男'
      }, {
        value: '2',
        label: '女'
      },
      {
        value: '0',
        label: '未知'
      }
      ],
      // 添加菜单表单
      addUserForm: {
        id: 0,
        source_id: 0,
        phone: '',
        password: 'abc123',
        sex: '1',
        nick_name: ''
      },
      // 添加表单规则
      addUserRules: {
        phone: [
          { required: true, message: '必须有手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        password: [
          { type: 'string', required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        nick_name: [
          { pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,10}$/, message: '只能以字母,数字,汉字和_这种字符组成,且不得低于1位', trigger: 'blur' }
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
    recommendId: {
      handler(value)
      {
        this.addUserForm.recommend_id = value
      },
      deep: true,
      immediate: true
    }
  },
  // 方法
  methods:
  {
    // 提交表单
    submitForm: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          this.addUser(this.addUserForm)
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
      this.initUserForm()
    },
    // 表单初始化
    initUserForm()
    {
      this.$refs.addUserForm.resetFields()
      this.addUserForm.recommend_id = this.recommendId
    },
    /**
     * 添加菜单
     */
    addUser(data)
    {
      addUser(data).then(res =>
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
          this.initUserForm()
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.select,
.input {
  width: 250px;
}
::v-deep .el-form-item__label {
  white-space: pre-line;
}
</style>
