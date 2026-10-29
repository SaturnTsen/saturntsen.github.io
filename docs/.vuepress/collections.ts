import { defineCollections } from 'vuepress-theme-plume'
import leetcode from './collections/leetcode'
import misc from './collections/misc'
import umcv from './collections/um-cv'
import crypto from './collections/crypto'
import math from './collections/math'

export const collections = defineCollections([
  leetcode,
  misc,
  umcv,
  crypto,
  math,
])
