<template>
  <div>
    <div>
      <form
        v-loading="{ loading: isLoading, text: 'Gönderiliyor' }"
        class="form-input-grid"
        @submit.prevent="handleSubmit"
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
              placeholder="Ad"
              @input="handleValid('first_name')"
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
              placeholder="Soyad"
              @input="handleValid('last_name')"
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
              placeholder="Telefon Numarası"
              @input="handleValid('phone')"
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
              placeholder="E-posta Adresi"
              @input="handleValid('email')"
            />
          </div>
        </div>
        <div
          class="input-grid"
          :data-error="errors.includes('category') ? errorMessage : null"
        >
          <select
            v-model="form.category"
            class="flat-select"
            @change="handleValid('category')"
          >
            <option value="null">İletmek İstediğiniz Konu</option>
            <option
              v-for="(item, index) in getContactCategoryList"
              :key="item + '-' + index"
              :value="item.id"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div
          class="input-grid"
          :data-error="errors.includes('body') ? errorMessage : null"
        >
          <textarea
            v-model="form.body"
            class="flat-textarea"
            placeholder="Mesajınız"
            @input="handleValid('body')"
          >
          </textarea>
        </div>
        <div v-if="!isAuthenticated">
          <Checkbox @onChange="checkContact" style="cursor: pointer">
            <template #text>
              <div class="is-flex text-color">
                <p class="checkbox-text" @click.stop="clickForm">
                  İletişim Bölümü Aydınlatma Metnini
                </p>
                okudum.
              </div>
            </template>
          </Checkbox>
          <Checkbox
            class="mt-5"
            @onChange="checkSender"
            style="cursor: pointer;"
          >
            <template #text>
              <div class="text-color">
                Fırsat,ürün ve hizmetler ile ilgili ticari elektronik ileti almak
                istiyorum.
              </div>
            </template>
          </Checkbox>
        </div>
        <div class="input-grid justify-content end">
          <button class="flat-button" @click="handleSubmit">GÖNDER</button>
        </div>
      </form>
      <Modal :isActive="isActive" height="80%">
        <div class="flex col">
          <div class="flex justify-end">
            <span class="clickable" @click="isActive = false">
              <Icon name="close-lg" />
            </span>
          </div>
          <div v-html="contactBody"></div>
        </div>
      </Modal>
    </div>
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
        category: null,
        body: null
      },
      isCheckContact: false,
      isCheckSender: false,
      contactBody: ''
    }
  },
  computed: {
    ...mapGetters({
      getContactCategoryList: 'contact/getContactCategoryList',
      isAuthenticated: 'isAuthenticated'
    })
  },
  methods: {
    ...mapActions({
      getContactCategory: 'contact/getContactCategory',
      sendContactForm: 'contact/sendContactForm',
      fetchUserProfile: 'foryou/fetchUserProfile'
    }),
    async clickForm() {
      let result = await this.$axios({
        ...endpoints.custom_page.get,
        url: endpoints.custom_page.get.url(
          'kurumsal-icerikler',
          'kvkk-iletisim-bolumu-aydinlatma-metni'
        )
      })
      if (result?.data) {
        this.contactBody = result?.data?.body
        this.isActive = true
      }
    },
    checkContact(item) {
      this.isCheckContact = item.isChecked
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

      if (this.isAuthenticated) {
        this.isCheckContact = true
        this.isCheckSender = true
      }

      if (!this.isCheckContact) {
        this.$notify({
          type: 'warn',
          title: 'Bilgilendirme',
          text: 'Lütfen İletişim Bölümü Aydınlatma Metnini okuyun.',
          duration: 8000
        })
        return
      }

      this.isLoading = true
      this.form['support_text_confirm'] = this.isCheckContact
      this.form['info_mail_confirm'] = this.isCheckSender
      this.sendContactForm(this.form)
        .then(response => {
          this.$emit('onSuccess', true)
          this.isLoading = false
        })
        .catch(e => {
          this.isLoading = false

          this.errors.push('Bir hata oluştu.')
        })
    },
    async getUserProfile() {
      if (Object.keys(this.fetchUserProfile).length) return
      await this.fetchUserProfile().then(response => {
        if (response) {
          this.form = response
        }
      })
      this.form.body = ''
      this.form.category = null
      this.form.birth_date = this.form?.birth_date ?? '-'
      console.log('form: ', this.form)
    }
  },
  created() {
    this.getContactCategory()
    if (this.isAuthenticated) {
      this.getUserProfile()
    }
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
