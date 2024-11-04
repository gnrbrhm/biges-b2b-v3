import endpoints from '../../api/endpoints'

export const state = () => ({
  locations: [],
  district: [],
  currencies: {}
})

export const getters = {
  getLocationList(state) {
    return state.locations
  },
  getDistrictLocationList(state) {
    return state.district
  },
  getCurrency(state) {
    return state.currencies
  }
}

export const mutations = {
  setLocation(state, payload) {
    state.locations = payload
  },
  setDistrict(state, payload) {
    state.district = payload
  },
  SET_CURRENCIES(state, payload) {
    state.currencies = payload
  }
}

export const actions = {
  async fetchLocations({ commit }) {
    try {
      let { data, status } = await this.$axios({
        ...endpoints.core.locations
      })
      if (status == 200) {
        commit('setLocation', data)
      }
    } catch (err) {
      console.log(err)
    }
  },
  async fetchDistrictLocation({ commit }, payload) {
    commit('setDistrict', [])

    try {
      let { data, status } = await this.$axios({
        ...endpoints.core.district_locations,
        url: endpoints.core.district_locations.url(payload)
      })
      if (status == 200) {
        commit('setDistrict', data)
      }
    } catch (err) {
      console.log(err)
    }
  },
  async fetchCurrencies({ commit }) {
    let result = await this.$axios({
      ...endpoints.core.currencies
    })
    if (result.data) {
      commit('SET_CURRENCIES', result.data)
    }
  }
}
