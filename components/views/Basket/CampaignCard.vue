<template>
  <div class="campaign-card" :class="isActive ? 'active_cc' : ''">
    <div class="campaign-card__content flex col p-20" @click="$emit('onClick')">
      <div class="campaign-card__content__first">
        <div class="flex row space-between">
          <span
            :class="
              isActive
                ? 'svg_discover_campaign_active'
                : 'svg_discover_campaign'
            "
          >
            <div v-html="getSvg(basketContent.svg_icon)"></div>
          </span>
          <span v-if="item.products.length">
            <p :class="isActive ? 'active-win' : 'win-tag'">KAZANDIN</p>
          </span>
          <span v-else>
            <p :class="isActive ? 'active-lose' : 'lose-tag'">KAZANAMADIN</p>
          </span>
        </div>
        <div :class="isActive ? 'mt-20' : ' mt-20'">
          {{ basketContent.title }}
        </div>
        <p
          class="h-14 font-normal mt-10"
          :style="isActive ? 'color:#0d2f81 !important' : ''"
          v-html="basketContent.body"
        ></p>
      </div>
      <div>
        <span v-if="item.products.length" class="flex row"
          >>
          <p
            @click="getPage('/kampanya/' + item.page_url.page_url)"
            :style="isActive ? 'color:#0d2f81 !important;' : ''"
            style="font-weight: 600"
            class="ml-5 clickable"
          >
            Kullan
          </p></span
        >
        <span v-else class="flex row"
          >>
          <p
            @click="getPage('/kampanya/' + item.page_url.page_url)"
            :style="isActive ? 'color:#0d2f81 !important;' : ''"
            style="font-weight: 600"
            class="ml-5 clickable"
          >
            Nasıl Kazanırım?
          </p></span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, default: () => {} },
    isActive: { type: Boolean, default: false }
  },
  computed: {
    basketContent() {
      return this.item?.basket_content
    },
    pageUrl() {
      return this.item?.campaign_article?.page_url.page_url
    }
  },
  methods: {
    getSvg(img) {
      if (img) {
        return atob(img)
      }
      return ''
    },
    getPage(url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<style lang="scss">
.svg_discover_campaign {
  svg {
    width: 20px !important;
    height: 20px !important;
    max-width: 35px !important;
    max-height: 22px !important;
  }
}
.svg_discover_campaign_active {
  svg {
    width: 20px !important;
    height: 20px !important;
    max-width: 35px !important;
    max-height: 22px !important;
  }
  path {
    fill: #0d2f81 !important;
  }
}
.campaign-card {
  min-width: 404px;
  height: 198px;
  &__content {
    height: 198px;
    &__first {
      height: 180px;
    }
  }
}
.win-tag {
  padding: 5px 7px;
  border-radius: 3px;
  background: rgba(36, 206, 149, 0.05);
  font-size: 12px;
  line-height: 15px;
  color: #24ce95;
  letter-spacing: 0.3px;
}
.active_cc {
  background: #f3f5f9;

  border: 2px solid #0d2f81 !important;
  box-sizing: border-box;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  color: #0d2f81 !important;
}
.active-win {
  padding: 5px 7px;
  border-radius: 3px;
  font-size: 12px;
  letter-spacing: 0.3px;
  line-height: 15px;
  background: #4caf50;
  color: #ffffff;
}
.active-lose {
  background: #f71e3f;
  border-radius: 3px;
  color: #ffffff;
  padding: 5px 7px;
  font-size: 12px;
  line-height: 15px;
  font-weight: 600;
  letter-spacing: 0.3px;
}
.lose-tag {
  padding: 5px 7px;
  background: rgba(247, 30, 63, 0.05);
  border-radius: 3px;
  font-size: 12px;
  line-height: 15px;
  font-weight: 600;
  color: #f71e3f;
  letter-spacing: 0.3px;
}
</style>
