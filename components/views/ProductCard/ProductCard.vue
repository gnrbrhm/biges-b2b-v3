<!-- isVue3 : true -->
<template>
    <div :class="classSuffix + ' product-card'">
      <!-- Quick View Modal -->
      <app-quick-view
        v-if="isShowQuickView"
        v-bind="$props"
        :product="product"
        :photos="[...photos]"
        :custom-label="customLabel"
        :render-buttons="renderButtons"
        @onClose="isShowQuickView = false"
        @onChangeFavorite="onChangedFavorite"
      />
  
      <!-- Add to Favorite Modal -->
      <app-add-to-favorite
        v-if="isFavoriteModal && isAuthenticated"
        ref="addToFavorite"
        :product-code="id"
        :is-active="isFavoriteModal"
        @onClose="isFavoriteModal = false"
        @onChanged="onChangedFavorite"
      />
  
      <ProductTags :product="product" />
  
      <div class="product-information">
        <nuxt-link :to="`/urunler/${id}`">
          <div class="product-image">
            <div class="product-image-grid">
              <img
                v-if="productImage && !isDummyImage"
                :id="id + '-fly'"
                :src="productImage"
                class="product-img"
                @error="handleImageLoaded"
              />
              <img
                v-if="!productImage || isDummyImage"
                :id="id - '-fly'"
                class="product-img --dummy"
                src="@/assets/no-image.png"
              />
            </div>
            <div class="overlay">
              <div class="overlay-inner">
                <button
                  class="button quick-view"
                  type="button"
                  @click.prevent="openQuickView"
                >
                  <app-icon name="quick-view" icon-color="transparent" />
                  <span>Hızlı Bakış</span>
                </button>
                <button
                  v-if="isAuthenticated"
                  class="button add-to-favorite"
                  type="button"
                  @click.prevent="favClick(isAddedFav)"
                >
                  <app-icon name="add-to-favorite" icon-color="transparent" />
                  <span>{{
                    isAddedFav ? 'Favorilerden Çıkar' : 'Favoriye Ekle'
                  }}</span>
                </button>
              </div>
            </div>
          </div>
        </nuxt-link>
        <div class="product-brand">
          <div class="product-brand-left">
            <span
              class="product-brand-name"
              @click="$emit('handleClickBrand', brandId)"
            >
              {{ brandName }}
            </span>
            <span v-if="customLabel" class="new-product">
              {{ customLabel }}
            </span>
            <span
              v-if="specificNote"
              v-tooltip="specificNote"
              class="specific-note"
            >
              <app-icon
                stroke-opacity="none"
                stroke-color="none"
                name="love"
                width="12"
                height="10.5"
              />
            </span>
            <span
              v-if="getFavState"
              class="product-brand-favorite"
              @click="clickFavoriteIcon"
            >
              <app-icon
                stroke-opacity="none"
                stroke-color="none"
                name="love"
                width="12"
                height="10.5"
              />
            </span>
          </div>
          <span class="product-brand-favorite-add">
            <div
              v-if="!getFavState && isAuthenticated"
              class="product-brand-favorite-add__icon"
              @click="openAddToFavorite"
            >
              <app-icon
                name="add-to-favorite2"
                width="24"
                height="24"
                icon-color="none"
                stroke-opacity="0.5"
                stroke-color="#1F1F1F"
              />
            </div>
          </span>
        </div>
        <div class="product-model" :title="productName" @click="productCardClick">
          <nuxt-link :to="`/urunler/${id}`">
            <span>{{ productName }}</span>
          </nuxt-link>
        </div>
        <div class="product-desc">
          <p>{{ productDescription }}</p>
          <div v-if="variants.length" style="width: 100%">
            <div class="select" style="width: 100%">
              <select v-model="selectedVariant" style="width: 100%">
                <option :value="null">Lütfen varyant seçin</option>
                <option
                  v-for="(item, index) in variants"
                  :key="item + '-' + index"
                  :value="item.code"
                >
                  {{ item.name }} ({{ item.available_stock }} adet)
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useStore } from 'vuex';
  import ProductTags from '@/components/ProductTags.vue';
  import Icon from '../../../components/Icon.vue';
  import AddToFavorite from '@/components/AddToFavorite.vue';
  import QuickView from '@/components/QuickView.vue';
  
  const props = defineProps({
    product: Object,
    renderButtons: { type: String, default: 'stock-info' },
    id: String,
    classSuffix: { type: String, default: '--large' },
    productName: String,
    productDescription: String,
    brandId: Number,
    brandName: String,
    customLabel: String,
    specificNote: String,
    productImage: String,
    photos: Array,
    variants: Array
  });
  
  const store = useStore();
  const quantity = ref(1);
  const isDummyImage = ref(false);
  const isShowQuickView = ref(false);
  const isFavoriteModal = ref(false);
  const isAddedFav = ref(false);
  const selectedVariant = ref(null);
  
  const isAuthenticated = computed(() => store.getters.isAuthenticated);
  
  const openQuickView = () => {
    isShowQuickView.value = true;
  };
  
  const openAddToFavorite = () => {
    isFavoriteModal.value = true;
  };
  
  const favClick = (isAddedFav) => {
    if (isAddedFav) {
      clickFavoriteIcon();
    } else {
      openAddToFavorite();
    }
  };
  
  const clickFavoriteIcon = async () => {
    await store.dispatch('favorite/removeProductFavorite', props.id);
    isAddedFav.value = false;
  };
  
  const productCardClick = async () => {
    await store.dispatch('products/fetchSimilarProductCounter', {
      similar_product_code: props.id
    });
  };
  
  const onChangedFavorite = (data) => {
    isAddedFav.value = data.value;
  };
  
  const handleImageLoaded = () => {
    isDummyImage.value = true;
  };
  </script>
  
  <style lang="scss">
  @import './components/styles/ProductCard/product-card.scss';
  </style>
  