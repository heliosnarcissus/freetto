<template>
  <q-page class="q-ma-md">
    {{isToken}}
    {{getTimeSheets}}
    ss
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg"> -->
    <user-profile/>
  </q-page>
</template>

<style>
</style>

<script>
import UserProfile from '../components/user/profile'
import {mapGetters} from 'vuex'
export default {
  name: 'PageProfile',
  computed: {
    ...mapGetters('u', [ 'isToken' ]),
    ...mapGetters('t', [ 'getTimeSheets' ])
  },
  components: {
    UserProfile
  }
}
</script>
