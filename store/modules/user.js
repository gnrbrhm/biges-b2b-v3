import endpoints from '../api/endpoints'

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  async resetPassword(_, { email, isMobile }) {
    let { data, status } = await this.$axios({
      ...endpoints.user.reset_password,
      data: { email, isMobile }
    })
    if (status == 200) {
      return data
    } else {
      null
    }
  },
  async resetPasswordConfirm(_, payload) {
    let { data, status } = await this.$axios({
      ...endpoints.user.reset_password_confirm,
      data: payload
    })
    if (status == 200) {
      return data
    } else {
      null
    }
  }
}

export default {
    namespaced: true,  // Modülün namespaced olmasını sağla
    state,
    mutations,
    actions,
    getters
  }