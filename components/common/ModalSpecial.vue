<template>
  <div class="modal-overlay" :class="isActive ? 'active' : 'inactive'">
    <div ref="cmodal" class="modal-container">
      <div
        :style="{ width: width, height: height, 'margin-bottom': '10px' }"
        :class="
          closeButton
            ? 'modal-container__content'
            : 'modal-container__empty-content'
        "
      >
        <div v-if="closeButton" class="modal-container__content__header">
          <div class="modal-icon" @click="$emit('close')">
            <app-icon name="close-lg" />
          </div>
        </div>
        <slot></slot>
        <div v-if="submitButton" class="modal-container__content__footer">
          <button class="modal-button" @click="$emit('onSubmit')">
            GÖNDER
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue'

export default {
  name: 'Modal',
  components: { AppIcon: Icon },
  props: {
    isActive: { type: Boolean, default: false },
    submitButton: { type: Boolean, default: false },
    closeButton: { type: Boolean, default: false },
    width: { type: String, default: '660px' },
    height: { type: String, default: '588px' }
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
  z-index: 9999;
  .modal-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &__empty-content {
      overflow: auto;
      padding: 20px;
      width: 660px;
      height: 588px;
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
          cursor: pointer;
        }
      }

      &__footer {
        width: 100%;
        display: grid;
        align-items: center;

        .modal-button {
          justify-self: end;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 129px;
          height: 45px;
          border: none;
          cursor: pointer;

          background: #0d2f81;
          border-radius: 3px;
          text-align: center;
          font-weight: normal;
          font-size: 14px;
          line-height: 17px;
          color: $white;

          &:hover {
            background: $primary-dark-3x;
          }
          &:disabled {
            opacity: 0.5;
          }
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
