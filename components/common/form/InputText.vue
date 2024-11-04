<template>
  <div class="input-grid" :data-error="existsError ? errorMessage : null">
    <input
      v-model="form.text_input"
      class="flat-input"
      v-mask="name == 'phone' ? '+90(###) ###-####' : ''"
      :type="type"
      @input="handleValid('text_input', $event.target.value)"
      :placeholder="placeholder"
      :readonly="isReadonly"
    />
  </div>
</template>

<script>
export default {
  name: 'InputText',
  props: {
    placeholder: { type: String, default: null },
    name: { type: String, default: null },
    isError: { type: Number, default: -1 },
    disableError: { type: Boolean, default: true },
    value: { type: String, default: null },
    isReadonly: { type: Boolean, default: false },
    type: { type: String, default: 'text' }
  },
  computed: {
    existsError() {
      let result = false
      result =
        (this.errors.includes('text_input') || this.isError >= 0) &&
        this.disableError
      return result
    }
  },
  data() {
    return {
      form: {
        text_input: this.value
      },
      errors: [],
      errorMessage: 'Lütfen bu alanı kontrol ediniz.'
    }
  },
  methods: {
    handleValid(key, value) {
      this.form.text_input = value
      this.$emit('input', { value, name: this.name })
      if (this.form[key] && this.errors.includes(key))
        this.errors.splice(this.errors.indexOf(key), 1)
      if (!this.form[key] && !this.errors.includes(key)) this.errors.push(key)
    }
  }
}
</script>

<style lang="scss" scoped>
.flat-input::-webkit-input-placeholder {
  color: rgba(31, 31, 31, 0.5) !important;
  font-size: 14px;
  line-height: 17px;
}
</style>