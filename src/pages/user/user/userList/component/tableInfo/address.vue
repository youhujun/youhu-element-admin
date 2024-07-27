<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-24 09:54:50
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-08-14 16:24:57
-->
<template>
  <div>
    <el-row class="row-one">
      <el-button
        type="success"
        size="mini"
        @click="handleAddAddress"
      >+ 添加地址</el-button>
    </el-row>
    <el-row v-if="isShowAdd" class="row-one">
      <el-form
        ref="addressForm"
        :model="addressForm"
        label-width="135px"
        :inline="true"
        label-position="left"
        status-icon
        inline-message
      >
        <el-row type="flex">
          <el-col :span="8">
            <el-form-item label="地址类型" prop="address_type">
              <el-select v-model="addressForm.address_type" placeholder="请选择排序方式" style="margin-right:0.5rem;">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否默认" prop="is_default">
              <el-switch
                v-model="addressForm.is_default"
                active-color="#13ce66"
                active-text="是"
                inactive-text="否"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="8">
            <el-form-item label="地区" prop="regionArray">
              <AddressRegion :region.sync="addressForm.regionArray" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="详细地址" prop="address_info">
              <el-input v-model="addressForm.address_info" class="input" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-button
              style="margin:5px 0;"
              type="primary"
              size="mini"
              @click="handleSubmit('addressForm')"
            >添加</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <hr>
    <!-- 真正的一行 -->
    <el-row v-for="item in list" :key="item.id" class="row-one">
      <el-tag type="info" style="margin-right: 1rem">地址类型</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">
        {{ item.address_type_name }}
      </el-tag>
      <el-tag style="margin-right: 1rem" type="info">地区</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">{{
        item.regionName ? item.regionName: '暂无'
      }}</el-tag>
      <el-tag style="margin-right: 1rem" type="info">详细地址</el-tag>
      <el-tag style="margin-right: 1rem" type="primary">{{
        item.address_info ? item.address_info : '暂无'
      }}</el-tag>
      <el-tag style="margin-right: 1rem" type="info">是否默认</el-tag>
      <el-tag style="margin-right: 1rem" :type="item.is_default ? 'warning' : 'primary'">{{
        item.is_default ? '是' : '否'
      }}</el-tag>
      <el-button
        type="danger"
        size="mini"
        plain
        @click="handleDeleteAddress(item.id)"
      >删除</el-button>
      <el-button
        v-if="!item.is_default"
        type="success"
        size="mini"
        plain
        @click="handleSetAddress(item.id)"
      >设为默认</el-button>
    </el-row>
    <el-row v-if="list.length > 0">
      <el-col :span="6">
        <Paginate :current-page.sync="currentPage" :page-size.sync="pageSize" :total.sync="total" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { addUserAddress, getUserAddress, deleteUserAddress, setDefaultUserAddress } from '@/api/user/user'
import { debounce } from '@/utils'
import AddressRegion from '@/pages/component/addressRegion'
import Paginate from '@/pages/component/paginate'

export default
{
  // 组件名称
  name: 'Address',
  components: {
    AddressRegion,
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
      isShowAdd: false,
      user_id: this.rowList.id,
      addressForm: {
        id: 0,
        user_id: this.rowList.id,
        is_default: 0,
        address_type: 10,
        regionArray: [],
        address_info: ''
      },
      list: [],
      typeOptions: [
        { value: 0, label: '暂无' },
        { value: 10, label: '家庭' },
        { value: 20, label: '公司' },
        { value: 30, label: '学校' },
        { value: 40, label: '其他' }
      ],
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
  watch:
    {
      currentPage(value)
      {
        this.getUserAddress()
      },
      pageSize(value)
      {
        this.getUserAddress()
      }
    },
  // 挂载 --常用
  mounted()
  {
    this.getUserAddress()
  },
  // 方法
  methods:
  {
    // 显示添加表单
    handleAddAddress()
    {
      this.isShowAdd = !this.isShowAdd
    },
    // 获取用户地址
    getUserAddress()
    {
      const params = {}
      params['user_id'] = this.rowList.id
      params['currentPage'] = this.page.currentPage
      params['pageSize'] = this.page.pageSize
      params['sortType'] = 2
      getUserAddress(params).then(res =>
      {
        this.list = res.data
        this.currentPage = res.meta.current_page
        this.pageSize = res.meta.per_page
        this.total = res.meta.total
        this.list.forEach(item =>
        {
          item.address_type_name = this.typeOptions.find(val => val.value === item.address_type).label
          if (item.province)
          {
            item.regionName = `
          ${item.province.region_name}/${item.city.region_name}/${item.region.region_name}
          `
          }
        })
      })
    },
    handleSubmit: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          this.addAddress(this.addressForm)
        }
        else
        {
          console.log('未通过验证!')
          return false
        }
      })
    }, 600),
    // 添加地址
    addAddress(params)
    {
      addUserAddress(params).then(res =>
      {
        if (res && res.code === 0)
        {
          this.$message(
            {
              message: '添加用户地址成功',
              type: 'success'
            })
          this.getUserAddress()
        }
      })
    },
    // 删除
    handleDeleteAddress(user_address_id)
    {
      this.$confirm('确认要删除该用户地址吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          deleteUserAddress({ user_address_id }).then(res =>
          {
            if (res && res.code === 0)
            {
              this.$message({
                type: 'success',
                message: '删除用户地址成功'
              })
              this.getUserAddress()
            }
          })
        })
        .catch(action =>
        {
          return
        })
    },
    // 设为默认
    handleSetAddress(user_address_id)
    {
      const params = {}
      params.user_address_id = user_address_id
      params.user_id = this.user_id
      setDefaultUserAddress(params).then(res =>
      {
        if (res && res.code === 0)
        {
          this.$message({
            type: 'success',
            message: '设置默认用户地址成功'
          })
          this.getUserAddress()
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.input {
  width: 350px;
}
.row-one{
   margin-bottom: 1rem;
   width: 100rem;
}
</style>
