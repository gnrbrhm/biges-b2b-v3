import endpoints from '../../api/endpoints'
import Cookies from 'js-cookie'
// TODO Vue yapılandırması düzenlenicek
// import Vue from 'vue'

export const state = () => ({
  loading: false,
  total: 0,
  basket: [],
  saveList: [],
  lockedList: [],
  basketDetails: {},
  lockedBasketDetails: {},
  isShowSavedList: false,
  isBasketEmpty: false,
  basketQueries: {}
})

export const getters = {
  getBasketDetails(state) {
    return state.basketDetails
  },
  getLockedBasketDetails(state) {
    return state.lockedBasketDetails
  },
  getBasketQueries(state) {
    return state.basketQueries
  },
  getSaveList(state) {
    return state.saveList
  },
  getLockedList(state) {
    return state.lockedList
  }
  // getMappedPaymentOptions(state) {
  //   return { ...state.basketDetails, payment_options: array_move(state.basketDetails.paymentOptions, 4, 3) }
  // }
}

export const mutations = {
  setBasketQueries(state, value) {
    state.basketQueries = value
  },
  setFromEmptyBasket(state, value) {
    state.isBasketEmpty = value
  },
  setShowSavedList(state, value) {
    state.isShowSavedList = value
  },
  setTotal(state, value) {
    state.total = value
    Cookies.set('basket.total', value)
  },
  setBasket(state, data) {
    state.basket = data
  },
  setBasketSaveList(state, data) {
    state.saveList = data
  },
  setBasketLockedList(state, data) {
    state.lockedList = data
  },
  setBasketDetails(state, payload) {
    try {
      let data = { ...payload }
      if (data.paymentOptions && data.paymentOptions.length > 0) {
        data.paymentOptions = data.paymentOptions.map(payment => ({
          ...payment,
          paymentMethodName: payment.paymentDetails.paymentMethodName
        }))
      }
      state.basketDetails = data
    } catch (error) {
      console.log('basket.js:', error)
      state.basketDetails = {}
    }
  },
  setLockedBasketDetails(state, payload) {
    try {
      let data = { ...payload }
      state.lockedBasketDetails = data
    } catch (error) {
      console.log('basket.js:', error)
    }
  },
  setLoading(state, data) {
    state.loading = data
  },
  addNewList(state, data) {
    state.saveList.unshift(data)
  },
  setDeleteBasket(state, data) {
    let temp = []
    state.basketDetails.productList.map(p => {
      if (data.some(d => d.stockCode == p.stockCode)) {
        return
      }
      return temp.push(p)
    })

    state.basketDetails.productList = temp
  },
  setDeleteSaveBasket(state, id) {
    let findIndex = state.saveList.findIndex(i => i.id === id)
    state.saveList.splice(findIndex, 1)
  },
  setDeleteSaveBasketItem(state, id) {
    let firstIndex = state.saveList.findIndex(obj =>
      obj.products.find(i => i.id === id)
    )
    let secondIndex = state.saveList[firstIndex].products.findIndex(
      i => i.id === id
    )
    state.saveList[firstIndex].products.splice(secondIndex, 1)
  }
}

export const actions = {
  async fetchRawBasket({ commit }, params) {
    commit('setLoading', true)
    try {
      let { data } = await this.$axios({
        ...endpoints.basket.raw_basket
      })
      commit('setLoading', false)
      if (data) {
        return data
      }
    } catch (error) {
      commit('setLoading', false)
      return null
    }
  },
  async getBasket({ commit }, params) {
    console.log('Params', params)
    commit('setLoading', true)
    commit('setBasketDetails', {
      ...this.basketDetails,
      availableCampaignProductsCount: 0
    })
    try {
      commit('setBasketQueries', { ...endpoints.basket.list.params, ...params })

      let { data } = await this.$axios({
        ...endpoints.basket.list,
        params: { ...endpoints.basket.list.params, ...params }
      })
      console.log('data', data)
      if (data) {
        commit('setBasketDetails', data)
        if (data.warnMessages && data.warnMessages.length) {
          for (let message in data.warnMessages) {
        // TODO Vue Yapılandırması düzenlenicek
            // Vue.notify({
            //   type: 'info',
            //   title: 'Bilgilendirme',
            //   text: data.warnMessages[message],
            //   duration: 5000
            // })
          }
        }
        commit('setLoading', false)
        if (data && data.productList) {
          let reduceQ = data.productList.reduce((a, b) => ({
            quantity: parseInt(a.quantity) + parseInt(b.quantity)
          }))
          commit('setTotal', reduceQ.quantity)
        } else {
          commit('setTotal', 0)
        }
      }
    } catch (error) {
      commit('setLoading', false)
      commit('setTotal', 0)
      console.log(error)
    }
  },
  async getBasketSaveList({ commit }) {
    try {
      let result = await this.$axios({
        ...endpoints.basket.save_list
      })
      if (result?.data?.results?.length) {
        commit('setBasketSaveList', result.data.results)
        return result.data.results
      } else {
        return null
      }
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async getBasketLockedList({ commit }) {
    try {
      let result = await this.$axios({
        ...endpoints.basket.save_locked_basket
      })
      if (result) {
        commit('setBasketLockedList', result.data)
        return result.data
      } else {
        return null
      }
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async postSavedLockedBasket({ commit }, payload) {
    try {
      let { data } = await this.$axios({
        ...endpoints.basket.list_locked_basket,
        data: {
          ...payload
        }
      })
      commit('setLockedBasketDetails', data)
      return data
    } catch (error) {
      console.log(error)
      return null
    }
  },
  setShowSaved({ commit, state }, payload) {
    commit('setFromEmptyBasket', payload)
    commit('setShowSavedList', !state.isShowSavedList)
  },
  async postSavedBasket({ commit }, id) {
    try {
      let { data } = await this.$axios({
        ...endpoints.basket.saved_basket,
        url: endpoints.basket.saved_basket.url(id)
      })
      // commit('setBasketSaveList', data.results)
      return data
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async deleteBasketSaveAll({ commit }) {
    try {
      let response = await this.$axios({
        ...endpoints.basket.save_delete_all
      })
      if (response?.status == 204) {
        commit('setBasketSaveList', [])

        return true
      }
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async deleteBasketSave({ commit }, id) {
    try {
      let response = await this.$axios({
        ...endpoints.basket.save_delete,
        url: endpoints.basket.save_delete.url(id)
      })
      if (response.status === 204) commit('setDeleteSaveBasket', id)
      else console.log('ERROR', response.statusText)
    } catch (error) {
      console.log(error)
    }
  },
  async deleteBasketSaveItem({ commit }, id) {
    try {
      let response = await this.$axios({
        ...endpoints.basket.save_delete_item,
        url: endpoints.basket.save_delete_item.url(id)
      })
      if (response.status === 204) commit('setDeleteSaveBasketItem', id)
      else console.log('ERROR', response.statusText)
    } catch (error) {
      console.log(error)
    }
  },
  async addBasket({ commit }, payload) {
    let { params } = payload
    let requestPayload = {
      ...endpoints.basket.add,
      data: { ...payload }
    }

    if (params) requestPayload['params'] = params

    commit('setLoading', true)
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
      commit('setLoading', false)
      return null
    }
  },
  async updateProductInBasket({ commit }, payload) {
    let { stock_code, quantity, outlet_no, variant_code } = payload
    commit('setLoading', true)
    try {
      let { data } = await this.$axios({
        ...endpoints.basket.update,
        data: {
          stock_code,
          quantity,
          outlet_no,
          variant_code
        }
      })
      commit('setBasket', data)
      commit('setLoading', false)

      return data
    } catch (error) {
      commit('setLoading', false)
      return error
    }
  },
  async resetBasket({ commit }, isRemoveBasket) {
    // commit('setLoading', true)
    if (isRemoveBasket) {
      commit('setBasketDetails', {})
    } else {
      let { status } = await this.$axios(endpoints.basket.reset)
      if (status == 200) {
        commit('setTotal', 0)
      }
    }

    // commit('setLoading', false)
  },
  async listCampaigns(_) {
    return await this.$axios(endpoints.basket.list_campaign_products)
  },
  async saveBasketList({ commit }, payload) {
    try {
      let { data } = await this.$axios({
        ...endpoints.basket.save,
        data: { name: payload }
      })
      commit('addNewList', data)
      return data
    } catch (error) {
      console.log('ERROR: ', error)
      return null
    }
  },
  async delBasket({ commit, dispatch }, items) {
    commit('setLoading', true)
    for await (let product of items) {
      if (product.isCampaigned.success) {
        await dispatch('getBasket', {
          campaign_stock_code: product.stockCode,
          campaign_quantity: 0
        })
      } else {
        let req = {
          stock_code: product.stockCode,
          quantity: 0
        }

        if (product?.isOutlet?.outletNo) {
          req['outlet_no'] = product?.isOutlet?.outletNo
        }

        if (product?.variant?.status) {
          req['variant_code'] = product.variant.code
        }
        await dispatch('updateProductInBasket', req)
      }
    }
    commit('setDeleteBasket', items)
    commit('setLoading', false)
  }
}
