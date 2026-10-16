import { defineCollection } from 'vuepress-theme-plume'

export default defineCollection({
  type: 'doc',
  title: 'AI Agent',
  dir: 'notes/agents',
  linkPrefix: '/notes/agents/',
  sidebar: 'auto'
})
