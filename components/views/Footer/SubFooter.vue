<template>
  <div class="sub-footer">
    <div class="container">
      <div class="columns">
        <div class="column">
          <p class="copyright has-text-weight-bold has-text-grey">
            &copy; {{ year }} Biges Güvenli Hayat Teknolojileri A.Ş. - Her hakkı
            saklıdır.
          </p>
        </div>
        <div class="column">
          <p
            class="copyright has-text-weight-bold has-text-grey has-text-right clickable"
          >
            Biges <img src="@/assets/gesider.png" @click="goRoute" /> üyesidir.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    year() {
      return new Date().getFullYear()
    }
  },
  methods: {
    goRoute() {
      window.open('http://www.gesider.org', '_blank')
    }
  }
}
</script>
}

<style lang="scss">
@import './components/styles/Footer/sub-footer.scss';
</style>
