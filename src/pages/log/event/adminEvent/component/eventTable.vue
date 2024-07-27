<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-21 10:50:05
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-02 22:53:50
-->
<template>
  <div>
    <el-table
      ref="eventLogTable"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="eventLogList"
      border
      stripe
      highlight-current-row
      empty-text
      fit
      height="70vh"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        align="center"
        width="55"
      />
      <el-table-column
        label="序号"
        type="index"
        width="55"
        align="center"
        fixed
      />
      <el-table-column
        label="详情"
        type="expand"
        align="center"
        fixed
      >
        <template slot-scope="props">
          <tableInfo :row-data="props.row" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="account_name"
        label="账户"
        min-width="200"
        fixed
      />
      <el-table-column
        align="center"
        prop="nick_name"
        label="昵称"
        min-width="200"
        fixed
      />
      <el-table-column
        align="center"
        prop="phone"
        label="手机号"
        min-width="200"
        fixed
      />
      <el-table-column
        align="center"
        prop="event_name"
        label="事件"
        min-width="200"
      />
      <el-table-column
        align="center"
        prop="event_code"
        label="事件编码"
        min-width="200"
      />
      <el-table-column
        align="center"
        prop="created_at"
        label="操作时间"
        width="200"
      />
      <el-table-column
        align="center"
        prop="event_route_action"
        label="事件路由"
        min-width="500"
      />
      <el-table-column v-if="isShow" label="操作" align="center" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button
            v-permission="['develop','super']"
            size="mini"
            type="danger"
            el-button
            @click="handleDelete(scope.$index, scope.row)"
          >删除
          </el-button></template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import tableInfo from './tableInfo'
import { deleteAdminEventLog, multipleDeleteAdminEventLog } from '@/api/log/log'
import permission from '@/directive/permission/index.js' // 权限判断指令
import { mapGetters } from 'vuex'

export default
{
  // 组件名称
  name: 'EventTable',
  // 组件
  components:
    {
      tableInfo
    },
  directives: { permission },
  props:
    {
      loading: {
        type: Boolean,
        default: true
      },
      eventLogList: {
        type: Array,
        default: () =>
        {
          return []
        }
      },
      reverse: {
        type: Number,
        default: 0
      },
      multipleDelete: {
        type: Number,
        default: 0
      }
    },
  // 数据
  data()
  {
    return {
      // 多选容器
      multipleSelection: [],
      // 选择下标容器
      selectIndex: [],
      // 反选下标容器
      diffIndex: []
    }
  },
  // 计算属性
  computed:
    {
      ...mapGetters(['roles']),

      isShow()
      {
        let result = 0
        if (this.roles.includes('develop') || this.roles.includes('super-admin'))
        {
          result = 1
        }

        return result
      }
    },
  // 监听
  watch:
    {
      // 反选
      reverse(value)
      {
        this.diffIndex = []

        const all = []

        for (let index = 0; index < this.eventLogList.length; index++)
        {
          all.push(index)
        }

        this.diffIndex = all.filter(val =>
        {
          return !this.selectIndex.includes(val)
        })

        // 实现反选的效果
        this.$refs.eventLogTable.clearSelection()
        this.diffIndex.forEach(index =>
        {
          this.$refs.eventLogTable.toggleRowSelection(this.eventLogList[index])
        })

        this.selectIndex = this.diffIndex
      },
      // 批量删除
      multipleDelete(value)
      {
        this.selectId = []
        this.getSelectId()
        const selectId = {}
        selectId['selectId'] = this.selectId
        const that = this
        this.$confirm('确认要批量删除日志吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        })
          .then(() =>
          {
            multipleDeleteAdminEventLog(selectId).then((res) =>
            {
              if (res && res.code === 0)
              {
                that.$emit('hanldeUpdateData', true)
                that.$message(
                  {
                    message: res.msg,
                    type: 'success'
                  })
              }
            })
          })
          .catch(action =>
          {
            return
          })
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
    // 多选
    handleSelectionChange(val)
    {
      this.multipleSelection = val

      this.selectIndex = []

      this.multipleSelection.forEach(item =>
      {
        this.selectIndex.push(this.eventLogList.indexOf(item))
      })
    },
    /**
         * 过滤状态
         */
    filterStatus(value, row)
    {
      return row.status === value
    },

    handleDelete(index, row)
    {
      const id = {}
      id['id'] = row.id
      this.deleteEventLog(id)
    },
    // 删除日志
    deleteEventLog(id, index)
    {
      const that = this
      this.$confirm('确认要删除该日志吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          deleteAdminEventLog(id).then((res) =>
          {
            if (res && res.code === 0)
            {
              that.$emit('hanldeUpdateData', true)
              that.$message(
                {
                  message: res.msg,
                  type: 'success'
                })
            }
          })
        })
        .catch(action =>
        {
          return
        })
    },
    // 获取选中下标
    getSelectId()
    {
      this.selectIndex.forEach(item =>
      {
        this.selectId.push(this.eventLogList[item].id)
      })
    }
  }

}
</script>
<style lang='scss' scoped>

</style>
