<template>
  <div class="col-container flex row center">
    <div
      v-if="!options.justText"
      style="
        width: 6px;
        height: 6px;
        background: #f71e3f;
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
  name: 'RedColumn',
  props: {
    text: { type: String, default: null },
    options: {
      type: Object,
      default: () => {
        justText: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.col-container {
  width: auto;
  height: 24px;
  float: left;
  padding: 5px 10px;

  background: rgba(247, 30, 63, 0.1);
  border-radius: 1000px;

  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 120%;
  color: #f71e3f;
}
</style>