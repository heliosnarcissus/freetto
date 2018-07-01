import user from './user'
import timesheet from './timesheet'

const namespaces = {
  u: user,
  t: timesheet
}

const hotReload = (store) => {
  if (process.env.DEV && module.hot) {
    module.hot.accept([ './user', './timesheet' ], () => {
      let nMod = {}
      for (let key in namespaces) {
        nMod[key] = namespaces[key]
      } //
      store.hotUpdate({ modules: nMod })
    })
  }
}

export default {
  namespaces,
  hotReload
}
