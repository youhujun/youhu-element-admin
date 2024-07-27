<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-11 16:28:38
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-11-30 17:19:59
-->
<template>
  <div>
    <Card>
      <template #cardTitle>
        模板
      </template>
      <template #cardNotice>
        <el-tag size="mini" type="danger" effect="plain">模板提示</el-tag>
      </template>
      <!--  <template #cardButton>
        <el-button style="float: right; " type="primary" round>添加顶级地区</el-button>
      </template> -->
      <template #cardContent>
        <div class="custom-node">
          <!-- <div v-if="roleArray.length === 0" class="loading">
            <div class="loading-show">加载中...</div>
            <i class="el-icon-loading" />
          </div> -->
          <!-- <el-tree
            :data="serverRoles"
            :props="defaultProps"
            default-expand-all
            draggable
            :allow-drag="allowDrag"
            @node-drop="handleDrop"
          >
            <div slot-scope="{ node, data }" class="custom-tree-node">
              <div>{{ node.label }}</div>
              <div>
                <el-button v-if="data.id!==1" type="primary" size="mini" round @click="()=>handleRolePermission(node,data)">权限管理</el-button>
                <el-button v-if="data.id!==1" type="primary" size="mini" plain round @click="()=>handleAppendRole(node,data)"> 添加下级角色 </el-button>
                <el-button v-if="data.id!==1" type="warning" size="mini" plain round @click="()=>handleUpdateRole(node,data)"> 修改 </el-button>
                <el-button v-if="data.id!==1" type="danger" size="mini" plain round @click="()=>handleRemoveRole(node,data)"> 删除 </el-button>
              </div>
            </div>
          </el-tree> -->
        </div>
      </template>
    </Card>
    <!-- 弹框开始 -->
    <Dialog :dialog-visible.sync="dialogVisible" :dialog-title="dialogTitle" :dialog-type="dialogType" :dialog-width="dialogWidth">
      <template #addForm>
        <!-- <AddRoleForm :new-add-role-from="newAddRoleFrom" :role-array.sync=" roleArray" /> -->
      </template>
      <template #updateForm>
        <!--  <UpdateRoleForm :before-role-form="beforeRoleForm" :role-array.sync=" roleArray" /> -->
      </template>
    </Dialog>
  </div>
</template>
<script>
import Card from '@/pages/component/card'
import Dialog from '@/pages/component/dialog'

export default
{
  // 组件名称
  name: 'UserLevel',
  // 组件
  components:
  {
    Card,
    Dialog
  },
  props:
  {
  },
  // 数据
  data()
  {
    return {
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
          return `${data}`
        }
      },
      // 用户级别显示容器,
      regionArray: [],
      // 添加自己用户级别用的容器
      newAddRegionFrom: {},
      // 修改用户级别的容器
      beforeRegionForm: {}
    }
  },
  // 计算属性
  computed:
  {
  },
  // 监听
  watch:
  {
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
  }
}
</script>
<style lang='scss' scoped>
</style>
