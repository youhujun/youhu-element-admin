<template>
  <div>
    <el-row :gutter="10">
      <label>用户上级推荐人</label>
    </el-row>
    <!-- 真正的一行 -->
    <el-row v-if="rowList.source_id !== 0" class="row-one" :gutter="10">
      <el-tag style="margin-right:1rem;" type="info">姓名</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ recommend.real_name?recommend.real_name:'暂无' }}</el-tag>
      <el-tag style="margin-right:1rem;" type="info">手机号</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ recommendPhone }}</el-tag>
    </el-row>
    <!-- 真正的一行结束 -->
    <!-- 真正的一行 -->
    <el-row v-if="rowList.source_id !== 0" class="row-one">
      <el-tag style="margin-right:1rem;" type="info">性别</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ recommendSex }}</el-tag>
      <el-tag style="margin-right:1rem;" type="info">昵称</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ recommend.nick_name?recommend.nick_name:'暂无' }}</el-tag>
    </el-row>
    <!-- 真正的一行结束 -->
    <!-- 真正的一行 -->
    <el-row v-if="rowList.source_id !== 0" class="row-one">
      <el-tag style="margin-right:1rem;" type="info">出生日期(阳历)</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ recommend.solar_birthday_at? recommend.solar_birthday_at:'暂无' }}</el-tag>
      <el-tag style="margin-right:1rem;" type="info">出生日期(阴历)</el-tag>
      <el-tag style="margin-right:1rem;" type="primary">{{ recommend.chinese_birthday_at? recommend.chinese_birthday_at:'暂无' }}</el-tag>
    </el-row>
    <!-- 真正的一行结束 -->
    <el-row v-else>
      <div style="margin: 20px 0;font-weight: 700;">暂无上级推荐人</div>
    </el-row>
    <hr>
    <el-row :gutter="10" class="row-last-one">
      <label>用户下级团队</label>
      <el-button
        type="success"
        plain
        size="small"
        style="margin-left: 10px;"
        @click="getUserLowerTeam"
      >点击查看</el-button>
    </el-row>
    <el-dialog title="下级用户" width="60%" :visible.sync="teamDialogTableVisible" append-to-body @close="handleTeamTableClose">
      <div slot="title" class="title"><el-button type="primary" plain>下级用户</el-button></div>
      <div class="dialog-content">
        <el-row style="margin-bottom: 20px;">
          <label>下级级别类型：</label>
          <el-select v-model="page.lower_type" @change="handleLowerTypeChange">
            <el-option
              v-for="item in lowerTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-row>
        <el-table :data="teamList" border>
          <el-table-column property="phone" label="用户手机号" align="center" />
          <el-table-column property="real_name" label="姓名" align="center" />
          <el-table-column property="nick_name" label="昵称" align="center" />
        </el-table>
        <Paginate :current-page.sync="currentPage" :page-size.sync="pageSize" :total.sync="total" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserSource, getUserLowerTeam } from '@/api/user/user/user_team'
import Paginate from '@/pages/component/paginate'
export default
{
  // 组件名称
  name: 'Recommend',
  // 组件
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
      lowerTypeOptions: [
        { value: 0, label: '全部' },
        { value: 10, label: '一级' },
        { value: 20, label: '二级' }
      ],
      teamDialogTableVisible: false,
      recommendPhone: '',
      recommend: {},
      // 用户下级团队数组
      teamList: [],
      // 分页
      page: {
        lower_type: 0,
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  // 计算属性
  computed:
    {
      recommendSex()
      {
        let show = ''
        if (this.recommend.sex === 1)
        {
          show = '男'
        }
        else if (this.recommend.sex === 2)
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
      currentPage(value)
      {
        this.getUserLowerTeam()
      },
      pageSize(value)
      {
        this.getUserLowerTeam()
      }
    },
  mounted()
  {
    this.getUserSource()
  },
  // 方法
  methods:
  {
    // 上级用户(推荐用户)
    getUserSource()
    {
      const params = {}
      params['source_id'] = this.rowList.source_id
      getUserSource(params).then(res =>
      {
        if (res.data)
        {
          this.recommend = Object.assign({}, res.data)
          this.recommendPhone = res.data.phone || '暂无'
        }
      })
    },
    /* 切换下级等级
    下级级别类型 0是所有1级和2级 10是一级  20是二级
    */
    handleLowerTypeChange(val)
    {
      this.page.lower_type = val
      this.getUserLowerTeam()
    },
    // 获取用户下级团队
    getUserLowerTeam()
    {
      const params = {}
      params['user_id'] = this.rowList.id
      params['lower_type'] = this.page.lower_type
      params['currentPage'] = this.page.currentPage
      params['pageSize'] = this.page.pageSize
      params['sortType'] = 2
      getUserLowerTeam(params).then(res =>
      {
        if (res.data)
        {
          this.teamList = res.data
          this.currentPage = res.meta.current_page
          this.pageSize = res.meta.per_page
          this.total = res.meta.total
          this.teamDialogTableVisible = true
        }
        else
        {
          this.teamList = []
          this.total = 0
          return this.$alert('该用户当前级别下暂无团队', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    handleTeamTableClose()
    {
      this.page.currentPage = 1
      this.page.lower_type = 0
    }
  }
}
</script>
<style lang='scss' scoped>
.row-one,
.row-last-one{
   margin: 1rem 0;
   width: 100rem;
   height: auto;
}
.row-last-one {
  margin: 30px 0 40px;
}
.title {
  text-align: center;
}
</style>
