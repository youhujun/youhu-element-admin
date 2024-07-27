
<template>
  <div>
    <Card>
      <template #cardTitle>
        系统配置
      </template>
      <template #cardNotice>
        <el-tag size="mini" type="danger" effect="plain">该配置涉及到代码运行,入不了解请勿操作</el-tag>
      </template>
      <template #cardButton>
        <el-row type="flex" :gutter="20">
          <!-- <el-col :span="12"> <el-button style="float: right; " type="success" round @click="handleDownloadTemplate()">下载导入模板</el-button></el-col> -->
          <el-col :span="24"><el-button style="float: right; " type="primary" round @click="handleAddSystemConfig()">添加</el-button></el-col>
        </el-row>
      </template>
      <template #cardContent>
        <div class="custom-node">
          <!-- 显示表格 -->
          <ShowTable>
            <template #search>
              <!-- <el-tag type="success">搜索区</el-tag> -->
              <el-divider content-position="left">搜索</el-divider>
              <Search @handleChangeSearch="toSearch" />
            </template>
            <template #batch>
              <el-divider content-position="left">批量操作</el-divider>
              <el-row type="flex" justify="space-around">
                <el-col :span="6" class="btn-action"><el-button type="primary" @click="handleReverse()">反选</el-button></el-col>
                <el-col :span="6" class="btn-action"><el-button type="danger" @click="handleMultipleDelete()">删除</el-button></el-col>
              </el-row>
            </template>
            <template #table>
              <el-divider content-position="left">列表</el-divider>
              <SystemConfigTable
                :loading="loading"
                :system-config-list.sync="systemConfigList"
                :dialog-visible.sync="dialogVisible"
                :dialog-title.sync="dialogTitle"
                :dialog-type.sync="dialogType"
                :before-system-config-form.sync="beforeSystemConfigForm"
                :reverse="reverse"
                :multiple-delete="multipleDelete"
                @hanldeUpdateData="toUpdateData"
              />
            </template>
            <template #paginate>
              <div>
                <Paginate :current-page.sync="currentPage" :page-size.sync="pageSize" :total.sync="total" />
              </div>
            </template>
          </ShowTable>
        </div>
      </template>
    </Card>
    <!-- 弹框开始 -->
    <Dialog :dialog-visible.sync="dialogVisible" :dialog-title="dialogTitle" :dialog-type="dialogType" :dialog-width="dialogWidth">
      <template #addForm>
        <AddSystemConfigForm v-if="dialogVisible==true" @hanldeUpdateData="toUpdateData" @handleCloseDialog="closeDialog" />
      </template>
      <template #updateForm>
        <UpdateSystemConfigForm v-if="dialogVisible==true" :before-system-config-form.sync="beforeSystemConfigForm" @hanldeUpdateData="toUpdateData" @handleCloseDialog="closeDialog" />
      </template>
    </Dialog>
  </div>
</template>
<script>
import Card from '@/pages/component/card'
import Dialog from '@/pages/component/dialog'
import ShowTable from '@/pages/component/showTabel'
import Paginate from '@/pages/component/paginate'

import AddSystemConfigForm from './component/addSystemConfigForm'
import UpdateSystemConfigForm from './component/updateSystemConfigForm'
import Search from './component/search.vue'

import SystemConfigTable from './component/systemConfigTable'

import { getSystemConfig, downloadSystemConfig } from '@/api/system/systemConfig/systemConfig'

export default
{
  // 组件名称
  name: 'UserLevel',
  // 组件
  components:
    {
      Card,
      Dialog,
      ShowTable,
      Paginate,
      AddSystemConfigForm,
      UpdateSystemConfigForm,
      Search,
      SystemConfigTable

    },
  props:
    {
    },
  // 数据
  data()
  {
    return {
      // 配合loading
      loading: true,
      // 弹窗控制
      dialogVisible: false,
      dialogWidth: '98%',
      dialogTitle: '添加',
      // 表单类型 1添加表单 2更新表单
      dialogType: 1,
      // 搜索显示列表条件
      where: {
        find: '',
        findSelectIndex: 0,
        timeRange: [],
        switch: null,
        sortType: 1,
        // 0 不导出 1导出
        isExport: 0,
        // 导出类型 1本页 2全部
        exportType: 1,
        // 分页
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      // 管理员容器
      systemConfigList: [],
      // 修改管理员级别的容器
      beforeSystemConfigForm: {},
      // 标记反向选择
      reverse: 0,
      multipleDelete: 0,
      multipleDisable: 0
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
  // 监听
  watch:
    {
      currentPage(value)
      {
        // console.log('update' + value)
        this.initExport()
        this.getSystemConfig(this.where)
      },
      pageSize(value)
      {
        this.initExport()
        this.getSystemConfig(this.where)
      },
      systemConfigList: {
        handler(value)
        {
          if (value.length > 0)
          {
            this.loading = false
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
    this.getSystemConfig(this.where)
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
      // 初始化搜索条件
      initPageWhere()
      {
        this.where.isExport = 0
        this.where.exportType = 1
        this.where.currentPage = 1
        this.where.pageSize = 10
        this.where.total = 0
      },

      // 初始化导出状态
      initExport()
      {
        this.where.isExport = 0
        this.where.exportType = 1
      },

      // 添加
      handleAddSystemConfig()
      {
        this.dialogVisible = true
        this.dialogTitle = '添加配置项'
        this.dialogType = 1
      },
      async handleDownloadTemplate()
      {
        const that = this
        await downloadSystemConfig().then(res =>
        {
          return new Promise((resolve, reject) =>
          {
            if (res && res.code === 0)
            {
              if (res.download)
              {
                window.location.href = res.download
              }
              that.$message(
                {
                  message: res.msg,
                  type: 'success'
                })
            }
            else
            {
              reject('下载模板失败')
            }
          })
        })
      },
      /**
	   * 获取列表数据
	   * @param  where 搜索条件
	   */
      async getSystemConfig(where)
      {
        const systemConfigData = await getSystemConfig(where).then(res =>
        {
          return new Promise((resolve, reject) =>
          {
            if (res && res.code === 0)
            {
              if (res.download)
              {
                window.location.href = res.download
              }
              resolve(res)
            }
            else
            {
              reject('获取失败')
            }
          })
        })

        this.currentPage = systemConfigData.meta.current_page
        this.pageSize = systemConfigData.meta.per_page
        this.total = systemConfigData.meta.total
        this.systemConfigList = systemConfigData.data
      },
      handleReverse()
      {
        this.reverse = this.reverse + 1
      },
      handleMultipleDelete()
      {
        this.multipleDelete = this.multipleDelete + 1
      },
      // 更新数据
      toUpdateData()
      {
        this.initExport()
        this.initPageWhere()
        this.getSystemConfig(this.where)
      },
      // 关闭弹窗
      closeDialog(data)
      {
        this.dialogVisible = data
        this.initPageWhere()
        this.initExport()
        // console.log(this.where)
        this.getSystemConfig(this.where)
      },
      // 查询
      toSearch(param)
      {
        Object.assign(this.where, param)
        this.initPageWhere()
        this.initExport()
        // console.log(this.where)
        this.getSystemConfig(this.where)
      }
    }
}
</script>
<style lang='scss' scoped>
  .btn-action{
    text-align: center;
  }
</style>
