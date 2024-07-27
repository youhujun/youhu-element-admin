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
      style="width:98%;margin-left:auto;margin-right: auto;padding-top:20px;"
    >
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="选择银行" prop="bank_id">
            <SelectBank :bank-id.sync="addBankForm.bank_id" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="银行户名" prop="bank_account">
            <el-input v-model="addBankForm.bank_account" placeholder="" style="width:300px;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="银行账号" prop="bank_number">
            <el-input v-model="addBankForm.bank_number" placeholder="" style="width:300px;" />
          </el-form-item>
        </el-col>
      </el-row><el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="开户行地址" prop="bank_address">
            <el-input v-model="addBankForm.bank_address" placeholder="" style="width:300px;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="12" class="center">
          <el-form-item label="银行卡正面" prop="bank_front_id">
            <UploadSinglePicture :picture-id.sync="addBankForm.bank_front_id" show-content="银行卡正面" :upload-data="{id:0, use_type:20, file_type: '', save_path: 'picture'}" />
          </el-form-item>
        </el-col>
        <el-col :span="12" class="center">
          <el-form-item label="银行卡背面" prop="bank_back_id">
            <UploadSinglePicture :picture-id.sync="addBankForm.bank_back_id" show-content="银行卡背面" :upload-data="{id:0, use_type:20, file_type: '', save_path: 'picture'}" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="12" class="center">
          <el-form-item label="是否默认" prop="is_default">
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
            <el-input v-model="addBankForm.sort" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button type="primary" @click="submitForm('addBankForm')">添加</el-button>
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
import SelectBank from '@/pages/component/selectBank'
import UploadSinglePicture from '@/pages/component/upload/uploadSinglePicture'
import { addUserBank } from '@/api/user/user'
import permission from '@/directive/permission/index.js' // 权限判断指令
import { debounce } from '@/utils'

export default
{
  // 组件名称
  name: 'AddBankForm',
  // 组件
  components:
    {
      SelectBank,
      UploadSinglePicture
    },
  directives: { permission },
  props:
    {
      userId: {
        type: [Number, String],
        default: 0
      }
    },
  // 数据
  data()
  {
    return {
      // 添加菜单表单
      addBankForm: {
        id: 0,
        user_id: 0,
        bank_id: null,
        bank_number: '',
        bank_account: '',
        bank_address: '',
        bank_front_id: null,
        bank_back_id: null,
        is_default: 0,
        sort: 100
      },
      // 添加表单规则
      addBankRules: {
        bank_id: [
          { required: true, message: '必须有银行', trigger: 'blur' }
        ],
        bank_number: [
          { required: true, message: '必须有银行账号', trigger: 'blur' },
          { pattern: /^[\d]{1,20}$/, message: '银行卡号不正确', trigger: 'blur' }
        ],
        bank_account: [
          { required: true, message: '必须有银行户名', trigger: 'blur' },
          { pattern: /[.]*/, message: '随便', trigger: 'blur' }
        ],
        bank_address: [
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
    userId: {
      handler(value)
      {
        this.addBankForm.user_id = value
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
      addUserBank(data).then(res =>
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
          this.initBankForm()
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
