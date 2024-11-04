import endpoints from '../../api/endpoints'

export const state = () => ({
  articleCategories: {},
  catList: [],
  solutions: [],
  articles: {},
  partners: [],
  references: []
})

export const getters = {
  getCorporateCategories(state) {
    return state.catList
  },
  getSolutionsHome(state) {
    return state.solutions
  },
  getArticlesHome(state) {
    return state.articles
  },
  getPartnerList(state) {
    return state.partners
  },
  getReferenceList(state) {
    return state.references
  }
}

export const mutations = {
  setArticleCategories(state, data) {
    state.articleCategories = data
  },
  setCorporateCategories(state, data) {
    state.catList = data
  },
  setSolutionsHomePage(state, data) {
    state.solutions = data
  },
  setArticlesHome(state, data) {
    state.articles = data
  },
  setPartners(state, data) {
    state.partners = data
  },
  setReferences(state, data) {
    state.references = data
  }
}

export const actions = {
  async getArticleCategories({ commit }) {
    let { data, status } = await this.$axios(endpoints.news.article_categories)
    if (status == 200) commit('setArticleCategories', data)
  },
  async getArticleCategoriesID(_, id) {
    return await this.$axios({
      ...endpoints.news.article_categories_id,
      url: endpoints.news.article_categories_id.url(id)
    })
  },
  async getArticleDetailID(_, id) {
    return await this.$axios({
      ...endpoints.news.article_detail_id,
      url: endpoints.news.article_detail_id.url(id)
    })
  },
  async getB2CArticles(_) {
    return await this.$axios(endpoints.news.b2c_articles)
  },
  async getSolutionList(_) {
    return await this.$axios(endpoints.news.solution_list)
  },
  async getArticleSolutionID(_, id) {
    return await this.$axios({
      ...endpoints.news.solution_id,
      url: endpoints.news.solution_id.url(id)
    })
  },
  async setCorporateCategories({ commit }) {
    let cat = await this.$axios({
      ...endpoints.news.corporate_category_list
    })
    if (cat && cat.data && cat.data.results) {
      commit('setCorporateCategories', cat.data.results)
    }
  },
  async getCategoryWithID(_, id) {
    return await this.$axios({
      ...endpoints.news.corporate_category_id,
      url: endpoints.news.corporate_category_id.url(id)
    })
  },
  async setSolutionsHomePage({ commit }, payload) {
    let solutions = await this.$axios({
      ...endpoints.news.solutions_homepage,
      url: endpoints.news.solutions_homepage.url(payload)
    })
    if (solutions && solutions.data && solutions.data.results) {
      commit('setSolutionsHomePage', solutions.data.results)
    }
  },
  async setArticlesHome({ commit }) {
    let articles = await this.$axios({
      ...endpoints.news.articles,
      url: endpoints.news.articles.url,
      params: {
        sort: 'published_at'
      }
    })
    if (articles && articles.data) {
      commit('setArticlesHome', articles.data)
      return articles.data
    }
  },
  async getPartners({ commit }) {
    let partner = await this.$axios({
      ...endpoints.references.brands
    })
    if (partner && partner.data) {
      commit('setPartners', partner.data.results)
    }
  },
  async getReferences({ commit }) {
    let ref = await this.$axios({
      ...endpoints.references.references
    })
    if (ref && ref.data) {
      commit('setReferences', ref.data.results)
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