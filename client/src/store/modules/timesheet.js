const state = {
  timesheets: [ { id: 1 } ]
}

const getters = {
  getTimeSheets: (state) => {
    return state.timesheets
  }
}

const mutations = {
}

const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
