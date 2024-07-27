<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-21 10:50:05
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-07-19 09:30:13
-->
<template>
  <div>
    <el-table
      ref="systemConfigTable"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="systemConfigList"
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
          <tableInfo :row-data="props.row" />
        </template>
      </el-table-column>
      <el-table-column
        prop="item_type"
        label="配置项类型"
        width="100"
        fixed
        :filters="[{ text: '字符', value:20 },{ text: '数值', value:30 },{ text: '路径', value:40 }]"
        :filter-method="filterSystemConfigItemType"
        filter-placement="bottom-end"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag v-show="scope.row.item_type==20" type="primary">字符</el-tag>
          <el-tag v-show="scope.row.item_type==30" type="success">数值</el-tag>
          <el-tag v-show="scope.row.item_type==40" type="wanging">路径</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="item_label"
        label="配置项名称"
        min-width="300"
      />
      <el-table-column
        align="center"
        prop="item_value"
        label="配置项值"
        min-width="300"
      />
      <el-table-column
        align="center"
        prop="item_introduction"
        label="配置项说明"
        min-width="300"
      />
      <el-table-column
        align="center"
        prop="sort"
        label="排序"
        min-width="100"
      />
      <el-table-column
        align="center"
        prop="created_at"
        label="添加时间"
        min-width="150"
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
import { deleteSystemConfig, multipleDeleteSystemConfig } from '@/api/system/systemConfig/systemConfig'
export default
{
  // 组件名称
  name: 'SystemConfigTable',
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
      systemConfigList: {
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
      beforeSystemConfigForm: {
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
      reverse(value)
      {
        this.diffIndex = []

        const all = []

        for (let index = 0; index < this.systemConfigList.length; index++)
        {
          all.push(index)
        }

        this.diffIndex = all.filter(val =>
        {
          return !this.selectIndex.includes(val)
        })

        // 实现反选的效果
        this.$refs.systemConfigTable.clearSelection()
        this.diffIndex.forEach(index =>
        {
          this.$refs.systemConfigTable.toggleRowSelection(this.systemConfigList[index])
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
        this.$confirm('确认要批量删除系统配置项吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        })
          .then(() =>
          {
            multipleDeleteSystemConfig(selectId).then((res) =>
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
         * 过滤管理员状态
         */
    filterSystemConfigItemType(value, row)
    {
      return row.item_type === value
    },

    // 修改管理员
    handleEdit(index, row)
    {
      this.$emit('update:dialogVisible', true)
      this.$emit('update:dialogTitle', '修改配置项')
      this.$emit('update:dialogType', 2)
      this.$emit('update:beforeSystemConfigForm', row)
    },

    handleDelete(index, row)
    {
      const id = {}
      id['id'] = row.id
      this.deleteSystemConfig(id, index)
    },

    // 删除
    deleteSystemConfig(id, index)
    {
      const that = this
      this.$confirm('确认要删除该地址吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          deleteSystemConfig(id).then((res) =>
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
        this.selectIndex.push(this.systemConfigList.indexOf(item))
      })
    },
    // 获取选中下标
    getSelectId()
    {
      this.selectIndex.forEach(item =>
      {
        this.selectId.push(this.systemConfigList[item].id)
      })
    }
  }

}
</script>
<style lang='scss' scoped>
</style>
