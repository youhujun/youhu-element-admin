<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-09-22 15:33:39
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-12-05 17:47:30
-->
<template>
  <div>
    <el-dialog
      :visible="dialogVisible"
      :width="dialogWidth"
      center
      @close="handleClose"
    >
      <div slot="title" class="title"><el-button type="primary" plain>{{ dialogTitle }}</el-button></div>
      <div v-if="dialogType === 1" class="content">
        <slot name="addForm">添加表单</slot>
      </div>
      <div v-if="dialogType === 2" class="content">
        <slot name="updateForm">修改表单</slot>
      </div>
      <div v-if="dialogType === 3" class="info-content">
        <slot name="showForm">查看详情</slot>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default
{
  // 组件名称
  name: 'Dialog',
  // 组件
  components:
    {

    },
  props: {
    // 是否开启弹框
    dialogVisible: {
      type: Boolean,
      default: false
    },
    // 弹框标题
    dialogTitle: {
      type: String,
      default: '添加顶级菜单'
    },
    dialogType: {
      type: Number,
      default: 1
    },
    dialogWidth: {
      type: String,
      default: '50%'
    }
  },
  // 数据
  data()
  {
    return {
      dialog: null
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
    // 关闭弹框
    handleClose()
    {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>
<style lang='scss' scoped>
.content{
    width: 96%;
    height: auto;
    min-height:5rem;
    background:rgba(7, 147, 240, 0.137);
    margin:0 auto;
  }

.info-content{
    width: 96%;
    height: auto;
    min-height:5rem;
    background:#FFFFFF;
    margin:0 auto;
  }

/**对话框 */
</style>
