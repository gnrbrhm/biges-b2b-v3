<template>
  <div class="payment-container flex col">
    <div class="payment-title">{{ title }}</div>

    <div class="payment-form">
      <div
        class="input-grid"
        :data-error="errors.includes('price') ? errorMessage : null"
        v-if="!inBasket"
      >
        <input
          v-model="form.price"
          class="flat-input"
          type="text"
          @input="handleValid('price', $event.target.value)"
          placeholder="Ödeme Miktarı (ör:2.000,00)"
        />
      </div>
      <div class="grid" v-if="!inBasket">
        <div class="input-grid">
          <input
            v-model="form.description"
            class="flat-input"
            type="text"
            placeholder="Açıklama"
          />
        </div>
      </div>
      <div class="payment-content__form">
        <div class="payment-content__form_title">
          <span>{{ !isNewCard ? 'Kayıtlı Kartlarım' : 'Yeni Kart' }}</span>
          <div @click="setNewCard()">
            {{ isNewCard ? 'Kartlarım' : 'Yeni Kart' }}
          </div>
        </div>

        <template v-if="isNewCard">
          <form class="form-input-grid">
            <div class="grid">
              <div
                class="input-grid"
                :data-error="
                  errors.includes('card_alias') ? errorMessage : null
                "
              >
                <input
                  v-model="form.card_alias"
                  class="flat-input"
                  type="text"
                  @input="handleValid('card_alias')"
                  placeholder="Kart Adı"
                />
              </div>
            </div>
            <div class="grid">
              <div
                class="input-grid"
                :data-error="
                  errors.includes('card_holder_name') ? errorMessage : null
                "
              >
                <input
                  v-model="form.card_holder_name"
                  class="flat-input"
                  type="text"
                  @input="handleValid('card_holder_name')"
                  placeholder="Kart Sahibi"
                />
              </div>
            </div>
            <div class="grid">
              <div
                class="input-grid"
                :data-error="
                  errors.includes('card_number') ? errorMessage : null
                "
              >
                <input
                  v-mask="'#### #### #### ####'"
                  v-model="form.card_number"
                  class="flat-input"
                  type="text"
                  @input="handleValid('card_number', $event.target.value)"
                  placeholder="Kart Numarası"
                />
              </div>
            </div>
            <div class="grid">
              <div class="flex row" :style="{ gap: '20px' }">
                <div
                  class="input-grid"
                  :data-error="
                    errors.includes('expiration_date') ? errorMessage : null
                  "
                >
                  <input
                    v-mask="'##/##'"
                    :value="form.expiration_date"
                    class="flat-input"
                    type="text"
                    @input="handleValid('expiration_date', $event.target.value)"
                    placeholder="Son Kullanma Tarihi"
                  />
                  <!-- @keydown="formatExpDate" -->
                </div>
                <div
                  :class="
                    getLayout == 'mobile'
                      ? 'input-grid w-90 ml-5'
                      : 'input-grid w-120'
                  "
                  :data-error="errors.includes('cvc') ? errorCVV : null"
                >
                  <input
                    v-model="form.cvc"
                    :class="
                      getLayout == 'mobile'
                        ? 'flat-input w-90'
                        : 'flat-input w-120'
                    "
                    type="text"
                    v-mask="'###'"
                    @input="handleValid('cvc', $event.target.value)"
                    placeholder="CVC"
                  />
                </div>
              </div>
            </div>
          </form>
          <div class="mt-25">
            <GreenCheckbox
              :key="is_saved_card"
              @onChange="handleSavedCard($event)"
              :item="{ name: 'Kayıtlı kartlarıma ekle' }"
              :isCheck="is_saved_card"
            ></GreenCheckbox>
          </div>
        </template>

        <div v-else class="payment-content__form__credit_cards">
          <div
            v-for="(card, index) in savedCards"
            :key="card + index"
            @click="setSelectedCard(card)"
            class="payment-content__form__credit_cards_card"
            :class="selectedCard && selectedCard.id == card.id ? 'active' : ''"
          >
            <img :src="`/cards/${cardImage[card.card_type]}`" />
            <div class="payment-content__form__credit_cards_card_info">
              <span>{{ card.card_alias }}</span>
              <div class="dots">
                <span
                  class="dot"
                  v-for="index in 12"
                  :key="'dot' + index"
                ></span>
                <span>{{ card.last_four_number }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TableTemporary
        @handleRow="selectInstallment($event)"
        :data="tablePayment"
        :isClickable="true"
        :isBlur="isBlur"
        title="Taksit Seçeneği"
        :key="'f' + tablePayment.rows.length + new Date().getTime()"
        warningMessage="Ödeme koşullarını görmek için kredi kartı bilgilerinizi giriniz."
        :fromTableInstallment="true"
      >
      </TableTemporary>

      <div class="mt-25">
        <GreenCheckbox
          :key="is_three_d_security"
          @onChange="handle3dSecure($event)"
          :item="{ name: '3D Güvenli ödeme sistemi ile ödemek istiyorum' }"
          :isCheck="is_three_d_security"
        ></GreenCheckbox>
      </div>
    </div>

    <div class="form-button" v-if="!inBasket">
      <button
        @click="sendForm"
        :class="
          `form-button ml-50 ${
            form.price == null || form.description == '' ? 'disabled' : ''
          }`
        "
      >
        Gönder
      </button>
      <div class="empty-content">
        <div @click="clearAll">SIFIRLA</div>
      </div>
    </div>
    <!-- <div
        :class="
          getLayout == 'mobile'
            ? 'flex-1 payment-preview mt-50 '
            : 'flex-1 payment-preview mt-50 pl-54'
        "
      >
        <div class="payment-preview__card flex col">
          <div class="payment-preview__card__shape mb-40"></div>
          <div
            :class="
              getLayout == 'mobile' ? 'flex row ml-10 ' : 'flex row ml-30'
            "
          >
            <div class="flex row">
              <div class="card-number">{{ form.card_number[0] }}</div>
              <div class="card-number">{{ form.card_number[1] }}</div>
              <div class="card-number">{{ form.card_number[2] }}</div>
              <div class="card-number">{{ form.card_number[3] }}</div>
            </div>
            <div
              :class="
                getLayout == 'mobile' ? 'flex row ml-5 ' : 'flex row ml-25'
              "
            >
              <div class="card-number">{{ form.card_number[5] }}</div>
              <div class="card-number">{{ form.card_number[6] }}</div>
              <div class="card-number">{{ form.card_number[7] }}</div>
              <div class="card-number">{{ form.card_number[8] }}</div>
            </div>
            <div
              :class="
                getLayout == 'mobile' ? 'flex row ml-5 ' : 'flex row ml-25'
              "
            >
              <div class="card-number">{{ form.card_number[10] }}</div>
              <div class="card-number">{{ form.card_number[11] }}</div>
              <div class="card-number">{{ form.card_number[12] }}</div>
              <div class="card-number">{{ form.card_number[13] }}</div>
            </div>
            <div
              :class="
                getLayout == 'mobile' ? 'flex row ml-5 ' : 'flex row ml-25'
              "
            >
              <div class="card-number">{{ form.card_number[15] }}</div>
              <div class="card-number">{{ form.card_number[16] }}</div>
              <div class="card-number">{{ form.card_number[17] }}</div>
              <div class="card-number">{{ form.card_number[18] }}</div>
            </div>
          </div>
          <div class="mt-34 ml-30 flex row">
            <div class="name col-5">{{ form.card_holder_name }}</div>
            <div class="name col-3">{{ form.expiration_date }}</div>
          </div>
        </div>
      </div> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import GreenCheckbox from '@/components/common/GreenCheckbox'
import Table from '@/components/views/ForYou/Table'
import TableTemporary from '@/components/views/ForYou/TableTemporary'
import endpoints from '~/api/endpoints'

export default {
  name: 'Payment',
  components: { GreenCheckbox, Table, TableTemporary },
  props: {
    title: { type: String, default: null },
    isFormClear: { type: Boolean, default: false },
    isSendFormLoading: { type: Boolean, default: false },
    tablePayment: { type: Object, default: () => {} },
    savedCards: { type: Array, default: () => [] },
    isBlur: { type: Boolean, default: false },
    isNewCard: { type: Boolean, default: false },
    inBasket: { type: Boolean, default: false }
  },
  data() {
    return {
      errors: [],
      errorMessage: 'Lütfen bu alanı kontrol ediniz.',
      errorCVV: 'Zorunlu Alan',
      cardImage: {
        MASTER_CARD: 'mastercard.png',
        VISA: 'visa.png'
      },
      isLoading: false,
      is_saved_card: false,
      selectedCard: null,
      form: {
        expiration_date: '',
        description: '',
        price: null,
        card_holder_name: null,
        card_number: '',
        expire_month: 0,
        expire_year: 0,
        cvc: null,
        card_alias: ''
      },
      installment: null,
      is_three_d_security: false,
      is_balance:
        !this.$auth?.user?.profile?.is_balance || this.isSendFormLoading
    }
  },
  computed: {
    ...mapGetters(['getLayout']),
    ...mapGetters({
      getBasketDetails: 'basket/getBasketDetails',
      getPaymentType: 'payment/getPaymentType'
    }),
    balance() {
      return !this.$auth?.user?.profile?.is_balance || this.isSendFormLoading
    }
  },
  filters: {
    // expDate(value) {
    //   let expMonth =
    //     value.length > 1 ? value.substring(0, 2) + '/' : value.substring(0, 2)
    //   let expYear = value.length > 2 ? value.substring(3, 5) : ''
    //   return expMonth + expYear
    // }
  },
  watch: {
    'form.card_number': function(value) {
      this.installmentData()
    },
    'form.price': function(value) {
      this.installmentData()
    },
    'form.expire_month': function(value) {
      if (this.inBasket) {
        this.installmentData()
      }
    },
    'form.expire_year': function(value) {
      if (this.inBasket) {
        this.installmentData()
      }
    },
    'form.cvc': function(value) {
      if (this.inBasket) {
        this.installmentData()
      }
    },
    'form.card_holder_name': function(value) {
      if (this.inBasket) {
        this.installmentData()
      }
    },
    is_saved_card: function(value) {
      if (this.inBasket) {
        this.installmentData()
      }
    },
    isFormClear(val) {
      if (val) {
        this.clearAll()
      }
    },
    savedCards(val) {
      console.log('SAVEDCARD::', val)
      this.$emit('setIsNewCard', val.length ? false : true)
    },
    selectedCard(val) {
      console.log(val)
      this.installmentData()
    },
    is_balance(val) {
      console.log('Balance is_balance', val)
    }
  },
  methods: {
    ...mapActions({
      setPaymentType: 'payment/setPaymentType'
    }),
    setSelectedCard(card) {
      this.selectedCard = card
      this.setPaymentType({
        card_info: {
          ...this.getPaymentType.card_info,
          card_number: card?.bin_number
        }
      })
    },
    selectInstallment(item) {
      this.$emit('selectInstallment', item)
      if (item?.[0]?.data) {
        this.installment = item[0].data.installmentNumber
      }
    },
    setNewCard() {
      this.$emit('setIsNewCard', !this.isNewCard)
      console.log('setNewCard Triggered')
      this.clearAll()
    },
    clearAll() {
      this.form = {
        expiration_date: '',
        price: null,
        card_holder_name: null,
        card_number: '',
        expire_month: 0,
        expire_year: 0,
        cvc: null,
        card_alias: ''
      }
      this.setPaymentType({
        ...this.getPaymentType,
        card_info: {
          ...this.form
        }
      })
      this.is_three_d_security = false
      this.selectedCard = null
      this.setSelectedCard(null)
      this.$emit('installmentClear')
    },
    handle3dSecure(item) {
      this.setPaymentType({
        is_three_d_security: item?.isChecked || false
      })
      this.is_three_d_security = item?.isChecked || false
    },
    handleSavedCard(item) {
      console.log('handleSavedCard', item)
      this.is_saved_card = item?.isChecked || false
    },
    installmentData() {
      if (!this.inBasket) {
        if (!this.form.price) return
      }

      if (this.selectedCard) {
        this.$emit('installmentHandle', {
          price: this.form.price,
          card_number: this.selectedCard.bin_number,
          selectedCard: this.selectedCard
        })

        return
      }

      if (this.form.card_number.length >= 19 && !this.inBasket) {
        this.$emit('installmentHandle', {
          price: this.form.price,
          card_number: this.form?.card_number
            ?.split(' ')
            ?.join('')
            ?.substring(0, 6),
          inBasketForm: this.form
        })
      }
      console.log('THISFORM', this.form)
      console.log('this.is_saved_card', this.is_saved_card)
      if (
        this.form.card_number.length >= 19 &&
        this.form.card_holder_name &&
        this.form.expire_month &&
        this.form.expire_year &&
        this.form.cvc &&
        this.inBasket
      ) {
        // expiration_date: '',
        //         description: '',
        //         price: null,
        //         card_holder_name: null,
        //         card_number: '',
        //         expire_month: 0,
        //         expire_year: 0,
        //         cvc: null

        this.$emit('installmentHandle', {
          price: this.form.price,
          card_number: this.form?.card_number
            ?.split(' ')
            ?.join('')
            ?.substring(0, 6),
          inBasketForm: this.form,
          is_saved_card: this.is_saved_card
        })
      }
    },
    // formatExpDate(e) {
    //   if (e.key != 'Backspace') {
    //     let value = this.form.expiration_date
    //     let expMonth =
    //       value.length > 1 ? value.substring(0, 2) + '/' : value.substring(0, 2)
    //     let expYear = value.length > 2 ? value.substring(3, 6) : ''

    //     let result = expMonth + expYear
    //     this.form.expiration_date = result
    //   }
    // },
    handleValid(key, value) {
      if (key == 'price') {
        let replaced = value?.toString()?.replaceAll('.', '')
        this.form.price = String(
          replaced?.toString()?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        )
      }
      if (key == 'expiration_date') {
        this.form[key] = value
        let splitValue = value?.split('/')
        this.form.expire_month = splitValue[0]
        this.form.expire_year = splitValue[1]
      }
      if (key == 'card_number') {
        this.form[key] = value
      }
      if (key == 'cvc') {
        this.form[key] = value.substring(0, 3)
      }
      if (this.form[key] && this.errors.includes(key))
        this.errors.splice(this.errors.indexOf(key), 1)
      if (!this.form[key] && !this.errors.includes(key)) this.errors.push(key)
    },
    isValid(form) {
      this.errors = []
      let errors = Object.keys(form).filter(item => !form[item])
      console.log('errors', errors)
      if (errors.length) {
        this.errors = errors
        return false
      }
      return true
    },
    sendForm() {
      if (!this.installment) {
        this.$notify({
          type: 'warn',
          title: 'Uyarı!',
          text: 'Lütfen taksit seçiniz!',
          duration: 5000
        })
        return
      }

      if (!this.form.description) {
        this.$notify({
          type: 'warn',
          title: 'Uyarı!',
          text: 'Lütfen açıklama yazınız!',
          duration: 5000
        })
        return
      }

      if (this.isNewCard) {
        console.log('NEW CARD')
        if (!this.isValid(this.form)) {
          this.$notify({
            type: 'warn',
            title: 'Uyarı!',
            text: 'Lütfen tüm alanları eksiksiz doldurunuz!',
            duration: 5000
          })
          return
        }
        console.log('Form Handle', this.is_saved_card)
        this.$emit('formHandle', {
          form: this.form,
          is_three_d_security: this.is_three_d_security,
          is_saved_card: this.is_saved_card,
          saved_card_checked: false
        })
        this.clearAll()
      } else {
        console.log('SAVED CARD', this.form.price)
        if (!this.selectedCard || !this.form.price) {
          return
        }

        console.log('seçili kart ve price var')

        this.$emit('formHandle', {
          form: this.form,
          is_three_d_security: this.is_three_d_security,
          is_saved_card: this.is_saved_card,
          installment: this.installment,
          selected_card_id: this.selectedCard.id,
          saved_card_checked: true
        })
        this.clearAll()

        // this.$axios({
        //   ...endpoints.for_you.iyzico_balance_payment,
        //   data: {
        //     stored_card_id: this.selectedCard.id,
        //     price: this.form.price.toString().replaceAll('.', ''),
        //     is_three_d_security: this.is_three_d_security,
        //     installment: this.installment
        //   }
        // }).then(res => {
        //   this.$notify({
        //     type: 'success',
        //     title: 'İşlem Başarılı!',
        //     text: 'İşleminiz Başarılı',
        //     duration: 5000
        //   })
        //   this.clearAll()
        // })

        // this.$emit('formHandle', {
        //   form: this.form,
        //   is_three_d_security: this.is_three_d_security,
        //   is_saved_card: this.is_saved_card
        // })
      }
    }
  },
  mounted() {
    if (this.inBasket) {
      console.log('TOTAL::', this.getBasketDetails.basketSummary.grandTotal)
      this.form.price = this.getBasketDetails?.basketSummary?.grandTotal
        ? this.getBasketDetails?.basketSummary?.grandTotal?.replace('₺', '')
        : this.basketDetails?.basketSummary?.grandTotal

      this.form.price = this.form?.price?.replace('.', '')
      console.log('TOTAL::', this.form.price)
    }
  },
  created() {
    this.handleSavedCard({ isChecked: false })
    if (this.balance && ['size-ozel'].includes(this.$route.name)) {
      this.is_balance = this.balance
      this.$notify({
        type: 'warn',
        title: 'Uyarı!',
        text:
          'Bakiye ile ödeme yapma yetkiniz bulunmamaktadır. Lütfen Finans departmanı ile iletişime geçiniz.',
        duration: 5000
      })
    }
  },
  destroyed() {
    this.clearAll()
    console.log('destroyed validNewCardInfo')
  }
}
</script>

<style lang="scss" scoped>
.payment-container {
  .payment-title {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #1f1f1f;
  }

  .payment-form {
    display: grid;
    grid-template-columns: 345px 1fr;
    gap: 20px;

    .foryou-table {
      padding: 20px;
      border: 1px solid #e5e5e5;
    }

    .payment-content {
      margin-top: 50px;
      margin-left: 25px;
      margin-right: 92px;
      padding-bottom: 60px;

      &__title {
        &__first {
          font-family: Inter;
          font-style: normal;
          font-weight: 500;
          font-size: 20px;
          line-height: 24px;
          color: #1f1f1f;
        }
        &__second {
          margin-top: 5px;
          font-family: Inter;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 17px;

          color: rgba(31, 31, 31, 0.5);
        }
      }

      &__form {
        border: 1px solid #e5e5e5;
        padding: 20px;
        .flat-input {
          width: 100%;
        }

        &_title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          font-size: 18px;
          font-weight: 500;

          div {
            border: 1px solid #4caf50;
            border-radius: 5px;
            padding: 5px 20px;
            font-size: 14px;
            font-weight: 400;
            cursor: pointer;
            color: #4caf50;
          }
        }

        &__credit_cards {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-height: 290px;
          overflow-y: auto;

          &_card {
            display: grid;
            grid-template-columns: 50px 1fr;
            gap: 20px;
            border: 1px solid rgba(31, 31, 31, 0.1);
            cursor: pointer;
            border-radius: 5px;
            justify-content: center;
            align-items: center;
            padding: 10px 20px;

            img {
              width: 100%;
              padding: 10px;
              border: 1px solid #d9d9d9;
              border-radius: 5px;
            }

            &_info {
              display: flex;
              flex-direction: column;
              gap: 10px;

              span:first-child {
                font-size: 12px;
                color: #868e96;
              }

              .dots {
                display: flex;
                gap: 5px;
                align-items: center;
                .dot {
                  border-radius: 50%;
                  width: 4px;
                  height: 4px;
                  background: #2c3357;

                  &:nth-child(4n) {
                    margin-right: 10px;
                  }
                }

                span:last-child {
                  font-size: 14px;
                  color: #2c3357;
                  font-weight: 500;
                }
              }
            }
          }

          .active {
            border: 1px solid rgba(13, 47, 129, 0.7);
          }
        }
      }
    }
  }

  .form-button {
    margin-top: 10px;
    padding-right: 0;
    width: 100%;
    display: grid;
    align-items: center;
    justify-content: flex-start;
    display: flex;
    flex-direction: row-reverse;

    &__left {
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;
      color: rgba(31, 31, 31, 0.7);
    }
    .form-button {
      justify-self: end;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 144px;
      height: 55px;
      border: none;
      cursor: pointer;

      background: #0d2f81;
      border-radius: 3px;
      text-align: center;
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;
      color: white;

      &:hover {
        background: rgba(31, 31, 31, 0.7);
      }
      &:disabled {
        opacity: 0.5;
      }
    }
  }

  .payment-preview {
    &__card {
      height: 220px;
      background: linear-gradient(107.66deg, #f4f4f4 0.6%, #e0e0e0 100%);
      box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.05);
      border-radius: 5px;

      &__shape {
        width: 60px;
        height: 45px;
        margin-top: 35px;
        margin-left: 30px;

        background: linear-gradient(
          124.38deg,
          rgba(31, 31, 31, 0.1) -75.89%,
          rgba(31, 31, 31, 0) 100%
        );
        border-radius: 10px;
      }

      .name {
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;

        color: rgba(31, 31, 31, 0.2);
      }
      .card-number {
        width: 10px;
        height: 10px;
        background: linear-gradient(
          124.38deg,
          rgba(31, 31, 31, 0.2) -75.89%,
          rgba(31, 31, 31, 0) 100%
        );
        border-radius: 10px;
        color: rgba(31, 31, 31, 0.6);
        margin-right: 5px;
      }
    }
  }
}

.empty-content {
  color: #3273dc;
  cursor: pointer;
  &:hover {
    color: rgba(31, 31, 31, 0.4);
  }
}
@media only screen and (max-width: 768px) {
  .payment-container {
    .payment-title {
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      color: #1f1f1f;
    }

    .payment-form {
      .payment-content {
        margin-top: 50px;
        margin-left: 25px;
        margin-right: 92px;
        padding-bottom: 60px;

        &__title {
          &__first {
            font-family: Inter;
            font-style: normal;
            font-weight: 500;
            font-size: 20px;
            line-height: 24px;
            color: #1f1f1f;
          }
          &__second {
            margin-top: 5px;
            font-family: Inter;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 17px;

            color: rgba(31, 31, 31, 0.5);
          }
        }

        &__form {
          margin-top: 30px;

          &__button {
            margin-top: 30px;
            padding-right: 0;
            width: 100%;
            display: grid;
            align-items: center;
            justify-content: flex-start;
            display: flex;
            flex-direction: row-reverse;

            &__left {
              font-family: Inter;
              font-style: normal;
              font-weight: normal;
              font-size: 14px;
              line-height: 17px;
              color: rgba(31, 31, 31, 0.7);
            }
            .form-button {
              justify-self: end;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 144px;
              height: 55px;
              border: none;
              cursor: pointer;

              background: #0d2f81;
              border-radius: 3px;
              text-align: center;
              font-weight: normal;
              font-size: 14px;
              line-height: 17px;
              color: white;

              &:hover {
                background: rgba(31, 31, 31, 0.7);
              }
              &:disabled {
                opacity: 0.5;
              }
            }
          }
        }
      }
    }

    .payment-preview {
      &__card {
        height: 220px;
        background: linear-gradient(107.66deg, #f4f4f4 0.6%, #e0e0e0 100%);
        box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.05);
        border-radius: 5px;

        &__shape {
          width: 60px;
          height: 45px;
          margin-top: 35px;
          margin-left: 30px;

          background: linear-gradient(
            124.38deg,
            rgba(31, 31, 31, 0.1) -75.89%,
            rgba(31, 31, 31, 0) 100%
          );
          border-radius: 10px;
        }

        .name {
          font-family: Inter;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 17px;

          color: rgba(31, 31, 31, 0.2);
        }
        .card-number {
          width: 10px;
          height: 10px;
          background: linear-gradient(
            124.38deg,
            rgba(31, 31, 31, 0.2) -75.89%,
            rgba(31, 31, 31, 0) 100%
          );
          border-radius: 10px;
          color: rgba(31, 31, 31, 0.6);
          margin-right: 5px;
        }
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .flat-input {
    width: 100%;
    justify-self: start;
  }
}
.disabled {
  opacity: 0.5 !important;
  cursor: not-allowed !important;
  pointer-events: none;
}
</style>
