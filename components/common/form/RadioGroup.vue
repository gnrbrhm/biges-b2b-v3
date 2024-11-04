<template>
  <div class="flex col">
    <template v-for="(item, index) in list">
      <div
        class="mt-10 flex row p-5"
        :class="picked.value == item.value ? 'border' : ''"
        :key="item + '-' + index"
      >
        <input
          class="col-px-20 mt-5"
          type="radio"
          :id="item.value"
          :value="item"
          v-model="picked"
        />
        <label class="width-100" :for="item">{{ item.name }}</label>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TableRadio',
  props: {
    isChecked: { type: Boolean, default: false },
    name: { type: String, default: null },
    list: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    picked(value) {
      this.$emit('onChange', value)
    }
  },
  data() {
    return {
      picked: {}
    }
  }
}
</script>

<style>
</style>