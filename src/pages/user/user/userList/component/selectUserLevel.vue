<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-29 17:25:33
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-08-14 12:05:57
-->
<template>
  <div>
    <el-select
      v-model="selectId"
      clearable
      filterable
      remote
      placeholder="请选择或输入关键词"
      :remote-method="searchUserLevel"
      :loading="userLevelLoading"
      style="width:250px;"
      @change="handleUserChange"
    >
      <el-option
        v-for="item in userLevelOptions"
        :key="item.id"
        :label="`${item.level_name} - ${item.level_code}`"
        :value="item.id"
      />
    </el-select>
  </div>
</template>
<script>
import { getDefaultUserLevel, findUserLevel } from '@/api/system/level/userLevel'

export default
{
  // 组件名称
  name: 'SelectUserLevel',
  // 组件
  components:
    {
    },
  props:
    {
      levelId: {
        type: [Number, String],
        default: null
      }
    },
  // 数据
  data()
  {
    return {
      selectId: this.levelId,
      userLevelSelect: [],
      userLevelLoading: false
    }
  },
  // 计算属性
  computed:
  {
    userLevelOptions:
    {
      set(value)
      {
        this.userLevelSelect = value
      },
      get()
      {
        return this.userLevelSelect
      }
    }
  },
  // 监听
  watch:
    {
      selectId(value)
      {
        this.$emit('update:levelId', value)
      },
      levelId:
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
    this.getUserLevelOptions()
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
    async getUserLevelOptions()
    {
      const userLevel = await getDefaultUserLevel().then(res =>
      {
        return new Promise((resolve, reject) =>
        {
          if (res && res.code === 0)
          {
            resolve(res.data)
          }
          else
          {
            reject('获取用户级别失败')
          }
        })
      })
      this.userLevelSelect = userLevel
    },

    // 查找选项
    async finduserLevelOptions(find)
    {
      const userLevel = await findUserLevel(find).then(res =>
      {
        return new Promise((resolve, reject) =>
        {
          if (res && res.code === 0)
          {
            resolve(res.data)
          }
          else
          {
            reject('获取用户级别失败')
          }
        })
      })

      if (userLevel && userLevel.length > 0)
      {
        this.userLevelOptions = userLevel
        this.userLevelLoading = false
      }
    },
    searchUserLevel(query)
    {
      if (query !== '')
      {
        this.userLevelLoading = true

        const find = {}

        find['find'] = query

        this.finduserLevelOptions(find)
      }
      else
      {
        this.userLevelLoading = false
        this.getUserLevelOptions()
      }
    },
    handleUserChange(value)
    {
      if (value === '')
      {
        this.getUserLevelOptions()
      }
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
