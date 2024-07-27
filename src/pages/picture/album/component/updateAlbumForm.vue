<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-09-22 14:51:37
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-06-02 15:02:38
 * @LastEditTime: 2021-09-23 18:51:53
-->
<template>
  <div>
    <el-form
      ref="updateAlbumForm"
      :model="updateAlbumForm"
      :rules="updateAlbumRules"
      label-width="120px"
      :inline="true"
      label-position="left"
      status-icon
      inline-message
      style="width:80%;margin: 0 auto;padding:30px 20px;"
    >
      <el-row type="flex" justify="center">
        <el-col :span="14">
          <el-form-item label="相册类型" prop="album_type">
            <el-select v-model="updateAlbumForm.album_type" placeholder="请选择" class="select">
              <el-option
                v-for="item in albumType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="vertical-align: middle;line-height:40px;">相册的类型</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="14">
          <el-form-item label="相册名称" prop="album_name">
            <el-input v-model="updateAlbumForm.album_name" placeholder="相册名称" class="input" />
          </el-form-item>
        </el-col>
        <el-col :span="6" style="vertical-align: middle;line-height:40px;">显示用的名称</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="14">
          <el-form-item label="描述" prop="album_description">
            <el-input
              v-model="updateAlbumForm.album_description"
              type="textarea"
              :rows="3"
              placeholder="相册描述"
              class="input"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6" style="vertical-align: middle;line-height:40px;">最长不超50个字符</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="14">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="updateAlbumForm.sort" class="input" />
          </el-form-item>
        </el-col>
        <el-col :span="6" style="vertical-align: middle;line-height:40px;">数值越大,顺序靠前,默认100</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button type="primary" @click="submitForm('updateAlbumForm')">修改相册</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button @click="resetForm('updateAlbumForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { updateAlbum } from '@/api/picture/album'
import { debounce } from '@/utils'
import { mapGetters } from 'vuex'
export default
{
  // 组件名称
  name: 'UpdateAlbumForm',
  // 组件
  components:
    {
    },
  props:
    {
      beforeAlbumForm: {
        type: Object,
        default: () =>
        {
          return {
            id: 0,
            sort: 100,
            album_name: '',
            album_description: '',
            album_type: 10
          }
        }
      },
      updateAlbumData: {
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
      is_admin: false,
      albumType: [
        { value: 0, label: '系统相册' },
        { value: 10, label: '管理员相册' },
        { value: 20, label: '用户相册' }
      ],
      // 添加菜单表单
      updateAlbumForm: {
        id: 0,
        sort: 100,
        album_name: '',
        album_description: '',
        album_type: 10
      },
      // 添加表单规则
      updateAlbumRules: {
        sort: [
          { required: false, trigger: 'blur' },
          { pattern: /^[0-9]{1,10}$/, message: '只能0-9的数字', trigger: 'blur' }
        ],
        album_name: [
          { type: 'string', required: true, message: '请填写显示名称', trigger: 'blur' },
          { pattern: /^([\u4e00-\u9fa5\W]|[\w]){2,50}$/, message: '只能是汉字,字母,数字和_组成,且不得少于2个', trigger: 'blur' }
        ],
        album_type: [
          { required: true, message: '请选择相册类型', trigger: 'change' }
        ],
        album_description: [
          { type: 'string', message: '请写相册描述', trigger: 'blur' },
          { pattern: /\S{1,50}/, message: '不能超过50个字符', trigger: 'blur' }
        ]
      }
    }
  },
  // 计算属性
  computed:
  {
    ...mapGetters(['roles'])
  },
  // 监听
  watch:
  {
    beforeAlbumForm: {
      handler(value)
      {
        this.updateAlbumForm.id = value.id
        this.updateAlbumForm.album_name = value.album_name
        this.updateAlbumForm.sort = value.sort
        this.updateAlbumForm.album_description = value.album_description
        this.updateAlbumForm.album_type = value.album_type
      },
      deep: true,
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

  },
  // 挂载之前
  beforeMount()
  {

  },
  // 挂载 --常用
  mounted()
  {
    /* console.log(this.roles) */
    if (this.roles.includes('develop') || this.roles.includes('super') || this.roles.includes('admin'))
    {
      this.is_admin = 1
    }
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
    initAlbumForm()
    {
      this.$refs.updateAlbumForm.resetFields()
    },
    // 提交表单
    submitForm: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          this.updateAlbum(this.updateAlbumForm)
        }
        else
        {
          console.log('未通过验证!')
          return false
        }
      })
    }, 600),

    // 重置表单
    resetForm(formName)
    {
      this.initAlbumForm()
    },

    /**
     * 修改菜单
     */
    updateAlbum(data)
    {
      const that = this
      updateAlbum(data).then(res =>
      {
        /*  console.log(res) */
        if (res && res.code === 0)
        {
          that.$emit('update:updateAlbumData', res.data)
          that.event.$emit('closeDialog', false)
          that.$message(
            {
              message: res.msg,
              type: 'success'
            })
          that.initAlbumForm()
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
/**表单 */
.select,
.input {
  width: 250px;
}
</style>
