<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-09-04 15:21:44
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-26 21:38:52
 * @LastEditTime: 2021-09-24 00:22:51
-->
<template>
  <div>
    <Card>
      <template #cardTitle>
        菜单管理
      </template>
      <template #cardNotice>
        <el-tag size="mini" type="danger" effect="plain">注意：1如果component组件不是Layout,需要先在前端路由map地图中添加映射组件，2如果子级成为父级,记得修改alwaysShow为是,否则会异常</el-tag>
      </template>
      <template #cardButton>
        <el-button v-permission="['develop']" style="float: right; " type="primary" @click="handleAddTopMenu()">添加顶级菜单</el-button>
      </template>
      <template #cardContent>
        <div class="custom-node">
          <el-tree
            :data="serverRoutes"
            :props="defaultProps"
            draggable
            :allow-drag="allowDrag"
            @node-drop="handleDrop"
          >
            <div slot-scope="{ node, data }" class="custom-tree-node">
              <div>{{ node.label }}</div>
              <div>
                <el-button v-permission="['develop']" type="primary" size="mini" plain round @click="()=>handleAppendMenu(node,data)"> 添加下级菜单 </el-button>
                <el-button v-permission="['develop']" type="success" size="mini" plain round @click="()=>handleShowMenu(node,data)"> 查 看 </el-button>
                <el-button v-permission="['develop']" type="warning" size="mini" plain round @click="()=>handleUpdateMenu(node,data)"> 修改 </el-button>
                <el-button v-permission="['develop']" type="danger" size="mini" plain round @click="()=>handleRemoveMenu(node,data)"> 删除 </el-button>
                <el-button v-if="data.switch === 1" v-permission="['develop']" type="danger" size="mini" round @click="()=>handleSwitchMenu(node,data)"> 禁用 </el-button>
                <el-button v-if="data.switch === 0" v-permission="['develop']" type="primary" size="mini" round @click="()=>handleSwitchMenu(node,data)"> 开启 </el-button>
              </div>
            </div>
          </el-tree>
        </div>
      </template>
    </Card>
    <!-- 弹框开始 -->
    <Dialog :dialog-visible.sync="dialogVisible" :dialog-width="dialogWidth" :dialog-title="dialogTitle" :dialog-type="dialogType">
      <template #addForm>
        <AddMenuForm ref="addMenuRef" :new-add-menu-from="newAddMenuFrom" @handleCloseDialog="closeDialog" />
      </template>
      <template #updateForm>
        <UpdateMenuForm ref="updateMenuRef" :before-menu-form="beforeMenuForm" @handleCloseDialog="closeDialog" />
      </template>
      <template #showForm>
        <TreeInfo :row-data="beforeMenuForm" :show.sync="treeShow" @handleCloseDialog="closeDialog" />
      </template>
    </Dialog>
  </div>
</template>
<script>
import Card from '@/pages/component/card'
import Dialog from '@/pages/component/dialog'
import AddMenuForm from '@/pages/system/permission/component/addMenuFrom'
import UpdateMenuForm from '@/pages/system/permission/component/updateMenuForm'
import TreeInfo from '@/pages/system/permission/component/treeInfo'
import { mapGetters } from 'vuex'
import { deleteMenu, switchdMenu, moveMenu } from '@/api/system/permission/permission'
import { throttle } from '@/utils'
import permission from '@/directive/permission/index.js' // 权限判断指令

export default
{
  // 组件名称
  name: 'Permission',
  // 组件
  components:
  {
    Card,
    Dialog,
    AddMenuForm,
    UpdateMenuForm,
    TreeInfo
  },
  directives: { permission },
  props:
  {

  },
  // 数据
  data()
  {
    return {
      // 默认tree显示
      defaultProps:
      {
        children: 'children',
        label: (data, node) =>
        {
          return data.meta.title
        }
      },
      // 弹窗控制
      dialogVisible: false,
      dialogWidth: '65%',
      dialogTitle: '添加顶级菜单',
      // 表单类型 1添加表单 2更新表单
      dialogType: 1,

      // 添加自己菜单用的容器
      newAddMenuFrom: {},
      // 修改菜单用的容器
      beforeMenuForm: {},

      // 树形排序容器
      sort: {
        'inner': 0,
        'before': 1,
        'after': 2
      },
      treeShow: 0

    }
  },
  // 计算属性
  computed:
  {
    ...mapGetters(['serverRoutes', 'roles'])
  },
  // 监听
  watch:
  {
    dialogVisible:
    {
      handler(val)
      {
        if (!val)
        {
          this.$refs.addMenuRef && this.$refs.addMenuRef.initMenuForm()
          this.$refs.updateMenuRef && this.$refs.updateMenuRef.initMenuForm()
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
    /* this.$store.dispatch('user/getInfo')
    this.$store.dispatch('permission/generateRoutes', this.roles) */
    this.initPermission()
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
    /**
	 * 初始化路由和权限
	 */
    initPermission()
    {
      this.$store.dispatch('user/getInfo')
      this.$store.dispatch('permission/generateRoutes', this.roles)
    },
    /**
     * 添加顶级菜单
     */
    handleAddTopMenu()
    {
      const param = {}
      param['deep'] = 1
      param['parent_id'] = 0
      // 改变值
      this.newAddMenuFrom = param
      this.dialogVisible = true
      this.dialogTitle = '添加顶级菜单'
      this.dialogType = 1
    },

    // 添加子级菜单
    handleAppendMenu(node, data)
    {
      const param = {}
      param['deep'] = data.deep + 1
      param['parent_id'] = data.id

      // 改变值
      this.newAddMenuFrom = param

      this.dialogTitle = '添加子级菜单'
      this.dialogVisible = true
      this.dialogType = 1
    },
    // 修改菜单
    handleUpdateMenu(node, data)
    {
      this.equalToForm(data)
      this.dialogTitle = '修改菜单'
      this.dialogVisible = true
      this.dialogType = 2
    },

    // 查看菜单
    handleShowMenu(node, data)
    {
      this.equalToForm(data)
      this.dialogTitle = '查看菜单'
      this.dialogVisible = true
      this.dialogType = 3
    },
    equalToForm(data)
    {
      // 这里没有bug 因为开发阶段,前端地图没有映射组件,点击这里会报错,映射组件之后就不会错.
      const param = {}
      param['sort'] = data.sort
      param['id'] = data.id
      param['deep'] = data.deep
      param['parent_id'] = data.parent_id
      param['path'] = data.path
      param['name'] = data.name.trim()
      param['meta_title'] = data.meta.title
      param['meta_icon'] = data.meta.icon.trim()
      param['component'] = typeof (data.component) === 'undefined' ? '' : data.component.name

      if (!data.redirect.trim())
      {
        param['redirect'] = ''
      }
      else
      {
        param['redirect'] = data.redirect
      }
      if (data.hidden)
      {
        param['hidden'] = '1'
      }
      else
      {
        param['hidden'] = '0'
      }

      if (data.alwaysShow)
      {
        param['alwaysShow'] = '1'
      }
      else
      {
        param['alwaysShow'] = '0'
      }

      if (!data.activeMenu)
      {
        param['activeMenu'] = ''
      }
      else
      {
        param['activeMenu'] = data.activeMenu
      }

      if (data.meta.noCache)
      {
        param['meta_noCache'] = '1'
      }
      else
      {
        param['meta_noCache'] = '0'
      }

      if (data.meta.affix)
      {
        param['meta_affix'] = '1'
      }
      else
      {
        param['meta_affix'] = '0'
      }

      if (data.meta.breadcrumb)
      {
        param['meta_breadcrumb'] = '1'
      }
      else
      {
        param['meta_breadcrumb'] = '0'
      }

      if (param.component === '')
      {
        this.$alert('该菜单还未开发前端页面！', {
          confirmButtonText: '确定'
        })
      }

      this.beforeMenuForm = param
    },
    // 删除菜单事件
    handleRemoveMenu(node, data)
    {
      const id = {}
      id['id'] = data.id
      this.deleteMenu(id)
    },

    // 删除菜单
    deleteMenu(id)
    {
      this.$confirm('确认要删除该菜单吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          deleteMenu(id).then((response) =>
          {
            if (response && response.code === 0)
            {
              this.initPermission()
              this.$message(
                {
                  message: response.msg,
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
    // 禁用菜单
    handleSwitchMenu(node, data)
    {
      const param = {}
      param['id'] = data.id
      param['switch'] = data.switch === 1 ? 0 : 1
      this.switchdMenu(param)
    },
    // 更改菜单状态
    switchdMenu(param)
    {
      this.$confirm('确认要修改该菜单状态吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '更改',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          switchdMenu(param).then((response) =>
          {
            if (response && response.code === 0)
            {
              this.initPermission()
              this.$message(
                {
                  message: response.msg,
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

      this.moveMenu(param)
    }, 600),
    /**
     * 移动菜单
     */
    moveMenu(data)
    {
      moveMenu(data).then(res =>
      {
        if (res && res.code === 0)
        {
          this.initPermission()
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
      // console.log(data)
      this.dialogVisible = data
    }

  }
}
</script>
<style lang="scss" scoped>

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
    padding-right: 1rem;
}

</style>
