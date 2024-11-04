<template>
  <select
    name="category"
    v-model="selected"
    class="select"
    ref="offer_category"
  >
    <option :value="null" selected="">-- Kategori Seçiniz --</option>
  </select>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'OfferProductCategories',
  props: {
    categories: { type: Array, default: () => [] },
    value: { type: String, default: null }
  },
  data() {
    return {
      count: 0
    }
  },
  computed: {
    selected: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    async setSelectOptions(categories) {
      for await (let category of categories) {
        let opt = document.createElement('option')
        opt.setAttribute('value', category.id)
        opt.innerText = '--'.repeat(this.count) + category.name
        //    ` <option value="${category.id}" >${category.name}</option>`
        this.$refs['offer_category'].append(opt)
        if (category.children.length) {
          this.count++
          await this.setSelectOptions(category.children)
        }
      }
      this.count--
      if (this.count < 0) this.count = 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setSelectOptions(this.categories)
    })
  }
}
</script>

<style>
</style>