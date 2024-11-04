<template>
  <div>
    <form
      v-loading="{ loading: isLoading, text: 'Gönderiliyor' }"
      @submit.prevent="handleSubmit"
      class="form-input-grid"
    >
      <div class="grid col-2">
        <div
          class="input-grid"
          :data-error="errors.includes('first_name') ? errorMessage : null"
        >
          <input
            v-model="form.first_name"
            class="flat-input"
            type="text"
            @input="handleValid('first_name')"
            placeholder="Ad"
          />
        </div>
        <div
          class="input-grid"
          :data-error="errors.includes('last_name') ? errorMessage : null"
        >
          <input
            v-model="form.last_name"
            class="flat-input"
            type="text"
            @input="handleValid('last_name')"
            placeholder="Soyad"
          />
        </div>
      </div>
      <div class="grid col-2">
        <div
          class="input-grid"
          :data-error="errors.includes('phone') ? errorMessage : null"
        >
          <input
            v-model="form.phone"
            class="flat-input"
            type="tel"
            @input="handleValid('phone')"
            placeholder="Telefon Numarası"
          />
        </div>
        <div
          class="input-grid"
          :data-error="errors.includes('email') ? errorMessage : null"
        >
          <input
            v-model="form.email"
            class="flat-input"
            type="email"
            @input="handleValid('email')"
            placeholder="E-posta Adresi"
          />
        </div>
      </div>
      <div class="input-grid">
        <input
          class="flat-input"
          type="email"
          value="Ürün Hakkında Detaylı Bilgi İstiyorum"
          disabled
        />
      </div>
      <div
        class="input-grid"
        :data-error="errors.includes('body') ? errorMessage : null"
      >
        <textarea
          v-model="form.body"
          class="flat-textarea"
          @input="handleValid('body')"
          placeholder="Mesajınız"
        >
        </textarea>
      </div>
      <div>
        <Checkbox @onChange="checkForm" style="cursor: pointer">
          <template #text>
            <div class="is-flex text-color">
              <p class="checkbox-text" @click.stop="clickForm">
                Destek Bölümü Aydınlatma Metnini
              </p>
              okudum.
            </div>
          </template>
        </Checkbox>
        <Checkbox class="mt-5" @onChange="checkSender" style="cursor: pointer;">
          <template #text>
            <div class="text-color">
              Fırsat,ürün ve hizmetler ile ilgili ticari elektronik ileti almak
              istiyorum.
            </div>
          </template>
        </Checkbox>
      </div>
      <div class="input-grid justify-content end">
        <button @click="handleSubmit" class="flat-button">GÖNDER</button>
      </div>
    </form>
    <Modal :isActive="isActive" height="80%" width="90%">
      <div class="flex col">
        <div class="flex justify-end">
          <span @click="isActive = false" class="clickable">
            <Icon name="close-lg" />
          </span>
        </div>
        <div v-html="formBody"></div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Checkbox from '@/components/common/Checkbox'
import Modal from '@/components/common/Modal'
import endpoints from '@/api/endpoints'
import Icon from '@/components/Icon.vue'

export default {
  components: { Checkbox, Modal, Icon },
  data() {
    return {
      isActive: false,
      isLoading: false,
      errors: [],
      errorMessage: 'Lütfen bu alanı kontrol ediniz.',
      form: {
        first_name: null,
        last_name: null,
        phone: null,
        email: null,
        category: 28,
        body: null
      },
      isCheckForm: false,
      isCheckSender: false,
      formBody: ''
    }
  },
  computed: {
    ...mapGetters({
      getContactCategoryList: 'contact/getContactCategoryList'
    })
  },
  methods: {
    ...mapActions({
      getContactCategory: 'contact/getContactCategory',
      sendContactForm: 'contact/sendContactForm'
    }),
    async clickForm() {
      let result = await this.$axios({
        ...endpoints.custom_page.get,
        url: endpoints.custom_page.get.url(
          'kurumsal-icerikler',
          'destek-ve-garanti-kosullari'
        )
      })
      if (result?.data) {
        this.formBody = result?.data?.body
        this.isActive = true
      }
    },
    checkForm(item) {
      this.isCheckForm = item.isChecked
    },
    checkSender(item) {
      this.isCheckSender = item.isChecked
    },
    handleValid(key) {
      if (this.form[key] && this.errors.includes(key))
        this.errors.splice(this.errors.indexOf(key), 1)
      if (!this.form[key] && !this.errors.includes(key)) this.errors.push(key)
    },
    isValid(form) {
      this.errors = []
      let errors = Object.keys(form).filter(item => !form[item])
      if (errors.length) {
        this.errors = errors
        return false
      }
      return true
    },
    handleSubmit(e) {
      e.preventDefault()
      if (!this.isValid(this.form)) return

      if (!this.isCheckForm) {
        this.$notify({
          type: 'warn',
          title: 'Bilgilendirme',
          text: 'Lütfen destek formunu okuyunuz.',
          duration: 8000
        })
        return
      }

      this.isLoading = true
      this.sendContactForm({
        ...this.form,
        support_text_confirm: this.isCheckContact,
        info_mail_confirm: this.isCheckSender,
        stock_code: this.$route.params.id
      })
        .then(response => {
          this.$emit('onSuccess', true)
          this.isLoading = false
        })
        .catch(e => {
          this.isLoading = false

          this.errors.push('Bir hata oluştu.')
        })
    }
  },
  created() {
    this.getContactCategory()
  }
}
</script>

<style>
.checkbox-text {
  text-decoration: underline;
  padding-right: 5px;
}

.text-color {
  color: black;
  cursor: pointer;
}
</style>
