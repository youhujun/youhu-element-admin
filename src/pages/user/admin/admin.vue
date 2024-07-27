<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-11 16:28:38
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-04 23:51:45
-->
<template>
  <div>
    <Card>
      <template #cardTitle>
        管理员管理
      </template>
      <template #cardButton>
        <el-button style="float: right; " type="primary" @click="handleAddAdmin()">添加管理员</el-button>
      </template>
      <template #cardContent>
        <div class="custom-node">
          <ShowTable>
            <template #search>
              <!-- <el-tag type="success">搜索区</el-tag> -->
              <el-divider content-position="left">搜索</el-divider>
              <Search @handleChangeSearch="toSearch" />
            </template>
            <template #batch>
              <el-divider content-position="left">批量操作</el-divider>
              <el-row type="flex" justify="space-around">
                <el-col :span="6" class="btn-action"><el-button type="primary" @click="handleReverse()">反选</el-button>
                </el-col>
                <el-col :span="6" class="btn-action"><el-button type="danger" @click="handleMultipleDelete()">删除</el-button></el-col>
                <el-col :span="6" class="btn-action"><el-button type="warning" @click="handleMultipleDisable()">禁用</el-button>
                </el-col>
                <el-col :span="6" class="btn-action"><el-button type="primary" @click="handleExport()">导出</el-button></el-col>
              </el-row>
            </template>
            <template #table>
              <el-divider content-position="left">管理员列表</el-divider>
              <AdminTable
                :loading="loading"
                :admin-list.sync="adminList"
                :dialog-visible.sync="dialogVisible"
                :dialog-title.sync="dialogTitle"
                :dialog-type.sync="dialogType"
                :before-admin-form.sync="beforeAdminForm"
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
        <AddAdminForm v-if="dialogVisible==true" @hanldeUpdateData="toUpdateData" @handleCloseDialog="closeDialog" />
      </template>
      <template #updateForm>
        <UpdateAdminForm v-if="dialogVisible==true" :before-admin-form="beforeAdminForm" @hanldeUpdateData="toUpdateData" @handleCloseDialog="closeDialog" />
      </template>
    </Dialog>
  </div>
</template>
<script>
import Card from '@/pages/component/card'
import Dialog from '@/pages/component/dialog'
import ShowTable from '@/pages/component/showTabel'
import Paginate from '@/pages/component/paginate'

import AddAdminForm from '@/pages/user/admin/component/addAdminForm'
import UpdateAdminForm from '@/pages/user/admin/component/updateAdminForm'
import Search from '@/pages/user/admin/component/search.vue'

import AdminTable from '@/pages/user/admin/component/adminTable'

import { getAdmin } from '@/api/user/admin'

export default
{
  // 组件名称
  name: 'Admin',
  // 组件
  components:
  {
    Card,
    Dialog,
    ShowTable,
    AddAdminForm,
    UpdateAdminForm,
    Search,
    AdminTable,
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
      dialogTitle: '添加管理员',
      // 表单类型 1添加表单 2更新表单
      dialogType: 1,
      // 搜索显示列表条件
      where: {
        find: '',
        findSelectIndex: 0,
        timeRange: [],
        switch: null,
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
      // 管理员容器
      adminList: [],
      // 修改管理员级别的容器
      beforeAdminForm: {},
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
      this.getAdmin(this.where)
    },
    pageSize(value)
    {
      this.initExport()
      this.getAdmin(this.where)
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
    this.getAdmin(this.where)

    // 监听修改数据
    this.event.$on('updateData', (data) =>
    {
      this.getAdmin(this.where)
    })
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
      this.where.total = 0
    },

    // 初始化导出状态
    initExport()
    {
      this.where.isExport = 0
      this.where.exportType = 1
    },

    // 添加管理员
    handleAddAdmin()
    {
      this.dialogVisible = true
      this.dialogTitle = '添加管理员'
      this.dialogType = 1
    },
    // 获取管理员
    async getAdmin(where)
    {
      const adminData = await getAdmin(where).then(res =>
      {
        return new Promise((resolve, reject) =>
        {
          if (res && res.code === 0)
          {
            if (res.download)
            {
              window.location.href = res.download
            }

            resolve(res)
          }
          else
          {
            reject('获取管理员失败')
          }
        })
      })

      this.currentPage = adminData.meta.current_page
      this.pageSize = adminData.meta.per_page
      this.total = adminData.meta.total
      this.adminList = adminData.data
      this.loading = false
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
    // 导出数据
    handleExport()
    {
      this.where.isExport = 1
      const that = this
      this.$confirm('请选择导出本页数据或是全部导出', '提示', {
        confirmButtonText: '全部',
        cancelButtonText: '本页',
        type: 'warning',
        center: true,
        distinguishCancelAndClose: true
      }).then(() =>
      {
        that.where.exportType = 2

        that.getAdmin(that.where)
        that.$message(
          {
            message: '全部导出!',
            type: 'success'
          })
      }).catch((action) =>
      {
        that.where.exportType = 1
        // 本页导出
        if (action === 'cancel')
        {
          that.getAdmin(that.where)
          that.$message(
            {
              message: '本页导出!',
              type: 'success'
            })
        }
        // 直接关闭取消
        if (action === 'close')
        {
          that.where.isExport = 0
        }
      })
    },
    // 更新数据
    toUpdateData()
    {
      this.initExport()
      this.getAdmin(this.where)
    },
    // 关闭弹窗
    closeDialog(data)
    {
      this.dialogVisible = data
    },
    // 查询管理员
    toSearch(param)
    {
      Object.assign(this.where, param)
      this.initPageWhere()
      this.initExport()
      // console.log(this.where)
      this.getAdmin(this.where)
    }
  }
}
</script>
<style lang='scss' scoped>
.btn-action{
  text-align: center;
}
</style>
