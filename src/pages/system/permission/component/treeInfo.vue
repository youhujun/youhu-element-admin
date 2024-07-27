<template>
  <div>
    <div class="header">
      <el-row type="flex">
        <el-button type="primary" icon="el-icon-document" size="mini" @click="handleClick(0)">菜单详情</el-button>
      </el-row>
    </div>
    <div class="content">
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right:1rem;">菜单路径</el-tag>
        <el-tag style="margin-right:1rem;" type="primary">{{ rowData.path }}</el-tag>
        <el-tag style="margin-right:1rem;" type="info">组件名称</el-tag>
        <el-tag style="margin-right:1rem;" type="primary">{{ rowData.component?rowData.component:'暂无' }}</el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right:1rem;">逻辑名称</el-tag>
        <el-tag style="margin-right:1rem;" type="primary">{{ rowData.name?rowData.name:'无' }}</el-tag>
        <el-tag style="margin-right:1rem;" type="info">显示名称</el-tag>
        <el-tag style="margin-right:1rem;" type="primary">{{ rowData.meta_title }}</el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right:1rem;">图标标识</el-tag>
        <el-tag style="margin-right:1rem;" type="primary">{{ rowData.meta_icon.trim() ? rowData.meta_icon : '暂无' }}</el-tag>
        <el-tag style="margin-right:1rem;" type="info">跳转路径</el-tag>
        <el-tag style="margin-right:1rem;" type="primary">{{ rowData.redirect.trim()?rowData.redirect:'暂无' }}</el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right:1rem;">是否始终显示</el-tag>
        <el-tag style="margin-right:1rem;" type="primary">{{ rowData.alwaysShow==='1'?'是':'否' }}</el-tag>
        <el-tag style="margin-right:1rem;" type="info">是否隐藏</el-tag>
        <el-tag style="margin-right:1rem;" type="primary">{{ rowData.hidden === '1' ?'隐藏':'显示' }}</el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right:1rem;">活动路由</el-tag>
        <el-tag style="margin-right:1rem;" type="primary">{{ rowData.activeMenu?rowData.activeMenu:'无' }}</el-tag>
        <el-tag style="margin-right:1rem;" type="info">是否缓存</el-tag>
        <el-tag style="margin-right:1rem;" type="primary">{{ rowData.meta_noCache==='1'?'是':'否' }}</el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
      <!-- 真正的一行 -->
      <el-row class="row-one" :gutter="10">
        <el-tag type="info" style="margin-right:1rem;">是否固定在视图中</el-tag>
        <el-tag style="margin-right:1rem;" type="primary">{{ rowData.meta_affix==='1'?'是':'否' }}</el-tag>
        <el-tag style="margin-right:1rem;" type="info">是否在面包屑显示</el-tag>
        <el-tag style="margin-right:1rem;" type="primary">{{ rowData.meta_breadcrumb==='1'?'是':'否' }}</el-tag>
      </el-row>
      <!-- 真正的一行结束 -->
    </div>
  </div>
</template>
<script>

export default
{
  // 组件名称
  name: 'TreeInfo',
  // 组件
  components:
    {

    },
  props:
    {
      rowData: {
        type: Object,
        default: () =>
        {
          return {}
        }
      },
      show: {
        type: Number,
        default: 0
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
    handleClick(key)
    {
      this.$emit('update:show', key)
    }
  }
}
</script>
<style lang='scss' scoped>
.row-one{
   margin-bottom: 1rem;
   width: 100rem;
   height: auto;
}
.header{
  margin-bottom:1rem;
}

</style>
