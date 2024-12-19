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

const profile = computed(() => {
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
  <VPHomeBox
    class="vp-home-profile"
    :type="type"
    :background-image="backgroundImage"
    :background-attachment="backgroundAttachment"
    :full="full"
  >
    <div class="profile-container">
      <VPImage v-if="profile.avatar" :image="profile.avatar" :class="{ circle: profile.circle }" style="width: 128px;" />
      <div style="margin-left: 12px;">
      <h3 v-if="profile.name" v-html="profile.name" />
      <p v-if="profile.description" v-html="profile.description" />
      <p v-if="profile.email || profile.github || profile.googlescholar || profile.phone" class="email-link">
        <span v-if="profile.email" class="contact-item">
          <Icon name="ic:baseline-email" size="2em" />
          <a :href="'mailto:' + profile.email" v-text="'Email'" />
        </span>
        <span v-if="profile.github" class="contact-item">
          <Icon name="mdi:github" size="2em" />
          <a :href="profile.github" v-text="'Github'" />
        </span>
        <span v-if="profile.googlescholar" class="contact-item">
          <Icon name="ic:baseline-school" size="2em" />
          <a :href="profile.googlescholar" v-text="'Scholar'" />
        </span>
        <span v-if="profile.phone" class="contact-item">
          <Icon name="ic:baseline-phone" size="2em" />
          <a :href="'tel:' + profile.phone" v-text="'Phone'" />
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
  font-weight: 500;
}

.vp-home-profile :deep(p) {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  white-space: pre-wrap;
  transition: color var(--vp-t-color);
}
</style>
