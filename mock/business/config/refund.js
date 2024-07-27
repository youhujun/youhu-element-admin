const refundList = [
  {
    id: 1,
    revision: 0,
    created_at: '2023-02-14 15:15:50',
    created_time: 1676358950,
    updated_at: '0000-00-00 00:00:00',
    updated_time: 0,
    deleted_at: null,
    deleted_time: 0,
    sort: 100,
    parent_id: 0,
    deep: 1,
    title: '30分钟退款',
    execute_order: 0,
    is_condition: 0,
    is_receive: 0,
    is_arrive: 0,
    is_refund: 0,
    long_time: 0,
    refund_rate: 0,
    condition: 0,
    remark_info: '',
    children: [
      {
        id: 3,
        revision: 0,
        created_at: '2023-02-14 15:16:44',
        created_time: 1676359004,
        updated_at: '0000-00-00 00:00:00',
        updated_time: 0,
        deleted_at: null,
        deleted_time: 0,
        sort: 100,
        parent_id: 1,
        deep: 2,
        title: '',
        execute_order: 0,
        is_condition: 1,
        is_receive: 0,
        is_arrive: 0,
        is_refund: 0,
        long_time: 30,
        refund_rate: 0,
        condition: 40,
        remark_info: ''
      }
    ]
  }
]

module.exports = [
  {
    url: '/getBusinessRefundConfig',
    type: 'get',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '获取退款配置成功',
        data: refundList
      }
    }
  },
  {
    url: '/addBusinessRefundConfig',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '添加退款配置成功'
      }
    }
  },
  {
    url: '/updateBusinessRefundConfig',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '修改退款配置成功'
      }
    }
  },
  {
    url: '/deleteBusinessRefundConfig',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '删除退款配置成功'
      }
    }
  }
]
