<template>
  <embed :src="{ data }" width="100%" height="600px" />
</template>
<script>
import Vue from 'vue'

export default {
  props: {
    data: { type: String, default: '' }
  }
}
</script>
<style></style>
