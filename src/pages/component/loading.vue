<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-03-18 16:29:09
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-03-18 16:30:27
-->
<template>
  <div>
    <div v-if="showType === 1" class="loading">
      <div class="loading-show">加载中...</div>
      <i class="el-icon-loading" />
    </div>
    <div v-if="showType === 2" class="loading">
      <div class="loading-show">暂无数据</div>
    </div>
  </div>
</template>
<script>
export default
{
  // 组件名称
  name: 'Loading',
  // 组件
  components:
    {
    },
  props:
    {
      showType: {
        type: Number,
        default: 1
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
    }
}
</script>
<style lang='scss' scoped>
.loading
{
   width: 100%;
   margin:10rem auto;
   text-align: center;
   .loading-show{
      font-size: 0.9rem;
      color:#C0C4CC;
      margin-bottom: 1rem;
   }
}
</style>
