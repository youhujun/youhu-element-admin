<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-09-22 14:51:37
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-05-26 17:55:41
 * @LastEditTime: 2021-09-23 18:51:53
-->
<template>
  <div>
    <el-form
      ref="addClassForm"
      :model="addClassForm"
      :rules="addClassRules"
      label-width="150px"
      :inline="true"
      label-position="left"
      status-icon
      inline-message
      style="width:80%;margin-left:auto;margin-right: auto;padding:30px 20px;"
    >
      <el-row type="flex" justify="center">
        <el-col :span="14">
          <el-form-item label="分类名称" prop="goods_class_name">
            <el-input v-model="addClassForm.goods_class_name" placeholder="名称" class="input" />
          </el-form-item>
        </el-col>
        <el-col :span="10" style="vertical-align: middle;line-height:40px;">显示用的名称</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="14">
          <el-form-item label="分类代码" prop="goods_class_code">
            <el-input v-model="addClassForm.goods_class_code" placeholder="代码" class="input" />
          </el-form-item>
        </el-col>
        <el-col :span="10" style="vertical-align: middle;line-height:40px;">分类标识代码</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="14">
          <el-form-item label="分润比例" prop="rate">
            <el-input v-model="addClassForm.rate" class="input" />
          </el-form-item>
        </el-col>
        <el-col :span="10" style="vertical-align: middle;line-height:40px;">分配利润的比例%,默认0,不分配</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="14">
          <el-form-item label="是否需要资质证书" prop="is_certificate">
            <el-select v-model="addClassForm.is_certificate" placeholder="请选择" class="select">
              <el-option
                v-for="item in certificateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" style="vertical-align: middle;line-height:40px;">选择资质证书</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="资质证书数量" prop="certificate_number">
            <el-input v-model="addClassForm.certificate_number" placeholder="填写" class="input" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="14">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="addClassForm.sort" class="input" />
          </el-form-item>
        </el-col>
        <el-col :span="10" style="vertical-align: middle;line-height:40px;">数值越大,顺序靠前,默认100</el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item label="备注信息" prop="remark_info">
            <el-input
              v-model="addClassForm.remark_info"
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
          <el-form-item label="分类图片" prop="goods_class_picture_id">
            <UploadSinglePicture
              :picture-id.sync="addClassForm.goods_class_picture_id"
              show-content="分类图片"
              :upload-data="{id:0, use_type:20, file_type: '', save_path: 'picture'}"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button type="primary" @click="submitForm('addClassForm')">添加分类</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item>
            <el-button @click="resetForm('addClassForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import UploadSinglePicture from '@/pages/component/upload/uploadSinglePicture'
import { addGoodsClass } from '@/api/system/group/goodsClass'
import { debounce } from '@/utils'
export default
{
  // 组件名称
  name: 'AddClassForm',
  // 组件
  components:
    {
      UploadSinglePicture
    },
  props:
    {
      newAddClassFrom: {
        type: Object,
        default: null
      }
    },
  // 数据
  data()
  {
    return {
      // 添加菜单表单
      addClassForm: {
        id: 0,
        parent_id: 0,
        deep: 1,
        sort: 100,
        // 分类分润
        rate: 0,
        // 分类名称
        goods_class_name: '',
        // 分类代码
        goods_class_code: '',
        // 是否需要资质证书
        is_certificate: 0,
        // 需要证书数量
        certificate_number: 0,
        // 备注信息
        remark_info: '',
        // 分类图片id
        goods_class_picture_id: null

      },
      // 添加表单规则
      addClassRules: {
        sort: [
          { required: true, message: '必须有排序', trigger: 'blur' },
          { pattern: /^[0-9]{1,10}$/, message: '只能0-9的数字', trigger: 'blur' }
        ],
        rate: [
          { pattern: /^[0-9]{1,3}$/, message: '只能0-9的数字', trigger: 'blur' }
        ],
        goods_class_name: [
          { type: 'string', required: true, message: '请填写显示名称', trigger: 'blur' },
          { pattern: /^([\u4e00-\u9fa5\W]|[a-zA-Z0-9_]){2,10}$/, message: '只能以字母,数字,汉字和_这种字符组成,不低于2位', trigger: 'blur' }
        ],
        goods_class_code: [
          { type: 'string', required: true, message: '请填写代码标识', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_]{1,10}$/, message: '只能以字母,数字和_字符组成,不低于1位', trigger: 'blur' }
        ]
      },
      // 证书选项
      certificateOptions: [{ value: 0, label: '否' }, { value: 1, label: '是' }]
    }
  },
  // 计算属性
  computed:
  {
  },
  // 监听
  watch:
  {
    newAddClassFrom:
    {
      handler(value)
      {
        if (value)
        {
          this.addClassForm.parent_id = value.parent_id
          this.addClassForm.deep = value.deep
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
    initClassForm()
    {
      this.$refs.addClassForm.resetFields()
    },
    // 提交表单
    submitForm: debounce(function(formName)
    {
      this.$refs[formName].validate((valid) =>
      {
        if (valid)
        {
          this.addGoodsClass(this.addClassForm)
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
      this.initClassForm()
    },

    /**
     * 添加用户级别
     */
    addGoodsClass(data)
    {
      const that = this
      addGoodsClass(data).then(res =>
      {
        if (res && res.code === 0)
        {
          that.$store.dispatch('goodsClass/getTreeGoodsClass', res.data)
          that.$emit('handleCloseDialog', false)
          that.$message(
            {
              message: res.msg,
              type: 'success'
            })
          that.initClassForm()
        }
      })
    }

  }
}
</script>
<style lang='scss' scoped>
/**表单 */
.input,
.select {
  width: 200px;
}
  .info{
   width: 400px;
 }
</style>
