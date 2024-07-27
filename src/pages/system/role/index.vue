<template>
  <div>
    <Card>
      <template #cardTitle>
        角色管理
      </template>
      <template #cardNotice>
        <el-tag size="mini" type="danger" effect="plain">该角色管理带有分组性质</el-tag>
      </template>
      <template #cardButton>
        <el-button style="float: right; " type="primary" roun @click="handleAddTopRole()">添加顶级角色</el-button>
      </template>
      <template #cardContent>
        <div class="custom-node">
          <div v-if="showType === 1" class="loading">
            <div class="loading-show">加载中...</div>
            <i class="el-icon-loading" />
          </div>
          <div v-if="showType === 2" class="loading">
            <div class="loading-show">暂无数据</div>
          </div>
          <el-tree
            v-if="showType === 3"
            :data="systemRoles"
            :props="defaultProps"
            default-expand-all
            draggable
            :allow-drag="allowDrag"
            @node-drop="handleDrop"
          >
            <div slot-scope="{ node, data }" class="custom-tree-node">
              <div>{{ node.label }}</div>
              <div>
                <el-button v-permission="['develop','super']" type="primary" size="mini" round @click="()=>handleRolePermission(node,data)">权限管理</el-button>
                <el-button v-permission="['develop','super','admin']" type="primary" size="mini" plain round @click="()=>handleAppendRole(node,data)"> 添加下级角色 </el-button>
                <el-button v-permission="['develop','super']" type="warning" size="mini" plain round @click="()=>handleUpdateRole(node,data)"> 修改 </el-button>
                <el-button v-permission="['develop','super']" type="danger" size="mini" plain round @click="()=>handleRemoveRole(node,data)"> 删除 </el-button>
              </div>
            </div>
          </el-tree>
        </div>
      </template>
    </Card>
    <!-- 弹框开始 -->
    <Dialog :dialog-visible.sync="dialogVisible" :dialog-title="dialogTitle" :dialog-type="dialogType" :dialog-width="dialogWidth">
      <template #addForm>
        <AddRoleForm ref="addRole" :new-add-role-from="newAddRoleFrom" @handleCloseDialog="closeDialog" />
      </template>
      <template #updateForm>
        <UpdateRoleForm ref="updateRole" :before-role-form="beforeRoleForm" @handleCloseDialog="closeDialog" />
      </template>
    </Dialog>
    <DialogContent :dialog-content-visible.sync="dialogContentVisible" :dialog-content-title="dialogContentTitle" :dialog-content-width="dialogContentWidth">
      <template #content>
        <div class="custom-node">
          <el-tree
            ref="tree"
            :data="serverRoutes"
            :props="defaultPermissionProps"
            node-key="id"
            show-checkbox
            default-expand-all
          >
            <div slot-scope="{ node}" class="custom-tree-node">
              <div>{{ node.label }}</div>
            </div>
          </el-tree>
          <div class="reset-button">
            <el-button type="primary" @click="()=>resetRolePermission()">确认修改</el-button>
          </div>
        </div>
      </template>
    </DialogContent>
  </div>
</template>
<script>
import Card from '@/pages/component/card'
import Dialog from '@/pages/component/dialog'
import DialogContent from '@/pages/component/dialogContent'
import AddRoleForm from '@/pages/system/role/component/addRoleForm'
import UpdateRoleForm from '@/pages/system/role/component/updateRoleForm'

import { deleteRole, resetRolePermission, moveRole } from '@/api/system/role/role'
import { mapGetters } from 'vuex'
import { throttle } from '@/utils'
import permission from '@/directive/permission/index.js' // 权限判断指令
export default
{
  // 组件名称
  name: 'Role',
  // 组件
  components:
  {
    Card,
    Dialog,
    DialogContent,
    AddRoleForm,
    UpdateRoleForm
  },
  directives: { permission },
  props:
  {

  },
  // 数据
  data()
  {
    return {
      // 配合loading
      showType: 1,
      // 弹窗控制
      dialogVisible: false,
      dialogWidth: '60%',
      dialogTitle: '添加顶级角色',
      // 表单类型 1添加表单 2更新表单
      dialogType: 1,
      // 默认tree显示
      defaultProps:
      {
        children: 'children',
        label: (data, node) =>
        {
          return `${data.role_name}--${data.logic_name}`
        }
      },
      // 角色显示容器,
      roleArray: [],
      // 添加自己角色用的容器
      newAddRoleFrom: {},
      // 修改角色的容器
      beforeRoleForm: {},
      // 内容弹窗控制
      dialogContentVisible: false,
      dialogContentTitle: '权限管理',
      dialogContentWidth: '98%',

      defaultPermissionProps: {
        children: 'children',
        label: (data, node) =>
        {
          return data.meta.title
        }
      },
      checkedKeys: [],

      rolePermissionForm: {
        role_id: 0,
        before_permission: [],
        after_permission: []
      }

    }
  },
  // 计算属性
  computed:
  {
    ...mapGetters(['serverRoutes', 'roles', 'systemRoles'])
  },
  // 监听
  watch:
  {
    dialogContentVisible(value)
    {
      if (!value)
      {
        this.rolePermissionForm.role_id = 0
        this.rolePermissionForm.before_permission = []
        this.rolePermissionForm.after_permission = []
        this.$refs.tree.setCheckedKeys([])
      }
    },
    systemRoles(value)
    {
      if (value.length > 0)
      {
        this.showType = 3
      }
      else
      {
        this.showType = 2
      }
    },
    dialogVisible:
    {
      handler(val)
      {
        if (!val)
        {
          this.$refs.addRole && this.$refs.addRole.initRoleForm()
          this.$refs.updateRole && this.$refs.updateRole.initRoleForm()
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
    if (this.systemRoles.length > 0)
    {
      this.showType = 3
    }
    else
    {
      this.showType = 2
    }

    if (!this.roles.includes('develop'))
    {
      this.serverRoutes[0].children[0].disabled = true
    }

    this.$store.dispatch('system/getTreeRole')
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
    // 添加顶级角色
    handleAddTopRole()
    {
      const param = {}
      param['parent_id'] = 0
      param['deep'] = 1
      // 改变值
      this.newAddRoleFrom = param
      this.dialogVisible = true
      this.dialogTitle = '添加顶级角色'
      this.dialogType = 1
    },
    // 添加下级角色
    handleAppendRole(node, data)
    {
      const param = {}
      param['deep'] = data.deep + 1
      param['parent_id'] = data.id
      // 改变值
      this.newAddRoleFrom = param
      this.dialogTitle = '添加子级角色'
      this.dialogVisible = true
      this.dialogType = 1
    },
    // 修改角色
    handleUpdateRole(node, data)
    {
      const param = {}
      param['id'] = data.id
      param['sort'] = data.sort
      param['role_name'] = data.role_name
      param['logic_name'] = data.logic_name

      this.beforeRoleForm = param
      this.dialogTitle = '修改角色'
      this.dialogVisible = true
      this.dialogType = 2
    },
    // 删除角色
    handleRemoveRole(node, data)
    {
      if (data.id === 1 || data.id === 2 || data.id === 3 || data.id === 4)
      {
        this.$message.error('系统角色不能删除')
      }
      else
      {
        const id = {}
        id['id'] = data.id
        this.deleteRole(id)
      }
    },

    // 删除角色
    deleteRole(id)
    {
      const that = this

      this.$confirm('确认要删除该角色吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          deleteRole(id).then((res) =>
          {
            if (res && res.code === 0)
            {
              that.$store.dispatch('system/getTreeRole')
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
      this.moveRole(param)
    }, 600),
    /**
     * 移动配置项
     */
    moveRole(data)
    {
      const that = this
      moveRole(data).then(res =>
      {
        if (res && res.code === 0)
        {
          that.$store.dispatch('system/getTreeRole', res.data)
          that.$message(
            {
              message: res.msg,
              type: 'success'
            })
        }
      })
    },

    // 权限管理
    handleRolePermission(node, data)
    {
      this.dialogContentVisible = true

      const idArray = data.permission

      this.$nextTick(() =>
      {
        idArray.forEach(element =>
        {
          this.$refs.tree.setChecked(element, true, false)
        })
      })

      this.rolePermissionForm.role_id = data.id

      this.rolePermissionForm.before_permission = idArray
    },

    // 修改角色权限
    resetRolePermission()
    {
      this.rolePermissionForm.after_permission = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())

      const that = this
      resetRolePermission(this.rolePermissionForm).then(res =>
      {
        if (res && res.code === 0)
        {
          that.$store.dispatch('system/getTreeRole')
          that.dialogContentVisible = false
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
<style lang="scss" scoped>
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
.reset-button
{
   width: 100%;
   text-align: center;
}

</style>
