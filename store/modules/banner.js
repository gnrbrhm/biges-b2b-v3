import endpoints from '../../api/endpoints'

export const state = () => ({
  bannerCategory: [],
  bannerItems: {},
  globalBannerID: null
})

export const getters = {
    
}

export const mutations = {
  setBannerList(state, data) {
    state.globalBannerID = data?.[0]?.id
    state.bannerCategory = data
  },
  setBannerItems(state, payload) {
    let { id, data } = payload
    state.bannerItems[id] = data
  }
}

export const actions = {
  async getBannerCategories({ commit, dispatch }) {
    let { status, data } = await this.$axios(endpoints.banner.categories_list)
    if (status == 200) {
      commit('setBannerList', data)
      await dispatch('getBannerItems', data[0].id)
    }
  },
  async getBannerItems({ commit }, id) {
    let { status, data } = await this.$axios({
      ...endpoints.banner.list_id,
      url: endpoints.banner.list_id.url(id)
    })
    if (status == 200) {
      commit('setBannerItems', { id, data })
    }
  },
  async fetchSolutionsBanner() {
    let result = await this.$axios({
      ...endpoints.news.solution_banner
    })
    if (result.status == 200) {
      return result.data
    } else {
      return null
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