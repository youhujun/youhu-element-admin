<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-03-10 13:37:41
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-21 17:36:01
-->
<template>
  <div>
    <el-row type="flex">
      <el-col :span="10">
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
      </el-col>
      <el-col :span="7">
        <el-tag class="tag-top" type="info">排序</el-tag>
        <el-select v-model="where.sortType" placeholder="请选择排序方式" style="margin-right:0.5rem;">
          <el-option
            v-for="item in sortOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="7">
        <el-tag class="tag-top" type="info">登录状态</el-tag>
        <el-select v-model="where.status" placeholder="登录|退出" clearable>
          <el-option
            v-for="item in optionsStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row type="flex">
      <el-col :span="20">
        <selectUser :user-id.sync="where.user_id" />
      </el-col>
      <el-col :span="2" :offset="8">
        <el-button type="primary" @click="handleToSearch()">搜索</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { throttle } from '@/utils'
import selectUser from '@/pages/component/options/user/selectUser'
export default
{
  // 组件名称
  name: 'Search',
  // 组件
  components:
  {
    selectUser
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
        // 时间
        timeRange: [],
        // 登录状态
        status: '',
        user_id: null,
        // 排序方式
        sortType: 2
      },
      // 选择时间
      pickerOptions:
      {
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

      // 选择登录状态
      optionsStatus: [{
        value: 10,
        label: '登录'
      }, {
        value: 20,
        label: '退出'
      }],
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
