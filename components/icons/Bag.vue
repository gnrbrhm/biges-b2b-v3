<template>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    id="katman_1"
    x="0px"
    :stroke="opt.stroke"
    :fill="opt.fill"
    stroke-opacity= "0.5"
    stroke-width="1.5"
    :width="opt.width"
    :height="opt.height"
    viewBox="0 0 100 100"
  >
    <g>
      <path
        d="M86.1,80.6c0,1.9-1.5,3.4-3.4,3.4h-3.4v3.4c0,1.9-1.5,3.4-3.4,3.4s-3.4-1.5-3.4-3.4v-3.4h-3.4c-1.9,0-3.4-1.5-3.4-3.4   s1.5-3.4,3.4-3.4h3.4v-3.4c0-1.9,1.5-3.4,3.4-3.4s3.4,1.5,3.4,3.4v3.4h3.4C84.6,77.2,86.1,78.7,86.1,80.6z M86.1,27.7v32.5   c0,1.9-1.5,3.4-3.4,3.4s-3.4-1.5-3.4-3.4V31.1h-6.8v10.2c0,1.9-1.5,3.4-3.4,3.4s-3.4-1.5-3.4-3.4V31.1H33.3v10.2   c0,1.9-1.5,3.4-3.4,3.4s-3.4-1.5-3.4-3.4V31.1h-6.8v52.8h35.9c1.9,0,3.4,1.5,3.4,3.4s-1.5,3.4-3.4,3.4H16.3c-1.9,0-3.4-1.5-3.4-3.4   V27.7c0-1.9,1.5-3.4,3.4-3.4h10.3C28,12.9,37.7,4,49.5,4S71,12.9,72.4,24.3h10.3C84.6,24.3,86.1,25.8,86.1,27.7z M65.5,24.3   c-1.3-7.7-8-13.5-16-13.5s-14.7,5.9-16,13.5H65.5z"
      />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    opt() {
      return {
        width: '23',
        height: '23',
        fill: '#4A4A4A',
        stroke: '#4A4A4A',
        ...this.options
      }
    }
  }
}
</script>

<style></style>
