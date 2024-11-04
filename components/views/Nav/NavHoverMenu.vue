<template>
  <details @mouseover="onToggle" :open="open">
    <summary></summary>
    <div class="nav-hover-content" id="nav-hover-content">
      <slot></slot>
    </div>
  </details>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onToggle(event) {
      if (
        event.target &&
        event.target.tagName == 'SUMMARY' &&
        event.target.getAttribute('open') != ''
      ) {
        this.$emit('onClose')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// @import './../../../assets/css/variables.scss';
@import './../../styles/Nav/nav-hover-menu.scss';
</style>
