<template>
  <div>
    <div class="header">
      <el-row type="flex">
        <el-button type="primary" icon="el-icon-document" size="mini" @click="handleClick(0)">场地详情</el-button>
        <el-button type="primary" icon="el-icon-document" size="mini" @click="handleClick(1)">场地介绍人</el-button>
      </el-row>
    </div>
    <div class="content">
      <div :class="{show:show==0,hidden:show!=0}">
        <!-- 真正的一行 -->
        <el-row class="row-one" :gutter="10">
          <el-tag type="info" style="margin-right:1rem;">场地名称</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.place_name }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">场地编码</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.place_code?rowData.place_code:'暂无' }}</el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
        <!-- 真正的一行 -->
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">场地代理账号</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.agent.user.account_name }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">场地代理姓名</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.agent.user.user_info.real_name?rowData.agent.user.user_info.real_name:'暂无' }}</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">昵称</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.agent.user.user_info.nick_name?rowData.agent.user.user_info.nick_name:'暂无' }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">手机号</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.agent.user.phone?rowData.agent.user.phone:'暂无' }}</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">场地审核状态</el-tag>
          <el-tag v-if="rowData.status === 10" style="margin-right:1rem;" type="primary">{{ showstatus }}</el-tag>
          <el-tag v-if="rowData.status === 20" style="margin-right:1rem;" type="success">{{ showstatus }}</el-tag>
          <el-tag v-if="rowData.status === 30" style="margin-right:1rem;" type="warning">{{ showstatus }}</el-tag>
          <el-tag v-if="rowData.status === 40" style="margin-right:1rem;" type="danger">{{ showstatus }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">系统扣除比例</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.system_ratio * 100 }}%</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">场地代理分佣比例</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.agent_ratio * 100 }}%</el-tag>
          <el-tag style="margin-right:1rem;" type="info">飞单比例</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.hidden_ratio * 100 }}%</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">场地合同时间</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.start_at }}</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.end_at }}</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">场地代理提现账户</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.bank.bank_number }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">银行</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.bank.bank.bank_name }}</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">户名</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.bank.bank_account }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">开户行地址</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.bank.bank_addresss?rowData.bank.bank_addresss:'暂无' }}</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">场地地址</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ address }}</el-tag>
        </el-row>
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">备注</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowData.bak_info }}</el-tag>
        </el-row>
      </div>
      <div :class="{show:show==1,hidden:show!=1}">
        <!-- 真正的一行 -->
        <div v-for="(item,key) in rowData.introducer" :key="key" class="row-one" :gutter="10">
          <el-row class="row-one">
            <el-tag type="info" style="margin-right:1rem;">介绍人账号{{ key + 1 }}:</el-tag>
            <el-tag style="margin-right:1rem;" type="primary">{{ item.user.account_name }}</el-tag>
            <el-tag style="margin-right:1rem;" type="info">姓名:</el-tag>
            <el-tag style="margin-right:1rem;" type="primary">{{ item.user.user_info.real_name?item.user.user_info.real_name:'暂无' }}</el-tag>
          </el-row>
          <el-row class="row-one">
            <el-tag type="info" style="margin-right:1rem;">昵称:</el-tag>
            <el-tag style="margin-right:1rem;" type="primary">{{ item.user.user_info.nick_name?item.user.user_info.nick_name:'暂无' }}</el-tag>
            <el-tag style="margin-right:1rem;" type="info">手机</el-tag>
            <el-tag style="margin-right:1rem;" type="primary">{{ item.user.phone }}</el-tag>
          </el-row>
          <el-row class="row-one">
            <el-tag type="info" style="margin-right:1rem;">比例:</el-tag>
            <el-tag style="margin-right:1rem;" type="primary">{{ item.pivot.ratio * 100 }}%</el-tag>
            <el-tag style="margin-right:1rem;" type="info">结算方式</el-tag>
            <el-tag style="margin-right:1rem;" type="primary">{{ settleType[item.settle_type] }}</el-tag>
          </el-row>
          <el-divider />
        </div>
        <!-- 真正的一行结束 -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default
{
  // 组件名称
  name: 'TabelInfo',
  // 组件
  components:
    {

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
      settleType: {
        0: '未知',
        10: '月结',
        20: '即时'
      }
    }
  },
  // 计算属性
  computed:
    {
      ...mapGetters(['regions']),
      /**
       *地址比较特别
       */
      address()
      {
        // 注意地址实际是数组 也就是说有多个地址
        let show = ''
        show = this.rowData.address.province.region_name + '-' + this.rowData.address.region.region_name + '-' + this.rowData.address.city.region_name
        return show
      },
      showstatus()
      {
        let show = ''

        if (this.rowData.status === 10)
        {
          show = '待审核'
        }

        if (this.rowData.status === 20)
        {
          show = '审核通过'
        }

        if (this.rowData.status === 30)
        {
          show = '已过期'
        }

        if (this.rowData.status === 40)
        {
          show = '审核拒绝'
        }

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
