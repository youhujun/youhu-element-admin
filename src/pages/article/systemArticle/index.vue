<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-12-31 17:01:20
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-10 20:47:26
-->
<template>
  <div>
    <Card>
      <template #cardTitle>
        系统文章
      </template>
      <template #cardNotice>
        <el-tag size="mini" type="danger" effect="plain">系统文章提示</el-tag>
      </template>
      <template #cardButton>
        <el-button style="float: right; " type="primary" round @click="handleAddNotice()">添加系统文章</el-button>
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
                <el-col :span="6" class="btn-action"><el-button type="success" @click="handleMultipleToTop()">置顶</el-button></el-col>
                <el-col :span="6" class="btn-action"><el-button type="warning" @click="handleMultipleUnTop()">取消置顶</el-button></el-col>
              </el-row>
            </template>
            <template #table>
              <el-divider content-position="left">文章列表</el-divider>
              <ArticleTable
                :loading="loading"
                :article-list.sync="articleList"
                :dialog-visible.sync="dialogVisible"
                :dialog-title.sync="dialogTitle"
                :dialog-type.sync="dialogType"
                :before-article-form.sync="beforeArticleForm"
                :time-stamp="timeStamp"
                :reverse="reverse"
                :multiple-delete="multipleDelete"
                :multiple-to-top="multipleToTop"
                :multiple-un-top="multipleUnTop"
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
    <Dialog v-if="dialogVisible" :dialog-visible.sync="dialogVisible" :dialog-title="dialogTitle" :dialog-type="dialogType" :dialog-width="dialogWidth">
      <template #addForm>
        <AddArticleForm v-if="dialogVisible==true" @hanldeAddData="addData" @handleCloseDialog="closeDialog" />
      </template>
      <template #updateForm>
        <UpdateArticleForm v-if="dialogVisible==true" :before-article-form="beforeArticleForm" @hanldeUpdateData="toUpdateData" @handleCloseDialog="closeDialog" />
      </template>
    </Dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getAllTreeId } from '@/utils'

import Card from '@/pages/component/card'
import Dialog from '@/pages/component/dialog'
import ShowTable from '@/pages/component/showTabel'
import Paginate from '@/pages/component/paginate'

import AddArticleForm from '@/pages/article/systemArticle/component/addArticleForm'
import UpdateArticleForm from '@/pages/article/systemArticle/component/updateArticleForm'

import Search from '@/pages//article/systemArticle/component/search'
import ArticleTable from '@/pages//article/systemArticle/component/articleTable'

// import Socket from '@/socket'

import { getArticle } from '@/api/article/article'

export default
{
  // 组件名称
  name: 'Notice',
  // 组件
  components:
  {
    Card,
    Dialog,
    Paginate,
    ShowTable,
    AddArticleForm,
    UpdateArticleForm,
    Search,
    ArticleTable
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
      dialogWidth: '98%',
      dialogTitle: '添加系统文章',
      // 表单类型 1添加表单 2更新表单
      dialogType: 1,
      // 搜索显示列表条件
      where: {
        // 标题
        find: '',
        // 发布时间
        timeRangePublish: [],
        // 创建时间
        timeRangeCreate: [],
        // 分类选择默认数组
        category_id: [],
        // 分类id 处理完的id数组
        categoryArray: [],
        // 标签选择默认数组
        label_id: [],
        // 标签id 处理完的id数组
        labelArray: [],
        // 是否置顶
        is_top: '',
        // 是否发布
        status: '',
        // 排序方式
        sortType: '4',
        // 分页
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      // 用户容器
      articleList: [],
      timeStamp: new Date().valueOf(),
      // 修改用户级别的容器
      beforeArticleForm: {},
      // 标记反向选择
      reverse: 0,
      // 多选删除
      multipleDelete: 0,
      // 多选置顶
      multipleToTop: 0,
      // 批量取消置顶
      multipleUnTop: 0
    }
  },
  // 计算属性
  computed:
  {
    ...mapGetters(['treeCategory', 'treeLabel']),
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
      this.getArticle()
    },
    pageSize(value)
    {
      this.getArticle()
    },

    articleList: {
      handler(value)
      {
        if (value.length > 0)
        {
          this.loading = false
        }
        else
        {
          this.loading = false
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
    /*  Socket.channel(process.env.VUE_APP_PREFIX + 'article')
      .listen('.add.article', (e) =>
      {
        console.log(e)
      }) */
    this.getArticle()
    this.$store.dispatch('category/getTreeCategory')
    this.$store.dispatch('label/getTreeLabel')
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
    // 检查分类数组(处理完的)
    checkCategoryArray()
    {
      const category = []

      const idArray = []

      if (this.treeCategory.length >= 1)
      {
        this.treeCategory.forEach(element =>
        {
          if (element.category_name === '系统文章')
          {
            category[0] = element
          }
        })
      }
      getAllTreeId(category, idArray)

      if (this.where.categoryArray.length === 0)
      {
        this.where.categoryArray = idArray
      }
    },
    // 添加公告
    handleAddNotice()
    {
      this.dialogVisible = true
      this.dialogType = 1
      this.dialogTitle = '添加公告'
    },
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
    // 批量置顶
    handleMultipleToTop()
    {
      this.multipleToTop = this.multipleToTop + 1
    },
    // 批量取消置顶
    handleMultipleUnTop()
    {
      this.multipleUnTop = this.multipleUnTop + 1
    },
    // 添加数据
    addData()
    {
      this.getArticle()
    },
    // 更新数据
    toUpdateData()
    {
      this.getArticle()
    },
    // 关闭弹窗
    closeDialog(data)
    {
      this.dialogVisible = data
    },
    // 获取文章
    async getArticle()
    {
      this.checkCategoryArray()
      const articleData = await getArticle(this.where).then(res =>
      {
        return new Promise((resolve, reject) =>
        {
          if (res && res.code === 0)
          {
            resolve(res)
          }
          else
          {
            reject('获取文章失败')
          }
        })
      })

      this.currentPage = articleData.meta.current_page
      this.pageSize = articleData.meta.per_page
      this.total = articleData.meta.total
      this.articleList = articleData.data
    },
    // 查询文章
    toSearch(param)
    {
      Object.assign(this.where, param)
      this.initPageWhere()
      // console.log(this.where)
      this.getArticle()
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
.loading
{
   width: 100%;
   margin:10rem auto;
   text-align: center;
   .loading-show{
      font-size: 0.9rem;
      color:#C0C4CC;
      margin-bottom: 1rem;
   }
}

.btn-action{
  text-align: center;
}

</style>
