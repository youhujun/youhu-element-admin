<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-29 17:25:33
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-27 22:24:09
-->
<template>
  <div>
    <el-select
      v-model="selectId"
      filterable
      remote
      placeholder="请选择或输入关键词"
      :remote-method="searchUserLevel"
      :loading="userLevelLoading"
      style="width:300px;"
    >
      <el-option
        v-for="item in userLevelOptions"
        :key="item.id"
        :label="`${item.item_name} - ${item.item_code}`"
        :value="item.id"
      />
    </el-select>
  </div>
</template>
<script>
import { getDefaultLevelItem, findLevelItem } from '@/api/system/level/levelItem'

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
      levelItemId: {
        type: [Number, String],
        default: null
      }
    },
  // 数据
  data()
  {
    return {
      selectId: this.levelItemId,
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
        this.$emit('update:levelItemId', value)
      },
      levelItemId(value)
      {
        this.selectId = value
      }
    },
  // 挂载 --常用
  mounted()
  {
    this.getUserLevelOptions()
  },
  // 方法
  methods:
  {
    // 获取默认选项
    async getUserLevelOptions()
    {
      const userLevel = await getDefaultLevelItem().then(res =>
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
      this.userLevelSelect = userLevel
    },

    // 查找地址选项
    async finduserLevelOptions(find)
    {
      const userLevel = await findLevelItem(find).then(res =>
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
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
