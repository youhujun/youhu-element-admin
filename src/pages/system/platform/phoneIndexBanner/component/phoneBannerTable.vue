<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-21 10:50:05
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-12 22:06:49
-->
<template>
  <div>
    <el-table
      ref="phoneBannerTable"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="phoneBannerList"
      border
      stripe
      highlight-current-row
      empty-text
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
        width="65"
        align="center"
      >
        <template slot-scope="props">
          <tableInfo :row-data="props.row" :show.sync="show" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="redirect_url"
        label="跳转url"
        width="150"
      />
      <el-table-column
        align="center"
        prop="bak_info"
        label="描述"
        min-width="200"
      />
      <el-table-column
        align="center"
        prop="created_at"
        label="添加时间"
        min-width="150"
      />
      <el-table-column
        align="center"
        prop="sort"
        label="排序"
      />
      <el-table-column label="操作" align="center" fixed="right" width="200">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="primary"
            plain
            @click="handleEdit(scope.$index, scope.row)"
          >编辑
          </el-button> -->
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

import { deletePhoneBanner } from '@/api/system/platform/phoneBanner'
import tableInfo from './tableInfo.vue'

export default
{
  // 组件名称
  name: 'PhoneBannerTable',
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
      phoneBannerList: {
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
      beforePhoneBannerForm: {
        type: Object,
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
    // 修改首页轮播
    handleEdit(index, row)
    {
      this.$emit('update:dialogVisible', true)
      this.$emit('update:dialogTitle', '修改首页轮播')
      this.$emit('update:dialogType', 2)
      this.$emit('update:beforePhoneBannerForm', row)
    },

    handleDelete(index, row)
    {
      const id = {}
      id['id'] = row.id
      id['is_delete'] = 1
      this.deletePhoneBanner(id, index)
    },

    // 删除
    deletePhoneBanner(id, index)
    {
      const that = this
      this.$confirm('确认要删除该首页轮播吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          deletePhoneBanner(id).then((res) =>
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
        this.selectIndex.push(this.phoneBannerList.indexOf(item))
      })
    }
  }

}
</script>
<style lang='scss' scoped>
::v-deep .el-table__body-wrapper {
  .el-table__expanded-cell {
    z-index: 99;
    padding: 0;
    background: #fff;
  }
}
::v-deep .el-table__fixed,
::v-deep .el-table__fixed-right {
  .el-table__expanded-cell {
    visibility: hidden;
    padding: 0;
  }
}
.expanded {
width: 100%;
background: #fff;
}
</style>
