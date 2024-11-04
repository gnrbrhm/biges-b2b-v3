<template>
  <div class="flex row center">
    <button
      @click="$emit('handleEvent', 'select')"
      class="button is-success is-small"
    >
      Seç
    </button>
    <button @click="$emit('handleEvent', 'edit')" class="button is-small ml-20">
      Düzenle
    </button>
  </div>
</template>

<script>
export default {
  name: 'CustomerTableButtonGroup'
}
</script>

<style>
</style>