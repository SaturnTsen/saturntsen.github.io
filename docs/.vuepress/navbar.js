import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: 'Home', link: '/' },
  { text: 'Blog', link: '/blog/' },
  { text: 'Tags', link: '/blog/tags/' },
  { text: 'Archives', link: '/blog/archives/' },
  {
    text: 'Notes',
    items: [
      { text: 'Computer Vision', link: '/notes/computer-vision/README.md' },
      { text: 'Machine Learning', link: '/notes/machine-learning/README.md' },
      { text: 'LeetCode', link: '/notes/leetcode/README.md' }
    ]
  },
])
