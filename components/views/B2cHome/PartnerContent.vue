<template>
    <div class="container">
      <div class="partner-content">
        <div class="partner-content__header">
          <div
            @click="clickReference"
            class="partner-content__header__ref"
            :class="{ active: activeHeader == 0 }"
          >
            REFERANSLARIMIZ
          </div>
          <div
            @click="clickPartner"
            class="partner-content__header__partner"
            :class="{ active: activeHeader == 1 }"
          >
            MARKALARIMIZ
          </div>
        </div>
        <div
          v-if="activeHeader == 0 && getReferenceList.length"
          class="partner-content__slider"
        >
          <PartnerSlider :items="getReferenceList"></PartnerSlider>
        </div>
        <div
          v-if="activeHeader == 1 && getPartnerList.length"
          class="partner-content__slider"
        >
          <PartnerSlider :items="getPartnerList"></PartnerSlider>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import PartnerSlider from '@/components/views/Slider/PartnerSlider'
  import { useStore } from 'vuex'
  import { ref, onMounted } from 'vue'
  
  const store = useStore()
  
  const activeHeader = ref(0)
  
  const getPartnerList = computed(() => store.getters['b2c/getPartnerList'])
  const getReferenceList = computed(() => store.getters['b2c/getReferenceList'])
  
  const clickPartner = async () => {
    await store.dispatch('b2c/getPartners')
    activeHeader.value = 1
  }
  
  const clickReference = async () => {
    await store.dispatch('b2c/getReferences')
    activeHeader.value = 0
  }
  
  onMounted(() => {
    clickReference()
  })
  </script>
  
  <style lang="scss">
  @import '../../../components/styles/B2cHome/partner-content.scss';
  </style>
  