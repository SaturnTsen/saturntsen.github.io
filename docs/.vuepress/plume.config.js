import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import { notes } from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: '/avatars/avatar.png',

  appearance: true,
  profile: {
    name: 'Yiming CHEN',
    description: 'Yiming CHEN\'s personal blog.',
    avatar: '/avatars/avatar2.png',
    // location: '您的位置',
    // organization: '您的组织',
    circle: true, // 是否为圆形头像
    layout: 'left', // 个人信息在左侧还是右侧，'left' | 'right'
  },
  social: [
    { icon: 'github', link: 'https://github.com/saturntsen' },
    {
      icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z"/></svg>', name: 'email' },
      link: 'mailto:yiming.chen@polytechnique.edu'
    },
    {
      icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 17v-6.9L12 15L1 9l11-6l11 6v8zm-9 4l-7-3.8v-5l7 3.8l7-3.8v5z" /></svg>', name: 'Google Scholar' },
      link: 'https://scholar.google.com'
    },
  ],
  
  navbar,
  notes
})
