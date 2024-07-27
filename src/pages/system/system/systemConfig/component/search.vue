<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-03-23 08:58:03
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-19 15:35:04
-->
<template>
  <div>
    <el-row :gutter="30" type="flex">
      <el-col :span="12">
        <el-row type="flex">
          <el-tag style="height:2.26rem;line-height:2.26rem;" type="info">搜索选项</el-tag>
          <el-input v-model="where.find" clearable :placeholder="findSelect[where.findSelectIndex].label" class="input-with-select">
            <el-select slot="prepend" v-model="where.findSelectIndex" placeholder="请选择">
              <el-option label="配置项名称" :value="0" />
              <el-option label="配置项说明" :value="1" />
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="handleSearchFind()" />
          </el-input>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row type="flex">
          <el-tag style="height:2.26rem;line-height:2.26rem;" type="info">时间</el-tag>
          <RangeTimeSelect :time-range.sync="where.timeRange" />
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex">
      <!-- 排序方式 -->
      <el-col :span="20">
        <el-row>
          <el-tag class="tag-top" type="info">排序</el-tag>
          <el-select v-model="where.sortType" placeholder="请选择排序方式" style="margin-right:0.5rem;">
            <el-option
              v-for="item in sortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-row>
      </el-col>
      <el-col :span="4">
        <el-row type="flex" justify="end">
          <el-button type="primary" @click="handleToSearch()">搜索</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import RangeTimeSelect from '@/pages/component/rangeTimeSelect'
import { throttle } from '@/utils'
export default
{
  // 组件名称
  name: 'Search',
  // 组件
  components:
  {
    RangeTimeSelect
  },
  props:
    {
    },
  // 数据
  data()
  {
    return {
      // 搜索显示列表条件
      where: {
        find: '',
        findSelectIndex: 0,
        timeRange: [],
        sortType: 1
      },
      findSelect: [
        { label: '配置项标签', value: 0 },
        { label: '配置项说明', value: 1 }
      ],
      sortOptions: [{
        value: 1,
        label: '按时间升序'
      }, {
        value: 2,
        label: '按时间降序'
      }]
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
    // 执行搜索
    handleToSearch: throttle(function()
    {
      this.$emit('handleChangeSearch', this.where)
    }, 1000),
    // 单独查找
    handleSearchFind: throttle(function()
    {
      this.$emit('handleChangeSearch', this.where)
    }, 1000)
  }
}
</script>
<style lang='scss' scoped>
.el-row {
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
.tag-top
{
  height:2.26rem;
  line-height:2.26rem;
}
</style>
