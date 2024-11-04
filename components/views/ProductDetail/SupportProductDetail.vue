<template>
  <div class="content">
    <div class="product-detail --support">
      <div class="container">
        <app-bread-crumb />
        <div class="product-detail-content">
          <div class="product-detail-content-inner">
            <div class="content-left">
              <div class="product-image-slider">
                <div
                  v-if="
                    !isImageLoadError && product.photos && product.photos.length
                  "
                  class="image"
                >
                  <img
                    @error="isImageLoadError = true"
                    :src="product.photos[0].photo"
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
              </div>
            </div>
            <div class="content-right">
              <div class="product-information">
                <span> {{ product.brand ? product.brand.name : '' }}</span>
                <div class="product-model">
                  <span> {{ product.display_name }}</span>
                </div>
                <div class="b2c-product-desc">
                  <p>{{ product.summary }}</p>
                </div>
                <div class="product-base-feature">
                  <div
                    v-if="product.base_feature"
                    class="product-base-feature__container"
                  >
                    <span> {{ product.base_feature }}</span>
                  </div>
                </div>
                <div class="grid col-auto-fit">
                  <button
                    v-if="product.is_active"
                    @click.prevent="
                      $router.push(`/urunler/${product.stock_code}`)
                    "
                    class="flat-button --medium"
                  >
                    Ürün Detayına Git
                  </button>

                  <ButtonInformationDetail
                    @clickDetailButton="clickDetailButton($event)"
                  ></ButtonInformationDetail>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Product Tabs -->
    <app-tabs :product="product" />
  </div>
</template>
<script>
import BreadCrumb from '@/components/BreadCrumb.vue'
import Tabs from '@/components/tabs-support/index.vue'
import ButtonInformationDetail from '@/components/views/ProductDetail/ButtonInformationDetail'

export default {
  components: {
    appBreadCrumb: BreadCrumb,
    appTabs: Tabs,
    ButtonInformationDetail
  },
  props: {
    product: { type: Object, default: () => {} }
  },
  data() {
    return {
      isImageLoadError: false,
      isLoading: false
    }
  },
  head() {
    return {
      title: `${this.product.display_name || 'Destek'} | Biges`
    }
  },
  methods: {
    clickDetailButton(e) {
      //this.scrollMeTo('support')
      this.$router.push(`${this.$router.history.current.path}#support`)
    },
    scrollMeTo(refName) {
      var element = document.getElementById(refName).value
      var top = element.offsetTop

      window.scrollTo(0, top)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/pages/styles/product-detail.scss';
</style>
