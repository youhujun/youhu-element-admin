/*
 * @Author: liujintong liujintong941003@163.com
 * @Date: 2023-02-07 11:16:43
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-02-14 13:27:55
 * @FilePath: \vue-element-admin-youhu\mock\classes.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const result = [
  {
    id: 2,
    revision: 0,
    created_at: '2022-02-24 16:42:13',
    created_time: 1645692133,
    updated_at: '0000-00-00 00:00:00',
    updated_time: 0,
    classification_name: '测试产品',
    deleted_time: 0,
    switch: 0,
    sort: 100,
    parent_id: 0,
    deep: 1,
    rate: 0,
    class_name: '添加产品'
  }
]

module.exports = [
  {
    url: '/getTreeClass',
    type: 'get',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '获取产品分类成功',
        data: result
      }
    }
  },
  // 添加产品分类
  {
    url: '/addClass',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '添加产品分类成功',
        data: result
      }
    }
  },
  // 删除产品分类
  {
    url: '/deleteClass',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '删除产品分类成功',
        data: result
      }
    }
  },
  // 修改产品分类
  {
    url: '/updateClass',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '修改产品分类成功',
        data: result
      }
    }
  }
]
