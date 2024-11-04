<template>
    <div id="campaign-target" class="container" v-if="getBigesClubTargetList.length">
      <div class="target_campaign_header">
        <h3 class="title">
          <div>Size Özel Hedefleriniz</div>
        </h3>
  
        <div class="controls">
          Toplam Hedefiniz: <span>{{ getBigesClubTargetList.length }}</span>
          <div v-if="getBigesClubTargetList.length > 3" class="arrow" @click="isOpen = !isOpen">
            <Icon :name="`arrow-${isOpen ? 'up' : 'down'}`" color="#1F1F1F" width="12" height="12" />
          </div>
        </div>
      </div>
  
      <div class="target_campaign_body" v-if="getBigesClubTargetList.length > 3">
        <TargetCampaignCard
          v-for="(campaign, idx) in getBigesClubTargetList.slice(0, 3)"
          :key="campaign + idx"
          :targetCampaign="campaign"
        />
        <details :open="isOpen">
          <summary></summary>
          <TargetCampaignCard
            v-for="(campaign, idx) in getBigesClubTargetList.slice(3, getBigesClubTargetList.length)"
            :key="campaign + idx"
            :targetCampaign="campaign"
          />
        </details>
      </div>
  
      <div class="target_campaign_body" v-else>
        <TargetCampaignCard
          v-for="(campaign, idx) in getBigesClubTargetList.slice()"
          :key="campaign + idx"
          :targetCampaign="campaign"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import Icon from '@/components/Icon'
  import TargetCampaignCard from '@/components/TargetCampaignCard'
  
  const store = useStore()
  const isOpen = ref(false)
  
  const getBigesClubTargetList = computed(() => store.getters['foryou/getBigesClubTargetList'])
  
  const fetchBigesClubTarget = () => {
    store.dispatch('foryou/fetchBigesClubTarget')
  }
  
  onMounted(() => {
    fetchBigesClubTarget()
  })
  </script>
  
  <style lang="scss" scoped>
  .target_campaign_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
    .controls {
      display: flex;
      align-items: center;
      color: #24ce95;
      gap: 5px;
      span {
        font-weight: 700;
        font-size: 16px;
      }
  
      .arrow {
        margin-left: 20px;
        width: 60px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid rgba(31, 31, 31, 0.1);
        border-radius: 3px;
        cursor: pointer;
      }
    }
  }
  
  .target_campaign_body {
    display: flex;
    flex-direction: column;
  
    details {
      summary {
        display: none;
      }
    }
  }
  
  .pie-text {
    position: absolute;
    margin-top: 130px;
  }
  </style>
  