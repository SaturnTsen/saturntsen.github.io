import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  link: '/notes/misc',
  dir: 'misc',
  sidebar: [
    '/notes/misc/',
    {
      text: 'Linux',
      prefix: '/notes/misc',
      items: [
        'git/',
        'vim/',
        'ssh-and-tmux/',
        'bash-script/',
        'linux-commands/',
        'linux-commands-system/',
        'linux-net-tools/',
      ]
    },
    {
      text: 'Windows',
      prefix: '/notes/misc',
      items: [
        'powershell-and-oh-my-posh/',
        'win2win-ssh/',
        'network-proxy/',
        'dism-winpe/',
      ]
    },
    {
      text: 'Virtualization',
      prefix: '/notes/misc',
      items: [
        'docker/',
        'vms/',
        'wsl/'
      ]
    },
    {
        text: 'Others',
        prefix: '/notes/misc',
        items: [
            'global-interpreter-lock-in-cpython/',
            'javascript-inheritance/',
        ]
    }
  ]
})