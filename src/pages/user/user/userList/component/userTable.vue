<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-21 10:50:05
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-26 23:02:52
-->
<template>
  <div>
    <el-table
      ref="userTable"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="userList"
      border
      stripe
      highlight-current-row
      empty-text
      fit
      height="70vh"
      style="width: 100%"
      :row-key="getRowKeys"
      :expand-row-keys="expandIds"
      @selection-change="handleSelectionChange"
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
        fixed
      />
      <el-table-column
        prop="avatar"
        label="头像"
        width="100"
        fixed
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
            <img src="~@/assets/img/header/avatar.gif">
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        label="详情"
        type="expand"
        align="center"
        min-width="55"
        fixed
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
        fixed
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
        prop="user_info.sex"
        label="性别"
        width="120"
        :filters="[{ text: '男', value:10 }, { text: '女', value: 20 },{ text: '未知', value: 0 }]"
        :filter-method="filterSex"
        filter-placement="bottom-end"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.user_info && scope.row.user_info.sex==10" type="primary">男</el-tag>
          <el-tag v-else-if="scope.row.user_info && scope.row.user_info.sex==20" type="danger">女</el-tag>
          <el-tag v-else type="info">未知</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="注册时间"
        min-width="200"
      />
      <el-table-column label="操作" align="center" fixed="right" width="320">
        <template slot-scope="scope">
          <!-- 添加下级 -->
          <el-button
            v-permission="['develop','super']"
            size="mini"
            type="primary"
            plain
            @click="handleAddSon(scope.$index, scope.row)"
          >添加下级
          </el-button>
          <!-- 编辑 -->
          <el-button
            v-permission="['develop','super']"
            size="mini"
            type="primary"
            plain
            @click="handleToEditPage(scope.$index, scope.row)"
          >编辑
          </el-button>
          <!-- 禁用/解禁 -->
          <el-button
            size="mini"
            :type="scope.row.switch === 1 ? 'warning' : 'success'"
            plain
            @click="handleDisabled(scope.row)"
          >
            {{ scope.row.switch === 1 ? '禁用' : '解禁' }}
          </el-button>
          <el-button
            size="mini"
            type="danger"
            el-button
            @click="handleDelete(scope.$index, scope.row)"
          >删除
            <!-- 删除(禁用)结束 -->
          </el-button></template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import tableInfo from '@/pages/user/user/userList/component/tableInfo'
import { disableUser, deleteUser, multipleDeleteUser, multipleDisableUser } from '@/api/user/user'
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
      dialogVisible: {
        type: Boolean,
        default: false
      },
      dialogTitle: {
        type: String,
        default: ''
      },
      dialogType: {
        type: Number,
        default: 1
      },
      dialogBankVisible: {
        type: Boolean,
        default: false
      },
      dialogBankTitle: {
        type: String,
        default: ''
      },
      dialogBankType: {
        type: Number,
        default: 1
      },
      beforeUserForm: {
        type: Object,
        default: null
      },
      reverse: {
        type: Number,
        default: 0
      },
      multipleDelete: {
        type: Number,
        default: 0
      },
      multipleDisable: {
        type: Number,
        default: 0
      }
    },
  // 数据
  data()
  {
    return {
      // 控制详情显示
      show: 1,
      baseUrl: '',
      // 选中队象的数组
      multipleSelection: [],
      // 选中元素的下标
      selectIndex: [],
      // 反选元素的下标
      diffIndex: [],
      // 选中的下标
      selectId: [],
      // 存放展开的id, 每次只展开一行
      getRowKeys(row)
      {
        return row.id
      },
      expandIds: []
    }
  },
  // 计算属性
  computed:
    {
    },
  // 监听
  watch:
    {
      reverse(value)
      {
        this.diffIndex = []

        const all = []

        for (let index = 0; index < this.userList.length; index++)
        {
          all.push(index)
        }

        this.diffIndex = all.filter(val =>
        {
          return !this.selectIndex.includes(val)
        })

        // 实现反选的效果
        this.$refs.userTable.clearSelection()
        this.diffIndex.forEach(index =>
        {
          this.$refs.userTable.toggleRowSelection(this.userList[index])
        })

        this.selectIndex = this.diffIndex
      },
      // 批量删除
      multipleDelete(value)
      {
        this.selectId = []
        const params = {
          selectId: []
        }
        this.getSelectId()
        this.selectId.forEach(item =>
        {
          params['selectId'].push(item.id)
        })

        if (this.selectId.length === 0)
        {
          return this.$message.warning('请先选择要删除的选项')
        }
        this.$confirm('确认要批量删除用户吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        })
          .then(() =>
          {
            multipleDeleteUser(params).then((res) =>
            {
              if (res && res.code === 0)
              {
                this.$emit('hanldeUpdateData', true)
                this.$message(
                  {
                    message: res.msg,
                    type: 'success'
                  })
              }
            })
          })
          .catch(action =>
          {
            return
          })
      },
      // 批量禁用
      multipleDisable(value)
      {
        this.selectId = []
        const params = {
          selectId: [],
          switch: 0
        }
        this.getSelectId()
        this.selectId.forEach(item =>
        {
          if (!item.switch)
          {
            params['switch'] = 1
          }
          params['selectId'].push(item.id)
        })

        if (this.selectId.length === 0)
        {
          return this.$message.warning('请先选择要禁用的选项')
        }
        if (params.switch)
        {
          return this.$message.error('含有已禁用用户,不可批量禁用')
        }
        this.$confirm('确认要批量禁用用户吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '禁用',
          cancelButtonText: '取消'
        })
          .then(() =>
          {
            multipleDisableUser(params).then((res) =>
            {
              if (res && res.code === 0)
              {
                this.$emit('hanldeUpdateData', true)
                this.$message(
                  {
                    message: res.msg,
                    type: 'success'
                  })
              }
            })
          })
          .catch(action =>
          {
            return
          })
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

    errorHandler()
    {

    },
    // 添加下级
    handleAddSon(index, row)
    {
      this.$emit('update:dialogVisible', true)
      this.$emit('update:dialogTitle', '添加下级用户')
      this.$emit('update:dialogType', 1)
      this.$emit('update:beforeUserForm', row)
    },
    // 编辑用户
    handleToEditPage(index, row)
    {
      this.$router.push({ name: 'editUser', query: { row: row }})
    },
    // 添加银行卡
    handleAddBank(index, row)
    {
      this.$emit('update:dialogBankVisible', true)
      this.$emit('update:dialogBankTitle', '添加银行卡')
      this.$emit('update:dialogBankType', 1)
      this.$emit('update:beforeUserForm', row)
    },
    // 禁用、解禁用户
    handleDisabled(row)
    {
      const params = {}
      let str = ''
      params['id'] = row.id
      params['switch'] = row.switch === 1 ? '0' : '1'
      str = row.switch ? '禁用' : '解禁'
      this.disableUser(params, str)
    },
    // 禁用角色
    disableUser(params, str)
    {
      this.$confirm(`确认要${str}该用户吗？`, '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          disableUser(params).then((res) =>
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
        })
        .catch(action =>
        {
          return
        })
    },
    handleDelete(index, row)
    {
      const id = {}
      id['id'] = row.id
      this.deleteUser(id, index)
    },
    // 删除角色
    deleteUser(id, index)
    {
      this.$confirm('确认要删除该用户吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          deleteUser(id).then((res) =>
          {
            if (res && res.code === 0)
            {
              this.$emit('hanldeUpdateData', true)
              this.$message(
                {
                  message: res.msg,
                  type: 'success'
                })
            }
          })
        })
        .catch(action =>
        {
          return
        })
    },
    // 多选
    handleSelectionChange(val)
    {
      this.multipleSelection = val

      this.selectIndex = []
      this.multipleSelection.forEach(item =>
      {
        this.selectIndex.push(this.userList.indexOf(item))
      })
    },
    // 获取选中下标
    getSelectId()
    {
      this.selectIndex.forEach(item =>
      {
        this.selectId.push(
          { id: this.userList[item].id,
            switch: this.userList[item].switch
          })
      })
    },
    /**
     * 展开
     * @param {*} row
     * @param {*} expandedRows
     */
    handleExpandChange(row, expandedRows)
    {
      // console.log(row)
      // expandIds

      this.show = 1
      if (expandedRows.length)
      {
        this.expandIds = []
        if (row)
        {
          this.expandIds.push(row.id)
        }
      }
      else
      {
        this.expandIds = []
      }
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
min-height: 250px;
}
</style>
