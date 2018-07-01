<template>
  <div class="q-my-lg" style="width: 600px; max-width: 90vw;">
      <q-list class="no-border">
        <q-item>
          <!-- <q-item-side inverted letter="AS"/> -->
          <q-item-main>
            <div class="row justify-center">
              <avatar :size="80" username="Ashley Solomon"></avatar>
            </div>
             <div class="no-margin no-paddig row justify-center">
                <h4>Ashley Solomon</h4>
             </div>
          </q-item-main>
        </q-item>
        <q-item-separator />
        <q-item>
          <q-item-side icon="email"/>
          <q-item-main>
            ashley.s@gmail.com
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-side icon="phone"/>
          <q-item-main>
             09959213203
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-side icon="home"/>
          <q-item-main>
            # 155 Parayao, San Carlos City, Pangasinan
          </q-item-main>
        </q-item>
      </q-list>
  </div>
</template>
<script>
import Avatar from 'vue-avatar'
export default {
  components: {
    Avatar
  }
}
</script>
