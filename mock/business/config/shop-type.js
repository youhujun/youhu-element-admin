// 店铺类型
const shopTypeList = {
  current_page: 1,
  data: [
    {
      created_at: '2023-02-13 14:05:14',
      sort: 100,
      is_default: 1,
      shop_type_number: 6,
      shop_type_name: '测试六',
      shop_type_code: 'ceshi6'
    },
    {
      id: 5,
      revision: 0,
      created_at: '2023-02-13 10:48:41',
      created_time: 1676256521,
      updated_at: '0000-00-00 00:00:00',
      updated_time: 0,
      deleted_at: null,
      deleted_time: 0,
      sort: 5,
      is_default: 1,
      shop_type_number: 5,
      shop_type_name: '测试五',
      shop_type_code: 'ceshi5'
    },
    {
      id: 3,
      revision: 0,
      created_at: '2023-02-13 10:47:48',
      created_time: 1676256468,
      updated_at: '0000-00-00 00:00:00',
      updated_time: 0,
      deleted_at: null,
      deleted_time: 0,
      sort: 3,
      is_default: 1,
      shop_type_number: 3,
      shop_type_name: '测试三',
      shop_type_code: 'ceshi3'
    },
    {
      id: 2,
      revision: 0,
      created_at: '2023-02-13 10:45:58',
      created_time: 1676256358,
      updated_at: '0000-00-00 00:00:00',
      updated_time: 0,
      deleted_at: null,
      deleted_time: 0,
      sort: 2,
      is_default: 0,
      shop_type_number: 2,
      shop_type_name: '测试二',
      shop_type_code: 'ceshi2'
    }
  ],
  first_page_url: 'https://api.youhujun.com/api/v1/getShopType?page=1',
  from: 1,
  last_page: 1,
  last_page_url: 'https://api.youhujun.com/api/v1/getShopType?page=1',
  links: [
    {
      url: null,
      label: '&laquo; Previous',
      active: false
    },
    {
      url: 'https://api.youhujun.com/api/v1/getShopType?page=1',
      label: '1',
      active: true
    },
    {
      url: null,
      label: 'Next &raquo;',
      active: false
    }
  ],
  next_page_url: null,
  path: 'https://api.youhujun.com/api/v1/getShopType',
  per_page: 10,
  prev_page_url: null,
  to: 4,
  total: 4
}

module.exports = [
  {
    url: '/getShopType',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '获取店铺类型成功',
        data: shopTypeList,
        download: null
      }
    }
  },
  {
    url: '/addShopType',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '添加店铺类型成功'
      }
    }
  },
  {
    url: '/downloadShopType',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '下载导入模板成功'
      }
    }
  },
  {
    url: '/multipleDeleteShopType',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '批量删除成功'
      }
    }
  },
  {
    url: '/updateShopType',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '修改店铺类型成功'
      }
    }
  },
  {
    url: '/deleteShopType',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '刪除店铺类型成功'
      }
    }
  }
]
