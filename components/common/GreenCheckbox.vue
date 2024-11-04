<template>
  <label class="custom-check flex row align-center h-14 font-normal">
    <input
      @change="$emit('onChange', { item, isChecked: value })"
      v-model="value"
      type="checkbox"
    />
    <span class="checkmark"></span>
    <span class="green-check-text">
      {{ item.name }}
    </span>
  </label>
</template>

<script>
export default {
  name: 'GreenCheckbox',
  props: {
    item: { type: Object, default: () => {} },
    isCheck: { type: Boolean, default: false }
  },
  data() {
    return {
      value: this.isCheck
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-check {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default custom-check */
.custom-check input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom custom-check */
.checkmark {
  border-radius: 2px;
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* When the custom-check is checked, add a blue background */
.custom-check input:checked ~ .checkmark {
  background-color: #4caf50;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.custom-check input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.custom-check .checkmark:after {
  left: 8px;
  top: 0px;
  width: 10px;
  height: 20px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.green-check-text {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  height: 17px;
  color: #1f1f1f;
}
</style>