import endpoints from '../../api/endpoints'

export const state = () => ({
  orderHistory: [],
  invoiceHistory: [],
  serviceProductList: [],
  serviceOfferList: [],
  remittanceReportList: [],
  paymentHistoryList: [],
  chequeBillList: [],
  receivedOffersDetailList: {},
  bigesClubTarget: [],
  // bigesClubMenu: {},
  serviceProductDetail: null,
  serviceOfferDetail: null,
  paymentHistoryDetail: {}
})
export const getters = {
  getPaymentHistoryDetail(state) {
    return state.paymentHistoryDetail
  },
  getOrderHistory(state) {
    return state.orderHistory
  },
  getInvoiceHistory(state) {
    return state.invoiceHistory
  },
  getServiceProductList(state) {
    return state.serviceProductList
  },
  getServiceProductDetail(state) {
    return state.serviceProductDetail
  },
  getServiceOfferDetail(state) {
    return state.serviceOfferDetail
  },
  getServiceOfferList(state) {
    return state.serviceOfferList
  },
  getRemittanceReportList(state) {
    return state.remittanceReportList
  },
  getPaymentHistoryList(state) {
    return state.paymentHistoryList
  },
  getChequeBillList(state) {
    return state.chequeBillList
  },
  getReceivedOffersDetailList(state) {
    return state.receivedOffersDetailList
  },
  getBigesClubTargetList(state) {
    return state.bigesClubTarget
  }
}

export const mutations = {
  setOrderHistory(state, data) {
    state.orderHistory = data
  },
  setInvoiceHistory(state, data) {
    state.invoiceHistory = data
  },
  setServiceProduct(state, data) {
    state.serviceProductList = data
  },
  setServiceProductDetail(state, data) {
    state.serviceProductDetail = data
  },
  setServiceOfferDetail(state, data) {
    state.serviceOfferDetail = data
  },
  setServiceOffers(state, data) {
    state.serviceOfferList = data
  },
  setRemittanceReport(state, data) {
    state.remittanceReportList = data
  },
  setPaymentHistory(state, data) {
    state.paymentHistoryList = data
  },
  setPaymentHistoryDetail(state, data) {
    state.paymentHistoryDetail = data
  },
  setCheckBill(state, data) {
    state.chequeBillList = data
  },
  setReceivedOffersDetail(state, data) {
    state.receivedOffersDetailList = data
  },
  setBigesClubTarget(state, data) {
    state.bigesClubTarget = [...state.bigesClubTarget, data]
  },
  resetBigesClubTarget(state) {
    state.bigesClubTarget = []
    // },
    // setBigesClubMenu(state, data) {
    //   state.bigesClubMenu = data
  }
}

export const actions = {
  async deleteUser(_, payload) {
    let result = await this.$axios({
      ...endpoints.user_delete.delete
    })
    if (result?.status == 200) {
      return true
    } else {
      return false
    }
  },

  async deleteSubUser(_, payload) {
    let result = await this.$axios({
      ...endpoints.sub_user.delete_sub_user,
      url: endpoints.sub_user.delete_sub_user.url(payload)
    })
    if (result?.status == 204) {
      return true
    } else {
      return false
    }
  },
  async fetchBigesClubTarget({ commit }) {
    let result = await this.$axios({
      ...endpoints.campaigns.get
    })
    commit('resetBigesClubTarget')
    if (result && result.data && result.status == 200) {
      await result.data.results.map(async item => {
        let campaigns = await this.$axios({
          ...endpoints.campaigns.getById,
          url: endpoints.campaigns.getById.url(item.campaign_code)
        })
        commit('setBigesClubTarget', { ...campaigns.data, ...item })
      })
    }
  },
  async fetchWarrantyProductCheck(_, serialNumber) {
    let result = await this.$axios({
      ...endpoints.for_you.warranty.product_check,
      url: endpoints.for_you.warranty.product_check.url(serialNumber)
    })
    if (result && result.data && result.status == 200) {
      return result.data.results
    } else {
      return null
    }
  },
  async fetchFavoriteProduct() {
    let result = await this.$axios({
      ...endpoints.for_you.favorite_category_list
    })
    if (result && result.data && result.status == 200) {
      return result.data.results
    } else {
      return null
    }
  },
  async fetchResellerStatement(_, payload) {
    let result = await this.$axios({
      ...endpoints.for_you.reseller_statement,
      params: { ...payload }
    })
    if (result && result.data && result.status == 200) {
      return result.data
    } else {
      return null
    }
  },
  async fetchIyzilinkLog() {
    let result = await this.$axios({
      ...endpoints.for_you.iyzilink_log
    })
    if (result && result.data && result.status == 200) {
      return result.data.results
    } else {
      return null
    }
  },
  async postBalancePaymentLink(_, payload) {
    let result = await this.$axios({
      ...endpoints.for_you.iyzilink_balance_payment,
      data: payload
    })
    if (result && result.data && result.status == 201) {
      return result.data
    } else {
      return null
    }
  },
  async postBalancePayment(_, payload) {
    try {
      let result = await this.$axios({
        ...endpoints.for_you.iyzico_balance_payment,
        data: payload
      })
      if (result && result.data && result.status == 201) {
        return result.data
      } else {
        return null
      }
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async postBalancePaymentinstallment(_, payload) {
    let result = await this.$axios({
      ...endpoints.for_you.iyzico_retrieve_installments,
      data: payload
    })
    if (result && result.data && result.status == 200) {
      return result.data
    } else {
      return null
    }
  },
  async fetchBigesClubEarn() {
    let result = await this.$axios({
      ...endpoints.for_you.reseller_advantages
    })
    if (result && result.data && result.status == 200) {
      return result.data
    } else {
      return null
    }
  },
  async fetchSupportCategory() {
    let result = await this.$axios({
      ...endpoints.support.category
    })
    if (result && result.data && result.status == 200) {
      return result.data.results
    } else {
      return null
    }
  },
  async fetchFinanceInfo() {
    let result = await this.$axios({
      ...endpoints.user.finance_info
    })
    if (result && result.data && result.status == 200) {
      return result.data
    } else {
      return null
    }
  },
  async updateUserPassword(_, payload) {
    let result = await this.$axios({
      ...endpoints.user.change_password,
      data: payload
    })
    if (result && result.data && result.status == 200) {
      return result.data
    } else {
      return null
    }
  },
  async updateUserProfile(_, payload) {
    let result = await this.$axios({
      ...endpoints.for_you.user_profile.put,
      data: payload
    })
    if (result && result.data && result.status == 200) {
      return result.data
    } else {
      return null
    }
  },
  async fetchUserProfile() {
    let result = await this.$axios({
      ...endpoints.for_you.user_profile.get
    })
    if (result && result.data && result.status == 200) {
      return result.data
    } else {
      return null
    }
  },
  async fetchWalletMovements(_, payload) {
    let result = await this.$axios({
      ...endpoints.for_you.wallet_movements.get,
      url: endpoints.for_you.wallet_movements.get.url(
        payload.startDate,
        payload.endDate
      )
    })
    if (result && result.data && result.status == 200) {
      return result.data
    } else {
      return null
    }
  },
  async fetchWalletPoint() {
    let result = await this.$axios({
      ...endpoints.for_you.wallet_point.get
    })
    if (result && result.data && result.status == 200) {
      return result.data
    } else {
      return null
    }
  },
  async updateSubUserPermissions(_, payload) {
    let result = await this.$axios({
      ...endpoints.sub_user.post_sub_user_permissions,
      url: endpoints.sub_user.post_sub_user_permissions.url(
        payload.email,
        payload.code
      ),
      data: { has_permission: payload.isChecked }
    })
    if (result.status == 200) {
      return result.data
    } else {
      return null
    }
  },
  async fetchSubUserPermissions(_, email) {
    let result = await this.$axios({
      ...endpoints.sub_user.sub_user_permissions,
      url: endpoints.sub_user.sub_user_permissions.url(email)
    })
    if (result && result.data && result.status == 200) {
      return result.data
    } else {
      return null
    }
  },
  async fetchNotifications() {
    let result = await this.$axios({
      ...endpoints.notification.notifications
    })
    if (result && result.data && result.status == 200) {
      return result.data.results
    } else {
      return null
    }
  },
  async fetchSubUser(_, page) {
    let result = await this.$axios({
      ...endpoints.sub_user.sub_user_list,
      url: endpoints.sub_user.sub_user_list.url(page)
    })
    if (result && result.data && result.status == 200) {
      // commit('setPaymentHistory', result.data.results)
      return result.data
    } else {
      return null
    }
  },
  async fetchReceivedOffers({ commit }, payload) {
    let result = await this.$axios({
      ...endpoints.for_you.received_offers_list,
      params: {
        start_date: payload.start_date,
        end_date: payload.end_date
      }
    })
    if (result && result.data && result.data.length && result.status == 200) {
      return result.data
    } else {
      return null
    }
  },
  async fetchReceivedSpecialOffers({ commit }, payload) {
    let result = await this.$axios({
      ...endpoints.for_you.reveived_special_offer,
      params: {
        start_date: payload.start_date,
        end_date: payload.end_date
      }
    })
    return result.data
  },
  async fetchReceivedOffersDetail({ commit }, payload) {
    commit('setReceivedOffersDetail', {})
    let result = await this.$axios({
      ...endpoints.for_you.received_offers_detail,
      url: endpoints.for_you.received_offers_detail.url(payload)
    })

    if (result && result.data && result.status == 200) {
      commit('setReceivedOffersDetail', result.data)
    }
  },
  async fetchUserAdress(_, page) {
    let result = await this.$axios({
      ...endpoints.user.address.get,
      url: endpoints.user.address.get.url(page)
    })
    if (result && result.data && result.status == 200) {
      // commit('setPaymentHistory', result.data.results)
      return result.data
    } else {
      return null
    }
  },
  async fetchUserAdressById(_, id) {
    let result = await this.$axios({
      ...endpoints.user.address.get_by_id,
      url: endpoints.user.address.get_by_id.url(id)
    })
    if (result && result.data && result.status == 200) {
      return result.data
    } else {
      return null
    }
  },
  async fetchSubUserByEmail(_, email) {
    let result = await this.$axios({
      ...endpoints.sub_user.sub_user_by_email,
      url: endpoints.sub_user.sub_user_by_email.url(email)
    })
    if (result && result.data && result.status == 200) {
      return result.data
    } else {
      return null
    }
  },
  async deleteAddress(_, payload) {
    let result = await this.$axios({
      ...endpoints.user.address.delete,
      url: endpoints.user.address.delete.url(payload)
    })
    if (result?.status == 204) {
      return true
    } else {
      return false
    }
  },
  async putUserAdress(_, payload) {
    let result = await this.$axios({
      ...endpoints.user.address.put,
      url: endpoints.user.address.put.url(payload.address_number),
      data: payload
    })
    return result
  },
  async postUserAdress(_, payload) {
    let result = await this.$axios({
      ...endpoints.user.address.post,
      data: payload
    })
    return result
  },
  async postSubUser(_, payload) {
    try {
      let result = await this.$axios({
        ...endpoints.sub_user.add_sub_user,
        data: payload
      })
      return result
    } catch (error) {
      return null
    }
  },
  async updateSubUser(_, payload) {
    try {
      let result = await this.$axios({
        ...endpoints.sub_user.put_sub_user,
        url: endpoints.sub_user.put_sub_user.url(payload.email),
        data: payload
      })
      if (result && result.status == 200) {
        return result
      } else {
        return null
      }
    } catch (error) {
      console.log(error)
      return null
    }
  },
  // async fetchBigesClubDetailInfo(_, payload) {
  //   let result = await this.$axios({
  //     ...endpoints.for_you.biges_club_detail_info,
  //     params: { filter: payload }
  //   })
  //   if (result && result.data && result.status == 200) {
  //     // commit('setPaymentHistory', result.data.results)
  //     return result.data
  //   } else {
  //     return null
  //   }
  // },
  // async fetchBigesClubGeneralInfo({ commit }) {
  //   let result = await this.$axios({
  //     ...endpoints.for_you.biges_club_general_info
  //   })
  //   if (result && result.data && result.status == 200) {
  //     // commit('setPaymentHistory', result.data.results)
  //     commit('setBigesClubMenu', result.data)
  //   }
  // },
  async fetchCheckBillInformation({ commit }, payload) {
    let result = await this.$axios({
      ...endpoints.for_you.cheque_bill_information,
      params: {
        start_date: payload.start_date,
        end_date: payload.end_date
      }
    })
    if (result && result.data && result.status == 200) {
      commit('setCheckBill', result.data)
    }
  },
  async fetchResellerGeneralInfo() {
    let result = await this.$axios({
      ...endpoints.for_you.reseller_general_info
    })
    if (result && result.data) {
      // commit('setPaymentHistory', result.data.results)
      return result.data
    } else {
      return null
    }
  },

  async fetchHybroneAccountCompaign() {
    try {
      let result = await this.$axios({
        ...endpoints.campaigns.hybrone_goals
      })

      console.log(result)
      return result.data
    } catch (error) {
      console.log(error)
    }
  },
  async fetchPaymentHistoryOld({ commit }, date) {
    let result = await this.$axios({
      ...endpoints.for_you.payment_history_old,
      params: {
        start_date: date.start_date,
        end_date: date.end_date,
        payment_type: date.payment_type
      }
    })
    if (result && result.data) {
      commit('setPaymentHistory', result.data.results)
    }
  },
  async fetchPaymentHistory({ commit }, date) {
    let result = await this.$axios({
      ...endpoints.for_you.payment_history,
      params: {
        start_date: date.start_date,
        end_date: date.end_date,
        payment_type: date.payment_type
      }
    })
    if (result && result.data) {
      commit('setPaymentHistory', result.data.results)
    }
  },
  async fetchPaymentHistoryByIdOld({ commit }, id) {
    commit('setPaymentHistoryDetail', {})

    let result = await this.$axios({
      ...endpoints.for_you.payment_history_by_id_old,
      url: endpoints.for_you.payment_history_by_id_old.url(id)
    })
    if (result && result.data) {
      commit('setPaymentHistoryDetail', result.data)
    }
  },
  async fetchPaymentHistoryById({ commit }, id) {
    commit('setPaymentHistoryDetail', {})

    let result = await this.$axios({
      ...endpoints.for_you.payment_history_by_id,
      url: endpoints.for_you.payment_history_by_id.url(id)
    })
    if (result && result.data) {
      commit('setPaymentHistoryDetail', result.data)
    }
  },
  async postRemittanceReport(_, form) {
    let result = await this.$axios({
      ...endpoints.for_you.remittance_report_post,
      data: form
    })
    return result
  },
  async fetchRemittanceReport({ commit }) {
    let result = await this.$axios({
      ...endpoints.for_you.remittance_report
    })
    if (result && result.data) {
      commit('setRemittanceReport', result.data)
    }
  },
  async fetchOrderHistory({ commit }, date) {
    let result = await this.$axios({
      ...endpoints.for_you.order_history,
      params: {
        start_date: date.start_date,
        end_date: date.end_date
      }
    })
    if (result && result.data) {
      commit('setOrderHistory', result.data)
    }
  },

  async fetchInvoiceHistory({ commit }, date) {
    let result = await this.$axios({
      ...endpoints.for_you.invoice_history,
      params: date
        ? {
            start_date: date.start_date,
            end_date: date.end_date
          }
        : {}
    })
    if (result && result.data) {
      commit('setInvoiceHistory', result.data)
    }
  },
  async fetchOrderHistoryWithId(_, id) {
    let { status, data } = await this.$axios({
      ...endpoints.for_you.order_history_id,
      url: endpoints.for_you.order_history_id.url(id)
    })
    if (status == 200) {
      return data
    } else {
      return null
    }
  },
  async fetchInvoiceHistoryWithId(_, id) {
    let { status, data } = await this.$axios({
      ...endpoints.for_you.invoice_history_id,
      url: endpoints.for_you.invoice_history_id.url(id)
    })
    if (status == 200) {
      return data
    } else {
      return null
    }
  },
  async fetchTechnicalServiceProducts({ commit }, date) {
    let result = await this.$axios({
      ...endpoints.for_you.technical_service,
      params: {
        start_date: date.start_date,
        end_date: date.end_date
      }
    })
    if (result && result.data) {
      commit('setServiceProduct', result.data)
    }
  },
  async fetchTechnicalServiceDetail({ commit }, payload) {
    commit('setServiceProductDetail', null)
    commit('setServiceOfferDetail', null)
    let result = await this.$axios({
      ...endpoints.for_you.technical_service_detail,
      url: endpoints.for_you.technical_service_detail.url(payload)
    })
    if (result?.data) {
      commit('setServiceProductDetail', result.data)
    }
  },
  async fetchTechnicalOfferDetail({ commit }, payload) {
    commit('setServiceProductDetail', null)
    commit('setServiceOfferDetail', null)
    let result = await this.$axios({
      ...endpoints.for_you.technical_service_offer_detail,
      url: endpoints.for_you.technical_service_offer_detail.url(payload)
    })
    if (result?.data) {
      commit('setServiceOfferDetail', result.data)
    }
  },
  async fetchTechnicalServiceOffers({ commit }, date) {
    let result = await this.$axios({
      ...endpoints.for_you.technical_service_offers,
      params: {
        start_date: date.start_date,
        end_date: date.end_date
      }
    })
    if (result && result.data) {
      commit('setServiceOffers', result.data)
    }
  }
}
