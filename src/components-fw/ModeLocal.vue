<!-- Component de fixation du mode incognito ou non -->
<template>
<div class="row self-start full-width justify-between items-center q-my-sm">
  <q-toggle class="col q-pr-md" v-model="session.hasLocal" dense 
    color="green-5"
    :label="$t('LOGloc_' + (session.hasLocal ? '1' : '2'))"/>
  <btn-bubble class="col-auto self-start"
    :text="$t('LOGloc_3')"/>
</div>
</template>

<script setup lang="ts" vapor>
import stores from '../starter/allstores'
import BtnBubble from '../components-fw/BtnBubble.vue'

const session = stores.session

</script>

<style lang="scss" scoped>
@import '../css/app.scss';
</style>