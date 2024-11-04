<template>
  <Modal width="350px" height="265px" :isActive="isActive">
    <div class="modal-save-basket">
      <div class="modal-save-basket__icon">
        <Icon
          strokeColor="#F71E3F"
          name="alert-circle"
          icon-color="transparent"
        />
      </div>
      <div class="modal-save-basket__text">{{ title }}</div>
      <button
        @click="$emit('handleButton', true)"
        class="button is-outlined modal-save-basket__add"
      >
        EVET
      </button>
      <div
        @click.prevent="$emit('handleButton', false)"
        class="button is-outlined modal-save-basket__close_btn"
      >
        HAYIR
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/common/Modal.vue'
import Icon from '@/components/Icon'
export default {
  components: {
    Modal,
    Icon
  },
  props: {
    isActive: { type: Boolean, default: false },
    title: { type: String, default: '' }
  }
}
</script>

<style lang="scss" scoped>
.modal-save-basket {
  display: grid;
  grid-template-rows: 1.6fr 30px 1fr 1fr 1fr 35px;
  justify-content: center;
  align-items: center;
  height: 100%;
  grid-row-gap: 15px;
  padding-left: 13px;
  padding-right: 13px;
  &__icon {
    justify-self: center;
  }

  &__add {
    justify-self: center;
    font-size: 14px;
    line-height: 17px;
    background: #0d2f81;
    border-radius: 2px;
    width: 224px;
    height: 45px;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
      background: $primary-dark-3x;
    }
    &:disabled {
      opacity: 0.5;
    }
  }
  &__close_btn {
    justify-self: center;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    width: 224px;
    height: 45px;
    cursor: pointer;
    text-align: center;
  }
}
</style>