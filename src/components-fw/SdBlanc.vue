<!-- Compoent d'affichage d'un MD : clair
-->
<template>
  <vue-showdown class="markdown-body" :markdown="text" :key="text" flavor="github" :options="{ emoji: true }" />
</template>

<script setup lang="ts" vapor>
import { VueShowdown } from 'vue-showdown'

const props = defineProps<{
  text: string
}>()
</script>

<style lang="scss">
@import '../css/github-markdown-light.scss';
@import '../css/markdown-custom.scss';
</style>
