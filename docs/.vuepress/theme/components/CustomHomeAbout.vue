<script setup lang="ts">
import { Content } from 'vuepress/client'
import type { PlumeHomeConfigBase } from 'vuepress-theme-plume'
import { VPHomeBox, VPImage } from 'vuepress-theme-plume/client'

interface CustomHomeAbout extends PlumeHomeConfigBase {
  type: 'custom'
}

const props = defineProps<CustomHomeAbout>()
</script>

<template>
  <VPHomeBox class="vp-home-custom" v-bind="props">
    <Content class="vp-doc" vp-content />
  </VPHomeBox>
</template>

<style>
.vp-home-custom {
  margin-top: 0;
  padding-top: 0;
  background-color: var(--vp-color-bg);
  font-family: Georgia, sans-serif;
}
.vp-doc h2 {
  margin-top: 0.8em !important;
}
</style>