import endpoints from '../../api/endpoints'

export const state = () => ({
  corporates: [],
  corporate: null
})

export const getters = {
  getCorporates(state) {
    return state.corporates
  },
  getCorporate(state) {
    return state.corporate
  }
}

export const mutations = {
  setCorporates(state, data) {
    state.corporates = data
  },
  setCorporate(state, data) {
    state.corporate = data
  }
}

export const actions = {
  async getCorporateList({ commit }) {
    try {
      let { data } = await this.$axios(endpoints.news.corporate_category_list)
      if (data && data.results) {
        commit('setCorporates', data.results)
      }
    } catch (error) {
      console.log('ERROR: ', error)
    }
  },
  async getCorporateById(_, id) {
    try {
      const { data } = await this.$axios({
        ...endpoints.news.corporate_category_id,
        url: endpoints.news.corporate_category_id.url(id)
      })
      if (data) {
        return data
      } else {
        return null
      }
    } catch (error) {
      console.log('ERROR: ', error)
      return null
    }
  },
  async getCorporate(_, slug) {
    try {
      const { data } = await this.$axios(
        endpoints.news.corporate_slug.url(slug)
      )
      if (data) {
        return data
      } else {
        return null
      }
    } catch (error) {
      console.log('ERROR: ', error)
      return null
    }
  }
}
