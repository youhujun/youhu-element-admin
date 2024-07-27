/*
 * @Author: liujintong liujintong941003@163.com
 * @Date: 2023-02-07 11:16:43
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-02-15 10:21:00
 * @FilePath: \vue-element-admin-youhu\mock\article-manager\article.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const articleList = [
  {
    expand: '测试',
    title: '测试',
    created_at: '2023-2-15',
    published_at: '2023-2-15',
    publisher: {
      user_info: {
        nick_name: '测试'
      }
    },
    status: '1',
    is_top: '0'
  },
  {
    expand: '测试',
    title: '测试',
    created_at: '2023-2-15',
    published_at: '2023-2-15',
    publisher: {
      user_info: {
        nick_name: '测试'
      }
    },
    status: '1',
    is_top: '0'
  },
  {
    expand: '测试',
    title: '测试',
    created_at: '2023-2-15',
    published_at: '2023-2-15',
    publisher: {
      user_info: {
        nick_name: '测试'
      }
    },
    status: '0',
    is_top: '0'
  },
  {
    expand: '测试',
    title: '测试',
    created_at: '2023-2-15',
    published_at: '2023-2-15',
    publisher: {
      user_info: {
        nick_name: '测试'
      }
    },
    status: '0',
    is_top: '1'
  },
  {
    expand: '测试',
    title: '测试',
    created_at: '2023-2-15',
    published_at: '2023-2-15',
    publisher: {
      user_info: {
        nick_name: '测试'
      }
    },
    status: '1',
    is_top: '1'
  }
]

module.exports = [
  {
    url: '/getArticle',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '获取文章成功',
        data: articleList
      }
    }
  }
]
