<template>
  <div
    class="blog-card"
    :style="
      this.$route.name == 'kampanya' ? `grid-template-columns: 530px 1fr` : ``
    "
  >
    <div
      class="blog-card-img"
      :style="
        this.$route.name == 'kampanya'
          ? `background-image:url(${data.thumbnail_image});background-size: contain;width:500px;height:240px; margin-left:30px;`
          : `background-image:url(${data.thumbnail_image});background-size: cover;`
      "
    ></div>
    <div class="blog-card__right">
      <div v-if="this.$route.name != 'kampanya'" class="blog-card__right__tag">
        <div
          :class="
            `blog-card__right__tag__left ${data.tags.length > 1 && 'mr-5'}`
          "
          v-show="data.tags.length > 0"
          v-for="(tag, index) in data.tags"
          :key="tag + '-' + index"
        >
          #{{ tag }}
        </div>
        <div
          :class="
            `blog-card__right__tag__right ${data.tags.length > 0 && 'ml-15'}`
          "
        >
          {{ data.published_at | formatDate }}
        </div>
      </div>
      <div class="content">
        <div
          class="font-600 h-20 mb-15 clickable"
          @click="$router.push(`/${$route.name}/${data.page_url}`)"
        >
          {{ data.title }}
        </div>
        <div class="font-normal h-16 mb-45 innHtml" v-html="data.excerpt"></div>
        <div
          @click="$router.push(`/${$route.name}/${data.page_url}`)"
          class="content__footer"
        >
          <p style="color: rgba(31, 31, 31, 0.5); margin-right: 2px">
            {{ footerSymbol }}
          </p>
          {{ footer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormatLL } from '@/utils/date'

export default {
  name: 'BlogPageCard',
  props: {
    data: { type: Object, default: () => {} }
  },
  filters: {
    formatDate(value) {
      if (value) {
        return dateFormatLL(String(value))
      }
    }
  },
  data() {
    return {
      footerSymbol: '>',
      footer: 'Devamı'
    }
  },
  created() {
    console.log('Created', this.$route.name)
  }
}
</script>
<style lang="scss" scoped>
// @import '@/assets/css/variables.scss/';

.blog-card {
  width: 100%;
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-column-gap: 40px;
  background: $white;

  .blog-card-img {
    width: 400px;
    height: 240px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  &__right {
    height: 240px;
    padding-top: 45px;
    overflow: auto;

    &__tag {
      display: flex;
      flex-direction: row;
      margin-bottom: 15px;
      height: 24px;

      &__left {
        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        line-height: 15px;
        padding: 0.3rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;

        /* Biges Blue */
        background: $bg-button-normal;

        color: $bg-button;
      }
      &__right {
        padding: 0.3rem 0;
        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        line-height: 15px;
        color: $grey-darker;
      }
    }
    .content {
      .innHtml {
        max-width: 620px;
        max-height: 50px;
      }
      &__footer {
        cursor: pointer;
        align-self: flex-end;
        display: flex;
        flex-direction: row;
        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        line-height: 15px;

        color: $placeholder-input;
      }
    }
  }
}

@media (max-width: 768px) {
  .blog-card {
    grid-template-columns: 1fr;
    height: auto;

    .blog-card-img {
      width: 100%;
      height: 150px;
    }

    &__right {
      height: 100%;
      padding: 15px;
    }
  }
}
</style>
