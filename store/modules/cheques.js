import endpoints from '../../api/endpoints'

export const state = () => ({
  cheques: [],
  loading: false,
  activeCheque: null
})

export const getters = {
  getCheques(state) {
    return state.cheques
  },
  getChequeLoading(state) {
    return state.loading
  },
  getActiveCheque(state) {
    return state.activeCheque
  }
}

export const mutations = {
  setLoading(state, data) {
    state.loading = data
  },
  setCheques(state, data) {
    state.cheques = data
  },
  setCheque(state, cheque) {
    state.cheques.unshift(cheque)
  },
  setActiveCheque(state, value) {
    state.activeCheque = value
  }
}

export const actions = {
  async fetchCheques({ commit }) {
    try {
      commit('setLoading', true)
      let { data } = await this.$axios({
        ...endpoints.checkout.cheque.list
      })
      commit('setCheques', data.results)
      commit('setLoading', false)
      return data.results
    } catch (error) {
      commit('setLoading', false)
      return error
    }
  },
  async addCheque({ commit }, data) {
    try {
      commit('setLoading', true)
      let response = await this.$axios({
        ...endpoints.checkout.cheque.create,
        headers: { 'Content-Type': 'multipart/form-data' },
        data
      })

      if (response.status == 201) {
        commit('setCheque', response.data)
        commit('setLoading', false)
        return response.data
      } else {
        commit('setLoading', false)
        return false
      }
    } catch (error) {
      commit('setLoading', false)
      return 'server_error'
    }
  },
  async payCheque({ commit }, data) {
    try {
      commit('setLoading', true)
      let response = await this.$axios({
        ...endpoints.checkout.cheque.pay,
        data
      })

      if (response.status === 201) {
        commit('setLoading', false)
        return response
      } else {
        commit('setLoading', false)
        return false
      }
    } catch (error) {
      commit('setLoading', false)
      return null
    }
  },
  async chooseCheque({ commit }, value) {
    commit('setActiveCheque', value)
  }
}
