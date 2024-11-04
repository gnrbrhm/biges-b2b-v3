<template>
  <div
    :class="
      `payment-road ${
        getLayout == 'mobile' ? 'pt-10 pb-10' : 'pt-32 pb-32 pl-5 pr-5'
      }`
    "
    :style="`min-width: ${getLayout == 'mobile' ? '' : '779px'}`"
  >
    <div :class="`flex ${getLayout == 'mobile' ? 'col' : 'row'} align-center`">
      <template>
        <img
          :src="require(`@/assets/svg/order/check-${line1.color}.svg`)"
          alt=""
        />
        <div
          :class="`text ${getLayout == 'mobile' ? '' : 'ml-15'} ${line1.color}`"
        >
          Siparişiniz Onay Bekliyor
        </div>
        <span :class="`${getLayout == 'mobile' ? '' : 'ml-40'}`">
          <Icon
            :name="`${getLayout == 'mobile' ? 'arrow-down2' : 'right-arrow2'}`"
            :pathFill="colors[line1.color]"
          ></Icon>
        </span>
      </template>
      <template>
        <img
          :class="`${getLayout == 'mobile' ? '' : 'ml-40'}`"
          :src="require(`@/assets/svg/order/shipment-open-${line2.color}.svg`)"
          alt=""
        />
        <div
          :class="`text ${getLayout == 'mobile' ? '' : 'ml-15'} ${line2.color}`"
        >
          Siparişiniz Hazırlanıyor
        </div>
        <span :class="`${getLayout == 'mobile' ? '' : 'ml-40'}`">
          <Icon
            :name="`${getLayout == 'mobile' ? 'arrow-down2' : 'right-arrow2'}`"
            :pathFill="colors[line2.color]"
          ></Icon>
        </span>
      </template>
      <template>
        <img
          :class="`${getLayout == 'mobile' ? '' : 'ml-40'}`"
          :src="require(`@/assets/svg/order/shipment-open-${line3.color}.svg`)"
          alt=""
        />
        <div
          :class="`text ${getLayout == 'mobile' ? '' : 'ml-15'} ${line3.color}`"
        >
          Siparişiniz Kargoda
        </div>
      </template>
      <template>
        <span :class="`${getLayout == 'mobile' ? '' : 'ml-40'}`">
          <Icon
            :name="`${getLayout == 'mobile' ? 'arrow-down2' : 'right-arrow2'}`"
            :pathFill="colors[line3.color]"
          ></Icon>
        </span>
        <img
          :class="`${getLayout == 'mobile' ? '' : 'ml-40'}`"
          :src="require(`@/assets/svg/order/shipment-check-${line4.color}.svg`)"
          alt=""
        />
        <div
          :class="`text ${getLayout == 'mobile' ? '' : 'ml-15'} ${line4.color}`"
        >
          Siparişiniz Teslim Edildi
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import { mapGetters } from 'vuex'

export default {
  name: 'PaymentRoad',
  components: { Icon },
  props: { data: { type: Object, default: () => {} } },
  computed: {
    ...mapGetters(['getLayout'])
  },
  data() {
    return {
      colors: {
        gray: '#acadaf',
        green: '#4caf50',
        blue: '#0D2F81'
      },
      line1: {
        color: 'gray',
        url: color => {
          return `@/assets/svg/order/check-${color}.svg`
        }
      },
      line2: {
        color: 'gray',
        url: color => {
          return `@/assets/svg/order/shipment-open-${color}.svg`
        }
      },
      line3: {
        color: 'gray',
        url: color => {
          return `@/assets/svg/order/truck-${color}.svg`
        }
      },
      line4: {
        color: 'gray',
        url: color => {
          return `@/assets/svg/order/shipment-check-${color}.svg`
        }
      }
    }
  },
  methods: {
    lineStatus() {
      if (this.data) {
        let lineData = this.data
        if (lineData.confirmed == true) {
          this.line1 = {
            color: 'green'
          }
          this.line2 = {
            color: 'blue'
          }
          if (
            lineData.info &&
            lineData.info.follow_url &&
            lineData.info.is_delivered == false
          ) {
            this.line2 = {
              color: 'green'
            }
            this.line3 = {
              color: 'blue'
            }
          } else if (lineData.info && lineData.info.is_delivered == true) {
            this.line2 = {
              color: 'green'
            }
            this.line3 = {
              color: 'green'
            }
            this.line4 = {
              color: 'green'
            }
          }
        }
      }
    }
  },
  created() {
    this.lineStatus()
  }
}
</script>

<style lang="scss" scoped>
.payment-road {
  border-top: 1px solid rgba(31, 31, 31, 0.1);
  border-bottom: 1px solid rgba(31, 31, 31, 0.1);
}
.green {
  color: #4caf50;
}
.gray {
  color: #1f1f1f;
}
.blue {
  color: #0d2f81;
}
</style>
