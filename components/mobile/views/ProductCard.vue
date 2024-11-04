<template>
  <div :class="classSuffix + ' mobile_product_card'">
    <div class="mobile_product_card__tags" v-show="hasTags && isAuthenticated">
      <div class="mobile_product_card__tags__item" v-if="hasStock">
        <app-icon name="shipment" stroke-color="transparent" />
        <span class="ml-10">{{ getStock(availableStock) }}</span>
      </div>
      <div class="mobile_product_card__tags__item" v-show="isEco">
        <app-icon name="downloads" stroke-color="transparent" />
      </div>
      <div class="mobile_product_card__tags__item" v-show="hasDiscount">
        <app-icon name="discount" stroke-color="transparent" />
      </div>
      <div class="mobile_product_card__tags__item" v-show="inCampaign">
        <app-icon name="advertisement" />
        <span class="tooltip ml-10">Kampanyalı Ürün</span>
      </div>
      <div class="mobile_product_card__tags__item" v-show="isAlternative">
        <app-icon name="shuffle" stroke-color="transparent" />
      </div>
      <div class="mobile_product_card__tags__item" v-show="isOutlet">
        <app-icon name="warehouse" stroke-color="transparent" />
      </div>
    </div>

    <nuxt-link :to="`/urunler/${id}`">
      <div class="product-image">
        <div class="product-image-grid">
          <img
            v-if="productImage && !isDummyImage"
            v-fly-to-basket="{
              loading: animationBasket && isFlyToBasket
            }"
            :id="id + '-fly'"
            :src="productImage"
            @error="handleImageLoaded"
            class="product-img"
          />
          <div
            v-if="!productImage || isDummyImage"
            v-fly-to-basket="{
              loading: animationBasket && isFlyToBasket
            }"
            :id="id - '-fly'"
            class="product-img --dummy"
            :data-text="!isDummyImage ? 'Fotoğraf Yok' : 'Fotoğraf Yüklenemedi'"
          ></div>
        </div>
      </div>
    </nuxt-link>

    <div class="product-brand">
      <div class="product-brand-left">
        <span
          class="product-brand-name"
          @click="$emit('handleClickBrand', brandId)"
        >
          {{ brandName }}
        </span>
        <span v-if="customLabel" class="new-product">
          {{ customLabel }}
        </span>
        <span
          v-if="specificNote"
          v-tooltip="specificNote"
          class="specific-note"
        >
          <app-icon
            strokeOpacity="none"
            strokeColor="none"
            name="love"
            width="12"
            height="10.5"
          />
        </span>
        <span
          v-if="getFavState"
          @click="clickFavoriteIcon"
          class="product-brand-favorite"
        >
          <app-icon
            strokeOpacity="none"
            strokeColor="none"
            name="love"
            width="12"
            height="10.5"
          />
        </span>
      </div>
      <span class="product-brand-favorite-add">
        <div
          v-if="!getFavState && isAuthenticated"
          class="product-brand-favorite-add__icon"
          @click="openAddToFavorite"
        >
          <app-icon
            name="add-to-favorite2"
            width="24"
            height="24"
            icon-color="none"
            strokeOpacity="0.5"
            strokeColor="#1F1F1F"
          />
        </div>
      </span>
    </div>

    <div class="p-10">
      <div class="product-model" :title="productName" @click="productCardClick">
        <nuxt-link :to="`/urunler/${id}`">
          <span>{{ productName }}</span>
        </nuxt-link>
      </div>
      <div class="product-desc">
        <p>{{ productDescription }}</p>
      </div>
    </div>

    <div
      v-if="isAuthenticated && hasPrice && (hasPriceList || hasPriceSpecial)"
      v-show="!priceMask"
      class="product-price"
    >
      <div
        v-if="!hasPriceSpecial || (hasPriceSpecial && hasPriceList)"
        class="price price-list"
      >
        <p class="price-list-title">LİSTE FİYATI</p>
        <p>{{ currencySymbol[currency] }} {{ retailPrice | numberFormatTr }}</p>
      </div>
      <div
        v-if="!hasPriceList || (hasPriceSpecial && hasPriceList)"
        class="price price-list"
      >
        <p class="price-list-title">SİZE ÖZEL</p>
        <p>
          {{ currencySymbol[currency] }} {{ resellerPrice | numberFormatTr }}
        </p>
      </div>
    </div>

    <div
      v-if="hasAction && isAuthenticated"
      :data-stock="availableStock || priceMask ? 0 : availableStock"
      class="product-action"
    >
      <div class="field button-field">
        <button
          v-if="renderButtons == 'add-basket'"
          class="add-basket-button has-text-weight-semibold"
          @click="addToBasket()"
        >
          SEPETE AT
        </button>

        <button
          v-if="renderButtons == 'stock-info'"
          class="add-basket-button has-text-weight-semibold"
          @click=" ()=>{
            infoModal.isStock = true
            infoModal.isActive = true}
          "
        >
          STOK BİLGİSİ ALIN
        </button>

        <button
          v-if="renderButtons == 'price-info'"
          class="add-basket-button has-text-weight-semibold"
          @click="infoModal.isActive = true"
        >
          FİYAT BİLGİSİ ALIN
        </button>
      </div>
    </div>
    <Modal
      :height="'200px'"
      :isActive="infoModal.isActive"
      @close="infoModal.isActive = false"
    >
      <div class="getInfoModal">
        <div class="getInfoModal_title">
          {{ id }} ürünü için {{ infoModal.isStock ? 'stok' : 'fiyat' }} bilgisi
          istiyorum.
        </div>

        <div class="getInfoModal_form">
          <Button @onSubmit="sendInfoMail" text="GÖNDER" />
          <Button @onSubmit="infoModal.isActive = false" text="VAZGEÇ" />
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Icon from '../../../components/Icon.vue'
import AddToFavorite from '@/components/AddToFavorite.vue'
import QuickView from '@/components/QuickView.vue'
import { CURRENCY_SYMBOL } from '@/constants'
import Modal from '@/components/mobile/views/Modal'
import Button from '@/components/common/Button'
export default {
  components: {
    appIcon: Icon,
    appAddToFavorite: AddToFavorite,
    appQuickView: QuickView,
    Modal,
    Button
  },
  props: {
    trace: {
      type: Object,
      default: () => {}
    },
    renderButtons: {
      type: String,
      default: 'stock-info'
    },
    id: {
      type: String,
      default: null
    },
    classSuffix: {
      type: String,
      default: '--large'
    },
    productName: {
      type: String,
      default: null
    },
    productDescription: {
      type: String,
      default: null
    },
    currency: {
      type: String,
      default: null
    },
    retailPrice: {
      type: String,
      default: null
    },
    resellerPrice: {
      type: String,
      default: null
    },
    brandId: {
      type: Number,
      default: null
    },
    brandName: {
      type: String,
      default: null
    },
    customLabel: {
      type: String,
      default: null
    },
    specificNote: {
      type: String,
      default: null
    },
    productImage: {
      type: String,
      default: null
    },
    hasDiscount: {
      type: Boolean,
      default: false
    },
    inCampaign: {
      type: Boolean,
      default: false
    },
    isFavorite: {
      type: Boolean,
      default: false
    },
    isAlternative: {
      type: Boolean,
      default: false
    },
    isEco: {
      type: Boolean,
      default: false
    },
    isOutlet: {
      type: Boolean,
      default: false
    },
    hasTags: {
      type: Boolean,
      default: false
    },
    hasFavorite: {
      type: Boolean,
      default: false
    },
    hasAction: {
      type: Boolean,
      default: false
    },
    hasStock: {
      type: Boolean,
      default: true
    },
    hasPriceList: {
      type: Boolean,
      default: true
    },
    hasPriceSpecial: {
      type: Boolean,
      default: true
    },
    hasAlternativeBtn: {
      type: Boolean,
      default: false
    },
    availableStock: {
      type: Number,
      default: null
    },
    animationBasket: {
      type: Boolean,
      default: false
    },
    photos: {
      type: Array,
      default: () => []
    },
    priceMask: {
      type: Boolean,
      default: false
    },
    hasPrice: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    getFavState() {
      return this.isAddedFav
    }
  },
  data: () => {
    return {
      quantity: 1,
      isDummyImage: false,
      isLoading: false,
      isFlyToBasket: false,
      currencySymbol: { ...CURRENCY_SYMBOL },
      isShowQuickView: false,
      isFavoriteModal: false,
      isAddedFav: false,
      infoModal: {
        isActive: false,
        isStock: false
      }
    }
  },
  methods: {
    ...mapActions({
      removeProductFavorite: 'favorite/removeProductFavorite',
      fetchSimilarProductCounter: 'products/fetchSimilarProductCounter'
    }),
    async sendInfoMail() {
      try {
        const url = `/products/${
          this.infoModal.isStock ? 'stock_information' : 'price_information'
        }/${this.id}`
        const result = await this.$axios({ method: 'GET', url })

        if (result.status == 200) {
          this.$notify({
            type: 'success',
            title: 'İşlem Başarılı!',
            text: result?.data?.message,
            duration: 2000
          })
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.infoModal.isActive = false
      }
    },
    onChangedFavorite(data) {
      let { value } = data
      this.isAddedFav = value
    },
    getStock(num) {
      if (num < 20) return num
      else if (num < 50) return '20+'
      else if (num < 100) return '50+'
      else return '100+'
    },
    favClick(i) {
      i ? this.clickFavoriteIcon() : this.openAddToFavorite()
    },
    async clickFavoriteIcon() {
      try {
        await this.removeProductFavorite(this.id)
        this.isAddedFav = false
      } catch (error) {
        console.log(error)
      }
    },
    async addToBasket() {
      this.isLoading = true
      try {
        await this.$store.dispatch('basket/addBasket', {
          stock_code: this.id,
          quantity: this.quantity
        })
        this.isFlyToBasket = true
        this.quantity = 1
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false
      setTimeout(() => {
        this.isFlyToBasket = false
      }, 1500)
    },
    openAddToFavorite() {
      this.isFavoriteModal = true
    },
    increment() {
      this.quantity++
    },
    decrement() {
      if (this.quantity > 1) this.quantity--
    },
    handleImageLoaded() {
      this.isDummyImage = true
    },
    async productCardClick() {
      if (this.trace) {
        await this.fetchSimilarProductCounter({
          ...this.trace,
          similar_product_code: this.id
        })
      }
    }
  },
  created() {
    this.isAddedFav = this.hasFavorite || this.isFavorite
  }
}
</script>

<style lang="scss" scoped>
// @import '../../../assets/css/variables.scss/';

.mobile_product_card {
  border: 1px solid rgba(31, 31, 31, 0.1);
  box-sizing: border-box;
  border-radius: 3px;
  margin-top: 20px;
  background: white;
  width: 100%;

  &__tags {
    display: flex;
    padding: 10px;
    gap: 10px;

    &__item {
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(13, 47, 129, 0.05);
      border-radius: 3px;
      color: #0d2f81;
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
      padding: 3px;
    }
  }

  .product-image {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .product-image-grid {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      height: 120px;
      margin: 20px auto;
    }
    .product-img {
      &.--dummy {
        background-color: $grey-light;
        width: 120px;
        height: 120px;
        margin: 20px auto;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        &::before {
          content: attr(data-text);
          color: #91928f;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.3;
        }
      }
    }

    .overlay {
      visibility: hidden;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      .overlay-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .button {
          background: $white;
          box-shadow: $boxShadow;
          border: 0;
          border-radius: 100px;
          color: $primary;
          width: 162px;
          &:first-child {
            margin-bottom: 15px;
          }
          span {
            margin-left: 10px;
          }
        }
      }
    }
  }

  .product-brand {
    display: grid;
    grid-template-columns: 1fr 24px;
    font-size: 10px;
    align-items: center;
    padding: 0 10px;
    .product-brand-left {
      justify-self: flex-start;
      display: flex;
      flex-direction: row;
      .product-brand-name {
        display: inline-block;
        background: $bg-grey;
        border: 1px solid $border-dark;
        color: $text-grey;
        padding: 2px 6px;
        border-radius: 3px;
        margin-right: 5px;
        cursor: pointer;
        &:hover {
          background: $primary;
          color: $white;
        }
      }
      .new-product {
        display: inline-block;
        color: $text-red;
        background: $bg-red;
        border: 1px solid $border-red;
        color: $secondary;
        padding: 2px 6px;
        border-radius: 3px;
        margin-right: 5px;
      }
      .specific-note {
        width: 24px;
        height: 24px;
        border: 1px solid rgba(13, 47, 129, 0.1);
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 5px;
      }

      .product-brand-favorite {
        background: $bg-red;
        border: 1px solid $border-red;
        border-radius: 3px;

        height: 23px;
        width: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    .product-brand-favorite-add {
      justify-self: flex-end;
      &__icon {
        width: 24px;
        height: 24px;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
  .product-model {
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    line-height: 25px;
    max-width: 250px;
    span {
      white-space: nowrap;
      color: $black;
    }
  }
  .product-desc {
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    display: block;
    display: -webkit-box;
    max-width: 100%;
    min-height: 34px;
    font-size: 14px;
    line-height: 17px;
    color: rgba(31, 31, 31, 0.5);
  }

  .product-price {
    width: 100%;
    border-top: 1px solid $border-dark;
    display: grid;
    grid-template-columns: 1fr 1fr;
    .price-list-title {
      font-weight: bold;
      font-size: 12px;
      line-height: 15px;
      color: rgba(31, 31, 31, 0.3);
      text-align: center;
    }
    .price-list {
      border-right: 1px solid $border-dark;
      padding: 10px 0;
    }
    .price {
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
      color: #1f1f1f;
      text-align: center;
    }
  }

  .product-action {
    width: 100%;
    background: $bg-dark-grey-fixed;
    display: grid;
    grid-template-columns: 1fr;
    &[data-stock='0'] {
      display: flex;
      align-items: center;
    }
    .field {
      width: 100%;
    }
    .input-field {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0;

      input {
        text-align: center;
        width: 42px;
        padding: 10px 0;
        border: none;
        border-radius: 3px;
        font-size: 15px;
        margin: 0 5px;
        &:focus {
          border: 1px solid $primary;
        }
      }
      button {
        color: $text-dark-grey;
        background: transparent;
        border: none;
        padding: 12px;
        &:hover {
          background: $bg-grey;
        }
      }
    }
    .button-field {
      height: 50px;
    }
    .add-basket-button {
      width: 100%;
      height: 100%;
      background: $primary;
      color: $white;
      border: none;
      cursor: pointer;
      &:hover {
        background: $primary-dark-3x;
      }
      &:disabled {
        opacity: 0.5;
      }
    }
    .add-basket-button-disabled {
      width: 100%;
      height: 100%;
      background: $primary;
      color: $white;
      border: none;
      cursor: pointer;
      opacity: 0.5;
    }

    .ask-price-button {
      width: 100%;
      height: 100%;
      background: $light;
      color: $grey-dark;
      border: none;
      cursor: pointer;
      opacity: 0.5;
    }
  }
}
</style>
