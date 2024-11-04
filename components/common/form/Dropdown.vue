<template>
  <div class="input-grid" :data-error="existsError ? errorMessage : null">
    <select
      required
      v-model="form.category"
      @change="handleValid('category', $event.target.value)"
      class="flat-select"
    >
      <option value="" disabled selected>
        {{ placeholder }}
      </option>
      <slot></slot>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    placeholder: { type: String, default: null },
    name: { type: String, default: null },
    isError: { type: Number, default: -1 },
    disableError: { type: Boolean, default: true },
    value: { type: String, default: '' }
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
        category: this.value
      },
      errors: [],
      errorMessage: 'Lütfen bu alanı kontrol ediniz.'
    }
  },
  methods: {
    handleValid(key, value) {
      this.$emit('selected', { value, name: this.name })
      if (this.form[key] && this.errors.includes(key))
        this.errors.splice(this.errors.indexOf(key), 1)
      if (!this.form[key] && !this.errors.includes(key)) this.errors.push(key)
    }
  }
}
</script>

<style scoped>
select:required:invalid {
  color: rgba(31, 31, 31, 0.5);
}
option[value=''][disabled] {
  display: none;
}
option {
  color: black;
}
</style>