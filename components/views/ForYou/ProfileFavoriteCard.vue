<template>
  <div ref="favProfile" class="mt-10 mb-10 clickable" @click="onToggle">
    <div class="h-18 font-normal summary">
      <div class="flex space-between p-10">
        <p>
          {{ fav.name }}
        </p>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
          >
            <path
              d="M0.46875 7.5H14.5312"
              stroke="#1f1f1f4d"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              v-if="!isOpen"
              d="M7.5 0.46875V14.5312"
              stroke="#1f1f1f4d"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
    <div
      v-show="isOpen"
      class="fav-card__card-container"
      :class="index != tableData.length - 1 ? 'border-bottom' : ''"
      v-for="(item, index) in tableData"
      :key="item + '-' + index"
    >
      <div>
        <div
          class="fav-card__card-container__card clickable"
          @click="$router.push(`/urunler/${item.stock_code}`)"
        >
          <div
            class="fav-card__card-container__card__img"
            :style="`background-image:url(${item.photo})`"
          >
            <img
              v-tooltip="'Favorilerimden Çıkar'"
              width="35px"
              @click.stop="removeFromFavorite(item.stock_code)"
              class="fav-card__card-container__card__img__sub"
              src="@/assets/remove.png"
            />
          </div>
          <div class="fav-card__card-container__card__info">
            <div
              v-if="item.stock_code"
              class="fav-card__card-container__card__info__title"
            >
              {{ item.stock_code }}

              <div
                v-if="item.summary"
                class="fav-card__card-container__card__info__subtitle"
              >
                {{ item.summary }}
              </div>
              <!-- Bu kısım api yapıldıktan sonra açılacak. -->
              <div
                v-if="item.status && Object.keys(item.summary).length"
                style="
                  display: flex;
                  gap: 5px;
                  align-items: center;
                  margin-top: 10px;
                "
              >
                <div v-if="item.status.is_discounted" class="isDiscounted">
                  <Icons name="isDiscounted" width="12" height="12" /> İNDİRİMLİ
                  ÜRÜN
                </div>

                <div v-if="item.status.is_outlet" class="isOutlet">
                  <Icons name="isOutlet" width="12" height="12" />
                  OUTLET ÜRÜN
                </div>

                <div v-if="item.status.is_eco" class="isEco">
                  <Icons name="isEco" width="12" height="12" />
                  EKO ÜRÜN
                </div>

                <div v-if="item.status.is_campaign_reason" class="isCampaigned">
                  <Icons name="isCampaigned" width="12" height="12" />
                  KAMPANYALI ÜRÜN
                </div>

                <div v-if="item.status.is_alternative" class="isAlternative">
                  <Icons name="isAlternative" width="12" height="12" />
                  ALTERNATİF ÜRÜN
                </div>
              </div>
            </div>
          </div>
          <div
            class="fav-card__card-container__card__price"
            v-if="!item.price_mask && item.pricess"
          >
            <div class="fav-card__card-container__card__price__item-group">
              <div
                class="fav-card__card-container__card__price__item-group__first"
              >
                LİSTE FİYATI
              </div>
              <div
                class="fav-card__card-container__card__price__item-group__second"
              >
                $ {{ item.pricess.end_user | numberFormatTr }}
              </div>
            </div>
            <div
              v-if="!item.discounted_price"
              class="fav-card__card-container__card__price__item-group"
            >
              <div
                class="fav-card__card-container__card__price__item-group__first-for-you"
              >
                SİZE ÖZEL HAVALE FİYATI
              </div>
              <div
                class="fav-card__card-container__card__price__item-group__second"
              >
                $ {{ item.pricess.bank_transfer | numberFormatTr }}
              </div>
            </div>
            <div v-else class="price price-discount">
              <p>
                <!-- %{{ Math.floor(item.discounted_price.rate * 10) / 10 }} -->
                İNDİRİMLİ FİYAT
              </p>
              <div class="wrapper">
                <p>$ {{ item.pricess.bank_transfer | numberFormatTr }}</p>
                <p>$ {{ item.discounted_price.price | numberFormatTr }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="wrap-button">
          <div class="button-field">
            <button
              v-if="renderButtons(item) == 'add-basket'"
              class="add-basket-button has-text-weight-semibold"
              @click="addToBasket(item.stock_code)"
            >
              SEPETE AT
            </button>
            <button
              v-if="renderButtons(item) == 'stock-info'"
              class="add-basket-button has-text-weight-semibold"
              @click="
                infoModal.stock_code = item.stock_code
                infoModal.isStock = true
                infoModal.isActive = true
              "
            >
              STOK BİLGİSİ ALIN
            </button>
            <button
              v-if="renderButtons(item) == 'price-info'"
              class="add-basket-button has-text-weight-semibold"
              @click="
                infoModal.stock_code = item.stock_code
                infoModal.isStock = false
                infoModal.isActive = true
              "
            >
              FİYAT BİLGİSİ ALIN
            </button>
          </div>
        </div>
      </div>
    </div>

    <Modal
      :width="'400px'"
      :height="'200px'"
      :isActive="infoModal.isActive"
      @close="infoModal.isActive = false"
    >
      <div class="getInfoModal">
        <div class="getInfoModal_title">
          {{ infoModal.stock_code }} ürünü için
          {{ infoModal.isStock ? 'stok' : 'fiyat' }} bilgisi istiyorum.
        </div>

        <div class="getInfoModal_form">
          <Button @onSubmit="sendInfoMail" text="GÖNDER" />
          <Button @onSubmit="infoModal.isActive = false" text="VAZGEÇ" />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Icons from '@/components/icons'
import Modal from '@/components/common/Modal'
import Button from '@/components/common/Button'
export default {
  components: { Icons, Modal, Button },
  props: {
    fav: { type: Object, default: () => {} },
    classC: { type: String, default: '' },
    isBasket: { type: Boolean, default: false }
  },
  computed: {
    ...mapGetters(['getLayout']),
    tableData() {
      return this.favProducts.map(row => {
        return {
          stock_code: row.stock_code,
          price_mask: row.price_mask,
          discounted_price: row.discounted_price,
          available_stock: row.available_stock,
          summary: row.summary,
          status: row.status[0],
          photo: row?.photos?.[0]?.photo || '',
          prices: row.prices,
          pricess: Object.keys(row.prices).length
            ? {
                bank_transfer: row?.prices?.bank_transfer || '',
                end_user: row?.prices?.end_user || ''
              }
            : null
        }
      })
    }
  },
  data() {
    return {
      favProducts: [],
      isLoading: false,
      stockCodebutton: '',
      isOpen: false,
      infoModal: {
        isActive: false,
        isStock: false,
        stock_code: null
      }
    }
  },
  methods: {
    ...mapActions({
      removeProductFavorite: 'favorite/removeProductFavorite'
    }),
    async sendInfoMail() {
      try {
        const url = `/products/${
          this.infoModal.isStock ? 'stock_information' : 'price_information'
        }/${this.infoModal.stock_code}`
        const result = await this.$axios({ method: 'GET', url })

        if (result.status == 200) {
          this.$notify({
            type: 'success',
            title: 'İşlem Başarılı!',
            text: result?.data?.message,
            duration: 2000
          })
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.infoModal.isActive = false
      }
    },
    renderButtons(product) {
      let returnedValue = 'stock-info'
      const priceMask =
        !product.price_mask && Object.keys(product.prices).length > 0

      // Stok var fiyat yok ise
      if (product.available_stock && !priceMask) {
        returnedValue = 'price-info'
      }

      // Fiyat var stok yok ise
      if (priceMask && !product.available_stock) {
        returnedValue = 'stock-info'
      }

      // Stok var fiyat bilgisi de var
      if (product.available_stock && priceMask) {
        returnedValue = 'add-basket'
      }
      return returnedValue
    },
    onToggle() {
      this.isOpen = !this.isOpen
    },
    async addToBasket(stockCode) {
      try {
        if (this.isBasket) {
          this.$emit('handleStockCode', stockCode)
        } else {
          this.isLoading = true
          this.stockCodebutton = stockCode
          await this.$store
            .dispatch('basket/addBasket', {
              stock_code: stockCode,
              quantity: 1
            })
            .then(resp => {
              if (resp) {
                this.$notify({
                  type: 'success',
                  title: 'İşlem Başarılı',
                  text: stockCode + ' sepete eklendi.',
                  duration: 5000
                })
              }
            })
        }
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false
    },
    removeFromFavorite(stockCode) {
      this.removeProductFavorite(stockCode).then(resp => {
        if (resp) {
          this.$notify({
            type: 'success',
            title: 'İşlem Başarılı!',
            text: stockCode + ' silindi.'
          })
          let findIndex = this.favProducts.findIndex(
            item => item.stock_code == stockCode
          )
          if (findIndex > -1) {
            this.favProducts.splice(findIndex, 1)
            this.onToggle()
          }
        }
      })
    }
  },
  created() {
    this.favProducts = this.fav?.products
  }
}
</script>

<style lang="scss" scoped>
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
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  p {
    font-size: 0.8rem;
    font-weight: 700;
    color: #4caf50;
    margin: 0;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    p:nth-child(1) {
      margin: 0;
      color: rgba(31, 31, 31, 0.3);
      font-size: 14px;
      font-weight: 400;
      text-decoration-line: line-through;
    }

    p:nth-child(2) {
      font-size: 16px;
      font-weight: 600;
      text-align: left;
      color: #1f1f1f;
    }
  }
}
.isDiscounted {
  padding: 2px 4px;
  background: rgba(35, 209, 96, 0.05);
  border: 1px solid rgba(35, 209, 96, 0.1);
  color: #23d160;
  font-weight: 600;
  font-size: 9px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.isOutlet {
  padding: 2px 4px;
  background: rgba(255, 221, 87, 0.05);
  border: 1px solid rgba(255, 221, 87, 0.5);
  color: rgba(31, 31, 31, 0.5);
  font-weight: 600;
  font-size: 9px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.isEco {
  padding: 2px 4px;
  background: rgba(255, 42, 86, 0.05);
  border: 1px solid rgba(255, 42, 86, 0.1);
  color: #ff2a56;
  font-weight: 600;
  font-size: 9px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.isCampaigned {
  padding: 2px 4px;
  background: rgba(51, 116, 220, 0.05);
  border: 1px solid rgba(51, 116, 220, 0.1);
  color: #3374dc;
  font-weight: 600;
  font-size: 9px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.isAlternative {
  padding: 2px 4px;
  background: rgba(0, 209, 178, 0.05);
  border: 1px solid rgba(0, 209, 178, 0.1);
  color: #00d1b2;
  font-weight: 600;
  font-size: 9px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.ask-price-button {
  width: 200px;
  height: 100%;
  background: #a2a2a2;
  color: black;
  border: none;
  cursor: default;
  opacity: 0.5;
}

.summary {
  background: rgba(31, 31, 31, 0.05);
  width: 100%;
}

.fav-card {
  overflow-y: scroll;
  height: 100%;
  padding: 0 25px;

  &__card-container {
    padding: 20px 0;

    &__card {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 80px 1fr 1fr;
      grid-column-gap: 20px;

      &__img {
        width: 80px;
        height: 80px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        border: 1px solid rgba(31, 31, 31, 0.1);
        box-sizing: border-box;
        border-radius: 3px;

        &__sub {
          cursor: pointer;
          margin-top: 60px;
          margin-left: 60px;
        }
      }

      &__info {
        &__title {
          font-family: Inter;
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 22px;

          color: #1f1f1f;
        }
        &__subtitle {
          margin-top: 5px;
          font-family: Inter;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 17px;

          color: rgba(31, 31, 31, 0.5);
        }
      }
      &__price {
        display: grid;
        grid-template-rows: 24px 24px;
        grid-row-gap: 10px;

        &__item-group {
          align-self: center;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;

          &__first {
            font-family: Inter;
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 15px;
            color: rgba(31, 31, 31, 0.5);
          }

          &__first-for-you {
            font-family: Inter;
            font-style: normal;
            font-weight: bold;
            font-size: 12px;
            line-height: 15px;
            color: rgba(31, 31, 31, 0.5);
          }

          &__second {
            margin-left: 10px;
            font-family: Inter;
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            color: #1f1f1f;
          }
        }
      }
    }
  }
}
.button-field {
  margin-left: 10px;
  height: 50px;
  .add-basket-button {
    width: 200px;
    height: 100%;
    background: #0d2f81;
    color: white;
    border: none;
    margin-left: 20px;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background: #001b6d;
    }
  }
  .add-basket-button-disabled {
    width: 200px;
    height: 100%;
    background: #0d2f81;
    color: white;
    border: none;
    margin-left: 20px;
    border-radius: 3px;
    opacity: 0.5;
    cursor: pointer;
  }
}

.wrap-button {
  display: flex;
  justify-content: flex-end;
}

@media only screen and (max-width: 768px) {
  details {
    height: 20px;
    transition: height 0.5s ease-in-out;
    overflow: hidden;
  }

  .fav-card {
    overflow-y: scroll;
    height: 100%;
    padding: 0 25px;

    &__card-container {
      padding: 20px 0;

      &__card {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-column-gap: 20px;
        grid-row-gap: 20px;

        &__img {
          justify-self: center;
          width: 80px;
          height: 80px;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          border: 1px solid rgba(31, 31, 31, 0.1);
          box-sizing: border-box;
          border-radius: 3px;

          &__sub {
            cursor: pointer;
            margin-top: 60px;
            margin-left: 60px;
          }
        }

        &__info {
          &__title {
            font-family: Inter;
            font-style: normal;
            font-weight: 600;
            font-size: 18px;
            line-height: 22px;

            color: #1f1f1f;
          }
          &__subtitle {
            margin-top: 5px;
            font-family: Inter;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 17px;

            color: rgba(31, 31, 31, 0.5);
          }
        }
        &__price {
          display: grid;
          grid-template-rows: 24px 24px;
          grid-row-gap: 10px;

          &__item-group {
            align-self: center;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;

            &__first {
              font-family: Inter;
              font-style: normal;
              font-weight: bold;
              font-size: 12px;
              line-height: 15px;
              color: rgba(31, 31, 31, 0.5);
            }

            &__second {
              margin-left: 10px;
              font-family: Inter;
              font-style: normal;
              font-weight: 600;
              font-size: 20px;
              line-height: 24px;
              color: #1f1f1f;
            }
          }
        }
      }
    }
  }
  .button-field {
    padding-top: 10px;
    height: 50px;
    .add-basket-button {
      width: 200px;
      height: 100%;
      background: #0d2f81;
      color: white;
      border: none;
      margin-left: 20px;
      border-radius: 3px;
      cursor: pointer;
      &:hover {
        background: #001b6d;
      }
      &:disabled {
        opacity: 0.5;
      }
    }
    .add-basket-button-disabled {
      width: 200px;
      height: 100%;
      background: #0d2f81;
      color: white;
      border: none;
      margin-left: 20px;
      border-radius: 3px;
      opacity: 0.5;
      cursor: pointer;
    }
  }
}
</style>
