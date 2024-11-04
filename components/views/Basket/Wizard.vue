<template>
  <div class="wizard-grid">
    <div
      v-for="(wizard, key, index) in wizards"
      :key="key + index + '-wizard-item'"
      class="wizard"
      :class="{
        active: step == key,
        success: step > key,
        completed: key <= completedStep
      }"
    >
      <div class="wizard__icon">
        <div class="wizard__icon__grid">
          <component
            v-if="step <= key"
            :strokeColor="step == key ? '#ffffff' : '#1f1f1f'"
            :is="wizard.componentIcon"
          ></component>
          <icon-success-step v-if="step > key" />
        </div>
      </div>
      <div class="wizard__content">
        <component
          @setStep="changeStep($event)"
          @onChange="handleChangeData"
          @onLoading="val => (isWizardLoading = val)"
          :is="wizard.componentContent"
          :key="key + '-wiz-comp'"
          :step="parseInt(step)"
          :isActive="step == key"
          :isCompleted="step > key"
          :payload="payload"
          :isWizardLoading="isWizardLoading"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import IconAddress from './IconAddress.vue'
import IconCreditCard from './IconCreditCard.vue'
import IconSuccess from './IconSuccess.vue'
import IconSuccessStep from './IconSuccessStep.vue'
import Address from './Address.vue'
import Payment from './Payment.vue'
import PaymentSuccess from './PaymentSuccess.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    IconAddress,
    IconCreditCard,
    IconSuccess,
    IconSuccessStep,
    Address,
    Payment,
    PaymentSuccess
  },
  props: {
    useBigesClubPoint: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    paymentStatus(value) {
      if (value.status == 'success') {
        this.step = 3
      }
    },
    step(value) {
      if (value == 2) {
        this.showBuyButton(true)
        return
      }
      this.showBuyButton(false)
    }
  },
  computed: {
    ...mapState('payment', ['paymentStatus']),
    completedStep() {
      return this.step - 2
    }
  },
  data() {
    return {
      payload: {
        use_club_points: this.useBigesClubPoint
      },
      step: 1,
      isWizardLoading: false,
      wizards: {
        1: {
          key: 'address',
          componentIcon: IconAddress,
          componentContent: Address
        },
        2: {
          key: 'payment',
          componentIcon: IconCreditCard,
          componentContent: Payment
        },
        3: {
          key: 'approve',
          componentIcon: IconSuccess,
          componentContent: PaymentSuccess
        }
      }
    }
  },
  methods: {
    ...mapActions({
      setPaymentType: 'payment/setPaymentType',
      showBuyButton: 'payment/showBuyButton'
    }),
    changeStep(value) {
      this.step = value
    },
    handleChangeData(data) {
      this.payload = {
        ...this.payload,
        use_club_points: this.useBigesClubPoint,
        ...data
      }

      console.log('this.payload', this.payload)
      this.setPaymentType({ ...this.payload })
    }
  },
  created() {
    let { payment } = this.$route.query
    if (payment == 'success') {
      this.step = 3
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../styles/Basket/wizard.scss';
</style>
