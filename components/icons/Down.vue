<template>
  <svg
    width="22"
    height="12"
    viewBox="0 0 22 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 1L11.4711 10.7991C11.4093 10.8628 11.3358 10.9133 11.255 10.9478C11.1742 10.9823 11.0875 11 11 11C10.9125 11 10.8258 10.9823 10.745 10.9478C10.6642 10.9133 10.5907 10.8628 10.5289 10.7991L1 1"
      stroke="#1F1F1F"
      stroke-opacity="0.5"
      stroke-width="1.5"
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
      default: () => {
        return {
          width: '22',
          height: '12',
          pathFill: '#0D2F81'
        }
      }
    }
  }
}
</script>

<style>
</style>