<template>
  <label class="fav-checkbox-label">
    <div v-if="value" @click="onChange" class="mr-10">
      <Icons name="Check" />
    </div>
    <div v-else @click="onChange" class="mr-10">
      <Icons name="Check" :options="{ rectFill: 'white' }" />
    </div>
    <!-- <input
      v-if="!value"
      @change="onChange"
      :value="value"
      class="fav-checkbox"
      type="checkbox"
    /> -->
    <div v-if="item && item.name" @click="onChange">
      {{ item.name }}
    </div>
    <div v-else @click.stop="onChange">
      <slot name="text"></slot>
    </div>
  </label>
</template>

<script>
import Icons from '@/components/icons'

export default {
  name: 'Checkbox',
  components: {
    Icons
  },
  props: {
    item: { type: Object, default: () => {} },
    isCheck: { type: Boolean, default: false }
  },

  data() {
    return {
      value: this.isCheck
    }
  },
  methods: {
    onChange() {
      this.value = !this.value
      this.$emit('onChange', { item: this.item, isChecked: this.value })
    }
  }
}
</script>

<style lang="scss" scoped>
.fav-checkbox-label {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  position: relative;
  user-select: none;
  color: black;

  .fav-checkbox {
    margin-right: 10px;
    opacity: 0.2;
    width: 24px;
    height: 24px;

    background: #ffffff;

    border: none;
    box-sizing: border-box;
    border-radius: 2px;

    &:checked {
      opacity: 1;
    }
  }
}
</style>
