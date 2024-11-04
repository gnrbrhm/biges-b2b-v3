<template>
  <div class="utility-bar">
    <div class="container">
      <div class="columns is-desktop">
        <div class="column">
          <div class="tel">
            <div class="icon bordered-icon communicate">
              <app-icon
                style="padding-left: 2px;"
                name="tel"
                stroke-color="rgba(255, 255, 255, 0.30)"
              />
            </div>
            <span class="utilty-bar-label"> 444 0 918</span>
          </div>
        </div>
        <div class="column">
          <div class="hybrone-new-year">
            <img src="@/assets/svg/hybrone_logo_white.svg" alt="" />
            <span class="text">
              2024 Hybrone Yılı
            </span>
          </div>
        </div>
        <div class="column has-text-right-desktop">
          <div class="flex row-reverse">
            <div v-if="isAuthenticated" class="currency">
              <span class="utilty-bar-label">Sabit Kurumuz:</span>
              <div class="currency-wrap">
                <div class="icon bordered-icon usd-icon-special">
                  <app-icon name="usd" stroke-color="transparent" />
                </div>
                <span class="currency-info">{{ currency.USD }}</span>
              </div>
              <div class="currency-wrap">
                <div class="icon bordered-icon euro-icon-special">
                  <app-icon name="euro" stroke-color="transparent" />
                </div>
                <span class="currency-info">{{ currency.EUR }}</span>
              </div>
            </div>
            <div v-if="false" class="currency pr-30">
              <div
                @click="goRoute('https://www.facebook.com/BigesGuvenliHayat')"
                class="icon bordered-icon clickable"
              >
                <Icons name="Facebook" />
              </div>
              <div
                @click="goRoute('https://twitter.com/biges_guvenlik')"
                class="icon bordered-icon clickable"
              >
                <Icons name="Twitter" />
              </div>
              <div
                @click="goRoute('https://www.instagram.com/biges_guvenlihayat')"
                class="icon bordered-icon clickable"
              >
                <Icons name="Instagram" />
              </div>
              <div
                @click="
                  goRoute('https://www.youtube.com/user/BigesGuvenliHayat')
                "
                class="icon bordered-icon clickable"
              >
                <Icons name="Youtube" />
              </div>
              <div
                @click="
                  goRoute(
                    'https://www.linkedin.com/company/biges-as/mycompany/'
                  )
                "
                class="icon bordered-icon clickable"
              >
                <Icons name="Linkedin" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../../../components/Icon.vue'
import Icons from '@/components/icons'
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  components: {
    appIcon: Icon,
    Icons
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    ...mapGetters({
      getCurrency: 'core/getCurrency'
    }),
    currency() {
      return { USD: this.getCurrency?.USD, EUR: this.getCurrency?.EUR }
    }
  },
  methods: {
    ...mapActions({
      fetchCurrencies: 'core/fetchCurrencies'
    }),
    goRoute(value) {
      window.open(value, '_blank')
    }
  },
  created() {
    this.fetchCurrencies()
  }
}
</script>

<style lang="scss">
@import './components/styles/Header/utility-bar.scss';
</style>
