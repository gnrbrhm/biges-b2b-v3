<template>
    <div :class="classSuffix + ' product-card'">
      <!-- Quick View Modal -->
      <app-quick-view
        v-if="isShowQuickView"
        @onClose="isShowQuickView = false"
        @onChangeFavorite="onChangedFavorite"
        :product="product"
        v-bind="$props"
        :photos="[...photos]"
      />
  
      <!-- Add to Favorite Modal -->
      <app-add-to-favorite
        :productCode="id"
        v-if="isFavoriteModal && isAuthenticated"
        @onClose="isFavoriteModal = false"
        @onChanged="onChangedFavorite"
        :isActive="isFavoriteModal"
        ref="addToFavorite"
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
                @error="handleImageLoaded"
                class="product-img"
              />
              <div
                v-if="!productImage || isDummyImage"
                :id="id - '-fly'"
                class="product-img --dummy"
                :data-text="
                  !isDummyImage ? 'Fotoğraf Yok' : 'Fotoğraf Yüklenemedi'
                "
              ></div>
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
                  class="button add-to-favorite"
                  v-if="isAuthenticated"
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
                strokeOpacity="none"
                strokeColor="none"
                name="love"
                width="12"
                height="10.5"
              />
            </span>
            <span
              v-if="getFavState"
              @click="clickFavoriteIcon"
              class="product-brand-favorite"
            >
              <app-icon
                strokeOpacity="none"
                strokeColor="none"
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
                strokeOpacity="0.5"
                strokeColor="#1F1F1F"
              />
            </div>
          </span>
        </div>
        <div class="product-model" :title="productName">
          <nuxt-link :to="`/urunler/${id}`">
            <span>{{ productName }}</span>
          </nuxt-link>
        </div>
        <div class="product-desc">
          <p>{{ productDescription }}</p>
        </div>
      </div>
      <div v-if="isAuthenticated" class="product-price">
        <div v-if="hasPriceList" class="price price-list">
          <p class="price-list-title">LİSTE FİYATI</p>
          <p>{{ currencySymbol[currency] }} {{ retailPrice | numberFormatTr }}</p>
        </div>
        <div v-if="hasPriceSpecial" class="price price-special">
          <p class="price-list-title">SİZE ÖZEL</p>
          <p>
            {{ currencySymbol[currency] }} {{ resellerPrice | numberFormatTr }}
          </p>
        </div>
      </div>
      <div
        v-if="hasAction && isAuthenticated"
        :data-stock="availableStock"
        class="product-action"
      >
        <div v-if="availableStock" class="field input-field">
          <button
            :disabled="isLoading || !availableStock"
            class="button decrement"
            @click="decrement"
          >
            <app-icon name="minus" stroke-color="transparent" />
          </button>
          <input
            :disabled="isLoading || !availableStock"
            type="number"
            min="1"
            v-model="quantity"
          />
          <button
            :disabled="isLoading || !availableStock"
            class="button increment"
            @click="increment"
          >
            <app-icon name="plus" stroke-color="transparent" />
          </button>
        </div>
        <div class="field button-field">
          <button
            v-if="availableStock"
            class="add-basket-button has-text-weight-semibold"
            @click="addToBasket"
          >
            SEPETE AT
          </button>
          <button
            v-else
            @click=" ()=>{
              infoModal.isStock = true
              infoModal.isActive = true}
            "
            class="add-basket-button has-text-weight-semibold"
          >
            STOK BİLGİSİ ALIN
          </button>
        </div>
      </div>
      <div v-if="hasAlternativeBtn" class="product-btn-basket alternative-btn">
        <nuxt-link
          :to="`/urunler/${id}`"
          class="alternative-btn has-text-weight-semibold"
        >
          ÜRÜNE GİT
        </nuxt-link>
      </div>
  
      <Modal
        :width="'400px'"
        :height="'200px'"
        :isActive="infoModal.isActive"
        @close="infoModal.isActive = false"
      >
        <div class="getInfoModal">
          <div class="getInfoModal_title">
            {{ id }} ürünü için {{ infoModal.isStock ? 'stok' : 'fiyat' }} bilgisi
            istiyorum.
          </div>
  
          <div class="getInfoModal_form">
            <Button @onSubmit="sendInfoMail" text="GÖNDER" />
            <Button @onSubmit="infoModal.isActive = false" text="VAZGEÇ" />
          </div>
        </div>
      </Modal>
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
    id: String,
    classSuffix: { type: String, default: '--large' },
    productName: String,
    productDescription: String,
    currency: String,
    retailPrice: String,
    resellerPrice: String,
    brandId: Number,
    brandName: String,
    customLabel: String,
    specificNote: String,
    productImage: String,
    hasDiscount: Boolean,
    inCampaign: Boolean,
    isFavorite: Boolean,
    isAlternative: Boolean,
    isEco: Boolean,
    isOutlet: Boolean,
    hasTags: Boolean,
    hasFavorite: Boolean,
    hasAction: Boolean,
    hasStock: Boolean,
    hasPriceList: Boolean,
    hasPriceSpecial: Boolean,
    hasAlternativeBtn: Boolean,
    availableStock: Number,
    photos: Array,
    bigesClubPoint: Number,
  });
  
  const store = useStore();
  const isShowQuickView = ref(false);
  const isFavoriteModal = ref(false);
  const isAddedFav = ref(false);
  const quantity = ref(1);
  const isLoading = ref(false);
  const isDummyImage = ref(false);
  
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
  
  const increment = () => {
    quantity.value++;
  };
  
  const decrement = () => {
    if (quantity.value > 1) quantity.value--;
  };
  
  const handleImageLoaded = () => {
    isDummyImage.value = true;
  };
  
  const addToBasket = async () => {
    isLoading.value = true;
    try {
      await store.dispatch('basket/addBasket', {
        stock_code: props.id,
        quantity: quantity.value,
      });
      quantity.value = 1;
    } finally {
      isLoading.value = false;
    }
  };
  
  const sendInfoMail = async () => {
    const url = `/products/${infoModal.isStock ? 'stock_information' : 'price_information'}/${props.id}`;
    await axios.get(url);
  };
  </script>
  
  <style lang="scss" scoped>
  /* CSS kodları yukarıdaki orijinal koda uygun olarak yer alabilir */
  </style>
  