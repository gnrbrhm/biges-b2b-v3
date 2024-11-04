<template>
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    :width="opt.width"
    :height="opt.height"
    viewBox="0 0 100.000000 100.000000"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
      :fill="opt.fill"
      stroke="none"
    >
      <path
        d="M339 966 c-80 -28 -139 -67 -199 -132 -93 -100 -130 -195 -130 -334
0 -141 37 -235 133 -337 100 -106 209 -153 357 -153 103 0 185 22 261 71 53
33 134 116 166 169 85 139 85 361 0 500 -32 53 -113 136 -166 169 -116 74
-290 94 -422 47z m286 -18 c115 -28 242 -136 295 -250 84 -180 44 -395 -99
-531 -183 -175 -459 -175 -642 0 -186 177 -191 466 -12 654 118 124 285 170
458 127z"
      />
      <path
        d="M472 714 c-30 -21 -29 -59 3 -80 23 -15 27 -15 50 0 32 21 33 59 3
80 -12 9 -25 16 -28 16 -3 0 -16 -7 -28 -16z"
      />
      <path
        d="M472 568 c-8 -8 -12 -55 -12 -144 0 -107 3 -136 16 -148 8 -9 19 -16
24 -16 5 0 16 7 24 16 13 12 16 40 16 140 0 69 -5 134 -10 145 -12 21 -40 25
-58 7z"
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
