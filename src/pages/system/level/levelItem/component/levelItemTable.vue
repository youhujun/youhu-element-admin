<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-21 10:50:05
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-28 00:20:33
-->
<template>
  <div>
    <el-table
      ref="levelItemTable"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="levelItemList"
      border
      stripe
      highlight-current-row
      empty-text
      fit
      height="70vh"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column label="序号" type="index" width="55" align="center" fixed />
      <el-table-column align="center" prop="item_name" label="级别类型名称" width="200" />
      <el-table-column align="center" prop="item_code" label="级别类型编码" width="200" />
      <el-table-column align="center" prop="sort" label="排序" />
      <el-table-column align="center" prop="created_at" label="添加时间" min-width="150" />
      <el-table-column align="center" prop="description" label="描述" min-width="200" />

      <el-table-column label="操作" align="center" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button size="mini" type="danger" el-button @click="handleDelete(scope.$index, scope.row)">删除
            <!-- 删除(禁用)结束 -->
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

import { deleteLevelItem, multipleDeleteLevelItem } from '@/api/system/level/levelItem'
export default
{
  // 组件名称
  name: 'LevelItemTable',
  // 组件
  components:
    {

    },
  props:
    {
      loading: {
        type: Boolean,
        default: true
      },
      levelItemList: {
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
      beforeLevelItemForm: {
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

        for (let index = 0; index < this.levelItemList.length; index++)
        {
          all.push(index)
        }

        this.diffIndex = all.filter(val =>
        {
          return !this.selectIndex.includes(val)
        })

        // 实现反选的效果
        this.$refs.levelItemTable.clearSelection()
        this.diffIndex.forEach(index =>
        {
          this.$refs.levelItemTable.toggleRowSelection(this.levelItemList[index])
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
        this.$confirm('确认要批量删除级别类型吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        })
          .then(() =>
          {
            multipleDeleteLevelItem(selectId).then((res) =>
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
    // 修改级别类型
    handleEdit(index, row)
    {
      this.$emit('update:dialogVisible', true)
      this.$emit('update:dialogTitle', '修改级别类型')
      this.$emit('update:dialogType', 2)
      this.$emit('update:beforeLevelItemForm', row)
    },

    handleDelete(index, row)
    {
      const id = {}
      id['id'] = row.id
      this.deleteLevelItem(id, index)
    },

    // 删除
    deleteLevelItem(id, index)
    {
      const that = this
      this.$confirm('确认要删除该级别类型吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          deleteLevelItem(id).then((res) =>
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
        this.selectIndex.push(this.levelItemList.indexOf(item))
      })
    },
    // 获取选中下标
    getSelectId()
    {
      this.selectIndex.forEach(item =>
      {
        this.selectId.push(this.levelItemList[item].id)
      })
    }
  }

}
</script>
<style lang='scss' scoped>
</style>
