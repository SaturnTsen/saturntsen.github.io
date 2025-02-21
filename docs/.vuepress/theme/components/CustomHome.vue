<script setup lang="ts">
import type { PlumeHomeConfigBase } from 'vuepress-theme-plume'
import { VPHomeBox, VPImage } from 'vuepress-theme-plume/client'
import { computed } from 'vue'

const props = defineProps<PlumeHomeConfigBase & {
  name?: string
  description?: string
  avatar?: string
  circle?: boolean
  email?: string
  phone?: string
  googlescholar?: string
  github?: string
}>()

const myprofile = computed(() => {
  return {
    name: props.name,
    description: props.description,
    avatar: props.avatar,
    circle: props.circle,
    email: props.email,
    phone: props.phone,
    googlescholar: props.googlescholar,
    github: props.github,
  }
})
</script>

<template>
  <VPHomeBox class="vp-home-profile" type="profile">
    <div class="profile-container">
      <VPImage v-if="myprofile.avatar" :image="myprofile.avatar" :class="{ circle: myprofile.circle }" style="width: 128px;" />
      <div style="margin-left: 12px;">
      <h3 v-if="myprofile.name" v-html="myprofile.name" />
      <p v-if="myprofile.description" v-html="myprofile.description" />
      <p v-if="myprofile.email || myprofile.github || myprofile.googlescholar || myprofile.phone" class="email-link">
        <span v-if="myprofile.email" class="contact-item">
          <Icon name="ic:baseline-email" size="2em" />
          <a :href="'mailto:' + myprofile.email" v-text="'Email'" />
        </span>
        <span v-if="myprofile.github" class="contact-item">
          <Icon name="mdi:github" size="2em" />
          <a :href="myprofile.github" v-text="'Github'" />
        </span>
        <span v-if="myprofile.googlescholar" class="contact-item">
          <Icon name="ic:baseline-school" size="2em" />
          <a :href="myprofile.googlescholar" v-text="'Scholar'" />
        </span>
        <span v-if="myprofile.phone" class="contact-item">
          <Icon name="ic:baseline-phone" size="2em" />
          <a :href="'tel:' + myprofile.phone" v-text="'Phone'" />
        </span>
      </p>
      </div>
    </div>
  </VPHomeBox>
</template>

<style scoped>
.contact-item {
  padding-left: 3px;
}

.vp-home-profile {
  margin-top: 1em;
  padding-bottom: 0;
}
.vp-home-profile :deep(.container) {
  overflow: hidden;
}

.profile-container {
  display: flex;
  align-items: center;
}

.email-link {
  margin-top: 12px;
}

.vp-home-profile :deep(img) {
  float: left;
  width: 64px;
  margin-right: 24px;
}

.vp-home-profile :deep(img.circle) {
  border-radius: 50%;
}

@media (min-width: 960px) {
  .vp-home-profile :deep(img) {
    width: 96px;
  }
}

.vp-home-profile :deep(h3) {
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 550;
  font-family: Georgia, '楷体', sans-serif;
}

.vp-home-profile :deep(p) {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  white-space: pre-wrap;
  transition: color var(--vp-t-color);
  font-family: Georgia, '楷体', sans-serif;
}

</style>
