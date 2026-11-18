<!-- Compoent d'affichage d'un MD : clair ou  sombre
-->
<template>
<div>
  <sd-noir v-if="$q.dark.isActive" :text="text"/>
  <sd-blanc v-else :text="text"/>
</div>
</template>

<script setup lang="ts" vapor>
import SdNoir from './SdNoir.vue'
import SdBlanc from './SdBlanc.vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const props = defineProps<{ 
  text: string
}>()

</script>

<style lang="scss" scoped>
</style>
