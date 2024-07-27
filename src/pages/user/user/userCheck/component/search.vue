<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-03-23 08:58:03
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-07-18 16:38:53
-->
<template>
  <div>
    <el-row :gutter="30" type="flex">
      <el-col :span="12">
        <el-row type="flex">
          <el-tag style="height:2.26rem;line-height:2.26rem;" type="info">搜索选项</el-tag>
          <el-input v-model="where.find" clearable :placeholder="findSelect[where.findSelectIndex].label" class="input-with-select">
            <el-select slot="prepend" v-model="where.findSelectIndex" placeholder="请选择">
              <el-option label="手机号" value="0" />
              <el-option label="账号" value="1" />
              <el-option label="昵称" value="2" />
              <el-option label="姓名" value="3" />
              <el-option label="身份证号" value="4" />
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="handleSearchFind()" />
          </el-input>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row type="flex">
          <el-tag style="height:2.26rem;line-height:2.26rem;" type="info">时间</el-tag>
          <el-date-picker
            v-model="where.timeRange"
            type="datetimerange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
          />
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex">
      <!-- 排序方式 -->
      <el-col :span="6">
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
      <el-col :span="6">
        <el-row type="flex">
          <el-tag class="tag-top" type="info">审核状态</el-tag>
          <el-select v-model="where.status" placeholder="请选择">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-row>
      </el-col>
      <el-col :span="2" :offset="10">
        <el-button type="primary" @click="handleToSearch()">搜索</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { throttle } from '@/utils'
export default
{
  // 组件名称
  name: 'Search',
  // 组件
  components:
    {
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
        switch: 1,
        real_auth_staus: 0,
        status: 10,
        sortType: 2
      },
      findSelect: [
        { label: '手机号', value: 0 },
        { label: '账号', value: 1 },
        { label: '昵称', value: 2 },
        { label: '姓名', value: 3 },
        { label: '身份证号', value: 4 }
      ],
      // 选择时间
      pickerOptions:
      {
        disabledDate(time)
        {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '最近一周',
          onClick(picker)
          {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker)
          {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker)
          {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      sortOptions: [{
        value: 1,
        label: '按时间升序'
      }, {
        value: 2,
        label: '按时间降序'
      }],
      statusOptions: [
        {
          value: 10,
          label: '待审核'
        },
        {
          value: 30,
          label: '已拒绝'
        }
      ]
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
    // 认证状态改变
    handleRealAuthChange(id)
    {
      this.where.real_auth_staus = id
      this.handleToSearch()
    },
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
