<template>
  <div v-if="getLayout === 'desktop'" class="foryou-menu-container">
    <div class="foryou-settings flex" @click="changeMenu('settings')">
      <div class="col-10 flex row">
        <div class="profile flex align-center justify-center">
          {{ $auth.user.full_name | shortName }}
        </div>
        <div class="flex col">
          <div class="flex-1 name">{{ $auth.user.full_name }}</div>
          <div class="flex-1 subname">{{ $auth.user.profile.name }}</div>
        </div>
      </div>
      <div class="col-2 flex justify-end align-start">
        <img
          v-if="activeMenu == 'settings'"
          src="@/assets/svg/settings.svg"
          alt=""
        />
        <img v-else src="@/assets/svg/settings-inactive.svg" alt="" />
      </div>
    </div>

    <div
      v-if="isHybroneAccount"
      class="foryou-biges-club clickable"
      @click="changeMenu('hybrone-hedef')"
    >
      <div
        :class="{ 'active-card': activeMenu == 'hybrone-hedef' }"
        class="foryou-biges-club__card"
      >
        <div class="foryou-biges-club__card__top flex row">
          <div class="foryou-biges-club__card__top__icon flex align-center">
            <img
              v-if="activeMenu == 'hybrone-hedef'"
              src="@/assets/svg/video-game-magic-active.svg"
              alt=""
            />
            <img v-else src="@/assets/svg/video-game-magic.svg" alt="" />
          </div>
          <div class="foryou-biges-club__card__top__text">
            <div
              class="foryou-biges-club__card__top__text-group__first"
              :class="{ active: activeMenu == 'hybrone-hedef' }"
            >
              Hybrone Hedeflerim >
            </div>
            <div class="foryou-biges-club__card__top__text-group__second">
              Hedefleri gerçekleştir kazan.
            </div>
          </div>
        </div>
        <div class="foryou-biges-club__card__bottom flex col">
          <div class="foryou-biges-club__card__bottom__item flex row">
            <div class="foryou-biges-club__card__bottom__item__first">
              Gerçekleşen / Toplam
            </div>
            <div class="foryou-biges-club__card__bottom__item__second">
              {{ `${hybroneCount.completed} / ${hybroneCount.all}` }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="foryou-biges-club clickable" @click="changeMenu('biges-club')">
      <div
        :class="{ 'active-card': activeMenu == 'biges-club' }"
        class="foryou-biges-club__card"
      >
        <div class="foryou-biges-club__card__top flex row">
          <div class="foryou-biges-club__card__top__icon flex align-center">
            <img
              v-if="activeMenu == 'biges-club'"
              src="@/assets/svg/video-game-magic-active.svg"
              alt=""
            />
            <img v-else src="@/assets/svg/video-game-magic.svg" alt="" />
          </div>
          <div class="foryou-biges-club__card__top__text">
            <div
              class="foryou-biges-club__card__top__text-group__first"
              :class="{ active: activeMenu == 'biges-club' }"
            >
              Biges Cüzdan >
            </div>
            <div class="foryou-biges-club__card__top__text-group__second">
              Bigesliler her alışverişte kazanır
            </div>
          </div>
        </div>
        <div class="foryou-biges-club__card__bottom flex col">
          <div class="foryou-biges-club__card__bottom__item flex row">
            <div class="foryou-biges-club__card__bottom__item__first">
              Kullanılabilir Para Puan
            </div>
            <div class="foryou-biges-club__card__bottom__item__second">
              {{ bigesWallet.wallet_points }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex row mt-28 clickable"
      @click="changeMenu('financial-state')"
    >
      <div class="col-px-20">
        <img
          v-if="activeMenu == 'financial-state'"
          src="@/assets/svg/accounting-bills-active.svg"
          alt=""
        />
        <img v-else src="@/assets/svg/accounting-bills.svg" alt="" />
      </div>
      <div
        class="menu-text"
        :class="{ active: activeMenu == 'financial-state' }"
      >
        Finansal Durum
      </div>
    </div>
    <div class="flex row mt-28 clickable" @click="changeMenu('financial')">
      <div class="col-px-20">
        <img
          v-if="activeMenu == 'financial'"
          src="@/assets/svg/accounting-bills-active.svg"
          alt=""
        />
        <img v-else src="@/assets/svg/accounting-bills.svg" alt="" />
      </div>
      <div class="menu-text" :class="{ active: activeMenu == 'financial' }">
        Finansal Hizmetler
      </div>
    </div>
    <div class="flex row mt-32 clickable" @click="changeMenu('order')">
      <div class="col-px-20">
        <img
          v-if="activeMenu == 'order'"
          src="@/assets/svg/shoping-bag-active.svg"
          alt=""
        />
        <img v-else src="@/assets/svg/shoping-bag.svg" alt="" />
      </div>
      <div class="menu-text" :class="{ active: activeMenu == 'order' }">
        Siparişlerim
      </div>
    </div>
    <div class="flex row mt-28 clickable" @click="changeMenu('cargo_track')">
      <div class="col-px-20">
        <img
          v-if="activeMenu == 'cargo_track'"
          src="@/assets/svg/order/truck-blue.svg"
          alt=""
        />
        <img v-else src="@/assets/svg/order/truck-gray.svg" alt="" />
      </div>
      <div class="menu-text" :class="{ active: activeMenu == 'cargo_track' }">
        Kargo Takip
      </div>
    </div>
    <div class="flex row mt-32 clickable" @click="changeMenu('favorite')">
      <div class="col-px-20">
        <Icon
          v-if="activeMenu == 'favorite'"
          name="Heart"
          :options="{ stroke: '#0D2F81' }"
        ></Icon>
        <Icon
          v-else
          name="Heart"
          :options="{ stroke: 'rgba(31, 31, 31, 0.7)' }"
        ></Icon>
      </div>
      <div class="menu-text" :class="{ active: activeMenu == 'favorite' }">
        Favorilerim
      </div>
    </div>
    <div class="flex row mt-32 clickable" @click="changeMenu('work')">
      <div class="col-px-20">
        <img
          v-if="activeMenu == 'work'"
          src="@/assets/svg/briefcase-active.svg"
          alt=""
        />
        <img v-else src="@/assets/svg/briefcase.svg" alt="" />
      </div>
      <div class="menu-text" :class="{ active: activeMenu == 'work' }">
        Tekliflerim
      </div>
    </div>
    <div class="flex row mt-28 clickable" @click="changeMenu('service')">
      <div class="col-px-20">
        <img
          v-if="activeMenu == 'service'"
          src="@/assets/svg/headphone-active.svg"
          alt=""
        />
        <img v-else src="@/assets/svg/headphone.svg" alt="" />
      </div>
      <div class="menu-text" :class="{ active: activeMenu == 'service' }">
        Servis
      </div>
    </div>
    <div class="flex row mt-28 clickable" @click="changeMenu('management')">
      <div class="col-px-20">
        <img
          v-if="activeMenu == 'management'"
          src="@/assets/svg/hierarchy-active.svg"
          alt=""
        />
        <img v-else src="@/assets/svg/hierarchy.svg" alt="" />
      </div>
      <div class="menu-text" :class="{ active: activeMenu == 'management' }">
        Yönetim
      </div>
    </div>
    <!-- <div @click="changeMenu('support')" class="flex row mt-28 clickable">
      <div class="col-px-20">
        <img
          v-if="activeMenu == 'support'"
          src="@/assets/svg/messages-bubble-active.svg"
          alt=""
        />
        <img v-else src="@/assets/svg/messages-bubble.svg" alt="" />
      </div>
      <div class="menu-text" :class="{ active: activeMenu == 'support' }">
        Destek
      </div>
    </div> -->
  </div>
  <div
    v-else-if="getLayout === 'mobile'"
    class="foryou-menu-container manual-accordion__top__menu"
  >
    <div class="foryou-settings flex" @click="changeMenu('settings')">
      <div class="col-10 flex row">
        <div class="profile flex align-center justify-center">
          {{ $auth.user.full_name | shortName }}
        </div>
        <div class="flex col">
          <div class="flex-1 name">{{ $auth.user.full_name }}</div>
          <div class="flex-1 subname">{{ $auth.user.profile.name }}</div>
        </div>
      </div>
      <div class="col-2 flex justify-end align-start">
        <img
          v-if="activeMenu == 'settings'"
          src="@/assets/svg/settings.svg"
          alt=""
        />
        <img v-else src="@/assets/svg/settings-inactive.svg" alt="" />
      </div>
    </div>
    <details ref="df_1" @toggle="onToggle($event, 1)">
      <summary>
        <p class="manual-accordion__top__menu_item">
          Menu
          <span ref="sf_1">+</span>
        </p>
      </summary>
      <div>
        <div class="accordion-sub-menu">
          <div
            v-if="isHybroneAccount"
            class="foryou-biges-club clickable"
            @click="changeMenu('hybrone-hedef')"
          >
            <div
              :class="{ 'active-card': activeMenu == 'hybrone-hedef' }"
              class="foryou-biges-club__card"
            >
              <div class="foryou-biges-club__card__top flex row">
                <div
                  class="foryou-biges-club__card__top__icon flex align-center"
                >
                  <img
                    v-if="activeMenu == 'hybrone-hedef'"
                    src="@/assets/svg/video-game-magic-active.svg"
                    alt=""
                  />
                  <img v-else src="@/assets/svg/video-game-magic.svg" alt="" />
                </div>
                <div class="foryou-biges-club__card__top__text">
                  <div
                    class="foryou-biges-club__card__top__text-group__first"
                    :class="{ active: activeMenu == 'hybrone-hedef' }"
                  >
                    Hybrone Hedeflerim >
                  </div>
                  <div class="foryou-biges-club__card__top__text-group__second">
                    Hedefleri gerçekleştir kazan.
                  </div>
                </div>
              </div>
              <div class="foryou-biges-club__card__bottom flex col">
                <div class="foryou-biges-club__card__bottom__item flex row">
                  <div class="foryou-biges-club__card__bottom__item__first">
                    Gerçekleşen / Toplam
                  </div>
                  <div class="foryou-biges-club__card__bottom__item__second">
                    {{ `${hybroneCount.completed} / ${hybroneCount.all}` }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="foryou-biges-club clickable"
            @click="changeMenu('biges-club')"
          >
            <div
              :class="{ 'active-card': activeMenu == 'biges-club' }"
              class="foryou-biges-club__card"
            >
              <div class="foryou-biges-club__card__top flex row">
                <div
                  class="foryou-biges-club__card__top__icon flex align-center"
                >
                  <img
                    v-if="activeMenu == 'biges-club'"
                    src="@/assets/svg/video-game-magic-active.svg"
                    alt=""
                  />
                  <img v-else src="@/assets/svg/video-game-magic.svg" alt="" />
                </div>
                <div class="foryou-biges-club__card__top__text">
                  <div
                    class="foryou-biges-club__card__top__text-group__first"
                    :class="{ active: activeMenu == 'biges-club' }"
                  >
                    Biges Cüzdan >
                  </div>
                  <div class="foryou-biges-club__card__top__text-group__second">
                    Bigesliler her alışverişte kazanır
                  </div>
                </div>
              </div>
              <div class="foryou-biges-club__card__bottom flex col">
                <div class="foryou-biges-club__card__bottom__item flex row">
                  <div class="foryou-biges-club__card__bottom__item__first">
                    Kullanılabilir Para Puan
                  </div>
                  <div class="foryou-biges-club__card__bottom__item__second">
                    {{ bigesWallet.wallet_points }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex row mt-28 clickable"
            @click="changeMenu('financial-state')"
          >
            <div class="col-px-20">
              <img
                v-if="activeMenu == 'financial-state'"
                src="@/assets/svg/accounting-bills-active.svg"
                alt=""
              />
              <img v-else src="@/assets/svg/accounting-bills.svg" alt="" />
            </div>
            <div
              class="menu-text"
              :class="{ active: activeMenu == 'financial-state' }"
            >
              Finansal Durum
            </div>
          </div>
          <div
            class="flex row mt-28 clickable"
            @click="changeMenu('financial')"
          >
            <div class="col-px-20">
              <img
                v-if="activeMenu == 'financial'"
                src="@/assets/svg/accounting-bills-active.svg"
                alt=""
              />
              <img v-else src="@/assets/svg/accounting-bills.svg" alt="" />
            </div>
            <div
              class="menu-text"
              :class="{ active: activeMenu == 'financial' }"
            >
              Finansal Hizmetler
            </div>
          </div>
          <div class="flex row mt-32 clickable" @click="changeMenu('order')">
            <div class="col-px-20">
              <img
                v-if="activeMenu == 'order'"
                src="@/assets/svg/shoping-bag-active.svg"
                alt=""
              />
              <img v-else src="@/assets/svg/shoping-bag.svg" alt="" />
            </div>
            <div class="menu-text" :class="{ active: activeMenu == 'order' }">
              Siparişlerim
            </div>
          </div>
          <div
            class="flex row mt-28 clickable"
            @click="changeMenu('cargo_track')"
          >
            <div class="col-px-20">
              <img
                v-if="activeMenu == 'cargo_track'"
                src="@/assets/svg/order/truck-blue.svg"
                alt=""
              />
              <img v-else src="@/assets/svg/order/truck-gray.svg" alt="" />
            </div>
            <div
              class="menu-text"
              :class="{ active: activeMenu == 'cargo_track' }"
            >
              Kargo Takip
            </div>
          </div>
          <div class="flex row mt-32 clickable" @click="changeMenu('favorite')">
            <div class="col-px-20">
              <Icon
                v-if="activeMenu == 'favorite'"
                name="Heart"
                :options="{ stroke: '#0D2F81' }"
              ></Icon>
              <Icon
                v-else
                name="Heart"
                :options="{ stroke: 'rgba(31, 31, 31, 0.7)' }"
              ></Icon>
            </div>
            <div
              class="menu-text"
              :class="{ active: activeMenu == 'favorite' }"
            >
              Favorilerim
            </div>
          </div>
          <div class="flex row mt-32 clickable" @click="changeMenu('work')">
            <div class="col-px-20">
              <img
                v-if="activeMenu == 'work'"
                src="@/assets/svg/briefcase-active.svg"
                alt=""
              />
              <img v-else src="@/assets/svg/briefcase.svg" alt="" />
            </div>
            <div class="menu-text" :class="{ active: activeMenu == 'work' }">
              Tekliflerim
            </div>
          </div>
          <div class="flex row mt-28 clickable" @click="changeMenu('service')">
            <div class="col-px-20">
              <img
                v-if="activeMenu == 'service'"
                src="@/assets/svg/headphone-active.svg"
                alt=""
              />
              <img v-else src="@/assets/svg/headphone.svg" alt="" />
            </div>
            <div class="menu-text" :class="{ active: activeMenu == 'service' }">
              Servis
            </div>
          </div>
          <div
            class="flex row mt-28 clickable"
            @click="changeMenu('management')"
          >
            <div class="col-px-20">
              <img
                v-if="activeMenu == 'management'"
                src="@/assets/svg/hierarchy-active.svg"
                alt=""
              />
              <img v-else src="@/assets/svg/hierarchy.svg" alt="" />
            </div>
            <div
              class="menu-text"
              :class="{ active: activeMenu == 'management' }"
            >
              Yönetim
            </div>
          </div>
        </div>
      </div>
    </details>
  </div>
</template>

<script>
import Icon from '@/components/icons'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'Menu',
  components: { Icon },
  filters: {
    shortName(val) {
      let fullName = val
        .toString()
        .trim()
        .split(' ')
      return fullName[0].charAt(0) + fullName[1].charAt(0)
    }
    // filterDecimal(value) {
    //   if (parseFloat(value)) {
    //     let replaced = value?.toString()?.replace('.', ',')
    //     return (
    //       replaced?.toString()?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') ||
    //       replaced
    //     )
    //   } else {
    //     return value
    //   }
    // }
  },
  props: {
    active: { type: String, default: 'settings' }
  },
  data() {
    return {
      activeMenu: this.active,
      bigesWallet: {
        wallet_points: null
      },
      isHybroneAccount: null,
      all_level_info: null,
      current_status: {
        premise: {
          label: 'Mekanlar',
          value: '50',
          target: '50',
          key: 'premise'
        },
        customer: {
          label: 'Müşteriler',
          value: '44',
          target: '40',
          key: 'customer'
        },
        device: {
          label: 'Cihazlar',
          value: '8',
          target: '10',
          key: 'device'
        },
        addOn: {
          label: 'Eklentiler',
          value: '10',
          target: '50',
          key: 'addOn'
        },
        digitalProduct: {
          label: 'Dijital Ürünler',
          value: '0',
          target: '50',
          key: 'digitalProduct'
        },
        training: {
          label: 'Sertifikalar',
          value: '0',
          target: '0',
          key: 'training'
        }
      },
      hybroneCount: {
        completed: 0,
        all: 0
      },
      counter: 0
      // bigesClub: {}
    }
  },
  computed: {
    ...mapState('foryou', []),
    ...mapGetters(['getLayout'])
  },
  methods: {
    ...mapActions({
      fetchBigesClubGeneralInfo: 'foryou/fetchBigesClubGeneralInfo',
      fetchWalletPoint: 'foryou/fetchWalletPoint',
      fetchResellerGeneralInfo: 'foryou/fetchResellerGeneralInfo',
      fetchHybroneAccountCompaign: 'foryou/fetchHybroneAccountCompaign'
    }),
    onToggle(value, index) {
      if (this.$refs['df_' + index].open) {
        this.$refs['sf_' + index].innerHTML = '-'
        let liCount = this.$refs['df_' + index].children[1].children[0].children
          .length
        this.$refs['df_' + index].style.height = liCount * 25 + 75 + 'px'
      } else {
        this.$refs['sf_' + index].innerHTML = '+'
        this.$refs['df_' + index].style.height = '55px'
      }
    },
    changeMenu(text) {
      // this.activeMenu = text
      this.$emit('onChange', text)
    },
    // async getBigesClubInfo() {
    //   if (Object.keys(this.fetchBigesClubGeneralInfo).length) return
    //   await this.fetchBigesClubGeneralInfo().then(response => {
    //     // this.bigesClub = response
    //   })
    // },

    calculateStatus(level) {
      let result = true
      Object.keys(this.current_status).forEach(item => {
        result =
          result &&
          parseInt(this.current_status[item].value) >=
            parseInt(level[`${item}Count`])
      })
      return result
    },

    async getHybroneCounts() {
      console.log('Counter:::', this.counter++)
      try {
        const {
          all_level_info,
          hybrone_integrator_level
        } = await this.fetchHybroneAccountCompaign()
        Object.values(this.current_status).forEach((item, index) => {
          this.current_status[item.key].value =
            hybrone_integrator_level[`${item.key}Count`]
        })
        this.isHybroneAccount = hybrone_integrator_level != null
        this.all_level_info = all_level_info.map(l => {
          return {
            ...l,
            status: this.calculateStatus(l)
          }
        })
        this.$emit('isHybroneCustomer', hybrone_integrator_level)
        this.hybroneCount.all = this.all_level_info.length
        this.hybroneCount.completed = this.all_level_info.filter(
          item => item.status
        ).length
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
      }
    },

    async getWalletPoint() {
      this.isLoading = true
      if (Object.keys(this.fetchWalletPoint).length) return
      await this.fetchWalletPoint()
        .then(response => {
          if (response) {
            this.bigesWallet = response
          }
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    }
  },
  created() {
    // if (this.activeMenu == 'biges-club' || this.activeMenu == 'settings') {
    //   this.getBigesClubInfo()
    // }
    this.getHybroneCounts()
    this.getWalletPoint()
  }
}
</script>

<style lang="scss" scoped>
.foryou-settings {
  cursor: pointer;
  margin-bottom: 30px;

  .profile {
    min-width: 50px;
    height: 50px;
    background: #24ce95;
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;

    color: #ffffff;
    border-radius: 25px;
    margin-right: 10px;
  }
  .name {
    display: flex;
    align-items: center;
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;

    color: #1f1f1f;
  }
  .subname {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;

    color: rgba(31, 31, 31, 0.5);
  }
}

.foryou-biges-club {
  width: 272px;
  margin-bottom: 30px;

  &__card {
    background: #ffffff;
    border: 1px solid rgba(31, 31, 31, 0.1);
    box-sizing: border-box;
    border-radius: 5px;
    height: 123px;

    &__top {
      padding: 12px;
      border-bottom: 1px solid rgba(31, 31, 31, 0.1);

      &__icon {
        margin-right: 14px;
        width: 24px;
      }

      &__text-group {
        &__first {
          font-family: Inter;
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;

          color: rgba(31, 31, 31, 0.5);
        }

        &__second {
          margin-top: 6px;
          font-family: Inter;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 17px;
          color: rgba(31, 31, 31, 0.5);
        }
      }
    }

    &__bottom {
      padding: 20px;
      padding-bottom: 10px;

      &__item {
        padding-bottom: 10px;
        justify-content: space-between;

        &__first {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 17px;
          color: #4caf50;
        }

        &__second {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;
          text-align: right;
          color: #4caf50;
        }
      }
    }
  }

  .active-card {
    background: #ffffff;
    border: 1px solid rgba(31, 31, 31, 0.1);
    box-sizing: border-box;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
}

.menu-text {
  margin-left: 15px;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;

  color: rgba(31, 31, 31, 0.5);
}

.active {
  color: #0d2f81;
}

details {
  height: 55px;
  min-height: 55px;
  transition: height 0.2s ease-in-out;
  overflow: hidden;
}

details > summary {
  list-style: none;
}
details > summary::-webkit-details-marker {
  display: none !important;
}

.manual-accordion-enter-active,
.manual-accordion-leave-active {
  transition: opacity 0.5s;
}
.manual-accordion-enter,
.manual-accordion-leave-active {
  opacity: 0;
}

.manual-accordion {
  background: #001163;
  color: rgba(255, 255, 255, 0.7);
  border-top: 5px solid #dc1915;

  &__top {
    padding: 20px 0;

    &__menu {
      margin-top: 40px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);

      &_item {
        padding: 20px 15px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        color: rgba(31, 31, 31, 0.5);
        font-weight: bold;
        font-size: 16px;
      }
      .accordion-sub-menu {
        padding-left: 15px;
        padding-bottom: 10px;
        position: absolute;
        z-index: 9999;
        background: white;
        li {
          a {
            line-height: 25px;
            color: $grey-light;
            &:hover {
              color: gray;
            }
          }
        }
      }
    }

    &__info {
      padding: 0 15px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-row-gap: 30px;
      &_item {
        display: flex;
        flex-direction: column;

        &_header {
          color: rgba(255, 255, 255, 0.5);
        }

        &_info {
          color: rgba(255, 255, 255, 0.7);
          font-weight: bold;
          font-size: 16px;
        }
      }
    }

    &__social {
      padding-top: 20px;
      display: flex;
      gap: 20px;
      justify-content: center;
      align-items: center;

      &__icon {
        border: 1px solid rgba(255, 255, 255, 0.3);
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 40px;
    color: rgba(255, 255, 255, 0.3);
    background: #000759;

    img {
      width: 96px;
      height: 20px;
      margin: 0 20px;
    }

    span {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
    }
  }
}
</style>
