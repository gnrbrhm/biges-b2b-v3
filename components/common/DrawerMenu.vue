<template>
  <div class="common-drawer-container">
    <div class="drawer-menu">
      <div class="drawer-menu__header">
        <div class="drawer-menu__header__text">{{ title }}</div>
        <div class="drawer-menu__header__group flex row">
          <div v-if="isIconTrash" @click="closeClick" class="close-icon">
            <Icon name="trash" />
          </div>
          <div @click="closeClick" class="close-icon ml-20">
            <Icon name="close-md" />
          </div>
        </div>
      </div>
      <div class="drawer-menu__content">
        <slot name="content"></slot>
      </div>
      <div v-if="isBottomButtons" class="drawer-menu__footer">
        <div @click="closeClick" class="drawer-menu__footer__close">VAZGEÇ</div>
        <button @click="$emit('add')" class="drawer-menu__footer__button">
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue'

export default {
  name: 'DrawerMenu',
  props: {
    title: { type: String, default: null },
    buttonText: { type: String, default: null },
    isIconTrash: { type: Boolean, default: true },
    isBottomButtons: { type: Boolean, default: true }
  },
  components: {
    Icon
  },
  data() {
    return {
      isInfo: true,
      addedBasket: []
    }
  },
  methods: {
    closeClick() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '@/assets/css/variables.scss/';

.common-drawer-container {
  position: fixed;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background: rgba(31, 31, 31, 0.5);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .drawer-menu {
    position: absolute;
    width: 100%;
    max-width: 800px;
    height: 100%;
    top: 0;
    right: 0;
    background: #ffffff;
    display: flex;
    flex-direction: column;

    &__header {
      padding: 0 25px;

      min-height: 110px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(31, 31, 31, 0.1);
      justify-content: space-between;
      &__text {
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 26px;
        line-height: 31px;
        color: #1f1f1f;
      }
    }
    &__content {
      max-height: calc(100% - 100px);
      overflow-y: scroll;
    }

    &__footer {
      margin: 30px 25px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      &__close {
        cursor: pointer;
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;

        color: rgba(31, 31, 31, 0.7);
      }

      &__button {
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;

        width: 149px;
        height: 55px;

        background: $primary;
        color: $white;
        border: none;
        margin-left: 40px;
        border-radius: 2px;
        cursor: pointer;
        &:hover {
          background: $primary-dark-3x;
        }
        &:disabled {
          opacity: 0.5;
        }
      }
    }
  }

  .close-icon {
    cursor: pointer;
    width: 50px;
    height: 50px;
    background: rgba(31, 31, 31, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
  }
}

@media (max-width: 768px) {
  .common-drawer-container {
    .drawer-menu {
      &__header {
        min-height: 70px;
        padding: 0 15px;
      }

      &__content {
        max-height: calc(100% - 70px);
      }
    }
  }
}
</style>
