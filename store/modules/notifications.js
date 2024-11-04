import endpoints from '../../api/endpoints'

export const state = () => ({
  notifications: {},
  notificationsLast5: {},
  notification: null,
  unReadNotificationCount: 0
})

export const getters = {
  getNotifications(state) {
    return state.notifications
  },
  getNotificationsLast5(state) {
    return state.notificationsLast5
  },
  getNotification(state) {
    return state.notification
  },
  getUnReadCount(state) {
    return state.unReadNotificationCount
  }
}

export const mutations = {
  setNotifications(state, data) {
    state.notifications = data
  },
  setNotificationsLast5(state, data) {
    state.notificationsLast5 = data
  },
  setNotification(state, data) {
    state.notification = data
  },
  updateNotification(state, data) {
    const index = state.notifications.findIndex(item => item.id === data.id)
    state.notifications[index] = data
    state.notifications = [...state.notifications]
  },
  setUnReadNotificationCount(state, value) {
    state.unReadNotificationCount = value
  }
}

export const actions = {
  async fetchNotifications({ commit }, payload) {
    let notifications = await this.$axios({
      ...endpoints.notification.notifications,
      params: {
        limit: payload?.limit || 20,
        offset: payload.page ? (parseInt(payload.page) - 1) * 20 : 0
      }
    })
    if (notifications?.data?.results) {
      commit(
        payload?.fromLastFive ? 'setNotificationsLast5' : 'setNotifications',
        notifications?.data?.results || {}
      )
      commit(
        'setUnReadNotificationCount',
        notifications?.data?.unclicked_count || 0
      )
    } else {
      return null
    }
  },
  async fetchNotificationById({ state, commit, dispatch }, id) {
    const { data } = await this.$axios({
      ...endpoints.notification.notification,
      url: endpoints.notification.notification.url(id)
    })

    if (data) {
      if (!data.clicked_at) dispatch('postNotificationClick', data.id)
      commit('setNotification', data)
    } else state.notifications[index] = null
  },
  async postNotificationClick({ commit }, id) {
    let result = await this.$axios({
      ...endpoints.notification.notification_clicked,
      url: endpoints.notification.notification_clicked.url(id)
    })
    commit('updateNotification', result?.data)
  }
}
