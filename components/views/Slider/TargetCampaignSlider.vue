<template>
  <div class="card-slider">
    <div ref="sliderWrapperCard2" class="card-list">
      <div class="similar-card-header">
        <h3 class="title">
          <div>2022 Hedefleriniz</div>
        </h3>
        <div class="controls">
          <a class="controls-icon" @click="prev()">
            <Icon name="keyboard-arrow-left" />
          </a>
          <a class="controls-icon" @click="next">
            <Icon name="keyboard-arrow-right" />
          </a>
        </div>
      </div>
      <div
        class="slides"
        :style="
          getLayout == 'desktop'
            ? {
                minWidth: innerWidth + 'px',
                marginLeft: '-' + slidesInnerMarginLeft + 'px'
              }
            : {}
        "
      >
        <!-- <CampaignCard
          v-for="item in items"
          :data="item"
          :key="item.id"
        ></CampaignCard> -->
        <TargetCampaignCard
          :style="'min-width:' + singleWidth + 'px'"
          v-for="(item, index) in items"
          :key="item + '-' + index"
          :item="item"
          :layout="getLayout"
        ></TargetCampaignCard>
      </div>
    </div>
  </div>
</template>
<script>
import CampaignCard from '../Campaign/CampaignCard'
import TargetCampaignCard from '@/components/views/ForYou/TargetCampaignCard'

import Icon from '../../Icon.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'CardSlider',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    itemsPerSlide: {
      type: Number,
      default: 2
    }
  },
  components: { CampaignCard, Icon, TargetCampaignCard },
  data() {
    return {
      timer: null,
      currentIndex: 0,
      innerWidth: 0,
      singleWidth: 0
    }
  },
  computed: {
    ...mapGetters(['getLayout']),

    slidesInnerMarginLeft() {
      return this.currentIndex * this.singleWidth
    }
  },
  methods: {
    startSlide: function() {
      this.timer = setInterval(this.next, 10000)
    },
    next: function() {
      if (this.items.length <= 2) {
        return
      } else if (this.currentIndex === this.items.length - 2) {
        this.currentIndex = 0
        return
      }
      this.currentIndex++
    },
    prev: function() {
      if (this.items.length <= 2) {
        return
      } else if (this.currentIndex === 0) {
        this.currentIndex = 0
        return
      }
      this.currentIndex--
    }
  },
  mounted() {
    let sliderWidth = this.$refs.sliderWrapperCard2.clientWidth
    let singleWidth = sliderWidth / this.itemsPerSlide
    let innerWidth = singleWidth * this.items.length

    this.singleWidth = singleWidth
    this.innerWidth = innerWidth
    //this.startSlide()
  }
  // destroyed() {
  //   clearInterval(this.timer)
  // }
}
</script>

<style lang="scss" scoped>
@import './components/styles/Slider/card-slider.scss';
</style>
