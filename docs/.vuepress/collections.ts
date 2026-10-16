import { defineCollections } from 'vuepress-theme-plume'
import leetcode from './collections/leetcode'
import misc from './collections/misc'
import umcv from './collections/um-cv'
import agents from './collections/agents'
import crypto from './collections/crypto'

export const collections = defineCollections([
  leetcode,
  misc,
  umcv,
  agents,
  crypto,
])
