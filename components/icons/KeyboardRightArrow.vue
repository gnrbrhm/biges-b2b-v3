<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="opt.width"
    :height="opt.height"
    viewBox="0 0 20 20"
    :fill="opt.fill"
  >
    <g clip-path="url(#clip1)">
      <path
        d="M19.375 10.4141H0.625"
        :stroke="opt.stroke"
        stroke-opacity="0.5"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.25 13.5391L19.375 10.4141L16.25 7.28906"
        :stroke="opt.stroke"
        stroke-opacity="0.5"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip1">
        <rect :width="opt.width" :height="opt.height" fill="white" />
      </clipPath>
    </defs>
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
        width: '20',
        height: '20',
        stroke: '#1F1F1F',
        fill: 'none',
        fillPath: 'none',
        ...this.options
      }
    }
  }
}
</script>

<style>
</style>