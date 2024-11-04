<template>
  <div>
    <button
      :class="
        $route.name == 'destek-id'
          ? 'flat-button --outline --medium'
          : 'information-detail has-text-weight-semibold'
      "
      @click.prevent="$emit('clickDetailButton', true)"
    >
      {{
        $route.name == 'destek-id' ? 'Teknik Destek Al' : 'DETAYLI BİLGİ ALIN'
      }}
    </button>

    <Modal
      :isActive="detailModalActive"
      :defaultButton="true"
      @close="$emit('clickDetailButton', false)"
      @onSubmit="sendForm"
      height="688px"
    >
      <div>
        <form
          v-loading="{ loading: isLoading, text: 'Gönderiliyor' }"
          class="form-input-grid"
        >
          <div class="input-grid">
            <div class="form-header">Detaylı Bilgi İçin Sizi Arayalım.</div>
            <p class="form-subheader">
              Bu ürün hakkında detaylı bilgi vermek için müşteri temsilcilerimiz
              size ulaşsın.
            </p>
          </div>
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
                placeholder="Adınız"
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
                placeholder="Soyadınız"
              />
            </div>
          </div>
          <div class="grid col-2">
            <div
              class="input-grid"
              :data-error="errors.includes('email') ? errorMessage : null"
            >
              <input
                v-model="form.email"
                class="flat-input"
                type="email"
                @input="handleValid('email')"
                placeholder="E-posta Adresiniz"
              />
            </div>
            <div
              class="input-grid"
              :data-error="errors.includes('phone') ? errorMessage : null"
            >
              <input
                v-model="form.phone"
                class="flat-input"
                type="tel"
                @input="handleValid('phone')"
                placeholder="Telefon Numaranız"
              />
            </div>
          </div>
          <!-- <div
            class="input-grid"
            :data-error="errors.includes('category') ? errorMessage : null"
          >
            <select
              v-model="form.category"
              class="flat-select"
            >
              <option
                v-for="(item, index) in getContactCategoryList"
                :key="item + '-' + index"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </div> -->

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

          <Checkbox @onChange="checkContact" style="cursor: pointer;">
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
                Fırsat,ürün ve hizmetler ile ilgili ticari elektronik ileti almak istiyorum.
              </div>
            </template>
          </Checkbox>
        </form>
      </div>
    </Modal>

    <Modal :isActive="isActive" height="80%">
      <div class="flex col">
        <div class="flex justify-end">
          <span @click="isActive = false" class="clickable">
            <Icon name="close-lg" />
          </span>
        </div>
        <div v-html="contactBody"></div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from '~/components/common/Modal'
import Checkbox from '@/components/common/Checkbox'
import Icon from '@/components/Icon.vue'
import endpoints from '@/api/endpoints'
import { mapActions } from 'vuex'

export default {
  name: 'ButtonInformationDetail',
  components: { Modal, Checkbox, Icon },
  props: {
    detailModalActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //modalActive: false,
      isLoading: false,
      errors: [],
      errorMessage: 'Lütfen bu alanı kontrol ediniz.',
      isCheckContact: false,
      isCheckSender: false,
      contactBody: '',
      isActive: false,
      form: {
        first_name: null,
        last_name: null,
        phone: null,
        email: null,
        category: 28,
        body: null
      }
    }
  },
  // computed: {
  //   ...mapGetters({
  //     getContactCategoryList: 'contact/getContactCategoryList'
  //   })
  // },
  methods: {
    ...mapActions({
      //getContactCategory: 'contact/getContactCategory',
      sendContactForm: 'contact/sendContactForm'
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
    sendForm(e) {
      this.isLoading = true

      if (!this.isValid(this.form)) {
        this.isLoading = false
        return
      }

      if (!this.isCheckContact) {
        this.$notify({
          type: 'warn',
          title: 'Bilgilendirme',
          text: 'Lütfen iletişim formunu okuyunuz.',
          duration: 8000
        })
        this.isLoading = false
        return
      }

      this.sendContactForm({
        ...this.form,
        support_text_confirm: this.isCheckContact,
        info_mail_confirm: this.isCheckSender,
        stock_code: this.$route.params.id
      })
        .then(resp => {
          this.isLoading = false
          this.detailModalActive = false
        })
        .catch(() => {
          this.isLoading = false
          this.detailModalActive = true
        })
    }
  }
  // created() {
  //   this.getContactCategory()
  // }
}
</script>

<style scoped lang="scss">
// @import '@/assets/css/variables.scss/';

.information-detail {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 326px;
  height: 56px;
  border: none;
  cursor: pointer;

  background: #0d2f81;
  border-radius: 3px;
  text-align: center;

  font-size: 14px;
  line-height: 17px;
  color: #ffffff;

  &:hover {
    background: $primary-dark-3x;
  }
  &:disabled {
    opacity: 0.5;
  }
}

.form-header {
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;

  color: #1f1f1f;
}

.form-subheader {
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;

  color: rgba(31, 31, 31, 0.5);
}

.text-color {
  color: black;
  cursor: pointer;
}
</style>
