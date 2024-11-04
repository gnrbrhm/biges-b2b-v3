<template>
  <TabMenu :tab="tab" :is-header="false" :is-loading="isLoading">
    <div class="track-content">
      <div
        :class="
          getLayout == 'mobile'
            ? 'mt-35 mb-35 ml-10 mr-10'
            : 'mt-35 mb-35 ml-25 mr-25'
        "
      >
        <h1 class="h-20 font-normal">Kargo Takip</h1>
        <p class="hl-16 font-normal mt-7">
          Lütfen e-irsaliye numaranızı giriniz.
        </p>
        <div :class="getLayout == 'mobile' ? 'mt-10' : 'mt-20'">
          <SearchInput
            :is-icon="false"
            button-text="Sorgula"
            placeholder="BD02024000000000"
            @search="search"
          ></SearchInput>
        </div>
        <div v-if="isWarn" class="mt-10 warn h-18 p-10 font-500">
          Adınıza kayıtlı böyle bir irsaliye bulunamadı.
        </div>
      </div>
    </div>
    <Modal :is-active="modalActive" width="80%" height="80%">
      <div class="flex col height-100">
        <div class="flex row-reverse clickable" @click="modalActive = false">
          <Icon name="close-lg" />
        </div>
        <div class="mt-10 height-100">
          <iframe
            :src="followUrl"
            title="Biges"
            width="100%"
            frameborder="0"
            allowfullscreen
            style="height: 100%"
          ></iframe>
        </div>
      </div>
    </Modal>
  </TabMenu>
</template>

<script>
import TabMenu from '@/components/views/ForYou/TabMenu'
import SearchInput from '@/components/common/SearchInput'
import Icon from '@/components/Icon'
import Modal from '@/components/common/Modal'
import { mapGetters } from 'vuex'

export default {
  components: { TabMenu, SearchInput, Icon, Modal },
  props: {
    tab: { type: Number, default: 0 }
  },
  data() {
    return {
      modalActive: false,
      isLoading: false,
      followUrl: '',
      isWarn: false
    }
  },
  computed: {
    ...mapGetters(['getLayout'])
  },
  methods: {
    async search(value) {
      try {
        let { data } = await this.$axios({
          method: 'GET',
          url: `for_you/cargo-information/${value}`
        })
        if (data) {
          this.isWarn = false
          this.followUrl = data.follow_url
          this.modalActive = true
        } else {
          this.isWarn = true
        }
      } catch (error) {
        this.isWarn = true

        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.track-content {
  min-height: 600px;
}
.warn {
  background: rgba(218, 41, 28, 0.1);
  border-radius: 3px;
  color: #da291c;
  font-size: 1rem;

  line-height: 17px;
}
</style>
