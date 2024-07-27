<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-09-22 14:51:37
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-09-05 16:05:11
 * @LastEditTime: 2021-09-23 18:51:53
-->
<template>
  <div>
    <el-form
      ref="addMenuForm"
      :model="addMenuForm"
      :rules="addMenuRules"
      label-width="220px"
      :inline="true"
      label-position="left"
      status-icon
      inline-message
      style="width:80%;margin-left:auto;margin-right: auto;padding:30px 20px;"
    >
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="addMenuForm.sort" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">数值越大,顺序靠前</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="菜单路径(path)" prop="path">
            <el-input v-model="addMenuForm.path" placeholder="/user" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">在路由中的path,顶级路径前缀/</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="菜单组件(component)" prop="component">
            <el-input v-model="addMenuForm.component" placeholder="Layout" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">在路由中的component</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="逻辑名称(name)" prop="name">
            <el-input v-model="addMenuForm.name" placeholder="user" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">在路由中的name</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="跳转路径(redirect)" prop="redirect">
            <el-input v-model="addMenuForm.redirect" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">如果不跳转填写noRedirect</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="显示名称(title)" prop="meta_title">
            <el-input v-model="addMenuForm.meta_title" placeholder="用户管理" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">显示名称title</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="图标标识(icon)" prop="meta_icon">
            <el-input v-model="addMenuForm.meta_icon" placeholder="peoples" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">示例:'svg-name'/'el-icon-x'</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="活动路由(activeMenu)" prop="meta_activeMenu">
            <el-input v-model="addMenuForm.meta_activeMenu" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">示例:'/example/list',一般不填</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="是否隐藏(hidden)" prop="hidden">
            <template>
              <el-radio v-model="addMenuForm.hidden" label="1">是</el-radio>
              <el-radio v-model="addMenuForm.hidden" label="0">否</el-radio>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">隐藏就不显示</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="是否总是显示(alwaysShow)" prop="alwaysShow">
            <template>
              <el-radio v-model="addMenuForm.alwaysShow" label="1">是</el-radio>
              <el-radio v-model="addMenuForm.alwaysShow" label="0">否</el-radio>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">始终显示出来</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="是否缓存(noCache)" prop="meta_noCache">
            <template>
              <el-radio v-model="addMenuForm.meta_noCache" label="1">是</el-radio>
              <el-radio v-model="addMenuForm.meta_noCache" label="0">否</el-radio>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">是否缓存路由</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="是否在固定在视图中(affix)" prop="affix">
            <template>
              <el-radio v-model="addMenuForm.meta_affix" label="1">是</el-radio>
              <el-radio v-model="addMenuForm.meta_affix" label="0">否</el-radio>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">在视图固定</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="是否在面包屑显示(breadcrumb)" prop="breadcrumb">
            <template>
              <el-radio v-model="addMenuForm.meta_breadcrumb" label="1">是</el-radio>
              <el-radio v-model="addMenuForm.meta_breadcrumb" label="0">否</el-radio>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">就是主页常驻那行面包屑</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button type="primary" @click="submitForm('addMenuForm')">添加菜单</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button @click="resetForm('addMenuForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { addMenu } from '@/api/system/permission/permission'
import { debounce } from '@/utils'
export default
{
  // 组件名称
  name: 'AddMenuForm',
  // 组件
  components:
    {
    },
  props:
    {
      newAddMenuFrom: {
        type: Object,
        default: null
      }
    },
  // 数据
  data()
  {
    return {
      // 添加菜单表单
      addMenuForm: {
        id: 0,
        parent_id: 0,
        deep: 1,
        sort: 100,
        path: '',
        component: '',
        name: '',
        redirect: '',
        hidden: '0',
        alwaysShow: '1',
        meta_title: '',
        meta_icon: '',
        meta_activeMenu: '',
        meta_noCache: '0',
        meta_affix: '0',
        meta_breadcrumb: '1'
      },
      // 添加表单规则
      addMenuRules: {
        path: [
          { type: 'string', required: true, message: '请输入路径', trigger: 'blur' },
          { pattern: /^([a-zA-Z0-9/_-]){3,60}$/, message: '只能以数字,字母和/_-组成,且不得低于3位', trigger: 'blur' }
        ],
        component: [
          { type: 'string', required: true, message: '请输入组件名称', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_-]{3,60}$/, message: '只能以数字,字母和_-组成,且不得低于3位', trigger: 'blur' }
        ],
        name: [
          { type: 'string', required: false },
          { pattern: /^([a-zA-Z0-9/_-]){3,60}$/, message: '只能以数字,字母和/_-组成,且不得低于3位', trigger: 'blur' }
        ],
        redirect: [
          { type: 'string', required: false },
          { pattern: /^([a-zA-Z0-9/_-]){3,60}$/, message: '只能以数字,字母和/_-组成,且不得低于3位', trigger: 'blur' }
        ],
        meta_title: [
          { type: 'string', required: true, message: '请输入标题显示名称', trigger: 'blur' },
          { pattern: /^([\u4e00-\u9fa5]|[a-zA-Z0-9_-])+$/, message: '只能是汉字、数字、字母或_-组成', trigger: 'blur' }
        ],
        meta_icon: [
          { pattern: /^[a-zA-Z-]{3,60}$/, message: '只能以字母和-这种字符组成,且不得低于3位', trigger: 'blur' }
        ],
        meta_activeMenu: [
          { pattern: /^[a-zA-Z-/_]{3,60}$/, message: '只能以字母和/_-这三种字符组成,且不得低于3位', trigger: 'blur' }
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
    newAddMenuFrom:
    {
      handler(value)
      {
        if (value)
        {
          this.addMenuForm.parent_id = value.parent_id
          this.addMenuForm.deep = value.deep
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
    async initRoutes()
    {
      const { roles } = await this.$store.dispatch('user/getInfo')
      await this.$store.dispatch('permission/generateRoutes', roles)
    },
    initMenuForm()
    {
      this.$refs.addMenuForm.resetFields()
    },
    // 提交表单
    submitForm: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          this.addMenu(this.addMenuForm)
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
      this.initMenuForm()
    },

    /**
     * 添加菜单
     */
    addMenu(data)
    {
      addMenu(data).then(response =>
      {
        if (response && response.code === 0)
        {
          this.initRoutes()
          this.$emit('handleCloseDialog', false)

          this.$message(
            {
              message: response.msg,
              type: 'success'
            })
          this.initMenuForm()
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
</style>
