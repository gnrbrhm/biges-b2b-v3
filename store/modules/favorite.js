import endpoints from '../../api/endpoints'

export const state = () => ({
  categoryList: [],
  productList: []
})
export const getters = {
  getCategoryList(state) {
    return state.categoryList
  },
  getFavoriteProductList(state) {
    return state.productList
  }
}

export const mutations = {
  setCategoryList(state, data) {
    state.categoryList = data
  },
  setFavoriteProductList(state, data) {
    state.productList = data
  }
}

export const actions = {
  async setCategory({ dispatch }, categoryName) {
    let { data } = await this.$axios({
      ...endpoints.favorite.add_category,
      data: { name: categoryName }
    })
    if (data) {
      dispatch('getCategory')
    }
  },
  async getCategory({ commit }, query) {
    let result = await this.$axios({
      ...endpoints.favorite.category_list,
      params: { q: query ? query : null }
    })
    if (result && result.status == 200 && result.data && result.data.results) {
      commit('setCategoryList', result.data.results)
    }
  },
  async setProductToCategory(_, payload) {
    return await this.$axios({
      ...endpoints.favorite.add_product_to_category,
      data: payload
    })
  },
  async removeProductFavorite(_, stockCode) {
    let result = await this.$axios({
      ...endpoints.favorite.remove_product_favorite,
      url: endpoints.favorite.remove_product_favorite.url(stockCode)
    })
    if (result.status == 204) {
      return true
    } else {
      return false
    }
  },
  async getFavoriteProducts({ commit }) {
    let { data } = await this.$axios({
      ...endpoints.favorite.product_list
    })
    if (data && data.results) {
      commit('setFavoriteProductList', data.results)
    }
  }
}
