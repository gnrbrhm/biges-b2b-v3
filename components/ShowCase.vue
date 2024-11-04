<template>
    <div class="container">
      <div class="showcase">
        <div class="columns showcase-inner">
          <div class="column is-3 showcase-left">
            <div class="custom-effect">
              <img src="@/assets/effect.png" />
            </div>
            <div class="showcase-info">
              <div class="showcase-title">
                {{ options.data.title }}
              </div>
              <div class="showcase-desc">
                <p>
                  {{ options.data.description }}
                </p>
              </div>
              <div class="showcase-action">
                <app-icon
                  name="right-caret"
                  icon-color="transparent"
                  stroke-color="#fff"
                />
                <router-link :to="options.data.button_link || ''">
                  {{ options.data.button_text }}
                </router-link>
              </div>
            </div>
          </div>
          <div class="column is-9 showcase-right">
            <div class="showcase-products">
              <app-product-card
                v-for="product in options.data.products"
                :id="product.stock_code"
                :classSuffix="'--small'"
                :key="product.stock_code"
                :product="product"
                :product-name="product.display_name"
                :brand-name="product.brand.name"
                :product-description="product.summary"
                :product-image="product.photos[0].photo"
                :photos="product.photos"
                :currency="'₺'"
                :retail-price="product.prices.end_user"
                :reseller-price="product.prices.bank_transfer"
                :custom-label="product.custom_label"
                :has-discount="product.is_discounted"
                :in-campaign="product.is_campaigned"
                :available-stock="product.available_stock"
                :is-favorite="product.is_favorite"
                :has-tags="false"
                :has-favorite="product.is_favorite || false"
                :has-action="false"
                :has-price="Object.keys(product.prices).length > 0"
                :has-alternative-btn="true"
                :render-buttons="product | renderButtons"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import Icon from './Icon.vue'
  import ProductCard from './views/ProductCard/ProductCard.vue'
  
  const props = defineProps({
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
  
  const store = useStore()
  
  const products = computed(() => store.state.products)
  const product = computed(() => store.state.products.currentProduct)
  const isLoading = computed(() => store.state.products.loading)
  </script>
  
  <style lang="scss">
  @import './components/styles/ShowCase/show-case.scss';
  </style>
  