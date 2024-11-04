<template>
  <div class="content">
    <!-- Product Detail -->
    <div class="product-detail">
      <!-- Add to Favorite Modal -->
      <AddToFavorite
        v-if="isFavoriteModal"
        ref="addToFavorite"
        :product-code="product.stock_code"
        :is-active="isFavoriteModal"
        @onClose="isFavoriteModal = false"
        @onChanged="onChangedFavorite"
      />

      <app-popup-view
        v-if="isShowQuickView"
        v-bind="$props"
        :product="$props.product"
        :photos="[...photos]"
        :custom-label="customLabel"
        :render-buttons="$props.product | renderButtons"
        @onClose="isShowQuickView = false"
        @onChangeFavorite="onChangedFavorite"
      />
      <div class="container">
        <BreadCrumbProduct :data="product" />

        <div class="product-detail-content">
          <div class="product-detail-content-inner">
            <div class="content-left">
              <div class="product-image-slider">
                <div
                  v-if="
                    !isImageLoadError && product.photos && product.photos.length
                  "
                  class="image"
                  @click.prevent="openQuickView"
                >
                  <img
                    :src="product.photos[activePhotoIndex].photo"
                    @error="isImageLoadError = true"
                  />
                </div>
                <div
                  v-if="
                    !product.photos ||
                      !product.photos.length ||
                      isImageLoadError
                  "
                  class="image --dummy"
                >
                  <img src="@/assets/no-image.png" />
                </div>

                <div class="slider-thumbnails">
                  <div class="slider-control prev" @click="step(-1)">
                    <app-icon name="keyboard-arrow-left" icon-color="#ccc" />
                  </div>
                  <div
                    v-if="product.photos && product.photos.length"
                    class="thumbnails"
                  >
                    <span
                      v-for="(item, i) in product.photos"
                      :id="'thumb-item-' + i"
                      :key="i + '-details-photo'"
                      class="thumb"
                      :class="{ 'is-active': activePhotoIndex == i }"
                      @click="
                        activePhotoIndex = i
                        snapThumb()
                      "
                      ><img :src="item.photo"
                    /></span>
                  </div>
                  <div class="slider-control next" @click="step(1)">
                    <app-icon name="keyboard-arrow-right" icon-color="#ccc" />
                  </div>
                </div>
              </div>
            </div>
            <div class="content-right">
              <div class="product-information">
                <ProductTagsDetail
                  :is-product-card="false"
                  :product="product"
                />
                <span> {{ product.brand ? product.brand.name : '' }}</span>
                <div class="product-model">
                  <span> {{ product.display_name }}</span>
                </div>
                <div
                  class="product-desc"
                  :class="
                    showListPrice || showResellerPrice ? 'border-bottom' : ''
                  "
                >
                  <p>{{ product.summary }}</p>
                  <span v-if="product.custom_label" class="new-product">
                    {{
                      product.custom_label ||
                        'Projeleriniz için fiyat isteyiniz'
                    }}
                  </span>
                </div>
                <div
                  v-if="product.outlets && product.outlets.length"
                  class="other-outlet"
                  @click="handleOutlet"
                >
                  <p class="font-normal ">
                    Bu ürünü
                    <span
                      style="width: auto;height: 21px;border-radius: 3px; padding:2px 5px; margin:0 3px; color:#4CAF50; font-family: Inter;
                      background-color:#FFFFFF;font-size: 14px;font-weight: 700; line-height: 16.94px;"
                      >{{ outlerProduct.remittance
                      }}{{ currencySymbol[outlerProduct.currency] }}</span
                    >
                    dan başlayan fiyatlar ile Outlet bölümünden almak için
                    tıklayınız
                  </p>
                </div>
                <div
                  v-if="
                    !product.price_mask && Object.keys(product.prices).length
                  "
                  class="product-price"
                >
                  <div
                    v-if="showListPrice && showCondition.isList"
                    class="price price-list"
                  >
                    <p class="price-list-title">LİSTE FİYATI</p>
                    <p
                      v-if="
                        product.prices && Object.keys(product.prices).length
                      "
                      class="price-value"
                    >
                      {{ currencySymbol[product.prices.currency] }}
                      {{ product.display_price.end_user | numberFormatTr }}
                    </p>
                  </div>
                  <div
                    v-if="
                      showResellerPrice &&
                        !product.is_discounted &&
                        showCondition.isReseller &&
                        product.display_price.strike_through_price == null
                    "
                    class="price price-special"
                  >
                    <p class="price-list-title">
                      {{ product.display_price.name.toUpperCase() }}
                    </p>
                    <p
                      v-if="
                        product.prices && Object.keys(product.prices).length
                      "
                      class="price-value"
                    >
                      <template v-if="specialPrice">
                        {{ specialPrice.currency }}
                        {{ product.display_price.price | numberFormatTr }}
                      </template>
                      <template v-else>-</template>
                    </p>
                  </div>
                  <div
                    v-if="product.display_price.strike_through_price != null"
                    class="price price-discount"
                  >
                    <div class="discount">
                      <!-- <div class="left">
                        %{{
                          Math.floor(product.discounted_price.rate * 10) / 10
                        }}
                      </div> -->
                      <div class="right">İNDİRİMLİ FİYAT</div>
                    </div>
                    <div class="prices">
                      <template
                        v-if="
                          product.display_price.strike_through_price != null
                        "
                      >
                        <p>
                          {{ specialPrice.currency }}
                          {{
                            product.display_price.strike_through_price
                              | numberFormatTr
                          }}
                        </p>
                        <p>
                          {{ currencySymbol[product.prices.currency]
                          }}{{ product.display_price.price | numberFormatTr }}
                        </p>
                      </template>
                      <template v-else>-</template>
                    </div>
                  </div>
                </div>
                <div v-if="product.variants.length" class="mb-10">
                  <div class="select">
                    <select v-model="selectedVariant">
                      <option :value="null">Lütfen varyant seçin</option>
                      <option
                        v-for="(item, index) in product.variants"
                        :key="item + '-' + index"
                        :value="item.code"
                      >
                        {{ item.name }} ({{ item.available_stock }} adet)
                      </option>
                    </select>
                  </div>
                </div>
                <div
                  v-if="showListPrice || showResellerPrice"
                  v-show="
                    !product.price_mask && Object.keys(product.prices).length
                  "
                  class="other-payments"
                  @click="otherPayments"
                >
                  <app-icon
                    name="accounting-bills"
                    stroke-color="rgba(13, 47, 129, 0.7)"
                    icon-color="transparent"
                  />
                  <p class="font-normal">Taksit ve Diğer Ödeme Seçenekleri</p>
                </div>
                <div
                  v-if="
                    renderButtons == 'stock-info' ||
                      renderButtons == 'add-basket'
                  "
                  class="product-action"
                >
                  <div class="input-field">
                    <button
                      :disabled="isLoading || product.available_stock == 0"
                      class="button decrement"
                      @click="decrement()"
                    >
                      <app-icon name="minus" stroke-color="transparent" />
                    </button>
                    <input
                      v-model="quantity"
                      :disabled="isLoading || product.available_stock == 0"
                      type="number"
                    />
                    <button
                      :disabled="isLoading || product.available_stock == 0"
                      class="button increment"
                      @click="increment()"
                    >
                      <app-icon name="plus" stroke-color="transparent" />
                    </button>
                  </div>
                  <div class="button-field">
                    <button
                      :style="{ width: '180px' }"
                      :disabled="isLoading"
                      class="add-basket-button has-text-weight-semibold"
                      @click="
                        renderButtons == 'stock-info'
                          ? askStock()
                          : addToBasket()
                      "
                    >
                      {{
                        renderButtons == 'stock-info'
                          ? 'STOK BİLGİSİ ALIN'
                          : 'SEPETE AT'
                      }}
                    </button>
                  </div>
                  <div
                    v-if="product.is_special_offer"
                    class="field button-field-green"
                  >
                    <button
                      :style="{
                        background: '#4CAF50',
                        width: '180px',
                        color: '#FFFFFF',
                        border: 'none'
                      }"
                      :disabled="isLoading"
                      class="add-basket-button has-text-weight-semibold"
                      @click="handleOfferClick"
                    >
                      {{
                        availableStock ? 'ÖZEL FİYAT İSTE' : 'ÖZEL FİYAT İSTE'
                      }}
                    </button>
                  </div>
                </div>
                <div
                  v-if="renderButtons == 'price-info'"
                  class="product-action"
                >
                  <div
                    class="ask-price-button"
                    @click="infoModal.isActive = true"
                  >
                    FİYAT BİLGİSİ ALIN
                  </div>
                </div>
                <div class="product-action-bonus">
                  <div class="action" @click="favClick(isAddedFav)">
                    <app-icon
                      :name="!isAddedFav ? 'love-it-add' : 'love'"
                      icon-color="transparent"
                      :stroke-color="!isAddedFav ? '' : 'none'"
                    />
                    <span class="icon-desc">{{
                      isAddedFav ? 'Favorilerimden Çıkar' : 'Favorilerime Ekle'
                    }}</span>
                  </div>
                  <div class="action" @click="clickCompare(product.stock_code)">
                    <app-icon name="compare" icon-color="transparent" />
                    <span class="icon-desc">Karşılaştır</span>
                  </div>
                  <div class="action" @click="handleDownloadPDF">
                    <app-icon name="pdf" icon-color="transparent" />
                    <span class="icon-desc">Pdf İndir</span>
                  </div>
                </div>
                <div class="product-information-bonus">
                  <div
                    v-if="!product.price_mask && showCondition.isStock"
                    class="information"
                  >
                    <app-icon name="packages-2" icon-color="transparent" />
                    <span class="icon-desc">Stok Durumu</span>
                    <span class="score stock-score">{{
                      product.available_stock != 0
                        ? product.available_stock
                        : 0 | filterStock
                    }}</span>
                  </div>

                  <div
                    v-if="product.stock_info && product.stock_info.status != 0"
                    class="information"
                  >
                    <Icons
                      v-if="product.stock_info.status == 1"
                      name="ManufactureDetail"
                      :options="{ fill: '#0d2f81' }"
                    />

                    <Icons
                      v-if="product.stock_info.status == 2"
                      name="CargoDetail"
                      :options="{ fill: '#transparent' }"
                    />
                    <span
                      v-if="product.stock_info.status == 1"
                      class="icon-desc"
                      >Üretimde</span
                    >
                    <span
                      v-else-if="product.stock_info.status == 2"
                      class="icon-desc_2"
                    >
                      Tahmini Stok Girişi:

                      <span class="icon-desc_date">
                        {{ product.stock_info.arrival_date }}
                      </span>
                    </span>
                  </div>
                </div>
                <!-- Indirimli Alternatif Urun -->
                <template
                  v-if="product.has_alternative || product.is_alternative"
                >
                  <app-alternative-product
                    v-if="
                      product.has_alternative_product ||
                        product.is_alternative_product
                    "
                    :has-alternative="
                      product.has_alternative_product ? true : false
                    "
                    :alternative-products="
                      product.has_alternative_product ||
                        product.is_alternative_product
                    "
                  />
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Product Compare -->
    <CompareList />
    <!-- Product Tabs -->
    <app-tabs
      :product="product"
      :related-products="relatedProducts"
      :similar-products="similarProducts"
      :selected-tab="selectedTab"
      @handleCurrentTab="value => (selectedTab = value)"
    />
    <!-- Get Stock Information Modal -->

    <Modal
      :width="getLayout == 'mobile' ? '80%' : '400px'"
      :height="getLayout == 'mobile' ? '55%' : '200px'"
      :is-active="infoModal.isActive"
      @close="infoModal.isActive = false"
    >
      <div class="getInfoModal">
        <div class="getInfoModal_title">
          {{ product.stock_code }} ürünü için
          {{ infoModal.isStock ? 'stok' : 'fiyat' }} bilgisi istiyorum.
        </div>

        <div class="getInfoModal_form">
          <Button text="GÖNDER" @onSubmit="sendInfoMail" />
          <Button text="VAZGEÇ" @onSubmit="infoModal.isActive = false" />
        </div>
      </div>
    </Modal>

    <!-- Special Offer Modal -->

    <Modal
      :width="'750px'"
      :height="'395px'"
      :is-active="offerModalActive"
      @close="offerModalActive = false"
    >
      <div class="offer-modal">
        <div class="offer-modal-header">
          <div class="offer-modal-header-title">Özel Fiyat İste</div>
          <button class="btn-close" @click="offerModalActive = false">
            <img src="@/assets/svg/close.svg" />
          </button>
        </div>
        <div class="offer-modal-content">
          <div class="offer-modal-content-product">
            <img
              :src="product.photos[0].photo"
              width="80px"
              height="80px"
              alt=""
            />
            <div class="offer-modal-content-product-detail">
              <div
                class="offer-modal-content-product-detail-name"
                style="display: flex; align-items: center; gap: 0.5vw"
              >
                {{ product.stock_code }}
              </div>
              <span class="offer-modal-content-product-detail-description">
                {{ product.summary }}</span
              >
            </div>
          </div>
          <div class="offer-modal-content-actions">
            <div class="offer-modal-content-actions-title">
              ÖZEL FİYAT İSTEDİĞİNİZ ADEDİ GİRİN
            </div>
            <div class="offer-modal-content-actions-item">
              <div class="offer-modal-content-actions-item-product-action">
                <div class="field input-field">
                  <button
                    class="button decrement"
                    @click="
                      if (offerQuantityStep > 0) {
                        offerQuantityStep--
                        offerQuantity = offerQuantityArray[offerQuantityStep]
                      }
                    "
                  >
                    <app-icon name="minus" stroke-color="transparent" />
                  </button>
                  <input
                    v-model="offerQuantity"
                    type="number"
                    :min="offerQuantityArray[0]"
                    @input="handleManualQuantity"
                  />
                  <button
                    class="button increment"
                    @click="
                      () => {
                        if (offerQuantityArray.length - 1 > offerQuantityStep) {
                          offerQuantityStep++
                          offerQuantity = offerQuantityArray[offerQuantityStep]
                        }
                      }
                    "
                  >
                    <app-icon name="plus" stroke-color="transparent" />
                  </button>
                </div>
              </div>
              <select
                id="cars"
                name="cars"
                @change="e => handleChangeSelect(e)"
              >
                <option
                  v-for="(item, index) in offerPaymentTypes"
                  :key="item.payment_type"
                  :value="item.payment_type"
                  >{{ offerPaymentTypesEnum[item.payment_type] }}</option
                >
              </select>
              <button
                class="offer-modal-content-actions-item-button"
                style="color:#FFFFFF;border:none"
                @click="handleClickSpecialOffer"
              >
                {{ 'ÖZEL FİYAT İSTE' }}
              </button>
            </div>
            <div v-if="false" class="offer-modal-content-actions-detail">
              <a :href="`/urunler/${id}`">
                <app-icon name="right" />
                Ürün Detayına Git
              </a>
            </div>
          </div>
        </div>
      </div>
    </Modal>
    <B2cProductDetailPdf
      v-show="false"
      :product-id="product.stock_code"
    ></B2cProductDetailPdf>
  </div>
</template>
<script>
import Icon from '@/components/Icon.vue'
import Icons from '@/components/icons'
import BreadCrumbProduct from '@/components/BreadCrumbProduct.vue'
import Tabs from '@/components/tabs/index.vue'
import ProductSlider from '@/components/ProductSlider.vue'
import AlternativeProduct from '@/components/AlternativeProduct.vue'
import AddToFavorite from '@/components/AddToFavorite.vue'
import ButtonInformationDetail from '@/components/views/ProductDetail/ButtonInformationDetail'
import Modal from '@/components/common/Modal.vue'
import B2bProductDetailItem from '@/components/views/ProductDetail/B2bProductDetailItem.vue'
import B2cProductDetailPdf from '@/components/pdf/B2cProductDetailPdf'
import ProductTagsDetail from '@/components/ProductTagsDetail'
import Button from '@/components/common/Button'
import endpoints from '@/api/endpoints'

import { mapGetters, mapActions } from 'vuex'
import { CURRENCY_SYMBOL } from '@/constants'
import PopupView from '@/components/PopupView.vue'
import CompareList from '@/components/compareList.vue'
import { bus } from '@/plugins/main.js'

export default {
  components: {
    appPopupView: PopupView,
    Modal,
    ProductTagsDetail,
    appIcon: Icon,
    BreadCrumbProduct,
    appTabs: Tabs,
    appProductSlider: ProductSlider,
    appAlternativeProduct: AlternativeProduct,
    AddToFavorite,
    appButtonInformationDetail: ButtonInformationDetail,
    B2bProductDetailItem,
    B2cProductDetailPdf,
    Button,
    Icons,
    CompareList
  },

  filters: {
    filterStock(val) {
      let value = ''
      if (val >= 100) {
        value = '100+'
      } else if (val >= 50) {
        value = '50+'
      } else if (val >= 20) {
        value = '20+'
      } else if (val >= 10) {
        value = '10+'
      } else {
        value = val
      }
      return value
    }
  },
  props: {
    product: { type: Object, default: () => {} },
    similarProducts: { type: Array, default: () => [] },
    relatedProducts: { type: Array, default: () => [] },
    photos: {
      type: Array,
      default: () => []
    },
    renderButtons: {
      type: String,
      default: 'stock-info'
    }
  },

  data() {
    return {
      isShowQuickView: false,
      isDummyImage: false,
      isActive: false,
      selectedTab: 0,
      isFavoriteModal: false,
      currencySymbol: { ...CURRENCY_SYMBOL },
      selectedVariant: null,
      isImageLoadError: false,
      quantity: 1,
      isLoading: false,
      activePhotoIndex: 0,
      isAddedFav: false,
      isFlyToBasket: false,
      showResellerPrice: true,
      showListPrice: true,
      breadCrumbTextArray: [],
      infoModal: {
        isActive: false,
        isStock: false
      },
      // Offer Value
      offerPaymentTypesEnum: {
        bank_transfer: 'Havale',
        credit_card: 'Kredi Kartı',
        cheque: 'Çek'
      },
      offerPaymentTypes: [],
      offerQuantity: this.product.special_offer_info,
      offerQuantityStep: 0,
      offerQuantityArray: [],
      offerModalActive: false,
      offerPaymentMethod: 'credit_card'
      // Offer Value Emd
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'getLayout']),
    ...mapGetters({
      getCompareDetailList: 'compare/getCompareDetailList'
    }),
    showCondition() {
      return {
        isList: this.loggedInUser?.filters?.show_list_price,
        isReseller: this.loggedInUser?.filters?.show_reseller_price,
        isStock: this.loggedInUser?.filters?.show_stock
      }
    },
    outlerProduct() {
      let filterProduct = this.product?.outlets?.filter(val => !val.on_basket)
      let minValue = 0
      let minItem = {}
      filterProduct?.forEach(val => {
        let priceVal = parseFloat(val.remittance)
        if (minValue == 0 || minValue >= priceVal) {
          minValue = priceVal
          minItem = val
        }
      })
      return minItem
    },
    specialPrice() {
      try {
        if (this.selectedVariant) {
          let findItem = this.product.variants.find(
            item => item.code == this.selectedVariant
          )
          return {
            currency: this.currencySymbol[findItem.prices.currency],
            bank_transfer: findItem.prices.bank_transfer
          }
        } else {
          return {
            currency: this.currencySymbol[this.product.prices.currency],
            bank_transfer: this.product.prices.bank_transfer
          }
        }
      } catch (error) {
        console.log(error)
        return null
      }
    }
  },
  watch: {
    product(val) {
      console.log('LOG::::Product', val)
    }
  },
  methods: {
    openQuickView() {
      this.isShowQuickView = true
    },
    ...mapActions({
      removeProductFavorite: 'favorite/removeProductFavorite',
      addProduct: 'compare/addProduct',
      deleteByCode: 'compare/deleteByCode',
      deleteAll: 'compare/deleteAll'
    }),
    askStock() {
      this.infoModal.isStock = true
      this.infoModal.isActive = true
    },

    handleQuantityOffer() {
      if (this.product?.special_offer_info) {
        this.offerPaymentTypes = this.product.special_offer_info.map(item => {
          return {
            payment_type: item.payment_type
          }
        })
        this.offerQuantityArray = this.product.special_offer_info.find(
          i => i.payment_type === this.offerPaymentMethod
        ).quantity_values

        this.offerQuantity = this.offerQuantityArray[this.offerQuantityStep]
        // this.offerQuantityStep = parseInt(
        //   this.product.special_offer_info.find(
        //     i => i.payment_type === this.offerPaymentMethod
        //   ).quantity_values[0]
        // )
      }
    },
    handleChangeSelect(e) {
      console.log('Select', e.target.value)

      this.offerPaymentMethod = e.target.value
      this.handleQuantityOffer()
    },

    handleOfferClick() {
      console.log('Merhaba Dünya')
      this.offerModalActive = true
    },

    handleManualQuantity(e) {
      console.log('Manual offer Input', e)
    },

    async handleClickSpecialOffer() {
      if (parseInt(this.offerQuantity) < parseInt(this.offerQuantityArray[0]))
        this.$notify({
          type: 'warn',
          title: `Uyarı!`,
          text: `Lütfen minimum ${this.offerQuantityArray[0]} adet giriniz !`,
          duration: 2000
        })
      else
        try {
          let payload = {
            stock_code: this.product.stock_code,
            quantity: this.offerQuantity,
            payment_type: this.offerPaymentMethod
          }
          const req = {
            method: 'POST',
            url: '/special-offer/',
            data: payload
          }
          console.log('Merhaba Dünya-2', req)

          let response = await this.$axios({
            ...req
          })
          if (response.status === 201) {
            this.offerModalActive = false
            this.$notify({
              type: 'success',
              title: `İşlem Başarılı!`,
              text: ` ${response?.data?.message}`,
              duration: 2000
            })
          }
          console.log('Response', response.status)
        } catch (e) {
          console.log(e)
        }
    },
    async sendInfoMail() {
      try {
        const url = `/products/${
          this.infoModal.isStock ? 'stock_information' : 'price_information'
        }/${this.product.stock_code}`
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
    handleClickPDF() {
      var element = document.getElementById('pdfContent')
      var opt = {
        filename: 'document.pdf',
        image: { type: 'png', quality: 0.85 },
        margin: 0,
        html2canvas: {
          scale: 0.98,
          useCORS: true
        },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
      }
      html2pdf()
        .from(element)
        .set(opt)
        .toPdf()
        .get('pdf')
        .then(function(pdf) {
          window.open(pdf.output('bloburl'), '_blank')
        })
    },
    async handleDownloadPDF() {
      this.$axios({
        ...endpoints.product.product_pdf,
        url: endpoints.product.product_pdf.url(this.product.stock_code)
      }).then(r => {
        console.log('Response', r)
        if (r.status == 200) {
          const url = window.URL.createObjectURL(new Blob([r.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `${this.product.stock_code}.pdf`)
          // link.setAttribute('download', 'file.xlsx')
          document.body.appendChild(link)
          link.click()
          window.URL.revokeObjectURL(url)
        }
      })
    },
    handleOutlet() {
      this.$router.push(`/urunler/outlet/${this.outlerProduct.outlet_id}`)
    },
    async clickCompare(stockCode) {
      await this.addProduct({ page: 'b2b', stock_code: stockCode })
      bus.$emit('isActive', true)
    },
    breadCrumb(value) {
      let categories = this.product?.categories?.[
        this.product?.categories?.length - 1
      ]
      this.breadCrumbTextArray.length = 0
      this.getBreadCrumb(categories)
      this.breadCrumbTextArray.reverse()
    },
    getBreadCrumb(value) {
      this.breadCrumbTextArray = [...this.breadCrumbTextArray, value?.name]
      if (value?.parent) {
        this.getBreadCrumb(value.parent)
      }
    },
    otherPayments() {
      this.selectedTab = 7
      if (window) {
        this.$nextTick(() => {
          window.scrollTo(0, 500)
        })
      }
    },
    onChangedFavorite(data) {
      let { value } = data
      this.isAddedFav = value
    },
    increment() {
      this.quantity++
    },
    decrement() {
      if (this.quantity > 1) this.quantity--
    },
    favClick(i) {
      i ? this.clickFavoriteIcon() : this.openAddToFavorite()
    },
    async clickFavoriteIcon() {
      try {
        await this.removeProductFavorite(this.product.stock_code)
        this.isAddedFav = false
      } catch (error) {
        console.log(error)
      }
    },
    async addToBasket() {
      try {
        if (this.product.variants.length) {
          if (!this.selectedVariant) {
            this.$notify({
              type: 'warn',
              title: 'Uyarı!',
              text: 'Lütfen varyant seçiniz',
              duration: 5000
            })
            return
          }
        }
        if (this.product.available_stock == 0) return
        this.isLoading = true
        let params = {
          stock_code: this.product.stock_code,
          quantity: this.quantity,
          variant_code: this.selectedVariant
        }
        if (!this.selectedVariant) {
          delete params.variant_code
        }
        await this.$store.dispatch('basket/addBasket', params).then(resp => {
          if (resp) {
            this.$notify({
              type: 'success',
              title: 'İşlem Başarılı!',
              text: this.product.stock_code + ' sepete eklendi.',
              duration: 5000
            })
            this.quantity = 1
          }
        })
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false
    },
    openAddToFavorite() {
      this.isFavoriteModal = true
      // this.$refs.addToFavorite.showModal = true
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
  },
  created() {
    this.handleQuantityOffer()
    this.isAddedFav = this.product.has_favorite || this.product.is_favorite

    this.showResellerPrice = this.loggedInUser?.filters?.show_reseller_price
    this.showListPrice = this.loggedInUser?.filters?.show_list_price

    this.breadCrumb()
  },
  head() {
    return {
      title: `${this.product.display_name || 'Ürün Detayı'} | Biges`
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/pages/styles/product-detail.scss';

.ask-price-button {
  padding: 10px 20px;
  background: $primary;
  color: $white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background: $primary-dark-3x;
  }
  &:disabled {
    opacity: 0.5;
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
