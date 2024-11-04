<template>
  <div class="target_campaign_card">
    <div class="target_campaign_card__title">
      <span>
        {{ targetCampaign.campaign_name }}
      </span>

      <div class="target_campaign_card__title__right">
        <span>{{ percentage }}%</span>
        <ProgressBar :percentage="percentage" :barWidth="400" />
      </div>
    </div>
    <div class="target_campaign_card__body">
      <div class="target_campaign_card__body__left">
        <img
          v-if="targetCampaign.campaign_goal_image"
          :src="targetCampaign.campaign_goal_image"
          width="170"
          height="95"
        />
        <img v-else src="@/assets/no-image.png" width="170" height="95" />
        <p>{{ trim(targetCampaign.excerpt, 50) }}</p>
      </div>
      <div class="target_campaign_card__body__right">
        <div class="target_campaign_card__body__right__box">
          <div class="target_campaign_card__body__right__box__title">
            <img src="~assets/target.png" alt="" />
            <span>Hedefiniz</span>
          </div>

          <span class="price">
            {{ target }}
            {{ currencySymbol[targetCampaign.campaign_currency] }}</span
          >
        </div>
        <div class="target_campaign_card__body__right__box">
          <div class="target_campaign_card__body__right__box__title">
            <img src="~assets/rectangle-green.png" alt="" />
            <span>Gerçekleşen</span>
          </div>

          <span class="price">
            {{ calcSubTotal }}
            {{ currencySymbol[targetCampaign.campaign_currency] }}</span
          >
        </div>

        <div class="target_campaign_card__body__right__box">
          <div class="target_campaign_card__body__right__box__title">
            <img src="~assets/rectangle-blue.png" alt="" />
            <span>Kalan</span>
          </div>

          <span class="price">
            {{ calcTarget }}
            {{ currencySymbol[targetCampaign.campaign_currency] }}</span
          >
        </div>
      </div>
    </div>
    <div class="target_campaign_card__footer">
      <div class="target_campaign_card__footer__left">
        <Icon name="Calendar"></Icon>
        {{ targetCampaign.from_date }} - {{ targetCampaign.to_date }}
      </div>

      <nuxt-link :to="`/kampanya/${targetCampaign.page_url}`"
        >Detaylar için tıklayın</nuxt-link
      >
    </div>
  </div>
</template>

<script>
import ProgressBar from './ProgressBar.vue'
import { mixinNumberFormatTr, trimString } from '@/utils'
import { CURRENCY_SYMBOL } from '@/constants'
import Icon from '@/components/icons'

export default {
  props: {
    targetCampaign: {
      required: true,
      type: Object
    }
  },
  components: {
    ProgressBar,
    Icon
  },
  data() {
    return {
      currencySymbol: { ...CURRENCY_SYMBOL }
    }
  },
  computed: {
    target() {
      return (
        mixinNumberFormatTr(this.targetCampaign.sub_total).split(',')[0] || 1
      )
    },
    calcSubTotal() {
      return mixinNumberFormatTr(this.targetCampaign.calc_subtotal).split(
        ','
      )[0]
      return mixinNumberFormatTr(this.targetCampaign.sub_total).split(',')[0]
    },
    calcTarget() {
      let calcTarget =
        this.targetCampaign.sub_total - this.targetCampaign.calc_subtotal
      calcTarget = calcTarget < 0 ? 0 : calcTarget
      return mixinNumberFormatTr(calcTarget).split(',')[0]
    },
    percentage() {
      const percentage =
        (100 * parseInt(this.targetCampaign.calc_subtotal)) /
        parseInt(this.targetCampaign.sub_total)
      return Math.floor(percentage) > 100 ? 100 : Math.floor(percentage)
      return parseInt(percentage.toFixed(0))
    }
  },
  methods: {
    trim(value, len) {
      return trimString(value, len)
    }
  }
}
</script>

<style lang="scss" scoped>
.target_campaign_card {
  height: 230px;
  width: 100%;
  background: #ffffff;
  border: 1px solid rgba(31, 31, 31, 0.1);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &__title {
    height: 50px;
    border-bottom: 1px solid rgba(31, 31, 31, 0.1);
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-weight: 500;
      color: #1f1f1f;
      font-size: 1.2rem;
    }

    &__right {
      display: flex;
      gap: 20px;
      align-items: center;
      font-size: 20px;
      font-weight: 700;
      span {
        color: #24ce95;
      }
    }
  }

  &__body {
    padding: 0 20px;
    display: grid;
    grid-template-columns: 2fr 3fr;

    &__left {
      display: flex;
      align-items: center;
      gap: 20px;
      line-height: 30px;

      img {
        width: 170px;
        height: 95px;
        border-radius: 5px;
      }

      p {
        max-width: 200px;
        font-weight: 600;
      }
    }
    &__right {
      display: grid;
      grid-template-columns: repeat(3, 200px);
      justify-content: right;
      gap: 10px;

      &__box {
        background: rgba(31, 31, 31, 0.05);
        border-radius: 3px;
        height: 95px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        padding: 0 20px;

        img {
          width: 16px;
          height: 16px;
        }

        &__title {
          display: flex;
          gap: 10px;
        }

        span.price {
          font-size: 20px;
          font-weight: 700;
          margin-left: 25px;
        }
      }
    }
  }

  &__footer {
    // height: 30px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__left {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    span {
      color: #3a73fe;
    }
  }
}
</style>
