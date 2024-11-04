<template>
  <div class="tabcontent customer-support">
    <template>
      <Tabs />
    </template>
  </div>
</template>

<script>
import Tabs from '@/components/tabs-support/index.vue'

export default {
  name: 'TabSupports',
  components: { Tabs },
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
