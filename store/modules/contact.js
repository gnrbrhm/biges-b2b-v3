import endpoints from '../../api/endpoints'

export const state = () => ({
  contactCategory: []
})
export const getters = {
  getContactCategoryList(state) {
    return state.contactCategory
  }
}

export const mutations = {
  setCategory(state, data) {
    state.contactCategory = data
  }
}

export const actions = {
  async getContactCategory({ commit }) {
    let { data } = await this.$axios({
      ...endpoints.contact_us.category
    })
    if (data) {
      commit('setCategory', data)
    }
  },
  async sendContactForm(_, payload) {
    return await this.$axios({
      ...endpoints.contact_us.contact_us,
      data: payload
    })
  }
}
