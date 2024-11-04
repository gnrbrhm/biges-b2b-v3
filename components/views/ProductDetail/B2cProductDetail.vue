<template>
  <div class="content">
    <!-- Product Detail -->
    <div class="product-detail">
      <!-- Add to Favorite Modal -->
      <!-- <app-add-to-favorite ref="addToFavorite" /> -->

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
                <div class="b2c-product-desc">
                  <p>{{ product.summary }}</p>
                  <!-- <span v-if="product.custom_label" class="new-product">
                    {{ product.custom_label }}
                  </span> -->
                </div>
                <div class="product-base-feature">
                  <div
                    v-if="product.base_feature"
                    class="product-base-feature__container"
                  >
                    <span>
                      {{ product.base_feature }}
                    </span>
                  </div>
                </div>
                <div :style="getLayout == 'mobile' ? 'margin-top: 130px;' : ''">
                  <ButtonInformationDetail
                    :detail-modal-active="detailModalActive"
                    @clickDetailButton="clickDetailButton($event)"
                  />
                </div>
                <div class="outlet-info" style="display: none">
                  <p>
                    Bu ürünü <span>10$</span>'dan başlayan fiyatlar ile
                    Outlet'ten almak için <a>tıklayın.</a>
                  </p>
                </div>
                <div class="product-action-bonus">
                  <div
                    v-if="isAuthenticated"
                    class="action"
                    @click="favClick(isAddedFav)"
                  >
                    <app-icon
                      :name="!isAddedFav ? 'love-it-add' : 'love'"
                      icon-color="transparent"
                    />
                    <span class="icon-desc">{{
                      isAddedFav ? 'Favorilerimden Çıkar' : 'Favorilerime Ekle'
                    }}</span>
                  </div>
                  <div class="action" @click="clickCompare(product.stock_code)">
                    <!-- <div class="action"> -->
                    <app-icon name="compare" icon-color="transparent" />
                    <span class="icon-desc">Karşılaştır</span>
                  </div>
                  <div class="action" @click="handleDownloadPDF">
                    <app-icon name="pdf" icon-color="transparent" />
                    <span class="icon-desc">Pdf İndir</span>
                  </div>
                </div>
                <!-- Indirimli Alternatif Urun -->
                <app-alternative-product v-if="false" />
              </div>
            </div>
          </div>
        </div>
        <div class="product-detail-help-content">
          <div class="product-detail-help-content__solution">
            <div class="product-detail-help-content__solution__left"></div>
            <div class="product-detail-help-content__solution__right">
              <div class="product-detail-help-content__solution__right__title">
                Tüm Çözümlerimize Göz Atın
              </div>
              <div class="product-detail-help-content__solution__right__text">
                Dilerseniz size ulaşalım ve doğru çözümleri seçmenizde yardımcı
                olalım.
              </div>
              <nuxt-link
                to="/cozumler"
                class="product-detail-help-content__solution__right__button"
              >
                ÇÖZÜMLERİMİZ
              </nuxt-link>
            </div>
          </div>
          <div class="product-detail-help-content__call">
            <div class="product-detail-help-content__call__content">
              <div class="product-detail-help-content__call__content__title">
                Size yardımcı olmak için buradayız.
              </div>
              <div class="product-detail-help-content__call__content__text">
                Dilerseniz size ulaşıp doğru çözümleri seçmenizde yardımcı
                olalım.
              </div>
              <button
                class="product-detail-help-content__call__content__button"
                @click="detailModalActive = true"
              >
                SİZİ ARAYALIM
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Product Tabs -->
    <app-tabs :product="product" />
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

    <!-- Product Compare -->
    <CompareList />

    <B2cProductDetailPdf
      v-show="false"
      :product-id="product.stock_code"
    ></B2cProductDetailPdf>
  </div>
</template>
<script>
import Icon from '@/components/Icon.vue'
import BreadCrumbProduct from '@/components/BreadCrumbProduct.vue'
import Tabs from '~/components/tabs/index.vue'
import ProductSlider from '@/components/ProductSlider.vue'
import AlternativeProduct from '@/components/AlternativeProduct.vue'
import AddToFavorite from '@/components/AddToFavorite.vue'
import endpoints from '@/api/endpoints'
import Modal from '@/components/common/Modal.vue'
import ButtonInformationDetail from '@/components/views/ProductDetail/ButtonInformationDetail'
import B2bProductDetailItem from '@/components/views/ProductDetail/B2bProductDetailItem'
import B2cProductDetailPdf from '@/components/pdf/B2cProductDetailPdf'
import ProductTagsDetail from '@/components/ProductTagsDetail'

import { mapGetters, mapActions } from 'vuex'
import PopupView from '@/components/PopupView.vue'
import CompareList from '@/components/compareList.vue'
import { bus } from '@/plugins/main.js'

export default {
  components: {
    appPopupView: PopupView,
    appIcon: Icon,
    BreadCrumbProduct,
    appTabs: Tabs,
    appProductSlider: ProductSlider,
    appAlternativeProduct: AlternativeProduct,
    appAddToFavorite: AddToFavorite,
    ButtonInformationDetail,
    Modal,
    B2bProductDetailItem,
    B2cProductDetailPdf,
    ProductTagsDetail,
    CompareList
  },
  props: {
    photos: {
      type: Array,
      default: () => []
    },
    product: { type: Object, default: () => {} },
    similarProducts: { type: Array, default: () => [] }
  },
  data() {
    return {
      isShowQuickView: false,
      isDummyImage: false,
      isActive: false,
      isImageLoadError: false,
      quantity: 1,
      isLoading: false,
      activePhotoIndex: 0,
      isAddedFav: false,
      detailModalActive: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'getLayout']),
    ...mapGetters({
      getCompareDetailList: 'compare/getCompareDetailList'
    })
  },
  methods: {
    ...mapActions({
      removeProductFavorite: 'favorite/removeProductFavorite',
      addProduct: 'compare/addProduct',
      deleteByCode: 'compare/deleteByCode',
      generateUuid: 'compare/generateUuid'
    }),
    openQuickView() {
      this.isShowQuickView = true
    },
    async removeItem(item) {
      let result = await this.$axios({
        ...endpoints.compare.delete_by_code,
        url: endpoints.compare.delete_by_code.url('b2c', item.stock_code),
        params: { uuid: localStorage.getItem('uuid_compare') }
      })
      if (result?.status == 200) {
        this.$store.commit('compare/deleteProduct', item.stock_code)
        this.$notify({
          type: 'success',
          title: 'İşlem Başarılı!',
          text: result?.data?.message,
          duration: 5000
        })
      }
      if (this.getCompareDetailList.length < 1) {
        this.isActive = false
      }
    },
    async clickCompare(stockCode) {
      if (!localStorage.getItem('uuid_compare')) {
        let res = await this.generateUuid()
        if (res && Object.keys(res).length) {
          localStorage.setItem('uuid_compare', res.uuid)
        }
      }
      await this.addProduct({ page: 'b2c', stock_code: stockCode })
      bus.$emit('isActive', true)
    },
    clickDetailButton(val) {
      this.detailModalActive = val
    },
    openAddToFavorite() {
      this.$refs.addToFavorite.showModal = true
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
      parent.scrollTop = thumb.offsetTop - 100
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
    this.isAddedFav = this.product.has_favorite || this.product.is_favorite
  },
  head() {
    return {
      title: `${this.product.display_name || 'Ürün Detayı'} | Biges`
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/pages/styles/product-detail-b2c.scss';
.compare-list {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  justify-content: space-between;
  height: 100%;

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ddd;
  }

  &__items {
    padding-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  &__button {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    color: white;
    font-size: 1.2rem;

    label {
      padding: 20px;
      background: #0d2f81;
      border-radius: 3px;
      cursor: pointer;
    }
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
</style>
