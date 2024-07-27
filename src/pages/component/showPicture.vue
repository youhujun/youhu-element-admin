<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-27 09:23:31
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-02 14:55:31
-->
<template>
  <div>
    <div
      v-loading="loading"
      class="picture-container"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <slot name="pictureLine" />
      <slot name="paginate" />
    </div>
  </div>
</template>
<script>
export default
{
  // 组件名称
  name: 'ShowPicture',
  // 组件
  components:
    {

    },
  props:
    {
      loading: {
        type: Boolean,
        default: true
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
.picture-container
{
   width: 98%;
   margin: 0 auto;
   min-height: 20rem;
   height: auto;
   text-align: initial;
}

</style>
