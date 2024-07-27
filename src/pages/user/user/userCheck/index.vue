<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-11 16:28:38
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-07-18 16:23:22
-->
<template>
  <div>
    <Card>
      <template #cardTitle>
        待审用户
      </template>
      <template #cardContent>
        <div class="custom-node">
          <!-- 显示表格 -->
          <ShowTable>
            <template #search>
              <el-divider content-position="left">搜索</el-divider>
              <Search @handleChangeSearch="toSearch" />
            </template>
            <template #total>
              <el-divider content-position="left">统计</el-divider>
              <el-row type="flex" justify="space-around" :gutter="20">
                <el-col :span="6" class="status-action">
                  <div class="status"><i class="el-icon-warning" style="color: #1890ff; margin-right: 3px;" />待审核</div>
                  <div>{{ applyNumber }} 人</div>
                </el-col>
              </el-row>
            </template>
            <template #table>
              <el-divider content-position="left">用户列表</el-divider>
              <UserTable
                :loading="loading"
                :user-list.sync="userList"
                :before-user-form.sync="beforeUserForm"
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
  </div>
</template>
<script>
import Card from '@/pages/component/card'
import ShowTable from '@/pages/component/showTabel'
import Paginate from '@/pages/component/paginate'
import Search from '@/pages/user/user/userCheck/component/search.vue'

import UserTable from '@/pages/user/user/userCheck/component/userTable'

import { getUser } from '@/api/user/user'

// import Socket from '@/socket'
export default
{
  // 组件名称
  name: 'User',
  // 组件
  components:
  {
    Card,
    ShowTable,
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
      applyNumber: 0,
      // 搜索显示列表条件
      where: {
        find: '',
        findSelectIndex: 0,
        timeRange: [],
        switch: 1,
        is_real_auth: 0,
        status: 10,
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
      beforeUserForm: {}
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
      this.getUser(this.where)
    },
    pageSize(value)
    {
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
    /*  Socket.channel(process.env.VUE_APP_PREFIX + 'admin_real_auth_apply').listen('.RealAuthApply', () =>
    {
      this.getUser(this.where)
    }) */
    // 监听修改数据
    this.event.$on('updateCheckUserData', (data) =>
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
            this.applyNumber = res.applyNumber
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
    // 查询用户
    toSearch(param)
    {
      Object.assign(this.where, param)
      this.initPageWhere()
      this.getUser(this.where)
    },
    // 更新数据
    toUpdateData()
    {
      this.getUser(this.where)
    }
  }
}
</script>
<style lang='scss' scoped>
.status-action {
    text-align: center;
    .status {
      margin-bottom: 10px;
    }
}
</style>
