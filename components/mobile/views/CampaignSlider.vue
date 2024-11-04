<template>
    <div
      :class="
        `product-slider ${
          title === 'Outlet Ürünler' || title === 'İlginizi Çekebilir'
            ? 'bg-second'
            : ''
        }`
      "
    >
      <div class="container">
        <div class="similar-products-header">
          <h3 class="title">
            <slot name="title" />
          </h3>
        </div>
  
        <swiper
          :options="productsSwiperOptions"
          v-if="options.data.campaigns && options.data.campaigns.length"
        >
          <swiper-slide
            v-for="(item, index) in options.data.campaigns"
            :key="item.id + '-' + index"
          >
            <app-campaign-card :data="item" :key="item.id" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import CampaignCard from '@/components/views/Campaign/CampaignCard.vue';
  
  const props = defineProps({
    itemsPerSlide: {
      type: null,
      default: 4,
    },
    hasCompare: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({
        data: {
          button_link: '',
          button_text: '',
          description: '',
          campaigns: [],
          title: '',
        },
      }),
    },
  });
  
  const productsSwiperOptions = computed(() => ({
    slidesPerView: 'auto',
    spaceBetween: 15,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  }));
  
  const productPhoto = (product) => product?.photos?.[0]?.photo || '';
  const retailPrice = (product) => product?.prices?.end_user || 0;
  const resellerPrice = (product) => product?.prices?.bank_transfer || 0;
  const productCurrency = (product) => product?.prices?.currency || '';
  const handleClickBrand = (id) => {
    console.log(id);
  };
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
        color: #000;
        border-radius: 3px;
        cursor: pointer;
        &:hover {
          background: #f3f3f3;
          color: #fff;
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
  