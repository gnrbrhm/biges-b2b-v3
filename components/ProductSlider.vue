<template>
    <div class="card-slider">
      <div class="container">
        <div class="similar-card-header">
          <h3 class="title">
            <slot name="title" />
          </h3>
          <div class="controls">
            <a class="controls-icon" @click="prev">
              <app-icon name="keyboard-arrow-left" />
            </a>
            <a class="controls-icon" @click="next">
              <app-icon name="keyboard-arrow-right" />
            </a>
          </div>
        </div>
  
        <div
          v-if="options.data.products && options.data.products.length"
          ref="sliderWrapper"
          class="card-list"
        >
          <div
            class="slides"
            :style="{
              width: innerWidth + 'px',
              marginLeft: '-' + slidesInnerMarginLeft + 'px'
            }"
          >
            <app-product-card
              v-for="(product, index) in options.data.products"
              :id="product.stock_code"
              :key="product.stock_code + '-' + index"
              :product="product"
              :style="{ width: singleWidth - 6.5 + 'px' }"
              :product-name="product.display_name"
              :brand-name="product.brand.name"
              :product-description="product.summary"
              :product-image="productPhoto(product)"
              :photos="product.photos"
              :currency="productCurrency(product)"
              :retail-price="retailPrice(product)"
              :reseller-price="resellerPrice(product)"
              :custom-label="product.custom_label"
              :has-discount="product.is_discounted"
              :discount-price="product.discounted_price"
              :in-campaign="product.is_campaigned"
              :available-stock="product.available_stock"
              :is-favorite="product.is_favorite"
              :has-tags="true"
              :has-favorite="false"
              :has-action="true"
              :has-price="Object.keys(product.prices).length > 0"
              :price-mask="product.price_mask"
              :trace="trace"
              :render-buttons="product | renderButtons"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import ProductCard from './views/ProductCard/ProductCard.vue'
  import Icon from './Icon.vue'
  
  const props = defineProps({
    itemsPerSlide: {
      type: null,
      default: 4
    },
    hasCompare: {
      type: Boolean,
      default: false
    },
    trace: {
      type: Object,
      default: () => ({})
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
  
  const slidesInnerMarginLeft = computed(() => currentIndex.value * singleWidth.value)
  
  onMounted(() => {
    if (sliderWrapper.value) {
      const sliderWidth = sliderWrapper.value.clientWidth + 26
      const single = sliderWidth / props.itemsPerSlide
      const inner = single * props.options.data.products.length
      singleWidth.value = single
      innerWidth.value = inner
    }
  })
  
  const productPhoto = (product) => product?.photos?.[0]?.photo || ''
  const retailPrice = (product) => product?.prices?.end_user || 0
  const resellerPrice = (product) => product?.prices?.bank_transfer || 0
  const productCurrency = (product) => product?.prices?.currency || ''
  
  const prev = () => {
    if (props.options.data.products.length <= 4) {
      return
    } else if (currentIndex.value === 0) {
      currentIndex.value = 0
      return
    }
    currentIndex.value--
  }
  
  const next = () => {
    if (props.options.data.products.length <= 4) {
      return
    } else if (currentIndex.value === props.options.data.products.length - 4) {
      currentIndex.value = 0
      return
    }
    currentIndex.value++
  }
  </script>
  