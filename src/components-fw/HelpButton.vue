<!-- Bouton commandant l'ouverture de l'aide en ligne -->
<template>
  <btn-cond icon="help" @ok="stores.ui.openHelp(page)" color="none"/>
</template>

<script setup lang="ts" vapor>
import stores from '../starter/allstores'
import BtnCond from './BtnCond.vue'

const props = defineProps<{
  page: string
}>()

</script>

<style lang="scss" scoped>
@import '../css/app.scss';
</style>
