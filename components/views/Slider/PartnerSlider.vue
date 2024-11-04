<template>
  <div class="card-slider">
    <div ref="sliderWrapperCard" class="card-list">
      <div
        class="slides"
        :style="{
          width: innerWidth + 'px',
          marginLeft: '-' + slidesInnerMarginLeft + 'px'
        }"
      >
        <PartnerCard
          v-for="(item, index) in items"
          :data="item"
          :key="item + '-' + index"
        ></PartnerCard>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from '@/components/Icon.vue'
import PartnerCard from '@/components/views/B2cHome/PartnerCard'

export default {
  name: 'PartnerSlider',
  props: {
    items: { type: Array, default: () => [] },
    itemsPerSlide: {
      type: null,
      default: 7
    }
  },
  components: { Icon, PartnerCard },
  data() {
    return {
      timer: null,
      currentIndex: 0,
      innerWidth: 0,
      singleWidth: 0
    }
  },
  watch: {
    items() {
      this.currentIndex = 0
    }
  },
  computed: {
    slidesInnerMarginLeft() {
      return this.currentIndex * this.singleWidth
    }
  },
  mounted() {
    let sliderWidth = this.$refs.sliderWrapperCard.clientWidth + 26
    let singleWidth = sliderWidth / this.itemsPerSlide
    let innerWidth = singleWidth * this.items.length
    this.singleWidth = singleWidth
    this.innerWidth = innerWidth

    this.startSlide()
  },

  methods: {
    startSlide: function() {
      this.timer = setInterval(this.next, 2000)
    },

    next: function() {
      if (this.currentIndex >= this.items.length - 5) {
        this.currentIndex = 0
        return
      }
      this.currentIndex++
    },
    prev: function() {
      if (this.currentIndex === 0) {
        this.currentIndex = this.items.length - 1
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

<style lang="scss" scoped>
// @import '@/assets/css/variables.scss/';

.card-slider {
  margin: 50px 0;
}

.card-list {
  overflow: hidden;
  .slides {
    display: flex;
    transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    .product-card {
      margin-top: 25px;
    }
  }
}
</style>
