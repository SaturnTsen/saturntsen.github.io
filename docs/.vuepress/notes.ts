import { defineNotesConfig, defineNoteConfig } from 'vuepress-theme-plume'
import misc from './notes/misc'
import leetcodeNote from './notes/leetcode'
import computerVisionNote from './notes/computer-vision'


export const notes = defineNotesConfig({
  link: '/notes',
  dir: 'notes',
  notes: [computerVisionNote, leetcodeNote, misc],
})

