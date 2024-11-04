<template>
    <div class="footer-card">
      <div
        class="img-div"
        :style="`background-image:url(${data.thumbnail_image})`"
      >
        <div>
          <div class="img-div__tag">
            <div
              class="img-div__tag__left clickable"
              @click="$router.push(`/blog?category_id=${data.category.id}`)"
            >
              #{{ data.tags ? data.tags[0] : '' }}
            </div>
            <div class="img-div__tag__right">
              {{ formattedDate }}
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div
          class="content__first clickable"
          @click="$emit('onClick', data.page_url)"
        >
          {{ data.title }}
        </div>
        <div
          @click="$emit('onClick', data.page_url)"
          class="content__footer clickable"
        >
          <p style="color: rgba(31, 31, 31, 0.5); margin-right: 2px">
            {{ footerSymbol }}
          </p>
          {{ footer }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { dateFormatLL } from '@/utils/date'
  
  const props = defineProps({
    data: { type: Object, default: () => ({}) }
  })
  
  // Formatlı tarihi computed içinde hesaplıyoruz.
  const formattedDate = computed(() => {
    if (props.data.published_at) {
      return dateFormatLL(String(props.data.published_at))
    }
    return ''
  })
  
  // Sabit footer sembolü ve metni.
  const footerSymbol = '>'
  const footer = 'Devamı'
  </script>
  
  <style lang="scss" scoped>
  .footer-card {
    background-color: $white;
  
    display: grid;
    height: 350px;
    width: 100%;
    grid-template-rows: 250px 100px;
  
    .img-div {
      height: 250px;
      width: 100%;
      position: relative;
      display: block;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
  
      &__tag {
        position: absolute;
        z-index: 10;
        display: flex;
        flex-direction: row;
        background-color: white;
        bottom: 0;
        width: auto;
        padding: 0.5rem;
  
        &__left {
          font-family: Inter;
          font-style: normal;
          font-weight: bold;
          font-size: 12px;
          line-height: 15px;
          padding: 0.3rem;
          padding-left: 0.5rem;
          padding-right: 0.5rem;
  
          background: rgba(13, 47, 129, 0.1);
          color: #0d2f81;
        }
  
        &__right {
          padding: 0.3rem;
          margin-left: 10px;
          font-family: Inter;
          font-style: normal;
          font-weight: bold;
          font-size: 12px;
          line-height: 15px;
          color: rgba(31, 31, 31, 0.5);
        }
      }
    }
  
    .content {
      padding-top: 20px;
  
      &__first {
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        color: $black;
        margin-bottom: 25px;
      }
  
      &__footer {
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
  </style>
  