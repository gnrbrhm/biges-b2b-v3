import endpoints from '../../api/endpoints'

export const state = () => ({})

export const getters = {}

export const mutations = {
  setArticleCategories(state, data) {
    state.articleCategories = data
  }
}

export const actions = {
  async fetchSolutionWithPageUrl(_, url) {
    let result = await this.$axios({
      ...endpoints.news.solution_page_url,
      url: endpoints.news.solution_page_url.url(url)
    })
    if (result && result.data && result.data.results) {
      return result.data.results
    } else {
      return null
    }
  },
  async fetchSolutions(_, payload) {
    let solutions = await this.$axios({
      ...endpoints.news.solutions_homepage,
      url: endpoints.news.solutions_homepage.url(payload.type),
      params: {
        tags: payload.tag ? payload.tag : null
      }
    })
    if (solutions && solutions.data && solutions.data.results) {
      return solutions.data.results
    } else {
      return null
    }
  }
}
