<template>
  <div class="container">
    <div
      class="compare-list-item"
      @mouseover="isClose = true"
      @mouseleave="isClose = false"
    >
      <img :src="product.photo || null" :alt="product.display_name" />
      <div
        v-if="isClose"
        class="close-icon clickable"
        @click.stop="$emit('deleteItem', product)"
      >
        <Icon name="Close" />
      </div>
    </div>
    <div class="vendor-name">
      <p class="display-brand">{{ product.brand.name }}</p>
      <br />
      <p class="display-name">{{ product.display_name }}</p>
    </div>
    <span class="border-right"></span>
  </div>
</template>

<script>
import Icon from '@/components/icons'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  components: { Icon },
  data() {
    return {
      isClose: false
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;

  .border-right {
    margin-left: 15px;
    height: 60px;
    border-right: 1px solid #1f1f1f1a;
  }

  .compare-list-item {
    border: 2px solid #ddd;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 70px;
    height: 70px;

    .close-icon {
      background: rgba(218, 41, 28, 0.1);
      width: 30px;
      height: 30px;
      border-radius: 30px;
      position: absolute;
      top: 2px;
      right: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .vendor-name {
    display: inline-grid;
  }
  .display-brand {
    margin-bottom: -28px;
    padding-left: 10px;
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
    color: rgba(31, 31, 31, 0.7);
    text-align: left;
  }
  .display-name {
    padding-left: 10px;
    font-weight: 600;
    line-height: 24px;
    font-size: 20px;
    color: #1f1f1f;
  }
}

@media (max-width: 1250px) {
  .container {
    display: flex;
    align-items: center;

    .compare-list-item {
      border: 2px solid #ddd;
      display: flex;
      flex-direction: column;
      position: relative;
      width: 50px;
      height: 50px;

      .close-icon {
        background: rgba(218, 41, 28, 0.1);
        width: 20px;
        height: 20px;
        border-radius: 30px;
        position: absolute;
        top: 2px;
        right: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .vendor-name {
      display: inline-grid;
    }
    .display-brand {
      margin-bottom: -28px;
      padding-left: 10px;
      font-weight: 700;
      font-size: 10px;
      line-height: 15px;
      color: rgba(31, 31, 31, 0.7);
      text-align: left;
    }
    .display-name {
      padding-left: 10px;
      font-weight: 600;
      line-height: 24px;
      font-size: 14px;
      color: #1f1f1f;
    }
  }
}
</style>
