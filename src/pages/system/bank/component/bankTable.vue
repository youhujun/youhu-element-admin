<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-21 10:50:05
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-02 23:02:01
-->
<template>
  <div>
    <el-table
      ref="bankTable"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="bankList"
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
      />
      <el-table-column
        align="center"
        prop="bank_name"
        label="银行名称"
      />
      <el-table-column
        align="center"
        prop="bank_code"
        label="银行编码"
      />
      <el-table-column
        align="center"
        prop="created_at"
        label="添加时间"
      />
      <el-table-column
        prop="is_default"
        label="是否常用"
        :filters="[{ text: '否', value:0 },{ text: '是', value:1 }]"
        :filter-method="filterBankStatus"
        filter-placement="bottom-end"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <el-tag v-show="scope.row.is_default==0" type="info">否</el-tag>
          <el-tag v-show="scope.row.is_default==1" type="success">是</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
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
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

import { deleteBank, multipleDeleteBank } from '@/api/system/bank/bank'
export default
{
  // 组件名称
  name: 'BankTable',
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
      bankList: {
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
      beforeBankForm: {
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

        for (let index = 0; index < this.bankList.length; index++)
        {
          all.push(index)
        }

        this.diffIndex = all.filter(val =>
        {
          return !this.selectIndex.includes(val)
        })

        // 实现反选的效果
        this.$refs.bankTable.clearSelection()
        this.diffIndex.forEach(index =>
        {
          this.$refs.bankTable.toggleRowSelection(this.bankList[index])
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
        this.$confirm('确认要批量删除银行吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        })
          .then(() =>
          {
            multipleDeleteBank(selectId).then((res) =>
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
    filterBankStatus(value, row)
    {
      return row.is_default === value
    },

    // 修改管理员
    handleEdit(index, row)
    {
      this.$emit('update:dialogVisible', true)
      this.$emit('update:dialogTitle', '修改银行')
      this.$emit('update:dialogType', 2)
      this.$emit('update:beforeBankForm', row)
    },

    handleDelete(index, row)
    {
      const id = {}
      id['id'] = row.id
      this.deleteBank(id, index)
    },

    // 删除
    deleteBank(id, index)
    {
      const that = this
      this.$confirm('确认要删除该银行吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          deleteBank(id).then((res) =>
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
        this.selectIndex.push(this.bankList.indexOf(item))
      })
    },
    // 获取选中下标
    getSelectId()
    {
      this.selectIndex.forEach(item =>
      {
        this.selectId.push(this.bankList[item].id)
      })
    }
  }

}
</script>
<style lang='scss' scoped>
</style>
