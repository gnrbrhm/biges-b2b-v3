<template>
  <div class="tabcontent about">
    <div class="about-header-markdown">
      <h5 v-if="product.info_title">{{ product.info_title }} Hakkında</h5>
      <div
        v-if="product.info_description"
        v-html="product.info_description"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabGeneral',
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.about-header-markdown p {
  word-break: break-word !important;
}
</style>
