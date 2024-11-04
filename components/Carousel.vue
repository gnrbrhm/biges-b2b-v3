<template>
    <div class="carousel">
      <button @click="previousSlide" class="carousel-control prev">‹</button>
      <div class="carousel-slides">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          :class="['slide', { active: currentIndex === index }]"
        >
          <img :src="slide.image" :alt="slide.caption">
          <div class="caption">{{ slide.caption }}</div>
        </div>
      </div>
      <button @click="nextSlide" class="carousel-control next">›</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  // Props
  const props = defineProps({
    slides: {
      type: Array,
      required: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    }
  })
  
  // Reactive state
  const currentIndex = ref(0)
  let intervalId = null
  
  // Methods
  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % props.slides.length
  }
  
  const previousSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + props.slides.length) % props.slides.length
  }
  
  // AutoPlay
  const startAutoPlay = () => {
    if (props.autoPlay) {
      intervalId = setInterval(nextSlide, props.interval)
    }
  }
  
  const stopAutoPlay = () => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  }
  
  // Lifecycle hooks
  onMounted(() => {
    startAutoPlay()
  })
  
  onUnmounted(() => {
    stopAutoPlay()
  })
  </script>
  
  <style scoped>
  .carousel {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 400px;
  }
  
  .carousel-slides {
    display: flex;
    transition: transform 0.5s ease-in-out;
    transform: translateX(-100%);
  }
  
  .slide {
    min-width: 100%;
    box-sizing: border-box;
    transition: opacity 0.5s ease-in-out;
    opacity: 0;
  }
  
  .slide.active {
    opacity: 1;
  }
  
  .carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    z-index: 10;
  }
  
  .prev {
    left: 10px;
  }
  
  .next {
    right: 10px;
  }
  
  .caption {
    position: absolute;
    bottom: 20px;
    left: 20px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px;
    border-radius: 5px;
  }
  </style>
  