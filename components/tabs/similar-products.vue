<template>
  <div class="tabcontent">
    <div v-if="similarProducts.length" class="similar-products">
      <div class="container">
        <ProductSlider
          :options="{ data: { products: similarProducts } }"
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
  name: 'TabSimilarProducts',
  components: { ProductSlider },
  props: {
    similarProducts: {
      type: Array,
      default: () => []
    }
  }
}
</script>
