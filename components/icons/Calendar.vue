<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="opt.width"
    :height="opt.height"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M14.5015 2.5H1.50146C0.94918 2.5 0.501465 2.94772 0.501465 3.5V14.5C0.501465 15.0523 0.94918 15.5 1.50146 15.5H14.5015C15.0538 15.5 15.5015 15.0523 15.5015 14.5V3.5C15.5015 2.94772 15.0538 2.5 14.5015 2.5Z"
      stroke="#0D2F81"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M0.501465 6.5H15.5015"
      stroke="#0D2F81"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4.50146 4V0.5"
      stroke="#0D2F81"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M11.5015 4V0.5"
      stroke="#0D2F81"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
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
        width: '16',
        height: '16',
        ...this.options
      }
    }
  }
}
</script>

<style>
</style>