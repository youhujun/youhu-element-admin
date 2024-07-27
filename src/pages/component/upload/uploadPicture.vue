<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-05-07 09:15:00
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-02 15:03:21
-->
<template>
  <div style="margin-bottom:1rem;">
    <el-button type="primary" @click="open">{{ showContent }}</el-button>
    <dialogContent
      v-if="dialogUploadVisible"
      dialog-content-title="上传图片"
      :dialog-content-visible.sync="dialogUploadVisible"
    >
      <template #content>
        <div class="show-picture-container">
          <div style="width:100%;height:2rem;" />
          <el-upload
            ref="upload"
            class="upload-demo"
            drag
            :data="uploadData"
            :headers="headers"
            accept="image/*"
            :limit="limitNumber"
            :on-exceed="handleExceed"
            :action="multiplePicture"
            :before-upload="beforeUploadPicture"
            :http-request="uploadPicture"
            name="picture"
            :auto-upload="false"
            multiple
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">
              支持Jpg、Gif、Png格式，大小不超过2MB的图片上传；
              浏览文件时可以按住ctrl或shift键多选;最多同时上传5张图片
            </div>
          </el-upload>
          <el-button type="primary" style="margin-top:1rem;" @click="submitUpload()">上传到服务器</el-button>
        </div>
      </template>
    </dialogContent>
    <dialogContent
      v-if="dialogAlbumVisible"
      dialog-content-title="选取相册图片"
      :dialog-content-visible.sync="dialogAlbumVisible"
      dialog-content-width="80%"
    >
      <template #content>
        <div class="show-picture-container">
          <div style="width:100%; height:auto;margin-bottom: 1rem;"><el-tag type="info">请选择相册</el-tag></div>
          <SelectAlbum
            :album-id.sync="pictureAlbumId"
          />
          <div style="width:100%;height:2rem;" />
          <div class="show-picture-header">
            <div class="header">
              <el-divider content-position="left">操作</el-divider>
              <div class="header-box">
                <div class="header-left">
                  <el-button type="primary" @click="handleToSelectAll()">
                    全选
                  </el-button>
                  <el-button type="primary" @click="handleToUnSelect()">
                    反选
                  </el-button>
                  <el-button type="info" @click="handleToNoSelect()">
                    取消
                  </el-button>
                </div>
                <div class="header-right">
                  <span>图片排序</span>
                  <el-select v-model="pictureWhere.sortType" style="margin-left:1rem;margin-right:2rem;" placeholder="请选择" @change="handlePictureSortChange()">
                    <el-option
                      v-for="item in pictureSortOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <el-button type="success" @click="handleToConfirm()">
                    确定
                  </el-button>
                </div>
              </div>
            </div>
          </div>
          <el-divider content-position="left">图片</el-divider>
          <showPicture>
            <template #pictureLine>
              <pictureLine v-for="(pictureLine,key) in showPictureList" :key="key">
                <template #pictureItem>
                  <pictureItemSelect
                    v-for="(item,k) in pictureLine"
                    :key="k"
                    :picture-object="item"
                    :item-index="[key,k]"
                    :check-item.sync="showCheckList[key][k]"
                    :is-show-checked="true"
                    @handleChange="changeCheckItem"
                  />
                </template>
              </pictureLine>
            </template>
            <template #paginate>
              <Paginate :current-page.sync="pictureCurrentPage" :page-size.sync="picturePageSize" :page-sizes="pageSizes" :total.sync="pictureTotal" />
            </template>
          </showPicture>
        </div>
      </template>
    </dialogContent>
    <el-row v-if="showResult && imageList.length > 1" :gutter="10" style="margin-top:1rem;" type="flex">
      <el-col v-for="(item,key) in imageList" :key="key" :span="4">
        <img width="100%" :src="item.picture" alt="">
      </el-col>
    </el-row>
    <el-row v-if="showResult && imageList.length === 1" :gutter="10" style="margin-top:1rem;" type="flex">
      <el-col v-for="(item,key) in imageList" :key="key" :span="4">
        <img width="100%" :src="item.picture" alt="">
      </el-col>
    </el-row>
    <el-row v-if="hasPicture" style="margin-top:0.5rem;" type="flex" :gutter="10">
      <el-col v-for="(item,key) in beforePictureList" :key="key" :span="4">
        <el-image width="100%" :src="item.picture" fit="fill" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getAlbumPicture, uploadMultiplePicture } from '@/api/picture/album'

import dialogContent from '@/pages/component/dialogContent'

import showPicture from '@/pages/component/showPicture'
import pictureLine from '@/pages/component/picture/pictureLine'
import pictureItemSelect from '@/pages/component/picture/pictureItemSelect'
import Paginate from '@/pages/component/paginate'

import { getToken } from '@/utils/auth'
import { group } from '@/utils'
import SelectAlbum from '../selectAlbum'

export default
{
  // 组件名称
  name: 'UploadPicture',
  // 组件
  components:
    {
      dialogContent,
      pictureLine,
      pictureItemSelect,
      showPicture,
      Paginate,
      SelectAlbum
    },
  props:
    {
      uploadData: {
        type: Object,
        default: () =>
        {
          return {}
        }
      },
      pictureId: {
        type: [Array, Number],
        default: () =>
        {
          return []
        }
      },
      limitNumber: {
        type: Number,
        default: 5
      },
      showContent: {
        type: String,
        default: '上传图片'
      },
      beforePictureList: {
        type: Array,
        default: null
      }
    },
  // 数据
  data()
  {
    return {
      dialogUploadVisible: false,
      dialogAlbumVisible: false,
      baseUrl: '',
      multiplePicture: '',
      headers: {
        'time': new Date().getTime(),
        'type': 'picture',
        'X-Token': getToken()
      },

      // 图片相册id
      pictureAlbumId: 0,
      // 相册容器
      albumList: [],

      // 图片日容器
      pictureList: [],
      // 图片选中容器
      checkList: [],
      // 单击逐个选择
      clickCheckList: [],

      // 图片展示条件
      pictureWhere: {
        sortType: '0',
        // 分页
        currentPage: 1,
        pageSize: 12,
        total: 0,
        id: 0
      },
      pictureSortOptions: [
        {
          value: '0',
          label: '请选择'
        },
        {
          value: '1',
          label: '图片从大到小'
        }, {
          value: '2',
          label: '图片从小到大'
        }, {
          value: '3',
          label: '上传时间从早到晚'
        }, {
          value: '4',
          label: '上传时间从晚到早'
        }
      ],
      pageSizes: [6, 12, 24, 36],
      showResult: false,
      imageList: [],
      hasPicture: false
    }
  },
  // 计算属性
  computed:
  {
    showPictureList:
    {
      set(value)
      {
        this.pictureList = value
      },
      get()
      {
        const array = group(this.pictureList, 6)
        return array
      }
    },
    showCheckList:
    {
      set(value)
      {
      },
      get()
      {
        const newArray = group(this.checkList, 6)

        return newArray
      }
    },
    pictureCurrentPage:
    {
      set(value)
      {
        this.pictureWhere.currentPage = value
      },
      get()
      {
        return this.pictureWhere.currentPage
      }
    },
    picturePageSize:
    {
      set(value)
      {
        this.pictureWhere.pageSize = value
      },
      get()
      {
        return this.pictureWhere.pageSize
      }
    },
    pictureTotal:
    {
      set(value)
      {
        this.pictureWhere.total = value
      },
      get()
      {
        return this.pictureWhere.total
      }
    }
  },
  // 监听
  watch:
  {
    pictureId(value)
    {
      if (value.length === 0)
      {
        this.imageList = []
        this.showResult = false
      }
    },
    // 传递过来的图片数组
    beforePictureList: {
      handler(value)
      {
        if (value !== null)
        {
          this.hasPicture = true
        }
      },
      immediate: true,
      deep: true
    },
    // 富文本编辑 结束
    pictureAlbumId(value)
    {
      this.pictureWhere.id = value
      this.pictureWhere.currentPage = 1
      if (value)
      {
        this.getAlbumPicture(this.pictureWhere)
      }
    },
    pictureCurrentPage(value)
    {
      this.getAlbumPicture(this.pictureWhere)
      this.initCheckList()
    },
    picturePageSize(value)
    {
      this.getAlbumPicture(this.pictureWhere)
      this.initCheckList()
    }
  },
  // 实例创建之前
  beforeCreate()
  {
  },
  // 创建
  created()
  {
    this.baseUrl = process.env.VUE_APP_BASE_API
  },
  // 挂载之前
  beforeMount()
  {
  },
  // 挂载 --常用
  mounted()
  {
    this.multiplePicture = this.baseUrl + 'uploadMultiplePicture'
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
    open()
    {
      this.$confirm('上传图片或者从相册选取', '提示', {
        confirmButtonText: '相册选取',
        cancelButtonText: '上传图片',
        type: 'info',
        center: true
      }).then(() =>
      {
        this.dialogAlbumVisible = true
      }).catch((action) =>
      {
        if (action === 'cancel')
        {
          this.dialogUploadVisible = true
        }
      })
    },
    // 图片上传
    beforeUploadPicture(files)
    {
      if (files.size > 1024 * 1024 * 2)
      {
        this.$message({
          type: 'warning',
          message: '上传文件最大限制2MB'
        })
        return false
      }
      return true
    },
    // 上传数量超限回调
    handleExceed(files, fileList)
    {
      this.$message.error('超出最大上传数量限制')
    },
    // 自定义上传图片
    uploadPicture(file)
    {
      this.formData.set('id', file.data.id)
      this.formData.append('picture[]', file.file)
      this.formData.set('use_type', this.uploadData.use_type)
      this.formData.set('file_type', this.uploadData.file_type)
      this.formData.set('save_path', this.uploadData.save_path)
    },
    // 提交上传
    submitUpload()
    {
      this.formData = new FormData()

      this.$refs.upload.submit()

      const that = this

      this.hasPicture = false

      uploadMultiplePicture(this.formData).then(res =>
      {
        if (res && res.code === 0)
        {
          that.$message({
            type: 'success',
            message: '上传成功'
          })

          that.dialogUploadVisible = false
          that.imageList = res.data

          const idArray = []
          console.log(that.imageList)
          that.imageList.forEach(element =>
          {
            idArray.push(element.id)
          })

          this.$emit('update:pictureId', idArray)

          that.showResult = true
        }
      })
    },

    // 全选
    handleToSelectAll()
    {
      for (let index = 0; index < this.checkList.length; index++)
      {
        this.$set(this.checkList, index, { id: this.checkList[index].id, checked: true })
      }
    },
    // 反选
    handleToUnSelect()
    {
      for (let index = 0; index < this.checkList.length; index++)
      {
        this.$set(this.checkList, index, { id: this.checkList[index].id, checked: !this.checkList[index].checked })
      }
    },
    // 取消
    handleToNoSelect()
    {
      for (let index = 0; index < this.checkList.length; index++)
      {
        this.$set(this.checkList, index, { id: this.checkList[index].id, checked: false })
      }
    },
    // 选择图片排序方式
    handlePictureSortChange()
    {
      this.getAlbumPicture(this.pictureWhere)
    },
    // 获取相册图片
    async getAlbumPicture(pictureWhere)
    {
      const picture = await getAlbumPicture(pictureWhere).then(res =>
      {
        return new Promise((resolve, reject) =>
        {
          if (res && res.code === 0)
          {
            resolve(res)
          }
          else
          {
            reject('获取图片失败')
          }
        })
      })

      this.pictureCurrentPage = picture.meta.current_page
      this.picturePageSize = picture.meta.per_page
      this.pictureTotal = picture.meta.total
      this.pictureList = picture.data
      this.initCheckList()
    },

    initCheckList()
    {
      const array = []

      for (const key in this.pictureList)
      {
        array[key] = { id: this.pictureList[key].id, checked: false }
      }
      this.checkList = array
    },
    // 改变元素选中
    changeCheckItem(value)
    {
      const data = value[0]
      const indexArray = value[1]
      this.$set(this.checkList, indexArray[0] * 6 + indexArray[1], data)
      if (data.checked)
      {
        this.clickCheckList.push(data.id)
      }
    },
    handleToConfirm()
    {
      this.hasPicture = false
      this.imageList = []
      const pictureId = []

      this.checkList.forEach(element =>
      {
        if (element.checked)
        {
          pictureId.push(element.id)
        }
      })

      if (pictureId.length > this.limitNumber)
      {
        this.$message({
          type: 'error',
          message: '图片数量超出限制'
        })

        return false
      }

      this.pictureList.forEach(element =>
      {
        if (pictureId.includes(element.id))
        {
          this.imageList.push(element)
        }
      })

      this.$emit('update:pictureId', pictureId)

      this.clickCheckList = []

      this.initCheckList()

      this.dialogAlbumVisible = false
      this.showResult = true
    }
  }
}
</script>
<style lang='scss' scoped>
.show-picture-container
{
  width:100%;
  height:auto;
  .show-picture-header{
    width:100%;
    height:auto;
    .header{
      width:100%;
      height:auto;
    }
  }
}
.header-box{
  display: flex;
  flex-direction: row;
  justify-content:space-between;
}
.show-picture-content{
   width:100%;
   height:auto;
}
</style>
