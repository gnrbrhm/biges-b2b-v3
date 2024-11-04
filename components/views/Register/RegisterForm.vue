<template>
  <form class="register-form" @submit.prevent="onSubmit">
    <h2 class="form-title is-size-3">Bayilik Başvurusu</h2>

    <div class="field" v-for="(item, index) in form" :key="item + index">
      <span v-if="item.id !== 'company_web'">*</span>
      <p class="control">
        <component
          :is="item.component"
          v-mask="item.mask"
          :attrs="item.attrs"
          :itemId="item.id"
          v-model="item.value"
          :key="item.id"
          @validate="validate"
          :phone="item.phone"
          v-tooltip.top="{
            content: findErrorMessage(item.id),
            show: findErrorMessage(item.id)
          }"
        />
      </p>
    </div>

    <p>* Zorunlu Alan</p>

    <Checkbox @onChange="checkForm">
      <template #text>
        <p>
          <strong class="mr-1" @click="clickForm">
            Bayilik Adayı ve Bayilik Sahibi Kişisel Aydınlatma Metnini
          </strong>
          okudum.
        </p>
      </template>
    </Checkbox>
    <div class="field">
      <p class="control">
        <button
          class="button is-fullwidth is-capitalized has-text-white has-text-weight-light form-button"
          type="submit"
          :disabled="!isValid() || !checkbox"
          v-loading="{ loading: loading }"
        >
          BAŞVURU YAP
        </button>
      </p>
    </div>
    <div class="form-footer">
      <p class="has-text-dark">
        Bayilik kaydınız var mı?
        <nuxt-link to="/giris"> Giriş yapın.</nuxt-link>
      </p>
    </div>
  </form>
</template>

<script>
import endpoints from '@/api/endpoints'

import registerInput from './registerInput'
import registerTextarea from './registerTextarea'
import Checkbox from '@/components/common/Checkbox'

export default {
  components: {
    registerInput,
    registerTextarea,
    Checkbox
  },
  data() {
    return {
      form: [
        {
          id: 'full_name',
          component: 'registerInput',
          phone: false,
          mask: '',
          value: '',
          hasError: false,
          attrs: {
            class: 'input',
            placeholder: 'Ad Soyad',
            type: 'text'
          }
        },
        {
          id: 'email',
          component: 'registerInput',
          phone: false,
          mask: '',
          value: '',
          hasError: false,
          attrs: {
            class: 'input',
            placeholder: 'E-Posta Adresiniz',
            type: 'email'
          }
        },
        {
          id: 'personal_phone',
          component: 'registerInput',
          phone: true,
          mask: '+90(###) ###-####',
          value: '',
          hasError: false,
          attrs: {
            class: 'input',
            placeholder: 'Cep Telefonu',
            type: 'text'
          }
        },
        {
          id: 'company_name',
          component: 'registerInput',
          phone: false,
          mask: '',
          value: '',
          hasError: false,
          attrs: {
            class: 'input',
            placeholder: 'Şirket Adı',
            type: 'text'
          }
        },
        {
          id: 'company_phone',
          component: 'registerInput',
          phone: true,
          mask: '+90(###) ###-####',
          value: '',
          hasError: false,
          attrs: {
            class: 'input',
            placeholder: 'Şirket Telefonu',
            type: 'text'
          }
        },
        {
          id: 'company_web',
          component: 'registerInput',
          phone: false,
          mask: '',
          value: '',
          hasError: false,
          attrs: {
            class: 'company_web input',
            placeholder: 'Şirket Websitesi',
            type: 'text'
          }
        },
        {
          id: 'city',
          component: 'registerInput',
          phone: false,
          mask: '',
          value: '',
          hasError: false,
          attrs: {
            class: 'input',
            placeholder: 'İl',
            type: 'text'
          }
        },
        {
          id: 'district',
          component: 'registerInput',
          phone: false,
          mask: '',
          value: '',
          hasError: false,
          attrs: {
            class: 'input',
            placeholder: 'İlçe',
            type: 'text'
          }
        },
        {
          id: 'company_address',
          component: 'registerTextarea',
          phone: false,
          mask: '',
          value: '',
          hasError: false,
          attrs: {
            class: 'input',
            placeholder: 'Şirket Adres',
            type: 'text'
          }
        },
        {
          id: 'tax_office',
          component: 'registerInput',
          phone: false,
          mask: '',
          value: '',
          hasError: false,
          attrs: {
            class: 'input',
            placeholder: 'Vergi Dairesi',
            type: 'text'
          }
        },
        {
          id: 'tax_no',
          component: 'registerInput',
          phone: false,
          mask: '',
          value: '',
          hasError: false,
          attrs: {
            class: 'input',
            placeholder: 'Vergi Numarası',
            type: 'text'
          }
        }
      ],
      errors: [],
      checkbox: false,
      loading: false
    }
  },
  methods: {
    checkForm(item) {
      this.checkbox = item.isChecked
    },
    async clickForm() {
      let result = await this.$axios({
        ...endpoints.custom_page.get,
        url: endpoints.custom_page.get.url(
          'kurumsal-icerikler',
          'kvkk-bayilik-basvurusu-aydinlatma-metni'
        )
      })
      if (result?.data) {
        this.$emit('handleContract', result?.data?.body)
      }
    },
    async onSubmit() {
      if (this.isValid() && this.checkbox) {
        this.loading = true
        try {
          let mappedArray = this.form.map((item) => [item.id, item.value])
          let request = {}
          request['kvkk_confirm'] = this.checkbox
          for (let i of mappedArray) request[i[0]] = i[1]
          let res = await this.$axios({
            ...endpoints.user.reseller_application,
            data: request
          })

          if (res.status === 201) {
            this.$notify({
              type: 'success',
              title: 'Başvurunuz Alındı!',
              text: `Yönlendiriliyorsunuz. Lütfen bekleyin.`,
              duration: 5000
            })
            setTimeout(() => {
              this.$router.push('/giris')
            }, 3000)
          } else {
            this.$notify({
              type: 'error',
              title: 'Başvuru Alınamadı!',
              text: `Başvuru esnasında bir hata meydana geldi.`,
              duration: 5000
            })
            this.loading = false
          }
        } catch (error) {
          this.$notify({
            type: 'error',
            title: 'İşlem Başarısız!',
            text: `Başvuru esnasında bir hata meydana geldi. ${error}`,
            duration: 5000
          })
          console.log(error)
          this.loading = false
        }
      }
    },
    isValid() {
      let index = this.errors.find((i) => i.isValid == false)
      return index ? false : true
    },
    findErrorMessage(id) {
      let findIndex = this.errors.findIndex((i) => i.id === id)
      return this.errors[findIndex].message
    },
    validate(data) {
      let findIndex = this.errors.findIndex((i) => i.id === data.id)
      let companyWebIndex = this.errors.findIndex((i) => i.id == 'company_web')

      this.errors[findIndex].isValid = data.isValid
      this.errors[findIndex].message = data.message

      // company_web always return valid
      this.errors[companyWebIndex].isValid = true
    }
  },
  created() {
    this.errors = this.form.map((item) => {
      return {
        id: item.id,
        isValid: false,
        message: ''
      }
    })
  }
}
</script>

<style lang="scss">
@import './components/styles/Register/register-form.scss';
</style>
