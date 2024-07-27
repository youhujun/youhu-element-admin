<!--
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2024-05-12 20:24:06
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-12 23:35:27
 * @FilePath: \src\pages\system\platform\phoneIndexBanner\index.vue
-->

<template>
  <div>
    <Card>
      <template #cardTitle>
        首页轮播
      </template>
      <template #cardNotice>
        <el-tag size="mini" type="danger" effect="plain">轮播图最佳尺寸:宽750*高556</el-tag>
      </template>
      <template #cardButton>
        <el-button style="float: right; " type="primary" @click="handleAddPhoneBanner()">添加首页轮播</el-button>
      </template>
      <template #cardContent>
        <div class="custom-node">
          <!-- 显示表格 "-->
          <ShowTable>
            <template #search>
              <el-divider content-position="left">搜索</el-divider>
              <Search @handleChangeSearch="toSearch" />
            </template>
            <template #table>
              <el-divider content-position="left">列表</el-divider>
              <PhoneBannerTable
                :loading="loading"
                :phone-banner-list.sync="phoneBannerList"
                :dialog-visible.sync="dialogVisible"
                :dialog-title.sync="dialogTitle"
                :dialog-type.sync="dialogType"
                :before-phone-banner-form.sync="beforePhoneBannerForm"
                :reverse="reverse"
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
        <AddPhoneBannerForm v-if="dialogVisible==true" @hanldeUpdateData="toUpdateData" @handleCloseDialog="closeDialog" />
      </template>
      <template #updateForm>
        <UpdatePhoneBannerForm v-if="dialogVisible==true" :before-phone-banner-form="beforePhoneBannerForm" @hanldeUpdateData="toUpdateData" @handleCloseDialog="closeDialog" />
      </template>
    </Dialog>
  </div>
</template>
<script>
import Card from '@/pages/component/card'
import Dialog from '@/pages/component/dialog'
import ShowTable from '@/pages/component/showTabel'
import Paginate from '@/pages/component/paginate'

import AddPhoneBannerForm from './component/addPhoneBannerForm'
import UpdatePhoneBannerForm from './component/updatePhoneBannerForm'
import Search from './component/search.vue'

import PhoneBannerTable from './component/phoneBannerTable'

import { getPhoneBanner } from '@/api/system/platform/phoneBanner'

export default
{
  // 组件名称
  name: 'PhoneBanner',
  // 组件
  components:
    {
      Card,
      Dialog,
      ShowTable,
      Paginate,
      AddPhoneBannerForm,
      UpdatePhoneBannerForm,
      Search,
      PhoneBannerTable
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
      dialogTitle: '添加首页轮播',
      // 表单 1添加表单 2更新表单
      dialogType: 1,
      // 搜索显示列表条件
      where: {
        sortType: 2,
        // 分页
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      // 首页轮播容器
      phoneBannerList: [],
      // 修改首页轮播的容器
      beforePhoneBannerForm: {},
      // 标记反向选择
      reverse: 0
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
        this.getPhoneBanner(this.where)
      },
      pageSize(value)
      {
        this.getPhoneBanner(this.where)
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
    this.event.$on('updateData', (data) =>
    {
      this.getPhoneBanner(this.where)
    })
    this.getPhoneBanner(this.where)
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
      handleAddPhoneBanner()
      {
        this.dialogVisible = true
        this.dialogTitle = '添加首页轮播'
        this.dialogType = 1
      },
      // 获取
      async getPhoneBanner(where)
      {
        const phoneBannerData = await getPhoneBanner(where).then(res =>
        {
          return new Promise((resolve, reject) =>
          {
            if (res && res.code === 0)
            {
              resolve(res)
            }
            else
            {
              reject('获取失败')
            }
          })
        })

        this.currentPage = phoneBannerData.meta.current_page
        this.pageSize = phoneBannerData.meta.per_page
        this.total = phoneBannerData.meta.total
        this.phoneBannerList = phoneBannerData.data
        this.loading = false
      },
      // 更新数据
      toUpdateData()
      {
        this.getPhoneBanner(this.where)
      },
      // 关闭弹窗
      closeDialog(data)
      {
        this.dialogVisible = data
      },
      // 查询首页轮播
      toSearch(param)
      {
        Object.assign(this.where, param)
        this.initPageWhere()
        this.getPhoneBanner(this.where)
      }
    }
}
</script>
<style lang='scss' scoped>
  .btn-action{
    text-align: center;
  }
</style>
