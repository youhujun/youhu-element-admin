// 充值设置
const RechargeConfig = {
  current_page: 1,
  data: [
    {
      start_time: '2023-02-13 14:05:14',
      end_time: '2023-02-13 14:05:14',
      sort: 100,
      is_default: 1,
      amount: 60,
      coin: 500000,
      title: '测五',
      description: 'ceshi6',
      time_type: '月',
      region_type: '全国',
      type: '账户',
      user_avatar: [
        { album_picture:
          {
            picture_path: '\\config\avatar\\',
            picture_file: 'avatar.gif'
          }
        }
      ]
    },
    {
      start_time: '2023-02-13 14:05:14',
      end_time: '2023-02-13 14:05:14',
      sort: 100,
      is_default: 0,
      amount: 60,
      coin: 500000,
      title: '测试四',
      description: 'ceshi6',
      time_type: '月',
      region_type: '全国',
      type: '账户',
      user_avatar: []
    },
    {
      start_time: '2023-02-13 14:05:14',
      end_time: '2023-02-13 14:05:14',
      sort: 100,
      is_default: 1,
      amount: 60,
      coin: 500000,
      title: '测试三',
      description: 'ceshi6',
      time_type: '月',
      region_type: '全国',
      type: '账户',
      user_avatar: []
    }
  ],
  last_page: 1,
  per_page: 10,
  to: 4,
  total: 4
}

module.exports = [
  {
    url: '/getRechargeConfig',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '获取充值列表成功',
        data: RechargeConfig,
        download: null
      }
    }
  },
  {
    url: '/addRechargeConfig',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '添加充值列表成功'
      }
    }
  },
  {
    url: '/multipleDeleteadRechargeConfig',
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
    url: '/updateRechargeConfig',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '修改充值列表成功'
      }
    }
  },
  {
    url: '/deleteadRechargeConfig',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '刪除充值列表成功'
      }
    }
  }
]
