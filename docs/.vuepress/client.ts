import { defineClientConfig } from 'vuepress/client'
import CustomHome from './theme/components/CustomHome.vue'
import CustomHomeAbout from './theme/components/CustomHomeAbout.vue'
import './styles/custom.css'
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'

// import './theme/styles/custom.css'

export default defineClientConfig({
  enhance({ app }) {
    // app.component('RepoCard', RepoCard)
    app.component('custom-home', CustomHome)
    app.component('custom-home-about', CustomHomeAbout)
  },
})
