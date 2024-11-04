<template>
  <div>
    <img
      width="35px"
      @click="$emit('handleEvent')"
      class="clickable"
      src="@/assets/remove.png"
    />
  </div>
</template>

<script>
export default {}
</script>

<style>
.delete-button {
  padding: 5px 10px;
  background: rgb(216, 128, 69);
  font-size: 16px;
  color: white;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
}
</style>