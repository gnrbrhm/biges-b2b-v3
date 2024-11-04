<template>
  <details @click="onToggle" :open="isShow" class="address-details">
    <summary></summary>
    <div class="address-details__item-content">
      <ul>
        <form
          v-loading="{ loading: isLoading, text: 'Gönderiliyor' }"
          @submit.prevent="handleSubmit"
          class="form-input-grid"
        >
          <label
            class="input-grid"
            :data-error="errors.includes('firm_name') ? errorMessage : null"
          >
            Firma Adı
            <input
              v-model="form.firm_name"
              class="flat-input"
              type="text"
              @input="handleValid('firm_name')"
            />
          </label>
          <label
            class="input-grid"
            :data-error="errors.includes('contact_name') ? errorMessage : null"
          >
            İlgili Kişi
            <input
              v-model="form.contact_name"
              class="flat-input"
              type="text"
              @input="handleValid('contact_name')"
            />
          </label>
          <label
            class="input-grid"
            :data-error="errors.includes('address_line') ? errorMessage : null"
          >
            Adres
            <input
              v-model="form.address_line"
              class="flat-input"
              type="text"
              @input="handleValid('address_line')"
            />
          </label>
          <label
            class="input-grid"
            :data-error="errors.includes('city') ? errorMessage : null"
          >
            Şehir
            <!-- <select
              v-model="form.city"
              class="flat-select"
              @change="handleValid('city')"
            >
              <option disabled default value="">Seçiniz</option>
              <option
                v-for="c in getLocationList"
                :value="c"
                :key="c + '-city'"
                >{{ c }}</option
              >
            </select> -->
            <input
              v-model="form.city"
              class="flat-input"
              type="text"
              @input="handleValid('city')"
            />
          </label>
          <label
            class="input-grid"
            :data-error="errors.includes('district') ? errorMessage : null"
          >
            İlçe
            <!-- <select
              v-model="form.district"
              class="flat-select"
              @change="handleValid('district')"
            >
              <option disabled default value="">Seçiniz</option>
              <option
                v-for="d in getDistrictLocationList"
                :value="d"
                :key="d + '-district'"
                >{{ d }}</option
              >
            </select> -->
            <input
              v-model="form.district"
              class="flat-input"
              type="text"
              @input="handleValid('district')"
            />
          </label>
          <label
            class="input-grid"
            :data-error="errors.includes('phone') ? errorMessage : null"
          >
            Telefon
            <input
              v-model="form.phone"
              v-mask="'+90(###) ###-####'"
              class="flat-input"
              type="tel"
              @input="handleValid('phone', $event)"
            />
          </label>
          <label
            class="input-grid"
            :data-error="errors.includes('zip_street') ? errorMessage : null"
          >
            Posta Kodu
            <input
              v-model="form.zip_street"
              class="flat-input"
              type="number"
              @input="handleValid('zip_street')"
            />
          </label>
        </form>
      </ul>
      <button :disabled="isLoading" @click="handleSubmit" class="btn-new">
        Ekle
      </button>
    </div>
  </details>
</template>

<script>
import endpoints from '@/api/endpoints'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    isShow: { type: Boolean, default: false }
  },
  computed: {
    ...mapGetters({
      getLocationList: 'core/getLocationList',
      getDistrictLocationList: 'core/getDistrictLocationList'
    })
  },
  data() {
    return {
      isLoading: false,
      errors: [],
      errorMessage: 'Lütfen bu alanı kontrol ediniz.',
      form: {
        firm_name: null,
        contact_name: null,
        address_line: null,
        address_line_extra: '-',
        city: null,
        district: null,
        phone: null,
        zip_street: null
      },
      required: [
        'firm_name',
        'contact_name',
        'address_line',
        'city',
        'district',
        'phone',
        'zip_street'
      ],
      validPhone: null
    }
  },
  // watch: {
  //   'form.city': {
  //     deep: true,
  //     handler(value) {
  //       if (value) {
  //         this.form.city = value
  //         this.getDistrictLocation(value)
  //       }
  //     }
  //   }
  // },

  methods: {
    ...mapActions({
      fetchLocations: 'core/fetchLocations',
      fetchDistrictLocation: 'core/fetchDistrictLocation'
    }),
    async getDistrictLocation(value) {
      await this.fetchDistrictLocation(value)
    },
    handleValid(key, event) {
      if (this.form[key] && this.errors.includes(key))
        this.errors.splice(this.errors.indexOf(key), 1)
      if (!this.form[key] && !this.errors.includes(key)) this.errors.push(key)
      if (key == 'phone') {
        if (event.target.dataset.isValid == 'false') {
          this.errors.push(key)
        } else {
          this.validPhone = event.target.dataset.value
        }
      }
      if (key == 'city') this.form.district = null
    },
    isValid(form) {
      this.errors = []
      let errors = Object.keys(form).filter(
        item => this.required.includes(item) && !form[item]
      )
      if (errors.length) {
        this.errors = errors
        return false
      }
      return true
    },
    async handleSubmit(e) {
      e.preventDefault()

      if (!this.isValid(this.form)) return

      this.isLoading = true
      try {
        let res = await this.$axios({
          ...endpoints.user.address.post,
          // data: { ...this.form, phone: this.validPhone }
          data: this.form
        })

        if (res.status == 201 || res.status == 200) {
          this.$emit('onSuccess', res.data)
          this.$emit('onClose')
          this.isLoading = false
        } else {
          this.isLoading = false
          throw new Error()
        }
      } catch (error) {
        this.isLoading = false
      }
    },
    onToggle(event) {
      if (
        event.target &&
        event.target.tagName == 'SUMMARY' &&
        event.target.getAttribute('open') != ''
      ) {
        this.$emit('onClose')
      }
    }
  },
  created() {
    //this.fetchLocations()
  }
}
</script>

<style lang="scss" scoped>
@import './../../styles/Basket/wizard-component.scss';
</style>
