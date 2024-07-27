<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-24 09:54:50
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-12 23:28:49
-->
<template>
  <div class="expanded">
    <div class="header">
      <el-row type="flex">
        <el-button type="primary" icon="el-icon-camera" size="mini" @click="handleClick(0)">轮播图片</el-button>
        <el-button type="primary" icon="el-icon-camera" size="mini" @click="handleClick(1)">修改信息</el-button>
      </el-row>
    </div>
    <div class="content">
      <div v-if="showComponent === 0">
        <el-image style="width:375px" :src="rowData.picture" fit="fill" />
      </div>
      <div v-if="showComponent === 1">
        <el-row class="row-one" style="margin-top:20px; height: 190px;">
          <!-- 修改轮播图图片 -->
          <el-col :span="2">
            <span class="level-title">轮播图图片</span></el-col>
          <el-col :span="3" style="text-align: center;">
            <UploadSinglePicture
              :picture-id.sync="album_picture_id"
              :before-picture-string="rowData.picture"
              :upload-data="{id:1, use_type:10, file_type: '', save_path: 'banner'}"
              show-content="修改轮播图图片"
            />
          </el-col>
          <el-col :span="3">
            <el-button
              style="margin-top:125px; margin-left:20px;"
              type="primary"
              size="mini"
              plain
              @click="handleUpdatePhoneBannerPicture()"
            >修改</el-button>
          </el-col>
        </el-row>
        <el-row class="row-one">
          <!-- 修改轮播图跳转 -->
          <el-col :span="2">
            <span class="level-title">轮播图跳转</span></el-col>
          <el-col :span="4">
            <el-input v-model="redirect_url" class="input" />
          </el-col>
          <el-col :span="3">
            <el-button
              style="margin-top:5px;"
              type="primary"
              size="mini"
              plain
              @click="handleUpdatePhoneBannerUrl()"
            >修改轮播图跳转</el-button>
          </el-col>
          <!-- 修改轮播图排序 -->
          <el-col :span="2">
            <span class="level-title">轮播图排序</span></el-col>
          <el-col :span="4">
            <el-input v-model="sort" class="input" />
          </el-col>
          <el-col :span="3">
            <el-button
              style="margin-top:5px;"
              type="primary"
              size="mini"
              plain
              @click="handleUpdatePhoneBannerSort()"
            >修改轮播图排序</el-button>
          </el-col>
        </el-row>
        <el-row class="row-one" style="margin-bottom: 50px;">
          <!-- 修改轮播图备注 -->
          <el-col :span="2">
            <span class="level-title">轮播图备注</span></el-col>
          <el-col :span="8">
            <el-input v-model="bak_info" type="textarea" :rows="3" />
          </el-col>
          <el-col :span="3">
            <el-button
              style="margin-top:20px; margin-left:20px;"
              type="primary"
              size="mini"
              plain
              @click="handleUpdatePhoneBannerRemarkInfo()"
            >修改轮播图备注</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { updatePhoneBannerUrl, updatePhoneBannerSort, updatePhoneBannerRemarkInfo, updatePhoneBannerPicture } from '@/api/system/platform/phoneBanner'
import UploadSinglePicture from '@/pages/component/upload/uploadSinglePicture'

export default
{
  // 组件名称
  name: 'TableInfo',
  // 组件
  components:
    {
      UploadSinglePicture
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
      id: this.rowData.id,
      showComponent: 0,
      album_picture_id: null,
      redirect_url: this.rowData.redirect_url,
      sort: this.rowData.sort,
      bak_info: this.rowData.bak_info
    }
  },
  // 计算属性
  computed:
    {
    },
  // 监听
  watch:
    {
    },
  // 挂载 --常用
  mounted()
  {
  },
  // 方法
  methods:
  {
    handleClick(key)
    {
      this.showComponent = key
    },
    // 修改轮播图跳转
    handleUpdatePhoneBannerUrl()
    {
      const params = {}
      params['id'] = this.id
      params['redirect_url'] = this.redirect_url
      updatePhoneBannerUrl(params).then(res =>
      {
        if (res && res.code === 0)
        {
          this.event.$emit('updateData', true)
          this.$message(
            {
              message: res.msg,
              type: 'success'
            })
        }
      })
    },
    // 修改轮播图排序
    handleUpdatePhoneBannerSort()
    {
      const params = {}
      params['id'] = this.id
      params['sort'] = this.sort
      updatePhoneBannerSort(params).then(res =>
      {
        if (res && res.code === 0)
        {
          this.event.$emit('updateData', true)
          this.$message(
            {
              message: res.msg,
              type: 'success'
            })
        }
      })
    },
    // 修改轮播图备注
    handleUpdatePhoneBannerRemarkInfo()
    {
      const params = {}
      params['id'] = this.id
      params['bak_info'] = this.bak_info
      updatePhoneBannerRemarkInfo(params).then(res =>
      {
        if (res && res.code === 0)
        {
          this.event.$emit('updateData', true)
          this.$message(
            {
              message: res.msg,
              type: 'success'
            })
        }
      })
    },
    // 修改轮播图备注
    handleUpdatePhoneBannerPicture()
    {
      if (!this.album_picture_id)
      {
        return this.$message.warning('未上传要修改的图片')
      }

      const params = {}
      params['id'] = this.id
      params['album_picture_id'] = this.album_picture_id
      updatePhoneBannerPicture(params).then(res =>
      {
        if (res && res.code === 0)
        {
          this.event.$emit('updateData', true)
          this.$message(
            {
              message: res.msg,
              type: 'success'
            })
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.header{
  margin-bottom:1rem;
}
.row-one{
   margin-bottom: 1rem;
   width: 100rem;
   height: 46px;
  line-height: 46px;
}
.input {
  width: 250px;
}
.level-title {
  display: inline-flex;
  height: 46px;
  line-height: 46px;
  font-size: 14px;
  color: #606266;
  font-weight: 700;
}
::v-deep .el-table__body-wrapper {
  .el-table__expanded-cell {
    z-index: 99;
    padding: 0;
    background: #fff;
  }
}
::v-deep .el-table__fixed,
::v-deep .el-table__fixed-right {
  .el-table__expanded-cell {
    visibility: hidden;
    padding: 0;
  }
}
.expanded {
  padding: 15px;
width: 100%;
background: #fff;
}
</style>
