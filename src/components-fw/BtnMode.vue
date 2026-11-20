<template>
  <q-btn flat class="q-mr-xs" padding="none" 
    :color="color"
    :icon="icons[mode]">
    <q-menu v-model="menum" class="q-pa-sm">
      <div class="titre-md text-italic q-pa-xs">{{ $t('LOGmode_' + mode) }}</div>
      <div v-if="sf.userId">
        <div v-if="session.hasLocal" class="q-pa-xs">
          <span class="titre-md text-italic">{{ $t('pseudolocal') }}</span>
          <span class="q-ml-sm text-bold font-mono">{{ sf.userName }}</span>
        </div>
        <div class="q-pa-xs">
          <span class="titre-md text-italic">{{ $t('userid') }}</span>
          <span class="q-ml-sm font-mono">{{ sf.userId }}</span>
        </div>
        <div class="q-pa-xs">
          <span class="titre-md text-italic">{{ $t('sessionid') }}</span>
          <span class="q-ml-sm font-mono">{{ session.sessionId }}</span>
        </div>
      </div>

      <div v-if="starter.hasNet">
        <div v-if="permState !== 'granted'" class="q-pa-xs msg">{{ $t('PEinfo') }}</div>
        <q-expansion-item v-if="session.step > 1 && !session.noDoc" :label="lbl" dense
          :header-class="(session.syncKO ? 'tbw' : 'tbs') + ' text-bold titre-md text-italic'">
          <net-status/>
          <btn-cond icon="open_in_new" @ok="more"
            style="position:absolute;top:0;right:0"/>
        </q-expansion-item>
        <div v-if="session.noDoc" class="msg text-italic">{{ $t('NSnone') }}</div>
      </div>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts" vapor>
import stores from '../starter/allstores'
import { ref, computed } from 'vue'
import BtnCond from './BtnCond.vue'
import NetStatus from './NetStatus.vue'

import { $t } from '../starter/util'

const icons = ['', 'cloud_sync', 'cloud', 'flight', 'calculate']

const sf = stores.safe
const starter = stores.starter
const session = stores.session
// console.log(session.sessionId)

const permState = computed(() => starter.notificationAccess )

const mode = computed(() => session.loginMode )
const menum = ref()
const lbl = computed(() => session.syncKO ? $t('PEsyncko') : $t('PEsyncok'))

const color = computed(() => starter.hasNet && permState.value !== 'granted' ? 'negative' :
   (session.step > 0 ? 'green-5' : 'grey-5'))

const more = () => {
  menum.value = false
  session.dialogs.netStatus = true
}

</script>

<style lang="scss" scoped>
@import '../css/app.scss';
</style>