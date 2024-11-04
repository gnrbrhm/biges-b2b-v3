<template>
  <nav class="nav" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="main-menu">
        <a
          role="button"
          class="navbar-burger main-burger"
          data-target="navMenu"
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
        <div id="navMenu" class="navbar-menu">
          <div class="navbar-start">
            <nuxt-link to="/" class="navbar-item">
              ANA SAYFA
            </nuxt-link>
            <a class="navbar-item custom-item">
              <app-icon name="magic" icon-color="transparent" />
              SİZE ÖZEL
            </a>
            <nuxt-link to="/urunler" class="navbar-item">
              ÜRÜNLER
            </nuxt-link>
            <a class="navbar-item">
              ÇÖZÜMLER
            </a>
            <a class="navbar-item">
              BİGES BLOG
            </a>
            <a class="navbar-item">
              KURUMSsAL
            </a>
            <a class="navbar-item">
              DESTEK & GARANTİ
            </a>
            <a class="navbar-item">
              İLETİŞİM
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
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
@import './components/styles/Nav/nav.scss';
</style>
