<template>
  <svg
    version="1.1"
    id="katman_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 100 100"
    style="enable-background:new 0 0 100 100;"
    xml:space="preserve"
    :width="opt.width"
    :height="opt.height"
  >
    <g :fill="opt.fill">
      <path
        d="M96,64.5l-8.3-3.8l-5-13.1H64v-5.8l0.3-0.3c3.7-3.7,5.7-8.6,5.7-13.8c0-10.8-8.8-19.6-19.6-19.6s-19.6,8.8-19.6,19.6
		c0,2.6,0.5,5.1,1.5,7.5H5v48h11.1c1.1,3.1,4.1,5.3,7.5,5.3s6.4-2.2,7.5-5.3h38.6c1.1,3.1,4.1,5.3,7.5,5.3c3.5,0,6.4-2.2,7.5-5.3H96
		V64.5z M81.8,60h-7.1v-7.1h4.4L81.8,60z M50.5,13.4c7.8,0,14.2,6.4,14.2,14.2c0,3.8-1.5,7.4-4.2,10.1L50.5,47.7L40.4,37.7
		c-2.7-2.7-4.2-6.3-4.2-10.1C36.3,19.8,42.7,13.4,50.5,13.4L50.5,13.4z M10.3,40.4h25.4c0.3,0.4,0.6,0.7,1,1l13.8,13.8l8.2-8.2v30.6
		H31.2c-1.1-3.1-4.1-5.3-7.5-5.3s-6.4,2.2-7.5,5.3h-5.8L10.3,40.4z M23.7,83.1c-1.5,0-2.7-1.2-2.7-2.7s1.2-2.7,2.7-2.7
		c1.5,0,2.7,1.2,2.7,2.7S25.1,83.1,23.7,83.1z M77.3,83.1c-1.5,0-2.7-1.2-2.7-2.7s1.2-2.7,2.7-2.7S80,79,80,80.4
		S78.8,83.1,77.3,83.1z M90.7,77.8h-5.8c-1.1-3.1-4.1-5.3-7.5-5.3c-3.5,0-6.4,2.2-7.5,5.3H64V52.9h5.3v12.4H85l5.6,2.6L90.7,77.8z"
      />
      <path
        d="M50.5,36.5c4.9,0,8.9-4,8.9-8.9s-4-8.9-8.9-8.9s-8.9,4-8.9,8.9S45.6,36.5,50.5,36.5z M50.5,24.1c2,0,3.6,1.6,3.6,3.6
		s-1.6,3.6-3.6,3.6s-3.6-1.6-3.6-3.6S48.5,24.1,50.5,24.1z"
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
        width: '18',
        height: '18',
        ...this.options
      }
    }
  }
}
</script>

<style></style>
