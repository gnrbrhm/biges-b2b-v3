<template>
  <footer class="footer">
    <app-main-footer />
    <app-sub-footer />
  </footer>
</template>

<script>
import MainFooter from './MainFooter.vue'
import SubFooter from './SubFooter.vue'

export default {
  components: {
    appMainFooter: MainFooter,
    appSubFooter: SubFooter
  }
}
</script>

<style lang="scss">
@import './components/styles/Footer/footer.scss';
</style>
