<template>
  <div class="q-my-lg" style="width: 600px; max-width: 90vw;">
      <q-list class="no-border">
        <q-list-header> Change Password for</q-list-header>
        <q-item>
          <q-item-side inverted letter="A"/>
          <q-item-main label="Ashley Solomon"/>
        </q-item>
        <q-item>
          <q-item-main>
            <q-input v-model="user.password" type="password" float-label="Old Password" />
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-input v-model="user.password" type="password" float-label="New Password" />
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-input v-model="user.password" type="password" float-label="Confirm Password" />
          </q-item-main>
        </q-item>
      </q-list>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: {
        password: ''
      }
    }
  }
}
</script>
