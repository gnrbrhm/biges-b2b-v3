<template>
    <div class="partner-content-mobile">
      <div class="partner-content-mobile__header">
        <div
          @click="clickReference"
          class="partner-content-mobile__header__ref"
          :class="{ active: activeHeader === 1 }"
        >
          REFERANSLARIMIZ
        </div>
        <div
          @click="clickPartner"
          class="partner-content-mobile__header__partner"
          :class="{ active: activeHeader === 0 }"
        >
          MARKALARIMIZ
        </div>
      </div>
      <div class="partner-content-mobile__slider">
        <div
          v-if="activeHeader === 0"
          class="partner-content-mobile__slider__item"
          v-for="(item, index) in getPartnerList"
          :key="`partner-${index}`"
          :style="{ backgroundImage: `url(${item.image})` }"
        ></div>
  
        <div
          v-if="activeHeader === 1"
          class="partner-content-mobile__slider__item"
          v-for="(item, index) in getReferenceList"
          :key="`reference-${index}`"
          :style="{ backgroundImage: `url(${item.image})` }"
        ></div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex'
  
  export default {
    name: 'PartnerContentMobile',
    data() {
      return {
        activeHeader: 1
      }
    },
    computed: {
      ...mapGetters({
        getPartnerList: 'b2c/getPartnerList',
        getReferenceList: 'b2c/getReferenceList'
      })
    },
    methods: {
      ...mapActions({
        getReferences: 'b2c/getReferences',
        getPartners: 'b2c/getPartners'
      }),
      async clickPartner() {
        await this.getPartners()
        this.activeHeader = 0
      },
      async clickReference() {
        await this.getReferences()
        this.activeHeader = 1
      }
    },
    mounted() {
      this.clickReference()
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .partner-content-mobile {
    border-top: 1px solid rgba(31, 31, 31, 0.1);
    top: -20px;
    position: relative;
    height: 220px;
  
    &__header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 50px;
      padding: 20px 0;
  
      .active {
        font-family: Inter, sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #1f1f1f;
        position: relative;
      }
  
      .active::after {
        content: '';
        width: 70px;
        height: 1px;
        position: absolute;
        border: 1px solid #1f1f1f;
        top: 27px;
        left: 50%;
        transform: translateX(-50%);
      }
  
      &__partner,
      &__ref {
        cursor: pointer;
        justify-self: center;
        font-family: Inter, sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: rgba(31, 31, 31, 0.5);
      }
    }
  
    &__slider {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      padding: 10px 15px 0;
      overflow-y: auto;
      height: 180px;
  
      &__item {
        height: 70px;
        border: 1px solid rgba(31, 31, 31, 0.1);
        box-sizing: border-box;
        border-radius: 3px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
    }
  }
  </style>
  