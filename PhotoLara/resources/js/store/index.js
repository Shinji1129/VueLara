import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import message from './message'
import error from './error'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    message,
    error
  }
})

export default store