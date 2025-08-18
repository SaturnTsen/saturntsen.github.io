<script setup lang="ts">
import type { ThemeHomeConfigBase } from 'vuepress-theme-plume'
import { VPHomeBox, VPImage } from 'vuepress-theme-plume/client'
import { computed } from 'vue'

const props = defineProps<ThemeHomeConfigBase & {
  name?: string
  description?: string
  avatar?: string
  circle?: boolean
  email?: string
  phone?: string
  googlescholar?: string
  github?: string
  linkedin?: string
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
    linkedin: props.linkedin,
  }
})
</script>
<template>
  <VPHomeBox class="vp-home-profile" type="profile">
    <h3 v-if="myprofile.name" v-html="myprofile.name" class="outer-title"/>
    <div class="profile-container">
      <VPImage v-if="myprofile.avatar" :image="myprofile.avatar" :class="{ circle: myprofile.circle }" />
      <div class="profile-details">
      <h3 v-if="myprofile.name" v-html="myprofile.name" class="inner-title"/>
      <p v-if="myprofile.description" v-html="myprofile.description" />
      <div v-if="myprofile.email || myprofile.github || myprofile.googlescholar || myprofile.phone || myprofile.linkedin" class="contact-links">
        <div v-if="myprofile.email" class="contact-item">
        <Icon name="ic:baseline-email" size="2em" />
        <a :href="'mailto:' + myprofile.email" v-text="'Email'" />
        </div>
        <div v-if="myprofile.github" class="contact-item">
        <Icon name="mdi:github" size="2em" />
        <a :href="myprofile.github" v-text="'Github'" />
        </div>
        <div v-if="myprofile.googlescholar" class="contact-item">
        <Icon name="ic:baseline-school" size="2em" />
        <a :href="myprofile.googlescholar" v-text="'Scholar'" />
        </div>
        <div v-if="myprofile.phone" class="contact-item">
        <Icon name="ic:baseline-phone" size="2em" />
        <a :href="'tel:' + myprofile.phone" v-text="'Phone'" />
        </div>
        <div v-if="myprofile.linkedin" class="contact-item">
        <Icon name="mdi:linkedin" size="2em" />
        <a :href="myprofile.linkedin" v-text="'LinkedIn'" />
        </div>
      </div>
      </div>
    </div>
  </VPHomeBox>
</template>

<style scoped>

.contact-item {
  display: flex;
  align-items: center;
  width: 90px;

}

.vp-home-profile {
  margin-top: 0.5em;
}

.vp-home-profile .container {
  overflow: hidden;
}

.profile-container {
  display: flex;
  align-items: center;
}

.profile-details {
  margin-left: 12px;
}

.contact-links {
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
  margin-left: -4px;
  padding: 0 0.5em 0 0;
  font-family: Georgia, kaiti, sans-serif;
  color: var(--vp-c-text-1);
}

.vp-home-profile :deep(img) {
  float: left;
  width: 128px;
  margin-right: 24px;
}

.outer-title {
  display: none;
}

@media (min-width: 960px) {
  .vp-home-profile :deep(img) {
    width: 152px;
  }
}

@media (max-width: 430px) {
  .vp-home-profile :deep(img) {
    width: 30%;
  }
  .inner-title {
    display: none;
  }
  .outer-title {
    display: block;
    text-align: center;
    margin-bottom: 1em !important;
  }
}

@media (max-width: 320px) {
  .vp-home-profile :deep(img) {
    display: none;
  }
}

.vp-home-profile :deep(img.circle) {
  border-radius: 50%;
}

.vp-home-profile :deep(h3) {
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 550;
  font-family: Georgia, kaiti, 'STKaiti',sans-serif;
}

.vp-home-profile :deep(p) {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  white-space: pre-wrap;
  transition: color var(--vp-t-color);
  font-family: Georgia, kaiti, 'STKaiti', sans-serif;
}
</style>
