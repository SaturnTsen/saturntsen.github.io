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
  margin: 0 auto;
  padding-top: 0;
  font-family: Georgia, kaiti, sans-serif;
}

.vp-home-custom .vp-doc p {
  margin-top: 0.6em;
  margin-bottom: 0.6em;
}

.vp-home-custom .vp-doc h2:first-of-type {
  margin-top: 0;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-border);
}

.vp-home-custom .vp-doc h2 {
  margin-top: 0.4em;
}

</style>