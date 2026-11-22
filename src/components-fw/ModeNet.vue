<!-- Component de fixation du mode net ou non -->
<template>
<div class="row justify-between items-center q-my-sm">
  <q-toggle class="col q-pr-md" v-model="starter.hasNet" dense color="negative"
    :label="$t('LOGnet_' + (starter.hasNet ? '1' : '2'))" />
  <btn-bubble class="col-auto self-start"
    :text="$t('LOGnet_3')"/>
</div>
</template>

<script setup lang="ts" vapor>
import stores from '../starter/allstores'
import BtnBubble from '../components-fw/BtnBubble.vue'

const starter = stores.starter

</script>

<style lang="scss" scoped>
@import '../css/app.scss';
</style>