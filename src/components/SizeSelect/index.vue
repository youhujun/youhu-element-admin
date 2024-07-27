<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-07-30 17:42:31
 * @LastEditors: YouHuJun
 * @LastEditTime: 2021-08-25 16:36:16
-->
<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size===item.value" :command="item.value">
        {{
          item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data()
  {
    return {
      sizeOptions: [
      /*   { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' } */
        { label: '默认', value: 'default' },
        { label: '中等', value: 'medium' },
        { label: '小型', value: 'small' },
        { label: '微型', value: 'mini' }
      ]
    }
  },
  computed: {
    size()
    {
      return this.$store.getters.size
    }
  },
  methods: {
    handleSetSize(size)
    {
      this.$ELEMENT.size = size
      this.$store.dispatch('app/setSize', size)
      this.refreshView()
      this.$message({
        /*  message: 'Switch Size Success', */
        message: '尺寸切换成功',
        type: 'success'
      })
    },
    refreshView()
    {
      // In order to make the cached page re-rendered
      this.$store.dispatch('tagsView/delAllCachedViews', this.$route)

      const { fullPath } = this.$route

      this.$nextTick(() =>
      {
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      })
    }
  }

}
</script>
