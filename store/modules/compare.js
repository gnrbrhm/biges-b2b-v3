import endpoints from '../../api/endpoints'
// TODO Vue Yapılandırması yapılacak
// import Vue from 'vue'

export const state = () => ({
  compareListWithDetails: []
})

export const getters = {
  getCompareDetailList(state) {
    return state.compareListWithDetails
  }
}
export const mutations = {
  setCompareListDetail(state, data) {
    state.compareListWithDetails = data
  },
  deleteProduct(state, stockCode) {
    state.compareListWithDetails = state.compareListWithDetails.filter(
      item => item.stock_code != stockCode
    )
  }
}

export const actions = {
  async generateUuid(_, payload) {
    try {
      let uuid = await this.$axios({
        ...endpoints.compare.create_uuid,
        url: endpoints.compare.create_uuid.url
      })

      if (uuid.status == 201) return uuid.data

      return null
    } catch (err) {
      console.log(err)
      return null
    }
  },
  async addProduct({ commit, dispatch }, payload) {
    // to do
    let result = null
    try {
      if (payload.page == 'b2b') {
        result = await this.$axios({
          ...endpoints.compare.add_product,
          url: endpoints.compare.add_product.url(
            payload.page,
            payload.stock_code
          )
        })
      } else {
        result = await this.$axios({
          ...endpoints.compare.add_product,
          url: endpoints.compare.add_product.url(
            payload.page,
            payload.stock_code
          ),
          params: { uuid: localStorage.getItem('uuid_compare') }
        })
      }
      dispatch('fetchProductsWithDetail', payload)
      if (result?.status == 200 || result?.status == 201) {
       // TODO Vue Yapılandırması yapılacak
        // Vue.notify({
        //   type: 'success',
        //   title: 'İşlem Başarılı!',
        //   text: result.data.message,
        //   duration: 5000
        // })
      }
    } catch (error) {
      console.error(error)
             // TODO Vue Yapılandırması yapılacak
    //   Vue.notify({
    //     type: 'warn',
    //     title: 'İşlem Başarısız!',
    //     text: result.data.message,
    //     duration: 5000
    //   })
    }
  },
  async deleteAll({ commit }, payload) {
    // to do
    let result = null
    try {
      if (payload.page == 'b2b') {
        result = await this.$axios({
          ...endpoints.compare.delete_all,
          url: endpoints.compare.delete_all.url(
            payload.page,
            payload.stock_code
          )
        })
      } else {
        result = await this.$axios({
          ...endpoints.compare.delete_all,
          url: endpoints.compare.delete_all.url(
            payload.page,
            payload.stock_code
          ),
          params: { uuid: localStorage.getItem('uuid_compare') }
        })
      }
      if (result?.status == 200) {
        commit('deleteProduct', payload.stock_code)
               // TODO Vue Yapılandırması yapılacak

        // Vue.notify({
        //   type: 'success',
        //   title: 'İşlem Başarılı!',
        //   text: result?.data?.message,
        //   duration: 5000
        // })
      }
    } catch (error) {
      console.error(error)
             // TODO Vue Yapılandırması yapılacak

    //   Vue.notify({
    //     type: 'warn',
    //     title: 'İşlem Başarısız!',
    //     text: result?.data?.message,
    //     duration: 5000
    //   })
    }
  },
  async deleteByCode({ commit }, payload) {
    // to do
    let result = null
    if (payload.page == 'b2b') {
      result = await this.$axios({
        ...endpoints.compare.delete_by_code,
        url: endpoints.compare.delete_by_code.url(
          payload.page,
          payload.stock_code
        )
      })
    } else {
      result = await this.$axios({
        ...endpoints.compare.delete_by_code,
        url: endpoints.compare.delete_by_code.url(
          payload.page,
          payload.stock_code
        ),
        params: { uuid: localStorage.getItem('uuid_compare') }
      })
    }
    if (result?.status == 200) {
      commit('deleteProduct', payload.stock_code)
      Vue.notify({
        type: 'success',
        title: 'İşlem Başarılı!',
        text: result?.data?.message,
        duration: 5000
      })
    }
  },
  async fetchProductsWithDetail({ commit }, payload) {
    // to do
    let result = null
    if (payload.page == 'b2b') {
      result = await this.$axios({
        ...endpoints.compare.products_with_detail,
        url: endpoints.compare.products_with_detail.url(payload.page)
      })
    } else {
      result = await this.$axios({
        ...endpoints.compare.products_with_detail,
        url: endpoints.compare.products_with_detail.url(payload.page),
        params: { uuid: localStorage.getItem('uuid_compare') }
      })
    }

    if (result?.data?.length) {
      commit('setCompareListDetail', result?.data)
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