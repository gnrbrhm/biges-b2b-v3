<template>
  <svg
    width="20"
    height="23"
    viewBox="0 0 20 23"
    xmlns="http://www.w3.org/2000/svg"
    :fill="opt.fill"
    :class="opt.class"
  >
    <g clip-path="url(#clip0_1_528)">
      <path d="M3.33333 14.7396L10 18.4224V22.1053L0 16.581L3.33333 14.7396Z" />
      <path d="M10 18.4224V22.1053L20 16.581L16.6667 14.7396L10 18.4224Z" />
      <path d="M16.6667 14.7396L20 16.581V5.52841L16.6667 7.36982V14.7396Z" />
      <path d="M10 3.68281L16.6667 7.36982L20 5.52842L10 0V3.68281Z" />
      <path
        d="M9.99999 5.30139L4.79578 8.17701L9.99999 11.0526L15.2042 8.17701L9.99999 5.30139Z"
      />
      <path d="M10 3.68281V0L0 5.52842L3.33333 7.36982L10 3.68281Z" />
      <path d="M0 5.52841L3.33333 7.36982V14.7396L0 16.581V5.52841Z" />
      <path
        d="M4.79578 8.17702V13.9283L9.99999 16.8039V11.0526L4.79578 8.17702Z"
      />
      <path d="M10 14.8868V16.8039L11.7347 15.8453V13.9283L10 14.8868Z" />
      <path d="M10 11.0526V12.9697L11.7347 12.0112V10.0941L10 11.0526Z" />
      <path
        d="M11.7347 12.0112V13.9282L13.4695 12.9697V11.0526L11.7347 12.0112Z"
      />
      <path
        d="M13.4695 9.13556V11.0526L15.2042 10.0941V8.17702L13.4695 9.13556Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_528">
        <rect width="20" height="22.1053" fill="white" />
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
        width: '14',
        height: '14',
        ...this.options
      }
    }
  }
}
</script>

<style></style>
