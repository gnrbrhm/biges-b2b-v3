<template>
  <div class="product-card --outlet" :class="{ 'is-active': isOpen }">
    <div class="product-grid" @click="isOpen = !isOpen">
      <div class="product-card__collapser-button">
        <img v-if="!isOpen" src="@/assets/svg/add-light.svg" />
        <img v-else src="@/assets/svg/remove-black.svg" />
      </div>
      <div class="product-card__photo_grid" :data-value="outlets.length">
        <img
          v-if="photos.length && !isDummyImage"
          @error="handleImageLoaded"
          class="product-card__photo"
          :src="photos.length ? photos[0].photo : null"
        />
        <div
          v-if="!photos.length || isDummyImage"
          class="product-img --dummy"
          :data-text="!isDummyImage ? 'Fotoğraf Yok' : 'Fotoğraf Yüklenemedi'"
        ></div>
      </div>
      <div class="product-card__detail">
        <div class="product-card__detail__title">
          {{ displayName }}
        </div>
        <p class="product-card__detail__description">
          {{ summary }}
        </p>
      </div>
    </div>

    <!-- outlet products -->
    <div
      v-if="isOpen && outlets.length"
      class="collapser-grid"
      :class="{ 'is-expand': isOpen, 'not-expand': !isOpen }"
    >
      <div
        v-for="(outlet, index) in outlets"
        :key="index + '-outlet-item'"
        class="product-grid"
      >
        <div class="product-card__collapser-index">
          {{ index + 1 }}
        </div>
        <div
          :id="outlet.outlet_id + '-parent'"
          class="product-card__photo_grid"
        >
          <img
            v-if="photos.length && !isDummyImage"
            @error="handleImageLoaded"
            class="product-card__photo"
            :id="outlet.outlet_id"
            :src="photos.length ? photos[0].photo : null"
          />
          <div
            v-if="!photos.length || isDummyImage"
            class="product-img --dummy"
            :id="outlet.outlet_id"
            :data-text="!isDummyImage ? 'Fotoğraf Yok' : 'Fotoğraf Yüklenemedi'"
          ></div>
        </div>
        <div class="product-card__detail">
          <nuxt-link
            :to="{
              name: 'urunler-outlet-id',
              params: { id: outlet.outlet_id }
            }"
            class="product-card__detail__title --secondary"
            >{{ displayName }} - {{ outlet.outlet_id }}</nuxt-link
          >
          <p class="product-card__detail__description">
            {{ outlet.description }}
          </p>
        </div>
        <div>
          <div class="product-card__detail__prices">
            <ul class="product-card__detail__prices__list">
              <li>
                <span class="product-card__detail__prices__list__title"
                  >BAYİ FİYATI</span
                >
                <p
                  class="product-card__detail__prices__list__value line-through"
                >
                  {{ currencySymbol[outlet.currency] }}
                  {{ outlet.reseller | numberFormatTr }}
                </p>
              </li>
              <li>
                <span class="product-card__detail__prices__list__title"
                  >Outlet Fiyat</span
                >
                <p class="product-card__detail__prices__list__value">
                  {{ currencySymbol[outlet.currency] }}
                  {{ outlet.remittance | numberFormatTr }}
                </p>
              </li>
            </ul>

            <button
              v-if="outlet.on_basket == true"
              :disabled="true"
              class="button-primary disabled"
            >
              SEPETE AT
            </button>
            <button
              v-else
              @click="addToBasket(outlet)"
              :disabled="loadingsIDs.includes(outlet.outlet_id)"
              class="button-primary"
            >
              SEPETE AT
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { CURRENCY_SYMBOL } from '@/constants'

export default {
  props: {
    stockCode: {
      type: String,
      default: null
    },
    displayName: {
      type: String,
      default: null
    },
    summary: {
      type: String,
      default: null
    },
    availableStock: {
      type: Number,
      default: 0
    },
    brand: {
      type: Number,
      default: 0
    },
    outlets: {
      type: Array,
      default: () => []
    },
    photos: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  data: () => {
    return {
      isLoading: false,
      isOpen: false,
      quantity: 1,
      isDummyImage: false,
      loadingsIDs: [],
      currencySymbol: { ...CURRENCY_SYMBOL }
    }
  },
  methods: {
    ...mapActions({
      fetchRawBasket: 'basket/fetchRawBasket'
    }),
    async addToBasket(outlet) {
      if (this.loadingsIDs.includes(outlet.outlet_id)) return
      this.loadingsIDs.push(outlet.outlet_id)
      try {
        let result = await this.$store.dispatch('basket/addBasket', {
          stock_code: this.stockCode,
          quantity: this.quantity,
          params: { outlet_no: outlet.outlet_id }
        })
        if (result) {
          this.quantity = 1
          this.$notify({
            type: 'success',
            text: outlet.outlet_id + ' sepete eklendi.',
            duration: 5000
          })
          this.$emit('refresh')
        }
      } catch (error) {
        console.log(error)
        this.$notify({
          type: 'error',
          title: 'İşlem Başarısız!',
          text: error,
          duration: 5000
        })
      }

      if (this.loadingsIDs.includes(outlet.outlet_id)) {
        this.loadingsIDs.splice(this.loadingsIDs.indexOf(outlet.outlet_id), 1)
      }
    },
    handleImageLoaded() {
      this.isDummyImage = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import './components/styles/ProductCard/product-card-outlet.scss';

.disabled {
  opacity: 0.5;
}
</style>
