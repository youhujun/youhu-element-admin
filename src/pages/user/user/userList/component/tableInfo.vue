<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-24 09:54:50
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-07-08 18:46:12
-->
<template>
  <div class="expanded">
    <div class="header">
      <el-row type="flex">
        <el-button type="primary" icon="el-icon-camera" size="mini" @click="handleClick(1)">用户头像</el-button>
        <el-button type="primary" icon="el-icon-document" size="mini" @click="handleClick(2)">用户详情</el-button>
        <el-button type="primary" icon="el-icon-document" size="mini" @click="handleClick(8)">用户地址</el-button>
        <el-button type="primary" icon="el-icon-camera" size="mini" @click="handleClick(3)">用户银行卡</el-button>
        <el-button type="primary" icon="el-icon-camera" size="mini" @click="handleClick(4)">用户身份证</el-button>
        <el-button type="primary" icon="el-icon-document" size="mini" @click="handleClick(5)">用户团队</el-button>
        <el-button type="primary" icon="el-icon-document" size="mini" @click="handleClick(6)">用户二维码</el-button>
        <el-button type="primary" icon="el-icon-document" size="mini" @click="handleClick(7)">账户日志</el-button>
      </el-row>
    </div>
    <div class="content">
      <div :class="{'show':show==1, 'hidden':show!=1}">
        <Avatar :avatar="rowList.avatar" :user="rowList" :upload-data="{id:0, use_type:30, file_type: '', save_path: 'avatar', user_id: rowList.id }" />
      </div>
      <div :class="{'show':show==2, 'hidden':show!=2}">
        <UserInfo v-if="showComponent === 2" :row-list="rowList" />
      </div>
      <div :class="{'show':show==3, 'hidden':show!=3}">
        <Bank v-if="showComponent === 3" :row-list="rowList" />
      </div>
      <div :class="{'show':show==4, 'hidden':show!=4}">
        <IdCard v-if="showComponent === 4" :row-list="rowList" />
      </div>
      <div v-if="show === 5">
        <UserTeam v-if="showComponent === 5" :row-list="rowList" />
      </div>
      <div :class="{'show':show==6, 'hidden':show!=6}">
        <Qrcode v-if="showComponent === 6" :row-list="rowList" />
      </div>
      <div :class="{'show':show==8, 'hidden':show!=8}">
        <Address v-if="showComponent === 8" :row-list="rowList" />
      </div>
      <div :class="{'show':show==7, 'hidden':show!=7}">
        <Log v-if="showComponent === 7" :row-list="rowList" />
      </div>
    </div>
  </div>
</template>
<script>
import Avatar from '@/pages/component/upload/user/avatar'
import UserInfo from './tableInfo/userInfo.vue'
import Bank from './tableInfo/bank.vue'
import IdCard from './tableInfo/idCard.vue'
import UserTeam from './tableInfo/userTeam.vue'
import Qrcode from './tableInfo/qrcode.vue'
import Address from './tableInfo/address.vue'
import Log from './tableInfo/log.vue'

export default
{
  // 组件名称
  name: 'TableInfo',
  // 组件
  components:
    {
      UserInfo,
      Avatar,
      Bank,
      IdCard,
      UserTeam,
      Qrcode,
      Address,
      Log
    },
  props:
    {
      rowData: {
        type: Object,
        default: () =>
        {
          return {}
        }
      },
      show: {
        type: Number,
        default: 1
      }
    },
  // 数据
  data()
  {
    return {
      rowList: {},
      showComponent: 1,
      dialogBankVisible: false,
      pictureUrl: ''
    }
  },
  // 监听
  watch:
    {
      rowData: {
        handler(value)
        {
          this.rowList = JSON.parse(JSON.stringify(value))
        },
        deep: true,
        immediate: true
      }
    },
  // 挂载 --常用
  mounted()
  {
    this.pictureUrl = process.env.VUE_APP_URL
  },
  // 方法
  methods:
  {
    handleClick(key)
    {
      this.$emit('update:show', key)
      this.showComponent = key
    }
  }
}
</script>
<style lang='scss' scoped>
.expanded {
  padding: 15px;
}
.header{
  margin-bottom:1rem;
}
.show{
  display: block;
}
.hidden{
  display: none;
}
</style>
