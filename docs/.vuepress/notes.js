import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const computerVisionNote = defineNoteConfig({
  link: '/notes/computer-vision',
  dir: 'computer-vision',
  sidebar: ['', 'GAN', 'VAE'],
})

const leetcodeNote = defineNoteConfig({
  link: '/notes/leetcode',
  dir: 'leetcode',
  sidebar: ['', '3Sum', 'LCS'],
})

export const notes = defineNotesConfig({
  link: '/notes',
  dir: 'notes',
  notes: [computerVisionNote, leetcodeNote],
})
