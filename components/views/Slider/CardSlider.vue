<template>
  <div class="card-slider">
    <div ref="sliderWrapperCard" class="card-list">
      <div class="similar-card-header">
        <h3 class="title">
          <slot name="title" />
        </h3>
        <div class="controls">
          <a class="controls-icon" @click="prev()">
            <Icon name="keyboard-arrow-left" />
          </a>
          <a class="controls-icon" @click="next">
            <Icon name="keyboard-arrow-right" />
          </a>
          <a href="/kampanya" class="controls-button">TÜMÜNÜ GÖSTER</a>
        </div>
      </div>
      <div
        class="slides"
        :style="{
          width: innerWidth + 'px',
          marginLeft: '-' + slidesInnerMarginLeft + 'px'
        }"
      >
        <CampaignCard
          v-for="item in items"
          :data="item"
          :key="item.id"
        ></CampaignCard>
      </div>
    </div>
  </div>
</template>
<script>
import CampaignCard from '../Campaign/CampaignCard'
import Icon from '../../Icon.vue'

export default {
  name: 'CardSlider',
  props: {
    items: { type: Array, default: () => [] },
    itemsPerSlide: {
      type: null,
      default: 3
    },
    showAllButton: { tyoe: Boolean, default: false }
  },
  components: { CampaignCard, Icon },
  data() {
    return {
      timer: null,
      currentIndex: 0,
      innerWidth: 0,
      singleWidth: 0
    }
  },
  computed: {
    slidesInnerMarginLeft() {
      return this.currentIndex * this.singleWidth
    }
  },
  mounted() {
    let sliderWidth = this.$refs.sliderWrapperCard.clientWidth
    let singleWidth = sliderWidth / this.itemsPerSlide
    let innerWidth = singleWidth * this.items.length
    this.singleWidth = singleWidth
    this.innerWidth = innerWidth

    this.startSlide()
  },

  methods: {
    startSlide: function() {
      this.timer = setInterval(this.next, 6000)
    },
    next: function() {
      if (this.items.length <= 3) {
        return
      } else if (this.currentIndex === this.items.length - 3) {
        this.currentIndex = 0
        return
      }
      this.currentIndex++
    },
    prev: function() {
      if (this.items.length <= 3) {
        return
      } else if (this.currentIndex === 0) {
        this.currentIndex = 0
        return
      }
      this.currentIndex--
    }
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>
