import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: 'doc',
  title: 'LeetCode',
  dir: 'notes/leetcode',
  linkPrefix: '/notes/leetcode/',
  sidebar: 'auto'
})
