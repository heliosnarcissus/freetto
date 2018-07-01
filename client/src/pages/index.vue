<template>
  <q-page class="q-ma-md">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg"> -->
    <!-- <router-view/> -->
    <time-sheet-index/>
  </q-page>
</template>
<style>
</style>
<script>
import TimeSheetIndex from '../components/timesheet/index'
export default {
  name: 'PageIndex',
  components: {
    TimeSheetIndex
  }
}
</script>
