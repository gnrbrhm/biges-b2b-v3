<template>
  <div class="tabcontent payment-options">
    <div class="table-row columns">
      <div class="column is-3">
        <div class="payment-title">
          <h5>Liste / Bayi Fiyatı</h5>
        </div>
      </div>
      <div class="column is-7">
        <div class="payment-detail">
          <table width="20%">
            <thead>
              <tr>
                <th>LİSTE FİYATI</th>
                <th v-if="false">BAYİ FİYATI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>
                    {{ currencySymbol[otherPayments.currency] }}
                    {{ product.display_price.end_user | numberFormatTr }}
                  </div>
                  <!-- <div v-if="product.is_discounted">
                    {{ currencySymbol[otherPayments.currency] }}
                    {{ discountedPrices.end_user | numberFormatTr }}
                  </div> -->
                </td>
                <td v-if="false">
                  <div
                    :class="
                      product.display_price.strike_through_price
                        ? 'discounted'
                        : isOutlet
                        ? 'line-through'
                        : ''
                    "
                  >
                    {{ currencySymbol[otherPayments.currency] }}
                    {{ otherPayments.reseller | numberFormatTr }}
                  </div>
                  <div v-if="product.is_discounted">
                    {{ currencySymbol[otherPayments.currency] }}
                    {{ discountedPrices.reseller | numberFormatTr }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-if="otherPayments.bank_transfer" class="table-row columns">
      <div class="column is-3">
        <div class="payment-title">
          <h5>Havale / Nakit Fiyatı</h5>
        </div>
      </div>
      <div class="column is-7">
        <div class="payment-detail">
          <table width="10%">
            <thead>
              <tr>
                <th>HAVALE / NAKİT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                    <!-- TODO Buraya gelicek strike_through_price keyi değişicek  -->
                  <div
                    v-if="product.prices.strike_through_price"
                    :class="
                      product.prices.strike_through_price ? 'discounted' : ''
                    "
                  >
                    {{ currencySymbol[otherPayments.currency] }}
                    {{ product.prices.strike_through_price | numberFormatTr }}
                  </div>
                  <div>
                    {{ currencySymbol[otherPayments.currency] }}
                    {{ product.prices.bank_transfer | numberFormatTr }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-if="otherPayments.credit_card" class="table-row columns">
      <div class="column is-3">
        <div class="payment-title">
          <h5>Kredi Kartı</h5>
        </div>
      </div>
      <div class="column is-7">
        <div class="payment-detail">
          <table width="80%">
            <thead>
              <tr>
                <!-- <th>TAKSİTLİ</th> -->
                <th>TEK ÇEKİM</th>
                <!-- <th>3 TAKSİT</th>
                <th>6 TAKSİT</th>
                <th>9 TAKSİT</th>
                <th>12 TAKSİT</th> -->
              </tr>
            </thead>
            <tbody>
              <tr>
                <!-- <td>
                  <div :class="product.is_discounted ? 'discounted' : ''">
                    {{ currencySymbol[otherPayments.currency] }}
                    {{ otherPayments.credit_card_installment | numberFormatTr }}
                  </div>
                  <div v-if="product.is_discounted">
                    {{ currencySymbol[otherPayments.currency] }}
                    {{
                      product.prices.credit_card_installment | numberFormatTr
                    }}
                  </div>
                </td> -->
                    <!-- TODO Buraya gelicek strike_through_price keyi değişicek  -->
                <td>
                  <div
                    v-if="product.prices.strike_through_price"
                    :class="product.is_discounted ? 'discounted' : ''"
                  >
                    {{ currencySymbol[otherPayments.currency] }}
                    {{ product.prices.strike_through_price | numberFormatTr }}
                  </div>
                  <div>
                    {{ currencySymbol[otherPayments.currency] }}
                    {{ product.prices.credit_card | numberFormatTr }}
                  </div>
                </td>
              </tr>
              <!-- <tr v-for="(credit, ci) in creditsList" :key="ci + '-tab-item'">
                <td><img :src="credit.iconSource" /></td>
                <td>
                  {{ currencySymbol[otherPayments.currency] }}
                  {{ otherPayments.credit_card_installment }}
                </td>
                <td>
                  {{ currencySymbol[otherPayments.currency] }}
                  {{ otherPayments.credit_card_installment }}
                </td>
                <td>
                  {{ currencySymbol[otherPayments.currency] }}
                  {{ otherPayments.credit_card_installment }}
                </td>
                <td>
                  {{ currencySymbol[otherPayments.currency] }}
                  {{ otherPayments.credit_card_installment }}
                </td>
                <td>
                  {{ currencySymbol[otherPayments.currency] }}
                  {{ otherPayments.credit_card_installment }}
                </td>
              </tr> -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-if="hasCheque" class="table-row columns">
      <div class="column is-3">
        <div class="payment-title">
          <h5>Çek</h5>
        </div>
      </div>
      <div class="column is-7">
        <div class="payment-detail">
          <table width="60%">
            <thead>
              <tr>
                <th>30 GÜN</th>
                <th>60 GÜN</th>
                <th>90 GÜN</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>
                    {{ currencySymbol[otherPayments.currency] }}
                    {{ product.prices.cheque_30 | numberFormatTr }}
                  </div>
                  <!-- <div v-if="product.is_discounted">
                    {{ currencySymbol[otherPayments.currency] }}
                    {{ product.prices[0].cheque_30 | numberFormatTr }}
                  </div> -->
                </td>
                <td>
                  <div>
                    {{ currencySymbol[otherPayments.currency] }}
                    {{ product.prices.cheque_60 | numberFormatTr }}
                  </div>
                  <!-- <div v-if="product.is_discounted">
                    {{ currencySymbol[otherPayments.currency] }}
                    {{ product.prices[0].cheque_60 | numberFormatTr }}
                  </div> -->
                </td>
                <td>
                  <div>
                    {{ currencySymbol[otherPayments.currency] }}
                    {{ product.prices.cheque_90 | numberFormatTr }}
                  </div>
                  <!-- <div v-else :class="'discounted'">
                    {{ currencySymbol[otherPayments.currency] }}
                    {{ product.prices[0].cheque_90 | numberFormatTr }}
                  </div> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { CURRENCY_SYMBOL } from '@/constants'

export default {
  name: 'TabPaymentMethod',
  props: {
    isOutlet: { type: Boolean, default: false },
    product: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => {
    return {
      currencySymbol: { ...CURRENCY_SYMBOL },
      otherPayments: {},
      discountedPrices: {},
      Prices: {},
      creditsList: [
        { iconSource: require('@/assets/bonus-card.png') },
        { iconSource: require('@/assets/vakif-bank.png') },
        { iconSource: require('@/assets/maximum.png') }
      ]
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    hasCheque() {
      return this.$auth?.user?.profile?.is_cheque
    }
  },
  watch: {
    product(val) {
      console.log('LOG::::Product', val)
    }
  },
  created() {
    console.log('LOG::: Product', this.product)
    this.getOtherPayment()
  },
  methods: {
    getOtherPayment() {
      try {
        if (!this.isAuthenticated) return
        console.log('LOG::::Other Payment', this.otherPayments)
        this.otherPayments = this.product.prices

        this.otherPayments.cheque = Object.keys(this.product.prices)
          .filter(key => key.split('_')[0] == 'cheque')
          .map(item => {
            return {
              [item]: this.product.prices[item]
            }
          })
        //   this.discountedPrices = undefined indirimli fiyat bulunmamakta
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
th {
  width: 150px;
}

.discounted {
  font-size: 0.7rem;
  text-decoration: line-through;
  opacity: 0.5;
}
</style>
