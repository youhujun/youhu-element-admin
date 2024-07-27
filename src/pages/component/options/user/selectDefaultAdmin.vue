<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-29 17:25:33
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-21 17:08:00
-->
<template>
  <div>
    <el-tag class="tag-top" type="info">管理员</el-tag>
    <el-select
      v-model="selectId"
      clearable
      filterable
      remote
      placeholder="请选择或输入"
      :remote-method="searchAdminer"
      :loading="adminLoading"
      @change="handleChange"
    >
      <el-option
        v-for="item in adminOptions"
        :key="item.id"
        :label="item.account_name"
        :value="item.id"
      />
    </el-select>
  </div>
</template>
<script>
import { getDefaultAdmin, findAdmin } from '@/api/user/admin'

export default
{
  // 组件名称
  name: 'SelectAdminer',
  // 组件
  components:
    {
    },
  props:
    {
      adminId: {
        type: [Number, String],
        default: null
      }
    },
  // 数据
  data()
  {
    return {
      selectId: this.adminId,
      adminSelect: [],
      adminLoading: false
    }
  },
  // 计算属性
  computed:
  {
    adminOptions:
    {
      set(value)
      {
        this.adminSelect = value
      },
      get()
      {
        return this.adminSelect
      }
    }
  },
  // 监听
  watch:
    {
      selectId(value)
      {
        this.$emit('update:adminId', value)
      },
      adminId:
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
    this.getAdminOptions()
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
    async getAdminOptions()
    {
      const admin = await getDefaultAdmin().then(res =>
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
      this.adminSelect = admin
    },

    // 查找选项
    async findadminOptions(find)
    {
      this.adminOptions = []
      const admin = await findAdmin(find).then(res =>
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
      if (admin && admin.length > 0)
      {
        admin.forEach(item =>
        {
          if (item.user !== undefined)
          {
            this.adminOptions.push(item)
          }
        })
        this.adminLoading = false
      }
    },
    searchAdminer(query)
    {
      if (query !== '')
      {
        this.adminLoading = true

        const find = {}

        find['find'] = query

        this.findadminOptions(find)
      }
      else
      {
        this.adminLoading = false
        this.getAdminerOptions()
      }
    },
    handleChange(value)
    {
      if (value === '')
      {
        this.getAdminerOptions()
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
