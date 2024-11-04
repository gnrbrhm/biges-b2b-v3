import endpoints from '../../api/endpoints'

import { createStore } from 'vuex'
import user from './modules/user'
import b2c from './modules/b2c'
import banner from './modules/banner'
// import basket from './modules/basket'
// import campaign from './modules/campaign'
// import categories from './modules/categories'
// import cheques from './modules/cheques'
// import compare from './modules/compare'
// import contact from './modules/contact'
// import core from './modules/core'
// import corporates from './modules/corporates'
// import favorite from './modules/favorite'
// import foryou from './modules/foryou'
// import notifications from './modules/notifications'
// import offers from './modules/offers'
// import outlet from './modules/outlet'
// import payment from './modules/payment'
// import products from './modules/products'
// import search from './modules/search'
// import showcase from './modules/showcase'
// import solutions from './modules/solutions'


const store = createStore({
    state() {
      return {
        layout: null,
      }
    },
    mutations: {
        SET_LAYOUT(state, value) {
            state.layout = value
          }
    },
    actions: {
        setLayout({ commit }, value) {
            commit('SET_LAYOUT', value)
          }
    },
    getters: {
        // isAuthenticated(state) {
        //     return state.auth.loggedIn
        //   },
        //   loggedInUser(state) {
        //     return state.auth.user
        //   },
          getLayout(state) {
            return state.layout
          }
    },
    modules:{
        user,
        b2c,
        banner,
        // basket,
        // campaign,
        // categories,
        // cheques,
        // compare,
        // contact,
        // core,
        // corporates,
        // favorite,
        // foryou,
        // notifications,
        // offers,
        // outlet,
        // payment,
        // products,
        // search,
        // showcase,
        // solutions,
      }
  })
  export default store



