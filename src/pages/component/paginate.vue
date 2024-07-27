<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-23 19:44:05
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-03-12 10:28:51
-->
<template>
  <div>
    <el-row class="paginate-box" type="flex">
      <el-col :span="12" :push="8">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { throttle } from '@/utils'
export default
{
  // 组件名称
  name: 'Paginate',
  // 组件
  components:
    {
    },
  props:
    {
      currentPage: {
        type: Number,
        default: 1
      },
      pageSizes: {
        type: Array,
        default: () =>
        {
          return [10, 20, 30, 40]
        }
      },
      pageSize: {
        type: Number,
        default: 10
      },
      total: {
        type: Number,
        default: 0
      }
    },
  // 数据
  data()
  {
    return {

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
    // 更改每页条数
    handleSizeChange: throttle(function(value)
    {
      // console.log(value)
      this.$emit('update:page-size', value)
    }, 1000),
    // 更改当前页
    handleCurrentChange: throttle(function(value)
    {
      // console.log(value)
      this.$emit('update:current-page', value)
    }, 1000)
  }
}
</script>
<style lang='scss' scoped>
.paginate-box{
  margin-top: 1rem;
}
</style>
