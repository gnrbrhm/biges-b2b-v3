<template>
    <div class="opportunity-slider">
      <div class="slider-template">
        <div class="content-left">
          <div class="custom-effect">
            <img src="@/assets/effect.png" />
          </div>
          <div class="dots-effect" />
        </div>
        <div class="content-right" />
        <div class="product-slider">
          <div class="container">
            <div class="product-slider-inner">
              <div class="slider-info">
                <div class="slider-title">
                  {{ options.data.title }}
                </div>
                <p v-if="options.data.description" class="slider-desc">
                  {{ options.data.description }}
                </p>
                <div v-if="options.data.button_link" class="slider-btn">
                  <button @click="$router.push(options.data.button_link)">
                    {{ options.data.button_text }}
                  </button>
                </div>
                <div class="slider-controls">
                  <a class="controls-icon" @click="prev">
                    <app-icon name="keyboard-arrow-left-white" />
                  </a>
                  <a class="controls-icon" @click="next">
                    <app-icon name="keyboard-arrow-right-white" />
                  </a>
                </div>
              </div>
              <div
                ref="sliderWrapper"
                class="product-list opportunity-slider-products"
              >
                <div
                  v-if="options.data.products.length"
                  class="slides"
                  :style="{
                    width: innerWidth + 'px',
                    marginLeft: '-' + slidesInnerMarginLeft + 'px'
                  }"
                >
                  <app-show-case-product-card
                    v-for="(product, index) in options.data.products"
                    :product="product"
                    :id="product.stock_code"
                    :key="product.stock_code + index"
                    :style="{ width: singleWidth + 'px' }"
                    :product-name="product.display_name"
                    :brand-name="product.brand.name"
                    :product-description="product.summary"
                    :product-image="productPhoto(product)"
                    :photos="product.photos"
                    :currency="productCurrency(product)"
                    :retail-price="retailPrice(product)"
                    :reseller-price="resellerPrice(product)"
                    :custom-label="product.custom_label || null"
                    :has-discount="product.is_discounted"
                    :in-campaign="product.is_campaigned"
                    :available-stock="product.available_stock"
                    :is-favorite="product.is_favorite"
                    :has-tags="false"
                    :has-favorite="false"
                    :has-action="true"
                    :has-price="true"
                    :has-alternative-btn="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, computed } from 'vue'
  import ShowcaseProductCard from './views/ProductCard/ShowcaseProductCard.vue'
  import Icon from './Icon.vue'
  
  const props = defineProps({
    itemsPerSlide: {
      type: null,
      default: 3
    },
    options: {
      type: Object,
      default: () => ({
        data: {
          button_link: '',
          button_text: '',
          description: '',
          products: [],
          title: ''
        }
      })
    }
  })
  
  const sliderWrapper = ref(null)
  const innerWidth = ref(0)
  const singleWidth = ref(0)
  const currentIndex = ref(0)
  const timer = ref(null)
  
  const slidesInnerMarginLeft = computed(() => currentIndex.value * singleWidth.value)
  
  const productPhoto = (product) => product?.photos?.[0]?.photo || ''
  const retailPrice = (product) => product?.prices?.end_user || 0
  const resellerPrice = (product) => product?.prices?.bank_transfer || 0
  const productCurrency = (product) => product?.prices?.currency || ''
  
  const prev = () => {
    if (currentIndex.value === 0) {
      currentIndex.value = props.options.data.products.length - 1
      return
    }
    currentIndex.value--
  }
  
  const next = () => {
    if (currentIndex.value === props.options.data.products.length - 1) {
      currentIndex.value = 0
      return
    }
    currentIndex.value++
  }
  
  const startSlide = () => {
    timer.value = setInterval(next, 3000)
  }
  
  onMounted(() => {
    let inner = 298 * props.options.data.products.length
    singleWidth.value = 298
    innerWidth.value = inner
    startSlide()
  })
  
  onUnmounted(() => {
    clearInterval(timer.value)
  })
  </script>
  
  <style lang="scss">
  @import './components/styles/OpportunitySlider/opportunity-slider.scss';
  </style>
  