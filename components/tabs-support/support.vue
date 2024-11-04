<template>
  <div class="tabcontent supports">
    <div v-if="!isSend" class="supports-content --contact">
      <div class="contact-cover">
        <img src="@/assets/teknik-destek.png" alt="" class="pr-50" />
      </div>

      <div class="contact-content">
        <p class="title">Size Nasıl Yardımcı Olabiliriz?</p>
        <FormSupport @onSuccess="value => (isSend = value)"></FormSupport>
      </div>
    </div>
    <div v-if="isSend" class="supports-content --contact">
      <section>
        <div class="section-container flex center col">
          <img src="@/assets/svg/success.svg" />
          <h1>Bize ulaştığınız için teşekkür ederiz</h1>
          <p>
            24 saat içerisinde sizinle iletişime geçilecektir.
          </p>

          <div class="input-grid justify-content">
            <button @click="isSend = false" class="flat-button">
              YENİ MESAJ
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import FormSupport from './FormSupport'

export default {
  name: 'TabSupport',
  components: {
    FormSupport
  },
  data() {
    return {
      isSend: false
    }
  },
  methods: {}
}
</script>
