<!-- 
Affiche une bulle et un titre
-->
<template>
<div :class="'row items-center' + (mini ? '' : ' full-width')">
  <btn-bubble class="col-auto" :text="$t(prefix + '_bub')"/>
  <div :class="'q-ml-sm title-' + sz + (mini ? '' : ' col')">
    {{$t(prefix + '_label')}}</div>
</div>
</template>

<script setup lang="ts" vapor>
import { computed } from 'vue'
import BtnBubble from '../components-fw/BtnBubble.vue'

const props = defineProps<{
  prefix: string, // bulle: prefix_bub   titre: prefix_label
  large?: boolean,
  mini?: boolean
}>()

const sz = computed(() => props.large ? 'lg' : 'md')

</script>

<style lang="scss" scoped>
@import '../css/app.scss';
</style>
