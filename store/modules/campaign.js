import endpoints from '../../api/endpoints'

export const state = () => ({
  campaigns: [],
  productCampaigns: [],
  isRefresh: false
})

export const getters = {
  getCampaigns(state) {
    return state.campaigns
  },
  getProductCampaigns(state) {
    return state.productCampaigns
  },
  getRefreshStatus(state) {
    return state.isRefresh
  }
}

export const mutations = {
  setRefreshStatus(state, payload) {
    state.isRefresh = payload
  },
  campaignReset(state) {
    state.productCampaigns.length = 0
  },
  setCampaign(state, data) {
    state.campaigns = data
  },
  getProductCampaign(state, data) {
    let mergedData = []

    data.forEach(element => {
      let filterData = state.productCampaigns.filter(
        val => val.campaign == element.campaign
      )
      if (filterData.length == 0) {
        mergedData.push(element)
      }
    })

    state.productCampaigns = [...state.productCampaigns, ...mergedData]
  }
}

export const actions = {
  async setCampaignRefreshStatus({ commit, state }) {
    commit('setRefreshStatus', !state.isRefresh)
  },
  async setCampaigns({ commit }) {
    let articles = await this.$axios({
      ...endpoints.campaigns.article
    })
    if (articles && articles.data && articles.data.results) {
      // commit('setCampaign', articles.data.results.slice(0, 8))
      commit('setCampaign', articles.data.results)
    }
  },
  async addBasket({ commit }, payload) {
    let { params } = payload
    let requestPayload = {
      ...endpoints.basket.add,
      data: { ...payload }
    }

    if (params) requestPayload['params'] = params

    try {
      let { data } = await this.$axios(requestPayload)
      commit('setLoading', false)

      if (data?.length) {
        let reduceQ = data.reduce((a, b) => ({
          quantity: parseInt(a.quantity) + parseInt(b.quantity)
        }))
        commit('setTotal', reduceQ.quantity)
      }
      commit('setBasket', data)

      return data
    } catch (error) {
      return null
    }
  },
  async fetchProductCampaigns({ commit }, stockCode) {
    commit('campaignReset')
    let campaigns = await this.$axios({
      ...endpoints.product.product_campaign,
      url: endpoints.product.product_campaign.url(stockCode)
    })
    if (campaigns?.data?.results?.length) {
      commit('getProductCampaign', campaigns.data.results)
    }
  },
  async fetchCampaignDetail(_, pageUrl) {
    let result = await this.$axios({
      ...endpoints.campaigns.campaign_detail,
      url: endpoints.campaigns.campaign_detail.url(pageUrl)
    })
    if (result?.data) {
      return result.data
    } else {
      return null
    }
  }
}
