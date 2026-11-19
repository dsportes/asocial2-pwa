<!--
Présente une barre avec un bulle gauche, titre, icon, bulle droite:
- affiche les bulles (à droite et / ou à gauche) 
  sur click (différente si disable)
- envoie l'event 'open', si pas 'passive' en cas de click sur le titre ou icon.
-->
<template>
<div class="row full-width items-center select">
  <btn-bubble v-if="bubbleleft" class="col-auto q-mr-sm" 
    :text="disable && disbubbleleft ? disbubbleleft : bubbleleft"/>

  <div :class="clt" @click="open">{{title}}</div>

  <q-icon v-if="!passive" @click="open"
    class="col-auto"
    :size="large ? '30px' : '24px'"
    :name="icon || 'chevron_right'" 
    :disable="disable" 
    :color="color || 'none'"/>

  <btn-bubble v-if="bubble" class="col-auto q-ml-md" 
    :text="disable && disbubble ? disbubble : bubble"/>
</div>
</template>

<script setup lang="ts" vapor>
import { computed, type Ref } from 'vue'
import stores from '../starter/allstores'
import BtnBubble from '../components-fw/BtnBubble.vue'

const emit = defineEmits(['open'])
const props = defineProps<{
  icon?: string,
  large?: boolean, // true si large
  passive?: boolean, // si true, le cursor n'est PAS pointer, pas devent 'open' émis, pas de chevron à droite
  center?: boolean, //
  disable?: boolean,
  title: string, // titre de la bar
  bubble: string,  // texte de la bulle d'aide A DROITE
  disbubble?: string, // texte de la bulle d'aide A DROITE QUAND disable
  bubbleleft?: string,  // texte de la bulle d'aide A GAUCHE
  disbubbleleft?: string, // texte de la bulle d'aide A GAUCHE QUAND disable
  size?: string,
  color?: string
}>()

const clt = computed(() => 'col' 
  + (props.center ? ' text-center' : ' text-right') 
  + (props.disable ? ' disabled' : '')
  + (!props.passive ? ' cursor-pointer' : '')
  + (props.large ? ' titre-lg' : ' titre-md')
)

const open = () => {
  if (!props.passive) emit('open', true)
}
const ui = stores.ui
</script>

<style lang="scss" scoped>
@import '../css/app.scss';
.select:hover { background-color: rgba(127, 127, 127, 0.3)}
</style>
