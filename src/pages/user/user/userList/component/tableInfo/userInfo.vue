<!--
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2024-06-25 09:09:09
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-25 14:51:35
 * @FilePath: \src\pages\user\user\userList\component\tableInfo\userInfo.vue
-->
<template>
  <div>
    <!-- 详情 -->
    <el-row class="row-one">
      <el-tag type="info" style="margin-right:1rem;">账号</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ rowList.account_name ? rowList.account_name: '暂无' }}</el-tag>
      <el-tag style="margin-right:1rem;" type="info">手机号</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ rowList.phone ? rowList.phone : '暂无' }}</el-tag>
      <el-tag style="margin-right:1rem;" type="info">用户状态</el-tag>
      <el-tag style="margin-right:1rem;" :type="rowList.switch === 1 ? 'primary' : 'danger'">{{ rowList.switch === 1 ? '正常':'禁用' }}</el-tag>
    </el-row>
    <el-row class="row-one">
      <el-tag style="margin-right:1rem;" type="info">用户邀请码</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ rowList.invite_code ? rowList.invite_code :'暂无' }}</el-tag>
      <el-tag style="margin-right:1rem;" type="info">用户级别</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ rowList.user_level ? rowList.user_level : '暂无' }}</el-tag>
      <el-tag style="margin-right:1rem;" type="info">注册时间</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ rowList.created_at }}</el-tag>
    </el-row>
    <el-row class="row-one">
      <el-tag style="margin-right:1rem;" type="info">用户昵称</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ rowList.nick_name ? rowList.nick_name: '暂无' }}</el-tag>
      <el-tag style="margin-right:1rem;" type="info">用户姓名</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ rowList.real_name ? rowList.real_name: '暂无' }}</el-tag>
      <el-tag style="margin-right:1rem;" type="info">用户性别</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ showUserSex }}</el-tag>
    </el-row>
    <el-row class="row-one">
      <el-tag style="margin-right:1rem;" type="info">用户身份证</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ rowList.id_number ? rowList.id_number: '暂无' }}</el-tag>
      <el-tag style="margin-right:1rem;" type="info">出生日期(阴历)</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ rowList.solar_birthday_at ? rowList.solar_birthday_at: '暂无' }}</el-tag>
      <el-tag style="margin-right:1rem;" type="info">出生日期(阳历)</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ rowList.chinese_birthday_at ? rowList.chinese_birthday_at: '暂无' }}</el-tag>
    </el-row>
    <el-row class="row-one">
      <el-tag style="margin-right:1rem;" type="info">用户角色</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ showUserRole }}</el-tag>
    </el-row>
  </div>
</template>
<script>
export default
{
  // 组件名称
  name: 'UserInfo',
  // 组件
  components:
  {
  },
  // 组件
  props:
    {
      rowList: {
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
      user_id: this.rowList.id,
      phone: this.rowList.phone,
      sex: this.rowList.sex,
      nick_name: this.rowList.nick_name,
      real_name: this.rowList.real_name,
      solar_birthday_time: this.rowList.solar_birthday_at,
      chinese_birthday_time: this.rowList.chinese_birthday_at,
      password: 'abc123',
      roleList: this.rowList.role
    }
  },
  // 计算属性
  computed:
    {
      // 用户性别
      showUserSex()
      {
        let showUserSex = '未知'

        if (this.sex === 10)
        {
          showUserSex = '男'
        }

        if (this.sex === 20)
        {
          showUserSex = '女'
        }

        return showUserSex
      },
      // 用户角色
      showUserRole()
      {
        let showUserRole = '暂无'

        if (this.roleList.length > 1)
        {
          showUserRole = ''
          for (let index = 0; index < this.roleList.length; index++)
          {
            if (index < this.roleList.length - 1)
            {
              showUserRole += this.roleList[index].role_name + `(${this.roleList[index].logic_name})` + '-'
            }
            else
            {
              showUserRole += this.roleList[index].role_name + `(${this.roleList[index].logic_name})`
            }
          }
        }
        return showUserRole
      }
    },
  mounted()
  {
  },
  methods: {

  }
}
</script>
<style lang='scss' scoped>
.row-one{
   margin-bottom: 1rem;
   width: 100rem;
   height: 46px;
  line-height: 46px;
}
.input,
.select {
  width: 250px;
}
.level-title {
  display: inline-flex;
  height: 46px;
  line-height: 46px;
  font-size: 14px;
  color: #606266;
  font-weight: 700;
}
</style>
