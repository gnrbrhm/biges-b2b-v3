<template>
  <div class="p-10">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title flex space-between">
          <span>{{ item.campaign_name }}</span>
          <nuxt-link :to="`/kampanya/${item.page_url}`"
            >Detaylar için tıklayınız.</nuxt-link
          >
        </p>
      </header>
      <div class="card-content">
        <div class="columns">
          <div class="column is-narrow">
            <img
              v-if="item.campaign_goal_image"
              :src="item.campaign_goal_image"
              width="170"
              height="95"
            />
            <img v-else src="@/assets/no-image.png" width="170" height="95" />
          </div>
          <div class="column has-text-weight-medium">
            <div class="text-vertical word-wrap">
              <p>{{ item.excerpt }}</p>
            </div>
          </div>
        </div>
      </div>
      <footer class="card-footer font-500">
        <div class="flex col pl-20">
          <div class="flex align-center mt-20">
            <span class="pr-10"><Icon name="TargetCenter"></Icon></span>
            HEDEFİNİZ: {{ target }}
            {{ currencySymbol[item.campaign_currency] }}
          </div>
          <div class="flex align-center mt-10">
            <span class="pr-10"><Icon name="Calendar"></Icon></span>
            TARİH: {{ item.from_date }} - {{ item.to_date }}
          </div>
        </div>
        <div class="chart-area">
          <PieChart
            :currency="currencySymbol[item.campaign_currency]"
            :pieData="{
              series: [parseInt(calcTarget), parseInt(item.calc_subtotal)],
              labels: ['KALAN', 'GERÇEKLEŞEN']
            }"
          ></PieChart>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import PieChart from '@/components/common/PieChart'
import Icon from '@/components/icons'
import { CURRENCY_SYMBOL } from '@/constants'
import { mapGetters } from 'vuex'
import { mixinNumberFormatTr } from '@/utils'

export default {
  components: { PieChart, Icon },
  props: {
    item: { type: Object, default: () => {} }
  },
  data() {
    return {
      currencySymbol: { ...CURRENCY_SYMBOL }
    }
  },
  computed: {
    ...mapGetters(['getLayout']),
    target() {
      return mixinNumberFormatTr(this.item.sub_total).split(',')[0]
      return this.item.sub_total - this.item.calc_subtotal
    },
    targetCalc() {
      let subTotal = this.item?.sub_total?.toString().replace('.', '')
      let calcTarget = this.item?.calc_subtotal?.toString().replace('.', '')
      let calculate = parseFloat(subTotal) - parseFloat(calcTarget)
      return parseInt(calculate) || 0
    },
    calcTarget() {
      let calcTarget = this.item.sub_total - this.item.calc_subtotal
      return calcTarget < 0 ? 0 : calcTarget
      // let calcTarget = this.item?.calc_subtotal?.toString().replace('.', '')
      // return parseInt(calcTarget) || 0
    }
  },
  filters: {
    filterDecimal(value) {
      if (parseFloat(value)) {
        let replaced = value?.toString()?.replace('.', ',')
        return (
          replaced?.toString()?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') ||
          replaced
        )
      } else {
        return value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-content {
  max-height: 136px;
  padding: 20px;
  img {
    max-width: 170px;
    max-height: 95px;
    border-radius: 5px;
  }

  .text-vertical {
    height: 95px;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }
}

.card-footer {
  font-size: 0.75rem;
  line-height: 0.9rem;
  color: #1f1f1f;

  height: 109px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;

  background: rgba(31, 31, 31, 0.05);
  border-radius: 3px;
}
.word-wrap {
  max-width: 24.5rem;
  line-height: 1.3rem;
  word-wrap: break-word;
}

@media only screen and (max-width: 768px) {
  .card-content {
    max-height: 200px;
    padding: 20px;
    img {
      max-width: 170px;
      max-height: 95px;
      border-radius: 5px;
    }

    .text-vertical {
      height: 50px;
      justify-content: center;
      display: flex;
      flex-direction: column;
    }
  }

  .card-footer {
    margin-top: 20px;
    font-size: 0.75rem;
    line-height: 0.9rem;
    color: #1f1f1f;

    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;

    background: rgba(31, 31, 31, 0.05);
    border-radius: 3px;
  }

  .chart-area {
    margin-top: 20px;
  }

  .word-wrap {
    max-width: 24.5rem;
    line-height: 1.3rem;
    word-wrap: break-word;
  }
}
</style>
