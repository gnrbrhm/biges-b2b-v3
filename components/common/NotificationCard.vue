<template>
  <details :open="isOpen" ref="details" class="notification-card-container">
    <summary class="notify-summary">
      <div class="notifications-badge bs-1" v-if="getUnReadCount">
        <p class="has-text-white">
          {{ getUnReadCount }}
        </p>
      </div>
      <slot></slot>
    </summary>
    <div class="notification-card-container__content">
      <div class="notification-card-container__content__main">
        <template v-if="Object.keys(getNotificationsLast5).length">
          <div
            v-for="(date, index) in Object.keys(getNotificationsLast5)"
            :key="date + '-' + index"
          >
            <div class="notification-card-container__content__main__itemHead">
              {{ date }}
            </div>
            <div
              v-for="(notification, index) in getNotificationsLast5[date]"
              :key="notification + '-' + index"
              @click="$emit('clickItem', notification)"
              :class="
                `notification-card-container__content__main__item ${
                  notification.clicked_at ? '' : 'not_read'
                }`
              "
            >
              <Icon
                :name="notificationTypes[notification.notification_type]"
                :options="{
                  fill: notification.clicked_at
                    ? 'rgba(31, 31, 31, 1)'
                    : 'rgba(31, 31, 31, 0.5)'
                }"
              />
              <span>{{ trim(notification.title, 100) }} </span>

              <div v-if="!notification.clicked_at" class="not_read_icon"></div>
            </div>
          </div>
        </template>
        <span
          v-else
          class="notification-card-container__content__main__item__none p-10"
        >
          Bildirim yok</span
        >

        <span
          @click="$emit('clickItem', 'clickAll')"
          class="notification-card-container__content__main__item__all"
        >
          Tüm Bildirimler >
        </span>
      </div>
    </div>
  </details>
</template>

<script>
import { trimString, getImgUrl, getNotificationIcon } from '../../utils'
import { mapGetters, mapActions } from 'vuex'
import Icon from '@/components/icons'

export default {
  name: 'NotificationCard',
  components: { Icon },
  props: { isOpen: { type: Boolean, default: false } },
  data() {
    return {
      notificationTypes: {
        admin_announcement: 'Admin_Duyuru',
        admin_information: 'Admin_Bilgilendirme',
        campaign: 'Kampanya',
        raw_email: 'Eposta',
        user: 'Kullanıcı',
        discount: 'Indirim',
        event: 'Etkinlik',
        warning: 'Uyarı',
        document: 'Döküman',
        order_cargo: 'Sipariş_Kargoda'
      }
    }
  },
  watch: {
    isOpen(newVal) {
      console.log(newVal)
    }
  },
  computed: {
    ...mapGetters({
      getNotificationsLast5: 'notifications/getNotificationsLast5',
      getNotifications: 'notifications/getNotifications',
      getUnReadCount: 'notifications/getUnReadCount'
    })
  },
  methods: {
    ...mapActions({
      fetchNotifications: 'notifications/fetchNotifications'
    }),
    trim(value, len) {
      return trimString(value, len)
    },
    getImage(pic) {
      return getImgUrl(pic)
    },
    getIcon(item_type) {
      return getNotificationIcon(item_type)
    }
  },
  created() {
    if (Object.keys(this.fetchNotifications).length) return
    this.fetchNotifications({
      page: this.query?.page,
      limit: 5,
      fromLastFive: true
    })
  }
}
</script>

<style lang="scss" scoped>
details summary::-webkit-details-marker {
  display: none;
}
details {
  display: flex;
  position: relative;
  width: 100%;
  summary {
    outline: none;
    display: inline-block;
    user-select: none;
    list-style: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    &::-webkit-details-marker {
      display: none;
    }
  }
  &[open] > summary:before {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: block;
    cursor: default;
    content: ' ';
    background: transparent;
  }
  &[open] > summary {
    &__arrow {
      &--rotate {
        transform: rotate(180deg);
      }
    }
  }
}

.notify-summary {
  position: relative;
}
.notifications-badge {
  padding: 2px 3px;
  right: -4px;
  top: -21px;

  &.bs-1 {
    padding: 1px 7px;
    right: -1px;
    top: -21px;
  }

  &.bs-2 {
    padding: 2px 4px;
    right: -4px;
    top: -21px;
  }
  &.bs-3 {
    height: 15px;
    padding: 4px 4px;
    right: -7px;
    top: -25px;
  }
}

.notification-card-container {
  width: 100%;
  outline: none;

  &__content {
    margin-left: -20px;
    position: absolute;
    z-index: 999;
    width: auto;
    height: auto;
    background-color: #f9f9f9;
    margin-top: 34px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    // &__main::before {
    //   content: '';
    //   width: 20px;
    //   height: 20px;
    //   background-color: #f9f9f9;
    //   margin-top: -175px;
    //   margin-left: -43%;
    //   position: absolute;
    //   transform: rotate(45deg);
    //   border-radius: 3px;
    // }
    &__main {
      width: 300px;
      display: flex;
      flex-direction: column;

      &__itemHead {
        text-align: center;
        font-weight: bold;
        cursor: default;
        padding: 3px 0;
      }

      &__item {
        cursor: pointer;

        background: rgba(230, 233, 233, 0.4);
        color: rgba(31, 31, 31, 1);
        font-size: 12px;
        font-weight: 400;
        display: grid;
        grid-template-columns: 24px auto;
        gap: 10px;
        align-items: center;
        padding: 10px;
        margin: 1px 0px;

        &__all {
          text-align: center;
          font-weight: 600;
          font-size: 12px;
          padding: 10px 0px;
        }

        &__none {
          text-align: center;
          font-weight: 600;
          font-size: 14px;
          padding: 10px 0px;
          user-select: none;
          width: 130px;
        }
      }

      &__item:first-child {
        margin: 0;
      }

      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}

.not_read {
  background: #fff;
  color: rgba(31, 31, 31, 1);
  grid-template-columns: 24px auto 10px;

  &_icon {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #0d2f81;
  }
}

@media (max-width: 768px) {
  .notifications-badge {
    right: -10px;
    top: -10px;
  }

  .notification-card-container {
    width: 100%;
    outline: none;

    &__content {
      right: -80px;
      margin-top: 15px;

      &__main {
        width: 200px;
        &__item {
          padding: 10px;
          margin: 1px 0px;
          width: auto;

          &__all {
            padding: 10px 0px;
          }

          &__none {
            font-weight: 600;
            font-size: 14px;
            padding: 10px 0px;
            user-select: none;
            width: auto;
          }
        }

        // &__item:first-child {
        //   margin: 0;
        // }

        // img {
        //   width: 20px;
        //   height: 20px;
        // }
      }
    }
  }
}
</style>
