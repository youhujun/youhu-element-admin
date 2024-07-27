<template>
  <div>
    <el-select
      v-model="selectId"
      clearable
      filterable
      remote
      placeholder="请选择或输入关键词"
      :remote-method="searchBank"
      :loading="bankLoading"
      style="width:300px;"
    >
      <el-option
        v-for="item in bankOptions"
        :key="item.id"
        :label="'银行名称:'+(item.bank_name?item.bank_name:'无')+'--银行编码:'+(item.bank_code?item.bank_code:'无')"
        :value="item.id"
      />
    </el-select>
  </div>
</template>
<script>
import { defaultBank, findBank } from '@/api/system/bank/bank'
export default
{
  // 组件名称
  name: 'SelectBank',
  // 组件
  components:
    {
    },
  props:
    {
      bankId: {
        type: [Number, String],
        default: null
      },
      beforeBank: {
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
      selectId: this.bankId,
      bankSelect: [],
      bankLoading: false
    }
  },
  // 计算属性
  computed:
  {
    bankOptions:
    {
      set(value)
      {
        this.bankSelect = value
      },
      get()
      {
        return this.bankSelect
      }
    }
  },
  // 监听
  watch:
    {
      selectId(value)
      {
        this.$emit('update:bankId', value)
      },
      bankId(value)
      {
        if (value === null)
        {
          this.selectId = null
        }
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
    this.getBankOptions()

    if (Object.getOwnPropertyNames(this.beforeBank).length > 1)
    {
      this.bankOptions = [{ id: this.beforeBank.id, bank_name: this.beforeBank.bank_name, bank_code: this.beforeBank.bank_code }]
    }
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
    async getBankOptions()
    {
      const bank = await defaultBank().then(res =>
      {
        return new Promise((resolve, reject) =>
        {
          if (res && res.code === 0)
          {
            resolve(res.data)
          }
          else
          {
            reject('获取银行选项失败')
          }
        })
      })

      this.bankSelect = bank
    },

    // 查找地址选项
    async findbankOptions(find)
    {
      const bank = await findBank(find).then(res =>
      {
        return new Promise((resolve, reject) =>
        {
          if (res && res.code === 0)
          {
            resolve(res.data)
          }
          else
          {
            reject('获取银行选项失败')
          }
        })
      })

      if (bank && bank.length > 0)
      {
        this.bankOptions = bank
        this.bankLoading = false
      }
    },
    searchBank(query)
    {
      if (query !== '')
      {
        this.bankLoading = true

        const find = {}

        find['find'] = query

        this.findbankOptions(find)
      }
      else
      {
        this.bankLoading = false
        this.getBankOptions()
      }
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
