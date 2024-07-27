<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-01-07 09:40:30
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-10 22:37:55
-->
<template>
  <div>
    <div>
      <Editor
        :id="tinymceId"
        v-model="contentValue"
        :api-key="api_key"
        :init="init"
        :disabled="disabled"
      />
    </div>
    <div v-if="dialogUploadVisible">
      <DialogContent :dialog-content-visible.sync="dialogUploadVisible" :dialog-content-title="dialogUploadTitle" :dialog-content-width="dialogUploadWidth" :modal="false">
        <template #content>
          <div class="show-picture-container">
            <div style="width:100%; height:auto;margin-bottom: 1rem;"><el-tag type="info">请选择相册</el-tag></div>
            <SelectAlbum
              :album-id.sync="uploadAlbumId"
            />
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
    <div v-if="dialogAlbumPictureVisible">
      <DialogContent :dialog-content-visible.sync="dialogAlbumPictureVisible" :dialog-content-title="dialogAlbumPictureTitle" :dialog-content-width="dialogAlbumPictureWidth" :modal="false">
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
            <showPicture :loading="loading">
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
      </DialogContent>
    </div>
  </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
import plugins from './plugins'
import toolbar from './toolbar'
import DialogContent from '@/pages/component/dialogContent'
import showPicture from '@/pages/component/showPicture'
import pictureLine from '@/pages/component/picture/pictureLine'
import pictureItemSelect from '@/pages/component/picture/pictureItemSelect'
import Paginate from '@/pages/component/paginate'

import { getToken } from '@/utils/auth'
import { uploadMultiplePicture, getAlbumPicture } from '@/api/picture/album'
import { group } from '@/utils'

import SelectAlbum from '../selectAlbum'
export default
{
  // 组件名称
  name: 'TEditor',
  // 组件
  components:
  {
    Editor,
    DialogContent,
    pictureLine,
    pictureItemSelect,
    showPicture,
    Paginate,
    SelectAlbum
  },
  props:
  {
    id:
    {
      type: String,
      default: function()
      {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    disabled:
    {
      type: Boolean,
      default: false
    },
    value:
    {
      type: String,
      default: ''
    }
  },
  // 数据
  data()
  {
    const that = this
    return {
      tinymceId: this.id,
      api_key: process.env.VUE_APP_TINYMCE_API_KEY,
      contentValue: '',
      init:
      {
        selector: `editor#${this.tinymceId}`,
        max_height: 1000,
        max_width: 500,
        min_height: 600,
        min_width: 400,
        language: 'zh_CN', // 语言设置为 中文
        menu:
        {
          custom: { title: '图片', items: 'pictureUpload albumSelect' },
          clear: { title: '清空', items: 'clear' }
        },
        menubar: 'file edit insert view format table tools help custom clear',
        setup: function(editor)
        {
          editor.ui.registry.addMenuItem('pictureUpload', {
            text: '上传图片',
            onAction: function()
            {
              that.dialogUploadVisible = true
            }
          })
          editor.ui.registry.addMenuItem('albumSelect', {
            text: '选择相册',
            onAction: function()
            {
              that.dialogAlbumPictureVisible = true
              that.getAlbumPicture(that.pictureWhere)
            }
          })
          editor.ui.registry.addMenuItem('clear', {
            text: '清空内容',
            onAction: function()
            {
              that.contentValue = ''
            }
          })
        },
        plugins: plugins, // 插件
        toolbar: toolbar, // 工具栏
        branding: false, // 技术支持(Powered by Tiny || 由Tiny驱动)
        paste_data_images: true // 图片是否可粘贴
      },
      multiplePicture: '',
      // 上传图片弹窗控制
      dialogUploadVisible: false,
      dialogUploadTitle: '上传图片',
      dialogUploadWidth: '40%',
      // 上传相册id
      uploadAlbumId: 0,
      // 图片相册id
      pictureAlbumId: 0,
      // 相册容器
      albumList: [],
      // 图片上传头部
      headers: {
        'time': new Date().getTime(),
        'type': 'picture',
        'X-Token': getToken()
      },
      // 选择相册图片弹框控制
      dialogAlbumPictureVisible: false,
      dialogAlbumPictureTitle: '选择图片',
      dialogAlbumPictureWidth: '80%',
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
      // 图片日容器
      pictureList: [],
      // 图片选中容器
      checkList: [],
      // 单击逐个选择
      clickCheckList: [],
      // 加载显示
      loading: true
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
    // 富文本编辑 开始
    value:
    {
      handler(newValue)
      {
        this.contentValue = newValue
      },
      deep: true,
      immediate: true
    },
    contentValue(newValue)
    {
      this.$emit('handleChange', newValue)
    },
    // 上传图片选择相册id
    uploadAlbumId(value)
    {
      this.pictureWhere.id = value
      this.pictureWhere.currentPage = 1
      if (value)
      {
        this.getAlbumPicture(this.pictureWhere)
      }
    },
    // 相册选取选择相册id
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
  mounted()
  {
    this.multiplePicture = process.env.VUE_APP_BASE_API + '/uploadMultiplePicture'
    this.api_key = process.env.VUE_APP_TINYMCE_API_KEY
  },
  // 方法
  methods:
  {
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

          let content = that.contentValue

          const imageArray = res.data

          imageArray.forEach(element =>
          {
            const src = element.picture
            content = content + `<p style="text-align: center;"><img src="${src}" /></p>`
          })
          this.contentValue = content

          that.dialogUploadVisible = false
        }
      })
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
      this.loading = false
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
    // 确定插入图片
    handleToConfirm()
    {
      const pictureId = []
      let filterPictureId = []
      this.checkList.forEach(element =>
      {
        if (element.checked)
        {
          pictureId.push(element.id)
        }
      })

      // 分析三种情况 一种是全部为空 不做处理
      // 第二种  pictureId 长度大于 this.clickCheckList 说明全选了  以pictureId为准
      // 第三种  pictureId 长度大于 this.clickCheckList 说明逐个选择 以 this.clickCheckList 因为是按照图片点击顺序排序
      if (pictureId.length > 0 && this.clickCheckList.length > 0)
      {
        if (pictureId.length > this.clickCheckList.length)
        {
          filterPictureId = pictureId
        }

        if (pictureId.length === this.clickCheckList.length)
        {
          filterPictureId = this.clickCheckList
        }
      }

      if (pictureId.length > 0 && this.clickCheckList.length === 0)
      {
        filterPictureId = pictureId
      }

      filterPictureId.forEach(element =>
      {
        let src = ''
        let content = this.contentValue

        this.pictureList.forEach(item =>
        {
          if (item.id === element)
          {
            src = item.picture
            content = content + `<p style="text-align: center;"><img src="${src}" /></p>`
          }
        })

        this.contentValue = content
      })

      this.clickCheckList = []
      this.initCheckList()
      this.dialogAlbumPictureVisible = false
    }
  }
}
</script>
<style lang='scss' scoped>
.upload-btn-box{
   width:200rem;
   height:200rem;
   background: pink;
   z-index: 20000;
}
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
<style >
.tox-notifications-container{
        display: none;
    }
.tox-tinymce-aux{
z-index: 5000 !important;
}
</style>
