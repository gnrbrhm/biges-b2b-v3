<template>
  <div
    class="foryou-tab-menu-container"
    v-loading-biges="{ loading: isLoading }"
  >
    <div v-if="isHeader" class="tab-menu-header" :style="{ height: height }">
      <div class="flex row">
        <div
          v-if="isBack"
          @click="$emit('onBack')"
          class="mr-13 arrow flex center clickable"
        >
          <Icon
            name="left-arrow"
            icon-color="transparent"
            strokeColor="rgba(13, 47, 129, 0.7)"
            height="12"
            width="13"
          ></Icon>
        </div>
        <div
          v-if="title"
          class="font-normal h-20"
          :class="isBack ? 'flex align-center' : 'mb-30'"
        >
          {{ title }}
        </div>
      </div>
      <div v-if="isTab" class="tab-menu">
        <button
          @click.prevent="clickTab(index)"
          v-for="(item, index) in items"
          :key="item + '-' + index"
          :class="{ active: index == activeTab }"
        >
          {{ item.text }}
        </button>
      </div>
    </div>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
export default {
  name: 'TabMenu',
  components: { Icon },
  props: {
    title: { type: String, default: null },
    items: {
      type: Array,
      default: () => []
    },
    height: { type: String, default: '110px' },
    tab: { type: Number, default: 0 },
    isCustomHeader: { type: Boolean, default: false },
    isTab: { type: Boolean, default: true },
    isBack: { type: Boolean, default: false },
    isHeader: { type: Boolean, default: true },
    isLoading: { type: Boolean, default: false }
  },
  data() {
    return {
      activeTab: 0
    }
  },
  methods: {
    clickTab(index) {
      this.activeTab = index
      this.$emit('onTab', index)
    }
  },
  created() {
    this.clickTab(this.tab)
  }
}
</script>

<style lang="scss" scoped>
.foryou-tab-menu-container {
  background: #ffffff;
  margin-bottom: 121px;
  border: 1px solid rgba(31, 31, 31, 0.1);
  box-sizing: border-box;
  border-radius: 2px;
  position: relative;

  .tab-menu-header {
    padding: 30px 25px;
    // height: 110px;
    border-bottom: 1px solid rgba(31, 31, 31, 0.1);

    .arrow {
      width: 40px;
      height: 40px;
      background: rgba(31, 31, 31, 0.1);
      border-radius: 50px;
    }
    // .tab-menu-title {
    //   font-family: Inter;
    //   font-style: normal;
    //   font-weight: 500;
    //   font-size: 20px;
    //   line-height: 24px;
    //   margin-bottom: 30px;

    //   color: #1f1f1f;
    // }

    .tab-menu {
      overflow: hidden;
      display: flex;
      flex-direction: row;
      button {
        margin-bottom: 12px;
        padding: 0 0;
        margin-right: 2rem !important;
        background-color: inherit;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        transition: 0.3s;

        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;

        color: rgba(31, 31, 31, 0.7);

        &.active {
          position: relative;
          font-family: Inter;
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          line-height: 15px;
          color: #0d2f81;

          &::after {
            content: '';
            width: 100%;
            height: 1px;
            position: absolute;
            top: 24px;
            border: 1px solid #0d2f81;
            left: 0;
          }
        }
      }
    }
  }

  .tab-content {
    width: 100%;
  }
}

@media only screen and (max-width: 768px) {
  /* For tablets: */
  .foryou-tab-menu-container {
    background: #ffffff;
    margin-bottom: 121px;
    // border: 1px solid rgba(31, 31, 31, 0.1);
    box-sizing: border-box;
    border-radius: 2px;

    .tab-menu-header {
      padding: 30px 10px;
      // height: 110px;
      border-bottom: 1px solid rgba(31, 31, 31, 0.1);

      .arrow {
        width: 40px;
        height: 40px;
        background: rgba(31, 31, 31, 0.1);
        border-radius: 50px;
      }
      .tab-menu {
        white-space: nowrap;
        overflow-x: scroll;
        button {
          margin-bottom: 12px;
          padding: 0 0;
          margin-right: 3.75rem;
          background-color: inherit;
          float: left;
          border: none;
          outline: none;
          cursor: pointer;
          transition: 0.3s;

          font-family: Inter;
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          line-height: 15px;

          color: rgba(31, 31, 31, 0.7);

          &.active {
            position: relative;
            font-family: Inter;
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 15px;
            color: #0d2f81;

            &::after {
              content: '';
              width: 100%;
              height: 1px;
              position: absolute;
              top: 24px;
              border: 1px solid #0d2f81;
              left: 0;
            }
          }
        }
      }
    }

    .tab-content {
      width: 100%;
    }
  }
}

::-webkit-scrollbar {
  width: 4px;
  height: 0;
}
</style>
