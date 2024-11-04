import endpoints from '../../api/endpoints'

export const state = () => ({
  paymentResult: {
    order_no: '',
    orderer: '',
    document_id: ''
  },
  isBuy: false,
  paymentStatus: null,
  loading: false,
  selectedCurrency: 'USD',
  paymentType: {
    delivery_type: '',
    payment_type: '',
    billing_address_number: 0,
    shipping_address_number: 0,
    use_club_points: false,
    installment: 0,
    is_saved_card: false,
    card_info: {
      card_holder_name: null,
      card_number: '',
      expire_month: 0,
      expire_year: 0,
      cvc: 0
    },
    is_three_d_security: false,
    payment_sales_text_confirm: false,
    distance_selling_text_confirm: false
  }
})

export const getters = {
  getPaymentType(state) {
    return state.paymentType
  },
  getPaymentStatus(state) {
    return state.paymentStatus
  },
  getPaymentResult(state) {
    return state.paymentResult
  },
  getSelectedCurrency(state) {
    return state.selectedCurrency
  }
}

export const mutations = {
  changeCurrency(state, data) {
    state.selectedCurrency = data
  },
  updatePaymentResult(state, data) {
    state.paymentResult = data
  },
  setLoading(state, data) {
    state.loading = data
  },
  updatePaymentType(state, data) {
    console.log('updatePaymentType', data)
    state.paymentType = {
      ...state.paymentType,
      ...data,
      card_info: { ...state.paymentType.card_info, ...data.card_info }
    }
  },
  showBuybutton(state, data) {
    state.isBuy = data
  },
  updatePaymentStatus(state, data) {
    state.paymentStatus = data
  }
}

export const actions = {
  setPaymentResult({ commit }, payload) {
    commit('updatePaymentResult', payload)
  },
  async fetchIyzicoCreditCard({ commit, state }) {
    commit('setLoading', true)
    try {
      let { data } = await this.$axios({
        ...endpoints.checkout.credit_card.hook
      })
      commit('setLoading', false)
      return data
    } catch (error) {
      commit('setLoading', false)
      console.log(error)
      return null
    }
  },
  async postOpenAccount({ commit, state }, payload) {
    commit('setLoading', true)
    try {
      let { data } = await this.$axios({
        ...endpoints.checkout.open_account,
        data: {
          delivery_type: state.paymentType.delivery_type,
          payment_type: state.paymentType.payment_type,
          billing_address_number: state.paymentType.billing_address_number,
          shipping_address_number: state.paymentType.shipping_address_number,
          use_club_points: state.paymentType.use_club_points,
          ...payload
        }
      })
      commit('setLoading', false)
      return data
    } catch (error) {
      commit('setLoading', false)
      console.log(error)
      return null
    }
  },
  async postCheckoutTransfer({ commit, state }, payload) {
    commit('setLoading', true)
    try {
      let { data } = await this.$axios({
        ...endpoints.checkout.transfer,
        data: {
          delivery_type: state.paymentType.delivery_type,
          payment_type: state.paymentType.payment_type,
          billing_address_number: state.paymentType.billing_address_number,
          shipping_address_number: state.paymentType.shipping_address_number,
          use_club_points: state.paymentType.use_club_points,
          ...payload
        }
      })
      commit('setLoading', false)
      return data
    } catch (error) {
      commit('setLoading', false)
      console.log(error)
      return null
    }
  },
  async postLockedCheckoutTransfer({ commit, state }, payload) {
    commit('setLoading', true)
    try {
      let { data } = await this.$axios({
        ...endpoints.checkout.transfer,
        data: {
          delivery_type: state.paymentType.delivery_type,
          // payment_type: state.paymentType.payment_type,
          // billing_address_number: state.paymentType.billing_address_number,
          // shipping_address_number: state.paymentType.shipping_address_number,
          // use_club_points: state.paymentType.use_club_points,
          ...payload
        }
      })
      commit('setLoading', false)
      return data
    } catch (error) {
      commit('setLoading', false)
      console.log(error)
      return null
    }
  },
  async postCreditCard({ commit, state }, payload) {
    console.log('postCreditCard', payload)
    commit('setLoading', true)
    const testObject = { ...state.paymentType }
    delete testObject.card_info
    testObject.installment = testObject.installment.data.installmentNumber

    let requestPayload = {}

    if (state.paymentType.card_info.id) {
      console.log('if')
      requestPayload = {
        ...testObject,
        ...payload,
        stored_card_id: state.paymentType.card_info.id
      }
    } else {
      console.log('else')

      requestPayload = {
        ...state.paymentType,
        ...payload,
        installment: state.paymentType.installment.data.installmentNumber
      }
    }

    console.log('Request PAyload', requestPayload)

    try {
      if (state.paymentType.is_saved_card) {
        this.$axios({
          ...endpoints.for_you.card_create,
          data: {
            card_alias: state.paymentType.card_info.card_alias,
            card_holder_name: state.paymentType.card_info.card_holder_name,
            card_number: state.paymentType.card_info.card_number.replaceAll(
              ' ',
              ''
            ),
            expire_month: state.paymentType.card_info.expire_month,
            expire_year: state.paymentType.card_info.expire_year
          }
        })
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      }

      let { data } = await this.$axios({
        ...endpoints.checkout.credit_card.post,
        data: requestPayload
      })
      commit('updatePaymentType', {
        installment: 0,
        card_info: {
          card_holder_name: null,
          card_number: '',
          expire_month: 0,
          expire_year: 0,
          cvc: 0
        },
        is_saved_card: false
      })
      commit('setLoading', false)
      return data
    } catch (error) {
      commit('setLoading', false)
      console.log(error)
      return null
    }
  },
  async postCheckoutInstallments({ commit }, payload) {
    commit('setLoading', true)
    try {
      let { data } = await this.$axios({
        ...endpoints.checkout.retrieve_installments,
        data: {
          ...payload,
          card_number: payload.card_number,
          use_club_points: payload.use_club_points,
          payment_type: payload.payment_type,
          currency: payload.currency
        }
      })
      commit('setLoading', false)
      return data
    } catch (error) {
      commit('setLoading', false)
      console.log(error)
      return null
    }
  },
  setPaymentType({ commit }, payload) {
    commit('updatePaymentType', payload)
  },
  setCurrency({ commit }, payload) {
    commit('changeCurrency', payload)
  },
  showBuyButton({ commit }, payload) {
    commit('showBuybutton', payload)
  },
  setPaymentStatus({ commit }, payload) {
    commit('updatePaymentStatus', payload)
  }
}
