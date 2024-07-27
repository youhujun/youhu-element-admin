<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-24 09:54:50
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-25 23:30:40
-->
<template>
  <div>
    <el-row class="row-one" :gutter="10">
      <el-form
        ref="userIdCardForm"
        :model="userIdCardForm"
        label-width="100px"
        :inline="true"
        label-position="left"
        status-icon
        inline-message
      >
        <el-row type="flex">
          <el-col :span="6">
            <el-form-item label="排序" prop="sort">
              <el-input v-model="userIdCardForm.sort" />
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="身份证号" prop="id_number">
              <!-- 修改身份证 -->
              <el-input v-model="id_number" class="input" />
              <el-button
                type="primary"
                size="mini"
                plain
                @click="handleUpdateUserIdNumber"
              >修改用户身份证</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="4">
            <el-form-item label="身份证正面" prop="id_card_front_id">
              <UploadIdCardPicture :picture-id.sync="userIdCardForm.id_card_front_id" :before-picture-string="card_front.picture" show-content="身份证正面" :upload-data="{id:0, use_type:20, file_type: '', save_path: 'picture'}" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="身份证背面" prop="id_card_back_id">
              <UploadIdCardPicture :picture-id.sync="userIdCardForm.id_card_back_id" :before-picture-string="card_back.picture" show-content="身份证背面" :upload-data="{id:0, use_type:20, file_type: '', save_path: 'picture'}" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="4" :offset="1">
            <el-form-item>
              <el-button type="primary" size="mini" @click="submitForm('userIdCardForm')">设置用户身份证</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { getUserIdCard, setUserIdCard, updateUserIdNumber } from '@/api/user/user'
import UploadIdCardPicture from '@/pages/component/upload/uploadIdCardPicture'
import { debounce } from '@/utils'
import { validIdNumber } from '@/utils/validate'
export default
{
  // 组件名称
  name: 'IdCard',
  // 组件
  components:
    {
      UploadIdCardPicture
    },
  props:
    {
      rowList: {
        type: Object,
        default: () =>
        {
          return {}
        }
      }
    },
  // 数据
  data()
  {
    return {
      id: this.rowList.id,
      card_front: {},
      card_back: {},
      pictureUrl: '',
      id_number: this.rowList.id_number || '',
      userIdCardForm: {
        user_id: this.rowList.id,
        sort: 100,
        id_card_front_id: '',
        id_card_back_id: ''
      }
    }
  },
  // 挂载 --常用
  mounted()
  {
    this.pictureUrl = process.env.VUE_APP_URL
    this.getUserIdCard()
  },
  // 方法
  methods:
  {
    // 设置用户身份证
    submitForm: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          this.setUserCard(this.userIdCardForm)
        }
        else
        {
          console.log('未通过验证!')
          return false
        }
      })
    }, 600),
    setUserCard(data)
    {
      setUserIdCard(data).then(res =>
      {
        if (res && res.code === 0)
        {
          this.getUserIdCard()
          this.event.$emit('updateUserData', true)
          this.$message(
            {
              message: res.msg,
              type: 'success'
            })
        }
      })
    },
    // 获取身份证
    getUserIdCard()
    {
      const params = {}
      params['user_id'] = this.id
      getUserIdCard(params).then(res =>
      {
        if (res.code === 0 && res.data.id_card)
        {
          this.card_front = res.data.id_card.card_front
          this.card_back = res.data.id_card.card_back
          this.userIdCardForm.id_card_front_id = String(this.card_front.id)
          this.userIdCardForm.id_card_back_id = String(this.card_back.id)
        }
      })
    },
    // 修改身份证号
    handleUpdateUserIdNumber()
    {
      if (!validIdNumber(this.id_number))
      {
        return this.$message.warning('身份证号不正确')
      }
      const params = {}
      params.user_id = this.id
      params.id_number = this.id_number
      updateUserIdNumber(params).then(res =>
      {
        if (res && res.code === 0)
        {
          this.event.$emit('updateUserData', true)

          this.$message(
            {
              message: res.msg,
              type: 'success'
            })
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.row-one{
   margin-bottom: 1rem;
   width: 100rem;
   height: auto;
}
.row-button {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #DCDFE6;
  height: auto;
  button {
    margin: 0 1rem;
  }
}
.input {
  width: 200px;
  margin-right: 10px;
}
</style>
