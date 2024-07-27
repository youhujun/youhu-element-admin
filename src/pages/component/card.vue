<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-09-23 08:43:55
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-17 20:40:16
-->
<template>
  <div>
    <el-card
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      class="box-card"
    >
      <div slot="header" class="header">
        <div class="header-left">
          <el-button type="info" plain><slot name="cardTitle">页面标题</slot></el-button>
          <div class="split" />
          <div>
            <slot name="cardNotice" />
            <!-- <el-button style="float: right; " type="primary" round>添加顶级地区</el-button> -->
          </div>
        </div>
        <div>
          <slot name="cardButton">
            <!--<el-button style="float: right;" type="primary">页面按钮</el-button> -->
          </slot>
        </div>
      </div>
      <div class="custom-node">
        <slot name="cardContent" />
      </div>
    </el-card>
  </div>
</template>
<script>
export default
{
  // 组件名称
  name: 'Card',
  // 组件
  components:
    {
    },
  props:
    {
      loading:
	  {
	    type: Boolean,
	    default: false
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
.header{
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  .header-left{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items:flex-end;
    .split{
       width: 1rem;
    }
  }
}

/* 卡片 */
.box-card {
  width: 98%;
  height:auto;
  min-height:87vh;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  .custom-node{
    height: auto;
  }
}
/* 卡片结束 */
.custom-node::v-deep .el-tree-node__content
{
    height:2.5rem;
}
</style>
