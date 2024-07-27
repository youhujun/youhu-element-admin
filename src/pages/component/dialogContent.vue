<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-09-22 15:33:39
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-09-07 15:45:48
-->
<template>
  <div>
    <el-dialog
      :visible="dialogContentVisible"
      :width="dialogContentWidth"
      center
      :modal="modal"
      destroy-on-close
      append-to-body
      @close="handleClose"
    >
      <div slot="title" class="title"><el-button type="primary" plain>{{ dialogContentTitle }}</el-button></div>
      <div class="content">
        <slot name="content">内容</slot>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default
{
  // 组件名称
  name: 'DialogContent',
  // 组件
  components:
    {

    },
  props: {
    modal: {
      type: Boolean,
      defalut: true
    },
    // 是否开启弹框
    dialogContentVisible: {
      type: Boolean,
      default: false
    },
    // 弹框标题
    dialogContentTitle: {
      type: String,
      default: '其他内容'
    },
    dialogContentWidth: {
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
      this.$emit('update:dialogContentVisible', false)
    }
  }
}
</script>
<style lang='scss' scoped>
/**对话框 */
.content{
   text-align: center;
    width: 98%;
    height: auto;
    min-height:5rem;
   /*  background:rgba(7, 147, 240, 0.137); */
    margin:0 auto;
  }

/**对话框 */
</style>
