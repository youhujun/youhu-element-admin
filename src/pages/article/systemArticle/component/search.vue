<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-03-10 13:37:41
 * @LastEditors: YouHuJun
 * @LastEditTime: 2022-09-29 16:51:45
-->
<template>
  <div>
    <!-- 标题 -->
    <el-row :gutter="30" type="flex">
      <el-col :span="24">
        <el-input v-model="where.find" clearable placeholder="请输入要查找的标题" class="input-with-select">
          <template slot="prepend">公告标题</template>
          <el-button slot="append" icon="el-icon-search" @click="handleSearchFind()" />
        </el-input>
      </el-col>
    </el-row>
    <!-- 标题end -->
    <!-- 时间 -->
    <el-row type="flex">
      <el-col :span="12">
        <!-- 发布时间 -->
        <el-row type="flex">
          <el-tag style="height:2.26rem;line-height:2.26rem;" type="info">发布时间</el-tag>
          <el-date-picker
            v-model="where.timeRangePublish"
            type="datetimerange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptionsPublish"
            @change="handleSelectTimePublish()"
          />
        </el-row>
      </el-col>
      <el-col :span="12">
        <!-- 创建时间 -->
        <el-row type="flex">
          <el-tag style="height:2.25rem;line-height:2.125rem;" type="info">创建时间</el-tag>
          <el-date-picker
            v-model="where.timeRangeCreate"
            type="datetimerange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
            @change="handleSelectTimeCreate()"
          />
        </el-row>
      </el-col>
    </el-row>
    <!-- 时间end -->
    <!-- 分类标签置顶发布 -->
    <el-row>
      <el-col :span="6">
        <el-row>
          <el-tag class="tag-top" type="info">选择分类</el-tag>
          <el-cascader
            ref="category"
            v-model="where.category_id"
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
        </el-row>

      </el-col>
      <el-col :span="6">
        <el-row>
          <el-tag class="tag-top" type="info">选择标签</el-tag>
          <el-cascader
            ref="label"
            v-model="where.label_id"
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
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row>
          <el-tag class="tag-top" type="info">置顶</el-tag>
          <el-select v-model="where.is_top" placeholder="是否置顶" clearable>
            <el-option
              v-for="item in optionsTop"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row>
          <el-tag class="tag-top" type="info">发布</el-tag>
          <el-select v-model="where.status" placeholder="是否发布" clearable>
            <el-option
              v-for="item in optionsPublish"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-row>
      </el-col>
    </el-row>
    <!-- 分类标签置顶发布end-->
    <!-- 排序搜索 -->
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-tag class="tag-top" type="info">排序</el-tag>
          <el-select v-model="where.sortType" placeholder="请选择排序方式" style="margin-right:0.5rem;" @change="handleSortChange()">
            <el-option
              v-for="item in sortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row type="flex" justify="end">
          <el-button type="primary" @click="handleToSearch()">搜索</el-button>
        </el-row>
      </el-col>
    </el-row>
    <!-- 排序搜索end -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import { throttle } from '@/utils'
export default
{
  // 组件名称
  name: 'Search',
  // 组件
  components:
  {
  },
  props:
  {

  },
  // 数据
  data()
  {
    return {
      // 搜索显示列表条件
      where: {
        // 标题
        find: '',
        // 发布时间
        timeRangePublish: [],
        // 创建时间
        timeRangeCreate: [],
        // 分类选择默认数组
        category_id: [],
        // 分类id 处理完的id数组
        categoryArray: [],
        // 标签选择默认数组
        label_id: [],
        // 标签id 处理完的id数组
        labelArray: [],
        // 是否置顶
        is_top: '',
        // 是否发布
        status: '',
        // 排序方式
        sortType: '4'
      },
      // 选择发布时间
      pickerOptionsPublish:
      {
        shortcuts: [{
          text: '最近一周',
          onClick(picker)
          {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker)
          {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker)
          {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      // 选择创建时间
      pickerOptions:
      {
        disabledDate(time)
        {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '最近一周',
          onClick(picker)
          {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker)
          {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker)
          {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      // 选择是否置顶状态
      optionsTop: [{
        value: '0',
        label: '未指顶'
      }, {
        value: '1',
        label: '已置顶'
      }],
      // 选择是否发布状态
      optionsPublish: [{
        value: '0',
        label: '未发布'
      }, {
        value: '1',
        label: '已发布'
      }],
      // 排序选项
      sortOptions: [{
        value: '1',
        label: '发布时间从早到晚'
      }, {
        value: '2',
        label: '发布时间从晚到早'
      }, {
        value: '3',
        label: '创建时间从早到晚'
      }, {
        value: '4',
        label: '创建时间从晚到早'
      }]
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
          if (element.category_name === '系统文章')
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
    // 单独执行查找标题
    handleSearchFind: throttle(function()
    {
      this.$emit('handleChangeSearch', this.where)
    }, 1000),
    // 执行搜索
    handleToSearch: throttle(function()
    {
      this.$emit('handleChangeSearch', this.where)
    }, 1000),
    // 选择标签
    handleLabelChange(label)
    {
      const labelArray = []
      label.forEach(element =>
      {
        // console.log(element)
        labelArray.push(element[element.length - 1])
      })
      this.where.labelArray = labelArray
    },
    // 选择分类
    handleCategoryChange(category)
    {
      const categoryArray = []
      category.forEach(element =>
      {
        // console.log(element)
        categoryArray.push(element[element.length - 1])
      })
      this.where.categoryArray = categoryArray
    },
    // 选择发布时间范围
    handleSelectTimePublish(label)
    {
      // console.log(this.where.timeRangePuslish)
    },
    // 选择创建时间范围
    handleSelectTimeCreate()
    {
      // console.log(this.where.timeRangeCreate)
    }
  }
}
</script>
<style lang='scss' scoped>
.el-row {
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
.tag-top
{
  height:2.26rem;
  line-height:2.26rem;
}
</style>
