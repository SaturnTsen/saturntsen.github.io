import { defineThemeConfig } from 'vuepress-theme-plume'
import { notes } from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: '/avatars/avatar.png',

  appearance: true,
  profile: {
    name: 'SaturnTsen',
    description: 'CV | ML | NNDL',
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

  navbar: [
    { text: 'Home', link: '/' },

    {
      text: 'Notes',
      items: [
        // { text: 'Computer Vision', link: '/notes/computer-vision/README.md' },
        { text: 'CV-NNDL', link: '/notes/um-cv/README.md' },
        // { text: 'Crypto', link: '/notes/crypto/README.md' },
        { text: 'LeetCode', link: '/notes/leetcode/README.md' },
        { text: 'Misc', link: '/notes/misc/' },
      ]
    },
    // { text: 'Life', link: '/blog/' }

  ],
  notes,
  footer: {
    copyright: '© 2024 SaturnTsen | Powered by <a href="https://vuepress.vuejs.org/" target="_blank">VuePress</a> & <a href="https://theme-plume.vuejs.press/" target="_blank">Plume</a>',
  }
})
