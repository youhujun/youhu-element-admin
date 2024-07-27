<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-24 09:54:50
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-03-31 16:24:17
-->
<template>
  <div>
    <!-- 真正的一行 -->
    <el-row class="row-one">
      <el-col :span="24">
        <el-row>
          <el-col :span="2"><el-tag type="info">账号手机</el-tag></el-col>
          <el-col :span="12"><el-tag type="primary">{{ rowData.user.phone? rowData.user.phone:'暂无' }}</el-tag></el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 真正的一行结束 -->
  </div>
</template>
<script>
export default
{
  // 组件名称
  name: 'TableInfo',
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
      }
    },
  // 数据
  data()
  {
    return {
      msg: '日志详情'
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
.row-one{
   margin-bottom: 1rem;
}
</style>
