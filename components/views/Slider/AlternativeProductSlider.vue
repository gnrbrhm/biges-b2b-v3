<template>
  <div class="card-slider-alternative">
    <div ref="sliderWrapperCard2" class="card-list">
      <div class="similar-card-header">
        <div class="controls">
          <a class="controls-icon" @click="prev">
            <Icon name="keyboard-arrow-left" />
          </a>
          <a class="controls-icon" @click="next">
            <Icon name="keyboard-arrow-right" />
          </a>
        </div>
      </div>
      <div
        :class="
          getLayout == 'desktop'
            ? 'slides-alternative'
            : 'slides-alternative-mobile'
        "
        :style="
          getLayout == 'desktop'
            ? {
                width: innerWidth + 'px',
                marginLeft: '-' + slidesInnerMarginLeft + 'px'
              }
            : {}
        "
      >
        <div
          :style="'min-width:' + singleWidth * 2 + 'px'"
          v-for="(product, index) in items"
          :key="product + '-' + index"
          :class="
            getLayout == 'desktop'
              ? 'alternative-content'
              : 'alternative-content-mobile'
          "
          @click="$router.push(`/urunler/${product.stock_code}`)"
        >
          <div class="alternative-product-info">
            <div class="alternative-product-image">
              <img :src="product.photo" />
            </div>
            <div class="alternative-product-text">
              <div class="alternative-product-name">
                {{ product.stock_code }}
              </div>
              <div class="alternative-product-desc">
                {{ product.summary }}
              </div>
            </div>
          </div>
          <div class="alternative-summary">
            <p v-if="hasAlternative" class="summary">
              %{{ product.discount_rate }} EK ALTERNATİF ÜRÜN İNDİRİMİ
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CampaignCard from '../Campaign/CampaignCard'

import Icon from '../../Icon.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'CardSlider',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    hasAlternative: { type: Boolean, default: true },
    itemsPerSlide: {
      type: Number,
      default: 1
    }
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
    ...mapGetters(['getLayout']),

    slidesInnerMarginLeft() {
      return this.currentIndex * this.singleWidth * 2
    }
  },
  methods: {
    startSlide: function () {
      this.timer = setInterval(this.next, 6000)
    },
    next: function () {
      if (this.items.length <= 1) {
        return
      } else if (this.currentIndex === this.items.length - 1) {
        this.currentIndex = 0
        return
      }
      this.currentIndex++
    },
    prev: function () {
      if (this.items.length <= 1) {
        return
      } else if (this.currentIndex === 0) {
        this.currentIndex = 0
        return
      }
      this.currentIndex--
    }
  },
  mounted() {
    let sliderWidth = this.$refs.sliderWrapperCard2.clientWidth / 2
    let singleWidth = sliderWidth // / this.itemsPerSlide
    let innerWidth = singleWidth * this.items.length

    this.singleWidth = singleWidth
    this.innerWidth = innerWidth
    this.startSlide()
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
.similar-card-header {
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  right: 0;
  top: 17px;
  margin-bottom: 0;
  .title {
    margin-bottom: 0;
  }
  .controls {
    display: flex;
    justify-content: flex-start;
    .controls-icon {
      padding: 0 10px;
      border: 2px solid rgba(31, 31, 31, 0.05);
      margin-left: 20px;
      display: flex;
      align-items: center;
      color: $black;
      border-radius: 3px;
      cursor: pointer;
      &:hover {
        background: $primary-light;
        color: $white;
        svg {
          opacity: 1;
          path {
            stroke: white;
          }
        }
      }
      svg {
        opacity: 0.4;
      }
    }
  }
}

.card-list {
  overflow: hidden;
  .slides {
    display: flex;
    flex-direction: row;
    transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    .product-card {
      margin-top: 25px;
    }
  }

  .slides-alternative {
    display: flex;
    flex-direction: row;
    transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    .product-card {
      margin-top: 25px;
    }
  }
  .slides-alternative-mobile {
    display: flex;
    flex-direction: column;
    transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    .product-card {
      margin-top: 25px;
    }
  }
}

@media (max-width: 768px) {
  .card-slider {
    margin: 0 0;
  }

  .similar-card-header {
    .title {
      font-size: 1.2rem;
    }
    .controls {
      display: none;
    }
  }

  .card-list {
    overflow: hidden;
    .slides {
      display: block;
      transition: all 0.5s ease;
      -webkit-transition: all 0.5s ease;
      -moz-transition: all 0.5s ease;
      -o-transition: all 0.5s ease;
      .product-card {
        margin-top: 25px;
      }
    }
  }
}
</style>
