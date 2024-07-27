<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-03-07 14:19:23
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-10 20:49:26
-->
<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-21 10:50:05
 * @LastEditors: YouHuJun
 * @LastEditTime: 2021-11-08 17:07:18
-->
<template>
  <div>
    <el-table
      :key="timeStamp"
      ref="articleTable"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="articleList"
      border
      stripe
      highlight-current-row
      empty-text
      fit
      height="70vh"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        align="center"
        width="55"
        fixed
      />
      <el-table-column
        label="序号"
        type="index"
        width="55"
        align="center"
        fixed
      />
      <el-table-column
        label="详情"
        type="expand"
        align="center"
        fixed
      >
        <template slot-scope="props">
          <articleInfo :row-data="props.row" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="title"
        label="标题"
        min-width="300"
        fixed
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        prop="created_at"
        label="创建时间"
        width="200"
      />
      <el-table-column
        align="center"
        prop="published_at"
        label="发布时间"
        width="200"
      />
      <el-table-column
        align="center"
        prop="admin_nick_name"
        label="管理员"
        width="150"
      />
      <el-table-column
        align="center"
        prop="user_nick_name"
        label="用户"
        width="150"
      />
      <el-table-column
        prop="status"
        label="状态"
        width="100"
        :filters="[{ text: '未发布', value:0 },{ text: '已发布', value:10 }]"
        :filter-method="filterArticleStatus"
        filter-placement="bottom-end"
        align="center"
        fixed
      >
        <template slot-scope="scope">
          <el-tag v-show="scope.row.status==0" type="info">未发布</el-tag>
          <el-tag v-show="scope.row.status==10" type="success">已发布</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="is_top"
        label="是否置顶"
        width="100"
        :filters="[{ text: '未置顶', value:0 },{ text: '已置顶', value:1 }]"
        :filter-method="filterArticleIsTop"
        filter-placement="bottom-end"
        align="center"
        fixed
      >
        <template slot-scope="scope">
          <el-tag v-show="scope.row.is_top==0" type="info">未置顶</el-tag>
          <el-tag v-show="scope.row.is_top==1" type="success">已置顶</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleEdit(scope.$index, scope.row)"
          >编辑
          </el-button>
          <!-- 删除(禁用) -->
          <el-button
            size="mini"
            type="success"
            plain
            @click="handleToTop(scope.$index, scope.row)"
          >置顶
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
import articleInfo from '@/pages/article/notice/component/articleInfo'
import { toTopArticle, deleteArticle, multipleDeleteArticle, multipleToTopArticle, multipleUnTopArticle } from '@/api/article/article'
export default
{
  // 组件名称
  name: 'ArticleTable',
  // 组件
  components:
  {
    articleInfo
  },
  props:
    {
      loading: {
        type: Boolean,
        default: true
      },
      articleList: {
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
      beforeArticleForm: {
        type: Object,
        default: null
      },
      timeStamp: {
        type: Number,
        default: 0
      },
      reverse: {
        type: Number,
        default: 0
      },
      multipleDelete: {
        type: Number,
        default: 0
      },
      multipleToTop: {
        type: Number,
        default: 0
      },
      multipleUnTop: {
        type: Number,
        default: 0
      }
    },
  // 数据
  data()
  {
    return {
      baseUrl: '',
      // 选中队象的数组
      multipleSelection: [],
      // 选中元素的下标
      selectIndex: [],
      // 反选元素的下标
      diffIndex: [],
      // 选中的下标
      selectId: []
    }
  },
  // 计算属性
  computed:
    {
    },
  // 监听
  watch:
    {
      // 反选
      reverse(value)
      {
        this.diffIndex = []

        const all = []

        for (let index = 0; index < this.articleList.length; index++)
        {
          all.push(index)
        }

        this.diffIndex = all.filter(val =>
        {
          return !this.selectIndex.includes(val)
        })

        // 实现反选的效果
        this.$refs.articleTable.clearSelection()
        this.diffIndex.forEach(index =>
        {
          this.$refs.articleTable.toggleRowSelection(this.articleList[index])
        })

        this.selectIndex = this.diffIndex
      },
      // 批量删除
      multipleDelete(value)
      {
        this.selectId = []
        this.getSelectId()
        const selectId = {}
        selectId['selectId'] = this.selectId
        const that = this
        this.$confirm('确认要批量删除文章吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        })
          .then(() =>
          {
            multipleDeleteArticle(selectId).then((res) =>
            {
              if (res && res.code === 0)
              {
                that.$emit('hanldeUpdateData', true)
                that.$message(
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
      // 批量置顶
      multipleToTop(value)
      {
        this.selectId = []
        this.getSelectId()
        const selectId = {}
        selectId['selectId'] = this.selectId
        const that = this
        multipleToTopArticle(selectId).then((res) =>
        {
          if (res && res.code === 0)
          {
            that.$emit('hanldeUpdateData', true)
            that.$message(
              {
                message: res.msg,
                type: 'success'
              })
          }
        })
      },
      // 批量取消置顶
      multipleUnTop(value)
      {
        this.selectId = []
        this.getSelectId()
        const selectId = {}
        selectId['selectId'] = this.selectId
        const that = this
        multipleUnTopArticle(selectId).then((res) =>
        {
          if (res && res.code === 0)
          {
            that.$emit('hanldeUpdateData', true)
            that.$message(
              {
                message: res.msg,
                type: 'success'
              })
          }
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
    /* this.baseUrl = process.env.VUE_APP_URL */
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
    // 多选
    handleSelectionChange(val)
    {
      this.multipleSelection = val

      this.selectIndex = []

      this.multipleSelection.forEach(item =>
      {
        this.selectIndex.push(this.articleList.indexOf(item))
      })
    },
    /**
     * 过滤文章是否发布
     */
    filterArticleStatus(value, row)
    {
      return row.status === value
    },
    /**
     *过滤文章是否置顶
     */
    filterArticleIsTop(value, row)
    {
      return row.is_top === value
    },
    errorHandler()
    {

    },
    // 修改用户
    handleEdit(index, row)
    {
      this.$emit('update:dialogVisible', true)
      this.$emit('update:dialogTitle', '修改文章')
      this.$emit('update:dialogType', 2)
      this.$emit('update:beforeArticleForm', row)
    },

    /**
     * 置顶
     */
    handleToTop(index, row)
    {
      const id = {}
      id['id'] = row.id
      this.toTopArticle(id, index)
    },

    /**
     * 删除
     */
    handleDelete(index, row)
    {
      const id = {}
      id['id'] = row.id
      this.deleteArticle(id, index)
    },

    // 禁用角色
    toTopArticle(id, index)
    {
      const that = this
      this.$confirm('确认要将该文章置顶吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '置顶',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          toTopArticle(id).then((res) =>
          {
            if (res && res.code === 0)
            {
              that.$emit('hanldeUpdateData', true)
              that.$message(
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
    // 删除角色
    deleteArticle(id, index)
    {
      const that = this
      this.$confirm('确认要删除该文章吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          deleteArticle(id).then((res) =>
          {
            if (res && res.code === 0)
            {
              that.$emit('hanldeUpdateData', true)
              that.$message(
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

    // 获取选中下标
    getSelectId()
    {
      this.selectIndex.forEach(item =>
      {
        this.selectId.push(this.articleList[item].id)
      })
    }

  }

}
</script>
<style lang='scss' scoped>
</style>
