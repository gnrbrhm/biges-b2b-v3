import endpoints from '../../api/endpoints'

export const state = () => ({
  bannerCategory: [],
  bannerItems: {}
})

export const mutations = {
  setBannerList(state, data) {
    state.bannerCategory = data
  },
  setBannerItems(state, payload) {
    let { id, data } = payload
    state.bannerItems[id] = data
  }
}

export const actions = {
  async fetchOutletProduct(_, id) {
    let result = await this.$axios({
      ...endpoints.product.product_outlet_detail,
      url: endpoints.product.product_outlet_detail.url(id)
    })
    if (result.status == 200) {
      return result.data
    } else {
      return null
    }
  }
}
