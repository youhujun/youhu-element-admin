<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-09-22 14:51:37
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-07-20 16:34:28
 * @LastEditTime: 2021-09-23 18:51:53
-->
<template>
  <div>
    <el-form
      ref="addArticleForm"
      :model="addArticleForm"
      :rules="addArticleRules"
      label-width="100px"
      :inline="true"
      label-position="left"
      status-icon
      inline-message
      style="width:98%;margin-left:auto;margin-right: auto;padding:30px 20px;"
    >
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <div class="title">
            <el-form-item label="标题" prop="title">
              <el-input v-model="addArticleForm.title" maxlength="35" show-word-limit />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-form-item label="选择分类" prop="category_id">
            <el-cascader
              ref="category"
              v-model="addArticleForm.category_id"
              :options="noticeCategory"
              :props="{ expandTrigger: 'hover',value:'id',label:'category_name',leaf:'id',checkStrictly: true, multiple: true }"
              filterable
              clearable
              :show-all-levels="false"
              @change="handleCategoryChange"
            >
              <template slot-scope="{ node, data }">
                <span>{{ data.category_name }}</span>
                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
              </template>
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="选择标签" prop="label_id">
            <el-cascader
              ref="label"
              v-model="addArticleForm.label_id"
              :options="treeLabel"
              :props="{ expandTrigger: 'hover',value:'id',label:'label_name',leaf:'id',checkStrictly: true, multiple: true }"
              filterable
              clearable
              :show-all-levels="false"
              @change="handleLabelChange"
            >
              <template slot-scope="{ node, data }">
                <span>{{ data.label_name }}</span>
                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
              </template>
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否置顶" prop="is_top">
            <el-radio-group v-model="addArticleForm.is_top">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-form-item label="发布时间" prop="published_time">
            <el-date-picker v-model="addArticleForm.published_time" type="datetime" placeholder="设置发布时间" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="addArticleForm.sort" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24" :offset="0">
          <el-form-item prop="content" style="width:100%;" class="editor">
            <TEditor :value="addArticleForm.content" @handleChange="changeValue" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24" :push="11">
          <el-form-item>
            <el-button type="primary" @click="submitForm('addArticleForm')">提交</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import TEditor from '@/pages/component/editor'
import { addArticle } from '@/api/article/article'
import { debounce } from '@/utils'
import { mapGetters } from 'vuex'
export default
{
  // 组件名称
  name: 'AddArticleForm',
  // 组件
  components:
    {
      TEditor
    },
  props:
    {
      newAddArticleFrom: {
        type: Object,
        default: null
      }
    },
  // 数据
  data()
  {
    return {
      // 添加菜单表单
      addArticleForm: {
        id: 0,
        // 标题
        title: '',
        // 文章分类
        category_id: [],
        categoryArray: [],
        // 标签分类
        label_id: [],
        labelArray: [],
        // 是否置顶
        is_top: 0,
        // 发布时间
        published_time: '',
        // 排序 默认100
        sort: 100,
        // 类型1为公告
        type: 0,
        // 内容
        content: ''
      },
      // 添加表单规则
      addArticleRules: {
        title: [
          { required: true, message: '必须有标题', trigger: 'blur' },
          { pattern: /^[\S]{4,35}$/, message: '不得少于4个字符,不得多于35个字符', trigger: 'blur' }
        ],
        category_id: [
          { type: 'array', required: true, message: '请选择分类', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '必须有内容', trigger: 'blur' }
        ]
      },
      // 时间快捷选项
      pickerOptions: {
        disabledDate(time)
        {
          return time.getTime() < Date.now()
        },
        shortcuts: [
          {
            text: '明天',
            onClick(picker)
            {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '后天',
            onClick(picker)
            {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 2)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周后',
            onClick(picker)
            {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
      },
      // api 秘钥
      apiKey: ''
    }
  },
  // 计算属性
  computed:
  {
    ...mapGetters(['treeCategory', 'treeLabel']),

    noticeCategory()
    {
      const category = []

      if (this.treeCategory.length >= 1)
      {
        this.treeCategory.forEach(element =>
        {
          if (element.category_name === '公告通知')
          {
            category[0] = element
          }
        })
      }
      return category
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
    initArticleForm()
    {
      this.addArticleForm = {
        id: 0,
        title: '',
        category_id: [],
        categoryArray: [],
        label_id: [],
        labelArray: [],
        is_top: 0,
        published_time: '',
        sort: 100,
        type: 1,
        content: ''
      }
    },
    changeValue(data)
    {
      this.addArticleForm.content = data
    },
    handleCategoryChange(category)
    {
      // console.log(role)
      const categoryArray = []
      category.forEach(element =>
      {
        // console.log(element)
        categoryArray.push(element[element.length - 1])
      })

      this.addArticleForm.categoryArray = categoryArray
    },
    handleLabelChange(label)
    {
      // console.log(role)
      const labelArray = []
      label.forEach(element =>
      {
        // console.log(element)
        labelArray.push(element[element.length - 1])
      })

      this.addArticleForm.labelArray = labelArray
    },
    // 提交表单
    submitForm: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          /*  console.log(this.addArticleForm) */
          this.addArticle(this.addArticleForm)
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
      this.initArticleForm()
    },

    /**
     * 添加菜单
     */
    addArticle(data)
    {
      const _this = this
      addArticle(data).then(res =>
      {
        if (res && res.code === 0)
        {
          _this.initArticleForm()
          _this.$message(
            {
              message: res.msg,
              type: 'success'
            })
          _this.$emit('hanldeAddData', true)
          _this.$emit('handleCloseDialog', false)
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
/**表单 */
.title::v-deep .el-form-item{
  width:90%
}

.title::v-deep .el-form-item__content{
  width:100%
}
 .content::v-deep .el-form-item__label{
   width:150px;
 }

 .editor::v-deep .el-form-item__content
 {
    width: 100%;
 }

</style>

