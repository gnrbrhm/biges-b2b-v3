<template>
  <div @click="clickMore" class="campaign-card clickable">
    <div
      class="img-div"
      :style="`background-image:url(${data.thumbnail_image})`"
    ></div>
    <div class="content">
      <div class="h-16 font-600">{{ data.title }}</div>
      <div class="h-14 font-500" v-html="data.excerpt"></div>
      <div class="content__footer">
        <span class="clickable flex row">
          <p style="color: rgba(31, 31, 31, 0.5); margin-right: 2px">
            {{ footerSymbol }}
          </p>
          {{ footer }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CampaignCard',
  props: {
    data: { type: Object, default: () => {} }
  },
  data() {
    return {
      footerSymbol: '>',
      footer: 'Devamı'
    }
  },
  methods: {
    ...mapActions({
      fetchCampaignDetail: 'campaign/fetchCampaignDetail'
    }),
    clickMore() {
      if (this.data.page_url) {
        this.$router.push(`/kampanya/${this.data.page_url}`)
      } else {
        this.$notify({
          type: 'warn',
          title: 'Bilgilendirme',
          text: `Sayfa Bulunamadı`,
          duration: 5000
        })
      }
      // this.fetchCampaignDetail(this.data.page_url)
    }
  }
}
</script>

<style lang="scss">
// @import '../../../assets/css/variables.scss/';

.campaign-card {
  background-color: $white;
  margin: 0.5rem;
  display: grid;
  min-height: 320px;
  width: 100%;
  grid-template-rows: 160px 160px;
  border: 1px solid rgba(31, 31, 31, 0.1);

  .img-div {
    height: 160px;
    width: 100%;
    position: relative;
    display: block;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  .content {
    padding: 1rem;
    padding-top: 1.4rem;
    display: grid;
    grid-template-rows: 1fr 2fr 1rem;
    grid-row-gap: 0.3rem;

    &__footer {
      align-self: flex-end;
      display: flex;
      flex-direction: row;
      font-family: Inter;
      font-style: normal;
      font-weight: bold;
      font-size: 12px;
      line-height: 1rem;

      color: $placeholder-input;
    }
  }
}
</style>
