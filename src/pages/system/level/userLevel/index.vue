<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-21 10:51:07
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-07-15 19:31:37
-->

<template>
  <div>
    <Card>
      <template #cardTitle>
        用户级别
      </template>
      <template #cardNotice>
        <el-tag size="mini" type="danger" effect="plain">级别配置项请在详情里查看</el-tag>
      </template>
      <template #cardButton>
        <el-button style="float: right; " type="primary" @click="handleUserLevel()">添加用户级别类型</el-button>
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
                <el-col :span="6" class="btn-action"><el-button type="primary" @click="handleReverse()">反选</el-button></el-col>
                <el-col :span="6" class="btn-action"><el-button type="danger" @click="handleMultipleDelete()">删除</el-button></el-col>
              </el-row>
            </template>
            <template #table>
              <el-divider content-position="left">列表</el-divider>
              <UserLevelTable
                :loading="loading"
                :user-level-list.sync="userLevelList"
                :dialog-visible.sync="dialogVisible"
                :dialog-title.sync="dialogTitle"
                :dialog-type.sync="dialogType"
                :before-user-level-form.sync="beforeUserLevelForm"
                :reverse="reverse"
                :multiple-delete="multipleDelete"
                :multiple-disable="multipleDisable"
                :get-user-level="getUserLevel"
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
    <Dialog :dialog-visible.sync="dialogVisible" :dialog-title="dialogTitle" :dialog-type="dialogType" :dialog-width="dialogWidth">
      <template #addForm>
        <AddUserLevelForm v-if="dialogVisible==true" @hanldeUpdateData="toUpdateData" @handleCloseDialog="closeDialog" />
      </template>
      <template #updateForm>
        <UpdateUserLevelForm v-if="dialogVisible==true" :before-user-level-form="beforeUserLevelForm" @hanldeUpdateData="toUpdateData" @handleCloseDialog="closeDialog" />
      </template>
    </Dialog>
  </div>
</template>
<script>
import Card from '@/pages/component/card'

import Dialog from '@/pages/component/dialog'
import ShowTable from '@/pages/component/showTabel'
import Paginate from '@/pages/component/paginate'

import AddUserLevelForm from './component/addUserLevelForm'
import UpdateUserLevelForm from './component/updateUserLevelForm'
import Search from './component/search.vue'

import UserLevelTable from './component/userLevelTable'

import { getUserLevel } from '@/api/system/level/userLevel'

export default
{
  // 组件名称
  name: 'UserLevel',
  // 组件
  components:
    {
      Card,
      Dialog,
      ShowTable,
      Paginate,
      AddUserLevelForm,
      UpdateUserLevelForm,
      Search,
      UserLevelTable
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
      dialogWidth: '60%',
      dialogTitle: '添加用户级别类型',
      // 表单类型 1添加表单 2更新表单
      dialogType: 1,
      // 搜索显示列表条件
      where: {
        find: '',
        findSelectIndex: 0,
        timeRange: [],
        sortType: 2,
        // 分页
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      // 用户级别类型容器
      userLevelList: [],
      // 修改用户级别类型的容器
      beforeUserLevelForm: {},
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
        this.getUserLevel(this.where)
      },
      pageSize(value)
      {
        this.getUserLevel(this.where)
      },
      userLevelList: {
        handler(value)
        {
          if (value.length > 0)
          {
            this.loading = false
          }
          else
          {
            this.showType = false
          }
        },
        deep: true
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
    this.getUserLevel(this.where)
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
        this.where.currentPage = 1
        this.where.pageSize = 10
      },
      // 添加
      handleUserLevel()
      {
        this.dialogVisible = true
        this.dialogTitle = '添加用户级别类型'
        this.dialogType = 1
      },
      // 获取
      async getUserLevel(where)
      {
        const userLevelData = await getUserLevel(where).then(res =>
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
              reject('获取失败')
            }
          })
        })

        this.currentPage = userLevelData.meta.current_page
        this.pageSize = userLevelData.meta.per_page
        this.total = userLevelData.meta.total
        this.userLevelList = userLevelData.data
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
      // 更新数据
      toUpdateData()
      {
        this.getUserLevel(this.where)
      },
      // 关闭弹窗
      closeDialog(data)
      {
        this.dialogVisible = data
      },
      // 查询用户级别类型
      toSearch(param)
      {
        Object.assign(this.where, param)
        this.initPageWhere()
        this.getUserLevel(this.where)
      }
    }
}
</script>
<style lang='scss' scoped>

</style>
