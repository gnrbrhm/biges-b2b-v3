<template>
  <div>
    <div
      v-if="showModal"
      class="add-to-favorite-overlay"
      @click="showModal = false"
    />
    <div
      v-if="showModal"
      class="add-to-favorite-modal"
      :style="completed ? { width: '494' + 'px' } : { width: '404' + 'px' }"
    >
      <div class="add-to-favorite-modal-inner">
        <div v-if="completed" class="close-modal" @click="showModal = false">
          <app-icon name="close-bold" stroke-color="transparent" />
        </div>
        <h3 v-if="!completed" class="modal-title">Favorilerime Ekle</h3>
        <div v-if="!completed" class="modal-search">
          <div class="control has-icons-right">
            <input
              v-model="search"
              class="input search-input"
              type="text"
              placeholder="Liste ara"
            />
            <span class="icon is-right">
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
          </div>
        </div>
        <div v-if="!completed && getCategoryList.length" class="favorite-list">
          <ul class="favorite-list-group">
            <li
              v-for="(favorite, index) in getCategoryList"
              :key="index + '-filtered-list-item'"
            >
              <Checkbox
                @onChange="changeSelected($event)"
                :item="favorite"
              ></Checkbox>
            </li>
          </ul>
        </div>
        <div v-if="!completed" class="add-new-list">
          <template v-if="isNewList">
            <div class="control">
              <input
                v-model="newListName"
                type="text"
                name="label"
                class="add-new-input"
                placeholder="Yeni Liste Oluştur"
              />
            </div>
            <button type="button" class="button" @click="saveNewList">
              Kaydet
            </button>
          </template>
          <template v-else>
            <div class="control" @click="addNewList">
              <input
                type="text"
                name="label"
                class="add-new-label"
                style="cursor: pointer"
                placeholder="Yeni Liste Ekle"
                disabled
              />
              <div class="add-list">
                <app-icon name="plus" stroke-color="transparent" />
              </div>
            </div>
            <button type="button" class="button" @click="addFavorites">
              Ekle
            </button>
          </template>
        </div>

        <div v-if="completed" class="modal-header">
          <app-icon
            v-if="completed"
            name="folder-heart"
            icon-color="transparent"
          />
        </div>
        <h3 v-if="completed" class="modal-title is-center">
          Favorilere Eklendi
        </h3>
        <div v-if="completed" class="modal-subtitle">
          Ürün <strong> "{{ selectedItems.join(',') }}" </strong> Favori
          Listenize Eklendi
        </div>
        <p v-if="completed" class="modal-text-content">
          Favorilerinize eklediğiniz ürünleri Size Özel sayfasında
          görüntüleyebilirsiniz
        </p>
        <button
          v-if="completed"
          type="button"
          class="button finish-button"
          @click="showModal = false"
        >
          Tamam
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue'
import Checkbox from '@/components/common/Checkbox'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    appIcon: Icon,
    Checkbox
  },
  props: {
    isActive: { type: Boolean, default: false },
    productCode: { type: String, default: null }
  },
  data: () => {
    return {
      isFetching: true,
      isNewList: false,
      newListName: '',
      checkedItems: [],
      selectedItems: '',
      showModal: true,
      completed: false,
      search: ''
      // favorites: [
      //   {
      //     label: 'Kameralar'
      //   },
      //   {
      //     label: 'Geçiş Kontrol ve Otopark Sistemleri'
      //   },
      //   {
      //     label: 'Favori Listem'
      //   },
      //   {
      //     label: 'Seslendirme Sistemleri'
      //   }
      // ]
    }
  },
  watch: {
    search(value) {
      this.getCategory(value)
    },
    showModal(value) {
      if (value == false) {
        this.$emit('onClose')
      }
    }
  },
  computed: {
    ...mapGetters({
      getCategoryList: 'favorite/getCategoryList'
    })
  },
  methods: {
    ...mapActions({
      getCategory: 'favorite/getCategory',
      setCategory: 'favorite/setCategory',
      setProductToCategory: 'favorite/setProductToCategory'
    }),
    saveNewList() {
      this.setCategory(this.newListName)
      this.newListName = ''
      this.isNewList = false
    },
    changeSelected(val) {
      if (val.isChecked) {
        this.checkedItems = [...this.checkedItems, val.item]
      } else {
        this.checkedItems.splice(this.checkedItems.indexOf(val.item), 1)
      }
    },
    addNewList() {
      this.isNewList = true
      // if (!this.label) {
      //   return false
      // }
      // this.favorites.push({ label: this.label })
      // this.label = ''
    },
    addFavorites() {
      if (this.checkedItems.length) {
        this.selectedItems = this.checkedItems.map((val) => {
          return val.name
        })
        if (this.selectedItems.length) {
          this.checkedItems.forEach((item, index) => {
            this.setProductToCategory({
              category: item.id,
              stock_code: this.productCode
            }).then((response) => {
              if (index == this.checkedItems.length - 1) {
                this.completed = true
                this.$emit('onChanged', { value: true, id: this.productCode })
              }
            })
          })
        } else {
          return false
        }
      }
    }
  },
  created() {
    this.getCategory()
    this.isFetching = false
    this.showModal = this.isActive
  }
}
</script>

<style lang="scss">
@import './components/styles/AddToFavorite/add-to-favorite.scss';
</style>
