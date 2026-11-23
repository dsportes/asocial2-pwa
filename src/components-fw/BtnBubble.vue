<!-- Bouton : affiche une bulle d'aide de texte MD sur click 
Dans le texte MD les liens externes vers la documentation sont écrits sous cette forme:

Dans la documentation générale, lire <a href="$$/appli/alertes.html" target="_blank">Alertes et restrictions d'accès associées</a>

Lest hyperliens sont suivis: les textes 'href="$$/' sont remplacés par:
'href="https://asocialapps.github.io/frdocs/''

Les liens vers la documentation externe par langue sont donnés dans constant.ts:
  DOC_URLS: {
    fr: "https://asocialapps.github.io/frdocs/",
    en: "https://asocialapps.github.io/frdocs/",
  },

Les liens vers les images sont de cette forme:
<img src="images/flowers.png" style="background-color:white">
L'image doit figurer dans public/images
-->
<template>
  <q-btn round padding="none"
    :icon="icon || 'question_mark'" 
    :color="color || (!starter.isDark || clear ? 'indigo-2' : 'indigo-9')" 
    size="md">
    <q-menu auto-close :class="(starter.isDark ? 'clear' : 'dark')"
      anchor="center middle" self="center middle"
      style="height: 300px; max-height:70vh; width: 400px; max-width:90vw">
      <scroll-md height="300px" :text="text" inverse />
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts" vapor>
import ScrollMd from '../components-fw/ScrollMd.vue'
import stores from '../starter/allstores'

const props = defineProps<{ 
  text: string, // texte MD à afficher
  icon?: string,
  color?: string,
  clear?: boolean
}>()

const starter = stores.starter

</script>

<style lang="scss" scoped>
@import '../css/app.scss';
</style>
