import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  base: '/',
  lang: 'en-US',
  title: 'Yiming CHEN - 陈亿铭',
  description: 'Yiming CHEN\'s personal page.',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  // Dev config
  host:'localhost',
  port: '8086',

  // Bundler
  bundler: viteBundler(),

  // Theme
  theme: plumeTheme({
    // Host to deploy
    hostname: 'https://saturntsen.github.io',
    // your git repo url
    docsRepo: 'https://github.com/SaturnTsen/saturntsen.github.io',
    docsDir: 'docs',
    plugins: {
      /**
       * Shiki 代码高亮
       * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
       */
      shiki: {
        //  预设代码块高亮语言，减少不必要的时间开销
        languages: ['shell', 'bash', 'typescript', 'javascript', 'css', 'html', 'python', 'markdown', 'powershell', 'cmd'],
      },

      /**
       * markdown enhance
       * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
       */
      markdownEnhance: {
        demo: true,
      //   include: true,
      //   chart: true,
      //   echarts: true,
      //   mermaid: true,
      //   flowchart: true,
      },

      /**
       *  markdown power
       * @see https://theme-plume.vuejs.press/config/plugin/markdown-power/
       */
      // markdownPower: {
      //   pdf: true,
      //   caniuse: true,
      //   plot: true,
      //   bilibili: true,
      //   youtube: true,
      //   icons: true,
      //   codepen: true,
      //   replit: true,
      //   codeSandbox: true,
      //   jsfiddle: true,
      //   repl: {
      //     go: true,
      //     rust: true,
      //     kotlin: true,
      //   },
      // },

      /**
       * 评论 comments
       * @see https://theme-plume.vuejs.press/guide/features/comments/
       */
      // comment: {
      //   provider: '', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
      //   comment: true,
      //   repo: '',
      //   repoId: '',
      //   categoryId: '',
      //   mapping: 'pathname',
      //   reactionsEnabled: true,
      //   inputPosition: 'top',
      // },
    },
  }),
})
