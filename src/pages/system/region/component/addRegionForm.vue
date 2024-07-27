<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-09-22 14:51:37
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-09-06 09:03:40
 * @LastEditTime: 2021-09-23 18:51:53
-->
<template>
  <div>
    <el-form
      ref="addRegionForm"
      :model="addRegionForm"
      :rules="addRegionRules"
      label-width="120px"
      :inline="true"
      label-position="left"
      status-icon
      inline-message
      style="width:98%;margin-left:auto;margin-right: auto;padding:30px 20px;"
    >
      <el-row type="flex" justify="center">
        <el-col :span="16" class="center">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="addRegionForm.sort" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">数值越大,顺序靠前,默认100</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="16" class="center">
          <el-form-item label="地区名称" prop="region_name">
            <el-input v-model="addRegionForm.region_name" placeholder="名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="vertical-align: middle;line-height:40px;">显示用的名称</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button type="primary" @click="submitForm('addRegionForm')">添加地区</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button @click="resetForm('addRegionForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { addRegion } from '@/api/system/region/region'
import { debounce } from '@/utils'
export default
{
  // 组件名称
  name: 'AddRegionForm',
  // 组件
  components:
    {
    },
  props:
    {
      newAddRegionFrom: {
        type: Object,
        default: null
      }
    },
  // 数据
  data()
  {
    return {
      // 添加菜单表单
      addRegionForm: {
        id: 0,
        parent_id: 0,
        deep: 1,
        sort: 100,
        region_name: ''
      },
      // 添加表单规则
      addRegionRules: {
        sort: [
          { required: true, message: '必须有排序', trigger: 'blur' },
          { pattern: /^[0-9]{1,10}$/, message: '只能0-9的数字', trigger: 'blur' }
        ],
        region_name: [
          { type: 'string', required: true, message: '请填写显示名称', trigger: 'blur' },
          { pattern: /^([\u4e00-\u9fa5]|[a-zA-Z0-9_]){2,10}$/, message: '只能是汉字、数字、字母或_组成,不低于2位', trigger: 'blur' }

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
    newAddRegionFrom:
    {
      handler(value)
      {
        if (value)
        {
          this.addRegionForm.parent_id = value.parent_id
          this.addRegionForm.deep = value.deep
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
    initRegionForm()
    {
      this.$refs.addRegionForm.resetFields()
    },
    // 提交表单
    submitForm: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          this.addRegion(this.addRegionForm)
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
      this.initRegionForm()
    },

    /**
     * 添加地区
     */
    addRegion(data)
    {
      const that = this
      addRegion(data).then(res =>
      {
        if (res && res.code === 0)
        {
          that.$store.dispatch('region/getTreeRegions')
          that.$emit('handleCloseDialog', false)

          that.$message(
            {
              message: res.msg,
              type: 'success'
            })
          that.initRegionForm()
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
 .center {
  text-align: center;
 }
</style>
