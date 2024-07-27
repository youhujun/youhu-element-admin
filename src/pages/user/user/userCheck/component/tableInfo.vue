<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-24 09:54:50
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-07-20 16:18:07
-->
<template>
  <div class="expanded">
    <div class="header">
      <el-row type="flex">
        <el-button type="primary" icon="el-icon-document" size="mini" @click="handleClick(0)">用户详情</el-button>
        <el-button type="primary" icon="el-icon-camera" size="mini" @click="handleClick(1)">用户身份证</el-button>
      </el-row>
    </div>
    <div class="content">
      <div :class="{'show':show==0, 'hidden':show!=0}">
        <!-- 真正的一行 -->
        <el-row class="row-one" :gutter="10">
          <el-tag type="info" style="margin-right:1rem;">账号</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowList.account_name ? rowList.account_name: '暂无' }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">手机号</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowList.phone?rowList.phone:'暂无' }}</el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
        <!-- 真正的一行 -->
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">姓名</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowList.real_name?rowList.real_name:'暂无' }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">昵称</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowList.nick_name?rowList.nick_name:'暂无' }}</el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
        <!-- 真正的一行 -->
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">性别</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ sex }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">状态</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowList.switch === 1?'正常':'禁用' }}</el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
        <!-- 真正的一行 -->
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">身份证号</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowList.id_number? rowList.id_number:'暂无' }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">注册时间</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowList.created_at }}</el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
        <!-- 真正的一行 -->
        <el-row class="row-one">
          <el-tag style="margin-right:1rem;" type="info">出生日期(阳历)</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowList.solar_birthday_at? rowList.solar_birthday_at:'无' }}</el-tag>
          <el-tag style="margin-right:1rem;" type="info">出生日期(阴历)</el-tag>
          <el-tag style="margin-right:1rem;" type="primary">{{ rowList.chinese_birthday_at? rowList.chinese_birthday_at:'暂无' }}</el-tag>
        </el-row>
        <!-- 真正的一行结束 -->
      </div>
      <div :class="{'show':show==1, 'hidden':show!=1}">
        <el-row type="flex" class="row-one">
          <el-col :span="24">
            <label class="label">实名认证审核记录</label>
            <el-button
              size="mini"
              plain
              type="primary"
              icon="el-icon-data-analysis"
              @click="handleUserRealAuthApply"
            >查看
            </el-button>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-one">
          <el-col :span="2">
            <span class="level-title">用户身份证</span>
          </el-col>
          <el-col :span="18">
            <span class="level-title">{{ id_number }}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-last-one">
          <el-col :span="2">
            <span class="level-title">身份证正面</span>
          </el-col>
          <el-col :span="4">
            <img v-if="card_front.picture" style="width: 100%;" :src="card_front.picture" fit="fill" @click="handleClickPicture(card_front.picture)">
            <span v-else class="level-title">暂未上传</span>
          </el-col>
          <el-col :span="2" :offset="2">
            <span class="level-title">身份证反面</span>
          </el-col>
          <el-col :span="4">
            <img v-if="card_back.picture" style="width: 100%;" :src="card_back.picture" fit="fill" @click="handleClickPicture(card_back.picture)">
            <span v-else class="level-title">暂未上传</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 弹框开始 -->
    <el-dialog width="60%" :visible.sync="applyDialogTableVisible" append-to-body @close="handleApplyTableClose">
      <div slot="title" class="title"><el-button type="primary" plain>用户实名认证申请</el-button></div>
      <div class="dialog-content">
        <el-table :data="applyList" border stripe>
          <el-table-column prop="statusName" label="审核状态" align="center" width="120" />
          <el-table-column prop="refuse_info" label="拒绝原因" align="center" min-width="120" />
          <el-table-column prop="updated_at" label="审核时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.updated_at === '0000-00-00 00:00:00' ? '' : scope.row.updated_at }}
            </template>
          </el-table-column>
          <el-table-column label="认证审核操作" align="center" width="160">
            <template v-if="scope.row.status === 10" slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                plain
                @click="handleRealAuth(scope.row)"
              >通过
              </el-button>
              <el-button
                size="mini"
                type="danger"
                plain
                @click="handleRefuseRealAuth(scope.row)"
              >拒绝
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <Paginate :current-page.sync="currentPage" :page-size.sync="pageSize" :total.sync="total" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserIdCard, realAuthUser, getUserRealAuthApply } from '@/api/user/user'
import Paginate from '@/pages/component/paginate'

export default
{
  // 组件名称
  name: 'TableInfo',
  // 组件
  components:
    {
      Paginate
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
      applyDialogTableVisible: false,
      user_id: '',
      card_front: {},
      card_back: {},
      rowList: [],
      id_number: null,
      // 控制用户级别组件是否显示
      levelComponentShow: 0,
      applyList: [],
      // 分页
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  // 计算属性
  computed:
    {
      sex()
      {
        let show = ''
        if (this.rowList.sex === 1)
        {
          show = '男'
        }
        else if (this.rowList.sex === 2)
        {
          show = '女'
        }
        else
        {
          show = '未知'
        }

        return show
      },
      currentPage:
      {
        set(value)
        {
          this.page.currentPage = value
        },
        get()
        {
          return this.page.currentPage
        }
      },
      pageSize:
      {
        set(value)
        {
          this.page.pageSize = value
        },
        get()
        {
          return this.page.pageSize
        }
      },
      total:
      {
        set(value)
        {
          this.page.total = value
        },
        get()
        {
          return this.page.total
        }
      }
    },
  // 监听
  watch:
    {
      rowData: {
        handler(value)
        {
          this.rowList = JSON.parse(JSON.stringify(value))
          this.user_id = value.id
          this.id_number = value.id_number || '暂无'
        },
        deep: true,
        immediate: true
      },
      currentPage()
      {
        this.handleUserRealAuthApply()
      },
      pageSize()
      {
        this.handleUserRealAuthApply()
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
    handleClick(key)
    {
      this.$emit('update:show', key)
      const params = {}
      params['user_id'] = this.user_id
      if (key === 1)
      {
        this.getUserIdCard(params)
      }
    },
    // 获取审核次数
    handleUserRealAuthApply()
    {
      const params = {}
      params['user_id'] = this.user_id
      params['currentPage'] = this.page.currentPage
      params['pageSize'] = this.page.pageSize
      params['sortType'] = 2
      const statusList = [
        { value: 0, label: '未申请' },
        { value: 10, label: '待审核' },
        { value: 20, label: '已通过' },
        { value: 30, label: '已拒绝' }
      ]
      getUserRealAuthApply(params).then(res =>
      {
        if (res.data)
        {
          this.applyList = res.data
          this.applyList.forEach(item =>
          {
            item.statusName = statusList.find(val => val.value === item.status).label
            item.refuse_info = item.refuse_info || '无'
          })
          this.currentPage = res.meta.current_page
          this.pageSize = res.meta.per_page
          this.total = res.meta.total
          this.applyDialogTableVisible = true
        }
      })
    },
    // 获取身份证
    getUserIdCard(params)
    {
      getUserIdCard(params).then(res =>
      {
        if (res.code === 0 && res.data.id_card)
        {
          this.card_front = res.data.id_card.card_front
          this.card_back = res.data.id_card.card_back
        }
      })
    },
    // 认证审核通过
    handleRealAuth(value)
    {
      const params = {}
      params['user_id'] = value.user_id
      params['id'] = value.id
      params.is_real_auth = 1
      this.realAuthUser(params)
    },
    handleRefuseRealAuth(val)
    {
      this.$prompt('请输入拒绝原因', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // inputValidator(value)
        // {
        //   if (value === null) return false
        // },
        // inputErrorMessage: '请输入拒绝原因'
      }).then(({ value }) =>
      {
        const params = {}
        params['user_id'] = val.user_id
        params['id'] = val.id
        params.is_real_auth = 0
        params.refuse_info = value
        this.realAuthUser(params)
      }).catch(() =>
      {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    // 认证审核
    realAuthUser(params)
    {
      this.$confirm('确认要审核该用户吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '审核',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          realAuthUser(params).then((res) =>
          {
            if (res && res.code === 0)
            {
              this.$message(
                {
                  message: res.msg,
                  type: 'success'
                })
              this.event.$emit('updateCheckUserData')
            }
          })
        })
        .catch(action =>
        {
          return
        })
    },
    handleApplyTableClose()
    {
      this.page.currentPage = 1
    },
    // 点击图片放大
    handleClickPicture(picture)
    {
      let src = ''
      src = picture
      window.open(src, '_target')
    }
  }
}
</script>
<style lang='scss' scoped>
.expanded {
  padding: 15px;
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
.row-one,
.row-last-one{
   margin-bottom: 20px;
   width: 100rem;
   height: auto;
}
.row-last-one {
  min-height: 200px;
}

.level-title {
  display: inline-flex;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #606266;
  font-weight: 700;
}
.label {
  margin-right: 20px;
}
.title {
  text-align: center;
}
</style>
