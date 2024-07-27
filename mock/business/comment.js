// 评论设置
const CommentConfig = {
  current_page: 1,
  data: [
    {
      sort: 100,
      is_default: 1,
      comment_type: '测五',
      comment: 'ceshi6'
    },
    {
      sort: 100,
      is_default: 0,
      comment_type: '测试四',
      comment: 'ceshi6'
    },
    {
      sort: 100,
      is_default: 1,
      comment_type: '测试三',
      comment: 'ceshi6'
    }
  ],
  last_page: 1,
  per_page: 10,
  to: 3,
  total: 3
}

module.exports = [
  {
    url: '/getCommentConfig',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '获取P评论列表成功',
        data: CommentConfig,
        download: null
      }
    }
  },
  {
    url: '/addCommentConfig',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '添加评论列表成功'
      }
    }
  },
  {
    url: '/multipleDeleteadCommentConfig',
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
    url: '/updateCommentConfig',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '修改评论列表成功'
      }
    }
  },
  {
    url: '/deleteadCommentConfig',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '刪除评论列表成功'
      }
    }
  }
]
