<template>
  <div>
    <div class="p-4">
      <ProductTags :isProductCard="false" :product="product" />
    </div>
    <div
      @mouseover="isClose = true"
      @mouseleave="isClose = false"
      @click="$router.push('/urunler/' + product.stock_code)"
      class="flex col center th-main clickable"
    >
      <div
        v-if="isClose"
        class="flex center close-icon clickable"
        @click.stop="$emit('close', product)"
      >
        <Icon name="Close" />
      </div>
      <img
        class="img-area"
        :src="`${product.photo || require('@/assets/no-image.png')}`"
      />
      <div class="font-normal h-16 mt-20 text-center">
        {{ product.stock_code }}
      </div>
      <div class="font-normal h-14 mt-5 text-center">
        {{ product.summary }}
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/icons'
import ProductTags from '@/components/ProductTags'

export default {
  props: {
    product: { type: Object, default: () => {} }
  },
  components: { Icon, ProductTags },
  data() {
    return {
      isClose: false
    }
  }
}
</script>

<style lang="scss" scoped>
.th-main {
  position: relative;
  padding: 0 22px;
  width: 270px;
  min-height: 270px;
  height: 198px;

  .close-icon {
    background: rgba(218, 41, 28, 0.1);
    width: 30px;
    height: 30px;
    border-radius: 30px;
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .img-area {
    display: block;
    width: 85px;
    height: 85px;
    min-width: 85px;
    min-height: 85px;
  }

  .tags-c {
    top: 0;
  }
}
</style>
