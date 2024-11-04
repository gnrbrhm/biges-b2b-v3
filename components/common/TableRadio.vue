<template>
  <input type="radio" :checked="isChecked" />
</template>

<script>
export default {
  name: 'TableRadio',
  props: { isChecked: { type: Boolean, default: false } }
}
</script>

<style></style>
