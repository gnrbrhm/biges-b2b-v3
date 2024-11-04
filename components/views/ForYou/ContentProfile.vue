<template>
  <TabMenu
    @onTab="$emit('handleTab', $event)"
    :tab="tab"
    :title="title"
    :items="items"
    :isLoading="isLoading"
  >
    <div class="profile-content">
      <template v-if="tab == 0">
        <div class="profile-content__title">
          <div class="profile-content__title__first">
            Hoş Geldin {{ form.first_name }},
          </div>
          <div class="profile-content__title__second">
            Profil bilgilerinizi aşağıda düzenleyebilirsiniz.
          </div>
        </div>
        <div class="profile-content__form">
          <form v-if="isLoaded" class="form-input-grid">
            <div class="grid col-2">
              <InputText
                :placeholder="'Adınız'"
                name="first_name"
                :isError="errors.indexOf('first_name')"
                @input="handleInput($event)"
                v-model="form.first_name"
              ></InputText>
              <InputText
                :placeholder="'Soyadınız'"
                name="last_name"
                :isError="errors.indexOf('last_name')"
                @input="handleInput($event)"
                v-model="form.last_name"
              ></InputText>
            </div>
            <div class="grid col-2">
              <!-- <InputText
                :placeholder="'E-posta Adresiniz'"
                name="email"
                :isError="errors.indexOf('email')"
                @input="handleInput($event)"
                v-model="form.email"
              ></InputText> -->
              <InputText
                :placeholder="'E-posta Adresiniz'"
                name="email"
                v-model="form.email"
                :isReadonly="true"
              ></InputText>
              <InputText
                :placeholder="'Telefon Numaranız'"
                name="phone"
                @input="handleInput($event)"
                v-model="form.phone"
                :disableError="false"
              ></InputText>
            </div>
            <div class="grid col-2">
              <InputDate
                :placeholder="'Doğum Tarihi'"
                name="birth_date"
                @input="handleInput($event)"
                v-model="form.birth_date"
                :disableError="false"
              ></InputDate>
            </div>
          </form>
          <div class="profile-content__form__button">
            <button @click="sendForm" class="form-button">GÜNCELLE</button>
            <button @click="deleteAccount" class="error-button">SİL</button>
          </div>
        </div>
      </template>
      <template v-if="tab == 1">
        <div class="profile-content__form">
          <form class="form-input-grid">
            <div class="grid col-2">
              <InputText
                :placeholder="'Geçerli Parolanız'"
                name="old_password"
                :isError="errors.indexOf('old_password')"
                @input="handleInput($event)"
                v-model="password.old_password"
                type="password"
              ></InputText>
            </div>
            <div class="grid col-2">
              <InputText
                :placeholder="'Yeni Parolanız'"
                name="new_password1"
                :isError="errors.indexOf('new_password1')"
                @input="handleInput($event)"
                v-model="password.new_password1"
                type="password"
              ></InputText>
            </div>
            <div class="grid col-2">
              <InputText
                :placeholder="'Yeni Parolanız (Tekrar)'"
                name="new_password2"
                :isError="errors.indexOf('new_password2')"
                @input="handleInput($event)"
                v-model="password.new_password2"
                type="password"
              ></InputText>
            </div>
          </form>
          <div class="mt-10 password-warn">
            {{ successResponse }}
          </div>
          <div class="profile-content__form__button">
            <button @click="sendForm" class="form-button">GÜNCELLE</button>
          </div>
        </div>
      </template>
    </div>
  </TabMenu>
</template>

<script>
import TabMenu from '@/components/views/ForYou/TabMenu'
import InputText from '@/components/common/form/InputText'
import InputDate from '@/components/common/form/InputDate'
import { dateFormat } from '@/utils/date'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ContentProfile',
  components: { TabMenu, InputText, InputDate },
  props: {
    tab: { type: Number, default: 0 }
  },
  data() {
    return {
      title: 'Profil Ayarları',
      items: [
        { text: 'BİLGİLERİ DÜZENLE', order: 1 },
        { text: 'PAROLA DEĞİŞTİR', order: 2 }
      ],
      successResponse: null,
      isLoading: false,
      isLoaded: false,
      errors: [],
      form: {
        first_name: null,
        last_name: null,
        phone: null,
        email: null,
        birth_date: null
      },
      password: {
        old_password: null,
        new_password1: null,
        new_password2: null
      }
    }
  },
  methods: {
    ...mapActions({
      fetchUserProfile: 'foryou/fetchUserProfile',
      updateUserProfile: 'foryou/updateUserProfile',
      updateUserPassword: 'foryou/updateUserPassword',
      deleteUser: 'foryou/deleteUser'
    }),
    changeQuery(index) {
      this.$router.push({
        name: 'size-ozel',
        query: { ...this.$route.query, tab: index }
      })
    },
    isValid(form) {
      let noRequiredFields = ['phone', 'birth_date']

      this.errors = []
      let errors = Object.keys(form).filter(
        item => !form[item] && noRequiredFields.indexOf(item) < 0
      )
      if (errors.length) {
        this.errors = errors
        return false
      }
      return true
    },
    sendForm() {
      this.isLoading = true
      if (!this.form?.birth_date) delete this.form.birth_date
      if (!this.form?.phone) delete this.form.phone
      let sendingForm = this.form
      if (this.tab == 1) {
        sendingForm = this.password
      }
      if (!this.isValid(sendingForm)) {
        this.isLoading = false
        return
      }
      if (this.tab == 0) {
        this.updateUserProfile(this.form)
          .then(resp => {
            this.isLoading = false
            this.$notify({
              type: 'success',
              text: 'Güncelleme Başarılı'
            })
          })
          .catch(() => {
            this.isLoading = false
          })
      } else if (this.tab == 1) {
        this.updateUserPassword(this.password)
          .then(resp => {
            this.password = {
              old_password: null,
              new_password1: null,
              new_password2: null
            }
            this.isLoading = false
            this.$notify({
              type: 'success',
              title: 'İşlem Başarılı!',
              text: 'Güncelleme Başarılı'
            })
          })
          .catch(() => {
            this.isLoading = false
          })
      }
    },
    async deleteAccount() {
      const result = await this.deleteUser()
      // let resp = await this.$axios({
      //   method: 'GET',
      //   url: `/token/logout/`
      // })
      this.$auth.logout()
      location.href = '/'
    },
    handleInput(item) {
      if (this.tab == 0) {
        this.form[item.name] = item.value
      } else if (this.tab == 1) {
        this.password[item.name] = item.value
      }
    },
    async getUserProfile() {
      this.isLoading = true
      this.isLoaded = false
      if (Object.keys(this.fetchUserProfile).length) return
      await this.fetchUserProfile().then(response => {
        if (response) {
          this.form = response
        }
        this.isLoading = false
        this.isLoaded = true
      })
      this.isLoading = false
      this.isLoaded = true
    }
  },
  created() {
    this.getUserProfile()
  }
}
</script>

<style lang="scss" scoped>
// @import '@/assets/css/variables.scss/';

.profile-content {
  margin-top: 50px;
  margin-left: 25px;
  margin-right: 92px;
  padding-bottom: 60px;

  &__title {
    &__first {
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;

      color: #1f1f1f;
    }
    &__second {
      margin-top: 5px;
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;

      color: rgba(31, 31, 31, 0.5);
    }
  }

  &__form {
    margin-top: 30px;

    &__button {
      margin-top: 30px;

      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .form-button {
        justify-self: end;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 144px;
        height: 55px;
        border: none;
        cursor: pointer;

        background: #0d2f81;
        border-radius: 3px;
        text-align: center;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;
        color: $white;

        &:hover {
          background: $primary-dark-3x;
        }
        &:disabled {
          opacity: 0.5;
        }
      }

      .error-button {
        @extend .form-button;
        background: $bg-main-red;

        &:hover {
          background: #dc1915;
        }
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  /* For tablets: */
  .profile-content {
    margin-top: 25px;
    margin-left: 0;
    margin-right: 0;
    padding-bottom: 30px;
    padding: 10px;

    &__title {
      &__first {
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 1rem;
        line-height: 1.1rem;

        color: #1f1f1f;
      }
      &__second {
        margin-top: 5px;
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 0.9rem;
        line-height: 1rem;

        color: rgba(31, 31, 31, 0.5);
      }
    }

    &__form {
      margin-top: 30px;

      &__button {
        margin-top: 30px;

        width: 100%;
        display: grid;
        align-items: center;
        justify-content: flex-start;

        .form-button {
          justify-self: end;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 9rem;
          height: 3.4rem;
          border: none;
          cursor: pointer;

          background: #0d2f81;
          border-radius: 3px;
          text-align: center;
          font-weight: normal;
          font-size: 0.9rem;
          line-height: 1rem;
          color: $white;

          &:hover {
            background: $primary-dark-3x;
          }
          &:disabled {
            opacity: 0.5;
          }
        }
      }
    }
    .grid {
      &.col-2 {
        grid-template-columns: 1fr;
        grid-row-gap: 25px;
      }
    }
  }
}
</style>
