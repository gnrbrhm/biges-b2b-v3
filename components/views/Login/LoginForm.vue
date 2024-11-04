<template>
  <div class="login-form">
    <h2 class="form-title is-size-3">Bayi Girişi Yapın</h2>
    <p v-if="error" style="color: red">
      {{ error }}
    </p>
    <form v-loading-biges="{ loading: isLoading }" @submit.prevent="login">
      <div class="field">
        <p class="control">
          <input
            v-model="email"
            class="input"
            type="email"
            placeholder="E-Posta Adresiniz"
          />
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-right">
          <input
            v-model="password"
            class="input"
            type="password"
            placeholder="Parolanız"
          />
          <!-- <span class="icon is-right forgot-password">
            <app-icon name="question" icon-color="#1F1F1F" />
          </span> -->
        </p>
      </div>

      <div class="flex row space-between align-center">
        <!-- <label class="custom-checkbox">
          Beni hatırla
          <input type="checkbox" />
          <span class="checkmark" />
        </label> -->

        <Checkbox @onChange="checkForm">
          <template #text>
            <span class="remember-me">Beni Hatırla</span>
          </template>
        </Checkbox>

        <label class="custom-checkbox">
          <nuxt-link to="/reset" class="is-size-7">Parolamı unuttum</nuxt-link>
          <span class="checkmark" />
        </label>
      </div>

      <div class="field">
        <p class="control">
          <input
            type="submit"
            value="GİRİŞ YAP"
            class="button is-fullwidth is-capitalized has-text-white has-text-weight-light form-button"
          />
        </p>
      </div>
    </form>
    <div class="form-footer">
      <p class="has-text-dark">
        Hesabınız yok mu?
        <nuxt-link to="/kayit"> Bayilik Başvurusu Yapın </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import Icon from '../../../components/Icon.vue'
import Checkbox from '@/components/common/Checkbox'
export default {
  components: {
    appIcon: Icon,
    Checkbox
  },
  data() {
    return {
      isLoading: false,
      email: '',
      password: '',
      error: null,
      rememberMe: false
    }
  },
  methods: {
    checkForm(item) {
      this.rememberMe = item.isChecked
    },
    async login() {
      this.error = null
      this.isLoading = true
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })

        if (this.$route?.query?.next) {
          const queries = this.$route.query
          const filters = queries?.filter || ''

          if (Array.isArray(filters)) {
            delete queries.filter

            const url = new URLSearchParams(queries).toString()

            const splitUrl = url.split('next=')[1]
            const replaceUrl = splitUrl.replace(/&/, '?')

            const filterUrl = new URLSearchParams(
              filters.map(f => ['filter', f])
            ).toString()

            this.$router.push(`/${replaceUrl}&${filterUrl}`)
            return
          }

          let url = new URLSearchParams(queries).toString()

          url = url.split('next=')[1]
          url = url.replace(/&/, '?')

          // detay sayfalarında / işareti kaybolduğundan replace ediyoruz
          if (url.includes('%2F')) {
            url = url.replace('%2F', '/')
          }

          this.$router.push(`/${url}`)
        } else {
          this.$router.push('/')
        }
      } catch (e) {
        if (e)
          this.error =
            e.response?.data?.message || 'Mail adresiniz veya şifreniz hatalı!'
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss">
@import './components/styles/Login/login-form.scss';
</style>
