<template>
    <div class="bigesClub_wrapper" v-if="getBigesClubTargetList.length">
      <div id="campaign-target" class="container">
        <TargetCampaignSlider
          :items="getBigesClubTargetList"
        ></TargetCampaignSlider>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useStore } from 'vuex';
  import TargetCampaignSlider from '@/components/views/Slider/TargetCampaignSlider';
  
  const store = useStore();
  const getBigesClubTargetList = ref([]);
  
  onMounted(async () => {
    await store.dispatch('foryou/fetchBigesClubTarget');
    getBigesClubTargetList.value = store.getters['foryou/getBigesClubTargetList'];
  });
  </script>
  
  <style lang="scss" scoped>
  .bigesClub-pagination {
    position: unset !important;
    margin-top: 10px;
    text-align: center;
  }
  .bigesClub_wrapper {
    padding: 20px 25px 20px 15px;
    border-bottom: 1px solid rgba(31, 31, 31, 0.1);
  
    .chart_name {
      font-weight: bold;
      font-size: 12px;
      line-height: 15px;
      color: rgba(31, 31, 31, 0.5);
      padding-left: 30px;
      padding-bottom: 10px;
    }
  }
  </style>
  