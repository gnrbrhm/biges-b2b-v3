<template>
  <div class="search-modal">
    <div class="control has-icons-left has-icons-right border-bottom flex row">
      <span class="icon is-left mt-7 ml-10 mr-15 mb-15" style="z-index: 1">
        <svg
          width="20"
          height="20"
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
      <input
        class="input is-medium"
        type="text"
        v-model="searchText"
        @keyup="setText"
        @keyup.enter="goSearch"
        placeholder="Kullanıcı"
      />
      <span
        @click="$emit('close')"
        class="radius-100 icon-close mt-10 ml-15 mr-15 mb-15 flex center min-w-30 clickable"
      >
        <Icon name="close-sm" stroke-color="none" />
      </span>
    </div>
    <div class="user flex col">
      <div class="border-bottom flex row p-10 align-center">
        <div class="user">Ahmet Yılmaz</div>
        <button class="button is-outlined is-info is-small ml-30">EKLE</button>
      </div>
      <div class="border-bottom flex row p-10 align-center">
        <div class="user">Batuhan Seçil</div>
        <button class="button is-outlined is-info is-small ml-30">
          KALDIR
        </button>
      </div>
      <div class="flex center save">KAYDET</div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
export default {
  components: { Icon },
  data() {
    return {
      searchText: '',
      activeSearch: false
    }
  },
  methods: {
    setText() {
      let q = `?q=${this.searchText}`
    }
  },
  onOut() {
    this.isMouseOver = false
  },
  onOver() {
    this.isMouseOver = true
    if (this.isFocus) {
      this.activeSearch = true
    }
  },
  inputFocus() {
    this.isFocus = true
    this.activeSearch = true
  },
  goSearch() {},
  closeClick() {
    this.searchText = ''
  }
}
</script>

<style lang="scss" scoped>
.search-modal {
  z-index: 9999;
  position: absolute;
  width: 463px;
  height: 208px;
  right: 0;
  top: 0;

  background: #ffffff;

  border: 1px solid rgba(31, 31, 31, 0.1);
  box-sizing: border-box;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 3px;

  .save {
    height: 50px;
    cursor: pointer;
    background: rgba(31, 31, 31, 0.05);
    border-radius: 3px;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #1f1f1f;
  }
  .user {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;

    color: #000000;
  }

  input {
    outline: none;
    border: none;
  }

  .icon-close {
    width: 30px;
    height: 30px;

    background: rgba(31, 31, 31, 0.1);
  }
}
</style>