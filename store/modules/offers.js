import endpoints from '../../api/endpoints'

function discountValue(list_price, offer_price) {
  try {
    return (
      ((parseFloat(list_price) - parseFloat(offer_price)) /
        parseFloat(list_price)) *
      100
    ).toFixed(2)
  } catch (error) {
    console.log(error)
    return null
  }
}

function calculateTotalPrice(item, currency) {
  try {
    let priceTL = 0
    if (item.currency != 'TL') {
      priceTL =
        item.quantity *
        parseFloat(item.offer_price) *
        parseFloat(currency[item.currency])
    } else {
      priceTL = item.quantity * parseFloat(item.offer_price)
    }
    return priceTL / parseFloat(currency[currency.currency])
  } catch (error) {
    console.log(error)
    return null
  }
}

export const state = () => ({
  orderHistory: [],
  serviceProductList: [],
  offerProductList: []
})
export const getters = {
  getOrderHistory(state) {
    return state.orderHistory
  },
  getServiceProductList(state) {
    return state.serviceProductList
  },
  getOfferProductList(state) {
    return state.offerProductList
  }
}

export const mutations = {
  setOrderHistory(state, data) {
    state.orderHistory = data
  },
  setServiceProduct(state, data) {
    state.serviceProductList = data
  },
  setOfferProductList(state, data) {
    state.offerProductList = data
  },
  updateOfferProductList(state, data) {
    let changedData = {
      ...state.offerProductList[data.itemIndex],
      ...data.updateList
    }
    state.offerProductList.splice(data.itemIndex, 1, changedData)
  }
}

export const actions = {
  async fetchClientWithId(_, id) {
    let result = await this.$axios({
      ...endpoints.offer.client.getId,
      url: endpoints.offer.client.getId.url(id)
    })
    if (result && result.data && result.status == 200) {
      return result.data
    } else {
      return null
    }
  },
  async updateClientWithId(_, payload) {
    let result = await this.$axios({
      ...endpoints.offer.client.put,
      url: endpoints.offer.client.put.url(payload.id),
      data: payload
    })
    if (result && result.data && result.status == 200) {
      return result.data
    } else {
      return null
    }
  },
  async updateOfferLineList({ commit }, payload) {
    commit('updateOfferProductList', payload)
  },
  async updateOfferLineListTotalPrice({ commit, state }, payload) {
    commit(
      'setOfferProductList',
      state.offerProductList.map(item => {
        let totalPrice = 0
        if (payload.currency == 'TL') {
          totalPrice = calculateTotalPrice(item, payload)
        } else if (payload.currency == 'USD') {
          totalPrice = calculateTotalPrice(item, payload)
        } else if (payload.currency == 'EUR') {
          totalPrice = calculateTotalPrice(item, payload)
        }
        return {
          ...item,
          discount: discountValue(item.list_price, item.offer_price),
          totalPrice: totalPrice.toFixed(2)
        }
      })
    )
  },
  async fetchOfferLine({ commit }, payload) {
    let result = await this.$axios({
      ...endpoints.offer.get_offer_line,
      url: endpoints.offer.get_offer_line.url(payload.id)
    })
    if (result && result.data && result.status == 200) {
      commit(
        'setOfferProductList',
        result.data.results.map(item => {
          let totalPrice = 0
          if (payload.currency == 'TL') {
            totalPrice = calculateTotalPrice(item, payload)
          } else if (payload.currency == 'USD') {
            totalPrice = calculateTotalPrice(item, payload)
          } else if (payload.currency == 'EUR') {
            totalPrice = calculateTotalPrice(item, payload)
          }
          return {
            ...item,
            discount: discountValue(item.list_price, item.offer_price),
            totalPrice: totalPrice.toFixed(2)
          }
        })
      )
    }
  },
  async fetchClient(_, query) {
    let result = await this.$axios({
      ...endpoints.offer.client.get,
      params: {
        q: query || null
      }
    })
    if (result && result.data && result.status == 200) {
      return result.data.results
    } else {
      return null
    }
  },
  async fetchDefaultSettings() {
    let result = await this.$axios({
      ...endpoints.offer.default_settings.get
    })
    if (result && result.data && result.status == 200) {
      return result.data
    } else {
      return null
    }
  },
  async deleteOfferWithId(_, id) {
    let result = await this.$axios({
      ...endpoints.offer.delete_offer_line,
      url: endpoints.offer.delete_with_id.url(id)
    })
    if (result && result.data && result.status == 204) {
      return result.data.results
    } else {
      return null
    }
  },
  async fetchOfferWithId(_, payload) {
    let result = await this.$axios({
      ...endpoints.offer.get_with_id,
      url: endpoints.offer.get_with_id.url(payload.id),
      params: { pdf: payload.isPdf ? true : null }
    })
    if (result && result.data && result.status == 200) {
      return result.data
    } else {
      return null
    }
  },
  async updateOfferWithId(_, payload) {
    let result = await this.$axios({
      ...endpoints.offer.put_with_id,
      url: endpoints.offer.put_with_id.url(payload.id),
      data: payload
    })
    if (result && result.data && result.status == 200) {
      return result.data.results
    } else {
      return null
    }
  },
  async fetchOffer(_, page) {
    let result = await this.$axios({
      ...endpoints.offer.get,
      url: endpoints.offer.get.url(20, page)
    })
    if (result && result.data && result.status == 200) {
      return result.data
    } else {
      return null
    }
  },
  async updateDefaultSettings(_, payload) {
    let result = await this.$axios({
      ...endpoints.offer.default_settings.patch,
      data: payload
    })
    if (result && result.data && result.status == 200) {
      return result.data
    } else {
      return null
    }
  },
  async deleteOfferLine({ commit, state }, lineId) {
    let result = await this.$axios({
      ...endpoints.offer.delete_offer_line,
      url: endpoints.offer.delete_offer_line.url(lineId)
    })
    if (result && result.status == 204) {
      commit(
        'setOfferProductList',
        state.offerProductList.filter(item => item.id != lineId)
      )
    }
  },
  updateOfferLine(_, payload) {
    payload.forEach((item, index) => {
      this.$axios({
        ...endpoints.offer.patch_offer_line,
        url: endpoints.offer.patch_offer_line.url(item.id),
        data: { ...item, order: index }
      })
    })
  },
  async postOfferLine(_, payload) {
    let result = await this.$axios({
      ...endpoints.offer.add_offer_line,
      url: endpoints.offer.add_offer_line.url(payload.id),
      data: payload
    })
    if (result && result.data) {
      return result.data
    } else {
      return null
    }
  },
  async postOffer(_, payload) {
    let result = await this.$axios({
      ...endpoints.offer.post,
      data: payload
    })
    if (result && result.data) {
      return result.data
    } else {
      return null
    }
  },
  async copyOfferData(_, payload) {
    let result = await this.$axios({
      ...endpoints.offer.copy,
      url: endpoints.offer.copy.url(payload.id),
      data: payload
    })
    if (result && result.data) {
      return result.data
    } else {
      return null
    }
  },
  async postClient(_, payload) {
    let result = await this.$axios({
      ...endpoints.offer.client.post,
      data: payload
    })
    if (result && result.data) {
      return result.data
    } else {
      return null
    }
  }
}
