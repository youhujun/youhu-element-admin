const setList = [
  {
    id: 1,
    revision: 0,
    created_at: '2023-02-08 13:24:27',
    updated_at: '0000-00-00 00:00:00',
    deleted_at: null,
    created_time: 1675833867,
    updated_time: 0,
    deleted_time: 0,
    parent_id: 0,
    switch: 1,
    item_name: '提现设置',
    item_code: 'withdraw_config',
    value_type: 1,
    item_value: '',
    item_number: 6,
    item_price: '0.00000000',
    item_introduction: '提现手续费设置',
    deep: 1,
    sort: 100,
    is_label: 0
  },
  {
    id: 2,
    revision: 0,
    created_at: '2023-02-08 13:24:27',
    updated_at: '0000-00-00 00:00:00',
    deleted_at: null,
    created_time: 1675833867,
    updated_time: 0,
    deleted_time: 0,
    parent_id: 0,
    switch: 1,
    item_name: '路费扣除',
    item_code: 'traveling_expenses',
    value_type: 1,
    item_value: '',
    item_number: 6,
    item_price: '0.00000000',
    item_introduction: '提现手续费设置',
    deep: 1,
    sort: 100,
    is_label: 0
  },
  {
    id: 3,
    revision: 0,
    created_at: '2023-02-08 13:24:27',
    updated_at: '0000-00-00 00:00:00',
    deleted_at: null,
    created_time: 1675833867,
    updated_time: 0,
    deleted_time: 0,
    parent_id: 0,
    switch: 1,
    item_name: '订单转工单时间',
    item_code: 'transfer_work_order',
    value_type: 1,
    item_value: '',
    item_number: 30,
    item_price: '0.00000000',
    item_introduction: '技师30分钟不接单转为工单',
    deep: 1,
    sort: 100,
    is_label: 0
  },
  {
    id: 4,
    revision: 0,
    created_at: '2023-02-08 13:24:27',
    updated_at: '0000-00-00 00:00:00',
    deleted_at: null,
    created_time: 1675833867,
    updated_time: 0,
    deleted_time: 0,
    parent_id: 0,
    switch: 1,
    item_name: '首页技师推荐数',
    item_code: 'index_show_technician_number',
    value_type: 1,
    item_value: '',
    item_number: 3,
    item_price: '0.00000000',
    item_introduction: '首页技师推荐数',
    deep: 1,
    sort: 100,
    is_label: 0
  },
  {
    id: 5,
    revision: 0,
    created_at: '2023-02-08 13:24:27',
    updated_at: '0000-00-00 00:00:00',
    deleted_at: null,
    created_time: 1675833867,
    updated_time: 0,
    deleted_time: 0,
    parent_id: 0,
    switch: 1,
    item_name: '首页店铺推荐数',
    item_code: 'index_show_shop_number',
    value_type: 1,
    item_value: '',
    item_number: 3,
    item_price: '0.00000000',
    item_introduction: '首页店铺推荐数',
    deep: 1,
    sort: 100,
    is_label: 0
  }
]

module.exports = [
  {
    url: '/getBusinessSystemConfig',
    type: 'get',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '获取店铺类型成功',
        data: setList
      }
    }
  },
  {
    url: '/changeBusinessSystemConfig',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '添加店铺类型成功'
      }
    }
  }
]
