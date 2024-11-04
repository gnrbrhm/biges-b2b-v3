<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="opt.width"
    :height="opt.height"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M7.34424 7.90605L10.1222 5.12805"
      stroke="#0D2F81"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.1221 5.128L10.5007 2.628L12.6661 0.5L13.0007 2.24933L14.7501 2.584L12.6221 4.74933L10.1221 5.128Z"
      stroke="#0D2F81"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.0365 6.34203C14.3898 7.6814 14.306 9.09863 13.7973 10.387C13.2886 11.6754 12.3816 12.7676 11.2086 13.5044C10.0356 14.2411 8.65788 14.5839 7.27639 14.4826C5.8949 14.3814 4.58188 13.8415 3.5288 12.9416C2.47572 12.0417 1.73765 10.8289 1.42223 9.48013C1.10681 8.13133 1.23052 6.71703 1.77534 5.44348C2.32015 4.16992 3.25757 3.10372 4.45089 2.40034C5.64422 1.69697 7.03104 1.39321 8.40913 1.53336"
      stroke="#0D2F81"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M11.1479 7.158C11.3233 7.86513 11.2737 8.60935 11.006 9.28694C10.7383 9.96453 10.2658 10.5417 9.65452 10.938C9.0432 11.3344 8.32345 11.5301 7.59561 11.4979C6.86777 11.4658 6.1681 11.2073 5.59413 10.7586C5.02016 10.3099 4.60049 9.69327 4.39361 8.9947C4.18673 8.29614 4.20296 7.55044 4.44003 6.86154C4.67711 6.17264 5.12321 5.57487 5.71616 5.15156C6.30911 4.72824 7.01936 4.50047 7.74791 4.5"
      stroke="#0D2F81"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4.34424 13.5L3.84424 15.5"
      stroke="#0D2F81"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M11.3442 13.5L11.8442 15.5"
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