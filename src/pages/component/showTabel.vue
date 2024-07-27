<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-20 12:02:41
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-12-31 11:44:08
-->
<template>
  <div class="show-table-container">
    <template>
      <!-- 搜索条件 -->
      <slot name="search" />
    </template>
    <template>
      <!-- 统计展示 -->
      <slot name="total" />
    </template>
    <template>
      <!-- 批量设置 -->
      <slot name="batch" />
    </template>
    <template>
      <!-- 表格 -->
      <slot name="table" />
    </template>
    <template>
      <!-- 表格 -->
      <slot name="paginate" />
    </template>
  </div>
</template>
<script>
export default
{
  // 组件名称
  name: 'ShowTabel',
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
      msg: '我是首页'
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

  }
}
</script>
<style lang='scss' scoped>
.show-table-container{
  width:100%;
  min-height: 100vh;
  height:auto;
  /* max-height:300vh; */
}
</style>
