<template>
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100.000000 100.000000"
    preserveAspectRatio="xMidYMid meet"
    :width="opt.width"
    :height="opt.height"
  >
    <g
      transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
      :fill="opt.fill"
      stroke="none"
    >
      <path
        d="M359 971 c-213 -68 -349 -251 -349 -471 0 -119 41 -231 115 -318 l37
-43 23 48 c28 62 66 106 124 145 25 17 48 33 50 34 2 2 -8 13 -22 24 -14 11
-38 45 -53 75 -54 111 -15 244 90 310 44 27 58 30 126 30 68 0 82 -3 126 -30
105 -66 144 -199 90 -310 -15 -30 -39 -64 -54 -75 -28 -23 -28 -24 29 -55 39
-21 98 -91 124 -146 l22 -49 36 39 c73 81 117 201 117 321 0 223 -142 410
-359 474 -72 21 -201 20 -272 -3z"
      />
      <path
        d="M443 739 c-75 -22 -133 -119 -118 -198 30 -161 241 -202 327 -63 31
51 31 133 0 184 -42 67 -132 101 -209 77z"
      />
      <path
        d="M413 312 c-90 -32 -149 -89 -178 -173 -8 -23 -15 -43 -15 -45 0 -2
21 -14 48 -28 149 -75 315 -75 465 1 53 27 54 29 15 110 -54 115 -212 179
-335 135z"
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
