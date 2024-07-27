<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-11 16:28:38
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-27 07:32:44
-->
<template>
  <div>
    <Card>
      <template #cardTitle>
        编辑用户详情
      </template>
      <template #cardNotice>
        <el-tag size="mini" type="danger" effect="plain">编辑用户详情</el-tag>
      </template>
      <!--  <template #cardButton>
        <el-button style="float: right; " type="primary" round>添加顶级地区</el-button>
      </template> -->
      <template #cardContent>
        <div class="custom-node">
          <!-- 修改手机号 -->
          <el-row class="row-one">
            <el-col :span="2">
              <span class="level-title">用户手机号</span></el-col>
            <el-col :span="4">
              <el-input v-model="phone" class="input" />
            </el-col>
            <el-col :span="3">
              <el-button
                style="margin-top:5px;"
                type="primary"
                size="mini"
                plain
                @click="handleUpdateUserPhone"
              >修改用户手机号</el-button>
            </el-col>
          </el-row>
          <el-row class="row-one">
            <!-- 修改姓名 -->
            <el-col :span="2">
              <span class="level-title">用户姓名</span></el-col>
            <el-col :span="4">
              <el-input v-model="real_name" class="input" />
            </el-col>
            <el-col :span="3">
              <el-button
                style="margin-top:5px;"
                type="primary"
                size="mini"
                plain
                @click="handleUpdateUserRealName"
              >修改用户姓名</el-button>
            </el-col>
            <!-- 修改昵称 -->
            <el-col :span="2">
              <span class="level-title">用户昵称</span></el-col>
            <el-col :span="4">
              <el-input v-model="nick_name" class="input" />
            </el-col>
            <el-col :span="3">
              <el-button
                style="margin-top:5px;"
                type="primary"
                size="mini"
                plain
                @click="handleUpdateUserNickName"
              >修改用户昵称</el-button>
            </el-col>
          </el-row>
          <el-row class="row-one">
            <!-- 修改性别 -->
            <el-col :span="2">
              <span class="level-title">用户性别</span></el-col>
            <el-col :span="4">
              <el-select v-model="sex" placeholder="请选择" class="select">
                <el-option
                  v-for="item in sexOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-button
                style="margin-top:5px;"
                type="primary"
                size="mini"
                plain
                @click="handleUpdateUserSex"
              >修改用户性别</el-button>
            </el-col>
            <!-- 修改出生日期 -->
            <el-col :span="2">
              <span class="level-title">出生日期(阳历)</span></el-col>
            <el-col :span="4">
              <el-date-picker
                v-model="solar_birthday_time"
                type="date"
                :picker-options="pickerOptions"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width:250px;"
              />
            </el-col>
            <el-col :span="3">
              <el-button
                style="margin-top:5px;"
                type="primary"
                size="mini"
                plain
                @click="handleUpdateUserBirthdayTime"
              >修改出生日期</el-button>
            </el-col>
          </el-row>
          <el-row class="row-one" style="margin-bottom: 50px;">
            <!-- 用户级别 -->
            <el-col :span="2">
              <span class="level-title">用户级别</span>
            </el-col>
            <el-col :span="4">
              <SelectUserLevel :level-id.sync="level_id" />
            </el-col>
            <el-col :span="3">
              <el-button
                style="margin-right:1rem;"
                type="primary"
                size="mini"
                plain
                @click="handleChangeUserLevel(row)"
              >更改用户级别</el-button>
            </el-col>
            <!-- 修改密码 -->
            <el-col :span="2">
              <span class="level-title">重置密码</span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="password" placeholder="密码" type="password" class="input" />
              <div>默认abc123</div>
            </el-col>
            <el-col :span="3">
              <el-button
                style="margin-top:5px;"
                type="primary"
                size="mini"
                plain
                @click="handleResetUserPassword"
              >重置用户密码</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </Card>
  </div>
</template>
<script>
import Card from '@/pages/component/card'

import { changeUserLevel, updateUserPhone, updateUserRealName, updateUserNickName, updateUserSex, updateUserBirthdayTime, resetUserPassword } from '@/api/user/user'
import SelectUserLevel from './selectUserLevel.vue'
import { validPhone } from '@/utils/validate'

export default
{
  // 组件名称
  name: 'UserLevel',
  // 组件
  components:
  {
    Card,
    SelectUserLevel
  },
  props:
  {
  },
  // 数据
  data()
  {
    return {
      row: { },
      user_id: 0,
      phone: null,
      sex: 0,
      nick_name: null,
      real_name: null,
      solar_birthday_time: '',
      level_id: null,
      password: 'abc123',
      roleList: [],
      sexOptions: [
        { label: '男', value: 10 },
        { label: '女', value: 20 },
        { label: '未知', value: 0 }
      ],
      pickerOptions: {
        disabledDate(time)
        {
          return time.getTime() > (Date.now() - (24 * 60 * 1000))
        }
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
    // console.log(this.$route.query.row)
    this.row = this.$route.query.row
    this.user_id = this.row.id
    this.phone = this.row.phone
    this.sex = this.row.sex
    this.nick_name = this.row.nick_name
    this.real_name = this.row.real_name
    this.solar_birthday_time = this.row.solar_birthday_at
    this.level_id = this.row.level_id
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
    // 更改用户级别
    handleChangeUserLevel(item)
    {
      const data = {}
      data['id'] = item.id
      data['level_id'] = this.level_id
      changeUserLevel(data).then(res =>
      {
        if (res && res.code === 0)
        {
          // this.event.$emit('updateUserData', true)

          this.$message(
            {
              message: res.msg,
              type: 'success'
            })
        }
      })
    },
    // 更改用户手机号
    handleUpdateUserPhone()
    {
      if (!validPhone(this.phone))
      {
        return this.$message.warning('手机号不正确')
      }
      const params = {}
      params.user_id = this.user_id
      params.phone = this.phone
      updateUserPhone(params).then(res =>
      {
        if (res && res.code === 0)
        {
          // this.event.$emit('updateUserData', true)

          this.$message(
            {
              message: res.msg,
              type: 'success'
            })
        }
      })
    },
    // 修改昵称
    handleUpdateUserNickName()
    {
      const params = {}
      params.user_id = this.user_id
      params.nick_name = this.nick_name
      updateUserNickName(params).then(res =>
      {
        if (res && res.code === 0)
        {
          // this.event.$emit('updateUserData', true)

          this.$message(
            {
              message: res.msg,
              type: 'success'
            })
        }
      })
    },
    // 修改真实姓名
    handleUpdateUserRealName()
    {
      const params = {}
      params.user_id = this.user_id
      params.real_name = this.real_name
      updateUserRealName(params).then(res =>
      {
        if (res && res.code === 0)
        {
          // this.event.$emit('updateUserData', true)

          this.$message(
            {
              message: res.msg,
              type: 'success'
            })
        }
      })
    },
    // 修改性别
    handleUpdateUserSex()
    {
      const params = {}
      params.user_id = this.user_id
      params.sex = this.sex
      updateUserSex(params).then(res =>
      {
        if (res && res.code === 0)
        {
          // this.event.$emit('updateUserData', true)

          this.$message(
            {
              message: res.msg,
              type: 'success'
            })
        }
      })
    },
    // 修改生日
    handleUpdateUserBirthdayTime()
    {
      const params = {}
      params.user_id = this.user_id
      params.solar_birthday_time = this.solar_birthday_time
      updateUserBirthdayTime(params).then(res =>
      {
        if (res && res.code === 0)
        {
          // this.event.$emit('updateUserData', true)

          this.$message(
            {
              message: res.msg,
              type: 'success'
            })
        }
      })
    },
    // 重置用户密码
    handleResetUserPassword()
    {
      const params = {}
      params.user_id = this.user_id
      params.password = this.password
      resetUserPassword(params).then(res =>
      {
        if (res && res.code === 0)
        {
          // this.event.$emit('updateUserData', true)

          this.$message(
            {
              message: res.msg,
              type: 'success'
            })
        }
      })
    }
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
