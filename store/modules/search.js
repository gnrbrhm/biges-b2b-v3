import endpoints from '../../api/endpoints'

export const state = () => ({
  searchData: {
    count: 0,
    results: []
  },
  popularSearchData: {
    count: 0,
    results: []
  },
  searchAraPageData: {},
  offerProducts: [],
  offerProductCount: 0
})
export const getters = {
  getSearchResult(state) {
    return state.searchData
  },
  getPopularSearchResult(state) {
    return state.popularSearchData
  },
  getSearchAraResult(state) {
    return state.searchAraPageData
  },
  getOfferProducts(state) {
    return state.offerProducts
  }
}

export const mutations = {
  setSearch(state, data) {
    state.searchData = data
  },
  setPopularSearch(state, data) {
    state.popularSearchData = data
  },
  setSearchAraPage(state, data) {
    state.searchAraPageData = data
  },
  setOfferProducts(state, data) {
    state.offerProducts = data.result
    state.offerProductCount = data.count
  }
}

export const actions = {
  async setSearchText({ commit }, payload) {
    let { status, data } = await this.$axios({
      ...endpoints.search.query,
      url: endpoints.search.query.url(payload.q)
    })
    if (status == 200 && data) {
      if (payload.from == 'ara') {
        commit('setSearchAraPage', data)
      } else {
        let stockData = data?.results?.filter(
          item => item.available_stock != 0 && item.type == 'products'
        )
        let allProducts = data?.results?.filter(item => item.type == 'products')
        commit('setSearch', payload.isStock ? stockData : allProducts)
      }
    }
  },
  async setPopularSearch({ commit }, payload) {
    let { status, data } = await this.$axios(endpoints.search.popular)
    if (status == 200 && data) {
      commit('setPopularSearch', data)
    }
  },
  async fetchOfferSearch({ commit }, payload) {
    let { status, data } = await this.$axios({
      ...endpoints.search.offer,
      params: payload
    })
    if (status == 200 && data) {
      commit('setOfferProducts', { result: data.results, count: data.count })
    }
  },
  clearSearch({ commit }) {
    commit('setSearch', {})
  },
  async getSearchTypes(_, payload) {
    let { data } = await this.$axios({
      ...endpoints.search.types,
      url: endpoints.search.types.url(payload.q, payload.type)
    })
    if (data.count > 0) {
      return true
    } else {
      return false
    }
  }
}
