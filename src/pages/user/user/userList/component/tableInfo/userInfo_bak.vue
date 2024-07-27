<template>
  <div>
    <!-- 详情 -->
    <el-row class="row-one">
      <el-tag type="info" style="margin-right:1rem;">账号</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ rowList.account_name ? rowList.account_name: '暂无' }}</el-tag>
      <el-tag style="margin-right:1rem;" type="info">出生日期(阴历)</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ rowList.chinese_birthday_at ? rowList.user_info.chinese_birthday_at: '暂无' }}</el-tag>
      <el-tag style="margin-right:1rem;" type="info">注册时间</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ rowList.created_at }}</el-tag>
    </el-row>
    <el-row class="row-one">
      <el-tag style="margin-right:1rem;" type="info">用户状态</el-tag>
      <el-tag style="margin-right:1rem;" :type="rowList.switch === 1 ? 'primary' : 'danger'">{{ rowList.switch === 1 ? '正常':'禁用' }}</el-tag>
    </el-row>
    <hr>
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
        <SelectUserLevel :level-id.sync="rowList.level_id" />
      </el-col>
      <el-col :span="3">
        <el-button
          style="margin-right:1rem;"
          type="primary"
          size="mini"
          plain
          @click="handleChangeUserLevel(rowList)"
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
<script>
import { changeUserLevel, updateUserPhone, updateUserRealName, updateUserNickName, updateUserSex, updateUserBirthdayTime, resetUserPassword } from '@/api/user/user'
import SelectUserLevel from '../selectUserLevel.vue'
import { validPhone } from '@/utils/validate'

export default
{
  // 组件名称
  name: 'UserInfo',
  // 组件
  components:
  {
    SelectUserLevel
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
      sex: this.rowList.user_info.sex,
      nick_name: this.rowList.user_info.nick_name,
      real_name: this.rowList.user_info.real_name,
      solar_birthday_time: this.rowList.user_info.solar_birthday_at,
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
  mounted()
  {
  },
  methods: {
    // 更改用户级别
    handleChangeUserLevel(item)
    {
      const data = {}
      data['id'] = item.id
      data['level_id'] = item.level_id
      changeUserLevel(data).then(res =>
      {
        if (res && res.code === 0)
        {
          this.event.$emit('updateUserData', true)

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
          this.event.$emit('updateUserData', true)

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
          this.event.$emit('updateUserData', true)

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
          this.event.$emit('updateUserData', true)

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
          this.event.$emit('updateUserData', true)

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
          this.event.$emit('updateUserData', true)

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
          this.event.$emit('updateUserData', true)

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
