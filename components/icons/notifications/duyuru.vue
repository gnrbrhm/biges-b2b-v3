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
        d="M630 982 c0 -5 19 -13 43 -16 59 -9 136 -48 174 -87 37 -40 69 -107
79 -167 4 -23 11 -42 16 -42 14 0 0 86 -22 136 -26 60 -84 120 -143 148 -57
27 -147 45 -147 28z"
      />
      <path
        d="M364 898 c-36 -38 -51 -71 -119 -258 -78 -214 -78 -215 -141 -281
-69 -72 -84 -113 -64 -173 6 -19 27 -49 46 -66 29 -25 43 -30 89 -30 43 0 59
5 85 26 l31 26 68 -66 c78 -75 102 -81 151 -39 l32 26 -78 78 c-43 43 -75 81
-73 84 3 3 98 39 210 81 178 66 209 80 247 117 l42 42 -237 237 c-131 131
-240 238 -243 238 -3 0 -24 -19 -46 -42z m274 -211 l223 -223 -29 -27 -28 -27
-224 225 -224 224 24 26 c13 14 26 25 29 25 4 0 106 -100 229 -223z m142 -287
c0 -3 -93 -39 -208 -82 l-207 -76 -89 88 -89 88 73 199 c40 109 75 204 78 211
3 9 86 -68 223 -204 121 -121 219 -221 219 -224z m-497 -230 c-56 -55 -65 -60
-106 -60 -55 0 -100 33 -117 84 -16 50 -3 85 59 149 l55 58 85 -86 86 -86 -62
-59z m156 -34 l73 -74 -25 -17 c-35 -23 -53 -15 -122 55 l-59 60 24 25 c13 14
26 25 29 25 4 0 40 -33 80 -74z"
      />
      <path
        d="M630 881 c0 -5 17 -11 38 -15 76 -12 146 -82 158 -158 6 -37 24 -54
24 -22 0 42 -28 102 -65 139 -47 47 -155 86 -155 56z"
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
