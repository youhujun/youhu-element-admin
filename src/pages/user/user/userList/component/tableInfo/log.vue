<template>
  <div>
    <el-form
      ref="accountForm"
      :model="accountForm"
      :rules="accountRules"
      label-width="80px"
      :inline="true"
      label-position="left"
      inline-message
      style="padding:10px;"
    >
      <el-row type="flex">
        <el-col :span="4">
          <el-form-item label="账户类型" prop="account_type">
            <el-select v-model="accountForm.account_type" clearable placeholder="请选择账户类型" class="select">
              <el-option
                v-for="item in accountlist"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="操作类型" prop="action_type">
            <el-select v-model="accountForm.action_type" clearable placeholder="请选择操作类型" class="select">
              <el-option
                v-for="item in operationList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="金额" prop="amount">
            <el-input v-model="accountForm.amount" placeholder="请输入金额或数值" class="input" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button
            type="success"
            size="small"
            plain
            style="margin-top: 3px;"
            @click="handleSubmit('accountForm')"
          >修改</el-button>
        </el-col>
      </el-row>
    </el-form>
    <hr>
    <el-row class="row-one">
      <el-tag type="info" class="info">账户余额</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ rowList.balance }}</el-tag>
      <el-button
        type="success"
        size="mini"
        plain
        @click="getUserAccountLog(10)"
      >查看日志</el-button>
    </el-row>
    <el-row class="row-one">
      <el-tag type="info" class="info">系统币</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ rowList.coin }}</el-tag>
      <el-button
        type="success"
        size="mini"
        plain
        @click="getUserAccountLog(20)"
      >查看日志</el-button>
    </el-row>
    <el-row class="row-one">
      <el-tag type="info" class="info">账户积分</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ rowList.score }}</el-tag>
      <el-button
        type="success"
        size="mini"
        plain
        @click="getUserAccountLog(30)"
      >查看日志</el-button>
    </el-row>
    <el-dialog :title="logTitle" width="80%" :visible.sync="logDialogTableVisible" append-to-body @close="handleLogTableClose">
      <div slot="title" class="title"><el-button type="primary" plain>查看日志</el-button></div>
      <div class="dialog-content">
        <el-row style="margin-bottom: 20px;">
          <el-col :span="5">
            <label style="margin-right: 10px;">操作类型</label>
            <el-select v-model="where.action_type" class="select">
              <el-option label="全部" value="0" />
              <el-option
                v-for="item in operationList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="9">
            <label style="margin-right: 10px;">时间</label>
            <el-date-picker
              v-model="where.timeRange"
              type="datetimerange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-col>
          <el-col :span="6">
            <el-row>
              <label style="margin-right: 10px;">排序</label>
              <el-select v-model="where.sortType" placeholder="请选择排序方式" style="margin-right:0.5rem;">
                <el-option
                  v-for="item in sortOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="getUserAccountLog(where.account_type)">搜索</el-button>
          </el-col>
        </el-row>
        <el-table :data="logList" border>
          <el-table-column property="type_name" label="操作类型" align="center" />
          <el-table-column v-if="where.account_type === 10" property="balance" label="用户余额" align="center" />
          <el-table-column v-if="where.account_type === 20" property="coin" label="系统币" align="center" />
          <el-table-column v-if="where.account_type === 30" property="score" label="用户积分" align="center" />
          <el-table-column property="remark_info" label="详细信息" align="center" />
          <el-table-column property="created_at" label="操作时间" align="center" />
        </el-table>
        <Paginate :current-page.sync="currentPage" :page-size.sync="pageSize" :total.sync="total" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUserAccountLog, setUserAccount } from '@/api/user/user'
import { debounce, throttle } from '@/utils'
import Paginate from '@/pages/component/paginate'
export default
{
  // 组件名称
  name: 'AccountLog',
  components:
    {
      Paginate
    },
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
      logTitle: '',
      logDialogTableVisible: false,
      user_id: this.rowList.id,
      accountlist: [
        { value: 10, label: '用户余额' },
        { value: 20, label: '用户系统币' },
        { value: 30, label: '用户积分' }
      ],
      operationList: [
        { value: 10, label: '充值' },
        { value: 20, label: '扣除' }
      ],
      sortOptions: [{
        value: 1,
        label: '按时间升序'
      }, {
        value: 2,
        label: '按时间降序'
      }],
      accountForm: {
        user_id: this.rowList.id,
        account_type: '',
        action_type: '',
        amount: ''
      },
      logList: [],
      accountRules: {
        account_type: [
          { required: true, message: '请选择账户类型', trigger: 'change' }
        ],
        action_type: [
          { required: true, message: '请选择操作类型', trigger: 'change' }
        ],
        amount: [
          { required: true, pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: '只能是金额或数值', trigger: 'blur' }
        ]
      },
      where: {
        user_id: this.rowList.id,
        account_type: '',
        action_type: '0',
        timeRange: [],
        sortType: 2,
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  // 计算属性
  computed:
    {
      currentPage:
      {
        set(value)
        {
          this.where.currentPage = value
        },
        get()
        {
          return this.where.currentPage
        }
      },
      pageSize:
      {
        set(value)
        {
          this.where.pageSize = value
        },
        get()
        {
          return this.where.pageSize
        }
      },
      total:
      {
        set(value)
        {
          this.where.total = value
        },
        get()
        {
          return this.where.total
        }
      }
    },
  watch:
    {
      currentPage(value)
      {
        this.getUserAccountLog()
      },
      pageSize(value)
      {
        this.getUserAccountLog()
      }
    },
  // 挂载 --常用
  mounted()
  {
  },
  // 方法
  methods:
  {
    // 执行搜索
    handleToSearch: throttle(function()
    {
      this.getUserAccountLog(this.where.account_type)
    }, 1000),
    async getUserAccountLog(account_type)
    {
      this.where.account_type = account_type
      const params = Object.assign({}, this.where)
      const logData = await getUserAccountLog(params).then(res =>
      {
        return new Promise((resolve, reject) =>
        {
          if (res && res.code === 0)
          {
            resolve(res)
          }
          else
          {
            reject('获取用户失败')
          }
        })
      })
      this.logList = logData.data
      this.logList.forEach(item =>
      {
        item.type_name = this.operationList.find(val => val.value === item.type).label
      })
      this.currentPage = logData.meta.current_page
      this.pageSize = logData.meta.per_page
      this.total = logData.meta.total
      this.logDialogTableVisible = true
    },
    handleSubmit: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          this.setUserAccount(this.accountForm)
        }
        else
        {
          console.log('未通过验证!')
          return false
        }
      })
    }, 600),
    setUserAccount(data)
    {
      this.$confirm('确认要修改吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '修改',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          setUserAccount(data).then(res =>
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
        })
        .catch(action =>
        {
          this.$message(
            {
              message: '已取消',
              type: 'info'
            })
          return
        })
    },
    handleLogTableClose()
    {
      this.where.currentPage = 1
      this.where.action_type = '0'
      this.where.timeRange = []
    }
  }
}
</script>
<style lang='scss' scoped>
.row-one {
  margin: 20px 0;
}
.info {
  margin-right:1rem;
  width: 70px;
  text-align: center;
}

.select,
 .input {
  width: 160px;
 }
 .title {
  text-align: center;
 }
</style>
