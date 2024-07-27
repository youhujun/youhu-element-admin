<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-29 17:25:33
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-21 17:38:29
-->
<template>
  <div>
    <el-tag class="tag-top" type="info">用户</el-tag>
    <el-select
      v-model="selectId"
      clearable
      filterable
      remote
      placeholder="请选择或输入关键词"
      :remote-method="searchUser"
      :loading="userLoading"
      style="width:300px;"
      @change="handleChange"
    >
      <el-option
        v-for="item in userOptions"
        :key="item.id"
        :label="`姓名:${item.real_name ? item.real_name : item.nick_name ? item.nick_name : '无'} - 手机号:${item.phone ? item.phone : '无'}`"
        :value="item.id"
      />
    </el-select>
  </div>
</template>
<script>
import { getDefaultUser, findUser } from '@/api/user/user'

export default
{
  // 组件名称
  name: 'SelectUser',
  // 组件
  components:
    {
    },
  props:
    {
      userId: {
        type: [Number, String],
        default: null
      }
    },
  // 数据
  data()
  {
    return {
      selectId: this.userId,
      userSelect: [],
      userLoading: false
    }
  },
  // 计算属性
  computed:
  {
    userOptions:
    {
      set(value)
      {
        this.userSelect = value
      },
      get()
      {
        return this.userSelect
      }
    }
  },
  // 监听
  watch:
    {
      selectId(value)
      {
        this.$emit('update:userId', value)
      },
      userId:
      {
        handler(value)
        {
          if (value === null || value === 0)
          {
            this.selectId = null
          }
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
    this.getUserOptions()
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
    // 获取默认选项
    async getUserOptions()
    {
      const param = {}
      param['real_auth_status'] = null
      const user = await getDefaultUser(param).then(res =>
      {
        return new Promise((resolve, reject) =>
        {
          if (res && res.code === 0)
          {
            resolve(res.data)
          }
          else
          {
            reject('获取默认用户失败')
          }
        })
      })
      this.userSelect = user
    },

    // 查找地址选项
    async finduserOptions(find)
    {
      find.real_auth_status = null
      const user = await findUser(find).then(res =>
      {
        return new Promise((resolve, reject) =>
        {
          if (res && res.code === 0)
          {
            resolve(res.data)
          }
          else
          {
            reject('查找用户失败')
          }
        })
      })

      if (user && user.length > 0)
      {
        this.userOptions = user
        this.userLoading = false
      }
    },
    searchUser(query)
    {
      if (query !== '')
      {
        this.userLoading = true

        const find = {}

        find['find'] = query

        this.finduserOptions(find)
      }
      else
      {
        this.userLoading = false
        this.getUserOptions()
      }
    },
    handleChange(value)
    {
      if (value === '')
      {
        this.getUserOptions()
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.tag-top
{
  height:2.26rem;
  line-height:2.26rem;
}
</style>
