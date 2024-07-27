<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-11 16:28:38
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-02 15:04:02
-->
<template>
  <div>
    <Card>
      <template #cardTitle>
        我的相册
      </template>
      <template #cardNotice>
        <el-tag size="mini" type="danger" effect="plain">
          1.上传图片的相册,默认是当前显示相册的第一个
          2.相册选项仅为当前显示的相册
          3.被删除的相册图片会转移到默认相册下
        </el-tag>
      </template>
      <template #cardButton>
        <div style="float: right;">
          <el-select
            v-model="where.sortType"
            placeholder="请选择排序方式"
            style="margin-right:0.5rem;"
            @change="handleSortChange()"
          >
            <el-option
              v-for="item in sortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button type="primary" @click="handleAddAlbum()">创建相册</el-button>
          <el-button type="primary" @click="handleUploadPicture()">上传图片</el-button>
        </div>
      </template>
      <template #cardContent>
        <div class="custom-node">
          <!-- 相册 -->
          <showAlbum :loading="loading">
            <template #albumLine>
              <albumLine v-for="(albumLine,key) in showAlbumList" :key="key">
                <template #albumItem>
                  <albumItem
                    v-for="(item,k) in albumLine"
                    :key="k"
                    :album-object="item"
                    :item-index="[key,k]"
                    :update-index.sync="updateIndex"
                    :before-album-form.sync="beforeAlbumForm"
                    :dialog-visible.sync="dialogVisible"
                    :dialog-title.sync="dialogTitle"
                    :dialog-type.sync="dialogType"
                    :delete-album-id.sync="deleteAlbumId"
                    :show-picture.sync="showPicture"
                  />
                </template>
              </albumLine>
            </template>
            <template #paginate>
              <Paginate
                :current-page.sync="currentPage"
                :page-size.sync="pageSize"
                :page-sizes="pageSizes"
                :total.sync="total"
              />
            </template>
          </showAlbum>
        </div>
      </template>
    </Card>
    <!-- 创建相册 新增、修改 -->
    <div v-if="dialogVisible">
      <Dialog
        :dialog-visible.sync="dialogVisible"
        :dialog-title="dialogTitle"
        :dialog-type="dialogType"
        :dialog-width="dialogWidth"
      >
        <template #addForm>
          <AddAlbumForm :add-album-data.sync="addAlbumData" />
        </template>
        <template #updateForm>
          <UpdateAlbumForm
            :before-album-form.sync="beforeAlbumForm"
            :update-album-data.sync="updateAlbumData"
          />
        </template>
      </Dialog>
    </div>
    <!-- 打开相册图片的弹框 -->
    <div v-if="dialogContentVisible">
      <DialogContent
        :dialog-content-visible.sync="dialogContentVisible"
        :dialog-content-title="dialogContentTitle"
        :dialog-content-width="dialogContentWidth"
      >
        <template #content>
          <div class="show-picture-container">
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
                    <el-button type="danger" @click="handleDeleteMultiplePicture()">
                      删除
                    </el-button>
                    <el-button type="warning" @click="handleMoveAlbum()">
                      转移相册
                    </el-button>
                  </div>
                  <div class="header-right">
                    <span>图片排序</span>
                    <el-select
                      v-model="pictureWhere.sortType"
                      style="margin-left:1rem;"
                      placeholder="请选择"
                      @change="handlePictureSortChange()"
                    >
                      <el-option
                        v-for="item in pictureSortOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                    <el-button
                      style="margin-left:1rem;"
                      type="primary"
                      @click="handleUploadPicture()"
                    >
                      上传图片
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
            <el-divider content-position="left">图片</el-divider>
            <showPicture :loading="pictureLoading">
              <template #pictureLine>
                <pictureLine v-for="(pictureLine,key) in showPictureList" :key="key">
                  <template #pictureItem>
                    <pictureItem
                      v-for="(item,k) in pictureLine"
                      :key="k"
                      :picture-object="item"
                      :item-index="[key,k]"
                      :check-item.sync="showCheckList[key][k]"
                      :is-show-checked="true"
                      @handleChange="changeCheckItem"
                      @handleResetPicture="restPicture"
                      @handleSetCover="setCover"
                      @handleMoveAlbum="moveAlbum"
                      @handleDeletePicture="deletePicture"
                      @handleUpdatePictureName="updatePictureName"
                    />
                  </template>
                </pictureLine>
              </template>
              <template #paginate>
                <Paginate
                  :current-page.sync="pictureCurrentPage"
                  :page-size.sync="picturePageSize"
                  :page-sizes="pageSizes"
                  :total.sync="pictureTotal"
                />
              </template>
            </showPicture>
          </div>
        </template>
      </DialogContent>
    </div>
    <!-- 上传图片的上传弹框 -->
    <div v-if="dialogUploadVisible">
      <DialogContent
        :dialog-content-visible.sync="dialogUploadVisible"
        :dialog-content-title="dialogUploadTitle"
        :dialog-content-width="dialogUploadWidth"
      >
        <template #content>
          <div class="show-picture-container">
            <el-select v-if="uploadType === 1" v-model="uploadAlbumId" placeholder="相册">
              <el-option
                v-for="item in albumList"
                :key="item.id"
                :label="item.album_name"
                :value="item.id"
              />
            </el-select>
            <div style="width:100%;height:2rem;" />
            <el-upload
              ref="upload"
              class="upload-demo"
              drag
              :data="{id:uploadAlbumId, use_type:20, file_type: '', save_path: 'picture'}"
              :headers="headers"
              accept="image/*"
              :limit="20"
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
                支持Jpg、Gif、Png格式，大小不超过50MB的图片上传；
                浏览文件时可以按住ctrl或shift键多选;最多同时上传20张图片
              </div>
            </el-upload>
            <el-button type="primary" style="margin-top:1rem;" @click="submitUpload()">上传到服务器</el-button>
          </div>
        </template>
      </DialogContent>
    </div>
    <!-- 替换单图上传的上传弹框 -->
    <div v-if="dialogUploadSingleVisible">
      <DialogContent
        :dialog-content-visible.sync="dialogUploadSingleVisible"
        :dialog-content-title="dialogUploadSingleTitle"
        :dialog-content-width="dialogUploadSingleWidth"
      >
        <template #content>
          <div class="show-picture-container">
            <el-upload
              class="upload-demo"
              drag
              :data="{id:uploadAlbumId, use_type:30, file_type: null, save_path: null, picture_id: pictureId}"
              :headers="headers"
              accept="image/*"
              :action="resetPicture"
              name="picture"
              :auto-upload="true"
              :on-success="uploadSuccess"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div slot="tip" class="el-upload__tip">
                支持Jpg、Gif、Png格式，大小不超过50MB的图片上传；
              </div>
            </el-upload>
          </div>
        </template>
      </DialogContent>
    </div>
    <!-- 转移相册的弹框 -->
    <div v-if="dialogMoveSelectVisible">
      <DialogContent
        :dialog-content-visible.sync="dialogMoveSelectVisible"
        :dialog-content-title="dialogMoveSelectTitle"
        :dialog-content-width="dialogMoveSelectWidth"
      >
        <template #content>
          <div class="show-picture-container">
            <el-select v-model="moveAlbumId" placeholder="请选择相册">
              <el-option
                v-for="item in albumList"
                :key="item.id"
                :label="item.album_name"
                :value="item.id"
              />
            </el-select>
            <div style="width:100%;height:0.5rem;" />
            <div>
              <el-button @click="handleToMoveAlbum()">确定转移</el-button>
            </div>
          </div>
        </template>
      </DialogContent>
    </div>
  </div>
</template>
<script>
import Card from '@/pages/component/card'
import Dialog from '@/pages/component/dialog'
import DialogContent from '@/pages/component/dialogContent'
import showAlbum from '@/pages/component/showAlbum.vue'
import albumLine from '@/pages/component/album/albumLine'
import albumItem from '@/pages/component/album/albumItem'
import showPicture from '@/pages/component/showPicture'
import pictureLine from '@/pages/component/picture/pictureLine'
import pictureItem from '@/pages/component/picture/pictureItem'
import AddAlbumForm from '@/pages/picture/album/component/addAlbumForm'
import UpdateAlbumForm from '@/pages/picture/album/component/updateAlbumForm'
import Paginate from '@/pages/component/paginate'

import { getAlbum, deleteAlbum, getAlbumPicture, uploadMultiplePicture, moveMultipleAlbum, moveAlbum, deleteMultiplePicture, deletePicture, updatePictureName } from '@/api/picture/album'
import { getToken } from '@/utils/auth'
import { group } from '@/utils'
export default
{
  // 组件名称
  name: 'Album',
  // 组件
  components:
  {
    Card,
    Dialog,
    showAlbum,
    albumLine,
    albumItem,
    AddAlbumForm,
    UpdateAlbumForm,
    Paginate,
    DialogContent,
    showPicture,
    pictureLine,
    pictureItem
  },
  props:
  {
  },
  // 数据
  data()
  {
    return {
      baseUrl: '',
      resetPicture: '',
      multiplePicture: '',
      headers: {
        'time': new Date().getTime(),
        'type': 'picture',
        'X-Token': getToken()
      },
      // 弹窗控制
      dialogVisible: false,
      dialogWidth: '60%',
      dialogTitle: '创建相册',
      // 表单类型 1添加表单 2更新表单
      dialogType: 1,
      // 配合loading
      loading: true,
      // 弹框单个相册loading
      pictureLoading: true,
      // 图片弹窗控制
      dialogContentVisible: false,
      dialogContentTitle: '相册图片',
      dialogContentWidth: '98%',
      // 上传图片弹窗控制
      dialogUploadVisible: false,
      dialogUploadTitle: '上传图片',
      dialogUploadWidth: '40%',

      // 单图替换弹窗控制
      dialogUploadSingleVisible: false,
      dialogUploadSingleTitle: '替换图片',
      dialogUploadSingleWidth: '40%',
      pictureId: 0,
      // 图片上传类型 1是多相册选择 2是进入相册上传
      uploadType: 1,

      // 转移相册
      dialogMoveSelectVisible: false,
      dialogMoveSelectTitle: '转移相册',
      dialogMoveSelectWidth: '40%',
      // 移动相册类型 1是批量转移 2是单图转移
      moveType: 1,
      // 单图转移图片id
      movePictureId: 0,
      where: {
        sortType: '3',
        album_type: null,
        // 分页
        currentPage: 1,
        pageSize: 12,
        total: 0
      },
      pictureWhere: {
        sortType: '0',
        // 分页
        currentPage: 1,
        pageSize: 12,
        total: 0,
        id: 0
      },
      // 相册容器
      albumList: [],
      // 图片日容器
      pictureList: [],
      // 修改相册的容器
      beforeAlbumForm: {},
      // 更新相册下标
      updateIndex: [0, 0],
      // 添加的相册数据容器
      addAlbumData: {},
      // 更新的相册数据容器
      updateAlbumData: {},
      // 要删除的相册id
      deleteAlbumId: 0,
      // 图片选中容器
      checkList: [],
      // 上传相册id
      uploadAlbumId: 0,
      // 转移相册id
      moveAlbumId: 0,
      formData: null,

      pageSizes: [6, 12, 24, 36],
      sortOptions: [{
        value: '1',
        label: '排序从大到小'
      }, {
        value: '2',
        label: '排序从小到大'
      }, {
        value: '3',
        label: '创建时间从早到晚'
      }, {
        value: '4',
        label: '创建时间从晚到早'
      }],
      showPicture: {
        id: 0,
        picture_number: 0
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
      ]
    }
  },
  // 计算属性
  computed:
  {
    showAlbumList:
    {
      set(value)
      {
        this.albumList = value
      },
      get()
      {
        const array = group(this.albumList, 6)
        return array
      }
    },
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
    },

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
    currentPage(value)
    {
      this.getAlbum(this.where)
    },
    pageSize(value)
    {
      this.getAlbum(this.where)
    },
    addAlbumData(value)
    {
      this.getAlbum(this.where)
    },
    updateAlbumData(value)
    {
      this.getAlbum(this.where)
    },
    deleteAlbumId(value)
    {
      if (value)
      {
        const id = {}
        id['id'] = value
        this.deleteAlbum(id)
      }
    },
    // 监听图片弹框打开
    dialogContentVisible(value)
    {
      if (value)
      {
        this.uploadAlbumId = this.showPicture.id
        this.moveAlbumId = this.showPicture.id
        this.uploadType = 2
      }
      if (!value)
      {
        this.pictureList = []
        this.uploadType = 1
      }
    },
    showPicture: {
      handler(value)
      {
        const { id, picture_number } = value

        if (picture_number > 0)
        {
          this.pictureWhere.currentPage = 1
          this.pictureWhere.id = id
          this.getAlbumPicture(this.pictureWhere)
          this.dialogContentVisible = true
        }
        else
        {
          this.$message(
            {
              message: '暂时没有图片',
              type: 'success'
            })
        }
      },
      deep: true
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
    this.resetPicture = this.baseUrl + 'uploadResetPicture'
    // 监听弹窗关闭
    this.event.$on('closeDialog', (data) =>
    {
      this.dialogVisible = data
    })

    this.getAlbum(this.where)
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
      this.where.currentPage = 1
      this.where.pageSize = 10
      this.where.total = 0
    },
    // 获取相册
    async getAlbum(where)
    {
      const album = await getAlbum(where).then(res =>
      {
        return new Promise((resolve, reject) =>
        {
          if (res && res.code === 0)
          {
            this.loading = false
            resolve(res)
          }
          else
          {
            reject('获取相册失败')
          }
        })
      })
      this.currentPage = album.meta.current_page
      this.pageSize = album.meta.per_page
      this.total = album.meta.total
      this.albumList = album.data
      if (!this.dialogContentVisible)
      {
        this.uploadAlbumId = album.data[0].id
      }
      this.moveAlbumId = album.data[0].id
    },
    // 选择排序方式
    handleSortChange()
    {
      this.getAlbum(this.where)
    },
    // 创建相册
    handleAddAlbum()
    {
      // 改变值
      this.dialogVisible = true
      this.dialogTitle = '创建相册'
      this.dialogType = 1
    },
    // 选择相册上传图片
    handleUploadPicture()
    {
      this.dialogUploadVisible = true
    },
    // 删除相册
    deleteAlbum(id)
    {
      const that = this
      this.$confirm('确认要删除该相册吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() =>
        {
          deleteAlbum(id).then((res) =>
          {
            if (res && res.code === 0)
            {
              that.getAlbum(that.where)
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
            this.pictureLoading = false
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
    // 图片上传
    beforeUploadPicture(files)
    {
      if (files.size > 1024 * 1024 * 50)
      {
        this.$message({
          type: 'warning',
          message: '上传文件最大限制50MB'
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
      this.formData.set('use_type', 20)
      this.formData.set('file_type', '')
      this.formData.set('save_path', 'picture')
    },
    // 提交上传
    submitUpload()
    {
      this.formData = new FormData()

      this.$refs.upload.submit()

      const that = this
      uploadMultiplePicture(this.formData).then(res =>
      {
        if (res && res.code === 0)
        {
          that.$message({
            type: 'success',
            message: '上传成功'
          })

          if (this.uploadType === 1)
          {
            that.getAlbum(that.where)
          }
          else
          {
            that.getAlbumPicture(that.pictureWhere)
            that.getAlbum(that.where)
          }
          that.dialogUploadVisible = false
        }
      })
    },
    // 触发单图替换
    restPicture(param)
    {
      this.pictureId = param
      this.dialogUploadSingleVisible = true
    },
    // 重置图片成功
    uploadSuccess(res)
    {
      if (res && res.code === 0)
      {
        this.getAlbumPicture(this.pictureWhere)
        this.$message({ type: 'success', 'message': res.msg })
        this.dialogUploadSingleVisible = false
      }
      else
      {
        this.$message({ type: 'success', 'message': res.msg })
        this.dialogUploadSingleVisible = false
      }
    },
    // 设置封面
    setCover(value)
    {
      if (value)
      {
        this.getAlbum(this.where)
      }
    },
    // 转移相册
    handleMoveAlbum()
    {
      this.moveType = 1
      this.dialogMoveSelectVisible = true
    },
    // 开始转移
    handleToMoveAlbum()
    {
      if (this.moveAlbumId === this.uploadAlbumId)
      {
        this.$message({ type: 'warning', message: '同一相册,不需要转移' })
      }
      else
      {
        if (this.moveType === 1)
        {
          const pictureId = []
          const albumId = this.moveAlbumId
          this.checkList.forEach(element =>
          {
            if (element.checked)
            {
              pictureId.push(element.id)
            }
          })

          if (pictureId.length === 0)
          {
            this.$message({ type: 'warning', message: '尚未选转移图片' })
            return
          }

          const that = this

          moveMultipleAlbum({ 'album_id': albumId, 'pictureId': pictureId }).then(res =>
          {
            if (res && res.code === 0)
            {
              that.$message({ type: 'success', message: res.msg })

              that.getAlbumPicture(that.pictureWhere)
              that.getAlbum(that.where)
              this.dialogMoveSelectVisible = false
            }
          })
        }

        if (this.moveType === 2)
        {
          const picture_id = this.movePictureId
          const album_id = this.moveAlbumId

          const that = this

          moveAlbum({ 'album_id': album_id, 'picture_id': picture_id }).then(res =>
          {
            if (res && res.code === 0)
            {
              that.$message({ type: 'success', message: res.msg })

              that.getAlbumPicture(that.pictureWhere)
              that.getAlbum(that.where)
              this.dialogMoveSelectVisible = false
            }
          })
        }
      }
    },
    // 监听单图转移
    moveAlbum(value)
    {
      this.moveType = 2
      this.dialogMoveSelectVisible = true
      this.movePictureId = value
    },
    // 批量删除图片
    handleDeleteMultiplePicture()
    {
      const pictureId = []

      const that = this
      this.checkList.forEach(element =>
      {
        if (element.checked)
        {
          pictureId.push(element.id)
        }
      })

      if (pictureId.length === 0)
      {
        this.$message({ type: 'warning', message: '尚未选则要删除的图片' })
        return
      }
      else
      {
        deleteMultiplePicture({ pictureId: pictureId }).then(res =>
        {
          if (res && res.code === 0)
          {
            that.$message({ type: 'success', message: res.msg })

            that.getAlbumPicture(that.pictureWhere)
            that.getAlbum(that.where)
          }
        })
      }
    },
    // 删除图片
    deletePicture(value)
    {
      const picture_id = value

      const that = this

      deletePicture({ picture_id: picture_id }).then(res =>
      {
        if (res && res.code === 0)
        {
          that.$message({ type: 'success', message: res.msg })

          that.getAlbumPicture(that.pictureWhere)
          that.getAlbum(that.where)
        }
      })
    },
    // 更新图片名称
    updatePictureName(value)
    {
      const { picture_id, picture_name } = value
      const that = this
      updatePictureName({ picture_id: picture_id, picture_name: picture_name }).then(res =>
      {
        if (res && res.code === 0)
        {
          that.$message({ type: 'success', message: res.msg })
        }
      })
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
