// 管理员

const managerList = {
  current_page: 1,
  data: [
    {
      id: 4,
      user_id: 2,
      revision: 3,
      created_at: '2023-02-14 15:41:48',
      created_time: 1676360508,
      updated_at: '2023-02-14 15:50:01',
      updated_time: 1676361001,
      deleted_at: null,
      deleted_time: 0,
      switch: 0,
      user: {
        id: 2,
        revision: 1,
        created_at: '2023-02-13 10:32:04',
        updated_at: '2023-02-14 15:46:13',
        deleted_at: null,
        created_time: 1676255524,
        updated_time: 1676360773,
        deleted_time: 0,
        switch: 1,
        recommend_id: 0,
        parent_id: 1,
        level_id: 0,
        account_name: 'super',
        password:
          '$2y$10$OVLoGLZMq3YAXclIgEyKK.W60UmXVYF9p3QlKEYGNsgEk8c87lSG2',
        phone_area_code: '',
        phone: null,
        phone_verified_at: null,
        phone_verified_time: 0,
        email: null,
        email_verified_at: null,
        email_verified_time: 0,
        remember_token: null,
        auth_token: 'po9o8jo9WuWC0nHIIKVb',
        balance: '0.00',
        coin: '0.00',
        score: '0.00',
        deep: 1,
        is_real_auth: 0,
        auth_apply_at: '0000-00-00 00:00:00',
        auth_apply_time: 0,
        auth_at: '0000-00-00 00:00:00',
        auth_time: 0,
        user_info: {
          id: 2,
          user_id: 2,
          revision: 0,
          created_at: '2023-02-13 10:32:04',
          created_time: 1676255524,
          updated_at: '0000-00-00 00:00:00',
          updated_time: 0,
          deleted_at: null,
          deleted_time: 0,
          nick_name: 'superAdmin',
          family_name: '',
          name: '',
          real_name: '',
          id_number: null,
          sex: 1,
          solar_birthday_at: null,
          solar_birthday_time: 0,
          chinese_birthday_at: null,
          chinese_birthday_time: 0,
          introduction: 'I am a super administrator'
        },
        user_avatar: [
          {
            id: 2,
            user_id: 2,
            album_picture_id: 2,
            revision: 0,
            created_at: '2023-02-13 10:32:04',
            created_time: 1676255524,
            deleted_at: null,
            deleted_time: 0,
            is_default: 1,
            album_picture: {
              id: 2,
              user_id: 1,
              album_id: 1,
              revision: 0,
              created_at: '2023-02-13 10:32:04',
              updated_at: '0000-00-00 00:00:00',
              deleted_at: null,
              created_time: 1676255524,
              updated_time: 0,
              deleted_time: 0,
              picture_name: 'avatar',
              picture_tag: '',
              picture_path: '/config/avatar/',
              picture_file: 'avatar.gif',
              picture_size: 57,
              picture_spec: '658x494'
            }
          }
        ],
        user_address: [],
        role: [
          {
            id: 2,
            revision: 0,
            created_at: '2023-02-13 10:32:04',
            updated_at: '0000-00-00 00:00:00',
            deleted_at: null,
            created_time: 1676255524,
            updated_time: 0,
            deleted_time: 0,
            parent_id: 0,
            role_name: '超级管理员',
            logic_name: 'super',
            deep: 1,
            sort: 100,
            switch: 1,
            pivot: {
              user_id: 2,
              role_id: 2
            }
          },
          {
            id: 3,
            revision: 0,
            created_at: '2023-02-13 10:32:04',
            updated_at: '0000-00-00 00:00:00',
            deleted_at: null,
            created_time: 1676255524,
            updated_time: 0,
            deleted_time: 0,
            parent_id: 0,
            role_name: '管理员',
            logic_name: 'admin',
            deep: 1,
            sort: 100,
            switch: 1,
            pivot: {
              user_id: 2,
              role_id: 3
            }
          },
          {
            id: 3,
            revision: 0,
            created_at: '2023-02-13 10:32:04',
            updated_at: '0000-00-00 00:00:00',
            deleted_at: null,
            created_time: 1676255524,
            updated_time: 0,
            deleted_time: 0,
            parent_id: 0,
            role_name: '管理员',
            logic_name: 'admin',
            deep: 1,
            sort: 100,
            switch: 1,
            pivot: {
              user_id: 2,
              role_id: 3
            }
          },
          {
            id: 4,
            revision: 0,
            created_at: '2023-02-13 10:32:04',
            updated_at: '0000-00-00 00:00:00',
            deleted_at: null,
            created_time: 1676255524,
            updated_time: 0,
            deleted_time: 0,
            parent_id: 0,
            role_name: '用户',
            logic_name: 'user',
            deep: 1,
            sort: 100,
            switch: 1,
            pivot: {
              user_id: 2,
              role_id: 4
            }
          },
          {
            id: 4,
            revision: 0,
            created_at: '2023-02-13 10:32:04',
            updated_at: '0000-00-00 00:00:00',
            deleted_at: null,
            created_time: 1676255524,
            updated_time: 0,
            deleted_time: 0,
            parent_id: 0,
            role_name: '用户',
            logic_name: 'user',
            deep: 1,
            sort: 100,
            switch: 1,
            pivot: {
              user_id: 2,
              role_id: 4
            }
          }
        ]
      }
    },
    {
      id: 3,
      user_id: 3,
      revision: 0,
      created_at: '2023-02-13 10:32:04',
      created_time: 1676255524,
      updated_at: '0000-00-00 00:00:00',
      updated_time: 0,
      deleted_at: null,
      deleted_time: 0,
      switch: 1,
      user: {
        id: 3,
        revision: 0,
        created_at: '2023-02-13 10:32:04',
        updated_at: '0000-00-00 00:00:00',
        deleted_at: null,
        created_time: 1676255524,
        updated_time: 0,
        deleted_time: 0,
        switch: 1,
        recommend_id: 0,
        parent_id: 1,
        level_id: 0,
        account_name: 'admin',
        password:
          '$2y$10$LQ2OPke88KviXB9Wa1V2uO72YsZt8/ta55vwDlCoPs5fEM6.hVyau',
        phone_area_code: '',
        phone: null,
        phone_verified_at: null,
        phone_verified_time: 0,
        email: null,
        email_verified_at: null,
        email_verified_time: 0,
        remember_token: null,
        auth_token: 'dNkv8BMq8t47J3hqQzmu',
        balance: '0.00',
        coin: '0.00',
        score: '0.00',
        deep: 1,
        is_real_auth: 0,
        auth_apply_at: '0000-00-00 00:00:00',
        auth_apply_time: 0,
        auth_at: '0000-00-00 00:00:00',
        auth_time: 0,
        user_info: {
          id: 3,
          user_id: 3,
          revision: 0,
          created_at: '2023-02-13 10:32:04',
          created_time: 1676255524,
          updated_at: '0000-00-00 00:00:00',
          updated_time: 0,
          deleted_at: null,
          deleted_time: 0,
          nick_name: 'admin',
          family_name: '',
          name: '',
          real_name: '',
          id_number: null,
          sex: 1,
          solar_birthday_at: null,
          solar_birthday_time: 0,
          chinese_birthday_at: null,
          chinese_birthday_time: 0,
          introduction: 'I am an administrator'
        },
        user_avatar: [
          {
            id: 3,
            user_id: 3,
            album_picture_id: 2,
            revision: 0,
            created_at: '2023-02-13 10:32:04',
            created_time: 1676255524,
            deleted_at: null,
            deleted_time: 0,
            is_default: 1,
            album_picture: {
              id: 2,
              user_id: 1,
              album_id: 1,
              revision: 0,
              created_at: '2023-02-13 10:32:04',
              updated_at: '0000-00-00 00:00:00',
              deleted_at: null,
              created_time: 1676255524,
              updated_time: 0,
              deleted_time: 0,
              picture_name: 'avatar',
              picture_tag: '',
              picture_path: '/config/avatar/',
              picture_file: 'avatar.gif',
              picture_size: 57,
              picture_spec: '658x494'
            }
          }
        ],
        user_address: [],
        role: [
          {
            id: 3,
            revision: 0,
            created_at: '2023-02-13 10:32:04',
            updated_at: '0000-00-00 00:00:00',
            deleted_at: null,
            created_time: 1676255524,
            updated_time: 0,
            deleted_time: 0,
            parent_id: 0,
            role_name: '管理员',
            logic_name: 'admin',
            deep: 1,
            sort: 100,
            switch: 1,
            pivot: {
              user_id: 3,
              role_id: 3
            }
          },
          {
            id: 4,
            revision: 0,
            created_at: '2023-02-13 10:32:04',
            updated_at: '0000-00-00 00:00:00',
            deleted_at: null,
            created_time: 1676255524,
            updated_time: 0,
            deleted_time: 0,
            parent_id: 0,
            role_name: '用户',
            logic_name: 'user',
            deep: 1,
            sort: 100,
            switch: 1,
            pivot: {
              user_id: 3,
              role_id: 4
            }
          }
        ]
      }
    },
    {
      id: 2,
      user_id: 2,
      revision: 0,
      created_at: '2023-02-13 10:32:04',
      created_time: 1676255524,
      updated_at: '0000-00-00 00:00:00',
      updated_time: 0,
      deleted_at: null,
      deleted_time: 0,
      switch: 1,
      user: {
        id: 2,
        revision: 1,
        created_at: '2023-02-13 10:32:04',
        updated_at: '2023-02-14 15:46:13',
        deleted_at: null,
        created_time: 1676255524,
        updated_time: 1676360773,
        deleted_time: 0,
        switch: 1,
        recommend_id: 0,
        parent_id: 1,
        level_id: 0,
        account_name: 'super',
        password:
          '$2y$10$OVLoGLZMq3YAXclIgEyKK.W60UmXVYF9p3QlKEYGNsgEk8c87lSG2',
        phone_area_code: '',
        phone: null,
        phone_verified_at: null,
        phone_verified_time: 0,
        email: null,
        email_verified_at: null,
        email_verified_time: 0,
        remember_token: null,
        auth_token: 'po9o8jo9WuWC0nHIIKVb',
        balance: '0.00',
        coin: '0.00',
        score: '0.00',
        deep: 1,
        is_real_auth: 0,
        auth_apply_at: '0000-00-00 00:00:00',
        auth_apply_time: 0,
        auth_at: '0000-00-00 00:00:00',
        auth_time: 0,
        user_info: {
          id: 2,
          user_id: 2,
          revision: 0,
          created_at: '2023-02-13 10:32:04',
          created_time: 1676255524,
          updated_at: '0000-00-00 00:00:00',
          updated_time: 0,
          deleted_at: null,
          deleted_time: 0,
          nick_name: 'superAdmin',
          family_name: '',
          name: '',
          real_name: '',
          id_number: null,
          sex: 1,
          solar_birthday_at: null,
          solar_birthday_time: 0,
          chinese_birthday_at: null,
          chinese_birthday_time: 0,
          introduction: 'I am a super administrator'
        },
        user_avatar: [
          {
            id: 2,
            user_id: 2,
            album_picture_id: 2,
            revision: 0,
            created_at: '2023-02-13 10:32:04',
            created_time: 1676255524,
            deleted_at: null,
            deleted_time: 0,
            is_default: 1,
            album_picture: {
              id: 2,
              user_id: 1,
              album_id: 1,
              revision: 0,
              created_at: '2023-02-13 10:32:04',
              updated_at: '0000-00-00 00:00:00',
              deleted_at: null,
              created_time: 1676255524,
              updated_time: 0,
              deleted_time: 0,
              picture_name: 'avatar',
              picture_tag: '',
              picture_path: '/config/avatar/',
              picture_file: 'avatar.gif',
              picture_size: 57,
              picture_spec: '658x494'
            }
          }
        ],
        user_address: [],
        role: [
          {
            id: 2,
            revision: 0,
            created_at: '2023-02-13 10:32:04',
            updated_at: '0000-00-00 00:00:00',
            deleted_at: null,
            created_time: 1676255524,
            updated_time: 0,
            deleted_time: 0,
            parent_id: 0,
            role_name: '超级管理员',
            logic_name: 'super',
            deep: 1,
            sort: 100,
            switch: 1,
            pivot: {
              user_id: 2,
              role_id: 2
            }
          },
          {
            id: 3,
            revision: 0,
            created_at: '2023-02-13 10:32:04',
            updated_at: '0000-00-00 00:00:00',
            deleted_at: null,
            created_time: 1676255524,
            updated_time: 0,
            deleted_time: 0,
            parent_id: 0,
            role_name: '管理员',
            logic_name: 'admin',
            deep: 1,
            sort: 100,
            switch: 1,
            pivot: {
              user_id: 2,
              role_id: 3
            }
          },
          {
            id: 3,
            revision: 0,
            created_at: '2023-02-13 10:32:04',
            updated_at: '0000-00-00 00:00:00',
            deleted_at: null,
            created_time: 1676255524,
            updated_time: 0,
            deleted_time: 0,
            parent_id: 0,
            role_name: '管理员',
            logic_name: 'admin',
            deep: 1,
            sort: 100,
            switch: 1,
            pivot: {
              user_id: 2,
              role_id: 3
            }
          },
          {
            id: 4,
            revision: 0,
            created_at: '2023-02-13 10:32:04',
            updated_at: '0000-00-00 00:00:00',
            deleted_at: null,
            created_time: 1676255524,
            updated_time: 0,
            deleted_time: 0,
            parent_id: 0,
            role_name: '用户',
            logic_name: 'user',
            deep: 1,
            sort: 100,
            switch: 1,
            pivot: {
              user_id: 2,
              role_id: 4
            }
          },
          {
            id: 4,
            revision: 0,
            created_at: '2023-02-13 10:32:04',
            updated_at: '0000-00-00 00:00:00',
            deleted_at: null,
            created_time: 1676255524,
            updated_time: 0,
            deleted_time: 0,
            parent_id: 0,
            role_name: '用户',
            logic_name: 'user',
            deep: 1,
            sort: 100,
            switch: 1,
            pivot: {
              user_id: 2,
              role_id: 4
            }
          }
        ]
      }
    },
    {
      id: 1,
      user_id: 1,
      revision: 0,
      created_at: '2023-02-13 10:32:04',
      created_time: 1676255524,
      updated_at: '0000-00-00 00:00:00',
      updated_time: 0,
      deleted_at: null,
      deleted_time: 0,
      switch: 1,
      user: {
        id: 1,
        revision: 0,
        created_at: '2023-02-13 10:32:04',
        updated_at: '2023-02-14 15:31:10',
        deleted_at: null,
        created_time: 1676255524,
        updated_time: 0,
        deleted_time: 0,
        switch: 1,
        recommend_id: 0,
        parent_id: 0,
        level_id: 0,
        account_name: 'develop',
        password:
          '$2y$10$Wkpyx75wRyPCJdEwjdWuSORH1s1urZnaavVgnxNwHP/lcHUmS1vFe',
        phone_area_code: '',
        phone: null,
        phone_verified_at: null,
        phone_verified_time: 0,
        email: null,
        email_verified_at: null,
        email_verified_time: 0,
        remember_token:
          'evYHWDHsnqEo55lwKeYNtVFDnGciFHpAmLEPL3jx96ECQAavSbQaFyQjpDq7',
        auth_token: 'Yfg7mwcvpF0hwu6WwNyu',
        balance: '0.00',
        coin: '0.00',
        score: '0.00',
        deep: 0,
        is_real_auth: 0,
        auth_apply_at: '0000-00-00 00:00:00',
        auth_apply_time: 0,
        auth_at: '0000-00-00 00:00:00',
        auth_time: 0,
        user_info: {
          id: 1,
          user_id: 1,
          revision: 0,
          created_at: '2023-02-13 10:32:04',
          created_time: 1676255524,
          updated_at: '0000-00-00 00:00:00',
          updated_time: 0,
          deleted_at: null,
          deleted_time: 0,
          nick_name: 'developer',
          family_name: '',
          name: '',
          real_name: '',
          id_number: null,
          sex: 0,
          solar_birthday_at: null,
          solar_birthday_time: 0,
          chinese_birthday_at: null,
          chinese_birthday_time: 0,
          introduction: 'I am a super developer'
        },
        user_avatar: [
          {
            id: 1,
            user_id: 1,
            album_picture_id: 2,
            revision: 0,
            created_at: '2023-02-13 10:32:04',
            created_time: 1676255524,
            deleted_at: null,
            deleted_time: 0,
            is_default: 1,
            album_picture: {
              id: 2,
              user_id: 1,
              album_id: 1,
              revision: 0,
              created_at: '2023-02-13 10:32:04',
              updated_at: '0000-00-00 00:00:00',
              deleted_at: null,
              created_time: 1676255524,
              updated_time: 0,
              deleted_time: 0,
              picture_name: 'avatar',
              picture_tag: '',
              picture_path: '/config/avatar/',
              picture_file: 'avatar.gif',
              picture_size: 57,
              picture_spec: '658x494'
            }
          }
        ],
        user_address: [],
        role: [
          {
            id: 1,
            revision: 0,
            created_at: '2023-02-13 10:32:04',
            updated_at: '0000-00-00 00:00:00',
            deleted_at: null,
            created_time: 1676255524,
            updated_time: 0,
            deleted_time: 0,
            parent_id: 0,
            role_name: '开发者',
            logic_name: 'develop',
            deep: 1,
            sort: 100,
            switch: 1,
            pivot: {
              user_id: 1,
              role_id: 1
            }
          },
          {
            id: 2,
            revision: 0,
            created_at: '2023-02-13 10:32:04',
            updated_at: '0000-00-00 00:00:00',
            deleted_at: null,
            created_time: 1676255524,
            updated_time: 0,
            deleted_time: 0,
            parent_id: 0,
            role_name: '超级管理员',
            logic_name: 'super',
            deep: 1,
            sort: 100,
            switch: 1,
            pivot: {
              user_id: 1,
              role_id: 2
            }
          },
          {
            id: 3,
            revision: 0,
            created_at: '2023-02-13 10:32:04',
            updated_at: '0000-00-00 00:00:00',
            deleted_at: null,
            created_time: 1676255524,
            updated_time: 0,
            deleted_time: 0,
            parent_id: 0,
            role_name: '管理员',
            logic_name: 'admin',
            deep: 1,
            sort: 100,
            switch: 1,
            pivot: {
              user_id: 1,
              role_id: 3
            }
          },
          {
            id: 4,
            revision: 0,
            created_at: '2023-02-13 10:32:04',
            updated_at: '0000-00-00 00:00:00',
            deleted_at: null,
            created_time: 1676255524,
            updated_time: 0,
            deleted_time: 0,
            parent_id: 0,
            role_name: '用户',
            logic_name: 'user',
            deep: 1,
            sort: 100,
            switch: 1,
            pivot: {
              user_id: 1,
              role_id: 4
            }
          }
        ]
      }
    }
  ],
  first_page_url: 'https://api.youhujun.com/api/v1/getAdmin?page=1',
  from: 1,
  last_page: 1,
  last_page_url: 'https://api.youhujun.com/api/v1/getAdmin?page=1',
  links: [
    {
      url: null,
      label: '&laquo; Previous',
      active: false
    },
    {
      url: 'https://api.youhujun.com/api/v1/getAdmin?page=1',
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
  path: 'https://api.youhujun.com/api/v1/getAdmin',
  per_page: 10,
  prev_page_url: null,
  to: 4,
  total: 4
}

const defaultUserList = [
  {
    id: 4,
    revision: 0,
    created_at: '2023-02-13 10:32:04',
    updated_at: '0000-00-00 00:00:00',
    deleted_at: null,
    created_time: 1676255524,
    updated_time: 0,
    deleted_time: 0,
    switch: 1,
    recommend_id: 0,
    parent_id: 1,
    level_id: 0,
    account_name: 'user',
    password: '$2y$10$5fxEMsqgUdgtVfHOkzifOeLX.fXJemrfuWtCcinHSOUBU20pIcvmG',
    phone_area_code: '',
    phone: null,
    phone_verified_at: null,
    phone_verified_time: 0,
    email: null,
    email_verified_at: null,
    email_verified_time: 0,
    remember_token: null,
    auth_token: '6Nxt8PDb1S4QtWnq8s1K',
    balance: '0.00',
    coin: '0.00',
    score: '0.00',
    deep: 1,
    is_real_auth: 0,
    auth_apply_at: '0000-00-00 00:00:00',
    auth_apply_time: 0,
    auth_at: '0000-00-00 00:00:00',
    auth_time: 0,
    user_info: {
      id: 4,
      user_id: 4,
      revision: 0,
      created_at: '2023-02-13 10:32:04',
      created_time: 1676255524,
      updated_at: '0000-00-00 00:00:00',
      updated_time: 0,
      deleted_at: null,
      deleted_time: 0,
      nick_name: 'user',
      family_name: '',
      name: '',
      real_name: '',
      id_number: null,
      sex: 1,
      solar_birthday_at: null,
      solar_birthday_time: 0,
      chinese_birthday_at: null,
      chinese_birthday_time: 0,
      introduction: 'I am an user'
    }
  },
  {
    id: 3,
    revision: 0,
    created_at: '2023-02-13 10:32:04',
    updated_at: '0000-00-00 00:00:00',
    deleted_at: null,
    created_time: 1676255524,
    updated_time: 0,
    deleted_time: 0,
    switch: 1,
    recommend_id: 0,
    parent_id: 1,
    level_id: 0,
    account_name: 'admin',
    password: '$2y$10$LQ2OPke88KviXB9Wa1V2uO72YsZt8/ta55vwDlCoPs5fEM6.hVyau',
    phone_area_code: '',
    phone: null,
    phone_verified_at: null,
    phone_verified_time: 0,
    email: null,
    email_verified_at: null,
    email_verified_time: 0,
    remember_token: null,
    auth_token: 'dNkv8BMq8t47J3hqQzmu',
    balance: '0.00',
    coin: '0.00',
    score: '0.00',
    deep: 1,
    is_real_auth: 0,
    auth_apply_at: '0000-00-00 00:00:00',
    auth_apply_time: 0,
    auth_at: '0000-00-00 00:00:00',
    auth_time: 0,
    user_info: {
      id: 3,
      user_id: 3,
      revision: 0,
      created_at: '2023-02-13 10:32:04',
      created_time: 1676255524,
      updated_at: '0000-00-00 00:00:00',
      updated_time: 0,
      deleted_at: null,
      deleted_time: 0,
      nick_name: 'admin',
      family_name: '',
      name: '',
      real_name: '',
      id_number: null,
      sex: 1,
      solar_birthday_at: null,
      solar_birthday_time: 0,
      chinese_birthday_at: null,
      chinese_birthday_time: 0,
      introduction: 'I am an administrator'
    }
  },
  {
    id: 2,
    revision: 1,
    created_at: '2023-02-13 10:32:04',
    updated_at: '2023-02-14 15:46:13',
    deleted_at: null,
    created_time: 1676255524,
    updated_time: 1676360773,
    deleted_time: 0,
    switch: 1,
    recommend_id: 0,
    parent_id: 1,
    level_id: 0,
    account_name: 'super',
    password: '$2y$10$OVLoGLZMq3YAXclIgEyKK.W60UmXVYF9p3QlKEYGNsgEk8c87lSG2',
    phone_area_code: '',
    phone: null,
    phone_verified_at: null,
    phone_verified_time: 0,
    email: null,
    email_verified_at: null,
    email_verified_time: 0,
    remember_token: null,
    auth_token: 'po9o8jo9WuWC0nHIIKVb',
    balance: '0.00',
    coin: '0.00',
    score: '0.00',
    deep: 1,
    is_real_auth: 0,
    auth_apply_at: '0000-00-00 00:00:00',
    auth_apply_time: 0,
    auth_at: '0000-00-00 00:00:00',
    auth_time: 0,
    user_info: {
      id: 2,
      user_id: 2,
      revision: 0,
      created_at: '2023-02-13 10:32:04',
      created_time: 1676255524,
      updated_at: '0000-00-00 00:00:00',
      updated_time: 0,
      deleted_at: null,
      deleted_time: 0,
      nick_name: 'superAdmin',
      family_name: '',
      name: '',
      real_name: '',
      id_number: null,
      sex: 1,
      solar_birthday_at: null,
      solar_birthday_time: 0,
      chinese_birthday_at: null,
      chinese_birthday_time: 0,
      introduction: 'I am a super administrator'
    }
  },
  {
    id: 1,
    revision: 0,
    created_at: '2023-02-13 10:32:04',
    updated_at: '2023-02-14 17:10:52',
    deleted_at: null,
    created_time: 1676255524,
    updated_time: 0,
    deleted_time: 0,
    switch: 1,
    recommend_id: 0,
    parent_id: 0,
    level_id: 0,
    account_name: 'develop',
    password: '$2y$10$Wkpyx75wRyPCJdEwjdWuSORH1s1urZnaavVgnxNwHP/lcHUmS1vFe',
    phone_area_code: '',
    phone: null,
    phone_verified_at: null,
    phone_verified_time: 0,
    email: null,
    email_verified_at: null,
    email_verified_time: 0,
    remember_token:
      'XCfSBNbI1H6PpOb04UOAavJcumTgVNB9YGoZ9ShO0k9zWYjGp2Bp16eR2MSW',
    auth_token: 'Yfg7mwcvpF0hwu6WwNyu',
    balance: '0.00',
    coin: '0.00',
    score: '0.00',
    deep: 0,
    is_real_auth: 0,
    auth_apply_at: '0000-00-00 00:00:00',
    auth_apply_time: 0,
    auth_at: '0000-00-00 00:00:00',
    auth_time: 0,
    user_info: {
      id: 1,
      user_id: 1,
      revision: 0,
      created_at: '2023-02-13 10:32:04',
      created_time: 1676255524,
      updated_at: '0000-00-00 00:00:00',
      updated_time: 0,
      deleted_at: null,
      deleted_time: 0,
      nick_name: 'developer',
      family_name: '',
      name: '',
      real_name: '',
      id_number: null,
      sex: 0,
      solar_birthday_at: null,
      solar_birthday_time: 0,
      chinese_birthday_at: null,
      chinese_birthday_time: 0,
      introduction: 'I am a super developer'
    }
  }
]

module.exports = [
  {
    url: '/defaultUser',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '获取管理员角色成功',
        data: defaultUserList
      }
    }
  },
  {
    url: '/getAdmin',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '获取管理员成功',
        data: managerList
      }
    }
  },
  {
    url: '/addAdmin',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '添加管理员成功'
      }
    }
  },
  {
    url: '/multipleDeleteAdmin',
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
    url: '/updateAdmin',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '修改管理员成功'
      }
    }
  },
  {
    url: '/deleteAdmin',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '刪除管理员成功'
      }
    }
  },
  {
    url: '/multipleDisableAdmin',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '刪除禁用管理员成功'
      }
    }
  },
  {
    url: '/disableAdmin',
    type: 'post',
    response: (req, res) =>
    {
      return {
        code: 0,
        msg: '禁用管理员成功'
      }
    }
  }
]
