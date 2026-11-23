<template>
<q-layout view="hHh lpR fFf">
  <q-header>
    <std-header v-if="!new Set(['safeHome', 'admin', 'demands', 'sponsorings', 'auteur', 'coredac', 'codir']).has(ui.page)"/>
    <div v-else>
      <safe-header v-if="ui.page === 'safeHome'"/>
      <admin-header v-if="ui.page === 'admin'"/>
      <demands-header v-if="ui.page === 'demands'"/>
      <sponsorings-header v-if="ui.page === 'sponsorings'"/>
      <auteur-header v-if="ui.page === 'auteur'"/>
      <coredac-header v-if="ui.page === 'coredac'"/>
      <codir-header v-if="ui.page === 'codir'"/>
    </div>
  </q-header>
  <q-drawer v-if="session.step === 2" v-model="ui.leftMenu" :class="sty()"
    show-if-above :width="350" :breakpoint="700" elevated >
    <left-menu/>
  </q-drawer>

  <q-page-container class="font-def">
    <transition name="anim1">
      <q-page v-if="ui.page === 'safeHome'"
        style="display:grid;min-height:80vh;place-items:center;margin:0">
        <safe-home/>
      </q-page>
    </transition>
    <transition name="anim1">
      <q-page v-if="ui.page === 'admin'" class="column">
        <admin-page class="q-mt-sm"/>
      </q-page>
    </transition>
    <transition name="anim1">
      <q-page v-if="ui.page === 'demands'" class="column">
        <demands-page class="q-mt-sm"/>
      </q-page>
    </transition>
    <transition name="anim1">
      <q-page v-if="ui.page === 'sponsorings'" class="column">
        <sponsorings-page class="q-mt-sm"/>
      </q-page>
    </transition>
    <transition name="anim1">
      <q-page v-if="ui.page === 'coredac'">
            <q-resize-observer @resize="ui.setPh" />
        <coredac-page/>
      </q-page>
    </transition>
    <transition name="anim1">
      <q-page v-if="ui.page === 'codir'">
        <q-resize-observer @resize="ui.setPh" />
        <codir-page/>
      </q-page>
    </transition>    
    <transition name="anim1">
      <q-page v-if="ui.page === 'auteur'">
        <q-resize-observer @resize="ui.setPh" />
        <auteur-page/>
      </q-page>
    </transition>
    <transition name="anim1">
      <q-page v-if="ui.page === 'app'" :class="ano">
        <!--div class="title-xxl">Hello world</div-->
      </q-page>
    </transition>
    <transition name="anim1">
      <q-page v-if="ui.page === 'test'" class="column">
        <test-page class="q-mt-sm"/>
      </q-page>
    </transition>
  </q-page-container>

  <got-it/>
  <confirm-quit/>
  <confirm-close/>
  <confirm-close2/>
  <confirm-closesession/>
  <dialog-exc/>
  <dialog-help/>
  <net-statusdial v-if="session.dialogs.netStatus"/>

</q-layout>
</template>

<script setup lang="ts" vapor>
import { computed, onMounted } from 'vue'

import stores from '../starter/allstores.ts'

import { sty } from '../src-fw/util.ts'

import StdHeader from '../components-fw/StdHeader.vue'
import SafeHeader from '../pages-fw/SafeHeader.vue'
import AdminHeader from '../pages-fw/AdminHeader.vue'
import DemandsHeader from '../pages-fw/DemandsHeader.vue'
import SponsoringsHeader from '../pages-fw/SponsoringsHeader.vue'
import CoredacHeader from '../pages/CoredacHeader.vue'
import CodirHeader from '../pages/CodirHeader.vue'

import AuteurHeader from '../pages/AuteurHeader.vue'

import SafeHome from '../pages-fw/SafeHome.vue'
import AdminPage from '../pages-fw/AdminPage.vue'
import DemandsPage from '../pages-fw/DemandsPage.vue'
import SponsoringsPage from '../pages-fw/SponsoringsPage.vue'
import CoredacPage from '../pages/CoredacPage.vue'
import CodirPage from '../pages/CodirPage.vue'

import AuteurPage from '../pages/AuteurPage.vue'
import TestPage from '../pages-fw/TestPage.vue'

import NetStatusdial from '../dialogs-fw/NetStatusdial.vue'

import LeftMenu from '../components/LeftMenu.vue'

import GotIt from '../dialogs-fw/GotIt.vue'
import ConfirmQuit from '../dialogs-fw/ConfirmQuit.vue'
import ConfirmClose from '../dialogs-fw/ConfirmClose.vue'
import ConfirmClose2 from '../dialogs-fw/ConfirmClose2.vue'
import ConfirmClosesession from '../dialogs-fw/ConfirmClosesession.vue'
import DialogExc from '../dialogs-fw/DialogExc.vue'
import DialogHelp from '../dialogs-fw/DialogHelp.vue'

import { AS2report } from '../as2/documents.ts'
import { AS2FormsReport } from '../as2/forms.ts'
import { AS2CredentialsReport } from '../as2/credentials.ts'
import { FWreport } from '../src-fw/fwdocuments.ts'

// import { appConfig } from '../app/config'
// import { $t } from '../starter/util.ts'
// console.log($t('hello'), $t('world'))

const session = stores.session
const ui = stores.ui
const starter = stores.starter

const ano = computed(() => 'ano-' + (starter.isDark ? 'w' : 'b'))

{
  let exc = AS2report()
  if (!exc) exc = FWreport()
  if (!exc) exc = AS2FormsReport()
  if (!exc) exc = AS2CredentialsReport()

  if (exc) {
    alert(exc.toString())
  }
}

onMounted(async () => { // Sur onMounted parce que async
  await session.setStep(0)
})

</script>

<style lang="scss" scoped>
@import '../css/app.scss';
.wifi { position: fixed; right: 3px; top: 3px; border-radius: 15px; }

.anim1-enter-active { transition: all 0.3s;}
.anim1-leave-active { transition: all 0.3s;}
.anim1-enter-from { opacity:0; transform: translateX(50%);}
.anim1-leave-to { opacity:0; transform: translateX(-50%);}

.ano-b, .ano-w {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 30%;
}
.ano-b {
  background-image: url('../assets/anonymous-bt.svg');
}
.ano-w {
  background-image: url('../assets/anonymous-wt.svg');
}
</style>
