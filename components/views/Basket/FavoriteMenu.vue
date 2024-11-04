<template>
  <div class="fav-menu-container">
    <div v-if="getFavoriteProductList.length" class="fav-menu">
      <div class="fav-menu__header">
        <div class="fav-menu__header__text">
          Favori Ürünlerim ({{ getFavoriteProductList.length }})
        </div>
        <div class="fav-menu__header__group">
          <div class="fav-menu__header__group__basket">
            <div class="control-item">
              <div v-show="basketTotal" class="notifications-badge">
                <p class="has-text-white is-size-7">
                  {{ basketTotal }}
                </p>
              </div>
              <span class="basket">
                <Icon name="bag" icon-color="transparent" />
              </span>
            </div>
            <!-- <div class="fav-menu__header__group__basket__text">
              <span class="fav-menu__header__group__basket__text__top"
                >Sepet</span
              >
              <span class="fav-menu__header__group__basket__text__bottom"
                >$ 1,200</span
              >
            </div> -->
          </div>
          <div @click="closeClick" class="fav-menu__header__group__icon">
            <Icon name="close-md" />
          </div>
        </div>
      </div>
      <div v-if="isInfo" class="fav-menu__info">
        <div class="fav-menu__info__content">
          <div class="fav-menu__info__content__left">
            <span>
              <Icon name="basket-heart" stroke-color="none" />
            </span>
            <p>
              Favori ürünlerinizi sepetinize ekleyerek satın alma işleminizi
              hızlandırabilirsiniz.
            </p>
          </div>
          <span @click="isInfo = false" class="fav-menu__info__content__right">
            <Icon name="close-sm" width="13" height="13" stroke-color="none" />
          </span>
        </div>
      </div>
      <div class="fav-menu__list">
        <!-- <div
          v-for="(fav, index) in getFavoriteProductList"
          :key="fav + '-' + index"
          class="fav-menu__list__card-container"
        >
          <div class="fav-menu__list__card-container__card">
            <div
              v-if="fav.photos && fav.photos.length"
              class="fav-menu__list__card-container__card__img"
              :style="`background-image:url(${fav.photos[0].photo})`"
            >
              <img
                @click="addToBasket(fav.stock_code)"
                class="fav-menu__list__card-container__card__img__sub"
                src="@/assets/add.png"
              />
            </div>
            <div class="fav-menu__list__card-container__card__info">
              <div
                v-if="fav.stock_code"
                class="fav-menu__list__card-container__card__info__title"
              >
                {{ fav.stock_code }}
              </div>
              <div
                v-if="fav.summary"
                class="fav-menu__list__card-container__card__info__subtitle"
              >
                {{ fav.summary }}
              </div>
            </div>
            <div class="fav-menu__list__card-container__card__price">
              <div
                class="fav-menu__list__card-container__card__price__item-group"
              >
                <div
                  class="fav-menu__list__card-container__card__price__item-group__first"
                >
                  SİZE ÖZEL HAVALE FİYATI
                </div>
                <div
                  v-if="fav.prices && fav.prices.length"
                  class="fav-menu__list__card-container__card__price__item-group__second"
                >
                  $ {{ fav.prices[0].bank_transfer }}
                </div>
              </div>
              <div
                class="fav-menu__list__card-container__card__price__item-group"
              >
                <div
                  class="fav-menu__list__card-container__card__price__item-group__first"
                >
                  LİSTE FİYATI
                </div>
                <div
                  v-if="fav.prices && fav.prices.length"
                  class="fav-menu__list__card-container__card__price__item-group__second"
                >
                  $ {{ fav.prices[0].end_user }}
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <template v-if="tableData.length">
          <template v-for="(fav, index) in tableData">
            <ProfileFavoriteCard
              :key="fav + '-' + index"
              :isBasket="true"
              :fav="fav"
              @handleStockCode="addToBasket($event)"
            ></ProfileFavoriteCard>
          </template>
        </template>
      </div>
      <div class="fav-menu__footer">
        <div @click="closeClick" class="fav-menu__footer__close">VAZGEÇ</div>
        <button @click="closeClick" class="fav-menu__footer__button">
          SEPETE GİT
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import Icon from '@/components/Icon.vue'
import ProfileFavoriteCard from '@/components/views/ForYou/ProfileFavoriteCard'

export default {
  name: 'FavoriteMenu',
  components: {
    Icon,
    ProfileFavoriteCard
  },
  data() {
    return {
      isInfo: true,
      addedBasket: [],
      table: {
        headers: ['', ''],
        rows: []
      }
    }
  },
  computed: {
    ...mapState('basket', ['basket', 'total']),
    ...mapGetters({
      getFavoriteProductList: 'favorite/getFavoriteProductList'
    }),
    basketTotal() {
      return this.total ? this.total : parseInt(Cookies.get('basket.total'))
    },
    tableData() {
      return this.table.rows.map(row => {
        return {
          ...row
          // stock_code: row.stock_code,
          // summary: row.summary,
          // photo: row?.photos?.[0]?.photo || '',
          // prices: {
          //   bank_transfer: row?.prices?.[0].bank_transfer || '',
          //   end_user: row?.prices?.[0].end_user || ''
          // }
        }
      })
    }
  },
  methods: {
    ...mapActions({
      // getFavoriteProducts: 'favorite/getFavoriteProducts',
      fetchFavoriteProduct: 'foryou/fetchFavoriteProduct'
    }),
    goBasket() {
      location.reload()
    },
    async getFavoriteProduct() {
      this.isLoading = true
      if (Object.keys(this.fetchFavoriteProduct).length) return
      await this.fetchFavoriteProduct().then(response => {
        this.table.rows = response
        this.isLoading = false
      })
    },
    async addToBasket(id) {
      await this.$store
        .dispatch('basket/addBasket', {
          stock_code: id,
          quantity: 1
        })
        .then(resp => {
          this.addedBasket = [...this.addedBasket, id]
          this.$emit('add')
        })
    },
    closeClick() {
      this.$emit('close')
    }
  },
  created() {
    this.getFavoriteProduct()
  }
}
</script>

<style lang="scss" scoped>
@import '@/components/styles/Basket/favorite-menu.scss';
</style>
