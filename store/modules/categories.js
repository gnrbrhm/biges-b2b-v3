import endpoints from '../../api/endpoints'

export const state = () => ({
  categories: [],
  solutionCategories: []
})

export const mutations = {
  setCategories(state, data) {
    state.categories = data
  },
  setSolutionCategories(state, data) {
    state.solutionCategories = data
  }
}

export const actions = {
  async getSolutionCategories({ commit }) {
    let { status, data } = await this.$axios(endpoints.news.solution_mega_menu)
    if (status == 200) {
      commit('setSolutionCategories', data)
    }
  },
  async getProductCategories({ commit }) {
    let { status, data } = await this.$axios(
      endpoints.product.product_categories
    )
    if (status == 200) {
      commit('setCategories', data)
    }
  }
}

export const getters = {
  getCategories: state => state.categories
}
