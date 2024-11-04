<template>
  <div
    @click.stop="$router.push(`/urunler/outlet/${data.outlet_id}`)"
    class="flex row card-main space-between mt-1"
  >
    <div class="flex row align-center">
      <div
        class="card-img ml-20"
        :style="`background-image:url(${imgUrl});min-width:${imgWidth};height:${imgHeight}`"
      ></div>
      <div class="flex col ml-10">
        <div class="h-16 font-600">{{ title }}</div>
        <div class="h-14 font-normal mt-5">
          {{ summaryText }}
        </div>
      </div>
    </div>
    <div class="flex row align-center">
      <div class="flex col">
        <div class="h-12 font-bold">SİZE ÖZEL</div>
        <div class="h-18 font-600 mt-3">
          {{ currencySymbol[data.currency] }}
          {{ data.remittance }}
        </div>
      </div>
      <div class="ml-25 flex center mr-20">
        <div v-if="data.on_basket" class="blue-button disabled">SEPETE AT</div>
        <div v-else @click.stop="$emit('onSubmit', data)" class="blue-button">
          SEPETE AT
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CURRENCY_SYMBOL } from '@/constants'

export default {
  props: {
    imgWidth: { type: String, default: '50px' },
    imgHeight: { type: String, default: '50px' },
    imgUrl: { type: String, default: null },
    title: { type: String, default: null },
    summary: { type: String, default: null },
    data: { type: Object, default: () => {} },
    product: { type: Object, default: () => {} }
  },
  data() {
    return {
      currencySymbol: { ...CURRENCY_SYMBOL }
    }
  },
  computed: {
    summaryText() {
      return this.summary.slice(0, 40)
    }
  }
}
</script>

<style lang="scss" scoped>
.blue-button {
  height: 40px;
  padding: 11px 20px;
}
.card-main {
  height: 90px;
  background: #ffffff;
  cursor: pointer;
}
.card-img {
  display: block;
  position: relative;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

@media (max-width: 768px) {
  .blue-button {
    padding: 0;
    font-size: 0.8rem;
    width: 100%;
  }

  .card-main {
    height: auto;
    padding: 10px;
  }
}

.disabled {
  opacity: 0.5;
}
</style>
