<template>
    <div class="corporate-wrapper">
      <swiper
        class="categories_wrapper"
        ref="category_swiper"
        :options="categoriesSwiperOption"
        @click-slide="handleClickCategory"
      >
        <swiper-slide
          v-for="(category, index) in categoryList"
          :key="category + index"
          class="item"
          :class="index === activeIndex ? 'active' : ''"
        >
          {{ category.name }}
        </swiper-slide>
      </swiper>
  
      <div class="corporate_title">{{ corporate.title }}</div>
  
      <img :src="image" :alt="corporate.title" />
  
      <div class="excerpt" v-html="corporate.excerpt"></div>
  
      <div class="continue">
        <nuxt-link :to="`/kurumsal/${corporate.page_url}`">
          {{ footerSymbol + ' ' + footer }}
        </nuxt-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  
  const props = defineProps({
    categoryList: { type: Array, default: () => [] },
    corporate: { type: Object, default: () => {} }
  })
  
  const activeIndex = ref(0)
  const image = ref('')
  const title = ref('')
  const footerSymbol = ref('>')
  const footer = ref(' Devamı')
  
  const categoriesSwiperOption = {
    slidesPerView: 3,
    spaceBetween: 5
  }
  
  const swiper = computed(() => {
    return categorySwiper.value?.$swiper
  })
  
  const categorySwiper = ref(null)
  
  const changeCategory = (id, name, img) => {
    image.value = img
    title.value = name
    emit('onChange', id)
  }
  
  const handleClickCategory = (index) => {
    let item = props.categoryList[index]
    changeCategory(item.id, item.name, item.top_photo)
    swiper.value.slideTo(index, 1000, false)
    activeIndex.value = index
  }
  
  onMounted(() => {
    changeCategory(
      props.categoryList?.[0]?.id,
      props.categoryList?.[0]?.name,
      props.categoryList?.[0]?.top_photo
    )
  })
  </script>
  
  <style lang="scss" scoped>
  .corporate-wrapper {
    padding: 5px 0px 5px 15px;
  
    .corporate_title {
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      color: #1f1f1f;
      padding-bottom: 10px;
    }
  
    img {
      padding-right: 15px;
      border-radius: 3px;
      object-fit: cover;
      height: 140px;
      width: 100%;
    }
  
    .excerpt {
      font-size: 13px;
      line-height: 16px;
      padding: 10px 0;
    }
  
    .continue {
      display: flex;
      justify-content: flex-end;
      padding-right: 15px;
    }
  }
  
  .categories_wrapper {
    padding: 15px 0px 20px 0px;
    display: flex;
  }
  
  .swiper-slide {
    height: 34px !important;
    width: 50px;
    background: rgba(13, 47, 129, 0.1) !important;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0d2f81;
    font-weight: bold;
    padding: 0;
    font-size: 12px;
  }
  
  .active {
    background: #0d2f81 !important;
    color: white;
  }
  </style>
  