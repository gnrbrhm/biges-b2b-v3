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
            <nuxt-link
              v-for="(route, key) in routeList"
              :key="key"
              :to="key"
              exact
              :class="[
                route.class,
                { 'hover-active': key == viewedRoute && viewedComponent }
              ]"
            >
              <app-icon
                v-if="route.icon"
                name="magic"
                icon-color="transparent"
              />
              <span
                class="clickable-area"
                @touchstart="mouseover({ ...route, key })"
                @mouseover="mouseover({ ...route, key })"
                @click="closeHover"
              >
                {{ route.label }}
              </span>
            </nuxt-link>
          </div>
          <NavHoverMenu
            v-if="viewedComponent"
            @onClose="closeHover"
            :open="!!viewedComponent"
          >
            <components
              v-if="viewedComponent"
              @closeMenu="closeHover"
              :is="viewedComponent"
            ></components>
          </NavHoverMenu>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Icon from '@/components/Icon.vue'
import NavHoverMenu from '@/components/views/Nav/NavHoverMenu.vue'
import NavProducts from '@/components/views/Nav/NavProducts.vue'
import NavSolutions from '@/components/views/Nav/NavSolutions.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    appIcon: Icon,
    NavHoverMenu,
    NavProducts
  },
  data() {
    return {
      viewedRoute: null,
      viewedComponent: null,
      routes: {
        '/': {
          label: 'ANA SAYFA',
          class: 'navbar-item home-item'
        },
        '/size-ozel': {
          label: 'SİZE ÖZEL',
          class: 'navbar-item custom-item',
          icon: true
        },
        '/urunler': {
          label: 'ÜRÜNLER',
          class: 'navbar-item',
          component: NavProducts
        },
        '/cozumler': {
          label: 'ÇÖZÜMLER',
          class: 'navbar-item'
          // component: NavSolutions  --> kaldırılacak
        },
        '/blog': {
          label: 'BİGES BLOG',
          class: 'navbar-item'
        },
        '/kurumsal?menu=HAKKIMIZDA': {
          label: 'KURUMSAL',
          class: 'navbar-item'
        },
        '/destek': {
          label: 'DESTEK & GARANTİ',
          class: 'navbar-item'
        },
        '/iletisim': {
          label: 'İLETİŞİM',
          class: 'navbar-item'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    routeList() {
      if (!this.isAuthenticated) {
        delete this.routes['/size-ozel']
      }
      return this.routes
    }
  },
  methods: {
    closeHover() {
      this.viewedComponent = null
      this.viewedRoute = null
    },
    mouseover(route) {
      let { component, key } = route
      if (component) this.viewedComponent = component
      if (key) this.viewedRoute = key
    }
  }
}
</script>

<style lang="scss">
@import './components/styles/Nav/nav.scss';
</style>
