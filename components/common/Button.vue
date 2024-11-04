<template>
  <div>
    <button @click="$emit('onSubmit')" class="form-button">{{ text }}</button>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: { text: { type: String, default: 'Gönder' } }
}
</script>

<style lang="scss" scoped>
.form-button {
  justify-self: end;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 144px;
  height: 55px;
  border: none;
  cursor: pointer;

  background: #0d2f81;
  border-radius: 3px;
  text-align: center;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: white;

  &:hover {
    background: rgba(31, 31, 31, 0.7);
  }
  &:disabled {
    opacity: 0.5;
  }
}
</style>