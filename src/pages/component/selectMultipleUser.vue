<template>
  <div>
    <el-select
      v-model="selectId"
      clearable
      filterable
      multiple
      remote
      placeholder="请选择或输入关键词"
      :remote-method="searchUser"
      :loading="userLoading"
      style="width:400px;"
    >
      <el-option
        v-for="item in userOptions"
        :key="item.id"
        :label="'昵称:'+(item.user_info.nick_name?item.user_info.nick_name:'无')+'--姓名:'+(item.user_info.real_name?item.user_info.real_name:'无')+'--手机号:'+(item.phone ?item.phone:'无')"
        :value="item.id"
      />
    </el-select>
  </div>
</template>
<script>
import { defaultUser, findUser } from '@/api/user/user'

export default
{
  // 组件名称
  name: 'SelectMultipleUser',
  // 组件
  components:
    {
    },
  props:
    {
      userId: {
        type: Array,
        default: () =>
        {
          return []
        }
      },
      beforeUser: {
        type: [Object, Array],
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
      userId(value)
      {
        if (value === null)
        {
          this.selectId = null
        }
      },
      beforeUser: {
        handler(value)
        {
          /*  console.log(value) */
          if (value.length > 0)
          {
            this.userOptions = value

            const userId = []

            value.forEach(element =>
            {
              userId.push(element.id)
            })

            this.selectId = userId
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
      const user = await defaultUser().then(res =>
      {
        return new Promise((resolve, reject) =>
        {
          if (res && res.code === 0)
          {
            resolve(res.data)
          }
          else
          {
            reject('获取用户选项失败')
          }
        })
      })

      this.userSelect = user
    },

    // 查找地址选项
    async finduserOptions(find)
    {
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
            reject('获取用户选项失败')
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
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
