<template>
    <div class="footer-card">
      <div
        class="img-div"
        :style="`background-image:url(${data.small_showcase_image})`"
      ></div>
      <div class="content">
        <div
          class="content__first clickable"
          @click="navigateToSolution(data.page_url)"
        >
          {{ data.title }}
        </div>
        <div class="content__second" v-html="data.excerpt"></div>
        <div
          @click="navigateToSolution(data.page_url)"
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
  import { useRouter } from 'vue-router'
  
  // Props tanımlama
  const props = defineProps({
    data: {
      type: Object,
      default: () => ({})
    }
  })
  
  // Router ile gezinme
  const router = useRouter()
  
  const footerSymbol = '>'
  const footer = 'Devamı'
  
  // Sayfaya gitme fonksiyonu
  const navigateToSolution = (pageUrl) => {
    router.push(`/cozumler/${pageUrl}`)
  }
  </script>
  
  <style lang="scss" scoped>
  .footer-card {
    background-color: $white;
    display: grid;
    height: 380px;
    width: 100%;
    grid-template-rows: 180px 200px;
  
    .img-div {
      height: 180px;
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
  
      &__first {
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        color: $black;
      }
  
      &__second {
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        color: $text-dark-grey;
        max-width: 100%;
        max-height: 67px;
  
        p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;
          font-family: Inter;
          font-size: 16px;
          font-weight: 400;
          line-height: 19.36px;
          text-align: left;
        }
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
        cursor: pointer;
      }
    }
  }
  </style>
  