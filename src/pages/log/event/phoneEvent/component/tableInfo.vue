<template>
  <div>
    <div class="header">
      <el-row type="flex">
        <el-button type="primary" icon="el-icon-document" size="mini" @click="handleClick(0)">事件详情</el-button>
      </el-row>
    </div>
    <div class="content">
      <div :class="{show:show==0,hidden:show!=0}">
        <!-- 真正的一行 -->
        <el-row class="row-one" :gutter="2">
          <el-tag type="info" style="margin-right:1rem;">账户</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.account_name }}</el-tag>
          <el-tag type="info" style="margin-right:1rem;">昵称</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.nick_name }}</el-tag>
          <el-tag type="info" style="margin-right:1rem;">事件名称</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.event_name }}</el-tag>
          <el-tag type="info" style="margin-right:1rem;">事件编码</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.event_code }}</el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
        <!-- 真正的一行 -->
        <el-row class="row-one" :gutter="10">
          <el-tag type="info" style="margin-right:1rem;">手机号</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.phone?rowData.phone:'暂无' }}</el-tag>
          <el-tag type="info" style="margin-right:1rem;">时间</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.created_at }}</el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
        <!-- 真正的一行 -->
        <el-row class="row-one" :gutter="10">
          <el-tag type="info" style="margin-right:1rem;">事件路由</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.event_route_action }}</el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
        <!-- 真正的一行 -->
        <el-row class="row-one" :gutter="10">
          <el-tag type="info" style="margin-right:1rem;">事件数据</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.remark_data }}</el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
      </div>
    </div>
  </div>
</template>
<script>
export default
{
  // 组件名称
  name: 'TabelInfo',
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
.show{
  display: block;
}
.hidden{
  display: none;
}

</style>
