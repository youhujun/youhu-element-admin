<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-11-02 17:13:07
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-05-07 14:12:28
-->
<template>
  <el-col :span="4">
    <div class="picture-box">
      <div class="picture-header">
        <div class="picture-show">
          <div v-if="isShowChecked" class="picture-select">
            <el-checkbox v-model="checked" @change="handleToCheck()" />
          </div>
          <el-image
            style="width:100%; height: 100%;"
            :src="srcUrl"
            fit="fill"
            @click.stop="handleToClick()"
          />
        </div>
      </div>
      <div class="picture-footer">
        <div class="picture_name">
          <el-row>
            <el-col :span="24">
              <div>{{ pictureObject.picture_name }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="picture-switch">
          <div class="picture_info">
            <el-row type="flex" style="margin-bottom:0.5rem;text-align:left;font-size:0.6rem;">
              <el-col :span="8">上传时间:</el-col>
              <el-col :span="16">{{ pictureObject. created_at }}</el-col>
            </el-row>
            <el-row type="flex" style="text-align:left;font-size:0.6rem;">
              <el-col :span="8">原图尺寸:</el-col>
              <el-col :span="16">{{ pictureObject. picture_spec }}</el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </el-col>
</template>
<script>
export default
{
  // 组件名称
  name: 'PictureItemSelect',
  // 组件
  components:
    {
    },
  props:
    {
      pictureObject: {
        type: Object,
        default: () =>
        {
          return {
            id: 0,
            user_id: 0,
            revision:	0,
            created_at:	'00-00-00 00:00:00',
            created_time: 0,
            updated_at:	'00-00-00 00:00:00',
            updated_time: 0,
            deleted_at:	null,
            deleted_time: 0,
            picture_name: 'album',
            picture_tag: '',
            picture_path:	'/config/album/',
            picture_file:	'album.png',
            picture_size:	11,
            picture_spec:	'80x80'
          }
        }
      },
      checkItem: {
        type: Object,
        default: () =>
        {
          return {
            id: 0,
            checked: false
          }
        }
      },
      itemIndex: {
        type: Array,
        default: () =>
        {
          return [0, 0]
        }
      },
      isShowChecked: {
        type: Boolean,
        default: false
      }
    },
  // 数据
  data()
  {
    return {
      baseUrl: '',
      baseRequestUrl: '',
      checked: false
    }
  },
  // 计算属性
  computed:
  {
    srcUrl()
    {
      return this.pictureObject.picture
    }
  },
  // 监听
  watch:
  {
    'checkItem.checked': {
      handler(value)
      {
        this.checked = value
      },
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
    // 选中
    handleToCheck()
    {
      const data = { id: this.checkItem.id, checked: this.checked }

      /* console.log('选择触发') */
      this.$emit('handleChange', [data, this.itemIndex])
    },
    handleToClick()
    {
      this.checked = !this.checked

      const data = { id: this.checkItem.id, checked: this.checked }
      /*  console.log('单击触发') */
      this.$emit('handleChange', [data, this.itemIndex])
    }
  }
}
</script>
<style lang='scss' scoped>
.picture-box{
   line-height: 1.15;
   width: 100%;
   height:20rem;
   background: #FFFFFF;
   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
   .picture-header{
    width: 100%;
    height:14rem;
    padding-top: 1rem;
    .picture-show{
        width:86%;
        height:12rem;
        margin:auto auto;
        background: #FFFFFF;
        border:1px solid #F2F6FC;
        .picture-select{
        position:absolute;
        z-index: 20000;
        ::v-deep .el-checkbox__inner{
          width: 1rem;
          height: 1rem;
        }
      }
    }
   }
   .picture-footer{
     width: 100%;
     height:6rem;
     .picture_name{
       width:86%;
       height:1.2rem;
       margin:auto auto;
       margin-bottom: 0.8rem;
      ::v-deep .el-input__inner{
         width:100%;
         height:1.2rem;
         padding:none;
         line-height: 1.2rem;
         font-weight: bold;
         border: none;
      }
     }
     .picture-switch{
        width:86%;
        height: 4rem;
        margin:auto auto;
         .picture_info{
          display: block;
          font-size: 0.8rem;
          color:#909399;
        }
        .picture_action{
          display: none;
        }

     }
   }
}
.picture-box:hover
{
   background: #f2f8fcbd;
}
.show-picture-container
{
  width:100%;
  height:auto;
}
</style>
