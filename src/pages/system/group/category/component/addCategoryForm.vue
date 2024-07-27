<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-09-22 14:51:37
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-08-30 14:25:53
 * @LastEditTime: 2021-09-23 18:51:53
-->
<template>
  <div>
    <el-form
      ref="addCategoryForm"
      :model="addCategoryForm"
      :rules="addCategoryRules"
      label-width="110px"
      :inline="true"
      label-position="left"
      status-icon
      inline-message
      style="width:80%;margin-left:auto;margin-right: auto;padding:30px 20px;"
    >
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="分类名称" prop="category_name">
            <el-input v-model="addCategoryForm.category_name" placeholder="名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">显示用的名称</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="分类代码标识" prop="category_code">
            <el-input v-model="addCategoryForm.category_code" placeholder="代码标识" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">代码里面使用</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="addCategoryForm.sort" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">数值越大,顺序靠前,默认100</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="分润比例" prop="rate">
            <el-input v-model="addCategoryForm.rate" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">分配利润的比例,默认0,不分配</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="备注信息" prop="remark_info">
            <el-input
              v-model="addCategoryForm.remark_info"
              type="textarea"
              :rows="1"
              :autosize="{ minRows: 2, maxRows: 6 }"
              placeholder="请输入内容"
              maxlength="30"
              show-word-limit
              class="info"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24" class="center">
          <el-form-item label="分类图片" prop="category_picture_id">
            <UploadSinglePicture
              :picture-id.sync="addCategoryForm.category_picture_id"
              :upload-data="{id:0, use_type:20, file_type: '', save_path: 'picture'}"
              show-content="分类图片"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button type="primary" @click="submitForm('addCategoryForm')">添加分类</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button @click="resetForm('addCategoryForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import UploadSinglePicture from '@/pages/component/upload/uploadSinglePicture'
import { addCategory } from '@/api/system/group/category'
import { debounce } from '@/utils'
export default
{
  // 组件名称
  name: 'AddCategoryForm',
  // 组件
  components:
    {
      UploadSinglePicture
    },
  props:
    {
      newAddCategoryFrom: {
        type: Object,
        default: null
      }
    },
  // 数据
  data()
  {
    return {
      // 添加菜单表单
      addCategoryForm: {
        id: 0,
        // 父级
        parent_id: 0,
        // 深度
        deep: 1,
        // 排序
        sort: 100,
        // 分润比例%
        rate: 0,
        // 分类名称
        category_name: '',
        // 分类代码标识
        category_code: '',
        // 分类代码标识
        remark_info: '',
        // 分类代码标识
        category_picture_id: null
      },
      // 添加表单规则
      addCategoryRules: {
        sort: [
          { required: true, message: '必须有排序', trigger: 'blur' },
          { pattern: /^[0-9]{1,10}$/, message: '只能0-9的数字', trigger: 'blur' }
        ],
        rate: [
          { pattern: /^[0-9]{1,3}$/, message: '只能0-9的数字', trigger: 'blur' }
        ],
        category_name: [
          { type: 'string', required: true, message: '请填写显示名称', trigger: 'blur' },
          { pattern: /^([\u4e00-\u9fa5\W]|[a-zA-Z0-9_]){2,60}$/, message: '只能以字母,数字,汉字和_这种字符组成,不低于2位', trigger: 'blur' }
        ],
        category_code: [
          { type: 'string', required: true, message: '请填写显示名称', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_]{1,60}$/, message: '只能以字母,数字,汉字和_这种字符组成,不低于1位', trigger: 'blur' }
        ]
      }
    }
  },
  // 计算属性
  computed:
  {
  },
  // 监听
  watch:
  {
    newAddCategoryFrom:
    {
      handler(value)
      {
        if (value)
        {
          this.addCategoryForm.parent_id = value.parent_id
          this.addCategoryForm.deep = value.deep
        }
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
    initCategoryForm()
    {
      this.$refs.addCategoryForm.resetFields()
    },
    // 提交表单
    submitForm: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          this.addCategory(this.addCategoryForm)
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
      this.initCategoryForm()
    },

    /**
     * 添加用户级别
     */
    addCategory(data)
    {
      const that = this
      addCategory(data).then(res =>
      {
        if (res && res.code === 0)
        {
          that.$store.dispatch('category/getTreeCategory')
          that.$emit('handleCloseDialog', false)
          that.$message(
            {
              message: res.msg,
              type: 'success'
            })
          that.initCategoryForm()
        }
      })
    }

  }
}
</script>
<style lang='scss' scoped>
/**表单 */
 .content::v-deep .el-form-item__label{
   width:150px;
 }
 .info{
   width: 400px;
 }
</style>
