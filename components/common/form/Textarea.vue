<template>
  <div
    class="input-grid"
    :data-error="
      errors.includes('text_area') || isError >= 0 ? errorMessage : null
    "
  >
    <textarea
      v-model="form.text_area"
      class="textarea"
      @input="handleValid('text_area', $event.target.value)"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  name: 'Textarea',
  props: {
    placeholder: { type: String, default: null },
    name: { type: String, default: null },
    isError: { type: Number, default: -1 },
    value: { type: String, default: null }
  },
  data() {
    return {
      form: {
        text_area: this.value
      },
      errors: [],
      errorMessage: 'Lütfen bu alanı kontrol ediniz.'
    }
  },
  methods: {
    handleValid(key, value) {
      this.form.text_area = value
      this.$emit('input', { value, name: this.name })
      if (this.form[key] && this.errors.includes(key))
        this.errors.splice(this.errors.indexOf(key), 1)
      if (!this.form[key] && !this.errors.includes(key)) this.errors.push(key)
    }
  }
}
</script>

<style lang="scss" scoped>
textarea {
  background: #f2f2f2;
  border-radius: 3px;
}
</style>