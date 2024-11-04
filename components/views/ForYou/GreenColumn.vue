<template>
  <div class="col-container flex row center">
    <div
      style="
        width: 6px;
        height: 6px;
        background: #24ce95;
        border-radius: 3px;
        margin-right: 5px;
        white-space: nowrap;
      "
    ></div>
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'GreenColumn',
  props: {
    text: { type: String, default: null }
  }
}
</script>

<style lang="scss" scoped>
.col-container {
  width: auto;
  height: 24px;
  float: left;
  padding: 5px 10px;

  background: rgba(36, 206, 149, 0.1);
  border-radius: 1000px;

  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 120%;
  /* or 14px */

  color: #24ce95;
}
</style>