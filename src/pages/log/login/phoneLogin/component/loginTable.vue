<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-21 10:50:05
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-02 21:48:48
-->
<template>
  <div>
    <el-table
      ref="loginLogTable"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="loginLogList"
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
        prop="status"
        label="状态"
        width="150"
        :filters="[{ text: '登录', value:10 },{ text: '退出', value:20 }]"
        :filter-method="filterStatus"
        filter-placement="bottom-end"
        align="center"
        fixed
      >
        <template slot-scope="scope">
          <el-tag v-show="scope.row.status==10" type="success">用户登录</el-tag>
          <el-tag v-show="scope.row.status==20" type="info">用户退出</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="时间"
      />
      <el-table-column
        align="center"
        prop="account_name"
        label="账号"
      />
      <el-table-column
        label="手机号"
        prop="phone"
        align="center"
      />
      <el-table-column
        align="center"
        prop="nick_name"
        label="昵称"
      />
      <el-table-column
        align="center"
        prop="ip"
        label="IP"
        width="220"
      />
      <el-table-column
        prop="source_type"
        label="来源"
        width="150"
        align="center"
        fixed
      >
        <template slot-scope="scope">
          <el-tag v-show="scope.row.source_type==10" type="success">H5</el-tag>
          <el-tag v-show="scope.row.source_type==20" type="info">微信小程序</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            el-button
            @click="handleDelete(scope.$index, scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { deleteUserLoginLog, multipleDeleteUserLoginLog } from '@/api/log/log'
export default
{
  // 组件名称
  name: 'LoginTable',
  // 组件
  components:
    {
    },
  props:
    {
      loading: {
        type: Boolean,
        default: true
      },
      loginLogList: {
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
    },
  // 监听
  watch:
    {
      // 反选
      reverse(value)
      {
        this.diffIndex = []

        const all = []

        for (let index = 0; index < this.loginLogList.length; index++)
        {
          all.push(index)
        }

        this.diffIndex = all.filter(val =>
        {
          return !this.selectIndex.includes(val)
        })

        // 实现反选的效果
        this.$refs.loginLogTable.clearSelection()
        this.diffIndex.forEach(index =>
        {
          this.$refs.loginLogTable.toggleRowSelection(this.loginLogList[index])
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
            multipleDeleteUserLoginLog(selectId).then((res) =>
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
        this.selectIndex.push(this.loginLogList.indexOf(item))
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
      this.deleteLoginLog(id)
    },
    // 删除日志
    deleteLoginLog(id, index)
    {
      const that = this
      this.$confirm('确认要删除该日志吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          deleteUserLoginLog(id).then((res) =>
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
        this.selectId.push(this.loginLogList[item].id)
      })
    }
  }

}
</script>
<style lang='scss' scoped>

</style>
