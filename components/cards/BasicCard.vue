<template>
  <div class="flex row card-main">
    <div
      class="card-img"
      :style="`background-image:url(${imgUrl});min-width:${imgWidth};height:${imgHeight}`"
    ></div>
    <div class="flex col pl-15 pr-60 justify-center">
      <div class="h-18 font-500">{{ title }}</div>
      <div
        @click="$emit('handleClick')"
        class="flex row clickable mt-17 hd-12 font-bold"
      >
        <p style="color: rgba(31, 31, 31, 0.5); margin-right: 2px">
          {{ footerSymbol }}
        </p>
        {{ footer }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicCard',
  props: {
    imgWidth: { type: String, default: '140px' },
    imgHeight: { type: String, default: '120px' },
    imgUrl: { type: String, default: null },
    title: { type: String, default: null }
  },
  data() {
    return {
      footerSymbol: '>',
      footer: 'Devamı'
    }
  }
}
</script>

<style lang="scss" scoped>
.card-main {
  background: #ffffff;
}
.card-img {
  display: block;
  position: relative;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
</style>