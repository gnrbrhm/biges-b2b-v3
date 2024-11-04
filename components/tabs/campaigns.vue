<template>
  <div class="tabcontent">
    <div v-for="(item, index) in campaigns" :key="item + '-' + index">
      <div class="campaign-card-product">
        <TabCampaign :data="item"></TabCampaign>
      </div>
      <div v-if="campaigns.length - 1 != index" class="divider"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TabCampaign from '@/components/views/ProductTab/TabCampaign.vue'

export default {
  name: 'TabCampaigns',
  components: {
    TabCampaign
  },
  props: {
    campaigns: {
      type: Array,
      default: () => []
    }
  }
  // watch: {
  //   getProductCampaigns(val) {
  //     this.$emit('handleCampaigns', val)
  //   }
  // },
  // computed: {
  //   ...mapGetters({
  //     getProductCampaigns: 'campaign/getProductCampaigns'
  //   })
  // }
}
</script>
