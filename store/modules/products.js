import endpoints from '../../api/endpoints'

export const state = () => ({
  productsOutlet: [],
  similarProducts: [],
  relatedProducts: [],
  comparisonProducts: {}
})

export const getters = {
  getSimilarProductList(state) {
    return state.similarProducts || []
  },
  getRelatedProductList(state) {
    return state.relatedProducts || []
  },
  getFeaturesCheckList(state) {
    return state.featuresCheckList
  },
  getComparisonProducts(state) {
    return state.comparisonProducts
  }
}
export const mutations = {
  setProductsOutlet(state, data) {
    state.productsOutlet = data
  },
  setSimilarProducts(state, data) {
    state.similarProducts = data
  },
  setRelatedProducts(state, data) {
    state.relatedProducts = data
  },
  setComparison(state, data) {
    state.comparisonProducts[data.stockCode] = data.data
  }
}

export const actions = {
  async setComparisonProducts({ commit }, payload) {
    commit('setComparison', payload)
  },
  async fetchBrandProducts(_, payload) {
    try {
      let result = await this.$axios({
        ...endpoints.product.brand_products,
        params: { ...payload }
      })
      return result?.data
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async fetchBrands() {
    try {
      let result = await this.$axios({
        ...endpoints.product.brands
      })
      return result?.data
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async fetchProductDetail(_, stock_code) {
    try {
      let result = await this.$axios({
        ...endpoints.product.product_detail,
        url: endpoints.product.product_detail.url(stock_code)
      })
      return result.data
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async fetchOpportunityProducts() {
    let { data, status } = await this.$axios(endpoints.showcase.list)
    if (status == 200) {
    }
  },
  async getProductsOutlet({ commit }) {
    try {
      let { data, status } = await this.$axios(
        endpoints.product.product_outlets
      )
      if (status == 200) commit('setProductsOutlet', data)
    } catch (error) {
      return error
    }
  },
  async fetchSimilarProducts({ commit }, id) {
    let { data } = await this.$axios({
      ...endpoints.product.product_similar,
      url: endpoints.product.product_similar.url(id)
    })
    if (data) {
      commit('setSimilarProducts', data.splice(0, 8))
    }
  },
  async fetchSimilarProductCounter(_, trace) {
    let { data } = await this.$axios({
      ...endpoints.product.product_similar_counter,
      data: {
        main: trace.main_product_code,
        similar: trace.similar_product_code
      }
    })
  },
  async fetchRelatedProducts({ commit }, id) {
    let { data } = await this.$axios({
      ...endpoints.product.product_similar,
      url: endpoints.product.product_related.url(id)
    })
    if (data) {
      commit('setRelatedProducts', data.splice(0, 8))
    }
  },
  async setFeatureCheck(_, payload) {
    let result = await this.$axios({
      ...endpoints.user.update_filters,
      data: { ...payload }
    })

    if (result.status == 201) {
      return result.data
    } else {
      return null
    }
  }
}
