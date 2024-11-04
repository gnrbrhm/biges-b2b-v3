<template>
    <div
      :class="[
        'product-slider',
        title === 'Outlet Ürünler' || title === 'İlginizi Çekebilir'
          ? 'bg-second'
          : ''
      ]"
    >
      <div class="container">
        <div class="similar-products-header">
          <h3 class="title">
            <slot name="title" />
          </h3>
        </div>
  
        <swiper
          :options="productsSwiperOptions"
          v-if="options.data.products && options.data.products.length"
        >
          <swiper-slide
            v-for="(product, index) in options.data.products"
            :key="product.stock_code + '-' + index"
          >
            <app-product-card
              :product="product"
              :id="product.stock_code"
              :product-name="product.display_name"
              :brand-name="product.brand.name"
              :brandId="product.brand.id"
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
              :price-mask="product.price_mask"
              :base-feature="product.base_feature"
              :has-price="!!(product.prices && Object.keys(product.prices).length)"
              @handleClickBrand="handleClickBrand"
              :render-buttons="product | renderButtons"
            />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import ProductCard from './ProductCard.vue'
  import Icon from '../../Icon.vue'
  import { ref } from 'vue'
  
  const props = defineProps({
    itemsPerSlide: {
      type: null,
      default: 4
    },
    hasCompare: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
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
  
  const productsSwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 15,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  }
  
  const productPhoto = (product) => product?.photos?.[0]?.photo || ''
  const retailPrice = (product) => product?.prices?.end_user || 0
  const resellerPrice = (product) => product?.prices?.bank_transfer || 0
  const productCurrency = (product) => product?.prices?.currency || ''
  const handleClickBrand = (id) => {
    console.log(id)
  }
  </script>
  
  <style scoped lang="scss">
  .bg-second {
    background: #d2ddf3;
  }
  .product-slider {
    padding: 20px 0px 20px 15px;
  }
  
  .similar-products-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      margin-bottom: 0;
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
  
      color: #1f1f1f;
    }
    .controls {
      display: flex;
      justify-content: flex-start;
      .controls-icon {
        padding: 8px 18px;
        border: 2px solid rgba(31, 31, 31, 0.05);
        margin-left: 20px;
        display: flex;
        align-items: center;
        color: $black;
        border-radius: 3px;
        cursor: pointer;
        &:hover {
          background: $primary-light;
          color: $white;
          svg {
            opacity: 1;
            path {
              stroke: white;
            }
          }
        }
        svg {
          opacity: 0.4;
        }
      }
    }
  }
  
  .swiper-slide {
    width: 93% !important;
    display: flex;
    align-items: center;
  }
  
  .swiper-pagination {
    position: unset !important;
    margin-top: 10px;
  }
  </style>
  