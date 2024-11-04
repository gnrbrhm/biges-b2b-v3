<template>
    <div>
      <!-- Add to Favorite Modal -->
      <app-add-to-favorite
        :productCode="id"
        v-if="isFavoriteModal && isAuthenticated"
        @onClose="isFavoriteModal = false"
        @onChanged="onChangedFavorite"
        :isActive="isFavoriteModal"
        ref="addToFavorite"
      />
  
      <div class="quick-view-overlay" @click="$emit('onClose')" />
      <div class="product-modal">
        <div class="product-modal-inner">
          <div class="image-field">
            <div class="quick-view-product-image">
              <div class="product-img">
                <img :src="photo ? photo : null" />
              </div>
              <div class="thumbnails">
                <span
                  @click="setPhoto(item.photo, index)"
                  :class="{ 'is-active': index == photoIndex }"
                  v-for="(item, index) in photos"
                  :key="index + '-quick-photo'"
                  class="thumb"
                  ><img :src="item.photo" /></span>
              </div>
            </div>
          </div>
          <div class="info-field">
            <div class="close-modal" @click="$emit('onClose')">
              <app-icon name="close-bold" />
            </div>
            <ProductTags :isProductCard="false" :product="product" />
            <div class="product-brand">
              <span class="product-brand-name">{{ brandName }}</span>
            </div>
            <div class="product-model">
              <nuxt-link :to="`/urunler/${id}`">
                <span>{{ productName }}</span>
              </nuxt-link>
            </div>
            <div class="product-desc">
              <p>{{ productDescription }}</p>
              <span v-if="customLabel" class="new-product">
                {{ customLabel }}
              </span>
            </div>
            <div class="product-feature" v-if="baseFeature">
              <p v-for="(f, index) in baseFeature.split('\n')" :key="index">
                {{ f }}
              </p>
            </div>
            <div
              class="product-price"
              style="grid-template-columns: 1fr 1fr"
              v-if="isAuthenticated && (showCondition.isList || showCondition.isReseller)"
              v-show="!priceMask && Object.keys(product.prices).length"
            >
              <div class="price price-list" v-if="showCondition.isList">
                <p class="price-list-title">LİSTE FİYATI</p>
                <p class="price">
                  {{ currencySymbol[currency] }}
                  {{ product.display_price.end_user | numberFormatTr }}
                </p>
              </div>
              <div
                class="price price-special"
                v-if="hasPriceSpecial && !hasDiscount && showCondition.isReseller"
              >
                <p class="price-list-title">SİZE ÖZEL</p>
                <p class="price">
                  {{ currencySymbol[currency] }}
                  {{ product.display_price.price | numberFormatTr }}
                </p>
              </div>
              <div
                v-if="product.display_price.strike_through_price !== null"
                class="price price-discount"
              >
                <div class="discount">
                  <div class="right">İNDİRİMLİ FİYAT</div>
                </div>
                <div class="prices">
                  <p>
                    {{ currencySymbol[currency] }}
                    {{ product.display_price.strike_through_price | numberFormatTr }}
                  </p>
                  <p>
                    {{ currencySymbol[currency] }}
                    {{ product.display_price.price | numberFormatTr }}
                  </p>
                </div>
              </div>
            </div>
            <div
              class="product-action"
              v-if="isAuthenticated"
              v-show="renderButtons == 'add-basket' || renderButtons == 'stock-info'"
            >
              <div class="field input-field">
                <button
                  class="button decrement"
                  :disabled="isLoading || !availableStock"
                  @click="decrement"
                >
                  <app-icon name="minus" stroke-color="transparent" />
                </button>
                <input
                  :disabled="isLoading || !availableStock"
                  type="number"
                  min="1"
                  :max="availableStock"
                  step="1"
                  v-model="quantity"
                />
                <button
                  class="button increment"
                  :disabled="isLoading || !availableStock"
                  @click="increment"
                >
                  <app-icon name="plus" stroke-color="transparent" />
                </button>
              </div>
              <div style="margin-bottom: 0px;" class="field button-field">
                <button
                  :disabled="isLoading"
                  class="add-basket-button has-text-weight-semibold"
                  @click="addToBasket"
                >
                  {{ availableStock ? 'SEPETE AT' : 'STOK BİLGİSİ ALIN' }}
                </button>
              </div>
            </div>
            <!-- Diğer kısımlar aynı kalıyor -->
          </div>
        </div>
      </div>
      <!-- Modals and other parts -->
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useStore } from 'vuex'
  import Icon from './Icon.vue'
  import Modal from '@/components/common/Modal.vue'
  import { CURRENCY_SYMBOL } from '@/constants'
  import AddToFavorite from '@/components/AddToFavorite.vue'
  import B2cProductDetailPdf from '@/components/pdf/B2cProductDetailPdf.vue'
  import ProductTags from '@/components/ProductTags.vue'
  import Button from '@/components/common/Button.vue'
  
  const props = defineProps({
    product: { type: Object, default: () => ({}) },
    renderButtons: { type: String, default: 'stock-info' },
    id: { type: String, default: null },
    productName: { type: String, default: null },
    productDescription: { type: String, default: null },
    currency: { type: String, default: null },
    retailPrice: { type: String, default: null },
    resellerPrice: { type: String, default: null },
    brandName: { type: String, default: null },
    customLabel: { type: String, default: null },
    productImage: { type: String, default: null },
    hasDiscount: { type: Boolean, default: false },
    discountPrice: { type: Object, default: () => ({}) },
    inCampaign: { type: Boolean, default: false },
    isFavorite: { type: Boolean, default: false },
    hasTags: { type: Boolean, default: false },
    hasFavorite: { type: Boolean, default: false },
    availableStock: { type: Number, default: null },
    photos: { type: Array, default: () => [] },
    hasPriceSpecial: { type: Boolean, default: true },
    priceMask: { type: Boolean, default: false },
    baseFeature: { type: String, default: null },
    bigesClubPoint: { type: Number, default: null },
    hasPrice: { type: Boolean, default: false }
  })
  
  const store = useStore()
  const photo = ref(props.productImage)
  const photoIndex = ref(0)
  const quantity = ref(1)
  const isFavoriteModal = ref(false)
  const isAddedFav = ref(props.isFavorite || props.hasFavorite)
  const isLoading = ref(false)
  const currencySymbol = ref(CURRENCY_SYMBOL)
  
  const showCondition = computed(() => ({
    isList: store.getters['loggedInUser']?.filters?.show_list_price,
    isReseller: store.getters['loggedInUser']?.filters?.show_reseller_price,
    isStock: store.getters['loggedInUser']?.filters?.show_stock
  }))
  
  const increment = () => {
    if (quantity.value < props.availableStock) quantity.value++
  }
  
  const decrement = () => {
    if (quantity.value > 1) quantity.value--
  }
  
  const setPhoto = (newPhoto, index) => {
    photo.value = newPhoto
    photoIndex.value = index
  }
  
  const addToBasket = async () => {
    if (quantity.value <= 0 || quantity.value > props.availableStock) return
    isLoading.value = true
    try {
      await store.dispatch('basket/addBasket', {
        stock_code: props.id,
        quantity: quantity.value
      })
      quantity.value = 1
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }
  </script>
  
<style lang="scss">
@import './components/styles/QuickView/quick-view.scss';

// comparelist show
.compare-list__items {
  padding-top: 21px;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 20px;
  gap: 20px;
}
.clear-list {
  cursor: pointer;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  text-align: right;
  color: rgba(31, 31, 31, 0.5);
  display: inline-flex;
  align-items: center;
  padding-right: 45px;
  width: 133px;
}
.compare-text {
  line-height: 19px;
  color: #1f1f1f;
  padding: 35px;
}
.compare-list-show {
  z-index: 9999;
  bottom: 0;
  left: 0;
  height: 110px;
  width: 100%;
  background-color: #ffffff;

  &__button {
    padding-left: 22px;
    background: #0d2f81;
    cursor: pointer;
    width: 200px;
    height: 107px;
    margin: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .list-length-show {
    font-weight: 600;
    font-size: 14px;
    line-height: 15px;
    color: #0d2f81;
    background-color: #fff;
    display: inline-flex;
    width: 18px;
    height: 18px;
    justify-content: center;
    align-items: center;
    position: relative;
    top: -8px;
    border-radius: 100%;
    padding-right: 1px;
  }
}

.compare-list-show__CLOSE {
  background-color: #da291c;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
  position: absolute;
  text-align: center;
  display: grid;
  align-items: center;
  right: 75px;
  bottom: 94px;
  width: 90px;
  height: 35px;
  margin: 0;
}
.position-fixed {
  border-top: solid 3px #da291c;
  display: grid;
  grid-template-columns: 0.6fr 4fr 1fr;
  margin-right: -12px;
}

label {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #fff;
  padding-left: 10px;
}
// comparelist unshow
.compare-list-unshow {
  z-index: 9999;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100%;
  background-color: #0d2f81;

  &__button {
    padding-left: 22px;
    background: #0d2f81;
    cursor: pointer;
    width: 200px;
    height: 107px;
    margin: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .list-length-unshow {
    font-weight: 600;
    font-size: 14px;
    line-height: 15px;
    color: #0d2f81;
    background-color: #fff;
    display: inline-flex;
    width: 18px;
    height: 18px;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    padding-right: 1px;
    margin: 0px 4px;
  }
}

.compare-text-unshow {
  line-height: 17px;
  color: #fff;
  font-size: 14px;
  padding: 15px 95px;
  text-align: left;
}

.compare-list-unshow__CLOSE {
  background-color: #da291c;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
  position: absolute;
  text-align: center;
  display: grid;
  align-items: center;
  right: 75px;
  bottom: 36px;
  width: 90px;
  height: 35px;
  margin: 0;
}

.position-fixed-unshow {
  border-top: solid 3px #da291c;
  margin-right: -12px;
}

.ask-price-button {
  padding: 10px 20px;
  text-align: center;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 10px;
  background: $primary !important;
  color: $white !important;
  opacity: 1 !important;
  &:hover {
    background: $primary-dark-3x;
  }
  &:disabled {
    opacity: 0.5;
  }
}

@media (max-width: 768px) {
  .compare-list {
    &__items {
      padding-top: 0.5rem;
      gap: 10px;
      justify-content: center;
      align-items: center;
    }

    &__button {
      font-size: 0.6rem;
      label {
        padding: 5px;
        font-size: 0.6rem;
      }
    }
  }
}

.offer-modal {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  &-header {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #1f1f1f0d;
    &-title {
      font-family: Inter;
      font-size: 20px;
      font-weight: 600;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: left;
    }
    button {
      background: transparent;
      border: none;
    }
  }
  &-content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    &-product {
      height: 35%;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;

      img {
        width: 80px !important;
        height: 80px !important;
        border: 1px solid rgba(31, 31, 31, 0.1);
      }
      &-detail {
        width: 100%;
        display: flex;
        flex-direction: column;
        &-name {
          font-family: Inter;
          font-size: 18px;
          font-weight: 600;
          line-height: 22px;
          letter-spacing: 0em;
          text-align: left;
        }
        &-description {
          width: 210px;
          font-family: Inter;
          font-size: 14px;
          font-weight: 400;
          line-height: 17px;
          letter-spacing: 0em;
          text-align: left;
        }
      }
    }
    &-actions {
      height: 65%;
      width: 100%;
      padding: 20px;
      background-color: #1f1f1f0d;
      display: flex;
      flex-direction: column;
      &-title {
        //styleName: Bold 12 px;
        display: flex;
        align-items: flex-start;
        height: 30px;
        font-family: Inter;
        font-size: 12px;
        font-weight: 700;
        line-height: 15px;
        letter-spacing: 0em;
        text-align: left;
        color: #1f1f1f80;
      }
      &-item {
        height: 100px;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        &-product-action {
          width: 132px;
          height: 56px;
          background: $bg-dark-grey-fixed;
          display: grid;
          grid-template-columns: 1fr 1fr;
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
        select {
          width: 250px;
          height: 56px;
          border: none;
          padding: 20px;

          &:hover {
            border: none;
          }
          &:focus {
            border: none;
          }
          &:focus-visible {
            outline: none;
          }
          &:active {
            border: none;
          }
          option {
            font-family: Inter;
            font-size: 16px;
            font-weight: 400;
            line-height: 19px;
            letter-spacing: 0em;
            text-align: left;
          }
        }
        &-button {
          width: 250px;
          height: 56px;
          border: none;
          border-radius: 5px;
          background: #4caf50;
          color: white;
          font-family: Inter;
          font-size: 14px;
          font-weight: 500;
          line-height: 16.94px;
          text-align: center;
        }
      }
      &-detail {
        display: flex;
        align-items: flex-start;
        font-family: Inter;
        font-size: 12px;
        font-weight: 700;
        line-height: 15px;
        letter-spacing: 0em;
        color: #1f1f1f;
        a {
          text-decoration: none;
          color: #1f1f1f;
        }
      }
    }
  }
}
</style>
