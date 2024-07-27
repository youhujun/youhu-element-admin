<template>
  <div>
    <div class="header">
      <el-row type="flex">
        <el-button type="primary" icon="el-icon-document" size="mini" @click="handleClick(0)">产品分类信息</el-button>
        <el-button type="primary" icon="el-icon-document" size="mini" @click="handleClick(1)">产品分类图片</el-button>
      </el-row>
    </div>
    <div class="content">
      <div :class="{'show':show===0,'hidden':show!==0}">
        <!-- 真正的一行 -->
        <el-row class="row-one" :gutter="10">
          <el-tag type="info" style="margin-right:1rem;">产品分类名称</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.goods_class_name }}</el-tag>
          <el-tag type="info" style="margin-right:1rem;">产品代码标识</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.goods_class_code }}</el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
        <!-- 真正的一行 -->
        <el-row class="row-one" :gutter="10">
          <el-tag type="info" style="margin-right:1rem;">产品分类排序</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.sort }}</el-tag>
          <el-tag type="info" style="margin-right:1rem;">产品分类分润</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.rate }}</el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
        <!-- 真正的一行 -->
        <el-row class="row-one" :gutter="10">
          <el-tag type="info" style="margin-right:1rem;">是否需要资质证书</el-tag>
          <el-tag v-if="rowData.is_certificate" style="margin-right:1rem;" type="success">{{ isCertificate[rowData.is_certificate] }}</el-tag>
          <el-tag v-if="!rowData.is_certificate" style="margin-right:1rem;" type="danger">{{ isCertificate[rowData.is_certificate] }}</el-tag>
          <el-tag type="info" style="margin-right:1rem;">资质证书数量</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.certificate_number }}</el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
        <el-row class="row-one" :gutter="10">
          <el-tag type="info" style="margin-right:1rem;">备注说明</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.remark_info?rowData.remark_info:"无" }}</el-tag>
        </el-row>
      </div>
      <div :class="{'show':show==1,'hidden':show!=1}">
        <!-- 真正的一行 -->
        <el-row v-if="rowData.picture" class="row-one" style="margin-top:0.5rem;" type="flex" justify="center">
          <el-col :span="24">
            <el-image style="width: 100px; height: 100px" :src="rowData.picture" fit="fill" />
          </el-col>
        </el-row>
        <el-row v-else class="row-one" style="margin-top:0.5rem;" type="flex" justify="center">
          <el-col :span="24">
            <el-tag style="margin-right:1rem;" type="primary">暂无图片</el-tag>
          </el-col>
        </el-row>
        <!-- 真正的一行结束 -->
      </div>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'

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
      isCertificate: {
        0: '否',
        1: '是'
      }
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
    console.log(this.rowData)
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
