<template>
    <div class="solution-wrapper">
      <div class="solution-title h-12 font-bold flex space-between">
        <p>ÇÖZÜMLER</p>
        <router-link to="/cozumler" class="flex align-center link-color">
          TÜM ÇÖZÜMLER
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
      <div class="solution-second-title">
        <router-link to="/cozumler">
          Güvenlik Teknolojileri Geliştiriyoruz.
        </router-link>
      </div>
  
      <div class="pt-10">
        <swiper :options="swiperOption">
          <swiper-slide
            class="solution-swipe"
            v-for="(solution, index) in solutions"
            :key="index + solution.title"
          >
            <img :src="solution.small_showcase_image" :alt="solution.title" />
            <div class="content">
              <b @click="$router.push(`/cozumler/${solution.page_url}`)">
                {{ solution.title }}
              </b>
              <div class="mt-10" v-html="solution.excerpt"></div>
              <router-link :to="`/cozumler/${solution.page_url}`">
                <b>> Devamı</b>
              </router-link>
            </div>
          </swiper-slide>
          <div class="solution-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
  </template>
  
  <script>
  import Icon from '@/components/icons'
  import { defineProps } from 'vue'
  
  export default {
    components: { Icon },
    props: {
      solutions: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 'auto',
          spaceBetween: 10,
          pagination: {
            el: '.solution-pagination',
            clickable: true
          }
        }
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .solution-pagination {
    position: unset !important;
    margin-top: 10px;
    text-align: center;
  }
  .solution-wrapper {
    background: #f5f7fa;
    padding: 15px;
  
    .solution-title {
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
  
    .solution-second-title {
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
  
  .solution-swipe {
    height: 400px;
    background: #fff;
    width: 90%;
    font-size: 0.8rem;
  
    img {
      height: 140px;
      object-fit: cover;
    }
  
    .content {
      overflow-y: auto;
      padding: 10px;
  
      p {
        overflow-y: auto;
      }
    }
  }
  .link-color {
    color: #001163;
  }
  </style>
  