<template>
  <div class="product-col flex row">
    <img :src="img" alt="" />
    <div class="product-text flex align-center">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'ProductColumn',
  props: {
    text: { type: String, default: null },
    img: { type: String, default: null }
  }
}
</script>

<style lang="scss" scoped>
.product-col {
  img {
    width: 40px;
    height: 40px;
    background: #ffffff;

    border: 1px solid rgba(31, 31, 31, 0.1);
    box-sizing: border-box;
    border-radius: 2px;
  }
  .product-text {
    margin-left: 10px;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 120%;

    color: #1f1f1f;
  }
}
</style>