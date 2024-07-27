<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-11 16:28:38
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-07-18 16:45:56
-->
<template>
  <div>
    <Card>
      <template #cardTitle>
        用户列表
      </template>
      <template #cardButton>
        <el-button type="primary" @click="handleAddUser()">添加用户</el-button>
      </template>
      <template #cardContent>
        <div class="custom-node">
          <!-- 显示表格 -->
          <ShowTable>
            <template #search>
              <el-divider content-position="left">搜索</el-divider>
              <Search @handleChangeSearch="toSearch" />
            </template>
            <template #batch>
              <el-divider content-position="left">批量操作</el-divider>
              <el-row type="flex" justify="space-around">
                <el-col :span="6" class="btn-action"><el-button type="primary" @click="handleReverse()">反选</el-button></el-col>
                <el-col :span="6" class="btn-action"><el-button type="danger" @click="handleMultipleDelete()">删除</el-button></el-col>
                <el-col :span="6" class="btn-action"><el-button type="warning" @click="handleMultipleDisable()">禁用</el-button></el-col>
                <el-col :span="6" class="btn-action"><el-button type="primary" @click="handleExport()">导出</el-button></el-col>
              </el-row>
            </template>
            <template #table>
              <el-divider content-position="left">用户列表</el-divider>
              <UserTable
                :loading="loading"
                :user-list.sync="userList"
                :dialog-visible.sync="dialogVisible"
                :dialog-title.sync="dialogTitle"
                :dialog-type.sync="dialogType"
                :before-user-form.sync="beforeUserForm"
                :reverse="reverse"
                :multiple-delete="multipleDelete"
                :multiple-disable="multipleDisable"
                @hanldeUpdateData="toUpdateData"
              />
            </template>
            <template #paginate>
              <div>
                <Paginate :current-page.sync="currentPage" :page-size.sync="pageSize" :total.sync="total" />
              </div>
            </template>
          </ShowTable>
        </div>
      </template>
    </Card>
    <!-- 弹框开始 -->
    <Dialog :dialog-visible.sync="dialogVisible" :dialog-title.sync="dialogTitle" :dialog-type.sync="dialogType" :dialog-width="dialogWidth">
      <template #addForm>
        <AddUserForm v-if="dialogVisible==true" :recommend-id="beforeUserForm.id" @hanldeUpdateData="toUpdateData" @handleCloseDialog="closeDialog" />
      </template>
    </Dialog>
  </div>
</template>
<script>
import Card from '@/pages/component/card'
import Dialog from '@/pages/component/dialog'
import ShowTable from '@/pages/component/showTabel'
import Paginate from '@/pages/component/paginate'
import AddUserForm from '@/pages/user/user/userList/component/addUserForm'
import Search from '@/pages/user/user/userList/component/search.vue'

import UserTable from '@/pages/user/user/userList/component/userTable'

import { getUser } from '@/api/user/user'

export default
{
  // 组件名称
  name: 'User',
  // 组件
  components:
  {
    Card,
    Dialog,
    ShowTable,
    AddUserForm,
    Search,
    UserTable,
    Paginate
  },
  props:
  {
  },
  // 数据
  data()
  {
    return {
      // 配合loading
      loading: true,
      // 弹窗控制
      dialogVisible: false,
      dialogWidth: '50%',
      dialogTitle: '添加用户',
      // 表单类型 1添加表单 2更新表单
      dialogType: 1,
      // 搜索显示列表条件
      where: {
        find: '',
        findSelectIndex: 0,
        timeRange: [],
        switch: null,
        real_auth_staus: '',
        status: 0,
        sortType: 2,
        // 0 不导出 1导出
        isExport: 0,
        // 导出类型 1本页 2全部
        exportType: 1,
        // 分页
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      // 用户容器
      userList: [],
      // 修改用户级别的容器
      beforeUserForm: {},
      // 标记反向选择
      reverse: 0,
      multipleDelete: 0,
      multipleDisable: 0
    }
  },
  // 计算属性
  computed:
  {
    currentPage:
    {
      set(value)
      {
        this.where.currentPage = value
      },
      get()
      {
        return this.where.currentPage
      }
    },
    pageSize:
    {
      set(value)
      {
        this.where.pageSize = value
      },
      get()
      {
        return this.where.pageSize
      }
    },
    total:
    {
      set(value)
      {
        this.where.total = value
      },
      get()
      {
        return this.where.total
      }
    }
  },
  // 监听
  watch:
  {
    currentPage(value)
    {
      // console.log('update' + value)
      this.initExport()
      this.getUser(this.where)
    },
    pageSize(value)
    {
      this.initExport()
      this.getUser(this.where)
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
    // 监听修改数据
    this.event.$on('updateUserData', (data) =>
    {
      this.getUser(this.where)
    })

    this.getUser(this.where)
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
    // 初始化搜索条件
    initPageWhere()
    {
      this.where.isExport = 0
      this.where.exportType = 1
      this.where.currentPage = 1
      this.where.pageSize = 10
    },

    // 初始化导出状态
    initExport()
    {
      this.where.isExport = 0
      this.where.exportType = 1
    },

    // 添加用户
    handleAddUser()
    {
      this.dialogVisible = true
      this.dialogTitle = '添加用户'
      this.dialogType = 1
    },
    // 获取用户
    async getUser(where)
    {
      const userData = await getUser(where).then(res =>
      {
        return new Promise((resolve, reject) =>
        {
          if (res && res.code === 0)
          {
            this.loading = false
            if (res.download)
            {
              window.location.href = res.download
            }
            resolve(res)
          }
          else
          {
            this.loading = false
            reject('获取用户失败')
          }
        })
      })

      this.currentPage = userData.meta.current_page
      this.pageSize = userData.meta.per_page
      this.total = userData.meta.total
      this.userList = userData.data
    },
    handleReverse()
    {
      this.reverse = this.reverse + 1
    },
    handleMultipleDelete()
    {
      this.multipleDelete = this.multipleDelete + 1
    },
    handleMultipleDisable()
    {
      this.multipleDisable = this.multipleDisable + 1
    },
    handleExport()
    {
      this.$confirm('请选择导出本页数据或是全部导出', '提示', {
        confirmButtonText: '全部',
        cancelButtonText: '本页',
        type: 'warning',
        center: true,
        distinguishCancelAndClose: true
      }).then(() =>
      {
        this.where.exportType = 2

        this.getUser(this.where)
        this.$message(
          {
            message: '全部导出!',
            type: 'success'
          })
      }).catch((action) =>
      {
        this.where.exportType = 1
        // 本页导出
        if (action === 'cancel')
        {
          this.getUser(this.where)
          this.$message(
            {
              message: '本页导出!',
              type: 'success'
            })
        }
        // 直接关闭取消
        if (action === 'close')
        {
          this.where.isExport = 0
        }
      })
    },
    // 查询用户
    toSearch(param)
    {
      Object.assign(this.where, param)
      this.initPageWhere()
      this.initExport()
      // console.log(this.where)
      this.getUser(this.where)
    },
    // 更新数据
    toUpdateData()
    {
      this.initExport()
      this.getUser(this.where)
    },
    // 关闭弹窗
    closeDialog(data)
    {
      this.dialogVisible = data
    }
  }
}
</script>
<style lang='scss' scoped>
.btn-action{
  text-align: center;
}
.status-action {
    text-align: center;
    .status {
      margin-bottom: 10px;
    }
}
</style>
