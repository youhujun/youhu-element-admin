<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-03-07 15:06:15
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-03-31 16:15:46
-->
<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <!-- 真正的一行 -->
        <el-row class="row-one">
          <el-col :span="24">
            <el-row>
              <el-col :span="2"><el-tag type="info">标题</el-tag></el-col>
              <el-col :span="20"><el-tag type="primary">{{ rowData.title }}</el-tag></el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 真正的一行结束 -->
      </el-row>
      <!-- 真正的一行 -->
      <el-row class="row-one">
        <el-col :span="24">
          <el-row class="row-one">
            <el-col :span="2"><el-tag type="info">内容</el-tag></el-col>
          </el-row>
          <el-row>
            <el-col :span="24">{{ rowData.content }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 真正的一行结束 -->
    </el-card>
  </div>
</template>
<script>
export default
{
  // 组件名称
  name: 'ArticleInfo',
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
