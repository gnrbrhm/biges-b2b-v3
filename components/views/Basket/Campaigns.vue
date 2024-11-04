<template>
  <div v-loading-biges="{ loading: isLoading }" class="campaign-grid">
    <div class="campaign-grid__header">
      <p class="text-primary">Kampanyanızı Seçin 🎉</p>
    </div>
    <div class="campaign-grid__list">
      <div
        @click="prev"
        v-if="activeCard != 0"
        class="campaign-grid__list__prev clickable"
      >
        <Icons name="left" icon-color="#ccc" />
      </div>
      <div class="slider-container">
        <div class="slider-campaign-card">
          <CampaignCard
            :id="'campaign-item-' + index"
            class="thumb"
            @onClick="snapThumb(campaign, index)"
            :isActive="activeCard == index"
            :item="campaign"
            v-for="(campaign, index) in campaignCategories"
            :key="campaign + '-' + index"
          ></CampaignCard>
        </div>
      </div>
      <div
        @click="next"
        v-if="activeCard != campaignCategories.length - 1"
        class="campaign-grid__list__next clickable"
      >
        <Icons name="right" icon-color="#ccc" />
      </div>
    </div>
    <div class="campaign-grid__products">
      <div class="">
        <div class="table-container">
          <table class="product-table-campaign">
            <thead>
              <tr>
                <th>Ürün</th>
                <th>Kazanılan / Alınan</th>
                <th class="no-white-space">Size Özel Fiyatı</th>
                <th>Kampanya Fiyatı</th>
                <th></th>
              </tr>
            </thead>
            <tbody
              v-if="productList.length"
              :key="refreshEl + 'campaign_table'"
            >
              <CampaignProduct
                v-for="(product, index) in productList"
                :key="product.stock_code + '__' + index"
                :product="product"
                @addProduct="addToBasket"
              ></CampaignProduct>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="campaign-grid__buttons">
      <button @click="handleClose" class="btn-text">SEPETE DÖN</button>
      <!--<button class="btn-primary">DEVAM ET</button>-->
    </div>
  </div>
</template>

<script>
import endpoints from '@/api/endpoints'
import Icons from '@/components/icons'
import CampaignCard from './CampaignCard'
import CampaignProduct from './CampaignProduct'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Icons,
    CampaignCard,
    CampaignProduct
  },
  data() {
    return {
      isLoading: true,
      products: [],
      campaignCategories: [],
      activeCard: 0,
      refreshEl: 0
    }
  },
  watch: {
    getRefreshStatus(value) {
      this.fetchData()
    }
  },
  computed: {
    ...mapGetters({ getRefreshStatus: 'campaign/getRefreshStatus' }),
    productList() {
      return this.products.map(item => {
        return {
          ...item,
          ...item?.product
        }
      })
    }
  },
  methods: {
    snapThumb(campaign, index) {
      this.activeCard = index
      let thumb = document.getElementById('campaign-item-' + this.activeCard)
      let parent = thumb.parentNode
      parent.scrollLeft = thumb.offsetLeft - 404
      this.products = [...campaign?.products].map(p => {
        p['quantity'] = 1
        return p
      })
    },
    prev() {
      this.activeCard -= 1
      this.snapThumb(this.campaignCategories[this.activeCard], this.activeCard)
    },
    next() {
      this.activeCard += 1
      this.snapThumb(this.campaignCategories[this.activeCard], this.activeCard)
    },
    async fetchData() {
      try {
        this.isLoading = true
        let { status, data } = await this.$axios(
          endpoints.basket.list_campaign_products
        )
        if (status == 200)
          // this.products = [...data.results].map((p) => {
          //   p['quantity'] = 1
          //   return p
          // })
          this.campaignCategories = [...data.results]
            ?.map(p => {
              return p
            })
            .sort((a, b) => a.products.length - b.products.length)
            .reverse()
        this.products = this.campaignCategories?.[
          this.activeCard
        ]?.products?.map(p => {
          p['quantity'] = 1
          return p
        })
        this.refreshEl = new Date().getTime()
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
      }
    },
    handleClose() {
      this.$parent.$emit('onClose')
    },
    addToBasket(product) {
      this.$parent.$emit('addProduct', product)
      // this.handleClose()
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
@import './../../styles/Basket/campaigns.scss';
</style>
