<template>
  <textarea
    :class="`${attrs.class} ${value == '' ? '' : ''}`"
    :type="attrs.type"
    :placeholder="attrs.placeholder"
    v-model="value"
  ></textarea>
</template>

<script>
export default {
  props: {
    attrs: {
      type: Object,
      default: () => {}
    },
    itemId: String
  },
  watch: {
    value(newVal) {
      if (newVal == '') {
        this.$emit('validate', {
          id: this.itemId,
          isValid: false
          //message: !this.$v.value.minLength ? `Name must have at least ${$v.value.$params.minLength.min} letters.` : ''
        })
      } else {
        this.$emit('validate', {
          id: this.itemId,
          isValid: true
          //message: !this.$v.value.minLength ? `Name must have at least ${$v.value.$params.minLength.min} letters.` : ''
        })
      }

      this.$emit('input', newVal)
    }
  },

  data() {
    return {
      value: ''
    }
  }
}
</script>

<style scoped>
textarea {
  min-height: 100px;
  resize: none;
}
.error {
  border: 1px solid red !important;
}
</style>
