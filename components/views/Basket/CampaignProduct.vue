<template>
  <tr>
    <td class="product-detail">
      <nuxt-link :to="`/urunler/${product.stock_code}`" class="product-img">
        <img :src="product.photo" alt="" />
      </nuxt-link>
      <div class="product-detail-content">
        <nuxt-link :to="`/urunler/${product.stock_code}`">{{
          product.stock_code
        }}</nuxt-link>
        <span class="description"> {{ product.summary }}</span>
      </div>
    </td>
    <td>{{ product.available_quantity }} / {{ product.on_basket }}</td>
    <td>
      <div class="retail-price">
        {{ currencySymbol[product.original_price_currency] }}
        {{ product.original_price }}
      </div>
    </td>
    <td>
      <div class="total-line">
        {{ currencySymbol[product.currency] }}
        {{ product.campaign_price }}
      </div>
    </td>
    <td class="actions quantity">
      <div class="field input-field">
        <button class="button decrement" @click="decrement(product)">
          <Icon name="minus" stroke-color="transparent" />
        </button>
        <input
          type="number"
          :max="parseInt(product.available_quantity - product.on_basket)"
          :min="1"
          :value="quantity"
          @change="handleChangeQuantityManuel($event, product)"
        />
        <button class="button increment" @click="increment(product)">
          <Icon name="plus" stroke-color="transparent" />
        </button>
      </div>
      <button
        :disabled="product.on_basket == product.available_quantity"
        @click="addToBasket(product)"
        class="btn-add-basket"
      >
        Sepete At
      </button>
    </td>
  </tr>
</template>

<script>
import { CURRENCY_SYMBOL } from '@/constants'
import Icon from '@/components/Icon.vue'

export default {
  components: {
    Icon
  },
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      currencySymbol: { ...CURRENCY_SYMBOL },
      quantity: 1
    }
  },
  methods: {
    async increment(product) {
      if (
        this.quantity < parseInt(product.available_quantity - product.on_basket)
      )
        this.quantity += 1
    },
    async decrement(product) {
      if (this.quantity > 1) this.quantity -= 1
    },
    async handleChangeQuantityManuel(event, product) {
      let quantityVal = event.target.value
      if (
        quantityVal &&
        quantityVal > 0 &&
        quantityVal <= product.available_quantity
      ) {
        this.quantity = quantityVal
      } else {
        this.quantity = product.available_quantity
      }
    },
    addToBasket(product) {
      this.$emit('addProduct', {
        campaign_stock_code: product.stock_code,
        campaign_quantity: this.quantity,
        unique_needs: product.unique_needs
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../styles/Basket/campaigns.scss';
</style>
