<template>
  <div class="tabcontent">
    <div v-if="relatedProducts.length" class="similar-products">
      <div class="container">
        <ProductSlider
          :options="{ data: { products: relatedProducts } }"
          :has-compare="true"
        >
        </ProductSlider>
      </div>
    </div>
  </div>
</template>

<script>
import ProductSlider from '@/components/ProductSlider.vue'

export default {
  name: 'TabRelatedProducts',
  components: { ProductSlider },
  props: {
    relatedProducts: {
      type: Array,
      default: () => []
    }
  }
}
</script>
