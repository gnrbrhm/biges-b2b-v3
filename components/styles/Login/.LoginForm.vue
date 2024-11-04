<template>
  <div class="login-form">
    <h2 class="form-title is-size-3">Giriş Yap</h2>
    <div class="field">
      <p class="control">
        <input class="input" type="email" placeholder="E-posta adresi" />
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-right">
        <input class="input" type="password" placeholder="Parola" />
        <span class="icon is-right forgot-password">
          <app-icon name="question" icon-color="#1F1F1F" />
        </span>
      </p>
    </div>
    <label class="checkbox">
      <input type="checkbox" />
      <span class="custom-checkbox" />
      Beni Hatırla
    </label>
    <div class="field">
      <p class="control">
        <button
          class="button is-fullwidth is-capitalized has-text-white has-text-weight-light form-button"
        >
          GİRİŞ YAP
        </button>
      </p>
    </div>
    <div class="form-footer">
      <p class="has-text-dark">
        Hesabınız yok mu? <a href="#">Bayi başvurusu yapın</a>
      </p>
    </div>
  </div>
</template>

<script>
import Icon from '../../../components/Icon.vue'

export default {
  components: {
    appIcon: Icon
  }
}
</script>

<style lang="scss">
@import './components/styles/Login/login-form.scss';
</style>
