import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  link: '/notes/crypto',
  dir: 'crypto',
  sidebar: [
    {
      text: 'Crypto',
      prefix: '/notes/crypto',
      items: [
        '/notes/crypto/',
        'crypto-1/',
        'crypto-2/',
        'crypto-3/',
        'crypto-4/',
        'crypto-5/',
        'crypto-6/'
      ]
    },
  ]
})