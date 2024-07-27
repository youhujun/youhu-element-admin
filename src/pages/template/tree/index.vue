<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-15 10:51:17
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-26 21:28:57
-->
<template>
  <div>
    <Card>
      <template #cardTitle>
        页面标题
      </template>
      <template #cardNotice>
        <el-tag size="mini" type="danger" effect="plain">提示
        </el-tag>
      </template>
      <template #cardButton>
        <el-button style="float: right; " type="primary" @click="handleAddTopReplace()">添加顶级分类</el-button>
      </template>
      <template #cardContent>
        <div class="custom-node">
          <!-- 加载动画 -->
          <Loading :show-type="showType" />
          <!-- 显示树状数据 -->
          <el-tree
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="treeReplace"
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
                  @click="()=>handleAppendReplace(node,data)"
                > 添加下级分类</el-button>
                <el-button
                  type="success"
                  size="mini"
                  plain
                  round
                  @click="()=>handleShowReplace(node,data)"
                > 查 看 </el-button>
                <el-button
                  type="warning"
                  size="mini"
                  plain
                  round
                  @click="()=>handleUpdateReplace(node,data)"
                > 修改 </el-button>
                <el-button
                  type="danger"
                  size="mini"
                  plain
                  round
                  @click="()=>handleRemoveReplace(node,data)"
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
        <AddReplaceForm :new-add-replace-from="newAddReplaceFrom" @handleCloseDialog="closeDialog" />
      </template>
      <template #updateForm>
        <UpdateReplaceForm :before-replace-form="beforeReplaceForm" @handleCloseDialog="closeDialog" />
      </template>
      <template #showForm>
        <TreeInfo :row-data="beforeReplaceForm" :show.sync="treeShow" @handleCloseDialog="closeDialog" />
      </template>
    </Dialog>
  </div>
</template>
<script>
import Card from '@/pages/component/card'
import Dialog from '@/pages/component/dialog'
import Loading from '@/pages/component/loading'

import AddReplaceForm from '@/pages/template/tree/component/addReplaceForm'
import UpdateReplaceForm from '@/pages/template/tree/component/updateReplaceForm'
import TreeInfo from '@/pages/template/tree/component/treeInfo'
import { mapGetters } from 'vuex'
import { updateReplace, deleteReplace, moveReplace } from '@/api/replace'
import { throttle } from '@/utils'
export default
{
  // 组件名称
  name: 'Replace',
  // 组件
  components:
  {
    Card,
    Dialog,
    Loading,
    AddReplaceForm,
    UpdateReplaceForm,
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
          return `${data.replace_name}`
        }
      },
      // 添加自己用户级别用的容器
      newAddReplaceFrom: {},
      // 修改用户级别的容器
      beforeReplaceForm: {}
    }
  },
  // 计算属性
  computed:
  {
    ...mapGetters(['treeReplace'])
  },
  // 监听
  watch:
  {
    treeReplace(value)
    {
      if (value.length > 0)
      {
        this.loading = false
      }
      else
      {
        this.loading = false
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
    // this.getReplace()
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
    handleAddTopReplace()
    {
      const param = {}
      param['parent_id'] = 0
      param['deep'] = 1
      param['sort'] = 100
      // 改变值
      this.newAddReplaceFrom = param
      // console.log(this.newAddReplaceFrom)
      this.dialogVisible = true
      this.dialogTitle = '添加顶级分类'
      this.dialogType = 1
    },

    // 添加下级角色
    handleAppendReplace(node, data)
    {
      const param = {}
      param['deep'] = data.deep + 1
      param['parent_id'] = data.id

      // 改变值
      this.newAddReplaceFrom = param
      this.dialogTitle = '添加子级分类'
      this.dialogVisible = true
      this.dialogType = 1
    },
    // 修改角色
    handleUpdateReplace(node, data)
    {
      const param = {}
      param['id'] = data.id
      param['deep'] = data.deep
      param['sort'] = data.sort
      param['revision'] = data.revision
      param['parent_id'] = data.parent_id
      param['replace_name'] = data.replace_name
      param['rate'] = data.rate

      this.beforeReplaceForm = param
      this.dialogTitle = '修改分类'
      this.dialogVisible = true
      this.dialogType = 2
    },
    // 修改角色
    handleShowReplace(node, data)
    {
      const param = {}
      param['id'] = data.id
      param['deep'] = data.deep
      param['sort'] = data.sort
      param['revision'] = data.revision
      param['parent_id'] = data.parent_id
      param['replace_name'] = data.replace_name
      param['rate'] = data.rate

      this.beforeReplaceForm = param
      this.dialogTitle = '查看分类'
      this.dialogVisible = true
      this.dialogType = 3
    },
    // 删除地区
    handleRemoveReplace(node, data)
    {
      const id = {}
      id['id'] = data.id
      this.deleteReplace(id)
    },

    // 删除地区
    deleteReplace(id)
    {
      const that = this

      this.$confirm('确认要删除该分类吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          deleteReplace(id).then((res) =>
          {
            if (res && res.code === 0)
            {
              that.$store.dispatch('replace/getTreeReplace', res.data)
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

      this.moveReplace(param)
    }, 600),

    /**
     * 更新菜单
     */
    updateReplace(data)
    {
      const that = this
      updateReplace(data).then(res =>
      {
        if (res && res.code === 0)
        {
          that.$store.dispatch('replace/getTreeReplace', res.data)

          that.$message(
            {
              message: res.msg,
              type: 'success'
            })
        }
      })
    },
    /**
     * 移动配置项
     */
    moveReplace(data)
    {
      const that = this
      moveReplace(data).then(res =>
      {
        if (res && res.code === 0)
        {
          // that.$store.dispatch('system/getTreeRole', res.data)
          that.$message(
            {
              message: res.msg,
              type: 'success'
            })
          // that.getReplace()
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
