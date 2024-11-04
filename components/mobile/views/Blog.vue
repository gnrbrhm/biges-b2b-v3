<template>
    <div class="article-wrapper">
      <div class="article-title flex space-between">
        <p>BLOG</p>
        <router-link to="/blog" class="flex align-center link-color">
          TÜM BLOG YAZILARI
          <Icon
            class="pl-5"
            name="KeyboardRightArrow"
            :options="{
              fill: '#001163',
              fillPath: '#001163',
              stroke: '#001163'
            }"
          />
        </router-link>
      </div>
      <div class="article-second-title">
        <router-link to="/blog">
          Haberler, Yeni Teknolojiler ve Başarı Hikayeleri
        </router-link>
      </div>
  
      <div class="pt-10">
        <swiper :options="swiperOption">
          <swiper-slide
            class="article-swipe"
            v-for="(article, index) in articles.slice(1, 4)"
            :key="index + article.title"
          >
            <img :src="article.thumbnail_image" :alt="article.title" />
  
            <div class="content">
              <div class="article-detail">
                <router-link
                  :to="`/blog?category_id=${article.category.id}`"
                  class="article-tag mr-10"
                >
                  #{{ article.tags[0] }}
                </router-link>
                <div class="article-date">
                  {{ article.published_at | formatDate }}
                </div>
              </div>
              <b
                class="pt-10"
                @click="$router.push(`/blog/${article.page_url}`)"
              >
                {{ article.title }}
              </b>
              <router-link class="pt-10" :to="`/blog/${article.page_url}`">
                <b>> Devamı</b>
              </router-link>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </template>
  
  <script>
  import Icon from '@/components/icons'
  import { dateFormatLL } from '@/utils/date'
  
  export default {
    components: { Icon },
    props: {
      articles: { type: Array, default: () => [] }
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 'auto',
          spaceBetween: 10,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    },
    methods: {
      formatDate(value) {
        if (value) {
          return dateFormatLL(String(value))
        }
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .article-wrapper {
    padding: 15px;
  
    .article-title {
      font-weight: 700;
      font-size: 12px;
      line-height: 19.36px;
      color: #1f1f1f;
      opacity: 0.5;
    }
  
    span {
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      line-height: 19px;
      color: rgba(31, 31, 31, 0.7);
    }
  
    .article-second-title {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #1f1f1f;
      padding: 10px 0;
  
      a {
        color: black;
      }
    }
  }
  
  .article-swipe {
    height: 300px;
    width: 90%;
    font-size: 0.8rem;
  
    img {
      height: 140px;
      width: 100%;
      object-fit: cover;
    }
  
    .content {
      overflow-y: auto;
      padding: 10px;
      display: flex;
      flex-direction: column;
  
      .article-detail {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
  
      .article-date {
        font-weight: bold;
        font-size: 12px;
        line-height: 15px;
        color: #1f1f1f;
        opacity: 0.5;
      }
  
      p {
        overflow-y: auto;
      }
  
      .article-tag {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 5px 10px;
        background: rgba(13, 47, 129, 0.1);
        font-weight: bold;
        font-size: 12px;
        line-height: 15px;
        color: #0d2f81;
      }
    }
  }
  
  .link-color {
    color: #001163;
  }
  </style>
  