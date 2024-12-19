import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const computerVisionNote = defineNoteConfig({
  link: '/computer-vision',
  dir: 'computer-vision',
  sidebar: ['', 'GAN', 'VAE', 'diffusion-models/denoising.md'],
})

const machineLearningNote = defineNoteConfig({
  link: '/machine-learning',
  dir: 'machine-learning',
  sidebar: ['', 'KNN', 'naive-bayes'],
})

const leetcodeNote = defineNoteConfig({
  link: '/leetcode',
  dir: 'leetcode',
  sidebar: ['', '3Sum', 'LCS'],
})

export const notes = defineNotesConfig({
  link: '/',
  dir: 'notes',
  notes: [computerVisionNote, machineLearningNote, leetcodeNote],
})
