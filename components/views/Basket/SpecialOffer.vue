<template>
  <div class="modal-overlay" @click.self="$emit('onClose')">
    <div
      class="modal-overlay__content"
      :style="{ width: width, height: height }"
    >
      <button @click="$emit('onClose')" class="btn-close">
        <img src="@/assets/svg/close.svg" />
      </button>
      <slot @onClose="$emit('onClose')" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: { type: String, default: '40%' },
    height: { type: String, default: '25%' }
  }
}
</script>

<style lang="scss" scoped>
@import '@/components/styles/Modal/modal.scss';
</style>
