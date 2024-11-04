<template>
  <div
    v-if="hasTags"
    :class="isProductCard ? 'product-tags-card' : 'product-tags-page'"
  >
    <div class="tag-field">
      <template v-if="isAuthenticated">
        <div
          v-if="hasStock"
          class="product-tag-group"
          v-tooltip="'Stok Miktarı'"
        >
          <div class="roduct-tag-group__item">
            <Icon name="shipment" stroke-color="transparent" />
          </div>
          <span class="pr-3">{{ availableStock | filterStock }}</span>
        </div>

        <template v-if="productOptions.stock_info">
          <div
            v-if="productOptions.stock_info.status != 0 && isProductCard"
            class="product-tag"
            v-tooltip="
              productOptions.stock_info.status == 1 ? 'Üretimde' : 'Yolda'
            "
          >
            <!-- Üretimde -->
            <Icons
              v-if="productOptions.stock_info.status == 1"
              name="Manufacture"
              :options="{ fill: '#0d2f81' }"
            />

            <!-- Yolda -->
            <Icons
              v-if="productOptions.stock_info.status == 2"
              name="Cargo"
              :options="{ fill: '#0d2f81' }"
            />
          </div>
        </template>

        <div
          v-show="productOptions.is_eco"
          class="product-tag"
          v-tooltip="'Eko Ürün'"
        >
          <Icon name="downloads" stroke-color="transparent" />
        </div>
        <div
          v-show="
            productOptions.is_discounted && !productOptions.is_alternative
          "
          class="product-tag"
          v-tooltip="'İndirimli Ürün'"
        >
          <Icon name="discount" stroke-color="transparent" />
        </div>
        <div
          v-show="productOptions.is_campaign_result"
          class="product-tag campaign-tag"
          v-tooltip="'Kampanyalı Ürün'"
        >
          <Icon name="advertisement" />
        </div>
        <div
          v-show="productOptions.is_alternative"
          class="product-tag"
          v-tooltip="'Alternatif Ürün'"
        >
          <Icon name="shuffle" stroke-color="transparent" />
        </div>

        <div
          v-show="productOptions.is_outlet"
          class="product-tag"
          v-tooltip="'Outlet Ürün'"
        >
          <Icon name="warehouse" stroke-color="transparent" />
        </div>
      </template>

      <template v-if="isProductCard">
        <div
          v-show="productOptions.is_work_with_hybrone"
          class="product-tag"
          v-tooltip="'Hybrone ile çalışır'"
        >
          <Icons name="Hybrone" :options="{ fill: '#0D2F81' }" />
        </div>

        <div
          v-show="productOptions.is_compatible_with_hybrone"
          class="product-tag"
          v-tooltip="'Hybrone ile uyumlu'"
        >
          <Icons
            name="Hybrone"
            :options="{ fill: '#2196F3', class: 'compatible' }"
          />
        </div>
        <div
          v-show="productOptions.is_special_offer"
          class="product-tag-offer"
          v-tooltip="'Özel Teklif İste'"
        >
          <Icons
            name="isSpecialOffer"
            :options="{ fill: 'none', width: '20', height: '20' }"
          />
          <!-- :options="{ fill: '#2196F3', class: 'compatible' }" -->
        </div>
      </template>

      <template v-else>
        <div
          class="product-tag-group"
          v-if="productOptions.is_work_with_hybrone"
        >
          <div class="roduct-tag-group__item">
            <Icons name="Hybrone" :options="{ fill: '#0D2F81' }" />
          </div>
          <span class="pr-3">Hybrone ile çalışır</span>
        </div>

        <div
          class="product-tag-group"
          v-if="productOptions.is_compatible_with_hybrone"
        >
          <div class="roduct-tag-group__item">
            <Icons
              name="Hybrone"
              :options="{ fill: '#2196F3', class: 'compatible' }"
            />
          </div>
          <span class="pr-3">Hybrone ile uyumlu</span>
        </div>
        <div
          class="product-tag-group"
          v-if="productOptions.is_compatible_with_hybrone"
        >
          <div class="roduct-tag-group__item">
            <Icons name="isSpecialOffer" />
          </div>
          <span class="pr-3">Hybrone ile uyumlu</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue'
import Icons from '@/components/icons'
import { mapGetters } from 'vuex'
export default {
  name: 'ProductTags',
  components: { Icon, Icons },
  props: {
    product: { type: Object, default: () => {} },
    isProductCard: { type: Boolean, default: true }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    hasStock() {
      return this.loggedInUser?.filters?.show_stock
    },
    hasTags() {
      if (
        Object.values(this.productOptions).indexOf(true) >= 0 ||
        this.loggedInUser?.filters?.show_stock
      ) {
        return true
      }
      return false
    },
    availableStock() {
      return this.product?.available_stock || 0
    },
    productOptions() {
      return {
        is_eco: this.product?.is_eco || false,
        is_discounted: this.product?.is_discounted || false,
        is_alternative: this.product?.is_alternative || false,
        is_campaign_result:
          this.product?.is_campaign_result ||
          this.product?.is_campaign_reason ||
          false,
        is_outlet: this.product?.is_outlet || false,
        stock_info: this.product?.stock_info,
        is_compatible_with_hybrone:
          this.product?.is_compatible_with_hybrone || false,
        is_work_with_hybrone: this.product?.is_work_with_hybrone || false,
        is_special_offer: this.product?.is_special_offer || false
      }
    }
  },
  filters: {
    filterStock(val) {
      let value = ''
      if (val >= 100) {
        value = '100+'
      } else if (val >= 50) {
        value = '50+'
      } else if (val >= 20) {
        value = '20+'
      } else if (val >= 10) {
        value = '10+'
      } else {
        value = val
      }
      return value
    }
  }
}
</script>

<style lang="scss" scoped>
.product-tags-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 0 20px;
  min-height: 30px;
  height: 30px;
  position: absolute;
  z-index: 1;

  .product-tag-group {
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 30px auto;
    width: auto;
    height: 30px;
    border-radius: 3px;
    background: $bg-lightblue;
    margin-right: 5px;
    color: $primary;

    &__item {
      width: 30px;
      height: 30px;
    }
    &:hover {
      background: $primary;
      color: $white;
    }
  }
}

.product-tags-page {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  min-height: 30px;
  height: 30px;

  .product-tag-group {
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 30px auto;
    width: auto;
    height: 30px;
    border-radius: 3px;
    background: $bg-lightblue;
    margin-right: 5px;
    padding: 0 5px;
    color: $primary;

    &__item {
      width: 30px;
      height: 30px;
    }
    &:hover {
      background: $primary;
      color: $white;
    }

    &:hover svg {
      fill: $white;
    }

    &:hover:has(.compatible) {
      background: #2196f3;
    }
  }
}

.tag-field {
  display: flex;
  flex-direction: row;
}
.product-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 3px;
  background: $bg-lightblue;
  margin-right: 5px;
  color: $primary;

  &:hover {
    background: $primary;
    color: $white;
  }

  &:hover svg {
    fill: $white;
  }

  &:hover:has(.compatible) {
    background: #2196f3;
  }

  &-offer {
    @extend .product-tag;
    margin-left: auto;
    svg {
      /* path { */
      fill: #4caf50 !important;
      /* } */
    }
    &:hover {
      background: #4caf50;
      svg {
        /* path { */
        fill: #ffffff !important;
        /* } */
      }
    }
  }
}

.campaign-tag {
  position: relative;
  &:hover {
    .tooltip {
      visibility: visible;
    }
  }
  .tooltip {
    position: absolute;
    visibility: hidden;
    background: $black;
    width: 140px;
    line-height: 36px;
    padding: 0 10px;
    color: $white;
    border-radius: 3px;
    height: 37px;
    top: -44px;
    &:after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: $black transparent transparent transparent;
    }
  }
}
</style>
