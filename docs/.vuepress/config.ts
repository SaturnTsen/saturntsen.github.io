import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
import dotenv from 'dotenv'
import path from 'path'

let host: string;
let port: number;

console.log('> process.env:', process.env.NODE_ENV, '\n');

if (process.env.NODE_ENV === 'development') {
  const envFile = '.env'
  dotenv.config({ path: path.resolve(__dirname, `../../${envFile}`) });
  host = process.env.VITE_HOST || 'localhost';
  port = parseInt(process.env.VITE_PORT || '8080', 10);
} else {
  host = 'localhost';
  port = 8080;
}

export default defineUserConfig({
  base: '/',
  lang: 'en-US',
  title: 'SaturnTsen',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  // Dev config
  host,
  port,

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
        languages: ['shell', 'bash', 'typescript', 'javascript', 'css', 'html',
          'python', 'markdown', 'powershell', 'cmd', 'ini', 'cpp', 'dockerfile'],
      },

      /**
       * 评论 comments
       * @see https://theme-plume.vuejs.press/guide/features/comments/
       */
      comment: {
        provider: 'Giscus', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
        comment: true,
        repo: 'SaturnTsen/saturntsen.github.io',
        repoId: 'R_kgDONfxZDA',
        category: 'Announcements',
        categoryId: 'DIC_kwDONfxZDM4ClbWk',
        mapping: 'pathname',
        reactionsEnabled: true,
        inputPosition: 'top',
      },

      /**
       * markdown enhance
       * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
       */
      markdownEnhance: {
        demo: true,
        mermaid: true,
        //   include: true,
        //   chart: true,
        //   echarts: true,
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
    },
  }),
})
