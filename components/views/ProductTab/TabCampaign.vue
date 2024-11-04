<template>
  <div class="main">
    <div class="column-1">
      <div
        class="video-image"
        :style="`
            background-image: url('${data.thumbnail_image}');
           `"
      ></div>
    </div>
    <div class="column-2">
      <div class="text-content">
        <strong class="video-head">{{ data.title }}</strong>
        <p class="video-text" v-html="data.excerpt"></p>
        <div class="text-content__footer">
          <p
            @click="clickMore"
            class="clickable"
            style="color: rgba(31, 31, 31, 0.5); margin-right: 2px"
          >
            {{ footerSymbol }}
          </p>
          <span @click="clickMore" class="clickable">
            {{ footer }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'TabCampaign',
  props: { data: { type: Object, default: () => {} } },
  data() {
    return {
      footerSymbol: '>',
      footer: ' Devamı'
    }
  },
  methods: {
    ...mapActions({
      fetchCampaignDetail: 'campaign/fetchCampaignDetail'
    }),
    clickMore() {
      // this.fetchCampaignDetail(this.data.page_url)
      if (this.data?.page_url)
        this.$router.push(`/kampanya/${this.data?.page_url}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 30px;
  width: 100%;
  display: grid;
  grid-template-columns: 160px 1fr;
  grid-column-gap: 20px;
}

.video-image {
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  width: 150px;
  height: 110px;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.text-content {
  margin-top: 1rem;

  .video-head {
    font-size: 18px;
    line-height: 22px;
  }
  .video-text {
    margin-top: 0.5rem;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: rgba(31, 31, 31, 0.8);
  }

  &__footer {
    align-self: flex-end;
    display: flex;
    flex-direction: row;
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 0.6rem;
    line-height: 1rem;

    color: $placeholder-input;
  }
}
</style>