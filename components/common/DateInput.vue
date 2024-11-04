<template>
  <div class="control has-icons-left date-input" :style="{ width: width }">
    <span class="icon is-left">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.6178 0C5.03201 0 5.3678 0.335786 5.3678 0.75V1.93359H10.6364V0.75C10.6364 0.335786 10.9722 0 11.3864 0C11.8006 0 12.1364 0.335786 12.1364 0.75V1.93359H14.2873C15.2355 1.93359 16.0042 2.7023 16.0042 3.65054V6.55176V14.287C16.0042 15.2352 15.2355 16.0039 14.2873 16.0039H1.71695C0.768705 16.0039 0 15.2352 0 14.287V6.55176V3.65054C0 2.7023 0.768705 1.93359 1.71695 1.93359H3.8678V0.75C3.8678 0.335786 4.20358 0 4.6178 0ZM10.6364 3.43359V4.13432C10.6364 4.54854 10.9722 4.88432 11.3864 4.88432C11.8006 4.88432 12.1364 4.54854 12.1364 4.13432V3.43359H14.2873C14.4071 3.43359 14.5042 3.53073 14.5042 3.65054V5.80176H1.5V3.65054C1.5 3.53073 1.59713 3.43359 1.71695 3.43359H3.8678V4.13432C3.8678 4.54854 4.20358 4.88432 4.6178 4.88432C5.03201 4.88432 5.3678 4.54854 5.3678 4.13432V3.43359H10.6364ZM14.5042 7.30176V14.287C14.5042 14.4068 14.4071 14.5039 14.2873 14.5039H1.71695C1.59713 14.5039 1.5 14.4068 1.5 14.287V7.30176H14.5042Z"
          fill="#1F1F1F"
          fill-opacity="0.3"
        />
      </svg>
    </span>
    <flat-pickr
      class="date-picker"
      :config="config"
      v-model="date"
      :placeholder="placeholder"
      @on-change="changeDate"
    ></flat-pickr>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
export default {
  name: 'DateInput',
  components: {
    flatPickr
  },
  props: {
    placeholder: { type: String, default: null },
    iconHeight: { type: Number, default: 16 },
    iconWidth: { type: Number, default: 16 },
    width: { type: String, default: null },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      date: this.value,
      config: {
        disableMobile: 'true',
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: 'M j, Y',
        dateFormat: 'd-m-Y',
        locale: {
          firstDayOfWeek: 1,
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
      }
    }
  },
  methods: {
    changeDate() {
      this.$emit('changeDate', this.date)
    }
  }
}
</script>

<style lang="scss" scoped>
.date-input {
  width: 200px;
  height: 40px;
  border-radius: 3px;
  border: 1px solid rgba(31, 31, 31, 0.2);

  .date-picker {
    margin-left: 30px;
    width: 160px;
    height: 38px;
    cursor: pointer;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: rgba(31, 31, 31, 0.5);

    border: none;
    outline: none;
    box-shadow: none;
  }
  .date-picker::-webkit-input-placeholder {
    padding-left: 5px;
  }
}
</style>
