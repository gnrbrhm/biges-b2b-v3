<template>
  <div class="column is-3">
    <div class="summary-content">
      <div class="summary-info">
        <div class="summary-title">
          <h3>
            Sipariş Özeti
            <!-- <span v-if="false" class="total-order">{{
              lockedBasketDetails.productList.length
            }}</span> -->
          </h3>
          <div v-if="steps == 1" class="summary-icons">
            <span
              v-tooltip="'Kayıtlı Sepetler'"
              @click="setShowSaved(true)"
              class="icon"
            >
              <app-icon name="folder-file" icon-color="transparent" />
            </span>
          </div>
          <span
            @click="$emit('onStep', 1)"
            v-if="steps != 1"
            class="summary-icons"
          >
            Tüm Ürünler
          </span>
        </div>
        <div
          v-if="lockedBasketDetails && lockedBasketDetails.basketSummary"
          class="summary-price subtotal"
        >
          <span>ARA TOPLAM</span>
          <div class="total">
            {{ lockedBasketDetails.basketSummary.subtotal }}
          </div>
        </div>
        <div v-if="lockedBasketDetails" class="summary-price">
          <span>TOPLAM KDV TUTARI</span>
          <div class="total">
            {{ lockedBasketDetails.basketSummary.grandTotalTax }}
          </div>
        </div>
        <div class="shipment">
          <div class="shipment-title">
            <h5>KARGO</h5>
          </div>
          <p class="shipment-desc">
            <span>{{ freeCargo }} USD</span>alışverişinizde kargo ücretsiz!
          </p>
          <div class="shipment-progress-bar">
            <progress
              class="progress is-custom"
              :value="lockedBasketDetails.basketSummary.grandTotalUsd"
              :max="freeCargo"
            />
            <div class="progress-bar-info">
              <span class="min"
                >${{ lockedBasketDetails.basketSummary.grandTotalUsd }}</span
              >
              <span class="max">${{ freeCargo }}</span>
            </div>
          </div>
        </div>
        <div v-if="lockedBasketDetails" class="summary-price total-price">
          <span>KDV DAHİL TUTAR</span>
          <div class="total grand-total">
            {{ lockedBasketDetails.basketSummary.grandTotal }}
          </div>
        </div>
      </div>
      <div></div>
      <div
        v-if="steps == 1"
        @click="
          () => {
            $emit('onStep', 2)
          }
        "
        class="complete"
      >
        <!-- :disabled="!hasCheque" -->
        <button
          class="complete-button button is-fullwidth is-capitalized has-text-white has-text-weight-light"
        >
          ALIŞVERİŞİ TAMAMLA
        </button>
      </div>
      <div v-if="steps == 2 && isBuy" class="complete">
        <div class="mt-10">
          <CheckboxContract @onChange="value => (isCheck1 = value.isChecked)">
            <template #text>
              <p>
                <strong
                  class="mr-7"
                  style="cursor: pointer"
                  @click.stop="clickForm(1)"
                >
                  Ödeme ve Satış Hizmetlerine İlişkin Aydınlatma Metnini
                </strong>
                okudum.
              </p>
            </template>
          </CheckboxContract>
        </div>

        <div class="mt-10 mb-10">
          <CheckboxContract @onChange="value => (isCheck2 = value.isChecked)">
            <template #text>
              <p>
                <strong
                  class="mr-7"
                  style="cursor: pointer"
                  @click.stop="clickForm(2)"
                >
                  Mesafeli Satış Sözleşmesini
                </strong>
                kabul ediyorum.
              </p>
            </template>
          </CheckboxContract>
        </div>

        <button
          v-if="isBuyButtonShow"
          @click="buyButton"
          :disabled="
            (!validNewCardInfo ^ !!selectedCard && isBuyLoading) ||
              getChequeLoading ||
              !(isCheck1 && isCheck2)
          "
          v-loading="{ loading: isBuyLoading || getChequeLoading }"
          class="complete-button button is-fullwidth is-capitalized has-text-white has-text-weight-light"
        >
          SATIN AL
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { CURRENCY_SYMBOL } from '@/constants'
import Icon from '@/components/Icon.vue'
import Cookies from 'js-cookie'
import CheckboxContract from '@/components/common/Checkbox'
import { maxLength } from 'vuelidate/lib/validators'

import { mapActions } from 'vuex'

export function limitMask(value) {
  if (value.length >= 255) {
    let newValue = value.split('').splice(0, 255)
    return newValue
  }
  return value.split('')
}

export default {
  components: {
    appIcon: Icon,
    CheckboxContract
  },
  props: {
    steps: { type: Number, default: 1 },
    freeCargo: {
      type: Number,
      default: null
    },
    useBigesClubPoint: {
      type: Boolean,
      default: false
    },
    hasCheque: {
      type: Boolean,
      default: false
    },
    useBigesWalletPoint: {
      type: Boolean,
      default: false
    }
  },
  validations: {
    listName: {
      maxLength: maxLength(254)
    }
  },
  watch: {
    getPaymentStatus(value) {
      if (value.status == 'success') {
        this.isBuyButtonShow = false
      }
    },
    hasCheque(val) {
      console.log('hasCheque', val)
    },
    getPaymentType(value) {
      console.log('getPaymentType', value)
    }
  },
  computed: {
    ...mapGetters({
      getPaymentType: 'payment/getPaymentType',
      getLockedBasketDetails: 'basket/getLockedBasketDetails',
      getPaymentStatus: 'payment/getPaymentStatus',
      getChequeLoading: 'cheques/getChequeLoading'
    }),
    ...mapState('basket', ['basket', 'lockedBasketDetails', 'total']),
    ...mapState('payment', ['isBuy', 'selectedCurrency']),
    grandTotal() {
      return this.basketDetails?.basketSummary?.subTotalUsd || 0
    },
    basketTotal() {
      return this.total ? this.total : parseInt(Cookies.get('basket.total'))
    },
    validNewCardInfo() {
      let result = true

      Object.keys(this.getPaymentType.card_info).forEach(item => {
        if (item != 'description') {
          result = result && this.getPaymentType.card_info[item] != ''
        }
      })
      console.log(
        'validNewCardInfo',
        result && this.getPaymentType.payment_type == 'credit_card'
      )
      return !(
        !result && ['credit_card'].includes(this.getPaymentType.payment_type)
      )
      //   && this.getPaymentType.payment_type == 'credit_card'
    }
  },
  data() {
    return {
      mask: limitMask,
      isUseBigesWalletPoint: this.useBigesWalletPoint,
      isRemoveAllSave: false,
      contractBody: '',
      isContractModal: false,
      isCheck1: false,
      isCheck2: false,
      isBuyButtonShow: true,
      isBuyLoading: false,
      listName: '',
      modalActive: false,
      tempSavedList: null,
      modalType: 'add',
      payment3d: {
        // conversation_id: '335e7dec-ac97-4f67-9c68-b2b383ba1c8c',
        // three_d_security_form:
        //   'PCFkb2N0eXBlIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KPGhlYWQ+CiAgICA8dGl0bGU+aXl6aWNvIE1vY2sgM0QtU2VjdXJlIFByb2Nlc3NpbmcgUGFnZTwvdGl0bGU+CjwvaGVhZD4KPGJvZHk+Cjxmb3JtIGlkPSJpeXppY28tM2RzLWZvcm0iIGFjdGlvbj0iaHR0cHM6Ly9zYW5kYm94LWFwaS5peXppcGF5LmNvbS9wYXltZW50L21vY2svaW5pdDNkcyIgbWV0aG9kPSJwb3N0Ij4KICAgIDxpbnB1dCB0eXBlPSJoaWRkZW4iIG5hbWU9Im9yZGVySWQiIHZhbHVlPSJtb2NrMTExLTMwMTk3Mjk1OTc1MTYxNzVpeXppb3JkIj4KICAgIDxpbnB1dCB0eXBlPSJoaWRkZW4iIG5hbWU9ImJpbiIgdmFsdWU9IjUzMTE1NyI+CiAgICA8aW5wdXQgdHlwZT0iaGlkZGVuIiBuYW1lPSJzdWNjZXNzVXJsIiB2YWx1ZT0iaHR0cHM6Ly9zYW5kYm94LWFwaS5peXppcGF5LmNvbS9wYXltZW50L2l5emlwb3MvY2FsbGJhY2szZHMvc3VjY2Vzcy8yIj4KICAgIDxpbnB1dCB0eXBlPSJoaWRkZW4iIG5hbWU9ImZhaWx1cmVVcmwiIHZhbHVlPSJodHRwczovL3NhbmRib3gtYXBpLml5emlwYXkuY29tL3BheW1lbnQvaXl6aXBvcy9jYWxsYmFjazNkcy9mYWlsdXJlLzIiPgogICAgPGlucHV0IHR5cGU9ImhpZGRlbiIgbmFtZT0iY29uZmlybWF0aW9uVXJsIiB2YWx1ZT0iaHR0cHM6Ly9zYW5kYm94LWFwaS5peXppcGF5LmNvbS9wYXltZW50L21vY2svY29uZmlybTNkcyI+CiAgICA8aW5wdXQgdHlwZT0iaGlkZGVuIiBuYW1lPSJQYVJlcSIgdmFsdWU9IjA2NTNiN2E4LWYzNDYtNGVlOC05MTliLTQ4MGJmOWE2MzIxOCI+CjwvZm9ybT4KPHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPgogICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIml5emljby0zZHMtZm9ybSIpLnN1Ym1pdCgpOwo8L3NjcmlwdD4KPC9ib2R5Pgo8L2h0bWw+'
      },
      show3dModal: false,
    }
  },

  methods: {
    ...mapActions({
      postLockedCheckoutTransfer: 'payment/postLockedCheckoutTransfer',
      saveBasketList: 'basket/saveBasketList',
      postCreditCard: 'payment/postCreditCard',
      setPaymentStatus: 'payment/setPaymentStatus',
      resetBasket: 'basket/resetBasket',
      fetchIyzicoCreditCard: 'payment/fetchIyzicoCreditCard',
      payCheque: 'cheques/payCheque',
      setPaymentResult: 'payment/setPaymentResult',
      postOpenAccount: 'payment/postOpenAccount',
      setShowSaved: 'basket/setShowSaved'
    }),
    async clickForm(value) {
      if (value == 1) {
        let result = await this.$axios({
          method: 'GET',
          url: `/custom_page/kurumsal-icerikler/kvkk-odeme-ve-satis-hizmetleri-aydinlatma-metni`
        })
        if (result?.data) {
          this.contractBody = result?.data?.body
          this.isContractModal = true
        }
      } else if (value == 2) {
        let data = {
          payment_type: this.getPaymentType.payment_type,
          billing_address_number: this.getPaymentType.billing_address_number,
          shipping_address_number: this.getPaymentType.shipping_address_number,
          payment_sales_text_confirm: this.isCheck1,
          distance_selling_text_confirm: this.isCheck2,
          currency: this.selectedCurrency
        }
        let result = await this.$axios({
          method: 'POST',
          url: `/core/sales-agreement/`,
          data
        })
        if (result?.data) {
          this.contractBody = result?.data?.html
          this.isContractModal = true
        }
      }
    },
    buyButton() {
      console.log('this.getPaymentType.payment_type', this.getPaymentType)
      if (this.getPaymentType.payment_type == 'bank_transfer') {
        this.setTransferData()
      } else if (this.getPaymentType.payment_type == 'open_account_30_day') {
        this.setOpenAccount()
      } else if (
        this.getPaymentType.payment_type == 'credit_card_installment' ||
        this.getPaymentType.payment_type == 'credit_card'
      ) {
        this.isBuyLoading = true
        this.postCreditCard({
          payment_sales_text_confirm: this.isCheck1,
          distance_selling_text_confirm: this.isCheck2,
          use_wallet_points: 0,
          used_wallet_points: 0,
          basket_type: 'kilit',
          document_type: this.getLockedBasketDetails.basketSummary
            .document_type,
          document_number: this.getLockedBasketDetails.basketSummary
            .document_number
          // installment:
          //   this.getPaymentType.payment_type == 'credit_card'
          //     ? 1
          //     : this.getPaymentType.installment
        }).then(response => {
          if (response?.conversation_id) {
            this.payment3d = window.atob(response.three_d_security_form)
            this.show3dModal = true
          } else if (response?.response == 'success') {
            this.setPaymentResult(response)
            this.setPaymentStatus({ status: response.response })
            this.clearBasket()
            this.isBuyButtonShow = false
          }
          this.isBuyLoading = false
        })
      } else if (this.getPaymentType.payment_type.split('_')[0] == 'cheque') {
        console.log('Çeke geldi')
        let data = {
          delivery_type: this.getPaymentType.delivery_type,
          billing_address_number: this.getPaymentType.billing_address_number,
          shipping_address_number: this.getPaymentType.shipping_address_number,
          use_club_points: this.getPaymentType.use_club_points,
          id: this.$store.state.cheques.activeCheque,
          is_order: 1,
          payment_sales_text_confirm: this.isCheck1,
          distance_selling_text_confirm: this.isCheck2,
          cheque_type: this.getPaymentType.payment_type,
          use_wallet_points: 0,
          used_wallet_points: 0,
          basket_type: 'kilit',
          document_type: this.getLockedBasketDetails.basketSummary
            .document_type,
          document_number: this.getLockedBasketDetails.basketSummary
            .document_number
        }

        //if (data.id !== null) {
        this.payCheque(data).then(response => {
          if (response !== 'server_error') {
            this.setPaymentResult(response.data)
            this.setPaymentStatus({ status: 'success' })
            this.clearBasket()
          } else {
            this.$notify({
              type: 'error',
              title: 'İşlem Başarısız!',
              text: 'Çek ile ödeme yapılırken bir hata meydana geldi.',
              duration: 5000
            })
          }
          this.isBuyButtonShow = false
        })
        // } else {
        //   this.$notify({
        //     type: 'error',
        //     title: 'Çek seçilmedi!',
        //     text: 'Lütfen bir çek seçin',
        //     duration: 5000
        //   })
        // }
      }
    },
    async setTransferData() {
      this.isBuyLoading = true
      console.log('setTransferData')
      console.log('setTransferData', this.postCheckoutTransfer)
      // if (Object.keys(this.postCheckoutTransfer).length) return
      await this.postLockedCheckoutTransfer({
        // payment_sales_text_confirm: this.isCheck1,
        // distance_selling_text_confirm: this.isCheck2,
        // use_wallet_points: this.isUseBigesWalletPoint,
        // used_wallet_points: this.isUseBigesWalletPoint ?  this.basketDetails.basketSummary.walletDetails.usedWalletPoints.split('₺')[1] : '0',
        billing_address_number: this.getPaymentType.billing_address_number,
        shipping_address_number: this.getPaymentType.shipping_address_number,
        payment_sales_text_confirm: this.isCheck1,
        distance_selling_text_confirm: this.isCheck2,
        currency: this.selectedCurrency,
        basket_type: 'kilit',
        document_type: this.getLockedBasketDetails.basketSummary.document_type,
        document_number: this.getLockedBasketDetails.basketSummary
          .document_number,
        use_wallet_points: 0,
        used_wallet_points: 0
        //null validasyon için
        // billing_address_number: 0,
        // delivery_type: 0,
        // distance_selling_text_confirm: 0,
        // payment_sales_text_confirm: 0,
        // shipping_address_number: 0,
        // use_wallet_points: 0,
        // used_wallet_points: 0
      }).then(response => {
        if (response) {
          this.setPaymentResult(response)
          this.setPaymentStatus({ status: 'success' })
          this.clearBasket()
          this.isBuyButtonShow = false
        }
      })
      this.isBuyLoading = false
    },
    async setOpenAccount() {
      this.isBuyLoading = true
      if (Object.keys(this.postOpenAccount).length) return
      await this.postOpenAccount({
        payment_sales_text_confirm: this.isCheck1,
        distance_selling_text_confirm: this.isCheck2
      }).then(response => {
        if (response) {
          this.setPaymentResult(response)
          this.setPaymentStatus({ status: 'success' })
          this.clearBasket()
        }
        this.isBuyButtonShow = false
      })
      this.isBuyLoading = false
    },
    async modalEvent() {
      if (this.modalType == 'info') {
        // await this.clearBasket()
        let resp = await this.postSavedBasket(this.tempSavedList.id)
        if (resp.status) {
          location.reload()
        }
      } else {
        if (this.$v.listName.maxLength) {
          let resp = await this.saveBasketList(this.listName)
          if (resp) {
            this.$notify({
              type: 'success',
              title: 'İşlem Başarılı!',
              text: `Sepet başarılı bir şekilde kaydedildi.`,
              duration: 5000
            })
            this.clickClose()
          }
        }
      }
    },
    saveBasket() {
      this.modalType = 'save'
      this.modalActive = true
    },
    async clearBasket() {
      this.$emit('remove')
      await this.resetBasket()
    },
    clickClose() {
      this.listName = ''
      this.modalActive = false
      this.isRemoveAllSave = false
    }
  },
  mounted() {
    this.$store.dispatch('basket/getBasketSaveList')
  }
}
</script>

<style lang="scss" scoped>
.item_name {
  font-size: 14px;
}
.grid-col-2 {
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  align-items: center;
}

.modal-save-basket {
  display: grid;
  grid-template-rows: 1.6fr 30px 1fr 1fr 1fr 35px;
  justify-content: center;
  align-items: center;
  height: 100%;
  grid-row-gap: 15px;
  padding-left: 13px;
  padding-right: 13px;
  &__icon {
    justify-self: center;
  }
  &__title {
    justify-self: center;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #1f1f1f;
  }

  &__text {
    justify-self: center;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    text-align: center;

    color: rgba(31, 31, 31, 0.7);
  }
  &__input {
    justify-self: center;
    background: rgba(41, 41, 41, 0.05);
    border-radius: 3px;
    width: 100%;
    font-size: 14px;
    border: none;
    height: 50px;
    padding: 12px;
  }
  &__add {
    justify-self: center;
    font-size: 14px;
    line-height: 17px;
    background: #0d2f81;
    border-radius: 2px;
    width: 224px;
    height: 45px;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
      background: $primary-dark-3x;
    }
    &:disabled {
      opacity: 0.5;
    }
  }
  &__close {
    justify-self: center;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    width: 60%;
    cursor: pointer;
    text-align: center;

    color: rgba(31, 31, 31, 0.5);
  }
  &__close_btn {
    justify-self: center;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    width: 224px;
    height: 45px;
    cursor: pointer;
    text-align: center;
  }
}
.error {
  border: 1px solid red !important;
}
</style>
