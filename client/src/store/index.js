import Vue from 'vue'
import Vuex from 'vuex'

// Root Store/Global state, getters, actions, mutations
import state from './state'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

import modules from './modules/index'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: modules.namespaces,
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      reducer: state => ({
        user: state.u.user
      })
    })
  ]
})

modules.hotReload(store)

export default store
