<template>
  <div>
    <h1>Analyze Report</h1>
    <div v-html="content"></div>
  </div>
</template>

<script setup lang="ts">
import markdown from 'markdown-it';
const md = markdown({
  html: true,
  linkify: true,
  typographer: true,

})
const markdownContent = `
# 下列节点重复次数过多
`
const content = md.render('# Hello')
</script>