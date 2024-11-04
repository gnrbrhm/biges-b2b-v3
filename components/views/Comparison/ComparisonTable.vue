<template>
  <div class="flex col main-comparison">
    <div
      :class="`flex row-reverse ${getLayout == 'mobile' ? 'm-10' : 'pr-25'}`"
    >
      <button
        :class="
          `button is-info is-light ${getLayout == 'mobile' ? '' : 'mb-15'}`
        "
        @click="openDrawer"
      >
        Yeni Ürün Ekle
      </button>
      <div v-if="isAuthenticated" class="product-list-features">
        <Checkbox
          v-for="(feature, index) in features"
          :key="index + '-feature-item'"
          :tooltip="feature.tooltip"
          v-model="feature.value"
          @change="changeFeatures"
          :label="feature.label"
          :name="feature.label"
          :has-icon="true"
        />
      </div>
    </div>

    <div class="foryou-table">
      <div class="table-container">
        <div class="table-container__table">
          <table class="table is-bordered">
            <thead>
              <tr>
                <th class="fix-w-th"></th>
                <th v-for="(head, index) in data" :key="head + '-' + index">
                  <ProductTh
                    v-if="head"
                    :product="head"
                    @close="close($event)"
                  ></ProductTh>
                </th>
              </tr>
            </thead>
            <tbody v-loading-biges="{ loading: isLoading }">
              <tr
                v-if="
                  (features[0].value || features[1].value) && isAuthenticated
                "
              >
                <th class="row-th-first">
                  <div>Fiyat</div>
                </th>
                <td
                  class="pt-20 pb-20"
                  v-for="(item, index) in prices"
                  :key="item + '-' + index"
                >
                  <div
                    class="flex row flex-1 space-between"
                    v-if="!item.price_mask && item.bankTransfer != '-'"
                  >
                    <div
                      v-if="features[0].value"
                      class="flex col flex-1 center"
                    >
                      <div class="h-12 font-bold">
                        LİSTE FİYATI
                      </div>
                      <div class="mt-5 font-600 h-20">
                        {{ item.list || '-' }}
                      </div>
                    </div>
                    <div
                      v-if="features[1].value && !item.discounted_price"
                      class="flex col flex-1 center"
                    >
                      <div class="h-12 font-bold">SİZE ÖZEL</div>
                      <div class="mt-5 font-600 h-20">
                        {{ item.bankTransfer || '-' }}
                      </div>
                    </div>
                    <div
                      v-if="
                        features[1].value &&
                          item.discounted_price &&
                          Object.keys(item.discounted_price).length
                      "
                      :class="
                        `price price-discount ${
                          !features[0].value && features[1].value
                            ? 'flex-1'
                            : ''
                        }`
                      "
                    >
                      <!-- <p>
                        %{{ Math.floor(item.discounted_price.rate * 10) / 10 }}
                        İNDİRİMLİ FİYAT
                      </p> -->
                      <p>
                        İNDİRİMLİ FİYAT
                      </p>
                      <p>{{ item.special }}</p>
                      <p>
                        $ {{ item.discounted_price.price | numberFormatTr }}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr
                v-for="(item, index) in filterData"
                :key="item + '-' + index + new Date().getTime()"
              >
                <th class="row-th">
                  <div>{{ item.name }}</div>
                </th>
                <td
                  v-for="(value, key) in data"
                  :key="value + '-' + key"
                  class="pt-20 pb-20"
                >
                  <div class="flex col flex-1 center">
                    <div class="mt-5 font-normal h-14">
                      {{ getOtherFilter(value, item) }}
                    </div>
                  </div>
                </td>
              </tr>

              <tr v-if="isAuthenticated">
                <td></td>
                <td
                  height="60"
                  style="padding: 0"
                  v-for="(item, index) in data"
                  :key="item + '-' + index"
                >
                  <AddBasket
                    :data="item"
                    :render-buttons="item | renderButtons"
                  ></AddBasket>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- <div class="table-footer flex row">
        <div
          v-for="(item, index) in data"
          :key="item + '-' + index"
          class="table-footer__item pl-5 pr-5"
        >
          <AddBasket :data="item"></AddBasket>
        </div>
      </div> -->
      </div>
    </div>
    <DrawerMenu
      v-if="isDrawer"
      :title="'Ürün Ekle'"
      @close="isDrawer = false"
      :buttonText="'KAYDET'"
      :isBottomButtons="false"
      :isIconTrash="false"
    >
      <template #content>
        <div :class="`${getLayout == 'mobile' ? 'p-15' : 'p-25'}`">
          <div class="pb-10">
            <SearchInput
              :isIcon="false"
              width="100%"
              placeholder="Bir ürün arayın."
              @search="handleSearch"
            ></SearchInput>
          </div>
          <div v-if="searchItems.length" class="flex col">
            <div
              :class="
                `${
                  getLayout == 'mobile' ? 'pb-10 pt-10' : 'pb-20 pt-20'
                } border-bottom`
              "
              v-for="(item, index) in searchItems"
              :key="item + '-' + index"
            >
              <!-- :isDisable="addedItem.indexOf(item.stock_code) >= 0 ? false : true" -->
              <ComparisonProductCard
                :isDisable="
                  data.find(val => val.stock_code == item.stock_code)
                    ? false
                    : true
                "
                @add="addItem($event)"
                :item="item"
                :isAuth="isAuthenticated"
              ></ComparisonProductCard>
            </div>
          </div>
        </div>
      </template>
    </DrawerMenu>
  </div>
</template>

<script>
import ProductTh from './ProductTh'
import ComparisonProductCard from './ComparisonProductCard'
import AddBasket from './AddBasket'
import { CURRENCY_SYMBOL } from '@/constants'
import DrawerMenu from '@/components/common/DrawerMenu'
import SearchInput from '@/components/common/SearchInput'
import Checkbox from '@/components/Checkbox.vue'

import { mapActions, mapGetters } from 'vuex'
import { mixinNumberFormatTr } from '@/utils'

export default {
  name: 'Table',
  components: {
    Checkbox,
    ProductTh,
    DrawerMenu,
    ComparisonProductCard,
    AddBasket,
    SearchInput
  },
  props: {
    data: { type: Array, default: () => [] },
    isLastRowBorder: { type: Boolean, default: false },
    isLoading: { type: Boolean, default: false },
    otherFilters: { type: Object, default: () => {} }
  },
  data() {
    return {
      currencySymbol: { ...CURRENCY_SYMBOL },
      isDrawer: false,
      searchItems: [],
      addedItem: [],
      features: [
        {
          label: 'tags',
          value: true,
          tooltip: 'Liste Fiyatı'
        },
        {
          label: 'human',
          value: true,
          tooltip: 'Bayi Fiyatı'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['loggedInUser', 'isAuthenticated', 'getLayout']),
    ...mapGetters({
      getSearchResult: 'search/getSearchResult'
    }),
    filterData() {
      let arrData = []
      this.data?.forEach(item => {
        item?.filter_groups?.forEach(value => {
          arrData.push(value?.filter_group)
        })
      })
      const result = []
      const map = new Map()
      for (const item of arrData) {
        if (!map.has(item.id)) {
          map.set(item.id, true) // set any value to Map
          result.push({
            id: item.id,
            name: item.name
          })
        }
      }
      return result
    },
    prices() {
      try {
        let dataMap = this.data.map(item => {
          let prices = item.prices
          if (prices && Object.keys(prices).length) {
            prices = prices
          } else {
            prices = null
          }
          return {
            price_mask: item.price_mask,
            discounted_price: item.discounted_price,
            list: !prices
              ? '-'
              : this.currencySymbol[prices.currency] +
                ' ' +
                mixinNumberFormatTr(prices.end_user),
            special: !prices
              ? '-'
              : this.currencySymbol[prices.currency] +
                ' ' +
                mixinNumberFormatTr(prices.reseller),
            openAccount: !prices
              ? '-'
              : this.currencySymbol[prices.currency] +
                ' ' +
                mixinNumberFormatTr(prices.open_account),
            cheque: !prices
              ? '-'
              : this.currencySymbol[prices.currency] +
                ' ' +
                mixinNumberFormatTr(prices.cheque),
            creditCard: !prices
              ? '-'
              : this.currencySymbol[prices.currency] +
                ' ' +
                mixinNumberFormatTr(prices.credit_card),
            creditCardInstallment: !prices
              ? '-'
              : this.currencySymbol[prices.currency] +
                ' ' +
                mixinNumberFormatTr(prices.credit_card_installment),
            bankTransfer: !prices
              ? '-'
              : this.currencySymbol[prices.currency] +
                ' ' +
                mixinNumberFormatTr(prices.bank_transfer)
          }
        })
        return dataMap
      } catch (error) {
        console.log(error)
        return []
      }
    }
  },
  methods: {
    ...mapActions({
      setSearchText: 'search/setSearchText',
      setFeatureCheck: 'products/setFeatureCheck'
    }),
    openDrawer() {
      this.isDrawer = true
    },
    getOtherFilter(product, item) {
      let findItem = product?.filter_groups?.find(
        val => val?.filter_group?.id == item?.id
      )
      if (findItem) {
        return findItem.name
      } else {
        return '-'
      }
    },
    changeFeatures(value) {
      let shows = {}
      if (value.label == 'packages') {
        shows['show_stock'] = value.checked
      } else if (value.label == 'tags') {
        shows['show_list_price'] = value.checked
      } else if (value.label == 'human') {
        shows['show_reseller_price'] = value.checked
      }
      let selfF = this.features
      this.setFeatureCheck(shows).then(resp => {
        if (resp.status == 'success') {
          let findIndex = this.features.findIndex(
            item => item.label == value.label
          )
          this.features[findIndex].value = value.checked
          this.$auth.fetchUser()
        }
      })
    },
    close(item) {
      this.$emit('handleDelete', item)
    },
    thWidth(index) {
      if (this.widthFirstTh && index == 0) {
        return 'width:' + this.widthFirstTh + ';'
      } else {
        return null
      }
    },
    async handleSearch(text) {
      let q = `?q=${text}`
      await this.setSearchText({ q, from: 'search' })
      this.searchItems = [...this.getSearchResult]
    },
    addItem({ stock_code, isAuth }) {
      this.$emit('handleAdd', { stock_code, isAuth })
    }
  },
  created() {
    if (this.loggedInUser) {
      this.features = this.features?.map(item => {
        if (item.label == 'packages') {
          return { ...item, value: this.loggedInUser?.filters?.show_stock }
        } else if (item.label == 'tags') {
          return { ...item, value: this.loggedInUser?.filters?.show_list_price }
        } else if (item.label == 'human') {
          return {
            ...item,
            value: this.loggedInUser?.filters?.show_reseller_price
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main-comparison {
  margin-top: -30px;
  margin-bottom: 20px;
  .foryou-table {
    .table-footer {
      width: 100%;
      position: sticky;
      height: 80px;
      bottom: 0;
      padding-left: 250px;

      &__item {
        min-width: 270px;
      }
    }
    .active-head {
      background: rgba(183, 224, 235, 0.4);
    }
    .table-container {
      &__title {
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;

        color: #1f1f1f;
      }

      &__table {
        position: relative;

        thead {
          th {
            padding: 0 0;
            max-width: 270px;
            border: 1px solid rgba(31, 31, 31, 0.1);
          }
        }

        td {
          max-width: 270px;
        }

        .fix-w-th {
          width: 250px;
        }
        .row-th-first {
          div {
            display: flex;
            align-items: center;
            height: 70px !important;
          }
        }
        .row-th {
          div {
            display: flex;
            align-items: center;
            height: 47px !important;
          }
        }
      }
    }
  }
}

.price {
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  color: #1f1f1f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // padding: 15px 30px 15px 15px;
}

.price-discount {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  p:nth-child(1) {
    font-size: 0.8rem;
    font-weight: 700;
    color: #4caf50;
    margin: 0;
  }

  p:nth-child(2) {
    margin: 0;
    color: rgba(31, 31, 31, 0.3);
    font-size: 14px;
    font-weight: 400;
    text-decoration-line: line-through;
  }

  p:nth-child(3) {
    font-size: 20px;
    font-weight: 600;
    text-align: left;
    color: #1f1f1f;
  }
}

@media (max-width: 768px) {
  .th-main {
    padding: 0;
    min-height: auto;
  }

  .main-comparison {
    padding: 0 15px;
    margin: 0;
  }

  .main-comparison .foryou-table .table-footer {
    padding-left: 0;
  }

  .product-list-features {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    margin: 0 !important;
  }
}
</style>
