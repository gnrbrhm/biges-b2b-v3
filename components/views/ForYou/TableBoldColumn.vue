<template>
  <div class="col-container">
    <div class="col-container__text">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableBoldColumn',
  props: {
    text: { type: String, default: null }
  }
}
</script>

<style lang="scss" scoped>
.col-container {
  width: auto;
  height: 1rem;
  font-size: 13px;
  font-weight: bold;
  display: flex;
  align-items: center;
  &__text {
    position: absolute;
    // white-space: nowrap;
  }
}
</style>