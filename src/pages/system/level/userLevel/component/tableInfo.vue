<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-24 09:54:50
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-28 00:17:38
-->
<template>
  <div>
    <div class="header">
      <el-row type="flex">
        <el-button type="primary" icon="el-icon-document" size="mini" @click="handleClick(0)">用户级别配置项</el-button>
        <el-button type="primary" icon="el-icon-camera" size="mini" @click="handleClick(1)">用户级别背景图</el-button>
      </el-row>
    </div>
    <div class="content">
      <div :class="{'show':show===0,'hidden':show!==0}">
        <el-button type="primary" size="mini" plain style="margin-bottom: 10px;" @click="handleAddForm(rowData.id)">添加配置项</el-button>
        <el-row v-for="(item,index) in rowData.level_item" :key="index" class="row-one" :gutter="10">
          <el-tag style="margin-right:1rem;" type="info">级别配置项名称</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ item.item_name ? item.item_name : '暂无' }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">级别配置项编码</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ item.item_code ? item.item_code : '暂无' }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">配置项值</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ String(item.user_level_item_value.value) ? item.user_level_item_value.value : '暂无' }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">与值之间的关系</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ item.value_name ? item.value_name : '暂无' }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">排序</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ item.user_level_item_value.sort ? item.user_level_item_value.sort : '暂无' }}</el-tag>
          <el-button type="warning" size="mini" plain style="margin-left: 20px;" @click="handleUpdateForm(item)">编辑</el-button>
          <el-button type="danger" size="mini" plain @click="handleDelete(item.user_level_item_value.id)">删除</el-button>
        </el-row>
      </div>
      <div v-show="show === 1">
        <el-row v-if="hasPicture" class="row-one" style="margin-top:0.5rem;" type="flex" justify="center">
          <el-col :span="24">
            <el-image style="width: 100px; height: 100px" :src="rowData.background.picture" fit="fill" />
          </el-col>
        </el-row>
        <el-row v-else class="row-one" style="margin-top:0.5rem;" type="flex" justify="center">
          <el-col :span="24">
            <el-tag style="margin-right:1rem;" type="primary">暂无</el-tag>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 弹框开始 -->
    <Dialog :dialog-visible.sync="dialogVisible" :dialog-title="dialogTitle" :dialog-type="dialogType" :dialog-width="dialogWidth">
      <template #addForm>
        <AddConfigurationForm v-if="dialogVisible==true" :user-level-id="id" @hanldeUpdateData="toUpdateData" @handleCloseDialog="closeDialog" />
      </template>
      <template #updateForm>
        <UpdateConfigurationForm v-if="dialogVisible==true" :before-configuration="beforeConfiguration" @hanldeUpdateData="toUpdateData" @handleCloseDialog="closeDialog" />
      </template>
    </Dialog>
  </div>
</template>

<script>

import Dialog from '@/pages/component/dialog'
import AddConfigurationForm from './tableInfo/addConfigurationForm.vue'
import UpdateConfigurationForm from './tableInfo/updateConfigurationForm.vue'
import { deleteUserLevelItemUnion } from '@/api/system/level/userLevel'

export default
{
  // 组件名称
  name: 'TabelInfo',
  // 组件
  components:
    {
      Dialog,
      AddConfigurationForm,
      UpdateConfigurationForm
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
      },
      getUserLevel: {
        type: Function,
        default: null
      }
    },
  // 数据
  data()
  {
    return {
      id: null,
      pictureUrl: '',
      dialogVisible: false,
      dialogWidth: '60%',
      dialogTitle: '添加用户级别类型',
      // 表单类型 1添加表单 2更新表单
      dialogType: 1,
      beforeConfiguration: {}
    }
  },
  // 计算属性
  computed:
    {
      hasPicture()
      {
        let result = false
        if (this.rowData.background)
        {
          result = true
        }

        return result
      }
    },
  // 监听
  watch:
    {
      rowData:
      {
        handler(val)
        {
          const rowList = val.level_item
          const obj =
            { 10: '=', 20: '>', 30: '<', 40: '>=', 50: '<=' }

          rowList.forEach(val =>
          {
            val.value_name = obj[val.user_level_item_value.value_type]
          })
        },
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
    this.pictureUrl = process.env.VUE_APP_URL
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
    },
    // 添加
    handleAddForm(id)
    {
      this.id = id
      this.dialogVisible = true
      this.dialogTitle = '添加用户级别配置项'
      this.dialogType = 1
    },
    // 修改
    handleUpdateForm(value)
    {
      this.beforeConfiguration = value
      this.dialogVisible = true
      this.dialogTitle = '修改用户级别配置项'
      this.dialogType = 2
    },
    handleDelete(id)
    {
      if (this.rowData.level_item.length <= 1)
      {
        return this.$message.warning('仅剩一个配置项不允许删除')
      }
      this.$confirm('确认要删除该用户级别吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          deleteUserLevelItemUnion({ id }).then((res) =>
          {
            if (res && res.code === 0)
            {
              this.$message(
                {
                  message: res.msg,
                  type: 'success'
                })
              this.toUpdateData()
            }
          })
        })
        .catch(action =>
        {
          return
        })
    },
    // 更新数据
    toUpdateData()
    {
      this.getUserLevel()
    },
    // 关闭弹窗
    closeDialog()
    {
      this.dialogVisible = false
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
  padding-bottom:1rem;
  border-bottom: 1px solid #866689;
}
.show{
  display: block;
}
.hidden{
  display: none;
}
</style>
