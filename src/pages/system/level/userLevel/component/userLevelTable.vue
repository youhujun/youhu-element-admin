<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-21 10:50:05
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-27 22:25:10
-->
<template>
  <div>
    <el-table
      ref="userLevelTable"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="userLevelList"
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
      />
      <el-table-column
        label="详情"
        type="expand"
        align="center"
        width="100"
      >
        <template slot-scope="props">
          <tableInfo :row-data="props.row" :show.sync="show" :get-user-level="getUserLevel" />
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="level_name"
        label="用户级别名称"
        width="150"
      />
      <el-table-column
        align="center"
        prop="level_code"
        label="用户级别编码"
        width="150"
      />
      <el-table-column
        align="center"
        prop="amount"
        label="金额"
        width="150"
      />
      <el-table-column
        align="center"
        prop="sort"
        label="排序"
      />
      <el-table-column
        align="center"
        prop="created_at"
        label="添加时间"
        min-width="180"
      />
      <el-table-column
        align="center"
        prop="bak_info"
        label="备注"
        min-width="200"
      />

      <el-table-column label="操作" align="center" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleEdit(scope.$index, scope.row)"
          >编辑
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
import tableInfo from './tableInfo'

import { deleteUserLevel, multipleDeleteUserLevel } from '@/api/system/level/userLevel'

export default
{
  // 组件名称
  name: 'UserLevelTable',
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
      userLevelList: {
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
      beforeUserLevelForm: {
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
      },
      getUserLevel: {
        type: Function,
        default: null
      }
    },
  // 数据
  data()
  {
    return {
      show: 0,
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

        for (let index = 0; index < this.userLevelList.length; index++)
        {
          all.push(index)
        }

        this.diffIndex = all.filter(val =>
        {
          return !this.selectIndex.includes(val)
        })

        // 实现反选的效果
        this.$refs.userLevelTable.clearSelection()
        this.diffIndex.forEach(index =>
        {
          this.$refs.userLevelTable.toggleRowSelection(this.userLevelList[index])
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
        if (selectId['selectId'].length === 0)
        {
          return this.$message.warning('请先选择要删除的数据')
        }
        const that = this
        this.$confirm('确认要批量删除用户级别吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        })
          .then(() =>
          {
            multipleDeleteUserLevel(selectId).then((res) =>
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
    // 修改用户级别
    handleEdit(index, row)
    {
      this.$emit('update:dialogVisible', true)
      this.$emit('update:dialogTitle', '修改用户级别')
      this.$emit('update:dialogType', 2)
      this.$emit('update:beforeUserLevelForm', row)
    },

    handleDelete(index, row)
    {
      const id = {}
      id['id'] = row.id
      this.deleteUserLevel(id, index)
    },

    // 删除
    deleteUserLevel(id, index)
    {
      const that = this
      this.$confirm('确认要删除该用户级别吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          deleteUserLevel(id).then((res) =>
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
        this.selectIndex.push(this.userLevelList.indexOf(item))
      })
    },
    // 获取选中下标
    getSelectId()
    {
      this.selectIndex.forEach(item =>
      {
        this.selectId.push(this.userLevelList[item].id)
      })
    },
    handleExpandChange(row)
    {
      this.show = 0
    }
  }

}
</script>
<style lang='scss' scoped>
</style>
