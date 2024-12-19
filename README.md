# yiming-chen

The Site is generated using [vuepress](https://vuepress.vuejs.org/) and [vuepress-theme-plume](https://github.com/pengzhanbo/vuepress-theme-plume)

## 如何撰写博客

### 添加文章

1. 直接在docs文件夹下添加`.md`文件，或在子目录下添加文件
2. 根据需要更改permalink

## 如何撰写笔记

### 在类内添加文章

1. `notes.js`中对应类的`sidebar`数组中添加文章相对路径
2. 对应的`.md`文档中设置相应层级的permalink

### 添加类

1. notes中添加文件夹，文件夹中`README.md`，设置permalink
2. 在`notes.js`中添加大类，`link`字段填写设置的permalink，`dir`字段填写刚刚创建的文件夹名
3. 在`navbar.js`中添加大类导航，`text`字段填写显示的名称，`link`字段填写permalink

## Install

```sh
pnpm i
```

## Usage

```sh
# start dev server
pnpm docs:dev
# build for production
pnpm docs:build
# preview production build in local
pnpm docs:preview
# update vuepress and theme
pnpm vp-update
```

## Deploy to GitHub Pages

The plume theme has been created with GitHub Actions: `.github/workflows/docs-deploy.yml`. You also need to make the following settings in the GitHub repository:

- [ ] `settings > Actions > General`, Scroll to the bottom of the page, under `Workflow permissions`, check `Read and write permissions`, and click the save button.

- [ ] `settings > Pages`, In `Build and deployment`, select `Deploy from a branch` for `Source`, choose `gh-pages` for `Branch`, and click the save button.
  (The `gh-pages` branch may not exist upon first creation. You can complete the above setup first, push the code to the main branch, wait for `github actions` to finish, and then proceed with the setup.)

- [ ] Modify the `base` option in `docs/.vuepress/config.ts`:
  - If you are planning to deploy to `https://<USERNAME>.github.io/`, you can skip this step as `base` defaults to `"/"`.
  - If you are planning to deploy to `https://<USERNAME>.github.io/<REPO>/`, meaning your repository URL is `https://github.com/<USERNAME>/<REPO>`, set `base` to `"/<REPO>/"`.

To customize a domain name, please refer to [Github Pages](https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)

## Documents

- [vuepress](https://vuepress.vuejs.org/)
- [vuepress-theme-plume](https://theme-plume.vuejs.press/)
