// 店铺类型
const bankList = {
  current_page: 1,
  data: [
    {
      id: 10,
      revision: 0,
      created_at: '2023-02-13 10:32:04',
      created_time: 1676255524,
      updated_at: '0000-00-00 00:00:00',
      updated_time: 0,
      deleted_at: null,
      deleted_time: 0,
      bank_name: '交通银行',
      bank_code: 1,
      is_default: 1,
      sort: 100
    },
    {
      id: 9,
      revision: 0,
      created_at: '2023-02-13 10:32:04',
      created_time: 1676255524,
      updated_at: '0000-00-00 00:00:00',
      updated_time: 0,
      deleted_at: null,
      deleted_time: 0,
      bank_name: '民生银行',
      bank_code: 2,
      is_default: 1,
      sort: 100
    },
    {
      id: 8,
      revision: 0,
      created_at: '2023-02-13 10:32:04',
      created_time: 1676255524,
      updated_at: '0000-00-00 00:00:00',
      updated_time: 0,
      deleted_at: null,
      deleted_time: 0,
      bank_name: '华夏银行',
      bank_code: 3,
      is_default: 1,
      sort: 100
    },
    {
      id: 7,
      revision: 0,
      created_at: '2023-02-13 10:32:04',
      created_time: 1676255524,
      updated_at: '0000-00-00 00:00:00',
      updated_time: 0,
      deleted_at: null,
      deleted_time: 0,
      bank_name: '广发银行',
      bank_code: 4,
      is_default: 1,
      sort: 100
    },
    {
      id: 6,
      revision: 0,
      created_at: '2023-02-13 10:32:04',
      created_time: 1676255524,
      updated_at: '0000-00-00 00:00:00',
      updated_time: 0,
      deleted_at: null,
      deleted_time: 0,
      bank_name: '浦发银行',
      bank_code: 6,
      is_default: 1,
      sort: 100
    },
    {
      id: 5,
      revision: 0,
      created_at: '2023-02-13 10:32:04',
      created_time: 1676255524,
      updated_at: '0000-00-00 00:00:00',
      updated_time: 0,
      deleted_at: null,
      deleted_time: 0,
      bank_name: '招商银行',
      bank_code: 5,
      is_default: 1,
      sort: 100
    },
    {
      id: 4,
      revision: 0,
      created_at: '2023-02-13 10:32:04',
      created_time: 1676255524,
      updated_at: '0000-00-00 00:00:00',
      updated_time: 0,
      deleted_at: null,
      deleted_time: 0,
      bank_name: '建设银行',
      bank_code: 7,
      is_default: 1,
      sort: 100
    },
    {
      id: 3,
      revision: 0,
      created_at: '2023-02-13 10:32:04',
      created_time: 1676255524,
      updated_at: '0000-00-00 00:00:00',
      updated_time: 0,
      deleted_at: null,
      deleted_time: 0,
      bank_name: '工商银行',
      bank_code: 8,
      is_default: 1,
      sort: 100
    },
    {
      id: 2,
      revision: 0,
      created_at: '2023-02-13 10:32:04',
      created_time: 1676255524,
      updated_at: '0000-00-00 00:00:00',
      updated_time: 0,
      deleted_at: null,
      deleted_time: 0,
      bank_name: '农业银行',
      bank_code: 10,
      is_default: 1,
      sort: 100
    },
    {
      id: 1,
      revision: 0,
      created_at: '2023-02-13 10:32:04',
      created_time: 1676255524,
      updated_at: '0000-00-00 00:00:00',
      updated_time: 0,
      deleted_at: null,
      deleted_time: 0,
      bank_name: '中国银行',
      bank_code: 9,
      is_default: 1,
      sort: 100
    }
  ],
  first_page_url: 'https://api.youhujun.com/api/v1/getBank?page=1',
  from: 1,
  last_page: 2,
  last_page_url: 'https://api.youhujun.com/api/v1/getBank?page=2',
  links: [
    {
      url: null,
      label: '&laquo; Previous',
      active: false
    },
    {
      url: 'https://api.youhujun.com/api/v1/getBank?page=1',
      label: '1',
      active: true
    },
    {
      url: 'https://api.youhujun.com/api/v1/getBank?page=2',
      label: '2',
      active: false
    },
    {
      url: 'https://api.youhujun.com/api/v1/getBank?page=2',
      label: 'Next &raquo;',
      active: false
    }
  ],
  next_page_url: 'https://api.youhujun.com/api/v1/getBank?page=2',
  path: 'https://api.youhujun.com/api/v1/getBank',
  per_page: 10,
  prev_page_url: null,
  to: 10,
  total: 18
}

const bankNameList = [
  {
    id: 1,
    revision: 0,
    created_at: '2023-02-13 10:32:04',
    created_time: 1676255524,
    updated_at: '0000-00-00 00:00:00',
    updated_time: 0,
    deleted_at: null,
    deleted_time: 0,
    bank_name: '中国银行',
    bank_code: null,
    is_default: 1,
    sort: 100
  },
  {
    id: 2,
    revision: 0,
    created_at: '2023-02-13 10:32:04',
    created_time: 1676255524,
    updated_at: '0000-00-00 00:00:00',
    updated_time: 0,
    deleted_at: null,
    deleted_time: 0,
    bank_name: '农业银行',
    bank_code: null,
    is_default: 1,
    sort: 100
  },
  {
    id: 3,
    revision: 0,
    created_at: '2023-02-13 10:32:04',
    created_time: 1676255524,
    updated_at: '0000-00-00 00:00:00',
    updated_time: 0,
    deleted_at: null,
    deleted_time: 0,
    bank_name: '工商银行',
    bank_code: null,
    is_default: 1,
    sort: 100
  },
  {
    id: 4,
    revision: 0,
    created_at: '2023-02-13 10:32:04',
    created_time: 1676255524,
    updated_at: '0000-00-00 00:00:00',
    updated_time: 0,
    deleted_at: null,
    deleted_time: 0,
    bank_name: '建设银行',
    bank_code: null,
    is_default: 1,
    sort: 100
  },
  {
    id: 5,
    revision: 0,
    created_at: '2023-02-13 10:32:04',
    created_time: 1676255524,
    updated_at: '0000-00-00 00:00:00',
    updated_time: 0,
    deleted_at: null,
    deleted_time: 0,
    bank_name: '招商银行',
    bank_code: null,
    is_default: 1,
    sort: 100
  },
  {
    id: 6,
    revision: 0,
    created_at: '2023-02-13 10:32:04',
    created_time: 1676255524,
    updated_at: '0000-00-00 00:00:00',
    updated_time: 0,
    deleted_at: null,
    deleted_time: 0,
    bank_name: '浦发银行',
    bank_code: null,
    is_default: 1,
    sort: 100
  },
  {
    id: 7,
    revision: 0,
    created_at: '2023-02-13 10:32:04',
    created_time: 1676255524,
    updated_at: '0000-00-00 00:00:00',
    updated_time: 0,
    deleted_at: null,
    deleted_time: 0,
    bank_name: '广发银行',
    bank_code: null,
    is_default: 1,
    sort: 100
  },
  {
    id: 8,
    revision: 0,
    created_at: '2023-02-13 10:32:04',
    created_time: 1676255524,
    updated_at: '0000-00-00 00:00:00',
    updated_time: 0,
    deleted_at: null,
    deleted_time: 0,
    bank_name: '华夏银行',
    bank_code: null,
    is_default: 1,
    sort: 100
  },
  {
    id: 9,
    revision: 0,
    created_at: '2023-02-13 10:32:04',
    created_time: 1676255524,
    updated_at: '0000-00-00 00:00:00',
    updated_time: 0,
    deleted_at: null,
    deleted_time: 0,
    bank_name: '民生银行',
    bank_code: null,
    is_default: 1,
    sort: 100
  },
  {
    id: 10,
    revision: 0,
    created_at: '2023-02-13 10:32:04',
    created_time: 1676255524,
    updated_at: '0000-00-00 00:00:00',
    updated_time: 0,
    deleted_at: null,
    deleted_time: 0,
    bank_name: '交通银行',
    bank_code: null,
    is_default: 1,
    sort: 100
  },
  {
    id: 24,
    revision: 0,
    created_at: '2023-02-14 10:10:23',
    created_time: 0,
    updated_at: '0000-00-00 00:00:00',
    updated_time: 0,
    deleted_at: null,
    deleted_time: 0,
    bank_name: '支付宝',
    bank_code: 'alipay',
    is_default: 1,
    sort: 100
  }
]

module.exports = [
  {
    url: '/getBank',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '获取店铺类型成功',
        data: bankList,
        download: null
      }
    }
  },
  {
    url: '/defaultBank',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '获取银行卡类型成功',
        data: bankNameList
      }
    }
  },
  {
    url: '/addBank',
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
    url: '/downloadBank',
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
    url: '/multipleDeleteBank',
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
    url: '/updateBank',
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
    url: '/deleteBank',
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
