<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.25 13.5V2.25C23.25 1.85218 23.092 1.47064 22.8107 1.18934C22.5294 0.908035 22.1478 0.75 21.75 0.75H5.25C4.85218 0.75 4.47064 0.908035 4.18934 1.18934C3.90804 1.47064 3.75 1.85218 3.75 2.25V6"
      :stroke="strokeColor"
      stroke-opacity="0.5"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3.75 5.25H23.25"
      :stroke="strokeColor"
      stroke-opacity="0.5"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18.75 9H2.25C1.42157 9 0.75 9.67157 0.75 10.5V21.75C0.75 22.5784 1.42157 23.25 2.25 23.25H18.75C19.5784 23.25 20.25 22.5784 20.25 21.75V10.5C20.25 9.67157 19.5784 9 18.75 9Z"
      :stroke="strokeColor"
      stroke-opacity="0.5"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M0.75 13.5H20.25"
      :stroke="strokeColor"
      stroke-opacity="0.5"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M3.75 18H6"
      :stroke="strokeColor"
      stroke-opacity="0.5"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13.875 17.25C13.6389 16.9352 13.3097 16.7026 12.9341 16.5853C12.5584 16.4679 12.1554 16.4718 11.7821 16.5962C11.4087 16.7207 11.084 16.9594 10.8539 17.2787C10.6238 17.5979 10.5 17.9815 10.5 18.375C10.5 18.7685 10.6238 19.1521 10.8539 19.4713C11.084 19.7906 11.4087 20.0293 11.7821 20.1538C12.1554 20.2782 12.5584 20.2821 12.9341 20.1647C13.3097 20.0474 13.6389 19.8148 13.875 19.5C14.1111 19.8148 14.4403 20.0474 14.8159 20.1647C15.1916 20.2821 15.5946 20.2782 15.9679 20.1538C16.3413 20.0293 16.666 19.7906 16.8961 19.4713C17.1262 19.1521 17.25 18.7685 17.25 18.375C17.25 17.9815 17.1262 17.5979 16.8961 17.2787C16.666 16.9594 16.3413 16.7207 15.9679 16.5962C15.5946 16.4718 15.1916 16.4679 14.8159 16.5853C14.4403 16.7026 14.1111 16.9352 13.875 17.25V17.25Z"
      :stroke="strokeColor"
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
    strokeColor: { type: String, default: '#1f1f1f' }
  }
}
</script>
