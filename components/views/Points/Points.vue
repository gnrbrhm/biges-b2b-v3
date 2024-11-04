<template>
  <div class="container">
    <div class="points">
      <app-point :percentage="35" />
      <app-point :percentage="45" :name="name" :desc="desc" />
    </div>
  </div>
</template>

<script>
import Point from './Point.vue'

export default {
  components: {
    appPoint: Point
  },
  data: () => {
    return {
      name: 'partner',
      desc: 'Bir Sonraki Statü İçin Gereken Puan'
    }
  }
}
</script>

<style scoped lang="scss">
@import './components/styles/Points/points.scss';
</style>
