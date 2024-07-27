<!--
 * @Descripttion:
 * @version:
 * @Author: YouHuJun
 * @Date: 2021-08-25 15:31:32
 * @LastEditors: youhujun 2900976495@qq.com
 * @LastEditTime: 2024-07-20 11:14:52
-->

<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import Socket from '@/socket'
// import store from '@/store'
import { getAllSystemVoiceConfig } from '@/api/system/systemConfig/voiceConfig'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data()
  {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created()
  {
    // 2021-08-15 我在这里排除角色判断 ,所有后台登录用统一界面
    // 记录思路如下,可以从后台获取角色,然后这里不是写死的admin,记录下,后续有需要再更改

    // 要求super以及develop进入是一样的.然后admin进入是另外一个页面
    // 未来规划business以及agent也可以登录后台,但是看到的内容是不一样的.

    if (!this.roles.includes('develop') && !this.roles.includes('super'))
    {
      this.currentRole = 'editorDashboard'
    }
    /* 页面单独加载方法,不在主页统一加载
     store.dispatch('label/getTreeLabel')
     store.dispatch('category/getTreeCategory')
     store.dispatch('class/getTreeClass')
     获取树形地区
     store.dispatch('region/getTreeRegions')
     获取所有地区
     store.dispatch('region/getRegions')
 */
    // 获取系统角色
    // store.dispatch('system/getTreeRole')
  },
  mounted()
  {
    /* Socket.channel(process.env.VUE_APP_PREFIX + 'admin_real_auth_apply').listen('.RealAuthApply', (e) =>
    {
      // console.log('success')
      console.log(e)
      const voice = 'https://dapi.youhujun.com/storage/config/file/config/new_real_auth_apply.mp3'
      console.log(voice)

      const music = new Audio(voice)

      music.play()
    })
 */
    this.getAllSystemVoiceConfig()
  },
  methods: {
    async getAllSystemVoiceConfig()
    {
      const voiceConfigArray = await getAllSystemVoiceConfig().then(res =>
      {
        return new Promise((resolve, rejsect) =>
        {
          if (res && res.code === 0)
          {
            resolve(res.data)
          }
        })
      })

      if (voiceConfigArray && voiceConfigArray.length > 0)
      {
        for (const k in voiceConfigArray)
        {
          const voiceConfigObject = voiceConfigArray[k]

          Socket.channel(process.env.VUE_APP_PREFIX + voiceConfigObject.channle_name).listen(`.${voiceConfigObject.channle_event}`, (e) =>
          {
            const music = new Audio(voiceConfigObject.voice_url)
            music.play()
          })
        }
      }
    }
  }
}
</script>
