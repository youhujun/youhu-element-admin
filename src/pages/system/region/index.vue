<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-11 16:28:38
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-02 23:06:17
-->
<template>
  <div>
    <Card>
      <template #cardTitle>
        地区管理
      </template>
      <template #cardNotice>
        <el-tag size="mini" type="danger" effect="plain">地区级别可以继续向下添加</el-tag>
      </template>
      <template #cardButton>
        <el-button style="float: right; " type="primary" @click="handleAddTopRegion()">添加顶级地区</el-button>
      </template>
      <template #cardContent>
        <div class="custom-node">
          <el-tree
            :loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="treeRegions"
            :props="defaultProps"
            draggable
            :allow-drag="allowDrag"
            @node-drop="handleDrop"
          >
            <div slot-scope="{ node, data }" class="custom-tree-node">
              <div>{{ node.label }}</div>
              <div>
                <el-button type="primary" size="mini" plain round @click="()=>handleAppendRegion(node,data)"> 添加下级地区</el-button>
                <el-button type="warning" size="mini" plain round @click="()=>handleUpdateRegion(node,data)"> 修改 </el-button>
                <el-button type="danger" size="mini" plain round @click="()=>handleRemoveRegion(node,data)"> 删除 </el-button>
              </div>
            </div>
          </el-tree>
        </div>
      </template>
    </Card>
    <!-- 弹框开始 -->
    <Dialog :dialog-visible.sync="dialogVisible" :dialog-title="dialogTitle" :dialog-type="dialogType" :dialog-width="dialogWidth">
      <template #addForm>
        <AddRegionForm ref="addRegionRef" :new-add-region-from="newAddRegionFrom" @handleCloseDialog="closeDialog" />
      </template>
      <template #updateForm>
        <UpdateRegionForm ref="updateRegionRef" :before-region-form="beforeRegionForm" @handleCloseDialog="closeDialog" />
      </template>
    </Dialog>
  </div>
</template>
<script>
import Card from '@/pages/component/card'
import Dialog from '@/pages/component/dialog'
import AddRegionForm from './component/addRegionForm'
import UpdateRegionForm from './component/updateRegionForm'
import { mapGetters } from 'vuex'
import { deleteRegion, moveRegion } from '@/api/system/region/region'
import { throttle } from '@/utils'
export default
{
  // 组件名称
  name: 'Region',
  // 组件
  components:
  {
    Card,
    Dialog,
    AddRegionForm,
    UpdateRegionForm
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
      dialogTitle: '添加顶级地区',
      // 表单类型 1添加表单 2更新表单
      dialogType: 1,
      // 默认tree显示
      defaultProps:
      {
        children: 'children',
        label: (data, node) =>
        {
          return `${data.region_name}`
        }
      },
      // 添加自己用户级别用的容器
      newAddRegionFrom: {},
      // 修改用户级别的容器
      beforeRegionForm: {}
    }
  },
  // 计算属性
  computed:
  {
    ...mapGetters(['treeRegions'])
  },
  // 监听
  watch:
  {
    treeRegions(value)
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
        if (!val)
        {
          this.$refs.addRegionRef && this.$refs.addRegionRef.initRegionForm()
          this.$refs.updateRegionRef && this.$refs.updateRegionRef.initRegionForm()
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
    if (this.treeRegions.length > 0)
    {
      this.loading = false
    }
    else
    {
      this.loading = false
    }
    this.$store.dispatch('region/getTreeRegions')
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
    handleAddTopRegion()
    {
      const param = {}
      param['parent_id'] = 0
      param['deep'] = 1
      param['sort'] = 100
      // 改变值
      this.newAddRegionFrom = param
      // console.log(this.newAddRegionFrom)
      this.dialogVisible = true
      this.dialogTitle = '添加顶级地区'
      this.dialogType = 1
    },

    // 添加下级
    handleAppendRegion(node, data)
    {
      const param = {}
      param['deep'] = data.deep + 1
      param['parent_id'] = data.id
      // 改变值
      this.newAddRegionFrom = param
      this.dialogTitle = '添加子级地区'
      this.dialogVisible = true
      this.dialogType = 1
    },
    // 修改
    handleUpdateRegion(node, data)
    {
      const param = {}
      param['id'] = data.id
      param['deep'] = data.deep
      param['sort'] = data.sort
      param['parent_id'] = data.parent_id
      param['region_name'] = data.region_name

      this.beforeRegionForm = param
      this.dialogTitle = '修改地区'
      this.dialogVisible = true
      this.dialogType = 2
    },
    // 删除地区
    handleRemoveRegion(node, data)
    {
      const id = {}
      id['id'] = data.id
      this.deleteRegion(id)
    },

    // 删除地区
    deleteRegion(id)
    {
      const that = this

      this.$confirm('确认要删除该地区吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          deleteRegion(id).then((res) =>
          {
            if (res && res.code === 0)
            {
              that.$store.dispatch('region/getTreeRegions')
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
      const param = {}

      param['id'] = draggingNode.data.id
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
      }
      this.moveRegion(param)
    }, 600),
    /**
     * 移动配置项
     */
    moveRegion(data)
    {
      moveRegion(data).then(res =>
      {
        if (res && res.code === 0)
        {
          this.$store.dispatch('region/getTreeRegions')
          this.$message(
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
