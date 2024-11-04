<template>
  <div
    v-loading="{ loading: isLoading, text: 'Yükleniyor' }"
    class="wizard-component"
  >
    <div class="wizard-component__header">
      <div
        :class="{ 'not-active': !isCompleted && !isActive }"
        class="wizard-component__header__title"
      >
        Onay
      </div>
    </div>
    <div v-if="isActive" class="wizard-component__content">
      <div class="flex col center mt-50">
        <div
          class="radius-60 flex center"
          style="background: #fa8457; height: 60px; width: 60px"
        >
          <!-- #4caf50-->
          <!-- <IconSuccess v-if="isApproval" strokeColor="#FFFFFF"></IconSuccess> -->
          <IconWaiting></IconWaiting>
        </div>
        <template>
          <div
            v-if="isApproval"
            class="font-500 h-18 mt-25"
            style="color: #fa8457"
          >
            İşleminiz Onay Bekliyor
          </div>
          <!-- <div v-else class="font-500 h-18 mt-25" style="color: #ff9800">
            İşleminiz Onay Bekliyor
          </div> -->
        </template>

        <p v-if="isShow" class="font-normal h-14 mt-10" style="color: #4caf50">
          Finans departmanı ile iletişime geçiniz.
        </p>

        <div class="flex row mt-40">
          <!-- <div>
            <span
              >Sipariş No :
              <strong>{{ getPaymentResult.order_no }}</strong></span
            >
          </div> -->
          <div>
            <span
              >Siparişi Oluşturan :
              <strong>{{ getPaymentResult.orderer }}</strong></span
            >
          </div>
        </div>
        <div class="mt-30">
          <PaymentRoad :data="{ confirmed: true }"></PaymentRoad>
        </div>
        <div class="mt-25 mb-45 flex row spaca-between">
          <p>
            Siparişlerinizi Size Özel menüsünün altından Siparişlerim
            sekmesinden görebilirsiniz
          </p>
          <!-- <span
            @click="$router.push(`/size-ozel/${getPaymentResult.document_id}`)"
            class="ml-100 clickable"
            >> <strong>Siparişimi Görüntüle</strong></span
          > -->
          <span
            @click="$router.push(`/size-ozel?active_menu=order&tab=0`)"
            class="ml-100 clickable"
            >> <strong>Siparişleri Gör</strong></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import endpoints from '@/api/endpoints'
import IconSuccess from './IconSuccess.vue'
import IconWaiting from './IconWaiting.vue'
import PaymentRoad from './PaymentRoad.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  props: {
    isApproval: { type: Boolean, default: true },
    step: { type: Number, default: null },
    isActive: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    payload: { type: Object, default: () => {} },
    isWizardLoading: { type: Boolean, default: false }
  },
  components: { IconSuccess, PaymentRoad, IconWaiting },
  watch: {
    // Dont use created cycle for initial condition.
    isActive: function(newVal, oldVal) {
      if (newVal) console.log('fetch data')
    }
  },
  computed: {
    ...mapGetters({
      getPaymentResult: 'payment/getPaymentResult',
      getPaymentType: 'payment/getPaymentType',
      getBasketDetails: 'basket/getBasketDetails'
    }),
    isShow() {
      // Açık hesap bakiyesi sıfırsa ve ödeme tipi çek ise burası görünecek
      let findOpenAccount = this.getBasketDetails.paymentOptions.find(
        p => p.paymentMethodName == 'open_account_30_day'
      )

      if (!findOpenAccount && this.getPaymentType.payment_type == 'cheque')
        return true
      return false
    },
    completedStep() {
      return this.step - 2
    }
  },
  data() {
    return {
      isLoading: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../styles/Basket/wizard-component.scss';
</style>
