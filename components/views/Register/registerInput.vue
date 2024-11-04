<template>
  <div>
    <input
      :class="`${attrs.class} ${!$v.value.required || $v.$invalid ? '' : ''}`"
      :type="attrs.type"
      :placeholder="attrs.placeholder"
      v-model="proxyValue"
      @input="setValue($event.target.value)"
    />
    <!-- !$v.value.required || $v.$invalid ? 'error' : ''-->

    <!-- <div class="error" v-if="!$v.value.minLength">
      Name must have at least {{ $v.value.$params.minLength.min }} letters.
    </div> -->
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

export default {
  props: {
    attrs: {
      type: Object,
      default: () => {}
    },
    itemId: String,
    phone: Boolean
  },
  computed: {
    proxyValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    }
  },
  data() {
    return {
      value: ''
    }
  },
  validations() {
    if (this.phone) {
      return {
        value: {
          required,
          minLength: minLength(15)
        }
      }
    }

    if (this.attrs.type == 'email') {
      return {
        value: {
          required,
          minLength: minLength(3),
          email
        }
      }
    }

    if (this.itemId == 'company_web') {
      return {
        value: {
          required: false,
          minLength: minLength(0)
        }
      }
    }

    if (!this.phone && this.attrs.type != 'email') {
      return {
        value: {
          required,
          minLength: minLength(3)
        }
      }
    }
  },
  methods: {
    setValue(value) {
      this.value = value
      this.$v.value.$touch()

      this.$emit('validate', {
        id: this.itemId,
        isValid: !this.$v.$invalid,
        message: !this.$v.value.minLength
          ? `${this.attrs.placeholder} en az ${
              this.phone ? '11' : this.$v.value.$params.minLength.min
            }  karakter olmalıdır.`
          : ''
      })
    }
  }
}
</script>

<style scoped>
.error {
  border: 1px solid red !important;
}
</style>
