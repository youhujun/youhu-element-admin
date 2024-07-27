<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-15 10:51:17
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-26 21:37:21
-->
<template>
  <div>
    <Card>
      <template #cardTitle>
        文章分类
      </template>
      <template #cardNotice>
        <el-tag size="mini" type="danger" effect="plain">有子类或者有关联文章,均不可删除
        </el-tag>
      </template>
      <template #cardButton>
        <el-button style="float: right; " type="primary" @click="handleAddTopCategory()">添加顶级分类</el-button>
      </template>
      <template #cardContent>
        <div class="custom-node">
          <el-tree
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="treeCategory"
            :props="defaultProps"
            draggable
            :allow-drag="allowDrag"
            @node-drop="handleDrop"
          >
            <div slot-scope="{ node, data }" class="custom-tree-node">
              <div>{{ node.label }}</div>
              <div>
                <el-button
                  type="primary"
                  size="mini"
                  plain
                  round
                  @click="()=>handleAppendCategory(node,data)"
                > 添加下级分类</el-button>
                <el-button
                  type="success"
                  size="mini"
                  plain
                  round
                  @click="()=>handleShowCategory(node,data)"
                > 查 看 </el-button>
                <el-button
                  type="warning"
                  size="mini"
                  plain
                  round
                  @click="()=>handleUpdateCategory(node,data)"
                > 修改 </el-button>
                <el-button
                  type="danger"
                  size="mini"
                  plain
                  round
                  @click="()=>handleRemoveCategory(node,data)"
                > 删除 </el-button>
              </div>
            </div>
          </el-tree>
        </div>
      </template>
    </Card>
    <!-- 弹框开始 -->
    <Dialog
      :dialog-visible.sync="dialogVisible"
      :dialog-title="dialogTitle"
      :dialog-type="dialogType"
      :dialog-width="dialogWidth"
    >
      <template #addForm>
        <AddCategoryForm
          ref="addCategoryClassRef"
          :new-add-category-from="newAddCategoryFrom"
          @handleCloseDialog="closeDialog"
        />
      </template>
      <template #updateForm>
        <UpdateCategoryForm
          ref="updateCategoryClassRef"
          :before-category-form="beforeCategoryForm"
          @handleCloseDialog="closeDialog"
        />
      </template>
      <template #showForm>
        <TreeInfo :row-data="beforeCategoryForm" :show.sync="treeShow" @handleCloseDialog="closeDialog" />
      </template>
    </Dialog>
  </div>
</template>
<script>
import Card from '@/pages/component/card'
import Dialog from '@/pages/component/dialog'
import AddCategoryForm from '@/pages/system/group/category/component/addCategoryForm'
import UpdateCategoryForm from '@/pages/system/group/category/component/updateCategoryForm'
import TreeInfo from '@/pages/system/group/category/component/treeInfo'
import { mapGetters } from 'vuex'
import { deleteCategory, moveCategory } from '@/api/system/group/category'
import { throttle } from '@/utils'
export default
{
  // 组件名称
  name: 'Category',
  // 组件
  components:
  {
    Card,
    Dialog,
    AddCategoryForm,
    UpdateCategoryForm,
    TreeInfo
  },
  props:
  {
  },
  // 数据
  data()
  {
    return {
      // loading 初始加载显示控制
      loading: true,
      // 弹窗控制
      dialogVisible: false,
      dialogWidth: '60%',
      dialogTitle: '添加顶级分类',
      // 表单类型 1添加表单 2更新表单
      dialogType: 1,
      // 默认tree显示
      defaultProps:
      {
        children: 'children',
        label: (data, node) =>
        {
          return `${data.category_name}`
        }
      },
      // 添加自己用户级别用的容器
      newAddCategoryFrom: {},
      // 修改用户级别的容器
      beforeCategoryForm: {},
      treeShow: 0
    }
  },
  // 计算属性
  computed:
  {
    ...mapGetters(['treeCategory'])
  },
  // 监听
  watch:
  {
    treeCategory(value)
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
    dialogVisible:
    {
      handler(val)
      {
        this.treeShow = 0
        if (!val)
        {
          this.$refs.addCategoryClassRef && this.$refs.addCategoryClassRef.initCategoryForm()
          this.$refs.updateCategoryClassRef && this.$refs.updateCategoryClassRef.initCategoryForm()
        }
      }
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
    this.$store.dispatch('category/getTreeCategory')
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
    // 添加顶级级别
    handleAddTopCategory()
    {
      const param = {}
      param['parent_id'] = 0
      param['deep'] = 1
      param['sort'] = 100
      // 改变值
      this.newAddCategoryFrom = param
      this.dialogVisible = true
      this.dialogTitle = '添加顶级分类'
      this.dialogType = 1
    },

    // 添加下级文章分类
    handleAppendCategory(node, data)
    {
      const param = {}
      param['deep'] = data.deep + 1
      param['parent_id'] = data.id

      // 改变值
      this.newAddCategoryFrom = param
      this.dialogTitle = '添加子级分类'
      this.dialogVisible = true
      this.dialogType = 1
    },
    // 修改文章分类
    handleUpdateCategory(node, data)
    {
      this.equalToForm(data)
      this.dialogTitle = '修改分类'
      this.dialogVisible = true
      this.dialogType = 2
    },
    // 查看
    handleShowCategory(node, data)
    {
      this.equalToForm(data)
      this.dialogTitle = '查看分类'
      this.dialogVisible = true
      this.dialogType = 3
    },
    equalToForm(data)
    {
      const param = {}
      param['id'] = data.id
      param['parent_id'] = data.parent_id
      param['sort'] = data.sort
      param['category_name'] = data.category_name
      param['category_code'] = data.category_code
      param['rate'] = data.rate
      param['remark_info'] = data.remark_info
      if (data.picture)
      {
        param['picture'] = data.picture
      }
      else
      {
        param['picture'] = null
      }
      this.beforeCategoryForm = param
    },
    // 删除文章分类
    handleRemoveCategory(node, data)
    {
      const params = {}
      params['id'] = data.id
      params['is_delete'] = '1'
      this.deleteCategory(params)
    },

    // 删除
    deleteCategory(params)
    {
      const that = this

      this.$confirm('确认要删除该分类吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          deleteCategory(params).then((res) =>
          {
            if (res && res.code === 0)
            {
              that.$store.dispatch('category/getTreeCategory')
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

    // 判断是否可以拖拽
    allowDrag(draggingNode)
    {
      return true
    },
    // 移动结束
    handleDrop: throttle(function(draggingNode, dropNode, dropType, ev)
    {
      // draggingNode 移动的项目
      // dropNode 移动相关的项目
      // dropType 移动的类型
      /* console.log(draggingNode)
      console.log(dropNode)
      console.log(dropType) */

      const param = {}

      param['id'] = draggingNode.data.id
      param['parent_id'] = draggingNode.data.parent_id
      param['dropType'] = dropType
      param['sort'] = draggingNode.data.sort

      // 如果是inner,那么parent_id就是 dropNode.data.id,否则就是同级的父id
      if (dropType === 'inner')
      {
        param['parent_id'] = dropNode.data.id
      }
      else
      {
        param['parent_id'] = dropNode.data.parent_id

        if (dropType === 'before')
        {
          param['sort'] = dropNode.data.sort + 1
        }

        if (dropType === 'before')
        {
          param['sort'] = dropNode.data.sort - 1
        }
      }
      this.moveCategory(param)
    }, 600),
    /**
     * 移动配置项
     */
    moveCategory(data)
    {
      const that = this
      moveCategory(data).then(res =>
      {
        if (res && res.code === 0)
        {
          that.$store.dispatch('category/getTreeCategory')
          that.$message(
            {
              message: res.msg,
              type: 'success'
            })
        }
      })
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
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
    padding-right: 1rem;
}
</style>
