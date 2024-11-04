<template>
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    :height="opt.height"
    :fill="opt.fill"
    viewBox="0 0 100.000000 100.000000"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
      :fill="opt.fill"
      stroke="none"
    >
      <path
        d="M880 983 c-20 -14 -585 -558 -812 -782 -73 -73 -78 -89 -37 -136 25
-28 38 -35 60 -33 22 2 113 85 391 355 493 477 521 507 513 535 -9 28 -43 64
-70 72 -12 3 -31 -1 -45 -11z"
      />
      <path
        d="M114 971 c-105 -48 -126 -193 -39 -270 146 -128 349 81 221 227 -33
37 -80 62 -118 62 -13 0 -41 -9 -64 -19z"
      />
      <path
        d="M755 326 c-82 -37 -118 -139 -79 -222 49 -102 180 -120 257 -35 116
128 -21 327 -178 257z"
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
