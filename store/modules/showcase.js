import endpoints from '../../api/endpoints'

export const state = () => ({
  showcases: [],
  basketShowcases: []
})

export const getters = {
  getBasketShowcases(state) {
    return state.basketShowcases
  }
}

export const mutations = {
  /**
   * The showcase_type property will
   * be used to distinguish the component.
   * component types: "COMPLEX", "SIMPLE", "NORMAL"
   */
  setShowcases(state, data) {
    state.showcases = data
  },
  setBasketShowcases(state, data) {
    state.basketShowcases = data
  }
}

export const actions = {
  async getShowcases({ commit }) {
    let { status, data } = await this.$axios(endpoints.showcase.list)
    if (status == 200 && data && data.length) {
      commit('setShowcases', data)
    }
  },
  async fetchShowcases({ commit }, payload) {
    let result = await this.$axios({
      ...endpoints.showcase.list,
      params: payload
    })
    if (result && result.status == 200 && result.data && result.data.length) {
      commit('setBasketShowcases', result.data)
    }
  }
}
