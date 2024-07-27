<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-11 16:28:38
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-02 21:26:20
-->
<template>
  <div>
    <Card>
      <template #cardTitle>
        手机登录日志
      </template>
      <template #cardContent>
        <div class="custom-node">
          <!-- 显示表格 -->
          <ShowTable>
            <template #search>
              <!-- <el-tag type="success">搜索区</el-tag> -->
              <el-divider content-position="left">搜索</el-divider>
              <Search @handleChangeSearch="toSearch" />
            </template>
            <template #batch>
              <el-divider content-position="left">批量操作</el-divider>
              <el-row type="flex" justify="space-around">
                <el-col :span="12" class="btn-action">
                  <el-button type="primary" @click="handleReverse()">反选</el-button>
                </el-col>
                <el-col :span="12" class="btn-action">
                  <el-button type="danger" @click="handleMultipleDelete()">删除</el-button>
                </el-col>
              </el-row>
            </template>
            <template #table>
              <el-divider content-position="left">登录日志列表</el-divider>
              <LoginTable
                :loading="loading"
                :login-log-list.sync="loginLogList"
                :reverse="reverse"
                :multiple-delete="multipleDelete"
                @hanldeUpdateData="toUpdateData"
              />
            </template>
            <template #paginate>
              <div>
                <Paginate
                  :current-page.sync="currentPage"
                  :page-size.sync="pageSize"
                  :total.sync="total"
                />
              </div>
            </template>
          </ShowTable>
        </div>
      </template>
    </Card>
    <!-- 弹框开始 -->
  </div>
</template>
<script>
import Card from '@/pages/component/card'
import ShowTable from '@/pages/component/showTabel'
import Paginate from '@/pages/component/paginate'
import Search from '@/pages/log/login/phoneLogin/component/search'
import LoginTable from '@/pages/log/login/phoneLogin/component/loginTable'

import { getUserLoginLog } from '@/api/log/log'
export default
{
  // 组件名称
  name: 'LoginLog',
  // 组件
  components:
  {
    Card,
    ShowTable,
    Paginate,
    Search,
    LoginTable
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
      // 搜索显示列表条件
      where: {
        // 时间
        timeRange: [],
        // 登录状态
        status: '',
        // 用户id
        user_id: null,
        // 排序方式
        sortType: 2,
        // 分页
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      // 用户容器
      loginLogList: [],
      // 标记反向选择
      reverse: 0,
      // 多选删除
      multipleDelete: 0
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
      this.getLoginLog(this.where)
    },
    pageSize(value)
    {
      this.getLoginLog(this.where)
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
    this.getLoginLog(this.where)
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
    // 反选
    handleReverse()
    {
      this.reverse = this.reverse + 1
    },
    // 批量删除
    handleMultipleDelete()
    {
      this.multipleDelete = this.multipleDelete + 1
    },
    toUpdateData()
    {
      this.getLoginLog(this.where)
    },
    // 获取文章
    async getLoginLog(where)
    {
      const loginLogData = await getUserLoginLog(where).then(res =>
      {
        return new Promise((resolve, reject) =>
        {
          if (res && res.code === 0)
          {
            this.loading = false
            resolve(res)
          }
          else
          {
            reject('获取登录日志失败')
          }
        })
      })

      this.currentPage = loginLogData.meta.current_page
      this.pageSize = loginLogData.meta.per_page
      this.total = loginLogData.meta.total
      this.loginLogList = loginLogData.data
    },
    // 查询登录日志
    toSearch(param)
    {
      Object.assign(this.where, param)
      this.initPageWhere()
      // console.log(this.where)
      this.getLoginLog(this.where)
    },
    // 初始化搜索条件
    initPageWhere()
    {
      this.where.currentPage = 1
      this.where.pageSize = 10
      this.where.total = 0
    }
  }
}
</script>
<style lang='scss' scoped>
.btn-action{
  text-align: center;
}
</style>
