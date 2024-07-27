<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-12 14:03:44
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-04-18 15:40:48
-->
<template>
  <div>
    <el-date-picker
      v-model="showTime"
      type="datetime"
      :disabled="disable"
      :placeholder="notice"
      :picker-options="timePickerOptions"
      value-format="yyyy-MM-dd HH:mm:ss"
      default-time="00:00:00"
      @change="handleTimeChange"
    />
  </div>
</template>
<script>
export default
{
  // 组件名称
  name: 'TimeSelect',
  // 组件
  components:
  {
  },
  props:
  {
    time: {
      type: String,
      default: ''
    },
    notice: {
      type: String,
      default: '提示'
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  // 数据
  data()
  {
    return {
      showTime: this.time,
      // 发车时间选项
      timePickerOptions:
      {
        shortcuts: [{
          text: '明天',
          onClick(picker)
          {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '后天',
          onClick(picker)
          {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 2)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周后',
          onClick(picker)
          {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
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
    handleTimeChange(value)
    {
      this.$emit('update:time', value)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
