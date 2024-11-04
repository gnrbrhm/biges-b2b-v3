<template>
  <div class="user-navigation">
    <a v-if="isAuthenticated" class="control-item">
      <NotificationCard
        :key="isRender.toString()"
        v-if="isAuthenticated"
        :isOpen="isNotificationOpen"
        @clickItem="clickItem($event)"
      >
        <div class="notifications">
          <app-icon name="alarm" icon-color="transparent" />
        </div>
      </NotificationCard>
    </a>

    <div class="info user-info">
      <span v-if="!isAuthenticated" class="login flex row align-center">
        <div>
          <span class="control-item">
            <app-icon name="user" icon-color="transparent" />
          </span>
        </div>
        <nuxt-link :to="routeAvatar">
          Giriş Yap
          <p class="total is-size-7 has-text-grey-light">ya da Üye Ol</p>
        </nuxt-link>
      </span>
      <ModalCard
        v-if="isAuthenticated"
        @clickItem="clickItem($event)"
        :items="[
          { name: 'Kişisel Bilgilerim', type: 'personel_info' },
          { name: 'Güvenli Çıkış', type: 'quit' }
        ]"
      >
        <div class="flex row center clickable">
          <span class="control-item">
            <app-icon name="user" icon-color="transparent" />
          </span>

          <div class="user-detail">
            <p class="user-name">
              {{ $auth.user.full_name }}
            </p>
            <span
              v-tooltip="{
                content: `<p class='tooltip-text'>${$auth.user.profile.name}</p>`,
                html: true
              }"
              >{{ trim($auth.user.profile.name, 15) }}</span
            >
            <!-- <span class="flex align-center user-group">
              <img
                class="mr-8"
                width="15"
                height="15"
                :src="
                  $auth.user.profile.group &&
                  $auth.user.profile.group.reseller_status_icon
                    ? $auth.user.profile.group.reseller_status_icon
                    : null
                "
              />
              <p
                v-tooltip="{
                  content: `<p class='tooltip-text'>${
                    $auth.user.profile.group && $auth.user.profile.group.name
                      ? $auth.user.profile.group.name
                      : ''
                  }</p>`,
                  html: true
                }"
              >
                {{
                  trim(
                    $auth.user.profile.group && $auth.user.profile.group.name
                      ? $auth.user.profile.group.name
                      : '',
                    15
                  )
                }}
              </p>
            </span> -->
          </div>
        </div>
      </ModalCard>
      <p
        v-if="isAuthenticated"
        :title="$auth.user.profile.reseller_name"
        class="user-company is-size-7 has-text-grey-light"
      >
        {{ $auth.user.profile.reseller_name }}
      </p>
    </div>
    <nuxt-link
      v-if="isAuthenticated"
      to="/sepet"
      class="btn-basket"
      :class="{ active: basketTotal }"
    >
      <div id="basket-icon" class="control-item">
        <div
          v-if="basketTotal"
          class="notifications-badge"
          :class="'bs-' + basketTotal.toString().length"
        >
          <p class="has-text-white">
            {{ basketTotal }}
          </p>
        </div>
        <span class="basket">
          <Icons name="Bag" :options="{ fill: '#1F1F1F', stroke: '#1F1F1F' }" />
        </span>
      </div>
      <div class="info">
        <p class="cart">Sepet</p>
        <p class="total is-size-7 has-text-grey-light">
          <!-- {{ basket.currency }} {{ basket.total }} -->
        </p>
      </div>
      <app-icon
        v-show="basketTotal"
        name="keyboard-arrow-right"
        icon-color="transparent"
      />
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import Cookies from 'js-cookie'
import Icon from '../../../components/Icon.vue'
import Icons from '@/components/icons'
import ModalCard from '@/components/common/ModalCard.vue'
import NotificationCard from '@/components/common/NotificationCard.vue'
import { trimString } from '@/utils'

export default {
  components: {
    appIcon: Icon,
    ModalCard,
    NotificationCard,
    Icons
  },
  computed: {
    ...mapState('basket', ['basket', 'total']),
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
      loggedInUser: 'loggedInUser'
    }),
    routeAvatar() {
      return this.isAuthenticated ? '/size-ozel' : '/giris'
    },
    basketTotal() {
      return this.total
        ? this.total
        : parseInt(Cookies.get('basket.total') || 0)
    }
  },
  data() {
    return {
      connection: null,
      isNotificationOpen: false,
      isRender: 'null'
    }
  },
  methods: {
    ...mapActions({
      postNotificationClick: 'notifications/postNotificationClick',
      fetchNotifications: 'notifications/fetchNotifications',
      setPaymentStatus: 'payment/setPaymentStatus',
      setPaymentResult: 'payment/setPaymentResult'
    }),
    async clickItem(item) {
      if (item.type == 'quit') {
        await this.$axios({
          method: 'GET',
          url: `/token/logout/`
        })
        sessionStorage.removeItem('chat_session')
        this.$auth.logout()
        location.href = '/'
      } else if (item.type == 'personel_info') {
        this.$router.push('/size-ozel?active_menu=settings&tab=0')
      } else if (!item.type && item.notification_type) {
        this.isNotificationOpen = false
        this.isRender = new Date().getTime()
        if (!item.clicked_at) await this.postNotificationClick(item.id)
        this.$router.push(item.redirect_link || `/bildirimler/${item.id}`)
      } else if (item == 'clickAll') {
        this.isRender = new Date().getTime()
        this.$router.push('/bildirimler')
      }
    },
    trim(val, len) {
      return trimString(val, len)
    },
    connectToWebChat() {
      if (process.client) {
        let e = document.createElement('script'),
          t = document.head || document.getElementsByTagName('head')[0]
        ;(e.src =
          'https://cdn.jsdelivr.net/npm/rasa-webchat@1.x.x/lib/index.js'),
          // Replace 1.x.x with the version that you want
          (e.async = !0),
          (e.onload = () => {
            window.WebChat.default(
              {
                customData: {
                  language: 'en',
                  login_data: this.$auth.user,
                  token: this.$auth.strategy.token.get()
                },
                socketUrl:
                  this.$config.envName != 'prod'
                    ? `https://test.b2b.nlp.hybrone.com`
                    : 'https://prod.b2b.nlp.hybrone.com',
                initPayload: '/baslangic_mesaji',
                title: `Biggy`,
                inputTextFieldHint: 'Biggy sizi dinliyor.',
                params: {
                  storage: 'session'
                },
                profileAvatar: '/biggy.svg',
                openLauncherImage: '/biggy.svg',
                closeImage: '/close.svg',
                showMessageDate: (timestamp, message) => {
                  let timestampTr = 3 * 3600 * 1000 + timestamp
                  let datetimeTr = new Date(timestampTr)
                    .toISOString()
                    .split('T')
                  let dateTr =
                    datetimeTr?.[0]
                      ?.split('-')
                      ?.reverse()
                      ?.join('.') || ''
                  let timeTr = datetimeTr?.[1]?.split('.')?.[0] || ''
                  return dateTr + ' ' + timeTr
                }
              },
              null
            )
          }),
          t.insertBefore(e, t.firstChild)
      }
    },
    connectToWebSocketNotification() {
      if (this.$auth.loggedIn) {
        const token = this.$auth?.strategy?.token?.get()?.split(' ')[1]

        console.log(this.$config)
        this.$root.$connect(
          `${this.$config.apiWss}/notification/?access_token=${token}`
        )

        this.$options.sockets.onerror = err => {
          console.log(err)
        }

        this.$options.sockets.onmessage = resp => {
          let result = JSON.parse(resp.data)
          if (result.name == 'three_d_secure') {
            this.setPaymentResult(result.data)
            this.setPaymentStatus(result.data)
          }
          // else if (result.name == 'notifications') {
          //   this.setNotificationCount(result?.data?.not_clicked_count || 0)
          //   let socket_notification = result?.data?.notifications
          //   if (
          //     Array.isArray(socket_notification) &&
          //     socket_notification.length &&
          //     socket_notification?.[0]?.id != this.getNotifications?.[0]?.id
          //   ) {
          //     this.addNotification(socket_notification)
          //   }
          // }
        }
      }
    }
  },
  // watch: {
  //   isAuthenticated() {
  //     console.log('changeeeeee')
  //   }
  // },
  created() {
    this.connectToWebSocketNotification()
    if (this.$auth.loggedIn) this.fetchNotifications()
  },
  mounted() {
    this.connectToWebChat(this.$auth.loggedIn)
    // if (this.$config.envName != 'prod') {
    //   this.connectToWebChat()
    // }
  }
}
</script>

<style lang="scss">
@import './components/styles/Header/user-navigation.scss';
.notifications {
  text-align: center;
}

.user-detail {
  display: flex;
  flex-direction: column;
  gap: 2px;

  span {
    color: rgba(31, 31, 31, 0.5);
    font-weight: bold;
    font-size: 12px;
  }

  .user-group {
    color: #0d2f81;
    font-size: 0.7rem;
  }
}
.tooltip-text {
  color: white;
  font-size: 0.7rem;
}

// #rasaWebchatPro {
//   display: none;
// }
</style>
