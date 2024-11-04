<template>
  <svg
    width="22"
    height="12"
    viewBox="0 0 22 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 11L10.5289 1.2009C10.5907 1.13721 10.6642 1.08669 10.745 1.05222C10.8258 1.01774 10.9125 1 11 1C11.0875 1 11.1742 1.01774 11.255 1.05222C11.3358 1.08669 11.4093 1.13721 11.4711 1.2009L21 11"
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
          width: '20',
          height: '10',
          pathFill: '#0D2F81'
        }
      }
    }
  }
}
</script>

<style>
</style>