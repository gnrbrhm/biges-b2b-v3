<template>
  <div class="point">
    <div class="point-percentage">
      <svg class="percentage-circle" viewBox="-71, -51, 137, 111">
        <circle class="percentage-circle-center" r="46" />
        <path class="percentage-circle-active" :d="path" />
        <text alignment-baseline="middle" text-anchor="middle" class="percent">
          %{{ percentage }}
        </text>
      </svg>
    </div>
    <div class="point-info">
      <span class="point-name"
        >BIGES {{ name }} <app-icon name="info-sm" stroke-color="transparent"
      /></span>
      <span class="point-value">50.000,00</span>
      <p class="total-points-link">
        {{ desc }} <app-icon name="right-caret-sm" icon-color="transparent" />
      </p>
    </div>
  </div>
</template>

<script>
import Icon from '../../../components/Icon.vue'

export default {
  components: {
    appIcon: Icon
  },
  props: {
    percentage: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    name: {
      type: String,
      default: 'club'
    },
    desc: {
      type: String,
      default: 'Harcanabilir Toplam Puanınız'
    }
  },
  computed: {
    theta() {
      const frac = (this.percentage - this.min) / (this.max - this.min) || 0
      return frac * 2 * Math.PI
    },
    path() {
      const large = this.theta > Math.PI
      return `M0,-46 A46,46,0,${large ? 1 : 0},1,${this.endX},${this.endY}`
    },
    endX() {
      return Math.cos(this.theta - Math.PI * 0.5) * 46
    },
    endY() {
      return Math.sin(this.theta - Math.PI * 0.5) * 46
    }
  }
}
</script>

<style scoped lang="scss">
@import './components/styles/Points/point.scss';
</style>
