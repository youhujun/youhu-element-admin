<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-21 10:50:05
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-04 23:52:58
-->
<template>
  <div>
    <el-table
      ref="adminTable"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="adminList"
      border
      stripe
      highlight-current-row
      empty-text
      fit
      height="70vh"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @expand-change="handleExpandChange"
    >
      <el-table-column
        type="selection"
        align="center"
        width="55"
      />
      <el-table-column
        label="序号"
        type="index"
        width="55"
        align="center"
        fixed
      />
      <el-table-column
        prop="avatar"
        label="头像"
        width="100"
        fixed
        align="center"
      >
        <template slot-scope="scope">
          <el-avatar shape="circle" :size="58" :src="`${scope.row.avatar ?scope.row.avatar : ''}`">
            <img src="~@/assets/img/header/avatar.gif">
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        label="详情"
        type="expand"
        align="center"
        fixed
      >
        <template slot-scope="props">
          <tableInfo :row-data="props.row" :show.sync="show" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="phone"
        label="手机号"
        min-width="150"
        fixed
      />
      <el-table-column
        align="center"
        prop="account_name"
        label="账号"
        width="150"
      />
      <el-table-column
        align="center"
        prop="nick_name"
        label="昵称"
        width="150"
      >
        <template slot-scope="scope">
          {{ scope.row.nick_name? scope.row.nick_name : '' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="100"
        :filters="[{ text: '男', value:10 }, { text: '女', value: 20 },{ text: '未知', value: 0 }]"
        :filter-method="filterSex"
        filter-placement="bottom-end"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-show=" scope.row.sex==10" type="primary">男</el-tag>
          <el-tag v-show=" scope.row.sex==20" type="danger">女</el-tag>
          <el-tag v-show=" scope.row.sex==0" type="info">未知</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="switch"
        label="状态"
        width="100"
        :filters="[{ text: '禁用', value:0 },{ text: '正常', value:1 }]"
        :filter-method="filterAdminStatus"
        filter-placement="bottom-end"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-show="scope.row.switch==0" type="danger">禁用</el-tag>
          <el-tag v-show="scope.row.switch==1" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="注册时间"
        min-width="200"
      />
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
            type="danger"
            plain
            @click="handleDisabled(scope.$index, scope.row)"
          >禁用
          </el-button>
          <el-button
            size="mini"
            type="danger"
            el-button
            @click="handleDelete(scope.$index, scope.row)"
          >删除
            <!-- 删除(禁用)结束 -->
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import tableInfo from '@/pages/user/admin/component/tableInfo'
import { disableAdmin, deleteAdmin, multipleDeleteAdmin, multipleDisableAdmin } from '@/api/user/admin'
export default
{
  // 组件名称
  name: 'AdminTable',
  // 组件
  components:
    {
      tableInfo
    },
  props:
    {
      loading: {
        type: Boolean,
        default: true
      },
      adminList: {
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
      beforeAdminForm: {
        type: Object,
        default: null
      },
      reverse: {
        type: Number,
        default: 0
      },
      multipleDelete: {
        type: Number,
        default: 0
      },
      multipleDisable: {
        type: Number,
        default: 0
      }
    },
  // 数据
  data()
  {
    return {
      show: 0,
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
      reverse(value)
      {
        this.diffIndex = []

        const all = []

        for (let index = 0; index < this.adminList.length; index++)
        {
          all.push(index)
        }

        this.diffIndex = all.filter(val =>
        {
          return !this.selectIndex.includes(val)
        })

        // 实现反选的效果
        this.$refs.adminTable.clearSelection()
        this.diffIndex.forEach(index =>
        {
          this.$refs.adminTable.toggleRowSelection(this.adminList[index])
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
        this.$confirm('确认要批量删除管理员吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        })
          .then(() =>
          {
            multipleDeleteAdmin(selectId).then((res) =>
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
      // 批量禁用
      multipleDisable(value)
      {
        this.selectId = []
        this.getSelectId()
        const selectId = {}
        selectId['selectId'] = this.selectId
        const that = this
        this.$confirm('确认要批量禁用管理员吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '禁用',
          cancelButtonText: '取消'
        })
          .then(() =>
          {
            multipleDisableAdmin(selectId).then((res) =>
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
    this.baseUrl = process.env.VUE_APP_URL
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
         * 过滤性别
         */
    filterSex(value, row)
    {
      return row.sex === value
    },
    /**
         * 过滤管理员状态
         */
    filterAdminStatus(value, row)
    {
      return row.switch === value
    },
    // 修改管理员
    handleEdit(index, row)
    {
      this.$emit('update:dialogVisible', true)
      this.$emit('update:dialogTitle', '修改管理员')
      this.$emit('update:dialogType', 2)
      this.$emit('update:beforeAdminForm', row)
    },

    handleDisabled(index, row)
    {
      if (row.switch === 0)
      {
        return this.$message.warning('该角色已禁用')
      }
      if (row.id === 1 || row.id === 2 || row.id === 3)
      {
        this.$message.error('系统管理员不能禁用')
      }
      else
      {
        const id = {}
        id['id'] = row.id
        this.disableAdmin(id, index)
      }
    },
    handleDelete(index, row)
    {
      if (row.id === 1 || row.id === 2 || row.id === 3)
      {
        this.$message.error('系统管理员不能删除')
      }
      else
      {
        const id = {}
        id['id'] = row.id
        this.deleteAdmin(id, index)
      }
    },

    // 禁用角色
    disableAdmin(id, index)
    {
      const that = this
      this.$confirm('确认要禁用该管理员吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '禁用',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          disableAdmin(id).then((res) =>
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
    deleteAdmin(id, index)
    {
      const that = this
      this.$confirm('确认要删除该管理员吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          deleteAdmin(id).then((res) =>
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
    // 多选
    handleSelectionChange(val)
    {
      this.multipleSelection = val

      this.selectIndex = []
      this.multipleSelection.forEach(item =>
      {
        this.selectIndex.push(this.adminList.indexOf(item))
      })
    },
    // 获取选中下标
    getSelectId()
    {
      this.selectIndex.forEach(item =>
      {
        this.selectId.push(this.adminList[item].id)
      })
    },
    handleExpandChange(row, expandedRows)
    {
      this.show = 0
    }
  }

}
</script>
<style lang='scss' scoped>
</style>
