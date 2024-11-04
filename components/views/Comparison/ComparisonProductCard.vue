<template>
  <div
    class="cp-product__list__card-container__card"
    :style="isDisable ? '' : 'opacity:0.5'"
  >
    <div
      class="cp-product__list__card-container__card__img"
      :style="
        `background-image:url(${photo || require('@/assets/no-image.png')})`
      "
    >
      <img
        v-if="isDisable"
        @click="$emit('add', { stock_code: item.stock_code, isAuth })"
        class="cp-product__list__card-container__card__img__sub"
        src="@/assets/add.png"
      />
    </div>
    <div class="cp-product__list__card-container__card__info">
      <div class="cp-product__list__card-container__card__info__title">
        {{ item.stock_code }}
      </div>
      <div class="cp-product__list__card-container__card__info__subtitle">
        {{ item.summary }}
      </div>
    </div>
    <div class="cp-product__list__card-container__card__price" v-if="isAuth">
      <template v-if="!Object.keys(item.prices).length || item.price_mask">
        <div class="cp-product__list__card-container__card__price__ask_price">
          FİYAT SORUNUZ
        </div>
      </template>

      <template v-else>
        <div
          v-if="!item.is_discounted"
          class="cp-product__list__card-container__card__price__item-group"
        >
          <div
            class="cp-product__list__card-container__card__price__item-group__first"
          >
            SİZE ÖZEL HAVALE FİYATI
          </div>
          <div
            class="cp-product__list__card-container__card__price__item-group__second"
          >
            {{ prices.bank_transfer }}
          </div>
        </div>

        <div
          v-if="item.is_discounted && Object.keys(item.discounted_price).length"
          class="price-discount"
        >
          <p>
            %{{ Math.floor(item.discounted_price.rate * 10) / 10 }} İNDİRİMLİ
            FİYAT
          </p>

          <div class="wrapper">
            <p>{{ prices.bank_transfer }}</p>
            <p>${{ item.discounted_price.price }}</p>
          </div>
        </div>
        <div class="cp-product__list__card-container__card__price__item-group">
          <div
            class="cp-product__list__card-container__card__price__item-group__first"
          >
            LİSTE FİYATI
          </div>
          <div
            class="cp-product__list__card-container__card__price__item-group__second"
          >
            {{ prices.end_user }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue'
import { CURRENCY_SYMBOL } from '@/constants'
import { mixinNumberFormatTr } from '@/utils'

export default {
  components: {
    Icon
  },
  props: {
    item: { type: Object, default: () => {} },
    isDisable: { type: Boolean, default: false },
    isAuth: { type: Boolean, default: false }
  },

  computed: {
    photo() {
      try {
        if (this.item.photos.length) {
          return this.item.photos[0].photo
        }
        return ''
      } catch (error) {
        console.log(error)
        return ''
      }
    },
    prices() {
      try {
        return {
          end_user: this.item?.prices?.end_user
            ? this.currencySymbol[this.item.prices.currency] +
              mixinNumberFormatTr(this.item.prices.end_user)
            : '-',
          bank_transfer: this.item?.prices?.bank_transfer
            ? this.currencySymbol[this.item.prices.currency] +
              mixinNumberFormatTr(this.item.prices.bank_transfer)
            : '-'
        }
      } catch (error) {
        console.log(error)
        return []
      }
    }
  },
  data() {
    return {
      currencySymbol: { ...CURRENCY_SYMBOL }
    }
  }
}
</script>

<style lang="scss" scoped>
.price-discount {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;

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
.cp-product {
  position: absolute;
  width: 800px;
  height: 100vh;
  top: 0;
  right: 0;
  background: #ffffff;
  display: flex;
  flex-direction: column;

  &__list {
    overflow-y: scroll;
    height: 100%;
    padding: 0 25px;

    &__card-container {
      padding: 20px 0;
      border-bottom: 1px solid rgba(31, 31, 31, 0.1);

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
            margin-top: 42px;
            margin-left: 37px;
          }
        }

        &__info {
          align-self: center;
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
          align-self: center;

          display: grid;
          grid-template-rows: 24px 24px;
          grid-row-gap: 10px;

          &__ask_price {
            color: black;
            border: none;
            cursor: default;
            text-align: right;
          }

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
}

@media (max-width: 768px) {
  .cp-product {
    position: absolute;
    width: 300px;

    &__list {
      &__card-container {
        &__card {
          grid-template-columns: 50px 1fr 1fr;
          grid-column-gap: 10px;

          &__img {
            width: 40px;
            height: 40px;

            &__sub {
              margin-top: 20px;
              margin-left: 20px;
            }
          }

          &__info {
            align-self: flex-start;
            &__title {
              font-size: 14px;
            }
            &__subtitle {
              font-size: 12px;
              line-height: 14px;
            }
          }
          &__price {
            display: grid;
            grid-template-rows: 36px 36px;
            &__item-group {
              display: grid;
              grid-template-columns: 1fr 1fr;
              column-gap: 10px;
              align-items: center;
              &__first {
                font-size: 10px;
                line-height: 12px;
              }

              &__second {
                font-size: 14px;
                margin-left: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
