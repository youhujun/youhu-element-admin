<template>
  <div>
    <el-row class="row-one">
      <el-button
        type="success"
        size="mini"
        @click="dialogBankVisible = true"
      >+ 添加银行卡</el-button>
    </el-row>
    <!-- 真正的一行 -->
    <div v-if="flag">
      <div v-for="item in user_bank" :key="item.id">
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">银行</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ item.bank.bank_name }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">户名</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ item.bank_account }}</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">卡号</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ item.bank_number }}</el-tag>
          <el-tag v-if=" item.is_default == 1" style="margin-right:1rem;" type="success">默认</el-tag>
        </el-row>
        <!-- 真正的一行 -->
        <el-row v-if="item.bank_front_id || item.bank_back_id" :gutter="10" style="margin-top:1rem;" type="flex" justify="start">
          <el-col v-if="item.bank_front_id" :span="4">
            <img height="200px" :src="item.bank_front.picture" alt="" fill="fit" @click="handleClickPicture(item.bank_front)">
          </el-col>
          <el-col v-if="item.bank_back_id" :span="4" :offset="1">
            <img height="200px" :src="item.bank_back.picture" fill="fit" @click="handleClickPicture(item.bank_back)">
          </el-col>
        </el-row>
        <el-row class="row-one">
          <el-button v-if="item.is_default !== 1" style="margin-right:1rem;" type="primary" size="mini" @click="handleSetDefaultBank(item)">设为默认</el-button>
          <el-button
            style="margin-right:1rem;"
            type="danger"
            size="mini"
            @click="handleDeleteBank(item)"
          >删除</el-button>
        </el-row>
        <hr>
      </div>
    </div>
    <!-- 弹框开始 -->
    <el-dialog title="添加银行卡" width="80%" :visible.sync="dialogBankVisible" :modal="true" append-to-body>
      <div slot="title" class="title"><el-button type="primary" plain>添加银行卡</el-button></div>
      <div class="content">
        <AddBankForm v-if="dialogBankVisible==true" :user-id="id" @hanldeUpdateData="toUpdateData" @handleCloseDialog="closeDialog" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { setDefaultBank, deleteBank, getUserBank } from '@/api/user/user'

import AddBankForm from '../addBankForm.vue'

export default
{
  // 组件名称
  name: 'Bank',
  components:
  {
    AddBankForm
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
      flag: false,
      dialogBankVisible: false,
      id: this.rowList.id,
      user_bank: [],
      dialogBankWidth: '80%',
      dialogBankTitle: '添加银行卡'
    }
  },
  // 挂载 --常用
  mounted()
  {
    this.getUserBank()
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
    handleSetDefaultBank(item)
    {
      const data = {}
      data['id'] = item.id
      data['user_id'] = item.user_id
      setDefaultBank(data).then(res =>
      {
        if (res && res.code === 0)
        {
          this.$message(
            {
              message: res.msg,
              type: 'success'
            })
        }
        this.getUserBank()
      })
    },
    handleDeleteBank(item)
    {
      console.log(item)
      const data = {}
      data['id'] = item.id
      this.$confirm('确认要删除该银行卡吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          deleteBank(data).then(res =>
          {
            // console.log(res)
            if (res && res.code === 0)
            {
              this.$message(
                {
                  message: res.msg,
                  type: 'success'
                })
            }
            this.getUserBank()
          })
        })
        .catch(action =>
        {
          return
        })
    },
    // 获取银行卡
    async getUserBank()
    {
      this.flag = false
      const params = {}
      params['user_id'] = this.id
      const userBank = await getUserBank(params).then(res =>
      {
        return new Promise((resolve, reject) =>
        {
          if (res && res.code === 0)
          {
            this.flag = true
            resolve(res)
          }
          else
          {
            reject('获取银行列表失败')
          }
        })
      })
      this.user_bank = userBank.data
    },
    handleClickPicture(picture)
    {
      let src = ''
      src = picture.picture
      window.open(src, '_target')
    },
    // 关闭弹窗
    closeDialog(data)
    {
      this.dialogBankVisible = data
    },
    // 更新数据
    toUpdateData()
    {
      this.getUserBank()
    }
  }
}
</script>
<style lang='scss' scoped>
.row-one{
   margin: 1rem;
   width: 100rem;
   height: auto;
}
.title {
  text-align: center;
}
.content {
    background:rgba(7, 147, 240, 0.137);
  }

</style>
