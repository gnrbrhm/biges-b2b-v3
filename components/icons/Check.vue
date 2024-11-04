<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="options.width || '24'"
    :height="options.height || '24'"
    viewBox="0 0 24 24"
    :fill="options.fill || 'none'"
  >
    <rect
      :width="options.width || '24'"
      :height="options.height || '24'"
      rx="2"
      :fill="options.rectFill || '#4CAF50'"
    />
    <rect
      x="0.5"
      y="0.5"
      :width="options.width || '23'"
      :height="options.height || '23'"
      rx="1.5"
      stroke="#1F1F1F"
      stroke-opacity="0.1"
    />
    <path
      d="M18.9986 5L9.60895 18.4131C9.48506 18.5911 9.32064 18.7371 9.12925 18.8392C8.93785 18.9412 8.72495 18.9962 8.5081 18.9998C8.29125 19.0034 8.07665 18.9554 7.88198 18.8598C7.68732 18.7641 7.51817 18.6236 7.38846 18.4498L5 15.2656"
      stroke="white"
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
          width: '',
          height: '',
          fill: 'none',
          rectFill: ''
        }
      }
    }
  }
}
</script>

<style>
</style>