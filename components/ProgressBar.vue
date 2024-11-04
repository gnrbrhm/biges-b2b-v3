<template>
  <div class="wrapper" :style="{ width: barWidth + 'px' }">
    <div class="loading-bar">
      <div class="percentage" :style="{ width: percentage + '%' }"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percentage: {
      type: Number,
      required: true
    },
    barWidth: {
      type: Number,
      default: 300
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  border-radius: 20px;
  overflow: hidden;
  // border-bottom: 1px solid #ddd;
  // box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4), 0 -1px 1px #fff, 0 1px 0 #fff;
  background: rgba(31, 31, 31, 0.05);
  padding: 7px;

  .loading-bar {
    position: relative;
    border-radius: 20px;
    height: 10px;
    background: rgba(13, 47, 129, 0.7);
    .percentage {
      position: absolute;
      display: block;
      height: 100%;
      border-radius: 20px;
      background: #24ce95;
      background-size: 30px 30px;
    }
  }
}
</style>
