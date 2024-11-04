<template>
    <div v-if="getCampaigns.length > 0 && getLayout === 'desktop'" class="container">
      <CardSlider :items="getCampaigns" :showAllButton="true">
        <template #title>
          <nuxt-link :to="'/kampanya'">
            <span :style="{ color: '#363636' }">Kampanyalar</span>
          </nuxt-link>
        </template>
      </CardSlider>
    </div>
    <div v-else-if="getLayout === 'mobile'">
      <MobileCampaignSlider
        :title="'Kampanyalar'"
        :options="{ data: { campaigns: [...getCampaigns] } }"
      >
        <template #title>
          {{ 'Kampanya' }}
        </template>
      </MobileCampaignSlider>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import MobileCampaignSlider from '@/components/mobile/views/CampaignSlider'
  import CardSlider from './views/Slider/CardSlider'
  
  // Vuex Store Kullanımı
  const store = useStore()
  
  const getLayout = computed(() => store.getters['getLayout'])
  const getCampaigns = computed(() => store.getters['campaign/getCampaigns'])
  
  const fetchCampaigns = async () => {
    if (!store.getters['isAuthenticated'] && Object.keys(store.getters['campaign/getCampaigns']).length === 0) {
      await store.dispatch('campaign/setCampaigns')
    }
  }
  
  // Bileşen yüklendiğinde kampanyaları getir
  onMounted(() => {
    fetchCampaigns()
    console.log('Campaigns Loaded', getCampaigns.value)
  })
  </script>
  
  <style scoped lang="scss">
  @import './components/styles/Campaign/campaign.scss';
  </style>
  