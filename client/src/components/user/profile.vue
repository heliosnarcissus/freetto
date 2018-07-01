<template>
  <div>
    <q-tabs align="justify">
      <q-tab default slot="title" name="tab-1" icon="message" label="User Profile" />
      <q-tab slot="title" name="tab-2" icon="fingerprint" label="Change Password" />
      <q-tab-pane name="tab-1" class="row justify-center item-center">
        <user-form/>
      </q-tab-pane>
      <q-tab-pane name="tab-2" class="row justify-center item-center">
        <user-password/>
      </q-tab-pane>
    </q-tabs>
  </div>
</template>
<style>
</style>
<script>
import UserForm from './form'
import UserPassword from './password'
export default {
  name: 'UserProfile',
  components: {
    UserForm,
    UserPassword
  }
}
</script>
