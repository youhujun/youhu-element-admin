<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-04-29 17:25:33
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-02 15:03:45
-->
<template>
  <div>
    <el-select
      v-model="selectId"
      clearable
      filterable
      remote
      placeholder="请选择或输入关键词"
      :remote-method="searchAlbum"
      :loading="albumLoading"
      :disabled="disabled"
      @change="handleChange"
    >
      <el-option
        v-for="item in albumOptions"
        :key="item.id"
        :label="item.album_name"
        :value="item.id"
      />
    </el-select>
  </div>
</template>
<script>
import { getDefaultAlbum, findAlbum } from '@/api/picture/album'

export default
{
  // 组件名称
  name: 'SelectAlbum',
  // 组件
  components:
    {
    },
  props:
    {
      albumId: {
        type: [Number, String],
        default: null
      },
      disabled: {
        type: Boolean,
        default: () =>
        {
          return false
        }
      }
    },
  // 数据
  data()
  {
    return {
      selectId: this.albumId,
      albumLoading: false,
      albumOptions: []
    }
  },
  // 监听
  watch:
    {
      selectId(value)
      {
        this.$emit('update:albumId', value)
      },
      albumId(value)
      {
        if (value === null)
        {
          this.selectId = null
        }
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
    this.getDefaultAlbum()
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
    // 获取相册
    async getDefaultAlbum()
    {
      const param = {}
      param.album_type = 10
      const album = await getDefaultAlbum(param).then(res =>
      {
        return new Promise((resolve, reject) =>
        {
          if (res && res.code === 0)
          {
            resolve(res)
          }
          else
          {
            reject('获取相册失败')
          }
        })
      })
      this.albumOptions = album.data
      this.selectId = album.data[0].id
    },
    // 查找相册选项
    async findAlbumOptions(find)
    {
      find.album_type = 10
      const album = await findAlbum(find).then(res =>
      {
        return new Promise((resolve, reject) =>
        {
          if (res && res.code === 0)
          {
            resolve(res)
          }
          else
          {
            reject('获取相册失败')
          }
        })
      })
      this.albumOptions = album.data
      this.albumLoading = false
    },
    searchAlbum(query)
    {
      if (query !== '')
      {
        this.albumLoading = true

        const find = {}

        find['find'] = query

        this.findAlbumOptions(find)
      }
      else
      {
        this.albumLoading = false
        this.getDefaultAlbum()
      }
    },
    handleChange(value)
    {
      if (value === '')
      {
        this.getDefaultAlbum()
      }
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
