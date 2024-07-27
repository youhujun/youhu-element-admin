<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-10-28 13:15:41
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-02 13:47:44
-->
<template>
  <el-col :span="4">
    <div class="album-item">
      <div class="item-header" @click="handleShowPicture()">
        <div class="header-cover">
          <i v-if="albumObject.cover_album_picture_id === 1 || albumObject.cover_album_picture == null " class="el-icon-camera-solid" style="font-size:6rem;" />
          <el-image
            v-if="albumObject.cover_album_picture_id !== 1 && albumObject.cover_album_picture"
            style="width:100%; height: 100%;"
            :src="srcUrl"
            fit="fill"
          />
        </div>
      </div>
      <div class="item-footer">
        <div class="album-name" @click="handleShowPicture()">
          <span>{{ albumObject.album_name }}</span>
          <span v-if="albumObject.album_type ===10 && albumObject.admin_id !== 0">
            <i class="el-icon-user-solid" />
          </span>
          <span v-if="albumObject.album_type ===20 && albumObject.user_id !== 0">
            <i class="el-icon-user" />
          </span>
        </div>
        <div class="album-number">
          共 {{ albumObject.picture_number }} 张
        </div>
        <div class="action-box">
          <el-button class="mini-button" @click="handleUpdateAlbum()">
            <div class="button-show">
              <i class="el-icon-edit" style="margin-left:0.1rem;" />
              编辑
            </div>
          </el-button>
          <el-button v-if="albumObject.album_type!==0 && albumObject.is_system !== 1" class="mini-button" @click="handleRemoveAlbum()">
            <i class="el-icon-circle-close" />
            删除
          </el-button>
        </div>
      </div>
    </div>
  </el-col>
</template>
<script>
export default
{
  // 组件名称
  name: 'AlbumItem',
  // 组件
  components:
    {
    },
  props:
    {
      albumObject: {
        type: Object,
        default: () =>
        {
          return {
            id: 0,
            album_name: '默认相册',
            picture_number: 0,
            is_default: 0,
            cover_album_picture_id: 1,
            cover_album_picture: ''
          }
        }
      },
      beforeAlbumForm: {
        type: Object,
        default: () =>
        {
          return {}
        }
      },
      itemIndex: {
        type: Array,
        default: () =>
        {
          return [0, 0]
        }
      },
      updateIndex: {
        type: Array,
        default: () =>
        {
          return [0, 0]
        }
      },
      deleteAlbumId: {
        type: Number,
        default: 0
      },
      // 是否开启弹框
      dialogVisible: {
        type: Boolean,
        default: false
      },
      // 弹框标题
      dialogTitle: {
        type: String,
        default: '修改相册'
      },
      dialogType: {
        type: Number,
        default: 2
      },
      showPicture: {
        type: Object,
        default: () =>
        {
          return {
            id: 0,
            picture_number: 0
          }
        }
      }
    },
  // 数据
  data()
  {
    return {
      baseUrl: ''
    }
  },
  // 计算属性
  computed:
  {
    srcUrl()
    {
      return this.albumObject.cover_album_picture
    }
  },
  // 监听
  watch:
  {
  },
  // 实例创建之前
  beforeCreate()
  {
  },
  // 创建
  created()
  {
    this.baseUrl = process.env.VUE_APP_URL
    this.baseRequestUrl = process.env.VUE_APP_BASE_API
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
    // 编辑相册
    handleUpdateAlbum()
    {
      const albumForm = {
        id: this.albumObject.id,
        sort: this.albumObject.sort,
        album_name: this.albumObject.album_name,
        album_description: this.albumObject.album_description,
        album_type: this.albumObject.album_type
      }
      this.$emit('update:updateIndex', this.itemIndex)
      this.$emit('update:beforeAlbumForm', albumForm)
      this.$emit('update:dialogVisible', true)
      this.$emit('update:dialogTitle', '修改相册')
      this.$emit('update:dialogType', 2)
    },
    // 删除相册
    handleRemoveAlbum()
    {
      const id = this.albumObject.id
      this.$emit('update:deleteAlbumId', id)
    },
    // 查看相册
    handleShowPicture()
    {
      const showPicture = {
        id: this.albumObject.id,
        picture_number: this.albumObject.picture_number
      }
      this.$emit('update:showPicture', showPicture)
    }
  }
}
</script>
<style lang='scss' scoped>
.album-item{
    width:100%;
    height:20rem;
    background: #FFFFFF;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.album-item:hover{
    background: #f2f8fcbd;
}
.item-header{
    width: 100%;
    height:14rem;
    padding-top: 1rem;
}
.header-cover{
   width:86%;
   height:12rem;
   margin:auto auto;
   background: #FFFFFF;
   border:1px solid #F2F6FC;
   text-align: center;
   line-height: 14rem;
}
.header-cover:hover{
  color: #409EFF;
}
.item-footer
{
  width:100%;
  height:6rem;
}
.album-name
{
   display: flex;
   justify-content: space-between;
   width:86%;
   height:1rem;
   font-size: 1rem;
   color:#409EFF;
   margin:auto auto;
   margin-bottom: 1rem;
}
.album-number
{
  width: 86%;
  height:0.8rem;
  font-size: 0.8rem;
  margin:auto auto;
  margin-bottom: 1rem;

}
.action-box
{
   width: 86%;
   display: flex;
   margin:auto auto;
   text-align: center;
}
.mini-button{
   display: none;
   width:47%;
   height:1.5rem;
   padding:0;
   letter-spacing: 0.5rem;
}
.album-item:hover .mini-button{
   display: block;
}
.mini-button:hover{
   background: #FFFFFF;
}
</style>
