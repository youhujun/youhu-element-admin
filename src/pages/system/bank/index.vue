<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-21 10:51:07
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-02 22:59:19
-->

<template>
  <div>
    <Card>
      <template #cardTitle>
        银行管理
      </template>
      <template #cardNotice>
        <el-tag size="mini" type="danger" effect="plain">提示:添加银行时,设置为常用,在选择时会默认出现在选项中</el-tag>
      </template>
      <template #cardButton>
        <el-row type="flex" :gutter="20">
          <el-col :span="12"> <el-button style="float: right; " type="success" round @click="handleDownloadTemplate()">下载导入模板</el-button></el-col>
          <el-col :span="12"><el-button style="float: right; " type="primary" @click="handleAddBank()">添加银行</el-button></el-col>
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
                <el-col :span="6" class="btn-action">
                  <UploadFile
                    file-name="file"
                    action-url="uploadExcel"
                    :upload-data="{type:'bank', use_type:20, file_type: 'xlsx', save_path: 'excel'}"
                    accept=".xlsx,.xls"
                    type="excel"
                    @hanldeUpdateData="toUpdateData"
                  />
                </el-col>
                <el-col :span="6" class="btn-action"><el-button type="primary" @click="handleExport()">导出</el-button></el-col>
              </el-row>
            </template>
            <template #table>
              <el-divider content-position="left">列表</el-divider>
              <BankTable
                :loading="loading"
                :bank-list.sync="bankList"
                :dialog-visible.sync="dialogVisible"
                :dialog-title.sync="dialogTitle"
                :dialog-type.sync="dialogType"
                :before-bank-form.sync="beforeBankForm"
                :reverse="reverse"
                :multiple-delete="multipleDelete"
                :multiple-disable="multipleDisable"
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
        <AddBankForm v-if="dialogVisible==true" @hanldeUpdateData="toUpdateData" @handleCloseDialog="closeDialog" />
      </template>
      <template #updateForm>
        <UpdateBankForm v-if="dialogVisible==true" :before-bank-form="beforeBankForm" @hanldeUpdateData="toUpdateData" @handleCloseDialog="closeDialog" />
      </template>
    </Dialog>
  </div>
</template>
<script>
import Card from '@/pages/component/card'
import Dialog from '@/pages/component/dialog'
import ShowTable from '@/pages/component/showTabel'
import Paginate from '@/pages/component/paginate'
import UploadFile from '@/pages/component/upload/upload'

import AddBankForm from './component/addBankForm'
import UpdateBankForm from './component/updateBankForm'
import Search from './component/search.vue'
import BankTable from './component/bankTable'

import { getBank, downloadBank } from '@/api/system/bank/bank'

export default
{
  // 组件名称
  name: 'Bank',
  // 组件
  components:
    {
      Card,
      Dialog,
      ShowTable,
      Paginate,
      UploadFile,
      AddBankForm,
      UpdateBankForm,
      Search,
      BankTable

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
      dialogTitle: '添加银行',
      // 表单类型 1添加表单 2更新表单
      dialogType: 1,
      // 搜索显示列表条件
      where: {
        find: '',
        findSelectIndex: 0,
        timeRange: [],
        switch: null,
        sortType: 2,
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
      bankList: [],
      // 修改管理员级别的容器
      beforeBankForm: {},
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
        this.getBank(this.where)
      },
      pageSize(value)
      {
        this.initExport()
        this.getBank(this.where)
      },

      bankList: {
        handler(value)
        {
          if (value.length > 0)
          {
            this.loading = false
          }
          else
          {
            this.loading = false
          }
        },
        deep: true
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
    this.getBank(this.where)
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
      handleAddBank()
      {
        this.dialogVisible = true
        this.dialogTitle = '添加银行'
        this.dialogType = 1
      },
      async handleDownloadTemplate()
      {
        const that = this
        await downloadBank().then(res =>
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
      // 获取
      async getBank(where)
      {
        // const bankData = { current_page: 1, per_page: 10, total: 0, data: [] }
        const bankData = await getBank(where).then(res =>
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

        this.currentPage = bankData.meta.current_page
        this.pageSize = bankData.meta.per_page
        this.total = bankData.meta.total
        this.bankList = bankData.data
      },
      handleReverse()
      {
        this.reverse = this.reverse + 1
      },
      handleMultipleDelete()
      {
        this.multipleDelete = this.multipleDelete + 1
      },
      handleMultipleDisable()
      {
        this.multipleDisable = this.multipleDisable + 1
      },
      // 导出数据
      handleExport()
      {
        this.where.isExport = 1
        const that = this
        this.$confirm('请选择导出本页数据或是全部导出', '提示', {
          confirmButtonText: '全部',
          cancelButtonText: '本页',
          type: 'warning',
          center: true,
          distinguishCancelAndClose: true
        }).then(() =>
        {
          that.where.exportType = 2

          that.getBank(that.where)
          that.$message(
            {
              message: '全部导出!',
              type: 'success'
            })
        }).catch((action) =>
        {
          that.where.exportType = 1
          // 本页导出
          if (action === 'cancel')
          {
            that.getBank(that.where)
            that.$message(
              {
                message: '本页导出!',
                type: 'success'
              })
          }
          // 直接关闭取消
          if (action === 'close')
          {
            that.where.isExport = 0
          }
        })
      },
      // 更新数据
      toUpdateData()
      {
        this.initExport()
        this.getBank(this.where)
      },
      // 关闭弹窗
      closeDialog(data)
      {
        this.dialogVisible = data
      },
      // 查询
      toSearch(param)
      {
        Object.assign(this.where, param)
        this.initPageWhere()
        this.initExport()
        // console.log(this.where)
        this.getBank(this.where)
      }
    }
}
</script>
<style lang='scss' scoped>
  .btn-action{
    text-align: center;
  }
</style>
