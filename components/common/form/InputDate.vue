<template>
  <div
    class="input-grid"
    :data-error="
      errors.includes('date_input') || isError >= 0 ? errorMessage : null
    "
  >
    <flat-pickr
      class="flat-input"
      v-model="form.date"
      :placeholder="placeholder"
      @on-change="handleValid"
      :config="config"
    ></flat-pickr>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { dateFormat } from '@/utils/date'
export default {
  name: 'InputDate',
  props: {
    placeholder: { type: String, default: null },
    name: { type: String, default: null },
    isError: { type: Number, default: -1 },
    value: { type: String, default: null }
  },
  components: {
    flatPickr
  },
  data() {
    return {
      form: {
        date: this.value
      },
      config: {
        disableMobile: 'true',
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: 'M j, Y',
        dateFormat: 'd-m-Y',
        locale: {
          firstDayOfWeek: 1, // start week on Monday
          weekdays: {
            longhand: [
              'Pazar',
              'Pazartesi',
              'Salı',
              'Çarşamba',
              'Perşembe',
              'Cuma',
              'Cumartesi'
            ],
            shorthand: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']
          },
          months: {
            longhand: [
              'Ocak',
              'Şubat',
              'Mart',
              'Nisan',
              'Mayıs',
              'Haziran',
              'Temmuz',
              'Ağustos',
              'Eylül',
              'Ekim',
              'Kasım',
              'Aralık'
            ],
            shorthand: [
              'Oca',
              'Şub',
              'Mar',
              'Nis',
              'May',
              'Haz',
              'Tem',
              'Ağu',
              'Eyl',
              'Eki',
              'Kas',
              'Ara'
            ]
          },
          today: 'Bugün',
          clear: 'Temizle'
        }
      },
      errors: [],
      errorMessage: 'Lütfen bu alanı kontrol ediniz.'
    }
  },
  methods: {
    handleValid(key, value) {
      this.form.date = value
      this.$emit('input', {
        value: dateFormat(value),
        name: this.name
      })
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