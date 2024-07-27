<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-05-06 09:32:22
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-04-10 13:46:56
-->
<template>
  <div>
    <el-cascader
      ref="region"
      v-model="regionBox"
      :options="treeRegions"
      :props="{ expandTrigger: 'hover',value:'id',label:'region_name',leaf:'id' }"
      filterable
      clearable
      :show-all-levels="true"
      placeholder="请选择地区"
      style="width:350px;"
      @change="handleRegionChange"
    >
      <template slot-scope="{ node, data }">
        <span>{{ data.region_name }}</span>
        <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
      </template>
    </el-cascader>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default
{
  // 组件名称
  name: 'AddressRegion',
  // 组件
  components:
  {
  },
  props:
  {
    region: {
      type: Array,
      default: () =>
      {
        return []
      }
    }
  },
  // 数据
  data()
  {
    return {
      regionBox: this.region
    }
  },
  // 计算属性
  computed:
  {
    ...mapGetters(['treeRegions'])
  },
  // 监听
  watch:
    {
      region: {
        handler(value)
        {
          if (value.length > 1)
          {
            this.regionBox = value
          }
        },
        deep: true,
        immediate: true
      },
      treeRegions: {
        handler(value)
        {
          this.getTreeData(value)
        },
        deep: true,
        immediate: true
      }
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
    this.$store.dispatch('region/getTreeRegions')
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
    handleRegionChange(value)
    {
      // console.log(value)
      this.$emit('update:region', value)
    },
    getTreeData(data)
    {
      for (let i = 0; i < data.length; i++)
      {
        if (!data[i].children || data[i].children.length < 1)
        {
        // children若为空数组，则将children设为undefined
          data[i].children = undefined
        }
        else
        {
          this.getTreeData(data[i].children)
        }
      }
      return data
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
