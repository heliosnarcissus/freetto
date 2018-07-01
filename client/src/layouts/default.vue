<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :flat="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          TimeSheet
          <!-- <div slot="subtitle">Running on Quasar v{{ $q.version }}</div> -->
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <div class="full-height column">
        <q-list link class="no-border col-11">
          <q-item to="/profile">
            <q-item-side inverted letter="A"/>
            <q-item-main label="Ashley Solomon" />
          </q-item>
          <q-item to="/timesheet">
            <q-item-side inverted icon="alarm"/>
            <q-item-main label="Timesheet" />
          </q-item>
        </q-list>
        <q-list link class="no-border col">
          <q-item>
            <q-item-side inverted icon="exit to app"/>
            <q-item-main label="Logout" />
          </q-item>
        </q-list>
      </div>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
