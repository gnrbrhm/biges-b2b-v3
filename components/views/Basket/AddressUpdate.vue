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
              v-model="updateForm.firm_name"
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
              v-model="updateForm.contact_name"
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
              v-model="updateForm.address_line"
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
              v-model="updateForm.city"
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
              v-model="updateForm.city"
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
              v-model="updateForm.district"
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
              v-model="updateForm.district"
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
              v-model="updateForm.phone"
              class="flat-input"
              type="tel"
              v-mask="'+90(###) ###-####'"
              @input="handleValid('phone', $event)"
            />
          </label>
          <label
            class="input-grid"
            :data-error="errors.includes('zip_street') ? errorMessage : null"
          >
            Posta Kodu
            <input
              v-model="updateForm.zip_street"
              class="flat-input"
              type="number"
              @input="handleValid('zip_street')"
            />
          </label>
        </form>
      </ul>
      <button :disabled="isLoading" @click="handleSubmit" class="btn-new">
        Güncelle
      </button>
    </div>
  </details>
</template>

<script>
import endpoints from '@/api/endpoints'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    isShow: { type: Boolean, default: false },
    form: { type: Object, required: true }
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
      required: [
        'firm_name',
        'contact_name',
        'address_line',
        'city',
        'district',
        'phone',
        'zip_street'
      ],
      validPhone: null,
      updateForm: null
    }
  },
  // watch: {
  //   'updateForm.city': {
  //     deep: true,
  //     handler(value) {
  //       if (value) {
  //         this.updateForm.city = value
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
    handleValid(key, event) {
      if (this.updateForm[key] && this.errors.includes(key))
        this.errors.splice(this.errors.indexOf(key), 1)
      if (!this.updateForm[key] && !this.errors.includes(key))
        this.errors.push(key)
      if (key == 'phone') {
        if (event.target.dataset.isValid == 'false') {
          this.errors.push(key)
        } else {
          this.validPhone = event.target.dataset.value
        }
      }
      if (key == 'city') this.updateForm.district = null
    },
    async getDistrictLocation(value) {
      await this.fetchDistrictLocation(value)
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
      if (!this.isValid(this.updateForm)) return
      this.isLoading = true
      try {
        await this.$axios({
          ...endpoints.user.address.put,
          //data: { ...this.form, phone: this.validPhone },
          data: this.updateForm,
          url: endpoints.user.address.put.url(this.updateForm.address_number)
        })
        this.$emit('onSuccess', this.updateForm)
        this.$emit('onClose')
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

    this.updateForm = {
      ...this.form
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../styles/Basket/wizard-component.scss';
</style>
