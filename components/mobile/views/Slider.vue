<template>
    <div class="swiper_wrapper">
      <swiper :options="imagesSwiperOption">
        <swiper-slide v-for="(image, index) in images" :key="image + index">
          <div class="image">
            <img class="image_swiper" :src="image" alt="" />
          </div>
        </swiper-slide>
      </swiper>
  
      <swiper
        class="categories_wrapper"
        ref="category_swiper"
        :options="categoriesSwiperOption"
        @click-slide="handleClickCategory"
      >
        <swiper-slide
          v-for="(category, index) in categories"
          :key="category + index"
          :class="`${index == activeIndex ? 'active' : ''} ${
            isAuthenticated ? 'catAuth' : 'cat'
          }`"
        >
          <div class="svg" v-html="base64ToSvg(category.svg_icon)"></div>
          <div class="categories_item">{{ category.title }}</div>
        </swiper-slide>
      </swiper>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { useAxios } from '@/composables/useAxios'
  
  const store = useStore()
  const { axios } = useAxios()
  
  const activeIndex = ref(0)
  const images = ref([])
  const imagesSwiperOption = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }
  const categories = ref([])
  const categoriesSwiperOption = {
    slidesPerView: 'auto',
    spaceBetween: 30,
    centeredSlides: false
  }
  const categorySwiper = ref(null)
  
  const isAuthenticated = computed(() => store.getters.isAuthenticated)
  const bannerCategory = computed(() => store.state.banner.bannerCategory)
  
  const getImages = async (catId) => {
    try {
      const res = await axios.get(`banners/?category=${catId}`)
      images.value = res.data.map((i) => i.mobile_image)
    } catch (error) {
      console.error('Error fetching images', error)
    }
  }
  
  const handleClickCategory = (index) => {
    getImages(categories.value[index].id)
    categorySwiper.value.swiper.slideTo(index, 1000, false)
    activeIndex.value = index
  }
  
  const base64ToSvg = (img) => atob(img)
  
  const getData = async (categoriesData) => {
    categories.value = categoriesData
    await getImages(categoriesData[0].id)
  }
  
  watch(bannerCategory, (val) => {
    getData(val)
  })
  
  onMounted(() => {
    if (bannerCategory.value) {
      getData(bannerCategory.value)
    }
  })
  </script>
  
  <style scoped lang="scss">
  .swiper_wrapper {
    padding: 10px 0 0 15px;
    border-bottom: 1px solid rgba(31, 31, 31, 0.1);
  }
  
  .swiper-slide {
    width: 97%;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
  
    img {
      width: 14px;
      height: 14px;
      margin-right: 5px;
    }
  }
  
  .swiper-slide.cat {
    width: 70px;
  }
  .swiper-slide.cat:nth-child(2n) {
    width: 110px;
  }
  .swiper-slide.cat:nth-child(3n) {
    width: 100px;
  }
  .swiper-slide.cat:nth-child(4n) {
    width: auto;
  }
  
  .swiper-slide.catAuth {
    width: 70px;
  }
  .swiper-slide.catAuth:nth-child(2n) {
    width: 70px;
  }
  .swiper-slide.catAuth:nth-child(3n) {
    width: 70px;
  }
  .swiper-slide.catAuth:nth-child(4n) {
    width: auto;
  }
  
  .image {
    width: 97% !important;
    height: 110px !important;
    border-radius: 3px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
    img {
      width: 99% !important;
      height: 100% !important;
      border-radius: 3px;
      object-fit: cover;
    }
  }
  
  .active {
    color: #0d2f81;
    font-weight: bold;
  }
  
  .categories_wrapper {
    padding: 15px 0px 20px 0px;
    display: flex;
  
    .svg {
      width: 14px;
      height: 14px;
      margin-right: 5px;
  
      svg {
        width: 14px !important;
        height: 14px !important;
      }
    }
  }
  
  .categories_item {
    font-size: 13px;
    line-height: 16px;
    width: 100px;
    white-space: nowrap;
  
    color: #0d2f81;
  }
  
  svg#Capa_1  {
    fill: #000 !important;
    width: 14px !important;
    height: 14px !important;
  }
  </style>
  