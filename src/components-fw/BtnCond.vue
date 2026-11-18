<!-- Bouton normalisé
 - event: 'ok' (pas 'click')
-->
<template>
<span>
  <q-btn v-if="stop"
    :icon="icon"
    :padding="padding || 'none'"
    :disable="disable || false"
    :flat="flat || false"
    dense
    :no-caps="noCaps"
    :color="clr"
    :text-color="tc"
    :size="size || 'md'"
    :label="label || ''"
    :round="round || false"
    @click.stop="ok">
    <q-tooltip v-if="tp || diag" class="bg-white text-primary">{{diag || tp}}</q-tooltip>
    <menu-confirm v-if="menu" v-model="confirmCode" @confirm="ok()"/>
    <slot />
  </q-btn>
  <q-btn v-else
    :icon="icon"
    :padding="padding || 'none'"
    :disable="disable || false"
    :flat="flat || false"
    dense
    :no-caps="noCaps"
    :color="clr"
    :text-color="tc"
    :size="size || 'md'"
    :label="label || ''"
    :round="round || false"
    @click="clok">
    <q-tooltip v-if="tp || diag" class="bg-white text-primary">{{diag || tp}}</q-tooltip>
    <menu-confirm v-if="menu" v-model="confirmCode" @confirm="cf"/>
    <slot />
  </q-btn>
</span>
</template>

<script setup lang="ts" vapor>
import { ref, computed } from 'vue'

import stores from '../starter/allstores'
import MenuConfirm from './MenuConfirm.vue'

import { Crypt } from '../src-fw/crypt'

const ui = stores.ui

const props = defineProps<{
  color?: string, // defaut primary
  icon?: string, // defaut aucune
  size?: string, // defaut 'md'
  label?: string, // defaut 'ok'
  tp?: string, // tooltip: defaut aucun
  ctx?: any, // defaut null. Retransmis sur l'événement ok
  disable?: boolean,
  flat?: boolean,
  round?: boolean,
  stop?: boolean,
  noCaps?: boolean,
  padding?: string,
  confirm?: boolean
}>()

const menu = ref(false)
const confirmCode = ref()

const clok = () => {
  if (props.confirm) {
    // @ts-expect-error
    confirmCode.value = '' + (100 + Crypt.random(1)[0])
    menu.value = true
  } else ok()
}
const emit = defineEmits(['ok'])

const tc = computed(() => {
  if (props.flat) return clr.value
  const x = diag.value ? 'white' : (
  !props.color || props.color === 'primary' ? 'btntc' :
  (props.color === 'warning' ? 'btwtc' : 'white'))
  return x
})

const clr = computed(() => {
  if (diag.value) return 'negative'
  if (!props.color) return 'btnbg'
  if (props.color === 'warning') return 'btwbg'
  if (props.color === 'primary') return 'btnbg'
  if (props.color === 'nb') return ui.isDark ? 'white' : 'black'
  return props.color
})

const diag = ref('')

async function cf (b: boolean) {
  if (b) await ok()
  else {
    menu.value = false
    emit('ok', false)
  }
}

async function ok () {
  menu.value = false
  if (!diag.value) {
    emit('ok', props.ctx || null)
    return
  }
  await ui.diagDisplay(diag.value, true)
}

</script>

<style lang="scss" scoped>
@import '../css/app.scss';
</style>
