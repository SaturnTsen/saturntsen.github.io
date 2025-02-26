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
        'linux-setup/',
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
        'win-network/',
        'powershell-and-oh-my-posh/',
        'win2win-ssh/',
        'dism-winpe/',
        'winget-scoop-chocolatey/',
      ]
    },
    {
      text: 'Python',
      prefix: '/notes/misc',
      items: [
          'conda-env-config/',
          'pip/',
          'local-compile/',
          'global-interpreter-lock-in-cpython/',
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
            'javascript-inheritance/',
        ]
    }
  ]
})