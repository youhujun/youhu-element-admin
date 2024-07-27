<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-21 10:50:05
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-07-20 16:14:06
-->
<template>
  <div>
    <el-table
      ref="userTable"
      :data="userList"
      border
      stripe
      highlight-current-row
      empty-text
      fit
      height="70vh"
      style="width: 100%"
      @expand-change="handleExpandChange"
    >
      <el-table-column
        type="selection"
        align="center"
        width="55"
      />
      <el-table-column
        label="序号"
        type="index"
        width="55"
        align="center"
      />
      <el-table-column
        prop="avatar"
        label="头像"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-avatar
            v-if="scope.row.avatar"
            shape="circle"
            :size="58"
            fit="cover"
            :src="scope.row.avatar"
            @error="errorHandler"
          />
          <el-avatar v-else :size="58">
            <!-- 图片加载失败时的默认图片 -->
            <img src="~@/assets/img/header/avatar.gif">
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        label="详情"
        type="expand"
        align="center"
        min-width="55"
      >
        <template slot-scope="props">
          <tableInfo :row-data="props.row" :show.sync="show" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="phone"
        label="手机号"
        min-width="150"
      />
      <el-table-column
        align="center"
        prop="account_name"
        label="账号"
        width="150"
      />
      <el-table-column
        align="center"
        prop="real_name"
        label="姓名"
        width="150"
      />
      <el-table-column
        align="center"
        prop="nick_name"
        label="昵称"
        min-width="120"
      />
      <el-table-column
        prop="real_auth_status"
        label="认证状态"
        width="120"
        :filters="[{ text: '未认证', value:10 }, { text: '认证中', value: 20 },{ text: '未通过', value: 30 },{ text: '已通过', value: 40 }]"
        :filter-method="filterAuthenticationStauts"
        filter-placement="bottom-end"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-show="scope.row.real_auth_status==10" type="info">未认证</el-tag>
          <el-tag v-show="scope.row.real_auth_status==20" type="warning">认证中</el-tag>
          <el-tag v-show="scope.row.real_auth_status==30" type="danger">未通过</el-tag>
          <el-tag v-show="scope.row.real_auth_status==40" type="success">已通过</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="status"
        label="审核状态"
        width="120"
        :filters="[{ text: '待审核', value:10 }, { text: '已通过', value: 20 }, { text: '已拒绝', value: 30 }, { text: '未申请', value: 0 }]"
        :filter-method="filterStauts"
        filter-placement="bottom-end"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-show="scope.row.user_apply_real_auth.length>0 && scope.row.user_apply_real_auth[scope.row.user_apply_real_auth.length - 1].status==10" type="primary">待审核</el-tag>
          <el-tag v-show="scope.row.user_apply_real_auth.length>0 && scope.row.user_apply_real_auth[scope.row.user_apply_real_auth.length - 1].status==20" type="success">已通过</el-tag>
          <el-tag v-show="scope.row.user_apply_real_auth.length>0 && scope.row.user_apply_real_auth[scope.row.user_apply_real_auth.length - 1].status==30" type="danger">已拒绝</el-tag>
          <el-tag v-show="scope.row.user_apply_real_auth.length>0 && scope.row.user_apply_real_auth[scope.row.user_apply_real_auth.length - 1].status==0" type="info">未申请</el-tag>
          <el-tag v-show="scope.row.user_apply_real_auth.length===0" type="info">未申请</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="switch"
        label="账号状态"
        width="120"
        :filters="[{ text: '禁用', value:0 },{ text: '正常', value:1 }]"
        :filter-method="filterUserStatus"
        filter-placement="bottom-end"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-show="scope.row.switch==0" type="danger">禁用</el-tag>
          <el-tag v-show="scope.row.switch==1" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="100"
        :filters="[{ text: '男', value:1 }, { text: '女', value: 2 },{ text: '未知', value: 0 }]"
        :filter-method="filterSex"
        filter-placement="bottom-end"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.user_info && scope.row.user_.sex==1" type="primary">男</el-tag>
          <el-tag v-else-if="scope.row.user_info && scope.row.user_info.sex==2" type="danger">女</el-tag>
          <el-tag v-else type="info">未知</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="注册时间"
        min-width="200"
      />
    </el-table>
  </div>
</template>
<script>
import tableInfo from '@/pages/user/user/userCheck/component/tableInfo'
import permission from '@/directive/permission/index.js' // 权限判断指令
export default
{
  // 组件名称
  name: 'UserTable',
  directives: { permission },
  // 组件
  components:
    {
      tableInfo
    },
  props:
    {
      loading: {
        type: Boolean,
        default: true
      },
      userList: {
        type: Array,
        default: () =>
        {
          return []
        }
      },
      beforeUserForm: {
        type: Object,
        default: null
      }
    },
  // 数据
  data()
  {
    return {
      // 控制详情显示
      show: 0,
      baseUrl: ''
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
    this.baseUrl = process.env.VUE_APP_URL
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
    /**
         * 过滤性别
         */
    filterSex(value, row)
    {
      return row.sex === value
    },
    /**
         * 过滤用户状态
         */
    filterUserStatus(value, row)
    {
      return row.switch === value
    },
    // 过滤认证状态
    filterAuthenticationStauts(value, row)
    {
      return row.scope.row.real_auth_status === value
    },
    // 过滤审核状态
    filterStauts(value, row)
    {
      return row.status === value
    },
    errorHandler()
    {

    },
    /**
     * 展开
     * @param {*} row
     * @param {*} expandedRows
     */
    handleExpandChange(row, expandedRows)
    {
      this.show = 0
    }
  }

}
</script>
<style lang='scss' scoped>
::v-deep .el-table__body-wrapper {
  .el-table__expanded-cell {
    z-index: 99;
    padding: 0;
    background: #fff;
  }
}
::v-deep .el-table__fixed,
::v-deep .el-table__fixed-right {
  .el-table__expanded-cell {
    visibility: hidden;
    padding: 0;
  }
}
.expanded {
width: 100%;
background: #fff;
}
</style>
