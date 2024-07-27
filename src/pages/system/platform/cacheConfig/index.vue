<!--
 * @Descripttion:
 * @version: v1
 * @Author: youhujun 2900976495@qq.com
 * @Date: 2024-05-12 20:23:47
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-12 22:00:55
 * @FilePath: \src\pages\system\platform\cacheConfig\index.vue
-->

<template>
  <div>
    <Card>
      <template #cardTitle>
        缓存设置
      </template>
      <template #cardNotice>
        <el-tag size="mini" type="danger" effect="plain">清理redis缓存专用</el-tag>
      </template>
      <template #cardContent>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>清理系统缓存</span>
          </div>
          <div class="text item">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-tag effect="plain" type="info" style="margin-right:1rem;">全部缓存</el-tag>
                <el-button type="success" size="small" @click="handleCleanConfigCache()">清理</el-button>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="row-one">
              <el-col :span="6">
                <el-tag effect="plain" type="info" style="margin-right:1rem;">地区缓存</el-tag>
                <el-button type="primary" size="small" @click="handleCleanRegionCache()">清理</el-button>
              </el-col>
              <el-col :span="6">
                <el-tag effect="plain" type="info" style="margin-right:1rem;">标签分类</el-tag>
                <el-button type="primary" size="small" @click="handleCleanLabelCache()">清理</el-button>
              </el-col>
              <el-col :span="6">
                <el-tag effect="plain" type="info" style="margin-right:1rem;">系统配置缓存</el-tag>
                <el-button type="primary" size="small" @click="handleCleanSystemConfigCache()">清理</el-button>
              </el-col>
              <el-col :span="6">
                <el-tag effect="plain" type="info" style="margin-right:1rem;">文章分类缓存</el-tag>
                <el-button type="primary" size="small" @click="handleCleanCategoryCache()">清理</el-button>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="row-one">
              <el-col :span="6">
                <el-tag effect="plain" type="info" style="margin-right:1rem;">角色缓存</el-tag>
                <el-button type="primary" size="small" @click="handleCleanRoleCache()">清理</el-button>
              </el-col>
              <el-col :span="6">
                <el-tag effect="plain" type="info" style="margin-right:1rem;">产品分类缓存</el-tag>
                <el-button type="primary" size="small" @click="handleCleanGoodsClassCache()">清理</el-button>
              </el-col>
              <el-col :span="6">
                <el-tag effect="plain" type="info" style="margin-right:1rem;">权限路由缓存</el-tag>
                <el-button type="primary" size="small" @click="handleCleanPermissionCache()">清理</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>清理用户信息缓存</span>
          </div>
          <div class="text item">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-tag effect="plain" type="info" style="margin-right:1rem;">登录用户信息缓存</el-tag>
                <el-button type="primary" size="small" @click="handleCleanLoginUserInfoCache()">清理</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </template>
    </Card>
  </div>
</template>
<script>
import Card from '@/pages/component/card'
import {
  cleanConfigCache,
  cleanRegionCache,
  cleanRoleCache,
  cleanGoodsClassCache,
  cleanCategoryCache,
  cleanLabelCache,
  cleanSystemConfigCache,
  cleanPermissionCache,
  cleanLoginUserInfoCache
} from '@/api/system/platform/cacheConfig'
export default
{
  // 组件名称
  name: 'CacheConfig',
  // 组件
  components:
  {
    Card
  },
  props:
  {
  },
  // 数据
  data()
  {
    return {
    }
  },
  // 方法
  methods:
  {
    // 清理全部配置缓存
    handleCleanConfigCache()
    {
      this.openConfirm('全部配置', () =>
      {
        cleanConfigCache().then((res) =>
        {
          if (res && res.code === 0)
          {
            this.$message(
              {
                message: res.msg,
                type: 'success'
              })
          }
        })
      })
    },
    // 清理地区缓存
    handleCleanRegionCache()
    {
      this.openConfirm('地区', () =>
      {
        cleanRegionCache().then((res) =>
        {
          if (res && res.code === 0)
          {
            this.$message(
              {
                message: res.msg,
                type: 'success'
              })
          }
        })
      })
    },
    // 清理角色缓存
    handleCleanRoleCache()
    {
      this.openConfirm('角色', () =>
      {
        cleanRoleCache().then((res) =>
        {
          if (res && res.code === 0)
          {
            this.$message(
              {
                message: res.msg,
                type: 'success'
              })
          }
        })
      })
    },
    // 清理产品分类缓存
    handleCleanGoodsClassCache()
    {
      this.openConfirm('产品分类', () =>
      {
        cleanGoodsClassCache().then((res) =>
        {
          if (res && res.code === 0)
          {
            this.$message(
              {
                message: res.msg,
                type: 'success'
              })
          }
        })
      })
    },
    // 清理文章分类缓存
    handleCleanCategoryCache()
    {
      this.openConfirm('文章分类', () =>
      {
        cleanCategoryCache().then((res) =>
        {
          if (res && res.code === 0)
          {
            this.$message(
              {
                message: res.msg,
                type: 'success'
              })
          }
        })
      })
    },
    // 清理标签分类缓存
    handleCleanLabelCache()
    {
      this.openConfirm('标签分类', () =>
      {
        cleanLabelCache().then((res) =>
        {
          if (res && res.code === 0)
          {
            this.$message(
              {
                message: res.msg,
                type: 'success'
              })
          }
        })
      })
    },
    // 清理系统配置缓存
    handleCleanSystemConfigCache()
    {
      this.openConfirm('系统配置', () =>
      {
        cleanSystemConfigCache().then((res) =>
        {
          if (res && res.code === 0)
          {
            this.$message(
              {
                message: res.msg,
                type: 'success'
              })
          }
        })
      })
    },
    // 清理权限路由缓存
    handleCleanPermissionCache()
    {
      this.openConfirm('权限路由', () =>
      {
        cleanPermissionCache().then((res) =>
        {
          if (res && res.code === 0)
          {
            this.$message(
              {
                message: res.msg,
                type: 'success'
              })
          }
        })
      })
    },
    // 清理登录用户信息缓存
    handleCleanLoginUserInfoCache()
    {
      this.openConfirm('登录用户信息', () =>
      {
        cleanLoginUserInfoCache().then((res) =>
        {
          if (res && res.code === 0)
          {
            this.$message(
              {
                message: res.msg,
                type: 'success'
              })
          }
        })
      })
    },
    openConfirm(msg, okCallback)
    {
      this.$confirm(`确认要清理${msg}缓存吗？`, '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '清理',
        cancelButtonText: '取消'
      }).then(() =>
      {
        okCallback()
      }).catch(() =>
      {
        return
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.row-one{
   margin-top: 2rem;
}
.box-card {
  margin-bottom: 20px;
}
</style>
