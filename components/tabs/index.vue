<template>
  <div class="product-tabs">
    <div class="container">
      <div class="tabs">
        <ul>
          <li
            v-for="(item, key) in tabs"
            v-show="item.isShow"
            :key="key + '-tabs-item' + item.isShow"
            :class="[currentTab == key ? 'active' : '']"
            @click="currentTab = key"
          >
            <a>{{ item.title }} </a>
          </li>
        </ul>
      </div>
      <div
        class="tabs-content"
        :class="{ 'tab-5': currentTab == 5 || currentTab == 4 }"
      >
        <component
          :is="tabs[currentTab].component"
          v-if="currentTab == 7 ? isAuthenticated : true"
          :product="product"
          :related-products="relatedProducts"
          :similar-products="similarProducts"
          :campaigns="getProductCampaigns"
          :isOutlet="isOutlet"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import General from './general'
import Campaigns from './campaigns'
import Features from './features'
import Supports from './supports'
import RelatedProducts from './related-products'
import SimilarProducts from './similar-products'
import PaymentMethod from './payment-method'

export default {
  name: 'tabs',
  props: {
    isOutlet: { type: Boolean, default: false },
    product: {
      type: Object,
      default: () => ({})
    },
    relatedProducts: { type: Array, default: () => [] },
    similarProducts: { type: Array, default: () => [] },
    selectedTab: { type: Number, default: 0 }
  },
  data: () => {
    return {
      currentTab: 1,
      isEmptyTab: false,
      tabs: {
        1: {
          title: 'GENEL BAKIŞ',
          isShow: false,
          code: 'general',
          component: General
        },
        2: {
          title: 'KAMPANYALAR',
          code: 'campaign',
          isShow: false,
          component: Campaigns
        },
        3: {
          title: 'TEKNİK ÖZELLİKLER',
          isShow: false,
          code: 'features',
          component: Features
        },
        4: {
          title: 'BENZER ÜRÜNLER',
          isShow: false,
          code: 'similar_products',
          component: SimilarProducts
        },
        5: {
          title: 'İLGİLİ ÜRÜNLER',
          isShow: false,
          code: 'related_products',
          component: RelatedProducts
        },
        6: {
          title: 'DESTEK',
          isShow: false,
          code: 'supports',
          component: Supports
        },
        7: {
          title: 'DİĞER ÖDEME SEÇENEKLERİ',
          isShow: false,
          code: 'payment',
          component: PaymentMethod
        }
      }
    }
  },
  watch: {
    selectedTab(value) {
      this.currentTab = value
    },
    currentTab(value) {
      this.$emit('handleCurrentTab', parseInt(value))
    }
    // getProductCampaigns(val) {
    //   if (val.length) {
    //     this.tabs[2].isShow = true
    //     this.renderTabs()
    //   }
    // }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    ...mapGetters({
      getProductCampaigns: 'campaign/getProductCampaigns'
    })
  },
  methods: {
    ...mapActions({
      fetchProductCampaigns: 'campaign/fetchProductCampaigns'
    }),
    renderTabs() {
      for (const [key, value] of Object.entries(this.tabs)) {
        let isShow = this.isShow(value.code, key)
        if (isShow) {
          this.tabs[key].isShow = true
        }
      }
    },
    isShow(code, key) {
      let status = false
      if (
        code == 'payment' &&
        this.isAuthenticated &&
        Object.keys(this.product.prices).length &&
        !this.product?.price_mask
      ) {
        status = true
      } else {
        if (code == 'general' && this.product?.info_description) {
          status = true
        } else if (
          code == 'features' &&
          this.product?.technical_features?.length
        ) {
          status = true
        } else if (code == 'supports') {
          status = true
        } else if (code == 'related_products' && this.relatedProducts?.length) {
          status = true
        } else if (code == 'similar_products' && this.similarProducts?.length) {
          status = true
        }
      }
      if (status && !this.isEmptyTab) {
        this.isEmptyTab = true
        this.currentTab = key
      }
      console.log('IS Show Function', this.$route.name)
      if (code == 'payment' && this.$route.name == 'urunler-outlet-id') {
        status = false
      }
      return status
    },
    priceControl() {
      let showResellerPrice = this.loggedInUser?.filters?.show_reseller_price
      let showListPrice = this.loggedInUser?.filters?.show_list_price
      if (!showResellerPrice && !showListPrice) {
        delete this.tabs[7]
      }
    }
  },
  created() {
    this.priceControl()
    if (this.isAuthenticated) {
      this.fetchProductCampaigns(this.product.stock_code)
    }
    this.renderTabs()
  }
}
</script>

<style lang="scss">
@import './components/styles/Tabs/tabs.scss';
</style>
