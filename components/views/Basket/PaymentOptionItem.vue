<template>
  <div>
    <div class="payment-title-grid">
      <img
        v-if="
          paymentMethodName == payment.paymentMethodName ||
            paymentMethodName == payment.paymentDetails.paymentMethodName
        "
        :src="
          disabled
            ? require('@/assets/svg/check-primary-disabled.svg')
            : require('@/assets/svg/check-primary.svg')
        "
      />
      <div class="payment-title">
        {{ payment.paymentTypeName }}
      </div>
      <!-- <div
        v-if="payment.paymentMethodName == 'open_account_30_day'"
        class="payment-type"
      >
        30 GÜN
      </div>
      <div
        v-else-if="
          payment.paymentMethodName == 'credit_card_installment' ||
            payment.paymentMethodName == 'credit_card'
        "
        class="payment-type-button min-w-80"
        @click.stop="selectInstallment(payment)"
      >
        {{ creditCardTitle }}
      </div> -->
      <div style="display:flex;flex-direction:row;gap:5px;">
        <div
          class="payment-type-button min-w-30"
          style="width:30px !important;"
          v-for="(chequeOption, index) in payment.chequeOptions"
          :class="{
            'is-active':
              selectedCheque == chequeOption.name &&
              paymentMethodName == 'cheque'
          }"
          :key="index"
          @click.stop="handleCheque(chequeOption.name)"
        >
          {{ chequeOption.name.split('_')[1] }}
        </div>
      </div>
    </div>
    <div class="payment-total-grid" v-if="payment.paymentDetails">
      <div
        class="payment-total"
        :data-payment-no="payment.paymentDetails.paymentMethodName"
      >
        {{
          (isInstallment &&
            payment.paymentMethodName == 'credit_card_installment') ||
          payment.paymentMethodName == 'credit_card'
            ? creditCardSubTotal || payment.message
            : payment.paymentDetails.subTotal || payment.message
        }}
      </div>
      <div
        v-if="payment.paymentDetails.earningAmountDetail"
        class="payment-earning"
      >
        <span style="font-weight: 400">Kazancınız</span>
        {{
          (isInstallment &&
            payment.paymentMethodName == 'credit_card_installment') ||
          payment.paymentMethodName == 'credit_card'
            ? creditCardEarn
            : payment.paymentDetails.earningAmountDetail
        }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentOptionItem',
  props: {
    payment: { type: Object, default: () => {} },
    paymentMethodName: {
      type: String,
      default: ''
    },
    creditCardTitle: {
      type: String,
      default: 'TAKSİTLİ FİYAT'
    },
    isInstallment: { type: Boolean, default: true },
    selectedCheque: { type: String, default: '' },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      creditCardInstallment: {},
      //   creditCardTitle: 'TAKSİTLİ FİYAT',
      selected: []
    }
  },
  computed: {
    creditCardSubTotal() {
      return this.payment?.paymentDetails?.subTotal
    },
    creditCardEarn() {
      return this.payment?.paymentDetails?.earningAmountDetail
    }
  },
  methods: {
    selectInstallment() {
      this.$emit('handleInstallment', !this.isInstallment)
      //   if (this.isInstallment) {
      //     // let findItem = this.getBasketDetails?.paymentOptions.find(
      //     //   (item) => item.paymentMethodName == 'credit_card_installment'
      //     // )

      //     this.creditCardTitle = 'TAKSİTLİ FİYAT'
      //   } else {
      //     this.creditCardTitle = 'TEK ÇEKİM'
      //   }
      // let findIndex=this.basketDetails?.paymentOptions.findIndex(val=>val.paymentMethodName==item.paymentMethodName)
      // if (item.paymentMethodName=="credit_card") {

      // }
    },
    handleCheque(val) {
      this.selectedCheque = val
      this.$emit('handleCheque', val)
    }
  }
}
</script>

<style></style>
