/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2022-03-07 10:45:28
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-02-15 10:50:37
 */

const albumData = {
  'current_page': 1,
  'data': [
    {
      'id': 1,
      'user_id': 0,
      'revision': 0,
      'created_at': '2022-03-04 15:27:55',
      'created_time': 1646378875,
      'updated_at': '0000-00-00 00:00:00',
      'updated_time': 0,
      'deleted_at': null,
      'deleted_time': 0,
      'is_default': 1,
      'album_name': 'config',
      'album_description': '系统默认相册',
      'album_sort': 100,
      'cover_album_picture_id': 1,
      'album_type': 0,
      'album_picture': [
        {
          'id': 1,
          'user_id': 1,
          'album_id': 1,
          'revision': 0,
          'created_at': '2022-03-04 15:27:55',
          'updated_at': '0000-00-00 00:00:00',
          'deleted_at': null,
          'created_time': 1646378875,
          'updated_time': 0,
          'deleted_time': 0,
          'picture_name': 'album',
          'picture_tag': '',
          'picture_path': '\\config\\album\\',
          'picture_file': 'album.png',
          'picture_size': 11,
          'picture_spec': '80x80'
        },
        {
          'id': 2,
          'user_id': 1,
          'album_id': 1,
          'revision': 0,
          'created_at': '2022-03-04 15:27:55',
          'updated_at': '0000-00-00 00:00:00',
          'deleted_at': null,
          'created_time': 1646378875,
          'updated_time': 0,
          'deleted_time': 0,
          'picture_name': 'avatar',
          'picture_tag': '',
          'picture_path': '\\config\\avatar\\',
          'picture_file': 'avatar.gif',
          'picture_size': 57,
          'picture_spec': '658x494'
        }
      ],
      'cover_album_picture': {
        'id': 1,
        'user_id': 1,
        'album_id': 1,
        'revision': 0,
        'created_at': '2022-03-04 15:27:55',
        'updated_at': '0000-00-00 00:00:00',
        'deleted_at': null,
        'created_time': 1646378875,
        'updated_time': 0,
        'deleted_time': 0,
        'picture_name': 'album',
        'picture_tag': '',
        'picture_path': '\\config\\album\\',
        'picture_file': 'album.png',
        'picture_size': 11,
        'picture_spec': '80x80'
      }
    },
    {
      'id': 2,
      'user_id': 1,
      'revision': 0,
      'created_at': '2022-03-04 15:27:55',
      'created_time': 1646378875,
      'updated_at': '0000-00-00 00:00:00',
      'updated_time': 0,
      'deleted_at': null,
      'deleted_time': 0,
      'is_default': 1,
      'album_name': 'develop',
      'album_description': '默认相册',
      'album_sort': 100,
      'cover_album_picture_id': 1,
      'album_type': 1,
      'album_picture': [],
      'cover_album_picture': {
        'id': 1,
        'user_id': 1,
        'album_id': 1,
        'revision': 0,
        'created_at': '2022-03-04 15:27:55',
        'updated_at': '0000-00-00 00:00:00',
        'deleted_at': null,
        'created_time': 1646378875,
        'updated_time': 0,
        'deleted_time': 0,
        'picture_name': 'album',
        'picture_tag': '',
        'picture_path': '\\config\\album\\',
        'picture_file': 'album.png',
        'picture_size': 11,
        'picture_spec': '80x80'
      }
    }
  ],
  'first_page_url': 'http://api.develop.com/api/v1/getAlbum?page=1',
  'from': 1,
  'last_page': 1,
  'last_page_url': 'http://api.develop.com/api/v1/getAlbum?page=1',
  'links': [
    {
      'url': null,
      'label': '&laquo; Previous',
      'active': false
    },
    {
      'url': 'http://api.develop.com/api/v1/getAlbum?page=1',
      'label': '1',
      'active': true
    },
    {
      'url': null,
      'label': 'Next &raquo;',
      'active': false
    }
  ],
  'next_page_url': null,
  'path': 'http://api.develop.com/api/v1/getAlbum',
  'per_page': 12,
  'prev_page_url': null,
  'to': 2,
  'total': 2
}

const albumPictureData = {
  'current_page': 1,
  'data': [
    {
      'id': 1,
      'user_id': 1,
      'album_id': 1,
      'revision': 0,
      'created_at': '2022-03-04 15:27:55',
      'updated_at': '0000-00-00 00:00:00',
      'deleted_at': null,
      'created_time': 1646378875,
      'updated_time': 0,
      'deleted_time': 0,
      'picture_name': 'album',
      'picture_tag': '',
      'picture_path': '\\config\\album\\',
      'picture_file': 'album.png',
      'picture_size': 11,
      'picture_spec': '80x80'
    },
    {
      'id': 2,
      'user_id': 1,
      'album_id': 1,
      'revision': 0,
      'created_at': '2022-03-04 15:27:55',
      'updated_at': '0000-00-00 00:00:00',
      'deleted_at': null,
      'created_time': 1646378875,
      'updated_time': 0,
      'deleted_time': 0,
      'picture_name': 'avatar',
      'picture_tag': '',
      'picture_path': '\\config\\avatar\\',
      'picture_file': 'avatar.gif',
      'picture_size': 57,
      'picture_spec': '658x494'
    }
  ],
  'first_page_url': 'http://api.develop.com/api/v1/getAlbumPicture?page=1',
  'from': 1,
  'last_page': 1,
  'last_page_url': 'http://api.develop.com/api/v1/getAlbumPicture?page=1',
  'links': [
    {
      'url': null,
      'label': '&laquo; Previous',
      'active': false
    },
    {
      'url': 'http://api.develop.com/api/v1/getAlbumPicture?page=1',
      'label': '1',
      'active': true
    },
    {
      'url': null,
      'label': 'Next &raquo;',
      'active': false
    }
  ],
  'next_page_url': null,
  'path': 'http://api.develop.com/api/v1/getAlbumPicture',
  'per_page': 12,
  'prev_page_url': null,
  'to': 2,
  'total': 2
}

module.exports = [
  // mock get all routes form server
  {
    url: '/getAlbum',
    type: 'post',
    response: _ =>
    {
      return {
        code: 0,
        msg: '获取相册成功',
        data: albumData
      }
    }
  },
  {
    url: '/getAlbumPicture',
    type: 'post',
    response: _ =>
    {
      return {
        code: 0,
        msg: '获取图片成功',
        data: albumPictureData
      }
    }
  },
  {
    url: '/addAlbum',
    type: 'post',
    response: _ =>
    {
      return {
        code: 0,
        msg: '添加相册成功'
      }
    }
  },
  {
    url: '/uploadMultiplePicture',
    type: 'post',
    response: _ =>
    {
      return {
        code: 0,
        msg: '上传图片成功'
      }
    }
  },
  {
    url: '/deleteMultiplePicture',
    type: 'post',
    response: _ =>
    {
      return {
        code: 0,
        msg: '批量删除图片成功'
      }
    }
  },
  {
    url: '/moveMultipleAlbum',
    type: 'post',
    response: _ =>
    {
      return {
        code: 0,
        msg: '批量转移图片成功'
      }
    }
  },
  {
    url: '/moveAlbum',
    type: 'post',
    response: _ =>
    {
      return {
        code: 0,
        msg: '批量转移图片成功'
      }
    }
  },
  {
    url: '/deletePicture',
    type: 'post',
    response: _ =>
    {
      return {
        code: 0,
        msg: '批量转移图片成功'
      }
    }
  },
  {
    url: '/setCover',
    type: 'post',
    response: _ =>
    {
      return {
        code: 0,
        msg: '设为封面成功'
      }
    }
  }

]
