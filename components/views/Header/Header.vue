<template>
  <div class="header">
    <app-utility-bar />
    <div class="container">
      <div class="header-inner">
        <app-logo />
        <app-search />
        <app-user-navigation />
      </div>
    </div>
  </div>
</template>

<script>
import UtilityBar from './UtilityBar.vue'
import Search from './Search.vue'
import UserNavigation from './UserNavigation.vue'
import Logo from '../../../components/Logo.vue'

export default {
  components: {
    appUtilityBar: UtilityBar,
    appSearch: Search,
    appUserNavigation: UserNavigation,
    appLogo: Logo
  }
}
</script>

<style lang="scss">
@import './components/styles/Header/header.scss';
</style>
