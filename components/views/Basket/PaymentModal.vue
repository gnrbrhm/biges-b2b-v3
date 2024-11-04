<template>
  <div class="modal-overlay" :class="isActive ? 'active' : 'inactive'">
    <div ref="cmodal" class="modal-container">
      <div
        :style="{ width: width, height: height }"
        :class="'modal-container__empty-content'"
      >
        <div class="modal-container__content__header flex row-reverse p-10">
          <div @click="$emit('close')" class="modal-icon">
            <app-icon name="close-lg" />
          </div>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Modal',
  props: {
    isActive: { type: Boolean, default: false },
    width: { type: String, default: '660px' },
    height: { type: String, default: '588px' }
  },
  components: { AppIcon: Icon },
  computed: {
    ...mapGetters({
      getPaymentStatus: 'payment/getPaymentStatus'
    })
  },
  watch: {
    getPaymentStatus(value) {
      if (value.status == 'failure') {
        console.log('VALUEEE:::', value)
        this.$notify({
          type: 'error',
          title:
            value?.errorMessage || 'Ödeme yapılırken bir hata meydana geldi.',
          text: 'Lütfen tekrar deneyin',
          duration: 10000
        })
      }
      this.$emit('close')
      this.isActive = false
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '@/assets/css/variables.scss/';
.modal-overlay {
  position: fixed;
  display: block;
  overflow: auto;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(31, 31, 31, 0.6);
  z-index: 999;
  .modal-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &__empty-content {
      border-radius: 5px;
      border: 1px solid #001b6d;
      background: #ffffff;
    }
    &__content {
      padding: 20px;
      width: 660px;
      height: 588px;
      background: #ffffff;
      display: grid;
      grid-template-rows: 20px 1fr 100px;

      &__header {
        justify-self: end;
        align-self: center;

        .modal-icon {
          width: 30px;
          text-align: right;
        }
      }
    }
  }
}
.active {
  display: block;
}
.inactive {
  display: none;
}
</style>
