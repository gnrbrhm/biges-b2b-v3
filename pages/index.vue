<template>
    <div>
      <div class="content main-page" v-if="getLayout === 'desktop'">
        <app-carousel
          :key="bannerID"
          v-if="bannerID"
          :options="{ data: bannerItems[bannerID] }"
          @endIndex="endIndexHandle"
          @back="backHandle"
        />
        <app-discover-tabs
          v-if="bannerID"
          :activeTabId="parseInt(bannerID)"
          :options="{ data: bannerCategory }"
          @onChange="handleChangeBannerCategory"
        />
  
        <!-- START - b2b -->
        <template v-if="isAuthenticated">
          <app-opportunities />
          <BigesClubB2bHome />
          <app-campaign />
          <div v-for="showcase in showcases" :key="showcase.id + '-showcase-item'">
            <app-product-slider
              v-if="showcase.showcase_type == 'SIMPLE'"
              :options="{ data: { products: showcase.products } }"
            >
              <template #title>{{ showcase.title }}</template>
            </app-product-slider>
            <app-opportunity-slider
              v-if="showcase.showcase_type == 'COMPLEX'"
              :options="{ data: showcase }"
            />
            <app-show-case
              v-if="showcase.showcase_type == 'NORMAL'"
              :options="{ data: showcase }"
            />
          </div>
          <app-blog-content
            :isAuth="isAuthenticated"
            v-if="getArticlesHome && getArticlesHome.count > 0"
            :articles="getArticlesHome.results"
          />
        </template>
        <!-- END - b2b -->
  
        <!-- START - b2c -->
        <template v-if="!isAuthenticated">
          <div style="height: 900px">
            <app-corporate-content
              v-if="getCorporateCategories.length"
              :categoryList="getCorporateCategories"
              @onChange="changeCategory"
              :corporate="corporate"
            />
          </div>
          <app-partner-content v-if="getPartnerList && getPartnerList.length" />
          <div style="height: 2152px">
            <app-solution-content
              v-if="getSolutionsHome.length"
              :solutions="getSolutionsHome"
            />
          </div>
          <app-blog-content
            v-if="getArticlesHome && getArticlesHome.count > 0"
            :articles="getArticlesHome.results"
          />
        </template>
        <!-- END - b2c -->
      </div>
  
      <div v-else-if="getLayout === 'mobile'">
        <app-mobile-slider />
  
        <!-- START - b2c -->
        <template v-if="!isAuthenticated">
          <app-mobile-corporate
            v-if="getCorporateCategories.length"
            :categoryList="getCorporateCategories"
            @onChange="changeCategory"
            :corporate="corporate"
          />
          <app-mobile-solution
            v-if="getSolutionsHome.length"
            :solutions="getSolutionsHome"
          />
          <app-mobile-blog
            v-if="getArticlesHome && getArticlesHome.count > 0"
            :articles="getArticlesHome.results"
          />
          <app-mobile-partner v-if="getPartnerList && getPartnerList.length" />
        </template>
        <!-- END - b2c -->
  
        <!-- START - b2b -->
        <template v-if="isAuthenticated">
          <MobileBigesClubB2bHome />
          <app-mobile-opportunities />
          <div v-for="showcase in showcases" :key="showcase.id + '-showcase-item'">
            <app-mobile-product-slider
              v-if="showcase.showcase_type == 'SIMPLE'"
              :title="showcase.title"
              :options="{ data: { products: showcase.products } }"
            >
              <template #title>{{ showcase.title }}</template>
            </app-mobile-product-slider>
          </div>
          <app-campaign />
        </template>
        <!-- END - b2b -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute, useRouter } from 'vue-router'
  
  // Component imports
  import Carousel from '~/components/Carousel.vue'
  import DiscoverTabs from '~/components/DiscoverTabs.vue'
  import Opportunities from '~/components/Opportunities.vue'
  import Campaign from '~/components/Campaign.vue'
  import BigesClubB2bHome from '~/components/BigesClubB2bHome.vue'
  import ProductSlider from '~/components/ProductSlider.vue'
  import OpportunitySlider from '~/components/OpportunitySlider.vue'
  import ShowCase from '~/components/ShowCase.vue'
  import CorporateContent from '~/components/views/B2cHome/CorporateContent.vue'
  import SolutionContent from '~/components/views/B2cHome/SolutionContent.vue'
  import BlogContent from '~/components/views/B2cHome/BlogContent.vue'
  import PartnerContent from '~/components/views/B2cHome/PartnerContent.vue'
  import Slider from '../components/mobile/views/Slider.vue'
  import Corporate from '../components/mobile/views/Corporate.vue'
  import Solution from '../components/mobile/views/Solution.vue'
  import Blog from '../components/mobile/views/Blog.vue'
  import Partner from '../components/mobile/views/Partner.vue'
  import MobileOpportunities from '../components/mobile/views/Opportunities.vue'
  import MobileProductSlider from '../components/mobile/views/ProductSlider.vue'
  import MobileCampaignSlider from '../components/mobile/views/CampaignSlider.vue'
  import MobileBigesClubB2bHome from '../components/mobile/views/BigesClubB2bHome.vue'
  
  const store = useStore()
  const route = useRoute()
  const router = useRouter()
  
  // Reactive state variables
  const bannerID = ref(null)
  const corporate = ref({})
  
  // Computed properties
  const getLayout = computed(() => store.getters['getLayout'])
  const isAuthenticated = computed(() => store.getters['isAuthenticated'])
  const getCorporateCategories = computed(() => store.getters['b2c/getCorporateCategories'])
  const getSolutionsHome = computed(() => store.getters['b2c/getSolutionsHome'])
  const getArticlesHome = computed(() => store.getters['b2c/getArticlesHome'])
  const getPartnerList = computed(() => store.getters['b2c/getPartnerList'])
  const bannerCategory = computed(() => store.state.banner.bannerCategory)
  const bannerItems = computed(() => store.state.banner.bannerItems)
  const showcases = computed(() => store.state.showcase.showcases)
  
  // Methods
  const handleChangeBannerCategory = async (id) => {
    await store.dispatch('banner/getBannerItems', id)
    bannerID.value = id
  }
  
  const fetchBannerCategories = async () => {
    await store.dispatch('banner/getBannerCategories')
    bannerID.value = store.state.banner.globalBannerID
  }
  
  const fetchShowcases = async () => {
    if (!isAuthenticated.value) return
    if (showcases.value.length) return
    await store.dispatch('showcase/getShowcases')
  }
  
  const fetchCorporateCategories = async () => {
    if (isAuthenticated.value) return
    await store.dispatch('b2c/setCorporateCategories')
  }
  
  const fetchSolutionsHomePage = async () => {
    if (isAuthenticated.value) return
    await store.dispatch('b2c/setSolutionsHomePage', 'homepage')
  }
  
  const fetchArticlesHome = async () => {
    await store.dispatch('b2c/setArticlesHome')
  }
  
  const fetchPartners = async () => {
    await store.dispatch('b2c/getPartners')
  }
  
  const endIndexHandle = async (category) => {
    let currentCategoryIndex = bannerCategory.value.findIndex(val => val.id === parseInt(category?.id))
    let bannerId = 0
    if (bannerCategory.value?.[currentCategoryIndex + 1]) {
      bannerId = parseInt(bannerCategory.value?.[currentCategoryIndex + 1]?.id)
    } else {
      bannerId = parseInt(bannerCategory.value?.[0]?.id)
    }
    await handleChangeBannerCategory(bannerId)
  }
  
  const backHandle = async (category) => {
    let currentCategoryIndex = bannerCategory.value.findIndex(val => val.id === parseInt(category?.id))
    let bannerId = 0
    if (bannerCategory.value?.[currentCategoryIndex - 1]) {
      bannerId = parseInt(bannerCategory.value?.[currentCategoryIndex - 1]?.id)
    } else {
      bannerId = parseInt(bannerCategory.value?.[bannerCategory.value.length - 1]?.id)
    }
    await handleChangeBannerCategory(bannerId)
  }
  
  const changeCategory = async (id) => {
    const resp = await store.dispatch('b2c/getCategoryWithID', id)
    if (resp.data && resp.data.results) {
      corporate.value = resp.data.results[0]
    }
  }
  
  const getData = () => {
    fetchBannerCategories()
    fetchShowcases()
    fetchCorporateCategories()
    fetchSolutionsHomePage()
    fetchArticlesHome()
    fetchPartners()
  }
  
  // Lifecycle hooks
  onMounted(() => {
    if (isAuthenticated.value && route.query?.next) {
      // Logic to handle next query parameters
      const queries = route.query
      const filters = queries?.filter || ''
  
      if (Array.isArray(filters)) {
        delete queries.filter
  
        const url = new URLSearchParams(queries).toString()
        const splitUrl = url.split('next=')[1]
        const replaceUrl = splitUrl.replace(/&/, '?')
        const filterUrl = new URLSearchParams(filters.map(f => ['filter', f])).toString()
  
        router.push(`/${replaceUrl}&${filterUrl}`)
        return
      }
  
      let url = new URLSearchParams(queries).toString()
      url = url.split('next=')[1]
      url = url.replace(/&/, '?')
  
      if (url.includes('%2F')) {
        url = url.replace('%2F', '/')
      }
  
      router.push(`/${url}`)
    }
    getData()
  })
  </script>
  
  <style lang="scss">
  @import '@/components/styles/Slider/card-slider.scss';
  
  .main-page {
    .title {
      font-size: 36px;
      line-height: 44px;
      font-weight: 600;
    }
  }
  </style>
  