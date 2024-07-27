/*
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-05-23 15:19:35
 * @LastEditors: liujintong liujintong941003@163.com
 * @LastEditTime: 2023-03-16 15:49:53
 */

const tokens = {
  develop: {
    token: 'develop-token'
  },
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'develop-token': {
    roles: ['develop'],
    introduction: 'I am a super developer',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super developer'
  },
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

const userLevelData = [
  {
    id: 1,
    revision: 0,
    updated_time: 0,
    deleted_at: null,
    deleted_time: 0,
    switch: 1,
    parent_id: 0,
    sort: 100,
    deep: 1,
    role_id: 1,
    is_level: 0,
    level_type: 0,
    item_number: 0,
    param_is_rate: 0,
    param_number: 0,
    level_picture_id: 0,
    level_name: '黄金',
    level_code: 'glod',
    remark_info: '',
    picture: null
  }
]

const userData = {
  'current_page': 1,
  'data': [
    {
      'id': 5,
      'revision': 0,
      'created_at': '2022-03-04 15:27:55',
      'updated_at': '0000-00-00 00:00:00',
      'deleted_at': null,
      'created_time': 1646378875,
      'updated_time': 0,
      'deleted_time': 0,
      'switch': 1,
      'level_id': 0,
      'account_name': 'user',
      'password': '$2y$10$zSmQm9WmmoL61MaJvQM/c.fy6truqrVjstFnR5mTzcfPsRuonXTb6',
      'phone_area_code': '',
      'phone': null,
      'phone_verified_at': null,
      'phone_verified_time': 0,
      'email': null,
      'email_verified_at': null,
      'email_verified_time': 0,
      'remember_token': null,
      'auth_token': 'yOwq64eOD7MGOaM12Wiu',
      'user_info': {
        'id': 4,
        'user_id': 4,
        'revision': 0,
        'created_at': '2022-03-04 15:27:55',
        'created_time': 1646378875,
        'updated_at': '0000-00-00 00:00:00',
        'updated_time': 0,
        'deleted_at': null,
        'deleted_time': 0,
        'nick_name': 'user',
        'family_name': '',
        'name': '',
        'real_name': '',
        'id_number': null,
        'sex': 2,
        'solar_birthday_at': null,
        'solar_birthday_time': 0,
        'chinese_birthday_at': null,
        'chinese_birthday_time': 0,
        'introduction': 'I am an user',
        'authentication': 2,
        'flag': true
      },
      'user_avatar': [
        {
          'id': 4,
          'user_id': 4,
          'album_picture_id': 2,
          'revision': 0,
          'created_at': '2022-03-04 15:27:55',
          'created_time': 1646378875,
          'deleted_at': null,
          'deleted_time': 0,
          'is_default': 1,
          'album_picture': {
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
        }
      ],
      'user_address': [],
      'role': [
        {
          'id': 4,
          'revision': 0,
          'created_at': '2022-03-04 15:27:54',
          'updated_at': '0000-00-00 00:00:00',
          'deleted_at': null,
          'created_time': 1646378874,
          'updated_time': 0,
          'deleted_time': 0,
          'parent_id': 0,
          'role_name': '用户',
          'logic_name': 'user',
          'deep': 1,
          'sort': 100,
          'switch': 1,
          'pivot': {
            'user_id': 4,
            'role_id': 4
          }
        }
      ]
    },
    {
      'id': 1,
      'revision': 0,
      'created_at': '2022-03-04 15:27:55',
      'updated_at': '2022-03-07 08:41:43',
      'deleted_at': null,
      'created_time': 1646378874,
      'updated_time': 0,
      'deleted_time': 0,
      'switch': 1,
      'level_id': 0,
      'account_name': 'develop',
      'password': '$2y$10$r3e5WRT4pCDTAQ0kVn/rluD2Gpc7tQ2r0MXHV.uTVAbf.AKb7egkm',
      'phone_area_code': '',
      'phone': null,
      'phone_verified_at': null,
      'phone_verified_time': 0,
      'email': null,
      'email_verified_at': null,
      'email_verified_time': 0,
      'remember_token': 'LhkwCmXJHz8Z0MO7nOq8YxUbsakLrJtobqbu0hfcs3OOLziNufjfUa0jX44d',
      'auth_token': 'fMM7WTRnRbIdf9v2eIPi',
      'user_info': {
        'id': 1,
        'user_id': 1,
        'revision': 0,
        'created_at': '2022-03-04 15:27:55',
        'created_time': 1646378875,
        'updated_at': '0000-00-00 00:00:00',
        'updated_time': 0,
        'deleted_at': null,
        'deleted_time': 0,
        'nick_name': 'developer',
        'family_name': '',
        'name': '',
        'real_name': '',
        'id_number': null,
        'sex': 0,
        'solar_birthday_at': null,
        'solar_birthday_time': 0,
        'chinese_birthday_at': null,
        'chinese_birthday_time': 0,
        'introduction': 'I am a super developer',
        'authentication': 0,
        'flag': true
      },
      'user_avatar': [
        {
          'id': 1,
          'user_id': 1,
          'album_picture_id': 2,
          'revision': 0,
          'created_at': '2022-03-04 15:27:55',
          'created_time': 1646378875,
          'deleted_at': null,
          'deleted_time': 0,
          'is_default': 1,
          'album_picture': {
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
        }
      ],
      'user_address': [],
      'role': [
        {
          'id': 1,
          'revision': 0,
          'created_at': '2022-03-04 15:27:54',
          'updated_at': '0000-00-00 00:00:00',
          'deleted_at': null,
          'created_time': 1646378874,
          'updated_time': 0,
          'deleted_time': 0,
          'parent_id': 0,
          'role_name': '开发者',
          'logic_name': 'develop',
          'deep': 1,
          'sort': 100,
          'switch': 1,
          'pivot': {
            'user_id': 1,
            'role_id': 1
          }
        },
        {
          'id': 2,
          'revision': 0,
          'created_at': '2022-03-04 15:27:54',
          'updated_at': '0000-00-00 00:00:00',
          'deleted_at': null,
          'created_time': 1646378874,
          'updated_time': 0,
          'deleted_time': 0,
          'parent_id': 0,
          'role_name': '超级管理员',
          'logic_name': 'super',
          'deep': 1,
          'sort': 100,
          'switch': 1,
          'pivot': {
            'user_id': 1,
            'role_id': 2
          }
        },
        {
          'id': 3,
          'revision': 0,
          'created_at': '2022-03-04 15:27:54',
          'updated_at': '0000-00-00 00:00:00',
          'deleted_at': null,
          'created_time': 1646378874,
          'updated_time': 0,
          'deleted_time': 0,
          'parent_id': 0,
          'role_name': '管理员',
          'logic_name': 'admin',
          'deep': 1,
          'sort': 100,
          'switch': 1,
          'pivot': {
            'user_id': 1,
            'role_id': 3
          }
        },
        {
          'id': 4,
          'revision': 0,
          'created_at': '2022-03-04 15:27:54',
          'updated_at': '0000-00-00 00:00:00',
          'deleted_at': null,
          'created_time': 1646378874,
          'updated_time': 0,
          'deleted_time': 0,
          'parent_id': 0,
          'role_name': '用户',
          'logic_name': 'user',
          'deep': 1,
          'sort': 100,
          'switch': 1,
          'pivot': {
            'user_id': 1,
            'role_id': 4
          }
        }
      ]
    },
    {
      'id': 6,
      'revision': 0,
      'created_at': '2022-03-04 15:27:55',
      'updated_at': '0000-00-00 00:00:00',
      'deleted_at': null,
      'created_time': 1646378874,
      'updated_time': 0,
      'deleted_time': 0,
      'switch': 1,
      'level_id': 0,
      'account_name': 'super',
      'password': '$2y$10$2DBb2mZ5h1k5a87Btfn.POekxllpaENMwPYMa5FlKRwWV3eHpEMB6',
      'phone_area_code': '',
      'phone': null,
      'phone_verified_at': null,
      'phone_verified_time': 0,
      'email': null,
      'email_verified_at': null,
      'email_verified_time': 0,
      'remember_token': null,
      'auth_token': 'vSt0VR5QMlZmY6mp3HHC',
      'user_info': {
        'id': 2,
        'user_id': 2,
        'revision': 0,
        'created_at': '2022-03-04 15:27:55',
        'created_time': 1646378875,
        'updated_at': '0000-00-00 00:00:00',
        'updated_time': 0,
        'deleted_at': null,
        'deleted_time': 0,
        'nick_name': 'superAdmin',
        'family_name': '',
        'name': '',
        'real_name': '',
        'id_number': null,
        'sex': 1,
        'solar_birthday_at': null,
        'solar_birthday_time': 0,
        'chinese_birthday_at': null,
        'chinese_birthday_time': 0,
        'introduction': 'I am a super administrator',
        'authentication': 1,
        'flag': false
      },
      'user_avatar': [
        {
          'id': 2,
          'user_id': 2,
          'album_picture_id': 2,
          'revision': 0,
          'created_at': '2022-03-04 15:27:55',
          'created_time': 1646378875,
          'deleted_at': null,
          'deleted_time': 0,
          'is_default': 1,
          'album_picture': {
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
        }
      ],
      'user_address': [],
      'role': [
        {
          'id': 2,
          'revision': 0,
          'created_at': '2022-03-04 15:27:54',
          'updated_at': '0000-00-00 00:00:00',
          'deleted_at': null,
          'created_time': 1646378874,
          'updated_time': 0,
          'deleted_time': 0,
          'parent_id': 0,
          'role_name': '超级管理员',
          'logic_name': 'super',
          'deep': 1,
          'sort': 100,
          'switch': 1,
          'pivot': {
            'user_id': 2,
            'role_id': 2
          }
        },
        {
          'id': 3,
          'revision': 0,
          'created_at': '2022-03-04 15:27:54',
          'updated_at': '0000-00-00 00:00:00',
          'deleted_at': null,
          'created_time': 1646378874,
          'updated_time': 0,
          'deleted_time': 0,
          'parent_id': 0,
          'role_name': '管理员',
          'logic_name': 'admin',
          'deep': 1,
          'sort': 100,
          'switch': 1,
          'pivot': {
            'user_id': 2,
            'role_id': 3
          }
        },
        {
          'id': 4,
          'revision': 0,
          'created_at': '2022-03-04 15:27:54',
          'updated_at': '0000-00-00 00:00:00',
          'deleted_at': null,
          'created_time': 1646378874,
          'updated_time': 0,
          'deleted_time': 0,
          'parent_id': 0,
          'role_name': '用户',
          'logic_name': 'user',
          'deep': 1,
          'sort': 100,
          'switch': 1,
          'pivot': {
            'user_id': 2,
            'role_id': 4
          }
        }
      ]
    },
    {
      'id': 3,
      'revision': 0,
      'created_at': '2022-03-04 15:27:55',
      'updated_at': '0000-00-00 00:00:00',
      'deleted_at': null,
      'created_time': 1646378874,
      'updated_time': 0,
      'deleted_time': 0,
      'switch': 1,
      'level_id': 0,
      'account_name': 'admin',
      'password': '$2y$10$k/jrGNoT3XjxEnvGN82K6.EM/3mwqAHrjy4NnDmQKPjV8321boTsS',
      'phone_area_code': '',
      'phone': null,
      'phone_verified_at': null,
      'phone_verified_time': 0,
      'email': null,
      'email_verified_at': null,
      'email_verified_time': 0,
      'remember_token': null,
      'auth_token': 'Pm9gHI68UVnzoSB7aKA3',
      'user_info': {
        'id': 5,
        'user_id': 3,
        'revision': 0,
        'created_at': '2022-03-04 15:27:55',
        'created_time': 1646378875,
        'updated_at': '0000-00-00 00:00:00',
        'updated_time': 0,
        'deleted_at': null,
        'deleted_time': 0,
        'nick_name': 'admin',
        'family_name': '',
        'name': '',
        'real_name': '',
        'id_number': null,
        'sex': 1,
        'solar_birthday_at': null,
        'solar_birthday_time': 0,
        'chinese_birthday_at': null,
        'chinese_birthday_time': 0,
        'introduction': 'I am an administrator',
        'authentication': 2,
        'flag': true
      },
      'user_avatar': [
        {
          'id': 3,
          'user_id': 3,
          'album_picture_id': 2,
          'revision': 0,
          'created_at': '2022-03-04 15:27:55',
          'created_time': 1646378875,
          'deleted_at': null,
          'deleted_time': 0,
          'is_default': 1,
          'album_picture': {
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
        }
      ],
      'user_address': [],
      'role': [
        {
          'id': 3,
          'revision': 0,
          'created_at': '2022-03-04 15:27:54',
          'updated_at': '0000-00-00 00:00:00',
          'deleted_at': null,
          'created_time': 1646378874,
          'updated_time': 0,
          'deleted_time': 0,
          'parent_id': 0,
          'role_name': '管理员',
          'logic_name': 'admin',
          'deep': 1,
          'sort': 100,
          'switch': 1,
          'pivot': {
            'user_id': 3,
            'role_id': 3
          }
        },
        {
          'id': 5,
          'revision': 0,
          'created_at': '2022-03-04 15:27:54',
          'updated_at': '0000-00-00 00:00:00',
          'deleted_at': null,
          'created_time': 1646378874,
          'updated_time': 0,
          'deleted_time': 0,
          'parent_id': 0,
          'role_name': '用户',
          'logic_name': 'user',
          'deep': 1,
          'sort': 100,
          'switch': 1,
          'pivot': {
            'user_id': 3,
            'role_id': 4
          }
        }
      ]
    }
  ],
  'first_page_url': 'http://api.develop.com/api/v1/users?page=1',
  'from': 1,
  'last_page': 1,
  'last_page_url': 'http://api.develop.com/api/v1/users?page=1',
  'links': [
    {
      'url': null,
      'label': '&laquo; Previous',
      'active': false
    },
    {
      'url': 'http://api.develop.com/api/v1/users?page=1',
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
  'path': 'http://api.develop.com/api/v1/users',
  'per_page': 10,
  'prev_page_url': null,
  'to': 4,
  'total': 4
}

const addUserData = {
  'id': 5,
  'revision': 0,
  'created_at': '2022-03-07 00:49:14',
  'updated_at': '0000-00-00 00:00:00',
  'deleted_at': null,
  'created_time': 1646614154,
  'updated_time': 0,
  'deleted_time': 0,
  'switch': 1,
  'level_id': 0,
  'account_name': '08805414b645',
  'password': '$2y$10$9m4HChVAmhAAxeERoC0BoOCeSuXKEttOggmzb7hybRkMRdCdfMub6',
  'phone_area_code': '',
  'phone': '15688523140',
  'phone_verified_at': null,
  'phone_verified_time': 0,
  'email': null,
  'email_verified_at': null,
  'email_verified_time': 0,
  'remember_token': null,
  'auth_token': 'brMtUGMK652Hhq3pzBFe',
  'user_info': {
    'id': 5,
    'user_id': 5,
    'revision': 0,
    'created_at': '2022-03-07 00:49:14',
    'created_time': 1646614154,
    'updated_at': '0000-00-00 00:00:00',
    'updated_time': 0,
    'deleted_at': null,
    'deleted_time': 0,
    'nick_name': '',
    'family_name': '',
    'name': '',
    'real_name': '',
    'id_number': null,
    'sex': 0,
    'solar_birthday_at': null,
    'solar_birthday_time': 0,
    'chinese_birthday_at': null,
    'chinese_birthday_time': 0,
    'introduction': ''
  },
  'user_avatar': [
    {
      'id': 5,
      'user_id': 5,
      'album_picture_id': 2,
      'revision': 0,
      'created_at': '2022-03-07 00:49:14',
      'created_time': 1646614154,
      'deleted_at': null,
      'deleted_time': 0,
      'is_default': 0,
      'album_picture': {
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
    }
  ],
  'user_address': [
    {
      'id': 1,
      'user_id': 5,
      'revision': 0,
      'created_at': '2022-03-07 00:49:14',
      'created_time': 1646614154,
      'updated_at': '0000-00-00 00:00:00',
      'updated_time': 0,
      'deleted_at': null,
      'deleted_time': 0,
      'is_default': 1,
      'country_id': 0,
      'province_id': 0,
      'region_id': 0,
      'city_id': 0,
      'towns_id': 0,
      'village_id': 0,
      'address_info': '',
      'address_type': 0
    }
  ],
  'role': [
    {
      'id': 4,
      'revision': 0,
      'created_at': '2022-03-04 15:27:54',
      'updated_at': '0000-00-00 00:00:00',
      'deleted_at': null,
      'created_time': 1646378874,
      'updated_time': 0,
      'deleted_time': 0,
      'parent_id': 0,
      'role_name': '用户',
      'logic_name': 'user',
      'deep': 1,
      'sort': 100,
      'switch': 1,
      'pivot': {
        'user_id': 5,
        'role_id': 4
      }
    }
  ]
}

const disableUser = {
  'id': 5,
  'revision': 1,
  'created_at': '2022-03-07 00:49:14',
  'updated_at': '2022-03-07 02:29:59',
  'deleted_at': null,
  'created_time': 1646614154,
  'updated_time': 1646620199,
  'deleted_time': 0,
  'switch': 0,
  'level_id': 0,
  'account_name': '08805414b645',
  'password': '$2y$10$9m4HChVAmhAAxeERoC0BoOCeSuXKEttOggmzb7hybRkMRdCdfMub6',
  'phone_area_code': '',
  'phone': '15688523140',
  'phone_verified_at': null,
  'phone_verified_time': 0,
  'email': null,
  'email_verified_at': null,
  'email_verified_time': 0,
  'remember_token': null,
  'auth_token': 'brMtUGMK652Hhq3pzBFe',
  'user_info': {
    'id': 5,
    'user_id': 5,
    'revision': 0,
    'created_at': '2022-03-07 00:49:14',
    'created_time': 1646614154,
    'updated_at': '0000-00-00 00:00:00',
    'updated_time': 0,
    'deleted_at': null,
    'deleted_time': 0,
    'nick_name': '',
    'family_name': '',
    'name': '',
    'real_name': '',
    'id_number': null,
    'sex': 0,
    'solar_birthday_at': null,
    'solar_birthday_time': 0,
    'chinese_birthday_at': null,
    'chinese_birthday_time': 0,
    'introduction': ''
  },
  'user_avatar': [
    {
      'id': 5,
      'user_id': 5,
      'album_picture_id': 2,
      'revision': 0,
      'created_at': '2022-03-07 00:49:14',
      'created_time': 1646614154,
      'deleted_at': null,
      'deleted_time': 0,
      'is_default': 0,
      'album_picture': {
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
    }
  ],
  'user_address': [
    {
      'id': 1,
      'user_id': 5,
      'revision': 0,
      'created_at': '2022-03-07 00:49:14',
      'created_time': 1646614154,
      'updated_at': '0000-00-00 00:00:00',
      'updated_time': 0,
      'deleted_at': null,
      'deleted_time': 0,
      'is_default': 1,
      'country_id': 0,
      'province_id': 0,
      'region_id': 0,
      'city_id': 0,
      'towns_id': 0,
      'village_id': 0,
      'address_info': '',
      'address_type': 0
    }
  ],
  'role': [
    {
      'id': 4,
      'revision': 0,
      'created_at': '2022-03-04 15:27:54',
      'updated_at': '0000-00-00 00:00:00',
      'deleted_at': null,
      'created_time': 1646378874,
      'updated_time': 0,
      'deleted_time': 0,
      'parent_id': 0,
      'role_name': '用户',
      'logic_name': 'user',
      'deep': 1,
      'sort': 100,
      'switch': 1,
      'pivot': {
        'user_id': 5,
        'role_id': 4
      }
    }
  ]
}

const updateUser = {
  'id': 5,
  'revision': 2,
  'created_at': '2022-03-07 00:49:14',
  'updated_at': '2022-03-07 10:34:26',
  'deleted_at': null,
  'created_time': 1646614154,
  'updated_time': 1646620466,
  'deleted_time': 0,
  'switch': 0,
  'level_id': 0,
  'account_name': '08805414b645',
  'password': '$2y$10$cUA2DGaSdDhvEu0DHNzlNuQbkkyO/E3R5.QfY3nJfvwFjAj3RixBq',
  'phone_area_code': '',
  'phone': '15688523140',
  'phone_verified_at': null,
  'phone_verified_time': 0,
  'email': null,
  'email_verified_at': null,
  'email_verified_time': 0,
  'remember_token': null,
  'auth_token': 'brMtUGMK652Hhq3pzBFe',
  'user_info': {
    'id': 5,
    'user_id': 5,
    'revision': 1,
    'created_at': '2022-03-07 00:49:14',
    'created_time': 1646614154,
    'updated_at': '2022-03-07 10:34:26',
    'updated_time': 1646620466,
    'deleted_at': null,
    'deleted_time': 0,
    'nick_name': '',
    'family_name': '',
    'name': '',
    'real_name': '哈哈',
    'id_number': null,
    'sex': 0,
    'solar_birthday_at': null,
    'solar_birthday_time': 0,
    'chinese_birthday_at': null,
    'chinese_birthday_time': 0,
    'introduction': ''
  },
  'user_avatar': [
    {
      'id': 5,
      'user_id': 5,
      'album_picture_id': 2,
      'revision': 0,
      'created_at': '2022-03-07 00:49:14',
      'created_time': 1646614154,
      'deleted_at': null,
      'deleted_time': 0,
      'is_default': 0,
      'album_picture': {
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
    }
  ],
  'user_address': [
    {
      'id': 1,
      'user_id': 5,
      'revision': 1,
      'created_at': '2022-03-07 00:49:14',
      'created_time': 1646614154,
      'updated_at': '2022-03-07 10:34:26',
      'updated_time': 1646620466,
      'deleted_at': null,
      'deleted_time': 0,
      'is_default': 1,
      'country_id': 0,
      'province_id': 0,
      'region_id': 0,
      'city_id': 0,
      'towns_id': 0,
      'village_id': 0,
      'address_info': '',
      'address_type': 0
    }
  ],
  'role': [
    {
      'id': 4,
      'revision': 0,
      'created_at': '2022-03-04 15:27:54',
      'updated_at': '0000-00-00 00:00:00',
      'deleted_at': null,
      'created_time': 1646378874,
      'updated_time': 0,
      'deleted_time': 0,
      'parent_id': 0,
      'role_name': '用户',
      'logic_name': 'user',
      'deep': 1,
      'sort': 100,
      'switch': 1,
      'pivot': {
        'user_id': 5,
        'role_id': 4
      }
    }
  ]
}
module.exports = [
  // user login
  {
    url: '/login',
    type: 'post',
    response: config =>
    {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token)
      {
        return {
          code: 60204,
          // msg: 'Account and password are incorrect.'
          msg: '账户和密码不正确'
        }
      }

      return {
        code: 0,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/info\.*',
    type: 'get',
    response: config =>
    {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info)
      {
        return {
          code: 50008,
          // message: 'Login failed, unable to get user details.'
          msg: '登录失败'

        }
      }

      return {
        code: 0,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/logout',
    type: 'post',
    response: _ =>
    {
      return {
        code: 0,
        data: 'success'
      }
    }
  },
  {
    url: '/userLevels',
    type: 'get',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '获取用户级别成功',
        data: userLevelData
      }
    }
  },
  {
    url: '/users',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '获取用户成功',
        data: userData
      }
    }
  },
  {
    url: '/addUser',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '添加用户成功',
        data: addUserData
      }
    }
  },
  {
    url: '/deleteUser',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '删除成功'
      }
    }
  },
  {
    url: '/multipleDeleteUser',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '批量删除用户成功'
      }
    }
  },
  {
    url: '/disableUser',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '禁用用户成功',
        data: disableUser
      }
    }
  },
  {
    url: '/multipleDisableUser',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '批量禁用用户成功',
        data: disableUser
      }
    }
  },
  {
    url: '/updateUser',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '更新用户成功',
        data: updateUser
      }
    }
  }

]
