
const result = [
  {
    'id': 1,
    'revision': 0,
    'created_at': '2022-01-26 10:01:57',
    'created_time': 1643162517,
    'updated_at': '0000-00-00 00:00:00',
    'updated_time': 0,
    'deleted_at': null,
    'deleted_time': 0,
    'switch': 0,
    'sort': 100,
    'parent_id': 0,
    'deep': 1,
    'rate': 0,
    'category_name': '公告通知',
    'children': [
      {
        'id': 2,
        'revision': 0,
        'created_at': '2022-01-26 10:01:57',
        'created_time': 1643162517,
        'updated_at': '0000-00-00 00:00:00',
        'updated_time': 0,
        'deleted_at': null,
        'deleted_time': 0,
        'switch': 0,
        'sort': 100,
        'parent_id': 1,
        'deep': 2,
        'rate': 0,
        'category_name': '内部通知'
      },
      {
        'id': 3,
        'revision': 0,
        'created_at': '2022-01-26 10:01:57',
        'created_time': 1643162517,
        'updated_at': '0000-00-00 00:00:00',
        'updated_time': 0,
        'deleted_at': null,
        'deleted_time': 0,
        'switch': 0,
        'sort': 100,
        'parent_id': 1,
        'deep': 2,
        'rate': 0,
        'category_name': '外部公告'
      }
    ]
  }
]

module.exports =
[
  {
    url: '/getTreeCategory',
    type: 'get',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '获取文章分类成功',
        data: result
      }
    }
  },
  // 添加顶级分类
  {
    url: '/addCategory',
    type: 'post',
    response: (req, res) =>
    {
      // result.push({
      //   'id': 3,
      //   'revision': 0,
      //   'created_at': '2022-01-26 10:01:57',
      //   'created_time': 1643162517,
      //   'updated_at': '0000-00-00 00:00:00',
      //   'updated_time': 0,
      //   'deleted_at': null,
      //   'deleted_time': 0,
      //   'switch': 0,
      //   'sort': 100,
      //   'parent_id': 0,
      //   'deep': 1,
      //   'rate': 0,
      //   'category_name': '测试1',
      //   'children': [
      //     {
      //       'id': 4,
      //       'revision': 0,
      //       'created_at': '2022-01-26 10:01:57',
      //       'created_time': 1643162517,
      //       'updated_at': '0000-00-00 00:00:00',
      //       'updated_time': 0,
      //       'deleted_at': null,
      //       'deleted_time': 0,
      //       'switch': 0,
      //       'sort': 100,
      //       'parent_id': 1,
      //       'deep': 2,
      //       'rate': 0,
      //       'category_name': '测试2'
      //     }
      //   ]
      // })
      return {
        code: 0,
        msg: '添加文章成功',
        data: result
      }
    }
  },
  // 删除
  {
    url: '/deleteCategory',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '删除文章分类成功',
        data: result
      }
    }
  },
  // 修改文章分类
  {
    url: '/updateCategory',
    type: 'post',
    response: (req, res) =>
    {
      // result.splice(-1, 1, {
      //   'id': 5,
      //   'revision': 0,
      //   'created_at': '2022-01-26 10:01:57',
      //   'created_time': 1643162517,
      //   'updated_at': '0000-00-00 00:00:00',
      //   'updated_time': 0,
      //   'deleted_at': null,
      //   'deleted_time': 0,
      //   'switch': 0,
      //   'sort': 100,
      //   'parent_id': 0,
      //   'deep': 1,
      //   'rate': 0,
      //   'category_name': '修改1',
      //   'children': [
      //     {
      //       'id': 6,
      //       'revision': 0,
      //       'created_at': '2022-01-26 10:01:57',
      //       'created_time': 1643162517,
      //       'updated_at': '0000-00-00 00:00:00',
      //       'updated_time': 0,
      //       'deleted_at': null,
      //       'deleted_time': 0,
      //       'switch': 0,
      //       'sort': 100,
      //       'parent_id': 1,
      //       'deep': 2,
      //       'rate': 0,
      //       'category_name': '修改2'
      //     }
      //   ]
      // })
      return {
        code: 0,
        msg: '修改文章分类成功',
        data: result
      }
    }
  }
]
