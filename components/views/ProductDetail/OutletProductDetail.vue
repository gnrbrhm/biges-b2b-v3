<template>
  <div class="content">
    <!-- Product Detail -->
    <div class="product-detail">
      <!-- Add to Favorite Modal -->
      <app-add-to-favorite ref="addToFavorite" />

      <app-popup-view
        v-if="isShowQuickView"
        @onClose="isShowQuickView = false"
        @onChangeFavorite="onChangedFavorite"
        v-bind="$props"
        :product="$props.product"
        :photos="[...photos]"
        :customLabel="customLabel"
        :render-buttons="$props.product | renderButtons"
      />

      <div class="container">
        <app-bread-crumb />
        <div class="product-detail-content">
          <div class="product-detail-content-inner">
            <div class="content-left">
              <div class="product-image-slider">
                <div
                  class="image"
                  v-if="
                    !isImageLoadError && product.photos && product.photos.length
                  "
                  @click.prevent="openQuickView"
                >
                  <img
                    @error="isImageLoadError = true"
                    :src="product.photos[activePhotoIndex].photo"
                  />
                </div>

                <div
                  v-if="
                    !product.photos ||
                      !product.photos.length ||
                      isImageLoadError
                  "
                  class="image --dummy"
                  :data-text="
                    !isImageLoadError ? 'Fotoğraf Yok' : 'Fotoğraf Yüklenemedi'
                  "
                ></div>

                <div class="slider-thumbnails">
                  <div @click="step(-1)" class="slider-control prev">
                    <app-icon name="keyboard-arrow-left" icon-color="#ccc" />
                  </div>
                  <div
                    v-if="product.photos && product.photos.length"
                    class="thumbnails"
                  >
                    <span
                      :id="'thumb-item-' + i"
                      @click="
                        activePhotoIndex = i
                        snapThumb()
                      "
                      v-for="(item, i) in product.photos"
                      :key="i + '-details-photo'"
                      class="thumb"
                      :class="{ 'is-active': activePhotoIndex == i }"
                      ><img :src="item.photo"
                    /></span>
                  </div>
                  <div @click="step(1)" class="slider-control next">
                    <app-icon name="keyboard-arrow-right" icon-color="#ccc" />
                  </div>
                </div>
              </div>
            </div>
            <div class="content-right">
              <div class="product-information">
                <!-- <div class="product-tags">
                  <div
                    v-tooltip="'stok'"
                    v-if="product.is_alternative"
                    class="product-tag"
                  >
                    <app-icon name="shipment" stroke-color="transparent" />
                  </div>
                  <div
                    v-tooltip="'eko'"
                    v-if="product.is_eco"
                    class="product-tag"
                  >
                    <app-icon name="downloads" stroke-color="transparent" />
                  </div>
                  <div
                    v-tooltip="'indirim'"
                    v-if="product.is_discounted && !product.is_alternative"
                    class="product-tag"
                  >
                    <app-icon name="discount" stroke-color="transparent" />
                  </div>
                  <div
                    v-tooltip="'kampanya'"
                    v-if="product.is_campaigned"
                    class="product-tag campaign-tag"
                  >
                    <app-icon name="advertisement" />
                  </div>
                  <div
                    v-tooltip="'outlet'"
                    v-if="product.is_outlet"
                    class="product-tag"
                  >
                    <app-icon name="warehouse" stroke-color="transparent" />
                  </div>
                </div> -->
                <ProductTags :isProductCard="false" :product="product" />
                <span> {{ product.brand ? product.brand.name : '' }}</span>
                <div class="product-model">
                  <span> {{ product.display_name }}</span>
                </div>
                <div class="product-desc-outlet">
                  <p>{{ product.summary }}</p>
                </div>
                <div class="flex row outlet-status">
                  <div class="outlet-status__title">
                    <app-icon
                      strokeColor="none"
                      name="info"
                      icon-color="#FF9800"
                      class="mr-5"
                    />
                    Durum :
                  </div>
                  <span class="ml-5">
                    {{ outletInfo.description }}
                  </span>
                </div>
                <div class="product-price" v-if="outletInfo">
                  <div class="price price-list">
                    <p class="price-list-title">BAYİ FİYATI</p>
                    <p class="price-value line-through">
                      {{ currencySymbol[outletInfo.currency] }}
                      {{ outletInfo.reseller | numberFormatTr }}
                    </p>
                  </div>
                  <div class="price price-special">
                    <p class="price-list-title">Outlet Fiyat</p>
                    <p class="price-value">
                      {{ currencySymbol[outletInfo.currency] }}
                      {{ outletInfo.remittance | numberFormatTr }}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    :disabled="outletInfo.on_basket"
                    class="blue-button p-20 outlet-detail-button"
                    @click="addToBasket()"
                  >
                    SEPETE AT
                  </button>
                </div>
                <!-- Outlet Opsiyonları -->
                <div class="mt-20">
                  <div class="mb-20 h-16 font-500">
                    Bu Ürünün Diğer Outlet Opsiyonları ({{
                      otherOutlets.length
                    }})
                  </div>
                  <div
                    class="flex col outlet-others"
                    style="gap:13px;padding:  5px ;"
                  >
                    <OutletOptionCard
                      v-for="(item, index) in otherOutlets"
                      :key="item + '-' + index"
                      :data="item"
                      @onSubmit="addToBasket($event)"
                      :imgUrl="
                        product.photos && product.photos.length
                          ? product.photos[0].photo
                          : null
                      "
                      :title="item.display_name"
                      :summary="product.summary"
                      :product="product"
                    ></OutletOptionCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Product Tabs -->
    <app-tabs
      :product="product"
      :relatedProducts="relatedProducts"
      :isOutlet="true"
    />
    <!-- Similar Products -->
    <div v-if="similarProducts.length" class="similar-products">
      <div class="container">
        <app-product-slider
          :options="{ data: { products: similarProducts } }"
          :has-compare="true"
        >
          <template #title> Benzer Ürünler </template>
        </app-product-slider>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from '@/components/Icon.vue'
import OutletOptionCard from '@/components/cards/OutletOptionCard'
import BreadCrumb from '@/components/BreadCrumb.vue'
import Tabs from '~/components/tabs/index.vue'
import ProductSlider from '@/components/ProductSlider.vue'
import AddToFavorite from '@/components/AddToFavorite.vue'
import endpoints from '@/api/endpoints'
import ButtonInformationDetail from '@/components/views/ProductDetail/ButtonInformationDetail'
import ProductTags from '@/components/ProductTags'
import { CURRENCY_SYMBOL } from '@/constants'
import PopupView from '@/components/PopupView.vue'

export default {
  head() {
    return {
      title: `${this.product.display_name || 'Ürün Detayı'} | Biges`
    }
  },
  components: {
    appPopupView: PopupView,
    OutletOptionCard,
    appIcon: Icon,
    appBreadCrumb: BreadCrumb,
    appTabs: Tabs,
    appProductSlider: ProductSlider,
    appAddToFavorite: AddToFavorite,
    appButtonInformationDetail: ButtonInformationDetail,
    ProductTags
  },
  props: {
    photos: {
      type: Array,
      default: () => []
    },
    product: { type: Object, default: () => {} },
    similarProducts: { type: Array, default: () => [] },
    relatedProducts: { type: Array, default: () => [] }
  },
  data() {
    return {
      isShowQuickView: false,
      isDummyImage: false,
      currencySymbol: { ...CURRENCY_SYMBOL },
      selectedVariant: '',
      isImageLoadError: false,
      quantity: 1,
      isLoading: false,
      activePhotoIndex: 0
    }
  },
  computed: {
    outletInfo() {
      try {
        return this.product.outlet_info
      } catch (error) {
        console.log(error)
        return {}
      }
    },
    otherOutlets() {
      try {
        return this.product?.other_outlets
      } catch (error) {
        console.log(error)
        return []
      }
    }
  },
  methods: {
    async addToBasket(item) {
      //   if (this.product.available_stock == 0) return
      this.isLoading = true
      let stockCode = item ? item?.stock_code : this.product?.stock_code
      let outletNo = item
        ? item?.outlet_id
        : this.product?.outlet_info?.outlet_id
      let result = await this.$store.dispatch('basket/addBasket', {
        params: {
          outlet_no: outletNo
        },
        stock_code: stockCode,
        quantity: 1
      })
      if (result) {
        this.$notify({
          type: 'success',
          text: outletNo + ' sepete eklendi.',
          duration: 5000
        })
        this.$emit('refresh')
      }
      this.isLoading = false
      this.quantity = 1
    },
    openQuickView() {
      this.isShowQuickView = true
    },
    openAddToFavorite() {
      this.$refs.addToFavorite.showModal = true
    },
    handleClickPDF() {
      this.$axios({
        methods: 'GET',
        url: this.product.product_pdf.split('/api/v1/').reverse()[0]
      })
    },
    step(value) {
      let max = this.product.photos.length - 1
      let min = 0

      if (this.product.photos[this.activePhotoIndex + value]) {
        this.activePhotoIndex += value
      } else {
        if (value < 0) this.activePhotoIndex = max
        if (value > 0) this.activePhotoIndex = 0
      }

      this.snapThumb()
    },
    snapThumb() {
      let thumb = document.getElementById('thumb-item-' + this.activePhotoIndex)
      let parent = thumb.parentNode
      parent.scrollLeft = thumb.offsetLeft - 100
    }
  },
  mounted() {
    if (window) {
      this.$nextTick(() => {
        window.scrollTo(0, 0)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/pages/styles/product-detail.scss';
</style>
