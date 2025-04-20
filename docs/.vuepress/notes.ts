import { defineNotesConfig, defineNoteConfig } from 'vuepress-theme-plume'
import misc from './notes/misc'
import leetcodeNote from './notes/leetcode'
// import computerVisionNote from './notes/computer-vision'
import umcvNote from './notes/um-cv'
import cryptoNote from './notes/crypto'

export const notes = defineNotesConfig({
  link: '/notes',
  dir: 'notes',
  notes: [/* computerVisionNote, */ leetcodeNote, misc, umcvNote, cryptoNote]
})

