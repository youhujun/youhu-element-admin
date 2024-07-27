const result = [
  {
    id: 6,
    revision: 0,
    created_at: '2022-02-16 10:53:30',
    created_time: 1644980010,
    updated_at: '0000-00-00 00:00:00',
    updated_time: 0,
    deleted_at: null,
    deleted_time: 0,
    switch: 0,
    sort: 100,
    parent_id: 0,
    deep: 1,
    label_name: '添加',
    label_code: 1,
    children: [
      {
        id: 7,
        revision: 0,
        created_at: '2022-02-16 10:53:36',
        created_time: 1644980016,
        updated_at: '0000-00-00 00:00:00',
        updated_time: 0,
        deleted_at: null,
        deleted_time: 0,
        switch: 0,
        sort: 100,
        parent_id: 1,
        deep: 2,
        label_name: '添加',
        label_code: 1
      }
    ]
  }
]

module.exports = [
  {
    url: '/getTreeLabel',
    type: 'get',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '获取标签成功',
        data: result
      }
    }
  },
  // 添加标签
  {
    url: '/addLabel',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '添加标签分类成功',
        data: result
      }
    }
  },
  // 删除标签
  {
    url: '/deleteLabel',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '删除标签分类成功',
        data: result
      }
    }
  },
  // 修改标签
  {
    url: '/updateLabel',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '修改标签分类成功',
        data: result
      }
    }
  }
]
