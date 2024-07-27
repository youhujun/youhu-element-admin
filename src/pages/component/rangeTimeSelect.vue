<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-22 09:06:28
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-05-06 18:20:53
-->
<template>
  <div>
    <el-date-picker
      v-if="disbleType === 0"
      v-model="timeSelect"
      type="datetimerange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd HH:mm:ss"
      :picker-options="pickerOptions"
      @change="handleSelectTime"
    />
    <el-date-picker
      v-if="disbleType === 1"
      v-model="timeSelect"
      type="datetimerange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd HH:mm:ss"
      :picker-options="pickerOptionsFuture"
      @change="handleSelectTime"
    />
  </div>
</template>
<script>
export default
{
  // 组件名称
  name: 'RangeTimeSelect',
  // 组件
  components:
    {
    },
  props:
    {
      timeRange: {
        type: Array,
        default: () =>
        {
          return []
        }
      },
      disbleType: {
        type: Number,
        default: 0
      }
    },
  // 数据
  data()
  {
    return {
      timeSelect: [],
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
      // 选择时间
      pickerOptionsFuture:
      {
        disabledDate(time)
        {
          return time.getTime() < Date.now()
        },
        shortcuts: [{
          text: '未来一周',
          onClick(picker)
          {
            const end = new Date()
            const start = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '未来一个月',
          onClick(picker)
          {
            const end = new Date()
            const start = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '未来三个月',
          onClick(picker)
          {
            const end = new Date()
            const start = new Date()
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
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
    this.timeSelect = this.timeRange
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
    handleSelectTime(time)
    {
      this.$emit('update:time-range', time)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
