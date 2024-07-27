<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-24 09:54:50
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-21 21:56:44
-->
<template>
  <div>
    <div class="header">
      <el-row type="flex">
        <el-button type="primary" icon="el-icon-document" size="mini" @click="handleClick(0)">管理员详情</el-button>
        <el-button type="primary" icon="el-icon-camera" size="mini" @click="handleClick(1)">管理员头像</el-button>
      </el-row>
    </div>
    <div class="content">
      <div :class="{'show':show==0,'hidden':show!=0}">
        <!-- 真正的一行 -->
        <el-row class="row-one" :gutter="10">
          <el-tag type="info" style="margin-right:1rem;">账号</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.account_name }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">手机号</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.phone?rowData.phone:'暂无' }}</el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
        <!-- 真正的一行 -->
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">姓名</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.real_name ? rowData.real_name:'暂无' }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">昵称</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.nick_name ? rowData.nick_name:'暂无' }}</el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
        <!-- 真正的一行 -->
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">性别</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ sex }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">状态</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.switch === 1?'正常':'禁用' }}</el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
        <!-- 真正的一行 -->
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">身份证号</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.id_number? rowData.id_number:'暂无' }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">注册时间</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.created_at }}</el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
        <!-- 真正的一行 -->
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">出生日期(阳历)</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.solar_birthday_at? rowData.solar_birthday_at:'无' }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">出生日期(阴历)</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.chinese_birthday_at? rowData.chinese_birthday_at:'无' }}</el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
        <!-- 真正的一行 -->
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">角色</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ role }}</el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
      </div>
      <div :class="{'show':show==1,'hidden':show!=1}">
        <Avatar :avatar="rowData.avatar" :upload-data="{ id:0, use_type:30, file_type: '', save_path: 'avatar', user_id: rowData.user_id }" />
      </div>
    </div>
  </div>
</template>
<script>
import Avatar from '@/pages/component/upload/admin/avatar'
import { mapGetters } from 'vuex'
export default
{
  // 组件名称
  name: 'TabelInfo',
  // 组件
  components:
    {
      Avatar
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
      ...mapGetters(['regions']),
      sex()
      {
        let show = ''
        if (this.rowData.sex === 1)
        {
          show = '男'
        }
        else if (this.rowData.sex === 2)
        {
          show = '女'
        }
        else
        {
          show = '未知'
        }

        return show
      },

      role()
      {
        let show = ''

        this.rowData.role.forEach(element =>
        {
          show += element.role_name + '-' + element.logic_name + '-'
        })

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
