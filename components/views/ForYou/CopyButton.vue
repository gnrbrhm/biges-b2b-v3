<template>
  <div class="url-wrapper">
    <!-- <span> {{ text }} </span> -->
    <input type="text" :value="text" readonly id="copyInput" />
    <div
      v-if="text"
      class="url-wrapper__icon"
      @click="copyTextToClipboard(text)"
    >
      <app-icon v-tooltip="'Kopyala'" name="copy" />
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  components: {
    appIcon: Icon
  },
  props: { text: { type: String, default: '' } },
  methods: {
    copyTextToClipboard(text) {
      try {
        var copyText = document.querySelector('#copyInput')
        copyText.select()

        document.execCommand('copy')

        this.$notify({
          type: 'success',
          text: copyText.value + ' Kopyalandı!',
          title: 'Bilgi',
          duration: 3000
        })
      } catch (error) {
        console.error('Async: Could not copy text: ', error)
        this.$notify({
          type: 'error',
          text: text + ' Kopyalanamadı!',
          title: 'İşlem Başarısız!',
          duration: 3000
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#copyInput {
  border: none;
  width: 100%;
}
.url-wrapper {
  display: flex;
  justify-content: space-between;

  &__icon {
    cursor: pointer;
  }
}
</style>
