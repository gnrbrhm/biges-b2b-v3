<template>
    <div class="partner-card">
      <div
        class="partner-card__img"
        :style="`background-image:url(${data.image})`"
      ></div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    },
  });
  </script>
  
  <style lang="scss" scoped>
  .partner-card {
    height: 126px;
    margin: 0 40px;
  
    &__img {
      height: 126px;
      width: 126px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    }
  }
  </style>
  