<template>
  <div class="control has-icons-right search-input-field flex row">
    <input
      :style="{ width: width, height: height }"
      class="input h-14 font-normal"
      type="text"
      v-model="searchText"
      @keyup.enter="goSearch"
      :placeholder="placeholder"
    />
    <span v-if="isIcon && getLayout == 'desktop'" class="icon is-right">
      <svg
        :width="iconWidth"
        :height="iconHeight"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.1316 15.1276C14.9704 13.4961 16.7598 9.06153 15.1284 5.2227C13.4969 1.38386 9.06236 -0.405564 5.22353 1.2259C1.38469 2.85737 -0.404731 7.29192 1.22673 11.1308C2.8582 14.9696 7.29275 16.759 11.1316 15.1276Z"
          stroke="#1F1F1F"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.5176 13.5166L19.3751 19.3749"
          stroke="#1F1F1F"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <div class="ml-10">
      <button @click="goSearch" class="flat-button search-button">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SearchInput',
  props: {
    placeholder: { type: String, default: null },
    iconHeight: { type: Number, default: 16 },
    iconWidth: { type: Number, default: 16 },
    width: { type: String, default: '200px' },
    height: { type: String, default: '40px' },
    isIcon: { type: Boolean, default: true },
    buttonText: { type: String, default: 'Ara' }
  },
  data() {
    return {
      searchText: ''
    }
  },
  computed: {
    ...mapGetters(['getLayout'])
  },
  methods: {
    goSearch() {
      this.$emit('search', this.searchText)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-input-field {
  height: 40px;
  input {
    color: rgba(31, 31, 31, 0.5);
    border-radius: 3px;
    background: rgba(31, 31, 31, 0.05);

    outline: none;
    border: none;
    box-shadow: none;
  }

  .search-button {
    height: 40px;
    width: 40px;
    cursor: pointer;
  }
}
</style>