import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
import { notes } from './notes'
import dotenv from 'dotenv'
import path from 'path'

let viteHost: string;
let vitePort: number;

console.log('Hi there');
console.log('process.env:', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  const envFile = '.env'
  dotenv.config({ path: path.resolve(__dirname, `../../${envFile}`) });
  viteHost = process.env.VITE_HOST || 'localhost';
  vitePort = parseInt(process.env.VITE_PORT || '8080', 10);
} else {
  viteHost = 'localhost';
  vitePort = 8080;
}

export default defineUserConfig({
  base: '/',
  lang: 'en-US',
  title: 'SaturnTsen',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  // Dev config
  host: viteHost,
  port: vitePort,

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
    },
  }),
})
