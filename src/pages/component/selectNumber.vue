<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-05-18 16:54:55
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-05-19 09:57:24
-->
<template>
  <div>
    <el-select v-model="selectNumber" clearable filterable>
      <el-option
        v-for="(item,key) in maxNumber"
        :key="key"
        :label="item"
        :value="item"
      />
    </el-select>
  </div>
</template>
<script>
export default
{
  // 组件名称
  name: 'SelectNumber',
  // 组件
  components:
    {
    },
  props:
    {
      resultNumber: {
        type: Number,
        default: 0
      },
      maxNumber: {
        type: Number,
        default: 100
      }
    },
  // 数据
  data()
  {
    return {
      selectNumber: null
    }
  },
  // 计算属性
  computed:
    {
    },
  // 监听
  watch:
    {
      resultNumber: {
        handler(value)
        {
          if (value > 0)
          {
            this.selectNumber = value
          }
        },
        deep: true,
        immediate: true
      },
      selectNumber(value)
      {
        this.$emit('update:resultNumber', value)
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
  }
}
</script>
<style lang='scss' scoped>
</style>
