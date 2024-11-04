<template>
  <details @toggle="onToggle" ref="details" class="modal-card-container">
    <summary><slot></slot></summary>
    <div v-if="isOpen" class="modal-card-container__content">
      <div class="modal-card-container__content__main">
        <div
          v-for="(item, index) in items"
          :key="item + '-' + index"
          @click="
            $emit('clickItem', item)
            isOpen = false
          "
          class="modal-card-container__content__main__item"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </details>
</template>

<script>
export default {
  name: 'ModalCard',
  props: {
    items: { type: Array, default: () => [] }
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    onToggle(event) {
      this.isOpen = true
      if (event.target.getAttribute('open') != '') {
        this.isOpen = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
details summary::-webkit-details-marker {
  display: none;
}
details {
  display: flex;
  position: relative;
  width: 100%;
  summary {
    outline: none;
    display: inline-block;
    user-select: none;
    list-style: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    &::-webkit-details-marker {
      display: none;
    }
  }
  &[open] > summary:before {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: block;
    cursor: default;
    content: ' ';
    background: transparent;
  }
  &[open] > summary {
    &__arrow {
      &--rotate {
        transform: rotate(180deg);
      }
    }
  }
}
.modal-card-container {
  width: 100%;
  outline: none;

  &__content {
    margin-left: -20px;
    position: absolute;
    z-index: 999;
    width: auto;
    height: auto;
    background-color: #f9f9f9;
    margin-top: 20px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    &__main::before {
      content: '';
      width: 20px;
      height: 20px;
      background-color: #f9f9f9;
      position: absolute;
      top: -10px;
      left: 43%;
      transform: rotate(45deg);
      border-radius: 3px;
    }
    &__main {
      padding: 20px;
      display: grid;
      grid-template-rows: repeat(auto-fit, 20px);
      justify-content: center;
      align-items: center;
      grid-row-gap: 15px;
      position: relative;

      &__item {
        cursor: pointer;
        color: rgba(31, 31, 31, 0.5);
        font-size: 16px;
        font-weight: 600;
        width: 130px;
      }
    }
  }
}
</style>
