<template>
  <div class="search-menu-container">
    <div
      @mouseover="onOver"
      @mouseleave="onOut"
      :class="activeSearch ? 'active-search' : 'search'"
    >
      <div class="control has-icons-right search-input">
        <input
          @focus="inputFocus"
          class="input is-medium"
          type="text"
          v-model="searchText"
          placeholder="Bir ürün, marka veya içerik arayın."
          maxlength="30"
          @keyup="onChangeDebounced"
        />
        <!-- @input="onChangeDebounced" -->
        <!-- @keyup.enter="onChangeDebounced" -->
        <!-- @keyup.enter="goSearch" -->
        <div v-if="activeSearch" class="search-input__button-group">
          <div>
            <div
              @click="removeText"
              v-show="searchText"
              class="search-input__button-group__icon"
            >
              <Icon name="close-sm" stroke-color="none" />
            </div>
          </div>
          <button
            @click="() => goSearch(searchText)"
            class="search-input__button-group__button"
          >
            ARA
          </button>
        </div>
        <span v-else class="icon is-right" style="z-index: 1">
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
      <div class="search-menu">
        <table
          v-if="searchText != '' && getSearchResult && getSearchResult.length"
          class="search-list"
        >
          <thead>
            <tr>
              <th>İLGİLİ ÜRÜNLER</th>
              <th v-if="isAuthenticated">STOK</th>
              <th v-if="isAuthenticated">FİYAT</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in getSearchResult.slice(0, 5)"
              :key="item + '-search-item-' + index"
              @click="selectProduct(item)"
            >
              <td>
                <div class="product-images">
                  <div
                    v-if="item.photos && item.photos.length"
                    class="product-images__img"
                    :style="`background-image:url(${item.photos[0].photo})`"
                  ></div>
                  <img
                    class="product-images__img"
                    v-else
                    src="@/assets/no-image.png"
                    alt=""
                  />
                  <div class="product-images__item">
                    {{ item.display_name }}
                  </div>
                </div>
              </td>
              <td v-if="isAuthenticated">
                <div class="row-item" v-if="!item.price_mask">
                  {{ item.available_stock | filterStock }}
                </div>
              </td>
              <td
                v-if="
                  isAuthenticated &&
                    item.prices &&
                    Object.keys(item.prices).length
                "
              >
                <div class="row-item" v-if="!item.price_mask">
                  {{ item.prices.end_user | numberFormatTr }}
                  {{ currencySymbol[item.prices.currency] }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <table
          v-else-if="
            searchText == '' ||
              (getPopularSearchResult && getPopularSearchResult.length)
          "
          class="search-list"
        >
          <thead>
            <tr>
              <th>POPÜLER ARAMALAR</th>
              <th v-if="isAuthenticated">STOK</th>
              <th v-if="isAuthenticated">FİYAT</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in getPopularSearchResult"
              :key="item + '-search-item-' + index"
              @click="selectProduct(item)"
            >
              <td>
                <div class="product-images">
                  <div
                    v-if="item.photos && item.photos.length"
                    class="product-images__img"
                    :style="`background-image:url(${item.photos[0].photo})`"
                  ></div>
                  <img
                    class="product-images__img"
                    v-else
                    src="@/assets/no-image.png"
                    alt=""
                  />
                  <div class="product-images__item">
                    {{ item.display_name }}
                  </div>
                </div>
              </td>
              <td v-if="isAuthenticated">
                <div class="row-item" v-if="!item.price_mask">
                  {{ item.available_stock | filterStock }}
                </div>
              </td>
              <td
                v-if="
                  isAuthenticated &&
                    item.prices &&
                    Object.keys(item.prices).length
                "
              >
                <div class="row-item" v-if="!item.price_mask">
                  {{ item.prices.end_user | numberFormatTr }}
                  {{ currencySymbol[item.prices.currency] }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="search-menu__footer">
          <ul>
            <li
              v-if="searchText != '' && getSearchResult.length && isDocument"
              class="search-menu__footer__title"
            >
              İLGİLİ DİĞER SONUÇLAR
            </li>
            <li v-if="isDocument && getSearchResult.length">
              <div
                @click="goRoute('documents')"
                class="search-menu__footer__item"
              >
                <div>
                  <Icon
                    name="folder"
                    icon-color="#FFFFFF"
                    width="22"
                    height="18"
                    strokeOpacity="0.5"
                  />
                </div>
                <div>Döküman ile ilgili sonuç</div>
              </div>
            </li>
            <li v-if="isCampaign && getSearchResult.length">
              <div
                @click="goRoute('campaigns')"
                class="search-menu__footer__item"
              >
                <div>
                  <Icon
                    name="programming"
                    icon-color="#FFFFFF"
                    width="24"
                    height="24"
                    strokeOpacity="0.5"
                  />
                </div>
                <div>Kampanya ile alakalı sonuç</div>
              </div>
            </li>
            <li v-if="isArticle && getSearchResult.length">
              <div
                @click="goRoute('articles')"
                class="search-menu__footer__item"
              >
                <div>
                  <Icon
                    name="folder"
                    icon-color="#FFFFFF"
                    width="22"
                    height="18"
                    strokeOpacity="0.5"
                  />
                </div>
                <div>Makale ile ilgili sonuç</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue'
import { mapActions, mapGetters } from 'vuex'
import { CURRENCY_SYMBOL } from '@/constants'

export default {
  name: 'Search',
  components: {
    Icon
  },
  data() {
    return {
      searchText: '',
      activeSearch: false,
      isFocus: false,
      isMouseOver: false,
      isDocument: false,
      isArticle: false,
      isCampaign: false,
      currencySymbol: { ...CURRENCY_SYMBOL },
      onChangeDebounced: null
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
  },
  computed: {
    ...mapGetters({
      getSearchResult: 'search/getSearchResult',
      getPopularSearchResult: 'search/getPopularSearchResult',
      isAuthenticated: 'isAuthenticated'
    })
  },
  methods: {
    ...mapActions({
      setSearchText: 'search/setSearchText',
      setPopularSearch: 'search/setPopularSearch',
      getSearchTypes: 'search/getSearchTypes',
      clearSearch: 'search/clearSearch'
    }),
    debounce(fn, wait) {
      let timer
      return function(...args) {
        if (timer) {
          clearTimeout(timer) // clear any pre-existing timer
        }
        const context = this // get the current context
        timer = setTimeout(() => {
          fn.apply(context, args) // call the function if time expires
        }, wait)
      }
    },
    selectProduct(item) {
      this.$router.push('/urunler/' + item.stock_code)
      this.clearSearchData()
    },
    setText() {
      if (this.searchText.length >= 3) {
        let q = `?q=${this.searchText}`
        if (this.searchText) {
          this.setSearchText({ q, from: 'search' })
          this.getSearchTypes({ q: this.searchText, type: 'documents' }).then(
            res => {
              this.isDocument = res
            }
          )
          this.getSearchTypes({ q: this.searchText, type: 'articles' }).then(
            res => {
              this.isArticle = res
            }
          )
          this.getSearchTypes({ q: this.searchText, type: 'campaigns' }).then(
            res => {
              this.isCampaign = res
            }
          )
        }
      } else {
        this.clearSearch()
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
    goRoute(text) {
      this.$router.push(`/ara?q=${this.searchText}&type=${text}`)
      this.clearSearchData()
    },
    inputFocus() {
      this.isFocus = true
      this.activeSearch = true
    },
    focusOut() {
      if (!this.isMouseOver) {
        this.isFocus = false
        this.activeSearch = false
      }
    },
    goSearch(search) {
      console.log('Go Search Çalıştı', search)
      //   this.$router.push('/ara?q=' + this.searchText)
      this.$router.push('/ara?q=' + search)
      this.clearSearchData()
    },
    removeText() {
      this.searchText = ''
      this.clearSearch()
    },
    clearSearchData() {
      this.activeSearch = false
      this.isMouseOver = false
      this.searchText = ''
      this.setText()
      this.clearSearch()
    }
  },
  mounted() {
    this.setPopularSearch()
    document.addEventListener('click', () => {
      this.focusOut()
    })
  },
  created() {
    this.onChangeDebounced = this.debounce(event => {
      console.log('changed value:', event.target.value)
      // call fetch API to get results
      this.setText(event.target.value)
      this.searchText = event.target.value
      //   this.goSearch(event.target.value)
    }, 250)
  }
}
</script>

<style lang="scss">
@import './components/styles/Header/search.scss';
</style>
