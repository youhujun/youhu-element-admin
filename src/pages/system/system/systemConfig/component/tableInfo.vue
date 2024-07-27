<template>
  <div>
    <div class="header">
      <el-row type="flex">
        <el-button type="primary" icon="el-icon-document" size="mini" @click="handleClick(0)">配置项详情</el-button>
      </el-row>
    </div>
    <div class="content">
      <div :class="{show:show==0,hidden:show!=0}">
        <!-- 真正的一行 -->
        <el-row class="row-one" :gutter="10">
          <el-tag type="info" style="margin-right:1rem;">配置项类型</el-tag>
          <el-tag v-if="rowData.item_type === 20" style="margin-right:1rem;" type="primary">{{ showItemType }}</el-tag>
          <el-tag v-if="rowData.item_type === 30" style="margin-right:1rem;" type="success">{{ showItemType }}</el-tag>
          <el-tag v-if="rowData.item_type === 40" style="margin-right:1rem;" type="warning">{{ showItemType }}</el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
        <!-- 真正的一行 -->
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">配置项标签</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.item_label }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">配置项值</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.item_value?rowData.item_value:'无' }}</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">配置项说明</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.item_introduction }}</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">配置项排序</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.sort }}</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">创建时间</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.created_at }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">更新时间</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.updated_at }}</el-tag>
        </el-row>
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
      showItemType()
      {
        let show = ''

        if (this.rowData.item_type === 20)
        {
          show = '字符'
        }

        if (this.rowData.item_type === 30)
        {
          show = '数值'
        }

        if (this.rowData.item_type === 40)
        {
          show = '路径'
        }

        return show
      }
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
